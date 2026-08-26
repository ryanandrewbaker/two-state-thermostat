const ht = globalThis, Mt = ht.ShadowRoot && (ht.ShadyCSS === void 0 || ht.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Lt = /* @__PURE__ */ Symbol(), qt = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Mt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = qt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && qt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const He = (e) => new pe(typeof e == "string" ? e : e + "", void 0, Lt), q = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, r) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new pe(i, e, Lt);
}, Ne = (e, t) => {
  if (Mt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = ht.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Kt = Mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return He(i);
})(e) : e;
const { is: Be, defineProperty: Ue, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Fe, getOwnPropertySymbols: Ie, getPrototypeOf: ze } = Object, ft = globalThis, Wt = ft.trustedTypes, je = Wt ? Wt.emptyScript : "", Ve = ft.reactiveElementPolyfillSupport, et = (e, t) => e, pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? je : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Dt = (e, t) => !Be(e, t), Gt = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Dt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ft.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Gt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Ue(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: r } = Re(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const a = o?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Gt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(et("elementProperties"))) return;
    const t = ze(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(et("properties"))) {
      const i = this.properties, n = [...Fe(i), ...Ie(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Kt(o));
    } else t !== void 0 && i.push(Kt(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ne(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : pt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : pt;
      this._$Em = o;
      const a = s.fromAttribute(i, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), n ??= s.getPropertyOptions(t), !((n.hasChanged ?? Dt)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: r }, s) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: s } = r, a = this[o];
        s !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[et("elementProperties")] = /* @__PURE__ */ new Map(), N[et("finalized")] = /* @__PURE__ */ new Map(), Ve?.({ ReactiveElement: N }), (ft.reactiveElementVersions ??= []).push("2.1.2");
const Ht = globalThis, Xt = (e) => e, _t = Ht.trustedTypes, Yt = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _e = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + S, qe = `<${fe}>`, M = document, nt = () => M.createComment(""), ot = (e) => e === null || typeof e != "object" && typeof e != "function", Nt = Array.isArray, Ke = (e) => Nt(e) || typeof e?.[Symbol.iterator] == "function", kt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Zt = /-->/g, Jt = />/g, O = RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qt = /'/g, te = /"/g, me = /^(?:script|style|textarea|title)$/i, ge = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), p = ge(1), J = ge(2), F = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ee = /* @__PURE__ */ new WeakMap(), P = M.createTreeWalker(M, 129);
function ye(e, t) {
  if (!Nt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Yt !== void 0 ? Yt.createHTML(t) : t;
}
const We = (e, t) => {
  const i = e.length - 1, n = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Z;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, u, d = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, u = s.exec(l), u !== null); ) _ = s.lastIndex, s === Z ? u[1] === "!--" ? s = Zt : u[1] !== void 0 ? s = Jt : u[2] !== void 0 ? (me.test(u[2]) && (o = RegExp("</" + u[2], "g")), s = O) : u[3] !== void 0 && (s = O) : s === O ? u[0] === ">" ? (s = o ?? Z, d = -1) : u[1] === void 0 ? d = -2 : (d = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? O : u[3] === '"' ? te : Qt) : s === te || s === Qt ? s = O : s === Zt || s === Jt ? s = Z : (s = O, o = void 0);
    const f = s === O && e[a + 1].startsWith("/>") ? " " : "";
    r += s === Z ? l + qe : d >= 0 ? (n.push(c), l.slice(0, d) + _e + l.slice(d) + S + f) : l + S + (d === -2 ? a : f);
  }
  return [ye(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class rt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, u] = We(t, i);
    if (this.el = rt.createElement(c, n), P.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = P.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(_e)) {
          const _ = u[s++], f = o.getAttribute(d).split(S), g = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? Xe : g[1] === "?" ? Ye : g[1] === "@" ? Ze : mt }), o.removeAttribute(d);
        } else d.startsWith(S) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (me.test(o.tagName)) {
          const d = o.textContent.split(S), _ = d.length - 1;
          if (_ > 0) {
            o.textContent = _t ? _t.emptyScript : "";
            for (let f = 0; f < _; f++) o.append(d[f], nt()), P.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[_], nt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === fe) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(S, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += S.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = M.createElement("template");
    return n.innerHTML = t, n;
  }
}
function I(e, t, i = e, n) {
  if (t === F) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = ot(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = I(e, o._$AS(e, t.values), o, n)), t;
}
class Ge {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? M).importNode(i, !0);
    P.currentNode = o;
    let r = P.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new st(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Je(r, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== l?.index && (r = P.nextNode(), s++);
    }
    return P.currentNode = M, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class st {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = I(this, t, i), ot(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ke(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = rt.createElement(ye(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const r = new Ge(o, this), s = r.u(this.options);
      r.p(i), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = ee.get(t.strings);
    return i === void 0 && ee.set(t.strings, i = new rt(t)), i;
  }
  k(t) {
    Nt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of t) o === i.length ? i.push(n = new st(this.O(nt()), this.O(nt()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Xt(t).nextSibling;
      Xt(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = h;
  }
  _$AI(t, i = this, n, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = I(this, t, i, 0), s = !ot(t) || t !== this._$AH && t !== F, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = I(this, a[n + l], i, l), c === F && (c = this._$AH[l]), s ||= !ot(c) || c !== this._$AH[l], c === h ? t = h : t !== h && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xe extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Ye extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Ze extends mt {
  constructor(t, i, n, o, r) {
    super(t, i, n, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = I(this, t, i, 0) ?? h) === F) return;
    const n = this._$AH, o = t === h && n !== h || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== h && (n === h || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Je {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const Qe = Ht.litHtmlPolyfillSupport;
Qe?.(rt, st), (Ht.litHtmlVersions ??= []).push("3.3.3");
const ti = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = o = new st(t.insertBefore(nt(), r), r, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const Bt = globalThis;
class w extends N {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ti(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return F;
  }
}
w._$litElement$ = !0, w.finalized = !0, Bt.litElementHydrateSupport?.({ LitElement: w });
const ei = Bt.litElementPolyfillSupport;
ei?.({ LitElement: w });
(Bt.litElementVersions ??= []).push("4.2.2");
const K = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const ii = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Dt }, ni = (e = ii, t, i) => {
  const { kind: n, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function y(e) {
  return (t, i) => typeof i == "object" ? ni(e, t, i) : ((n, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, i);
}
function W(e) {
  return y({ ...e, state: !0, attribute: !1 });
}
const Tt = "two-state-thermostat", Ut = "two-state-thermostat", ve = "Two State Thermostat", oi = "0.5.0", ri = "https://github.com/ryanandrewbaker/two-state-thermostat", Rt = "heat_cool", Ft = 0.5, It = 2, ie = 2, si = 5, ai = 35, be = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
], li = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  dry: "Dry Mode",
  unknown: "Unknown"
}, ci = "auto", di = [
  "climate",
  "input_boolean",
  "input_select",
  "script",
  "switch"
], ui = ["climate.set_fan_mode"], E = 135, B = 405, $e = B - E;
function at(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function hi(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
const pi = ["_auto_climate", "_climate"], _i = {
  temperature_entity: (e) => `sensor.${e}_control_temperature`,
  operating_state_entity: (e) => `sensor.${e}_auto_operating_state`,
  fan_auto_entity: (e) => `input_boolean.${e}_fan_automatic`,
  fan_override_entity: (e) => `input_select.${e}_fan_override`,
  effective_fan_entity: (e) => `sensor.${e}_effective_fan_mode`,
  recommended_fan_entity: (e) => `sensor.${e}_automatic_fan_recommendation`,
  boost_script_entity: (e) => `script.${e}_climate_boost`,
  boost_cancel_script_entity: (e) => `script.${e}_climate_cancel_boost`,
  boost_active_entity: (e) => `input_boolean.${e}_climate_boost`,
  boost_timer_entity: (e) => `timer.${e}_climate_boost`,
  dry_entity: (e) => `switch.${e}_dry_mode`,
  humidity_entity: (e) => `sensor.${e}_humidity`
}, fi = {
  temperature_entity: "temperature_entity",
  operating_state_entity: "operating_state_entity",
  fan_auto_entity: "fan_auto_entity",
  fan_override_entity: "fan_override_entity",
  effective_fan_entity: "effective_fan_entity",
  recommended_fan_entity: "recommended_fan_entity",
  boost_script_entity: "boost_script_entity",
  boost_cancel_script_entity: "boost_cancel_script_entity",
  boost_active_entity: "boost_active_entity",
  boost_timer_entity: "boost_timer_entity",
  dry_entity: "dry_entity",
  humidity_entity: "humidity_entity"
}, dt = {
  power_on_mode: "power_on_mode",
  fan_options: "fan_options",
  target_step: "target_step",
  minimum_target_separation: "minimum_target_separation"
};
function ne(e, t) {
  const i = e[t];
  return typeof i == "string" && i.trim() !== "" ? i : void 0;
}
function oe(e, t) {
  const i = e[t];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string" && i.trim() !== "") {
    const n = Number(i);
    return Number.isFinite(n) ? n : void 0;
  }
}
function mi(e, t) {
  const i = e[t];
  if (!Array.isArray(i) || i.length === 0) return;
  if (typeof i[0] == "string")
    return i.map((o) => {
      const r = String(o);
      return { value: r, label: r };
    });
  const n = [];
  for (const o of i) {
    if (typeof o != "object" || o === null) continue;
    const r = o;
    typeof r.value == "string" && n.push({
      value: r.value,
      label: typeof r.label == "string" ? r.label : r.value
    });
  }
  return n.length ? n : void 0;
}
function gt(e) {
  return e.entity?.trim() || e.climate_entity?.trim() || void 0;
}
function gi(e) {
  const t = e.split(".");
  if (t.length !== 2 || t[0] !== "climate") return null;
  const i = t[1];
  for (const n of pi)
    if (i.endsWith(n))
      return i.slice(0, -n.length);
  return i;
}
function we(e, t) {
  if (!e) return {};
  const i = gi(t);
  if (!i) return {};
  const n = {};
  for (const [o, r] of Object.entries(_i)) {
    const s = r(i);
    e.states[s] && (n[o] = s);
  }
  return n;
}
function Ae(e, t) {
  const i = at(e, t);
  if (!i) return {};
  const n = i.attributes, o = {};
  for (const [r, s] of Object.entries(
    fi
  )) {
    const a = ne(n, s);
    a && (o[r] = a);
  }
  return {
    ...o,
    power_on_mode: ne(
      n,
      dt.power_on_mode
    ),
    fan_options: mi(
      n,
      dt.fan_options
    ),
    target_step: oe(
      n,
      dt.target_step
    ),
    minimum_target_separation: oe(
      n,
      dt.minimum_target_separation
    )
  };
}
function b(e, t, i) {
  if (e?.trim()) return e.trim();
  if (t) return t;
  if (i) return i;
}
function Ct(e, t, i) {
  return e !== void 0 ? e : t !== void 0 ? t : i;
}
function yi(e, t) {
  if (e !== void 0) return e;
  if (t !== void 0) return t;
}
function yt(e, t) {
  const i = gt(t) ?? "", n = i ? Ae(e, i) : {}, o = i ? we(e, i) : {}, r = {
    type: t.type,
    entity: i,
    climate_entity: i,
    name: t.name,
    temperature_entity: b(
      t.temperature_entity,
      n.temperature_entity,
      o.temperature_entity
    ),
    operating_state_entity: b(
      t.operating_state_entity,
      n.operating_state_entity,
      o.operating_state_entity
    ),
    fan_auto_entity: b(
      t.fan_auto_entity,
      n.fan_auto_entity,
      o.fan_auto_entity
    ),
    fan_override_entity: b(
      t.fan_override_entity,
      n.fan_override_entity,
      o.fan_override_entity
    ),
    effective_fan_entity: b(
      t.effective_fan_entity,
      n.effective_fan_entity,
      o.effective_fan_entity
    ),
    recommended_fan_entity: b(
      t.recommended_fan_entity,
      n.recommended_fan_entity,
      o.recommended_fan_entity
    ),
    boost_script_entity: b(
      t.boost_script_entity,
      n.boost_script_entity,
      o.boost_script_entity
    ),
    boost_cancel_script_entity: b(
      t.boost_cancel_script_entity,
      n.boost_cancel_script_entity,
      o.boost_cancel_script_entity
    ),
    boost_active_entity: b(
      t.boost_active_entity,
      n.boost_active_entity,
      o.boost_active_entity
    ),
    boost_timer_entity: b(
      t.boost_timer_entity,
      n.boost_timer_entity,
      o.boost_timer_entity
    ),
    dry_entity: b(
      t.dry_entity,
      n.dry_entity,
      o.dry_entity
    ),
    humidity_entity: b(
      t.humidity_entity,
      n.humidity_entity,
      o.humidity_entity
    ),
    power_on_mode: Ct(
      t.power_on_mode,
      n.power_on_mode,
      Rt
    ),
    fan_options: yi(t.fan_options, n.fan_options),
    target_step: Ct(
      t.target_step,
      n.target_step,
      Ft
    ),
    minimum_target_separation: Ct(
      t.minimum_target_separation,
      n.minimum_target_separation,
      It
    ),
    show_countdown: t.show_countdown ?? !0,
    show_recommended_fan: t.show_recommended_fan ?? !0,
    show_effective_targets: t.show_effective_targets ?? !1,
    state_map: t.state_map,
    usesHvacActionFallback: !1
  };
  return r.usesHvacActionFallback = !r.operating_state_entity, r;
}
function vi(e, t, i) {
  if (t.name?.trim()) return t.name.trim();
  const n = i ? at(e, i) : void 0;
  return n && e?.formatEntityName ? e.formatEntityName(n) : n && typeof n.attributes.friendly_name == "string" ? n.attributes.friendly_name : i ?? "Two State Thermostat";
}
function bi(e, t) {
  const i = at(e, t);
  return i ? i.attributes.target_temp_low !== void 0 && i.attributes.target_temp_high !== void 0 : !1;
}
function $i(e, t) {
  const i = Ae(e, t);
  if (i.operating_state_entity && e?.states[i.operating_state_entity])
    return !0;
  const n = we(e, t);
  return !!(n.operating_state_entity && e?.states[n.operating_state_entity]);
}
function wi(e, t) {
  if (!t.startsWith("climate.")) return !1;
  const i = at(e, t);
  return i ? i.attributes.two_state_thermostat === !0 ? !0 : bi(e, t) && $i(e, t) : !1;
}
function Ai(e, t) {
  const i = e[t];
  return typeof i == "string" && i.trim() !== "";
}
function xi(e, t) {
  if (!t) return "missing";
  const i = at(e, t);
  return i ? hi(i) ? "found" : "unavailable" : "missing";
}
function Si(e, t) {
  const i = yt(e, t);
  return gt(t) ? [
    { key: "temperature_entity", label: "Temperature sensor", optional: !0 },
    { key: "operating_state_entity", label: "Operating-state sensor" },
    { key: "fan_auto_entity", label: "Automatic fan control", optional: !0 },
    { key: "fan_override_entity", label: "Manual fan control", optional: !0 },
    { key: "effective_fan_entity", label: "Effective fan mode", optional: !0 },
    { key: "recommended_fan_entity", label: "Recommended fan mode", optional: !0 },
    { key: "boost_script_entity", label: "Boost", optional: !0 },
    { key: "boost_cancel_script_entity", label: "Boost cancel", optional: !0 },
    { key: "boost_active_entity", label: "Boost active", optional: !0 },
    { key: "boost_timer_entity", label: "Boost timer", optional: !0 },
    { key: "dry_entity", label: "Dry mode", optional: !0 },
    { key: "humidity_entity", label: "Humidity sensor", optional: !0 }
  ].map(({ key: r, label: s, optional: a }) => {
    const l = i[r], c = xi(e, l), u = Ai(t, r);
    if (r === "operating_state_entity" && !l && i.usesHvacActionFallback)
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
    let d;
    return c === "unavailable" && l ? d = `${s} references an unavailable entity` : c === "missing" && !a && (d = `${s} not discovered`), {
      key: r,
      label: s,
      status: u ? "override" : c,
      entityId: l,
      optional: a,
      message: d
    };
  }) : [];
}
function re(e) {
  return e.fan_options?.length ? e.fan_options : be;
}
var Ei = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, vt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ki(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Ei(t, i, o), o;
};
let z = class extends w {
  constructor() {
    super(...arguments), this._advancedOpen = !1;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    if (!this._config) return p``;
    const e = gt(this._config), t = e ? Si(this.hass, this._config) : [];
    return p`
      <div class="editor">
        ${e ? h : p`
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
            @change=${(i) => this._update({ name: i.target.value || void 0 })}
          />
        </div>

        ${e && t.length ? p`
                <div class="discovery">
                  <p class="discovery-title">Controller configuration detected</p>
                  ${t.map((i) => this._renderDiscoveryItem(i))}
                </div>
              ` : h}

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
            ${this._entityPicker("dry_entity", "Dry mode entity", ["switch"])}
            ${this._entityPicker("humidity_entity", "Humidity entity", ["sensor"])}

            <div class="row">
              <label for="power_on_mode">Power on mode</label>
              <input
                id="power_on_mode"
                type="text"
                .value=${this._config.power_on_mode ?? Rt}
                @change=${(i) => this._update({
      power_on_mode: i.target.value || void 0
    })}
              />
            </div>

            <div class="row">
              <label for="target_step">Target step</label>
              <input
                id="target_step"
                type="number"
                step="0.1"
                .value=${String(this._config.target_step ?? Ft)}
                @change=${(i) => this._update({
      target_step: Number(i.target.value)
    })}
              />
            </div>

            <div class="row">
              <label for="minimum_target_separation">Minimum heat/cool gap</label>
              <input
                id="minimum_target_separation"
                type="number"
                step="0.1"
                .value=${String(
      this._config.minimum_target_separation ?? It
    )}
                @change=${(i) => this._update({
      minimum_target_separation: Number(
        i.target.value
      )
    })}
              />
              <p class="hint">
                Minimum allowed difference between heating and cooling targets. Default:
                2°C.
              </p>
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
    return e.status === "fallback" ? p`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message}</div>
          </div>
        </div>
      ` : e.status === "unavailable" ? p`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message ?? e.entityId}</div>
          </div>
        </div>
      ` : e.status === "found" || e.status === "override" ? p`
        <div class="discovery-item">
          <span class="discovery-icon found">✓</span>
          <div>
            <div>${e.label}</div>
            ${e.status === "override" ? p`<div class="discovery-detail">Manual override</div>` : h}
          </div>
        </div>
      ` : e.optional ? h : p`
      <div class="discovery-item">
        <span class="discovery-icon warning">⚠</span>
        <div>
          <div>${e.label}</div>
          <div class="discovery-detail">${e.message ?? "Not discovered"}</div>
        </div>
      </div>
    `;
  }
  _entityPicker(e, t, i) {
    const n = this._config[e] ?? "";
    return p`
      <div class="row">
        <label>${t}</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${n}
          .includeDomains=${i}
          allow-custom-entity
          @value-changed=${(o) => this._update({
      [e]: o.detail.value || void 0
    })}
        ></ha-entity-picker>
      </div>
    `;
  }
  _onControllerChanged(e) {
    const i = {
      entity: e.detail.value || void 0,
      climate_entity: void 0
    };
    this._update(i);
  }
  _onAdvancedToggle(e) {
    this._advancedOpen = e.target.open;
  }
  _checkbox(e, t, i) {
    const n = this._config[e] ?? i;
    return p`
      <div class="checkbox-row">
        <input
          id=${e}
          type="checkbox"
          .checked=${n}
          @change=${(o) => this._update({
      [e]: o.target.checked
    })}
        />
        <label for=${e}>${t}</label>
      </div>
    `;
  }
  _fanOptionsText() {
    return (this._config.fan_options ?? be).map((t) => `${t.value}:${t.label}`).join(`
`);
  }
  _updateFanOptions(e) {
    const i = e.target.value.split(`
`).map((n) => n.trim()).filter(Boolean).map((n) => {
      const [o, r] = n.split(":");
      return { value: o.trim(), label: (r ?? o).trim() };
    });
    this._update({
      fan_options: i.length ? i : void 0
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
z.styles = q`
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
vt([
  y({ attribute: !1 })
], z.prototype, "hass", 2);
vt([
  W()
], z.prototype, "_config", 2);
vt([
  W()
], z.prototype, "_advancedOpen", 2);
z = vt([
  K(`${Ut}-editor`)
], z);
const zt = q`
  :host {
    display: block;
  }

  ha-card {
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
    --dry-color: #e6c84a;
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

  .power-button.on.dry {
    border-color: color-mix(in srgb, var(--dry-color, #e6c84a) 65%, transparent);
    background: color-mix(in srgb, var(--dry-color, #e6c84a) 22%, transparent);
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

  .boost-button.switch-mode {
    border-color: color-mix(in srgb, var(--dry-color, #e6c84a) 65%, transparent);
    color: var(--dry-color, #e6c84a);
  }

  .boost-extend {
    font-variant-numeric: tabular-nums;
  }

  .boost-cancel {
    font-size: 1.5rem;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .fan-section {
    margin-top: -4px;
  }

  .fan-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .fan-row fan-slider {
    flex: 1;
    min-width: 0;
  }

  .fan-rec {
    flex-shrink: 0;
    font-size: 0.6875rem;
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .auto-toggle {
    flex-shrink: 0;
    min-width: auto;
    min-height: 32px;
    height: 32px;
    border-radius: 999px;
    padding: 0 10px;
    font-size: 0.75rem;
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
`, Ci = q`
  :host {
    --dial-track: var(--divider-color, rgba(255, 255, 255, 0.12));
    display: block;
    width: 100%;
  }

  .dial-wrap {
    --heat-color: #f0884a;
    --cool-color: #5a9ae8;
    --boost-heat-color: #c4351a;
    --boost-cool-color: #9ed2ff;
    --dry-color: #e6c84a;
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

  .arc-heat.boost {
    stroke: var(--boost-heat-color);
    stroke-width: 16;
    opacity: 1;
    stroke-dasharray: 5 4;
    stroke-linecap: round;
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

  .arc-cool.boost {
    stroke: var(--boost-cool-color);
    stroke-width: 16;
    opacity: 1;
    stroke-dasharray: 5 4;
    stroke-linecap: round;
  }

  .arc-dry {
    fill: none;
    stroke: var(--dry-color);
    stroke-width: 12;
    stroke-linecap: round;
    opacity: 0.88;
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
    fill: #ffffff;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.45));
  }

  .boost-cap {
    pointer-events: none;
  }

  .boost-cap.heat {
    fill: var(--boost-heat-color);
  }

  .boost-cap.cool {
    fill: var(--boost-cool-color);
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

  .state-label.drying {
    color: var(--dry-color);
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

  .humidity {
    margin-top: 6px;
    font-size: 0.8125rem;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
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
`, Ti = q`
  :host {
    display: block;
  }

  .slider {
    position: relative;
    height: 28px;
    display: flex;
    align-items: center;
    touch-action: none;
  }

  .track-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 3px;
    margin-top: -1.5px;
    border-radius: 999px;
    background: var(--divider-color, rgba(255, 255, 255, 0.12));
  }

  .track-fill {
    position: absolute;
    left: 0;
    top: 50%;
    height: 3px;
    margin-top: -1.5px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 65%, transparent);
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
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--divider-color, rgba(255, 255, 255, 0.28));
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    box-sizing: border-box;
    transition:
      transform 0.15s ease,
      border-color 0.15s ease,
      background-color 0.15s ease;
  }

  .step.active .dot {
    width: 14px;
    height: 14px;
    border-color: var(--primary-color, #03a9f4);
    background: var(--primary-color, #03a9f4);
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--primary-color, #03a9f4) 22%, transparent);
  }

  .step.readonly {
    cursor: default;
  }

  .step:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
    border-radius: 50%;
  }
`;
var Oi = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, G = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Pi(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Oi(t, i, o), o;
};
let k = class extends w {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.hasCancel = !1, this.remaining = null, this.switchMode = !1;
  }
  render() {
    if (this.switchMode)
      return p`
        <button
          class="boost-button switch-mode"
          type="button"
          ?disabled=${this.disabled}
          aria-label="Switch mode"
          @click=${this._handleSwitchModeClick}
        >
          <span>Switch Mode</span>
        </button>
      `;
    if (this.active) {
      const e = this.remaining ?? "Boost", t = this.remaining ? `Boost remaining ${this.remaining}. Click to extend.` : "Extend boost";
      return p`
        <button
          class="boost-button active boost-extend"
          type="button"
          ?disabled=${this.disabled}
          aria-label=${t}
          @click=${this._handleClick}
        >
          <span aria-live="polite">${e}</span>
        </button>
        ${this.hasCancel ? p`
                <button
                  class="boost-cancel"
                  type="button"
                  ?disabled=${this.disabled}
                  aria-label="Cancel boost"
                  @click=${this._handleCancelClick}
                >
                  ×
                </button>
              ` : h}
      `;
    }
    return p`
      <button
        class="boost-button"
        type="button"
        ?disabled=${this.disabled}
        aria-label="Start boost"
        aria-pressed="false"
        @click=${this._handleClick}
      >
        <span>Boost</span>
      </button>
    `;
  }
  _handleClick(e) {
    e.preventDefault(), this.dispatchEvent(
      new CustomEvent("boost-press", { bubbles: !0, composed: !0 })
    );
  }
  _handleSwitchModeClick(e) {
    e.preventDefault(), this.dispatchEvent(
      new CustomEvent("switch-mode", { bubbles: !0, composed: !0 })
    );
  }
  _handleCancelClick(e) {
    e.preventDefault(), e.stopPropagation(), this.dispatchEvent(
      new CustomEvent("boost-cancel", { bubbles: !0, composed: !0 })
    );
  }
};
k.styles = [
  zt,
  q`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
    `
];
G([
  y({ type: Boolean })
], k.prototype, "active", 2);
G([
  y({ type: Boolean })
], k.prototype, "disabled", 2);
G([
  y({ type: Boolean })
], k.prototype, "hasCancel", 2);
G([
  y({ type: String })
], k.prototype, "remaining", 2);
G([
  y({ type: Boolean })
], k.prototype, "switchMode", 2);
k = G([
  K("boost-button")
], k);
function Mi(e) {
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
function se(e, t) {
  return t?.[e] ?? li[e];
}
function U(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
function v(e, t) {
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
function jt(e) {
  return e.toString().includes(".") ? e.toString().split(".")[1]?.length ?? 0 : 0;
}
function A(e, t) {
  const i = jt(t), n = Math.round(e / t) * t;
  return Number(n.toFixed(i));
}
function Ot(e, t) {
  const i = jt(t), n = Math.ceil(e / t - Number.EPSILON) * t;
  return Number(n.toFixed(i));
}
function Pt(e, t) {
  const i = jt(t), n = Math.floor(e / t + Number.EPSILON) * t;
  return Number(n.toFixed(i));
}
function tt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
function ae(e, t, i, n, o, r) {
  let s = tt(e, i, n), a = tt(t, i, n);
  return a - s < r && (a = Ot(s + r, o), a > n && (a = A(n, o), s = Pt(a - r, o), s = Math.max(i, s))), {
    targetLow: tt(s, i, n),
    targetHigh: tt(a, i, n)
  };
}
function Li(e) {
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
function Di(e) {
  if (!e) return "Unknown";
  const t = e.trim().toLowerCase();
  return {
    off: "Off",
    idle: "Idle",
    heating: "Heating",
    cooling: "Cooling"
  }[t] ?? "Unknown";
}
function bt(e) {
  return "usesHvacActionFallback" in e ? re(e) : e.fan_options?.length ? e.fan_options : re(yt(void 0, e));
}
function ut(e, t) {
  return t ? e.find(
    (n) => n.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function Hi(e) {
  if (!e || !U(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const n = new Date(t).getTime() - Date.now();
  if (n <= 0) return "0:00";
  const o = Math.ceil(n / 1e3), r = Math.floor(o / 60), s = o % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function xe(e) {
  const t = [];
  gt(e) || t.push("Missing required configuration: entity");
  const n = bt(e);
  new Set(n.map((a) => a.value.toLowerCase())).size !== n.length && t.push("fan_options contains duplicate values");
  const r = !!e.fan_auto_entity, s = !!e.fan_override_entity;
  return r !== s && (r || s) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function Ni(e, t) {
  const i = [], n = [];
  if (!e) return { errors: i, warnings: n };
  const o = v(e, t.entity);
  if (!o)
    i.push(`Climate entity not found: ${t.entity}`);
  else if (!U(o))
    i.push(`Climate entity unavailable: ${t.entity}`);
  else {
    const l = $(o.attributes.target_temp_low), c = $(o.attributes.target_temp_high);
    (l === null || c === null) && i.push("Climate entity does not expose target_temp_low/high");
  }
  if (!ke(e, t).active)
    if (t.usesHvacActionFallback)
      n.push(
        "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead"
      );
    else {
      const l = v(e, t.operating_state_entity);
      l ? U(l) || i.push(
        `Operating state entity unavailable: ${t.operating_state_entity}`
      ) : i.push(
        `Operating state entity not found: ${t.operating_state_entity}`
      );
    }
  const s = [
    { id: t.temperature_entity, label: "Temperature sensor" },
    { id: t.boost_timer_entity, label: "Boost timer" },
    { id: t.boost_script_entity, label: "Boost script" },
    { id: t.boost_active_entity, label: "Boost active" },
    { id: t.dry_entity, label: "Dry mode" },
    { id: t.humidity_entity, label: "Humidity sensor" }
  ];
  for (const { id: l, label: c } of s) {
    if (!l) continue;
    const u = v(e, l);
    u && !U(u) && n.push(`${c} references an unavailable entity: ${l}`);
  }
  const a = bt(t);
  if (t.fan_override_entity) {
    const l = v(e, t.fan_override_entity);
    if (l && U(l)) {
      const c = l.attributes.options;
      if (Array.isArray(c))
        for (const u of a)
          c.some(
            (d) => String(d).toLowerCase() === u.value.toLowerCase()
          ) || n.push(`Unsupported fan option in override entity: ${u.value}`);
    }
  }
  return { errors: i, warnings: n };
}
function Bi(e, t) {
  const i = v(e, t.entity), n = v(e, t.temperature_entity), o = $(n?.state), r = $(i?.attributes.current_temperature), s = o ?? r, a = $(i?.attributes.target_temp_low), l = $(i?.attributes.target_temp_high), c = $(i?.attributes.min_temp) ?? si, u = $(i?.attributes.max_temp) ?? ai, d = t.target_step ?? $(i?.attributes.target_temp_step) ?? Ft, _ = typeof i?.attributes.hvac_mode == "string" ? i.attributes.hvac_mode : i?.state ?? null;
  return {
    current: s,
    targetLow: a,
    targetHigh: l,
    minTemp: c,
    maxTemp: u,
    step: d,
    hvacMode: _,
    isOn: _ !== null && _ !== "off"
  };
}
function Se(e, t, i, n) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const { minTemp: o, maxTemp: r, step: s } = e, a = tt(A(i, s), o, r);
  if (t === "low") {
    let _ = a;
    const f = A(e.targetHigh, s), g = Ot(_ + n, s);
    let m = Math.max(f, g);
    return m > r && (m = A(r, s), _ = Pt(m - n, s), _ = Math.max(o, _)), ae(
      _,
      m,
      o,
      r,
      s,
      n
    );
  }
  let l = a;
  const c = A(e.targetLow, s), u = Pt(l - n, s);
  let d = Math.min(c, u);
  return d < o && (d = A(o, s), l = Ot(d + n, s), l = Math.min(r, l)), ae(
    d,
    l,
    o,
    r,
    s,
    n
  );
}
function Ui(e, t, i, n) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const o = t === "low" ? e.targetLow + i : e.targetHigh + i;
  return Se(e, t, o, n);
}
function Ri(e, t) {
  const i = bt(t), n = v(e, t.fan_auto_entity), o = v(e, t.fan_override_entity), r = v(e, t.effective_fan_entity), s = v(e, t.recommended_fan_entity), a = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!a && t.fan_override_entity);
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
  const c = Ee(e, t).active;
  if (a) {
    const m = n?.state === "on", D = o?.state ?? null, T = r?.state ?? s?.state ?? D, Y = s?.state ?? null, H = m ? T ?? Y : D ?? T, At = m ? `Auto · ${ut(i, H)}` : `Manual · ${ut(i, H)}`, ct = Math.max(
      0,
      i.findIndex(
        (xt) => xt.value.toLowerCase() === String(H).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: m,
      manualValue: D,
      effectiveValue: T,
      recommendedValue: Y,
      displayLabel: At,
      sliderIndex: ct === -1 ? 0 : ct,
      readOnly: m || c,
      usesSimplifiedModel: !1
    };
  }
  const u = o?.state ?? null, d = u?.toLowerCase() === ci || u?.toLowerCase() === "automatic", _ = d ? r?.state ?? s?.state ?? i[0]?.value ?? null : u, f = d ? `Auto · ${ut(i, _)}` : `Manual · ${ut(i, _)}`, g = Math.max(
    0,
    i.findIndex(
      (m) => m.value.toLowerCase() === String(_).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: d,
    manualValue: u,
    effectiveValue: r?.state ?? null,
    recommendedValue: s?.state ?? null,
    displayLabel: f,
    sliderIndex: g === -1 ? 0 : g,
    readOnly: d || c,
    usesSimplifiedModel: !0
  };
}
function Ee(e, t) {
  const i = !!t.boost_script_entity, n = v(e, t.boost_active_entity), o = v(e, t.boost_timer_entity), r = n?.state === "on" || o?.state === "active";
  return {
    available: i,
    active: r,
    remaining: t.show_countdown === !1 ? null : Hi(o),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function ke(e, t) {
  return !t.dry_entity ? { configured: !1, active: !1 } : {
    configured: !0,
    active: v(e, t.dry_entity)?.state === "on"
  };
}
function Fi(e, t) {
  if (!!!t.humidity_entity)
    return { configured: !1, value: null };
  const n = v(e, t.humidity_entity);
  return U(n) ? {
    configured: !0,
    value: $(n?.state)
  } : { configured: !0, value: null };
}
function Ii(e) {
  return e === null || !Number.isFinite(e) ? "—%" : `${Math.round(e)}%`;
}
function Q(e, t) {
  const i = yt(e, t), n = xe(i), o = Ni(e, i), r = ke(e, i), s = Fi(e, i);
  let a, l;
  if (r.active)
    a = "dry", l = se("dry", i.state_map);
  else if (i.usesHvacActionFallback) {
    const c = v(e, i.entity), u = typeof c?.attributes.hvac_action == "string" ? c.attributes.hvac_action : void 0;
    a = Li(u), l = Di(u);
  } else {
    const c = v(e, i.operating_state_entity);
    a = Mi(c?.state), l = se(a, i.state_map);
  }
  return {
    title: vi(e, t, i.entity),
    operatingState: a,
    operatingLabel: l,
    climate: Bi(e, i),
    fan: Ri(e, i),
    boost: Ee(e, i),
    dry: r,
    humidity: s,
    errors: [...n, ...o.errors],
    warnings: o.warnings
  };
}
function it(e, t, i) {
  const n = (e - t) / (i - t), o = Math.max(0, Math.min(1, n));
  return E + o * $e;
}
function Ce(e) {
  let t = e;
  for (; t < E; ) t += 360;
  for (; t > B; ) t -= 360;
  if (t >= E && t <= B)
    return t;
  const i = (e % 360 + 360) % 360, n = Math.abs(i - E), o = Math.abs(i - (B - 360));
  return n <= o ? E : B;
}
function zi(e, t, i) {
  const o = (Ce(e) - E) / $e;
  return t + o * (i - t);
}
function ji(e, t, i, n) {
  if (i.targetLow === null || i.targetHigh === null) return null;
  const o = zi(e, i.minTemp, i.maxTemp), r = A(o, i.step);
  return Se(i, t, r, n);
}
function Vi(e) {
  return {
    currentAngle: e.current === null ? null : it(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : it(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : it(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: E,
    endAngle: B
  };
}
function qi(e) {
  switch (e) {
    case "boost_heating":
    case "maintain_heating":
      return "heat";
    case "boost_cooling":
    case "maintain_cooling":
      return "cool";
    case "dry":
      return "dry";
    default:
      return "neutral";
  }
}
function Te(e) {
  return e === "boost_heating" || e === "maintain_heating";
}
function Oe(e) {
  return e === "boost_cooling" || e === "maintain_cooling";
}
function le(e, t, i) {
  return i - t < e.step / 2 ? null : {
    start: it(t, e.minTemp, e.maxTemp),
    end: it(i, e.minTemp, e.maxTemp)
  };
}
function Ki(e, t, i) {
  if (!i || e.targetLow === null || e.targetHigh === null) return null;
  const { minTemp: n, maxTemp: o, step: r } = e;
  if (Te(t)) {
    const s = e.targetLow, a = Math.min(
      o,
      e.targetHigh,
      A(s + ie, r)
    );
    return a <= s ? null : {
      kind: "heat",
      originalTarget: s,
      boostedTarget: a,
      knobClimate: e,
      segment: le(e, s, a)
    };
  }
  if (Oe(t)) {
    const s = e.targetHigh, a = Math.max(
      n,
      e.targetLow,
      A(s - ie, r)
    );
    return a >= s ? null : {
      kind: "cool",
      originalTarget: s,
      boostedTarget: a,
      knobClimate: e,
      segment: le(e, a, s)
    };
  }
  return null;
}
function Wi(e, t, i = null) {
  const { startAngle: n, endAngle: o, currentAngle: r, lowAngle: s, highAngle: a } = e;
  let l = null, c = null, u = null, d = null;
  const _ = r !== null && s !== null && r < s && (Te(t) || i === "low");
  s !== null && (_ ? (l = { start: n, end: r }, c = { start: r, end: s }) : l = { start: n, end: s });
  const f = r !== null && a !== null && r > a && (Oe(t) || i === "high");
  return a !== null && (f ? (d = { start: a, end: r }, u = { start: r, end: o }) : u = { start: a, end: o }), { heatBase: l, heatRemaining: c, coolBase: u, coolRemaining: d };
}
function Gi(e) {
  return e.power_on_mode ?? Rt;
}
function Xi(e) {
  return e.minimum_target_separation ?? It;
}
function Yi(e) {
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
    case "dry":
      return {
        warmActive: !1,
        coolActive: !1,
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
var Zi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, X = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ji(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Zi(t, i, o), o;
};
function R(e, t, i, n) {
  const o = n * Math.PI / 180;
  return {
    x: e + i * Math.cos(o),
    y: t + i * Math.sin(o)
  };
}
function ce(e, t, i, n, o) {
  const r = R(e, t, i, n), s = R(e, t, i, o), a = o - n > 180 ? 1 : 0;
  return `M ${r.x} ${r.y} A ${i} ${i} 0 ${a} 1 ${s.x} ${s.y}`;
}
function Qi(e, t, i) {
  const n = e.getBoundingClientRect(), o = (t - n.left) / n.width * 200, r = (i - n.top) / n.height * 200, s = Math.atan2(r - 100, o - 100) * 180 / Math.PI;
  return Ce(s);
}
let C = class extends w {
  constructor() {
    super(...arguments), this.minimumTargetSeparation = 2, this.disabled = !1, this._dragTarget = null, this._preview = null, this._handlePointerMove = (e) => {
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
    const e = Yi(this.viewState.operatingState);
    if (!this._dragTarget) return e;
    const t = this.geometry;
    return this._dragTarget === "low" && t.currentAngle !== null && t.lowAngle !== null && t.currentAngle < t.lowAngle ? { ...e, warmActive: !0, warmStrong: !0, subdued: !1 } : this._dragTarget === "high" && t.currentAngle !== null && t.highAngle !== null && t.currentAngle > t.highAngle ? { ...e, coolActive: !0, coolStrong: !0, subdued: !1 } : e;
  }
  get displayClimate() {
    return this._preview ? {
      ...this.viewState.climate,
      targetLow: this._preview.targetLow,
      targetHigh: this._preview.targetHigh
    } : this.viewState.climate;
  }
  get geometry() {
    const e = this.boostOverlay;
    return Vi(e?.knobClimate ?? this.displayClimate);
  }
  get boostOverlay() {
    return this._dragTarget ? null : Ki(
      this.displayClimate,
      this.viewState.operatingState,
      this.viewState.boost.active
    );
  }
  formatTemp(e) {
    return e === null ? "—" : e.toFixed(1);
  }
  splitTemp(e) {
    if (e === null) return { int: "—", dec: "" };
    const t = e.toFixed(1), [i, n] = t.split(".");
    return { int: i, dec: `.${n}` };
  }
  render() {
    const { climate: e, operatingLabel: t, operatingState: i, dry: n, humidity: o } = this.viewState, r = !!n?.active, s = this.displayClimate, a = r ? null : this.boostOverlay, l = this.arcState, c = this.geometry, u = Wi(c, i, this._dragTarget), d = qi(i), _ = o?.configured ? Ii(o.value) : null, f = 100, g = 100, m = 78, D = ce(f, g, m, c.startAngle, c.endAngle), T = this.splitTemp(e.current), Y = s.targetLow, H = s.targetHigh, At = a?.kind === "heat" ? a.originalTarget : Y, ct = a?.kind === "cool" ? a.originalTarget : H, xt = c.lowAngle !== null ? R(f, g, m, c.lowAngle) : null, Le = c.highAngle !== null ? R(f, g, m, c.highAngle) : null, St = c.currentAngle !== null ? R(f, g, m, c.currentAngle) : null, Vt = a?.segment == null ? null : a.kind === "heat" ? a.segment.end : a.segment.start, Et = Vt === null ? null : R(f, g, m, Vt), De = d === "heat" ? "heating" : d === "cool" ? "cooling" : d === "dry" ? "drying" : "";
    return p`
      <div class="dial-wrap ${l.subdued ? "subdued" : ""} ${r ? "dry" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${D}></path>
          ${r ? J`<path class="arc-dry" d=${D}></path>` : h}
          ${r ? h : this._renderArcSegment(f, g, m, u.heatBase, "heat", "base", l)}
          ${r ? h : this._renderArcSegment(
      f,
      g,
      m,
      u.heatRemaining,
      "heat",
      "remaining",
      l
    )}
          ${r ? h : this._renderArcSegment(f, g, m, u.coolBase, "cool", "base", l)}
          ${r ? h : this._renderArcSegment(
      f,
      g,
      m,
      u.coolRemaining,
      "cool",
      "remaining",
      l
    )}
          ${r ? h : this._renderArcSegment(
      f,
      g,
      m,
      a?.segment ?? null,
      a?.kind ?? "heat",
      "boost",
      l
    )}
          ${r ? h : this._renderKnob("low", xt, At, "Heating target")}
          ${r ? h : this._renderKnob("high", Le, ct, "Cooling target")}
          ${!r && Et ? J`
                  <circle
                    class="boost-cap ${a?.kind === "cool" ? "cool" : "heat"}"
                    cx=${Et.x}
                    cy=${Et.y}
                    r="3.5"
                  ></circle>
                ` : h}
          ${St ? J`
                  <circle
                    class="current-dot"
                    cx=${St.x}
                    cy=${St.y}
                    r="5.5"
                  ></circle>
                ` : null}
        </svg>
        <div class="center">
          <div class="state-label ${De}">${t}</div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(e.current)} degrees"
          >
            <span class="temp-int">${T.int}</span>
            ${T.dec ? p`<span class="temp-dec">${T.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          ${_ ? p`
                  <div
                    class="humidity"
                    aria-label="Current humidity ${_}"
                  >
                    ${_}
                  </div>
                ` : h}
          ${r ? h : p`
                  <div class="range">
                    <span class="range-heat ${d === "heat" ? "active" : ""}"
                      >${this.formatTemp(Y)}</span
                    >
                    ·
                    <span class="range-cool ${d === "cool" ? "active" : ""}"
                      >${this.formatTemp(H)}</span
                    >
                  </div>
                `}
        </div>
      </div>
    `;
  }
  _renderArcSegment(e, t, i, n, o, r, s) {
    if (!n) return null;
    const a = ce(e, t, i, n.start, n.end), l = o === "heat", c = l ? s.warmActive : s.coolActive, u = (r === "remaining" || r === "boost") && (l ? s.warmStrong : s.coolStrong);
    return J`<path
      class="arc-${o} ${r} ${c ? "active" : ""} ${u ? "strong" : ""}"
      d=${a}
    ></path>`;
  }
  _renderKnob(e, t, i, n) {
    if (!t || i === null) return h;
    const o = this._dragTarget === e, r = e === "low" ? "knob knob-heat" : "knob knob-cool";
    return J`
      <g
        role="slider"
        aria-label=${n}
        aria-valuemin=${this.viewState.climate.minTemp}
        aria-valuemax=${this.viewState.climate.maxTemp}
        aria-valuenow=${i}
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
    const { climate: i } = this.viewState;
    if (i.targetLow === null || i.targetHigh === null) return;
    let n = null;
    if (e.key === "ArrowUp" || e.key === "ArrowRight" ? n = i.step : (e.key === "ArrowDown" || e.key === "ArrowLeft") && (n = -i.step), n === null) return;
    e.preventDefault();
    const o = Ui(i, t, n, this.minimumTargetSeparation);
    o && this._commitTarget(o);
  }
  _handlePointerDown(e, t) {
    if (this.disabled) return;
    e.preventDefault(), e.stopPropagation();
    const i = e.currentTarget;
    i.setPointerCapture(e.pointerId), this._dragTarget = t, this._updatePreviewFromPointer(e, t), i.addEventListener("pointermove", this._handlePointerMove), i.addEventListener("pointerup", this._handlePointerUp), i.addEventListener("pointercancel", this._handlePointerUp);
  }
  _updatePreviewFromPointer(e, t) {
    const i = this.shadowRoot?.querySelector("svg");
    if (!i) return;
    const n = Qi(i, e.clientX, e.clientY), o = ji(
      n,
      t,
      this.viewState.climate,
      this.minimumTargetSeparation
    );
    o && (this._preview = o);
  }
  _endDrag(e) {
    if (e && this._preview) {
      const { targetLow: t, targetHigh: i } = this.viewState.climate;
      (this._preview.targetLow !== t || this._preview.targetHigh !== i) && this._commitTarget(this._preview);
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
C.styles = [
  Ci,
  q`
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
X([
  y({ attribute: !1 })
], C.prototype, "viewState", 2);
X([
  y({ type: Number })
], C.prototype, "minimumTargetSeparation", 2);
X([
  y({ type: Boolean })
], C.prototype, "disabled", 2);
X([
  W()
], C.prototype, "_dragTarget", 2);
X([
  W()
], C.prototype, "_preview", 2);
C = X([
  K("climate-dial")
], C);
var tn = Object.defineProperty, en = Object.getOwnPropertyDescriptor, lt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? en(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && tn(t, i, o), o;
};
let L = class extends w {
  constructor() {
    super(...arguments), this.options = [], this.index = 0, this.readOnly = !1, this.isAuto = !1;
  }
  render() {
    const e = this.options.length > 1 ? this.index / (this.options.length - 1) * 100 : 0;
    return p`
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
      (t, i) => p`
              <button
                class="step ${i === this.index ? "active" : ""} ${this.readOnly ? "readonly" : ""}"
                type="button"
                ?disabled=${this.readOnly}
                aria-label=${t.label}
                title=${t.label}
                aria-current=${i === this.index ? "true" : "false"}
                @click=${() => this._select(i)}
              >
                <span class="dot"></span>
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
L.styles = [Ti];
lt([
  y({ attribute: !1 })
], L.prototype, "options", 2);
lt([
  y({ type: Number })
], L.prototype, "index", 2);
lt([
  y({ type: Boolean })
], L.prototype, "readOnly", 2);
lt([
  y({ type: Boolean })
], L.prototype, "isAuto", 2);
L = lt([
  K("fan-slider")
], L);
var nn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, $t = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? on(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && nn(t, i, o), o;
};
let j = class extends w {
  constructor() {
    super(...arguments), this.on = !1, this.dry = !1, this.disabled = !1;
  }
  render() {
    return p`
      <button
        class="power-button ${this.on ? "on" : ""} ${this.dry ? "dry" : ""}"
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
j.styles = [zt];
$t([
  y({ type: Boolean })
], j.prototype, "on", 2);
$t([
  y({ type: Boolean })
], j.prototype, "dry", 2);
$t([
  y({ type: Boolean })
], j.prototype, "disabled", 2);
j = $t([
  K("power-button")
], j);
function rn(e, t) {
  const i = `${e}.${t}`;
  if (ui.includes(i))
    throw new Error(`Forbidden service call: ${i}`);
  if (!di.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function sn(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: Gi(e)
    }
  };
}
function an(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function ln(e, t) {
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
function cn(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function dn(e) {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Pe(e, t) {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: e.fan_override_entity,
      option: t
    }
  };
}
function un(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function hn(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
function pn(e) {
  const t = e.indexOf(".");
  return t === -1 ? e : e.slice(0, t);
}
function _n(e) {
  return e.dry_entity ? {
    domain: pn(e.dry_entity),
    service: "turn_off",
    data: {
      entity_id: e.dry_entity
    }
  } : null;
}
async function x(e, t) {
  rn(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function fn(e, t, i) {
  if (!i) {
    await Me(e, t), await x(e, an(t));
    return;
  }
  await x(e, sn(t));
}
async function mn(e, t, i) {
  await x(e, ln(t, i));
}
async function gn(e, t, i) {
  if (t.fan_auto_entity) {
    await x(
      e,
      i ? cn(t) : dn(t)
    );
    return;
  }
  t.fan_override_entity && await x(e, Pe(t, i ? "auto" : "low"));
}
async function yn(e, t, i) {
  await x(e, Pe(t, i));
}
async function vn(e, t) {
  await x(e, un(t));
}
async function de(e, t) {
  t.boost_cancel_script_entity && await x(e, hn(t));
}
async function Me(e, t) {
  const i = _n(t);
  i && await x(e, i);
}
var bn = Object.defineProperty, $n = Object.getOwnPropertyDescriptor, wt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? $n(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && bn(t, i, o), o;
};
let V = class extends w {
  constructor() {
    super(...arguments), this._pending = !1;
  }
  setConfig(e) {
    const t = xe(e);
    if (!!(e.entity?.trim() || e.climate_entity?.trim()) && t.length)
      throw new Error(t.join("; "));
    this._config = e;
  }
  static getConfigElement() {
    return document.createElement(`${Ut}-editor`);
  }
  static getStubConfig() {
    return {};
  }
  /**
   * Approximate row count for legacy Masonry layouts.
   * Sections dashboards use {@link getGridOptions} instead.
   */
  getCardSize() {
    return 8;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 6,
      rows: 8,
      min_rows: 7
    };
  }
  _resolvedConfig() {
    return yt(this.hass, this._config);
  }
  render() {
    if (!this._config) return p``;
    const e = Q(this.hass, this._config), t = this._resolvedConfig(), i = bt(t), n = this._pending || e.errors.length > 0;
    return e.errors.length ? p`
        <ha-card>
          <div class="card">
            <div class="error">${e.errors.join(" ")}</div>
          </div>
        </ha-card>
      ` : p`
      <ha-card>
        <div class="card">
          <div class="title">${e.title}</div>

          <div class="dial-section">
            <climate-dial
              .viewState=${e}
              .disabled=${n}
              .minimumTargetSeparation=${Xi(t)}
              @target-change=${this._handleTargetChange}
            ></climate-dial>
            <div class="dial-controls">
              <power-button
                .on=${e.climate.isOn || e.dry.active}
                .dry=${e.dry.active}
                .disabled=${n}
                @power-toggle=${this._togglePower}
              ></power-button>
              ${e.dry.active ? p`
                      <boost-button
                        .switchMode=${!0}
                        .active=${!1}
                        .disabled=${n}
                        .remaining=${null}
                        .hasCancel=${!1}
                        @switch-mode=${this._handleSwitchMode}
                      ></boost-button>
                    ` : e.boost.available ? p`
                        <boost-button
                          .switchMode=${!1}
                          .active=${e.boost.active}
                          .disabled=${n}
                          .remaining=${e.boost.remaining}
                          .hasCancel=${e.boost.hasCancel}
                          @boost-press=${this._handleBoost}
                          @boost-cancel=${this._handleBoostCancel}
                        ></boost-button>
                      ` : h}
            </div>
          </div>

          ${e.fan.available && !e.dry.active ? p`
                  <div class="fan-section">
                    <div class="fan-row">
                      <button
                        class="auto-toggle ${e.fan.isAuto ? "active" : ""}"
                        type="button"
                        aria-label="${e.fan.isAuto ? "Disable automatic fan" : "Enable automatic fan"}"
                        aria-pressed=${e.fan.isAuto ? "true" : "false"}
                        ?disabled=${n || e.boost.active}
                        @click=${this._toggleFanAuto}
                      >
                        Auto
                      </button>
                      <fan-slider
                        .options=${i}
                        .index=${e.fan.sliderIndex}
                        .readOnly=${e.fan.readOnly}
                        .isAuto=${e.fan.isAuto}
                        @fan-select=${this._handleFanSelect}
                      ></fan-slider>
                      ${t.show_recommended_fan !== !1 && e.fan.recommendedValue ? p`
                              <span
                                class="fan-rec"
                                title="Recommended fan speed: ${e.fan.recommendedValue}"
                              >
                                Rec: ${e.fan.recommendedValue}
                              </span>
                            ` : h}
                    </div>
                  </div>
                ` : h}
          ${e.warnings.length ? p`<div class="warning">${e.warnings.join(" ")}</div>` : h}
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
    const e = this._resolvedConfig(), t = Q(this.hass, this._config), i = t.climate.isOn || t.dry.active;
    await this._withPending(() => fn(this.hass, e, !i));
  }
  async _handleTargetChange(e) {
    if (!this.hass || !e.detail) return;
    const t = this._resolvedConfig(), i = Q(this.hass, this._config);
    i.dry.active || await this._withPending(async () => {
      i.boost.active && await de(this.hass, t), await mn(this.hass, t, e.detail);
    });
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => vn(this.hass, this._resolvedConfig()));
  }
  async _handleSwitchMode() {
    this.hass && await this._withPending(() => Me(this.hass, this._resolvedConfig()));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => de(this.hass, this._resolvedConfig()));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = Q(this.hass, this._config);
    t.boost.active || await this._withPending(() => gn(this.hass, e, !t.fan.isAuto));
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || Q(this.hass, this._config).boost.active || await this._withPending(
      () => yn(this.hass, this._resolvedConfig(), e.detail.value)
    );
  }
};
V.styles = [zt];
wt([
  y({ attribute: !1 })
], V.prototype, "hass", 2);
wt([
  W()
], V.prototype, "_config", 2);
wt([
  W()
], V.prototype, "_pending", 2);
V = wt([
  K(Ut)
], V);
window.customCards = window.customCards ?? [];
const ue = window.customCards.findIndex((e) => e.type === Tt), he = {
  type: Tt,
  name: ve,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: !0,
  documentationURL: ri,
  getEntitySuggestion(e, t) {
    return wi(e, t) ? {
      config: {
        type: `custom:${Tt}`,
        entity: t
      }
    } : null;
  }
};
ue >= 0 ? window.customCards[ue] = he : window.customCards.push(he);
console.info(
  `%c ${ve} %c v${oi} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
export {
  V as TwoStageThermostatCard
};
//# sourceMappingURL=two-state-thermostat.js.map
