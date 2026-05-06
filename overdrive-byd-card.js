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
        stats: true,
        bars: true,
        details: true,
        gps: false,
        last_update: true,
        icons: true,
        brand: true,
        image: true,
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
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this.config = {
      name: "Yuan Plus",
      brand: "BYD",
      entity_prefix: "yuan_plus",
      car_image:
        "https://i.ibb.co/WW2DXV5k/Chat-GPT-Image-May-4-2026-09-46-11-AM-removebg-preview-1.png",
      theme: {
        background: "gradient",
        background_image: "",
        primary_color: "#00f5a0",
        secondary_color: "#38bdf8",
        accent_color: "#ff006e",
        text_color: "#ffffff",
        muted_text_color: "rgba(255,255,255,.62)",
        card_radius: "34px",
        inner_radius: "28px",
        font_family: "inherit",
        shadow: "0 24px 60px rgba(0,0,0,0.40)",
      },
      labels: {
        battery: "Battery",
        range: "km range",
        power: "Power",
        outside: "Outside",
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
        stats: true,
        bars: true,
        details: true,
        icons: true,
        gps: false,
        last_update: true,
        brand: true,
        image: true,
      },
      entities: {},
      ...config,
      theme: {
        ...(this.config?.theme || {}),
        ...(config.theme || {}),
      },
      labels: {
        battery: "Battery",
        range: "km range",
        power: "Power",
        outside: "Outside",
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
        ...(config.labels || {}),
      },
      show: {
        stats: true,
        bars: true,
        details: true,
        icons: true,
        gps: false,
        last_update: true,
        brand: true,
        image: true,
        ...(config.show || {}),
      },
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
    };

    return custom[key] || defaults[key];
  }

  value(key, fallback = "0") {
    const entity = this.entity(key);
    return this._hass?.states?.[entity]?.state ?? fallback;
  }

  isOn(key) {
    return this._hass?.states?.[this.entity(key)]?.state === "on";
  }

  prettyLocation(state) {
    if (!state || state === "unknown" || state === "unavailable") return "Unknown";
    if (state === "home") return "Home";
    if (state === "not_home") return "Away";
    return state.charAt(0).toUpperCase() + state.slice(1);
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

    if (t.background_image) {
      return `
        background:
          linear-gradient(145deg, rgba(10,10,24,.78), rgba(18,5,31,.82)),
          url('${t.background_image}');
        background-size: cover;
        background-position: center;
      `;
    }

    if (t.background === "dark") {
      return `background: linear-gradient(145deg, #10131f 0%, #17192b 100%);`;
    }

    if (t.background === "blue") {
      return `background: linear-gradient(145deg, #07182f 0%, #0b3567 50%, #06101f 100%);`;
    }

    if (t.background === "purple") {
      return `background: linear-gradient(145deg, #11143a 0%, #35105b 48%, #12051f 100%);`;
    }

    return `
      background:
        radial-gradient(circle at 15% 20%, ${this.hexToRgba(t.secondary_color, 0.35)}, transparent 32%),
        radial-gradient(circle at 85% 35%, ${this.hexToRgba(t.accent_color, 0.32)}, transparent 35%),
        radial-gradient(circle at 50% 100%, rgba(251,86,7,0.22), transparent 36%),
        linear-gradient(145deg, #11143a 0%, #35105b 48%, #12051f 100%);
    `;
  }

  render() {
    if (!this._hass || !this.config) return;

    const t = this.config.theme;
    const labels = this.config.labels;
    const show = this.config.show;

    const battery = this.value("battery");
    const range = this.value("range");
    const speed = this.value("speed");
    const odometer = this.value("odometer");
    const gear = this.value("gear", "P");

    const online = this.isOn("online");
    const charging = this.isOn("charging");
    const parked = this.isOn("parked");
    const dcfc = this.isOn("dcfc");
    const keyLow = this.isOn("key_battery");

    const location = this.prettyLocation(this.value("location", "unknown"));

    this.innerHTML = `
      <ha-card>
        <div class="obyd-card">
          <div class="top">
            <div>
              ${show.brand ? `<div class="brand">${this.config.brand}</div>` : ""}
              <div class="title">${this.config.name}</div>
            </div>

            <div class="pills">
              <div class="pill ${online ? "active" : ""}">
                ${online ? "Online" : "Offline"} · ${location}
              </div>
              <div class="pill">
                ${charging ? "Charging" : parked ? "Parked" : "Ready"} · ${gear}
              </div>
            </div>
          </div>

          <div class="hero">
            <div class="battery">
              ${battery}<span>%</span>
              <div>${labels.battery}</div>
            </div>

            <div class="range">
              ${range}
              <div>${labels.range}</div>
            </div>

            ${show.image ? `<img class="car" src="${this.config.car_image}">` : ""}

            <div class="speed">${speed} km/h</div>
            <div class="odo">${odometer} km</div>
          </div>

          ${
            show.stats
              ? `
            <div class="stats">
              ${this.box(labels.power, `${this.value("power")} kW`)}
              ${this.box(labels.outside, `${this.value("outside")}°C`)}
              ${this.box(labels.battery_temp, `${this.value("battery_temp")}°C`)}
              ${this.box(labels.soh, `${this.value("soh")}%`)}
            </div>
          `
              : ""
          }

          ${
            show.bars
              ? `
            ${this.bar(labels.battery, battery, t.primary_color)}
            ${this.bar("Battery Health", this.value("soh"), t.secondary_color)}
          `
              : ""
          }

          ${
            show.details
              ? `
            <div class="details">
              ${this.row(labels.capacity, `${this.value("capacity")} kWh`)}
              ${this.row(labels.consumption, `${this.value("consumption")} kWh/100km`)}
              ${this.row(labels.driving_time, `${this.value("driving_time")} h`)}
              ${this.row(labels.elevation, `${this.value("elevation")} m`)}
              ${this.row(labels.dc_fast_charge, dcfc ? "On" : "Off")}
              ${this.row(labels.key_battery, keyLow ? "Low" : "Normal")}

              ${
                show.gps
                  ? `
                ${this.row(labels.latitude, this.value("latitude"))}
                ${this.row(labels.longitude, this.value("longitude"))}
              `
                  : ""
              }

              ${
                show.last_update
                  ? `
                <div class="last">
                  <div>${labels.last_update}</div>
                  <strong>${this.value("last_update", "unknown")}</strong>
                </div>
              `
                  : ""
              }
            </div>
          `
              : ""
          }

          ${
            show.icons
              ? `
            <div class="icons">
              ${this.icon(charging ? "Charging" : "Not Charging", "mdi:ev-station", charging)}
              ${this.icon(parked ? "Parked" : "Moving", parked ? "mdi:car-brake-parking" : "mdi:car", parked)}
              ${this.icon(online ? "Online" : "Offline", online ? "mdi:wifi" : "mdi:wifi-off", online)}
              ${this.icon(dcfc ? "DCFC On" : "DCFC Off", "mdi:lightning-bolt", dcfc)}
            </div>
          `
              : ""
          }
        </div>
      </ha-card>

      <style>
        ha-card {
          border-radius: ${t.card_radius};
          overflow: hidden;
          background: transparent;
          font-family: ${t.font_family};
        }

        .obyd-card {
          padding: 18px;
          color: ${t.text_color};
          border-radius: ${t.card_radius};
          ${this.backgroundStyle()}
          box-shadow: ${t.shadow};
          border: 1px solid rgba(255,255,255,0.16);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .brand {
          font-size: 14px;
          color: ${t.muted_text_color};
          font-weight: 600;
        }

        .title {
          font-size: 28px;
          font-weight: 800;
        }

        .pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .pill {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.10);
          border: 1px solid rgba(255,255,255,.14);
          font-size: 12px;
          font-weight: 800;
        }

        .pill.active {
          background: ${this.hexToRgba(t.primary_color, 0.18)};
          border-color: ${this.hexToRgba(t.primary_color, 0.45)};
        }

        .hero {
          position: relative;
          min-height: 320px;
          border-radius: ${t.inner_radius};
          padding: 22px;
          background: rgba(255,255,255,.075);
          border: 1px solid rgba(255,255,255,.14);
          overflow: hidden;
          backdrop-filter: blur(18px);
          margin-bottom: 14px;
        }

        .battery {
          position: absolute;
          left: 24px;
          top: 22px;
          z-index: 2;
          font-size: 78px;
          font-weight: 900;
        }

        .battery span {
          font-size: 40px;
        }

        .battery div,
        .range div {
          font-size: 16px;
          color: ${t.muted_text_color};
          font-weight: 400;
        }

        .range {
          position: absolute;
          right: 24px;
          top: 34px;
          z-index: 2;
          text-align: right;
          font-size: 36px;
          font-weight: 700;
        }

        .range div {
          font-size: 13px;
        }

        .car {
          position: absolute;
          left: 50%;
          top: 55%;
          transform: translate(-50%, -50%);
          width: 108%;
          max-height: 260px;
          object-fit: contain;
          filter: drop-shadow(0 30px 30px rgba(0,0,0,.5));
        }

        .speed,
        .odo {
          position: absolute;
          bottom: 22px;
          font-size: 20px;
          font-weight: 700;
        }

        .speed {
          left: 24px;
        }

        .odo {
          right: 24px;
        }

        .stats,
        .icons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }

        .box,
        .icon,
        .row,
        .last {
          border-radius: 18px;
          padding: 12px 14px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.10);
          min-width: 0;
        }

        .box div:first-child,
        .row div:first-child,
        .last div:first-child {
          font-size: 11px;
          color: ${t.muted_text_color};
        }

        .box strong,
        .row strong,
        .last strong {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }

        .bar {
          margin-bottom: 12px;
        }

        .bar-top {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: ${t.muted_text_color};
          margin-bottom: 4px;
        }

        .bar-bg {
          height: 10px;
          background: rgba(255,255,255,.12);
          border-radius: 999px;
        }

        .bar-fill {
          height: 100%;
          border-radius: 999px;
        }

        .details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }

        .last {
          grid-column: 1 / -1;
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.14);
        }

        .icon {
          text-align: center;
        }

        .icon.active {
          background: ${this.hexToRgba(t.primary_color, 0.14)};
          border-color: ${this.hexToRgba(t.primary_color, 0.35)};
        }

        .icon ha-icon {
          width: 24px;
          height: 24px;
        }

        .icon div {
          font-size: 11px;
          margin-top: 6px;
        }

        @media (max-width: 500px) {
          .stats,
          .icons {
            grid-template-columns: repeat(2, 1fr);
          }

          .top {
            align-items: flex-start;
            flex-direction: column;
          }

          .pills {
            justify-content: flex-start;
          }

          .title {
            font-size: 24px;
          }

          .battery {
            font-size: 62px;
          }

          .battery span {
            font-size: 32px;
          }
        }
      </style>
    `;
  }

  box(label, value) {
    return `
      <div class="box">
        <div>${label}</div>
        <strong>${value}</strong>
      </div>
    `;
  }

  row(label, value) {
    return `
      <div class="row">
        <div>${label}</div>
        <strong>${value}</strong>
      </div>
    `;
  }

  bar(label, value, color) {
    const safe = Math.max(0, Math.min(100, Number(value) || 0));
    return `
      <div class="bar">
        <div class="bar-top">
          <span>${label}</span>
          <span>${safe}%</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width:${safe}%; background:${color};"></div>
        </div>
      </div>
    `;
  }

  icon(label, icon, active) {
    return `
      <div class="icon ${active ? "active" : ""}">
        <ha-icon icon="${icon}"></ha-icon>
        <div>${label}</div>
      </div>
    `;
  }

  getCardSize() {
    return 6;
  }
}

class OverdriveBYDCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = {
      name: "Yuan Plus",
      brand: "BYD",
      entity_prefix: "yuan_plus",
      car_image: "",
      theme: {},
      show: {},
      entities: {},
      ...config,
    };

    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  updateConfig(path, value) {
    const config = JSON.parse(JSON.stringify(this._config));
    const parts = path.split(".");
    let obj = config;

    while (parts.length > 1) {
      const part = parts.shift();
      obj[part] = obj[part] || {};
      obj = obj[part];
    }

    obj[parts[0]] = value;
    this._config = config;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );

    this.render();
  }

  input(label, path, value, type = "text") {
    return `
      <label>
        <span>${label}</span>
        <input type="${type}" value="${value ?? ""}" data-path="${path}">
      </label>
    `;
  }

  select(label, path, value, options) {
    return `
      <label>
        <span>${label}</span>
        <select data-path="${path}">
          ${options
            .map(
              (option) =>
                `<option value="${option.value}" ${
                  option.value === value ? "selected" : ""
                }>${option.label}</option>`
            )
            .join("")}
        </select>
      </label>
    `;
  }

  checkbox(label, path, checked) {
    return `
      <label class="check">
        <span>${label}</span>
        <input type="checkbox" ${checked ? "checked" : ""} data-path="${path}">
      </label>
    `;
  }

  render() {
    if (!this._config) return;

    const c = this._config;
    const t = c.theme || {};
    const s = c.show || {};

    this.innerHTML = `
      <div class="editor">
        <h3>Vehicle</h3>
        ${this.input("Vehicle Name", "name", c.name)}
        ${this.input("Brand", "brand", c.brand)}
        ${this.input("Entity Prefix", "entity_prefix", c.entity_prefix)}
        ${this.input("Car Image URL", "car_image", c.car_image)}

        <h3>Appearance</h3>
        ${this.select("Background Style", "theme.background", t.background || "gradient", [
          { label: "Gradient", value: "gradient" },
          { label: "Dark", value: "dark" },
          { label: "Blue", value: "blue" },
          { label: "Purple", value: "purple" },
        ])}
        ${this.input("Background Image URL", "theme.background_image", t.background_image || "")}
        ${this.input("Primary Color", "theme.primary_color", t.primary_color || "#00f5a0", "color")}
        ${this.input("Secondary Color", "theme.secondary_color", t.secondary_color || "#38bdf8", "color")}
        ${this.input("Accent Color", "theme.accent_color", t.accent_color || "#ff006e", "color")}
        ${this.input("Card Radius", "theme.card_radius", t.card_radius || "34px")}
        ${this.input("Font Family", "theme.font_family", t.font_family || "inherit")}

        <h3>Layout</h3>
        ${this.checkbox("Show Brand", "show.brand", s.brand !== false)}
        ${this.checkbox("Show Car Image", "show.image", s.image !== false)}
        ${this.checkbox("Show Stats", "show.stats", s.stats !== false)}
        ${this.checkbox("Show Battery Bars", "show.bars", s.bars !== false)}
        ${this.checkbox("Show Details", "show.details", s.details !== false)}
        ${this.checkbox("Show GPS Details", "show.gps", s.gps === true)}
        ${this.checkbox("Show Last Update", "show.last_update", s.last_update !== false)}
        ${this.checkbox("Show Status Icons", "show.icons", s.icons !== false)}
      </div>

      <style>
        .editor {
          display: grid;
          gap: 14px;
          padding: 8px 0;
        }

        h3 {
          margin: 18px 0 0;
          font-size: 16px;
          font-weight: 700;
        }

        label {
          display: grid;
          gap: 6px;
        }

        label span {
          font-size: 13px;
          font-weight: 600;
          opacity: .8;
        }

        input,
        select {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--divider-color);
          background: var(--card-background-color);
          color: var(--primary-text-color);
        }

        .check {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .check input {
          width: auto;
        }
      </style>
    `;

    this.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("change", (ev) => {
        const input = ev.target;
        const value = input.type === "checkbox" ? input.checked : input.value;
        this.updateConfig(input.dataset.path, value);
      });
    });
  }
}

customElements.define("overdrive-byd-card", OverdriveBYDCard);
customElements.define("overdrive-byd-card-editor", OverdriveBYDCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "overdrive-byd-card",
  name: "Overdrive BYD Card",
  description:
    "Highly customizable dashboard card for Overdrive BYD MQTT vehicle telemetry",
});