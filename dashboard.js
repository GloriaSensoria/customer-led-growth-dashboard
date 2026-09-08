const DATA = {
  meta: {
    title: "Customer-Led Growth Dashboard",
    subtitle: "Week 1 · Customer-Led Growth Academy · Sep 8, 2026",
    quarter: "Q3 2026",
    lastUpdated: "Sep 8, 2026",
    period: "This Quarter",
    source: "Horizon top 50 accounts · book as of Sep 8, 2026",
  },
  kpis: [
    { label: "NRR", value: "105%", target: "Target: ≥ 115%", delta: "−10pp vs. target", met: false, accent: "orange" },
    { label: "GRR", value: "78%", target: "Target: ≥ 90%", delta: "−12pp vs. target", met: false, accent: "teal" },
    { label: "EXPANSION ARR", value: "+27%", target: "met target", delta: "+2pp vs. target", met: true, accent: "green" },
    { label: "UPSELL CONV", value: "61%", target: "Target: ≥ 50%", delta: "+11pp vs. target", met: true, accent: "teal" },
    { label: "LOGO RETENTION", value: "80%", target: "Target: ≥ 92%", delta: "−12pp vs. target", met: false, accent: "orange" },
  ],
  expansionByQuarter: [
    { quarter: "Q4 '26", upside: 1235000 },
    { quarter: "Q1 '27", upside: 852000 },
    { quarter: "Q2 '27", upside: 1320000 },
    { quarter: "Q3 '27", upside: 920000 },
  ],
  retentionByMonth: [
    { month: "Oct", grr: 23.8, nrr: 23.8 },
    { month: "Nov", grr: 34.4, nrr: 34.4 },
    { month: "Dec", grr: 68.2, nrr: 68.2 },
    { month: "Jan", grr: 100.0, nrr: 100.0 },
    { month: "Feb", grr: 100.0, nrr: 135.4 },
    { month: "Mar", grr: 100.0, nrr: 141.9 },
  ],
  programs: [
    { name: "Onboarding accelerator", status: "Active", accounts: 20, growthKpi: "GRR + activation", kpiImpact: "9 of 20 activated", health: "Amber" },
    { name: "Customer Advisory Board", status: "Active", accounts: 14, growthKpi: "Expansion + references", kpiImpact: "$1.9M influenced", health: "Green" },
    { name: "Expansion play (Seat-Surge)", status: "Active", accounts: 13, growthKpi: "Expansion ARR", kpiImpact: "+19% ARR", health: "Green" },
    { name: "Win-back (Save-the-Renewal)", status: "Active", accounts: 10, growthKpi: "Retention / NRR", kpiImpact: "0 of 10 saved", health: "Amber" },
    { name: "Advocacy council", status: "Pilot", accounts: 9, growthKpi: "Expansion + references", kpiImpact: "7 case studies", health: "Green" },
  ],
  campaigns: [
    {
      category: "EXPANSION",
      name: "Seat-Surge Campaign",
      metrics: [
        { label: "Engaged", value: "13" },
        { label: "Upsell rate", value: "69%" },
        { label: "ARR influenced", value: "$1.97M" },
      ],
    },
    {
      category: "RETENTION",
      name: "Save-the-Renewal",
      metrics: [
        { label: "At-risk", value: "10" },
        { label: "Saved", value: "0" },
        { label: "NRR impact", value: "−22pp" },
      ],
    },
    {
      category: "ADVOCACY",
      name: "Customer Advisory Board",
      metrics: [
        { label: "Members", value: "14" },
        { label: "References", value: "4" },
        { label: "ARR influenced", value: "$1.9M" },
      ],
    },
    {
      category: "ONBOARDING",
      name: "First-Value in 14",
      metrics: [
        { label: "New accounts", value: "20" },
        { label: "Activation", value: "45%" },
        { label: "GRR impact", value: "−22pp" },
      ],
    },
  ],
  channels: [
    { channel: "Email", accounts: 50 },
    { channel: "In-app", accounts: 27 },
    { channel: "Community", accounts: 7 },
    { channel: "Events", accounts: 8 },
    { channel: "1:1 Outreach", accounts: 10 },
  ],
  contribution: [
    { program: "Onboard", retention: 10, expansionK: 95 },
    { program: "CAB", retention: 14, expansionK: 1900 },
    { program: "Expansion", retention: 13, expansionK: 1825 },
    { program: "Win-back", retention: 0, expansionK: 0 },
    { program: "Advocacy", retention: 9, expansionK: 700 },
  ],
};

const TEAL = "#1e4d40";
const ORANGE = "#e08a45";
const GRID = "#e4e4e7";

function moneyAxis(value) {
  if (value >= 1_000_000) return `$${value / 1_000_000}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content;
}

function renderPage() {
  const root = document.getElementById("app");
  const { meta } = DATA;
  root.append(
    el(`
      <header class="header">
        <div>
          <h1>${meta.title}</h1>
          <p class="subtitle">${meta.subtitle}</p>
        </div>
        <div class="header-meta">
          <span class="badge">${meta.quarter}</span>
          <span class="meta-text">Last updated: ${meta.lastUpdated}</span>
          <button class="period-btn" type="button">Period: ${meta.period}</button>
        </div>
      </header>
    `),
  );

  const kpiWrap = document.createElement("section");
  kpiWrap.className = "kpi-grid";
  kpiWrap.innerHTML = DATA.kpis
    .map(
      (kpi) => `
      <article class="kpi-card accent-${kpi.accent}">
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-value">${kpi.value}</div>
        <div class="kpi-target">${kpi.target}</div>
        <div class="kpi-pill${kpi.met ? "" : " miss"}">${kpi.delta}</div>
      </article>`,
    )
    .join("");
  root.append(kpiWrap);

  const trends = document.createElement("section");
  trends.className = "section";
  trends.innerHTML = `
    <div class="section-head">
      <div class="section-kicker"><h2>Growth Metrics & Trends</h2></div>
    </div>
    <div class="chart-grid">
      <div class="chart-card">
        <h3>Expansion ARR contribution by quarter</h3>
        <p>ARR upside sitting on the renewal calendar</p>
        <div id="expansion-chart"></div>
        <p class="chart-caption">Source: ${meta.source}</p>
      </div>
      <div class="chart-card">
        <h3>NRR vs. GRR trend</h3>
        <p>Net & gross revenue retention by upcoming renewal month</p>
        <div class="legend">
          <span><i class="swatch" style="background:${ORANGE}"></i> NRR</span>
          <span><i class="swatch" style="background:${TEAL}"></i> GRR</span>
        </div>
        <div id="retention-chart"></div>
        <p class="chart-caption">Source: ${meta.source} · renewal-month cohorts</p>
      </div>
    </div>`;
  root.append(trends);

  const table = document.createElement("section");
  table.className = "section";
  table.innerHTML = `
    <div class="section-head">
      <div class="section-kicker"><h2>Customer Program Tracker</h2></div>
      <div class="section-note">${DATA.programs.length} programs tracked</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>PROGRAM</th><th>STATUS</th><th>ACCOUNTS</th>
          <th>GROWTH KPI</th><th>KPI IMPACT</th><th>HEALTH</th>
        </tr>
      </thead>
      <tbody>
        ${DATA.programs
          .map(
            (program) => `
          <tr>
            <td class="program">${program.name}</td>
            <td><span class="pill ${program.status === "Active" ? "active" : "pilot"}">${program.status}</span></td>
            <td>${program.accounts}</td>
            <td>${program.growthKpi}</td>
            <td>${program.kpiImpact}</td>
            <td><span class="health"><i class="dot${program.health === "Amber" ? " amber" : ""}"></i>${program.health}</span></td>
          </tr>`,
          )
          .join("")}
      </tbody>
    </table>`;
  root.append(table);

  const campaigns = document.createElement("section");
  campaigns.className = "section bare";
  campaigns.innerHTML = `
    <div class="section-head">
      <div class="section-kicker"><h2>Active Campaigns</h2></div>
      <div class="section-note">${DATA.campaigns.length} active campaigns</div>
    </div>
    <div class="campaigns">
      ${DATA.campaigns
        .map(
          (campaign) => `
        <article class="campaign-card">
          <div class="campaign-cat">${campaign.category}</div>
          <h3>${campaign.name}</h3>
          ${campaign.metrics
            .map(
              (metric) => `
            <div class="metric-row"><span>${metric.label}</span><span>${metric.value}</span></div>`,
            )
            .join("")}
        </article>`,
        )
        .join("")}
    </div>`;
  root.append(campaigns);

  const bottom = document.createElement("section");
  bottom.className = "section";
  bottom.innerHTML = `
    <div class="chart-grid">
      <div class="chart-card">
        <h3>Engagement by channel</h3>
        <p>Accounts reached across active campaigns</p>
        <div id="channel-chart"></div>
        <p class="chart-caption">Source: ${meta.source} · inferred from engagement status and notes</p>
      </div>
      <div class="chart-card">
        <h3>Growth contribution by program</h3>
        <p>Retention accounts and expansion revenue ($100K)</p>
        <div class="legend">
          <span><i class="swatch" style="background:${TEAL}"></i> Retention (accounts)</span>
          <span><i class="swatch" style="background:${ORANGE}"></i> Expansion ($100K)</span>
        </div>
        <div id="contribution-chart"></div>
        <p class="chart-caption">Source: ${meta.source}</p>
      </div>
    </div>`;
  root.append(bottom);

  drawVerticalBars("expansion-chart", DATA.expansionByQuarter, {
    xKey: "quarter",
    yKey: "upside",
    color: TEAL,
    yFormat: moneyAxis,
    yMax: 1500000,
  });
  drawArea("retention-chart", DATA.retentionByMonth);
  drawHorizontalBars("channel-chart", DATA.channels);
  drawGroupedBars("contribution-chart", DATA.contribution);
}

function svgEl(name, attrs) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
}

function drawVerticalBars(id, rows, { xKey, yKey, color, yFormat, yMax }) {
  const host = document.getElementById(id);
  const width = 560;
  const height = 250;
  const left = 48;
  const right = 12;
  const top = 12;
  const bottom = 32;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const max = yMax || Math.max(...rows.map((row) => row[yKey])) * 1.15;
  const barW = plotW / rows.length * 0.42;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg" });

  for (let i = 0; i <= 4; i += 1) {
    const value = (max / 4) * i;
    const y = top + plotH - (value / max) * plotH;
    svg.appendChild(svgEl("line", { x1: left, x2: width - right, y1: y, y2: y, stroke: GRID }));
    const label = svgEl("text", { x: left - 8, y: y + 4, "text-anchor": "end" });
    label.textContent = yFormat(value);
    svg.appendChild(label);
  }

  rows.forEach((row, index) => {
    const x = left + (plotW / rows.length) * (index + 0.5) - barW / 2;
    const h = (row[yKey] / max) * plotH;
    const y = top + plotH - h;
    const bar = svgEl("rect", { x, y, width: barW, height: Math.max(h, 0), rx: 4, fill: color });
    const tip = svgEl("title", {});
    tip.textContent = `${row[xKey]}: ${yFormat(row[yKey])}`;
    bar.appendChild(tip);
    svg.appendChild(bar);
    const tick = svgEl("text", { x: x + barW / 2, y: height - 8, "text-anchor": "middle" });
    tick.textContent = row[xKey];
    svg.appendChild(tick);
  });
  host.appendChild(svg);
}

function drawArea(id, rows) {
  const host = document.getElementById(id);
  const width = 560;
  const height = 240;
  const left = 44;
  const right = 12;
  const top = 10;
  const bottom = 28;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const max = 160;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg" });

  const xAt = (i) => left + (plotW * i) / (rows.length - 1);
  const yAt = (v) => top + plotH - (v / max) * plotH;

  for (let i = 0; i <= 4; i += 1) {
    const value = (max / 4) * i;
    const y = yAt(value);
    svg.appendChild(svgEl("line", { x1: left, x2: width - right, y1: y, y2: y, stroke: GRID }));
    const label = svgEl("text", { x: left - 8, y: y + 4, "text-anchor": "end" });
    label.textContent = `${value}%`;
    svg.appendChild(label);
  }

  function seriesPath(key) {
    return rows.map((row, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(row[key])}`).join(" ");
  }
  function areaPath(key) {
    return `${seriesPath(key)} L${xAt(rows.length - 1)},${yAt(0)} L${xAt(0)},${yAt(0)} Z`;
  }

  svg.appendChild(svgEl("path", { d: areaPath("nrr"), fill: ORANGE, "fill-opacity": 0.18, stroke: "none" }));
  svg.appendChild(svgEl("path", { d: areaPath("grr"), fill: TEAL, "fill-opacity": 0.12, stroke: "none" }));
  svg.appendChild(svgEl("path", { d: seriesPath("nrr"), fill: "none", stroke: ORANGE, "stroke-width": 3 }));
  svg.appendChild(svgEl("path", { d: seriesPath("grr"), fill: "none", stroke: TEAL, "stroke-width": 3 }));

  rows.forEach((row, i) => {
    svg.appendChild(svgEl("circle", { cx: xAt(i), cy: yAt(row.nrr), r: 3.5, fill: ORANGE }));
    svg.appendChild(svgEl("circle", { cx: xAt(i), cy: yAt(row.grr), r: 3.5, fill: TEAL }));
    const tick = svgEl("text", { x: xAt(i), y: height - 6, "text-anchor": "middle" });
    tick.textContent = row.month;
    svg.appendChild(tick);
  });
  host.appendChild(svg);
}

function drawHorizontalBars(id, rows) {
  const host = document.getElementById(id);
  const width = 560;
  const height = 250;
  const left = 108;
  const right = 24;
  const top = 8;
  const bottom = 24;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const max = 50;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg" });
  const rowH = plotH / rows.length;

  for (let i = 0; i <= 5; i += 1) {
    const value = (max / 5) * i;
    const x = left + (value / max) * plotW;
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: top, y2: top + plotH, stroke: GRID }));
    const label = svgEl("text", { x, y: height - 6, "text-anchor": "middle" });
    label.textContent = String(value);
    svg.appendChild(label);
  }

  rows.forEach((row, index) => {
    const y = top + rowH * index + rowH * 0.28;
    const w = (row.accounts / max) * plotW;
    svg.appendChild(svgEl("rect", { x: left, y, width: w, height: rowH * 0.44, rx: 3, fill: TEAL }));
    const name = svgEl("text", { x: left - 8, y: y + rowH * 0.32, "text-anchor": "end" });
    name.textContent = row.channel;
    svg.appendChild(name);
  });
  host.appendChild(svg);
}

function drawGroupedBars(id, rows) {
  const host = document.getElementById(id);
  const width = 560;
  const height = 250;
  const left = 36;
  const right = 12;
  const top = 12;
  const bottom = 32;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const scaled = rows.map((row) => ({ ...row, expansion: row.expansionK / 100 }));
  const max = Math.max(20, ...scaled.flatMap((row) => [row.retention, row.expansion]));
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg" });
  const groupW = plotW / rows.length;

  for (let i = 0; i <= 4; i += 1) {
    const value = (max / 4) * i;
    const y = top + plotH - (value / max) * plotH;
    svg.appendChild(svgEl("line", { x1: left, x2: width - right, y1: y, y2: y, stroke: GRID }));
    const label = svgEl("text", { x: left - 6, y: y + 4, "text-anchor": "end" });
    label.textContent = String(Math.round(value));
    svg.appendChild(label);
  }

  scaled.forEach((row, index) => {
    const cx = left + groupW * index + groupW / 2;
    const barW = 16;
    const h1 = (row.retention / max) * plotH;
    const h2 = (row.expansion / max) * plotH;
    svg.appendChild(svgEl("rect", { x: cx - barW - 2, y: top + plotH - h1, width: barW, height: h1, rx: 3, fill: TEAL }));
    svg.appendChild(svgEl("rect", { x: cx + 2, y: top + plotH - h2, width: barW, height: h2, rx: 3, fill: ORANGE }));
    const tick = svgEl("text", { x: cx, y: height - 8, "text-anchor": "middle" });
    tick.textContent = row.program;
    svg.appendChild(tick);
  });
  host.appendChild(svg);
}

renderPage();
