const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const https = require('https')
const http = require('http')
const { getActions } = require('./actions')
const { getFeedbacks } = require('./feedbacks')
const { getPresets } = require('./presets')
const { getVariables } = require('./variables')
const { UpgradeScripts } = require('./upgrades')

class StreamHubInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.pollTimer = null
		this.pollCycle = 0
		this.state = {
			connected: false,
			inputName: '',
			inputProduct: '',
			inputConnectionStatus: 0,
			cameras: null,
			activeCamera: '',
			cameraSettings: null,
			isLive: false,
			isRecording: false,
		}
		this.consecutiveErrors = 0
	}

	async init(config) {
		this.config = config
		this.setActionDefinitions(getActions(this))
		this.setFeedbackDefinitions(getFeedbacks(this))
		this.setPresetDefinitions(getPresets())
		this.setVariableDefinitions(getVariables())
		this.updateVariables()
		this.connect()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'StreamHub Host',
				default: '',
				width: 6,
			},
			{
				type: 'number',
				id: 'port',
				label: 'Port',
				default: 8896,
				min: 1,
				max: 65535,
				width: 3,
			},
			{
				type: 'checkbox',
				id: 'useTls',
				label: 'Use TLS',
				default: true,
				width: 3,
			},
			{
				type: 'textinput',
				id: 'apiKey',
				label: 'API Key',
				default: '',
				width: 12,
			},
			{
				type: 'number',
				id: 'inputId',
				label: 'Input Number',
				default: 1,
				min: 1,
				max: 32,
				width: 4,
			},
			{
				type: 'number',
				id: 'pollInterval',
				label: 'Poll Interval (ms)',
				default: 3000,
				min: 1000,
				max: 30000,
				width: 4,
			},
		]
	}

	async configUpdated(config) {
		this.config = config
		this.connect()
	}

	connect() {
		this.stopPolling()
		this.state.connected = false

		if (!this.config.host || !this.config.apiKey) {
			this.updateStatus(InstanceStatus.BadConfig)
			return
		}

		this.updateStatus(InstanceStatus.Connecting)
		this.apiRequest('GET', '/')
			.then((result) => {
				if (result.status === 401) {
					this.updateStatus(InstanceStatus.ConnectionFailure, 'Unauthorized')
					return
				}
				if (result.status !== 200) {
					this.updateStatus(InstanceStatus.ConnectionFailure, `HTTP ${result.status}`)
					return
				}
				this.state.connected = true
				this.updateStatus(InstanceStatus.Ok)
				this.log('info', `Connected to StreamHub: ${result.data?.identifier || this.config.host}`)
				this.startPolling()
			})
			.catch((err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				this.log('error', `Connection failed: ${err.message}`)
			})
	}

	startPolling() {
		this.stopPolling()
		this.pollCycle = 0
		this.poll()
		this.pollTimer = setInterval(() => this.poll(), this.config.pollInterval || 3000)
	}

	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer)
			this.pollTimer = null
		}
	}

	async poll() {
		const inputId = this.config.inputId || 1
		try {
			// Fetch inputs list to get status
			const inputsResult = await this.apiRequest('GET', '/inputs')
			if (inputsResult.status === 200) {
				const inputs = inputsResult.data?.inputs || inputsResult.data?.channels || []
				const input = inputs[inputId - 1]
				if (input) {
					this.state.inputName = input.name || `Input ${inputId}`
					this.state.inputProduct = input.product || ''
					this.state.inputConnectionStatus = input.connectionStatus || 0
					this.state.isRecording = input.recorderStatus === 2
				}
			}

			// Fetch camera settings
			const settingsResult = await this.apiRequest('GET', `/inputs/${inputId}/mojoPro/cameraSettings`)
			if (settingsResult.status === 200) {
				let parsed = settingsResult.data
				if (parsed && typeof parsed.cameraSettings === 'string') {
					try {
						parsed = JSON.parse(parsed.cameraSettings)
					} catch (e) {
						// ignore parse error
					}
				} else if (parsed && typeof parsed.cameraSettings === 'object') {
					parsed = parsed.cameraSettings
				}
				this.state.cameraSettings = parsed
				this.state.activeCamera = parsed?.camera || ''
			}

			// Fetch camera list every 3rd cycle
			if (this.pollCycle % 3 === 0) {
				const camResult = await this.apiRequest('GET', `/inputs/${inputId}/mojoPro/cameraList`)
				if (camResult.status === 200) {
					this.state.cameras = camResult.data
				}
			}

			// Fetch live info
			const liveResult = await this.apiRequest('GET', `/inputs/${inputId}/live/info`)
			if (liveResult.status === 200) {
				this.state.isLive = liveResult.data?.status === 'live' || liveResult.data?.isLive === true
			}

			this.pollCycle++
			this.consecutiveErrors = 0
			this.updateVariables()
			this.checkFeedbacks('is-live', 'is-recording', 'camera-active', 'input-connected')
		} catch (err) {
			if (this.isNetworkError(err)) {
				this.consecutiveErrors++
				if (this.consecutiveErrors >= 3) {
					this.state.connected = false
					this.updateStatus(InstanceStatus.Disconnected)
					this.stopPolling()
					this.updateVariables()
					this.checkFeedbacks('is-live', 'is-recording', 'camera-active', 'input-connected')
					this.log('warn', 'Disconnected after 3 consecutive errors')
				} else {
					this.log('debug', `Poll error (${this.consecutiveErrors}/3): ${err.message}`)
				}
			} else {
				this.log('warn', `Poll error: ${err.message}`)
			}
		}
	}

	apiRequest(method, urlPath, body = null) {
		return new Promise((resolve, reject) => {
			const mod = this.config.useTls !== false ? https : http
			const separator = urlPath.includes('?') ? '&' : '?'
			const fullPath = `${urlPath}${separator}api_key=${encodeURIComponent(this.config.apiKey || '')}`

			const options = {
				hostname: this.config.host,
				port: this.config.port || 8896,
				path: fullPath,
				method,
				headers: {},
				rejectUnauthorized: false,
				timeout: 5000,
			}

			if (body) {
				const bodyStr = JSON.stringify(body)
				options.headers['Content-Type'] = 'application/json'
				options.headers['Content-Length'] = Buffer.byteLength(bodyStr)
			}

			let settled = false
			const req = mod.request(options, (res) => {
				let data = ''
				res.on('data', (chunk) => (data += chunk))
				res.on('end', () => {
					if (settled) return
					settled = true
					try {
						resolve({ status: res.statusCode, data: JSON.parse(data) })
					} catch (e) {
						resolve({ status: res.statusCode, data })
					}
				})
			})

			req.on('error', (err) => {
				if (settled) return
				settled = true
				reject(err)
			})
			req.on('timeout', () => {
				if (settled) return
				settled = true
				req.destroy()
				reject(new Error('Request timeout'))
			})

			if (body) {
				req.write(JSON.stringify(body))
			}
			req.end()
		})
	}

	async sendCameraSettings(settingsObj) {
		const inputId = this.config.inputId || 1
		const body = {
			remote: true,
			camera: this.state.activeCamera || '',
			...settingsObj,
		}
		try {
			const result = await this.apiRequest('POST', `/inputs/${inputId}/mojoPro/cameraSettings`, body)
			if (result.status !== 200) {
				this.log('warn', `Camera settings update returned ${result.status}`)
			}
		} catch (err) {
			this.log('error', `Camera settings update failed: ${err.message}`)
		}
	}

	isNetworkError(err) {
		const msg = err.message || ''
		return (
			msg.includes('ECONNREFUSED') ||
			msg.includes('ETIMEDOUT') ||
			msg.includes('ENOTFOUND') ||
			msg.includes('EHOSTUNREACH') ||
			msg.includes('Request timeout') ||
			msg.includes('socket hang up')
		)
	}

	updateVariables() {
		const cs = this.state.cameraSettings
		this.setVariableValues({
			input_name: this.state.inputName,
			input_product: this.state.inputProduct,
			input_connected: this.state.inputConnectionStatus === 1 ? 'Connected' : 'Disconnected',
			active_camera: this.state.activeCamera,
			is_live: this.state.isLive ? 'On Air' : 'Off',
			is_recording: this.state.isRecording ? 'Recording' : 'Stopped',
			wb_mode: cs?.WB?.WBMode || 'N/A',
			wb_value: cs?.WB?.WB != null ? `${cs.WB.WB}K` : 'N/A',
			iso_mode: cs?.ISO?.ISOMode || 'N/A',
			iso_value: cs?.ISO?.ISO != null ? String(cs.ISO.ISO) : 'N/A',
			shutter_mode: cs?.ShutterSpeed?.ShutterSpeedMode || 'N/A',
			focus_mode: cs?.Focus?.FocusMode || 'N/A',
			zoom: cs?.Zoom?.Zoom != null ? cs.Zoom.Zoom.toFixed(1) + 'x' : 'N/A',
			audio_gain: cs?.AudioGain?.AudioGain != null ? cs.AudioGain.AudioGain.toFixed(1) + ' dB' : 'N/A',
		})
	}

	async destroy() {
		this.stopPolling()
	}
}

runEntrypoint(StreamHubInstance, UpgradeScripts)
