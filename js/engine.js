// ─────────────────────────────────────
// STATE
// ─────────────────────────────────────
const S = {
  aff: 0,
  kUnlocked: new Set(),
  curNode: 'c1_a',
  prevScreen: 'story',
  kPending: null,
  afterMG: null,
  klBestScore: 0,
  tpTotalScore: 0,
};

const MAX_AFF = 150;

const SCENE_BG_BY_TOPIC = [
  {bg: 'bg-chophien', ids: ['chophien', 'cp2']},
  {bg: 'bg-chotinh', ids: ['chotinh', 'khv', 'c5_tinh']},
  {bg: 'bg-tet', ids: ['tet', 'lehoi']},
  {bg: 'bg-menmen', ids: ['menmen', 'cachnaau', 'monkhac']},
  {bg: 'bg-ruou', ids: ['ruou', 'che']},
  {bg: 'bg-khen', ids: ['khen']},
  {bg: 'bg-kenla', ids: ['kenla', 'kl_']},
  {bg: 'bg-vay', ids: ['vay', 'hoavan', 'tp_']},
  {bg: 'bg-theu', ids: ['lanh', 'hocdet', 'me']},
  {bg: 'bg-nhatuong', ids: ['nha', 'xaynha', 'trongnha', 'bep', 'vao']},
  {bg: 'bg-cuocsong', ids: ['daily', 'scene', 'nghi', 'truong', 'tuonglai', 'nuong', 'bome']},
];

function resolveSceneBg(n) {
  const id = (n.id || '').toLowerCase();
  const hit = SCENE_BG_BY_TOPIC.find(rule => rule.ids.some(part => id.includes(part)));
  if (hit) return hit.bg;
  return 'bg-' + (n.sc || 'village');
}

// ─────────────────────────────────────
// AUDIO
// ─────────────────────────────────────
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playNote(freq, dur = 0.28, delay = 0) {
  const ctx = getAudio();
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = 'sine'; o.frequency.value = freq;
  const t = ctx.currentTime + delay;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.2, t + 0.025);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.start(t); o.stop(t + dur + 0.05);
}

// --- BỘ QUẢN LÝ NHẠC NỀN (BGM) CẬP NHẬT ---
const BGM = {
  main: new Audio('audio/bgm_main.mp3'),
  
  init() {
    this.main.loop = true; // Lặp lại liên tục
    this.main.volume = 0.35; // Âm lượng vừa phải
  },
  
  playMain() {
    this.main.play().catch(e => console.log("Đang chờ tương tác để phát nhạc"));
  },
  
  pauseMain() {
    this.main.pause();
  }
};

// Gọi khởi tạo cài đặt âm lượng
BGM.init();
// --------------------------------------
// ─────────────────────────────────────
// SCREEN MANAGER
// ─────────────────────────────────────
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─────────────────────────────────────
// GLOBAL CONTROLLER
// ─────────────────────────────────────
const G = {
  start() {
	S.aff = 0;
       S.klBestScore = 0;
      S.tpTotalScore = 0;
	this.updateAff();
	BGM.playMain();
    show('story');
    this.loadNode('c1_a');
  },
  goHome() { show('home'); },
  showCollect() {
    S.prevScreen = document.querySelector('.screen.active')?.id || 'story';
    renderCollect();
    show('collect');
  },
  closeCollect() { show(S.prevScreen || 'story'); },
  continueGame() { show('story'); },

  loadNode(id) {
    if (id === '__MG_KL__') { this.launchMG('kl'); return; }
    if (id === '__MG_TP__') { this.launchMG('tp'); return; }
    if (id === '__COLLECT__') { 
      document.querySelectorAll('.choice').forEach(b => b.disabled = false);
      this.showCollect(); 
      return; 
    }
    if (id === '__RESTART__') { 
      this.start(); 
      return; 
    }

    const n = NODES[id]; if (!n) return;
    S.curNode = id;

    // FIX: use n.chLabel for the chapter badge (renamed from n.ch to avoid conflict with choices)
    document.getElementById('s-chapter').textContent = n.chLabel || '';
    document.getElementById('s-mood').textContent = n.mood || '';
    document.getElementById('s-spkr').textContent = 'Mỷ';

    const db = document.getElementById('s-dialogue');
    db.classList.add('fading');
    setTimeout(() => { db.textContent = n.txt; db.classList.remove('fading'); }, 220);

    const sc = document.querySelector('.story-scene');
    sc.className = 'story-scene ' + resolveSceneBg(n);

    const ch = document.getElementById('s-char');
    ch.style.opacity = '0';
    setTimeout(() => {
      ch.querySelector('.story-char-emote').textContent = n.em;
      ch.classList.remove('bounce');
      void ch.offsetWidth;
      ch.classList.add('bounce');
      ch.style.opacity = '1';
    }, 180);

    // FIX: use n.choices instead of n.ch
    this.renderChoices(n);
  },

  renderChoices(n) {
    const ca = document.getElementById('s-choices');
    ca.innerHTML = '';
    if (!n.choices || n.choices.length === 0) return;

    n.choices.forEach(c => {
      const b = document.createElement('button');
      b.className = 'choice' + (c.mg ? ' mg-trigger' : '');
      
      // Khởi tạo nội dung nút bấm
      let content = '';
      
      // Nếu có suy nghĩ nội tâm, thêm vào một thẻ div riêng
      if (c.th) {
        content += `<div class="choice-th">"${c.th}"</div>`;
      }
      
      // Phần lời nói (có icon nếu là minigame)
      let spoken = c.mg === 'kl' ? '🍃 ' + c.t : c.mg === 'tp' ? '👗 ' + c.t : c.t;
      content += `<div class="choice-sp">${spoken}</div>`;

      b.innerHTML = content;
      
      if (c.n === '__END__') b.classList.add('end-btn');
      if (c.n === '__RESTART__') b.classList.add('end-btn');
      if (c.n === '__COLLECT__') b.classList.add('end-btn');
      b.onclick = () => this.pick(c);
      ca.appendChild(b);
    });
  },

  pick(c) {
    document.querySelectorAll('.choice').forEach(b => b.disabled = true);
    const oldAff = S.aff;
    S.aff = Math.min(MAX_AFF, S.aff + (c.p || 0));
    // FIX: pass gain amount directly instead of relying on undefined variable `c`
    this.updateAff(oldAff, c.p || 0);

    if (c.u) {
      S.kPending = () => {
        if (c.mg) this.launchMG(c.mg);
        else this.loadNode(c.n);
      };
      this.showK(c.u);
    } else if (c.mg) {
      this.launchMG(c.mg);
    } else {
      setTimeout(() => this.loadNode(c.n), 160);
    }
  },

  // FIX: added gainPts parameter to replace the broken `c` reference
  updateAff(oldVal, gainPts) {
    const pct = Math.min(100, (S.aff / MAX_AFF) * 100);
    document.getElementById('aff-fill').style.width = pct + '%';
    document.getElementById('aff-pts').textContent = S.aff + ' / ' + MAX_AFF;
    document.getElementById('kl-afill').style.width = pct + '%';

    let cur = AFF_MILESTONES[0];
    for (const m of AFF_MILESTONES) if (S.aff >= m.pts) cur = m;

    document.getElementById('aff-status').textContent = cur.status;
    document.getElementById('aff-face').textContent = cur.face;
    document.getElementById('kl-albl').textContent = cur.status;
    document.getElementById('kl-hearts').textContent = S.aff >= 115 ? '♥♥♥' : S.aff >= 55 ? '♥♥♡' : '♥♡♡';
    document.getElementById('hud-k-count').textContent = S.kUnlocked.size + ' 📖';

    // Milestone level-up
    if (oldVal !== undefined) {
      const prev = AFF_MILESTONES.filter(m => m.pts <= oldVal).pop();
      if (cur !== prev && cur.pts > 0) this.showLevelUp(cur.status);
      // FIX: use gainPts param instead of broken `c.p`
      if (gainPts && gainPts > 0) this.showAffGain('+' + gainPts);
    }

    // milestone ticks
    const mt = document.getElementById('aff-milestones');
    mt.innerHTML = '';
    AFF_MILESTONES.slice(1).forEach(m => {
      const t = document.createElement('div');
      t.className = 'aff-tick' + (S.aff >= m.pts ? ' passed' : '');
      t.style.left = ((m.pts / MAX_AFF) * 100) + '%';
      mt.appendChild(t);
    });
  },

  showAffGain(txt) {
    const track = document.querySelector('.aff-track');
    const g = document.createElement('div');
    g.className = 'aff-gain';
    g.textContent = txt;
    track.appendChild(g);
    setTimeout(() => g.remove(), 1500);
  },

  showLevelUp(status) {
    const el = document.getElementById('lvlup-overlay');
    document.getElementById('lvlup-status').textContent = status;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  },

  showK(key) {
    const k = KDB[key]; if (!k) { this.closeK(); return; }
    S.kUnlocked.add(key);
    document.getElementById('k-icon').textContent = k.icon;
    document.getElementById('k-title').textContent = k.title;
    document.getElementById('k-text').textContent = k.text;
    document.getElementById('k-count').textContent = '📚 Đã mở ' + S.kUnlocked.size + '/' + Object.keys(KDB).length + ' kiến thức';
    document.getElementById('k-overlay').classList.add('show');
    this.updateAff();
  },
  closeK() {
    document.getElementById('k-overlay').classList.remove('show');
    if (S.kPending) { const f = S.kPending; S.kPending = null; setTimeout(f, 160); }
  },

  launchMG(type) {
    const data = type === 'kl'
      ? {emoji:'🍃', title:'Kèn lá', sub:'Mỷ vừa hái một chiếc lá chuối non...\nChuẩn bị thổi theo giai điệu của cô ấy!'}
      : {emoji:'👗', title:'Ghép trang phục', sub:'Mỷ trải bộ quần áo ra trước mặt bạn...\nBạn có nhận ra không?'};
    document.getElementById('tr-emoji').textContent = data.emoji;
    document.getElementById('tr-title').textContent = data.title;
    document.getElementById('tr-sub').textContent = data.sub;
    const fill = document.getElementById('tr-fill');
    fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = '';
    show('transition');
// --- ĐIỀU CHỈNH NHẠC THEO LOẠI GAME ---
    if (type === 'kl') {
      BGM.pauseMain(); 
    }
    // -------------------------------------

    setTimeout(() => {
      if (type === 'kl') { show('kenla'); KL.init(); }
      else { show('trangphuc'); TP.init(); }
    }, 1350);
  },

  returnFromMG(resultNodeId) {
    document.getElementById('tr-emoji').textContent = '💬';
    document.getElementById('tr-title').textContent = 'Quay lại';
    document.getElementById('tr-sub').textContent = 'Mỷ đang chờ bạn...';
    const fill = document.getElementById('tr-fill');
    fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = '';
    show('transition');
// --- BẬT LẠI NHẠC NỀN CHÍNH ---
    BGM.playMain();
    // ------------------------------
    setTimeout(() => { show('story'); this.loadNode(resultNodeId); }, 1100);
  }
};

// ─────────────────────────────────────
// COLLECTION
// ─────────────────────────────────────
function renderCollect() {
  const total = Object.keys(KDB).length;
  const unlocked = S.kUnlocked.size;
  document.getElementById('col-fill').style.width = Math.round((unlocked / total) * 100) + '%';
  document.getElementById('col-lbl').textContent = unlocked + ' / ' + total + ' kiến thức đã mở khóa';
  const el = document.getElementById('col-content'); el.innerHTML = '';
  COL_GROUPS.forEach(g => {
    const sec = document.createElement('div'); sec.className = 'col-group';
    sec.innerHTML = '<div class="col-group-lbl">' + g.label + '</div><div class="col-cards" id="cg-' + g.label + '"></div>';
    el.appendChild(sec);
    const grid = sec.querySelector('.col-cards');
    g.items.forEach(key => {
      const k = KDB[key]; if (!k) return;
      const locked = !S.kUnlocked.has(key);
      const card = document.createElement('div');
      card.className = 'col-card' + (locked ? ' locked' : '');
      card.innerHTML = `<div class="col-card-icon">${locked ? '🔒' : k.icon}</div>`
        + `<div class="col-card-title">${locked ? '???' : k.title}</div>`
        + (locked ? '' : `<div class="col-card-preview">${k.text.slice(0, 55)}…</div>`);
      grid.appendChild(card);
    });
  });
}

// ─────────────────────────────────────
// HOME STARS
// ─────────────────────────────────────
(function buildStars() {
  const c = document.getElementById('home-stars');
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('span');
    s.style.setProperty('--d', (2 + Math.random() * 3).toFixed(1) + 's');
    s.style.setProperty('--delay', (Math.random() * 3).toFixed(1) + 's');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.opacity = (0.1 + Math.random() * 0.4).toFixed(2);
    c.appendChild(s);
  }
})();

// init aff display
G.updateAff(undefined, 0);
