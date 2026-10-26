/* EXPOSE – filterable database of evasion cases */
(function () {
  "use strict";
  var D = window.EXPOSE_DATA;
  if (!D) return;

  var state = { cats: new Set(), mode: "any", regime: "", year: "", q: "", sort: "year-desc" };
  var el = {
    chips: document.getElementById("chips"),
    mode: document.getElementById("mode"),
    regime: document.getElementById("regime"),
    year: document.getElementById("year"),
    q: document.getElementById("q"),
    sort: document.getElementById("sort"),
    list: document.getElementById("cases"),
    count: document.getElementById("count"),
    chart: document.getElementById("chart"),
    active: document.getElementById("active"),
    clear: document.getElementById("clear"),
    csv: document.getElementById("csv")
  };
  var catById = {}, regById = {};
  D.categories.forEach(function (c) { catById[c.id] = c; });
  D.regimes.forEach(function (r) { regById[r.id] = r; });

  /* ----- build controls ----- */
  D.categories.forEach(function (cat) {
    var n = D.cases.filter(function (c) { return c.categories.indexOf(cat.id) > -1; }).length;
    var label = document.createElement("label");
    label.className = "chip";
    label.style.setProperty("--c", cat.color);
    label.innerHTML = "<input type='checkbox'><span class='sw'></span><span class='t'></span><span class='n'></span>";
    var input = label.querySelector("input");
    input.value = cat.id;
    label.querySelector(".t").textContent = cat.label;
    label.querySelector(".n").textContent = n;
    input.addEventListener("change", function () {
      if (input.checked) state.cats.add(cat.id); else state.cats.delete(cat.id);
      update();
    });
    el.chips.appendChild(label);
  });
  D.regimes.forEach(function (r) {
    var o = document.createElement("option"); o.value = r.id; o.textContent = r.label; el.regime.appendChild(o);
  });
  var years = Array.from(new Set(D.cases.map(function (c) { return c.year; }))).sort(function (a, b) { return b - a; });
  years.forEach(function (y) { var o = document.createElement("option"); o.value = y; o.textContent = y; el.year.appendChild(o); });

  el.regime.addEventListener("change", function () { state.regime = el.regime.value; update(); });
  el.year.addEventListener("change", function () { state.year = el.year.value; update(); });
  el.sort.addEventListener("change", function () { state.sort = el.sort.value; update(); });
  el.q.addEventListener("input", function () { state.q = el.q.value.trim().toLowerCase(); update(); });
  el.mode.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () {
      state.mode = b.dataset.mode;
      el.mode.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      update();
    });
  });
  el.clear.addEventListener("click", reset);

  function reset() {
    state = { cats: new Set(), mode: "any", regime: "", year: "", q: "", sort: state.sort };
    el.chips.querySelectorAll("input").forEach(function (i) { i.checked = false; });
    el.regime.value = ""; el.year.value = ""; el.q.value = "";
    el.mode.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.mode === "any" ? "true" : "false"); });
    update();
  }

  /* ----- filtering ----- */
  function matches(c) {
    if (state.regime && c.regime !== state.regime) return false;
    if (state.year && String(c.year) !== String(state.year)) return false;
    if (state.cats.size) {
      var sel = Array.from(state.cats);
      var ok = state.mode === "all"
        ? sel.every(function (id) { return c.categories.indexOf(id) > -1; })
        : sel.some(function (id) { return c.categories.indexOf(id) > -1; });
      if (!ok) return false;
    }
    if (state.q) {
      var hay = (c.title + " " + c.summary + " " + c.method + " " + c.redFlag + " " + c.report + " " + regById[c.regime].label).toLowerCase();
      if (hay.indexOf(state.q) === -1) return false;
    }
    return true;
  }
  function sorted(list) {
    var s = list.slice();
    var by = {
      "year-desc": function (a, b) { return b.year - a.year || a.id.localeCompare(b.id); },
      "year-asc": function (a, b) { return a.year - b.year || a.id.localeCompare(b.id); },
      "title": function (a, b) { return a.title.localeCompare(b.title); },
      "regime": function (a, b) { return regById[a.regime].label.localeCompare(regById[b.regime].label) || b.year - a.year; }
    };
    return s.sort(by[state.sort]);
  }

  /* ----- rendering ----- */
  function tag(cat) {
    var s = document.createElement("span"); s.className = "tag"; s.style.setProperty("--c", cat.color); s.textContent = cat.label; return s;
  }
  function card(c, i) {
    var first = catById[c.categories[0]];
    var art = document.createElement("article");
    art.className = "case"; art.style.setProperty("--c", first.color); art.style.animationDelay = Math.min(i * 40, 300) + "ms";
    var id = "more-" + c.id;
    art.innerHTML =
      "<div class='top'><span class='badge'></span><span class='badge year'></span><span class='id'></span></div>" +
      "<h3></h3><div class='tags'></div><p class='sum'></p>" +
      "<button class='toggle' aria-expanded='false' aria-controls='" + id + "'>Show details</button>" +
      "<dl class='more' id='" + id + "'><dt>How the evasion works</dt><dd class='m'></dd>" +
      "<dt>Indicator to watch (analyst note)</dt><dd class='r'></dd>" +
      "<dt>Source report</dt><dd class='rep'></dd><dt>Reference</dt><dd><a class='src' target='_blank' rel='noopener'></a></dd></dl>";
    art.querySelector(".badge").textContent = regById[c.regime].label;
    art.querySelector(".year").textContent = c.year;
    art.querySelector(".id").textContent = c.id;
    art.querySelector("h3").textContent = c.title;
    c.categories.forEach(function (id) { art.querySelector(".tags").appendChild(tag(catById[id])); });
    art.querySelector(".sum").textContent = c.summary;
    art.querySelector(".m").textContent = c.method;
    art.querySelector(".r").textContent = c.redFlag;
    art.querySelector(".rep").textContent = c.report;
    var a = art.querySelector(".src"); a.href = c.sourceUrl; a.textContent = c.sourceTitle;
    var t = art.querySelector(".toggle");
    t.addEventListener("click", function () {
      var open = art.classList.toggle("open");
      t.setAttribute("aria-expanded", open); t.textContent = open ? "Hide details" : "Show details";
    });
    return art;
  }
  function renderChart(list) {
    el.chart.innerHTML = "";
    var max = 1, counts = D.categories.map(function (cat) {
      var n = list.filter(function (c) { return c.categories.indexOf(cat.id) > -1; }).length; if (n > max) max = n; return n;
    });
    D.categories.forEach(function (cat, i) {
      var row = document.createElement("div"); row.className = "bar-row"; row.style.setProperty("--c", cat.color);
      row.innerHTML = "<span class='l'></span><div class='track'><div class='fill'></div></div><b></b>";
      row.querySelector(".l").textContent = cat.label;
      row.querySelector(".fill").style.width = (counts[i] / max * 100) + "%";
      row.querySelector("b").textContent = counts[i];
      el.chart.appendChild(row);
    });
  }
  function renderActive() {
    el.active.innerHTML = "";
    function pill(text, fn) { var b = document.createElement("button"); b.className = "pill-x"; b.textContent = text; b.addEventListener("click", fn); el.active.appendChild(b); }
    state.cats.forEach(function (id) {
      pill(catById[id].label, function () {
        state.cats.delete(id);
        el.chips.querySelector("input[value='" + id + "']").checked = false; update();
      });
    });
    if (state.regime) pill(regById[state.regime].label, function () { state.regime = ""; el.regime.value = ""; update(); });
    if (state.year) pill(String(state.year), function () { state.year = ""; el.year.value = ""; update(); });
    if (state.q) pill("“" + state.q + "”", function () { state.q = ""; el.q.value = ""; update(); });
  }
  var current = [];
  function update() {
    current = sorted(D.cases.filter(matches));
    el.list.innerHTML = "";
    if (!current.length) {
      var e = document.createElement("div"); e.className = "empty";
      e.innerHTML = "<h3>No cases match these filters</h3><p>Try removing a category, or switch the match mode to “any”.</p>";
      el.list.appendChild(e);
    } else current.forEach(function (c, i) { el.list.appendChild(card(c, i)); });
    el.count.textContent = current.length + " of " + D.cases.length + " cases shown";
    renderChart(current); renderActive();
    syncUrl();
  }

  /* ----- URL sync (shareable filters) ----- */
  function syncUrl() {
    var p = new URLSearchParams();
    if (state.cats.size) p.set("cat", Array.from(state.cats).join(","));
    if (state.mode !== "any") p.set("mode", state.mode);
    if (state.regime) p.set("regime", state.regime);
    if (state.year) p.set("year", state.year);
    if (state.q) p.set("q", state.q);
    var s = p.toString();
    try { history.replaceState(null, "", s ? "?" + s : location.pathname); } catch (e) { /* file:// or sandbox */ }
  }
  function readUrl() {
    var p = new URLSearchParams(location.search);
    (p.get("cat") || "").split(",").filter(Boolean).forEach(function (id) {
      var i = el.chips.querySelector("input[value='" + id + "']");
      if (i) { i.checked = true; state.cats.add(id); }
    });
    if (p.get("mode") === "all") { state.mode = "all"; el.mode.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.mode === "all" ? "true" : "false"); }); }
    if (regById[p.get("regime")]) { state.regime = p.get("regime"); el.regime.value = state.regime; }
    if (p.get("year") && years.indexOf(Number(p.get("year"))) > -1) { state.year = p.get("year"); el.year.value = state.year; }
    if (p.get("q")) { state.q = p.get("q").toLowerCase(); el.q.value = p.get("q"); }
  }

  /* ----- CSV export of the current selection ----- */
  el.csv.addEventListener("click", function () {
    function esc(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
    var rows = [["id", "regime", "year", "title", "categories", "summary", "method", "indicator", "report", "source"]];
    current.forEach(function (c) {
      rows.push([c.id, regById[c.regime].label, c.year, c.title, c.categories.map(function (i) { return catById[i].label; }).join("; "), c.summary, c.method, c.redFlag, c.report, c.sourceUrl]);
    });
    var blob = new Blob(["﻿" + rows.map(function (r) { return r.map(esc).join(","); }).join("\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "expose-cases.csv";
    document.body.appendChild(a); a.click(); a.remove();
  });

  readUrl();
  update();
})();
