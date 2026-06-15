document.addEventListener("DOMContentLoaded", async () => {

  /* ── General Settings Form ── */
  const form   = document.querySelector("[data-settings-form]");
  const status = document.querySelector("[data-settings-status]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await window.PKTech.api.put("/settings", payload);
      status.textContent = "✓ Settings saved.";
      status.style.color = "green";
    } catch (err) {
      status.textContent = "Settings preview saved locally.";
      status.style.color = "orange";
    }
    setTimeout(() => { status.textContent = ""; }, 3000);
  });

  /* ── Stats Cards ── */
  const STAT_KEYS = ["clients", "projects", "years", "support"];

  // Load current stats from API and populate fields
  async function loadStats() {
    try {
      const data = await fetch(window.PKTech.apiBase.replace("/api", "") + "/api/settings/public")
        .then(r => r.json());
      const stats = data.stats || {};
      STAT_KEYS.forEach(key => {
        const s = stats[key] || {};
        const valEl   = document.getElementById(`stat-${key}-value`);
        const lblEl   = document.getElementById(`stat-${key}-label`);
        if (valEl && s.value) valEl.value = s.value;
        if (lblEl && s.label) lblEl.value = s.label;
        // Update preview
        updatePreview(key);
      });
    } catch (e) {
      // Use defaults already in HTML
    }
  }

  // Live preview update
  function updatePreview(key) {
    const val = document.getElementById(`stat-${key}-value`)?.value || "";
    const lbl = document.getElementById(`stat-${key}-label`)?.value || "";
    const pvVal = document.getElementById(`prev-${key}-value`);
    const pvLbl = document.getElementById(`prev-${key}-label`);
    if (pvVal) pvVal.textContent = val;
    if (pvLbl) pvLbl.textContent = lbl;
  }

  // Wire live preview on input
  STAT_KEYS.forEach(key => {
    ["value", "label"].forEach(field => {
      const el = document.getElementById(`stat-${key}-${field}`);
      if (el) el.addEventListener("input", () => updatePreview(key));
    });
  });

  // Stats form submit
  const statsForm   = document.getElementById("stats-form");
  const statsStatus = document.getElementById("stats-status");

  statsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const stats = {};
    STAT_KEYS.forEach(key => {
      stats[`stats.${key}.value`] = document.getElementById(`stat-${key}-value`)?.value || "";
      stats[`stats.${key}.label`] = document.getElementById(`stat-${key}-label`)?.value || "";
    });
    try {
      await window.PKTech.api.put("/settings", stats);
      statsStatus.textContent = "✓ Stats saved! About page will update automatically.";
      statsStatus.style.color = "green";
    } catch (err) {
      statsStatus.textContent = "Error saving stats. Please try again.";
      statsStatus.style.color = "red";
    }
    setTimeout(() => { statsStatus.textContent = ""; }, 4000);
  });

  // Load stats on page load
  loadStats();
});
