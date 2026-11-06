// --- 1. DATA PRODUKTŮ A CENY ---

const P = [
  {
    id: "fig",
    n: "Prada Paradigme",
    bg: "#1f3b2d",
    acc: "#c9d8a8",
    base: 1750,
    t: "Kalábrijský bergamot, geránium bourbon, ambrové dřevo.",
    d: "Citrusová & dřevitá parfémová voda s moderním a čistým charakterem.",
    notes: [
      ["Bergamot", "kalábrijská jiskra", [8, 58]],
      ["Geránium", "srdce vůně", [74, 34]],
      ["Ambrové dřevo", "hřejivý základ", [12, 22]]
    ]
  },
  {
    id: "sel",
    n: "Jean Paul Gaultier Le Beau Narcisse",
    bg: "#1d4f6e",
    acc: "#bfe3f2",
    base: 2690,
    sizes: [
      [75, 1],       
      [125, 1.48]  
    ],
    t: "Bergamot, pižmo, tonka fazole.",
    d: "Citrónová a pižmová parfémová voda s čistým a podmanivým charakterem.",
    notes: [
      ["Bergamot", "hlava vůně", [10, 55]],
      ["Pižmo", "srdce vůně", [72, 30]],
      ["Tonka fazole", "základ vůně", [78, 66]]
    ]

  },
  {
    id: "amb",
    n: "Armani Emporio Stronger With You Powerfully",
    bg: "#7a2a24",
    acc: "#f2c28b",
    base: 1750,
    sizes: [
      [50, 1],
      [100, 1.46]
    ],
    t: "Višňový akord, mandarinka, levandule, koření.",
    d: "Dřevitá parfémová voda s podmanivým tónem višně, ambrového dřeva a vanilky.",
    notes: [
      ["Višňový akord", "hlava vůně", [8, 28]],
      ["Levandule", "srdce vůně", [74, 52]],
      ["Ambrové dřevo", "základ vůně", [14, 68]]
    ]
  },
  {
    id: "iri",
    n: "Valentino Born In Roma Purple Melancholia Uomo",
    bg: "#5a4a86",
    acc: "#e8d9ff",
    base: 1790,
        sizes: [
      [50, 1],
      [100, 1.37]
    ],
    t: "Kardamom, lavandin, ambra, kokos.",
    d: "Aromatická a orientální toaletní voda s podmanivým, hřejivým základem.",
    notes: [
      ["Kardamom", "hlava vůně", [10, 40]],
      ["Lavandin", "srdce vůně", [72, 26]],
      ["Ambra a kokos", "základ vůně", [76, 70]]
    ]
  },
  {
    id: "brand",
    type: "brand", /* Označení, že nejde o parfém */
    n: "Maison Lumen",
    bg: "#0a0a0a", /* Elegantní hluboká černá */
    acc: "#d4af37", /* Zlatý akcent */
    title: "Objevte Svou Vůni",
    p1: "Za značkou Maison Lumen stojí vášeň pro vůně a touha po autentičnosti. Čerpáme od nejlepších dodavatelů a spolupracujeme s talentovanými parfuméry, abychom vám přinesli jedinečné zážitky z vůní.",
    p2: "Specialisté na parfémy vybrali pro vás ty nejkvalitnější ingredience a vytvořili kolekci, která osloví každého milovníka vůní."
  }
];

const DET = {
  fig: {
    conc: "Parfémová voda", life: 8, sil: 4,
    top: ["Kalábrijský bergamot"],
    heart: ["Geránium bourbon"],
    base: ["Ambrové dřevo"],
    ing: "Alkohol, parfémová báze, kalábrijský bergamot, geránium bourbon, ambrové dřevo.",
    use: {
      Den: "Svěží citrusová hlava se skvěle hodí pro denní nošení.",
      Večer: "Ambrové dřevo se večer krásně rozvine na kůži."
    }
  },
  sel: {
    conc: "Parfémová voda", life: 8, sil: 4,
    top: ["Bergamot"],
    heart: ["Pižmo"],
    base: ["Tonka fazole"],
    ing: "Alkohol, parfémová báze, bergamot, pižmo, tonka fazole.",
    use: {
      Den: "Svěží bergamotová hlava se skvěle hodí pro celodenní nošení.",
      Večer: "Pižmo a tonka fazole se večer krásně rozvinou na pokožce."
    }
  },
  amb: {
    conc: "Parfémová voda", life: 10, sil: 5,
    top: ["višňový akord", "mandarinka"],
    heart: ["levandule", "koření"],
    base: ["ambrové dřevo", "vanilka", "kaštan"],
    ing: "Alkohol, parfémová báze, višňový akord, mandarinka, levandule, koření, ambrové dřevo, vanilka, kaštan.",
    use: {
      Den: "Výrazná ovocně-kořenitá hlava zanechá skvělý dojem během dne.",
      Večer: "Ambrové dřevo, vanilka a kaštan se večer rozvinou do hřejivé hloubky."
    }
  },
  iri: {
    conc: "Toaletní voda", life: 6, sil: 4,
    top: ["kardamom"],
    heart: ["lavandin"],
    base: ["ambra", "ambrové dřevo", "kokos"],
    ing: "Alkohol, parfémová báze, kardamom, lavandin, ambra, ambrové dřevo, kokos.",
    use: {
      Den: "Kořenitý kardamom v hlavě dodá energii pro denní nošení.",
      Večer: "Hřejivá ambra, dřevo a kokos se večer skvěle rozvinou."
    }
  }
};

const SZ = [[30, 1], [50, 1.14], [100, 1.63]];
const DEL = { zas: ["Zásilkovna – výdejní místo", 79], ppl: ["PPL – doručení domů", 99] };
const PAY = { card: ["Platební karta (ukázka)", 0], bank: ["Bankovní převod", 0], cod: ["Dobírka", 39] };

// --- 2. ZÁKLADNÍ POMOCNÉ FUNKCE A STAV ---

const $ = s => document.querySelector(s);
const sizesFor = p => p.sizes || SZ;
const price = (p, s) => {
  const currentSizes = sizesFor(p);
  return Math.round(p.base * currentSizes[s][1] / 10) * 10;
};
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


const bottleHTML = p => `<img src="img/${p.id}.png" alt="${p.n}">`;

function build() {
// ... zbytek kódu pokračuje beze změny
}

function build() {
  $("#scenes").innerHTML = P.map((p, i) => {
    // Vykreslení příběhu značky
    if (p.type === 'brand') {
      return `
        <div class="scene" data-i="${i}">
          <div class="name" aria-hidden="true">${p.n}</div>
          <div class="story-text">
            <h3>${p.title}</h3>
            <p>${p.p1}</p>
            <p style="opacity:0.7">${p.p2}</p>
          </div>
        </div>
      `;
    }
    
    // Vykreslení klasického parfému
    return `
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
    `;
  }).join("");

  $("#dots").innerHTML = P.map((p, i) => `
    <button aria-label="${p.n}" data-go="${i}"></button>
  `).join("");

  $("#sizes").innerHTML = sizesFor(P[cur]).map((s, i) => `
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
    
    // Animace velkého jména na pozadí
    const nameEl = s.querySelector(".name");
    if (nameEl) nameEl.style.transform = `translate(-50%,-50%) translateY(${d * -30}vh) scale(${1 - a * 0.15})`;
    
    // Animace flakonu (pouze u parfémů)
    const botEl = s.querySelector(".bottle");
    if (botEl) botEl.style.transform = `translate(-50%,-50%) translate(${mx * 18}px,${my * 12 + d * 45}vh) rotate(${d * -28 + mx * 6}deg) scale(${1 - a * 0.25})`;
    
    // Animace textu příběhu (pomalé připlouvání a reakce na myš)
    const textEl = s.querySelector(".story-text");
    if (textEl) textEl.style.transform = `translate(-50%,-50%) translateY(${d * 30}vh) translate(${mx * -12}px, ${my * -12}px)`;
    
    s.style.pointerEvents = a < 0.5 ? "auto" : "none";
  });
  
  // Plynulé skrytí nákupního panelu (#buy) na poslední scéně
  const buyOp = Math.max(0, Math.min(1, (P.length - 1 - p) * 2));
  $("#buy").style.opacity = buyOp;
  $("#buy").style.pointerEvents = buyOp < 0.5 ? "none" : "auto";
  
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
  
  // Změní cenu jen tehdy, pokud jde o parfém
  if (P[cur].type !== 'brand') {
    const currentSizes = sizesFor(P[cur]);
    size = Math.min(size, currentSizes.length - 1);
    $("#sizes").innerHTML = currentSizes.map((s, i) => `
      <button data-s="${i}" aria-pressed="${i == size}">${s[0]} ml</button>
    `).join("");
    if ($("#dsizes")) {
      $("#dsizes").innerHTML = currentSizes.map((s, i) => `
        <button data-s="${i}" aria-pressed="${i == size}">${s[0]} ml</button>
      `).join("");
    }
    $("#price").textContent = $("#price2").textContent = kc(price(P[cur], size));
  }
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
  toast.textContent = `${p.n} (${sizesFor(p)[size][0]} ml) přidán do košíku`;
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
          <span class="small">${sizesFor(p)[l.s][0]} ml · ${kc(price(p, l.s))}</span>
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
    items: cart.map(l => ({ n: pr(l).n, ml: sizesFor(pr(l))[l.s][0], q: l.q, p: price(pr(l), l.s) })),
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
  $("#dsizes").innerHTML = sizesFor(p).map((s, i) => `<button data-s="${i}" aria-pressed="${i == size}">${s[0]} ml</button>`).join("");
  
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