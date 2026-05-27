# Overdrive BYD Card

A customizable Home Assistant dashboard card for Overdrive BYD MQTT vehicle telemetry.

This updated version supports the expanded Overdrive telemetry payload, including battery, charging, tyres, AC, lights, doors, windows, seat heating/cooling, sunroof, 12V battery, HV pack/cell stats, radar, and command buttons.

## Features

- Vehicle overview with battery, range, speed, gear, odometer, online/parked/charging status
- Expanded telemetry sections: battery health, HV pack, cells, 12V, tyres, AC, lights, windows/doors, seats, sunroof, charging, diagnostics
- Optional control buttons for Home Assistant entities such as AC, lock, trunk, horn and lights
- Visual editor support
- Custom vehicle name, brand, image, colors, background, radius and entity prefix

## Basic YAML

```yaml
type: custom:overdrive-byd-card
name: Yuan Plus
brand: BYD
entity_prefix: yuan_plus
show:
  controls: true
  expanded: true
```

## Install

Copy `overdrive-byd-card.js` to `/config/www/community/overdrive-byd-card/` or install through HACS as a dashboard repository.
