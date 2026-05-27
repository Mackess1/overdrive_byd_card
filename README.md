Overdrive BYD Card

A modern, real-time Home Assistant dashboard card for BYD vehicles powered by Overdrive.

This project transforms raw BYD telemetry into a polished connected-car experience directly inside Home Assistant using MQTT and the Overdrive platform.

Designed specifically for BYD vehicles running Overdrive v12+, the card provides live telemetry, climate controls, charging information, tire monitoring, lighting status, vehicle controls, and advanced battery data in a clean modern UI.

Huge Credit to Overdrive

This entire project would not exist without the incredible work done by Yash Srivastava.

The actual vehicle communication, telemetry access, command systems, reverse engineering, MQTT support, and Overdrive platform were created by him through the Overdrive project:

Overdrive GitHub Repository

Overdrive is one of the most advanced open-source BYD projects currently available and enables features such as:

• Real-time vehicle telemetry
• Vehicle controls
• Climate controls
• MQTT integration
• Vehicle diagnostics
• Dashcam functionality
• Sentry mode
• Local HAL integration
• Advanced BYD reverse engineering

This Home Assistant integration and dashboard card are built specifically to extend, visualize, and integrate the amazing work already done in Overdrive.

Massive respect and appreciation to Yash for pushing the BYD community forward and making projects like this possible.

Please support the original project and star the repository.

Features
Real-Time Vehicle Telemetry

The card automatically displays:

Feature	Description
Battery SOC	Current battery percentage
EV Range	Remaining driving range
Battery Health	SOH percentage
Power Usage	Live power draw and regen
Speed	Vehicle speed
Gear	Current gear
Odometer	Total vehicle mileage
Drive Time	Total driving hours
Energy Consumption	Consumption over 50km
Battery Temperature	HV battery temperature
Outside Temperature	Ambient temperature
Inside Temperature	Cabin temperature
12V Voltage	Auxiliary battery voltage
Charging Information

Supports:

• AC charging
• DC fast charging
• Charging gun detection
• Charging mode monitoring
• V2L status
• Charging state monitoring

The card can visually distinguish:

• Parked
• Driving
• Charging
• DC Fast Charging
• Offline

Tire Monitoring

Displays:

• Individual tire pressures
• Tire temperatures
• Tire leak warnings
• Tire signal status
• Tire system health

Supports all 4 tires independently.

Climate & Cabin

Supports:

• AC status
• Fan speed
• Air cycle mode
• Seat heating
• Seat cooling
• Window states
• Sunroof position

Climate controls can be integrated directly into the card using MQTT vehicle commands.

Lighting & Vehicle State

Supports:

• DRLs
• Low beams
• High beams
• Fog lights
• Hazard lights
• Turn signals
• Door lock status
• Seatbelt status

Home Assistant Integration

Works with the companion integration:

Overdrive BYD Integration

The integration handles:

• MQTT subscriptions
• Entity creation
• Vehicle commands
• Climate entities
• Lock controls
• Telemetry parsing

MQTT Topics
Telemetry Topic
overdrive/vehicle/telemetry
Availability Topic
overdrive/vehicle/telemetry/availability
Command Topic
overdrive/vehicle/command
Example Telemetry Payload
{
  "soc": 92,
  "speed": 0,
  "power": 0,
  "ev_range_km": 461,
  "is_charging": 0,
  "is_dcfc": 0,
  "inside_temp": 22,
  "ext_temp": 35,
  "batt_temp": 32,
  "gear": "P",
  "tyre_p_fl": 202,
  "tyre_p_fr": 195,
  "tyre_p_rl": 202,
  "tyre_p_rr": 197,
  "ac_on": 0,
  "light_drl": 1,
  "sunroof_state": 1
}
Vehicle Commands

The card supports vehicle controls through MQTT.

Turn On AC
{
  "command": "climate_on",
  "temperature": 22,
  "source": "home_assistant"
}
Turn Off AC
{
  "command": "climate_off",
  "source": "home_assistant"
}
Lock Vehicle
{
  "command": "lock",
  "source": "home_assistant"
}
Unlock Vehicle
{
  "command": "unlock",
  "source": "home_assistant"
}
Open Trunk
{
  "command": "open_trunk",
  "source": "home_assistant"
}
Installation
HACS Installation
Open HACS
Go to Frontend
Click the 3-dot menu
Select Custom Repositories
Add:
https://github.com/Mackess1/overdrive_byd_card
Category:
Dashboard
Install the card
Restart Home Assistant
Manual Installation

Copy:

/overdrive_byd_card.js

Into:

/config/www/

Then add:

resources:
  - url: /local/overdrive_byd_card.js
    type: module
Example Card Configuration
type: custom:overdrive-byd-card
vehicle_name: Yuan Plus
show_tyres: true
show_climate: true
show_lights: true
show_location: true
show_battery_details: true
show_cell_data: true
Supported Vehicle Data
Battery

• SOC
• SOH
• HV Voltage
• Cell Voltage Max
• Cell Voltage Min
• Cell Voltage Delta
• Cell Temperatures

Driving

• Speed
• Gear
• Steering Angle
• Acceleration
• Brake Position
• Drive Mode

Charging

• Charging State
• DCFC State
• Charging Gun
• Charging Type
• V2L

Climate

• AC Status
• Fan Speed
• Air Cycle
• Temperature Unit
• Cabin Temperature

Tires

• Pressure
• Temperature
• Leak Detection
• Signal State

Vehicle

• Door Locks
• Windows
• Sunroof
• Lights
• Seatbelts
• Radar Distance

Roadmap

Planned future features:

• Live map embedding
• Trip history
• Charging history graphs
• Battery degradation graphs
• Native Android Auto style mode
• Voice assistant controls
• Real-time command confirmations
• Push notifications
• Vehicle diagnostics page
• OTA update visibility

Powered By Overdrive

Core vehicle communication and telemetry are powered by:

Overdrive by Yash Srivastava

Please support the original project and star the repository.

Credits

Built for the BYD and Home Assistant community.

Powered by:

• Home Assistant
• MQTT
• Overdrive
• BYD telemetry systems

Special thanks again to Yash Srivastava for the incredible Overdrive platform and the reverse engineering work that made this ecosystem possible.

Disclaimer

This project is unofficial and is not affiliated with BYD.

Use vehicle control functions responsibly.

Always ensure the vehicle is in a safe state before sending remote commands.
