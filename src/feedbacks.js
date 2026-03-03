const { combineRgb } = require('@companion-module/base')

function getFeedbacks(self) {
	return {
		'is-live': {
			type: 'boolean',
			name: 'Live Streaming',
			description: 'Change button style when input is live',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.isLive === true
			},
		},
		'is-recording': {
			type: 'boolean',
			name: 'Recording',
			description: 'Change button style when input is recording',
			defaultStyle: {
				bgcolor: combineRgb(229, 57, 53),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.isRecording === true
			},
		},
		'camera-active': {
			type: 'boolean',
			name: 'Camera Active',
			description: 'Change button style when a specific camera is active',
			defaultStyle: {
				bgcolor: combineRgb(74, 105, 189),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'textinput',
					id: 'cameraName',
					label: 'Camera Name',
					default: 'Back Camera',
				},
			],
			callback: (feedback) => {
				return self.state.activeCamera === feedback.options.cameraName
			},
		},
		'input-connected': {
			type: 'boolean',
			name: 'Input Connected',
			description: 'Change button style when the input is connected',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.inputConnectionStatus === 1
			},
		},
	}
}

module.exports = { getFeedbacks }
