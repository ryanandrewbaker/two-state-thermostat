const at = globalThis, wt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = /* @__PURE__ */ Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let te = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (wt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Ut.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ut.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const me = (e) => new te(typeof e == "string" ? e : e + "", void 0, At), J = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, r) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new te(i, e, At);
}, ge = (e, t) => {
  if (wt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = at.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Bt = wt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return me(i);
})(e) : e;
const { is: ve, defineProperty: ye, getOwnPropertyDescriptor: be, getOwnPropertyNames: $e, getOwnPropertySymbols: we, getPrototypeOf: Ae } = Object, dt = globalThis, Rt = dt.trustedTypes, xe = Rt ? Rt.emptyScript : "", Se = dt.reactiveElementPolyfillSupport, K = (e, t) => e, lt = { toAttribute(e, t) {
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
} }, xt = (e, t) => !ve(e, t), Ht = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ht) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && ye(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: r } = be(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = Ae(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const i = this.properties, n = [...$e(i), ...we(i)];
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
      for (const o of n) i.unshift(Bt(o));
    } else t !== void 0 && i.push(Bt(t));
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
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : lt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : lt;
      this._$Em = o;
      const a = s.fromAttribute(i, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), n ??= s.getPropertyOptions(t), !((n.hasChanged ?? xt)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, n)))) return;
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[K("elementProperties")] = /* @__PURE__ */ new Map(), L[K("finalized")] = /* @__PURE__ */ new Map(), Se?.({ ReactiveElement: L }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const St = globalThis, Ft = (e) => e, ct = St.trustedTypes, It = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ee = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + w, Ee = `<${ie}>`, C = document, G = () => C.createComment(""), X = (e) => e === null || typeof e != "object" && typeof e != "function", Et = Array.isArray, Ce = (e) => Et(e) || typeof e?.[Symbol.iterator] == "function", vt = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zt = /-->/g, jt = />/g, S = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Kt = /"/g, ne = /^(?:script|style|textarea|title)$/i, oe = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), h = oe(1), nt = oe(2), N = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function re(e, t) {
  if (!Et(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return It !== void 0 ? It.createHTML(t) : t;
}
const Te = (e, t) => {
  const i = e.length - 1, n = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = z;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, u, d = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, u = s.exec(l), u !== null); ) _ = s.lastIndex, s === z ? u[1] === "!--" ? s = zt : u[1] !== void 0 ? s = jt : u[2] !== void 0 ? (ne.test(u[2]) && (o = RegExp("</" + u[2], "g")), s = S) : u[3] !== void 0 && (s = S) : s === S ? u[0] === ">" ? (s = o ?? z, d = -1) : u[1] === void 0 ? d = -2 : (d = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? S : u[3] === '"' ? Kt : Vt) : s === Kt || s === Vt ? s = S : s === zt || s === jt ? s = z : (s = S, o = void 0);
    const g = s === S && e[a + 1].startsWith("/>") ? " " : "";
    r += s === z ? l + Ee : d >= 0 ? (n.push(c), l.slice(0, d) + ee + l.slice(d) + w + g) : l + w + (d === -2 ? a : g);
  }
  return [re(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Y {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, u] = Te(t, i);
    if (this.el = Y.createElement(c, n), E.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = E.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(ee)) {
          const _ = u[s++], g = o.getAttribute(d).split(w), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: r, name: m[2], strings: g, ctor: m[1] === "." ? Oe : m[1] === "?" ? ke : m[1] === "@" ? Me : ut }), o.removeAttribute(d);
        } else d.startsWith(w) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ne.test(o.tagName)) {
          const d = o.textContent.split(w), _ = d.length - 1;
          if (_ > 0) {
            o.textContent = ct ? ct.emptyScript : "";
            for (let g = 0; g < _; g++) o.append(d[g], G()), E.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[_], G());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ie) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(w, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += w.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = C.createElement("template");
    return n.innerHTML = t, n;
  }
}
function U(e, t, i = e, n) {
  if (t === N) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = X(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = U(e, o._$AS(e, t.values), o, n)), t;
}
class Pe {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? C).importNode(i, !0);
    E.currentNode = o;
    let r = E.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Q(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Le(r, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== l?.index && (r = E.nextNode(), s++);
    }
    return E.currentNode = C, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = U(this, t, i), X(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Y.createElement(re(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const r = new Pe(o, this), s = r.u(this.options);
      r.p(i), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Wt.get(t.strings);
    return i === void 0 && Wt.set(t.strings, i = new Y(t)), i;
  }
  k(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of t) o === i.length ? i.push(n = new Q(this.O(G()), this.O(G()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ft(t).nextSibling;
      Ft(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = p;
  }
  _$AI(t, i = this, n, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = U(this, t, i, 0), s = !X(t) || t !== this._$AH && t !== N, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = U(this, a[n + l], i, l), c === N && (c = this._$AH[l]), s ||= !X(c) || c !== this._$AH[l], c === p ? t = p : t !== p && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Oe extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ke extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Me extends ut {
  constructor(t, i, n, o, r) {
    super(t, i, n, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = U(this, t, i, 0) ?? p) === N) return;
    const n = this._$AH, o = t === p && n !== p || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== p && (n === p || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const De = St.litHtmlPolyfillSupport;
De?.(Y, Q), (St.litHtmlVersions ??= []).push("3.3.3");
const Ne = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = o = new Q(t.insertBefore(G(), r), r, void 0, i ?? {});
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
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ne(i, this.renderRoot, this.renderOptions);
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
const Ue = Ct.litElementPolyfillSupport;
Ue?.({ LitElement: b });
(Ct.litElementVersions ??= []).push("4.2.2");
const H = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Be = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: xt }, Re = (e = Be, t, i) => {
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
function f(e) {
  return (t, i) => typeof i == "object" ? Re(e, t, i) : ((n, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, i);
}
function F(e) {
  return f({ ...e, state: !0, attribute: !1 });
}
const $t = "two-state-thermostat", Tt = "two-state-thermostat", se = "Two State Thermostat", He = "0.3.0", Fe = "https://github.com/ryanandrewbaker/two-state-thermostat", Pt = "heat_cool", Ot = 0.5, kt = 1, Ie = 5, ze = 35, ae = [
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
function tt(e, t) {
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
function qt(e, t) {
  const i = e[t];
  return typeof i == "string" && i.trim() !== "" ? i : void 0;
}
function Gt(e, t) {
  const i = e[t];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string" && i.trim() !== "") {
    const n = Number(i);
    return Number.isFinite(n) ? n : void 0;
  }
}
function Ze(e, t) {
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
function pt(e) {
  return e.entity?.trim() || e.climate_entity?.trim() || void 0;
}
function Je(e) {
  const t = e.split(".");
  if (t.length !== 2 || t[0] !== "climate") return null;
  const i = t[1];
  for (const n of Ge)
    if (i.endsWith(n))
      return i.slice(0, -n.length);
  return i;
}
function ce(e, t) {
  if (!e) return {};
  const i = Je(t);
  if (!i) return {};
  const n = {};
  for (const [o, r] of Object.entries(Xe)) {
    const s = r(i);
    e.states[s] && (n[o] = s);
  }
  return n;
}
function de(e, t) {
  const i = tt(e, t);
  if (!i) return {};
  const n = i.attributes, o = {};
  for (const [r, s] of Object.entries(
    Ye
  )) {
    const a = qt(n, s);
    a && (o[r] = a);
  }
  return {
    ...o,
    power_on_mode: qt(
      n,
      ot.power_on_mode
    ),
    fan_options: Ze(
      n,
      ot.fan_options
    ),
    target_step: Gt(
      n,
      ot.target_step
    ),
    minimum_target_separation: Gt(
      n,
      ot.minimum_target_separation
    )
  };
}
function y(e, t, i) {
  if (e?.trim()) return e.trim();
  if (t) return t;
  if (i) return i;
}
function yt(e, t, i) {
  return e !== void 0 ? e : t !== void 0 ? t : i;
}
function Qe(e, t) {
  if (e !== void 0) return e;
  if (t !== void 0) return t;
}
function ht(e, t) {
  const i = pt(t) ?? "", n = i ? de(e, i) : {}, o = i ? ce(e, i) : {}, r = {
    type: t.type,
    entity: i,
    climate_entity: i,
    name: t.name,
    temperature_entity: y(
      t.temperature_entity,
      n.temperature_entity,
      o.temperature_entity
    ),
    operating_state_entity: y(
      t.operating_state_entity,
      n.operating_state_entity,
      o.operating_state_entity
    ),
    fan_auto_entity: y(
      t.fan_auto_entity,
      n.fan_auto_entity,
      o.fan_auto_entity
    ),
    fan_override_entity: y(
      t.fan_override_entity,
      n.fan_override_entity,
      o.fan_override_entity
    ),
    effective_fan_entity: y(
      t.effective_fan_entity,
      n.effective_fan_entity,
      o.effective_fan_entity
    ),
    recommended_fan_entity: y(
      t.recommended_fan_entity,
      n.recommended_fan_entity,
      o.recommended_fan_entity
    ),
    boost_script_entity: y(
      t.boost_script_entity,
      n.boost_script_entity,
      o.boost_script_entity
    ),
    boost_cancel_script_entity: y(
      t.boost_cancel_script_entity,
      n.boost_cancel_script_entity,
      o.boost_cancel_script_entity
    ),
    boost_active_entity: y(
      t.boost_active_entity,
      n.boost_active_entity,
      o.boost_active_entity
    ),
    boost_timer_entity: y(
      t.boost_timer_entity,
      n.boost_timer_entity,
      o.boost_timer_entity
    ),
    power_on_mode: yt(
      t.power_on_mode,
      n.power_on_mode,
      Pt
    ),
    fan_options: Qe(t.fan_options, n.fan_options),
    target_step: yt(
      t.target_step,
      n.target_step,
      Ot
    ),
    minimum_target_separation: yt(
      t.minimum_target_separation,
      n.minimum_target_separation,
      kt
    ),
    show_countdown: t.show_countdown ?? !0,
    show_recommended_fan: t.show_recommended_fan ?? !0,
    show_effective_targets: t.show_effective_targets ?? !1,
    state_map: t.state_map,
    usesHvacActionFallback: !1
  };
  return r.usesHvacActionFallback = !r.operating_state_entity, r;
}
function ti(e, t, i) {
  if (t.name?.trim()) return t.name.trim();
  const n = i ? tt(e, i) : void 0;
  return n && e?.formatEntityName ? e.formatEntityName(n) : n && typeof n.attributes.friendly_name == "string" ? n.attributes.friendly_name : i ?? "Two State Thermostat";
}
function ei(e, t) {
  const i = tt(e, t);
  return i ? i.attributes.target_temp_low !== void 0 && i.attributes.target_temp_high !== void 0 : !1;
}
function ii(e, t) {
  const i = de(e, t);
  if (i.operating_state_entity && e?.states[i.operating_state_entity])
    return !0;
  const n = ce(e, t);
  return !!(n.operating_state_entity && e?.states[n.operating_state_entity]);
}
function ni(e, t) {
  if (!t.startsWith("climate.")) return !1;
  const i = tt(e, t);
  return i ? i.attributes.two_state_thermostat === !0 ? !0 : ei(e, t) && ii(e, t) : !1;
}
function oi(e, t) {
  const i = e[t];
  return typeof i == "string" && i.trim() !== "";
}
function ri(e, t) {
  if (!t) return "missing";
  const i = tt(e, t);
  return i ? qe(i) ? "found" : "unavailable" : "missing";
}
function si(e, t) {
  const i = ht(e, t);
  return pt(t) ? [
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
    const l = i[r], c = ri(e, l), u = oi(t, r);
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
function Xt(e) {
  return e.fan_options?.length ? e.fan_options : ae;
}
var ai = Object.defineProperty, li = Object.getOwnPropertyDescriptor, _t = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? li(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && ai(t, i, o), o;
};
let B = class extends b {
  constructor() {
    super(...arguments), this._advancedOpen = !1;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    if (!this._config) return h``;
    const e = pt(this._config), t = e ? si(this.hass, this._config) : [];
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
            @change=${(i) => this._update({ name: i.target.value || void 0 })}
          />
        </div>

        ${e && t.length ? h`
                <div class="discovery">
                  <p class="discovery-title">Controller configuration detected</p>
                  ${t.map((i) => this._renderDiscoveryItem(i))}
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
                .value=${String(this._config.target_step ?? Ot)}
                @change=${(i) => this._update({
      target_step: Number(i.target.value)
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
      this._config.minimum_target_separation ?? kt
    )}
                @change=${(i) => this._update({
      minimum_target_separation: Number(
        i.target.value
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
  _entityPicker(e, t, i) {
    const n = this._config[e] ?? "";
    return h`
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
    return h`
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
    return (this._config.fan_options ?? ae).map((t) => `${t.value}:${t.label}`).join(`
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
B.styles = J`
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
_t([
  f({ attribute: !1 })
], B.prototype, "hass", 2);
_t([
  F()
], B.prototype, "_config", 2);
_t([
  F()
], B.prototype, "_advancedOpen", 2);
B = _t([
  H(`${Tt}-editor`)
], B);
const Mt = J`
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
`, ci = J`
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
`, di = J`
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
var ui = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, et = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? pi(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && ui(t, i, o), o;
};
let T = class extends b {
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
T.styles = [Mt];
et([
  f({ type: Boolean })
], T.prototype, "active", 2);
et([
  f({ type: Boolean })
], T.prototype, "disabled", 2);
et([
  f({ type: Boolean })
], T.prototype, "hasCancel", 2);
et([
  f({ type: String })
], T.prototype, "remaining", 2);
T = et([
  H("boost-button")
], T);
function hi(e) {
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
function _i(e, t) {
  return t?.[e] ?? je[e];
}
function j(e) {
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
function V(e, t) {
  const i = t.toString().includes(".") ? t.toString().split(".")[1]?.length ?? 0 : 0, n = Math.round(e / t) * t;
  return Number(n.toFixed(i));
}
function fi(e) {
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
function mi(e) {
  if (!e) return "Unknown";
  const t = e.trim().toLowerCase();
  return {
    off: "Off",
    idle: "Idle",
    heating: "Heating",
    cooling: "Cooling"
  }[t] ?? "Unknown";
}
function ft(e) {
  return "usesHvacActionFallback" in e ? Xt(e) : e.fan_options?.length ? e.fan_options : Xt(ht(void 0, e));
}
function rt(e, t) {
  return t ? e.find(
    (n) => n.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function gi(e) {
  if (!e || !j(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const n = new Date(t).getTime() - Date.now();
  if (n <= 0) return "0:00";
  const o = Math.ceil(n / 1e3), r = Math.floor(o / 60), s = o % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function ue(e) {
  const t = [];
  pt(e) || t.push("Missing required configuration: entity");
  const n = ft(e);
  new Set(n.map((a) => a.value.toLowerCase())).size !== n.length && t.push("fan_options contains duplicate values");
  const r = !!e.fan_auto_entity, s = !!e.fan_override_entity;
  return r !== s && (r || s) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function vi(e, t) {
  const i = [], n = [];
  if (!e) return { errors: i, warnings: n };
  const o = v(e, t.entity);
  if (!o)
    i.push(`Climate entity not found: ${t.entity}`);
  else if (!j(o))
    i.push(`Climate entity unavailable: ${t.entity}`);
  else {
    const a = $(o.attributes.target_temp_low), l = $(o.attributes.target_temp_high);
    (a === null || l === null) && i.push("Climate entity does not expose target_temp_low/high");
  }
  if (t.usesHvacActionFallback)
    n.push(
      "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead"
    );
  else {
    const a = v(e, t.operating_state_entity);
    a ? j(a) || i.push(
      `Operating state entity unavailable: ${t.operating_state_entity}`
    ) : i.push(`Operating state entity not found: ${t.operating_state_entity}`);
  }
  const r = [
    { id: t.temperature_entity, label: "Temperature sensor" },
    { id: t.boost_timer_entity, label: "Boost timer" },
    { id: t.boost_script_entity, label: "Boost script" },
    { id: t.boost_active_entity, label: "Boost active" }
  ];
  for (const { id: a, label: l } of r) {
    if (!a) continue;
    const c = v(e, a);
    c && !j(c) && n.push(`${l} references an unavailable entity: ${a}`);
  }
  const s = ft(t);
  if (t.fan_override_entity) {
    const a = v(e, t.fan_override_entity);
    if (a && j(a)) {
      const l = a.attributes.options;
      if (Array.isArray(l))
        for (const c of s)
          l.some(
            (u) => String(u).toLowerCase() === c.value.toLowerCase()
          ) || n.push(`Unsupported fan option in override entity: ${c.value}`);
    }
  }
  return { errors: i, warnings: n };
}
function yi(e, t) {
  const i = v(e, t.entity), n = v(e, t.temperature_entity), o = $(n?.state), r = $(i?.attributes.current_temperature), s = o ?? r, a = $(i?.attributes.target_temp_low), l = $(i?.attributes.target_temp_high), c = $(i?.attributes.min_temp) ?? Ie, u = $(i?.attributes.max_temp) ?? ze, d = t.target_step ?? $(i?.attributes.target_temp_step) ?? Ot, _ = typeof i?.attributes.hvac_mode == "string" ? i.attributes.hvac_mode : i?.state ?? null;
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
function Yt(e, t, i, n, o, r) {
  let s = V(e, o), a = V(t, o);
  if (s = Math.max(i, Math.min(s, n)), a = Math.max(i, Math.min(a, n)), a - s < r) {
    const l = (s + a) / 2;
    s = V(l - r / 2, o), a = V(l + r / 2, o);
  }
  return s = Math.max(i, Math.min(s, n - r)), a = Math.min(n, Math.max(a, s + r)), { targetLow: s, targetHigh: a };
}
function bi(e, t) {
  const i = ft(t), n = v(e, t.fan_auto_entity), o = v(e, t.fan_override_entity), r = v(e, t.effective_fan_entity), s = v(e, t.recommended_fan_entity), a = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!a && t.fan_override_entity);
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
    const m = n?.state === "on", k = o?.state ?? null, M = r?.state ?? s?.state ?? k, Dt = s?.state ?? null, gt = m ? M ?? Dt : k ?? M, _e = m ? `Auto · ${rt(i, gt)}` : `Manual · ${rt(i, gt)}`, Nt = Math.max(
      0,
      i.findIndex(
        (fe) => fe.value.toLowerCase() === String(gt).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: m,
      manualValue: k,
      effectiveValue: M,
      recommendedValue: Dt,
      displayLabel: _e,
      sliderIndex: Nt === -1 ? 0 : Nt,
      readOnly: m,
      usesSimplifiedModel: !1
    };
  }
  const c = o?.state ?? null, u = c?.toLowerCase() === Ve || c?.toLowerCase() === "automatic", d = u ? r?.state ?? s?.state ?? i[0]?.value ?? null : c, _ = u ? `Auto · ${rt(i, d)}` : `Manual · ${rt(i, d)}`, g = Math.max(
    0,
    i.findIndex(
      (m) => m.value.toLowerCase() === String(d).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: u,
    manualValue: c,
    effectiveValue: r?.state ?? null,
    recommendedValue: s?.state ?? null,
    displayLabel: _,
    sliderIndex: g === -1 ? 0 : g,
    readOnly: u,
    usesSimplifiedModel: !0
  };
}
function $i(e, t) {
  const i = !!t.boost_script_entity, n = v(e, t.boost_active_entity), o = v(e, t.boost_timer_entity), r = n?.state === "on" || o?.state === "active";
  return {
    available: i,
    active: r,
    remaining: t.show_countdown === !1 ? null : gi(o),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function bt(e, t) {
  const i = ht(e, t), n = ue(i), o = vi(e, i);
  let r, s;
  if (i.usesHvacActionFallback) {
    const a = v(e, i.entity), l = typeof a?.attributes.hvac_action == "string" ? a.attributes.hvac_action : void 0;
    r = fi(l), s = mi(l);
  } else {
    const a = v(e, i.operating_state_entity);
    r = hi(a?.state), s = _i(r, i.state_map);
  }
  return {
    title: ti(e, t, i.entity),
    operatingState: r,
    operatingLabel: s,
    climate: yi(e, i),
    fan: bi(e, i),
    boost: $i(e, i),
    errors: [...n, ...o.errors],
    warnings: o.warnings
  };
}
function W(e, t, i) {
  const n = (e - t) / (i - t), o = Math.max(0, Math.min(1, n));
  return A + o * le;
}
function pe(e) {
  let t = e;
  for (; t < A; ) t += 360;
  for (; t > D; ) t -= 360;
  if (t >= A && t <= D)
    return t;
  const i = (e % 360 + 360) % 360, n = Math.abs(i - A), o = Math.abs(i - (D - 360));
  return n <= o ? A : D;
}
function wi(e, t, i) {
  const o = (pe(e) - A) / le;
  return t + o * (i - t);
}
function Zt(e, t, i, n) {
  if (i.targetLow === null || i.targetHigh === null) return null;
  const o = wi(e, i.minTemp, i.maxTemp), r = V(o, i.step);
  return t === "low" ? Yt(
    r,
    i.targetHigh,
    i.minTemp,
    i.maxTemp,
    i.step,
    n
  ) : Yt(
    i.targetLow,
    r,
    i.minTemp,
    i.maxTemp,
    i.step,
    n
  );
}
function Ai(e) {
  return {
    currentAngle: e.current === null ? null : W(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : W(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : W(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: A,
    endAngle: D
  };
}
function xi(e) {
  return e.power_on_mode ?? Pt;
}
function Si(e) {
  return e.minimum_target_separation ?? kt;
}
function Ei(e) {
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
var Ci = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, I = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ti(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Ci(t, i, o), o;
};
function q(e, t, i, n) {
  const o = n * Math.PI / 180;
  return {
    x: e + i * Math.cos(o),
    y: t + i * Math.sin(o)
  };
}
function st(e, t, i, n, o) {
  const r = q(e, t, i, n), s = q(e, t, i, o), a = o - n > 180 ? 1 : 0;
  return `M ${r.x} ${r.y} A ${i} ${i} 0 ${a} 1 ${s.x} ${s.y}`;
}
function Pi(e, t, i) {
  const n = e.getBoundingClientRect(), o = (t - n.left) / n.width * 200, r = (i - n.top) / n.height * 200, s = Math.atan2(r - 100, o - 100) * 180 / Math.PI;
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
    return Ei(this.viewState.operatingState);
  }
  get displayClimate() {
    return this._preview ? {
      ...this.viewState.climate,
      targetLow: this._preview.targetLow,
      targetHigh: this._preview.targetHigh
    } : this.viewState.climate;
  }
  get geometry() {
    return Ai(this.displayClimate);
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
    const { climate: e, operatingLabel: t } = this.viewState, i = this.displayClimate, n = this.arcState, o = this.geometry, r = 100, s = 100, a = 78, l = st(r, s, a, o.startAngle, o.endAngle), c = o.lowAngle !== null ? st(r, s, a, o.startAngle, o.lowAngle) : "", u = o.highAngle !== null && o.lowAngle !== null || o.highAngle !== null ? st(r, s, a, o.highAngle, o.endAngle) : "", d = this.splitTemp(e.current), _ = o.lowAngle !== null ? q(r, s, a, o.lowAngle) : null, g = o.highAngle !== null ? q(r, s, a, o.highAngle) : null, m = o.currentAngle !== null ? q(r, s, a, o.currentAngle) : null, k = i.targetLow, M = i.targetHigh;
    return h`
      <div class="dial-wrap ${n.subdued ? "subdued" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${l}></path>
          ${c ? nt`<path
                class="arc-heat ${n.warmActive ? "active" : ""} ${n.warmStrong ? "strong" : ""}"
                d=${c}
              ></path>` : null}
          ${u ? nt`<path
                class="arc-cool ${n.coolActive ? "active" : ""} ${n.coolStrong ? "strong" : ""}"
                d=${u}
              ></path>` : null}
          ${m ? nt`<circle class="current-dot" cx=${m.x} cy=${m.y} r="3"></circle>` : null}
          ${this._renderKnob("low", _, k, "Heating target")}
          ${this._renderKnob("high", g, M, "Cooling target")}
        </svg>
        <div class="center">
          <div class="state-label">${t}</div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(e.current)} degrees"
          >
            <span class="temp-int">${d.int}</span>
            ${d.dec ? h`<span class="temp-dec">${d.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          <div class="range">
            ${this.formatTemp(k)} · ${this.formatTemp(M)}
          </div>
        </div>
      </div>
    `;
  }
  _renderKnob(e, t, i, n) {
    if (!t || i === null) return p;
    const o = this._dragTarget === e, r = e === "low" ? "knob knob-heat" : "knob knob-cool";
    return nt`
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
    const o = W(t === "low" ? i.targetLow + n : i.targetHigh + n, i.minTemp, i.maxTemp), r = Zt(
      o,
      t,
      i,
      this.minimumTargetSeparation
    );
    r && this._commitTarget(r);
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
    const n = Pi(i, e.clientX, e.clientY), o = Zt(
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
x.styles = [
  ci,
  J`
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
var Oi = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, it = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ki(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Oi(t, i, o), o;
};
let P = class extends b {
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
      (t, i) => h`
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
P.styles = [di];
it([
  f({ attribute: !1 })
], P.prototype, "options", 2);
it([
  f({ type: Number })
], P.prototype, "index", 2);
it([
  f({ type: Boolean })
], P.prototype, "readOnly", 2);
it([
  f({ type: Boolean })
], P.prototype, "isAuto", 2);
P = it([
  H("fan-slider")
], P);
var Mi = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, Lt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Li(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Mi(t, i, o), o;
};
let Z = class extends b {
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
Z.styles = [Mt];
Lt([
  f({ type: Boolean })
], Z.prototype, "on", 2);
Lt([
  f({ type: Boolean })
], Z.prototype, "disabled", 2);
Z = Lt([
  H("power-button")
], Z);
function Di(e, t) {
  const i = `${e}.${t}`;
  if (We.includes(i))
    throw new Error(`Forbidden service call: ${i}`);
  if (!Ke.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function Ni(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: xi(e)
    }
  };
}
function Ui(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function Bi(e, t) {
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
function Ri(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Hi(e) {
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
function Fi(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function Ii(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
async function O(e, t) {
  Di(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function zi(e, t, i) {
  await O(e, i ? Ni(t) : Ui(t));
}
async function ji(e, t, i) {
  await O(e, Bi(t, i));
}
async function Vi(e, t, i) {
  if (t.fan_auto_entity) {
    await O(
      e,
      i ? Ri(t) : Hi(t)
    );
    return;
  }
  t.fan_override_entity && await O(e, he(t, i ? "auto" : "low"));
}
async function Ki(e, t, i) {
  await O(e, he(t, i));
}
async function Wi(e, t) {
  await O(e, Fi(t));
}
async function qi(e, t) {
  t.boost_cancel_script_entity && await O(e, Ii(t));
}
var Gi = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, mt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Xi(t, i) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Gi(t, i, o), o;
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
  _resolvedConfig() {
    return ht(this.hass, this._config);
  }
  render() {
    if (!this._config) return h``;
    const e = bt(this.hass, this._config), t = this._resolvedConfig(), i = ft(t), n = this._pending || e.errors.length > 0;
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

          <climate-dial
            .viewState=${e}
            .disabled=${n}
            .minimumTargetSeparation=${Si(t)}
            @target-change=${this._handleTargetChange}
          ></climate-dial>

          <div class="controls-row">
            <power-button
              .on=${e.climate.isOn}
              .disabled=${n}
              @power-toggle=${this._togglePower}
            ></power-button>

            ${e.boost.available ? h`
                    <boost-button
                      .active=${e.boost.active}
                      .disabled=${n}
                      .remaining=${e.boost.remaining}
                      .hasCancel=${e.boost.hasCancel}
                      @boost-press=${this._handleBoost}
                      @boost-cancel=${this._handleBoostCancel}
                    ></boost-button>
                  ` : p}
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
                        ?disabled=${n}
                        @click=${this._toggleFanAuto}
                      >
                        Auto
                      </button>
                    </div>
                    <fan-slider
                      .options=${i}
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
    await this._withPending(() => zi(this.hass, e, !t.climate.isOn));
  }
  async _handleTargetChange(e) {
    !this.hass || !e.detail || await this._withPending(
      () => ji(this.hass, this._resolvedConfig(), e.detail)
    );
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => Wi(this.hass, this._resolvedConfig()));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => qi(this.hass, this._resolvedConfig()));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = bt(this.hass, this._config);
    await this._withPending(() => Vi(this.hass, e, !t.fan.isAuto));
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || await this._withPending(
      () => Ki(this.hass, this._resolvedConfig(), e.detail.value)
    );
  }
};
R.styles = [Mt];
mt([
  f({ attribute: !1 })
], R.prototype, "hass", 2);
mt([
  F()
], R.prototype, "_config", 2);
mt([
  F()
], R.prototype, "_pending", 2);
R = mt([
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
    return ni(e, t) ? {
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
