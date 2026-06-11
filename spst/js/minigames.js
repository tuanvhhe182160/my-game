// ─────────────────────────────────────
// KÈNN LÁ GAME DATA
// ─────────────────────────────────────
const KL_NOTES = [
  {e:'🍃', freq:330}, {e:'🌸', freq:392}, {e:'🌾', freq:440},
  {e:'🌙', freq:294}, {e:'⛰️', freq:523}
];
const KL_LEVELS = [
  {name:'Vòng 1 · Mới tập',     len:3, spd:750},
  {name:'Vòng 2 · Vào guồng',   len:4, spd:640},
  {name:'Vòng 3 · Khá rồi',     len:5, spd:560},
  {name:'Vòng 4 · Cảm giác tốt',len:6, spd:500},
];
const KL_RESPONSES = {
  perfect: [
    {mood:'*nghiêng đầu, ánh mắt thú vị*', txt:'Ồ... không ngờ đấy. Mới học mà thổi lọt tai phết. Xem ra bạn cũng có năng khiếu... hoặc là thực sự để tâm nhỉ?'},
    {mood:'*cười tươi rạng rỡ*',          txt:'Đúng rồi! Mình nói mà, ai thực sự muốn hiểu thì tiếng nhạc sẽ nói thay. Bạn làm mình bất ngờ đó.'},
  ],
  good: [
    {mood:'*mỉm cười nhẹ*',              txt:'Tạm được. Chắc dưới xuôi quen nghe nhạc hay rồi nên bắt nhịp nhanh. Luyện thêm chút nữa thì... biết đâu đấy.'},
    {mood:'*gật gù đánh giá*',           txt:'Khá đấy. Chấm cho bạn điểm kiên nhẫn. Lần sau tự tin hơn thì tiếng sẽ hay hơn nhiều.'},
  ],
  bad: [
    {mood:'*bật cười thành tiếng*',      txt:'Hahaha! Tiếng kèn của bạn dọa chim trên núi bay hết rồi kìa! Thôi không sao, ít nhất là bạn dám thử.'},
    {mood:'*chống hông trêu chọc*',      txt:'Bạn có chắc bạn vừa nghe mình thổi không đấy? Thổi lại đi, lần này mình sẽ kiểm tra gắt gao hơn nha.'},
  ]
};

const KL = {
  level: 0, melody: [], seq: [], phase: 'idle', playing: false, roundsDone: 0,

  init() {
    this.level = 0; this.roundsDone = 0; S.klBestScore = 0;
    this.setChar('😊');
    this.bubble('Nghe kỹ rồi thổi lại nhé... 🍃', 2600);
    setTimeout(() => this.startRound(), 700);
  },

  startRound() {
    const lv = KL_LEVELS[Math.min(this.level, KL_LEVELS.length - 1)];
    document.getElementById('kl-level').textContent = lv.name;
    this.melody = this.genMelody(lv.len);
    this.seq = []; this.phase = 'listen';
    document.getElementById('kl-repeat-btn').disabled = true;
    document.getElementById('kl-listen-btn').disabled = false;
    document.getElementById('kl-resp').classList.remove('show');
    this.renderMelody([]); this.renderDots([]);
    this.setChar('🤭');
    this.bubble('Nghe kỹ nhé... 🍃', 2000);
    setTimeout(() => this.play(), 800);
  },

  genMelody(len) {
    const m = [];
    for (let i = 0; i < len; i++) {
      let n; do { n = Math.floor(Math.random() * 5); } while (m.length && n === m[m.length - 1]);
      m.push(n);
    }
    return m;
  },

  play() {
    if (this.playing) return;
    this.playing = true;
    document.getElementById('kl-listen-btn').disabled = true;
    document.getElementById('kl-repeat-btn').disabled = true;
    const lv = KL_LEVELS[Math.min(this.level, KL_LEVELS.length - 1)];
    this.melody.forEach((n, i) => {
      const delay = i * (lv.spd / 1000);
      playNote(KL_NOTES[n].freq, 0.3, delay);
      setTimeout(() => { this.renderMelody([], i); this.flashKey(n); }, i * lv.spd);
    });
    const total = this.melody.length * lv.spd + 400;
    setTimeout(() => {
      this.renderMelody([]); this.playing = false; this.phase = 'ready';
      document.getElementById('kl-repeat-btn').disabled = false;
      document.getElementById('kl-listen-btn').disabled = false;
      this.setChar('😏');
      this.bubble('Bạn thổi lại được không? 😏', 3000);
    }, total);
  },

  startInput() {
    this.phase = 'input'; this.seq = [];
    document.getElementById('kl-repeat-btn').disabled = true;
    document.getElementById('kl-listen-btn').disabled = true;
    this.renderDots([]);
    this.setChar('👂');
    this.bubble('Mình nghe đây... 👂', 4000);
  },

  press(idx) {
    if (this.phase !== 'input') return;
    playNote(KL_NOTES[idx].freq, 0.22);
    this.flashKey(idx); this.floatNote(idx);
    this.seq.push(idx);
    const pos = this.seq.length - 1;
    const results = this.seq.map((p, i) => p === this.melody[i] ? 'hit' : 'miss');
    this.renderMelody(results); this.renderDots(results);
    const wrong = this.seq[pos] !== this.melody[pos];
    const done = this.seq.length === this.melody.length;
    if (wrong || done) { this.phase = 'done'; setTimeout(() => this.finish(results), 380); }
  },

  finish(results) {
    const hits = results.filter(r => r === 'hit').length;
    const total = this.melody.length;
    const pct = Math.round((hits / total) * 100);
    this.roundsDone++;
    if (pct > S.klBestScore) S.klBestScore = pct;
    const perfect = hits === total, good = hits >= Math.ceil(total * 0.7);
    const old = S.aff;
    S.aff = perfect ? Math.min(MAX_AFF, S.aff + 14)
          : good    ? Math.min(MAX_AFF, S.aff + 7)
          :           Math.max(0, S.aff - 3);
    G.updateAff(old);
    this.setChar(perfect ? '🥰' : good ? '😊' : '😄');

    const pool = KL_RESPONSES[perfect ? 'perfect' : good ? 'good' : 'bad'];
    const r = pool[Math.floor(Math.random() * pool.length)];
    const resp = document.getElementById('kl-resp');
    document.getElementById('kl-resp-mood').textContent = r.mood;
    document.getElementById('kl-resp-text').textContent = r.txt;
    document.getElementById('kl-resp-btns').innerHTML = '';
    resp.classList.add('show');

    setTimeout(() => this.buildNextBtns(perfect, good), 1800);
  },

  buildNextBtns(perfect, good) {
    const wrap = document.getElementById('kl-resp-btns');
    const canLeave = this.roundsDone >= 1 && (perfect || good || this.roundsDone >= 2);
    if (canLeave) {
      const b = document.createElement('button');
      b.className = 'kl-btn kl-btn-primary'; b.style.fontSize = '12px';
      b.textContent = 'Quay lại câu chuyện →';
      b.onclick = () => {
        const rs = S.klBestScore >= 100 ? 'c3_kl_perfect' : S.klBestScore >= 65 ? 'c3_kl_good' : 'c3_kl_bad';
        if (S.klBestScore >= 65) S.kUnlocked.add('kenla');
        G.returnFromMG(rs);
      };
      wrap.appendChild(b);
    }
    const b2 = document.createElement('button');
    b2.className = 'kl-btn kl-btn-ghost'; b2.style.fontSize = '12px';
    b2.textContent = perfect ? 'Vòng khó hơn 🎵' : 'Thổi lại 🍃';
    b2.onclick = () => {
      if (perfect && this.level < KL_LEVELS.length - 1) this.level++;
      document.getElementById('kl-resp').classList.remove('show');
      this.startRound();
    };
    wrap.appendChild(b2);
  },

  renderMelody(results, lit = -1) {
    const d = document.getElementById('kl-melody'); d.innerHTML = '';
    if (!this.melody.length) {
      d.innerHTML = '<span class="melody-placeholder">Nhấn ▶ để nghe giai điệu của Mỷ...</span>';
      return;
    }
    this.melody.forEach((n, i) => {
      const p = document.createElement('div'); p.className = 'note-pill';
      p.textContent = KL_NOTES[n].e;
      if (i === lit) p.classList.add('lit');
      if (results[i] === 'hit') p.classList.add('hit');
      if (results[i] === 'miss') p.classList.add('miss');
      d.appendChild(p);
    });
  },

  renderDots(results) {
    const d = document.getElementById('kl-dots'); d.innerHTML = '';
    this.melody.forEach((_, i) => {
      const dot = document.createElement('div'); dot.className = 'dt-dot';
      if (i < results.length) dot.classList.add(results[i] === 'hit' ? 'hit' : 'miss');
      else if (i === results.length) dot.classList.add('cur');
      d.appendChild(dot);
    });
  },

  flashKey(idx) {
    const btns = document.querySelectorAll('.kl-key');
    btns[idx]?.classList.add('active');
    setTimeout(() => btns[idx]?.classList.remove('active'), 330);
  },

  floatNote(idx) {
    const scene = document.getElementById('kl-scene');
    const f = document.createElement('div'); f.className = 'float-particle';
    f.textContent = ['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)];
    f.style.left = (55 + Math.random() * 90) + 'px';
    f.style.bottom = '60px';
    scene.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  },

  setChar(e) { document.querySelector('#kl-char .story-char-emote').textContent = e; },

  bubble(txt, dur = 2600) {
    const b = document.getElementById('kl-bubble');
    b.textContent = txt; b.classList.add('show');
    clearTimeout(KL._bt);
    KL._bt = setTimeout(() => b.classList.remove('show'), dur);
  }
};

// ─────────────────────────────────────
// TRANG PHỤC GAME
// ─────────────────────────────────────
const TP_STAGES = [
  {
    label: 'Bộ 1 / 2 · Phụ nữ Mông Đen', char: '👩',
    correct: ['váychàm', 'khăntầu', 'thắtlưng'],
    items: [
      {id:'váychàm',  e:'🥻', n:'Váy chàm',         ok:true},
      {id:'khăntầu',  e:'🧣', n:'Khăn đầu thêu',    ok:true},
      {id:'thắtlưng', e:'🎀', n:'Thắt lưng vải',    ok:true},
      {id:'mũlông',   e:'🪖', n:'Mũ lông chim',     ok:false},
      {id:'áotắm',    e:'👙', n:'Yếm sặc sỡ',       ok:false},
      {id:'nón',      e:'👒', n:'Nón lá',            ok:false},
      {id:'găng',     e:'🧤', n:'Găng tay dệt',     ok:false},
      {id:'giay',     e:'👡', n:'Giày thêu',         ok:false},
    ],
    resp: {
      perfect: {mood:'*nhìn bạn bằng con mắt khác*', txt:'Đúng hết luôn? Thường người ta lên đây chỉ mải chụp ảnh, ít ai nhìn kỹ xem tụi mình mặc gì. Bạn... quan sát tốt đấy.'},
      ok:      {mood:'*gật đầu công nhận*',        txt:'Cũng có để ý đấy chứ! Vài cái sai nhỏ không sao, mình sẽ chỉ cho bạn sau.'},
      bad:     {mood:'*cười trêu chọc*',           txt:'Haha! Đoán mò đúng không? Phạt bạn ngày mai phải ngồi xem mẹ mình thêu váy cả buổi sáng.'},
    }
  },
  {
    label: 'Bộ 2 / 2 · Nam giới Mông', char: '👨',
    correct: ['quầnống', 'áochàm2', 'dâylưng'],
    items: [
      {id:'quầnống',  e:'👖', n:'Quần ống rộng',     ok:true},
      {id:'áochàm2',  e:'🥼', n:'Áo chàm cổ đứng',  ok:true},
      {id:'dâylưng',  e:'🪢', n:'Dây lưng vải',      ok:true},
      {id:'khăn2',    e:'🧣', n:'Khăn thêu hoa',    ok:false},
      {id:'váyxòe',   e:'🩱', n:'Váy xòe nhiều tầng',ok:false},
      {id:'tạpzề',    e:'👗', n:'Tạp dề màu sắc',   ok:false},
      {id:'vòng',     e:'📿', n:'Vòng cổ bạc',       ok:false},
      {id:'mũnỉ',     e:'🎩', n:'Mũ nỉ',             ok:false},
    ],
    resp: {
      perfect: {mood:'*vui ra mặt*',   txt:'Ồ! Nhận ra cả trang phục nam giới luôn. Xem ra bạn thực sự muốn tìm hiểu về người Mông tụi mình chứ không chỉ nói suông.'},
      ok:      {mood:'*nhướng mày*',   txt:'Gần chuẩn rồi! Trang phục nam khó nhận hơn đúng không? Nhưng thế này là đủ điểm qua môn rồi.'},
      bad:     {mood:'*cười mỉm*',     txt:'Đấy, nhìn lướt là nhầm ngay. Không sao, cho nợ kiến thức này, mai mốt trả bài sau nhé.'},
    }
  }
];

const TP = {
  stage: 0, selected: [], totalScore: 0,

  init() {
    this.stage = 0; this.selected = []; this.totalScore = 0; S.tpTotalScore = 0;
    this.renderStage();
  },

  renderStage() {
    const s = TP_STAGES[this.stage];
    this.selected = [];
    document.getElementById('tp-body').textContent = s.char;
    document.getElementById('tp-stage-lbl').textContent = s.label;
    document.getElementById('tp-instruct').innerHTML = 'Chọn đúng <strong>3 món</strong> thuộc bộ trang phục này:';
    document.getElementById('tp-score').textContent = '';
    document.getElementById('tp-resp').classList.remove('show');

    const slots = document.getElementById('tp-slots'); slots.innerHTML = '';
    s.correct.forEach(() => {
      const sl = document.createElement('div'); sl.className = 'tp-slot';
      slots.appendChild(sl);
    });

    const grid = document.getElementById('tp-grid'); grid.innerHTML = '';
    [...s.items].sort(() => Math.random() - 0.5).forEach(item => {
      const c = document.createElement('div'); c.className = 'tp-item'; c.dataset.id = item.id;
      c.innerHTML = `<div class="tp-item-e">${item.e}</div><div class="tp-item-n">${item.n}</div>`;
      c.onclick = () => this.pick(item, c, s);
      grid.appendChild(c);
    });
  },

  pick(item, card, s) {
    if (card.classList.contains('disabled')) return;
    if (this.selected.includes(item.id)) {
      this.selected = this.selected.filter(x => x !== item.id);
      card.classList.remove('selected');
      this.updateSlots(s); return;
    }
    if (this.selected.length >= s.correct.length) return;
    this.selected.push(item.id);
    card.classList.add('selected');
    this.updateSlots(s);
    if (this.selected.length === s.correct.length) setTimeout(() => this.check(s), 300);
  },

  updateSlots(s) {
    const slots = document.querySelectorAll('#tp-slots .tp-slot');
    slots.forEach((sl, i) => {
      if (i < this.selected.length) {
        const item = s.items.find(a => a.id === this.selected[i]);
        sl.textContent = item?.e || ''; sl.classList.add('filled');
      } else { sl.textContent = ''; sl.classList.remove('filled'); }
    });
  },

  check(s) {
    const hits = this.selected.filter(id => s.correct.includes(id)).length;
    const total = s.correct.length;
    const perfect = hits === total, ok = hits >= Math.ceil(total * 0.7);

    document.getElementById('tp-score').textContent = hits + '/' + total + ' đúng';
    document.querySelectorAll('.tp-item').forEach(card => {
      const id = card.dataset.id;
      if (this.selected.includes(id)) {
        const item = s.items.find(a => a.id === id);
        card.classList.add(item?.ok ? 'correct' : 'wrong');
      }
      card.classList.add('disabled');
    });

    if (perfect) this.totalScore += 2; else if (ok) this.totalScore += 1;
    S.tpTotalScore = this.totalScore;
    const old = S.aff;
    S.aff = Math.min(MAX_AFF, S.aff + (perfect ? 12 : ok ? 6 : 2));
    G.updateAff(old);

    const r = s.resp[perfect ? 'perfect' : ok ? 'ok' : 'bad'];
    document.getElementById('tp-resp-mood').textContent = r.mood;
    document.getElementById('tp-resp-text').textContent = r.txt;
    document.getElementById('tp-resp-btns').innerHTML = '';
    document.getElementById('tp-resp').classList.add('show');

    setTimeout(() => this.buildNext(perfect, ok), 1800);
  },

  buildNext(perfect, ok) {
    const wrap = document.getElementById('tp-resp-btns');
    if (this.stage < TP_STAGES.length - 1) {
      const b = document.createElement('button');
      b.className = 'kl-btn kl-btn-primary'; b.style.fontSize = '12px';
      b.textContent = 'Bộ tiếp theo →';
      b.onclick = () => { this.stage++; this.renderStage(); };
      wrap.appendChild(b);
    } else {
      const b = document.createElement('button');
      b.className = 'kl-btn kl-btn-primary'; b.style.fontSize = '12px';
      b.textContent = 'Quay lại câu chuyện →';
      b.onclick = () => {
        const rs = this.totalScore >= 3 ? 'c3_tp_perfect'
                 : this.totalScore >= 1 ? 'c3_tp_ok'
                 :                        'c3_tp_bad';
        if (this.totalScore >= 2) S.kUnlocked.add('vayphong');
        G.returnFromMG(rs);
      };
      wrap.appendChild(b);
    }
    const b2 = document.createElement('button');
    b2.className = 'kl-btn kl-btn-ghost'; b2.style.fontSize = '12px';
    b2.textContent = 'Bỏ qua →';
    b2.onclick = () => G.returnFromMG('c3_tp_bad');
    wrap.appendChild(b2);
  },

  skip() { G.returnFromMG('c3_tp_bad'); }
};
