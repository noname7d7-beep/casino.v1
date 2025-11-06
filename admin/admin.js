// admin.js — простая логика хранения конфигурации и отправки сигналов через localStorage
const ADMIN_KEY = 'mt_admin';
const CONFIG_KEY = 'mt_config'; // глобальный конфиг для всех игр

// redirect to login if not authorized
if(localStorage.getItem(ADMIN_KEY) !== 'granted'){
  window.location.href = 'login.html';
}

// default config if none
const defaultConfig = {
  aviator: {
    multiplier: 2.5,
    mode: 'manual',
    history: []
  },
  mines: {
    defaultMines: 5,
    mode: 'manual',
    history: []
  }
};

let cfg = JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null') || defaultConfig;

// --- helper to persist
function saveConfig(){
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  console.log('Config saved', cfg);
}

// --- Tabs
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const name = tab.dataset.tab;
    document.querySelectorAll('[data-panel]').forEach(p=>p.style.display = (p.dataset.panel === name ? 'block' : 'none'));
    loadPanel(name);
  });
});

// --- load panel values
function loadPanel(name){
  if(name === 'aviator'){
    document.getElementById('aviator_multiplier').value = cfg.aviator.multiplier;
    document.getElementById('aviator_mode').value = cfg.aviator.mode;
    renderAviatorTable();
  } else if(name === 'mines'){
    document.getElementById('mines_default').value = cfg.mines.defaultMines;
    document.getElementById('mines_mode').value = cfg.mines.mode;
    renderMinesTable();
  }
}

// render tables
function renderAviatorTable(){
  const tbody = document.querySelector('#aviator_table tbody');
  tbody.innerHTML = '';
  (cfg.aviator.history || []).forEach((row, i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.mult}</td><td>${row.note||''}</td><td><button data-i="${i}" class="del">Удалить</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll('.del').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const i = +btn.dataset.i;
      cfg.aviator.history.splice(i,1); saveConfig(); renderAviatorTable();
    });
  });
}

function renderMinesTable(){
  const tbody = document.querySelector('#mines_table tbody');
  tbody.innerHTML = '';
  (cfg.mines.history || []).forEach((row,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.mines}</td><td>${row.note||''}</td><td><button data-i="${i}" class="del">Удалить</button></td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll('.del').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      cfg.mines.history.splice(+btn.dataset.i,1); saveConfig(); renderMinesTable();
    });
  });
}

// --- actions
document.getElementById('saveAviator').addEventListener('click', ()=>{
  const m = parseFloat(document.getElementById('aviator_multiplier').value) || 1;
  const mode = document.getElementById('aviator_mode').value;
  cfg.aviator.multiplier = m; cfg.aviator.mode = mode;
  // append to history
  cfg.aviator.history.unshift({mult:m, note:'saved at '+new Date().toLocaleString()});
  saveConfig(); loadPanel('aviator');
  alert('Aviator сохранён');
});

document.getElementById('sendAviator').addEventListener('click', ()=>{
  // send signal — write special key, games read it and react
  const payload = { type:'aviator_signal', multiplier: cfg.aviator.multiplier, at: Date.now()};
  localStorage.setItem('mt_signal', JSON.stringify(payload));
  // also push history
  cfg.aviator.history.unshift({mult:cfg.aviator.multiplier, note:'signal sent at '+new Date().toLocaleString()});
  saveConfig(); renderAviatorTable();
  alert('Сигнал отправлен');
});

document.getElementById('saveMines').addEventListener('click', ()=>{
  const m = parseInt(document.getElementById('mines_default').value) || 5;
  const mode = document.getElementById('mines_mode').value;
  cfg.mines.defaultMines = m; cfg.mines.mode = mode;
  cfg.mines.history.unshift({mines:m, note:'saved at '+new Date().toLocaleString()});
  saveConfig(); renderMinesTable();
  alert('Mines сохранён');
});

// export JSON
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(cfg, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'mt_config.json'; a.click(); URL.revokeObjectURL(url);
});

// logout
document.getElementById('logoutBtn').addEventListener('click', ()=>{
  localStorage.removeItem(ADMIN_KEY);
  window.location.href = 'login.html';
});

// initial load
loadPanel('aviator');
document.getElementById("saveAviator").addEventListener("click", () => {
  const val = parseFloat(document.getElementById("aviatorInput").value);
  if (!isNaN(val) && val > 0) {
    localStorage.setItem("aviatorMultiplier", val);
    alert(`✅ Коэффициент Aviator сохранён: x${val}`);
  } else {
    alert("Введите корректное значение!");
  }
});
