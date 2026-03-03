function getVariables() {
	return [
		{ variableId: 'input_name', name: 'Input Name' },
		{ variableId: 'input_product', name: 'Input Product' },
		{ variableId: 'input_connected', name: 'Input Connection' },
		{ variableId: 'active_camera', name: 'Active Camera' },
		{ variableId: 'is_live', name: 'Live State' },
		{ variableId: 'is_recording', name: 'Recording State' },
		{ variableId: 'wb_mode', name: 'White Balance Mode' },
		{ variableId: 'wb_value', name: 'White Balance Value' },
		{ variableId: 'iso_mode', name: 'ISO Mode' },
		{ variableId: 'iso_value', name: 'ISO Value' },
		{ variableId: 'shutter_mode', name: 'Shutter Speed Mode' },
		{ variableId: 'focus_mode', name: 'Focus Mode' },
		{ variableId: 'zoom', name: 'Zoom Level' },
		{ variableId: 'audio_gain', name: 'Audio Gain' },
	]
}

module.exports = { getVariables }
