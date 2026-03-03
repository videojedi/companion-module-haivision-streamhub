# Haivision StreamHub

Control Haivision StreamHub inputs and MojoPro cameras via REST API.

## Configuration

- **Host** — StreamHub IP address or hostname
- **Port** — API port (default 8896)
- **API Key** — StreamHub API key
- **Use TLS** — Enable HTTPS (default on)
- **Input** — StreamHub input number (1-based)

## Actions

- Switch active camera (Camera 0 / Camera 1)
- Start/stop live streaming
- Start/stop recording
- Set camera settings (WB, ISO, Shutter Speed, Focus, Zoom, Audio Gain)

## Feedbacks

- Live streaming state
- Recording state
- Active camera indicator
- Input connection state

## Variables

- Input name, product, connection status
- Active camera name
- Live/recording state
- Camera settings (WB mode, ISO, zoom, audio gain, etc.)
