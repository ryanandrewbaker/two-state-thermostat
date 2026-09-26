const _t = globalThis, Nt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = /* @__PURE__ */ Symbol(), Yt = /* @__PURE__ */ new WeakMap();
let me = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Nt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Yt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Yt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ie = (e) => new me(typeof e == "string" ? e : e + "", void 0, Ht), X = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new me(n, e, Ht);
}, ze = (e, t) => {
  if (Nt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = _t.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, Zt = Nt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Ie(n);
})(e) : e;
const { is: je, defineProperty: Ve, getOwnPropertyDescriptor: qe, getOwnPropertyNames: Ke, getOwnPropertySymbols: We, getPrototypeOf: Ge } = Object, vt = globalThis, Jt = vt.trustedTypes, Xe = Jt ? Jt.emptyScript : "", Ye = vt.reactiveElementPolyfillSupport, nt = (e, t) => e, mt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Xe : null;
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
} }, Ut = (e, t) => !je(e, t), Qt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: Ut };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let I = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Qt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Ve(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: r } = qe(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const s = o?.call(this);
      r?.call(this, a), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Qt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(nt("elementProperties"))) return;
    const t = Ge(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(nt("properties"))) {
      const n = this.properties, i = [...Ke(n), ...We(n)];
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
      for (const o of i) n.unshift(Zt(o));
    } else t !== void 0 && n.push(Zt(t));
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
    return ze(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : mt;
      this._$Em = o;
      const s = a.fromAttribute(n, r.type);
      this[o] = s ?? this._$Ej?.get(o) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Ut)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? n ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = r, s = this[o];
        a !== !0 || this._$AL.has(o) || s === void 0 || this.C(o, void 0, r, s);
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[nt("elementProperties")] = /* @__PURE__ */ new Map(), I[nt("finalized")] = /* @__PURE__ */ new Map(), Ye?.({ ReactiveElement: I }), (vt.reactiveElementVersions ??= []).push("2.1.2");
const Ft = globalThis, te = (e) => e, gt = Ft.trustedTypes, ee = gt ? gt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ge = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, ve = "?" + k, Ze = `<${ve}>`, D = document, ot = () => D.createComment(""), rt = (e) => e === null || typeof e != "object" && typeof e != "function", Rt = Array.isArray, Je = (e) => Rt(e) || typeof e?.[Symbol.iterator] == "function", Tt = `[ 	
\f\r]`, tt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ne = /-->/g, ie = />/g, M = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, re = /"/g, ye = /^(?:script|style|textarea|title)$/i, be = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), p = be(1), F = be(2), q = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), L = D.createTreeWalker(D, 129);
function $e(e, t) {
  if (!Rt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ee !== void 0 ? ee.createHTML(t) : t;
}
const Qe = (e, t) => {
  const n = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = tt;
  for (let s = 0; s < n; s++) {
    const l = e[s];
    let c, u, d = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, u = a.exec(l), u !== null); ) f = a.lastIndex, a === tt ? u[1] === "!--" ? a = ne : u[1] !== void 0 ? a = ie : u[2] !== void 0 ? (ye.test(u[2]) && (o = RegExp("</" + u[2], "g")), a = M) : u[3] !== void 0 && (a = M) : a === M ? u[0] === ">" ? (a = o ?? tt, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? M : u[3] === '"' ? re : oe) : a === re || a === oe ? a = M : a === ne || a === ie ? a = tt : (a = M, o = void 0);
    const _ = a === M && e[s + 1].startsWith("/>") ? " " : "";
    r += a === tt ? l + Ze : d >= 0 ? (i.push(c), l.slice(0, d) + ge + l.slice(d) + k + _) : l + k + (d === -2 ? s : _);
  }
  return [$e(e, r + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class at {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let r = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, u] = Qe(t, n);
    if (this.el = at.createElement(c, i), L.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = L.nextNode()) !== null && l.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(ge)) {
          const f = u[a++], _ = o.getAttribute(d).split(k), $ = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: r, name: $[2], strings: _, ctor: $[1] === "." ? en : $[1] === "?" ? nn : $[1] === "@" ? on : yt }), o.removeAttribute(d);
        } else d.startsWith(k) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ye.test(o.tagName)) {
          const d = o.textContent.split(k), f = d.length - 1;
          if (f > 0) {
            o.textContent = gt ? gt.emptyScript : "";
            for (let _ = 0; _ < f; _++) o.append(d[_], ot()), L.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[f], ot());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ve) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(k, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += k.length - 1;
      }
      r++;
    }
  }
  static createElement(t, n) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function K(e, t, n = e, i) {
  if (t === q) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = rt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = K(e, o._$AS(e, t.values), o, i)), t;
}
class tn {
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
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? D).importNode(n, !0);
    L.currentNode = o;
    let r = L.nextNode(), a = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new lt(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new rn(r, this, t)), this._$AV.push(c), l = i[++s];
      }
      a !== l?.index && (r = L.nextNode(), a++);
    }
    return L.currentNode = D, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class lt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = K(this, t, n), rt(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Je(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && rt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = at.createElement($e(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const r = new tn(o, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = ae.get(t.strings);
    return n === void 0 && ae.set(t.strings, n = new at(t)), n;
  }
  k(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const r of t) o === n.length ? n.push(i = new lt(this.O(ot()), this.O(ot()), this, this.options)) : i = n[o], i._$AI(r), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = te(t).nextSibling;
      te(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class yt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, n = this, i, o) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = K(this, t, n, 0), a = !rt(t) || t !== this._$AH && t !== q, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = K(this, s[i + l], n, l), c === q && (c = this._$AH[l]), a ||= !rt(c) || c !== this._$AH[l], c === h ? t = h : t !== h && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class en extends yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class nn extends yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class on extends yt {
  constructor(t, n, i, o, r) {
    super(t, n, i, o, r), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = K(this, t, n, 0) ?? h) === q) return;
    const i = this._$AH, o = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== h && (i === h || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class rn {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    K(this, t);
  }
}
const an = Ft.litHtmlPolyfillSupport;
an?.(at, lt), (Ft.litHtmlVersions ??= []).push("3.3.3");
const sn = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = o = new lt(t.insertBefore(ot(), r), r, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const It = globalThis;
class A extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = sn(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
}
A._$litElement$ = !0, A.finalized = !0, It.litElementHydrateSupport?.({ LitElement: A });
const ln = It.litElementPolyfillSupport;
ln?.({ LitElement: A });
(It.litElementVersions ??= []).push("4.2.2");
const H = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const cn = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: Ut }, dn = (e = cn, t, n) => {
  const { kind: i, metadata: o } = n;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, e, s), s;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(s) {
      const l = this[a];
      t.call(this, s), this.requestUpdate(a, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function g(e) {
  return (t, n) => typeof n == "object" ? dn(e, t, n) : ((i, o, r) => {
    const a = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, n);
}
function Y(e) {
  return g({ ...e, state: !0, attribute: !1 });
}
const Lt = "two-state-thermostat", zt = "two-state-thermostat", we = "Two State Thermostat", un = "0.6.1", hn = "https://github.com/ryanandrewbaker/two-state-thermostat", jt = "heat_cool", Vt = "fan_only", qt = 0.5, Kt = 2, se = 2, pn = 5, fn = 35, Ae = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
], _n = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  dry: "Dry Mode",
  fan: "Fan",
  unknown: "Unknown"
}, mn = "auto", gn = [
  "climate",
  "input_boolean",
  "input_select",
  "script",
  "switch"
], vn = ["climate.set_fan_mode"], C = 135, z = 405, xe = z - C;
function ct(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function yn(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
const bn = ["_auto_climate", "_climate"], $n = {
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
}, wn = {
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
}, pt = {
  power_on_mode: "power_on_mode",
  fan_options: "fan_options",
  target_step: "target_step",
  minimum_target_separation: "minimum_target_separation"
};
function le(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "" ? n : void 0;
}
function ce(e, t) {
  const n = e[t];
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n == "string" && n.trim() !== "") {
    const i = Number(n);
    return Number.isFinite(i) ? i : void 0;
  }
}
function An(e, t) {
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
function bt(e) {
  return e.entity?.trim() || e.climate_entity?.trim() || void 0;
}
function xn(e) {
  const t = e.split(".");
  if (t.length !== 2 || t[0] !== "climate") return null;
  const n = t[1];
  for (const i of bn)
    if (n.endsWith(i))
      return n.slice(0, -i.length);
  return n;
}
function Se(e, t) {
  if (!e) return {};
  const n = xn(t);
  if (!n) return {};
  const i = {};
  for (const [o, r] of Object.entries($n)) {
    const a = r(n);
    e.states[a] && (i[o] = a);
  }
  return i;
}
function Ee(e, t) {
  const n = ct(e, t);
  if (!n) return {};
  const i = n.attributes, o = {};
  for (const [r, a] of Object.entries(
    wn
  )) {
    const s = le(i, a);
    s && (o[r] = s);
  }
  return {
    ...o,
    power_on_mode: le(
      i,
      pt.power_on_mode
    ),
    fan_options: An(
      i,
      pt.fan_options
    ),
    target_step: ce(
      i,
      pt.target_step
    ),
    minimum_target_separation: ce(
      i,
      pt.minimum_target_separation
    )
  };
}
function w(e, t, n) {
  if (e?.trim()) return e.trim();
  if (t) return t;
  if (n) return n;
}
function Ot(e, t, n) {
  return e !== void 0 ? e : t !== void 0 ? t : n;
}
function Sn(e, t) {
  if (e !== void 0) return e;
  if (t !== void 0) return t;
}
function $t(e, t) {
  const n = bt(t) ?? "", i = n ? Ee(e, n) : {}, o = n ? Se(e, n) : {}, r = {
    type: t.type,
    entity: n,
    climate_entity: n,
    name: t.name,
    temperature_entity: w(
      t.temperature_entity,
      i.temperature_entity,
      o.temperature_entity
    ),
    operating_state_entity: w(
      t.operating_state_entity,
      i.operating_state_entity,
      o.operating_state_entity
    ),
    fan_auto_entity: w(
      t.fan_auto_entity,
      i.fan_auto_entity,
      o.fan_auto_entity
    ),
    fan_override_entity: w(
      t.fan_override_entity,
      i.fan_override_entity,
      o.fan_override_entity
    ),
    effective_fan_entity: w(
      t.effective_fan_entity,
      i.effective_fan_entity,
      o.effective_fan_entity
    ),
    recommended_fan_entity: w(
      t.recommended_fan_entity,
      i.recommended_fan_entity,
      o.recommended_fan_entity
    ),
    boost_script_entity: w(
      t.boost_script_entity,
      i.boost_script_entity,
      o.boost_script_entity
    ),
    boost_cancel_script_entity: w(
      t.boost_cancel_script_entity,
      i.boost_cancel_script_entity,
      o.boost_cancel_script_entity
    ),
    boost_active_entity: w(
      t.boost_active_entity,
      i.boost_active_entity,
      o.boost_active_entity
    ),
    boost_timer_entity: w(
      t.boost_timer_entity,
      i.boost_timer_entity,
      o.boost_timer_entity
    ),
    dry_entity: w(
      t.dry_entity,
      i.dry_entity,
      o.dry_entity
    ),
    humidity_entity: w(
      t.humidity_entity,
      i.humidity_entity,
      o.humidity_entity
    ),
    power_on_mode: Ot(
      t.power_on_mode,
      i.power_on_mode,
      jt
    ),
    fan_options: Sn(t.fan_options, i.fan_options),
    target_step: Ot(
      t.target_step,
      i.target_step,
      qt
    ),
    minimum_target_separation: Ot(
      t.minimum_target_separation,
      i.minimum_target_separation,
      Kt
    ),
    show_countdown: t.show_countdown ?? !0,
    show_recommended_fan: t.show_recommended_fan ?? !0,
    show_effective_targets: t.show_effective_targets ?? !1,
    state_map: t.state_map,
    usesHvacActionFallback: !1
  };
  return r.usesHvacActionFallback = !r.operating_state_entity, r;
}
function En(e, t, n) {
  if (t.name?.trim()) return t.name.trim();
  const i = n ? ct(e, n) : void 0;
  return i && e?.formatEntityName ? e.formatEntityName(i) : i && typeof i.attributes.friendly_name == "string" ? i.attributes.friendly_name : n ?? "Two State Thermostat";
}
function kn(e, t) {
  const n = ct(e, t);
  return n ? n.attributes.target_temp_low !== void 0 && n.attributes.target_temp_high !== void 0 : !1;
}
function Cn(e, t) {
  const n = Ee(e, t);
  if (n.operating_state_entity && e?.states[n.operating_state_entity])
    return !0;
  const i = Se(e, t);
  return !!(i.operating_state_entity && e?.states[i.operating_state_entity]);
}
function Tn(e, t) {
  if (!t.startsWith("climate.")) return !1;
  const n = ct(e, t);
  return n ? n.attributes.two_state_thermostat === !0 ? !0 : kn(e, t) && Cn(e, t) : !1;
}
function On(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "";
}
function Pn(e, t) {
  if (!t) return "missing";
  const n = ct(e, t);
  return n ? yn(n) ? "found" : "unavailable" : "missing";
}
function Mn(e, t) {
  const n = $t(e, t);
  return bt(t) ? [
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
  ].map(({ key: r, label: a, optional: s }) => {
    const l = n[r], c = Pn(e, l), u = On(t, r);
    if (r === "operating_state_entity" && !l && n.usesHvacActionFallback)
      return {
        key: r,
        label: a,
        status: "fallback",
        entityId: void 0,
        message: "Using climate hvac_action (Boost/Maintain feedback unavailable)"
      };
    if (s && c === "missing")
      return {
        key: r,
        label: a,
        status: "missing",
        entityId: void 0,
        optional: !0
      };
    let d;
    return c === "unavailable" && l ? d = `${a} references an unavailable entity` : c === "missing" && !s && (d = `${a} not discovered`), {
      key: r,
      label: a,
      status: u ? "override" : c,
      entityId: l,
      optional: s,
      message: d
    };
  }) : [];
}
function de(e) {
  return e.fan_options?.length ? e.fan_options : Ae;
}
var Ln = Object.defineProperty, Dn = Object.getOwnPropertyDescriptor, wt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Dn(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Ln(t, n, o), o;
};
let W = class extends A {
  constructor() {
    super(...arguments), this._advancedOpen = !1;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    if (!this._config) return p``;
    const e = bt(this._config), t = e ? Mn(this.hass, this._config) : [];
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
            @change=${(n) => this._update({ name: n.target.value || void 0 })}
          />
        </div>

        ${e && t.length ? p`
                <div class="discovery">
                  <p class="discovery-title">Controller configuration detected</p>
                  ${t.map((n) => this._renderDiscoveryItem(n))}
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
                .value=${this._config.power_on_mode ?? jt}
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
                .value=${String(this._config.target_step ?? qt)}
                @change=${(n) => this._update({
      target_step: Number(n.target.value)
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
      this._config.minimum_target_separation ?? Kt
    )}
                @change=${(n) => this._update({
      minimum_target_separation: Number(
        n.target.value
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
  _entityPicker(e, t, n) {
    const i = this._config[e] ?? "";
    return p`
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
    return p`
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
    return (this._config.fan_options ?? Ae).map((t) => `${t.value}:${t.label}`).join(`
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
W.styles = X`
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
wt([
  g({ attribute: !1 })
], W.prototype, "hass", 2);
wt([
  Y()
], W.prototype, "_config", 2);
wt([
  Y()
], W.prototype, "_advancedOpen", 2);
W = wt([
  H(`${zt}-editor`)
], W);
const At = X`
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
    --fan-color: #4db6ac;
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
    gap: 8px;
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

  .power-button.on.fan {
    border-color: color-mix(in srgb, var(--fan-color, #4db6ac) 65%, transparent);
    background: color-mix(in srgb, var(--fan-color, #4db6ac) 22%, transparent);
  }

  .fan-mode-button.active {
    border-color: color-mix(in srgb, var(--fan-color, #4db6ac) 70%, transparent);
    background: color-mix(in srgb, var(--fan-color, #4db6ac) 22%, transparent);
    color: var(--fan-color, #4db6ac);
  }

  .fan-mode-button svg {
    width: 18px;
    height: 18px;
    display: block;
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
`, Bn = X`
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
    --fan-color: #4db6ac;
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

  .arc-fan {
    fill: none;
    stroke: var(--fan-color);
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

  .state-label.fan {
    color: var(--fan-color);
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
`, Nn = X`
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
var Hn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, Z = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Un(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Hn(t, n, o), o;
};
let T = class extends A {
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
T.styles = [
  At,
  X`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
    `
];
Z([
  g({ type: Boolean })
], T.prototype, "active", 2);
Z([
  g({ type: Boolean })
], T.prototype, "disabled", 2);
Z([
  g({ type: Boolean })
], T.prototype, "hasCancel", 2);
Z([
  g({ type: String })
], T.prototype, "remaining", 2);
Z([
  g({ type: Boolean })
], T.prototype, "switchMode", 2);
T = Z([
  H("boost-button")
], T);
function Fn(e) {
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
function Pt(e, t) {
  return t?.[e] ?? _n[e];
}
function j(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
function v(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function x(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function Wt(e) {
  return e.toString().includes(".") ? e.toString().split(".")[1]?.length ?? 0 : 0;
}
function E(e, t) {
  const n = Wt(t), i = Math.round(e / t) * t;
  return Number(i.toFixed(n));
}
function Dt(e, t) {
  const n = Wt(t), i = Math.ceil(e / t - Number.EPSILON) * t;
  return Number(i.toFixed(n));
}
function Bt(e, t) {
  const n = Wt(t), i = Math.floor(e / t + Number.EPSILON) * t;
  return Number(i.toFixed(n));
}
function et(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
function ue(e, t, n, i, o, r) {
  let a = et(e, n, i), s = et(t, n, i);
  return s - a < r && (s = Dt(a + r, o), s > i && (s = E(i, o), a = Bt(s - r, o), a = Math.max(n, a))), {
    targetLow: et(a, n, i),
    targetHigh: et(s, n, i)
  };
}
function Rn(e) {
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
function In(e) {
  if (!e) return "Unknown";
  const t = e.trim().toLowerCase();
  return {
    off: "Off",
    idle: "Idle",
    heating: "Heating",
    cooling: "Cooling"
  }[t] ?? "Unknown";
}
function xt(e) {
  return "usesHvacActionFallback" in e ? de(e) : e.fan_options?.length ? e.fan_options : de($t(void 0, e));
}
function ft(e, t) {
  return t ? e.find(
    (i) => i.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function zn(e) {
  if (!e || !j(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const i = new Date(t).getTime() - Date.now();
  if (i <= 0) return "0:00";
  const o = Math.ceil(i / 1e3), r = Math.floor(o / 60), a = o % 60;
  return `${r}:${a.toString().padStart(2, "0")}`;
}
function ke(e) {
  const t = [];
  bt(e) || t.push("Missing required configuration: entity");
  const i = xt(e);
  new Set(i.map((s) => s.value.toLowerCase())).size !== i.length && t.push("fan_options contains duplicate values");
  const r = !!e.fan_auto_entity, a = !!e.fan_override_entity;
  return r !== a && (r || a) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function jn(e, t) {
  const n = [], i = [];
  if (!e) return { errors: n, warnings: i };
  const o = v(e, t.entity);
  if (!o)
    n.push(`Climate entity not found: ${t.entity}`);
  else if (!j(o))
    n.push(`Climate entity unavailable: ${t.entity}`);
  else {
    const l = x(o.attributes.target_temp_low), c = x(o.attributes.target_temp_high);
    (typeof o.attributes.hvac_mode == "string" ? o.attributes.hvac_mode : o.state) !== Vt && (l === null || c === null) && n.push("Climate entity does not expose target_temp_low/high");
  }
  if (!Oe(e, t).active)
    if (t.usesHvacActionFallback)
      i.push(
        "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead"
      );
    else {
      const l = v(e, t.operating_state_entity);
      l ? j(l) || n.push(
        `Operating state entity unavailable: ${t.operating_state_entity}`
      ) : n.push(
        `Operating state entity not found: ${t.operating_state_entity}`
      );
    }
  const a = [
    { id: t.temperature_entity, label: "Temperature sensor" },
    { id: t.boost_timer_entity, label: "Boost timer" },
    { id: t.boost_script_entity, label: "Boost script" },
    { id: t.boost_active_entity, label: "Boost active" },
    { id: t.dry_entity, label: "Dry mode" },
    { id: t.humidity_entity, label: "Humidity sensor" }
  ];
  for (const { id: l, label: c } of a) {
    if (!l) continue;
    const u = v(e, l);
    u && !j(u) && i.push(`${c} references an unavailable entity: ${l}`);
  }
  const s = xt(t);
  if (t.fan_override_entity) {
    const l = v(e, t.fan_override_entity);
    if (l && j(l)) {
      const c = l.attributes.options;
      if (Array.isArray(c))
        for (const u of s)
          c.some(
            (d) => String(d).toLowerCase() === u.value.toLowerCase()
          ) || i.push(`Unsupported fan option in override entity: ${u.value}`);
    }
  }
  return { errors: n, warnings: i };
}
function Vn(e, t) {
  const n = v(e, t.entity), i = v(e, t.temperature_entity), o = x(i?.state), r = x(n?.attributes.current_temperature), a = o ?? r, s = x(n?.attributes.target_temp_low), l = x(n?.attributes.target_temp_high), c = x(n?.attributes.min_temp) ?? pn, u = x(n?.attributes.max_temp) ?? fn, d = t.target_step ?? x(n?.attributes.target_temp_step) ?? qt, f = typeof n?.attributes.hvac_mode == "string" ? n.attributes.hvac_mode : n?.state ?? null;
  return {
    current: a,
    targetLow: s,
    targetHigh: l,
    minTemp: c,
    maxTemp: u,
    step: d,
    hvacMode: f,
    isOn: f !== null && f !== "off"
  };
}
function Ce(e, t, n, i) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const { minTemp: o, maxTemp: r, step: a } = e, s = et(E(n, a), o, r);
  if (t === "low") {
    let f = s;
    const _ = E(e.targetHigh, a), $ = Dt(f + i, a);
    let m = Math.max(_, $);
    return m > r && (m = E(r, a), f = Bt(m - i, a), f = Math.max(o, f)), ue(
      f,
      m,
      o,
      r,
      a,
      i
    );
  }
  let l = s;
  const c = E(e.targetLow, a), u = Bt(l - i, a);
  let d = Math.min(c, u);
  return d < o && (d = E(o, a), l = Dt(d + i, a), l = Math.min(r, l)), ue(
    d,
    l,
    o,
    r,
    a,
    i
  );
}
function qn(e, t, n, i) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const o = t === "low" ? e.targetLow + n : e.targetHigh + n;
  return Ce(e, t, o, i);
}
function Kn(e, t) {
  const n = xt(t), i = v(e, t.fan_auto_entity), o = v(e, t.fan_override_entity), r = v(e, t.effective_fan_entity), a = v(e, t.recommended_fan_entity), s = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!s && t.fan_override_entity);
  if (!s && !l)
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
  const c = Te(e, t).active;
  if (s) {
    const m = i?.state === "on", y = o?.state ?? null, b = r?.state ?? a?.state ?? y, U = a?.state ?? null, P = m ? b ?? U : y ?? b, ht = m ? `Auto · ${ft(n, P)}` : `Manual · ${ft(n, P)}`, Q = Math.max(
      0,
      n.findIndex(
        (Et) => Et.value.toLowerCase() === String(P).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: m,
      manualValue: y,
      effectiveValue: b,
      recommendedValue: U,
      displayLabel: ht,
      sliderIndex: Q === -1 ? 0 : Q,
      readOnly: m || c,
      usesSimplifiedModel: !1
    };
  }
  const u = o?.state ?? null, d = u?.toLowerCase() === mn || u?.toLowerCase() === "automatic", f = d ? r?.state ?? a?.state ?? n[0]?.value ?? null : u, _ = d ? `Auto · ${ft(n, f)}` : `Manual · ${ft(n, f)}`, $ = Math.max(
    0,
    n.findIndex(
      (m) => m.value.toLowerCase() === String(f).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: d,
    manualValue: u,
    effectiveValue: r?.state ?? null,
    recommendedValue: a?.state ?? null,
    displayLabel: _,
    sliderIndex: $ === -1 ? 0 : $,
    readOnly: d || c,
    usesSimplifiedModel: !0
  };
}
function Te(e, t) {
  const n = !!t.boost_script_entity, i = v(e, t.boost_active_entity), o = v(e, t.boost_timer_entity), r = i?.state === "on" || o?.state === "active";
  return {
    available: n,
    active: r,
    remaining: t.show_countdown === !1 ? null : zn(o),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function Oe(e, t) {
  return !t.dry_entity ? { configured: !1, active: !1 } : {
    configured: !0,
    active: v(e, t.dry_entity)?.state === "on"
  };
}
function Wn(e, t) {
  if (!!!t.humidity_entity)
    return { configured: !1, value: null };
  const i = v(e, t.humidity_entity);
  return j(i) ? {
    configured: !0,
    value: x(i?.state)
  } : { configured: !0, value: null };
}
function Gn(e) {
  return e === null || !Number.isFinite(e) ? "—%" : `${Math.round(e)}%`;
}
function R(e, t) {
  const n = $t(e, t), i = ke(n), o = jn(e, n), r = Oe(e, n), a = Wn(e, n), s = Vn(e, n);
  let l, c;
  if (r.active)
    l = "dry", c = Pt("dry", n.state_map);
  else if (s.hvacMode === Vt)
    l = "fan", c = Pt("fan", n.state_map);
  else if (n.usesHvacActionFallback) {
    const u = v(e, n.entity), d = typeof u?.attributes.hvac_action == "string" ? u.attributes.hvac_action : void 0;
    l = Rn(d), c = In(d);
  } else {
    const u = v(e, n.operating_state_entity);
    l = Fn(u?.state), c = Pt(l, n.state_map);
  }
  return {
    title: En(e, t, n.entity),
    operatingState: l,
    operatingLabel: c,
    climate: s,
    fan: Kn(e, n),
    boost: Te(e, n),
    dry: r,
    humidity: a,
    errors: [...i, ...o.errors],
    warnings: o.warnings
  };
}
function it(e, t, n) {
  const i = (e - t) / (n - t), o = Math.max(0, Math.min(1, i));
  return C + o * xe;
}
function Pe(e) {
  let t = e;
  for (; t < C; ) t += 360;
  for (; t > z; ) t -= 360;
  if (t >= C && t <= z)
    return t;
  const n = (e % 360 + 360) % 360, i = Math.abs(n - C), o = Math.abs(n - (z - 360));
  return i <= o ? C : z;
}
function Xn(e, t, n) {
  const o = (Pe(e) - C) / xe;
  return t + o * (n - t);
}
function Yn(e, t, n, i) {
  if (n.targetLow === null || n.targetHigh === null) return null;
  const o = Xn(e, n.minTemp, n.maxTemp), r = E(o, n.step);
  return Ce(n, t, r, i);
}
function Zn(e) {
  return {
    currentAngle: e.current === null ? null : it(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : it(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : it(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: C,
    endAngle: z
  };
}
function Jn(e) {
  switch (e) {
    case "boost_heating":
    case "maintain_heating":
      return "heat";
    case "boost_cooling":
    case "maintain_cooling":
      return "cool";
    case "dry":
      return "dry";
    case "fan":
      return "fan";
    default:
      return "neutral";
  }
}
function Me(e) {
  return e === "boost_heating" || e === "maintain_heating";
}
function Le(e) {
  return e === "boost_cooling" || e === "maintain_cooling";
}
function he(e, t, n) {
  return n - t < e.step / 2 ? null : {
    start: it(t, e.minTemp, e.maxTemp),
    end: it(n, e.minTemp, e.maxTemp)
  };
}
function Qn(e, t, n) {
  if (!n || e.targetLow === null || e.targetHigh === null) return null;
  const { minTemp: i, maxTemp: o, step: r } = e;
  if (Me(t)) {
    const a = e.targetLow, s = Math.min(
      o,
      e.targetHigh,
      E(a + se, r)
    );
    return s <= a ? null : {
      kind: "heat",
      originalTarget: a,
      boostedTarget: s,
      knobClimate: e,
      segment: he(e, a, s)
    };
  }
  if (Le(t)) {
    const a = e.targetHigh, s = Math.max(
      i,
      e.targetLow,
      E(a - se, r)
    );
    return s >= a ? null : {
      kind: "cool",
      originalTarget: a,
      boostedTarget: s,
      knobClimate: e,
      segment: he(e, s, a)
    };
  }
  return null;
}
function ti(e, t, n = null) {
  const { startAngle: i, endAngle: o, currentAngle: r, lowAngle: a, highAngle: s } = e;
  let l = null, c = null, u = null, d = null;
  const f = r !== null && a !== null && r < a && (Me(t) || n === "low");
  a !== null && (f ? (l = { start: i, end: r }, c = { start: r, end: a }) : l = { start: i, end: a });
  const _ = r !== null && s !== null && r > s && (Le(t) || n === "high");
  return s !== null && (_ ? (d = { start: s, end: r }, u = { start: r, end: o }) : u = { start: s, end: o }), { heatBase: l, heatRemaining: c, coolBase: u, coolRemaining: d };
}
function ei(e) {
  return e.power_on_mode ?? jt;
}
function ni(e) {
  return e.minimum_target_separation ?? Kt;
}
function ii(e) {
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
    case "fan":
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
var oi = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, J = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ri(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && oi(t, n, o), o;
};
function V(e, t, n, i) {
  const o = i * Math.PI / 180;
  return {
    x: e + n * Math.cos(o),
    y: t + n * Math.sin(o)
  };
}
function pe(e, t, n, i, o) {
  const r = V(e, t, n, i), a = V(e, t, n, o), s = o - i > 180 ? 1 : 0;
  return `M ${r.x} ${r.y} A ${n} ${n} 0 ${s} 1 ${a.x} ${a.y}`;
}
function ai(e, t, n) {
  const i = e.getBoundingClientRect(), o = (t - i.left) / i.width * 200, r = (n - i.top) / i.height * 200, a = Math.atan2(r - 100, o - 100) * 180 / Math.PI;
  return Pe(a);
}
let O = class extends A {
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
    const e = ii(this.viewState.operatingState);
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
    return Zn(e?.knobClimate ?? this.displayClimate);
  }
  get boostOverlay() {
    return this._dragTarget ? null : Qn(
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
    const t = e.toFixed(1), [n, i] = t.split(".");
    return { int: n, dec: `.${i}` };
  }
  render() {
    const { climate: e, operatingLabel: t, operatingState: n, dry: i, humidity: o } = this.viewState, r = !!i?.active, a = n === "fan", s = r || a, l = this.displayClimate, c = s ? null : this.boostOverlay, u = this.arcState, d = this.geometry, f = ti(d, n, this._dragTarget), _ = Jn(n), $ = o?.configured ? Gn(o.value) : null, m = 100, y = 100, b = 78, U = pe(m, y, b, d.startAngle, d.endAngle), P = this.splitTemp(e.current), ht = l.targetLow, Q = l.targetHigh, Et = c?.kind === "heat" ? c.originalTarget : ht, He = c?.kind === "cool" ? c.originalTarget : Q, Ue = d.lowAngle !== null ? V(m, y, b, d.lowAngle) : null, Fe = d.highAngle !== null ? V(m, y, b, d.highAngle) : null, kt = d.currentAngle !== null ? V(m, y, b, d.currentAngle) : null, Xt = c?.segment == null ? null : c.kind === "heat" ? c.segment.end : c.segment.start, Ct = Xt === null ? null : V(m, y, b, Xt), Re = _ === "heat" ? "heating" : _ === "cool" ? "cooling" : _ === "dry" ? "drying" : _ === "fan" ? "fan" : "";
    return p`
      <div
        class="dial-wrap ${u.subdued ? "subdued" : ""} ${r ? "dry" : ""} ${a ? "fan" : ""}"
      >
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${U}></path>
          ${r ? F`<path class="arc-dry" d=${U}></path>` : h}
          ${a ? F`<path class="arc-fan" d=${U}></path>` : h}
          ${s ? h : this._renderArcSegment(m, y, b, f.heatBase, "heat", "base", u)}
          ${s ? h : this._renderArcSegment(
      m,
      y,
      b,
      f.heatRemaining,
      "heat",
      "remaining",
      u
    )}
          ${s ? h : this._renderArcSegment(m, y, b, f.coolBase, "cool", "base", u)}
          ${s ? h : this._renderArcSegment(
      m,
      y,
      b,
      f.coolRemaining,
      "cool",
      "remaining",
      u
    )}
          ${s ? h : this._renderArcSegment(
      m,
      y,
      b,
      c?.segment ?? null,
      c?.kind ?? "heat",
      "boost",
      u
    )}
          ${s ? h : this._renderKnob("low", Ue, Et, "Heating target")}
          ${s ? h : this._renderKnob("high", Fe, He, "Cooling target")}
          ${!s && Ct ? F`
                  <circle
                    class="boost-cap ${c?.kind === "cool" ? "cool" : "heat"}"
                    cx=${Ct.x}
                    cy=${Ct.y}
                    r="3.5"
                  ></circle>
                ` : h}
          ${kt ? F`
                  <circle
                    class="current-dot"
                    cx=${kt.x}
                    cy=${kt.y}
                    r="5.5"
                  ></circle>
                ` : null}
        </svg>
        <div class="center">
          <div class="state-label ${Re}">${t}</div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(e.current)} degrees"
          >
            <span class="temp-int">${P.int}</span>
            ${P.dec ? p`<span class="temp-dec">${P.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          ${$ ? p`
                  <div
                    class="humidity"
                    aria-label="Current humidity ${$}"
                  >
                    ${$}
                  </div>
                ` : h}
          ${s ? h : p`
                  <div class="range">
                    <span class="range-heat ${_ === "heat" ? "active" : ""}"
                      >${this.formatTemp(ht)}</span
                    >
                    ·
                    <span class="range-cool ${_ === "cool" ? "active" : ""}"
                      >${this.formatTemp(Q)}</span
                    >
                  </div>
                `}
        </div>
      </div>
    `;
  }
  _renderArcSegment(e, t, n, i, o, r, a) {
    if (!i) return null;
    const s = pe(e, t, n, i.start, i.end), l = o === "heat", c = l ? a.warmActive : a.coolActive, u = (r === "remaining" || r === "boost") && (l ? a.warmStrong : a.coolStrong);
    return F`<path
      class="arc-${o} ${r} ${c ? "active" : ""} ${u ? "strong" : ""}"
      d=${s}
    ></path>`;
  }
  _renderKnob(e, t, n, i) {
    if (!t || n === null) return h;
    const o = this._dragTarget === e, r = e === "low" ? "knob knob-heat" : "knob knob-cool";
    return F`
      <g
        role="slider"
        aria-label=${i}
        aria-valuemin=${this.viewState.climate.minTemp}
        aria-valuemax=${this.viewState.climate.maxTemp}
        aria-valuenow=${n}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? -1 : 0}
        @keydown=${(a) => this._handleKnobKeydown(a, e)}
      >
        <circle
          class="knob-hit ${o ? "dragging" : ""}"
          cx=${t.x}
          cy=${t.y}
          r="18"
          ?disabled=${this.disabled}
          @pointerdown=${(a) => this._handlePointerDown(a, e)}
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
    const o = qn(n, t, i, this.minimumTargetSeparation);
    o && this._commitTarget(o);
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
    const i = ai(n, e.clientX, e.clientY), o = Yn(
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
O.styles = [
  Bn,
  X`
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
J([
  g({ attribute: !1 })
], O.prototype, "viewState", 2);
J([
  g({ type: Number })
], O.prototype, "minimumTargetSeparation", 2);
J([
  g({ type: Boolean })
], O.prototype, "disabled", 2);
J([
  Y()
], O.prototype, "_dragTarget", 2);
J([
  Y()
], O.prototype, "_preview", 2);
O = J([
  H("climate-dial")
], O);
var si = Object.defineProperty, li = Object.getOwnPropertyDescriptor, Gt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? li(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && si(t, n, o), o;
};
let st = class extends A {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1;
  }
  render() {
    return p`
      <button
        class="fan-mode-button ${this.active ? "active" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.active ? "Leave fan only mode" : "Enable fan only mode"}
        aria-pressed=${this.active ? "true" : "false"}
        title="Fan only"
        @click=${this._handleClick}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 11a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m.5-9C17 2 17.11 5.57 14.75 6.75c-.99.49-1.43 1.54-1.62 2.47.48.2.9.51 1.22.91 3.7-2 7.68-1.21 7.68 2.37 0 4.5-3.57 4.6-4.75 2.23-.5-.99-1.56-1.43-2.49-1.62-.2.48-.51.89-.91 1.23 1.99 3.69 1.2 7.66-2.38 7.66-4.5 0-4.59-3.58-3.23-5.76.98-.49 1.42-1.53 1.62-2.45-.49-.2-.92-.52-1.24-.92C5.96 15.85 2 15.07 2 11.5 2 7 5.56 6.89 6.74 9.26c.5.99 1.55 1.42 2.48 1.61.19-.48.51-.9.92-1.22C8.15 5.96 8.94 2 12.5 2Z"
          ></path>
        </svg>
      </button>
    `;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("fan-mode-toggle", { bubbles: !0, composed: !0 })
    );
  }
};
st.styles = [At];
Gt([
  g({ type: Boolean })
], st.prototype, "active", 2);
Gt([
  g({ type: Boolean })
], st.prototype, "disabled", 2);
st = Gt([
  H("fan-mode-button")
], st);
var ci = Object.defineProperty, di = Object.getOwnPropertyDescriptor, dt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? di(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ci(t, n, o), o;
};
let B = class extends A {
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
      (t, n) => p`
              <button
                class="step ${n === this.index ? "active" : ""} ${this.readOnly ? "readonly" : ""}"
                type="button"
                ?disabled=${this.readOnly}
                aria-label=${t.label}
                title=${t.label}
                aria-current=${n === this.index ? "true" : "false"}
                @click=${() => this._select(n)}
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
B.styles = [Nn];
dt([
  g({ attribute: !1 })
], B.prototype, "options", 2);
dt([
  g({ type: Number })
], B.prototype, "index", 2);
dt([
  g({ type: Boolean })
], B.prototype, "readOnly", 2);
dt([
  g({ type: Boolean })
], B.prototype, "isAuto", 2);
B = dt([
  H("fan-slider")
], B);
var ui = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, ut = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hi(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ui(t, n, o), o;
};
let N = class extends A {
  constructor() {
    super(...arguments), this.on = !1, this.dry = !1, this.fan = !1, this.disabled = !1;
  }
  render() {
    return p`
      <button
        class="power-button ${this.on ? "on" : ""} ${this.dry ? "dry" : ""} ${this.fan ? "fan" : ""}"
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
N.styles = [At];
ut([
  g({ type: Boolean })
], N.prototype, "on", 2);
ut([
  g({ type: Boolean })
], N.prototype, "dry", 2);
ut([
  g({ type: Boolean })
], N.prototype, "fan", 2);
ut([
  g({ type: Boolean })
], N.prototype, "disabled", 2);
N = ut([
  H("power-button")
], N);
function pi(e, t) {
  const n = `${e}.${t}`;
  if (vn.includes(n))
    throw new Error(`Forbidden service call: ${n}`);
  if (!gn.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function De(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: ei(e)
    }
  };
}
function fi(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: Vt
    }
  };
}
function _i(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function mi(e, t) {
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
function gi(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function vi(e) {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Be(e, t) {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: e.fan_override_entity,
      option: t
    }
  };
}
function yi(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function bi(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
function $i(e) {
  const t = e.indexOf(".");
  return t === -1 ? e : e.slice(0, t);
}
function wi(e) {
  return e.dry_entity ? {
    domain: $i(e.dry_entity),
    service: "turn_off",
    data: {
      entity_id: e.dry_entity
    }
  } : null;
}
async function S(e, t) {
  pi(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function Ai(e, t, n) {
  await S(
    e,
    n ? fi(t) : De(t)
  );
}
async function xi(e, t, n) {
  if (!n) {
    await Ne(e, t), await S(e, _i(t));
    return;
  }
  await S(e, De(t));
}
async function Si(e, t, n) {
  await S(e, mi(t, n));
}
async function Ei(e, t, n) {
  if (t.fan_auto_entity) {
    await S(
      e,
      n ? gi(t) : vi(t)
    );
    return;
  }
  t.fan_override_entity && await S(e, Be(t, n ? "auto" : "low"));
}
async function ki(e, t, n) {
  await S(e, Be(t, n));
}
async function Ci(e, t) {
  await S(e, yi(t));
}
async function Mt(e, t) {
  t.boost_cancel_script_entity && await S(e, bi(t));
}
async function Ne(e, t) {
  const n = wi(t);
  n && await S(e, n);
}
var Ti = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, St = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Oi(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Ti(t, n, o), o;
};
let G = class extends A {
  constructor() {
    super(...arguments), this._pending = !1;
  }
  setConfig(e) {
    const t = ke(e);
    if (!!(e.entity?.trim() || e.climate_entity?.trim()) && t.length)
      throw new Error(t.join("; "));
    this._config = e;
  }
  static getConfigElement() {
    return document.createElement(`${zt}-editor`);
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
    return $t(this.hass, this._config);
  }
  render() {
    if (!this._config) return p``;
    const e = R(this.hass, this._config), t = this._resolvedConfig(), n = xt(t), i = this._pending || e.errors.length > 0;
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
              .disabled=${i}
              .minimumTargetSeparation=${ni(t)}
              @target-change=${this._handleTargetChange}
            ></climate-dial>
            <div class="dial-controls">
              <power-button
                .on=${e.climate.isOn || e.dry.active}
                .dry=${e.dry.active}
                .fan=${e.operatingState === "fan"}
                .disabled=${i}
                @power-toggle=${this._togglePower}
              ></power-button>
              ${e.dry.active ? h : p`
                      <fan-mode-button
                        .active=${e.operatingState === "fan"}
                        .disabled=${i}
                        @fan-mode-toggle=${this._toggleFanOnly}
                      ></fan-mode-button>
                    `}
              ${e.dry.active ? p`
                      <boost-button
                        .switchMode=${!0}
                        .active=${!1}
                        .disabled=${i}
                        .remaining=${null}
                        .hasCancel=${!1}
                        @switch-mode=${this._handleSwitchMode}
                      ></boost-button>
                    ` : e.operatingState === "fan" ? h : e.boost.available ? p`
                          <boost-button
                            .switchMode=${!1}
                            .active=${e.boost.active}
                            .disabled=${i}
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
                        ?disabled=${i || e.boost.active}
                        @click=${this._toggleFanAuto}
                      >
                        Auto
                      </button>
                      <fan-slider
                        .options=${n}
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
    const e = this._resolvedConfig(), t = R(this.hass, this._config), n = t.climate.isOn || t.dry.active;
    await this._withPending(() => xi(this.hass, e, !n));
  }
  async _handleTargetChange(e) {
    if (!this.hass || !e.detail) return;
    const t = this._resolvedConfig(), n = R(this.hass, this._config);
    n.dry.active || n.operatingState === "fan" || await this._withPending(async () => {
      n.boost.active && await Mt(this.hass, t), await Si(this.hass, t, e.detail);
    });
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => Ci(this.hass, this._resolvedConfig()));
  }
  async _toggleFanOnly() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = R(this.hass, this._config);
    if (t.dry.active) return;
    const n = t.operatingState !== "fan";
    await this._withPending(async () => {
      n && t.boost.active && await Mt(this.hass, e), await Ai(this.hass, e, n);
    });
  }
  async _handleSwitchMode() {
    this.hass && await this._withPending(() => Ne(this.hass, this._resolvedConfig()));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => Mt(this.hass, this._resolvedConfig()));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = R(this.hass, this._config);
    t.boost.active || await this._withPending(() => Ei(this.hass, e, !t.fan.isAuto));
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || R(this.hass, this._config).boost.active || await this._withPending(
      () => ki(this.hass, this._resolvedConfig(), e.detail.value)
    );
  }
};
G.styles = [At];
St([
  g({ attribute: !1 })
], G.prototype, "hass", 2);
St([
  Y()
], G.prototype, "_config", 2);
St([
  Y()
], G.prototype, "_pending", 2);
G = St([
  H(zt)
], G);
window.customCards = window.customCards ?? [];
const fe = window.customCards.findIndex((e) => e.type === Lt), _e = {
  type: Lt,
  name: we,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: !0,
  documentationURL: hn,
  getEntitySuggestion(e, t) {
    return Tn(e, t) ? {
      config: {
        type: `custom:${Lt}`,
        entity: t
      }
    } : null;
  }
};
fe >= 0 ? window.customCards[fe] = _e : window.customCards.push(_e);
console.info(
  `%c ${we} %c v${un} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
export {
  G as TwoStageThermostatCard
};
//# sourceMappingURL=two-state-thermostat.js.map
