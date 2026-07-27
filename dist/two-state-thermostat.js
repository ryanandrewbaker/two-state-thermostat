const J = globalThis, dt = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = /* @__PURE__ */ Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (dt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = xt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && xt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Yt = (e) => new Nt(typeof e == "string" ? e : e + "", void 0, ut), z = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Nt(i, e, ut);
}, te = (e, t) => {
  if (dt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = J.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, St = dt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Yt(i);
})(e) : e;
const { is: ee, defineProperty: ie, getOwnPropertyDescriptor: ne, getOwnPropertyNames: se, getOwnPropertySymbols: oe, getPrototypeOf: re } = Object, et = globalThis, Et = et.trustedTypes, ae = Et ? Et.emptyScript : "", le = et.reactiveElementPolyfillSupport, D = (e, t) => e, X = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ae : null;
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
} }, ht = (e, t) => !ee(e, t), Ct = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: ht };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), et.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let O = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ct) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && ie(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = ne(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const i = this.properties, n = [...se(i), ...oe(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) i.unshift(St(s));
    } else t !== void 0 && i.push(St(t));
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
    return te(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : X).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : X;
      this._$Em = s;
      const a = r.fromAttribute(i, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ??= r.getPropertyOptions(t), !((n.hasChanged ?? ht)(o, i) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, o] of n) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[D("elementProperties")] = /* @__PURE__ */ new Map(), O[D("finalized")] = /* @__PURE__ */ new Map(), le?.({ ReactiveElement: O }), (et.reactiveElementVersions ??= []).push("2.1.2");
const pt = globalThis, Ot = (e) => e, Y = pt.trustedTypes, Pt = Y ? Y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ft = "?" + y, ce = `<${Ft}>`, x = document, R = () => x.createComment(""), F = (e) => e === null || typeof e != "object" && typeof e != "function", ft = Array.isArray, de = (e) => ft(e) || typeof e?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, Mt = />/g, w = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kt = /'/g, Lt = /"/g, Bt = /^(?:script|style|textarea|title)$/i, Ht = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), f = Ht(1), U = Ht(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), A = x.createTreeWalker(x, 129);
function jt(e, t) {
  if (!ft(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const ue = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = L;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let d, u, c = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, u = r.exec(l), u !== null); ) p = r.lastIndex, r === L ? u[1] === "!--" ? r = Tt : u[1] !== void 0 ? r = Mt : u[2] !== void 0 ? (Bt.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = w) : u[3] !== void 0 && (r = w) : r === w ? u[0] === ">" ? (r = s ?? L, c = -1) : u[1] === void 0 ? c = -2 : (c = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? w : u[3] === '"' ? Lt : kt) : r === Lt || r === kt ? r = w : r === Tt || r === Mt ? r = L : (r = w, s = void 0);
    const _ = r === w && e[a + 1].startsWith("/>") ? " " : "";
    o += r === L ? l + ce : c >= 0 ? (n.push(d), l.slice(0, c) + Rt + l.slice(c) + y + _) : l + y + (c === -2 ? a : _);
  }
  return [jt(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class B {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, u] = ue(t, i);
    if (this.el = B.createElement(d, n), A.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = A.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Rt)) {
          const p = u[r++], _ = s.getAttribute(c).split(y), v = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: v[2], strings: _, ctor: v[1] === "." ? pe : v[1] === "?" ? fe : v[1] === "@" ? _e : it }), s.removeAttribute(c);
        } else c.startsWith(y) && (l.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Bt.test(s.tagName)) {
          const c = s.textContent.split(y), p = c.length - 1;
          if (p > 0) {
            s.textContent = Y ? Y.emptyScript : "";
            for (let _ = 0; _ < p; _++) s.append(c[_], R()), A.nextNode(), l.push({ type: 2, index: ++o });
            s.append(c[p], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ft) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(y, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = x.createElement("template");
    return n.innerHTML = t, n;
  }
}
function T(e, t, i = e, n) {
  if (t === P) return t;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const o = F(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (t = T(e, s._$AS(e, t.values), s, n)), t;
}
class he {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (t?.creationScope ?? x).importNode(i, !0);
    A.currentNode = s;
    let o = A.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new I(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new ge(o, this, t)), this._$AV.push(d), l = n[++a];
      }
      r !== l?.index && (o = A.nextNode(), r++);
    }
    return A.currentNode = x, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = T(this, t, i), F(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : de(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = B.createElement(jt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const o = new he(s, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Ut.get(t.strings);
    return i === void 0 && Ut.set(t.strings, i = new B(t)), i;
  }
  k(t) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new I(this.O(R()), this.O(R()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ot(t).nextSibling;
      Ot(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = h;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = T(this, t, i, 0), r = !F(t) || t !== this._$AH && t !== P, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = T(this, a[n + l], i, l), d === P && (d = this._$AH[l]), r ||= !F(d) || d !== this._$AH[l], d === h ? t = h : t !== h && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pe extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class fe extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class _e extends it {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = T(this, t, i, 0) ?? h) === P) return;
    const n = this._$AH, s = t === h && n !== h || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== h && (n === h || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ge {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const me = pt.litHtmlPolyfillSupport;
me?.(B, I), (pt.litHtmlVersions ??= []).push("3.3.3");
const ve = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = i?.renderBefore ?? null;
    n._$litPart$ = s = new I(t.insertBefore(R(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
const _t = globalThis;
class b extends O {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ve(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
b._$litElement$ = !0, b.finalized = !0, _t.litElementHydrateSupport?.({ LitElement: b });
const be = _t.litElementPolyfillSupport;
be?.({ LitElement: b });
(_t.litElementVersions ??= []).push("4.2.2");
const k = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const $e = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: ht }, ye = (e = $e, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function g(e) {
  return (t, i) => typeof i == "object" ? ye(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
function gt(e) {
  return g({ ...e, state: !0, attribute: !1 });
}
const Dt = "two-state-thermostat", mt = "two-state-thermostat", zt = "Two State Thermostat", we = "0.1.0", Ae = "https://github.com/ryanandrewbaker/two-state-thermostat", It = "heat_cool", Vt = 0.5, Wt = 1, xe = 5, Se = 35, qt = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
], Ee = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  unknown: "Unknown"
}, Ce = "auto", Oe = [
  "climate",
  "input_boolean",
  "input_select",
  "script"
], Pe = ["climate.set_fan_mode"], vt = 135, Gt = 405, Te = Gt - vt;
var Me = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, bt = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ke(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Me(t, i, s), s;
};
let H = class extends b {
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    return this._config ? f`
      <div class="editor">
        <div class="row">
          <label for="name">Card title</label>
          <input
            id="name"
            .value=${this._config.name ?? ""}
            @change=${(e) => this._update({ name: e.target.value || void 0 })}
          />
        </div>

        ${this._entityField("climate_entity", "Climate entity", "climate")}
        ${this._entityField("temperature_entity", "Temperature sensor", "sensor")}
        ${this._entityField("operating_state_entity", "Operating state sensor", "sensor")}
        ${this._entityField("fan_auto_entity", "Fan auto boolean", "input_boolean")}
        ${this._entityField("fan_override_entity", "Fan override select", "input_select")}
        ${this._entityField("effective_fan_entity", "Effective fan sensor", "sensor")}
        ${this._entityField("recommended_fan_entity", "Recommended fan sensor", "sensor")}
        ${this._entityField("boost_script_entity", "Boost script", "script")}
        ${this._entityField("boost_cancel_script_entity", "Boost cancel script", "script")}
        ${this._entityField("boost_active_entity", "Boost active boolean", "input_boolean")}
        ${this._entityField("boost_timer_entity", "Boost timer", "timer")}

        <div class="row">
          <label for="power_on_mode">Power on mode</label>
          <input
            id="power_on_mode"
            .value=${this._config.power_on_mode ?? It}
            @change=${(e) => this._update({
      power_on_mode: e.target.value
    })}
          />
        </div>

        <div class="row">
          <label for="target_step">Target step</label>
          <input
            id="target_step"
            type="number"
            step="0.1"
            .value=${String(this._config.target_step ?? Vt)}
            @change=${(e) => this._update({
      target_step: Number(e.target.value)
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
      this._config.minimum_target_separation ?? Wt
    )}
            @change=${(e) => this._update({
      minimum_target_separation: Number(e.target.value)
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
    ` : f``;
  }
  _entityField(e, t, i) {
    const n = this._config[e] ?? "";
    return f`
      <div class="row">
        <label for=${e}>${t}</label>
        <input
          id=${e}
          .value=${n}
          placeholder="entity_id"
          @change=${(s) => this._update({
      [e]: s.target.value || void 0
    })}
        />
      </div>
    `;
  }
  _checkbox(e, t, i) {
    const n = this._config[e] ?? i;
    return f`
      <div class="checkbox-row">
        <input
          id=${e}
          type="checkbox"
          .checked=${n}
          @change=${(s) => this._update({
      [e]: s.target.checked
    })}
        />
        <label for=${e}>${t}</label>
      </div>
    `;
  }
  _fanOptionsText() {
    return (this._config.fan_options ?? qt).map((t) => `${t.value}:${t.label}`).join(`
`);
  }
  _updateFanOptions(e) {
    const i = e.target.value.split(`
`).map((n) => n.trim()).filter(Boolean).map((n) => {
      const [s, o] = n.split(":");
      return { value: s.trim(), label: (o ?? s).trim() };
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
H.styles = z`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
    }

    input,
    select {
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
  `;
bt([
  g({ attribute: !1 })
], H.prototype, "hass", 2);
bt([
  gt()
], H.prototype, "_config", 2);
H = bt([
  k(`${mt}-editor`)
], H);
const $t = z`
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

  .target-controls {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .target-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }

  .target-label {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    min-width: 2.5rem;
    text-align: center;
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
    border-color: color-mix(in srgb, var(--heat-color, #c86b3a) 60%, transparent);
  }

  .power-button.on {
    background: color-mix(in srgb, var(--heat-color, #c86b3a) 20%, transparent);
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
`, Le = z`
  :host {
    --heat-color: #c86b3a;
    --cool-color: #4a78b8;
    --dial-track: var(--divider-color, rgba(255, 255, 255, 0.12));
    display: block;
    width: 100%;
  }

  .dial-wrap {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    aspect-ratio: 1;
    position: relative;
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
    stroke-width: 12;
    stroke-linecap: round;
    opacity: 0.35;
    transition:
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-heat.active {
    opacity: 0.85;
  }

  .arc-heat.strong {
    opacity: 1;
    stroke-width: 14;
  }

  .arc-cool {
    fill: none;
    stroke: var(--cool-color);
    stroke-width: 12;
    stroke-linecap: round;
    opacity: 0.35;
    transition:
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-cool.active {
    opacity: 0.85;
  }

  .arc-cool.strong {
    opacity: 1;
    stroke-width: 14;
  }

  .subdued .arc-heat,
  .subdued .arc-cool {
    opacity: 0.2;
  }

  .knob {
    fill: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    stroke-width: 3;
    cursor: grab;
  }

  .knob-heat {
    stroke: var(--heat-color);
  }

  .knob-cool {
    stroke: var(--cool-color);
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
`, Ue = z`
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
var De = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, V = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ne(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && De(t, i, s), s;
};
let S = class extends b {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.hasCancel = !1, this.remaining = null;
  }
  render() {
    const e = this.active ? this.remaining ? `Boost ${this.remaining}` : "Boost active" : "Boost";
    return f`
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
S.styles = [$t];
V([
  g({ type: Boolean })
], S.prototype, "active", 2);
V([
  g({ type: Boolean })
], S.prototype, "disabled", 2);
V([
  g({ type: Boolean })
], S.prototype, "hasCancel", 2);
V([
  g({ type: String })
], S.prototype, "remaining", 2);
S = V([
  k("boost-button")
], S);
function Re(e) {
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
function Fe(e, t) {
  return t?.[e] ?? Ee[e];
}
function Q(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
function m(e, t) {
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
function q(e, t) {
  const i = t.toString().includes(".") ? t.toString().split(".")[1]?.length ?? 0 : 0, n = Math.round(e / t) * t;
  return Number(n.toFixed(i));
}
function nt(e) {
  return e.fan_options?.length ? e.fan_options : qt;
}
function G(e, t) {
  return t ? e.find(
    (n) => n.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function Be(e) {
  if (!e || !Q(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const n = new Date(t).getTime() - Date.now();
  if (n <= 0) return "0:00";
  const s = Math.ceil(n / 1e3), o = Math.floor(s / 60), r = s % 60;
  return `${o}:${r.toString().padStart(2, "0")}`;
}
function Kt(e) {
  const t = [];
  e.climate_entity || t.push("Missing required configuration: climate_entity"), e.operating_state_entity || t.push("Missing required configuration: operating_state_entity");
  const i = nt(e);
  new Set(i.map((r) => r.value.toLowerCase())).size !== i.length && t.push("fan_options contains duplicate values");
  const s = !!e.fan_auto_entity, o = !!e.fan_override_entity;
  return s !== o && (s || o) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function He(e, t) {
  const i = [], n = [];
  if (!e) return { errors: i, warnings: n };
  const s = m(e, t.climate_entity);
  if (!s)
    i.push(`Climate entity not found: ${t.climate_entity}`);
  else if (!Q(s))
    i.push(`Climate entity unavailable: ${t.climate_entity}`);
  else {
    const a = $(s.attributes.target_temp_low), l = $(s.attributes.target_temp_high);
    (a === null || l === null) && i.push("Climate entity does not expose target_temp_low/high");
  }
  const o = m(e, t.operating_state_entity);
  o ? Q(o) || i.push(`Operating state entity unavailable: ${t.operating_state_entity}`) : i.push(`Operating state entity not found: ${t.operating_state_entity}`);
  const r = nt(t);
  if (t.fan_override_entity) {
    const a = m(e, t.fan_override_entity);
    if (a && Q(a)) {
      const l = a.attributes.options;
      if (Array.isArray(l))
        for (const d of r)
          l.some(
            (u) => String(u).toLowerCase() === d.value.toLowerCase()
          ) || n.push(`Unsupported fan option in override entity: ${d.value}`);
    }
  }
  return { errors: i, warnings: n };
}
function je(e, t) {
  const i = m(e, t.climate_entity), n = m(e, t.temperature_entity), s = $(n?.state), o = $(i?.attributes.current_temperature), r = s ?? o, a = $(i?.attributes.target_temp_low), l = $(i?.attributes.target_temp_high), d = $(i?.attributes.min_temp) ?? xe, u = $(i?.attributes.max_temp) ?? Se, c = t.target_step ?? $(i?.attributes.target_temp_step) ?? Vt, p = typeof i?.attributes.hvac_mode == "string" ? i.attributes.hvac_mode : i?.state ?? null;
  return {
    current: r,
    targetLow: a,
    targetHigh: l,
    minTemp: d,
    maxTemp: u,
    step: c,
    hvacMode: p,
    isOn: p !== null && p !== "off"
  };
}
function ze(e, t, i, n, s, o) {
  let r = q(e, s), a = q(t, s);
  if (r = Math.max(i, Math.min(r, n)), a = Math.max(i, Math.min(a, n)), a - r < o) {
    const l = (r + a) / 2;
    r = q(l - o / 2, s), a = q(l + o / 2, s);
  }
  return r = Math.max(i, Math.min(r, n - o)), a = Math.min(n, Math.max(a, r + o)), { targetLow: r, targetHigh: a };
}
function Ie(e, t, i, n) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const s = t === "low" ? e.targetLow + i : e.targetLow, o = t === "high" ? e.targetHigh + i : e.targetHigh;
  return ze(
    s,
    o,
    e.minTemp,
    e.maxTemp,
    e.step,
    n
  );
}
function Ve(e, t) {
  const i = nt(t), n = m(e, t.fan_auto_entity), s = m(e, t.fan_override_entity), o = m(e, t.effective_fan_entity), r = m(e, t.recommended_fan_entity), a = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!a && t.fan_override_entity);
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
    const v = n?.state === "on", ot = s?.state ?? null, rt = o?.state ?? r?.state ?? ot, wt = r?.state ?? null, at = v ? rt ?? wt : ot ?? rt, Qt = v ? `Auto · ${G(i, at)}` : `Manual · ${G(i, at)}`, At = Math.max(
      0,
      i.findIndex(
        (Xt) => Xt.value.toLowerCase() === String(at).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: v,
      manualValue: ot,
      effectiveValue: rt,
      recommendedValue: wt,
      displayLabel: Qt,
      sliderIndex: At === -1 ? 0 : At,
      readOnly: v,
      usesSimplifiedModel: !1
    };
  }
  const d = s?.state ?? null, u = d?.toLowerCase() === Ce || d?.toLowerCase() === "automatic", c = u ? o?.state ?? r?.state ?? i[0]?.value ?? null : d, p = u ? `Auto · ${G(i, c)}` : `Manual · ${G(i, c)}`, _ = Math.max(
    0,
    i.findIndex(
      (v) => v.value.toLowerCase() === String(c).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: u,
    manualValue: d,
    effectiveValue: o?.state ?? null,
    recommendedValue: r?.state ?? null,
    displayLabel: p,
    sliderIndex: _ === -1 ? 0 : _,
    readOnly: u,
    usesSimplifiedModel: !0
  };
}
function We(e, t) {
  const i = !!t.boost_script_entity, n = m(e, t.boost_active_entity), s = m(e, t.boost_timer_entity), o = n?.state === "on" || s?.state === "active";
  return {
    available: i,
    active: o,
    remaining: t.show_countdown === !1 ? null : Be(s),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function K(e, t) {
  const i = Kt(t), n = He(e, t), s = m(e, t.operating_state_entity), o = Re(s?.state);
  return {
    title: t.name ?? t.climate_entity,
    operatingState: o,
    operatingLabel: Fe(o, t.state_map),
    climate: je(e, t),
    fan: Ve(e, t),
    boost: We(e, t),
    errors: [...i, ...n.errors],
    warnings: n.warnings
  };
}
function ct(e, t, i) {
  const n = (e - t) / (i - t), s = Math.max(0, Math.min(1, n));
  return vt + s * Te;
}
function qe(e) {
  return {
    currentAngle: e.current === null ? null : ct(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : ct(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : ct(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: vt,
    endAngle: Gt
  };
}
function Ge(e) {
  return e.power_on_mode ?? It;
}
function Ke(e) {
  return e.minimum_target_separation ?? Wt;
}
function Ze(e) {
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
var Je = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, Zt = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Qe(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Je(t, i, s), s;
};
function N(e, t, i, n) {
  const s = n * Math.PI / 180;
  return {
    x: e + i * Math.cos(s),
    y: t + i * Math.sin(s)
  };
}
function Z(e, t, i, n, s) {
  const o = N(e, t, i, n), r = N(e, t, i, s), a = s - n > 180 ? 1 : 0;
  return `M ${o.x} ${o.y} A ${i} ${i} 0 ${a} 1 ${r.x} ${r.y}`;
}
let tt = class extends b {
  get arcState() {
    return Ze(this.viewState.operatingState);
  }
  get geometry() {
    return qe(this.viewState.climate);
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
    const { climate: e, operatingLabel: t } = this.viewState, i = this.arcState, n = this.geometry, s = 100, o = 100, r = 78, a = Z(s, o, r, n.startAngle, n.endAngle), l = n.lowAngle !== null ? Z(s, o, r, n.startAngle, n.lowAngle) : "", d = n.highAngle !== null && n.lowAngle !== null || n.highAngle !== null ? Z(s, o, r, n.highAngle, n.endAngle) : "", u = this.splitTemp(e.current), c = n.lowAngle !== null ? N(s, o, r, n.lowAngle) : null, p = n.highAngle !== null ? N(s, o, r, n.highAngle) : null, _ = n.currentAngle !== null ? N(s, o, r, n.currentAngle) : null;
    return f`
      <div class="dial-wrap ${i.subdued ? "subdued" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${a}></path>
          ${l ? U`<path
                class="arc-heat ${i.warmActive ? "active" : ""} ${i.warmStrong ? "strong" : ""}"
                d=${l}
              ></path>` : null}
          ${d ? U`<path
                class="arc-cool ${i.coolActive ? "active" : ""} ${i.coolStrong ? "strong" : ""}"
                d=${d}
              ></path>` : null}
          ${_ ? U`<circle class="current-dot" cx=${_.x} cy=${_.y} r="3"></circle>` : null}
          ${c ? U`<circle
                class="knob knob-heat"
                cx=${c.x}
                cy=${c.y}
                r="8"
              ></circle>` : null}
          ${p ? U`<circle
                class="knob knob-cool"
                cx=${p.x}
                cy=${p.y}
                r="8"
              ></circle>` : null}
        </svg>
        <div class="center">
          <div class="state-label">${t}</div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(e.current)} degrees"
          >
            <span class="temp-int">${u.int}</span>
            ${u.dec ? f`<span class="temp-dec">${u.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          <div class="range">
            ${this.formatTemp(e.targetLow)} ·
            ${this.formatTemp(e.targetHigh)}
          </div>
        </div>
      </div>
    `;
  }
};
tt.styles = [
  Le,
  z`
      :host {
        display: block;
      }
    `
];
Zt([
  g({ attribute: !1 })
], tt.prototype, "viewState", 2);
tt = Zt([
  k("climate-dial")
], tt);
var Xe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ye(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Xe(t, i, s), s;
};
let E = class extends b {
  constructor() {
    super(...arguments), this.options = [], this.index = 0, this.readOnly = !1, this.isAuto = !1;
  }
  render() {
    const e = this.options.length > 1 ? this.index / (this.options.length - 1) * 100 : 0;
    return f`
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
      (t, i) => f`
              <button
                class="step ${i === this.index ? "active" : ""} ${this.readOnly ? "readonly" : ""}"
                type="button"
                ?disabled=${this.readOnly}
                aria-label=${t.label}
                aria-current=${i === this.index ? "true" : "false"}
                @click=${() => this._select(i)}
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
E.styles = [Ue];
W([
  g({ attribute: !1 })
], E.prototype, "options", 2);
W([
  g({ type: Number })
], E.prototype, "index", 2);
W([
  g({ type: Boolean })
], E.prototype, "readOnly", 2);
W([
  g({ type: Boolean })
], E.prototype, "isAuto", 2);
E = W([
  k("fan-slider")
], E);
var ti = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, yt = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ei(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && ti(t, i, s), s;
};
let j = class extends b {
  constructor() {
    super(...arguments), this.on = !1, this.disabled = !1;
  }
  render() {
    return f`
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
j.styles = [$t];
yt([
  g({ type: Boolean })
], j.prototype, "on", 2);
yt([
  g({ type: Boolean })
], j.prototype, "disabled", 2);
j = yt([
  k("power-button")
], j);
function ii(e, t) {
  const i = `${e}.${t}`;
  if (Pe.includes(i))
    throw new Error(`Forbidden service call: ${i}`);
  if (!Oe.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function ni(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: Ge(e)
    }
  };
}
function si(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function oi(e, t) {
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
function ri(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function ai(e) {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Jt(e, t) {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: e.fan_override_entity,
      option: t
    }
  };
}
function li(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function ci(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
async function C(e, t) {
  ii(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function di(e, t, i) {
  await C(e, i ? ni(t) : si(t));
}
async function ui(e, t, i) {
  await C(e, oi(t, i));
}
async function hi(e, t, i) {
  if (t.fan_auto_entity) {
    await C(
      e,
      i ? ri(t) : ai(t)
    );
    return;
  }
  t.fan_override_entity && await C(e, Jt(t, i ? "auto" : "low"));
}
async function pi(e, t, i) {
  await C(e, Jt(t, i));
}
async function fi(e, t) {
  await C(e, li(t));
}
async function _i(e, t) {
  t.boost_cancel_script_entity && await C(e, ci(t));
}
var gi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, st = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? mi(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && gi(t, i, s), s;
};
let M = class extends b {
  constructor() {
    super(...arguments), this._pending = !1;
  }
  setConfig(e) {
    const t = Kt(e);
    if (t.length)
      throw new Error(t.join("; "));
    this._config = e;
  }
  static getConfigElement() {
    return document.createElement(`${mt}-editor`);
  }
  static getStubConfig() {
    return {
      climate_entity: "climate.example",
      operating_state_entity: "sensor.example_operating_state",
      name: "Example Room",
      power_on_mode: "heat_cool",
      show_countdown: !0,
      show_recommended_fan: !0,
      show_effective_targets: !1
    };
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      rows: 5,
      min_rows: 4
    };
  }
  render() {
    if (!this._config) return f``;
    const e = K(this.hass, this._config), t = nt(this._config), i = this._pending || e.errors.length > 0;
    return e.errors.length ? f`
        <ha-card>
          <div class="card">
            <div class="error">${e.errors.join(" ")}</div>
          </div>
        </ha-card>
      ` : f`
      <ha-card>
        <div class="card">
          <div class="title">${e.title}</div>

          <climate-dial .viewState=${e}></climate-dial>

          <div class="target-controls">
            <div class="target-group">
              <button
                type="button"
                aria-label="Decrease heating target"
                ?disabled=${i}
                @click=${() => this._adjustTarget("low", -e.climate.step)}
              >
                −
              </button>
              <span class="target-label"
                >${e.climate.targetLow?.toFixed(1) ?? "—"}</span
              >
              <button
                type="button"
                aria-label="Increase heating target"
                ?disabled=${i}
                @click=${() => this._adjustTarget("low", e.climate.step)}
              >
                +
              </button>
            </div>
            <div class="target-group">
              <button
                type="button"
                aria-label="Decrease cooling target"
                ?disabled=${i}
                @click=${() => this._adjustTarget("high", -e.climate.step)}
              >
                −
              </button>
              <span class="target-label"
                >${e.climate.targetHigh?.toFixed(1) ?? "—"}</span
              >
              <button
                type="button"
                aria-label="Increase cooling target"
                ?disabled=${i}
                @click=${() => this._adjustTarget("high", e.climate.step)}
              >
                +
              </button>
            </div>
          </div>

          <div class="controls-row">
            <power-button
              .on=${e.climate.isOn}
              .disabled=${i}
              @power-toggle=${this._togglePower}
            ></power-button>

            ${e.boost.available ? f`
                    <boost-button
                      .active=${e.boost.active}
                      .disabled=${i}
                      .remaining=${e.boost.remaining}
                      .hasCancel=${e.boost.hasCancel}
                      @boost-press=${this._handleBoost}
                      @boost-cancel=${this._handleBoostCancel}
                    ></boost-button>
                  ` : h}
          </div>

          ${e.fan.available ? f`
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
                      .options=${t}
                      .index=${e.fan.sliderIndex}
                      .readOnly=${e.fan.readOnly}
                      .isAuto=${e.fan.isAuto}
                      @fan-select=${this._handleFanSelect}
                    ></fan-slider>
                    ${this._config.show_recommended_fan !== !1 && e.fan.recommendedValue ? f`
                            <div class="secondary-status">
                              Recommended: ${e.fan.recommendedValue}
                            </div>
                          ` : h}
                  </div>
                ` : h}
          ${e.warnings.length ? f`<div class="warning">${e.warnings.join(" ")}</div>` : h}
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
    const e = K(this.hass, this._config);
    await this._withPending(
      () => di(this.hass, this._config, !e.climate.isOn)
    );
  }
  async _adjustTarget(e, t) {
    if (!this.hass) return;
    const i = K(this.hass, this._config), n = Ie(
      i.climate,
      e,
      t,
      Ke(this._config)
    );
    n && await this._withPending(() => ui(this.hass, this._config, n));
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => fi(this.hass, this._config));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => _i(this.hass, this._config));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = K(this.hass, this._config);
    await this._withPending(
      () => hi(this.hass, this._config, !e.fan.isAuto)
    );
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || await this._withPending(
      () => pi(this.hass, this._config, e.detail.value)
    );
  }
};
M.styles = [$t];
st([
  g({ attribute: !1 })
], M.prototype, "hass", 2);
st([
  gt()
], M.prototype, "_config", 2);
st([
  gt()
], M.prototype, "_pending", 2);
M = st([
  k(mt)
], M);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: Dt,
  name: zt,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: !0,
  documentationURL: Ae,
  getEntitySuggestion(e, t) {
    if (!t.startsWith("climate.")) return null;
    const i = e.states[t];
    if (!i) return null;
    const n = i.attributes.target_temp_low, s = i.attributes.target_temp_high;
    return n === void 0 || s === void 0 ? null : {
      config: {
        type: `custom:${Dt}`,
        climate_entity: t,
        operating_state_entity: "sensor.example_operating_state",
        name: i.attributes.friendly_name
      }
    };
  }
});
console.info(
  `%c ${zt} %c v${we} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
export {
  M as TwoStageThermostatCard
};
//# sourceMappingURL=two-state-thermostat.js.map
