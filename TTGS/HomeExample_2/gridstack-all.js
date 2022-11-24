
/*! For license information please see gridstack-all.js.LICENSE.txt */ ! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.GridStack = t() : e.GridStack = t()
}(self, (function() {
    return (() => {
        "use strict";
        var e = {
                427: (e, t) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDBaseImplement = void 0, t.DDBaseImplement = class {
                        constructor() {
                            this._eventRegister = {}
                        }
                        get disabled() {
                            return this._disabled
                        }
                        on(e, t) {
                            this._eventRegister[e] = t
                        }
                        off(e) {
                            delete this._eventRegister[e]
                        }
                        enable() {
                            this._disabled = !1
                        }
                        disable() {
                            this._disabled = !0
                        }
                        destroy() {
                            delete this._eventRegister
                        }
                        triggerEvent(e, t) {
                            if (!this.disabled && this._eventRegister && this._eventRegister[e]) return this._eventRegister[e](t)
                        }
                    }
                },
                186: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDDraggable = void 0;
                    const s = i(939),
                        o = i(593),
                        n = i(427),
                        r = i(635);
                    class l extends n.DDBaseImplement {
                        constructor(e, t = {}) {
                            super(), this.el = e, this.option = t;
                            let i = t.handle.substring(1);
                            this.dragEl = e.classList.contains(i) ? e : e.querySelector(t.handle) || e, this._mouseDown = this._mouseDown.bind(this), this._mouseMove = this._mouseMove.bind(this), this._mouseUp = this._mouseUp.bind(this), this.enable()
                        }
                        on(e, t) {
                            super.on(e, t)
                        }
                        off(e) {
                            super.off(e)
                        }
                        enable() {
                            !1 !== this.disabled && (super.enable(), this.dragEl.addEventListener("mousedown", this._mouseDown), r.isTouch && (this.dragEl.addEventListener("touchstart", r.touchstart), this.dragEl.addEventListener("pointerdown", r.pointerdown)), this.el.classList.remove("ui-draggable-disabled"), this.el.classList.add("ui-draggable"))
                        }
                        disable(e = !1) {
                            !0 !== this.disabled && (super.disable(), this.dragEl.removeEventListener("mousedown", this._mouseDown), r.isTouch && (this.dragEl.removeEventListener("touchstart", r.touchstart), this.dragEl.removeEventListener("pointerdown", r.pointerdown)), this.el.classList.remove("ui-draggable"), e || this.el.classList.add("ui-draggable-disabled"))
                        }
                        destroy() {
                            this.dragTimeout && window.clearTimeout(this.dragTimeout), delete this.dragTimeout, this.dragging && this._mouseUp(this.mouseDownEvent), this.disable(!0), delete this.el, delete this.helper, delete this.option, super.destroy()
                        }
                        updateOption(e) {
                            return Object.keys(e).forEach((t => this.option[t] = e[t])), this
                        }
                        _mouseDown(e) {
                            if (s.DDManager.mouseHandled) return;
                            if (0 !== e.button) return !0;
                            const t = e.target.nodeName.toLowerCase();
                            return ["input", "textarea", "button", "select", "option"].find((e => e === t)) || e.target.closest('[contenteditable="true"]') || (this.mouseDownEvent = e, delete this.dragging, delete s.DDManager.dragElement, delete s.DDManager.dropElement, document.addEventListener("mousemove", this._mouseMove, !0), document.addEventListener("mouseup", this._mouseUp, !0), r.isTouch && (this.dragEl.addEventListener("touchmove", r.touchmove), this.dragEl.addEventListener("touchend", r.touchend)), e.preventDefault(), document.activeElement && document.activeElement.blur(), s.DDManager.mouseHandled = !0), !0
                        }
                        _callDrag(e) {
                            if (!this.dragging) return;
                            const t = o.Utils.initEvent(e, {
                                target: this.el,
                                type: "drag"
                            });
                            this.option.drag && this.option.drag(t, this.ui()), this.triggerEvent("drag", t)
                        }
                        _mouseMove(e) {
                            var t;
                            let i = this.mouseDownEvent;
                            if (this.dragging)
                                if (this._dragFollow(e), s.DDManager.pauseDrag) {
                                    const t = Number.isInteger(s.DDManager.pauseDrag) ? s.DDManager.pauseDrag : 100;
                                    this.dragTimeout && window.clearTimeout(this.dragTimeout), this.dragTimeout = window.setTimeout((() => this._callDrag(e)), t)
                                } else this._callDrag(e);
                            else if (Math.abs(e.x - i.x) + Math.abs(e.y - i.y) > 3) {
                                this.dragging = !0, s.DDManager.dragElement = this;
                                let i = null === (t = this.el.gridstackNode) || void 0 === t ? void 0 : t.grid;
                                i ? s.DDManager.dropElement = i.el.ddElement.ddDroppable : delete s.DDManager.dropElement, this.helper = this._createHelper(e), this._setupHelperContainmentStyle(), this.dragOffset = this._getDragOffset(e, this.el, this.helperContainment);
                                const n = o.Utils.initEvent(e, {
                                    target: this.el,
                                    type: "dragstart"
                                });
                                this._setupHelperStyle(e), this.option.start && this.option.start(n, this.ui()), this.triggerEvent("dragstart", n)
                            }
                            return e.preventDefault(), !0
                        }
                        _mouseUp(e) {
                            var t;
                            if (document.removeEventListener("mousemove", this._mouseMove, !0), document.removeEventListener("mouseup", this._mouseUp, !0), r.isTouch && (this.dragEl.removeEventListener("touchmove", r.touchmove, !0), this.dragEl.removeEventListener("touchend", r.touchend, !0)), this.dragging) {
                                delete this.dragging, (null === (t = s.DDManager.dropElement) || void 0 === t ? void 0 : t.el) === this.el.parentElement && delete s.DDManager.dropElement, this.helperContainment.style.position = this.parentOriginStylePosition || null, this.helper === this.el ? this._removeHelperStyle() : this.helper.remove();
                                const i = o.Utils.initEvent(e, {
                                    target: this.el,
                                    type: "dragstop"
                                });
                                this.option.stop && this.option.stop(i), this.triggerEvent("dragstop", i), s.DDManager.dropElement && s.DDManager.dropElement.drop(e)
                            }
                            delete this.helper, delete this.mouseDownEvent, delete s.DDManager.dragElement, delete s.DDManager.dropElement, delete s.DDManager.mouseHandled, e.preventDefault()
                        }
                        _createHelper(e) {
                            let t = this.el;
                            return "function" == typeof this.option.helper ? t = this.option.helper(e) : "clone" === this.option.helper && (t = o.Utils.cloneNode(this.el)), document.body.contains(t) || o.Utils.appendTo(t, "parent" === this.option.appendTo ? this.el.parentNode : this.option.appendTo), t === this.el && (this.dragElementOriginStyle = l.originStyleProp.map((e => this.el.style[e]))), t
                        }
                        _setupHelperStyle(e) {
                            this.helper.classList.add("ui-draggable-dragging");
                            const t = this.helper.style;
                            return t.pointerEvents = "none", t["min-width"] = 0, t.width = this.dragOffset.width + "px", t.height = this.dragOffset.height + "px", t.willChange = "left, top", t.position = "fixed", this._dragFollow(e), t.transition = "none", setTimeout((() => {
                                this.helper && (t.transition = null)
                            }), 0), this
                        }
                        _removeHelperStyle() {
                            var e;
                            this.helper.classList.remove("ui-draggable-dragging");
                            let t = null === (e = this.helper) || void 0 === e ? void 0 : e.gridstackNode;
                            if (this.dragElementOriginStyle && (!t || !t._isAboutToRemove)) {
                                let e = this.helper,
                                    t = this.dragElementOriginStyle.transition || null;
                                e.style.transition = this.dragElementOriginStyle.transition = "none", l.originStyleProp.forEach((t => e.style[t] = this.dragElementOriginStyle[t] || null)), setTimeout((() => e.style.transition = t), 50)
                            }
                            return delete this.dragElementOriginStyle, this
                        }
                        _dragFollow(e) {
                            const t = this.helper.style,
                                i = this.dragOffset;
                            t.left = e.clientX + i.offsetLeft - 0 + "px", t.top = e.clientY + i.offsetTop - 0 + "px"
                        }
                        _setupHelperContainmentStyle() {
                            return this.helperContainment = this.helper.parentElement, "fixed" !== this.helper.style.position && (this.parentOriginStylePosition = this.helperContainment.style.position, window.getComputedStyle(this.helperContainment).position.match(/static/) && (this.helperContainment.style.position = "relative")), this
                        }
                        _getDragOffset(e, t, i) {
                            let s = 0,
                                n = 0;
                            if (i) {
                                const e = document.createElement("div");
                                o.Utils.addElStyles(e, {
                                    opacity: "0",
                                    position: "fixed",
                                    top: "0px",
                                    left: "0px",
                                    width: "1px",
                                    height: "1px",
                                    zIndex: "-999999"
                                }), i.appendChild(e);
                                const t = e.getBoundingClientRect();
                                i.removeChild(e), s = t.left, n = t.top
                            }
                            const r = t.getBoundingClientRect();
                            return {
                                left: r.left,
                                top: r.top,
                                offsetLeft: -e.clientX + r.left - s,
                                offsetTop: -e.clientY + r.top - n,
                                width: r.width,
                                height: r.height
                            }
                        }
                        ui() {
                            const e = this.el.parentElement.getBoundingClientRect(),
                                t = this.helper.getBoundingClientRect();
                            return {
                                position: {
                                    top: t.top - e.top,
                                    left: t.left - e.left
                                }
                            }
                        }
                    }
                    t.DDDraggable = l, l.originStyleProp = ["transition", "pointerEvents", "position", "left", "top"]
                },
                225: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDDroppable = void 0;
                    const s = i(939),
                        o = i(427),
                        n = i(593),
                        r = i(635);
                    class l extends o.DDBaseImplement {
                        constructor(e, t = {}) {
                            super(), this.el = e, this.option = t, this._mouseEnter = this._mouseEnter.bind(this), this._mouseLeave = this._mouseLeave.bind(this), this.enable(), this._setupAccept()
                        }
                        on(e, t) {
                            super.on(e, t)
                        }
                        off(e) {
                            super.off(e)
                        }
                        enable() {
                            !1 !== this.disabled && (super.enable(), this.el.classList.add("ui-droppable"), this.el.classList.remove("ui-droppable-disabled"), this.el.addEventListener("mouseenter", this._mouseEnter), this.el.addEventListener("mouseleave", this._mouseLeave), r.isTouch && (this.el.addEventListener("pointerenter", r.pointerenter), this.el.addEventListener("pointerleave", r.pointerleave)))
                        }
                        disable(e = !1) {
                            !0 !== this.disabled && (super.disable(), this.el.classList.remove("ui-droppable"), e || this.el.classList.add("ui-droppable-disabled"), this.el.removeEventListener("mouseenter", this._mouseEnter), this.el.removeEventListener("mouseleave", this._mouseLeave), r.isTouch && (this.el.removeEventListener("pointerenter", r.pointerenter), this.el.removeEventListener("pointerleave", r.pointerleave)))
                        }
                        destroy() {
                            this.disable(!0), this.el.classList.remove("ui-droppable"), this.el.classList.remove("ui-droppable-disabled"), super.destroy()
                        }
                        updateOption(e) {
                            return Object.keys(e).forEach((t => this.option[t] = e[t])), this._setupAccept(), this
                        }
                        _mouseEnter(e) {
                            if (!s.DDManager.dragElement) return;
                            if (!this._canDrop(s.DDManager.dragElement.el)) return;
                            e.preventDefault(), e.stopPropagation(), s.DDManager.dropElement && s.DDManager.dropElement !== this && s.DDManager.dropElement._mouseLeave(e), s.DDManager.dropElement = this;
                            const t = n.Utils.initEvent(e, {
                                target: this.el,
                                type: "dropover"
                            });
                            this.option.over && this.option.over(t, this._ui(s.DDManager.dragElement)), this.triggerEvent("dropover", t), this.el.classList.add("ui-droppable-over")
                        }
                        _mouseLeave(e) {
                            var t;
                            if (!s.DDManager.dragElement || s.DDManager.dropElement !== this) return;
                            e.preventDefault(), e.stopPropagation();
                            const i = n.Utils.initEvent(e, {
                                target: this.el,
                                type: "dropout"
                            });
                            if (this.option.out && this.option.out(i, this._ui(s.DDManager.dragElement)), this.triggerEvent("dropout", i), s.DDManager.dropElement === this) {
                                let i;
                                delete s.DDManager.dropElement;
                                let o = this.el.parentElement;
                                for (; !i && o;) i = null === (t = o.ddElement) || void 0 === t ? void 0 : t.ddDroppable, o = o.parentElement;
                                i && i._mouseEnter(e)
                            }
                        }
                        drop(e) {
                            e.preventDefault();
                            const t = n.Utils.initEvent(e, {
                                target: this.el,
                                type: "drop"
                            });
                            this.option.drop && this.option.drop(t, this._ui(s.DDManager.dragElement)), this.triggerEvent("drop", t)
                        }
                        _canDrop(e) {
                            return e && (!this.accept || this.accept(e))
                        }
                        _setupAccept() {
                            return this.option.accept ? ("string" == typeof this.option.accept ? this.accept = e => e.matches(this.option.accept) : this.accept = this.option.accept, this) : this
                        }
                        _ui(e) {
                            return Object.assign({
                                draggable: e.el
                            }, e.ui())
                        }
                    }
                    t.DDDroppable = l
                },
                320: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDElement = void 0;
                    const s = i(204),
                        o = i(186),
                        n = i(225);
                    class r {
                        constructor(e) {
                            this.el = e
                        }
                        static init(e) {
                            return e.ddElement || (e.ddElement = new r(e)), e.ddElement
                        }
                        on(e, t) {
                            return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(e) > -1 ? this.ddDraggable.on(e, t) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(e) > -1 ? this.ddDroppable.on(e, t) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(e) > -1 && this.ddResizable.on(e, t), this
                        }
                        off(e) {
                            return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(e) > -1 ? this.ddDraggable.off(e) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(e) > -1 ? this.ddDroppable.off(e) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(e) > -1 && this.ddResizable.off(e), this
                        }
                        setupDraggable(e) {
                            return this.ddDraggable ? this.ddDraggable.updateOption(e) : this.ddDraggable = new o.DDDraggable(this.el, e), this
                        }
                        cleanDraggable() {
                            return this.ddDraggable && (this.ddDraggable.destroy(), delete this.ddDraggable), this
                        }
                        setupResizable(e) {
                            return this.ddResizable ? this.ddResizable.updateOption(e) : this.ddResizable = new s.DDResizable(this.el, e), this
                        }
                        cleanResizable() {
                            return this.ddResizable && (this.ddResizable.destroy(), delete this.ddResizable), this
                        }
                        setupDroppable(e) {
                            return this.ddDroppable ? this.ddDroppable.updateOption(e) : this.ddDroppable = new n.DDDroppable(this.el, e), this
                        }
                        cleanDroppable() {
                            return this.ddDroppable && (this.ddDroppable.destroy(), delete this.ddDroppable), this
                        }
                    }
                    t.DDElement = r
                },
                958: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDGridStack = void 0;
                    const s = i(699),
                        o = i(270),
                        n = i(593),
                        r = i(939),
                        l = i(320);
                    class a {
                        static get() {
                            return h
                        }
                        resizable(e, t, i, s) {
                            return this._getDDElements(e).forEach((e => {
                                if ("disable" === t || "enable" === t) e.ddResizable && e.ddResizable[t]();
                                else if ("destroy" === t) e.ddResizable && e.cleanResizable();
                                else if ("option" === t) e.setupResizable({
                                    [i]: s
                                });
                                else {
                                    const i = e.el.gridstackNode.grid;
                                    let s = e.el.getAttribute("gs-resize-handles") ? e.el.getAttribute("gs-resize-handles") : i.opts.resizable.handles,
                                        o = !i.opts.alwaysShowResizeHandle;
                                    e.setupResizable(Object.assign(Object.assign(Object.assign({}, i.opts.resizable), {
                                        handles: s,
                                        autoHide: o
                                    }), {
                                        start: t.start,
                                        stop: t.stop,
                                        resize: t.resize
                                    }))
                                }
                            })), this
                        }
                        draggable(e, t, i, s) {
                            return this._getDDElements(e).forEach((e => {
                                if ("disable" === t || "enable" === t) e.ddDraggable && e.ddDraggable[t]();
                                else if ("destroy" === t) e.ddDraggable && e.cleanDraggable();
                                else if ("option" === t) e.setupDraggable({
                                    [i]: s
                                });
                                else {
                                    const i = e.el.gridstackNode.grid;
                                    e.setupDraggable(Object.assign(Object.assign({}, i.opts.draggable), {
                                        start: t.start,
                                        stop: t.stop,
                                        drag: t.drag
                                    }))
                                }
                            })), this
                        }
                        dragIn(e, t) {
                            return this._getDDElements(e).forEach((e => e.setupDraggable(t))), this
                        }
                        droppable(e, t, i, s) {
                            return "function" != typeof t.accept || t._accept || (t._accept = t.accept, t.accept = e => t._accept(e)), this._getDDElements(e).forEach((e => {
                                "disable" === t || "enable" === t ? e.ddDroppable && e.ddDroppable[t]() : "destroy" === t ? e.ddDroppable && e.cleanDroppable() : "option" === t ? e.setupDroppable({
                                    [i]: s
                                }) : e.setupDroppable(t)
                            })), this
                        }
                        isDroppable(e) {
                            return !(!(e && e.ddElement && e.ddElement.ddDroppable) || e.ddElement.ddDroppable.disabled)
                        }
                        isDraggable(e) {
                            return !(!(e && e.ddElement && e.ddElement.ddDraggable) || e.ddElement.ddDraggable.disabled)
                        }
                        isResizable(e) {
                            return !(!(e && e.ddElement && e.ddElement.ddResizable) || e.ddElement.ddResizable.disabled)
                        }
                        on(e, t, i) {
                            return this._getDDElements(e).forEach((e => e.on(t, (e => {
                                i(e, r.DDManager.dragElement ? r.DDManager.dragElement.el : e.target, r.DDManager.dragElement ? r.DDManager.dragElement.helper : null)
                            })))), this
                        }
                        off(e, t) {
                            return this._getDDElements(e).forEach((e => e.off(t))), this
                        }
                        _getDDElements(e, t = !0) {
                            let i = n.Utils.getElements(e);
                            if (!i.length) return [];
                            let s = i.map((e => e.ddElement || (t ? l.DDElement.init(e) : null)));
                            return t || s.filter((e => e)), s
                        }
                    }
                    t.DDGridStack = a;
                    const h = new a;
                    function d(e, t) {
                        let i = e ? e.gridstackNode : void 0;
                        i && i.grid && (t ? i._isAboutToRemove = !0 : delete i._isAboutToRemove, t ? e.classList.add("grid-stack-item-removing") : e.classList.remove("grid-stack-item-removing"))
                    }
                    o.GridStack.prototype._setupAcceptWidget = function() {
                        if (this.opts.staticGrid || !this.opts.acceptWidgets && !this.opts.removable) return h.droppable(this.el, "destroy"), this;
                        let e, t, i = (i, s, o) => {
                            let r = s.gridstackNode;
                            if (!r) return;
                            o = o || s;
                            let l = this.el.getBoundingClientRect(),
                                {
                                    top: a,
                                    left: d
                                } = o.getBoundingClientRect();
                            d -= l.left, a -= l.top;
                            let g = {
                                position: {
                                    top: a,
                                    left: d
                                }
                            };
                            if (r._temporaryRemoved) {
                                if (r.x = Math.max(0, Math.round(d / t)), r.y = Math.max(0, Math.round(a / e)), delete r.autoPosition, this.engine.nodeBoundFix(r), !this.engine.willItFit(r)) {
                                    if (r.autoPosition = !0, !this.engine.willItFit(r)) return void h.off(s, "drag");
                                    r._willFitPos && (n.Utils.copyPos(r, r._willFitPos), delete r._willFitPos)
                                }
                                this._onStartMoving(o, i, g, r, t, e)
                            } else this._dragOrResize(o, i, g, r, t, e)
                        };
                        return h.droppable(this.el, {
                            accept: e => {
                                let t = e.gridstackNode;
                                if ((null == t ? void 0 : t.grid) === this) return !0;
                                if (!this.opts.acceptWidgets) return !1;
                                let i = !0;
                                if ("function" == typeof this.opts.acceptWidgets) i = this.opts.acceptWidgets(e);
                                else {
                                    let t = !0 === this.opts.acceptWidgets ? ".grid-stack-item" : this.opts.acceptWidgets;
                                    i = e.matches(t)
                                }
                                if (i && t && this.opts.maxRow) {
                                    let e = {
                                        w: t.w,
                                        h: t.h,
                                        minW: t.minW,
                                        minH: t.minH
                                    };
                                    i = this.engine.willItFit(e)
                                }
                                return i
                            }
                        }).on(this.el, "dropover", ((s, o, n) => {
                            let r = o.gridstackNode;
                            if ((null == r ? void 0 : r.grid) === this && !r._temporaryRemoved) return !1;
                            (null == r ? void 0 : r.grid) && r.grid !== this && !r._temporaryRemoved && r.grid._leave(o, n), t = this.cellWidth(), e = this.getCellHeight(!0), r || (r = this._readAttr(o)), r.grid || (r._isExternal = !0, o.gridstackNode = r), n = n || o;
                            let l = r.w || Math.round(n.offsetWidth / t) || 1,
                                a = r.h || Math.round(n.offsetHeight / e) || 1;
                            return r.grid && r.grid !== this ? (o._gridstackNodeOrig || (o._gridstackNodeOrig = r), o.gridstackNode = r = Object.assign(Object.assign({}, r), {
                                w: l,
                                h: a,
                                grid: this
                            }), this.engine.cleanupNode(r).nodeBoundFix(r), r._initDD = r._isExternal = r._temporaryRemoved = !0) : (r.w = l, r.h = a, r._temporaryRemoved = !0), d(r.el, !1), h.on(o, "drag", i), i(s, o, n), !1
                        })).on(this.el, "dropout", ((e, t, i) => {
                            let s = t.gridstackNode;
                            return !!s && (s.grid && s.grid !== this || (this._leave(t, i), this._isTemp && this.removeAsSubGrid(s)), !1)
                        })).on(this.el, "drop", ((e, t, i) => {
                            var s, o;
                            let r = t.gridstackNode;
                            if ((null == r ? void 0 : r.grid) === this && !r._isExternal) return !1;
                            let l = !!this.placeholder.parentElement;
                            this.placeholder.remove();
                            let a = t._gridstackNodeOrig;
                            if (delete t._gridstackNodeOrig, l && (null == a ? void 0 : a.grid) && a.grid !== this) {
                                let e = a.grid;
                                e.engine.removedNodes.push(a), e._triggerRemoveEvent(), e.parentGridItem && !e.engine.nodes.length && e.opts.subGridDynamic && e.removeAsSubGrid()
                            }
                            if (!r) return !1;
                            if (l && (this.engine.cleanupNode(r), r.grid = this), h.off(t, "drag"), i !== t ? (i.remove(), t.gridstackNode = a, l && (t = t.cloneNode(!0))) : (t.remove(), this._removeDD(t)), !l) return !1;
                            t.gridstackNode = r, r.el = t;
                            let d = null === (o = null === (s = r.subGrid) || void 0 === s ? void 0 : s.el) || void 0 === o ? void 0 : o.gridstack;
                            return n.Utils.copyPos(r, this._readAttr(this.placeholder)), n.Utils.removePositioningStyles(t), this._writeAttr(t, r), this.el.appendChild(t), d && (d.parentGridItem = r, d.opts.styleInHead || d._updateStyles(!0)), this._updateContainerHeight(), this.engine.addedNodes.push(r), this._triggerAddEvent(), this._triggerChangeEvent(), this.engine.endUpdate(), this._gsEventHandler.dropped && this._gsEventHandler.dropped(Object.assign(Object.assign({}, e), {
                                type: "dropped"
                            }), a && a.grid ? a : void 0, r), window.setTimeout((() => {
                                r.el && r.el.parentElement ? this._prepareDragDropByNode(r) : this.engine.removeNode(r), delete r.grid._isTemp
                            })), !1
                        })), this
                    }, o.GridStack.prototype._setupRemoveDrop = function() {
                        if (!this.opts.staticGrid && "string" == typeof this.opts.removable) {
                            let e = document.querySelector(this.opts.removable);
                            if (!e) return this;
                            h.isDroppable(e) || h.droppable(e, this.opts.removableOptions).on(e, "dropover", ((e, t) => d(t, !0))).on(e, "dropout", ((e, t) => d(t, !1)))
                        }
                        return this
                    }, o.GridStack.setupDragIn = function(e, t) {
                        void 0 !== (null == t ? void 0 : t.pause) && (r.DDManager.pauseDrag = t.pause), "string" == typeof e && (t = Object.assign(Object.assign({}, s.dragInDefaultOptions), t || {}), n.Utils.getElements(e).forEach((e => {
                            h.isDraggable(e) || h.dragIn(e, t)
                        })))
                    }, o.GridStack.prototype._prepareDragDropByNode = function(e) {
                        let t = e.el;
                        const i = e.noMove || this.opts.disableDrag,
                            s = e.noResize || this.opts.disableResize;
                        if (this.opts.staticGrid || i && s) return e._initDD && (this._removeDD(t), delete e._initDD), t.classList.add("ui-draggable-disabled", "ui-resizable-disabled"), this;
                        if (!e._initDD) {
                            let i, s, o = (o, n) => {
                                    this._gsEventHandler[o.type] && this._gsEventHandler[o.type](o, o.target), i = this.cellWidth(), s = this.getCellHeight(!0), this._onStartMoving(t, o, n, e, i, s)
                                },
                                r = (o, n) => {
                                    this._dragOrResize(t, o, n, e, i, s)
                                },
                                l = i => {
                                    this.placeholder.remove(), delete e._moving, delete e._event, delete e._lastTried;
                                    let s = i.target;
                                    if (s.gridstackNode && s.gridstackNode.grid === this) {
                                        if (e.el = s, e._isAboutToRemove) {
                                            let o = t.gridstackNode.grid;
                                            o._gsEventHandler[i.type] && o._gsEventHandler[i.type](i, s), this._removeDD(t), o.engine.removedNodes.push(e), o._triggerRemoveEvent(), delete t.gridstackNode, delete e.el, t.remove()
                                        } else n.Utils.removePositioningStyles(s), e._temporaryRemoved ? (n.Utils.copyPos(e, e._orig), this._writePosAttr(s, e), this.engine.addNode(e)) : this._writePosAttr(s, e), this._gsEventHandler[i.type] && this._gsEventHandler[i.type](i, s);
                                        this._extraDragRow = 0, this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()
                                    }
                                };
                            h.draggable(t, {
                                start: o,
                                stop: l,
                                drag: r
                            }).resizable(t, {
                                start: o,
                                stop: l,
                                resize: r
                            }), e._initDD = !0
                        }
                        return h.draggable(t, i ? "disable" : "enable").resizable(t, s ? "disable" : "enable"), this
                    }, o.GridStack.prototype._onStartMoving = function(e, t, i, s, o, n) {
                        this.engine.cleanNodes().beginUpdate(s), this._writePosAttr(this.placeholder, s), this.el.appendChild(this.placeholder), s.el = this.placeholder, s._lastUiPosition = i.position, s._prevYPix = i.position.top, s._moving = "dragstart" === t.type, delete s._lastTried, "dropover" === t.type && s._temporaryRemoved && (this.engine.addNode(s), s._moving = !0), this.engine.cacheRects(o, n, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft), "resizestart" === t.type && (h.resizable(e, "option", "minWidth", o * (s.minW || 1)).resizable(e, "option", "minHeight", n * (s.minH || 1)), s.maxW && h.resizable(e, "option", "maxWidth", o * s.maxW), s.maxH && h.resizable(e, "option", "maxHeight", n * s.maxH))
                    }, o.GridStack.prototype._leave = function(e, t) {
                        let i = e.gridstackNode;
                        i && (h.off(e, "drag"), i._temporaryRemoved || (i._temporaryRemoved = !0, this.engine.removeNode(i), i.el = i._isExternal && t ? t : e, !0 === this.opts.removable && d(e, !0), e._gridstackNodeOrig ? (e.gridstackNode = e._gridstackNodeOrig, delete e._gridstackNodeOrig) : i._isExternal && (delete i.el, delete e.gridstackNode, this.engine.restoreInitial())))
                    }, o.GridStack.prototype._dragOrResize = function(e, t, i, s, o, r) {
                        let l, a = Object.assign({}, s._orig),
                            h = this.opts.marginLeft,
                            d = this.opts.marginRight,
                            g = this.opts.marginTop,
                            p = this.opts.marginBottom,
                            u = Math.round(.1 * r),
                            c = Math.round(.1 * o);
                        if (h = Math.min(h, c), d = Math.min(d, c), g = Math.min(g, u), p = Math.min(p, u), "drag" === t.type) {
                            if (s._temporaryRemoved) return;
                            let t = i.position.top - s._prevYPix;
                            s._prevYPix = i.position.top, n.Utils.updateScrollPosition(e, i.position, t);
                            let l = i.position.left + (i.position.left > s._lastUiPosition.left ? -d : h),
                                u = i.position.top + (i.position.top > s._lastUiPosition.top ? -p : g);
                            a.x = Math.round(l / o), a.y = Math.round(u / r);
                            let c = this._extraDragRow;
                            if (this.engine.collide(s, a)) {
                                let e = this.getRow(),
                                    t = Math.max(0, a.y + s.h - e);
                                this.opts.maxRow && e + t > this.opts.maxRow && (t = Math.max(0, this.opts.maxRow - e)), this._extraDragRow = t
                            } else this._extraDragRow = 0;
                            if (this._extraDragRow !== c && this._updateContainerHeight(), s.x === a.x && s.y === a.y) return
                        } else if ("resize" === t.type) {
                            if (a.x < 0) return;
                            if (n.Utils.updateScrollResize(t, e, r), a.w = Math.round((i.size.width - h) / o), a.h = Math.round((i.size.height - g) / r), s.w === a.w && s.h === a.h) return;
                            if (s._lastTried && s._lastTried.w === a.w && s._lastTried.h === a.h) return;
                            let d = i.position.left + h,
                                p = i.position.top + g;
                            a.x = Math.round(d / o), a.y = Math.round(p / r), l = !0
                        }
                        s._event = t, s._lastTried = a;
                        let m = {
                            x: i.position.left + h,
                            y: i.position.top + g,
                            w: (i.size ? i.size.width : s.w * o) - h - d,
                            h: (i.size ? i.size.height : s.h * r) - g - p
                        };
                        if (this.engine.moveNodeCheck(s, Object.assign(Object.assign({}, a), {
                                cellWidth: o,
                                cellHeight: r,
                                rect: m,
                                resizing: l
                            }))) {
                            s._lastUiPosition = i.position, this.engine.cacheRects(o, r, g, d, p, h), delete s._skipDown, l && s.subGrid && s.subGrid.onParentResize(), this._extraDragRow = 0, this._updateContainerHeight();
                            let e = t.target;
                            this._writePosAttr(e, s), this._gsEventHandler[t.type] && this._gsEventHandler[t.type](t, e)
                        }
                    }, o.GridStack.prototype.movable = function(e, t) {
                        return this.opts.staticGrid || o.GridStack.getElements(e).forEach((e => {
                            let i = e.gridstackNode;
                            i && (t ? delete i.noMove : i.noMove = !0, this._prepareDragDropByNode(i))
                        })), this
                    }, o.GridStack.prototype.resizable = function(e, t) {
                        return this.opts.staticGrid || o.GridStack.getElements(e).forEach((e => {
                            let i = e.gridstackNode;
                            i && (t ? delete i.noResize : i.noResize = !0, this._prepareDragDropByNode(i))
                        })), this
                    }, o.GridStack.prototype.disable = function() {
                        if (!this.opts.staticGrid) return this.enableMove(!1), this.enableResize(!1), this._triggerEvent("disable"), this
                    }, o.GridStack.prototype.enable = function() {
                        if (!this.opts.staticGrid) return this.enableMove(!0), this.enableResize(!0), this._triggerEvent("enable"), this
                    }, o.GridStack.prototype.enableMove = function(e) {
                        return this.opts.staticGrid || (this.opts.disableDrag = !e, this.engine.nodes.forEach((t => this.movable(t.el, e)))), this
                    }, o.GridStack.prototype.enableResize = function(e) {
                        return this.opts.staticGrid || (this.opts.disableResize = !e, this.engine.nodes.forEach((t => this.resizable(t.el, e)))), this
                    }, o.GridStack.prototype._removeDD = function(e) {
                        return h.draggable(e, "destroy").resizable(e, "destroy"), e.gridstackNode && delete e.gridstackNode._initDD, delete e.ddElement, this
                    }
                },
                939: (e, t) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDManager = void 0, t.DDManager = class {}
                },
                41: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDResizableHandle = void 0;
                    const s = i(635);
                    class o {
                        constructor(e, t, i) {
                            this.moving = !1, this.host = e, this.dir = t, this.option = i, this._mouseDown = this._mouseDown.bind(this), this._mouseMove = this._mouseMove.bind(this), this._mouseUp = this._mouseUp.bind(this), this._init()
                        }
                        _init() {
                            const e = document.createElement("div");
                            return e.classList.add("ui-resizable-handle"), e.classList.add(`${o.prefix}${this.dir}`), e.style.zIndex = "100", e.style.userSelect = "none", this.el = e, this.host.appendChild(this.el), this.el.addEventListener("mousedown", this._mouseDown), s.isTouch && (this.el.addEventListener("touchstart", s.touchstart), this.el.addEventListener("pointerdown", s.pointerdown)), this
                        }
                        destroy() {
                            return this.moving && this._mouseUp(this.mouseDownEvent), this.el.removeEventListener("mousedown", this._mouseDown), s.isTouch && (this.el.removeEventListener("touchstart", s.touchstart), this.el.removeEventListener("pointerdown", s.pointerdown)), this.host.removeChild(this.el), delete this.el, delete this.host, this
                        }
                        _mouseDown(e) {
                            this.mouseDownEvent = e, document.addEventListener("mousemove", this._mouseMove, !0), document.addEventListener("mouseup", this._mouseUp, !0), s.isTouch && (this.el.addEventListener("touchmove", s.touchmove), this.el.addEventListener("touchend", s.touchend)), e.stopPropagation(), e.preventDefault()
                        }
                        _mouseMove(e) {
                            let t = this.mouseDownEvent;
                            this.moving ? this._triggerEvent("move", e) : Math.abs(e.x - t.x) + Math.abs(e.y - t.y) > 2 && (this.moving = !0, this._triggerEvent("start", this.mouseDownEvent), this._triggerEvent("move", e)), e.stopPropagation(), e.preventDefault()
                        }
                        _mouseUp(e) {
                            this.moving && this._triggerEvent("stop", e), document.removeEventListener("mousemove", this._mouseMove, !0), document.removeEventListener("mouseup", this._mouseUp, !0), s.isTouch && (this.el.removeEventListener("touchmove", s.touchmove), this.el.removeEventListener("touchend", s.touchend)), delete this.moving, delete this.mouseDownEvent, e.stopPropagation(), e.preventDefault()
                        }
                        _triggerEvent(e, t) {
                            return this.option[e] && this.option[e](t), this
                        }
                    }
                    t.DDResizableHandle = o, o.prefix = "ui-resizable-"
                },
                204: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.DDResizable = void 0;
                    const s = i(41),
                        o = i(427),
                        n = i(593),
                        r = i(939);
                    class l extends o.DDBaseImplement {
                        constructor(e, t = {}) {
                            super(), this._ui = () => {
                                const e = this.el.parentElement.getBoundingClientRect(),
                                    t = {
                                        width: this.originalRect.width,
                                        height: this.originalRect.height + this.scrolled,
                                        left: this.originalRect.left,
                                        top: this.originalRect.top - this.scrolled
                                    },
                                    i = this.temporalRect || t;
                                return {
                                    position: {
                                        left: i.left - e.left,
                                        top: i.top - e.top
                                    },
                                    size: {
                                        width: i.width,
                                        height: i.height
                                    }
                                }
                            }, this.el = e, this.option = t, this._mouseOver = this._mouseOver.bind(this), this._mouseOut = this._mouseOut.bind(this), this.enable(), this._setupAutoHide(this.option.autoHide), this._setupHandlers()
                        }
                        on(e, t) {
                            super.on(e, t)
                        }
                        off(e) {
                            super.off(e)
                        }
                        enable() {
                            super.enable(), this.el.classList.add("ui-resizable"), this.el.classList.remove("ui-resizable-disabled"), this._setupAutoHide(this.option.autoHide)
                        }
                        disable() {
                            super.disable(), this.el.classList.add("ui-resizable-disabled"), this.el.classList.remove("ui-resizable"), this._setupAutoHide(!1)
                        }
                        destroy() {
                            this._removeHandlers(), this._setupAutoHide(!1), this.el.classList.remove("ui-resizable"), delete this.el, super.destroy()
                        }
                        updateOption(e) {
                            let t = e.handles && e.handles !== this.option.handles,
                                i = e.autoHide && e.autoHide !== this.option.autoHide;
                            return Object.keys(e).forEach((t => this.option[t] = e[t])), t && (this._removeHandlers(), this._setupHandlers()), i && this._setupAutoHide(this.option.autoHide), this
                        }
                        _setupAutoHide(e) {
                            return e ? (this.el.classList.add("ui-resizable-autohide"), this.el.addEventListener("mouseover", this._mouseOver), this.el.addEventListener("mouseout", this._mouseOut)) : (this.el.classList.remove("ui-resizable-autohide"), this.el.removeEventListener("mouseover", this._mouseOver), this.el.removeEventListener("mouseout", this._mouseOut), r.DDManager.overResizeElement === this && delete r.DDManager.overResizeElement), this
                        }
                        _mouseOver(e) {
                            r.DDManager.overResizeElement || r.DDManager.dragElement || (r.DDManager.overResizeElement = this, this.el.classList.remove("ui-resizable-autohide"))
                        }
                        _mouseOut(e) {
                            r.DDManager.overResizeElement === this && (delete r.DDManager.overResizeElement, this.el.classList.add("ui-resizable-autohide"))
                        }
                        _setupHandlers() {
                            let e = this.option.handles || "e,s,se";
                            return "all" === e && (e = "n,e,s,w,se,sw,ne,nw"), this.handlers = e.split(",").map((e => e.trim())).map((e => new s.DDResizableHandle(this.el, e, {
                                start: e => {
                                    this._resizeStart(e)
                                },
                                stop: e => {
                                    this._resizeStop(e)
                                },
                                move: t => {
                                    this._resizing(t, e)
                                }
                            }))), this
                        }
                        _resizeStart(e) {
                            this.originalRect = this.el.getBoundingClientRect(), this.scrollEl = n.Utils.getScrollElement(this.el), this.scrollY = this.scrollEl.scrollTop, this.scrolled = 0, this.startEvent = e, this._setupHelper(), this._applyChange();
                            const t = n.Utils.initEvent(e, {
                                type: "resizestart",
                                target: this.el
                            });
                            return this.option.start && this.option.start(t, this._ui()), this.el.classList.add("ui-resizable-resizing"), this.triggerEvent("resizestart", t), this
                        }
                        _resizing(e, t) {
                            this.scrolled = this.scrollEl.scrollTop - this.scrollY, this.temporalRect = this._getChange(e, t), this._applyChange();
                            const i = n.Utils.initEvent(e, {
                                type: "resize",
                                target: this.el
                            });
                            return this.option.resize && this.option.resize(i, this._ui()), this.triggerEvent("resize", i), this
                        }
                        _resizeStop(e) {
                            const t = n.Utils.initEvent(e, {
                                type: "resizestop",
                                target: this.el
                            });
                            return this.option.stop && this.option.stop(t), this.el.classList.remove("ui-resizable-resizing"), this.triggerEvent("resizestop", t), this._cleanHelper(), delete this.startEvent, delete this.originalRect, delete this.temporalRect, delete this.scrollY, delete this.scrolled, this
                        }
                        _setupHelper() {
                            return this.elOriginStyleVal = l._originStyleProp.map((e => this.el.style[e])), this.parentOriginStylePosition = this.el.parentElement.style.position, window.getComputedStyle(this.el.parentElement).position.match(/static/) && (this.el.parentElement.style.position = "relative"), this.el.style.position = "absolute", this.el.style.opacity = "0.8", this
                        }
                        _cleanHelper() {
                            return l._originStyleProp.forEach(((e, t) => {
                                this.el.style[e] = this.elOriginStyleVal[t] || null
                            })), this.el.parentElement.style.position = this.parentOriginStylePosition || null, this
                        }
                        _getChange(e, t) {
                            const i = this.startEvent,
                                s = {
                                    width: this.originalRect.width,
                                    height: this.originalRect.height + this.scrolled,
                                    left: this.originalRect.left,
                                    top: this.originalRect.top - this.scrolled
                                },
                                o = e.clientX - i.clientX,
                                n = e.clientY - i.clientY;
                            t.indexOf("e") > -1 ? s.width += o : t.indexOf("w") > -1 && (s.width -= o, s.left += o), t.indexOf("s") > -1 ? s.height += n : t.indexOf("n") > -1 && (s.height -= n, s.top += n);
                            const r = this._constrainSize(s.width, s.height);
                            return Math.round(s.width) !== Math.round(r.width) && (t.indexOf("w") > -1 && (s.left += s.width - r.width), s.width = r.width), Math.round(s.height) !== Math.round(r.height) && (t.indexOf("n") > -1 && (s.top += s.height - r.height), s.height = r.height), s
                        }
                        _constrainSize(e, t) {
                            const i = this.option.maxWidth || Number.MAX_SAFE_INTEGER,
                                s = this.option.minWidth || e,
                                o = this.option.maxHeight || Number.MAX_SAFE_INTEGER,
                                n = this.option.minHeight || t;
                            return {
                                width: Math.min(i, Math.max(s, e)),
                                height: Math.min(o, Math.max(n, t))
                            }
                        }
                        _applyChange() {
                            let e = {
                                left: 0,
                                top: 0,
                                width: 0,
                                height: 0
                            };
                            if ("absolute" === this.el.style.position) {
                                const t = this.el.parentElement,
                                    {
                                        left: i,
                                        top: s
                                    } = t.getBoundingClientRect();
                                e = {
                                    left: i,
                                    top: s,
                                    width: 0,
                                    height: 0
                                }
                            }
                            return this.temporalRect ? (Object.keys(this.temporalRect).forEach((t => {
                                const i = this.temporalRect[t];
                                this.el.style[t] = i - e[t] + "px"
                            })), this) : this
                        }
                        _removeHandlers() {
                            return this.handlers.forEach((e => e.destroy())), delete this.handlers, this
                        }
                    }
                    t.DDResizable = l, l._originStyleProp = ["width", "height", "position", "left", "top", "opacity", "zIndex"]
                },
                635: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.pointerleave = t.pointerenter = t.pointerdown = t.touchend = t.touchmove = t.touchstart = t.isTouch = void 0;
                    const s = i(939);
                    t.isTouch = "undefined" != typeof window && "undefined" != typeof document && ("ontouchstart" in document || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
                    class o {}
                    function n(e, t) {
                        if (e.touches.length > 1) return;
                        e.cancelable && e.preventDefault();
                        const i = e.changedTouches[0],
                            s = document.createEvent("MouseEvents");
                        s.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(s)
                    }
                    function r(e, t) {
                        e.cancelable && e.preventDefault();
                        const i = document.createEvent("MouseEvents");
                        i.initMouseEvent(t, !0, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(i)
                    }
                    t.touchstart = function(e) {
                        o.touchHandled || (o.touchHandled = !0, n(e, "mousedown"))
                    }, t.touchmove = function(e) {
                        o.touchHandled && n(e, "mousemove")
                    }, t.touchend = function(e) {
                        if (!o.touchHandled) return;
                        o.pointerLeaveTimeout && (window.clearTimeout(o.pointerLeaveTimeout), delete o.pointerLeaveTimeout);
                        const t = !!s.DDManager.dragElement;
                        n(e, "mouseup"), t || n(e, "click"), o.touchHandled = !1
                    }, t.pointerdown = function(e) {
                        e.target.releasePointerCapture(e.pointerId)
                    }, t.pointerenter = function(e) {
                        s.DDManager.dragElement && r(e, "mouseenter")
                    }, t.pointerleave = function(e) {
                        s.DDManager.dragElement && (o.pointerLeaveTimeout = window.setTimeout((() => {
                            delete o.pointerLeaveTimeout, r(e, "mouseleave")
                        }), 10))
                    }
                },
                62: (e, t, i) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.GridStackEngine = void 0;
                    const s = i(593);
                    class o {
                        constructor(e = {}) {
                            this.addedNodes = [], this.removedNodes = [], this.column = e.column || 12, this.maxRow = e.maxRow, this._float = e.float, this.nodes = e.nodes || [], this.onChange = e.onChange
                        }
                        batchUpdate(e = !0) {
                            return !!this.batchMode === e || (this.batchMode = e, e ? (this._prevFloat = this._float, this._float = !0, this.saveInitial()) : (this._float = this._prevFloat, delete this._prevFloat, this._packNodes()._notify())), this
                        }
                        _useEntireRowArea(e, t) {
                            return !this.float && !this._hasLocked && (!e._moving || e._skipDown || t.y <= e.y)
                        }
                        _fixCollisions(e, t = e, i, o = {}) {
                            if (this.sortNodes(-1), !(i = i || this.collide(e, t))) return !1;
                            if (e._moving && !o.nested && !this.float && this.swap(e, i)) return !0;
                            let n = t;
                            this._useEntireRowArea(e, t) && (n = {
                                x: 0,
                                w: this.column,
                                y: t.y,
                                h: t.h
                            }, i = this.collide(e, n, o.skip));
                            let r = !1,
                                l = {
                                    nested: !0,
                                    pack: !1
                                };
                            for (; i = i || this.collide(e, n, o.skip);) {
                                let n;
                                if (i.locked || e._moving && !e._skipDown && t.y > e.y && !this.float && (!this.collide(i, Object.assign(Object.assign({}, i), {
                                        y: e.y
                                    }), e) || !this.collide(i, Object.assign(Object.assign({}, i), {
                                        y: t.y - i.h
                                    }), e)) ? (e._skipDown = e._skipDown || t.y > e.y, n = this.moveNode(e, Object.assign(Object.assign(Object.assign({}, t), {
                                        y: i.y + i.h
                                    }), l)), i.locked && n ? s.Utils.copyPos(t, e) : !i.locked && n && o.pack && (this._packNodes(), t.y = i.y + i.h, s.Utils.copyPos(e, t)), r = r || n) : n = this.moveNode(i, Object.assign(Object.assign(Object.assign({}, i), {
                                        y: t.y + t.h,
                                        skip: e
                                    }), l)), !n) return r;
                                i = void 0
                            }
                            return r
                        }
                        collide(e, t = e, i) {
                            return this.nodes.find((o => o !== e && o !== i && s.Utils.isIntercepted(o, t)))
                        }
                        collideAll(e, t = e, i) {
                            return this.nodes.filter((o => o !== e && o !== i && s.Utils.isIntercepted(o, t)))
                        }
                        directionCollideCoverage(e, t, i) {
                            if (!t.rect || !e._rect) return;
                            let s, o = e._rect,
                                n = Object.assign({}, t.rect);
                            return n.y > o.y ? (n.h += n.y - o.y, n.y = o.y) : n.h += o.y - n.y, n.x > o.x ? (n.w += n.x - o.x, n.x = o.x) : n.w += o.x - n.x, i.forEach((e => {
                                if (e.locked || !e._rect) return;
                                let t = e._rect,
                                    i = Number.MAX_VALUE,
                                    r = Number.MAX_VALUE,
                                    l = .5;
                                o.y < t.y ? i = (n.y + n.h - t.y) / t.h : o.y + o.h > t.y + t.h && (i = (t.y + t.h - n.y) / t.h), o.x < t.x ? r = (n.x + n.w - t.x) / t.w : o.x + o.w > t.x + t.w && (r = (t.x + t.w - n.x) / t.w);
                                let a = Math.min(r, i);
                                a > l && (l = a, s = e)
                            })), t.collide = s, s
                        }
                        cacheRects(e, t, i, s, o, n) {
                            return this.nodes.forEach((r => r._rect = {
                                y: r.y * t + i,
                                x: r.x * e + n,
                                w: r.w * e - n - s,
                                h: r.h * t - i - o
                            })), this
                        }
                        swap(e, t) {
                            if (!t || t.locked || !e || e.locked) return !1;
                            function i() {
                                let i = t.x,
                                    s = t.y;
                                return t.x = e.x, t.y = e.y, e.h != t.h ? (e.x = i, e.y = t.y + t.h) : e.w != t.w ? (e.x = t.x + t.w, e.y = s) : (e.x = i, e.y = s), e._dirty = t._dirty = !0, !0
                            }
                            let o;
                            if (e.w === t.w && e.h === t.h && (e.x === t.x || e.y === t.y) && (o = s.Utils.isTouching(e, t))) return i();
                            if (!1 !== o) {
                                if (e.w === t.w && e.x === t.x && (o || (o = s.Utils.isTouching(e, t)))) {
                                    if (t.y < e.y) {
                                        let i = e;
                                        e = t, t = i
                                    }
                                    return i()
                                }
                                if (!1 !== o) {
                                    if (e.h === t.h && e.y === t.y && (o || (o = s.Utils.isTouching(e, t)))) {
                                        if (t.x < e.x) {
                                            let i = e;
                                            e = t, t = i
                                        }
                                        return i()
                                    }
                                    return !1
                                }
                            }
                        }
                        isAreaEmpty(e, t, i, s) {
                            let o = {
                                x: e || 0,
                                y: t || 0,
                                w: i || 1,
                                h: s || 1
                            };
                            return !this.collide(o)
                        }
                        compact() {
                            if (0 === this.nodes.length) return this;
                            this.batchUpdate().sortNodes();
                            let e = this.nodes;
                            return this.nodes = [], e.forEach((e => {
                                e.locked || (e.autoPosition = !0), this.addNode(e, !1), e._dirty = !0
                            })), this.batchUpdate(!1)
                        }
                        set float(e) {
                            this._float !== e && (this._float = e || !1, e || this._packNodes()._notify())
                        }
                        get float() {
                            return this._float || !1
                        }
                        sortNodes(e) {
                            return this.nodes = s.Utils.sort(this.nodes, e, this.column), this
                        }
                        _packNodes() {
                            return this.batchMode || (this.sortNodes(), this.float ? this.nodes.forEach((e => {
                                if (e._updating || void 0 === e._orig || e.y === e._orig.y) return;
                                let t = e.y;
                                for (; t > e._orig.y;) --t, this.collide(e, {
                                    x: e.x,
                                    y: t,
                                    w: e.w,
                                    h: e.h
                                }) || (e._dirty = !0, e.y = t)
                            })) : this.nodes.forEach(((e, t) => {
                                if (!e.locked)
                                    for (; e.y > 0;) {
                                        let i = 0 === t ? 0 : e.y - 1;
                                        if (0 !== t && this.collide(e, {
                                                x: e.x,
                                                y: i,
                                                w: e.w,
                                                h: e.h
                                            })) break;
                                        e._dirty = e.y !== i, e.y = i
                                    }
                            }))), this
                        }
                        prepareNode(e, t) {
                            (e = e || {})._id = e._id || o._idSeq++, void 0 !== e.x && void 0 !== e.y && null !== e.x && null !== e.y || (e.autoPosition = !0);
                            let i = {
                                x: 0,
                                y: 0,
                                w: 1,
                                h: 1
                            };
                            return s.Utils.defaults(e, i), e.autoPosition || delete e.autoPosition, e.noResize || delete e.noResize, e.noMove || delete e.noMove, "string" == typeof e.x && (e.x = Number(e.x)), "string" == typeof e.y && (e.y = Number(e.y)), "string" == typeof e.w && (e.w = Number(e.w)), "string" == typeof e.h && (e.h = Number(e.h)), isNaN(e.x) && (e.x = i.x, e.autoPosition = !0), isNaN(e.y) && (e.y = i.y, e.autoPosition = !0), isNaN(e.w) && (e.w = i.w), isNaN(e.h) && (e.h = i.h), this.nodeBoundFix(e, t)
                        }
                        nodeBoundFix(e, t) {
                            let i = e._orig || s.Utils.copyPos({}, e);
                            if (e.maxW && (e.w = Math.min(e.w, e.maxW)), e.maxH && (e.h = Math.min(e.h, e.maxH)), e.minW && e.minW <= this.column && (e.w = Math.max(e.w, e.minW)), e.minH && (e.h = Math.max(e.h, e.minH)), (1 === this.column || e.x + e.w > this.column) && this.column < 12 && !this._inColumnResize && !e.autoPosition && e._id && -1 === this.findCacheLayout(e, 12)) {
                                let t = Object.assign({}, e);
                                t.x = Math.min(11, t.x), t.w = Math.min(12, t.w), this.cacheOneLayout(t, 12)
                            }
                            return e.w > this.column ? e.w = this.column : e.w < 1 && (e.w = 1), this.maxRow && e.h > this.maxRow ? e.h = this.maxRow : e.h < 1 && (e.h = 1), e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), e.x + e.w > this.column && (t ? e.w = this.column - e.x : e.x = this.column - e.w), this.maxRow && e.y + e.h > this.maxRow && (t ? e.h = this.maxRow - e.y : e.y = this.maxRow - e.h), s.Utils.samePos(e, i) || (e._dirty = !0), e
                        }
                        getDirtyNodes(e) {
                            return e ? this.nodes.filter((e => e._dirty && !s.Utils.samePos(e, e._orig))) : this.nodes.filter((e => e._dirty))
                        }
                        _notify(e) {
                            if (this.batchMode || !this.onChange) return this;
                            let t = (e || []).concat(this.getDirtyNodes());
                            return this.onChange(t), this
                        }
                        cleanNodes() {
                            return this.batchMode || this.nodes.forEach((e => {
                                delete e._dirty, delete e._lastTried
                            })), this
                        }
                        saveInitial() {
                            return this.nodes.forEach((e => {
                                e._orig = s.Utils.copyPos({}, e), delete e._dirty
                            })), this._hasLocked = this.nodes.some((e => e.locked)), this
                        }
                        restoreInitial() {
                            return this.nodes.forEach((e => {
                                s.Utils.samePos(e, e._orig) || (s.Utils.copyPos(e, e._orig), e._dirty = !0)
                            })), this._notify(), this
                        }
                        findEmptyPosition(e) {
                            this.sortNodes();
                            let t = !1;
                            for (let i = 0; !t; ++i) {
                                let o = i % this.column,
                                    n = Math.floor(i / this.column);
                                if (o + e.w > this.column) continue;
                                let r = {
                                    x: o,
                                    y: n,
                                    w: e.w,
                                    h: e.h
                                };
                                this.nodes.find((e => s.Utils.isIntercepted(r, e))) || (e.x = o, e.y = n, t = !0)
                            }
                            return t
                        }
                        addNode(e, t = !1) {
                            return this.nodes.find((t => t._id === e._id)) || (delete(e = this._inColumnResize ? this.nodeBoundFix(e) : this.prepareNode(e))._temporaryRemoved, delete e._removeDOM, e.autoPosition && this.findEmptyPosition(e) && delete e.autoPosition, this.nodes.push(e), t && this.addedNodes.push(e), this._fixCollisions(e), this.batchMode || this._packNodes()._notify(), e)
                        }
                        removeNode(e, t = !0, i = !1) {
                            return this.nodes.find((t => t === e)) ? (i && this.removedNodes.push(e), t && (e._removeDOM = !0), this.nodes = this.nodes.filter((t => t !== e)), this._packNodes()._notify([e])) : this
                        }
                        removeAll(e = !0) {
                            return delete this._layouts, 0 === this.nodes.length ? this : (e && this.nodes.forEach((e => e._removeDOM = !0)), this.removedNodes = this.nodes, this.nodes = [], this._notify(this.removedNodes))
                        }
                        moveNodeCheck(e, t) {
                            if (!this.changedPosConstrain(e, t)) return !1;
                            if (t.pack = !0, !this.maxRow) return this.moveNode(e, t);
                            let i, n = new o({
                                column: this.column,
                                float: this.float,
                                nodes: this.nodes.map((t => t === e ? (i = Object.assign({}, t), i) : Object.assign({}, t)))
                            });
                            if (!i) return !1;
                            let r = n.moveNode(i, t) && n.getRow() <= this.maxRow;
                            if (!r && !t.resizing && t.collide) {
                                let i = t.collide.el.gridstackNode;
                                if (this.swap(e, i)) return this._notify(), !0
                            }
                            return !!r && (n.nodes.filter((e => e._dirty)).forEach((e => {
                                let t = this.nodes.find((t => t._id === e._id));
                                t && (s.Utils.copyPos(t, e), t._dirty = !0)
                            })), this._notify(), !0)
                        }
                        willItFit(e) {
                            if (delete e._willFitPos, !this.maxRow) return !0;
                            let t = new o({
                                    column: this.column,
                                    float: this.float,
                                    nodes: this.nodes.map((e => Object.assign({}, e)))
                                }),
                                i = Object.assign({}, e);
                            return this.cleanupNode(i), delete i.el, delete i._id, delete i.content, delete i.grid, t.addNode(i), t.getRow() <= this.maxRow && (e._willFitPos = s.Utils.copyPos({}, i), !0)
                        }
                        changedPosConstrain(e, t) {
                            return t.w = t.w || e.w, t.h = t.h || e.h, e.x !== t.x || e.y !== t.y || (e.maxW && (t.w = Math.min(t.w, e.maxW)), e.maxH && (t.h = Math.min(t.h, e.maxH)), e.minW && (t.w = Math.max(t.w, e.minW)), e.minH && (t.h = Math.max(t.h, e.minH)), e.w !== t.w || e.h !== t.h)
                        }
                        moveNode(e, t) {
                            var i, o;
                            if (!e || !t) return !1;
                            let n;
                            void 0 === t.pack && (n = t.pack = !0), "number" != typeof t.x && (t.x = e.x), "number" != typeof t.y && (t.y = e.y), "number" != typeof t.w && (t.w = e.w), "number" != typeof t.h && (t.h = e.h);
                            let r = e.w !== t.w || e.h !== t.h,
                                l = s.Utils.copyPos({}, e, !0);
                            if (s.Utils.copyPos(l, t), l = this.nodeBoundFix(l, r), s.Utils.copyPos(t, l), s.Utils.samePos(e, t)) return !1;
                            let a = s.Utils.copyPos({}, e),
                                h = this.collideAll(e, l, t.skip),
                                d = !0;
                            if (h.length) {
                                let r = e._moving && !t.nested,
                                    a = r ? this.directionCollideCoverage(e, t, h) : h[0];
                                if (r && a && (null === (o = null === (i = e.grid) || void 0 === i ? void 0 : i.opts) || void 0 === o ? void 0 : o.subGridDynamic) && !e.grid._isTemp) {
                                    let i = s.Utils.areaIntercept(t.rect, a._rect),
                                        o = s.Utils.area(t.rect),
                                        n = s.Utils.area(a._rect);
                                    i / (o < n ? o : n) > .8 && (a.grid.makeSubGrid(a.el, void 0, e), a = void 0)
                                }
                                a ? d = !this._fixCollisions(e, l, a, t) : (d = !1, n && delete t.pack)
                            }
                            return d && (e._dirty = !0, s.Utils.copyPos(e, l)), t.pack && this._packNodes()._notify(), !s.Utils.samePos(e, a)
                        }
                        getRow() {
                            return this.nodes.reduce(((e, t) => Math.max(e, t.y + t.h)), 0)
                        }
                        beginUpdate(e) {
                            return e._updating || (e._updating = !0, delete e._skipDown, this.batchMode || this.saveInitial()), this
                        }
                        endUpdate() {
                            let e = this.nodes.find((e => e._updating));
                            return e && (delete e._updating, delete e._skipDown), this
                        }
                        save(e = !0) {
                            var t;
                            let i = null === (t = this._layouts) || void 0 === t ? void 0 : t.length,
                                o = i && this.column !== i - 1 ? this._layouts[i - 1] : null,
                                n = [];
                            return this.sortNodes(), this.nodes.forEach((t => {
                                let i = null == o ? void 0 : o.find((e => e._id === t._id)),
                                    r = Object.assign({}, t);
                                i && (r.x = i.x, r.y = i.y, r.w = i.w), s.Utils.removeInternalForSave(r, !e), n.push(r)
                            })), n
                        }
                        layoutsNodesChange(e) {
                            return !this._layouts || this._inColumnResize || this._layouts.forEach(((t, i) => {
                                if (!t || i === this.column) return this;
                                if (i < this.column) this._layouts[i] = void 0;
                                else {
                                    let s = i / this.column;
                                    e.forEach((e => {
                                        if (!e._orig) return;
                                        let i = t.find((t => t._id === e._id));
                                        i && (e.y !== e._orig.y && (i.y += e.y - e._orig.y), e.x !== e._orig.x && (i.x = Math.round(e.x * s)), e.w !== e._orig.w && (i.w = Math.round(e.w * s)))
                                    }))
                                }
                            })), this
                        }
                        updateNodeWidths(e, t, i, o = "moveScale") {
                            var n;
                            if (!this.nodes.length || !t || e === t) return this;
                            this.cacheLayout(this.nodes, e), this.batchUpdate();
                            let r = [],
                                l = !1;
                            if (1 === t && (null == i ? void 0 : i.length)) {
                                l = !0;
                                let e = 0;
                                i.forEach((t => {
                                    t.x = 0, t.w = 1, t.y = Math.max(t.y, e), e = t.y + t.h
                                })), r = i, i = []
                            } else i = s.Utils.sort(this.nodes, -1, e);
                            let a = [];
                            if (t > e) {
                                a = this._layouts[t] || [];
                                let s = this._layouts.length - 1;
                                !a.length && e !== s && (null === (n = this._layouts[s]) || void 0 === n ? void 0 : n.length) && (e = s, this._layouts[s].forEach((e => {
                                    let t = i.find((t => t._id === e._id));
                                    t && (t.x = e.x, t.y = e.y, t.w = e.w)
                                })))
                            }
                            if (a.forEach((e => {
                                    let t = i.findIndex((t => t._id === e._id)); - 1 !== t && (i[t].x = e.x, i[t].y = e.y, i[t].w = e.w, r.push(i[t]), i.splice(t, 1))
                                })), i.length)
                                if ("function" == typeof o) o(t, e, r, i);
                                else if (!l) {
                                let s = t / e,
                                    n = "move" === o || "moveScale" === o,
                                    l = "scale" === o || "moveScale" === o;
                                i.forEach((i => {
                                    i.x = 1 === t ? 0 : n ? Math.round(i.x * s) : Math.min(i.x, t - 1), i.w = 1 === t || 1 === e ? 1 : l ? Math.round(i.w * s) || 1 : Math.min(i.w, t), r.push(i)
                                })), i = []
                            }
                            return l || (r = s.Utils.sort(r, -1, t)), this._inColumnResize = !0, this.nodes = [], r.forEach((e => {
                                this.addNode(e, !1), delete e._orig
                            })), this.batchUpdate(!1), delete this._inColumnResize, this
                        }
                        cacheLayout(e, t, i = !1) {
                            let s = [];
                            return e.forEach(((e, t) => {
                                e._id = e._id || o._idSeq++, s[t] = {
                                    x: e.x,
                                    y: e.y,
                                    w: e.w,
                                    _id: e._id
                                }
                            })), this._layouts = i ? [] : this._layouts || [], this._layouts[t] = s, this
                        }
                        cacheOneLayout(e, t) {
                            e._id = e._id || o._idSeq++;
                            let i = {
                                x: e.x,
                                y: e.y,
                                w: e.w,
                                _id: e._id
                            };
                            this._layouts = this._layouts || [], this._layouts[t] = this._layouts[t] || [];
                            let s = this.findCacheLayout(e, t);
                            return -1 === s ? this._layouts[t].push(i) : this._layouts[t][s] = i, this
                        }
                        findCacheLayout(e, t) {
                            var i, s, o;
                            return null !== (o = null === (s = null === (i = this._layouts) || void 0 === i ? void 0 : i[t]) || void 0 === s ? void 0 : s.findIndex((t => t._id === e._id))) && void 0 !== o ? o : -1
                        }
                        cleanupNode(e) {
                            for (let t in e) "_" === t[0] && "_id" !== t && delete e[t];
                            return this
                        }
                    }
                    t.GridStackEngine = o, o._idSeq = 1
                },
                270: function(e, t, i) {
                    var s = this && this.__createBinding || (Object.create ? function(e, t, i, s) {
                            void 0 === s && (s = i), Object.defineProperty(e, s, {
                                enumerable: !0,
                                get: function() {
                                    return t[i]
                                }
                            })
                        } : function(e, t, i, s) {
                            void 0 === s && (s = i), e[s] = t[i]
                        }),
                        o = this && this.__exportStar || function(e, t) {
                            for (var i in e) "default" === i || t.hasOwnProperty(i) || s(t, e, i)
                        };
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.GridStack = void 0;
                    const n = i(62),
                        r = i(593),
                        l = i(699);
                    o(i(699), t), o(i(593), t), o(i(62), t);
                    class a {
                        constructor(e, t = {}) {
                            var i, s;
                            this._gsEventHandler = {}, this._extraDragRow = 0, this.el = e, (t = t || {}).row && (t.minRow = t.maxRow = t.row, delete t.row);
                            let o = r.Utils.toNumber(e.getAttribute("gs-row"));
                            "auto" === t.column && delete t.column;
                            let g = t;
                            void 0 !== g.minWidth && (t.oneColumnSize = t.oneColumnSize || g.minWidth, delete g.minWidth), void 0 !== t.alwaysShowResizeHandle && (t._alwaysShowResizeHandle = t.alwaysShowResizeHandle);
                            let p = Object.assign(Object.assign({}, r.Utils.cloneDeep(l.gridDefaults)), {
                                column: r.Utils.toNumber(e.getAttribute("gs-column")) || l.gridDefaults.column,
                                minRow: o || r.Utils.toNumber(e.getAttribute("gs-min-row")) || l.gridDefaults.minRow,
                                maxRow: o || r.Utils.toNumber(e.getAttribute("gs-max-row")) || l.gridDefaults.maxRow,
                                staticGrid: r.Utils.toBool(e.getAttribute("gs-static")) || l.gridDefaults.staticGrid,
                                draggable: {
                                    handle: (t.handleClass ? "." + t.handleClass : t.handle ? t.handle : "") || l.gridDefaults.draggable.handle
                                },
                                removableOptions: {
                                    accept: t.itemClass ? "." + t.itemClass : l.gridDefaults.removableOptions.accept
                                }
                            });
                            e.getAttribute("gs-animate") && (p.animate = r.Utils.toBool(e.getAttribute("gs-animate"))), this.opts = r.Utils.defaults(t, p), t = null, this._initMargin(), 1 !== this.opts.column && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.oneColumnSize && (this._prevColumn = this.getColumn(), this.opts.column = 1), "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === e.style.direction), this.opts.rtl && this.el.classList.add("grid-stack-rtl");
                            let u = null === (i = r.Utils.closestUpByClass(this.el, l.gridDefaults.itemClass)) || void 0 === i ? void 0 : i.gridstackNode;
                            u && (u.subGrid = this, this.parentGridItem = u, this.el.classList.add("grid-stack-nested"), u.el.classList.add("grid-stack-sub-grid")), this._isAutoCellHeight = "auto" === this.opts.cellHeight, this._isAutoCellHeight || "initial" === this.opts.cellHeight ? this.cellHeight(void 0, !1) : ("number" == typeof this.opts.cellHeight && this.opts.cellHeightUnit && this.opts.cellHeightUnit !== l.gridDefaults.cellHeightUnit && (this.opts.cellHeight = this.opts.cellHeight + this.opts.cellHeightUnit, delete this.opts.cellHeightUnit), this.cellHeight(this.opts.cellHeight, !1)), "mobile" === this.opts.alwaysShowResizeHandle && (this.opts.alwaysShowResizeHandle = h.isTouch), this._styleSheetClass = "grid-stack-instance-" + n.GridStackEngine._idSeq++, this.el.classList.add(this._styleSheetClass), this._setStaticClass();
                            let c = this.opts.engineClass || a.engineClass || n.GridStackEngine;
                            if (this.engine = new c({
                                    column: this.getColumn(),
                                    float: this.opts.float,
                                    maxRow: this.opts.maxRow,
                                    onChange: e => {
                                        let t = 0;
                                        this.engine.nodes.forEach((e => {
                                            t = Math.max(t, e.y + e.h)
                                        })), e.forEach((e => {
                                            let t = e.el;
                                            t && (e._removeDOM ? (t && t.remove(), delete e._removeDOM) : this._writePosAttr(t, e))
                                        })), this._updateStyles(!1, t)
                                    }
                                }), this.opts.auto) {
                                this.batchUpdate();
                                let e = [],
                                    t = this.getColumn();
                                1 === t && this._prevColumn && (t = this._prevColumn), this.getGridItems().forEach((i => {
                                    let s = parseInt(i.getAttribute("gs-x")),
                                        o = parseInt(i.getAttribute("gs-y"));
                                    e.push({
                                        el: i,
                                        i: (Number.isNaN(s) ? 1e3 : s) + (Number.isNaN(o) ? 1e3 : o) * t
                                    })
                                })), e.sort(((e, t) => t.i - e.i)).forEach((e => this._prepareElement(e.el))), this.batchUpdate(!1)
                            }
                            this.setAnimation(this.opts.animate), this._updateStyles(), 12 != this.opts.column && this.el.classList.add("grid-stack-" + this.opts.column), this.opts.dragIn && a.setupDragIn(this.opts.dragIn, this.opts.dragInOptions), delete this.opts.dragIn, delete this.opts.dragInOptions, this.opts.subGridDynamic && !d.DDManager.pauseDrag && (d.DDManager.pauseDrag = !0), void 0 !== (null === (s = this.opts.draggable) || void 0 === s ? void 0 : s.pause) && (d.DDManager.pauseDrag = this.opts.draggable.pause), this._setupRemoveDrop(), this._setupAcceptWidget(), this._updateWindowResizeEvent()
                        }
                        static init(e = {}, t = ".grid-stack") {
                            let i = a.getGridElement(t);
                            return i ? (i.gridstack || (i.gridstack = new a(i, r.Utils.cloneDeep(e))), i.gridstack) : ("string" == typeof t ? console.error('GridStack.initAll() no grid was found with selector "' + t + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.') : console.error("GridStack.init() no grid element was passed."), null)
                        }
                        static initAll(e = {}, t = ".grid-stack") {
                            let i = [];
                            return a.getGridElements(t).forEach((t => {
                                t.gridstack || (t.gridstack = new a(t, r.Utils.cloneDeep(e)), delete e.dragIn, delete e.dragInOptions), i.push(t.gridstack)
                            })), 0 === i.length && console.error('GridStack.initAll() no grid was found with selector "' + t + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'), i
                        }
                        static addGrid(e, t = {}) {
                            if (!e) return null;
                            let i = e;
                            if (!e.classList.contains("grid-stack")) {
                                let s = document.implementation.createHTMLDocument("");
                                s.body.innerHTML = `<div class="grid-stack ${t.class || ""}"></div>`, i = s.body.children[0], e.appendChild(i)
                            }
                            let s = a.init(t, i);
                            if (s.opts.children) {
                                let e = s.opts.children;
                                delete s.opts.children, s.load(e)
                            }
                            return s
                        }
                        static registerEngine(e) {
                            a.engineClass = e
                        }
                        get placeholder() {
                            if (!this._placeholder) {
                                let e = document.createElement("div");
                                e.className = "placeholder-content", this.opts.placeholderText && (e.innerHTML = this.opts.placeholderText), this._placeholder = document.createElement("div"), this._placeholder.classList.add(this.opts.placeholderClass, l.gridDefaults.itemClass, this.opts.itemClass), this.placeholder.appendChild(e)
                            }
                            return this._placeholder
                        }
                        addWidget(e, t) {
                            let i;
                            if ("string" == typeof e) {
                                let t = document.implementation.createHTMLDocument("");
                                t.body.innerHTML = e, i = t.body.children[0]
                            } else if (0 === arguments.length || 1 === arguments.length && (void 0 !== (s = e).x || void 0 !== s.y || void 0 !== s.w || void 0 !== s.h || void 0 !== s.content)) {
                                let s = e && e.content || "";
                                t = e;
                                let o = document.implementation.createHTMLDocument("");
                                o.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ""}"><div class="grid-stack-item-content">${s}</div></div>`, i = o.body.children[0]
                            } else i = e;
                            var s;
                            let o = this._readAttr(i);
                            t = r.Utils.cloneDeep(t) || {}, r.Utils.defaults(t, o);
                            let n = this.engine.prepareNode(t);
                            return this._writeAttr(i, t), this._insertNotAppend ? this.el.prepend(i) : this.el.appendChild(i), this._prepareElement(i, !0, t), this._updateContainerHeight(), n.subGrid && this.makeSubGrid(n.el, void 0, void 0, !1), this._prevColumn && 1 === this.opts.column && (this._ignoreLayoutsNodeChange = !0), this._triggerAddEvent(), this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, i
                        }
                        makeSubGrid(e, t, i, s = !0) {
                            var o;
                            let n, l = e.gridstackNode;
                            if (l || (l = this.makeWidget(e).gridstackNode), null === (o = l.subGrid) || void 0 === o ? void 0 : o.el) return l.subGrid;
                            (t = r.Utils.cloneDeep(t || l.subGrid || Object.assign(Object.assign({}, this.opts.subGrid), {
                                children: void 0
                            }))).subGrid = r.Utils.cloneDeep(t), l.subGrid = t, "auto" === t.column && (n = !0, t.column = Math.max(l.w || 1, (null == i ? void 0 : i.w) || 1), t.disableOneColumnMode = !0);
                            let h, d, g = l.el.querySelector(".grid-stack-item-content");
                            if (s) {
                                this._removeDD(l.el);
                                let e = document.implementation.createHTMLDocument("");
                                e.body.innerHTML = '<div class="grid-stack-item"></div>', h = e.body.children[0], h.appendChild(g), d = Object.assign(Object.assign({}, l), {
                                    x: 0,
                                    y: 0
                                }), r.Utils.removeInternalForSave(d), delete d.subGrid, l.content && (d.content = l.content, delete l.content), e.body.innerHTML = '<div class="grid-stack-item-content"></div>', g = e.body.children[0], l.el.appendChild(g), this._prepareDragDropByNode(l)
                            }
                            if (i) {
                                let e = n ? t.column : l.w,
                                    s = l.h + i.h,
                                    o = l.el.style;
                                o.transition = "none", this.update(l.el, {
                                    w: e,
                                    h: s
                                }), setTimeout((() => o.transition = null))
                            }
                            let p = l.subGrid = a.addGrid(g, t);
                            return (null == i ? void 0 : i._moving) && (p._isTemp = !0), n && (p._autoColumn = !0), s && p.addWidget(h, d), i && (i._moving ? window.setTimeout((() => r.Utils.simulateMouseEvent(i._event, "mouseenter", p.el)), 0) : p.addWidget(l.el, l)), p
                        }
                        removeAsSubGrid(e) {
                            var t;
                            let i = null === (t = this.parentGridItem) || void 0 === t ? void 0 : t.grid;
                            i && (i.batchUpdate(), i.removeWidget(this.parentGridItem.el, !0, !0), this.engine.nodes.forEach((e => {
                                e.x += this.parentGridItem.x, e.y += this.parentGridItem.y, i.addWidget(e.el, e)
                            })), i.batchUpdate(!1), delete this.parentGridItem, e && window.setTimeout((() => r.Utils.simulateMouseEvent(e._event, "mouseenter", i.el)), 0))
                        }
                        save(e = !0, t = !1) {
                            let i = this.engine.save(e);
                            if (i.forEach((t => {
                                    if (e && t.el && !t.subGrid) {
                                        let e = t.el.querySelector(".grid-stack-item-content");
                                        t.content = e ? e.innerHTML : void 0, t.content || delete t.content
                                    } else e || delete t.content, t.subGrid && (t.subGrid = t.subGrid.save(e, !0));
                                    delete t.el
                                })), t) {
                                let e = r.Utils.cloneDeep(this.opts);
                                e.marginBottom === e.marginTop && e.marginRight === e.marginLeft && e.marginTop === e.marginRight && (e.margin = e.marginTop, delete e.marginTop, delete e.marginRight, delete e.marginBottom, delete e.marginLeft), e.rtl === ("rtl" === this.el.style.direction) && (e.rtl = "auto"), this._isAutoCellHeight && (e.cellHeight = "auto"), this._autoColumn && (e.column = "auto", delete e.disableOneColumnMode);
                                const t = e._alwaysShowResizeHandle;
                                return delete e._alwaysShowResizeHandle, void 0 !== t ? e.alwaysShowResizeHandle = t : delete e.alwaysShowResizeHandle, r.Utils.removeInternalAndSame(e, l.gridDefaults), e.children = i, e
                            }
                            return i
                        }
                        load(e, t = !0) {
                            let i = a.Utils.sort([...e], -1, this._prevColumn || this.getColumn());
                            this._insertNotAppend = !0, this._prevColumn && this._prevColumn !== this.opts.column && i.some((e => e.x + e.w > this.opts.column)) && (this._ignoreLayoutsNodeChange = !0, this.engine.cacheLayout(i, this._prevColumn, !0));
                            let s = [];
                            return this.batchUpdate(), t && [...this.engine.nodes].forEach((e => {
                                i.find((t => e.id === t.id)) || ("function" == typeof t ? t(this, e, !1) : (s.push(e), this.removeWidget(e.el, !0, !1)))
                            })), i.forEach((e => {
                                let i = e.id || 0 === e.id ? this.engine.nodes.find((t => t.id === e.id)) : void 0;
                                if (i) {
                                    if (this.update(i.el, e), e.subGrid && e.subGrid.children) {
                                        let t = i.el.querySelector(".grid-stack");
                                        t && t.gridstack && (t.gridstack.load(e.subGrid.children), this._insertNotAppend = !0)
                                    }
                                } else t && (e = "function" == typeof t ? t(this, e, !0).gridstackNode : this.addWidget(e).gridstackNode)
                            })), this.engine.removedNodes = s, this.batchUpdate(!1), delete this._ignoreLayoutsNodeChange, delete this._insertNotAppend, this
                        }
                        batchUpdate(e = !0) {
                            return this.engine.batchUpdate(e), e || (this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent()), this
                        }
                        getCellHeight(e = !1) {
                            if (this.opts.cellHeight && "auto" !== this.opts.cellHeight && (!e || !this.opts.cellHeightUnit || "px" === this.opts.cellHeightUnit)) return this.opts.cellHeight;
                            let t = this.el.querySelector("." + this.opts.itemClass);
                            if (t) {
                                let e = r.Utils.toNumber(t.getAttribute("gs-h"));
                                return Math.round(t.offsetHeight / e)
                            }
                            let i = parseInt(this.el.getAttribute("gs-current-row"));
                            return i ? Math.round(this.el.getBoundingClientRect().height / i) : this.opts.cellHeight
                        }
                        cellHeight(e, t = !0) {
                            if (t && void 0 !== e && this._isAutoCellHeight !== ("auto" === e) && (this._isAutoCellHeight = "auto" === e, this._updateWindowResizeEvent()), "initial" !== e && "auto" !== e || (e = void 0), void 0 === e) {
                                let t = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
                                e = this.cellWidth() + t
                            }
                            let i = r.Utils.parseHeight(e);
                            return this.opts.cellHeightUnit === i.unit && this.opts.cellHeight === i.h || (this.opts.cellHeightUnit = i.unit, this.opts.cellHeight = i.h, t && this._updateStyles(!0)), this
                        }
                        cellWidth() {
                            return this._widthOrContainer() / this.getColumn()
                        }
                        _widthOrContainer() {
                            return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth
                        }
                        compact() {
                            return this.engine.compact(), this._triggerChangeEvent(), this
                        }
                        column(e, t = "moveScale") {
                            if (e < 1 || this.opts.column === e) return this;
                            let i, s = this.getColumn();
                            return 1 === e ? this._prevColumn = s : delete this._prevColumn, this.el.classList.remove("grid-stack-" + s), this.el.classList.add("grid-stack-" + e), this.opts.column = this.engine.column = e, 1 === e && this.opts.oneColumnModeDomSort && (i = [], this.getGridItems().forEach((e => {
                                e.gridstackNode && i.push(e.gridstackNode)
                            })), i.length || (i = void 0)), this.engine.updateNodeWidths(s, e, i, t), this._isAutoCellHeight && this.cellHeight(), this._ignoreLayoutsNodeChange = !0, this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, this
                        }
                        getColumn() {
                            return this.opts.column
                        }
                        getGridItems() {
                            return Array.from(this.el.children).filter((e => e.matches("." + this.opts.itemClass) && !e.matches("." + this.opts.placeholderClass)))
                        }
                        destroy(e = !0) {
                            if (this.el) return this._updateWindowResizeEvent(!0), this.setStatic(!0, !1), this.setAnimation(!1), e ? this.el.parentNode.removeChild(this.el) : (this.removeAll(e), this.el.classList.remove(this._styleSheetClass)), this._removeStylesheet(), this.el.removeAttribute("gs-current-row"), delete this.parentGridItem, delete this.opts, delete this._placeholder, delete this.engine, delete this.el.gridstack, delete this.el, this
                        }
                        float(e) {
                            return this.opts.float !== e && (this.opts.float = this.engine.float = e, this._triggerChangeEvent()), this
                        }
                        getFloat() {
                            return this.engine.float
                        }
                        getCellFromPixel(e, t = !1) {
                            let i, s = this.el.getBoundingClientRect();
                            i = t ? {
                                top: s.top + document.documentElement.scrollTop,
                                left: s.left
                            } : {
                                top: this.el.offsetTop,
                                left: this.el.offsetLeft
                            };
                            let o = e.left - i.left,
                                n = e.top - i.top,
                                r = s.width / this.getColumn(),
                                l = s.height / parseInt(this.el.getAttribute("gs-current-row"));
                            return {
                                x: Math.floor(o / r),
                                y: Math.floor(n / l)
                            }
                        }
                        getRow() {
                            return Math.max(this.engine.getRow(), this.opts.minRow)
                        }
                        isAreaEmpty(e, t, i, s) {
                            return this.engine.isAreaEmpty(e, t, i, s)
                        }
                        makeWidget(e) {
                            let t = a.getElement(e);
                            return this._prepareElement(t, !0), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), t
                        }
                        on(e, t) {
                            if (-1 !== e.indexOf(" ")) return e.split(" ").forEach((e => this.on(e, t))), this;
                            if ("change" === e || "added" === e || "removed" === e || "enable" === e || "disable" === e) {
                                let i = "enable" === e || "disable" === e;
                                this._gsEventHandler[e] = i ? e => t(e) : e => t(e, e.detail), this.el.addEventListener(e, this._gsEventHandler[e])
                            } else "drag" === e || "dragstart" === e || "dragstop" === e || "resizestart" === e || "resize" === e || "resizestop" === e || "dropped" === e ? this._gsEventHandler[e] = t : console.log("GridStack.on(" + e + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
                            return this
                        }
                        off(e) {
                            return -1 !== e.indexOf(" ") ? (e.split(" ").forEach((e => this.off(e))), this) : ("change" !== e && "added" !== e && "removed" !== e && "enable" !== e && "disable" !== e || this._gsEventHandler[e] && this.el.removeEventListener(e, this._gsEventHandler[e]), delete this._gsEventHandler[e], this)
                        }
                        removeWidget(e, t = !0, i = !0) {
                            return a.getElements(e).forEach((e => {
                                if (e.parentElement && e.parentElement !== this.el) return;
                                let s = e.gridstackNode;
                                s || (s = this.engine.nodes.find((t => e === t.el))), s && (delete e.gridstackNode, this._removeDD(e), this.engine.removeNode(s, t, i), t && e.parentElement && e.remove())
                            })), i && (this._triggerRemoveEvent(), this._triggerChangeEvent()), this
                        }
                        removeAll(e = !0) {
                            return this.engine.nodes.forEach((e => {
                                delete e.el.gridstackNode, this._removeDD(e.el)
                            })), this.engine.removeAll(e), this._triggerRemoveEvent(), this
                        }
                        setAnimation(e) {
                            return e ? this.el.classList.add("grid-stack-animate") : this.el.classList.remove("grid-stack-animate"), this
                        }
                        setStatic(e, t = !0) {
                            return this.opts.staticGrid === e || (this.opts.staticGrid = e, this._setupRemoveDrop(), this._setupAcceptWidget(), this.engine.nodes.forEach((e => this._prepareDragDropByNode(e))), t && this._setStaticClass()), this
                        }
                        update(e, t) {
                            if (arguments.length > 2) {
                                console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon");
                                let i = arguments,
                                    s = 1;
                                return t = {
                                    x: i[s++],
                                    y: i[s++],
                                    w: i[s++],
                                    h: i[s++]
                                }, this.update(e, t)
                            }
                            return a.getElements(e).forEach((e => {
                                if (!e || !e.gridstackNode) return;
                                let i = e.gridstackNode,
                                    s = r.Utils.cloneDeep(t);
                                delete s.autoPosition;
                                let o, n = ["x", "y", "w", "h"];
                                if (n.some((e => void 0 !== s[e] && s[e] !== i[e])) && (o = {}, n.forEach((e => {
                                        o[e] = void 0 !== s[e] ? s[e] : i[e], delete s[e]
                                    }))), !o && (s.minW || s.minH || s.maxW || s.maxH) && (o = {}), s.content) {
                                    let t = e.querySelector(".grid-stack-item-content");
                                    t && t.innerHTML !== s.content && (t.innerHTML = s.content), delete s.content
                                }
                                let l = !1,
                                    a = !1;
                                for (const e in s) "_" !== e[0] && i[e] !== s[e] && (i[e] = s[e], l = !0, a = a || !this.opts.staticGrid && ("noResize" === e || "noMove" === e || "locked" === e));
                                o && (this.engine.cleanNodes().beginUpdate(i).moveNode(i, o), this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()), l && this._writeAttr(e, i), a && this._prepareDragDropByNode(i)
                            })), this
                        }
                        margin(e) {
                            if (!("string" == typeof e && e.split(" ").length > 1)) {
                                let t = r.Utils.parseHeight(e);
                                if (this.opts.marginUnit === t.unit && this.opts.margin === t.h) return
                            }
                            return this.opts.margin = e, this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0, this._initMargin(), this._updateStyles(!0), this
                        }
                        getMargin() {
                            return this.opts.margin
                        }
                        willItFit(e) {
                            if (arguments.length > 1) {
                                console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon");
                                let e = arguments,
                                    t = 0,
                                    i = {
                                        x: e[t++],
                                        y: e[t++],
                                        w: e[t++],
                                        h: e[t++],
                                        autoPosition: e[t++]
                                    };
                                return this.willItFit(i)
                            }
                            return this.engine.willItFit(e)
                        }
                        _triggerChangeEvent() {
                            if (this.engine.batchMode) return this;
                            let e = this.engine.getDirtyNodes(!0);
                            return e && e.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(e), this._triggerEvent("change", e)), this.engine.saveInitial(), this
                        }
                        _triggerAddEvent() {
                            return this.engine.batchMode || this.engine.addedNodes && this.engine.addedNodes.length > 0 && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes), this.engine.addedNodes.forEach((e => {
                                delete e._dirty
                            })), this._triggerEvent("added", this.engine.addedNodes), this.engine.addedNodes = []), this
                        }
                        _triggerRemoveEvent() {
                            return this.engine.batchMode || this.engine.removedNodes && this.engine.removedNodes.length > 0 && (this._triggerEvent("removed", this.engine.removedNodes), this.engine.removedNodes = []), this
                        }
                        _triggerEvent(e, t) {
                            let i = t ? new CustomEvent(e, {
                                bubbles: !1,
                                detail: t
                            }) : new Event(e);
                            return this.el.dispatchEvent(i), this
                        }
                        _removeStylesheet() {
                            return this._styles && (r.Utils.removeStylesheet(this._styleSheetClass), delete this._styles), this
                        }
                        _updateStyles(e = !1, t) {
                            if (e && this._removeStylesheet(), t || (t = this.getRow()), this._updateContainerHeight(), 0 === this.opts.cellHeight) return this;
                            let i = this.opts.cellHeight,
                                s = this.opts.cellHeightUnit,
                                o = `.${this._styleSheetClass} > .${this.opts.itemClass}`;
                            if (!this._styles) {
                                let e = this.opts.styleInHead ? void 0 : this.el.parentNode;
                                if (this._styles = r.Utils.createStylesheet(this._styleSheetClass, e), !this._styles) return this;
                                this._styles._max = 0, r.Utils.addCSSRule(this._styles, o, `min-height: ${i}${s}`);
                                let t = this.opts.marginTop + this.opts.marginUnit,
                                    n = this.opts.marginBottom + this.opts.marginUnit,
                                    l = this.opts.marginRight + this.opts.marginUnit,
                                    a = this.opts.marginLeft + this.opts.marginUnit,
                                    h = `${o} > .grid-stack-item-content`,
                                    d = `.${this._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
                                r.Utils.addCSSRule(this._styles, h, `top: ${t}; right: ${l}; bottom: ${n}; left: ${a};`), r.Utils.addCSSRule(this._styles, d, `top: ${t}; right: ${l}; bottom: ${n}; left: ${a};`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-ne`, `right: ${l}`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-e`, `right: ${l}`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-se`, `right: ${l}; bottom: ${n}`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-nw`, `left: ${a}`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-w`, `left: ${a}`), r.Utils.addCSSRule(this._styles, `${o} > .ui-resizable-sw`, `left: ${a}; bottom: ${n}`)
                            }
                            if ((t = t || this._styles._max) > this._styles._max) {
                                let e = e => i * e + s;
                                for (let i = this._styles._max + 1; i <= t; i++) {
                                    let t = e(i);
                                    r.Utils.addCSSRule(this._styles, `${o}[gs-y="${i - 1}"]`, `top: ${e(i - 1)}`), r.Utils.addCSSRule(this._styles, `${o}[gs-h="${i}"]`, `height: ${t}`), r.Utils.addCSSRule(this._styles, `${o}[gs-min-h="${i}"]`, `min-height: ${t}`), r.Utils.addCSSRule(this._styles, `${o}[gs-max-h="${i}"]`, `max-height: ${t}`)
                                }
                                this._styles._max = t
                            }
                            return this
                        }
                        _updateContainerHeight() {
                            if (!this.engine || this.engine.batchMode) return this;
                            let e = this.getRow() + this._extraDragRow;
                            if (this.el.setAttribute("gs-current-row", String(e)), 0 === e) return this.el.style.removeProperty("min-height"), this;
                            let t = this.opts.cellHeight,
                                i = this.opts.cellHeightUnit;
                            return t ? (this.el.style.minHeight = e * t + i, this) : this
                        }
                        _prepareElement(e, t = !1, i) {
                            i || (e.classList.add(this.opts.itemClass), i = this._readAttr(e)), e.gridstackNode = i, i.el = e, i.grid = this;
                            let s = Object.assign({}, i);
                            return i = this.engine.addNode(i, t), r.Utils.same(i, s) || this._writeAttr(e, i), this._prepareDragDropByNode(i), this
                        }
                        _writePosAttr(e, t) {
                            return void 0 !== t.x && null !== t.x && e.setAttribute("gs-x", String(t.x)), void 0 !== t.y && null !== t.y && e.setAttribute("gs-y", String(t.y)), t.w && e.setAttribute("gs-w", String(t.w)), t.h && e.setAttribute("gs-h", String(t.h)), this
                        }
                        _writeAttr(e, t) {
                            if (!t) return this;
                            this._writePosAttr(e, t);
                            let i = {
                                autoPosition: "gs-auto-position",
                                minW: "gs-min-w",
                                minH: "gs-min-h",
                                maxW: "gs-max-w",
                                maxH: "gs-max-h",
                                noResize: "gs-no-resize",
                                noMove: "gs-no-move",
                                locked: "gs-locked",
                                id: "gs-id",
                                resizeHandles: "gs-resize-handles"
                            };
                            for (const s in i) t[s] ? e.setAttribute(i[s], String(t[s])) : e.removeAttribute(i[s]);
                            return this
                        }
                        _readAttr(e) {
                            let t = {};
                            t.x = r.Utils.toNumber(e.getAttribute("gs-x")), t.y = r.Utils.toNumber(e.getAttribute("gs-y")), t.w = r.Utils.toNumber(e.getAttribute("gs-w")), t.h = r.Utils.toNumber(e.getAttribute("gs-h")), t.maxW = r.Utils.toNumber(e.getAttribute("gs-max-w")), t.minW = r.Utils.toNumber(e.getAttribute("gs-min-w")), t.maxH = r.Utils.toNumber(e.getAttribute("gs-max-h")), t.minH = r.Utils.toNumber(e.getAttribute("gs-min-h")), t.autoPosition = r.Utils.toBool(e.getAttribute("gs-auto-position")), t.noResize = r.Utils.toBool(e.getAttribute("gs-no-resize")), t.noMove = r.Utils.toBool(e.getAttribute("gs-no-move")), t.locked = r.Utils.toBool(e.getAttribute("gs-locked")), t.resizeHandles = e.getAttribute("gs-resize-handles"), t.id = e.getAttribute("gs-id");
                            for (const e in t) {
                                if (!t.hasOwnProperty(e)) return;
                                t[e] || 0 === t[e] || delete t[e]
                            }
                            return t
                        }
                        _setStaticClass() {
                            let e = ["grid-stack-static"];
                            return this.opts.staticGrid ? (this.el.classList.add(...e), this.el.setAttribute("gs-static", "true")) : (this.el.classList.remove(...e), this.el.removeAttribute("gs-static")), this
                        }
                        onParentResize() {
                            if (!this.el || !this.el.clientWidth) return;
                            let e = !1;
                            if (this._autoColumn && this.parentGridItem) this.opts.column !== this.parentGridItem.w && (e = !0, this.column(this.parentGridItem.w, "none"));
                            else {
                                let t = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.oneColumnSize;
                                1 === this.opts.column !== t && (e = !0, this.opts.animate && this.setAnimation(!1), this.column(t ? 1 : this._prevColumn), this.opts.animate && this.setAnimation(!0))
                            }
                            return this._isAutoCellHeight && (!e && this.opts.cellHeightThrottle ? (this._cellHeightThrottle || (this._cellHeightThrottle = r.Utils.throttle((() => this.cellHeight()), this.opts.cellHeightThrottle)), this._cellHeightThrottle()) : this.cellHeight()), this.engine.nodes.forEach((e => {
                                e.subGrid && e.subGrid.onParentResize()
                            })), this
                        }
                        _updateWindowResizeEvent(e = !1) {
                            const t = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.parentGridItem;
                            return e || !t || this._windowResizeBind ? !e && t || !this._windowResizeBind || (window.removeEventListener("resize", this._windowResizeBind), delete this._windowResizeBind) : (this._windowResizeBind = this.onParentResize.bind(this), window.addEventListener("resize", this._windowResizeBind)), this
                        }
                        static getElement(e = ".grid-stack-item") {
                            return r.Utils.getElement(e)
                        }
                        static getElements(e = ".grid-stack-item") {
                            return r.Utils.getElements(e)
                        }
                        static getGridElement(e) {
                            return a.getElement(e)
                        }
                        static getGridElements(e) {
                            return r.Utils.getElements(e)
                        }
                        _initMargin() {
                            let e, t = 0,
                                i = [];
                            return "string" == typeof this.opts.margin && (i = this.opts.margin.split(" ")), 2 === i.length ? (this.opts.marginTop = this.opts.marginBottom = i[0], this.opts.marginLeft = this.opts.marginRight = i[1]) : 4 === i.length ? (this.opts.marginTop = i[0], this.opts.marginRight = i[1], this.opts.marginBottom = i[2], this.opts.marginLeft = i[3]) : (e = r.Utils.parseHeight(this.opts.margin), this.opts.marginUnit = e.unit, t = this.opts.margin = e.h), void 0 === this.opts.marginTop ? this.opts.marginTop = t : (e = r.Utils.parseHeight(this.opts.marginTop), this.opts.marginTop = e.h, delete this.opts.margin), void 0 === this.opts.marginBottom ? this.opts.marginBottom = t : (e = r.Utils.parseHeight(this.opts.marginBottom), this.opts.marginBottom = e.h, delete this.opts.margin), void 0 === this.opts.marginRight ? this.opts.marginRight = t : (e = r.Utils.parseHeight(this.opts.marginRight), this.opts.marginRight = e.h, delete this.opts.margin), void 0 === this.opts.marginLeft ? this.opts.marginLeft = t : (e = r.Utils.parseHeight(this.opts.marginLeft), this.opts.marginLeft = e.h, delete this.opts.margin), this.opts.marginUnit = e.unit, this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight && (this.opts.margin = this.opts.marginTop), this
                        }
                        static setupDragIn(e, t) {}
                        movable(e, t) {
                            return this
                        }
                        resizable(e, t) {
                            return this
                        }
                        disable() {
                            return this
                        }
                        enable() {
                            return this
                        }
                        enableMove(e) {
                            return this
                        }
                        enableResize(e) {
                            return this
                        }
                        _removeDD(e) {
                            return this
                        }
                        _setupAcceptWidget() {
                            return this
                        }
                        _setupRemoveDrop() {
                            return this
                        }
                        _prepareDragDropByNode(e) {
                            return this
                        }
                        _onStartMoving(e, t, i, s, o, n) {}
                        _dragOrResize(e, t, i, s, o, n) {}
                        _leave(e, t) {}
                        commit() {
                            return r.obsolete(this, this.batchUpdate(!1), "commit", "batchUpdate", "5.2"), this
                        }
                    }
                    t.GridStack = a, a.Utils = r.Utils, a.Engine = n.GridStackEngine, a.GDRev = "7.1.1";
                    const h = i(635),
                        d = i(939);
                    o(i(958), t)
                },
                699: (e, t) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.dragInDefaultOptions = t.gridDefaults = void 0, t.gridDefaults = {
                        alwaysShowResizeHandle: "mobile",
                        animate: !0,
                        auto: !0,
                        cellHeight: "auto",
                        cellHeightThrottle: 100,
                        cellHeightUnit: "px",
                        column: 12,
                        draggable: {
                            handle: ".grid-stack-item-content",
                            appendTo: "body"
                        },
                        handle: ".grid-stack-item-content",
                        itemClass: "grid-stack-item",
                        margin: 10,
                        marginUnit: "px",
                        maxRow: 0,
                        minRow: 0,
                        oneColumnSize: 768,
                        placeholderClass: "grid-stack-placeholder",
                        placeholderText: "",
                        removableOptions: {
                            accept: ".grid-stack-item"
                        },
                        resizable: {
                            handles: "se"
                        },
                        rtl: "auto"
                    }, t.dragInDefaultOptions = {
                        handle: ".grid-stack-item-content",
                        appendTo: "body"
                    }
                },
                593: (e, t) => {
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Utils = t.obsoleteAttr = t.obsoleteOptsDel = t.obsoleteOpts = t.obsolete = void 0, t.obsolete = function(e, t, i, s, o) {
                        let n = (...n) => (console.warn("gridstack.js: Function `" + i + "` is deprecated in " + o + " and has been replaced with `" + s + "`. It will be **removed** in a future release"), t.apply(e, n));
                        return n.prototype = t.prototype, n
                    }, t.obsoleteOpts = function(e, t, i, s) {
                        void 0 !== e[t] && (e[i] = e[t], console.warn("gridstack.js: Option `" + t + "` is deprecated in " + s + " and has been replaced with `" + i + "`. It will be **removed** in a future release"))
                    }, t.obsoleteOptsDel = function(e, t, i, s) {
                        void 0 !== e[t] && console.warn("gridstack.js: Option `" + t + "` is deprecated in " + i + s)
                    }, t.obsoleteAttr = function(e, t, i, s) {
                        let o = e.getAttribute(t);
                        null !== o && (e.setAttribute(i, o), console.warn("gridstack.js: attribute `" + t + "`=" + o + " is deprecated on this object in " + s + " and has been replaced with `" + i + "`. It will be **removed** in a future release"))
                    };
                    class i {
                        static getElements(e) {
                            if ("string" == typeof e) {
                                let t = document.querySelectorAll(e);
                                return t.length || "." === e[0] || "#" === e[0] || (t = document.querySelectorAll("." + e), t.length || (t = document.querySelectorAll("#" + e))), Array.from(t)
                            }
                            return [e]
                        }
                        static getElement(e) {
                            if ("string" == typeof e) {
                                if (!e.length) return null;
                                if ("#" === e[0]) return document.getElementById(e.substring(1));
                                if ("." === e[0] || "[" === e[0]) return document.querySelector(e);
                                if (!isNaN(+e[0])) return document.getElementById(e);
                                let t = document.querySelector(e);
                                return t || (t = document.getElementById(e)), t || (t = document.querySelector("." + e)), t
                            }
                            return e
                        }
                        static isIntercepted(e, t) {
                            return !(e.y >= t.y + t.h || e.y + e.h <= t.y || e.x + e.w <= t.x || e.x >= t.x + t.w)
                        }
                        static isTouching(e, t) {
                            return i.isIntercepted(e, {
                                x: t.x - .5,
                                y: t.y - .5,
                                w: t.w + 1,
                                h: t.h + 1
                            })
                        }
                        static areaIntercept(e, t) {
                            let i = e.x > t.x ? e.x : t.x,
                                s = e.x + e.w < t.x + t.w ? e.x + e.w : t.x + t.w;
                            if (s <= i) return 0;
                            let o = e.y > t.y ? e.y : t.y,
                                n = e.y + e.h < t.y + t.h ? e.y + e.h : t.y + t.h;
                            return n <= o ? 0 : (s - i) * (n - o)
                        }
                        static area(e) {
                            return e.w * e.h
                        }
                        static sort(e, t, i) {
                            return i = i || e.reduce(((e, t) => Math.max(t.x + t.w, e)), 0) || 12, -1 === t ? e.sort(((e, t) => t.x + t.y * i - (e.x + e.y * i))) : e.sort(((e, t) => e.x + e.y * i - (t.x + t.y * i)))
                        }
                        static createStylesheet(e, t) {
                            let i = document.createElement("style");
                            return i.setAttribute("type", "text/css"), i.setAttribute("gs-style-id", e), i.styleSheet ? i.styleSheet.cssText = "" : i.appendChild(document.createTextNode("")), t ? t.insertBefore(i, t.firstChild) : (t = document.getElementsByTagName("head")[0]).appendChild(i), i.sheet
                        }
                        static removeStylesheet(e) {
                            let t = document.querySelector("STYLE[gs-style-id=" + e + "]");
                            t && t.parentNode && t.remove()
                        }
                        static addCSSRule(e, t, i) {
                            "function" == typeof e.addRule ? e.addRule(t, i) : "function" == typeof e.insertRule && e.insertRule(`${t}{${i}}`)
                        }
                        static toBool(e) {
                            return "boolean" == typeof e ? e : "string" == typeof e ? !("" === (e = e.toLowerCase()) || "no" === e || "false" === e || "0" === e) : Boolean(e)
                        }
                        static toNumber(e) {
                            return null === e || 0 === e.length ? void 0 : Number(e)
                        }
                        static parseHeight(e) {
                            let t, i = "px";
                            if ("string" == typeof e) {
                                let s = e.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
                                if (!s) throw new Error("Invalid height");
                                i = s[2] || "px", t = parseFloat(s[1])
                            } else t = e;
                            return {
                                h: t,
                                unit: i
                            }
                        }
                        static defaults(e, ...t) {
                            return t.forEach((t => {
                                for (const i in t) {
                                    if (!t.hasOwnProperty(i)) return;
                                    null === e[i] || void 0 === e[i] ? e[i] = t[i] : "object" == typeof t[i] && "object" == typeof e[i] && this.defaults(e[i], t[i])
                                }
                            })), e
                        }
                        static same(e, t) {
                            if ("object" != typeof e) return e == t;
                            if (typeof e != typeof t) return !1;
                            if (Object.keys(e).length !== Object.keys(t).length) return !1;
                            for (const i in e)
                                if (e[i] !== t[i]) return !1;
                            return !0
                        }
                        static copyPos(e, t, i = !1) {
                            return e.x = t.x, e.y = t.y, e.w = t.w, e.h = t.h, i && (t.minW && (e.minW = t.minW), t.minH && (e.minH = t.minH), t.maxW && (e.maxW = t.maxW), t.maxH && (e.maxH = t.maxH)), e
                        }
                        static samePos(e, t) {
                            return e && t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h
                        }
                        static removeInternalAndSame(e, t) {
                            if ("object" == typeof e && "object" == typeof t)
                                for (let i in e) {
                                    let s = e[i];
                                    if ("_" === i[0] || s === t[i]) delete e[i];
                                    else if (s && "object" == typeof s && void 0 !== t[i]) {
                                        for (let e in s) s[e] !== t[i][e] && "_" !== e[0] || delete s[e];
                                        Object.keys(s).length || delete e[i]
                                    }
                                }
                        }
                        static removeInternalForSave(e, t = !0) {
                            for (let t in e) "_" !== t[0] && null !== e[t] && void 0 !== e[t] || delete e[t];
                            delete e.grid, t && delete e.el, e.autoPosition || delete e.autoPosition, e.noResize || delete e.noResize, e.noMove || delete e.noMove, e.locked || delete e.locked, 1 !== e.w && e.w !== e.minW || delete e.w, 1 !== e.h && e.h !== e.minH || delete e.h
                        }
                        static closestUpByClass(e, t) {
                            for (; e;) {
                                if (e.classList.contains(t)) return e;
                                e = e.parentElement
                            }
                            return null
                        }
                        static throttle(e, t) {
                            let i = !1;
                            return (...s) => {
                                i || (i = !0, setTimeout((() => {
                                    e(...s), i = !1
                                }), t))
                            }
                        }
                        static removePositioningStyles(e) {
                            let t = e.style;
                            t.position && t.removeProperty("position"), t.left && t.removeProperty("left"), t.top && t.removeProperty("top"), t.width && t.removeProperty("width"), t.height && t.removeProperty("height")
                        }
                        static getScrollElement(e) {
                            if (!e) return document.scrollingElement || document.documentElement;
                            const t = getComputedStyle(e);
                            return /(auto|scroll)/.test(t.overflow + t.overflowY) ? e : this.getScrollElement(e.parentElement)
                        }
                        static updateScrollPosition(e, t, i) {
                            let s = e.getBoundingClientRect(),
                                o = window.innerHeight || document.documentElement.clientHeight;
                            if (s.top < 0 || s.bottom > o) {
                                let n = s.bottom - o,
                                    r = s.top,
                                    l = this.getScrollElement(e);
                                if (null !== l) {
                                    let a = l.scrollTop;
                                    s.top < 0 && i < 0 ? e.offsetHeight > o ? l.scrollTop += i : l.scrollTop += Math.abs(r) > Math.abs(i) ? i : r : i > 0 && (e.offsetHeight > o ? l.scrollTop += i : l.scrollTop += n > i ? i : n), t.top += l.scrollTop - a
                                }
                            }
                        }
                        static updateScrollResize(e, t, i) {
                            const s = this.getScrollElement(t),
                                o = s.clientHeight,
                                n = s === this.getScrollElement() ? 0 : s.getBoundingClientRect().top,
                                r = e.clientY - n,
                                l = r > o - i;
                            r < i ? s.scrollBy({
                                behavior: "smooth",
                                top: r - i
                            }) : l && s.scrollBy({
                                behavior: "smooth",
                                top: i - (o - r)
                            })
                        }
                        static clone(e) {
                            return null == e || "object" != typeof e ? e : e instanceof Array ? [...e] : Object.assign({}, e)
                        }
                        static cloneDeep(e) {
                            const t = ["parentGrid", "el", "grid", "subGrid", "engine"],
                                s = i.clone(e);
                            for (const o in s) s.hasOwnProperty(o) && "object" == typeof s[o] && "__" !== o.substring(0, 2) && !t.find((e => e === o)) && (s[o] = i.cloneDeep(e[o]));
                            return s
                        }
                        static cloneNode(e) {
                            const t = e.cloneNode(!0);
                            return t.removeAttribute("id"), t
                        }
                        static appendTo(e, t) {
                            let i;
                            i = "string" == typeof t ? document.querySelector(t) : t, i && i.appendChild(e)
                        }
                        static addElStyles(e, t) {
                            if (t instanceof Object)
                                for (const i in t) t.hasOwnProperty(i) && (Array.isArray(t[i]) ? t[i].forEach((t => {
                                    e.style[i] = t
                                })) : e.style[i] = t[i])
                        }
                        static initEvent(e, t) {
                            const i = {
                                    type: t.type
                                },
                                s = {
                                    button: 0,
                                    which: 0,
                                    buttons: 1,
                                    bubbles: !0,
                                    cancelable: !0,
                                    target: t.target ? t.target : e.target
                                };
                            return e.dataTransfer && (i.dataTransfer = e.dataTransfer), ["altKey", "ctrlKey", "metaKey", "shiftKey"].forEach((t => i[t] = e[t])), ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY"].forEach((t => i[t] = e[t])), Object.assign(Object.assign({}, i), s)
                        }
                        static simulateMouseEvent(e, t, i) {
                            const s = document.createEvent("MouseEvents");
                            s.initMouseEvent(t, !0, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, e.target), (i || e.target).dispatchEvent(s)
                        }
                    }
                    t.Utils = i
                }
            },
            t = {},
            i = function i(s) {
                var o = t[s];
                if (void 0 !== o) return o.exports;
                var n = t[s] = {
                    exports: {}
                };
                return e[s].call(n.exports, n, n.exports, i), n.exports
            }(270);
        return i.GridStack
    })()
}));
//# sourceMappingURL=gridstack-all.js.map