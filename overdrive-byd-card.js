class OverdriveBYDCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("overdrive-byd-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:overdrive-byd-card",
      name: "Yuan Plus",
      brand: "BYD",
      entity_prefix: "yuan_plus",
      show: {
        brand: true,
        image: true,
        overview: true,
        stats: true,
        bars: true,
        controls: true,
        expanded: true,
        tyres: true,
        battery_detail: true,
        climate: true,
        lights: true,
        body: true,
        charging_detail: true,
        diagnostics: true,
        gps: false,
        last_update: true,
      },
      theme: {
        background: "gradient",
        primary_color: "#00f5a0",
        secondary_color: "#38bdf8",
        accent_color: "#ff006e",
        card_radius: "34px",
        font_family: "inherit",
      },
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    const defaults = {
      name: "Yuan Plus",
      brand: "BYD",
      entity_prefix: "yuan_plus",
      car_image: "https://i.ibb.co/WW2DXV5k/Chat-GPT-Image-May-4-2026-09-46-11-AM-removebg-preview-1.png",
      theme: {
        background: "gradient",
        background_image: "",
        primary_color: "#00f5a0",
        secondary_color: "#38bdf8",
        accent_color: "#ff006e",
        text_color: "#ffffff",
        muted_text_color: "rgba(255,255,255,.64)",
        card_radius: "34px",
        inner_radius: "24px",
        font_family: "inherit",
        shadow: "0 24px 70px rgba(0,0,0,0.42)",
      },
      labels: {
        battery: "Battery",
        range: "km range",
        power: "Power",
        outside: "Outside",
        inside: "Inside",
        battery_temp: "Battery Temp",
        soh: "SOH",
        capacity: "Capacity",
        consumption: "Consumption",
        driving_time: "Driving Time",
        elevation: "Elevation",
        dc_fast_charge: "DC Fast Charge",
        key_battery: "Key Battery",
        latitude: "Latitude",
        longitude: "Longitude",
        last_update: "Last Update",
      },
      show: {
        brand: true,
        image: true,
        overview: true,
        stats: true,
        bars: true,
        controls: true,
        expanded: true,
        tyres: true,
        battery_detail: true,
        climate: true,
        lights: true,
        body: true,
        charging_detail: true,
        diagnostics: true,
        gps: false,
        last_update: true,
      },
      entities: {},
    };
    this._openSections = this._openSections || {};
    this.config = {
      ...defaults,
      ...config,
      theme: { ...defaults.theme, ...(config.theme || {}) },
      labels: { ...defaults.labels, ...(config.labels || {}) },
      show: { ...defaults.show, ...(config.show || {}) },
      entities: { ...(config.entities || {}) },
    };
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  entity(key) {
    const p = this.config.entity_prefix;
    const custom = this.config.entities || {};
    const defaults = {
      battery: `sensor.${p}_battery_percentage`,
      range: `sensor.${p}_ev_range`,
      speed: `sensor.${p}_speed`,
      odometer: `sensor.${p}_odometer`,
      power: `sensor.${p}_power`,
      outside: `sensor.${p}_outside_temperature`,
      inside: `sensor.${p}_inside_temperature`,
      battery_temp: `sensor.${p}_battery_temperature`,
      soh: `sensor.${p}_battery_health`,
      capacity: `sensor.${p}_battery_capacity`,
      consumption: `sensor.${p}_consumption_50km`,
      driving_time: `sensor.${p}_driving_time`,
      elevation: `sensor.${p}_elevation`,
      latitude: `sensor.${p}_latitude`,
      longitude: `sensor.${p}_longitude`,
      last_update: `sensor.${p}_utc`,
      gear: `sensor.${p}_gear`,
      online: `binary_sensor.${p}_online`,
      charging: `binary_sensor.${p}_charging`,
      parked: `binary_sensor.${p}_parked`,
      dcfc: `binary_sensor.${p}_dc_fast_charging`,
      key_battery: `binary_sensor.${p}_key_battery_low`,
      location: `device_tracker.${p}_location`,

      hv_pack_v: `sensor.${p}_hv_pack_voltage`,
      cell_v_max: `sensor.${p}_cell_voltage_max`,
      cell_v_min: `sensor.${p}_cell_voltage_min`,
      cell_v_delta: `sensor.${p}_cell_voltage_delta`,
      cell_t_max: `sensor.${p}_cell_temperature_max`,
      cell_t_min: `sensor.${p}_cell_temperature_min`,
      cell_t_avg: `sensor.${p}_cell_temperature_average`,
      cell_t_delta: `sensor.${p}_cell_temperature_delta`,
      volt_12v: `sensor.${p}_12v_battery_voltage`,
      batt_12v_level: `sensor.${p}_12v_battery_level`,

      tyre_p_fl: `sensor.${p}_front_left_tyre_pressure`,
      tyre_p_fr: `sensor.${p}_front_right_tyre_pressure`,
      tyre_p_rl: `sensor.${p}_rear_left_tyre_pressure`,
      tyre_p_rr: `sensor.${p}_rear_right_tyre_pressure`,
      tyre_t_fl: `sensor.${p}_front_left_tyre_temperature`,
      tyre_t_fr: `sensor.${p}_front_right_tyre_temperature`,
      tyre_t_rl: `sensor.${p}_rear_left_tyre_temperature`,
      tyre_t_rr: `sensor.${p}_rear_right_tyre_temperature`,
      tyre_system_state: `sensor.${p}_tyre_system_state`,
      tyre_temp_state: `sensor.${p}_tyre_temperature_state`,

      ac_on: `binary_sensor.${p}_ac_on`,
      ac_cycle: `sensor.${p}_ac_cycle`,
      ac_wind: `sensor.${p}_ac_wind`,
      ac_fan: `sensor.${p}_ac_fan`,
      temp_unit: `sensor.${p}_temperature_unit`,

      light_low_beam: `binary_sensor.${p}_low_beam`,
      light_high_beam: `binary_sensor.${p}_high_beam`,
      light_rear_fog: `binary_sensor.${p}_rear_fog_light`,
      light_front_fog: `binary_sensor.${p}_front_fog_light`,
      light_hazard: `binary_sensor.${p}_hazard_lights`,
      light_drl: `binary_sensor.${p}_daytime_running_lights`,

      door_lock: `sensor.${p}_door_lock`,
      window_open: `sensor.${p}_window_open`,
      sunroof_state: `sensor.${p}_sunroof_state`,
      sunroof_pos: `sensor.${p}_sunroof_position`,
      seat_heat: `sensor.${p}_seat_heat`,
      seat_cool: `sensor.${p}_seat_cool`,
      seatbelt: `sensor.${p}_seatbelt`,

      charging_state: `sensor.${p}_charging_state`,
      charger_state: `sensor.${p}_charger_state`,
      charging_mode: `sensor.${p}_charging_mode`,
      charging_gun: `sensor.${p}_charging_gun`,
      charging_type: `sensor.${p}_charging_type`,
      charging_v2l: `binary_sensor.${p}_v2l`,

      accel_pct: `sensor.${p}_accelerator_percent`,
      brake_pct: `sensor.${p}_brake_percent`,
      steering_deg: `sensor.${p}_steering_angle`,
      energy_mode: `sensor.${p}_energy_mode`,
      op_mode: `sensor.${p}_operation_mode`,
      total_elec_con: `sensor.${p}_total_electric_consumption`,
      power_level: `sensor.${p}_power_level`,
      mcu_status: `sensor.${p}_mcu_status`,
      radar_distances: `sensor.${p}_radar_distances`,
      speed_limit_warning: `binary_sensor.${p}_speed_limit_warning`,
      key_start_state: `sensor.${p}_key_start_state`,

      ac_button_on: `button.${p}_turn_on_ac`,
      ac_button_off: `button.${p}_turn_off_ac`,
      lock_entity: `lock.${p}_door_lock`,
      trunk_button: `button.${p}_open_trunk`,
      honk_button: `button.${p}_honk_horn`,
      lights_button: `button.${p}_flash_lights`,
      windows_open_button: `button.${p}_open_windows`,
      windows_close_button: `button.${p}_close_windows`,
      climate_entity: `climate.${p}_ac`,
    };
    return custom[key] || defaults[key];
  }

  stateObj(key) { return this._hass?.states?.[this.entity(key)]; }
  value(key, fallback = "—") { return this.stateObj(key)?.state ?? fallback; }
  isOn(key) { return this.stateObj(key)?.state === "on"; }
  exists(key) { return !!this.stateObj(key); }

  callService(entityId, domain, service) {
    if (!this._hass || !entityId) return;
    this._hass.callService(domain, service, { entity_id: entityId });
  }

  pressButton(key) {
    const entityId = this.entity(key);
    if (this._hass?.states?.[entityId]) this.callService(entityId, "button", "press");
  }

  toggleLock(action) {
    const entityId = this.entity("lock_entity");
    if (this._hass?.states?.[entityId]) this.callService(entityId, "lock", action);
  }

  prettyLocation(state) {
    if (!state || state === "unknown" || state === "unavailable") return "Unknown";
    if (state === "home") return "Home";
    if (state === "not_home") return "Away";
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  fmt(key, unit = "", fallback = "—") {
    const v = this.value(key, fallback);
    if (v === "unknown" || v === "unavailable" || v === "—") return fallback;
    return `${v}${unit}`;
  }

  hexToRgba(hex, alpha) {
    if (!hex || !hex.startsWith("#")) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  backgroundStyle() {
    const t = this.config.theme;
    if (t.background_image) return `background: linear-gradient(145deg, rgba(8,10,24,.78), rgba(18,5,31,.84)), url('${t.background_image}'); background-size: cover; background-position: center;`;
    if (t.background === "dark") return `background: linear-gradient(145deg, #10131f 0%, #17192b 100%);`;
    if (t.background === "blue") return `background: linear-gradient(145deg, #07182f 0%, #0b3567 50%, #06101f 100%);`;
    if (t.background === "purple") return `background: linear-gradient(145deg, #11143a 0%, #35105b 48%, #12051f 100%);`;
    return `background: radial-gradient(circle at 15% 20%, ${this.hexToRgba(t.secondary_color, 0.35)}, transparent 32%), radial-gradient(circle at 85% 35%, ${this.hexToRgba(t.accent_color, 0.32)}, transparent 35%), linear-gradient(145deg, #11143a 0%, #35105b 48%, #12051f 100%);`;
  }

  render() {
    if (!this._hass || !this.config) return;
    const t = this.config.theme;
    const show = this.config.show;
    const labels = this.config.labels;
    const battery = this.value("battery", "0");
    const range = this.value("range", "0");
    const speed = this.value("speed", "0");
    const odometer = this.value("odometer", "0");
    const gear = this.value("gear", "P");
    const online = this.isOn("online");
    const charging = this.isOn("charging");
    const parked = this.isOn("parked");
    const dcfc = this.isOn("dcfc");
    const acOn = this.isOn("ac_on");
    const location = this.prettyLocation(this.value("location", "unknown"));

    this.innerHTML = `
      <ha-card class="obyd-card">
        <style>${this.styles()}</style>
        <div class="wrap" style="${this.backgroundStyle()}; border-radius:${t.card_radius}; font-family:${t.font_family}; box-shadow:${t.shadow}; color:${t.text_color};">
          <div class="topbar">
            <div>
              ${show.brand ? `<div class="brand">${this.config.brand}</div>` : ""}
              <div class="title">${this.config.name}</div>
              <div class="subtitle"><span class="dot ${online ? "on" : "off"}"></span>${online ? "Online" : "Offline"} · ${location}</div>
            </div>
            <div class="pill ${charging ? "active" : ""}">${charging ? "Charging" : parked ? "Parked" : "Ready"} · ${gear}</div>
          </div>

          <div class="hero">
            <div class="batteryRing" style="--pct:${Number(battery) || 0}; --ring:${t.primary_color};">
              <div class="ringInner"><div class="big">${battery}%</div><div class="small">${labels.battery}</div></div>
            </div>
            ${show.image ? `<img class="car" src="${this.config.car_image}" />` : ""}
            <div class="range"><div class="big">${range}</div><div class="small">${labels.range}</div></div>
          </div>

          ${show.overview ? `<div class="speedrow"><div><b>${speed}</b><span> km/h</span></div><div><b>${odometer}</b><span> km</span></div><div><b>${this.fmt("power", " kW")}</b><span> power</span></div></div>` : ""}

          ${show.stats ? `<div class="grid four">
            ${this.box(labels.outside, this.fmt("outside", "°C"), "mdi:thermometer")}
            ${this.box(labels.inside, this.fmt("inside", "°C"), "mdi:home-thermometer")}
            ${this.box(labels.battery_temp, this.fmt("battery_temp", "°C"), "mdi:battery-thermometer")}
            ${this.box(labels.soh, this.fmt("soh", "%"), "mdi:battery-heart")}
          </div>` : ""}

          ${show.bars ? `<div class="bars">${this.bar(labels.battery, battery, t.primary_color)}${this.bar("Battery Health", this.value("soh", 0), t.secondary_color)}</div>` : ""}

          ${show.controls ? this.controls() : ""}

          ${show.expanded ? `<div class="sections">
            ${show.battery_detail ? this.section("Battery Detail", "mdi:battery-high", [
              ["Capacity", this.fmt("capacity", " kWh")], ["HV Pack", this.fmt("hv_pack_v", " V")], ["Cell Max", this.fmt("cell_v_max", " V")], ["Cell Min", this.fmt("cell_v_min", " V")], ["Cell Delta", this.fmt("cell_v_delta", " V")], ["Cell Avg Temp", this.fmt("cell_t_avg", "°C")], ["12V", this.fmt("volt_12v", " V")], ["12V Level", this.value("batt_12v_level")]
            ]) : ""}
            ${show.tyres ? this.tyres() : ""}
            ${show.climate ? this.section("Climate", "mdi:air-conditioner", [["AC", acOn ? "On" : "Off"], ["Fan", this.value("ac_fan")], ["Wind", this.value("ac_wind")], ["Cycle", this.value("ac_cycle")]]) : ""}
            ${show.lights ? this.lights() : ""}
            ${show.body ? this.section("Body", "mdi:car-door", [["Door Lock", this.value("door_lock")], ["Windows", this.value("window_open")], ["Sunroof", this.value("sunroof_state")], ["Sunroof Pos", this.value("sunroof_pos")], ["Seat Heat", this.value("seat_heat")], ["Seat Cool", this.value("seat_cool")]]) : ""}
            ${show.charging_detail ? this.section("Charging", "mdi:ev-plug-type2", [["Charging State", this.value("charging_state")], ["Charger State", this.value("charger_state")], ["Mode", this.value("charging_mode")], ["Gun", this.value("charging_gun")], ["Type", this.value("charging_type")], ["V2L", this.isOn("charging_v2l") ? "On" : "Off"], ["DCFC", dcfc ? "On" : "Off"]]) : ""}
            ${show.diagnostics ? this.section("Diagnostics", "mdi:chip", [["Accel", this.fmt("accel_pct", "%")], ["Brake", this.fmt("brake_pct", "%")], ["Steering", this.fmt("steering_deg", "°")], ["Energy Mode", this.value("energy_mode")], ["Op Mode", this.value("op_mode")], ["Power Level", this.value("power_level")], ["MCU", this.value("mcu_status")], ["Radar", this.value("radar_distances")]]) : ""}
            ${show.gps ? this.section("GPS", "mdi:map-marker", [[labels.latitude, this.value("latitude")], [labels.longitude, this.value("longitude")], [labels.elevation, this.fmt("elevation", " m")]]) : ""}
            ${show.last_update ? `<div class="last">${labels.last_update}: ${this.value("last_update", "unknown")}</div>` : ""}
          </div>` : ""}
        </div>
      </ha-card>`;

    this.querySelectorAll("[data-action]").forEach((el) => {
      el.addEventListener("click", () => {
        const action = el.dataset.action;
        if (action === "lock") this.toggleLock("lock");
        else if (action === "unlock") this.toggleLock("unlock");
        else this.pressButton(action);
      });
    });

    this.querySelectorAll("[data-section-toggle]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const id = el.dataset.sectionToggle;
        this._openSections = this._openSections || {};
        this._openSections[id] = !this._openSections[id];
        this.render();
      });
    });
  }

  controls() {
    const buttons = [
      ["ac_button_on", "AC On", "mdi:air-conditioner"],
      ["ac_button_off", "AC Off", "mdi:air-conditioner"],
      ["lock", "Lock", "mdi:lock"],
      ["unlock", "Unlock", "mdi:lock-open"],
      ["trunk_button", "Trunk", "mdi:car-back"],
      ["honk_button", "Horn", "mdi:bullhorn"],
      ["lights_button", "Lights", "mdi:car-light-high"],
      ["windows_close_button", "Close Windows", "mdi:window-closed"],
    ];
    return `<div class="controls">${buttons.map(([key, label, icon]) => `<button class="ctrl" data-action="${key}"><ha-icon icon="${icon}"></ha-icon><span>${label}</span></button>`).join("")}</div>`;
  }

  box(label, value, icon) { return `<div class="box"><ha-icon icon="${icon}"></ha-icon><div><span>${label}</span><b>${value}</b></div></div>`; }
  row(label, value) { return `<div class="row"><span>${label}</span><b>${value}</b></div>`; }
  bar(label, value, color) { const safe = Math.max(0, Math.min(100, Number(value) || 0)); return `<div class="bar"><div class="barTop"><span>${label}</span><b>${safe}%</b></div><div class="track"><div style="width:${safe}%;background:${color}"></div></div></div>`; }
  section(title, icon, rows, open = false) {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    const isOpen = this._openSections?.[id] ?? open;
    return `<div class="section dropdown ${isOpen ? "open" : ""}">
      <button class="sectionHead" data-section-toggle="${id}" type="button">
        <span><ha-icon icon="${icon}"></ha-icon>${title}</span>
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      <div class="sectionBody" ${isOpen ? "" : "hidden"}>${rows.map(([l, v]) => this.row(l, v)).join("")}</div>
    </div>`;
  }
  tyres() {
    const id = "tyres";
    const isOpen = this._openSections?.[id] ?? false;
    return `<div class="section dropdown ${isOpen ? "open" : ""}">
      <button class="sectionHead" data-section-toggle="${id}" type="button">
        <span><ha-icon icon="mdi:car-tire-alert"></ha-icon>Tyres</span>
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      <div class="sectionBody" ${isOpen ? "" : "hidden"}><div class="tyres"><div>${this.tyre("FL", "tyre_p_fl", "tyre_t_fl")}</div><div>${this.tyre("FR", "tyre_p_fr", "tyre_t_fr")}</div><div>${this.tyre("RL", "tyre_p_rl", "tyre_t_rl")}</div><div>${this.tyre("RR", "tyre_p_rr", "tyre_t_rr")}</div></div>${this.row("System", this.value("tyre_system_state"))}${this.row("Temp State", this.value("tyre_temp_state"))}</div>
    </div>`;
  }
  tyre(label, p, temp) { return `<b>${label}</b><span>${this.fmt(p, " kPa")}</span><small>${this.fmt(temp, "°C")}</small>`; }
  lights() { return this.section("Lights", "mdi:car-light-high", [["Low Beam", this.isOn("light_low_beam") ? "On" : "Off"], ["High Beam", this.isOn("light_high_beam") ? "On" : "Off"], ["Front Fog", this.isOn("light_front_fog") ? "On" : "Off"], ["Rear Fog", this.isOn("light_rear_fog") ? "On" : "Off"], ["Hazard", this.isOn("light_hazard") ? "On" : "Off"], ["DRL", this.isOn("light_drl") ? "On" : "Off"]]); }

  styles() { return `
    .wrap{position:relative;overflow:hidden;padding:20px;}
    .topbar{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.brand{font-size:12px;font-weight:800;letter-spacing:.18em;opacity:.7;text-transform:uppercase}.title{font-size:28px;font-weight:850;line-height:1.05}.subtitle{margin-top:6px;font-size:13px;color:var(--muted,#ffffff99)}.dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;background:#888}.dot.on{background:#20ff9f;box-shadow:0 0 12px #20ff9f}.dot.off{background:#ff4d6d}.pill{padding:9px 12px;border-radius:999px;background:rgba(255,255,255,.12);font-size:12px;font-weight:700;white-space:nowrap}.pill.active{background:rgba(0,245,160,.18)}
    .hero{display:grid;grid-template-columns:110px 1fr 90px;align-items:center;gap:8px;margin:18px 0}.car{width:100%;max-height:145px;object-fit:contain;filter:drop-shadow(0 24px 22px rgba(0,0,0,.38))}.batteryRing{width:104px;height:104px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--ring) calc(var(--pct)*1%),rgba(255,255,255,.14) 0)}.ringInner{width:82px;height:82px;border-radius:50%;display:grid;place-items:center;align-content:center;background:rgba(0,0,0,.30);backdrop-filter:blur(10px)}.big{font-size:25px;font-weight:900}.small{font-size:11px;opacity:.7}.range{text-align:right}.speedrow{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}.speedrow>div{padding:12px;border-radius:18px;background:rgba(255,255,255,.10)}.speedrow b{font-size:20px}.speedrow span{display:block;font-size:11px;opacity:.65}.grid{display:grid;gap:10px}.grid.four{grid-template-columns:repeat(4,1fr)}.box{display:flex;gap:9px;align-items:center;padding:11px;border-radius:18px;background:rgba(255,255,255,.10)}.box ha-icon{--mdc-icon-size:22px}.box span{font-size:11px;opacity:.66;display:block}.box b{font-size:14px}.bars{display:grid;gap:10px;margin-top:12px}.barTop{display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px}.track{height:9px;border-radius:999px;background:rgba(255,255,255,.13);overflow:hidden}.track div{height:100%;border-radius:999px}.controls{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:14px}.ctrl{border:none;border-radius:16px;padding:10px 8px;background:rgba(255,255,255,.13);color:inherit;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:11px;cursor:pointer}.ctrl:active{transform:scale(.97)}.ctrl ha-icon{--mdc-icon-size:21px}.sections{display:grid;gap:10px;margin-top:14px}.section{padding:0;border-radius:22px;background:rgba(255,255,255,.10);backdrop-filter:blur(12px);overflow:hidden}.sectionHead{width:100%;border:0;background:transparent;color:inherit;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px;font-size:14px;font-weight:800;text-align:left}.sectionHead span{display:flex;gap:8px;align-items:center}.sectionHead ha-icon{--mdc-icon-size:19px}.section .chevron{transition:transform .22s ease;opacity:.72}.section.open .chevron{transform:rotate(180deg)}.sectionBody{padding:0 14px 14px}.sectionBody[hidden]{display:none!important}.row{display:flex;justify-content:space-between;gap:12px;border-top:1px solid rgba(255,255,255,.08);padding:8px 0;font-size:12px}.row:first-of-type{border-top:0}.row span{opacity:.68}.row b{text-align:right;font-weight:750;word-break:break-word}.tyres{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:8px}.tyres>div{border-radius:16px;background:rgba(0,0,0,.16);padding:10px;text-align:center}.tyres b,.tyres span,.tyres small{display:block}.tyres span{font-size:13px;font-weight:800}.tyres small{opacity:.7}.last{text-align:center;font-size:11px;opacity:.65;padding:8px}@media(max-width:480px){.hero{grid-template-columns:95px 1fr}.range{grid-column:1/3;text-align:center}.grid.four,.controls{grid-template-columns:repeat(2,1fr)}.speedrow{grid-template-columns:1fr}.tyres{grid-template-columns:repeat(2,1fr)}}
  `; }

  getCardSize() { return 8; }
}

class OverdriveBYDCardEditor extends HTMLElement {
  setConfig(config) { this._config = { name: "Yuan Plus", brand: "BYD", entity_prefix: "yuan_plus", car_image: "", theme: {}, show: {}, entities: {}, ...config }; this.render(); }
  set hass(hass) { this._hass = hass; this.render(); }
  updateConfig(path, value) { const config = JSON.parse(JSON.stringify(this._config)); const parts = path.split("."); let obj = config; while (parts.length > 1) { const part = parts.shift(); obj[part] = obj[part] || {}; obj = obj[part]; } obj[parts[0]] = value; this._config = config; this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })); this.render(); }
  input(label, path, value, type="text") { return `<label>${label}<input data-path="${path}" type="${type}" value="${value ?? ""}"></label>`; }
  select(label, path, value, options) { return `<label>${label}<select data-path="${path}">${options.map(o => `<option value="${o.value}" ${o.value === value ? "selected" : ""}>${o.label}</option>`).join("")}</select></label>`; }
  checkbox(label, path, checked) { return `<label class="check"><input data-path="${path}" type="checkbox" ${checked ? "checked" : ""}>${label}</label>`; }
  render() {
    if (!this._config) return;
    const c = this._config, t = c.theme || {}, s = c.show || {};
    this.innerHTML = `<style>label{display:block;margin:10px 0;font-weight:600}input,select{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:8px}.check{display:flex;gap:8px;align-items:center}.check input{width:auto}h3{margin:18px 0 8px}</style>
      <h3>Vehicle</h3>${this.input("Vehicle Name","name",c.name)}${this.input("Brand","brand",c.brand)}${this.input("Entity Prefix","entity_prefix",c.entity_prefix)}${this.input("Car Image URL","car_image",c.car_image)}
      <h3>Appearance</h3>${this.select("Background Style","theme.background",t.background || "gradient",[{label:"Gradient",value:"gradient"},{label:"Dark",value:"dark"},{label:"Blue",value:"blue"},{label:"Purple",value:"purple"}])}${this.input("Background Image URL","theme.background_image",t.background_image || "")}${this.input("Primary Color","theme.primary_color",t.primary_color || "#00f5a0","color")}${this.input("Secondary Color","theme.secondary_color",t.secondary_color || "#38bdf8","color")}${this.input("Accent Color","theme.accent_color",t.accent_color || "#ff006e","color")}${this.input("Card Radius","theme.card_radius",t.card_radius || "34px")}${this.input("Font Family","theme.font_family",t.font_family || "inherit")}
      <h3>Layout</h3>${["brand","image","overview","stats","bars","controls","expanded","battery_detail","tyres","climate","lights","body","charging_detail","diagnostics","gps","last_update"].map(k => this.checkbox(`Show ${k.replaceAll("_"," ")}`,`show.${k}`,s[k] !== false && (k !== "gps" || s[k] === true))).join("")}`;
    this.querySelectorAll("input,select").forEach(el => el.addEventListener("change", ev => { const input = ev.target; this.updateConfig(input.dataset.path, input.type === "checkbox" ? input.checked : input.value); }));
  }
}

customElements.define("overdrive-byd-card", OverdriveBYDCard);
customElements.define("overdrive-byd-card-editor", OverdriveBYDCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({ type: "overdrive-byd-card", name: "Overdrive BYD Card", description: "Dashboard card for Overdrive BYD MQTT telemetry and controls" });
