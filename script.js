// --- 1. DATA PRODUKTŮ A CENY ---

const P = [
  {
    id: "fig",
    n: "Noir Fig",
    bg: "#1f3b2d",
    acc: "#c9d8a8",
    base: 990,
    t: "Fíkový list, zelené mléko, vetiver.",
    d: "Chladná zeleň a hřejivé dřevo. Voní jako zahrada po dešti.",
    notes: [
      ["Fíkový list", "svěží, zelený", [8, 58]],
      ["Mléko z kokosu", "jemné, krémové", [74, 34]],
      ["Vetiver", "hlubokou zemitou základnu", [12, 22]]
    ]
  },
  {
    id: "sel",
    n: "Sel Marin",
    bg: "#1d4f6e",
    acc: "#bfe3f2",
    base: 1090,
    t: "Mořská sůl, bergamot, bílý cedr.",
    d: "Vítr, sůl na kůži a slunce na skále. Letní klid ve flakonu.",
    notes: [
      ["Bergamot", "citrusová jiskra", [10, 55]],
      ["Mořská sůl", "minerální, čistá", [72, 30]],
      ["Bílý cedr", "suché dřevo", [78, 66]]
    ]
  },
  {
    id: "amb",
    n: "Ambre Rouge",
    bg: "#7a2a24",
    acc: "#f2c28b",
    base: 1290,
    t: "Ambra, růžový pepř, kadidlo.",
    d: "Teplá, kořenitá a večerní. Zůstává na šále ještě druhý den.",
    notes: [
      ["Růžový pepř", "koření v hlavě", [8, 28]],
      ["Ambra", "sladká, pryskyřičná", [74, 52]],
      ["Kadidlo", "kouřová hloubka", [14, 68]]
    ]
  },
  {
    id: "iri",
    n: "Iris Poudre",
    bg: "#5a4a86",
    acc: "#e8d9ff",
    base: 1190,
    t: "Kořen kosatce, fialka, pižmo.",
    d: "Pudrová a tichá. Voní jako čisté prádlo a staré dopisy.",
    notes: [
      ["Kosatec", "pudr a chlad", [10, 40]],
      ["Fialka", "květinová sladkost", [72, 26]],
      ["Pižmo", "měkká kůže", [76, 70]]
    ]
  }
];

const DET = {
  fig: {
    conc: "Parfémová voda, 15 %", life: 7, sil: 3,
    top: ["Fíkový list", "Zelená mandarinka"],
    heart: ["Kokosové mléko", "Fíková šťáva"],
    base: ["Vetiver", "Cedr"],
    ing: "Alkohol, parfémová báze, přírodní výtažek z fíkového listu, vetiver, kokosové mléko.",
    use: {
      Den: "Lehká a zelená. Stačí dvě tečky na zápěstí.",
      Večer: "Vetiver se otevře a vůně zhoustne. Hodí se na kabát i šálu."
    }
  },
  sel: {
    conc: "Toaletní voda, 10 %", life: 5, sil: 3,
    top: ["Bergamot", "Citron"],
    heart: ["Mořská sůl", "Šalvěj"],
    base: ["Bílý cedr", "Pižmo"],
    ing: "Alkohol, parfémová báze, bergamot z Kalábrie, mořská sůl, bílý cedr.",
    use: {
      Den: "Ideální na pláž nebo do města v létě. Dejte ji na krk.",
      Večer: "Zůstává svěží a čistá. Nanášejte po sprše na vlhkou kůži."
    }
  },
  amb: {
    conc: "Parfém, 20 %", life: 10, sil: 5,
    top: ["Růžový pepř", "Kardamom"],
    heart: ["Ambra", "Labdanum"],
    base: ["Kadidlo", "Vanilka"],
    ing: "Alkohol, parfémová báze, ambra, růžový pepř, kadidlo, vanilka.",
    use: {
      Den: "Silná vůně, stačí jeden střik. Nanášejte opatrně.",
      Večer: "Tady se rozvine naplno. Dva střiky za uši a na hrudník."
    }
  },
  iri: {
    conc: "Parfémová voda, 15 %", life: 8, sil: 2,
    top: ["Mandarinka", "Mrkev"],
    heart: ["Kosatec", "Fialka"],
    base: ["Pižmo", "Santal"],
    ing: "Alkohol, parfémová báze, kořen kosatce, fialka, bílé pižmo, santal.",
    use: {
      Den: "Jemná a pudrová. Ke košili a do kanceláře.",
      Večer: "Zůstává blízko pokožky a voní intimně. Skvělá na večeři ve dvou."
    }
  }
};

const SZ = [[30, 1], [50, 1.55], [100, 2.4]];
const DEL = { zas: ["Zásilkovna – výdejní místo", 79], ppl: ["PPL – doručení domů", 99] };
const PAY = { card: ["Platební karta (ukázka)", 0], bank: ["Bankovní převod", 0], cod: ["Dobírka", 39] };

// --- 2. ZÁKLADNÍ POMOCNÉ FUNKCE A STAV ---

const $ = s => document.querySelector(s);
const price = (p, s) => Math.round(p.base * SZ[s][1] / 10) * 10;
const kc = n => n.toLocaleString("cs-CZ") + " Kč";

let imgs = {};
let cur = 0;
let size = 1;
let cart = [];
let db = null;
let uid = null;
let isAdmin = false;
let dtab = 0;
let duse = "Den";

// Načtení košíku
try {
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
} catch (e) {}

const saveCart = () => {
  try { localStorage.setItem("cart", JSON.stringify(cart)); } 
  catch (e) {}
};

// --- 3. VYKRESLOVÁNÍ PRODUKTŮ A SCÉNY ---

function bottleSVG(p) {
  return `
    <svg viewBox="0 0 100 200" aria-hidden="true">
      <defs>
        <linearGradient id="g${p.id}" x1="0" x2="1">
          <stop offset="0" stop-color="${p.acc}" stop-opacity=".95"/>
          <stop offset=".5" stop-color="#fff" stop-opacity=".55"/>
          <stop offset="1" stop-color="${p.acc}" stop-opacity=".8"/>
        </linearGradient>
      </defs>
      <rect x="38" y="6" width="24" height="26" rx="4" fill="#111" opacity=".85"/>
      <rect x="42" y="30" width="16" height="12" fill="${p.acc}" opacity=".7"/>
      <rect x="14" y="42" width="72" height="146" rx="14" fill="url(#g${p.id})"/>
      <rect x="24" y="96" width="52" height="54" rx="3" fill="#fff" opacity=".85"/>
      <text x="50" y="119" text-anchor="middle" font-family="Syne,sans-serif" font-weight="700" font-size="9" fill="#111">${p.n.split(" ")[0]}</text>
      <text x="50" y="132" text-anchor="middle" font-family="Syne,sans-serif" font-size="6.5" fill="#111">${p.n.split(" ")[1]}</text>
      <rect x="20" y="50" width="6" height="128" rx="3" fill="#fff" opacity=".5"/>
    </svg>`;
}

const bottleHTML = p => imgs[p.id] ? `<img src="${imgs[p.id]}" alt="${p.n}">` : bottleSVG(p);

function build() {
  $("#scenes").innerHTML = P.map((p, i) => `
    <div class="scene" data-i="${i}">
      <div class="name" aria-hidden="true">${p.n.split(" ")[0]}</div>
      <div class="bottle" id="b${i}">${bottleHTML(p)}</div>
      ${p.notes.map(([a, b, [x, y]]) => `
        <button class="note" style="left:${x}%;top:${y}%" tabindex="0">
          ${a}<small>${b}</small>
        </button>
      `).join("")}
      <div class="copy">
        <h3>${p.n}</h3>
        ${p.t}<br>
        <span style="opacity:.75">${p.d}</span>
      </div>
    </div>
  `).join("");

  $("#dots").innerHTML = P.map((p, i) => `
    <button aria-label="${p.n}" data-go="${i}"></button>
  `).join("");

  $("#sizes").innerHTML = SZ.map((s, i) => `
    <button data-s="${i}" aria-pressed="${i == size}">${s[0]} ml</button>
  `).join("");
}

// --- 4. SCROLL ANIMACE A INTERAKCE ---

function lerp(a, b, t) { return a + (b - a) * t; }
function hex(h) { return [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)); }
function mix(a, b, t) {
  const x = hex(a), y = hex(b);
  return "#" + x.map((v, i) => Math.round(lerp(v, y[i], t)).toString(16).padStart(2, "0")).join("");
}

let tp = 0, ps = 0, mx = 0, my = 0, tmx = 0, tmy = 0, run = false;

function target() {
  const tr = $("#track");
  const max = tr.offsetHeight - innerHeight;
  tp = Math.max(0, Math.min(1, -tr.getBoundingClientRect().top / max)) * (P.length - 1);
}

function frame() {
  ps += (tp - ps) * 0.08;
  mx += (tmx - mx) * 0.06;
  my += (tmy - my) * 0.06;
  
  const p = ps, i = Math.floor(p), f = p - i, e = f * f * (3 - 2 * f);
  const j = Math.min(i + 1, P.length - 1);
  const R = document.documentElement.style;
  
  R.setProperty("--bg", mix(P[i].bg, P[j].bg, e));
  R.setProperty("--acc", mix(P[i].acc, P[j].acc, e));
  
  document.querySelectorAll(".scene").forEach((s, k) => {
    const d = k - p, a = Math.abs(d), o = Math.max(0, 1 - a * 1.5);
    s.style.opacity = o;
    s.style.visibility = o ? "visible" : "hidden";
    s.querySelector(".name").style.transform = `translate(-50%,-50%) translateY(${d * -30}vh) scale(${1 - a * 0.15})`;
    s.querySelector(".bottle").style.transform = `translate(-50%,-50%) translate(${mx * 18}px,${my * 12 + d * 45}vh) rotate(${d * -28 + mx * 6}deg) scale(${1 - a * 0.25})`;
    s.style.pointerEvents = a < 0.5 ? "auto" : "none";
  });
  
  const n = Math.round(p);
  if (n !== cur) {
    cur = n;
    sync();
  }
  
  $("#hint").style.opacity = p > 0.2 ? 0 : 0.7;
  
  if (Math.abs(tp - ps) > 0.001 || Math.abs(tmx - mx) > 0.001 || Math.abs(tmy - my) > 0.001) {
    requestAnimationFrame(frame);
  } else {
    run = false;
  }
}

const req = () => {
  target();
  if (!run) {
    run = true;
    requestAnimationFrame(frame);
  }
};

addEventListener("scroll", req, { passive: true });
addEventListener("resize", req);

addEventListener("pointermove", e => {
  tmx = e.clientX / innerWidth - 0.5;
  tmy = e.clientY / innerHeight - 0.5;
  const g = $("#glow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
  req();
});

function sync() {
  document.querySelectorAll("#dots button").forEach((b, i) => b.classList.toggle("on", i == cur));
  $("#price").textContent = $("#price2").textContent = kc(price(P[cur], size));
  document.querySelectorAll("#sizes button, #dsizes button").forEach((b, i) => b.setAttribute("aria-pressed", i == size));
}

function go(i) {
  const tr = $("#track");
  const max = tr.offsetHeight - innerHeight;
  scrollTo({ top: tr.offsetTop + max * i / (P.length - 1), behavior: "smooth" });
}

// --- 5. OBSLUHA KLIKNUTÍ A KLÁVES ---

document.addEventListener("click", e => {
  const bt = e.target.closest(".bottle");
  if (bt && +bt.closest(".scene").dataset.i === cur && !$("#detail.on")) {
    openD(e.clientX, e.clientY);
    return;
  }
  
  const t = e.target.closest("button, .note");
  if (!t) return;
  
  if (t.dataset.go != null) go(+t.dataset.go);
  if (t.dataset.s != null) { size = +t.dataset.s; sync(); }
  if (t.dataset.t != null) { dtab = +t.dataset.t; dview(); }
  if (t.dataset.u != null) { duse = t.dataset.u; dview(); }
  if (t.classList.contains("note")) t.classList.toggle("on");
  if (t.hasAttribute("data-close")) closeAll();
});

addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAll();
    closeD();
  }
  if (!document.querySelector(".drawer.on") && !$("#detail.on")) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") go(Math.min(cur + 1, P.length - 1));
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(Math.max(cur - 1, 0));
  }
});

// --- 6. KOŠÍK A NÁKUPNÍ PROCES ---

function count() {
  const c = cart.reduce((a, l) => a + l.q, 0);
  $("#cnt").textContent = c;
  saveCart();
}

$("#add").onclick = e => {
  const p = P[cur];
  const k = p.id + size;
  const l = cart.find(x => x.k === k);
  
  if (l) l.q++;
  else cart.push({ k, id: p.id, s: size, q: 1 });
  
  // Animace letící tečky
  const dot = document.createElement("div");
  dot.className = "fly";
  const a = e.currentTarget.getBoundingClientRect();
  const b = $("#cartBtn").getBoundingClientRect();
  
  dot.style.left = a.left + a.width / 2 + "px";
  dot.style.top = a.top + "px";
  document.body.append(dot);
  
  requestAnimationFrame(() => {
    dot.style.transform = `translate(${b.left - a.left - a.width / 2 + 20}px, ${b.top - a.top}px) scale(0.4)`;
    dot.style.opacity = 0.3;
  });
  
  // Zobrazení toast notifikace
  const toast = $("#toast");
  toast.textContent = `${p.n} (${SZ[size][0]} ml) přidán do košíku`;
  toast.classList.add("show");
  clearTimeout(toast.to);
  toast.to = setTimeout(() => toast.classList.remove("show"), 3000);

  setTimeout(() => {
    dot.remove();
    count();
    const c = $("#cartBtn");
    c.classList.remove("bump");
    void c.offsetWidth;
    c.classList.add("bump");
  }, 700);
};

const pr = l => P.find(p => p.id === l.id);
const sub = () => cart.reduce((a, l) => a + price(pr(l), l.s) * l.q, 0);

function open(el) {
  closeAll();
  $(el).classList.add("on");
  $("#shade").classList.add("on");
}

function closeAll() {
  document.querySelectorAll(".drawer").forEach(d => d.classList.remove("on"));
  $("#shade").classList.remove("on");
}

$("#shade").onclick = closeAll;
$("#cartBtn").onclick = () => {
  renderCart();
  open("#cart");
};

function renderCart() {
  if (!cart.length) {
    $("#cartBody").innerHTML = '<p style="margin-top:30px;opacity:.7">Košík je prázdný. Vyberte vůni a velikost a přidejte ji sem.</p>';
    $("#cartFoot").innerHTML = "";
    return;
  }
  
  $("#cartBody").innerHTML = cart.map((l, i) => {
    const p = pr(l);
    return `
      <div class="item">
        <i style="background:linear-gradient(${p.bg},${p.acc})"></i>
        <div>
          <b>${p.n}</b><br>
          <span class="small">${SZ[l.s][0]} ml · ${kc(price(p, l.s))}</span>
          <div class="qty">
            <button data-q="${i}" data-d="-1" aria-label="Méně">−</button>
            ${l.q}
            <button data-q="${i}" data-d="1" aria-label="Více">+</button>
          </div>
        </div>
        <b>${kc(price(p, l.s) * l.q)}</b>
      </div>
    `;
  }).join("");
  
  $("#cartFoot").innerHTML = `
    <div class="row tot">
      <span>Mezisoučet</span>
      <span>${kc(sub())}</span>
    </div>
    <button class="cta" id="toCheck">Pokračovat k objednávce</button>
  `;
  
  $("#toCheck").onclick = renderCheckout;
}

$("#cartBody").addEventListener("click", e => {
  const b = e.target.closest("[data-q]");
  if (!b) return;
  
  const l = cart[+b.dataset.q];
  l.q += +b.dataset.d;
  if (l.q < 1) cart.splice(+b.dataset.q, 1);
  
  count();
  renderCart();
});

// --- 7. POKLADNA A DOKONČENÍ OBJEDNÁVKY ---

function totals(del, pay) {
  const s = sub();
  const d = s >= 2500 ? 0 : DEL[del][1];
  const c = PAY[pay][1];
  return { s, d, c, t: s + d + c };
}

function renderCheckout() {
  $("#cartBody").innerHTML = `
    <form id="f" novalidate>
      <div class="g2">
        <div><label for="n">Jméno a příjmení</label><input id="n" autocomplete="name" required></div>
        <div><label for="ph">Telefon</label><input id="ph" type="tel" autocomplete="tel" required></div>
      </div>
      <label for="em">E-mail</label><input id="em" type="email" autocomplete="email" required>
      <label for="ad">Ulice a číslo (nebo ID výdejního místa)</label><input id="ad" autocomplete="street-address" required>
      <div class="g2">
        <div><label for="ct">Město</label><input id="ct" autocomplete="address-level2" required></div>
        <div><label for="zp">PSČ</label><input id="zp" autocomplete="postal-code" required></div>
      </div>
      
      <label>Doprava</label>
      ${Object.entries(DEL).map(([k, v], i) => `
        <label class="opt">
          <input type="radio" name="del" value="${k}" ${i ? "" : "checked"}>
          ${v[0]}<span>${v[1]} Kč</span>
        </label>
      `).join("")}
      
      <label>Platba</label>
      ${Object.entries(PAY).map(([k, v], i) => `
        <label class="opt">
          <input type="radio" name="pay" value="${k}" ${i == 1 ? "checked" : ""}>
          ${v[0]}<span>${v[1] ? v[1] + " Kč" : ""}</span>
        </label>
      `).join("")}
      
      <p class="small">Platba kartou je v této verzi jen ukázka a peníze se nestrhávají. Pro ostrý provoz je potřeba napojit platební bránu.</p>
      <div class="err" id="err" role="alert"></div>
    </form>
  `;
  
  $("#cartFoot").innerHTML = `
    <div id="sum"></div>
    <button class="cta" id="send">Odeslat objednávku</button>
    <button class="small" id="back">← Zpět do košíku</button>
  `;
  
  const upd = () => {
    const t = totals(
      document.querySelector("[name=del]:checked").value, 
      document.querySelector("[name=pay]:checked").value
    );
    $("#sum").innerHTML = `
      <div class="row"><span>Zboží</span><span>${kc(t.s)}</span></div>
      <div class="row"><span>Doprava</span><span>${t.d ? kc(t.d) : "zdarma"}</span></div>
      ${t.c ? `<div class="row"><span>Dobírka</span><span>${kc(t.c)}</span></div>` : ""}
      <div class="row tot"><span>Celkem</span><span>${kc(t.t)}</span></div>
    `;
  };
  
  $("#f").addEventListener("change", upd);
  upd();
  
  $("#f").addEventListener("input", e => {
    if (e.target.tagName === "INPUT") e.target.classList.remove("invalid");
  });
  
  $("#back").onclick = renderCart;
  $("#send").onclick = submit;
}

async function submit() {
  const g = id => $("#" + id).value.trim();
  const v = n => document.querySelector(`[name=${n}]:checked`).value;
  const err = $("#err");
  let ok = true;
  
  ["n", "ph", "ad", "ct", "zp"].forEach(id => {
    const el = $("#" + id);
    if (!g(id)) { el.classList.add("invalid"); ok = false; }
  });
  
  const em = $("#em");
  if (!/^\\S+@\\S+\\.\\S+$/.test(em.value.trim())) { 
    em.classList.add("invalid"); 
    ok = false; 
  }
  
  if (!ok) {
    err.textContent = "Zkontrolujte prosím červeně zvýrazněná pole.";
    return;
  }
  
  err.textContent = "";

  const t = totals(v("del"), v("pay"));
  const no = "ML" + Date.now().toString().slice(-8);
  
  const order = {
    no,
    at: new Date().toISOString(),
    status: "nová",
    cust: { name: g("n"), phone: g("ph"), email: g("em"), addr: g("ad"), city: g("ct"), zip: g("zp") },
    del: v("del"),
    pay: v("pay"),
    items: cart.map(l => ({ n: pr(l).n, ml: SZ[l.s][0], q: l.q, p: price(pr(l), l.s) })),
    total: t.t
  };
  
  $("#send").disabled = true;
  let saved = false;
  
  if (db && uid) {
    try {
      const r = db.doc("orders/" + uid);
      const s = await r.get();
      const old = s.exists ? (s.data().list || []) : [];
      await r.set({ list: [...old, order] });
      saved = true;
    } catch (e) {}
  }
  
  try {
    const o = JSON.parse(localStorage.getItem("orders") || "[]");
    o.push(order);
    localStorage.setItem("orders", JSON.stringify(o));
  } catch (e) {}
  
  cart = [];
  count();
  
  $("#cartFoot").innerHTML = "";
  $("#cartBody").innerHTML = `
    <div class="done">
      <h3>Děkujeme za objednávku</h3>
      <p style="margin-top:10px">Číslo objednávky: <b>${no}</b></p>
      <p class="small">${v("pay") === "bank" ? `Zaplaťte ${kc(t.t)} převodem, variabilní symbol ${no.slice(2)}.` : "Potvrzení dorazí na " + order.cust.email + "."}</p>
      ${saved ? "" : '<p class="small">Objednávka je uložená jen v tomto prohlížeči. Přihlaste se prosím do Claude, aby se uložila do databáze obchodu.</p>'}
      <button class="cta" data-close>Zpět k voňavkám</button>
    </div>
  `;
}

// --- 8. DETAIL PRODUKTU ---

const mt = (l, v, w) => `<div class="m"><span>${l}</span><i><b style="--w:${w}%"></b></i></div>`;

function dview() {
  const p = P[cur];
  const d = DET[p.id];
  
  $("#tabs").innerHTML = ["Vůně", "Složení", "Použití"].map((t, i) => `
    <button data-t="${i}" aria-pressed="${i == dtab}">${t}</button>
  `).join("");
  
  let h = "";
  
  if (dtab == 0) {
    h = [["Hlava", d.top], ["Srdce", d.heart], ["Základ", d.base]].map(([l, a], i) => `
      <div class="py" style="--d:${i * 0.12}s">
        <span>${l}</span>
        <div>${a.map(x => `<em>${x}</em>`).join("")}</div>
      </div>
    `).join("") + `<p class="dp">${p.d}</p>`;
  }
  
  if (dtab == 1) {
    h = `
      <div class="py"><span>Typ</span><div>${d.conc}</div></div>
      ${mt("Výdrž až " + d.life + " h", 0, (d.life / 12) * 100)}
      ${mt("Intenzita", 0, d.sil * 20)}
      <p class="dp">${d.ing}</p>
    `;
  }
  
  if (dtab == 2) {
    h = `
      <div class="tabs">
        ${["Den", "Večer"].map(u => `<button data-u="${u}" aria-pressed="${u == duse}">${u}</button>`).join("")}
      </div>
      <p class="dp" style="margin:0;animation:none">${d.use[duse]}</p>
      <p class="dp">Nanášejte na čistou pokožku: zápěstí, krk a lokty. Netřete zápěstí o sebe.</p>
    `;
  }
  
  $("#dc").innerHTML = h;
}

function openD(x, y) {
  const p = P[cur];
  const D = $("#detail");
  
  D.style.setProperty("--cx", x + "px");
  D.style.setProperty("--cy", y + "px");
  D.style.setProperty("--bg", p.bg);
  D.style.setProperty("--acc", p.acc);
  
  $("#dbot").innerHTML = bottleHTML(p);
  $("#dname").textContent = p.n.split(" ")[0];
  $("#dsizes").innerHTML = SZ.map((s, i) => `<button data-s="${i}" aria-pressed="${i == size}">${s[0]} ml</button>`).join("");
  
  dtab = 0;
  duse = "Den";
  dview();
  sync();
  
  D.classList.add("on");
  document.body.style.overflow = "hidden";
  $("#dx").focus();
}

function closeD() {
  $("#detail").classList.remove("on");
  document.body.style.overflow = "";
}

$("#more").onclick = e => openD(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
$("#dx").onclick = closeD;
$("#dadd").onclick = e => $("#add").onclick(e);

$("#detail").addEventListener("pointermove", e => {
  const x = e.clientX / innerWidth - 0.5;
  const y = e.clientY / innerHeight - 0.5;
  $("#dbot").style.transform = `translate(${x * -34}px, ${y * -22}px) rotate(${x * 14}deg)`;
});

// --- 9. ADMIN ROZHRANÍ (UKÁZKA) ---

function renderAdmin() {
  $("#adminBody").innerHTML = `
    <h3>Obrázky flakonů (PNG)</h3>
    ${P.map(p => `
      <div class="item" style="grid-template-columns:1fr auto">
        <span>${p.n}</span>
        <input type="file" accept="image/png" data-up="${p.id}" style="width:150px">
      </div>
    `).join("")}
    <h3 style="margin-top:20px">Objednávky</h3>
    <div id="ol" class="small">Načítám…</div>
  `;
  
  db.collection("orders").get().then(s => {
    const all = [];
    s.docs.forEach(d => (d.data().list || []).forEach(o => all.push(o)));
    all.sort((a, b) => b.at.localeCompare(a.at));
    
    $("#ol").innerHTML = all.length ? `
      <table>
        ${all.map(o => `
          <tr>
            <td><b>${o.no}</b><br>${new Date(o.at).toLocaleDateString("cs-CZ")}</td>
            <td>${o.cust.name}<br>${o.cust.addr}, ${o.cust.zip} ${o.cust.city}<br>${o.cust.email}, ${o.cust.phone}<br>${o.items.map(i => `${i.q}× ${i.n} ${i.ml} ml`).join(", ")}</td>
            <td>${kc(o.total)}<br>${o.pay}</td>
          </tr>
        `).join("")}
      </table>
    ` : "Zatím žádné objednávky.";
  }).catch(() => {
    $("#ol").textContent = "Objednávky se nepodařilo načíst.";
  });
}

$("#adminBody").addEventListener("change", async e => {
  const id = e.target.dataset.up;
  if (!id || !e.target.files[0]) return;
  try {
    const as = await claude.use("assets");
    const r = await as.upload(e.target.files[0]);
    imgs[id] = r.url;
    await db.doc("config/images").set({ map: imgs });
    build();
    sync();
    req();
  } catch (x) {
    alert("Nahrání se nezdařilo.");
  }
});

$("#adminBtn").onclick = () => {
  renderAdmin();
  open("#admin");
};

// --- 10. INICIALIZACE A SPUŠTĚNÍ ---

build();
count();
sync();
target();
ps = tp;
req();

(async () => {
  try {
    if (!window.claude) return;
    const [d, u] = await Promise.all([claude.use("db"), claude.use("user")]);
    if (!d) return;
    
    db = d;
    if (u) {
      uid = await u.id();
      isAdmin = u.canEdit();
      $("#adminBtn").hidden = !isAdmin;
    }
    
    const s = await db.doc("config/images").get();
    if (s.exists) {
      imgs = s.data().map || {};
      build();
      sync();
      req();
    }
  } catch (e) {}
})();