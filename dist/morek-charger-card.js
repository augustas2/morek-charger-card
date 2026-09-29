//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", ee = h.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, b = (e, t) => !l(e, t), x = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = x) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? x;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[v("elementProperties")] = /* @__PURE__ */ new Map(), S[v("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: S }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var C = globalThis, te = (e) => e, w = C.trustedTypes, T = w ? w.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, E = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, O = "?" + D, ne = `<${O}>`, k = document, A = () => k.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", M = Array.isArray, re = (e) => M(e) || typeof e?.[Symbol.iterator] == "function", N = "[ 	\n\f\r]", P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, ae = />/g, F = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), I = /'/g, L = /"/g, oe = /^(?:script|style|textarea|title)$/i, R = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), z = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), se = /* @__PURE__ */ new WeakMap(), V = k.createTreeWalker(k, 129);
function H(e, t) {
	if (!M(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return T === void 0 ? t : T.createHTML(t);
}
var ce = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === P ? c[1] === "!--" ? o = ie : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = F) : (oe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = F) : o = ae : o === F ? c[0] === ">" ? (o = i ?? P, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? F : c[3] === "\"" ? L : I) : o === L || o === I ? o = F : o === ie || o === ae ? o = P : (o = F, i = void 0);
		let d = o === F && e[t + 1].startsWith("/>") ? " " : "";
		a += o === P ? n + ne : l >= 0 ? (r.push(s), n.slice(0, l) + E + n.slice(l) + D + d) : n + D + (l === -2 ? t : d);
	}
	return [H(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, U = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ce(t, n);
		if (this.el = e.createElement(l, r), V.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = V.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(E)) {
					let t = u[o++], n = i.getAttribute(e).split(D), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ue : r[1] === "?" ? de : r[1] === "@" ? fe : K
					}), i.removeAttribute(e);
				} else e.startsWith(D) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (oe.test(i.tagName)) {
					let e = i.textContent.split(D), t = e.length - 1;
					if (t > 0) {
						i.textContent = w ? w.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], A()), V.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], A());
					}
				}
			} else if (i.nodeType === 8) if (i.data === O) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(D, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += D.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = k.createElement("template");
		return n.innerHTML = e, n;
	}
};
function W(e, t, n = e, r) {
	if (t === z) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = j(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, r)), t;
}
var le = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? k).importNode(t, !0);
		V.currentNode = r;
		let i = V.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new G(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = V.nextNode(), a++);
		}
		return V.currentNode = k, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, G = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = W(this, e, t), j(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== z && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? re(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== B && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = U.createElement(H(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new le(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = se.get(e.strings);
		return t === void 0 && se.set(e.strings, t = new U(e)), t;
	}
	k(t) {
		M(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(A()), this.O(A()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = te(e).nextSibling;
			te(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, K = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = B;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = W(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = W(this, r[n + o], t, o), s === z && (s = this._$AH[o]), a ||= !j(s) || s !== this._$AH[o], s === B ? e = B : e !== B && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ue = class extends K {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === B ? void 0 : e;
	}
}, de = class extends K {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== B);
	}
}, fe = class extends K {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = W(this, e, t, 0) ?? B) === z) return;
		let n = this._$AH, r = e === B && n !== B || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== B && (n === B || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		W(this, e);
	}
}, me = C.litHtmlPolyfillSupport;
me?.(U, G), (C.litHtmlVersions ??= []).push("3.3.3");
var he = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new G(t.insertBefore(A(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, q = globalThis, J = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = he(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return z;
	}
};
J._$litElement$ = !0, J.finalized = !0, q.litElementHydrateSupport?.({ LitElement: J });
var ge = q.litElementPolyfillSupport;
ge?.({ LitElement: J }), (q.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var _e = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ve = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	hasChanged: b
}, ye = (e = ve, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function be(e) {
	return (t, n) => typeof n == "object" ? ye(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function xe(e) {
	return be({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Se = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ce = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), we = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Te = "important", Ee = " !important", De = Ce(class extends we {
	constructor(e) {
		if (super(e), e.type !== Se.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(Ee);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Te : "") : n[e] = r;
			}
		}
		return z;
	}
}), Oe = "data:image/png;base64,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", Y = "morek-charger-card", ke = {
	power_entity: "sensor.charger_power_active_import",
	session_time_entity: "sensor.charger_time_session",
	session_energy_entity: "sensor.charger_energy_session",
	charge_control_entity: "switch.charger_charge_control"
}, Ae = /* @__PURE__ */ new Set(["preparing"]), je = /* @__PURE__ */ new Set([
	"charging",
	"suspendedev",
	"suspendedevse",
	"finishing"
]), Me = o`
    :host {
        display: block;
    }

    ha-card {
        overflow: hidden;
        color: var(--primary-text-color);
    }

    .content {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 110px;
        align-items: center;
        width: 100%;
        padding: var(--ha-space-4, 16px);
        text-align: left;
        font: inherit;
    }

    .name {
        font-size: var(--ha-font-size-xl, 22px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .status {
        appearance: none;
        border: 0;
        background: transparent;
        margin-top: var(--ha-space-5, 16px);
        color: var(--morek-color);
        cursor: pointer;
        padding: 0;
        text-align: left;
        font-size: var(--ha-font-size-xl, 16px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .metrics {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--ha-space-4, 12px) var(--ha-space-4, 16px);
        margin-top: var(--ha-space-5, 16px);
    }

    .metric {
        appearance: none;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        display: grid;
        min-width: 0;
        padding: 0;
        text-align: left;
    }

    .metric-label {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-s, 12px);
    }

    .metric-value {
        font-size: var(--ha-font-size-l, 16px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .charger-image {
        width: 110px;
        height: 160px;
        object-fit: contain;
    }

    .actions {
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
        padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    }

    .action-button {
        width: 100%;
        appearance: none;
        border: 0;
        border-radius: var(--ha-border-radius-lg, 12px);
        background: color-mix(in srgb, var(--primary-color) 14%, transparent);
        color: var(--primary-color);
        padding: 12px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font: inherit;
        font-weight: var(--ha-font-weight-medium, 500);
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            background-color 120ms ease;
    }

    .action-button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
    }

    .action-button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .action-button ha-icon {
        --mdc-icon-size: 22px;
    }
`, X = {
	en: {
		common: {
			entity: "Charger status",
			name: "Name",
			power_entity: "Power sensor",
			session_time_entity: "Session time sensor",
			session_energy_entity: "Session energy sensor",
			electricity_cost_entity: "Electricity price sensor",
			charge_control_entity: "Charging control switch"
		},
		card: {
			current_usage: "Current usage",
			session_time: "Session time",
			session_energy: "Session energy",
			session_cost: "Session cost",
			open_current_usage: "Open current usage details",
			open_session_time: "Open session time details",
			open_session_energy: "Open session energy details",
			open_session_cost: "Open electricity price details",
			open_status: "Open charger status details",
			start_charging: "Start charging",
			stop_charging: "Stop charging",
			charger_image: "Morek EV charger",
			hours_short: "h",
			minutes_short: "min"
		},
		states: {
			charging: "Charging",
			available: "Available",
			preparing: "Preparing",
			finishing: "Finishing",
			suspendedev: "Suspended by vehicle",
			suspendedevse: "Suspended by charger",
			faulted: "Faulted",
			unavailable: "Unavailable",
			unknown: "Unknown"
		},
		errors: { entity_required: "A charger status entity is required." }
	},
	lt: {
		common: {
			entity: "Įkroviklio būsenos jutiklis",
			name: "Pavadinimas",
			power_entity: "Galios jutiklis",
			session_time_entity: "Sesijos laiko jutiklis",
			session_energy_entity: "Sesijos energijos jutiklis",
			electricity_cost_entity: "Elektros kainos jutiklis",
			charge_control_entity: "Įkrovimo valdymo jungiklis"
		},
		card: {
			current_usage: "Dabartinė galia",
			session_time: "Sesijos laikas",
			session_energy: "Sesijos energija",
			session_cost: "Sesijos kaina",
			open_current_usage: "Atidaryti dabartinės galios informaciją",
			open_session_time: "Atidaryti sesijos laiko informaciją",
			open_session_energy: "Atidaryti sesijos energijos informaciją",
			open_session_cost: "Atidaryti elektros kainos informaciją",
			open_status: "Atidaryti įkroviklio būsenos informaciją",
			start_charging: "Pradėti įkrovimą",
			stop_charging: "Sustabdyti įkrovimą",
			charger_image: "Morek EV įkroviklis",
			hours_short: "val.",
			minutes_short: "min."
		},
		states: {
			charging: "Įkraunama",
			available: "Neprijungta",
			preparing: "Ruošiamasi",
			finishing: "Baigiama",
			suspendedev: "Įkrovimą pristabdė automobilis",
			suspendedevse: "Įkrovimą pristabdė įkroviklis",
			faulted: "Klaida",
			unavailable: "Neprieinamas",
			unknown: "Nežinoma"
		},
		errors: { entity_required: "Reikia nurodyti įkroviklio būsenos jutiklį." }
	}
}, Ne = "en", Pe = (e) => {
	let t = e?.toLowerCase().split("-")[0];
	return t && t in X ? t : Ne;
}, Fe = (e, t) => {
	let n = t.split(".").reduce((e, t) => {
		if (!(!e || typeof e == "string")) return e[t];
	}, e);
	return typeof n == "string" ? n : void 0;
}, Z = (e, t) => {
	let n = X[Pe(t)];
	return Fe(n, e) ?? Fe(X.en, e) ?? e;
}, Ie = () => document.documentElement.lang || navigator.language || Ne;
//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/morek-charger-card.ts
var Le = (e) => e.toLowerCase() === "charging" ? "var(--success-color, #43a047)" : ["faulted", "unavailable"].includes(e.toLowerCase()) ? "var(--error-color, #db4437)" : "var(--state-inactive-color, #6f7287)", Re = (e, t, n, r) => {
	let i = Number(e);
	return Number.isFinite(i) ? `${new Intl.NumberFormat(r, {
		minimumFractionDigits: t,
		maximumFractionDigits: t
	}).format(i)} ${n}` : "—";
}, ze = (e, t) => {
	let n = Number(e);
	if (!Number.isFinite(n)) return "—";
	let r = Math.floor(n / 60), i = Math.floor(n % 60), a = String(r), o = String(i);
	return r > 0 ? `${a} ${Z("card.hours_short", t)} ${o} ${Z("card.minutes_short", t)}` : `${o} ${Z("card.minutes_short", t)}`;
}, Be = (e, t, n) => {
	let r = Number(e) * Number(t);
	return Number.isFinite(r) ? new Intl.NumberFormat(n, {
		style: "currency",
		currency: "EUR"
	}).format(r) : "—";
}, Ve = (e, t) => {
	let n = `states.${e.toLowerCase().replaceAll(/[^a-z]/g, "")}`, r = Z(n, t);
	return r === n ? e : r;
}, He = (e) => e.trim().toLowerCase(), Ue = (e, t) => {
	let n = He(e);
	return t === "off" && Ae.has(n) || t === "on" && je.has(n);
}, $ = class extends J {
	constructor(...e) {
		super(...e), this.isToggling = !1;
	}
	setConfig(e) {
		if (!e.entity) throw Error(Z("errors.entity_required", Ie()));
		this.config = {
			...ke,
			...e
		};
	}
	getCardSize() {
		return 3;
	}
	static getStubConfig(e) {
		return {
			entity: Object.keys(e.states).find((e) => e === "sensor.charger_status_connector") ?? "",
			...ke
		};
	}
	static getConfigForm() {
		let e = Ie();
		return {
			schema: [
				{
					name: "entity",
					required: !0,
					selector: { entity: { domain: "sensor" } }
				},
				{
					name: "name",
					selector: { text: {} }
				},
				{
					name: "power_entity",
					selector: { entity: { domain: "sensor" } }
				},
				{
					name: "session_time_entity",
					selector: { entity: { domain: "sensor" } }
				},
				{
					name: "session_energy_entity",
					selector: { entity: { domain: "sensor" } }
				},
				{
					name: "electricity_cost_entity",
					selector: { entity: { domain: [
						"input_number",
						"number",
						"sensor"
					] } }
				},
				{
					name: "charge_control_entity",
					selector: { entity: { domain: "switch" } }
				}
			],
			computeLabel: (t) => Z(`common.${t.name}`, e)
		};
	}
	render() {
		let e = this.config?.entity, t = e ? this.hass?.states[e]?.state ?? "Unknown" : "Unknown", n = this.config?.name ?? "Morek EV Charger", r = this.config?.power_entity, i = this.hass?.states[r ?? ""]?.state, a = this.config?.session_time_entity, o = this.hass?.states[a ?? ""]?.state, s = this.config?.session_energy_entity, c = this.hass?.states[s ?? ""]?.state, l = this.config?.electricity_cost_entity, u = this.hass?.states[l ?? ""]?.state, d = this.config?.charge_control_entity, f = this.hass?.states[d ?? ""]?.state, p = f === "on", m = Ue(t, f), h = this.hass?.language, g = Z(p ? "card.stop_charging" : "card.start_charging", h), _ = [
			this.renderMetric(r, "card.current_usage", "card.open_current_usage", Re(i, 2, "kW", h), h),
			this.renderMetric(a, "card.session_time", "card.open_session_time", ze(o, h), h),
			this.renderMetric(s, "card.session_energy", "card.open_session_energy", Re(c, 2, "kWh", h), h),
			this.renderMetric(l, "card.session_cost", "card.open_session_cost", Be(c, u, h), h)
		].filter((e) => e !== null);
		return R`
            <ha-card style=${De({ "--morek-color": Le(t) })}>
                <div class="content">
                    <div>
                        <div class="name">${n}</div>
                        <div
                            class="status"
                            role="button"
                            tabindex="0"
                            aria-label=${Z("card.open_status", h)}
                            @click=${() => this.openMoreInfo(e)}
                            @keydown=${(t) => this.openMoreInfoOnKeydown(t, e)}
                        >
                            ${Ve(t, h)}
                        </div>
                        ${_.length ? R`<div class="metrics">${_}</div>` : null}
                    </div>
                    <img
                        class="charger-image"
                        src=${Oe}
                        alt=${Z("card.charger_image", h)}
                    />
                </div>
                <div class="actions">
                    <button
                        class="action-button"
                        type="button"
                        aria-label=${g}
                        ?disabled=${!m || this.isToggling}
                        @click=${(e) => void this.toggleCharging(e, d, t)}
                    >
                        <ha-icon
                            icon=${p ? "mdi:stop-circle-outline" : "mdi:play-circle-outline"}
                        ></ha-icon
                        >${g}
                    </button>
                </div>
            </ha-card>
        `;
	}
	openMoreInfo(e) {
		e && this.dispatchEvent(new CustomEvent("hass-more-info", {
			bubbles: !0,
			composed: !0,
			detail: { entityId: e }
		}));
	}
	renderMetric(e, t, n, r, i) {
		return e ? R`
            <div
                class="metric"
                role="button"
                tabindex="0"
                aria-label=${Z(n, i)}
                @click=${() => this.openMoreInfo(e)}
                @keydown=${(t) => this.openMoreInfoOnKeydown(t, e)}
            >
                <span class="metric-label">${Z(t, i)}</span
                ><span class="metric-value">${r}</span>
            </div>
        ` : null;
	}
	openMoreInfoOnKeydown(e, t) {
		e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.openMoreInfo(t));
	}
	async toggleCharging(e, t, n) {
		if (e.stopPropagation(), !this.hass || !t) return;
		let r = this.hass.states[t]?.state;
		if (Ue(n, r)) {
			this.pendingChargeControlState = r, this.isToggling = !0;
			try {
				await this.hass.callService("switch", "toggle", { entity_id: t });
			} catch (e) {
				throw this.isToggling = !1, this.pendingChargeControlState = void 0, e;
			}
		}
	}
	updated(e) {
		!e.has("hass") || !this.isToggling || this.hass?.states[this.config?.charge_control_entity ?? ""]?.state !== this.pendingChargeControlState && (this.isToggling = !1, this.pendingChargeControlState = void 0);
	}
	static {
		this.styles = Me;
	}
};
Q([be({ attribute: !1 })], $.prototype, "hass", void 0), Q([xe()], $.prototype, "config", void 0), Q([xe()], $.prototype, "isToggling", void 0), $ = Q([_e(Y)], $), window.customCards = window.customCards ?? [], window.customCards.push({
	type: Y,
	name: "Morek Charger Card",
	preview: !0,
	description: "Morek EV charger status, live power, session duration, and charging control.",
	documentationURL: "https://github.com/augustas2/morek-charger-card",
	getEntitySuggestion: (e, t) => t === "sensor.charger_status_connector" ? { config: {
		type: `custom:${Y}`,
		entity: t
	} } : null
});
//#endregion
export { $ as MorekChargerCard };
