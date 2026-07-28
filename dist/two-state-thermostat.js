const st = globalThis, wt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = /* @__PURE__ */ Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (wt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Nt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Nt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const me = (e) => new te(typeof e == "string" ? e : e + "", void 0, At), Q = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new te(n, e, At);
}, ge = (e, t) => {
  if (wt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = st.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, Bt = wt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return me(n);
})(e) : e;
const { is: ve, defineProperty: ye, getOwnPropertyDescriptor: be, getOwnPropertyNames: $e, getOwnPropertySymbols: we, getPrototypeOf: Ae } = Object, ct = globalThis, Ut = ct.trustedTypes, xe = Ut ? Ut.emptyScript : "", Se = ct.reactiveElementPolyfillSupport, W = (e, t) => e, at = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? xe : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, xt = (e, t) => !ve(e, t), Rt = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ct.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Rt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && ye(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: r } = be(this.prototype, t) ?? { get() {
      return this[n];
    }, set(s) {
      this[n] = s;
    } };
    return { get: o, set(s) {
      const a = o?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = Ae(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const n = this.properties, i = [...$e(n), ...we(n)];
      for (const o of i) this.createProperty(o, n[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, o] of n) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const o = this._$Eu(n, i);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) n.unshift(Bt(o));
    } else t !== void 0 && n.push(Bt(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ge(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : at).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : at;
      this._$Em = o;
      const a = s.fromAttribute(n, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), i ??= s.getPropertyOptions(t), !((i.hasChanged ?? xt)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: r }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? n ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) {
        const { wrapped: s } = r, a = this[o];
        s !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[W("elementProperties")] = /* @__PURE__ */ new Map(), L[W("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: L }), (ct.reactiveElementVersions ??= []).push("2.1.2");
const St = globalThis, Ht = (e) => e, lt = St.trustedTypes, Ft = lt ? lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ee = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, ne = "?" + w, Ee = `<${ne}>`, T = document, X = () => T.createComment(""), Y = (e) => e === null || typeof e != "object" && typeof e != "function", Et = Array.isArray, Ce = (e) => Et(e) || typeof e?.[Symbol.iterator] == "function", gt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, It = /-->/g, zt = />/g, E = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), jt = /'/g, Vt = /"/g, ie = /^(?:script|style|textarea|title)$/i, oe = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), h = oe(1), vt = oe(2), N = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Kt = /* @__PURE__ */ new WeakMap(), C = T.createTreeWalker(T, 129);
function re(e, t) {
  if (!Et(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const Te = (e, t) => {
  const n = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = j;
  for (let a = 0; a < n; a++) {
    const l = e[a];
    let c, d, u = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, d = s.exec(l), d !== null); ) _ = s.lastIndex, s === j ? d[1] === "!--" ? s = It : d[1] !== void 0 ? s = zt : d[2] !== void 0 ? (ie.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = E) : d[3] !== void 0 && (s = E) : s === E ? d[0] === ">" ? (s = o ?? j, u = -1) : d[1] === void 0 ? u = -2 : (u = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? E : d[3] === '"' ? Vt : jt) : s === Vt || s === jt ? s = E : s === It || s === zt ? s = j : (s = E, o = void 0);
    const m = s === E && e[a + 1].startsWith("/>") ? " " : "";
    r += s === j ? l + Ee : u >= 0 ? (i.push(c), l.slice(0, u) + ee + l.slice(u) + w + m) : l + w + (u === -2 ? a : m);
  }
  return [re(e, r + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Te(t, n);
    if (this.el = Z.createElement(c, i), C.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = C.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(ee)) {
          const _ = d[s++], m = o.getAttribute(u).split(w), v = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: r, name: v[2], strings: m, ctor: v[1] === "." ? ke : v[1] === "?" ? Oe : v[1] === "@" ? Me : dt }), o.removeAttribute(u);
        } else u.startsWith(w) && (l.push({ type: 6, index: r }), o.removeAttribute(u));
        if (ie.test(o.tagName)) {
          const u = o.textContent.split(w), _ = u.length - 1;
          if (_ > 0) {
            o.textContent = lt ? lt.emptyScript : "";
            for (let m = 0; m < _; m++) o.append(u[m], X()), C.nextNode(), l.push({ type: 2, index: ++r });
            o.append(u[_], X());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ne) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(w, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += w.length - 1;
      }
      r++;
    }
  }
  static createElement(t, n) {
    const i = T.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(e, t, n = e, i) {
  if (t === N) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = Y(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = B(e, o._$AS(e, t.values), o, i)), t;
}
class Pe {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? T).importNode(n, !0);
    C.currentNode = o;
    let r = C.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new tt(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Le(r, this, t)), this._$AV.push(c), l = i[++a];
      }
      s !== l?.index && (r = C.nextNode(), s++);
    }
    return C.currentNode = T, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = B(this, t, n), Y(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Z.createElement(re(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const r = new Pe(o, this), s = r.u(this.options);
      r.p(n), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = Kt.get(t.strings);
    return n === void 0 && Kt.set(t.strings, n = new Z(t)), n;
  }
  k(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const r of t) o === n.length ? n.push(i = new tt(this.O(X()), this.O(X()), this, this.options)) : i = n[o], i._$AI(r), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = Ht(t).nextSibling;
      Ht(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, n = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = B(this, t, n, 0), s = !Y(t) || t !== this._$AH && t !== N, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = B(this, a[i + l], n, l), c === N && (c = this._$AH[l]), s ||= !Y(c) || c !== this._$AH[l], c === p ? t = p : t !== p && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ke extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Oe extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Me extends dt {
  constructor(t, n, i, o, r) {
    super(t, n, i, o, r), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = B(this, t, n, 0) ?? p) === N) return;
    const i = this._$AH, o = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const De = St.litHtmlPolyfillSupport;
De?.(Z, tt), (St.litHtmlVersions ??= []).push("3.3.3");
const Ne = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = o = new tt(t.insertBefore(X(), r), r, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const Ct = globalThis;
class b extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ne(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return N;
  }
}
b._$litElement$ = !0, b.finalized = !0, Ct.litElementHydrateSupport?.({ LitElement: b });
const Be = Ct.litElementPolyfillSupport;
Be?.({ LitElement: b });
(Ct.litElementVersions ??= []).push("4.2.2");
const H = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Ue = { attribute: !0, type: String, converter: at, reflect: !1, hasChanged: xt }, Re = (e = Ue, t, n) => {
  const { kind: i, metadata: o } = n;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(n.name, e), i === "accessor") {
    const { name: s } = n;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = n;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(e) {
  return (t, n) => typeof n == "object" ? Re(e, t, n) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, n);
}
function F(e) {
  return f({ ...e, state: !0, attribute: !1 });
}
const $t = "two-state-thermostat", Tt = "two-state-thermostat", se = "Two State Thermostat", He = "0.3.4", Fe = "https://github.com/ryanandrewbaker/two-state-thermostat", Pt = "heat_cool", kt = 0.5, Ot = 1, Ie = 5, ze = 35, ae = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
], je = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  unknown: "Unknown"
}, Ve = "auto", Ke = [
  "climate",
  "input_boolean",
  "input_select",
  "script"
], We = ["climate.set_fan_mode"], A = 135, D = 405, le = D - A;
function et(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function qe(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
const Ge = ["_auto_climate", "_climate"], Xe = {
  temperature_entity: (e) => `sensor.${e}_control_temperature`,
  operating_state_entity: (e) => `sensor.${e}_auto_operating_state`,
  fan_auto_entity: (e) => `input_boolean.${e}_fan_automatic`,
  fan_override_entity: (e) => `input_select.${e}_fan_override`,
  effective_fan_entity: (e) => `sensor.${e}_effective_fan_mode`,
  recommended_fan_entity: (e) => `sensor.${e}_automatic_fan_recommendation`,
  boost_script_entity: (e) => `script.${e}_climate_boost`,
  boost_cancel_script_entity: (e) => `script.${e}_climate_cancel_boost`,
  boost_active_entity: (e) => `input_boolean.${e}_climate_boost`,
  boost_timer_entity: (e) => `timer.${e}_climate_boost`
}, Ye = {
  temperature_entity: "temperature_entity",
  operating_state_entity: "operating_state_entity",
  fan_auto_entity: "fan_auto_entity",
  fan_override_entity: "fan_override_entity",
  effective_fan_entity: "effective_fan_entity",
  recommended_fan_entity: "recommended_fan_entity",
  boost_script_entity: "boost_script_entity",
  boost_cancel_script_entity: "boost_cancel_script_entity",
  boost_active_entity: "boost_active_entity",
  boost_timer_entity: "boost_timer_entity"
}, ot = {
  power_on_mode: "power_on_mode",
  fan_options: "fan_options",
  target_step: "target_step",
  minimum_target_separation: "minimum_target_separation"
};
function Wt(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "" ? n : void 0;
}
function qt(e, t) {
  const n = e[t];
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n == "string" && n.trim() !== "") {
    const i = Number(n);
    return Number.isFinite(i) ? i : void 0;
  }
}
function Ze(e, t) {
  const n = e[t];
  if (!Array.isArray(n) || n.length === 0) return;
  if (typeof n[0] == "string")
    return n.map((o) => {
      const r = String(o);
      return { value: r, label: r };
    });
  const i = [];
  for (const o of n) {
    if (typeof o != "object" || o === null) continue;
    const r = o;
    typeof r.value == "string" && i.push({
      value: r.value,
      label: typeof r.label == "string" ? r.label : r.value
    });
  }
  return i.length ? i : void 0;
}
function ut(e) {
  return e.entity?.trim() || e.climate_entity?.trim() || void 0;
}
function Je(e) {
  const t = e.split(".");
  if (t.length !== 2 || t[0] !== "climate") return null;
  const n = t[1];
  for (const i of Ge)
    if (n.endsWith(i))
      return n.slice(0, -i.length);
  return n;
}
function ce(e, t) {
  if (!e) return {};
  const n = Je(t);
  if (!n) return {};
  const i = {};
  for (const [o, r] of Object.entries(Xe)) {
    const s = r(n);
    e.states[s] && (i[o] = s);
  }
  return i;
}
function de(e, t) {
  const n = et(e, t);
  if (!n) return {};
  const i = n.attributes, o = {};
  for (const [r, s] of Object.entries(
    Ye
  )) {
    const a = Wt(i, s);
    a && (o[r] = a);
  }
  return {
    ...o,
    power_on_mode: Wt(
      i,
      ot.power_on_mode
    ),
    fan_options: Ze(
      i,
      ot.fan_options
    ),
    target_step: qt(
      i,
      ot.target_step
    ),
    minimum_target_separation: qt(
      i,
      ot.minimum_target_separation
    )
  };
}
function y(e, t, n) {
  if (e?.trim()) return e.trim();
  if (t) return t;
  if (n) return n;
}
function yt(e, t, n) {
  return e !== void 0 ? e : t !== void 0 ? t : n;
}
function Qe(e, t) {
  if (e !== void 0) return e;
  if (t !== void 0) return t;
}
function pt(e, t) {
  const n = ut(t) ?? "", i = n ? de(e, n) : {}, o = n ? ce(e, n) : {}, r = {
    type: t.type,
    entity: n,
    climate_entity: n,
    name: t.name,
    temperature_entity: y(
      t.temperature_entity,
      i.temperature_entity,
      o.temperature_entity
    ),
    operating_state_entity: y(
      t.operating_state_entity,
      i.operating_state_entity,
      o.operating_state_entity
    ),
    fan_auto_entity: y(
      t.fan_auto_entity,
      i.fan_auto_entity,
      o.fan_auto_entity
    ),
    fan_override_entity: y(
      t.fan_override_entity,
      i.fan_override_entity,
      o.fan_override_entity
    ),
    effective_fan_entity: y(
      t.effective_fan_entity,
      i.effective_fan_entity,
      o.effective_fan_entity
    ),
    recommended_fan_entity: y(
      t.recommended_fan_entity,
      i.recommended_fan_entity,
      o.recommended_fan_entity
    ),
    boost_script_entity: y(
      t.boost_script_entity,
      i.boost_script_entity,
      o.boost_script_entity
    ),
    boost_cancel_script_entity: y(
      t.boost_cancel_script_entity,
      i.boost_cancel_script_entity,
      o.boost_cancel_script_entity
    ),
    boost_active_entity: y(
      t.boost_active_entity,
      i.boost_active_entity,
      o.boost_active_entity
    ),
    boost_timer_entity: y(
      t.boost_timer_entity,
      i.boost_timer_entity,
      o.boost_timer_entity
    ),
    power_on_mode: yt(
      t.power_on_mode,
      i.power_on_mode,
      Pt
    ),
    fan_options: Qe(t.fan_options, i.fan_options),
    target_step: yt(
      t.target_step,
      i.target_step,
      kt
    ),
    minimum_target_separation: yt(
      t.minimum_target_separation,
      i.minimum_target_separation,
      Ot
    ),
    show_countdown: t.show_countdown ?? !0,
    show_recommended_fan: t.show_recommended_fan ?? !0,
    show_effective_targets: t.show_effective_targets ?? !1,
    state_map: t.state_map,
    usesHvacActionFallback: !1
  };
  return r.usesHvacActionFallback = !r.operating_state_entity, r;
}
function tn(e, t, n) {
  if (t.name?.trim()) return t.name.trim();
  const i = n ? et(e, n) : void 0;
  return i && e?.formatEntityName ? e.formatEntityName(i) : i && typeof i.attributes.friendly_name == "string" ? i.attributes.friendly_name : n ?? "Two State Thermostat";
}
function en(e, t) {
  const n = et(e, t);
  return n ? n.attributes.target_temp_low !== void 0 && n.attributes.target_temp_high !== void 0 : !1;
}
function nn(e, t) {
  const n = de(e, t);
  if (n.operating_state_entity && e?.states[n.operating_state_entity])
    return !0;
  const i = ce(e, t);
  return !!(i.operating_state_entity && e?.states[i.operating_state_entity]);
}
function on(e, t) {
  if (!t.startsWith("climate.")) return !1;
  const n = et(e, t);
  return n ? n.attributes.two_state_thermostat === !0 ? !0 : en(e, t) && nn(e, t) : !1;
}
function rn(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "";
}
function sn(e, t) {
  if (!t) return "missing";
  const n = et(e, t);
  return n ? qe(n) ? "found" : "unavailable" : "missing";
}
function an(e, t) {
  const n = pt(e, t);
  return ut(t) ? [
    { key: "temperature_entity", label: "Temperature sensor", optional: !0 },
    { key: "operating_state_entity", label: "Operating-state sensor" },
    { key: "fan_auto_entity", label: "Automatic fan control", optional: !0 },
    { key: "fan_override_entity", label: "Manual fan control", optional: !0 },
    { key: "effective_fan_entity", label: "Effective fan mode", optional: !0 },
    { key: "recommended_fan_entity", label: "Recommended fan mode", optional: !0 },
    { key: "boost_script_entity", label: "Boost", optional: !0 },
    { key: "boost_cancel_script_entity", label: "Boost cancel", optional: !0 },
    { key: "boost_active_entity", label: "Boost active", optional: !0 },
    { key: "boost_timer_entity", label: "Boost timer", optional: !0 }
  ].map(({ key: r, label: s, optional: a }) => {
    const l = n[r], c = sn(e, l), d = rn(t, r);
    if (r === "operating_state_entity" && !l && n.usesHvacActionFallback)
      return {
        key: r,
        label: s,
        status: "fallback",
        entityId: void 0,
        message: "Using climate hvac_action (Boost/Maintain feedback unavailable)"
      };
    if (a && c === "missing")
      return {
        key: r,
        label: s,
        status: "missing",
        entityId: void 0,
        optional: !0
      };
    let u;
    return c === "unavailable" && l ? u = `${s} references an unavailable entity` : c === "missing" && !a && (u = `${s} not discovered`), {
      key: r,
      label: s,
      status: d ? "override" : c,
      entityId: l,
      optional: a,
      message: u
    };
  }) : [];
}
function Gt(e) {
  return e.fan_options?.length ? e.fan_options : ae;
}
var ln = Object.defineProperty, cn = Object.getOwnPropertyDescriptor, ht = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? cn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && ln(t, n, o), o;
};
let U = class extends b {
  constructor() {
    super(...arguments), this._advancedOpen = !1;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    if (!this._config) return h``;
    const e = ut(this._config), t = e ? an(this.hass, this._config) : [];
    return h`
      <div class="editor">
        ${e ? p : h`
                <div class="empty-state">
                  Select a Two State Thermostat controller to begin.
                </div>
              `}

        <div class="row">
          <label>Controller entity</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${e ?? ""}
            .includeDomains=${["climate"]}
            allow-custom-entity
            @value-changed=${this._onControllerChanged}
          ></ha-entity-picker>
          <p class="hint">
            Select the virtual climate controller. Companion entities are discovered
            automatically from its attributes.
          </p>
        </div>

        <div class="row">
          <label for="name">Display name (optional)</label>
          <input
            id="name"
            type="text"
            .value=${this._config.name ?? ""}
            placeholder="Leave blank to use entity name"
            @change=${(n) => this._update({ name: n.target.value || void 0 })}
          />
        </div>

        ${e && t.length ? h`
                <div class="discovery">
                  <p class="discovery-title">Controller configuration detected</p>
                  ${t.map((n) => this._renderDiscoveryItem(n))}
                </div>
              ` : p}

        <details
          class="advanced"
          ?open=${this._advancedOpen}
          @toggle=${this._onAdvancedToggle}
        >
          <summary>Advanced configuration</summary>
          <div class="advanced-content">
            <p class="hint">
              Explicit values here override auto-discovery from the controller entity.
            </p>

            ${this._entityPicker("temperature_entity", "Temperature entity", ["sensor"])}
            ${this._entityPicker("operating_state_entity", "Operating-state entity", [
      "sensor"
    ])}
            ${this._entityPicker("fan_auto_entity", "Fan auto entity", ["input_boolean"])}
            ${this._entityPicker("fan_override_entity", "Fan override entity", [
      "input_select"
    ])}
            ${this._entityPicker("effective_fan_entity", "Effective fan entity", ["sensor"])}
            ${this._entityPicker("recommended_fan_entity", "Recommended fan entity", [
      "sensor"
    ])}
            ${this._entityPicker("boost_script_entity", "Boost script", ["script"])}
            ${this._entityPicker("boost_cancel_script_entity", "Boost cancel script", [
      "script"
    ])}
            ${this._entityPicker("boost_active_entity", "Boost active entity", [
      "input_boolean"
    ])}
            ${this._entityPicker("boost_timer_entity", "Boost timer", ["timer"])}

            <div class="row">
              <label for="power_on_mode">Power on mode</label>
              <input
                id="power_on_mode"
                type="text"
                .value=${this._config.power_on_mode ?? Pt}
                @change=${(n) => this._update({
      power_on_mode: n.target.value || void 0
    })}
              />
            </div>

            <div class="row">
              <label for="target_step">Target step</label>
              <input
                id="target_step"
                type="number"
                step="0.1"
                .value=${String(this._config.target_step ?? kt)}
                @change=${(n) => this._update({
      target_step: Number(n.target.value)
    })}
              />
            </div>

            <div class="row">
              <label for="minimum_target_separation">Minimum target separation</label>
              <input
                id="minimum_target_separation"
                type="number"
                step="0.1"
                .value=${String(
      this._config.minimum_target_separation ?? Ot
    )}
                @change=${(n) => this._update({
      minimum_target_separation: Number(
        n.target.value
      )
    })}
              />
            </div>

            ${this._checkbox("show_countdown", "Show boost countdown", !0)}
            ${this._checkbox("show_recommended_fan", "Show recommended fan", !0)}
            ${this._checkbox("show_effective_targets", "Show effective targets", !1)}

            <div class="row">
              <label>Fan options (value:label per line)</label>
              <textarea
                rows="4"
                .value=${this._fanOptionsText()}
                @change=${this._updateFanOptions}
              ></textarea>
            </div>
          </div>
        </details>
      </div>
    `;
  }
  _renderDiscoveryItem(e) {
    return e.status === "fallback" ? h`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message}</div>
          </div>
        </div>
      ` : e.status === "unavailable" ? h`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message ?? e.entityId}</div>
          </div>
        </div>
      ` : e.status === "found" || e.status === "override" ? h`
        <div class="discovery-item">
          <span class="discovery-icon found">✓</span>
          <div>
            <div>${e.label}</div>
            ${e.status === "override" ? h`<div class="discovery-detail">Manual override</div>` : p}
          </div>
        </div>
      ` : e.optional ? p : h`
      <div class="discovery-item">
        <span class="discovery-icon warning">⚠</span>
        <div>
          <div>${e.label}</div>
          <div class="discovery-detail">${e.message ?? "Not discovered"}</div>
        </div>
      </div>
    `;
  }
  _entityPicker(e, t, n) {
    const i = this._config[e] ?? "";
    return h`
      <div class="row">
        <label>${t}</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${i}
          .includeDomains=${n}
          allow-custom-entity
          @value-changed=${(o) => this._update({
      [e]: o.detail.value || void 0
    })}
        ></ha-entity-picker>
      </div>
    `;
  }
  _onControllerChanged(e) {
    const n = {
      entity: e.detail.value || void 0,
      climate_entity: void 0
    };
    this._update(n);
  }
  _onAdvancedToggle(e) {
    this._advancedOpen = e.target.open;
  }
  _checkbox(e, t, n) {
    const i = this._config[e] ?? n;
    return h`
      <div class="checkbox-row">
        <input
          id=${e}
          type="checkbox"
          .checked=${i}
          @change=${(o) => this._update({
      [e]: o.target.checked
    })}
        />
        <label for=${e}>${t}</label>
      </div>
    `;
  }
  _fanOptionsText() {
    return (this._config.fan_options ?? ae).map((t) => `${t.value}:${t.label}`).join(`
`);
  }
  _updateFanOptions(e) {
    const n = e.target.value.split(`
`).map((i) => i.trim()).filter(Boolean).map((i) => {
      const [o, r] = i.split(":");
      return { value: o.trim(), label: (r ?? o).trim() };
    });
    this._update({
      fan_options: n.length ? n : void 0
    });
  }
  _update(e) {
    this._config = { ...this._config, ...e }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: this._config }
      })
    );
  }
};
U.styles = Q`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label,
    .section-label {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin: 0;
    }

    .empty-state {
      padding: 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }

    .discovery {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .discovery-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin: 0;
    }

    .discovery-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.8125rem;
      color: var(--primary-text-color);
    }

    .discovery-icon {
      flex-shrink: 0;
      width: 1rem;
      text-align: center;
    }

    .discovery-icon.found {
      color: var(--success-color, #4caf50);
    }

    .discovery-icon.warning {
      color: var(--warning-color, #ff9800);
    }

    .discovery-icon.missing-optional {
      color: var(--disabled-text-color);
    }

    .discovery-detail {
      color: var(--secondary-text-color);
      font-size: 0.75rem;
    }

    .advanced {
      border-top: 1px solid var(--divider-color);
      padding-top: 8px;
    }

    .advanced summary {
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 0;
    }

    .advanced-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 12px;
    }

    input[type="text"],
    input[type="number"],
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--primary-text-color);
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-row label {
      color: var(--primary-text-color);
    }
  `;
ht([
  f({ attribute: !1 })
], U.prototype, "hass", 2);
ht([
  F()
], U.prototype, "_config", 2);
ht([
  F()
], U.prototype, "_advancedOpen", 2);
U = ht([
  H(`${Tt}-editor`)
], U);
const Mt = Q`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    color: var(--primary-text-color, #fff);
    box-shadow: var(--ha-card-box-shadow, none);
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: center;
  }

  .error {
    color: var(--error-color, #f44336);
    padding: 12px;
    border: 1px solid var(--error-color, #f44336);
    border-radius: 8px;
    font-size: 0.875rem;
  }

  .warning {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    text-align: center;
  }

  .controls-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .dial-section {
    position: relative;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .dial-controls {
    position: absolute;
    left: 50%;
    bottom: 11%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .secondary-status {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    text-align: center;
  }

  button {
    min-width: 42px;
    min-height: 42px;
    border-radius: 50%;
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }

  button:hover:not(:disabled) {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
  }

  button:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--disabled-text-color, rgba(255, 255, 255, 0.38));
  }

  .power-button {
    border-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 55%,
      transparent
    );
    color: var(--secondary-text-color);
  }

  .power-button.on {
    border-color: color-mix(in srgb, var(--heat-color, #f0884a) 65%, transparent);
    background: color-mix(in srgb, var(--heat-color, #f0884a) 22%, transparent);
    color: var(--primary-text-color);
  }

  .boost-button {
    min-width: auto;
    border-radius: 999px;
    padding: 0 16px;
    gap: 8px;
    font-size: 0.875rem;
  }

  .boost-button.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
    border-color: var(--primary-color, #03a9f4);
  }

  .fan-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .fan-label {
    font-size: 0.875rem;
    color: var(--primary-text-color);
  }

  .auto-toggle {
    min-width: auto;
    border-radius: 999px;
    padding: 0 14px;
    font-size: 0.8125rem;
  }

  .auto-toggle.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
    border-color: var(--primary-color, #03a9f4);
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
`, dn = Q`
  :host {
    --dial-track: var(--divider-color, rgba(255, 255, 255, 0.12));
    display: block;
    width: 100%;
  }

  .dial-wrap {
    --heat-color: #f0884a;
    --cool-color: #5a9ae8;
    width: 100%;
    margin: 0 auto;
    aspect-ratio: 1;
    position: relative;
  }

  .dial-wrap.subdued {
    --heat-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 82%,
      #c86b3a 18%
    );
    --cool-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 82%,
      #4a78b8 18%
    );
  }

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .track {
    fill: none;
    stroke: var(--dial-track);
    stroke-width: 10;
    stroke-linecap: round;
  }

  .arc-heat {
    fill: none;
    stroke: var(--heat-color);
    stroke-linecap: round;
    opacity: 0.48;
    transition:
      opacity 0.2s ease,
      stroke 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-heat.base {
    stroke-width: 10;
  }

  .arc-heat.base.active {
    opacity: 0.72;
  }

  .arc-heat.remaining {
    stroke-width: 14;
    opacity: 1;
  }

  .arc-heat.remaining.strong {
    opacity: 1;
    stroke-width: 16;
  }

  .arc-cool {
    fill: none;
    stroke: var(--cool-color);
    stroke-linecap: round;
    opacity: 0.48;
    transition:
      opacity 0.2s ease,
      stroke 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-cool.base {
    stroke-width: 10;
  }

  .arc-cool.base.active {
    opacity: 0.72;
  }

  .arc-cool.remaining {
    stroke-width: 14;
    opacity: 1;
  }

  .arc-cool.remaining.strong {
    opacity: 1;
    stroke-width: 16;
  }

  .subdued .arc-heat,
  .subdued .arc-cool {
    opacity: 0.16;
  }

  .subdued .knob-heat,
  .subdued .knob-cool {
    opacity: 0.45;
  }

  .knob {
    fill: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    stroke-width: 3;
    pointer-events: none;
  }

  .knob.dragging {
    stroke-width: 4;
  }

  .knob-hit:disabled,
  .knob-hit[aria-disabled="true"] {
    cursor: not-allowed;
    pointer-events: none;
  }

  .knob-heat {
    stroke: var(--heat-color);
    transition:
      stroke 0.2s ease,
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .knob-cool {
    stroke: var(--cool-color);
    transition:
      stroke 0.2s ease,
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .current-dot {
    fill: var(--secondary-text-color);
  }

  .center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: none;
    padding: 24% 18%;
  }

  .state-label {
    font-size: 0.8125rem;
    color: var(--secondary-text-color);
    margin-bottom: 4px;
  }

  .state-label.heating {
    color: var(--heat-color);
    font-weight: 500;
  }

  .state-label.cooling {
    color: var(--cool-color);
    font-weight: 500;
  }

  .temperature {
    display: flex;
    align-items: flex-start;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .temp-int {
    font-size: clamp(2rem, 8vw, 3rem);
    font-weight: 300;
  }

  .temp-dec {
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin-top: 0.2em;
    opacity: 0.9;
  }

  .temp-unit {
    font-size: 0.75rem;
    margin-left: 2px;
    margin-top: 0.35em;
    color: var(--secondary-text-color);
  }

  .range {
    margin-top: 8px;
    font-size: 0.8125rem;
    color: var(--secondary-text-color);
  }

  .range-heat.active,
  .range-cool.active {
    font-weight: 500;
  }

  .range-heat.active {
    color: var(--heat-color);
  }

  .range-cool.active {
    color: var(--cool-color);
  }
`, un = Q`
  .slider {
    position: relative;
    height: 42px;
    display: flex;
    align-items: center;
    touch-action: none;
  }

  .track-bg {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(255, 255, 255, 0.12));
  }

  .track-fill {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 2px;
    background: var(--primary-color, #03a9f4);
    pointer-events: none;
  }

  .steps {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
  }

  .step {
    width: 42px;
    height: 42px;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.6875rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .step.active {
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .step.readonly {
    cursor: default;
  }

  .step:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
`;
var pn = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, nt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && pn(t, n, o), o;
};
let P = class extends b {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.hasCancel = !1, this.remaining = null;
  }
  render() {
    const e = this.active ? this.remaining ? `Boost ${this.remaining}` : "Boost active" : "Boost";
    return h`
      <button
        class="boost-button ${this.active ? "active" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.active ? "Boost active" : "Start boost"}
        aria-pressed=${this.active ? "true" : "false"}
        @click=${this._handleClick}
        @contextmenu=${this._handleContextMenu}
      >
        <span aria-live="polite">${e}</span>
      </button>
    `;
  }
  _handleClick(e) {
    e.preventDefault(), this.dispatchEvent(
      new CustomEvent("boost-press", { bubbles: !0, composed: !0 })
    );
  }
  _handleContextMenu(e) {
    !this.hasCancel || !this.active || (e.preventDefault(), this.dispatchEvent(
      new CustomEvent("boost-cancel", { bubbles: !0, composed: !0 })
    ));
  }
};
P.styles = [Mt];
nt([
  f({ type: Boolean })
], P.prototype, "active", 2);
nt([
  f({ type: Boolean })
], P.prototype, "disabled", 2);
nt([
  f({ type: Boolean })
], P.prototype, "hasCancel", 2);
nt([
  f({ type: String })
], P.prototype, "remaining", 2);
P = nt([
  H("boost-button")
], P);
function _n(e) {
  if (!e || e === "unavailable" || e === "unknown")
    return "unknown";
  const t = e.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return {
    off: "off",
    idle: "idle",
    boost: "boost_heating",
    boost_heating: "boost_heating",
    maintain: "maintain_heating",
    maintain_heating: "maintain_heating",
    boost_cooling: "boost_cooling",
    maintain_cooling: "maintain_cooling"
  }[t] ?? "unknown";
}
function fn(e, t) {
  return t?.[e] ?? je[e];
}
function V(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
function g(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function $(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function K(e, t) {
  const n = t.toString().includes(".") ? t.toString().split(".")[1]?.length ?? 0 : 0, i = Math.round(e / t) * t;
  return Number(i.toFixed(n));
}
function mn(e) {
  if (!e || e === "unavailable" || e === "unknown")
    return "unknown";
  const t = e.trim().toLowerCase();
  return {
    off: "off",
    idle: "idle",
    heating: "maintain_heating",
    cooling: "maintain_cooling"
  }[t] ?? "unknown";
}
function gn(e) {
  if (!e) return "Unknown";
  const t = e.trim().toLowerCase();
  return {
    off: "Off",
    idle: "Idle",
    heating: "Heating",
    cooling: "Cooling"
  }[t] ?? "Unknown";
}
function _t(e) {
  return "usesHvacActionFallback" in e ? Gt(e) : e.fan_options?.length ? e.fan_options : Gt(pt(void 0, e));
}
function rt(e, t) {
  return t ? e.find(
    (i) => i.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function vn(e) {
  if (!e || !V(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const i = new Date(t).getTime() - Date.now();
  if (i <= 0) return "0:00";
  const o = Math.ceil(i / 1e3), r = Math.floor(o / 60), s = o % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function ue(e) {
  const t = [];
  ut(e) || t.push("Missing required configuration: entity");
  const i = _t(e);
  new Set(i.map((a) => a.value.toLowerCase())).size !== i.length && t.push("fan_options contains duplicate values");
  const r = !!e.fan_auto_entity, s = !!e.fan_override_entity;
  return r !== s && (r || s) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function yn(e, t) {
  const n = [], i = [];
  if (!e) return { errors: n, warnings: i };
  const o = g(e, t.entity);
  if (!o)
    n.push(`Climate entity not found: ${t.entity}`);
  else if (!V(o))
    n.push(`Climate entity unavailable: ${t.entity}`);
  else {
    const a = $(o.attributes.target_temp_low), l = $(o.attributes.target_temp_high);
    (a === null || l === null) && n.push("Climate entity does not expose target_temp_low/high");
  }
  if (t.usesHvacActionFallback)
    i.push(
      "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead"
    );
  else {
    const a = g(e, t.operating_state_entity);
    a ? V(a) || n.push(
      `Operating state entity unavailable: ${t.operating_state_entity}`
    ) : n.push(`Operating state entity not found: ${t.operating_state_entity}`);
  }
  const r = [
    { id: t.temperature_entity, label: "Temperature sensor" },
    { id: t.boost_timer_entity, label: "Boost timer" },
    { id: t.boost_script_entity, label: "Boost script" },
    { id: t.boost_active_entity, label: "Boost active" }
  ];
  for (const { id: a, label: l } of r) {
    if (!a) continue;
    const c = g(e, a);
    c && !V(c) && i.push(`${l} references an unavailable entity: ${a}`);
  }
  const s = _t(t);
  if (t.fan_override_entity) {
    const a = g(e, t.fan_override_entity);
    if (a && V(a)) {
      const l = a.attributes.options;
      if (Array.isArray(l))
        for (const c of s)
          l.some(
            (d) => String(d).toLowerCase() === c.value.toLowerCase()
          ) || i.push(`Unsupported fan option in override entity: ${c.value}`);
    }
  }
  return { errors: n, warnings: i };
}
function bn(e, t) {
  const n = g(e, t.entity), i = g(e, t.temperature_entity), o = $(i?.state), r = $(n?.attributes.current_temperature), s = o ?? r, a = $(n?.attributes.target_temp_low), l = $(n?.attributes.target_temp_high), c = $(n?.attributes.min_temp) ?? Ie, d = $(n?.attributes.max_temp) ?? ze, u = t.target_step ?? $(n?.attributes.target_temp_step) ?? kt, _ = typeof n?.attributes.hvac_mode == "string" ? n.attributes.hvac_mode : n?.state ?? null;
  return {
    current: s,
    targetLow: a,
    targetHigh: l,
    minTemp: c,
    maxTemp: d,
    step: u,
    hvacMode: _,
    isOn: _ !== null && _ !== "off"
  };
}
function Xt(e, t, n, i, o, r) {
  let s = K(e, o), a = K(t, o);
  if (s = Math.max(n, Math.min(s, i)), a = Math.max(n, Math.min(a, i)), a - s < r) {
    const l = (s + a) / 2;
    s = K(l - r / 2, o), a = K(l + r / 2, o);
  }
  return s = Math.max(n, Math.min(s, i - r)), a = Math.min(i, Math.max(a, s + r)), { targetLow: s, targetHigh: a };
}
function $n(e, t) {
  const n = _t(t), i = g(e, t.fan_auto_entity), o = g(e, t.fan_override_entity), r = g(e, t.effective_fan_entity), s = g(e, t.recommended_fan_entity), a = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!a && t.fan_override_entity);
  if (!a && !l)
    return {
      available: !1,
      isAuto: !1,
      manualValue: null,
      effectiveValue: null,
      recommendedValue: null,
      displayLabel: "",
      sliderIndex: 0,
      readOnly: !0,
      usesSimplifiedModel: !1
    };
  if (a) {
    const v = i?.state === "on", S = o?.state ?? null, M = r?.state ?? s?.state ?? S, z = s?.state ?? null, mt = v ? M ?? z : S ?? M, _e = v ? `Auto · ${rt(n, mt)}` : `Manual · ${rt(n, mt)}`, Dt = Math.max(
      0,
      n.findIndex(
        (fe) => fe.value.toLowerCase() === String(mt).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: v,
      manualValue: S,
      effectiveValue: M,
      recommendedValue: z,
      displayLabel: _e,
      sliderIndex: Dt === -1 ? 0 : Dt,
      readOnly: v,
      usesSimplifiedModel: !1
    };
  }
  const c = o?.state ?? null, d = c?.toLowerCase() === Ve || c?.toLowerCase() === "automatic", u = d ? r?.state ?? s?.state ?? n[0]?.value ?? null : c, _ = d ? `Auto · ${rt(n, u)}` : `Manual · ${rt(n, u)}`, m = Math.max(
    0,
    n.findIndex(
      (v) => v.value.toLowerCase() === String(u).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: d,
    manualValue: c,
    effectiveValue: r?.state ?? null,
    recommendedValue: s?.state ?? null,
    displayLabel: _,
    sliderIndex: m === -1 ? 0 : m,
    readOnly: d,
    usesSimplifiedModel: !0
  };
}
function wn(e, t) {
  const n = !!t.boost_script_entity, i = g(e, t.boost_active_entity), o = g(e, t.boost_timer_entity), r = i?.state === "on" || o?.state === "active";
  return {
    available: n,
    active: r,
    remaining: t.show_countdown === !1 ? null : vn(o),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function bt(e, t) {
  const n = pt(e, t), i = ue(n), o = yn(e, n);
  let r, s;
  if (n.usesHvacActionFallback) {
    const a = g(e, n.entity), l = typeof a?.attributes.hvac_action == "string" ? a.attributes.hvac_action : void 0;
    r = mn(l), s = gn(l);
  } else {
    const a = g(e, n.operating_state_entity);
    r = _n(a?.state), s = fn(r, n.state_map);
  }
  return {
    title: tn(e, t, n.entity),
    operatingState: r,
    operatingLabel: s,
    climate: bn(e, n),
    fan: $n(e, n),
    boost: wn(e, n),
    errors: [...i, ...o.errors],
    warnings: o.warnings
  };
}
function q(e, t, n) {
  const i = (e - t) / (n - t), o = Math.max(0, Math.min(1, i));
  return A + o * le;
}
function pe(e) {
  let t = e;
  for (; t < A; ) t += 360;
  for (; t > D; ) t -= 360;
  if (t >= A && t <= D)
    return t;
  const n = (e % 360 + 360) % 360, i = Math.abs(n - A), o = Math.abs(n - (D - 360));
  return i <= o ? A : D;
}
function An(e, t, n) {
  const o = (pe(e) - A) / le;
  return t + o * (n - t);
}
function Yt(e, t, n, i) {
  if (n.targetLow === null || n.targetHigh === null) return null;
  const o = An(e, n.minTemp, n.maxTemp), r = K(o, n.step);
  return t === "low" ? Xt(
    r,
    n.targetHigh,
    n.minTemp,
    n.maxTemp,
    n.step,
    i
  ) : Xt(
    n.targetLow,
    r,
    n.minTemp,
    n.maxTemp,
    n.step,
    i
  );
}
function xn(e) {
  return {
    currentAngle: e.current === null ? null : q(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : q(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : q(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: A,
    endAngle: D
  };
}
function Sn(e) {
  switch (e) {
    case "boost_heating":
    case "maintain_heating":
      return "heat";
    case "boost_cooling":
    case "maintain_cooling":
      return "cool";
    default:
      return "neutral";
  }
}
function En(e) {
  return e === "boost_heating" || e === "maintain_heating";
}
function Cn(e) {
  return e === "boost_cooling" || e === "maintain_cooling";
}
function Tn(e, t) {
  const { startAngle: n, endAngle: i, currentAngle: o, lowAngle: r, highAngle: s } = e;
  let a = null, l = null, c = null, d = null;
  return r !== null && (En(t) && o !== null && o < r ? (a = { start: n, end: o }, l = { start: o, end: r }) : a = { start: n, end: r }), s !== null && (Cn(t) && o !== null && o > s ? (d = { start: s, end: o }, c = { start: o, end: i }) : c = { start: s, end: i }), { heatBase: a, heatRemaining: l, coolBase: c, coolRemaining: d };
}
function Pn(e) {
  return e.power_on_mode ?? Pt;
}
function kn(e) {
  return e.minimum_target_separation ?? Ot;
}
function On(e) {
  switch (e) {
    case "off":
      return {
        warmActive: !1,
        coolActive: !1,
        warmStrong: !1,
        coolStrong: !1,
        subdued: !0
      };
    case "idle":
      return {
        warmActive: !0,
        coolActive: !0,
        warmStrong: !1,
        coolStrong: !1,
        subdued: !1
      };
    case "boost_heating":
      return {
        warmActive: !0,
        coolActive: !1,
        warmStrong: !0,
        coolStrong: !1,
        subdued: !1
      };
    case "maintain_heating":
      return {
        warmActive: !0,
        coolActive: !1,
        warmStrong: !1,
        coolStrong: !1,
        subdued: !1
      };
    case "boost_cooling":
      return {
        warmActive: !1,
        coolActive: !0,
        warmStrong: !1,
        coolStrong: !0,
        subdued: !1
      };
    case "maintain_cooling":
      return {
        warmActive: !1,
        coolActive: !0,
        warmStrong: !1,
        coolStrong: !1,
        subdued: !1
      };
    default:
      return {
        warmActive: !0,
        coolActive: !0,
        warmStrong: !1,
        coolStrong: !1,
        subdued: !1
      };
  }
}
var Mn = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, I = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ln(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Mn(t, n, o), o;
};
function G(e, t, n, i) {
  const o = i * Math.PI / 180;
  return {
    x: e + n * Math.cos(o),
    y: t + n * Math.sin(o)
  };
}
function Zt(e, t, n, i, o) {
  const r = G(e, t, n, i), s = G(e, t, n, o), a = o - i > 180 ? 1 : 0;
  return `M ${r.x} ${r.y} A ${n} ${n} 0 ${a} 1 ${s.x} ${s.y}`;
}
function Dn(e, t, n) {
  const i = e.getBoundingClientRect(), o = (t - i.left) / i.width * 200, r = (n - i.top) / i.height * 200, s = Math.atan2(r - 100, o - 100) * 180 / Math.PI;
  return pe(s);
}
let x = class extends b {
  constructor() {
    super(...arguments), this.minimumTargetSeparation = 1, this.disabled = !1, this._dragTarget = null, this._preview = null, this._handlePointerMove = (e) => {
      this._dragTarget && this._updatePreviewFromPointer(e, this._dragTarget);
    }, this._handlePointerUp = (e) => {
      const t = e.currentTarget;
      t.removeEventListener("pointermove", this._handlePointerMove), t.removeEventListener("pointerup", this._handlePointerUp), t.removeEventListener("pointercancel", this._handlePointerUp), t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), this._endDrag(!0);
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._endDrag(!1);
  }
  get arcState() {
    return On(this.viewState.operatingState);
  }
  get displayClimate() {
    return this._preview ? {
      ...this.viewState.climate,
      targetLow: this._preview.targetLow,
      targetHigh: this._preview.targetHigh
    } : this.viewState.climate;
  }
  get geometry() {
    return xn(this.displayClimate);
  }
  formatTemp(e) {
    return e === null ? "—" : e.toFixed(1);
  }
  splitTemp(e) {
    if (e === null) return { int: "—", dec: "" };
    const t = e.toFixed(1), [n, i] = t.split(".");
    return { int: n, dec: `.${i}` };
  }
  render() {
    const { climate: e, operatingLabel: t, operatingState: n } = this.viewState, i = this.displayClimate, o = this.arcState, r = this.geometry, s = Tn(r, n), a = Sn(n), l = 100, c = 100, d = 78, u = Zt(l, c, d, r.startAngle, r.endAngle), _ = this.splitTemp(e.current), m = r.lowAngle !== null ? G(l, c, d, r.lowAngle) : null, v = r.highAngle !== null ? G(l, c, d, r.highAngle) : null, S = r.currentAngle !== null ? G(l, c, d, r.currentAngle) : null, M = i.targetLow, z = i.targetHigh;
    return h`
      <div class="dial-wrap ${o.subdued ? "subdued" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${u}></path>
          ${this._renderArcSegment(l, c, d, s.heatBase, "heat", "base", o)}
          ${this._renderArcSegment(
      l,
      c,
      d,
      s.heatRemaining,
      "heat",
      "remaining",
      o
    )}
          ${this._renderArcSegment(l, c, d, s.coolBase, "cool", "base", o)}
          ${this._renderArcSegment(
      l,
      c,
      d,
      s.coolRemaining,
      "cool",
      "remaining",
      o
    )}
          ${S ? vt`<circle class="current-dot" cx=${S.x} cy=${S.y} r="3"></circle>` : null}
          ${this._renderKnob("low", m, M, "Heating target")}
          ${this._renderKnob("high", v, z, "Cooling target")}
        </svg>
        <div class="center">
          <div
            class="state-label ${a === "heat" ? "heating" : a === "cool" ? "cooling" : ""}"
          >
            ${t}
          </div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(e.current)} degrees"
          >
            <span class="temp-int">${_.int}</span>
            ${_.dec ? h`<span class="temp-dec">${_.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          <div class="range">
            <span class="range-heat ${a === "heat" ? "active" : ""}"
              >${this.formatTemp(M)}</span
            >
            ·
            <span class="range-cool ${a === "cool" ? "active" : ""}"
              >${this.formatTemp(z)}</span
            >
          </div>
        </div>
      </div>
    `;
  }
  _renderArcSegment(e, t, n, i, o, r, s) {
    if (!i) return null;
    const a = Zt(e, t, n, i.start, i.end), l = o === "heat", c = l ? s.warmActive : s.coolActive, d = r === "remaining" && (l ? s.warmStrong : s.coolStrong);
    return vt`<path
      class="arc-${o} ${r} ${c ? "active" : ""} ${d ? "strong" : ""}"
      d=${a}
    ></path>`;
  }
  _renderKnob(e, t, n, i) {
    if (!t || n === null) return p;
    const o = this._dragTarget === e, r = e === "low" ? "knob knob-heat" : "knob knob-cool";
    return vt`
      <g
        role="slider"
        aria-label=${i}
        aria-valuemin=${this.viewState.climate.minTemp}
        aria-valuemax=${this.viewState.climate.maxTemp}
        aria-valuenow=${n}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? -1 : 0}
        @keydown=${(s) => this._handleKnobKeydown(s, e)}
      >
        <circle
          class="knob-hit ${o ? "dragging" : ""}"
          cx=${t.x}
          cy=${t.y}
          r="18"
          ?disabled=${this.disabled}
          @pointerdown=${(s) => this._handlePointerDown(s, e)}
        ></circle>
        <circle
          class="${r}${o ? " dragging" : ""}"
          cx=${t.x}
          cy=${t.y}
          r="8"
        ></circle>
      </g>
    `;
  }
  _handleKnobKeydown(e, t) {
    if (this.disabled) return;
    const { climate: n } = this.viewState;
    if (n.targetLow === null || n.targetHigh === null) return;
    let i = null;
    if (e.key === "ArrowUp" || e.key === "ArrowRight" ? i = n.step : (e.key === "ArrowDown" || e.key === "ArrowLeft") && (i = -n.step), i === null) return;
    e.preventDefault();
    const o = q(t === "low" ? n.targetLow + i : n.targetHigh + i, n.minTemp, n.maxTemp), r = Yt(
      o,
      t,
      n,
      this.minimumTargetSeparation
    );
    r && this._commitTarget(r);
  }
  _handlePointerDown(e, t) {
    if (this.disabled) return;
    e.preventDefault(), e.stopPropagation();
    const n = e.currentTarget;
    n.setPointerCapture(e.pointerId), this._dragTarget = t, this._updatePreviewFromPointer(e, t), n.addEventListener("pointermove", this._handlePointerMove), n.addEventListener("pointerup", this._handlePointerUp), n.addEventListener("pointercancel", this._handlePointerUp);
  }
  _updatePreviewFromPointer(e, t) {
    const n = this.shadowRoot?.querySelector("svg");
    if (!n) return;
    const i = Dn(n, e.clientX, e.clientY), o = Yt(
      i,
      t,
      this.viewState.climate,
      this.minimumTargetSeparation
    );
    o && (this._preview = o);
  }
  _endDrag(e) {
    if (e && this._preview) {
      const { targetLow: t, targetHigh: n } = this.viewState.climate;
      (this._preview.targetLow !== t || this._preview.targetHigh !== n) && this._commitTarget(this._preview);
    }
    this._dragTarget = null, this._preview = null;
  }
  _commitTarget(e) {
    this.dispatchEvent(
      new CustomEvent("target-change", {
        bubbles: !0,
        composed: !0,
        detail: e
      })
    );
  }
};
x.styles = [
  dn,
  Q`
      :host {
        display: block;
      }

      .knob-hit {
        fill: transparent;
        stroke: none;
        cursor: grab;
        touch-action: none;
      }

      .knob-hit.dragging {
        cursor: grabbing;
      }
    `
];
I([
  f({ attribute: !1 })
], x.prototype, "viewState", 2);
I([
  f({ type: Number })
], x.prototype, "minimumTargetSeparation", 2);
I([
  f({ type: Boolean })
], x.prototype, "disabled", 2);
I([
  F()
], x.prototype, "_dragTarget", 2);
I([
  F()
], x.prototype, "_preview", 2);
x = I([
  H("climate-dial")
], x);
var Nn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, it = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Bn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Nn(t, n, o), o;
};
let k = class extends b {
  constructor() {
    super(...arguments), this.options = [], this.index = 0, this.readOnly = !1, this.isAuto = !1;
  }
  render() {
    const e = this.options.length > 1 ? this.index / (this.options.length - 1) * 100 : 0;
    return h`
      <div
        class="slider"
        role="slider"
        aria-label="Fan speed"
        aria-valuemin="0"
        aria-valuemax=${Math.max(0, this.options.length - 1)}
        aria-valuenow=${this.index}
        aria-readonly=${this.readOnly ? "true" : "false"}
        tabindex=${this.readOnly ? -1 : 0}
        @keydown=${this._handleKeydown}
      >
        <div class="track-bg"></div>
        <div class="track-fill" style="width: ${e}%"></div>
        <div class="steps">
          ${this.options.map(
      (t, n) => h`
              <button
                class="step ${n === this.index ? "active" : ""} ${this.readOnly ? "readonly" : ""}"
                type="button"
                ?disabled=${this.readOnly}
                aria-label=${t.label}
                aria-current=${n === this.index ? "true" : "false"}
                @click=${() => this._select(n)}
              >
                ${t.label.charAt(0)}
              </button>
            `
    )}
        </div>
      </div>
    `;
  }
  _select(e) {
    this.readOnly || e === this.index || this.dispatchEvent(
      new CustomEvent("fan-select", {
        bubbles: !0,
        composed: !0,
        detail: { index: e, value: this.options[e]?.value }
      })
    );
  }
  _handleKeydown(e) {
    if (this.readOnly) return;
    let t = null;
    e.key === "ArrowRight" || e.key === "ArrowUp" ? t = Math.min(this.options.length - 1, this.index + 1) : e.key === "ArrowLeft" || e.key === "ArrowDown" ? t = Math.max(0, this.index - 1) : e.key === "Home" ? t = 0 : e.key === "End" && (t = this.options.length - 1), t !== null && (e.preventDefault(), this._select(t));
  }
};
k.styles = [un];
it([
  f({ attribute: !1 })
], k.prototype, "options", 2);
it([
  f({ type: Number })
], k.prototype, "index", 2);
it([
  f({ type: Boolean })
], k.prototype, "readOnly", 2);
it([
  f({ type: Boolean })
], k.prototype, "isAuto", 2);
k = it([
  H("fan-slider")
], k);
var Un = Object.defineProperty, Rn = Object.getOwnPropertyDescriptor, Lt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Rn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Un(t, n, o), o;
};
let J = class extends b {
  constructor() {
    super(...arguments), this.on = !1, this.disabled = !1;
  }
  render() {
    return h`
      <button
        class="power-button ${this.on ? "on" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.on ? "Turn climate off" : "Turn climate on"}
        aria-pressed=${this.on ? "true" : "false"}
        @click=${this._handleClick}
      >
        ${this.on ? "⏻" : "○"}
      </button>
    `;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("power-toggle", { bubbles: !0, composed: !0 })
    );
  }
};
J.styles = [Mt];
Lt([
  f({ type: Boolean })
], J.prototype, "on", 2);
Lt([
  f({ type: Boolean })
], J.prototype, "disabled", 2);
J = Lt([
  H("power-button")
], J);
function Hn(e, t) {
  const n = `${e}.${t}`;
  if (We.includes(n))
    throw new Error(`Forbidden service call: ${n}`);
  if (!Ke.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function Fn(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: Pn(e)
    }
  };
}
function In(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function zn(e, t) {
  return {
    domain: "climate",
    service: "set_temperature",
    data: {
      entity_id: e.climate_entity,
      target_temp_low: t.targetLow,
      target_temp_high: t.targetHigh,
      hvac_mode: "heat_cool"
    }
  };
}
function jn(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Vn(e) {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function he(e, t) {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: e.fan_override_entity,
      option: t
    }
  };
}
function Kn(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function Wn(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
async function O(e, t) {
  Hn(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function qn(e, t, n) {
  await O(e, n ? Fn(t) : In(t));
}
async function Gn(e, t, n) {
  await O(e, zn(t, n));
}
async function Xn(e, t, n) {
  if (t.fan_auto_entity) {
    await O(
      e,
      n ? jn(t) : Vn(t)
    );
    return;
  }
  t.fan_override_entity && await O(e, he(t, n ? "auto" : "low"));
}
async function Yn(e, t, n) {
  await O(e, he(t, n));
}
async function Zn(e, t) {
  await O(e, Kn(t));
}
async function Jn(e, t) {
  t.boost_cancel_script_entity && await O(e, Wn(t));
}
var Qn = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, ft = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ti(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Qn(t, n, o), o;
};
let R = class extends b {
  constructor() {
    super(...arguments), this._pending = !1;
  }
  setConfig(e) {
    const t = ue(e);
    if (!!(e.entity?.trim() || e.climate_entity?.trim()) && t.length)
      throw new Error(t.join("; "));
    this._config = e;
  }
  static getConfigElement() {
    return document.createElement(`${Tt}-editor`);
  }
  static getStubConfig() {
    return {};
  }
  getCardSize() {
    return 8;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      rows: 8,
      min_rows: 7
    };
  }
  _resolvedConfig() {
    return pt(this.hass, this._config);
  }
  render() {
    if (!this._config) return h``;
    const e = bt(this.hass, this._config), t = this._resolvedConfig(), n = _t(t), i = this._pending || e.errors.length > 0;
    return e.errors.length ? h`
        <ha-card>
          <div class="card">
            <div class="error">${e.errors.join(" ")}</div>
          </div>
        </ha-card>
      ` : h`
      <ha-card>
        <div class="card">
          <div class="title">${e.title}</div>

          <div class="dial-section">
            <climate-dial
              .viewState=${e}
              .disabled=${i}
              .minimumTargetSeparation=${kn(t)}
              @target-change=${this._handleTargetChange}
            ></climate-dial>
            <div class="dial-controls">
              <power-button
                .on=${e.climate.isOn}
                .disabled=${i}
                @power-toggle=${this._togglePower}
              ></power-button>
              ${e.boost.available ? h`
                      <boost-button
                        .active=${e.boost.active}
                        .disabled=${i}
                        .remaining=${e.boost.remaining}
                        .hasCancel=${e.boost.hasCancel}
                        @boost-press=${this._handleBoost}
                        @boost-cancel=${this._handleBoostCancel}
                      ></boost-button>
                    ` : p}
            </div>
          </div>

          ${e.fan.available ? h`
                  <div class="fan-section">
                    <div class="fan-header">
                      <span class="fan-label">${e.fan.displayLabel}</span>
                      <button
                        class="auto-toggle ${e.fan.isAuto ? "active" : ""}"
                        type="button"
                        aria-label="${e.fan.isAuto ? "Disable automatic fan" : "Enable automatic fan"}"
                        aria-pressed=${e.fan.isAuto ? "true" : "false"}
                        ?disabled=${i}
                        @click=${this._toggleFanAuto}
                      >
                        Auto
                      </button>
                    </div>
                    <fan-slider
                      .options=${n}
                      .index=${e.fan.sliderIndex}
                      .readOnly=${e.fan.readOnly}
                      .isAuto=${e.fan.isAuto}
                      @fan-select=${this._handleFanSelect}
                    ></fan-slider>
                    ${t.show_recommended_fan !== !1 && e.fan.recommendedValue ? h`
                            <div class="secondary-status">
                              Recommended: ${e.fan.recommendedValue}
                            </div>
                          ` : p}
                  </div>
                ` : p}
          ${e.warnings.length ? h`<div class="warning">${e.warnings.join(" ")}</div>` : p}
        </div>
      </ha-card>
    `;
  }
  async _withPending(e) {
    if (!(this._pending || !this.hass)) {
      this._pending = !0;
      try {
        return await e();
      } finally {
        this._pending = !1;
      }
    }
  }
  async _togglePower() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = bt(this.hass, this._config);
    await this._withPending(() => qn(this.hass, e, !t.climate.isOn));
  }
  async _handleTargetChange(e) {
    !this.hass || !e.detail || await this._withPending(
      () => Gn(this.hass, this._resolvedConfig(), e.detail)
    );
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => Zn(this.hass, this._resolvedConfig()));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => Jn(this.hass, this._resolvedConfig()));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = bt(this.hass, this._config);
    await this._withPending(() => Xn(this.hass, e, !t.fan.isAuto));
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || await this._withPending(
      () => Yn(this.hass, this._resolvedConfig(), e.detail.value)
    );
  }
};
R.styles = [Mt];
ft([
  f({ attribute: !1 })
], R.prototype, "hass", 2);
ft([
  F()
], R.prototype, "_config", 2);
ft([
  F()
], R.prototype, "_pending", 2);
R = ft([
  H(Tt)
], R);
window.customCards = window.customCards ?? [];
const Jt = window.customCards.findIndex((e) => e.type === $t), Qt = {
  type: $t,
  name: se,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: !0,
  documentationURL: Fe,
  getEntitySuggestion(e, t) {
    return on(e, t) ? {
      config: {
        type: `custom:${$t}`,
        entity: t
      }
    } : null;
  }
};
Jt >= 0 ? window.customCards[Jt] = Qt : window.customCards.push(Qt);
console.info(
  `%c ${se} %c v${He} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
export {
  R as TwoStageThermostatCard
};
//# sourceMappingURL=two-state-thermostat.js.map
