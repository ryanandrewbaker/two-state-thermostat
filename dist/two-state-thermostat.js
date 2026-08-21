const at = globalThis, St = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = /* @__PURE__ */ Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let oe = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (St && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Ft.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ft.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const we = (e) => new oe(typeof e == "string" ? e : e + "", void 0, Et), I = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new oe(n, e, Et);
}, Ae = (e, t) => {
  if (St) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = at.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, It = St ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return we(n);
})(e) : e;
const { is: xe, defineProperty: Se, getOwnPropertyDescriptor: Ee, getOwnPropertyNames: Ce, getOwnPropertySymbols: ke, getPrototypeOf: Pe } = Object, dt = globalThis, zt = dt.trustedTypes, Te = zt ? zt.emptyScript : "", Oe = dt.reactiveElementPolyfillSupport, X = (e, t) => e, lt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Te : null;
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
} }, Ct = (e, t) => !xe(e, t), jt = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: Ct };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = jt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Se(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: r } = Ee(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties"))) return;
    const t = Pe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const n = this.properties, i = [...Ce(n), ...ke(n)];
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
      for (const o of i) n.unshift(It(o));
    } else t !== void 0 && n.push(It(t));
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
    return Ae(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : lt).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : lt;
      this._$Em = o;
      const a = s.fromAttribute(n, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), i ??= s.getPropertyOptions(t), !((i.hasChanged ?? Ct)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[X("elementProperties")] = /* @__PURE__ */ new Map(), D[X("finalized")] = /* @__PURE__ */ new Map(), Oe?.({ ReactiveElement: D }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const kt = globalThis, Vt = (e) => e, ct = kt.trustedTypes, qt = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, se = "?" + A, Me = `<${se}>`, P = document, Z = () => P.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", Pt = Array.isArray, Le = (e) => Pt(e) || typeof e?.[Symbol.iterator] == "function", vt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Kt = /-->/g, Wt = />/g, E = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Xt = /"/g, ae = /^(?:script|style|textarea|title)$/i, le = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), _ = le(1), bt = le(2), U = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), k = P.createTreeWalker(P, 129);
function ce(e, t) {
  if (!Pt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qt !== void 0 ? qt.createHTML(t) : t;
}
const Ne = (e, t) => {
  const n = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = q;
  for (let a = 0; a < n; a++) {
    const l = e[a];
    let c, u, d = -1, h = 0;
    for (; h < l.length && (s.lastIndex = h, u = s.exec(l), u !== null); ) h = s.lastIndex, s === q ? u[1] === "!--" ? s = Kt : u[1] !== void 0 ? s = Wt : u[2] !== void 0 ? (ae.test(u[2]) && (o = RegExp("</" + u[2], "g")), s = E) : u[3] !== void 0 && (s = E) : s === E ? u[0] === ">" ? (s = o ?? q, d = -1) : u[1] === void 0 ? d = -2 : (d = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? E : u[3] === '"' ? Xt : Gt) : s === Xt || s === Gt ? s = E : s === Kt || s === Wt ? s = q : (s = E, o = void 0);
    const f = s === E && e[a + 1].startsWith("/>") ? " " : "";
    r += s === q ? l + Me : d >= 0 ? (i.push(c), l.slice(0, d) + re + l.slice(d) + A + f) : l + A + (d === -2 ? a : f);
  }
  return [ce(e, r + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Q {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, u] = Ne(t, n);
    if (this.el = Q.createElement(c, i), k.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = k.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(re)) {
          const h = u[s++], f = o.getAttribute(d).split(A), b = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: r, name: b[2], strings: f, ctor: b[1] === "." ? He : b[1] === "?" ? Ue : b[1] === "@" ? Be : ut }), o.removeAttribute(d);
        } else d.startsWith(A) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ae.test(o.tagName)) {
          const d = o.textContent.split(A), h = d.length - 1;
          if (h > 0) {
            o.textContent = ct ? ct.emptyScript : "";
            for (let f = 0; f < h; f++) o.append(d[f], Z()), k.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[h], Z());
          }
        }
      } else if (o.nodeType === 8) if (o.data === se) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(A, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += A.length - 1;
      }
      r++;
    }
  }
  static createElement(t, n) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(e, t, n = e, i) {
  if (t === U) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = J(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = B(e, o._$AS(e, t.values), o, i)), t;
}
class De {
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
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? P).importNode(n, !0);
    k.currentNode = o;
    let r = k.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new et(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Re(r, this, t)), this._$AV.push(c), l = i[++a];
      }
      s !== l?.index && (r = k.nextNode(), s++);
    }
    return k.currentNode = P, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class et {
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
    t = B(this, t, n), J(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Le(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Q.createElement(ce(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const r = new De(o, this), s = r.u(this.options);
      r.p(n), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = Yt.get(t.strings);
    return n === void 0 && Yt.set(t.strings, n = new Q(t)), n;
  }
  k(t) {
    Pt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const r of t) o === n.length ? n.push(i = new et(this.O(Z()), this.O(Z()), this, this.options)) : i = n[o], i._$AI(r), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = Vt(t).nextSibling;
      Vt(t).remove(), t = i;
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
  constructor(t, n, i, o, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, n = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = B(this, t, n, 0), s = !J(t) || t !== this._$AH && t !== U, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = B(this, a[i + l], n, l), c === U && (c = this._$AH[l]), s ||= !J(c) || c !== this._$AH[l], c === p ? t = p : t !== p && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class He extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ue extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Be extends ut {
  constructor(t, n, i, o, r) {
    super(t, n, i, o, r), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = B(this, t, n, 0) ?? p) === U) return;
    const i = this._$AH, o = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Re {
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
const Fe = kt.litHtmlPolyfillSupport;
Fe?.(Q, et), (kt.litHtmlVersions ??= []).push("3.3.3");
const Ie = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = o = new et(t.insertBefore(Z(), r), r, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const Tt = globalThis;
class $ extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ie(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return U;
  }
}
$._$litElement$ = !0, $.finalized = !0, Tt.litElementHydrateSupport?.({ LitElement: $ });
const ze = Tt.litElementPolyfillSupport;
ze?.({ LitElement: $ });
(Tt.litElementVersions ??= []).push("4.2.2");
const z = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const je = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: Ct }, Ve = (e = je, t, n) => {
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
function g(e) {
  return (t, n) => typeof n == "object" ? Ve(e, t, n) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, n);
}
function j(e) {
  return g({ ...e, state: !0, attribute: !1 });
}
const wt = "two-state-thermostat", Ot = "two-state-thermostat", de = "Two State Thermostat", qe = "0.4.0", Ke = "https://github.com/ryanandrewbaker/two-state-thermostat", Mt = "heat_cool", Lt = 0.5, Nt = 2, We = 5, Ge = 35, ue = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
], Xe = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  unknown: "Unknown"
}, Ye = "auto", Ze = [
  "climate",
  "input_boolean",
  "input_select",
  "script"
], Je = ["climate.set_fan_mode"], x = 135, H = 405, he = H - x;
function nt(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function Qe(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
const tn = ["_auto_climate", "_climate"], en = {
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
}, nn = {
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
}, rt = {
  power_on_mode: "power_on_mode",
  fan_options: "fan_options",
  target_step: "target_step",
  minimum_target_separation: "minimum_target_separation"
};
function Zt(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "" ? n : void 0;
}
function Jt(e, t) {
  const n = e[t];
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n == "string" && n.trim() !== "") {
    const i = Number(n);
    return Number.isFinite(i) ? i : void 0;
  }
}
function on(e, t) {
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
function ht(e) {
  return e.entity?.trim() || e.climate_entity?.trim() || void 0;
}
function rn(e) {
  const t = e.split(".");
  if (t.length !== 2 || t[0] !== "climate") return null;
  const n = t[1];
  for (const i of tn)
    if (n.endsWith(i))
      return n.slice(0, -i.length);
  return n;
}
function pe(e, t) {
  if (!e) return {};
  const n = rn(t);
  if (!n) return {};
  const i = {};
  for (const [o, r] of Object.entries(en)) {
    const s = r(n);
    e.states[s] && (i[o] = s);
  }
  return i;
}
function _e(e, t) {
  const n = nt(e, t);
  if (!n) return {};
  const i = n.attributes, o = {};
  for (const [r, s] of Object.entries(
    nn
  )) {
    const a = Zt(i, s);
    a && (o[r] = a);
  }
  return {
    ...o,
    power_on_mode: Zt(
      i,
      rt.power_on_mode
    ),
    fan_options: on(
      i,
      rt.fan_options
    ),
    target_step: Jt(
      i,
      rt.target_step
    ),
    minimum_target_separation: Jt(
      i,
      rt.minimum_target_separation
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
function sn(e, t) {
  if (e !== void 0) return e;
  if (t !== void 0) return t;
}
function pt(e, t) {
  const n = ht(t) ?? "", i = n ? _e(e, n) : {}, o = n ? pe(e, n) : {}, r = {
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
      Mt
    ),
    fan_options: sn(t.fan_options, i.fan_options),
    target_step: yt(
      t.target_step,
      i.target_step,
      Lt
    ),
    minimum_target_separation: yt(
      t.minimum_target_separation,
      i.minimum_target_separation,
      Nt
    ),
    show_countdown: t.show_countdown ?? !0,
    show_recommended_fan: t.show_recommended_fan ?? !0,
    show_effective_targets: t.show_effective_targets ?? !1,
    state_map: t.state_map,
    usesHvacActionFallback: !1
  };
  return r.usesHvacActionFallback = !r.operating_state_entity, r;
}
function an(e, t, n) {
  if (t.name?.trim()) return t.name.trim();
  const i = n ? nt(e, n) : void 0;
  return i && e?.formatEntityName ? e.formatEntityName(i) : i && typeof i.attributes.friendly_name == "string" ? i.attributes.friendly_name : n ?? "Two State Thermostat";
}
function ln(e, t) {
  const n = nt(e, t);
  return n ? n.attributes.target_temp_low !== void 0 && n.attributes.target_temp_high !== void 0 : !1;
}
function cn(e, t) {
  const n = _e(e, t);
  if (n.operating_state_entity && e?.states[n.operating_state_entity])
    return !0;
  const i = pe(e, t);
  return !!(i.operating_state_entity && e?.states[i.operating_state_entity]);
}
function dn(e, t) {
  if (!t.startsWith("climate.")) return !1;
  const n = nt(e, t);
  return n ? n.attributes.two_state_thermostat === !0 ? !0 : ln(e, t) && cn(e, t) : !1;
}
function un(e, t) {
  const n = e[t];
  return typeof n == "string" && n.trim() !== "";
}
function hn(e, t) {
  if (!t) return "missing";
  const n = nt(e, t);
  return n ? Qe(n) ? "found" : "unavailable" : "missing";
}
function pn(e, t) {
  const n = pt(e, t);
  return ht(t) ? [
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
    const l = n[r], c = hn(e, l), u = un(t, r);
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
function Qt(e) {
  return e.fan_options?.length ? e.fan_options : ue;
}
var _n = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, _t = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? fn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && _n(t, n, o), o;
};
let R = class extends $ {
  constructor() {
    super(...arguments), this._advancedOpen = !1;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  render() {
    if (!this._config) return _``;
    const e = ht(this._config), t = e ? pn(this.hass, this._config) : [];
    return _`
      <div class="editor">
        ${e ? p : _`
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

        ${e && t.length ? _`
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
                .value=${this._config.power_on_mode ?? Mt}
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
                .value=${String(this._config.target_step ?? Lt)}
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
      this._config.minimum_target_separation ?? Nt
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
    return e.status === "fallback" ? _`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message}</div>
          </div>
        </div>
      ` : e.status === "unavailable" ? _`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${e.label}</div>
            <div class="discovery-detail">${e.message ?? e.entityId}</div>
          </div>
        </div>
      ` : e.status === "found" || e.status === "override" ? _`
        <div class="discovery-item">
          <span class="discovery-icon found">✓</span>
          <div>
            <div>${e.label}</div>
            ${e.status === "override" ? _`<div class="discovery-detail">Manual override</div>` : p}
          </div>
        </div>
      ` : e.optional ? p : _`
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
    return _`
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
    return _`
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
    return (this._config.fan_options ?? ue).map((t) => `${t.value}:${t.label}`).join(`
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
R.styles = I`
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
  g({ attribute: !1 })
], R.prototype, "hass", 2);
_t([
  j()
], R.prototype, "_config", 2);
_t([
  j()
], R.prototype, "_advancedOpen", 2);
R = _t([
  z(`${Ot}-editor`)
], R);
const Dt = I`
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
`, gn = I`
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
    fill: #ffffff;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.45));
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
`, mn = I`
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
var vn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, it = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? bn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && vn(t, n, o), o;
};
let T = class extends $ {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.hasCancel = !1, this.remaining = null;
  }
  render() {
    if (this.active) {
      const e = this.remaining ?? "Boost", t = this.remaining ? `Boost remaining ${this.remaining}. Click to extend.` : "Extend boost";
      return _`
        <button
          class="boost-button active boost-extend"
          type="button"
          ?disabled=${this.disabled}
          aria-label=${t}
          @click=${this._handleClick}
        >
          <span aria-live="polite">${e}</span>
        </button>
        ${this.hasCancel ? _`
                <button
                  class="boost-cancel"
                  type="button"
                  ?disabled=${this.disabled}
                  aria-label="Cancel boost"
                  @click=${this._handleCancelClick}
                >
                  ×
                </button>
              ` : p}
      `;
    }
    return _`
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
  _handleCancelClick(e) {
    e.preventDefault(), e.stopPropagation(), this.dispatchEvent(
      new CustomEvent("boost-cancel", { bubbles: !0, composed: !0 })
    );
  }
};
T.styles = [
  Dt,
  I`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
    `
];
it([
  g({ type: Boolean })
], T.prototype, "active", 2);
it([
  g({ type: Boolean })
], T.prototype, "disabled", 2);
it([
  g({ type: Boolean })
], T.prototype, "hasCancel", 2);
it([
  g({ type: String })
], T.prototype, "remaining", 2);
T = it([
  z("boost-button")
], T);
function yn(e) {
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
function $n(e, t) {
  return t?.[e] ?? Xe[e];
}
function W(e) {
  return e ? e.state !== "unavailable" && e.state !== "unknown" : !1;
}
function v(e, t) {
  if (!(!e || !t))
    return e.states[t];
}
function w(e) {
  if (typeof e == "number" && Number.isFinite(e)) return e;
  if (typeof e == "string" && e.trim() !== "") {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function Ht(e) {
  return e.toString().includes(".") ? e.toString().split(".")[1]?.length ?? 0 : 0;
}
function C(e, t) {
  const n = Ht(t), i = Math.round(e / t) * t;
  return Number(i.toFixed(n));
}
function At(e, t) {
  const n = Ht(t), i = Math.ceil(e / t - Number.EPSILON) * t;
  return Number(i.toFixed(n));
}
function xt(e, t) {
  const n = Ht(t), i = Math.floor(e / t + Number.EPSILON) * t;
  return Number(i.toFixed(n));
}
function G(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
function te(e, t, n, i, o, r) {
  let s = G(e, n, i), a = G(t, n, i);
  return a - s < r && (a = At(s + r, o), a > i && (a = C(i, o), s = xt(a - r, o), s = Math.max(n, s))), {
    targetLow: G(s, n, i),
    targetHigh: G(a, n, i)
  };
}
function wn(e) {
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
function An(e) {
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
  return "usesHvacActionFallback" in e ? Qt(e) : e.fan_options?.length ? e.fan_options : Qt(pt(void 0, e));
}
function st(e, t) {
  return t ? e.find(
    (i) => i.value.toLowerCase() === t.toLowerCase()
  )?.label ?? t : "—";
}
function xn(e) {
  if (!e || !W(e) || e.state === "idle" || e.state === "paused")
    return null;
  const t = e.attributes.finishes_at;
  if (typeof t != "string")
    return e.state === "active" ? "Active" : null;
  const i = new Date(t).getTime() - Date.now();
  if (i <= 0) return "0:00";
  const o = Math.ceil(i / 1e3), r = Math.floor(o / 60), s = o % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function fe(e) {
  const t = [];
  ht(e) || t.push("Missing required configuration: entity");
  const i = ft(e);
  new Set(i.map((a) => a.value.toLowerCase())).size !== i.length && t.push("fan_options contains duplicate values");
  const r = !!e.fan_auto_entity, s = !!e.fan_override_entity;
  return r !== s && (r || s) && t.push(
    "fan_auto_entity and fan_override_entity must both be configured together"
  ), t;
}
function Sn(e, t) {
  const n = [], i = [];
  if (!e) return { errors: n, warnings: i };
  const o = v(e, t.entity);
  if (!o)
    n.push(`Climate entity not found: ${t.entity}`);
  else if (!W(o))
    n.push(`Climate entity unavailable: ${t.entity}`);
  else {
    const a = w(o.attributes.target_temp_low), l = w(o.attributes.target_temp_high);
    (a === null || l === null) && n.push("Climate entity does not expose target_temp_low/high");
  }
  if (t.usesHvacActionFallback)
    i.push(
      "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead"
    );
  else {
    const a = v(e, t.operating_state_entity);
    a ? W(a) || n.push(
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
    const c = v(e, a);
    c && !W(c) && i.push(`${l} references an unavailable entity: ${a}`);
  }
  const s = ft(t);
  if (t.fan_override_entity) {
    const a = v(e, t.fan_override_entity);
    if (a && W(a)) {
      const l = a.attributes.options;
      if (Array.isArray(l))
        for (const c of s)
          l.some(
            (u) => String(u).toLowerCase() === c.value.toLowerCase()
          ) || i.push(`Unsupported fan option in override entity: ${c.value}`);
    }
  }
  return { errors: n, warnings: i };
}
function En(e, t) {
  const n = v(e, t.entity), i = v(e, t.temperature_entity), o = w(i?.state), r = w(n?.attributes.current_temperature), s = o ?? r, a = w(n?.attributes.target_temp_low), l = w(n?.attributes.target_temp_high), c = w(n?.attributes.min_temp) ?? We, u = w(n?.attributes.max_temp) ?? Ge, d = t.target_step ?? w(n?.attributes.target_temp_step) ?? Lt, h = typeof n?.attributes.hvac_mode == "string" ? n.attributes.hvac_mode : n?.state ?? null;
  return {
    current: s,
    targetLow: a,
    targetHigh: l,
    minTemp: c,
    maxTemp: u,
    step: d,
    hvacMode: h,
    isOn: h !== null && h !== "off"
  };
}
function ge(e, t, n, i) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const { minTemp: o, maxTemp: r, step: s } = e, a = G(C(n, s), o, r);
  if (t === "low") {
    let h = a;
    const f = C(e.targetHigh, s), b = At(h + i, s);
    let m = Math.max(f, b);
    return m > r && (m = C(r, s), h = xt(m - i, s), h = Math.max(o, h)), te(
      h,
      m,
      o,
      r,
      s,
      i
    );
  }
  let l = a;
  const c = C(e.targetLow, s), u = xt(l - i, s);
  let d = Math.min(c, u);
  return d < o && (d = C(o, s), l = At(d + i, s), l = Math.min(r, l)), te(
    d,
    l,
    o,
    r,
    s,
    i
  );
}
function Cn(e, t, n, i) {
  if (e.targetLow === null || e.targetHigh === null) return null;
  const o = t === "low" ? e.targetLow + n : e.targetHigh + n;
  return ge(e, t, o, i);
}
function kn(e, t) {
  const n = ft(t), i = v(e, t.fan_auto_entity), o = v(e, t.fan_override_entity), r = v(e, t.effective_fan_entity), s = v(e, t.recommended_fan_entity), a = !!(t.fan_auto_entity && t.fan_override_entity), l = !!(!a && t.fan_override_entity);
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
  const c = me(e, t).active;
  if (a) {
    const m = i?.state === "on", L = o?.state ?? null, N = r?.state ?? s?.state ?? L, Bt = s?.state ?? null, mt = m ? N ?? Bt : L ?? N, ye = m ? `Auto · ${st(n, mt)}` : `Manual · ${st(n, mt)}`, Rt = Math.max(
      0,
      n.findIndex(
        ($e) => $e.value.toLowerCase() === String(mt).toLowerCase()
      )
    );
    return {
      available: !0,
      isAuto: m,
      manualValue: L,
      effectiveValue: N,
      recommendedValue: Bt,
      displayLabel: ye,
      sliderIndex: Rt === -1 ? 0 : Rt,
      readOnly: m || c,
      usesSimplifiedModel: !1
    };
  }
  const u = o?.state ?? null, d = u?.toLowerCase() === Ye || u?.toLowerCase() === "automatic", h = d ? r?.state ?? s?.state ?? n[0]?.value ?? null : u, f = d ? `Auto · ${st(n, h)}` : `Manual · ${st(n, h)}`, b = Math.max(
    0,
    n.findIndex(
      (m) => m.value.toLowerCase() === String(h).toLowerCase()
    )
  );
  return {
    available: !0,
    isAuto: d,
    manualValue: u,
    effectiveValue: r?.state ?? null,
    recommendedValue: s?.state ?? null,
    displayLabel: f,
    sliderIndex: b === -1 ? 0 : b,
    readOnly: d || c,
    usesSimplifiedModel: !0
  };
}
function me(e, t) {
  const n = !!t.boost_script_entity, i = v(e, t.boost_active_entity), o = v(e, t.boost_timer_entity), r = i?.state === "on" || o?.state === "active";
  return {
    available: n,
    active: r,
    remaining: t.show_countdown === !1 ? null : xn(o),
    hasCancel: !!t.boost_cancel_script_entity
  };
}
function K(e, t) {
  const n = pt(e, t), i = fe(n), o = Sn(e, n);
  let r, s;
  if (n.usesHvacActionFallback) {
    const a = v(e, n.entity), l = typeof a?.attributes.hvac_action == "string" ? a.attributes.hvac_action : void 0;
    r = wn(l), s = An(l);
  } else {
    const a = v(e, n.operating_state_entity);
    r = yn(a?.state), s = $n(r, n.state_map);
  }
  return {
    title: an(e, t, n.entity),
    operatingState: r,
    operatingLabel: s,
    climate: En(e, n),
    fan: kn(e, n),
    boost: me(e, n),
    errors: [...i, ...o.errors],
    warnings: o.warnings
  };
}
function $t(e, t, n) {
  const i = (e - t) / (n - t), o = Math.max(0, Math.min(1, i));
  return x + o * he;
}
function ve(e) {
  let t = e;
  for (; t < x; ) t += 360;
  for (; t > H; ) t -= 360;
  if (t >= x && t <= H)
    return t;
  const n = (e % 360 + 360) % 360, i = Math.abs(n - x), o = Math.abs(n - (H - 360));
  return i <= o ? x : H;
}
function Pn(e, t, n) {
  const o = (ve(e) - x) / he;
  return t + o * (n - t);
}
function Tn(e, t, n, i) {
  if (n.targetLow === null || n.targetHigh === null) return null;
  const o = Pn(e, n.minTemp, n.maxTemp), r = C(o, n.step);
  return ge(n, t, r, i);
}
function On(e) {
  return {
    currentAngle: e.current === null ? null : $t(e.current, e.minTemp, e.maxTemp),
    lowAngle: e.targetLow === null ? null : $t(e.targetLow, e.minTemp, e.maxTemp),
    highAngle: e.targetHigh === null ? null : $t(e.targetHigh, e.minTemp, e.maxTemp),
    startAngle: x,
    endAngle: H
  };
}
function Mn(e) {
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
function Ln(e) {
  return e === "boost_heating" || e === "maintain_heating";
}
function Nn(e) {
  return e === "boost_cooling" || e === "maintain_cooling";
}
function Dn(e, t, n = null) {
  const { startAngle: i, endAngle: o, currentAngle: r, lowAngle: s, highAngle: a } = e;
  let l = null, c = null, u = null, d = null;
  const h = r !== null && s !== null && r < s && (Ln(t) || n === "low");
  s !== null && (h ? (l = { start: i, end: r }, c = { start: r, end: s }) : l = { start: i, end: s });
  const f = r !== null && a !== null && r > a && (Nn(t) || n === "high");
  return a !== null && (f ? (d = { start: a, end: r }, u = { start: r, end: o }) : u = { start: a, end: o }), { heatBase: l, heatRemaining: c, coolBase: u, coolRemaining: d };
}
function Hn(e) {
  return e.power_on_mode ?? Mt;
}
function Un(e) {
  return e.minimum_target_separation ?? Nt;
}
function Bn(e) {
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
var Rn = Object.defineProperty, Fn = Object.getOwnPropertyDescriptor, V = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Fn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Rn(t, n, o), o;
};
function Y(e, t, n, i) {
  const o = i * Math.PI / 180;
  return {
    x: e + n * Math.cos(o),
    y: t + n * Math.sin(o)
  };
}
function ee(e, t, n, i, o) {
  const r = Y(e, t, n, i), s = Y(e, t, n, o), a = o - i > 180 ? 1 : 0;
  return `M ${r.x} ${r.y} A ${n} ${n} 0 ${a} 1 ${s.x} ${s.y}`;
}
function In(e, t, n) {
  const i = e.getBoundingClientRect(), o = (t - i.left) / i.width * 200, r = (n - i.top) / i.height * 200, s = Math.atan2(r - 100, o - 100) * 180 / Math.PI;
  return ve(s);
}
let S = class extends $ {
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
    const e = Bn(this.viewState.operatingState);
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
    return On(this.displayClimate);
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
    const { climate: e, operatingLabel: t, operatingState: n } = this.viewState, i = this.displayClimate, o = this.arcState, r = this.geometry, s = Dn(r, n, this._dragTarget), a = Mn(n), l = 100, c = 100, u = 78, d = ee(l, c, u, r.startAngle, r.endAngle), h = this.splitTemp(e.current), f = r.lowAngle !== null ? Y(l, c, u, r.lowAngle) : null, b = r.highAngle !== null ? Y(l, c, u, r.highAngle) : null, m = r.currentAngle !== null ? Y(l, c, u, r.currentAngle) : null, L = i.targetLow, N = i.targetHigh;
    return _`
      <div class="dial-wrap ${o.subdued ? "subdued" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${d}></path>
          ${this._renderArcSegment(l, c, u, s.heatBase, "heat", "base", o)}
          ${this._renderArcSegment(
      l,
      c,
      u,
      s.heatRemaining,
      "heat",
      "remaining",
      o
    )}
          ${this._renderArcSegment(l, c, u, s.coolBase, "cool", "base", o)}
          ${this._renderArcSegment(
      l,
      c,
      u,
      s.coolRemaining,
      "cool",
      "remaining",
      o
    )}
          ${this._renderKnob("low", f, L, "Heating target")}
          ${this._renderKnob("high", b, N, "Cooling target")}
          ${m ? bt`
                  <circle
                    class="current-dot"
                    cx=${m.x}
                    cy=${m.y}
                    r="5.5"
                  ></circle>
                ` : null}
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
            <span class="temp-int">${h.int}</span>
            ${h.dec ? _`<span class="temp-dec">${h.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          <div class="range">
            <span class="range-heat ${a === "heat" ? "active" : ""}"
              >${this.formatTemp(L)}</span
            >
            ·
            <span class="range-cool ${a === "cool" ? "active" : ""}"
              >${this.formatTemp(N)}</span
            >
          </div>
        </div>
      </div>
    `;
  }
  _renderArcSegment(e, t, n, i, o, r, s) {
    if (!i) return null;
    const a = ee(e, t, n, i.start, i.end), l = o === "heat", c = l ? s.warmActive : s.coolActive, u = r === "remaining" && (l ? s.warmStrong : s.coolStrong);
    return bt`<path
      class="arc-${o} ${r} ${c ? "active" : ""} ${u ? "strong" : ""}"
      d=${a}
    ></path>`;
  }
  _renderKnob(e, t, n, i) {
    if (!t || n === null) return p;
    const o = this._dragTarget === e, r = e === "low" ? "knob knob-heat" : "knob knob-cool";
    return bt`
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
    const o = Cn(n, t, i, this.minimumTargetSeparation);
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
    const i = In(n, e.clientX, e.clientY), o = Tn(
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
S.styles = [
  gn,
  I`
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
V([
  g({ attribute: !1 })
], S.prototype, "viewState", 2);
V([
  g({ type: Number })
], S.prototype, "minimumTargetSeparation", 2);
V([
  g({ type: Boolean })
], S.prototype, "disabled", 2);
V([
  j()
], S.prototype, "_dragTarget", 2);
V([
  j()
], S.prototype, "_preview", 2);
S = V([
  z("climate-dial")
], S);
var zn = Object.defineProperty, jn = Object.getOwnPropertyDescriptor, ot = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? jn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && zn(t, n, o), o;
};
let O = class extends $ {
  constructor() {
    super(...arguments), this.options = [], this.index = 0, this.readOnly = !1, this.isAuto = !1;
  }
  render() {
    const e = this.options.length > 1 ? this.index / (this.options.length - 1) * 100 : 0;
    return _`
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
      (t, n) => _`
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
O.styles = [mn];
ot([
  g({ attribute: !1 })
], O.prototype, "options", 2);
ot([
  g({ type: Number })
], O.prototype, "index", 2);
ot([
  g({ type: Boolean })
], O.prototype, "readOnly", 2);
ot([
  g({ type: Boolean })
], O.prototype, "isAuto", 2);
O = ot([
  z("fan-slider")
], O);
var Vn = Object.defineProperty, qn = Object.getOwnPropertyDescriptor, Ut = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qn(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Vn(t, n, o), o;
};
let tt = class extends $ {
  constructor() {
    super(...arguments), this.on = !1, this.disabled = !1;
  }
  render() {
    return _`
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
tt.styles = [Dt];
Ut([
  g({ type: Boolean })
], tt.prototype, "on", 2);
Ut([
  g({ type: Boolean })
], tt.prototype, "disabled", 2);
tt = Ut([
  z("power-button")
], tt);
function Kn(e, t) {
  const n = `${e}.${t}`;
  if (Je.includes(n))
    throw new Error(`Forbidden service call: ${n}`);
  if (!Ze.includes(e))
    throw new Error(`Service domain not allowed: ${e}`);
}
function Wn(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: Hn(e)
    }
  };
}
function Gn(e) {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: e.climate_entity,
      hvac_mode: "off"
    }
  };
}
function Xn(e, t) {
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
function Yn(e) {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function Zn(e) {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: e.fan_auto_entity
    }
  };
}
function be(e, t) {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: e.fan_override_entity,
      option: t
    }
  };
}
function Jn(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_script_entity
    }
  };
}
function Qn(e) {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: e.boost_cancel_script_entity
    }
  };
}
async function M(e, t) {
  Kn(t.domain, t.service), await e.callService(t.domain, t.service, t.data);
}
async function ti(e, t, n) {
  await M(e, n ? Wn(t) : Gn(t));
}
async function ei(e, t, n) {
  await M(e, Xn(t, n));
}
async function ni(e, t, n) {
  if (t.fan_auto_entity) {
    await M(
      e,
      n ? Yn(t) : Zn(t)
    );
    return;
  }
  t.fan_override_entity && await M(e, be(t, n ? "auto" : "low"));
}
async function ii(e, t, n) {
  await M(e, be(t, n));
}
async function oi(e, t) {
  await M(e, Jn(t));
}
async function ri(e, t) {
  t.boost_cancel_script_entity && await M(e, Qn(t));
}
var si = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, gt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ai(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && si(t, n, o), o;
};
let F = class extends $ {
  constructor() {
    super(...arguments), this._pending = !1;
  }
  setConfig(e) {
    const t = fe(e);
    if (!!(e.entity?.trim() || e.climate_entity?.trim()) && t.length)
      throw new Error(t.join("; "));
    this._config = e;
  }
  static getConfigElement() {
    return document.createElement(`${Ot}-editor`);
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
    return pt(this.hass, this._config);
  }
  render() {
    if (!this._config) return _``;
    const e = K(this.hass, this._config), t = this._resolvedConfig(), n = ft(t), i = this._pending || e.errors.length > 0;
    return e.errors.length ? _`
        <ha-card>
          <div class="card">
            <div class="error">${e.errors.join(" ")}</div>
          </div>
        </ha-card>
      ` : _`
      <ha-card>
        <div class="card">
          <div class="title">${e.title}</div>

          <div class="dial-section">
            <climate-dial
              .viewState=${e}
              .disabled=${i || e.boost.active}
              .minimumTargetSeparation=${Un(t)}
              @target-change=${this._handleTargetChange}
            ></climate-dial>
            <div class="dial-controls">
              <power-button
                .on=${e.climate.isOn}
                .disabled=${i}
                @power-toggle=${this._togglePower}
              ></power-button>
              ${e.boost.available ? _`
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

          ${e.fan.available ? _`
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
                      ${t.show_recommended_fan !== !1 && e.fan.recommendedValue ? _`
                              <span
                                class="fan-rec"
                                title="Recommended fan speed: ${e.fan.recommendedValue}"
                              >
                                Rec: ${e.fan.recommendedValue}
                              </span>
                            ` : p}
                    </div>
                  </div>
                ` : p}
          ${e.warnings.length ? _`<div class="warning">${e.warnings.join(" ")}</div>` : p}
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
    const e = this._resolvedConfig(), t = K(this.hass, this._config);
    await this._withPending(() => ti(this.hass, e, !t.climate.isOn));
  }
  async _handleTargetChange(e) {
    !this.hass || !e.detail || K(this.hass, this._config).boost.active || await this._withPending(
      () => ei(this.hass, this._resolvedConfig(), e.detail)
    );
  }
  async _handleBoost() {
    this.hass && await this._withPending(() => oi(this.hass, this._resolvedConfig()));
  }
  async _handleBoostCancel() {
    this.hass && await this._withPending(() => ri(this.hass, this._resolvedConfig()));
  }
  async _toggleFanAuto() {
    if (!this.hass) return;
    const e = this._resolvedConfig(), t = K(this.hass, this._config);
    t.boost.active || await this._withPending(() => ni(this.hass, e, !t.fan.isAuto));
  }
  async _handleFanSelect(e) {
    !this.hass || !e.detail?.value || K(this.hass, this._config).boost.active || await this._withPending(
      () => ii(this.hass, this._resolvedConfig(), e.detail.value)
    );
  }
};
F.styles = [Dt];
gt([
  g({ attribute: !1 })
], F.prototype, "hass", 2);
gt([
  j()
], F.prototype, "_config", 2);
gt([
  j()
], F.prototype, "_pending", 2);
F = gt([
  z(Ot)
], F);
window.customCards = window.customCards ?? [];
const ne = window.customCards.findIndex((e) => e.type === wt), ie = {
  type: wt,
  name: de,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: !0,
  documentationURL: Ke,
  getEntitySuggestion(e, t) {
    return dn(e, t) ? {
      config: {
        type: `custom:${wt}`,
        entity: t
      }
    } : null;
  }
};
ne >= 0 ? window.customCards[ne] = ie : window.customCards.push(ie);
console.info(
  `%c ${de} %c v${qe} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
export {
  F as TwoStageThermostatCard
};
//# sourceMappingURL=two-state-thermostat.js.map
