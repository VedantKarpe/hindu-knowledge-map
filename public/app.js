(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var ROW = 28;
  var LANE_X = { concept: -150, deity: -88, event: -24, being: 36, place: 104, open: 150 };
  var LANE_Z = { concept: -100, deity: -40, event: 10, being: 50, place: 90, open: 0 };
  var LABEL_LEFT = { place: 1, open: 1 };
  var TYPE_NAME = { concept: 'concept', deity: 'deity', event: 'event', being: 'being', place: 'place or thing', open: 'open thread' };
  var KIND = {
    creates: { name: 'creates', dash: '', w: 1 },
    form: { name: 'is a form of', dash: '6 3', w: 1 },
    becomes: { name: 'becomes or leads to', dash: '2 3', w: 1.2 },
    place: { name: 'location or part', dash: '10 4', w: 1 },
    conflict: { name: 'conflict', dash: '', w: 2 },
    acts: { name: 'acts on or takes part', dash: '8 3 2 3', w: 1 }
  };
  var A3 = { a: 0.5, t: 0.25, r: 0 };

  var state = {
    ang: 0, tilt: 0, roll: 0, zm: 1, panX: 0, panY: 0, depth: 0, depthT: 0,
    mode: 'flat', sel: null, selE: null, story: -1, auto: false, moved: 0,
    tgt: null, panT: null, collapsed: {}, q: '', fChap: null, fBook: null, hideType: {}
  };
  var VW = 380, laneK = 1;
  var pts = {}, pd = 0, pa = 0;
  var G, byId = {}, edgeById = {}, items = [], edgeObjs = [], rows = 1, dirty = true;

  var svg = document.getElementById('graph');
  var gEdges = document.getElementById('edges');
  var gNodes = document.getElementById('nodes');
  var gLabels = document.getElementById('labels');
  var detail = document.getElementById('detail');
  var storyEl = document.getElementById('story');
  var indexEl = document.getElementById('index');
  var hintEl = document.getElementById('hint');

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  // Text for display. Page references are stripped when sources are switched off.
  function txt(s) {
    s = String(s == null ? '' : s);
    if (!G.meta.showSources) s = s.replace(/\s*\(p\.[^)]*\)/g, '');
    return esc(s);
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function wrapAngle(d) {
    var t = 2 * Math.PI;
    return ((d + Math.PI) % t + t) % t - Math.PI;
  }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  if (window.GRAPH_DATA) {
    init(window.GRAPH_DATA);
  } else {
    detail.innerHTML = '<p class="muted">Could not load data/graph.js.</p>';
  }

  // ---------- setup ----------

  function init(data) {
    G = data;
    G.groups = G.groups || [];
    document.getElementById('credit').textContent = G.meta.credit || '';
    document.title = G.meta.title;
    document.getElementById('title').textContent = G.meta.title;
    if (G.meta.subtitle) document.getElementById('lede').textContent = G.meta.subtitle;

    G.nodes.forEach(function (n) { byId[n.id] = n; items.push(n); });
    G.edges.forEach(function (e) { edgeById[e.id] = e; });

    // One stand-in node per group, shown while the group is folded.
    G.groups.forEach(function (g) {
      var members = G.nodes.filter(function (n) { return n.group === g.id; })
        .sort(function (a, b) { return a.no - b.no; });
      if (!members.length) return;
      var gn = {
        id: 'g:' + g.id, gid: g.id, isGroup: true, members: members,
        no: members[0].no, numText: members[0].no + '-' + members[members.length - 1].no,
        label: g.label, sub: g.sub || (members.length + ' steps'), type: g.type || members[0].type,
        chapter: members[0].chapter, what: g.what || ''
      };
      g.node = gn;
      byId[gn.id] = gn; items.push(gn);
      state.collapsed[g.id] = true;
    });

    // Node size follows the number of connections.
    var deg = {};
    G.edges.forEach(function (e) {
      deg[e.from] = (deg[e.from] || 0) + 1;
      deg[e.to] = (deg[e.to] || 0) + 1;
    });
    items.forEach(function (n) {
      if (n.isGroup) {
        var inG = {};
        n.members.forEach(function (m) { inG[m.id] = 1; });
        n.deg = G.edges.filter(function (e) { return !!inG[e.from] !== !!inG[e.to]; }).length;
        n.r0 = 12;
      } else {
        n.deg = deg[n.id] || 0;
        n.r0 = 6.5 + Math.min(n.deg, 10) * 0.75;
      }
    });

    items.forEach(function (n, i) {
      n.jx = (((i * 53) % 100) - 50) * 0.9;
      n.jy = (((i * 29) % 100) - 50) * 0.3;
      n.jz = (((i * 37) % 100) - 50) * 2.4;
    });

    G.edges.forEach(function (e, i) {
      var k = KIND[e.kind] || KIND.acts;
      var g = el('g', {}, gEdges);
      var ln = el('path', { 'class': 'arr k-' + (KIND[e.kind] ? e.kind : 'acts'), 'marker-end': 'url(#arrow)', fill: 'none' }, g);
      if (k.dash) ln.setAttribute('stroke-dasharray', k.dash);
      var hit = el('path', { stroke: 'transparent', 'stroke-width': '16', fill: 'none', style: 'cursor:pointer' }, g);
      var lb = el('text', { 'class': 'elabel' }, gLabels);
      lb.textContent = e.label;
      hit.addEventListener('click', function (ev) {
        if (state.moved > 6) return;
        ev.stopPropagation();
        pickEdge(e.id);
      });
      edgeObjs.push({ e: e, k: k, g: g, ln: ln, hit: hit, lb: lb, bend: i % 2 ? 1 : -1 });
    });

    items.forEach(function (n) {
      var g = el('g', { style: 'cursor:pointer' }, gNodes);
      if (n.isGroup) n.ring = el('circle', { 'class': 'ring t-' + n.type, fill: 'none', 'stroke-width': '0.8' }, g);
      n.shape = el(n.type === 'event' ? 'polygon' : 'circle', { 'class': 'shape t-' + n.type, 'stroke-width': '0.6' }, g);
      n.numEl = el('text', { 'class': 'nnum' }, g);
      n.numEl.textContent = n.isGroup ? n.numText : n.no;
      n.nameEl = el('text', { 'class': 'nlabel' }, g);
      n.nameEl.textContent = n.label;
      n.subEl = el('text', { 'class': 'nsub' }, g);
      n.subEl.textContent = n.sub || '';
      var anchor = LABEL_LEFT[n.type] ? 'end' : 'start';
      n.nameEl.setAttribute('text-anchor', anchor);
      n.subEl.setAttribute('text-anchor', anchor);
      n.g = g;
      g.addEventListener('click', function (ev) {
        if (state.moved > 6) return;
        ev.stopPropagation();
        n.isGroup ? pickGroup(n.gid, true) : pickNode(n.id);
      });
    });

    G.nodes.slice().sort(function (a, b) { return a.no - b.no; }).forEach(function (n) {
      var b = document.createElement('button');
      b.textContent = n.no + ' ' + n.label;
      b.addEventListener('click', function () { state.moved = 0; pickNode(n.id); });
      indexEl.appendChild(b);
      n.btn = b;
    });

    buildLegend();
    buildFilters();
    applyFilter();
    measure();
    layout(true);
    fit();
    window.addEventListener('resize', function () {
      if (measure()) { layout(true); fit(); }
    });
    bindControls();
    renderStoryPanel();
    updateButtons();
    render();
    loop();
  }

  // ---------- layout: one row per node, in order of appearance ----------

  function rep(id) {
    var n = byId[id];
    return (n.group && state.collapsed[n.group] && byId['g:' + n.group]) ? byId['g:' + n.group] : n;
  }

  function layout(snap) {
    var vis = items.filter(function (n) {
      n.hidden = n.isGroup ? !state.collapsed[n.gid] : !!(n.group && state.collapsed[n.group] && byId['g:' + n.group]);
      return !n.hidden;
    }).sort(function (a, b) { return a.no - b.no; });
    rows = vis.length;
    vis.forEach(function (n, i) {
      n.tX = (LANE_X[n.type] == null ? 0 : LANE_X[n.type]) * laneK;
      n.tY = (i - (rows - 1) / 2) * ROW;
      n.Z = LANE_Z[n.type] || 0;
    });
    // Hidden nodes park on their stand-in so folding and unfolding animates.
    items.forEach(function (n) {
      if (!n.hidden) return;
      var at = n.isGroup ? n.members[0] : byId['g:' + n.group];
      n.tX = at.tX; n.tY = at.tY; n.Z = at.Z;
    });
    if (snap) items.forEach(function (n) { n.X = n.tX; n.Y = n.tY; });
    dirty = true;
  }

  // The canvas is 600 units tall; its width follows the shape of the space it is given,
  // so a wide desktop window spreads the columns out instead of leaving empty margins.
  function measure() {
    var w = svg.clientWidth, h = svg.clientHeight;
    var vw = (w && h) ? Math.round(600 * w / h) : 380;
    vw = clamp(vw, 380, 1400);
    if (vw === VW && svg.getAttribute('viewBox')) return false;
    VW = vw;
    laneK = clamp(VW / 380, 1, 2.6);
    svg.setAttribute('viewBox', '0 0 ' + VW + ' 600');
    document.getElementById('bg').setAttribute('width', VW);
    return true;
  }

  function fit() {
    // Never squeeze rows below a readable pitch; a long timeline scrolls instead.
    state.zm = clamp(560 / ((rows - 1) * ROW + 50), 0.93, 1.1);
    state.panX = 0; state.panY = panLimit(); state.panT = null;
  }

  function panLimit() { return Math.max(0, (rows - 1) * ROW * state.zm / 2 - 270); }
  function panTo(y) {
    if (state.mode !== 'flat') return;
    var lim = panLimit();
    state.panT = { x: 0, y: clamp(-y * state.zm, -lim, lim) };
  }

  function project(n) {
    var cy = Math.cos(state.ang), sy = Math.sin(state.ang);
    var cp = Math.cos(state.tilt), sp = Math.sin(state.tilt);
    var cr = Math.cos(state.roll), sr = Math.sin(state.roll);
    // In 3D the nodes are pushed apart: lane position plus a fixed per-node offset, with depth by type.
    var d = state.depth, zm = state.zm;
    var X = (n.X + n.jx * d * Math.min(laneK, 1.6)) * zm;
    var Y = (n.Y * (1 + d * 0.2) + n.jy * d) * zm;
    var zk = laneK > 1.5 ? 1 : 0.55;
    var Z = (n.Z * 2.4 + n.jz) * zk * d * zm;
    var x1 = X * cy + Z * sy, z1 = -X * sy + Z * cy;
    var y2 = Y * cp - z1 * sp, z2 = Y * sp + z1 * cp;
    var x3 = x1 * cr - y2 * sr, y3 = x1 * sr + y2 * cr;
    var den = 900 + z2;
    n.vis = den > 260;
    var s = 900 / Math.max(260, den);
    n.px = VW / 2 + state.panX + x3 * s;
    n.py = 300 + state.panY + y3 * s;
    n.z = z2 / state.zm;
    n.rr = n.r0 * Math.min(s, 2) * Math.sqrt(state.zm);
  }

  // ---------- search and filters ----------

  function nodeMatches(n) {
    if (state.fChap != null && n.chapter !== state.fChap) return false;
    if (state.fBook != null && (n.source || G.meta.source) !== state.fBook) return false;
    if (state.hideType[n.type]) return false;
    if (state.q) {
      var hay = [n.label, n.sub, n.what, n.origin, n.why].join(' ').toLowerCase();
      if (hay.indexOf(state.q) < 0) return false;
    }
    return true;
  }

  function applyFilter() {
    var count = 0;
    G.nodes.forEach(function (n) {
      n.match = nodeMatches(n);
      if (n.match) count++;
      if (n.btn) n.btn.style.display = n.match ? '' : 'none';
    });
    items.forEach(function (n) {
      if (n.isGroup) n.match = n.members.some(function (m) { return m.match; });
    });
    var c = document.getElementById('count');
    var filtered = count !== G.nodes.length;
    c.textContent = filtered ? count + ' of ' + G.nodes.length + ' shown' : '';
    // A search should reveal matches hidden inside a folded group.
    if (state.q) {
      var changed = false;
      G.groups.forEach(function (g) {
        if (g.node && state.collapsed[g.id] && g.node.match) { state.collapsed[g.id] = false; changed = true; }
      });
      if (changed) { layout(); updateButtons(); }
    }
    dirty = true;
  }

  function chip(parent, text, onClick) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.textContent = text;
    b.addEventListener('click', function () { onClick(b); });
    parent.appendChild(b);
    return b;
  }

  function buildFilters() {
    var fc = document.getElementById('f-chapter');
    var chapters = [];
    G.nodes.forEach(function (n) { if (chapters.indexOf(n.chapter) < 0) chapters.push(n.chapter); });
    chapters.sort(function (a, b) { return a - b; });
    var chapChips = [];
    function setChap(v) {
      state.fChap = v;
      chapChips.forEach(function (c) { c.b.setAttribute('aria-pressed', c.v === v ? 'true' : 'false'); });
      applyFilter();
    }
    chapChips.push({ v: null, b: chip(fc, 'All chapters', function () { setChap(null); }) });
    chapters.forEach(function (ch) {
      chapChips.push({ v: ch, b: chip(fc, 'Ch ' + ch, function () { setChap(ch); }) });
    });
    setChap(null);

    var ft = document.getElementById('f-type');
    var types = [];
    G.nodes.forEach(function (n) { if (types.indexOf(n.type) < 0) types.push(n.type); });
    Object.keys(LANE_X).filter(function (t) { return types.indexOf(t) >= 0; }).forEach(function (t) {
      var b = chip(ft, TYPE_NAME[t] || t, function (btn) {
        state.hideType[t] = !state.hideType[t];
        btn.setAttribute('aria-pressed', state.hideType[t] ? 'false' : 'true');
        applyFilter();
      });
      b.setAttribute('aria-pressed', 'true');
    });

    // Book filter appears only once there is more than one book in the data.
    var books = [];
    G.nodes.forEach(function (n) {
      var s = n.source || G.meta.source;
      if (s && books.indexOf(s) < 0) books.push(s);
    });
    var fb = document.getElementById('f-book');
    if (books.length > 1) {
      var bookChips = [];
      var setBook = function (v) {
        state.fBook = v;
        bookChips.forEach(function (c) { c.b.setAttribute('aria-pressed', c.v === v ? 'true' : 'false'); });
        applyFilter();
      };
      bookChips.push({ v: null, b: chip(fb, 'All books', function () { setBook(null); }) });
      books.forEach(function (s, i) {
        var name = G.meta.showSources ? s : 'Book ' + (i + 1);
        bookChips.push({ v: s, b: chip(fb, name, function () { setBook(s); }) });
      });
      setBook(null);
    } else {
      fb.style.display = 'none';
    }

    document.getElementById('q').addEventListener('input', function (ev) {
      state.q = ev.target.value.trim().toLowerCase();
      applyFilter();
    });
  }

  function buildLegend() {
    var h = '';
    Object.keys(KIND).forEach(function (k) {
      if (!G.edges.some(function (e) { return e.kind === k; })) return;
      h += '<span><svg width="28" height="8" aria-hidden="true"><line class="k-' + k + '" x1="1" y1="4" x2="27" y2="4" stroke-width="' +
        (KIND[k].w + 0.6) + '"' + (KIND[k].dash ? ' stroke-dasharray="' + KIND[k].dash + '"' : '') + '/></svg> ' + KIND[k].name + '</span>';
    });
    document.getElementById('legend-edges').innerHTML = h;
  }

  // ---------- drawing ----------

  function render() {
    if (!G) return;
    dirty = false;
    var hn = {}, he = {}, nb = null;
    if (state.story >= 0) {
      G.story[state.story].nodes.forEach(function (k) { hn[rep(k).id] = 1; });
      G.story[state.story].edges.forEach(function (k) { he[k] = 1; });
    } else if (state.sel) {
      // Focus mode: the selected node and its direct neighbours stay lit.
      nb = {};
      nb[rep(state.sel).id] = 1;
      G.edges.forEach(function (e) {
        if (e.from === state.sel) nb[rep(e.to).id] = 1;
        if (e.to === state.sel) nb[rep(e.from).id] = 1;
      });
    }
    var selEdge = state.selE ? edgeById[state.selE] : null;
    items.forEach(project);

    edgeObjs.forEach(function (x) {
      var e = x.e, a = rep(e.from), b = rep(e.to);
      if (a === b) { x.g.style.display = 'none'; x.lb.style.opacity = 0; x.want = false; return; }
      x.g.style.display = '';
      var dx = b.px - a.px, dy = b.py - a.py;
      var L = Math.sqrt(dx * dx + dy * dy) || 1;
      var bulge = x.bend * Math.min(70, 6 + L * 0.22);
      var cx = (a.px + b.px) / 2 - dy / L * bulge, cy = (a.py + b.py) / 2 + dx / L * bulge;
      var la = Math.hypot(cx - a.px, cy - a.py) || 1, lb = Math.hypot(b.px - cx, b.py - cy) || 1;
      var x1 = a.px + (cx - a.px) / la * a.rr, y1 = a.py + (cy - a.py) / la * a.rr;
      var x2 = b.px - (b.px - cx) / lb * (b.rr + 4), y2 = b.py - (b.py - cy) / lb * (b.rr + 4);
      var d = 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
      x.ln.setAttribute('d', d); x.hit.setAttribute('d', d);

      var fade = clamp(((a.z + b.z) / 2 + 200) / 400, 0, 1) * state.depth;
      var ok = a.vis && b.vis;
      var touchesSel = state.sel && (e.from === state.sel || e.to === state.sel);
      var isSel = state.selE === e.id;
      var op;
      if (!ok) op = 0.03;
      else if (state.story >= 0) op = he[e.id] ? 1 : 0.05;
      else if (isSel) op = 1;
      else if (!a.match || !b.match) op = 0.05;
      else if (state.sel) op = touchesSel ? 1 : 0.05;
      else if (selEdge) op = 0.12;
      else op = 0.85 - 0.5 * fade;
      x.g.style.opacity = op;
      var strong = isSel || he[e.id] || touchesSel;
      x.ln.setAttribute('stroke-width', strong ? x.k.w + 1 : x.k.w);
      var show = ok && (isSel || (state.story >= 0 && he[e.id]) || (state.story < 0 && touchesSel) ||
        (state.story < 0 && !state.sel && !selEdge && state.zm >= 1.3 && a.match && b.match));
      x.want = show; x.isSel = isSel; x.story = !!he[e.id];
      x.lx = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
      x.ly = 0.25 * y1 + 0.5 * cy + 0.25 * y2 - 3;
      x.lb.setAttribute('x', x.lx); x.lb.setAttribute('y', x.ly);
      x.lb.style.opacity = show ? 1 : 0;
    });

    items.slice().sort(function (a, b) { return b.z - a.z; }).forEach(function (n) {
      if (n.hidden) { n.g.style.display = 'none'; return; }
      n.g.style.display = '';
      var r = n.rr;
      if (n.type === 'event') {
        var q = r * 1.15;
        n.shape.setAttribute('points', n.px + ',' + (n.py - q) + ' ' + (n.px + q) + ',' + n.py + ' ' + n.px + ',' + (n.py + q) + ' ' + (n.px - q) + ',' + n.py);
      } else {
        n.shape.setAttribute('cx', n.px); n.shape.setAttribute('cy', n.py); n.shape.setAttribute('r', r);
      }
      if (n.ring) { n.ring.setAttribute('cx', n.px); n.ring.setAttribute('cy', n.py); n.ring.setAttribute('r', r + 3.5); }
      var lit = state.sel === n.id || hn[n.id];
      n.shape.setAttribute('stroke-width', lit ? '2.2' : '0.6');
      n.numEl.setAttribute('x', n.px); n.numEl.setAttribute('y', n.py);
      n.numEl.style.display = r >= 6 ? 'block' : 'none';
      var side = LABEL_LEFT[n.type] ? -1 : 1;
      var lx = n.px + side * (r + (n.ring ? 8 : 5));
      n.nameEl.setAttribute('x', lx); n.nameEl.setAttribute('y', n.py - 1);
      n.subEl.setAttribute('x', lx); n.subEl.setAttribute('y', n.py + 10);
      var fade = clamp((n.z + 200) / 400, 0, 1) * state.depth, op;
      if (!n.vis) op = 0;
      else if (state.story >= 0) op = hn[n.id] ? 1 : 0.12;
      else if (selEdge) op = (rep(selEdge.from) === n || rep(selEdge.to) === n) ? 1 : 0.15;
      else if (nb) op = nb[n.id] ? 1 : 0.1;
      else if (!n.match) op = 0.1;
      else op = 1 - 0.45 * fade;
      n.g.style.opacity = op;
      // Second line of the label only when rows have room for it, or the node is in focus.
      var roomy = ROW * state.zm >= 24;
      n.subEl.style.display = (roomy || lit || (nb && nb[n.id])) ? '' : 'none';
      n.g.style.pointerEvents = op < 0.05 ? 'none' : '';
      gNodes.appendChild(n.g);
    });
    declutter(hn, nb);
  }

  // Labels claim screen space in priority order; a label that would land on another is hidden.
  // Node discs are always drawn. The focused node, its neighbours and story nodes always keep their name.
  function declutter(hn, nb) {
    var boxes = [];
    function hit(b, labelsOnly) {
      for (var i = 0; i < boxes.length; i++) {
        var o = boxes[i];
        if (labelsOnly && o.d) continue;
        if (b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y) return true;
      }
      return false;
    }
    var vis = items.filter(function (n) { return !n.hidden && n.vis; });
    vis.forEach(function (n) { boxes.push({ d: 1, x: n.px - n.rr, y: n.py - n.rr, w: 2 * n.rr, h: 2 * n.rr }); });
    function pr(n) {
      return (state.sel === n.id ? 1000 : 0) + (hn[n.id] ? 500 : 0) + ((nb && nb[n.id]) ? 300 : 0) +
        (n.match ? 0 : -100) + (n.deg || 0);
    }
    vis.slice().sort(function (a, b) { return pr(b) - pr(a); }).forEach(function (n) {
      var w = Math.max(n.label.length * 5.8, (n.sub || '').length * 4.7);
      var left = LABEL_LEFT[n.type];
      var b = { x: left ? n.px - n.rr - 5 - w : n.px + n.rr + 5, y: n.py - 11, w: w, h: 22 };
      var forced = state.sel === n.id || hn[n.id] || (nb && nb[n.id]);
      var show = state.sel === n.id || !hit(b, forced);
      n.nameEl.style.display = show ? '' : 'none';
      n.subEl.style.display = show ? '' : 'none';
      if (show) boxes.push(b);
    });
    edgeObjs.filter(function (x) { return x.want; })
      .sort(function (a, b) { return (b.isSel ? 2 : b.story ? 1 : 0) - (a.isSel ? 2 : a.story ? 1 : 0); })
      .forEach(function (x) {
        var w = x.e.label.length * 5.4;
        var b = { x: x.lx - w / 2, y: x.ly - 10, w: w, h: 13 };
        var show = x.isSel || !hit(b);
        x.lb.style.opacity = show ? 1 : 0;
        if (show) boxes.push(b);
      });
  }

  // ---------- details panel ----------

  function tag(t) { return '<span class="tag ' + esc(t) + '">' + esc(t) + '</span>'; }
  function section(title, body, open) {
    return '<details' + (open ? ' open' : '') + '><summary>' + title + '</summary><div>' + body + '</div></details>';
  }
  function pageNote(e) { return G.meta.showSources ? ' (p.' + esc(e.page) + ')' : ''; }

  function pickNode(id) {
    var n = byId[id];
    if (n.group && state.collapsed[n.group]) { state.collapsed[n.group] = false; layout(); updateButtons(); }
    state.sel = id; state.selE = null;
    panTo(n.tY);
    var isEvent = n.type === 'event';
    var h = '<p class="detail-title">#' + n.no + ' ' + esc(n.label) + '</p>' +
      '<p class="detail-sub">' + esc(TYPE_NAME[n.type] || n.type) + ' &middot; chapter ' + n.chapter +
      ' &middot; ' + n.deg + ' connection' + (n.deg === 1 ? '' : 's') + '</p>';
    if (n.group) {
      var g = G.groups.filter(function (x) { return x.id === n.group; })[0];
      h += '<p class="detail-sub">Part of ' + esc(g.label) + '. <a href="#" data-fold="' + esc(g.id) + '">Fold this group</a></p>';
    }
    h += section(isEvent ? 'What happens' : 'What it is', txt(n.what), true);
    h += section(isEvent ? 'What led to it' : 'Where it came from', txt(n.origin), true);
    h += section(isEvent ? 'What came of it' : 'Why it matters', txt(n.why), true);
    var also = (n.also && n.also.length) ? n.also.map(function (s) {
      return '<div>' + tag(s.tag) + esc(s.text) + '</div>';
    }).join('') : 'Nothing checked yet.';
    h += section('Also told in (other texts)', also, false);
    if (!isEvent) {
      h += section('Cosmic parallel (interpretation, not from any text)',
        n.parallel ? tag(n.parallel.tag) + esc(n.parallel.text) : 'No physical parallel worth claiming.', false);
    }
    var cn = [];
    G.edges.forEach(function (e) {
      var kn = (KIND[e.kind] || KIND.acts).name;
      if (e.from === id) cn.push('<a href="#" data-e="' + e.id + '">&rarr; #' + byId[e.to].no + ' ' + esc(byId[e.to].label) + '</a>: ' + esc(e.label) + ' <span class="muted">[' + kn + ']</span>' + pageNote(e));
      if (e.to === id) cn.push('<a href="#" data-e="' + e.id + '">&larr; #' + byId[e.from].no + ' ' + esc(byId[e.from].label) + '</a>: ' + esc(e.label) + ' <span class="muted">[' + kn + ']</span>' + pageNote(e));
    });
    h += section('Connections', cn.join('<br>') || 'None yet.', true);
    setDetail(h);
  }

  function pickGroup(gid, unfold) {
    var g = G.groups.filter(function (x) { return x.id === gid; })[0];
    if (unfold) state.collapsed[gid] = false;
    state.sel = null; state.selE = null;
    layout(); updateButtons();
    var h = '<p class="detail-title">' + esc(g.label) + '</p>' +
      '<p class="detail-sub">group of ' + g.node.members.length + ' &middot; ' + (state.collapsed[gid] ? 'folded' : 'unfolded') + '</p>' +
      '<p>' + txt(g.what) + '</p><p>' +
      g.node.members.map(function (m) { return '<a href="#" data-n="' + m.id + '">#' + m.no + ' ' + esc(m.label) + '</a>'; }).join(' &rarr; ') +
      '</p><p><a href="#" data-fold="' + esc(gid) + '">' + (state.collapsed[gid] ? 'Unfold' : 'Fold') + ' this group</a></p>';
    setDetail(h);
  }

  function pickEdge(id) {
    state.sel = null; state.selE = id;
    var e = edgeById[id], a = byId[e.from], b = byId[e.to];
    var h = '<p class="detail-title"><a href="#" data-n="' + a.id + '">#' + a.no + ' ' + esc(a.label) + '</a> &rarr; <a href="#" data-n="' + b.id + '">#' + b.no + ' ' + esc(b.label) + '</a></p>' +
      '<p class="detail-sub">' + esc((KIND[e.kind] || KIND.acts).name) + ' &middot; chapter ' + e.chapter + '</p>' +
      '<p>' + esc(e.label) + '</p><p>' + txt(e.meaning) + '</p>';
    if (G.meta.showSources) {
      h += '<p class="muted">Source: ' + esc(e.source || G.meta.source) + ', p.' + esc(e.page) + '. An asterisk means the page number is inferred.</p>';
    }
    setDetail(h);
  }

  function setDetail(h) {
    detail.innerHTML = h;
    detail.querySelectorAll('a[data-e]').forEach(function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); state.moved = 0; pickEdge(a.dataset.e); });
    });
    detail.querySelectorAll('a[data-n]').forEach(function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); state.moved = 0; pickNode(a.dataset.n); });
    });
    detail.querySelectorAll('a[data-fold]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var gid = a.dataset.fold;
        state.collapsed[gid] = !state.collapsed[gid];
        pickGroup(gid, false);
      });
    });
    render();
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearSel() {
    state.sel = null; state.selE = null;
    detail.innerHTML = '<p class="muted">Tap a node or a line to read its description here.</p>';
    dirty = true;
  }

  // ---------- story mode ----------

  function renderStoryPanel() {
    if (state.story < 0) {
      storyEl.innerHTML = '<div>Walk the ' + G.story.length + ' beats in the order they are told, with the rest of the graph dimmed.</div><button id="go" style="margin-top:8px">Start the story &#9654;</button>';
      document.getElementById('go').addEventListener('click', function () { setStory(0); });
      return;
    }
    var s = G.story[state.story];
    var nn = s.nodes.map(function (k) { return '#' + byId[k].no + ' ' + esc(byId[k].label); }).join(', ');
    storyEl.innerHTML = '<div class="muted">Step ' + (state.story + 1) + ' of ' + G.story.length +
      (G.meta.showSources ? ' &middot; p.' + esc(s.pages) : '') + '</div>' +
      '<p class="detail-title">' + esc(s.title) + '</p><div>' + txt(s.text) + '</div>' +
      '<div class="muted" style="margin-top:4px">Nodes: ' + nn + '</div>' +
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button id="pv">&#9664; Back</button><button id="nx">' +
      (state.story < G.story.length - 1 ? 'Next &#9654;' : 'Done') + '</button><button id="ex">Explore freely</button></div>';
    document.getElementById('pv').addEventListener('click', function () { setStory(state.story - 1); });
    document.getElementById('nx').addEventListener('click', function () {
      state.story < G.story.length - 1 ? setStory(state.story + 1) : setStory(-1);
    });
    document.getElementById('ex').addEventListener('click', function () { setStory(-1); });
  }

  function setStory(i) {
    state.story = Math.max(-1, Math.min(G.story.length - 1, i));
    if (state.story >= 0) {
      state.sel = null; state.selE = null;
      var any = false;
      G.groups.forEach(function (g) { if (state.collapsed[g.id]) { state.collapsed[g.id] = false; any = true; } });
      if (any) layout();
      setMode('flat');
      // Bring the step's nodes to the middle of the view.
      var ns = G.story[state.story].nodes, sum = 0;
      ns.forEach(function (k) { sum += byId[k].tY; });
      panTo(sum / ns.length);
      updateButtons();
    }
    renderStoryPanel();
    dirty = true;
  }

  // ---------- controls ----------

  function setMode(m) {
    var was = state.mode;
    state.mode = m;
    if (m === 'flat') {
      state.tgt = { a: 0, t: 0, r: 0 }; state.depthT = 0; state.auto = false;
      if (was === '3d') fit();
    } else {
      state.tgt = { a: A3.a, t: A3.t, r: 0 }; state.depthT = 1;
      if (was !== '3d') { state.zm = clamp(state.zm * (laneK > 1.5 ? 0.72 : 0.6), 0.4, 3); state.panX = 0; state.panY = 0; state.panT = null; }
    }
    updateButtons();
  }

  function updateButtons() {
    var flat = state.mode === 'flat';
    document.getElementById('mode').textContent = flat ? '3D view' : 'Timeline view';
    var spin = document.getElementById('spin');
    spin.style.display = flat ? 'none' : '';
    spin.textContent = state.auto ? 'Pause spin' : 'Spin';
    var fold = document.getElementById('fold');
    if (!G.groups.length) fold.style.display = 'none';
    var anyOpen = G.groups.some(function (g) { return g.node && !state.collapsed[g.id]; });
    fold.textContent = anyOpen ? 'Fold groups' : 'Unfold groups';
    hintEl.textContent = flat
      ? 'Top to bottom is the order of telling. One finger drags, two fingers pinch to zoom. Tap a node to focus on it and its neighbours; tap empty space to clear.'
      : 'One finger rotates, two fingers pinch and twist. Tap a node to focus on it and its neighbours; tap empty space to clear.';
  }

  function twoPointers() {
    var k = Object.keys(pts), a = pts[k[0]], b = pts[k[1]];
    return { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, a: Math.atan2(b.y - a.y, b.x - a.x) };
  }

  function bindControls() {
    svg.addEventListener('pointerdown', function (e) {
      state.tgt = null; state.panT = null;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var n = Object.keys(pts).length;
      if (n === 1) state.moved = 0;
      if (n === 2) { var t = twoPointers(); pd = t.d; pa = t.a; state.moved = 99; }
    });
    window.addEventListener('pointermove', function (e) {
      var p = pts[e.pointerId];
      if (!p) return;
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      var n = Object.keys(pts).length;
      if (n === 1) {
        state.moved += Math.abs(dx) + Math.abs(dy);
        if (state.mode === 'flat') {
          var k = VW / (svg.clientWidth || VW);
          state.panX += dx * k; state.panY += dy * k;
        } else {
          state.ang += dx * 0.012; state.tilt += dy * 0.012;
        }
      } else if (n === 2) {
        var t = twoPointers();
        state.zm = clamp(state.zm * t.d / pd, 0.4, 3);
        if (state.mode !== 'flat') state.roll += t.a - pa;
        pd = t.d; pa = t.a; state.moved = 99;
      }
      dirty = true;
    });
    function up(e) {
      delete pts[e.pointerId];
      if (Object.keys(pts).length === 2) { var t = twoPointers(); pd = t.d; pa = t.a; }
    }
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      state.zm = clamp(state.zm * (e.deltaY < 0 ? 1.1 : 0.9), 0.4, 3);
      dirty = true;
    }, { passive: false });
    document.getElementById('bg').addEventListener('click', function () {
      if (state.moved > 6) return;
      clearSel();
    });
    document.getElementById('zin').addEventListener('click', function () { state.zm = clamp(state.zm * 1.25, 0.4, 3); dirty = true; });
    document.getElementById('zout').addEventListener('click', function () { state.zm = clamp(state.zm / 1.25, 0.4, 3); dirty = true; });
    document.getElementById('reset').addEventListener('click', function () {
      fit();
      if (state.mode === '3d') state.zm = clamp(state.zm * (laneK > 1.5 ? 0.72 : 0.6), 0.4, 3);
      setMode(state.mode); dirty = true;
    });
    document.getElementById('mode').addEventListener('click', function () {
      setMode(state.mode === 'flat' ? '3d' : 'flat');
      dirty = true;
    });
    document.getElementById('spin').addEventListener('click', function () {
      state.auto = !state.auto;
      updateButtons();
    });
    document.getElementById('fold').addEventListener('click', function () {
      var anyOpen = G.groups.some(function (g) { return g.node && !state.collapsed[g.id]; });
      G.groups.forEach(function (g) { if (g.node) state.collapsed[g.id] = anyOpen; });
      if (anyOpen && state.sel && byId[state.sel].group) clearSel();
      layout(); fit(); updateButtons();
    });
  }

  function loop() {
    var t = state.tgt, moving = false;
    if (t) {
      state.ang += wrapAngle(t.a - state.ang) * 0.15;
      state.tilt += wrapAngle(t.t - state.tilt) * 0.15;
      state.roll += wrapAngle(t.r - state.roll) * 0.15;
      if (Math.abs(wrapAngle(t.a - state.ang)) + Math.abs(wrapAngle(t.t - state.tilt)) + Math.abs(wrapAngle(t.r - state.roll)) < 0.003) {
        state.ang = t.a; state.tilt = t.t; state.roll = t.r; state.tgt = null;
      }
      moving = true;
    } else if (state.auto && state.mode === '3d' && state.story < 0 && Object.keys(pts).length === 0 && !state.sel && !state.selE) {
      state.ang += 0.004;
      moving = true;
    }
    if (Math.abs(state.depthT - state.depth) > 0.002) {
      state.depth += (state.depthT - state.depth) * 0.15; moving = true;
    } else if (state.depth !== state.depthT) { state.depth = state.depthT; moving = true; }
    if (state.panT) {
      state.panX += (state.panT.x - state.panX) * 0.2;
      state.panY += (state.panT.y - state.panY) * 0.2;
      if (Math.abs(state.panT.x - state.panX) + Math.abs(state.panT.y - state.panY) < 0.5) state.panT = null;
      moving = true;
    }
    items.forEach(function (n) {
      var dx = n.tX - n.X, dy = n.tY - n.Y;
      if (Math.abs(dx) + Math.abs(dy) > 0.3) { n.X += dx * 0.25; n.Y += dy * 0.25; moving = true; }
      else if (dx || dy) { n.X = n.tX; n.Y = n.tY; moving = true; }
    });
    requestAnimationFrame(loop);
    if (moving || dirty) {
      try { render(); } catch (err) { console.error(err); }
    }
  }
})();
