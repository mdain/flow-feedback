

```dataviewjs
const pages = dv.pages('"06_Logs"')
  .where(p =>
    p.task &&
    p.actor &&
    typeof p.energy === 'number' &&
    p.created
  );

dv.paragraph(`✅ Grouping ${pages.length} logs`);

const grouped = pages.groupBy(p => p.task);

for (let group of grouped) {
  const task = group.key;
  const entries = group.rows;

  const energies = Array.from(entries.map(e => e.energy)).filter(e => typeof e === 'number');
  const avgEnergy = energies.length > 0
    ? energies.reduce((a, b) => a + b, 0) / energies.length
    : 0;

  const actors = [...new Set(entries.map(e => e.actor))].join(', ');

  const latestEntry = entries
    .filter(e => e.created)
    .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))[0];

  const minutesAgo = latestEntry
    ? Math.round((Date.now() - Date.parse(latestEntry.created)) / (1000 * 60))
    : 'N/A';

  dv.header(3, task);
  dv.paragraph(
    `🔋 Avg Energy: ${avgEnergy.toFixed(1)} ` +
    `| 👤 ${actors} ` +
    `| 🕒 Last feedback: ${minutesAgo} min ago`
  );
  dv.paragraph(`🧪 Latest timestamp read: ${latestEntry.created}`);
}
```


```dataviewjs
function energyBar(energy) {
  const blocks = Math.round((energy / 100) * 10);
  const bar = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
  const danger = energy < 20 ? ' 🔻 Danger zone' : '';
  return `[${bar}] ${energy.toFixed(0)}%${danger}`;
}

const pages = dv.pages('"06_Logs"')
  .where(p =>
    p.task &&
    p.actor &&
    typeof p.energy === 'number' &&
    p.created
  );

dv.paragraph(`✅ Grouping ${pages.length} logs`);

const grouped = pages.groupBy(p => p.task);

for (let group of grouped) {
  const task = group.key;
  const entries = group.rows;

  const energies = Array.from(entries.map(e => e.energy)).filter(e => typeof e === 'number');
  const avgEnergy = energies.length > 0
    ? energies.reduce((a, b) => a + b, 0) / energies.length
    : 0;

  const actors = [...new Set(entries.map(e => e.actor))].join(', ');

  const latestEntry = entries
    .filter(e => e.created)
    .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))[0];

  const minutesAgo = latestEntry
    ? Math.round((Date.now() - Date.parse(latestEntry.created)) / (1000 * 60))
    : 'N/A';

  dv.header(3, task);
  dv.paragraph(
    `🔋 ${energyBar(avgEnergy)} ` +
    `| 👤 ${actors} ` +
    `| 🕒 Last feedback: ${minutesAgo} min ago`
  );
  dv.paragraph(`🧪 Latest timestamp read: ${latestEntry.created}`);
}
```
```dataviewjs
function energyBar(energy) {
  const blocks = Math.round((energy / 100) * 10);
  const bar = '█'.repeat(blocks) + '·'.repeat(10 - blocks);

  let color = 'green';
  if (energy < 80) color = 'goldenrod';
  if (energy < 50) color = 'orange';
  if (energy < 20) color = 'crimson';

  return `<span style="color:${color};">[${bar}] ${energy.toFixed(0)}%</span>`;
}

const pages = dv.pages('"06_Logs"')
  .where(p =>
    p.task &&
    p.actor &&
    typeof p.energy === 'number' &&
    p.created
  );

dv.paragraph(`✅ Grouping ${pages.length} logs`);

const grouped = pages.groupBy(p => p.task);

for (let group of grouped) {
  const task = group.key;
  const entries = group.rows;

  const energies = Array.from(entries.map(e => e.energy)).filter(e => typeof e === 'number');
  const avgEnergy = energies.length > 0
    ? energies.reduce((a, b) => a + b, 0) / energies.length
    : 0;

  const actors = [...new Set(entries.map(e => e.actor))].join(', ');

  const latestEntry = entries
    .filter(e => e.created)
    .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))[0];

  const minutesAgo = latestEntry
    ? Math.round((Date.now() - Date.parse(latestEntry.created)) / (1000 * 60))
    : 'N/A';

  dv.header(3, task);
  dv.el("div", 
    `🔋 ${energyBar(avgEnergy)} | 👤 ${actors} | 🕒 ${minutesAgo} min ago`
  );
}
```

New 

```dataviewjs
function energyBar(energy) {
  const blocks = Math.round((energy / 100) * 10);
  const bar = '█'.repeat(blocks) + '·'.repeat(10 - blocks);

  let color = 'green';
  if (energy < 80) color = 'goldenrod';
  if (energy < 50) color = 'orange';
  if (energy < 20) color = 'crimson';

  return `<span style="color:${color};">[${bar}] ${energy.toFixed(0)}%</span>`;
}

function freshnessColor(minutesAgo) {
  if (minutesAgo < 60) return 'inherit';   // recent = normal
  if (minutesAgo < 180) return '#999';     // medium faded
  return '#666';                           // old = dim
}

const pages = dv.pages('"06_Logs"')
  .where(p =>
    p.task &&
    p.actor &&
    typeof p.energy === 'number' &&
    p.created &&
    !isNaN(Date.parse(p.created))
  );

dv.paragraph(`✅ Pages after filter: ${pages.length}`);

const grouped = pages.groupBy(p => p.task);

for (let group of grouped) {
  const task = group.key;
  const entries = group.rows;

  const energies = Array.from(entries.map(e => e.energy)).filter(e => typeof e === 'number');
  const avgEnergy = energies.length > 0
    ? energies.reduce((a, b) => a + b, 0) / energies.length
    : 0;

  const actors = [...new Set(entries.map(e => e.actor))].join(', ');

  const datedEntries = entries.filter(e => Date.parse(e.created));
  const latestEntry = datedEntries.sort((a, b) => Date.parse(b.created) - Date.parse(a.created))[0];

  let minutesAgo = null;
  if (latestEntry) {
    const delta = Date.now() - Date.parse(latestEntry.created);
    minutesAgo = Math.round(delta / (1000 * 60));
  }

  const color = freshnessColor(minutesAgo ?? 9999);

  dv.header(3, task);
  dv.el("div",
    `🔋 ${energyBar(avgEnergy)} | 👤 ${actors} | 🕒 ${minutesAgo} min ago`,
    { style: `color: ${color}; margin-bottom: 1rem;` }
  );
}
```
