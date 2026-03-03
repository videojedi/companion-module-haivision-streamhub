function getActions(self) {
	return {
		'set-camera': {
			name: 'Switch Camera',
			options: [
				{
					type: 'textinput',
					id: 'cameraName',
					label: 'Camera Name',
					default: 'Back Camera',
				},
			],
			callback: async (action) => {
				const inputId = self.config.inputId || 1
				try {
					await self.apiRequest('POST', `/inputs/${inputId}/mojoPro/camera/${encodeURIComponent(action.options.cameraName)}`)
					self.log('info', `Switched to camera: ${action.options.cameraName}`)
				} catch (err) {
					self.log('error', `Switch camera failed: ${err.message}`)
				}
			},
		},
		'live-start': {
			name: 'Start Live',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/live/start`)
					self.state.isLive = true
					self.checkFeedbacks('is-live')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Start live failed: ${err.message}`)
				}
			},
		},
		'live-stop': {
			name: 'Stop Live',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/live/stop`)
					self.state.isLive = false
					self.checkFeedbacks('is-live')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Stop live failed: ${err.message}`)
				}
			},
		},
		'live-toggle': {
			name: 'Toggle Live',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				const action = self.state.isLive ? 'stop' : 'start'
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/live/${action}`)
					self.state.isLive = !self.state.isLive
					self.checkFeedbacks('is-live')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Toggle live failed: ${err.message}`)
				}
			},
		},
		'record-start': {
			name: 'Start Recording',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/record/start`)
					self.state.isRecording = true
					self.checkFeedbacks('is-recording')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Start recording failed: ${err.message}`)
				}
			},
		},
		'record-stop': {
			name: 'Stop Recording',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/record/stop`)
					self.state.isRecording = false
					self.checkFeedbacks('is-recording')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Stop recording failed: ${err.message}`)
				}
			},
		},
		'record-toggle': {
			name: 'Toggle Recording',
			options: [],
			callback: async () => {
				const inputId = self.config.inputId || 1
				const action = self.state.isRecording ? 'stop' : 'start'
				try {
					await self.apiRequest('GET', `/inputs/${inputId}/record/${action}`)
					self.state.isRecording = !self.state.isRecording
					self.checkFeedbacks('is-recording')
					self.updateVariables()
				} catch (err) {
					self.log('error', `Toggle recording failed: ${err.message}`)
				}
			},
		},
		'set-wb-mode': {
			name: 'Set White Balance Mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'WB Mode',
					default: 'AUTO',
					choices: [
						{ id: 'AUTO', label: 'Auto' },
						{ id: 'INCANDESCENT', label: 'Incandescent' },
						{ id: 'FLUORESCENT', label: 'Fluorescent' },
						{ id: 'WARM_FLUORESCENT', label: 'Warm Fluorescent' },
						{ id: 'DAYLIGHT', label: 'Daylight' },
						{ id: 'CLOUDY_DAYLIGHT', label: 'Cloudy' },
						{ id: 'TWILIGHT', label: 'Twilight' },
						{ id: 'SHADE', label: 'Shade' },
						{ id: 'OFF', label: 'Manual' },
					],
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ WB: { WBMode: action.options.mode } })
			},
		},
		'set-iso-mode': {
			name: 'Set ISO Mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'ISO Mode',
					default: 'AUTO',
					choices: [
						{ id: 'AUTO', label: 'Auto' },
						{ id: 'OFF', label: 'Manual' },
					],
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ ISO: { ISOMode: action.options.mode } })
			},
		},
		'set-focus-mode': {
			name: 'Set Focus Mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Focus Mode',
					default: 'AUTO',
					choices: [
						{ id: 'AUTO', label: 'Auto' },
						{ id: 'OFF', label: 'Manual' },
					],
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ Focus: { FocusMode: action.options.mode } })
			},
		},
		'set-shutter-mode': {
			name: 'Set Shutter Speed Mode',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Shutter Mode',
					default: 'AUTO',
					choices: [
						{ id: 'AUTO', label: 'Auto' },
						{ id: 'OFF', label: 'Manual' },
					],
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ ShutterSpeed: { ShutterSpeedMode: action.options.mode } })
			},
		},
		'set-zoom': {
			name: 'Set Zoom',
			options: [
				{
					type: 'number',
					id: 'zoom',
					label: 'Zoom Level',
					default: 1,
					min: 1,
					max: 10,
					step: 0.1,
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ Zoom: { Zoom: action.options.zoom } })
			},
		},
		'set-audio-gain': {
			name: 'Set Audio Gain',
			options: [
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -50,
					max: 24,
					step: 0.5,
				},
			],
			callback: async (action) => {
				await self.sendCameraSettings({ AudioGain: { AudioGainMode: 'OFF', AudioGain: action.options.gain } })
			},
		},
		'audio-gain-0db': {
			name: 'Audio Gain 0 dB',
			options: [],
			callback: async () => {
				await self.sendCameraSettings({ AudioGain: { AudioGainMode: 'OFF', AudioGain: 0 } })
			},
		},
	}
}

module.exports = { getActions }
