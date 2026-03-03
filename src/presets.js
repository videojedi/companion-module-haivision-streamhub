const { combineRgb } = require('@companion-module/base')

function getPresets() {
	const presets = {}

	// ============ Live Streaming ============

	presets['live-toggle'] = {
		type: 'button',
		category: 'Live',
		name: 'Toggle Live',
		style: {
			text: 'LIVE',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'live-toggle' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-live',
				style: {
					bgcolor: combineRgb(0, 180, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['live-start'] = {
		type: 'button',
		category: 'Live',
		name: 'Start Live',
		style: {
			text: 'GO\\nLIVE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 0),
		},
		steps: [
			{
				down: [{ actionId: 'live-start' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-live',
				style: {
					bgcolor: combineRgb(0, 180, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['live-stop'] = {
		type: 'button',
		category: 'Live',
		name: 'Stop Live',
		style: {
			text: 'STOP\\nLIVE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'live-stop' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Recording ============

	presets['record-toggle'] = {
		type: 'button',
		category: 'Recording',
		name: 'Toggle Record',
		style: {
			text: 'REC',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'record-toggle' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-recording',
				style: {
					bgcolor: combineRgb(229, 57, 53),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['record-start'] = {
		type: 'button',
		category: 'Recording',
		name: 'Start Record',
		style: {
			text: 'START\\nREC',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(100, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'record-start' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-recording',
				style: {
					bgcolor: combineRgb(229, 57, 53),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['record-stop'] = {
		type: 'button',
		category: 'Recording',
		name: 'Stop Record',
		style: {
			text: 'STOP\\nREC',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(80, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'record-stop' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Camera Selection ============

	presets['camera-back'] = {
		type: 'button',
		category: 'Camera',
		name: 'Back Camera',
		style: {
			text: 'BACK\\nCAM',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-camera', options: { cameraName: 'Back Camera' } }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera-active',
				options: { cameraName: 'Back Camera' },
				style: {
					bgcolor: combineRgb(74, 105, 189),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['camera-back-ultrawide'] = {
		type: 'button',
		category: 'Camera',
		name: 'Back Ultra Wide',
		style: {
			text: 'ULTRA\\nWIDE',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-camera', options: { cameraName: 'Back Ultra Wide Camera' } }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera-active',
				options: { cameraName: 'Back Ultra Wide Camera' },
				style: {
					bgcolor: combineRgb(74, 105, 189),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['camera-front'] = {
		type: 'button',
		category: 'Camera',
		name: 'Front Camera',
		style: {
			text: 'FRONT\\nCAM',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-camera', options: { cameraName: 'Front Camera' } }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'camera-active',
				options: { cameraName: 'Front Camera' },
				style: {
					bgcolor: combineRgb(74, 105, 189),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	// ============ White Balance ============

	const wbModes = [
		{ id: 'AUTO', label: 'AUTO' },
		{ id: 'DAYLIGHT', label: 'DAY' },
		{ id: 'CLOUDY_DAYLIGHT', label: 'CLOUD' },
		{ id: 'SHADE', label: 'SHADE' },
		{ id: 'INCANDESCENT', label: 'INCAN' },
		{ id: 'FLUORESCENT', label: 'FLUOR' },
	]

	for (const wb of wbModes) {
		presets[`wb-${wb.id.toLowerCase()}`] = {
			type: 'button',
			category: 'White Balance',
			name: `WB ${wb.label}`,
			style: {
				text: `WB\\n${wb.label}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'set-wb-mode', options: { mode: wb.id } }],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ============ ISO ============

	presets['iso-auto'] = {
		type: 'button',
		category: 'ISO',
		name: 'ISO Auto',
		style: {
			text: 'ISO\\nAUTO',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-iso-mode', options: { mode: 'AUTO' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['iso-manual'] = {
		type: 'button',
		category: 'ISO',
		name: 'ISO Manual',
		style: {
			text: 'ISO\\nMAN',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-iso-mode', options: { mode: 'OFF' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Focus ============

	presets['focus-auto'] = {
		type: 'button',
		category: 'Focus',
		name: 'Focus Auto',
		style: {
			text: 'FOCUS\\nAUTO',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-focus-mode', options: { mode: 'AUTO' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['focus-manual'] = {
		type: 'button',
		category: 'Focus',
		name: 'Focus Manual',
		style: {
			text: 'FOCUS\\nMAN',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-focus-mode', options: { mode: 'OFF' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Shutter ============

	presets['shutter-auto'] = {
		type: 'button',
		category: 'Shutter',
		name: 'Shutter Auto',
		style: {
			text: 'SHTR\\nAUTO',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-shutter-mode', options: { mode: 'AUTO' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['shutter-manual'] = {
		type: 'button',
		category: 'Shutter',
		name: 'Shutter Manual',
		style: {
			text: 'SHTR\\nMAN',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'set-shutter-mode', options: { mode: 'OFF' } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Audio ============

	presets['audio-0db'] = {
		type: 'button',
		category: 'Audio',
		name: 'Audio 0 dB',
		style: {
			text: 'AUDIO\\n0 dB',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'audio-gain-0db' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ============ Status ============

	presets['connection-status'] = {
		type: 'button',
		category: 'Status',
		name: 'Connection Status',
		style: {
			text: '$(haivision-streamhub:input_name)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(200, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'input-connected',
				style: {
					bgcolor: combineRgb(0, 180, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['active-camera-display'] = {
		type: 'button',
		category: 'Status',
		name: 'Active Camera',
		style: {
			text: 'CAM\\n$(haivision-streamhub:active_camera)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(40, 40, 60),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['zoom-display'] = {
		type: 'button',
		category: 'Status',
		name: 'Zoom Level',
		style: {
			text: 'ZOOM\\n$(haivision-streamhub:zoom)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(40, 40, 60),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['audio-display'] = {
		type: 'button',
		category: 'Status',
		name: 'Audio Gain',
		style: {
			text: 'AUDIO\\n$(haivision-streamhub:audio_gain)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(40, 40, 60),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	return presets
}

module.exports = { getPresets }
