```dataviewjs
try {
  const logsByTask = dv.pages('"06_Logs"')
    .where(p => p.task && p.actor && p.energy !== undefined && p.file.ctime)
    .groupBy(p => p.task, g => g);

  dv.paragraph(`🔍 Matched logs grouped by task: ${logsByTask.length}`);

  for (const group of logsByTask) {
    const task = group.key;
    const people = [...new Set(group.rows.map(p => p.actor))];
    const mostRecent = group.rows.sort((a, b) => b.file.ctime - a.file.ctime)[0];
    const ageHours = Math.floor((Date.now() - mostRecent.file.ctime.toMillis()) / 1000 / 60 / 60);
    
    const freshness = ageHours < 6 ? '🟢' : ageHours < 24 ? '🟡' : '🔴';
    
    const energies = group.rows.map(p => p.energy);
    const averageEnergy = Math.round(energies.reduce((sum, e) => sum + e, 0) / energies.length);

    dv.header(3, `${task} ${freshness} ⚡ ${averageEnergy}%`);
    dv.paragraph(`👥 ${people.join(', ')} — Last feedback: ${mostRecent.file.ctime.toFormat('DDD t')}`);
  }
} catch (e) {
  dv.paragraph(`❌ DataviewJS error: ${e.message}`);
}
```

