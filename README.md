# companion-module-haivision-streamhub

> **Early release — this is a work in progress and needs extensive testing before production use.**

Bitfocus Companion module for controlling Haivision StreamHub inputs and MojoPro cameras via REST API.

## Features

### Actions
- Switch active camera by name
- Start/stop live streaming (toggle or discrete)
- Start/stop recording (toggle or discrete)
- Set White Balance mode (Auto, Daylight, Cloudy, Shade, Incandescent, Fluorescent, Manual)
- Set ISO mode (Auto/Manual)
- Set Focus mode (Auto/Manual)
- Set Shutter Speed mode (Auto/Manual)
- Set Zoom level
- Set Audio Gain (value or 0 dB reset)

### Feedbacks
- Live streaming state (green when on-air)
- Recording state (red when recording)
- Active camera indicator
- Input connection state

### Variables
- Input name, product, connection status
- Active camera name
- Live and recording state
- Camera settings: WB mode/value, ISO, shutter, focus, zoom, audio gain

### Presets (25+)
Ready-made buttons for Live toggle, Record toggle, camera selection (Back/Ultra Wide/Front), WB modes, ISO/Focus/Shutter auto+manual, Audio 0 dB, and status displays.

## Configuration

| Field | Description | Default |
|-------|-------------|---------|
| Host | StreamHub IP or hostname | — |
| Port | API port | 8896 |
| Use TLS | Enable HTTPS | On |
| API Key | StreamHub API key | — |
| Input Number | StreamHub input (1-based) | 1 |
| Poll Interval | Status poll rate in ms | 3000 |

## Installation

### From .tgz
```sh
npm install
npx companion-module-build
```
Then install the generated `.tgz` file in Companion via the module installer.

### For development
Add the module folder path in Companion's Developer Modules section. Changes are hot-reloaded on save.

## Known Limitations

- Camera name presets use common iPhone camera names — may need adjusting for other devices
- Live status detection depends on the `/live/info` endpoint response format which may vary
- Recording status is inferred from `recorderStatus` field (value `2` = recording)
- Tested against StreamHub API v4.4.5 only
- Self-signed certificates are accepted (`rejectUnauthorized: false`)

## License

MIT
