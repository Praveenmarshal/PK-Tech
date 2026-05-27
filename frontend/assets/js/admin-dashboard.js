document.addEventListener("DOMContentLoaded", async () => {
  const metrics = document.querySelector("[data-dashboard-metrics]");
  const defaults = { totalProjects: 24, totalMessages: 156, totalClients: 320, totalViews: "12.5K" };
  let data = defaults;
  try {
    data = { ...defaults, ...(await window.Zilist.api.get("/analytics/summary")) };
  } catch (error) {}
  metrics.innerHTML = [
    ["Total Projects", data.totalProjects],
    ["Total Messages", data.totalMessages],
    ["Total Clients", data.totalClients],
    ["Total Views", data.totalViews]
  ].map(([label, value]) => `<article class="metric-card"><p class="card-copy">${label}</p><div class="stat">${value}</div><span class="status-pill">+12.5%</span></article>`).join("");
});

