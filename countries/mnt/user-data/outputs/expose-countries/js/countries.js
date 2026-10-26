/* EXPOSE – interactive countries map. No external libraries. */
(function () {
  "use strict";

  var WORLD = window.EXPOSE_WORLD || [];
  var LIST = window.EXPOSE_COUNTRIES || [];
  var D = window.EXPOSE_DATA || { regimes: [], cases: [] };
  var NS = "http://www.w3.org/2000/svg";
  var VB_W = 960, VB_H = 500;

  var TYPES = {
    none: "No UN sanctions",
    sanctions: "UN sanctions, no Panel of Experts",
    panel: "UN sanctions + Panel of Experts"
  };
  var STATUS = { active: "Panel active", ended: "Panel ended", check: "Mandate: check UN site" };

  var svg = document.getElementById("cx-map");
  var world = document.getElementById("cx-world");
  var tip = document.getElementById("cx-tip");
  var detail = document.getElementById("cx-detail");
  if (!svg || !world || !WORLD.length) return;

  var byId = {};
  LIST.forEach(function (c) { byId[c.id] = c; });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function typeOf(id) { return byId[id] ? byId[id].type : "none"; }
  function nameOf(id, fallback) { return byId[id] ? byId[id].name : fallback; }

  /* ---------- draw the map ---------- */
  var order = { none: 0, sanctions: 1, panel: 2 };
  var items = WORLD.slice().sort(function (a, b) { return order[typeOf(a.id)] - order[typeOf(b.id)]; });
  var pathsById = {};

  items.forEach(function (w) {
    var t = typeOf(w.id);
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", w.d);
    p.setAttribute("class", "c c-" + t);
    p.setAttribute("data-id", w.id);
    p.setAttribute("data-name", nameOf(w.id, w.n));
    if (t !== "none") {
      p.setAttribute("tabindex", "0");
      p.setAttribute("role", "button");
      p.setAttribute("aria-label", nameOf(w.id, w.n) + ": " + TYPES[t]);
    }
    world.appendChild(p);
    (pathsById[w.id] = pathsById[w.id] || []).push(p);
  });

  /* ---------- zoom and pan ---------- */
  var view = { x: 0, y: 0, w: VB_W, h: VB_H };
  function applyView() { svg.setAttribute("viewBox", view.x + " " + view.y + " " + view.w + " " + view.h); }
  function clamp() {
    view.x = Math.max(0, Math.min(VB_W - view.w, view.x));
    view.y = Math.max(0, Math.min(VB_H - view.h, view.y));
  }
  function zoomBy(f, cx, cy) {
    var nw = Math.max(VB_W / 12, Math.min(VB_W, view.w / f));
    var nh = nw * VB_H / VB_W;
    var rx = (cx - view.x) / view.w, ry = (cy - view.y) / view.h;
    view.x = cx - rx * nw; view.y = cy - ry * nh; view.w = nw; view.h = nh;
    clamp(); applyView();
    svg.classList.toggle("zoomed", view.w < VB_W - 1);
  }
  function toMap(clientX, clientY) {
    var r = svg.getBoundingClientRect();
    return { x: view.x + (clientX - r.left) / r.width * view.w, y: view.y + (clientY - r.top) / r.height * view.h };
  }
  function resetView() { view = { x: 0, y: 0, w: VB_W, h: VB_H }; applyView(); svg.classList.remove("zoomed"); }
  function zoomCenter(f) { zoomBy(f, view.x + view.w / 2, view.y + view.h / 2); }

  document.getElementById("cx-zin").addEventListener("click", function () { zoomCenter(1.6); });
  document.getElementById("cx-zout").addEventListener("click", function () { zoomCenter(1 / 1.6); });
  document.getElementById("cx-zreset").addEventListener("click", resetView);

  svg.addEventListener("wheel", function (e) {
    if (!(e.ctrlKey || e.metaKey)) return; // normal scroll keeps scrolling the page
    e.preventDefault();
    var m = toMap(e.clientX, e.clientY);
    zoomBy(e.deltaY < 0 ? 1.25 : 1 / 1.25, m.x, m.y);
  }, { passive: false });

  var drag = null, moved = false;
  svg.addEventListener("pointerdown", function (e) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    moved = false;
  });
  window.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
    if (!moved || view.w >= VB_W - 1) return;
    var r = svg.getBoundingClientRect();
    view.x = drag.vx - dx / r.width * view.w;
    view.y = drag.vy - dy / r.height * view.h;
    clamp(); applyView();
    tip.hidden = true;
  });
  window.addEventListener("pointerup", function () { drag = null; });

  /* ---------- tooltip ---------- */
  var wrap = svg.parentNode;
  svg.addEventListener("mousemove", function (e) {
    var id = e.target.getAttribute && e.target.getAttribute("data-id");
    if (!id || drag) { tip.hidden = true; return; }
    var t = typeOf(id);
    tip.innerHTML = "";
    tip.appendChild(el("strong", null, e.target.getAttribute("data-name")));
    tip.appendChild(el("span", "tt tt-" + t, TYPES[t]));
    var r = wrap.getBoundingClientRect();
    tip.style.left = Math.min(e.clientX - r.left + 14, r.width - 220) + "px";
    tip.style.top = (e.clientY - r.top + 14) + "px";
    tip.hidden = false;
  });
  svg.addEventListener("mouseleave", function () { tip.hidden = true; });

  /* ---------- link a country to a regime in data/cases.js ---------- */
  function rx(word) { return new RegExp("\\b" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i"); }
  function findRegime(c) {
    if (!c.match || !D.regimes) return null;
    var best = null, bestScore = 0;
    D.regimes.forEach(function (r) {
      var hay = (r.label || "") + " " + (r.res || "") + " " + (r.id || "");
      if ((c.exclude || []).some(function (x) { return rx(x).test(hay); })) return;
      var score = c.match.some(function (m) { return rx(m).test(hay); }) ? 1 : 0;
      if (score > bestScore) { best = r; bestScore = score; }
    });
    return best;
  }

  /* ---------- details panel ---------- */
  var selected = null;
  function row(dl, k, v) {
    if (!v) return;
    dl.appendChild(el("dt", null, k));
    dl.appendChild(el("dd", null, v));
  }

  function showDetail(id, fallbackName) {
    var c = byId[id], t = typeOf(id);
    detail.innerHTML = "";
    detail.appendChild(el("span", "badge badge-" + t, TYPES[t]));
    detail.appendChild(el("h3", null, c ? c.name : fallbackName));

    if (!c) {
      detail.appendChild(el("p", null, "No UN Security Council sanctions regime has been applied to this country, so it is outside the scope of the EXPOSE dataset."));
      detail.appendChild(el("p", "small", "It may still be subject to autonomous sanctions imposed by the EU, the US or others. EXPOSE covers UN sanctions only."));
      return;
    }

    var dl = el("dl", "facts");
    row(dl, "Sanctions regime", c.regime);
    row(dl, "Resolutions", c.res);
    row(dl, "Sanctions period", c.years);
    row(dl, "Main measures", c.measures);
    if (c.type === "panel") {
      row(dl, "Panel of Experts", c.panel);
      row(dl, "Panel period", c.panelYears);
    } else {
      row(dl, "Panel of Experts", "None. This regime has no Panel of Experts, so it is not part of the EXPOSE study.");
    }
    detail.appendChild(dl);

    if (c.type === "panel" && c.status) detail.appendChild(el("p", "status status-" + c.status, STATUS[c.status]));
    if (c.summary) detail.appendChild(el("p", null, c.summary));

    if (c.type === "panel") {
      var r = findRegime(c);
      if (r) {
        var n = (D.cases || []).filter(function (x) { return x.regime === r.id; }).length;
        var p = el("p", "cta-row");
        p.appendChild(el("strong", null, n + (n === 1 ? " case" : " cases") + " in the database  "));
        var a = el("a", "btn btn-primary btn-sm", "See these cases →");
        a.href = "database.html?regime=" + encodeURIComponent(r.id);
        p.appendChild(a);
        detail.appendChild(p);
      }
    }
  }

  function select(id, name, scroll) {
    if (selected && pathsById[selected]) pathsById[selected].forEach(function (p) { p.classList.remove("sel"); });
    selected = id;
    (pathsById[id] || []).forEach(function (p) { p.classList.add("sel"); world.appendChild(p); });
    showDetail(id, name || nameOf(id, id));
    try { history.replaceState(null, "", "?c=" + id); } catch (e) {}
    document.querySelectorAll(".cx-chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
    if (scroll) document.getElementById("cx-stage").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  svg.addEventListener("click", function (e) {
    if (moved) { moved = false; return; }
    var id = e.target.getAttribute && e.target.getAttribute("data-id");
    if (id) select(id, e.target.getAttribute("data-name"));
  });
  svg.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var id = e.target.getAttribute && e.target.getAttribute("data-id");
    if (id) { e.preventDefault(); select(id, e.target.getAttribute("data-name")); }
  });

  /* ---------- legend (counts + show/hide) ---------- */
  var counts = { none: 0, sanctions: 0, panel: 0 };
  var seen = {};
  WORLD.forEach(function (w) { if (!seen[w.id]) { seen[w.id] = 1; counts[typeOf(w.id)]++; } });

  document.querySelectorAll(".cx-legend button").forEach(function (b) {
    var t = b.getAttribute("data-type");
    var n = b.querySelector(".n");
    if (n) n.textContent = counts[t];
    b.addEventListener("click", function () {
      var on = b.getAttribute("aria-pressed") === "true";
      b.setAttribute("aria-pressed", String(!on));
      svg.classList.toggle("hide-" + t, on);
      var list = document.getElementById("cx-list-" + t);
      if (list) list.hidden = on;
    });
  });

  /* ---------- country lists under the map ---------- */
  function fillList(type) {
    var box = document.getElementById("cx-chips-" + type);
    if (!box) return;
    LIST.filter(function (c) { return c.type === type; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); })
      .forEach(function (c) {
        var b = el("button", "cx-chip cx-chip-" + type);
        b.type = "button";
        b.setAttribute("data-id", c.id);
        b.setAttribute("aria-pressed", "false");
        b.appendChild(el("span", "nm", c.name));
        b.appendChild(el("span", "yr", c.type === "panel" ? c.panelYears : c.years));
        b.addEventListener("click", function () { select(c.id, c.name, true); });
        box.appendChild(b);
      });
  }
  fillList("panel");
  fillList("sanctions");

  /* ---------- initial state ---------- */
  var q = /[?&]c=(\d{3})/.exec(location.search);
  if (q && pathsById[q[1]]) select(q[1]);
})();
