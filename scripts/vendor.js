window.Modernizr = function(window, document, undefined) {
        function setCss(str) {
            mStyle.cssText = str
        }

        function setCssAll(str1, str2) {
            return setCss(prefixes.join(str1 + ";") + (str2 || ""))
        }

        function is(obj, type) {
            return typeof obj === type
        }

        function contains(str, substr) {
            return !!~("" + str).indexOf(substr)
        }

        function testProps(props, prefixed) {
            for (var i in props) {
                var prop = props[i];
                if (!contains(prop, "-") && mStyle[prop] !== undefined) return "pfx" != prefixed || prop
            }
            return !1
        }

        function testDOMProps(props, obj, elem) {
            for (var i in props) {
                var item = obj[props[i]];
                if (item !== undefined) return !1 === elem ? props[i] : is(item, "function") ? item.bind(elem || obj) : item
            }
            return !1
        }

        function testPropsAll(prop, prefixed, elem) {
            var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
            return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), testDOMProps(props, prefixed, elem))
        }
        var featureName, hasOwnProp, Modernizr = {},
            docElement = document.documentElement,
            mod = "modernizr",
            modElem = document.createElement(mod),
            mStyle = modElem.style,
            inputElem = document.createElement("input"),
            smile = ":)",
            toString = {}.toString,
            prefixes = " -webkit- -moz- -o- -ms- ".split(" "),
            omPrefixes = "Webkit Moz O ms",
            cssomPrefixes = omPrefixes.split(" "),
            domPrefixes = omPrefixes.toLowerCase().split(" "),
            ns = {
                svg: "http://www.w3.org/2000/svg"
            },
            tests = {},
            inputs = {},
            attrs = {},
            classes = [],
            slice = classes.slice,
            injectElementWithStyles = function(rule, callback, nodes, testnames) {
                var style, ret, node, docOverflow, div = document.createElement("div"),
                    body = document.body,
                    fakeBody = body || document.createElement("body");
                if (parseInt(nodes, 10))
                    for (; nodes--;) node = document.createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
                return style = ["&#173;", '<style id="s', mod, '">', rule, "</style>"].join(""), div.id = mod, (body ? div : fakeBody).innerHTML += style, fakeBody.appendChild(div), body || (fakeBody.style.background = "", fakeBody.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(fakeBody)), ret = callback(div, rule), body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody), docElement.style.overflow = docOverflow), !!ret
            },
            testMediaQuery = function(mq) {
                var matchMedia = window.matchMedia || window.msMatchMedia;
                if (matchMedia) return matchMedia(mq).matches;
                var bool;
                return injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
                    bool = "absolute" == (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).position
                }), bool
            },
            isEventSupported = function() {
                function isEventSupported(eventName, element) {
                    element = element || document.createElement(TAGNAMES[eventName] || "div"), eventName = "on" + eventName;
                    var isSupported = eventName in element;
                    return isSupported || (element.setAttribute || (element = document.createElement("div")), element.setAttribute && element.removeAttribute && (element.setAttribute(eventName, ""), isSupported = is(element[eventName], "function"), is(element[eventName], "undefined") || (element[eventName] = undefined), element.removeAttribute(eventName))), element = null, isSupported
                }
                var TAGNAMES = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return isEventSupported
            }(),
            _hasOwnProperty = {}.hasOwnProperty;
        hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
            return property in object && is(object.constructor.prototype[property], "undefined")
        } : function(object, property) {
            return _hasOwnProperty.call(object, property)
        }, Function.prototype.bind || (Function.prototype.bind = function(that) {
            var target = this;
            if ("function" != typeof target) throw new TypeError;
            var args = slice.call(arguments, 1),
                bound = function() {
                    if (this instanceof bound) {
                        var F = function() {};
                        F.prototype = target.prototype;
                        var self = new F,
                            result = target.apply(self, args.concat(slice.call(arguments)));
                        return Object(result) === result ? result : self
                    }
                    return target.apply(that, args.concat(slice.call(arguments)))
                };
            return bound
        }), tests.flexbox = function() {
            return testPropsAll("flexWrap")
        }, tests.flexboxlegacy = function() {
            return testPropsAll("boxDirection")
        }, tests.canvas = function() {
            var elem = document.createElement("canvas");
            return !(!elem.getContext || !elem.getContext("2d"))
        }, tests.canvastext = function() {
            return !(!Modernizr.canvas || !is(document.createElement("canvas").getContext("2d").fillText, "function"))
        }, tests.webgl = function() {
            return !!window.WebGLRenderingContext
        }, tests.touch = function() {
            var bool;
            return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? bool = !0 : injectElementWithStyles(["@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(node) {
                bool = 9 === node.offsetTop
            }), bool
        }, tests.geolocation = function() {
            return "geolocation" in navigator
        }, tests.postmessage = function() {
            return !!window.postMessage
        }, tests.websqldatabase = function() {
            return !!window.openDatabase
        }, tests.indexedDB = function() {
            return !!testPropsAll("indexedDB", window)
        }, tests.hashchange = function() {
            return isEventSupported("hashchange", window) && (document.documentMode === undefined || document.documentMode > 7)
        }, tests.history = function() {
            return !(!window.history || !history.pushState)
        }, tests.draganddrop = function() {
            var div = document.createElement("div");
            return "draggable" in div || "ondragstart" in div && "ondrop" in div
        }, tests.websockets = function() {
            return "WebSocket" in window || "MozWebSocket" in window
        }, tests.rgba = function() {
            return setCss("background-color:rgba(150,255,150,.5)"), contains(mStyle.backgroundColor, "rgba")
        }, tests.hsla = function() {
            return setCss("background-color:hsla(120,40%,100%,.5)"), contains(mStyle.backgroundColor, "rgba") || contains(mStyle.backgroundColor, "hsla")
        }, tests.multiplebgs = function() {
            return setCss("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(mStyle.background)
        }, tests.backgroundsize = function() {
            return testPropsAll("backgroundSize")
        }, tests.borderimage = function() {
            return testPropsAll("borderImage")
        }, tests.borderradius = function() {
            return testPropsAll("borderRadius")
        }, tests.boxshadow = function() {
            return testPropsAll("boxShadow")
        }, tests.textshadow = function() {
            return "" === document.createElement("div").style.textShadow
        }, tests.opacity = function() {
            return setCssAll("opacity:.55"), /^0.55$/.test(mStyle.opacity)
        }, tests.cssanimations = function() {
            return testPropsAll("animationName")
        }, tests.csscolumns = function() {
            return testPropsAll("columnCount")
        }, tests.cssgradients = function() {
            var str1 = "background-image:";
            return setCss((str1 + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + str1) + prefixes.join("linear-gradient(left top,#9f9, white);" + str1)).slice(0, -str1.length)), contains(mStyle.backgroundImage, "gradient")
        }, tests.cssreflections = function() {
            return testPropsAll("boxReflect")
        }, tests.csstransforms = function() {
            return !!testPropsAll("transform")
        }, tests.csstransforms3d = function() {
            var ret = !!testPropsAll("perspective");
            return ret && "webkitPerspective" in docElement.style && injectElementWithStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(node, rule) {
                ret = 9 === node.offsetLeft && 3 === node.offsetHeight
            }), ret
        }, tests.csstransitions = function() {
            return testPropsAll("transition")
        }, tests.fontface = function() {
            var bool;
            return injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
                var style = document.getElementById("smodernizr"),
                    sheet = style.sheet || style.styleSheet,
                    cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "";
                bool = /src/i.test(cssText) && 0 === cssText.indexOf(rule.split(" ")[0])
            }), bool
        }, tests.generatedcontent = function() {
            var bool;
            return injectElementWithStyles(["#", mod, "{font:0/0 a}#", mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(""), function(node) {
                bool = node.offsetHeight >= 3
            }), bool
        }, tests.video = function() {
            var elem = document.createElement("video"),
                bool = !1;
            try {
                (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (e) {}
            return bool
        }, tests.audio = function() {
            var elem = document.createElement("audio"),
                bool = !1;
            try {
                (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), bool.mp3 = elem.canPlayType("audio/mpeg;").replace(/^no$/, ""), bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), bool.m4a = (elem.canPlayType("audio/x-m4a;") || elem.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (e) {}
            return bool
        }, tests.localstorage = function() {
            try {
                return localStorage.setItem(mod, mod), localStorage.removeItem(mod), !0
            } catch (e) {
                return !1
            }
        }, tests.sessionstorage = function() {
            try {
                return sessionStorage.setItem(mod, mod), sessionStorage.removeItem(mod), !0
            } catch (e) {
                return !1
            }
        }, tests.webworkers = function() {
            return !!window.Worker
        }, tests.applicationcache = function() {
            return !!window.applicationCache
        }, tests.svg = function() {
            return !!document.createElementNS && !!document.createElementNS(ns.svg, "svg").createSVGRect
        }, tests.inlinesvg = function() {
            var div = document.createElement("div");
            return div.innerHTML = "<svg/>", (div.firstChild && div.firstChild.namespaceURI) == ns.svg
        }, tests.smil = function() {
            return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, "animate")))
        }, tests.svgclippaths = function() {
            return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, "clipPath")))
        };
        for (var feature in tests) hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(), Modernizr[featureName] = tests[feature](), classes.push((Modernizr[featureName] ? "" : "no-") + featureName));
        return Modernizr.input || function() {
                Modernizr.input = function(props) {
                    for (var i = 0, len = props.length; i < len; i++) attrs[props[i]] = !!(props[i] in inputElem);
                    return attrs.list && (attrs.list = !(!document.createElement("datalist") || !window.HTMLDataListElement)), attrs
                }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), Modernizr.inputtypes = function(props) {
                    for (var bool, inputElemType, defaultView, i = 0, len = props.length; i < len; i++) inputElem.setAttribute("type", inputElemType = props[i]), bool = "text" !== inputElem.type, bool && (inputElem.value = smile, inputElem.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), defaultView = document.defaultView, bool = defaultView.getComputedStyle && "textfield" !== defaultView.getComputedStyle(inputElem, null).WebkitAppearance && 0 !== inputElem.offsetHeight, docElement.removeChild(inputElem)) : /^(search|tel)$/.test(inputElemType) || (bool = /^(url|email)$/.test(inputElemType) ? inputElem.checkValidity && !1 === inputElem.checkValidity() : inputElem.value != smile)), inputs[props[i]] = !!bool;
                    return inputs
                }("search tel url email datetime date month week time datetime-local number range color".split(" "))
            }(), Modernizr.addTest = function(feature, test) {
                if ("object" == typeof feature)
                    for (var key in feature) hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]);
                else {
                    if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) return Modernizr;
                    test = "function" == typeof test ? test() : test, docElement.className += " " + (test ? "" : "no-") + feature, Modernizr[feature] = test
                }
                return Modernizr
            }, setCss(""), modElem = inputElem = null,
            function(window, document) {
                function addStyleSheet(ownerDocument, cssText) {
                    var p = ownerDocument.createElement("p"),
                        parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                    return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
                }

                function getElements() {
                    var elements = html5.elements;
                    return "string" == typeof elements ? elements.split(" ") : elements
                }

                function getExpandoData(ownerDocument) {
                    var data = expandoData[ownerDocument[expando]];
                    return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
                }

                function createElement(nodeName, ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                    data || (data = getExpandoData(ownerDocument));
                    var node;
                    return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node
                }

                function createDocumentFragment(ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                    data = data || getExpandoData(ownerDocument);
                    for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; i < l; i++) clone.createElement(elems[i]);
                    return clone
                }

                function shivMethods(ownerDocument, data) {
                    data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                        return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                    }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/\w+/g, function(nodeName) {
                        return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                    }) + ");return n}")(html5, data.frag)
                }

                function shivDocument(ownerDocument) {
                    ownerDocument || (ownerDocument = document);
                    var data = getExpandoData(ownerDocument);
                    return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
                }
                var supportsHtml5Styles, supportsUnknownElements, options = window.html5 || {},
                    reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    expando = "_html5shiv",
                    expanID = 0,
                    expandoData = {};
                ! function() {
                    try {
                        var a = document.createElement("a");
                        a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                            document.createElement("a");
                            var frag = document.createDocumentFragment();
                            return void 0 === frag.cloneNode || void 0 === frag.createDocumentFragment || void 0 === frag.createElement
                        }()
                    } catch (e) {
                        supportsHtml5Styles = !0, supportsUnknownElements = !0
                    }
                }();
                var html5 = {
                    elements: options.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: !1 !== options.shivCSS,
                    supportsUnknownElements: supportsUnknownElements,
                    shivMethods: !1 !== options.shivMethods,
                    type: "default",
                    shivDocument: shivDocument,
                    createElement: createElement,
                    createDocumentFragment: createDocumentFragment
                };
                window.html5 = html5, shivDocument(document)
            }(this, document), Modernizr._version = "2.6.3", Modernizr._prefixes = prefixes, Modernizr._domPrefixes = domPrefixes, Modernizr._cssomPrefixes = cssomPrefixes, Modernizr.mq = testMediaQuery, Modernizr.hasEvent = isEventSupported, Modernizr.testProp = function(prop) {
                return testProps([prop])
            }, Modernizr.testAllProps = testPropsAll, Modernizr.testStyles = injectElementWithStyles, Modernizr.prefixed = function(prop, obj, elem) {
                return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx")
            }, docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + classes.join(" "), Modernizr
    }(this, this.document),
    function(window, undefined) {
        function isArraylike(obj) {
            var length = obj.length,
                type = jQuery.type(obj);
            return !jQuery.isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj)))
        }

        function createOptions(options) {
            var object = optionsCache[options] = {};
            return jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
                object[flag] = !0
            }), object
        }

        function internalData(elem, name, data, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, ret, internalKey = jQuery.expando,
                    getByName = "string" == typeof name,
                    isNode = elem.nodeType,
                    cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined) return id || (isNode ? elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++ : id = internalKey), cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), "object" != typeof name && "function" != typeof name || (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? null == (ret = thisCache[name]) && (ret = thisCache[jQuery.camelCase(name)]) : ret = thisCache, ret
            }
        }

        function internalRemoveData(elem, name, pvt) {
            if (jQuery.acceptData(elem)) {
                var i, l, thisCache, isNode = elem.nodeType,
                    cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[jQuery.expando] : jQuery.expando;
                if (cache[id]) {
                    if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                        jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" "));
                        for (i = 0, l = name.length; i < l; i++) delete thisCache[name[i]];
                        if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return
                    }(pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
                }
            }
        }

        function dataAttr(elem, key, data) {
            if (data === undefined && 1 === elem.nodeType) {
                var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
                if ("string" == typeof(data = elem.getAttribute(name))) {
                    try {
                        data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data)
                    } catch (e) {}
                    jQuery.data(elem, key, data)
                } else data = undefined
            }
            return data
        }

        function isEmptyDataObject(obj) {
            var name;
            for (name in obj)
                if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
            return !0
        }

        function returnTrue() {
            return !0
        }

        function returnFalse() {
            return !1
        }

        function sibling(cur, dir) {
            do {
                cur = cur[dir]
            } while (cur && 1 !== cur.nodeType);
            return cur
        }

        function winnow(elements, qualifier, keep) {
            if (qualifier = qualifier || 0, jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) === keep
            });
            if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                return elem === qualifier === keep
            });
            if ("string" == typeof qualifier) {
                var filtered = jQuery.grep(elements, function(elem) {
                    return 1 === elem.nodeType
                });
                if (isSimple.test(qualifier)) return jQuery.filter(qualifier, filtered, !keep);
                qualifier = jQuery.filter(qualifier, filtered)
            }
            return jQuery.grep(elements, function(elem) {
                return jQuery.inArray(elem, qualifier) >= 0 === keep
            })
        }

        function createSafeFragment(document) {
            var list = nodeNames.split("|"),
                safeFrag = document.createDocumentFragment();
            if (safeFrag.createElement)
                for (; list.length;) safeFrag.createElement(list.pop());
            return safeFrag
        }

        function findOrAppend(elem, tag) {
            return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
        }

        function disableScript(elem) {
            var attr = elem.getAttributeNode("type");
            return elem.type = (attr && attr.specified) + "/" + elem.type, elem
        }

        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
        }

        function setGlobalEval(elems, refElements) {
            for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
        }

        function cloneCopyEvent(src, dest) {
            if (1 === dest.nodeType && jQuery.hasData(src)) {
                var type, i, l, oldData = jQuery._data(src),
                    curData = jQuery._data(dest, oldData),
                    events = oldData.events;
                if (events) {
                    delete curData.handle, curData.events = {};
                    for (type in events)
                        for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i])
                }
                curData.data && (curData.data = jQuery.extend({}, curData.data))
            }
        }

        function fixCloneNodeIssues(src, dest) {
            var nodeName, e, data;
            if (1 === dest.nodeType) {
                if (nodeName = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                    data = jQuery._data(dest);
                    for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                    dest.removeAttribute(jQuery.expando)
                }
                "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && manipulation_rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue)
            }
        }

        function getAll(context, tag) {
            var elems, elem, i = 0,
                found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
            if (!found)
                for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
            return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
        }

        function fixDefaultChecked(elem) {
            manipulation_rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
        }

        function vendorPropName(style, name) {
            if (name in style) return name;
            for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
                if ((name = cssPrefixes[i] + capName) in style) return name;
            return origName
        }

        function isHidden(elem, el) {
            return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
        }

        function showHide(elements, show) {
            for (var display, elem, hidden, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
            for (index = 0; index < length; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
            return elements
        }

        function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
        }

        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val
        }

        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
                val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
            if (val <= 0 || null == val) {
                if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), val = parseFloat(val) || 0
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
        }

        function css_defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write("<!doctype html><html><body>"), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
        }

        function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = jQuery.css(elem[0], "display");
            return elem.remove(), display
        }

        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            });
            else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
            else
                for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }

        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
                if (jQuery.isFunction(func))
                    for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
            }
        }

        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
                }), selected
            }
            var inspected = {},
                seekingTransport = structure === transports;
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }

        function ajaxExtend(target, src) {
            var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
            return deep && jQuery.extend(!0, target, deep), target
        }

        function ajaxHandleResponses(s, jqXHR, responses) {
            var firstDataType, ct, finalDataType, type, contents = s.contents,
                dataTypes = s.dataTypes,
                responseFields = s.responseFields;
            for (type in responseFields) type in responses && (jqXHR[responseFields[type]] = responses[type]);
            for (;
                "*" === dataTypes[0];) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
            if (ct)
                for (type in contents)
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break
                    }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0];
            else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break
                    }
                    firstDataType || (firstDataType = type)
                }
                finalDataType = finalDataType || firstDataType
            }
            if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]
        }

        function ajaxConvert(s, response) {
            var conv2, current, conv, tmp, converters = {},
                i = 0,
                dataTypes = s.dataTypes.slice(),
                prev = dataTypes[0];
            if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1])
                for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
            for (; current = dataTypes[++i];)
                if ("*" !== current) {
                    if ("*" !== prev && prev !== current) {
                        if (!(conv = converters[prev + " " + current] || converters["* " + current]))
                            for (conv2 in converters)
                                if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                                    !0 === conv ? conv = converters[conv2] : !0 !== converters[conv2] && (current = tmp[0], dataTypes.splice(i--, 0, current));
                                    break
                                }
                        if (!0 !== conv)
                            if (conv && s.throws) response = conv(response);
                            else try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                    }
                    prev = current
                }
            return {
                state: "success",
                data: response
            }
        }

        function createStandardXHR() {
            try {
                return new window.XMLHttpRequest
            } catch (e) {}
        }

        function createActiveXHR() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function createFxNow() {
            return setTimeout(function() {
                fxNow = undefined
            }), fxNow = jQuery.now()
        }

        function createTweens(animation, props) {
            jQuery.each(props, function(prop, value) {
                for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; index < length; index++)
                    if (collection[index].call(animation, prop, value)) return
            })
        }

        function Animation(elem, properties, options) {
            var result, stopped, index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function() {
                    delete tick.elem
                }),
                tick = function() {
                    if (stopped) return !1;
                    for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
                    return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(!0, {
                        specialEasing: {}
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function(prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        return animation.tweens.push(tween), tween
                    },
                    stop: function(gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) return this;
                        for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                        return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                    }
                }),
                props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); index < length; index++)
                if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
            return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
        }

        function propFilter(props, specialEasing) {
            var value, name, index, easing, hooks;
            for (index in props)
                if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), (hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
                    value = hooks.expand(value), delete props[name];
                    for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
                } else specialEasing[name] = easing
        }

        function defaultPrefilter(elem, props, opts) {
            var prop, index, length, value, dataShow, toggle, tween, hooks, oldfire, anim = this,
                style = elem.style,
                orig = {},
                handled = [],
                hidden = elem.nodeType && isHidden(elem);
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire()
            }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
                })
            })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), opts.overflow && (style.overflow = "hidden",
                jQuery.support.shrinkWrapBlocks || anim.always(function() {
                    style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
                }));
            for (index in props)
                if (value = props[index], rfxtypes.exec(value)) {
                    if (delete props[index], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) continue;
                    handled.push(index)
                }
            if (length = handled.length) {
                dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), "hidden" in dataShow && (hidden = dataShow.hidden), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                    jQuery(elem).hide()
                }), anim.done(function() {
                    var prop;
                    jQuery._removeData(elem, "fxshow");
                    for (prop in orig) jQuery.style(elem, prop, orig[prop])
                });
                for (index = 0; index < length; index++) prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
            }
        }

        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing)
        }

        function genFx(type, includeWidth) {
            var which, attrs = {
                    height: type
                },
                i = 0;
            for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs
        }

        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && (elem.defaultView || elem.parentWindow)
        }
        var readyList, rootjQuery, core_strundefined = typeof undefined,
            document = window.document,
            location = window.location,
            _jQuery = window.jQuery,
            _$ = window.$,
            class2type = {},
            core_deletedIds = [],
            core_concat = core_deletedIds.concat,
            core_push = core_deletedIds.push,
            core_slice = core_deletedIds.slice,
            core_indexOf = core_deletedIds.indexOf,
            core_toString = class2type.toString,
            core_hasOwn = class2type.hasOwnProperty,
            core_trim = "1.9.1".trim,
            jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context, rootjQuery)
            },
            core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            core_rnotwhite = /\S+/g,
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(all, letter) {
                return letter.toUpperCase()
            },
            completed = function(event) {
                (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), jQuery.ready())
            },
            detach = function() {
                document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), window.detachEvent("onload", completed))
            };
        jQuery.fn = jQuery.prototype = {
            jquery: "1.9.1",
            constructor: jQuery,
            init: function(selector, context, rootjQuery) {
                var match, elem;
                if (!selector) return this;
                if ("string" == typeof selector) {
                    if (!(match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector)) || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                    if (match[1]) {
                        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                            for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                        return this
                    }
                    if ((elem = document.getElementById(match[2])) && elem.parentNode) {
                        if (elem.id !== match[2]) return rootjQuery.find(selector);
                        this.length = 1, this[0] = elem
                    }
                    return this.context = document, this.selector = selector, this
                }
                return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
            },
            selector: "",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return core_slice.call(this)
            },
            get: function(num) {
                return null == num ? this.toArray() : num < 0 ? this[this.length + num] : this[num]
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                return ret.prevObject = this, ret.context = this.context, ret
            },
            each: function(callback, args) {
                return jQuery.each(this, callback, args)
            },
            ready: function(fn) {
                return jQuery.ready.promise().done(fn), this
            },
            slice: function() {
                return this.pushStack(core_slice.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(i) {
                var len = this.length,
                    j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: core_push,
            sort: [].sort,
            splice: [].splice
        }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
            var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); i < length; i++)
                if (null != (options = arguments[i]))
                    for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
            return target
        }, jQuery.extend({
            noConflict: function(deep) {
                return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(hold) {
                hold ? jQuery.readyWait++ : jQuery.ready(!0)
            },
            ready: function(wait) {
                if (!0 === wait ? !--jQuery.readyWait : !jQuery.isReady) {
                    if (!document.body) return setTimeout(jQuery.ready);
                    jQuery.isReady = !0, !0 !== wait && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"))
                }
            },
            isFunction: function(obj) {
                return "function" === jQuery.type(obj)
            },
            isArray: Array.isArray || function(obj) {
                return "array" === jQuery.type(obj)
            },
            isWindow: function(obj) {
                return null != obj && obj == obj.window
            },
            isNumeric: function(obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj)
            },
            type: function(obj) {
                return null == obj ? String(obj) : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj
            },
            isPlainObject: function(obj) {
                if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
                try {
                    if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1
                } catch (e) {
                    return !1
                }
                var key;
                for (key in obj);
                return key === undefined || core_hasOwn.call(obj, key)
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) return !1;
                return !0
            },
            error: function(msg) {
                throw new Error(msg)
            },
            parseHTML: function(data, context, keepScripts) {
                if (!data || "string" != typeof data) return null;
                "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
                var parsed = rsingleTag.exec(data),
                    scripts = !keepScripts && [];
                return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
            },
            parseJSON: function(data) {
                return window.JSON && window.JSON.parse ? window.JSON.parse(data) : null === data ? data : "string" == typeof data && (data = jQuery.trim(data)) && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)
            },
            parseXML: function(data) {
                var xml, tmp;
                if (!data || "string" != typeof data) return null;
                try {
                    window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
                } catch (e) {
                    xml = undefined
                }
                return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml
            },
            noop: function() {},
            globalEval: function(data) {
                data && jQuery.trim(data) && (window.execScript || function(data) {
                    window.eval.call(window, data)
                })(data)
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
            },
            each: function(obj, callback, args) {
                var i = 0,
                    length = obj.length,
                    isArray = isArraylike(obj);
                if (args) {
                    if (isArray)
                        for (; i < length && !1 !== callback.apply(obj[i], args); i++);
                    else
                        for (i in obj)
                            if (!1 === callback.apply(obj[i], args)) break
                } else if (isArray)
                    for (; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++);
                else
                    for (i in obj)
                        if (!1 === callback.call(obj[i], i, obj[i])) break;
                return obj
            },
            trim: core_trim && !core_trim.call("\ufeff ") ? function(text) {
                return null == text ? "" : core_trim.call(text)
            } : function(text) {
                return null == text ? "" : (text + "").replace(rtrim, "")
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : core_push.call(ret, arr)), ret
            },
            inArray: function(elem, arr, i) {
                var len;
                if (arr) {
                    if (core_indexOf) return core_indexOf.call(arr, elem, i);
                    for (len = arr.length, i = i ? i < 0 ? Math.max(0, len + i) : i : 0; i < len; i++)
                        if (i in arr && arr[i] === elem) return i
                }
                return -1
            },
            merge: function(first, second) {
                var l = second.length,
                    i = first.length,
                    j = 0;
                if ("number" == typeof l)
                    for (; j < l; j++) first[i++] = second[j];
                else
                    for (; second[j] !== undefined;) first[i++] = second[j++];
                return first.length = i, first
            },
            grep: function(elems, callback, inv) {
                var retVal, ret = [],
                    i = 0,
                    length = elems.length;
                for (inv = !!inv; i < length; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
                return ret
            },
            map: function(elems, callback, arg) {
                var value, i = 0,
                    length = elems.length,
                    isArray = isArraylike(elems),
                    ret = [];
                if (isArray)
                    for (; i < length; i++) null != (value = callback(elems[i], i, arg)) && (ret[ret.length] = value);
                else
                    for (i in elems) null != (value = callback(elems[i], i, arg)) && (ret[ret.length] = value);
                return core_concat.apply([], ret)
            },
            guid: 1,
            proxy: function(fn, context) {
                var args, proxy, tmp;
                return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                    return fn.apply(context || this, args.concat(core_slice.call(arguments)))
                }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined
            },
            access: function(elems, fn, key, value, chainable, emptyGet, raw) {
                var i = 0,
                    length = elems.length,
                    bulk = null == key;
                if ("object" === jQuery.type(key)) {
                    chainable = !0;
                    for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
                } else if (value !== undefined && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value)
                    })), fn))
                    for (; i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
            },
            now: function() {
                return (new Date).getTime()
            }
        }), jQuery.ready.promise = function(obj) {
            if (!readyList)
                if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready);
                else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1);
            else {
                document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
                var top = !1;
                try {
                    top = null == window.frameElement && document.documentElement
                } catch (e) {}
                top && top.doScroll && function doScrollCheck() {
                    if (!jQuery.isReady) {
                        try {
                            top.doScroll("left")
                        } catch (e) {
                            return setTimeout(doScrollCheck, 50)
                        }
                        detach(), jQuery.ready()
                    }
                }()
            }
            return readyList.promise(obj)
        }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        }), rootjQuery = jQuery(document);
        var optionsCache = {};
        jQuery.Callbacks = function(options) {
            options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
            var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
                stack = !options.once && [],
                fire = function(data) {
                    for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingIndex < firingLength; firingIndex++)
                        if (!1 === list[firingIndex].apply(data[0], data[1]) && options.stopOnFalse) {
                            memory = !1;
                            break
                        }
                    firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
                },
                self = {
                    add: function() {
                        if (list) {
                            var start = list.length;
                            ! function add(args) {
                                jQuery.each(args, function(_, arg) {
                                    var type = jQuery.type(arg);
                                    "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                                })
                            }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                        }
                        return this
                    },
                    remove: function() {
                        return list && jQuery.each(arguments, function(_, arg) {
                            for (var index;
                                (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (index <= firingLength && firingLength--, index <= firingIndex && firingIndex--)
                        }), this
                    },
                    has: function(fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
                    },
                    empty: function() {
                        return list = [], this
                    },
                    disable: function() {
                        return list = stack = memory = undefined, this
                    },
                    disabled: function() {
                        return !list
                    },
                    lock: function() {
                        return stack = undefined, memory || self.disable(), this
                    },
                    locked: function() {
                        return !stack
                    },
                    fireWith: function(context, args) {
                        return args = args || [], args = [context, args.slice ? args.slice() : args], !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this
                    },
                    fire: function() {
                        return self.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!fired
                    }
                };
            return self
        }, jQuery.extend({
            Deferred: function(func) {
                var tuples = [
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    state = "pending",
                    promise = {
                        state: function() {
                            return state
                        },
                        always: function() {
                            return deferred.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var fns = arguments;
                            return jQuery.Deferred(function(newDefer) {
                                jQuery.each(tuples, function(i, tuple) {
                                    var action = tuple[0],
                                        fn = jQuery.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function() {
                                        var returned = fn && fn.apply(this, arguments);
                                        returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                    })
                                }), fns = null
                            }).promise()
                        },
                        promise: function(obj) {
                            return null != obj ? jQuery.extend(obj, promise) : promise
                        }
                    },
                    deferred = {};
                return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add, stateString && list.add(function() {
                        state = stateString
                    }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                    }, deferred[tuple[0] + "With"] = list.fireWith
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
            },
            when: function(subordinate) {
                var progressValues, progressContexts, resolveContexts, i = 0,
                    resolveValues = core_slice.call(arguments),
                    length = resolveValues.length,
                    remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                    deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                    updateFunc = function(i, contexts, values) {
                        return function(value) {
                            contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                        }
                    };
                if (length > 1)
                    for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); i < length; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
                return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
            }
        }), jQuery.support = function() {
            var support, all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
            if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], !all || !a || !all.length) return {};
            select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", support = {
                getSetAttribute: "t" !== div.className,
                leadingWhitespace: 3 === div.firstChild.nodeType,
                tbody: !div.getElementsByTagName("tbody").length,
                htmlSerialize: !!div.getElementsByTagName("link").length,
                style: /top/.test(a.getAttribute("style")),
                hrefNormalized: "/a" === a.getAttribute("href"),
                opacity: /^0.5/.test(a.style.opacity),
                cssFloat: !!a.style.cssFloat,
                checkOn: !!input.value,
                optSelected: opt.selected,
                enctype: !!document.createElement("form").enctype,
                html5Clone: "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
                boxModel: "CSS1Compat" === document.compatMode,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, support.optDisabled = !opt.disabled;
            try {
                delete div.test
            } catch (e) {
                support.deleteExpando = !1
            }
            input = document.createElement("input"), input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, input.setAttribute("checked", "t"), input.setAttribute("name", "t"), fragment = document.createDocumentFragment(), fragment.appendChild(input), support.appendChecked = input.checked, support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, div.attachEvent && (div.attachEvent("onclick", function() {
                support.noCloneEvent = !1
            }), div.cloneNode(!0).click());
            for (i in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) div.setAttribute(eventName = "on" + i, "t"), support[i + "Bubbles"] = eventName in window || !1 === div.attributes[eventName].expando;
            return div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, jQuery(function() {
                var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    body = document.getElementsByTagName("body")[0];
                body && (container = document.createElement("div"), container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", body.appendChild(container).appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width, marginDiv = div.appendChild(document.createElement("div")), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), typeof div.style.zoom !== core_strundefined && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, support.inlineBlockNeedsLayout && (body.style.zoom = 1)), body.removeChild(container), container = div = tds = marginDiv = null)
            }), all = select = fragment = opt = a = input = null, support
        }();
        var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            rmultiDash = /([A-Z])/g;
        jQuery.extend({
            cache: {},
            expando: "jQuery" + ("1.9.1" + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(elem) {
                return !!(elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando]) && !isEmptyDataObject(elem)
            },
            data: function(elem, name, data) {
                return internalData(elem, name, data)
            },
            removeData: function(elem, name) {
                return internalRemoveData(elem, name)
            },
            _data: function(elem, name, data) {
                return internalData(elem, name, data, !0)
            },
            _removeData: function(elem, name) {
                return internalRemoveData(elem, name, !0)
            },
            acceptData: function(elem) {
                if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) return !1;
                var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
                return !noData || !0 !== noData && elem.getAttribute("classid") === noData
            }
        }), jQuery.fn.extend({
            data: function(key, value) {
                var attrs, name, elem = this[0],
                    i = 0,
                    data = null;
                if (key === undefined) {
                    if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                        for (attrs = elem.attributes; i < attrs.length; i++) name = attrs[i].name, name.indexOf("data-") || (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name]));
                        jQuery._data(elem, "parsedAttrs", !0)
                    }
                    return data
                }
                return "object" == typeof key ? this.each(function() {
                    jQuery.data(this, key)
                }) : jQuery.access(this, function(value) {
                    if (value === undefined) return elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
                    this.each(function() {
                        jQuery.data(this, key, value)
                    })
                }, null, value, arguments.length > 1, null, !0)
            },
            removeData: function(key) {
                return this.each(function() {
                    jQuery.removeData(this, key)
                })
            }
        }), jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                if (elem) return type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function() {
                        jQuery.dequeue(elem, type)
                    };
                "inprogress" === fn && (fn = queue.shift(), startLength--), hooks.cur = fn, fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return jQuery._data(elem, key) || jQuery._data(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key)
                    })
                })
            }
        }), jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
                })
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type)
                })
            },
            delay: function(time, type) {
                return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                    var timeout = setTimeout(next, time);
                    hooks.stop = function() {
                        clearTimeout(timeout)
                    }
                })
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", [])
            },
            promise: function(type, obj) {
                var tmp, count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function() {
                        --count || defer.resolveWith(elements, [elements])
                    };
                for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--;)(tmp = jQuery._data(elements[i], type + "queueHooks")) && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj)
            }
        });
        var nodeHook, boolHook, rclass = /[\t\r\n]/g,
            rreturn = /\r/g,
            rfocusable = /^(?:input|select|textarea|button|object)$/i,
            rclickable = /^(?:a|area)$/i,
            rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
            ruseDefault = /^(?:checked|selected)$/i,
            getSetAttribute = jQuery.support.getSetAttribute,
            getSetInput = jQuery.support.input;
        jQuery.fn.extend({
            attr: function(name, value) {
                return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name)
                })
            },
            prop: function(name, value) {
                return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
            },
            removeProp: function(name) {
                return name = jQuery.propFix[name] || name, this.each(function() {
                    try {
                        this[name] = undefined, delete this[name]
                    } catch (e) {}
                })
            },
            addClass: function(value) {
                var classes, elem, cur, clazz, j, i = 0,
                    len = this.length,
                    proceed = "string" == typeof value && value;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                });
                if (proceed)
                    for (classes = (value || "").match(core_rnotwhite) || []; i < len; i++)
                        if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                            for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                            elem.className = jQuery.trim(cur)
                        }
                return this
            },
            removeClass: function(value) {
                var classes, elem, cur, clazz, j, i = 0,
                    len = this.length,
                    proceed = 0 === arguments.length || "string" == typeof value && value;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                });
                if (proceed)
                    for (classes = (value || "").match(core_rnotwhite) || []; i < len; i++)
                        if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                            for (j = 0; clazz = classes[j++];)
                                for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                            elem.className = value ? jQuery.trim(cur) : ""
                        }
                return this
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value,
                    isBool = "boolean" == typeof stateVal;
                return jQuery.isFunction(value) ? this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                }) : this.each(function() {
                    if ("string" === type)
                        for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.match(core_rnotwhite) || []; className = classNames[i++];) state = isBool ? state : !self.hasClass(className), self[state ? "addClass" : "removeClass"](className);
                    else type !== core_strundefined && "boolean" !== type || (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || !1 === value ? "" : jQuery._data(this, "__className__") || "")
                })
            },
            hasClass: function(selector) {
                for (var className = " " + selector + " ", i = 0, l = this.length; i < l; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
                return !1
            },
            val: function(value) {
                var ret, hooks, isFunction, elem = this[0]; {
                    if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val, self = jQuery(this);
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + ""
                        })), (hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
                    });
                    if (elem) return (hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]) && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = elem.attributes.value;
                        return !val || val.specified ? elem.value : elem.text
                    }
                },
                select: {
                    get: function(elem) {
                        for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++)
                            if (option = options[i], (option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                if (value = jQuery(option).val(), one) return value;
                                values.push(value)
                            }
                        return values
                    },
                    set: function(elem, value) {
                        var values = jQuery.makeArray(value);
                        return jQuery(elem).find("option").each(function() {
                            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                        }), values.length || (elem.selectedIndex = -1), values
                    }
                }
            },
            attr: function(elem, name, value) {
                var hooks, notxml, ret, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === core_strundefined ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), value === undefined ? hooks && notxml && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (typeof elem.getAttribute !== core_strundefined && (ret = elem.getAttribute(name)), null == ret ? undefined : ret) : null !== value ? hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
            },
            removeAttr: function(elem, value) {
                var name, propName, i = 0,
                    attrNames = value && value.match(core_rnotwhite);
                if (attrNames && 1 === elem.nodeType)
                    for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, rboolean.test(name) ? !getSetAttribute && ruseDefault.test(name) ? elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : elem[propName] = !1 : jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName)
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value
                        }
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                for: "htmlFor",
                class: "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(elem, name, value) {
                var ret, hooks, notxml, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var attributeNode = elem.getAttributeNode("tabindex");
                        return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                    }
                }
            }
        }), boolHook = {
            get: function(elem, name) {
                var prop = jQuery.prop(elem, name),
                    attr = "boolean" == typeof prop && elem.getAttribute(name),
                    detail = "boolean" == typeof prop ? getSetInput && getSetAttribute ? null != attr : ruseDefault.test(name) ? elem[jQuery.camelCase("default-" + name)] : !!attr : elem.getAttributeNode(name);
                return detail && !1 !== detail.value ? name.toLowerCase() : undefined
            },
            set: function(elem, value, name) {
                return !1 === value ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, name
            }
        }, getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                return jQuery.nodeName(elem, "input") ? elem.defaultValue : ret && ret.specified ? ret.value : undefined
            },
            set: function(elem, value, name) {
                if (!jQuery.nodeName(elem, "input")) return nodeHook && nodeHook.set(elem, value, name);
                elem.defaultValue = value
            }
        }), getSetAttribute || (nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                return ret && ("id" === name || "name" === name || "coords" === name ? "" !== ret.value : ret.specified) ? ret.value : undefined
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : undefined
            }
        }, jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                nodeHook.set(elem, "" !== value && value, name)
            }
        }, jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if ("" === value) return elem.setAttribute(name, "auto"), value
                }
            })
        })), jQuery.support.hrefNormalized || (jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return null == ret ? undefined : ret
                }
            })
        }), jQuery.each(["href", "src"], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4)
                }
            }
        })), jQuery.support.style || (jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText || undefined
            },
            set: function(elem, value) {
                return elem.style.cssText = value + ""
            }
        }), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null
            }
        })), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.support.checkOn || jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return null === elem.getAttribute("value") ? "on" : elem.value
                }
            }
        }), jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
                set: function(elem, value) {
                    if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0
                }
            })
        });
        var rformElems = /^(?:input|select|textarea)$/i,
            rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
        jQuery.event = {
                global: {},
                add: function(elem, types, handler, data, selector) {
                    var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
                    if (elemData) {
                        for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                                return typeof jQuery === core_strundefined || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                            }, eventHandle.elem = elem), types = (types || "").match(core_rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                            type: type,
                            origType: origType,
                            data: data,
                            handler: handler,
                            guid: handler.guid,
                            selector: selector,
                            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                            namespace: namespaces.join(".")
                        }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && !1 !== special.setup.call(elem, data, namespaces, eventHandle) || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0;
                        elem = null
                    }
                },
                remove: function(elem, types, handler, selector, mappedTypes) {
                    var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
                    if (elemData && (events = elemData.events)) {
                        for (types = (types || "").match(core_rnotwhite) || [""], t = types.length; t--;)
                            if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                                for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                                origCount && !handlers.length && (special.teardown && !1 !== special.teardown.call(elem, namespaces, elemData.handle) || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                            } else
                                for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                        jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"))
                    }
                },
                trigger: function(event, data, elem, onlyHandlers) {
                    var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                        type = core_hasOwn.call(event, "type") ? event.type : event,
                        namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                    if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = !0, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = undefined, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || !1 !== special.trigger.apply(elem, data))) {
                        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                            for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                            tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                        }
                        for (i = 0;
                            (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), handle && handle.apply(cur, data), (handle = ontype && cur[ontype]) && jQuery.acceptData(cur) && handle.apply && !1 === handle.apply(cur, data) && event.preventDefault();
                        if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || !1 === special._default.apply(elem.ownerDocument, data)) && ("click" !== type || !jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                            tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                            try {
                                elem[type]()
                            } catch (e) {}
                            jQuery.event.triggered = undefined, tmp && (elem[ontype] = tmp)
                        }
                        return event.result
                    }
                },
                dispatch: function(event) {
                    event = jQuery.event.fix(event);
                    var i, ret, handleObj, matched, j, handlerQueue = [],
                        args = core_slice.call(arguments),
                        handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                        special = jQuery.event.special[event.type] || {};
                    if (args[0] = event, event.delegateTarget = this, !special.preDispatch || !1 !== special.preDispatch.call(this, event)) {
                        for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                            (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                            for (event.currentTarget = matched.elem, j = 0;
                                (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) event.namespace_re && !event.namespace_re.test(handleObj.namespace) || (event.handleObj = handleObj, event.data = handleObj.data, (ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args)) !== undefined && !1 === (event.result = ret) && (event.preventDefault(), event.stopPropagation()));
                        return special.postDispatch && special.postDispatch.call(this, event), event.result
                    }
                },
                handlers: function(event, handlers) {
                    var sel, handleObj, matches, i, handlerQueue = [],
                        delegateCount = handlers.delegateCount,
                        cur = event.target;
                    if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                        for (; cur != this; cur = cur.parentNode || this)
                            if (1 === cur.nodeType && (!0 !== cur.disabled || "click" !== event.type)) {
                                for (matches = [], i = 0; i < delegateCount; i++) handleObj = handlers[i], sel = handleObj.selector + " ", matches[sel] === undefined && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                                matches.length && handlerQueue.push({
                                    elem: cur,
                                    handlers: matches
                                })
                            }
                    return delegateCount < handlers.length && handlerQueue.push({
                        elem: this,
                        handlers: handlers.slice(delegateCount)
                    }), handlerQueue
                },
                fix: function(event) {
                    if (event[jQuery.expando]) return event;
                    var i, prop, copy, type = event.type,
                        originalEvent = event,
                        fixHook = this.fixHooks[type];
                    for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                    return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(event, original) {
                        return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(event, original) {
                        var body, eventDoc, doc, button = original.button,
                            fromElement = original.fromElement;
                        return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        trigger: function() {
                            if (jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                        }
                    },
                    focus: {
                        trigger: function() {
                            if (this !== document.activeElement && this.focus) try {
                                return this.focus(), !1
                            } catch (e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === document.activeElement && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        postDispatch: function(event) {
                            event.result !== undefined && (event.originalEvent.returnValue = event.result)
                        }
                    }
                },
                simulate: function(type, elem, event, bubble) {
                    var e = jQuery.extend(new jQuery.Event, event, {
                        type: type,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
                }
            }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
                elem.removeEventListener && elem.removeEventListener(type, handle, !1)
            } : function(elem, type, handle) {
                var name = "on" + type;
                elem.detachEvent && (typeof elem[name] === core_strundefined && (elem[name] = null), elem.detachEvent(name, handle))
            }, jQuery.Event = function(src, props) {
                if (!(this instanceof jQuery.Event)) return new jQuery.Event(src, props);
                src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || !1 === src.returnValue || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), this[jQuery.expando] = !0
            }, jQuery.Event.prototype = {
                isDefaultPrevented: returnFalse,
                isPropagationStopped: returnFalse,
                isImmediatePropagationStopped: returnFalse,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
                }
            }, jQuery.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(orig, fix) {
                jQuery.event.special[orig] = {
                    delegateType: fix,
                    bindType: fix,
                    handle: function(event) {
                        var ret, target = this,
                            related = event.relatedTarget,
                            handleObj = event.handleObj;
                        return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
                    }
                }
            }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
                setup: function() {
                    if (jQuery.nodeName(this, "form")) return !1;
                    jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                        var elem = e.target,
                            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                        form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = !0
                        }), jQuery._data(form, "submitBubbles", !0))
                    })
                },
                postDispatch: function(event) {
                    event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
                },
                teardown: function() {
                    if (jQuery.nodeName(this, "form")) return !1;
                    jQuery.event.remove(this, "._submit")
                }
            }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
                setup: function() {
                    if (rformElems.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (jQuery.event.add(this, "propertychange._change", function(event) {
                        "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
                    }), jQuery.event.add(this, "click._change", function(event) {
                        this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0)
                    })), !1;
                    jQuery.event.add(this, "beforeactivate._change", function(e) {
                        var elem = e.target;
                        rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                            !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                        }), jQuery._data(elem, "changeBubbles", !0))
                    })
                },
                handle: function(event) {
                    var elem = event.target;
                    if (this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type) return event.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName)
                }
            }), jQuery.support.focusinBubbles || jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, function(orig, fix) {
                var attaches = 0,
                    handler = function(event) {
                        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
                    };
                jQuery.event.special[fix] = {
                    setup: function() {
                        0 == attaches++ && document.addEventListener(orig, handler, !0)
                    },
                    teardown: function() {
                        0 == --attaches && document.removeEventListener(orig, handler, !0)
                    }
                }
            }), jQuery.fn.extend({
                on: function(types, selector, data, fn, one) {
                    var type, origFn;
                    if ("object" == typeof types) {
                        "string" != typeof selector && (data = data || selector, selector = undefined);
                        for (type in types) this.on(type, selector, data, types[type], one);
                        return this
                    }
                    if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), !1 === fn) fn = returnFalse;
                    else if (!fn) return this;
                    return 1 === one && (origFn = fn, fn = function(event) {
                        return jQuery().off(event), origFn.apply(this, arguments)
                    }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                        jQuery.event.add(this, types, fn, data, selector)
                    })
                },
                one: function(types, selector, data, fn) {
                    return this.on(types, selector, data, fn, 1)
                },
                off: function(types, selector, fn) {
                    var handleObj, type;
                    if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                    if ("object" == typeof types) {
                        for (type in types) this.off(type, selector, types[type]);
                        return this
                    }
                    return !1 !== selector && "function" != typeof selector || (fn = selector, selector = undefined), !1 === fn && (fn = returnFalse), this.each(function() {
                        jQuery.event.remove(this, types, fn, selector)
                    })
                },
                bind: function(types, data, fn) {
                    return this.on(types, null, data, fn)
                },
                unbind: function(types, fn) {
                    return this.off(types, null, fn)
                },
                delegate: function(selector, types, data, fn) {
                    return this.on(types, selector, data, fn)
                },
                undelegate: function(selector, types, fn) {
                    return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
                },
                trigger: function(type, data) {
                    return this.each(function() {
                        jQuery.event.trigger(type, data, this)
                    })
                },
                triggerHandler: function(type, data) {
                    var elem = this[0];
                    if (elem) return jQuery.event.trigger(type, data, elem, !0)
                }
            }),
            function(window, undefined) {
                function isNative(fn) {
                    return rnative.test(fn + "")
                }

                function createCache() {
                    var cache, keys = [];
                    return cache = function(key, value) {
                        return keys.push(key += " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value
                    }
                }

                function markFunction(fn) {
                    return fn[expando] = !0, fn
                }

                function assert(fn) {
                    var div = document.createElement("div");
                    try {
                        return fn(div)
                    } catch (e) {
                        return !1
                    } finally {
                        div = null
                    }
                }

                function Sizzle(selector, context, results, seed) {
                    var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
                    if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
                    if (!documentIsXML && !seed) {
                        if (match = rquickExpr.exec(selector))
                            if (m = match[1]) {
                                if (9 === nodeType) {
                                    if (!(elem = context.getElementById(m)) || !elem.parentNode) return results;
                                    if (elem.id === m) return results.push(elem), results
                                } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                            } else {
                                if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), results;
                                if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), results
                            }
                        if (support.qsa && !rbuggyQSA.test(selector)) {
                            if (old = !0, nid = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                                for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                                newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",")
                            }
                            if (newSelector) try {
                                return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), results
                            } catch (qsaError) {} finally {
                                old || context.removeAttribute("id")
                            }
                        }
                    }
                    return select(selector.replace(rtrim, "$1"), context, results, seed)
                }

                function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                    if (diff) return diff;
                    if (cur)
                        for (; cur = cur.nextSibling;)
                            if (cur === b) return -1;
                    return a ? 1 : -1
                }

                function createPositionalPseudo(fn) {
                    return markFunction(function(argument) {
                        return argument = +argument, markFunction(function(seed, matches) {
                            for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                        })
                    })
                }

                function tokenize(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                    if (cached) return parseOnly ? 0 : cached.slice(0);
                    for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                        matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        }), soFar = soFar.slice(matched.length));
                        for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        }), soFar = soFar.slice(matched.length));
                        if (!matched) break
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
                }

                function toSelector(tokens) {
                    for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
                    return selector
                }

                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && "parentNode" === dir,
                        doneName = done++;
                    return combinator.first ? function(elem, context, xml) {
                        for (; elem = elem[dir];)
                            if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                    } : function(elem, context, xml) {
                        var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                        if (xml) {
                            for (; elem = elem[dir];)
                                if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                        } else
                            for (; elem = elem[dir];)
                                if (1 === elem.nodeType || checkNonElements)
                                    if (outerCache = elem[expando] || (elem[expando] = {}), (cache = outerCache[dir]) && cache[0] === dirkey) {
                                        if (!0 === (data = cache[1]) || data === cachedruns) return !0 === data
                                    } else if (cache = outerCache[dir] = [dirkey], cache[1] = matcher(elem, context, xml) || cachedruns, !0 === cache[1]) return !0
                    }
                }

                function elementMatcher(matchers) {
                    return matchers.length > 1 ? function(elem, context, xml) {
                        for (var i = matchers.length; i--;)
                            if (!matchers[i](elem, context, xml)) return !1;
                        return !0
                    } : matchers[0]
                }

                function condense(unmatched, map, filter, context, xml) {
                    for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++)(elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), mapped && map.push(i)));
                    return newUnmatched
                }

                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                        var temp, i, elem, preMap = [],
                            postMap = [],
                            preexisting = results.length,
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                            matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                            for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                    postFinder(null, matcherOut = [], temp, xml)
                                }
                                for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                            }
                        } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                    })
                }

                function matcherFromTokens(tokens) {
                    for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                            return elem === checkContext
                        }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                            return indexOf.call(checkContext, elem) > -1
                        }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                        }]; i < len; i++)
                        if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        else {
                            if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                                for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++);
                                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens))
                            }
                            matchers.push(matcher)
                        }
                    return elementMatcher(matchers)
                }

                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var matcherCachedRuns = 0,
                        bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        superMatcher = function(seed, context, xml, results, expandContext) {
                            var elem, j, matcher, setMatched = [],
                                matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                outermost = null != expandContext,
                                contextBackup = outermostContext,
                                elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
                                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                            for (outermost && (outermostContext = context !== document && context, cachedruns = matcherCachedRuns); null != (elem = elems[i]); i++) {
                                if (byElement && elem) {
                                    for (j = 0; matcher = elementMatchers[j++];)
                                        if (matcher(elem, context, xml)) {
                                            results.push(elem);
                                            break
                                        }
                                    outermost && (dirruns = dirrunsUnique, cachedruns = ++matcherCachedRuns)
                                }
                                bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                            }
                            if (matchedCount += i, bySet && i !== matchedCount) {
                                for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                                if (seed) {
                                    if (matchedCount > 0)
                                        for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                    setMatched = condense(setMatched)
                                }
                                push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                            }
                            return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                        };
                    return bySet ? markFunction(superMatcher) : superMatcher
                }

                function multipleContexts(selector, contexts, results) {
                    for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
                    return results
                }

                function select(selector, context, results, seed) {
                    var i, tokens, token, type, find, match = tokenize(selector);
                    if (!seed && 1 === match.length) {
                        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !documentIsXML && Expr.relative[tokens[1].type]) {
                            if (!(context = Expr.find.ID(token.matches[0].replace(runescape, funescape), context)[0])) return results;
                            selector = selector.slice(tokens.shift().value.length)
                        }
                        for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                            if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                                if (tokens.splice(i, 1), !(selector = seed.length && toSelector(tokens))) return push.apply(results, slice.call(seed, 0)), results;
                                break
                            }
                    }
                    return compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector)), results
                }

                function setFilters() {}
                var i, cachedruns, Expr, getText, isXML, compile, hasDuplicate, outermostContext, setDocument, document, docElem, documentIsXML, rbuggyQSA, rbuggyMatches, matches, contains, sortOrder, expando = "sizzle" + -new Date,
                    preferredDoc = window.document,
                    support = {},
                    dirruns = 0,
                    done = 0,
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),
                    MAX_NEGATIVE = 1 << 31,
                    arr = [],
                    pop = arr.pop,
                    push = arr.push,
                    slice = arr.slice,
                    indexOf = arr.indexOf || function(elem) {
                        for (var i = 0, len = this.length; i < len; i++)
                            if (this[i] === elem) return i;
                        return -1
                    },
                    whitespace = "[\\x20\\t\\r\\n\\f]",
                    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    identifier = characterEncoding.replace("w", "w#"),
                    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
                    pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                    rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
                    rpseudo = new RegExp(pseudos),
                    ridentifier = new RegExp("^" + identifier + "$"),
                    matchExpr = {
                        ID: new RegExp("^#(" + characterEncoding + ")"),
                        CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                        NAME: new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                        TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + attributes),
                        PSEUDO: new RegExp("^" + pseudos),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                    },
                    rsibling = /[\x20\t\r\n\f]*[+~]/,
                    rnative = /^[^{]+\{\s*\[native code/,
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    rinputs = /^(?:input|select|textarea|button)$/i,
                    rheader = /^h\d$/i,
                    rescape = /'|\\/g,
                    rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                    funescape = function(_, escaped) {
                        var high = "0x" + escaped - 65536;
                        return high !== high ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                    };
                try {
                    slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType
                } catch (e) {
                    slice = function(i) {
                        for (var elem, results = []; elem = this[i++];) results.push(elem);
                        return results
                    }
                }
                isXML = Sizzle.isXML = function(elem) {
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return !!documentElement && "HTML" !== documentElement.nodeName
                }, setDocument = Sizzle.setDocument = function(node) {
                    var doc = node ? node.ownerDocument || node : preferredDoc;
                    return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsXML = isXML(doc), support.tagNameNoComments = assert(function(div) {
                        return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length
                    }), support.attributes = assert(function(div) {
                        div.innerHTML = "<select></select>";
                        var type = typeof div.lastChild.getAttribute("multiple");
                        return "boolean" !== type && "string" !== type
                    }), support.getByClassName = assert(function(div) {
                        return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!div.getElementsByClassName || !div.getElementsByClassName("e").length) && (div.lastChild.className = "e", 2 === div.getElementsByClassName("e").length)
                    }), support.getByName = assert(function(div) {
                        div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", docElem.insertBefore(div, docElem.firstChild);
                        var pass = doc.getElementsByName && doc.getElementsByName(expando).length === 2 + doc.getElementsByName(expando + 0).length;
                        return support.getIdNotName = !doc.getElementById(expando), docElem.removeChild(div), pass
                    }), Expr.attrHandle = assert(function(div) {
                        return div.innerHTML = "<a href='#'></a>", div.firstChild && void 0 !== div.firstChild.getAttribute && "#" === div.firstChild.getAttribute("href")
                    }) ? {} : {
                        href: function(elem) {
                            return elem.getAttribute("href", 2)
                        },
                        type: function(elem) {
                            return elem.getAttribute("type")
                        }
                    }, support.getIdNotName ? (Expr.find.ID = function(id, context) {
                        if (void 0 !== context.getElementById && !documentIsXML) {
                            var m = context.getElementById(id);
                            return m && m.parentNode ? [m] : []
                        }
                    }, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId
                        }
                    }) : (Expr.find.ID = function(id, context) {
                        if (void 0 !== context.getElementById && !documentIsXML) {
                            var m = context.getElementById(id);
                            return m ? m.id === id || void 0 !== m.getAttributeNode && m.getAttributeNode("id").value === id ? [m] : void 0 : []
                        }
                    }, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = void 0 !== elem.getAttributeNode && elem.getAttributeNode("id");
                            return node && node.value === attrId
                        }
                    }), Expr.find.TAG = support.tagNameNoComments ? function(tag, context) {
                        if (void 0 !== context.getElementsByTagName) return context.getElementsByTagName(tag)
                    } : function(tag, context) {
                        var elem, tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);
                        if ("*" === tag) {
                            for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                            return tmp
                        }
                        return results
                    }, Expr.find.NAME = support.getByName && function(tag, context) {
                        if (void 0 !== context.getElementsByName) return context.getElementsByName(name)
                    }, Expr.find.CLASS = support.getByClassName && function(className, context) {
                        if (void 0 !== context.getElementsByClassName && !documentIsXML) return context.getElementsByClassName(className)
                    }, rbuggyMatches = [], rbuggyQSA = [":focus"], (support.qsa = isNative(doc.querySelectorAll)) && (assert(function(div) {
                        div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
                    }), assert(function(div) {
                        div.innerHTML = "<input type='hidden' i=''/>", div.querySelectorAll("[i^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                    })), (support.matchesSelector = isNative(matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                        support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                    }), rbuggyQSA = new RegExp(rbuggyQSA.join("|")), rbuggyMatches = new RegExp(rbuggyMatches.join("|")), contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                        var adown = 9 === a.nodeType ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                    } : function(a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1
                    }, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                        var compare;
                        return a === b ? (hasDuplicate = !0, 0) : (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & compare || a.parentNode && 11 === a.parentNode.nodeType ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : 0 : 4 & compare ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                    } : function(a, b) {
                        var cur, i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (a === b) return hasDuplicate = !0, 0;
                        if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0;
                        if (aup === bup) return siblingCheck(a, b);
                        for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                        for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                        for (; ap[i] === bp[i];) i++;
                        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                    }, hasDuplicate = !1, [0, 0].sort(sortOrder), support.detectDuplicates = hasDuplicate, document) : document
                }, Sizzle.matches = function(expr, elements) {
                    return Sizzle(expr, null, null, elements)
                }, Sizzle.matchesSelector = function(elem, expr) {
                    if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                    } catch (e) {}
                    return Sizzle(expr, document, null, [elem]).length > 0
                }, Sizzle.contains = function(context, elem) {
                    return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
                }, Sizzle.attr = function(elem, name) {
                    var val;
                    return (elem.ownerDocument || elem) !== document && setDocument(elem), documentIsXML || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : documentIsXML || support.attributes ? elem.getAttribute(name) : ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && !0 === elem[name] ? name : val && val.specified ? val.value : null
                }, Sizzle.error = function(msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg)
                }, Sizzle.uniqueSort = function(results) {
                    var elem, duplicates = [],
                        i = 1,
                        j = 0;
                    if (hasDuplicate = !support.detectDuplicates, results.sort(sortOrder), hasDuplicate) {
                        for (; elem = results[i]; i++) elem === results[i - 1] && (j = duplicates.push(i));
                        for (; j--;) results.splice(duplicates[j], 1)
                    }
                    return results
                }, getText = Sizzle.getText = function(elem) {
                    var node, ret = "",
                        i = 0,
                        nodeType = elem.nodeType;
                    if (nodeType) {
                        if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                            if ("string" == typeof elem.textContent) return elem.textContent;
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                        } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                    } else
                        for (; node = elem[i]; i++) ret += getText(node);
                    return ret
                }, Expr = Sizzle.selectors = {
                    cacheLength: 50,
                    createPseudo: markFunction,
                    match: matchExpr,
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(match) {
                            return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                        },
                        CHILD: function(match) {
                            return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                        },
                        PSEUDO: function(match) {
                            var excess, unquoted = !match[5] && match[2];
                            return matchExpr.CHILD.test(match[0]) ? null : (match[4] ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(nodeName) {
                            return "*" === nodeName ? function() {
                                return !0
                            } : (nodeName = nodeName.replace(runescape, funescape).toLowerCase(), function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                            })
                        },
                        CLASS: function(className) {
                            var pattern = classCache[className + " "];
                            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test(elem.className || void 0 !== elem.getAttribute && elem.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(name, operator, check) {
                            return function(elem) {
                                var result = Sizzle.attr(elem, name);
                                return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"))
                            }
                        },
                        CHILD: function(type, what, argument, first, last) {
                            var simple = "nth" !== type.slice(0, 3),
                                forward = "last" !== type.slice(-4),
                                ofType = "of-type" === what;
                            return 1 === first && 0 === last ? function(elem) {
                                return !!elem.parentNode
                            } : function(elem, context, xml) {
                                var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;
                                if (parent) {
                                    if (simple) {
                                        for (; dir;) {
                                            for (node = elem; node = node[dir];)
                                                if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                            start = dir = "only" === type && !start && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                        for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                                            if (1 === node.nodeType && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break
                                            }
                                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                                    else
                                        for (;
                                            (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                                    return (diff -= last) === first || diff % first == 0 && diff / first >= 0
                                }
                            }
                        },
                        PSEUDO: function(pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                            return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                            }) : function(elem) {
                                return fn(elem, 0, args)
                            }) : fn
                        }
                    },
                    pseudos: {
                        not: markFunction(function(selector) {
                            var input = [],
                                results = [],
                                matcher = compile(selector.replace(rtrim, "$1"));
                            return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                                for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                            }) : function(elem, context, xml) {
                                return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                            }
                        }),
                        has: markFunction(function(selector) {
                            return function(elem) {
                                return Sizzle(selector, elem).length > 0
                            }
                        }),
                        contains: markFunction(function(text) {
                            return function(elem) {
                                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                            }
                        }),
                        lang: markFunction(function(lang) {
                            return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                                function(elem) {
                                    var elemLang;
                                    do {
                                        if (elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang) return (elemLang = elemLang.toLowerCase()) === lang || 0 === elemLang.indexOf(lang + "-")
                                    } while ((elem = elem.parentNode) && 1 === elem.nodeType);
                                    return !1
                                }
                        }),
                        target: function(elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id
                        },
                        root: function(elem) {
                            return elem === docElem
                        },
                        focus: function(elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                        },
                        enabled: function(elem) {
                            return !1 === elem.disabled
                        },
                        disabled: function(elem) {
                            return !0 === elem.disabled
                        },
                        checked: function(elem) {
                            var nodeName = elem.nodeName.toLowerCase();
                            return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                        },
                        selected: function(elem) {
                            return elem.parentNode && elem.parentNode.selectedIndex, !0 === elem.selected
                        },
                        empty: function(elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                                if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return !1;
                            return !0
                        },
                        parent: function(elem) {
                            return !Expr.pseudos.empty(elem)
                        },
                        header: function(elem) {
                            return rheader.test(elem.nodeName)
                        },
                        input: function(elem) {
                            return rinputs.test(elem.nodeName)
                        },
                        button: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return "input" === name && "button" === elem.type || "button" === name
                        },
                        text: function(elem) {
                            var attr;
                            return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type)
                        },
                        first: createPositionalPseudo(function() {
                            return [0]
                        }),
                        last: createPositionalPseudo(function(matchIndexes, length) {
                            return [length - 1]
                        }),
                        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                            return [argument < 0 ? argument + length : argument]
                        }),
                        even: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        odd: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = argument < 0 ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = argument < 0 ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                            return matchIndexes
                        })
                    }
                };
                for (i in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) Expr.pseudos[i] = function(type) {
                    return function(elem) {
                        return "input" === elem.nodeName.toLowerCase() && elem.type === type
                    }
                }(i);
                for (i in {
                        submit: !0,
                        reset: !0
                    }) Expr.pseudos[i] = function(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return ("input" === name || "button" === name) && elem.type === type
                    }
                }(i);
                compile = Sizzle.compile = function(selector, group) {
                    var i, setMatchers = [],
                        elementMatchers = [],
                        cached = compilerCache[selector + " "];
                    if (!cached) {
                        for (group || (group = tokenize(selector)), i = group.length; i--;) cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
                    }
                    return cached
                }, Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, Expr.setFilters = new setFilters, setDocument(), Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains
            }(window);
        var runtil = /Until$/,
            rparentsprev = /^(?:parents|prev(?:Until|All))/,
            isSimple = /^.[^:#\[\.,]*$/,
            rneedsContext = jQuery.expr.match.needsContext,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.fn.extend({
            find: function(selector) {
                var i, ret, self, len = this.length;
                if ("string" != typeof selector) return self = this, this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++)
                        if (jQuery.contains(self[i], this)) return !0
                }));
                for (ret = [], i = 0; i < len; i++) jQuery.find(selector, this[i], ret);
                return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = (this.selector ? this.selector + " " : "") + selector, ret
            },
            has: function(target) {
                var i, targets = jQuery(target, this),
                    len = targets.length;
                return this.filter(function() {
                    for (i = 0; i < len; i++)
                        if (jQuery.contains(this, targets[i])) return !0
                })
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector, !1))
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector, !0))
            },
            is: function(selector) {
                return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
            },
            closest: function(selectors, context) {
                for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++)
                    for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType;) {
                        if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                            ret.push(cur);
                            break
                        }
                        cur = cur.parentNode
                    }
                return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret)
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(selector, context) {
                var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                    all = jQuery.merge(this.get(), set);
                return this.pushStack(jQuery.unique(all))
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
            }
        }), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null
            },
            parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
            },
            children: function(elem) {
                return jQuery.sibling(elem.firstChild)
            },
            contents: function(elem) {
                return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var ret = jQuery.map(this, fn, until);
                return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), this.pushStack(ret)
            }
        }), jQuery.extend({
            filter: function(expr, elems, not) {
                return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
            },
            dir: function(elem, dir, until) {
                for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until));) 1 === cur.nodeType && matched.push(cur), cur = cur[dir];
                return matched
            },
            sibling: function(n, elem) {
                for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
                return r
            }
        });
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rtbody = /<tbody/i,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            safeFragment = createSafeFragment(document),
            fragmentDiv = safeFragment.appendChild(document.createElement("div"));
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.fn.extend({
            text: function(value) {
                return jQuery.access(this, function(value) {
                    return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
                }, null, value, arguments.length)
            },
            wrapAll: function(html) {
                if (jQuery.isFunction(html)) return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                });
                if (this[0]) {
                    var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                        for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;) elem = elem.firstChild;
                        return elem
                    }).append(this)
                }
                return this
            },
            wrapInner: function(html) {
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                }) : this.each(function() {
                    var self = jQuery(this),
                        contents = self.contents();
                    contents.length ? contents.wrapAll(html) : self.append(html)
                })
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(elem) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.appendChild(elem)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(elem) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.insertBefore(elem, this.firstChild)
                })
            },
            before: function() {
                return this.domManip(arguments, !1, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this)
                })
            },
            after: function() {
                return this.domManip(arguments, !1, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
                })
            },
            remove: function(selector, keepData) {
                for (var elem, i = 0; null != (elem = this[i]); i++)(!selector || jQuery.filter(selector, [elem]).length > 0) && (keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem)));
                return this
            },
            empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) {
                    for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild;) elem.removeChild(elem.firstChild);
                    elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0)
                }
                return this
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
            },
            html: function(value) {
                return jQuery.access(this, function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                    if ("string" == typeof value && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                            elem = 0
                        } catch (e) {}
                    }
                    elem && this.empty().append(value)
                }, null, value, arguments.length)
            },
            replaceWith: function(value) {
                return jQuery.isFunction(value) || "string" == typeof value || (value = jQuery(value).not(this).detach()), this.domManip([value], !0, function(elem) {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    parent && (jQuery(this).remove(), parent.insertBefore(elem, next))
                })
            },
            detach: function(selector) {
                return this.remove(selector, !0)
            },
            domManip: function(args, table, callback) {
                args = core_concat.apply([], args);
                var first, node, hasScripts, scripts, doc, fragment, i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || !(l <= 1 || "string" != typeof value || jQuery.support.checkClone) && rchecked.test(value)) return this.each(function(index) {
                    var self = set.eq(index);
                    isFunction && (args[0] = value.call(this, index, table ? self.html() : undefined)), self.domManip(args, table, callback)
                });
                if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                    for (table = table && jQuery.nodeName(first, "tr"), scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], node, i);
                    if (hasScripts)
                        for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery.ajax({
                            url: node.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            throws: !0
                        }) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                    fragment = first = null
                }
                return this
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; i <= last; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), core_push.apply(ret, elems.get());
                return this.pushStack(ret)
            }
        }), jQuery.extend({
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
                if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                    for (destElements = getAll(clone), srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
                if (dataAndEvents)
                    if (deepDataAndEvents)
                        for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]);
                    else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), destElements = srcElements = node = null, clone
            },
            buildFragment: function(elems, context, scripts, selection) {
                for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; i < l; i++)
                    if ((elem = elems[i]) || 0 === elem)
                        if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        else if (rhtml.test(elem)) {
                    for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                    if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !jQuery.support.tbody)
                        for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, j = elem && elem.childNodes.length; j--;) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                    for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild;) tmp.removeChild(tmp.firstChild);
                    tmp = safe.lastChild
                } else nodes.push(context.createTextNode(elem));
                for (tmp && safe.removeChild(tmp), jQuery.support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), i = 0; elem = nodes[i++];)
                    if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts))
                        for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
                return tmp = null, safe
            },
            cleanData: function(elems, acceptData) {
                for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++)
                    if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                        if (data.events)
                            for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                        cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== core_strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, core_deletedIds.push(id))
                    }
            }
        });
        var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
            ropacity = /opacity\s*=\s*([^)]*)/,
            rposition = /^(top|right|bottom|left)$/,
            rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rmargin = /^margin/,
            rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
            rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
            rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
            elemdisplay = {
                BODY: "block"
            },
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: 0,
                fontWeight: 400
            },
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        jQuery.fn.extend({
            css: function(name, value) {
                return jQuery.access(this, function(elem, name, value) {
                    var len, styles, map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                        return map
                    }
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
            },
            show: function() {
                return showHide(this, !0)
            },
            hide: function() {
                return showHide(this)
            },
            toggle: function(state) {
                var bool = "boolean" == typeof state;
                return this.each(function() {
                    (bool ? state : isHidden(this)) ? jQuery(this).show(): jQuery(this).hide()
                })
            }
        }), jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = jQuery.camelCase(name),
                        style = elem.style;
                    if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                    if (!(type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                        style[name] = value
                    } catch (e) {}
                }
            },
            css: function(elem, name, extra, styles) {
                var num, val, hooks, origName = jQuery.camelCase(name);
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), val === undefined && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), !0 === extra || jQuery.isNumeric(num) ? num || 0 : val) : val
            },
            swap: function(elem, options, callback, args) {
                var ret, name, old = {};
                for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
                ret = callback.apply(elem, args || []);
                for (name in options) elem.style[name] = old[name];
                return ret
            }
        }), window.getComputedStyle ? (getStyles = function(elem) {
            return window.getComputedStyle(elem, null)
        }, curCSS = function(elem, name, _computed) {
            var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                style = elem.style;
            return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), ret
        }) : document.documentElement.currentStyle && (getStyles = function(elem) {
            return elem.currentStyle
        }, curCSS = function(elem, name, _computed) {
            var left, rs, rsLeft, computed = _computed || getStyles(elem),
                ret = computed ? computed[name] : undefined,
                style = elem.style;
            return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft)), "" === ret ? "auto" : ret
        }), jQuery.each(["height", "width"], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) return 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra)
                },
                set: function(elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
                }
            }
        }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
            }
        }), jQuery(function() {
            jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    if (computed) return jQuery.swap(elem, {
                        display: "inline-block"
                    }, curCSS, [elem, "marginRight"])
                }
            }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function(i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function(elem, computed) {
                        if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
                    }
                }
            })
        }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"))
        }, jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded
                }
            }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
        });
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type))
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        }
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }).get()
            }
        }), jQuery.param = function(a, traditional) {
            var prefix, s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value)
            });
            else
                for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
            return s.join("&").replace(r20, "+")
        }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            }
        }), jQuery.fn.hover = function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        };
        var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
            ajax_rquery = /\?/,
            rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            _load = jQuery.fn.load,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*");
        try {
            ajaxLocation = location.href
        } catch (e) {
            ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
        }
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
            if ("string" != typeof url && _load) return _load.apply(this, arguments);
            var selector, response, type, self = this,
                off = url.indexOf(" ");
            return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR])
            }), this
        }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
            }
        }), jQuery.each(["get", "post"], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                })
            }
        }), jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": window.String,
                    "text html": !0,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), status >= 200 && status < 300 || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), (modified = jqXHR.getResponseHeader("etag")) && (jQuery.etag[cacheURL] = modified)), 204 === status ? (isSuccess = !0, statusText = "nocontent") : 304 === status ? (isSuccess = !0, statusText = "notmodified") : (isSuccess = ajaxConvert(s, response), statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, isSuccess = !error)) : (error = statusText, !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }
                "object" == typeof url && (options = url, url = undefined), options = options || {};
                var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    state = 0,
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function(key) {
                            var match;
                            if (2 === state) {
                                if (!responseHeaders)
                                    for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                                match = responseHeaders[key.toLowerCase()]
                            }
                            return null == match ? null : match
                        },
                        getAllResponseHeaders: function() {
                            return 2 === state ? responseHeadersString : null
                        },
                        setRequestHeader: function(name, value) {
                            var lname = name.toLowerCase();
                            return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                        },
                        overrideMimeType: function(type) {
                            return state || (s.mimeType = type), this
                        },
                        statusCode: function(map) {
                            var code;
                            if (map)
                                if (state < 2)
                                    for (code in map) statusCode[code] = [statusCode[code], map[code]];
                                else jqXHR.always(map[jqXHR.status]);
                            return this
                        },
                        abort: function(statusText) {
                            var finalText = statusText || strAbort;
                            return transport && transport.abort(finalText), done(0, finalText), this
                        }
                    };
                if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? 80 : 443)) == (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? 80 : 443)))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                fireGlobals = s.global, fireGlobals && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), !1 === s.cache && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && !1 !== s.contentType || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (!1 === s.beforeSend.call(callbackContext, jqXHR, s) || 2 === state)) return jqXHR.abort();
                strAbort = "abort";
                for (i in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) jqXHR[i](s[i]);
                if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                    jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout));
                    try {
                        state = 1, transport.send(requestHeaders, done)
                    } catch (e) {
                        if (!(state < 2)) throw e;
                        done(-1, e)
                    }
                } else done(-1, "No Transport");
                return jqXHR
            },
            getScript: function(url, callback) {
                return jQuery.get(url, undefined, callback, "script")
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            }
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(text) {
                    return jQuery.globalEval(text), text
                }
            }
        }), jQuery.ajaxPrefilter("script", function(s) {
            s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1)
        }), jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, head = document.head || jQuery("head")[0] || document.documentElement;
                return {
                    send: function(_, callback) {
                        script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                            (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"))
                        }, head.insertBefore(script, head.firstChild)
                    },
                    abort: function() {
                        script && script.onload(undefined, !0)
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
                return this[callback] = !0, callback
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = !1 !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : !1 !== s.jsonp && (s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments
            }, jqXHR.always(function() {
                window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = undefined
            }), "script"
        });
        var xhrCallbacks, xhrSupported, xhrId = 0,
            xhrOnUnloadAbort = window.ActiveXObject && function() {
                var key;
                for (key in xhrCallbacks) xhrCallbacks[key](undefined, !0)
            };
        jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
            return !this.isLocal && createStandardXHR() || createActiveXHR()
        } : createStandardXHR, xhrSupported = jQuery.ajaxSettings.xhr(), jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported, (xhrSupported = jQuery.support.ajax = !!xhrSupported) && jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields)
                            for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                        s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (i in headers) xhr.setRequestHeader(i, headers[i])
                        } catch (err) {}
                        xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
                            var status, responseHeaders, statusText, responses;
                            try {
                                if (callback && (isAbort || 4 === xhr.readyState))
                                    if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort();
                                    else {
                                        responses = {}, status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                        try {
                                            statusText = xhr.statusText
                                        } catch (e) {
                                            statusText = ""
                                        }
                                        status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                                    }
                            } catch (firefoxAccessException) {
                                isAbort || complete(-1, firefoxAccessException)
                            }
                            responses && complete(status, statusText, responses, responseHeaders)
                        }, s.async ? 4 === xhr.readyState ? setTimeout(callback) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback()
                    },
                    abort: function() {
                        callback && callback(undefined, !0)
                    }
                }
            }
        });
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function(prop, value) {
                    var end, unit, tween = this.createTween(prop, value),
                        parts = rfxnum.exec(value),
                        target = tween.cur(),
                        start = +target || 0,
                        scale = 1,
                        maxIterations = 20;
                    if (parts) {
                        if (end = +parts[2], "px" !== (unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px")) && start) {
                            start = jQuery.css(tween.elem, prop, !0) || end || 1;
                            do {
                                scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit)
                            } while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                        }
                        tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end : end
                    }
                    return tween
                }]
            };
        jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
                for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
            },
            prefilter: function(callback, prepend) {
                prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
            }
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
                },
                set: function(tween) {
                    jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
            }
        }, jQuery.each(["toggle", "show", "hide"], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
            }
        }), jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback)
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function() {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        doAnimation.finish = function() {
                            anim.stop(!0)
                        }, (empty || jQuery._data(this, "finish")) && anim.stop(!0)
                    };
                return doAnimation.finish = doAnimation, empty || !1 === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd)
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), clearQueue && !1 !== type && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0,
                        index = null != type && type + "queueHooks",
                        timers = jQuery.timers,
                        data = jQuery._data(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]);
                    else
                        for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                    !dequeue && gotoEnd || jQuery.dequeue(this, type)
                })
            },
            finish: function(type) {
                return !1 !== type && (type = type || "fx"), this.each(function() {
                    var index, data = jQuery._data(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.cur && hooks.cur.finish && hooks.cur.finish.call(this), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                    for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish
                })
            }
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        }), jQuery.speed = function(speed, easing, fn) {
            var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, null != opt.queue && !0 !== opt.queue || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
            }, opt
        }, jQuery.easing = {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2
            }
        }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
            var timer, timers = jQuery.timers,
                i = 0;
            for (fxNow = jQuery.now(); i < timers.length; i++)(timer = timers[i])() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = undefined
        }, jQuery.fx.timer = function(timer) {
            timer() && jQuery.timers.push(timer) && jQuery.fx.start()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
        }, jQuery.fx.stop = function() {
            clearInterval(timerId), timerId = null
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        }), jQuery.fn.offset = function(options) {
            if (arguments.length) return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            });
            var docElem, win, box = {
                    top: 0,
                    left: 0
                },
                elem = this[0],
                doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== core_strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box
        }, jQuery.offset = {
            setOffset: function(elem, options, i) {
                var position = jQuery.css(elem, "position");
                "static" === position && (elem.style.position = "relative");
                var curTop, curLeft, curElem = jQuery(elem),
                    curOffset = curElem.offset(),
                    curCSSTop = jQuery.css(elem, "top"),
                    curCSSLeft = jQuery.css(elem, "left"),
                    calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                    props = {},
                    curPosition = {};
                calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }
        }, jQuery.fn.extend({
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, parentOffset = {
                            top: 0,
                            left: 0
                        },
                        elem = this[0];
                    return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var offsetParent = this.offsetParent || document.documentElement; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                    return offsetParent || document.documentElement
                })
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = /Y/.test(prop);
            jQuery.fn[method] = function(val) {
                return jQuery.access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    if (val === undefined) return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
                    win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val
                }, method, val, arguments.length, null)
            }
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                        extra = defaultExtra || (!0 === margin || !0 === value ? "margin" : "border");
                    return jQuery.access(this, function(elem, type, value) {
                        var doc;
                        return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                    }, type, chainable ? margin : undefined, chainable, null)
                }
            })
        }), window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return jQuery
        })
    }(window);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
                var _slice = function(a) {
                        var i, b = [],
                            l = a.length;
                        for (i = 0; i !== l; b.push(a[i++]));
                        return b
                    },
                    _applyCycle = function(vars, targets, i) {
                        var p, val, alt = vars.cycle;
                        for (p in alt) val = alt[p], vars[p] = "function" == typeof val ? val(i, targets[i]) : val[i % val.length];
                        delete vars.cycle
                    },
                    TweenMax = function(target, duration, vars) {
                        TweenLite.call(this, target, duration, vars), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = TweenMax.prototype.render
                    },
                    TweenLiteInternals = TweenLite._internals,
                    _isSelector = TweenLiteInternals.isSelector,
                    _isArray = TweenLiteInternals.isArray,
                    p = TweenMax.prototype = TweenLite.to({}, .1, {}),
                    _blankArray = [];
                TweenMax.version = "1.19.0", p.constructor = TweenMax, p.kill()._gc = !1, TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf, TweenMax.getTweensOf = TweenLite.getTweensOf, TweenMax.lagSmoothing = TweenLite.lagSmoothing, TweenMax.ticker = TweenLite.ticker, TweenMax.render = TweenLite.render, p.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), TweenLite.prototype.invalidate.call(this)
                }, p.updateTo = function(vars, resetDuration) {
                    var p, curRatio = this.ratio,
                        immediate = this.vars.immediateRender || vars.immediateRender;
                    resetDuration && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (p in vars) this.vars[p] = vars[p];
                    if (this._initted || immediate)
                        if (resetDuration) this._initted = !1, immediate && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && TweenLite._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var prevTime = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(prevTime, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || immediate)
                        for (var endValue, inv = 1 / (1 - curRatio), pt = this._firstPT; pt;) endValue = pt.s + pt.c, pt.c *= inv, pt.s = endValue - pt.c, pt = pt._next;
                    return this
                }, p.render = function(time, suppressEvents, force) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, totalDur = this._dirty ? this.totalDuration() : this._totalDuration,
                        prevTime = this._time,
                        prevTotalTime = this._totalTime,
                        prevCycle = this._cycle,
                        duration = this._duration,
                        prevRawPrevTime = this._rawPrevTime;
                    if (time >= totalDur - 1e-7 ? (this._totalTime = totalDur, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (isComplete = !0, callback = "onComplete", force = force || this._timeline.autoRemoveChildren), 0 === duration && (this._initted || !this.vars.lazy || force) && (this._startTime === this._timeline._duration && (time = 0), (prevRawPrevTime < 0 || time <= 0 && time >= -1e-7 || 1e-10 === prevRawPrevTime && "isPause" !== this.data) && prevRawPrevTime !== time && (force = !0, prevRawPrevTime > 1e-10 && (callback = "onReverseComplete")), this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : 1e-10)) : time < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== prevTotalTime || 0 === duration && prevRawPrevTime > 0) && (callback = "onReverseComplete", isComplete = this._reversed), time < 0 && (this._active = !1, 0 === duration && (this._initted || !this.vars.lazy || force) && (prevRawPrevTime >= 0 && (force = !0), this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : 1e-10)), this._initted || (force = !0)) : (this._totalTime = this._time = time, 0 !== this._repeat && (cycleDuration = duration + this._repeatDelay, this._cycle = this._totalTime / cycleDuration >> 0, 0 !== this._cycle && this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time && this._cycle--, this._time = this._totalTime - this._cycle * cycleDuration, this._yoyo && 0 != (1 & this._cycle) && (this._time = duration - this._time), this._time > duration ? this._time = duration : this._time < 0 && (this._time = 0)), this._easeType ? (r = this._time / duration, type = this._easeType, pow = this._easePower, (1 === type || 3 === type && r >= .5) && (r = 1 - r), 3 === type && (r *= 2), 1 === pow ? r *= r : 2 === pow ? r *= r * r : 3 === pow ? r *= r * r * r : 4 === pow && (r *= r * r * r * r), 1 === type ? this.ratio = 1 - r : 2 === type ? this.ratio = r : this._time / duration < .5 ? this.ratio = r / 2 : this.ratio = 1 - r / 2) : this.ratio = this._ease.getRatio(this._time / duration)), prevTime === this._time && !force && prevCycle === this._cycle) return void(prevTotalTime !== this._totalTime && this._onUpdate && (suppressEvents || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!force && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = prevTime, this._totalTime = prevTotalTime, this._rawPrevTime = prevRawPrevTime, this._cycle = prevCycle, TweenLiteInternals.lazyTweens.push(this), void(this._lazy = [time, suppressEvents]);
                        this._time && !isComplete ? this.ratio = this._ease.getRatio(this._time / duration) : isComplete && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== prevTime && time >= 0 && (this._active = !0), 0 === prevTotalTime && (2 === this._initted && time > 0 && this._init(), this._startAt && (time >= 0 ? this._startAt.render(time, suppressEvents, force) : callback || (callback = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== duration || suppressEvents || this._callback("onStart"))), pt = this._firstPT; pt;) pt.f ? pt.t[pt.p](pt.c * this.ratio + pt.s) : pt.t[pt.p] = pt.c * this.ratio + pt.s, pt = pt._next;
                    this._onUpdate && (time < 0 && this._startAt && this._startTime && this._startAt.render(time, suppressEvents, force), suppressEvents || (this._totalTime !== prevTotalTime || callback) && this._callback("onUpdate")), this._cycle !== prevCycle && (suppressEvents || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
                        callback && (this._gc && !force || (time < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(time, suppressEvents, force), isComplete && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !suppressEvents && this.vars[callback] && this._callback(callback), 0 === duration && 1e-10 === this._rawPrevTime && 1e-10 !== rawPrevTime && (this._rawPrevTime = 0)))
                }, TweenMax.to = function(target, duration, vars) {
                    return new TweenMax(target, duration, vars)
                }, TweenMax.from = function(target, duration, vars) {
                    return vars.runBackwards = !0, vars.immediateRender = 0 != vars.immediateRender, new TweenMax(target, duration, vars)
                }, TweenMax.fromTo = function(target, duration, fromVars, toVars) {
                    return toVars.startAt = fromVars, toVars.immediateRender = 0 != toVars.immediateRender && 0 != fromVars.immediateRender, new TweenMax(target, duration, toVars)
                }, TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    stagger = stagger || 0;
                    var l, copy, i, p, delay = 0,
                        a = [],
                        finalComplete = function() {
                            vars.onComplete && vars.onComplete.apply(vars.onCompleteScope || this, arguments), onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray)
                        },
                        cycle = vars.cycle,
                        fromCycle = vars.startAt && vars.startAt.cycle;
                    for (_isArray(targets) || ("string" == typeof targets && (targets = TweenLite.selector(targets) || targets), _isSelector(targets) && (targets = _slice(targets))), targets = targets || [], stagger < 0 && (targets = _slice(targets), targets.reverse(), stagger *= -1), l = targets.length - 1, i = 0; i <= l; i++) {
                        copy = {};
                        for (p in vars) copy[p] = vars[p];
                        if (cycle && (_applyCycle(copy, targets, i), null != copy.duration && (duration = copy.duration, delete copy.duration)), fromCycle) {
                            fromCycle = copy.startAt = {};
                            for (p in vars.startAt) fromCycle[p] = vars.startAt[p];
                            _applyCycle(copy.startAt, targets, i)
                        }
                        copy.delay = delay + (copy.delay || 0), i === l && onCompleteAll && (copy.onComplete = finalComplete), a[i] = new TweenMax(targets[i], duration, copy), delay += stagger
                    }
                    return a
                }, TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    return vars.runBackwards = !0, vars.immediateRender = 0 != vars.immediateRender, TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
                }, TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    return toVars.startAt = fromVars, toVars.immediateRender = 0 != toVars.immediateRender && 0 != fromVars.immediateRender, TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
                }, TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
                    return new TweenMax(callback, 0, {
                        delay: delay,
                        onComplete: callback,
                        onCompleteParams: params,
                        callbackScope: scope,
                        onReverseComplete: callback,
                        onReverseCompleteParams: params,
                        immediateRender: !1,
                        useFrames: useFrames,
                        overwrite: 0
                    })
                }, TweenMax.set = function(target, vars) {
                    return new TweenMax(target, 0, vars)
                }, TweenMax.isTweening = function(target) {
                    return TweenLite.getTweensOf(target, !0).length > 0
                };
                var _getChildrenOf = function(timeline, includeTimelines) {
                        for (var a = [], cnt = 0, tween = timeline._first; tween;) tween instanceof TweenLite ? a[cnt++] = tween : (includeTimelines && (a[cnt++] = tween), a = a.concat(_getChildrenOf(tween, includeTimelines)), cnt = a.length), tween = tween._next;
                        return a
                    },
                    getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
                        return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(Animation._rootFramesTimeline, includeTimelines))
                    };
                TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
                    null == tweens && (tweens = !0), null == delayedCalls && (delayedCalls = !0);
                    var isDC, tween, i, a = getAllTweens(0 != timelines),
                        l = a.length,
                        allTrue = tweens && delayedCalls && timelines;
                    for (i = 0; i < l; i++) tween = a[i], (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) && (complete ? tween.totalTime(tween._reversed ? 0 : tween.totalDuration()) : tween._enabled(!1, !1))
                }, TweenMax.killChildTweensOf = function(parent, complete) {
                    if (null != parent) {
                        var a, curParent, p, i, l, tl = TweenLiteInternals.tweenLookup;
                        if ("string" == typeof parent && (parent = TweenLite.selector(parent) || parent), _isSelector(parent) && (parent = _slice(parent)), _isArray(parent))
                            for (i = parent.length; --i > -1;) TweenMax.killChildTweensOf(parent[i], complete);
                        else {
                            a = [];
                            for (p in tl)
                                for (curParent = tl[p].target.parentNode; curParent;) curParent === parent && (a = a.concat(tl[p].tweens)), curParent = curParent.parentNode;
                            for (l = a.length, i = 0; i < l; i++) complete && a[i].totalTime(a[i].totalDuration()), a[i]._enabled(!1, !1)
                        }
                    }
                };
                var _changePause = function(pause, tweens, delayedCalls, timelines) {
                    tweens = !1 !== tweens, delayedCalls = !1 !== delayedCalls, timelines = !1 !== timelines;
                    for (var isDC, tween, a = getAllTweens(timelines), allTrue = tweens && delayedCalls && timelines, i = a.length; --i > -1;) tween = a[i], (allTrue || tween instanceof SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) && tween.paused(pause)
                };
                return TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
                    _changePause(!0, tweens, delayedCalls, timelines)
                }, TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
                    _changePause(!1, tweens, delayedCalls, timelines)
                }, TweenMax.globalTimeScale = function(value) {
                    var tl = Animation._rootTimeline,
                        t = TweenLite.ticker.time;
                    return arguments.length ? (value = value || 1e-10, tl._startTime = t - (t - tl._startTime) * tl._timeScale / value, tl = Animation._rootFramesTimeline, t = TweenLite.ticker.frame, tl._startTime = t - (t - tl._startTime) * tl._timeScale / value, tl._timeScale = Animation._rootTimeline._timeScale = value, value) : tl._timeScale
                }, p.progress = function(value, suppressEvents) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents) : this._time / this.duration()
                }, p.totalProgress = function(value, suppressEvents) {
                    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this._totalTime / this.totalDuration()
                }, p.time = function(value, suppressEvents) {
                    return arguments.length ? (this._dirty && this.totalDuration(), value > this._duration && (value = this._duration), this._yoyo && 0 != (1 & this._cycle) ? value = this._duration - value + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (value += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(value, suppressEvents)) : this._time
                }, p.duration = function(value) {
                    return arguments.length ? Animation.prototype.duration.call(this, value) : this._duration
                }, p.totalDuration = function(value) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, p.repeat = function(value) {
                    return arguments.length ? (this._repeat = value, this._uncache(!0)) : this._repeat
                }, p.repeatDelay = function(value) {
                    return arguments.length ? (this._repeatDelay = value, this._uncache(!0)) : this._repeatDelay
                }, p.yoyo = function(value) {
                    return arguments.length ? (this._yoyo = value, this) : this._yoyo
                }, TweenMax
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
                var TimelineLite = function(vars) {
                        SimpleTimeline.call(this, vars), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var val, p, v = this.vars;
                        for (p in v) val = v[p], _isArray(val) && -1 !== val.join("").indexOf("{self}") && (v[p] = this._swapSelfInParams(val));
                        _isArray(v.tweens) && this.add(v.tweens, 0, v.align, v.stagger)
                    },
                    TweenLiteInternals = TweenLite._internals,
                    _internals = TimelineLite._internals = {},
                    _isSelector = TweenLiteInternals.isSelector,
                    _isArray = TweenLiteInternals.isArray,
                    _lazyTweens = TweenLiteInternals.lazyTweens,
                    _lazyRender = TweenLiteInternals.lazyRender,
                    _globals = _gsScope._gsDefine.globals,
                    _copy = function(vars) {
                        var p, copy = {};
                        for (p in vars) copy[p] = vars[p];
                        return copy
                    },
                    _applyCycle = function(vars, targets, i) {
                        var p, val, alt = vars.cycle;
                        for (p in alt) val = alt[p], vars[p] = "function" == typeof val ? val.call(targets[i], i) : val[i % val.length];
                        delete vars.cycle
                    },
                    _pauseCallback = _internals.pauseCallback = function() {},
                    _slice = function(a) {
                        var i, b = [],
                            l = a.length;
                        for (i = 0; i !== l; b.push(a[i++]));
                        return b
                    },
                    p = TimelineLite.prototype = new SimpleTimeline;
                return TimelineLite.version = "1.19.0", p.constructor = TimelineLite, p.kill()._gc = p._forcingPlayhead = p._hasPause = !1, p.to = function(target, duration, vars, position) {
                    var Engine = vars.repeat && _globals.TweenMax || TweenLite;
                    return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position)
                }, p.from = function(target, duration, vars, position) {
                    return this.add((vars.repeat && _globals.TweenMax || TweenLite).from(target, duration, vars), position)
                }, p.fromTo = function(target, duration, fromVars, toVars, position) {
                    var Engine = toVars.repeat && _globals.TweenMax || TweenLite;
                    return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position)
                }, p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    var copy, i, tl = new TimelineLite({
                            onComplete: onCompleteAll,
                            onCompleteParams: onCompleteAllParams,
                            callbackScope: onCompleteAllScope,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        cycle = vars.cycle;
                    for ("string" == typeof targets && (targets = TweenLite.selector(targets) || targets), targets = targets || [], _isSelector(targets) && (targets = _slice(targets)), stagger = stagger || 0, stagger < 0 && (targets = _slice(targets), targets.reverse(), stagger *= -1), i = 0; i < targets.length; i++) copy = _copy(vars), copy.startAt && (copy.startAt = _copy(copy.startAt), copy.startAt.cycle && _applyCycle(copy.startAt, targets, i)), cycle && (_applyCycle(copy, targets, i), null != copy.duration && (duration = copy.duration, delete copy.duration)), tl.to(targets[i], duration, copy, i * stagger);
                    return this.add(tl, position)
                }, p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    return vars.immediateRender = 0 != vars.immediateRender, vars.runBackwards = !0, this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
                }, p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                    return toVars.startAt = fromVars, toVars.immediateRender = 0 != toVars.immediateRender && 0 != fromVars.immediateRender, this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope)
                }, p.call = function(callback, params, scope, position) {
                    return this.add(TweenLite.delayedCall(0, callback, params, scope), position)
                }, p.set = function(target, vars, position) {
                    return position = this._parseTimeOrLabel(position, 0, !0), null == vars.immediateRender && (vars.immediateRender = position === this._time && !this._paused), this.add(new TweenLite(target, 0, vars), position)
                }, TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
                    vars = vars || {}, null == vars.smoothChildTiming && (vars.smoothChildTiming = !0);
                    var tween, next, tl = new TimelineLite(vars),
                        root = tl._timeline;
                    for (null == ignoreDelayedCalls && (ignoreDelayedCalls = !0), root._remove(tl, !0), tl._startTime = 0, tl._rawPrevTime = tl._time = tl._totalTime = root._time, tween = root._first; tween;) next = tween._next, ignoreDelayedCalls && tween instanceof TweenLite && tween.target === tween.vars.onComplete || tl.add(tween, tween._startTime - tween._delay), tween = next;
                    return root.add(tl, 0), tl
                }, p.add = function(value, position, align, stagger) {
                    var curTime, l, i, child, tl, beforeRawTime;
                    if ("number" != typeof position && (position = this._parseTimeOrLabel(position, 0, !0, value)), !(value instanceof Animation)) {
                        if (value instanceof Array || value && value.push && _isArray(value)) {
                            for (align = align || "normal", stagger = stagger || 0, curTime = position, l = value.length, i = 0; i < l; i++) _isArray(child = value[i]) && (child = new TimelineLite({
                                tweens: child
                            })), this.add(child, curTime), "string" != typeof child && "function" != typeof child && ("sequence" === align ? curTime = child._startTime + child.totalDuration() / child._timeScale : "start" === align && (child._startTime -= child.delay())), curTime += stagger;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof value) return this.addLabel(value, position);
                        if ("function" != typeof value) throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
                        value = TweenLite.delayedCall(0, value)
                    }
                    if (SimpleTimeline.prototype.add.call(this, value, position), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (tl = this, beforeRawTime = tl.rawTime() > value._startTime; tl._timeline;) beforeRawTime && tl._timeline.smoothChildTiming ? tl.totalTime(tl._totalTime, !0) : tl._gc && tl._enabled(!0, !1), tl = tl._timeline;
                    return this
                }, p.remove = function(value) {
                    if (value instanceof Animation) {
                        this._remove(value, !1);
                        var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline;
                        return value._startTime = (value._paused ? value._pauseTime : tl._time) - (value._reversed ? value.totalDuration() - value._totalTime : value._totalTime) / value._timeScale, this
                    }
                    if (value instanceof Array || value && value.push && _isArray(value)) {
                        for (var i = value.length; --i > -1;) this.remove(value[i]);
                        return this
                    }
                    return "string" == typeof value ? this.removeLabel(value) : this.kill(null, value)
                }, p._remove = function(tween, skipDisable) {
                    SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
                    var last = this._last;
                    return last ? this._time > last._startTime + last._totalDuration / last._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, p.append = function(value, offsetOrLabel) {
                    return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, !0, value))
                }, p.insert = p.insertMultiple = function(value, position, align, stagger) {
                    return this.add(value, position || 0, align, stagger)
                }, p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
                    return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, !0, tweens), align, stagger)
                }, p.addLabel = function(label, position) {
                    return this._labels[label] = this._parseTimeOrLabel(position), this
                }, p.addPause = function(position, callback, params, scope) {
                    var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
                    return t.vars.onComplete = t.vars.onReverseComplete = callback, t.data = "isPause", this._hasPause = !0, this.add(t, position)
                }, p.removeLabel = function(label) {
                    return delete this._labels[label], this
                }, p.getLabelTime = function(label) {
                    return null != this._labels[label] ? this._labels[label] : -1
                }, p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
                    var i;
                    if (ignore instanceof Animation && ignore.timeline === this) this.remove(ignore);
                    else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore)))
                        for (i = ignore.length; --i > -1;) ignore[i] instanceof Animation && ignore[i].timeline === this && this.remove(ignore[i]);
                    if ("string" == typeof offsetOrLabel) return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && "number" == typeof timeOrLabel && null == this._labels[offsetOrLabel] ? timeOrLabel - this.duration() : 0, appendIfAbsent);
                    if (offsetOrLabel = offsetOrLabel || 0, "string" != typeof timeOrLabel || !isNaN(timeOrLabel) && null == this._labels[timeOrLabel]) null == timeOrLabel && (timeOrLabel = this.duration());
                    else {
                        if (-1 === (i = timeOrLabel.indexOf("="))) return null == this._labels[timeOrLabel] ? appendIfAbsent ? this._labels[timeOrLabel] = this.duration() + offsetOrLabel : offsetOrLabel : this._labels[timeOrLabel] + offsetOrLabel;
                        offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1)), timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : this.duration()
                    }
                    return Number(timeOrLabel) + offsetOrLabel
                }, p.seek = function(position, suppressEvents) {
                    return this.totalTime("number" == typeof position ? position : this._parseTimeOrLabel(position), !1 !== suppressEvents)
                }, p.stop = function() {
                    return this.paused(!0)
                }, p.gotoAndPlay = function(position, suppressEvents) {
                    return this.play(position, suppressEvents)
                }, p.gotoAndStop = function(position, suppressEvents) {
                    return this.pause(position, suppressEvents)
                }, p.render = function(time, suppressEvents, force) {
                    this._gc && this._enabled(!0, !1);
                    var tween, isComplete, next, callback, internalForce, pauseTween, curTime, totalDur = this._dirty ? this.totalDuration() : this._totalDuration,
                        prevTime = this._time,
                        prevStart = this._startTime,
                        prevTimeScale = this._timeScale,
                        prevPaused = this._paused;
                    if (time >= totalDur - 1e-7) this._totalTime = this._time = totalDur, this._reversed || this._hasPausedChild() || (isComplete = !0, callback = "onComplete", internalForce = !!this._timeline.autoRemoveChildren, 0 === this._duration && (time <= 0 && time >= -1e-7 || this._rawPrevTime < 0 || 1e-10 === this._rawPrevTime) && this._rawPrevTime !== time && this._first && (internalForce = !0, this._rawPrevTime > 1e-10 && (callback = "onReverseComplete"))), this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : 1e-10, time = totalDur + 1e-4;
                    else if (time < 1e-7)
                        if (this._totalTime = this._time = 0, (0 !== prevTime || 0 === this._duration && 1e-10 !== this._rawPrevTime && (this._rawPrevTime > 0 || time < 0 && this._rawPrevTime >= 0)) && (callback = "onReverseComplete", isComplete = this._reversed), time < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (internalForce = isComplete = !0, callback = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (internalForce = !0), this._rawPrevTime = time;
                        else {
                            if (this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : 1e-10, 0 === time && isComplete)
                                for (tween = this._first; tween && 0 === tween._startTime;) tween._duration || (isComplete = !1), tween = tween._next;
                            time = 0, this._initted || (internalForce = !0)
                        }
                    else {
                        if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
                            if (time >= prevTime)
                                for (tween = this._first; tween && tween._startTime <= time && !pauseTween;) tween._duration || "isPause" !== tween.data || tween.ratio || 0 === tween._startTime && 0 === this._rawPrevTime || (pauseTween = tween), tween = tween._next;
                            else
                                for (tween = this._last; tween && tween._startTime >= time && !pauseTween;) tween._duration || "isPause" === tween.data && tween._rawPrevTime > 0 && (pauseTween = tween), tween = tween._prev;
                            pauseTween && (this._time = time = pauseTween._startTime, this._totalTime = time + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = time
                    }
                    if (this._time !== prevTime && this._first || force || internalForce || pauseTween) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== prevTime && time > 0 && (this._active = !0), 0 === prevTime && this.vars.onStart && (0 === this._time && this._duration || suppressEvents || this._callback("onStart")), (curTime = this._time) >= prevTime)
                            for (tween = this._first; tween && (next = tween._next, curTime === this._time && (!this._paused || prevPaused));)(tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) && (pauseTween === tween && this.pause(), tween._reversed ? tween.render((tween._dirty ? tween.totalDuration() : tween._totalDuration) - (time - tween._startTime) * tween._timeScale, suppressEvents, force) : tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)), tween = next;
                        else
                            for (tween = this._last; tween && (next = tween._prev, curTime === this._time && (!this._paused || prevPaused));) {
                                if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
                                    if (pauseTween === tween) {
                                        for (pauseTween = tween._prev; pauseTween && pauseTween.endTime() > this._time;) pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force), pauseTween = pauseTween._prev;
                                        pauseTween = null, this.pause()
                                    }
                                    tween._reversed ? tween.render((tween._dirty ? tween.totalDuration() : tween._totalDuration) - (time - tween._startTime) * tween._timeScale, suppressEvents, force) : tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                                }
                                tween = next
                            }
                        this._onUpdate && (suppressEvents || (_lazyTweens.length && _lazyRender(), this._callback("onUpdate"))), callback && (this._gc || prevStart !== this._startTime && prevTimeScale === this._timeScale || (0 === this._time || totalDur >= this.totalDuration()) && (isComplete && (_lazyTweens.length && _lazyRender(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !suppressEvents && this.vars[callback] && this._callback(callback)))
                    }
                }, p._hasPausedChild = function() {
                    for (var tween = this._first; tween;) {
                        if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) return !0;
                        tween = tween._next
                    }
                    return !1
                }, p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
                    ignoreBeforeTime = ignoreBeforeTime || -9999999999;
                    for (var a = [], tween = this._first, cnt = 0; tween;) tween._startTime < ignoreBeforeTime || (tween instanceof TweenLite ? !1 !== tweens && (a[cnt++] = tween) : (!1 !== timelines && (a[cnt++] = tween), !1 !== nested && (a = a.concat(tween.getChildren(!0, tweens, timelines)), cnt = a.length))), tween = tween._next;
                    return a
                }, p.getTweensOf = function(target, nested) {
                    var tweens, i, disabled = this._gc,
                        a = [],
                        cnt = 0;
                    for (disabled && this._enabled(!0, !0), tweens = TweenLite.getTweensOf(target), i = tweens.length; --i > -1;)(tweens[i].timeline === this || nested && this._contains(tweens[i])) && (a[cnt++] = tweens[i]);
                    return disabled && this._enabled(!1, !0), a
                }, p.recent = function() {
                    return this._recent
                }, p._contains = function(tween) {
                    for (var tl = tween.timeline; tl;) {
                        if (tl === this) return !0;
                        tl = tl.timeline
                    }
                    return !1
                }, p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
                    ignoreBeforeTime = ignoreBeforeTime || 0;
                    for (var p, tween = this._first, labels = this._labels; tween;) tween._startTime >= ignoreBeforeTime && (tween._startTime += amount), tween = tween._next;
                    if (adjustLabels)
                        for (p in labels) labels[p] >= ignoreBeforeTime && (labels[p] += amount);
                    return this._uncache(!0)
                }, p._kill = function(vars, target) {
                    if (!vars && !target) return this._enabled(!1, !1);
                    for (var tweens = target ? this.getTweensOf(target) : this.getChildren(!0, !0, !1), i = tweens.length, changed = !1; --i > -1;) tweens[i]._kill(vars, target) && (changed = !0);
                    return changed
                }, p.clear = function(labels) {
                    var tweens = this.getChildren(!1, !0, !0),
                        i = tweens.length;
                    for (this._time = this._totalTime = 0; --i > -1;) tweens[i]._enabled(!1, !1);
                    return !1 !== labels && (this._labels = {}), this._uncache(!0)
                }, p.invalidate = function() {
                    for (var tween = this._first; tween;) tween.invalidate(), tween = tween._next;
                    return Animation.prototype.invalidate.call(this)
                }, p._enabled = function(enabled, ignoreTimeline) {
                    if (enabled === this._gc)
                        for (var tween = this._first; tween;) tween._enabled(enabled, !0), tween = tween._next;
                    return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline)
                }, p.totalTime = function(time, suppressEvents, uncapped) {
                    this._forcingPlayhead = !0;
                    var val = Animation.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, val
                }, p.duration = function(value) {
                    return arguments.length ? (0 !== this.duration() && 0 !== value && this.timeScale(this._duration / value), this) : (this._dirty && this.totalDuration(), this._duration)
                }, p.totalDuration = function(value) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var prev, end, max = 0, tween = this._last, prevStart = 999999999999; tween;) prev = tween._prev, tween._dirty && tween.totalDuration(), tween._startTime > prevStart && this._sortChildren && !tween._paused ? this.add(tween, tween._startTime - tween._delay) : prevStart = tween._startTime, tween._startTime < 0 && !tween._paused && (max -= tween._startTime, this._timeline.smoothChildTiming && (this._startTime += tween._startTime / this._timeScale), this.shiftChildren(-tween._startTime, !1, -9999999999), prevStart = 0), end = tween._startTime + tween._totalDuration / tween._timeScale, end > max && (max = end), tween = prev;
                            this._duration = this._totalDuration = max, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this
                }, p.paused = function(value) {
                    if (!value)
                        for (var tween = this._first, time = this._time; tween;) tween._startTime === time && "isPause" === tween.data && (tween._rawPrevTime = 0), tween = tween._next;
                    return Animation.prototype.paused.apply(this, arguments)
                }, p.usesFrames = function() {
                    for (var tl = this._timeline; tl._timeline;) tl = tl._timeline;
                    return tl === Animation._rootFramesTimeline
                }, p.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, TimelineLite
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(TimelineLite, TweenLite, Ease) {
                var TimelineMax = function(vars) {
                        TimelineLite.call(this, vars), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
                    },
                    TweenLiteInternals = TweenLite._internals,
                    _lazyTweens = TweenLiteInternals.lazyTweens,
                    _lazyRender = TweenLiteInternals.lazyRender,
                    _globals = _gsScope._gsDefine.globals,
                    _easeNone = new Ease(null, null, 1, 0),
                    p = TimelineMax.prototype = new TimelineLite;
                return p.constructor = TimelineMax, p.kill()._gc = !1, TimelineMax.version = "1.19.0", p.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), TimelineLite.prototype.invalidate.call(this)
                }, p.addCallback = function(callback, position, params, scope) {
                    return this.add(TweenLite.delayedCall(0, callback, params, scope), position)
                }, p.removeCallback = function(callback, position) {
                    if (callback)
                        if (null == position) this._kill(null, callback);
                        else
                            for (var a = this.getTweensOf(callback, !1), i = a.length, time = this._parseTimeOrLabel(position); --i > -1;) a[i]._startTime === time && a[i]._enabled(!1, !1);
                    return this
                }, p.removePause = function(position) {
                    return this.removeCallback(TimelineLite._internals.pauseCallback, position)
                }, p.tweenTo = function(position, vars) {
                    vars = vars || {};
                    var duration, p, t, copy = {
                            ease: _easeNone,
                            useFrames: this.usesFrames(),
                            immediateRender: !1
                        },
                        Engine = vars.repeat && _globals.TweenMax || TweenLite;
                    for (p in vars) copy[p] = vars[p];
                    return copy.time = this._parseTimeOrLabel(position), duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || .001, t = new Engine(this, duration, copy), copy.onStart = function() {
                        t.target.paused(!0), t.vars.time !== t.target.time() && duration === t.duration() && t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale), vars.onStart && t._callback("onStart")
                    }, t
                }, p.tweenFromTo = function(fromPosition, toPosition, vars) {
                    vars = vars || {}, fromPosition = this._parseTimeOrLabel(fromPosition), vars.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [fromPosition],
                        callbackScope: this
                    }, vars.immediateRender = !1 !== vars.immediateRender;
                    var t = this.tweenTo(toPosition, vars);
                    return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || .001)
                }, p.render = function(time, suppressEvents, force) {
                    this._gc && this._enabled(!0, !1);
                    var tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime, totalDur = this._dirty ? this.totalDuration() : this._totalDuration,
                        dur = this._duration,
                        prevTime = this._time,
                        prevTotalTime = this._totalTime,
                        prevStart = this._startTime,
                        prevTimeScale = this._timeScale,
                        prevRawPrevTime = this._rawPrevTime,
                        prevPaused = this._paused,
                        prevCycle = this._cycle;
                    if (time >= totalDur - 1e-7) this._locked || (this._totalTime = totalDur, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (isComplete = !0, callback = "onComplete", internalForce = !!this._timeline.autoRemoveChildren, 0 === this._duration && (time <= 0 && time >= -1e-7 || prevRawPrevTime < 0 || 1e-10 === prevRawPrevTime) && prevRawPrevTime !== time && this._first && (internalForce = !0, prevRawPrevTime > 1e-10 && (callback = "onReverseComplete"))), this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : 1e-10, this._yoyo && 0 != (1 & this._cycle) ? this._time = time = 0 : (this._time = dur, time = dur + 1e-4);
                    else if (time < 1e-7)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== prevTime || 0 === dur && 1e-10 !== prevRawPrevTime && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !this._locked) && (callback = "onReverseComplete", isComplete = this._reversed), time < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (internalForce = isComplete = !0, callback = "onReverseComplete") : prevRawPrevTime >= 0 && this._first && (internalForce = !0), this._rawPrevTime = time;
                        else {
                            if (this._rawPrevTime = dur || !suppressEvents || time || this._rawPrevTime === time ? time : 1e-10, 0 === time && isComplete)
                                for (tween = this._first; tween && 0 === tween._startTime;) tween._duration || (isComplete = !1), tween = tween._next;
                            time = 0, this._initted || (internalForce = !0)
                        }
                    else if (0 === dur && prevRawPrevTime < 0 && (internalForce = !0), this._time = this._rawPrevTime = time, this._locked || (this._totalTime = time, 0 !== this._repeat && (cycleDuration = dur + this._repeatDelay, this._cycle = this._totalTime / cycleDuration >> 0, 0 !== this._cycle && this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time && this._cycle--, this._time = this._totalTime - this._cycle * cycleDuration, this._yoyo && 0 != (1 & this._cycle) && (this._time = dur - this._time), this._time > dur ? (this._time = dur, time = dur + 1e-4) : this._time < 0 ? this._time = time = 0 : time = this._time)), this._hasPause && !this._forcingPlayhead && !suppressEvents) {
                        if ((time = this._time) >= prevTime)
                            for (tween = this._first; tween && tween._startTime <= time && !pauseTween;) tween._duration || "isPause" !== tween.data || tween.ratio || 0 === tween._startTime && 0 === this._rawPrevTime || (pauseTween = tween), tween = tween._next;
                        else
                            for (tween = this._last; tween && tween._startTime >= time && !pauseTween;) tween._duration || "isPause" === tween.data && tween._rawPrevTime > 0 && (pauseTween = tween), tween = tween._prev;
                        pauseTween && (this._time = time = pauseTween._startTime, this._totalTime = time + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== prevCycle && !this._locked) {
                        var backwards = this._yoyo && 0 != (1 & prevCycle),
                            wrap = backwards === (this._yoyo && 0 != (1 & this._cycle)),
                            recTotalTime = this._totalTime,
                            recCycle = this._cycle,
                            recRawPrevTime = this._rawPrevTime,
                            recTime = this._time;
                        if (this._totalTime = prevCycle * dur, this._cycle < prevCycle ? backwards = !backwards : this._totalTime += dur, this._time = prevTime, this._rawPrevTime = 0 === dur ? prevRawPrevTime - 1e-4 : prevRawPrevTime, this._cycle = prevCycle, this._locked = !0, prevTime = backwards ? 0 : dur, this.render(prevTime, suppressEvents, 0 === dur), suppressEvents || this._gc || this.vars.onRepeat && this._callback("onRepeat"), prevTime !== this._time) return;
                        if (wrap && (prevTime = backwards ? dur + 1e-4 : -1e-4, this.render(prevTime, !0, !1)), this._locked = !1, this._paused && !prevPaused) return;
                        this._time = recTime, this._totalTime = recTotalTime, this._cycle = recCycle, this._rawPrevTime = recRawPrevTime
                    }
                    if (!(this._time !== prevTime && this._first || force || internalForce || pauseTween)) return void(prevTotalTime !== this._totalTime && this._onUpdate && (suppressEvents || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== prevTotalTime && time > 0 && (this._active = !0), 0 === prevTotalTime && this.vars.onStart && (0 === this._totalTime && this._totalDuration || suppressEvents || this._callback("onStart")), (curTime = this._time) >= prevTime)
                        for (tween = this._first; tween && (next = tween._next, curTime === this._time && (!this._paused || prevPaused));)(tween._active || tween._startTime <= this._time && !tween._paused && !tween._gc) && (pauseTween === tween && this.pause(), tween._reversed ? tween.render((tween._dirty ? tween.totalDuration() : tween._totalDuration) - (time - tween._startTime) * tween._timeScale, suppressEvents, force) : tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)), tween = next;
                    else
                        for (tween = this._last; tween && (next = tween._prev, curTime === this._time && (!this._paused || prevPaused));) {
                            if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
                                if (pauseTween === tween) {
                                    for (pauseTween = tween._prev; pauseTween && pauseTween.endTime() > this._time;) pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force), pauseTween = pauseTween._prev;
                                    pauseTween = null, this.pause()
                                }
                                tween._reversed ? tween.render((tween._dirty ? tween.totalDuration() : tween._totalDuration) - (time - tween._startTime) * tween._timeScale, suppressEvents, force) : tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)
                            }
                            tween = next
                        }
                    this._onUpdate && (suppressEvents || (_lazyTweens.length && _lazyRender(), this._callback("onUpdate"))), callback && (this._locked || this._gc || prevStart !== this._startTime && prevTimeScale === this._timeScale || (0 === this._time || totalDur >= this.totalDuration()) && (isComplete && (_lazyTweens.length && _lazyRender(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !suppressEvents && this.vars[callback] && this._callback(callback)))
                }, p.getActive = function(nested, tweens, timelines) {
                    null == nested && (nested = !0), null == tweens && (tweens = !0),
                        null == timelines && (timelines = !1);
                    var i, tween, a = [],
                        all = this.getChildren(nested, tweens, timelines),
                        cnt = 0,
                        l = all.length;
                    for (i = 0; i < l; i++) tween = all[i], tween.isActive() && (a[cnt++] = tween);
                    return a
                }, p.getLabelAfter = function(time) {
                    time || 0 !== time && (time = this._time);
                    var i, labels = this.getLabelsArray(),
                        l = labels.length;
                    for (i = 0; i < l; i++)
                        if (labels[i].time > time) return labels[i].name;
                    return null
                }, p.getLabelBefore = function(time) {
                    null == time && (time = this._time);
                    for (var labels = this.getLabelsArray(), i = labels.length; --i > -1;)
                        if (labels[i].time < time) return labels[i].name;
                    return null
                }, p.getLabelsArray = function() {
                    var p, a = [],
                        cnt = 0;
                    for (p in this._labels) a[cnt++] = {
                        time: this._labels[p],
                        name: p
                    };
                    return a.sort(function(a, b) {
                        return a.time - b.time
                    }), a
                }, p.progress = function(value, suppressEvents) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents) : this._time / this.duration()
                }, p.totalProgress = function(value, suppressEvents) {
                    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this._totalTime / this.totalDuration()
                }, p.totalDuration = function(value) {
                    return arguments.length ? -1 !== this._repeat && value ? this.timeScale(this.totalDuration() / value) : this : (this._dirty && (TimelineLite.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, p.time = function(value, suppressEvents) {
                    return arguments.length ? (this._dirty && this.totalDuration(), value > this._duration && (value = this._duration), this._yoyo && 0 != (1 & this._cycle) ? value = this._duration - value + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (value += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(value, suppressEvents)) : this._time
                }, p.repeat = function(value) {
                    return arguments.length ? (this._repeat = value, this._uncache(!0)) : this._repeat
                }, p.repeatDelay = function(value) {
                    return arguments.length ? (this._repeatDelay = value, this._uncache(!0)) : this._repeatDelay
                }, p.yoyo = function(value) {
                    return arguments.length ? (this._yoyo = value, this) : this._yoyo
                }, p.currentLabel = function(value) {
                    return arguments.length ? this.seek(value, !0) : this.getLabelBefore(this._time + 1e-8)
                }, TimelineMax
            }, !0),
            function() {
                var _RAD2DEG = 180 / Math.PI,
                    _r1 = [],
                    _r2 = [],
                    _r3 = [],
                    _corProps = {},
                    _globals = _gsScope._gsDefine.globals,
                    Segment = function(a, b, c, d) {
                        c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
                    },
                    cubicToQuadratic = function(a, b, c, d) {
                        var q1 = {
                                a: a
                            },
                            q2 = {},
                            q3 = {},
                            q4 = {
                                c: d
                            },
                            mab = (a + b) / 2,
                            mbc = (b + c) / 2,
                            mcd = (c + d) / 2,
                            mabc = (mab + mbc) / 2,
                            mbcd = (mbc + mcd) / 2,
                            m8 = (mbcd - mabc) / 8;
                        return q1.b = mab + (a - mab) / 4, q2.b = mabc + m8, q1.c = q2.a = (q1.b + q2.b) / 2, q2.c = q3.a = (mabc + mbcd) / 2, q3.b = mbcd - m8, q4.b = mcd + (d - mcd) / 4, q3.c = q4.a = (q3.b + q4.b) / 2, [q1, q2, q3, q4]
                    },
                    _calculateControlPoints = function(a, curviness, quad, basic, correlate) {
                        var i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl, l = a.length - 1,
                            ii = 0,
                            cp1 = a[0].a;
                        for (i = 0; i < l; i++) seg = a[ii], p1 = seg.a, p2 = seg.d, p3 = a[ii + 1].d, correlate ? (r1 = _r1[i], r2 = _r2[i], tl = (r2 + r1) * curviness * .25 / (basic ? .5 : _r3[i] || .5), m1 = p2 - (p2 - p1) * (basic ? .5 * curviness : 0 !== r1 ? tl / r1 : 0), m2 = p2 + (p3 - p2) * (basic ? .5 * curviness : 0 !== r2 ? tl / r2 : 0), mm = p2 - (m1 + ((m2 - m1) * (3 * r1 / (r1 + r2) + .5) / 4 || 0))) : (m1 = p2 - (p2 - p1) * curviness * .5, m2 = p2 + (p3 - p2) * curviness * .5, mm = p2 - (m1 + m2) / 2), m1 += mm, m2 += mm, seg.c = cp2 = m1, seg.b = 0 !== i ? cp1 : cp1 = seg.a + .6 * (seg.c - seg.a), seg.da = p2 - p1, seg.ca = cp2 - p1, seg.ba = cp1 - p1, quad ? (qb = cubicToQuadratic(p1, cp1, cp2, p2), a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]), ii += 4) : ii++, cp1 = m2;
                        seg = a[ii], seg.b = cp1, seg.c = cp1 + .4 * (seg.d - cp1), seg.da = seg.d - seg.a, seg.ca = seg.c - seg.a, seg.ba = cp1 - seg.a, quad && (qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d), a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]))
                    },
                    _parseAnchors = function(values, p, correlate, prepend) {
                        var l, i, p1, p2, p3, tmp, a = [];
                        if (prepend)
                            for (values = [prepend].concat(values), i = values.length; --i > -1;) "string" == typeof(tmp = values[i][p]) && "=" === tmp.charAt(1) && (values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)));
                        if ((l = values.length - 2) < 0) return a[0] = new Segment(values[0][p], 0, 0, values[l < -1 ? 0 : 1][p]), a;
                        for (i = 0; i < l; i++) p1 = values[i][p], p2 = values[i + 1][p], a[i] = new Segment(p1, 0, 0, p2), correlate && (p3 = values[i + 2][p], _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1), _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2));
                        return a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]), a
                    },
                    bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
                        var i, p, a, j, r, l, seamless, last, obj = {},
                            props = [],
                            first = prepend || values[0];
                        correlate = "string" == typeof correlate ? "," + correlate + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == curviness && (curviness = 1);
                        for (p in values[0]) props.push(p);
                        if (values.length > 1) {
                            for (last = values[values.length - 1], seamless = !0, i = props.length; --i > -1;)
                                if (p = props[i], Math.abs(first[p] - last[p]) > .05) {
                                    seamless = !1;
                                    break
                                }
                            seamless && (values = values.concat(), prepend && values.unshift(prepend), values.push(values[1]), prepend = values[values.length - 3])
                        }
                        for (_r1.length = _r2.length = _r3.length = 0, i = props.length; --i > -1;) p = props[i], _corProps[p] = -1 !== correlate.indexOf("," + p + ","), obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
                        for (i = _r1.length; --i > -1;) _r1[i] = Math.sqrt(_r1[i]), _r2[i] = Math.sqrt(_r2[i]);
                        if (!basic) {
                            for (i = props.length; --i > -1;)
                                if (_corProps[p])
                                    for (a = obj[props[i]], l = a.length - 1, j = 0; j < l; j++) r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0, _r3[j] = (_r3[j] || 0) + r * r;
                            for (i = _r3.length; --i > -1;) _r3[i] = Math.sqrt(_r3[i])
                        }
                        for (i = props.length, j = quadratic ? 4 : 1; --i > -1;) p = props[i], a = obj[p], _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]), seamless && (a.splice(0, j), a.splice(a.length - j, j));
                        return obj
                    },
                    _parseBezierData = function(values, type, prepend) {
                        type = type || "soft";
                        var a, b, c, d, cur, i, j, l, p, cnt, tmp, obj = {},
                            inc = "cubic" === type ? 3 : 2,
                            soft = "soft" === type,
                            props = [];
                        if (soft && prepend && (values = [prepend].concat(values)), null == values || values.length < inc + 1) throw "invalid Bezier data";
                        for (p in values[0]) props.push(p);
                        for (i = props.length; --i > -1;) {
                            for (p = props[i], obj[p] = cur = [], cnt = 0, l = values.length, j = 0; j < l; j++) a = null == prepend ? values[j][p] : "string" == typeof(tmp = values[j][p]) && "=" === tmp.charAt(1) ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp), soft && j > 1 && j < l - 1 && (cur[cnt++] = (a + cur[cnt - 2]) / 2), cur[cnt++] = a;
                            for (l = cnt - inc + 1, cnt = 0, j = 0; j < l; j += inc) a = cur[j], b = cur[j + 1], c = cur[j + 2], d = 2 === inc ? 0 : cur[j + 3], cur[cnt++] = tmp = 3 === inc ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
                            cur.length = cnt
                        }
                        return obj
                    },
                    _addCubicLengths = function(a, steps, resolution) {
                        for (var d, d1, s, da, ca, ba, p, i, inv, bez, index, inc = 1 / resolution, j = a.length; --j > -1;)
                            for (bez = a[j], s = bez.a, da = bez.d - s, ca = bez.c - s, ba = bez.b - s, d = d1 = 0, i = 1; i <= resolution; i++) p = inc * i, inv = 1 - p, d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p), index = j * resolution + i - 1, steps[index] = (steps[index] || 0) + d * d
                    },
                    _parseLengthData = function(obj, resolution) {
                        resolution = resolution >> 0 || 6;
                        var p, i, l, index, a = [],
                            lengths = [],
                            d = 0,
                            total = 0,
                            threshold = resolution - 1,
                            segments = [],
                            curLS = [];
                        for (p in obj) _addCubicLengths(obj[p], a, resolution);
                        for (l = a.length, i = 0; i < l; i++) d += Math.sqrt(a[i]), index = i % resolution, curLS[index] = d, index === threshold && (total += d, index = i / resolution >> 0, segments[index] = curLS, lengths[index] = total, d = 0, curLS = []);
                        return {
                            length: total,
                            lengths: lengths,
                            segments: segments
                        }
                    },
                    BezierPlugin = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.7",
                        API: 2,
                        global: !0,
                        init: function(target, vars, tween) {
                            this._target = target, vars instanceof Array && (vars = {
                                values: vars
                            }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == vars.timeResolution ? 6 : parseInt(vars.timeResolution, 10);
                            var p, isFunc, i, j, prepend, values = vars.values || [],
                                first = {},
                                second = values[0],
                                autoRotate = vars.autoRotate || tween.vars.orientToBezier;
                            this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [
                                ["x", "y", "rotation", !0 === autoRotate ? 0 : Number(autoRotate) || 0]
                            ] : null;
                            for (p in second) this._props.push(p);
                            for (i = this._props.length; --i > -1;) p = this._props[i], this._overwriteProps.push(p), isFunc = this._func[p] = "function" == typeof target[p], first[p] = isFunc ? target[p.indexOf("set") || "function" != typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)]() : parseFloat(target[p]), prepend || first[p] !== values[0][p] && (prepend = first);
                            if (this._beziers = "cubic" !== vars.type && "quadratic" !== vars.type && "soft" !== vars.type ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, !1, "thruBasic" === vars.type, vars.correlate, prepend) : _parseBezierData(values, vars.type, first), this._segCount = this._beziers[p].length, this._timeRes) {
                                var ld = _parseLengthData(this._beziers, this._timeRes);
                                this._length = ld.length, this._lengths = ld.lengths, this._segments = ld.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (autoRotate = this._autoRotate)
                                for (this._initialRotations = [], autoRotate[0] instanceof Array || (this._autoRotate = autoRotate = [autoRotate]), i = autoRotate.length; --i > -1;) {
                                    for (j = 0; j < 3; j++) p = autoRotate[i][j], this._func[p] = "function" == typeof target[p] && target[p.indexOf("set") || "function" != typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)];
                                    p = autoRotate[i][2], this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0, this._overwriteProps.push(p)
                                }
                            return this._startRatio = tween.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(v) {
                            var curIndex, inv, i, p, b, t, val, l, lengths, curSeg, segments = this._segCount,
                                func = this._func,
                                target = this._target,
                                notStart = v !== this._startRatio;
                            if (this._timeRes) {
                                if (lengths = this._lengths, curSeg = this._curSeg, v *= this._length, i = this._li, v > this._l2 && i < segments - 1) {
                                    for (l = segments - 1; i < l && (this._l2 = lengths[++i]) <= v;);
                                    this._l1 = lengths[i - 1], this._li = i, this._curSeg = curSeg = this._segments[i], this._s2 = curSeg[this._s1 = this._si = 0]
                                } else if (v < this._l1 && i > 0) {
                                    for (; i > 0 && (this._l1 = lengths[--i]) >= v;);
                                    0 === i && v < this._l1 ? this._l1 = 0 : i++, this._l2 = lengths[i], this._li = i, this._curSeg = curSeg = this._segments[i], this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0, this._s2 = curSeg[this._si]
                                }
                                if (curIndex = i, v -= this._l1, i = this._si, v > this._s2 && i < curSeg.length - 1) {
                                    for (l = curSeg.length - 1; i < l && (this._s2 = curSeg[++i]) <= v;);
                                    this._s1 = curSeg[i - 1], this._si = i
                                } else if (v < this._s1 && i > 0) {
                                    for (; i > 0 && (this._s1 = curSeg[--i]) >= v;);
                                    0 === i && v < this._s1 ? this._s1 = 0 : i++, this._s2 = curSeg[i], this._si = i
                                }
                                t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0, t = (v - curIndex * (1 / segments)) * segments;
                            for (inv = 1 - t, i = this._props.length; --i > -1;) p = this._props[i], b = this._beziers[p][curIndex], val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a, this._mod[p] && (val = this._mod[p](val, target)), func[p] ? target[p](val) : target[p] = val;
                            if (this._autoRotate) {
                                var b2, x1, y1, x2, y2, add, conv, ar = this._autoRotate;
                                for (i = ar.length; --i > -1;) p = ar[i][2], add = ar[i][3] || 0, conv = !0 === ar[i][4] ? 1 : _RAD2DEG, b = this._beziers[ar[i][0]], b2 = this._beziers[ar[i][1]], b && b2 && (b = b[curIndex], b2 = b2[curIndex], x1 = b.a + (b.b - b.a) * t, x2 = b.b + (b.c - b.b) * t, x1 += (x2 - x1) * t, x2 += (b.c + (b.d - b.c) * t - x2) * t, y1 = b2.a + (b2.b - b2.a) * t, y2 = b2.b + (b2.c - b2.b) * t, y1 += (y2 - y1) * t, y2 += (b2.c + (b2.d - b2.c) * t - y2) * t, val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i], this._mod[p] && (val = this._mod[p](val, target)), func[p] ? target[p](val) : target[p] = val)
                            }
                        }
                    }),
                    p = BezierPlugin.prototype;
                BezierPlugin.bezierThrough = bezierThrough, BezierPlugin.cubicToQuadratic = cubicToQuadratic, BezierPlugin._autoCSS = !0, BezierPlugin.quadraticToCubic = function(a, b, c) {
                    return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                }, BezierPlugin._cssRegister = function() {
                    var CSSPlugin = _globals.CSSPlugin;
                    if (CSSPlugin) {
                        var _internals = CSSPlugin._internals,
                            _parseToProxy = _internals._parseToProxy,
                            _setPluginRatio = _internals._setPluginRatio,
                            CSSPropTween = _internals.CSSPropTween;
                        _internals._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, prop, cssp, pt, plugin) {
                                e instanceof Array && (e = {
                                    values: e
                                }), plugin = new BezierPlugin;
                                var i, p, data, values = e.values,
                                    l = values.length - 1,
                                    pluginValues = [],
                                    v = {};
                                if (l < 0) return pt;
                                for (i = 0; i <= l; i++) data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i), pluginValues[i] = data.end;
                                for (p in e) v[p] = e[p];
                                return v.values = pluginValues, pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2), pt.data = data, pt.plugin = plugin, pt.setRatio = _setPluginRatio, 0 === v.autoRotate && (v.autoRotate = !0), !v.autoRotate || v.autoRotate instanceof Array || (i = !0 === v.autoRotate ? 0 : Number(v.autoRotate), v.autoRotate = null != data.end.left ? [
                                    ["left", "top", "rotation", i, !1]
                                ] : null != data.end.x && [
                                    ["x", "y", "rotation", i, !1]
                                ]), v.autoRotate && (cssp._transform || cssp._enableTransforms(!1), data.autoRotate = cssp._target._gsTransform, data.proxy.rotation = data.autoRotate.rotation || 0, cssp._overwriteProps.push("rotation")), plugin._onInitTween(data.proxy, v, cssp._tween), pt
                            }
                        })
                    }
                }, p._mod = function(lookup) {
                    for (var val, op = this._overwriteProps, i = op.length; --i > -1;)(val = lookup[op[i]]) && "function" == typeof val && (this._mod[op[i]] = val)
                }, p._kill = function(lookup) {
                    var p, i, a = this._props;
                    for (p in this._beziers)
                        if (p in lookup)
                            for (delete this._beziers[p], delete this._func[p], i = a.length; --i > -1;) a[i] === p && a.splice(i, 1);
                    if (a = this._autoRotate)
                        for (i = a.length; --i > -1;) lookup[a[i][2]] && a.splice(i, 1);
                    return this._super._kill.call(this, lookup)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(TweenPlugin, TweenLite) {
                var _hasPriority, _suffixMap, _cs, _overwriteProps, CSSPlugin = function() {
                        TweenPlugin.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = CSSPlugin.prototype.setRatio
                    },
                    _globals = _gsScope._gsDefine.globals,
                    _specialProps = {},
                    p = CSSPlugin.prototype = new TweenPlugin("css");
                p.constructor = CSSPlugin, CSSPlugin.version = "1.19.0", CSSPlugin.API = 2, CSSPlugin.defaultTransformPerspective = 0, CSSPlugin.defaultSkewType = "compensated", CSSPlugin.defaultSmoothOrigin = !0, p = "px", CSSPlugin.suffixMap = {
                    top: p,
                    right: p,
                    bottom: p,
                    left: p,
                    width: p,
                    height: p,
                    fontSize: p,
                    padding: p,
                    margin: p,
                    perspective: p,
                    lineHeight: ""
                };
                var _autoRound, _reqSafariFix, _isSafari, _isFirefox, _isSafariLT6, _ieVers, _target, _index, _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
                    _opacityExp = /opacity *= *([^)]*)/i,
                    _opacityValExp = /opacity:([^;]*)/i,
                    _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
                    _rgbhslExp = /^(rgb|hsl)/,
                    _capsExp = /([A-Z])/g,
                    _camelExp = /-([a-z])/gi,
                    _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    _camelFunc = function(s, g) {
                        return g.toUpperCase()
                    },
                    _horizExp = /(?:Left|Right|Width)/i,
                    _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi,
                    _complexExp = /[\s,\(]/i,
                    _DEG2RAD = Math.PI / 180,
                    _RAD2DEG = 180 / Math.PI,
                    _forcePT = {},
                    _doc = document,
                    _createElement = function(type) {
                        return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type)
                    },
                    _tempDiv = _createElement("div"),
                    _tempImg = _createElement("img"),
                    _internals = CSSPlugin._internals = {
                        _specialProps: _specialProps
                    },
                    _agent = navigator.userAgent,
                    _supportsOpacity = function() {
                        var i = _agent.indexOf("Android"),
                            a = _createElement("a");
                        return _isSafari = -1 !== _agent.indexOf("Safari") && -1 === _agent.indexOf("Chrome") && (-1 === i || Number(_agent.substr(i + 8, 1)) > 3), _isSafariLT6 = _isSafari && Number(_agent.substr(_agent.indexOf("Version/") + 8, 1)) < 6, _isFirefox = -1 !== _agent.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) && (_ieVers = parseFloat(RegExp.$1)), !!a && (a.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(a.style.opacity))
                    }(),
                    _getIEOpacity = function(v) {
                        return _opacityExp.test("string" == typeof v ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    _log = function(s) {
                        window.console && console.log(s)
                    },
                    _prefixCSS = "",
                    _prefix = "",
                    _checkPropPrefix = function(p, e) {
                        e = e || _tempDiv;
                        var a, i, s = e.style;
                        if (void 0 !== s[p]) return p;
                        for (p = p.charAt(0).toUpperCase() + p.substr(1), a = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === s[a[i] + p];);
                        return i >= 0 ? (_prefix = 3 === i ? "ms" : a[i], _prefixCSS = "-" + _prefix.toLowerCase() + "-", _prefix + p) : null
                    },
                    _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},
                    _getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
                        var rv;
                        return _supportsOpacity || "opacity" !== p ? (!calc && t.style[p] ? rv = t.style[p] : (cs = cs || _getComputedStyle(t)) ? rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase()) : t.currentStyle && (rv = t.currentStyle[p]), null == dflt || rv && "none" !== rv && "auto" !== rv && "auto auto" !== rv ? rv : dflt) : _getIEOpacity(t)
                    },
                    _convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
                        if ("px" === sfx || !sfx) return v;
                        if ("auto" === sfx || !v) return 0;
                        var pix, cache, time, horiz = _horizExp.test(p),
                            node = t,
                            style = _tempDiv.style,
                            neg = v < 0,
                            precise = 1 === v;
                        if (neg && (v = -v), precise && (v *= 100), "%" === sfx && -1 !== p.indexOf("border")) pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
                        else {
                            if (style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;", "%" !== sfx && node.appendChild && "v" !== sfx.charAt(0) && "rem" !== sfx) style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
                            else {
                                if (node = t.parentNode || _doc.body, cache = node._gsCache, time = TweenLite.ticker.frame, cache && horiz && cache.time === time) return cache.width * v / 100;
                                style[horiz ? "width" : "height"] = v + sfx
                            }
                            node.appendChild(_tempDiv), pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]), node.removeChild(_tempDiv), horiz && "%" === sfx && !1 !== CSSPlugin.cacheWidths && (cache = node._gsCache = node._gsCache || {}, cache.time = time, cache.width = pix / v * 100), 0 !== pix || recurse || (pix = _convertToPixels(t, p, v, sfx, !0))
                        }
                        return precise && (pix /= 100), neg ? -pix : pix
                    },
                    _calculateOffset = _internals.calculateOffset = function(t, p, cs) {
                        if ("absolute" !== _getStyle(t, "position", cs)) return 0;
                        var dim = "left" === p ? "Left" : "Top",
                            v = _getStyle(t, "margin" + dim, cs);
                        return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0)
                    },
                    _getAllStyles = function(t, cs) {
                        var i, tr, p, s = {};
                        if (cs = cs || _getComputedStyle(t, null))
                            if (i = cs.length)
                                for (; --i > -1;) p = cs[i], -1 !== p.indexOf("-transform") && _transformPropCSS !== p || (s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p));
                            else
                                for (i in cs) - 1 !== i.indexOf("Transform") && _transformProp !== i || (s[i] = cs[i]);
                        else if (cs = t.currentStyle || t.style)
                            for (i in cs) "string" == typeof i && void 0 === s[i] && (s[i.replace(_camelExp, _camelFunc)] = cs[i]);
                        return _supportsOpacity || (s.opacity = _getIEOpacity(t)), tr = _getTransform(t, cs, !1), s.rotation = tr.rotation, s.skewX = tr.skewX, s.scaleX = tr.scaleX, s.scaleY = tr.scaleY, s.x = tr.x, s.y = tr.y, _supports3D && (s.z = tr.z, s.rotationX = tr.rotationX, s.rotationY = tr.rotationY, s.scaleZ = tr.scaleZ), s.filters && delete s.filters, s
                    },
                    _cssDif = function(t, s1, s2, vars, forceLookup) {
                        var val, p, mpt, difs = {},
                            style = t.style;
                        for (p in s2) "cssText" !== p && "length" !== p && isNaN(p) && (s1[p] !== (val = s2[p]) || forceLookup && forceLookup[p]) && -1 === p.indexOf("Origin") && ("number" != typeof val && "string" != typeof val || (difs[p] = "auto" !== val || "left" !== p && "top" !== p ? "" !== val && "auto" !== val && "none" !== val || "string" != typeof s1[p] || "" === s1[p].replace(_NaNExp, "") ? val : 0 : _calculateOffset(t, p), void 0 !== style[p] && (mpt = new MiniPropTween(style, p, style[p], mpt))));
                        if (vars)
                            for (p in vars) "className" !== p && (difs[p] = vars[p]);
                        return {
                            difs: difs,
                            firstMPT: mpt
                        }
                    },
                    _dimensions = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    _getDimension = function(t, p, cs) {
                        if ("svg" === (t.nodeName + "").toLowerCase()) return (cs || _getComputedStyle(t))[p] || 0;
                        if (t.getBBox && _isSVG(t)) return t.getBBox()[p] || 0;
                        var v = parseFloat("width" === p ? t.offsetWidth : t.offsetHeight),
                            a = _dimensions[p],
                            i = a.length;
                        for (cs = cs || _getComputedStyle(t, null); --i > -1;) v -= parseFloat(_getStyle(t, "padding" + a[i], cs, !0)) || 0, v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, !0)) || 0;
                        return v
                    },
                    _parsePosition = function(v, recObj) {
                        if ("contain" === v || "auto" === v || "auto auto" === v) return v + " ";
                        null != v && "" !== v || (v = "0 0");
                        var i, a = v.split(" "),
                            x = -1 !== v.indexOf("left") ? "0%" : -1 !== v.indexOf("right") ? "100%" : a[0],
                            y = -1 !== v.indexOf("top") ? "0%" : -1 !== v.indexOf("bottom") ? "100%" : a[1];
                        if (a.length > 3 && !recObj) {
                            for (a = v.split(", ").join(",").split(","), v = [], i = 0; i < a.length; i++) v.push(_parsePosition(a[i]));
                            return v.join(",")
                        }
                        return null == y ? y = "center" === x ? "50%" : "0" : "center" === y && (y = "50%"), ("center" === x || isNaN(parseFloat(x)) && -1 === (x + "").indexOf("=")) && (x = "50%"), v = x + " " + y + (a.length > 2 ? " " + a[2] : ""), recObj && (recObj.oxp = -1 !== x.indexOf("%"), recObj.oyp = -1 !== y.indexOf("%"), recObj.oxr = "=" === x.charAt(1), recObj.oyr = "=" === y.charAt(1), recObj.ox = parseFloat(x.replace(_NaNExp, "")), recObj.oy = parseFloat(y.replace(_NaNExp, "")), recObj.v = v), recObj || v
                    },
                    _parseChange = function(e, b) {
                        return "function" == typeof e && (e = e(_index, _target)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0
                    },
                    _parseVal = function(v, d) {
                        return "function" == typeof v && (v = v(_index, _target)), null == v ? d : "string" == typeof v && "=" === v.charAt(1) ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0
                    },
                    _parseAngle = function(v, d, p, directionalEnd) {
                        var cap, split, dif, result, isRelative;
                        return "function" == typeof v && (v = v(_index, _target)), null == v ? result = d : "number" == typeof v ? result = v : (cap = 360, split = v.split("_"), isRelative = "=" === v.charAt(1), dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (-1 === v.indexOf("rad") ? 1 : _RAD2DEG) - (isRelative ? 0 : d), split.length && (directionalEnd && (directionalEnd[p] = d + dif), -1 !== v.indexOf("short") && (dif %= cap) !== dif % (cap / 2) && (dif = dif < 0 ? dif + cap : dif - cap), -1 !== v.indexOf("_cw") && dif < 0 ? dif = (dif + 9999999999 * cap) % cap - (dif / cap | 0) * cap : -1 !== v.indexOf("ccw") && dif > 0 && (dif = (dif - 9999999999 * cap) % cap - (dif / cap | 0) * cap)), result = d + dif), result < 1e-6 && result > -1e-6 && (result = 0), result
                    },
                    _colorLookup = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    _hue = function(h, m1, m2) {
                        return h = h < 0 ? h + 1 : h > 1 ? h - 1 : h, 255 * (6 * h < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : 3 * h < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) + .5 | 0
                    },
                    _parseColor = CSSPlugin.parseColor = function(v, toHSL) {
                        var a, r, g, b, h, s, l, max, min, d, wasHSL;
                        if (v)
                            if ("number" == typeof v) a = [v >> 16, v >> 8 & 255, 255 & v];
                            else {
                                if ("," === v.charAt(v.length - 1) && (v = v.substr(0, v.length - 1)), _colorLookup[v]) a = _colorLookup[v];
                                else if ("#" === v.charAt(0)) 4 === v.length && (r = v.charAt(1), g = v.charAt(2), b = v.charAt(3), v = "#" + r + r + g + g + b + b), v = parseInt(v.substr(1), 16), a = [v >> 16, v >> 8 & 255, 255 & v];
                                else if ("hsl" === v.substr(0, 3))
                                    if (a = wasHSL = v.match(_numExp), toHSL) {
                                        if (-1 !== v.indexOf("=")) return v.match(_relNumExp)
                                    } else h = Number(a[0]) % 360 / 360, s = Number(a[1]) / 100, l = Number(a[2]) / 100, g = l <= .5 ? l * (s + 1) : l + s - l * s, r = 2 * l - g, a.length > 3 && (a[3] = Number(v[3])), a[0] = _hue(h + 1 / 3, r, g), a[1] = _hue(h, r, g), a[2] = _hue(h - 1 / 3, r, g);
                                else a = v.match(_numExp) || _colorLookup.transparent;
                                a[0] = Number(a[0]), a[1] = Number(a[1]), a[2] = Number(a[2]), a.length > 3 && (a[3] = Number(a[3]))
                            }
                        else a = _colorLookup.black;
                        return toHSL && !wasHSL && (r = a[0] / 255, g = a[1] / 255, b = a[2] / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, max === min ? h = s = 0 : (d = max - min, s = l > .5 ? d / (2 - max - min) : d / (max + min), h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4, h *= 60), a[0] = h + .5 | 0, a[1] = 100 * s + .5 | 0, a[2] = 100 * l + .5 | 0), a
                    },
                    _formatColors = function(s, toHSL) {
                        var i, color, temp, colors = s.match(_colorExp) || [],
                            charIndex = 0,
                            parsed = colors.length ? "" : s;
                        for (i = 0; i < colors.length; i++) color = colors[i], temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex), charIndex += temp.length + color.length, color = _parseColor(color, toHSL), 3 === color.length && color.push(1), parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
                        return parsed + s.substr(charIndex)
                    },
                    _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (p in _colorLookup) _colorExp += "|" + p + "\\b";
                _colorExp = new RegExp(_colorExp + ")", "gi"), CSSPlugin.colorStringFilter = function(a) {
                    var toHSL, combined = a[0] + a[1];
                    _colorExp.test(combined) && (toHSL = -1 !== combined.indexOf("hsl(") || -1 !== combined.indexOf("hsla("), a[0] = _formatColors(a[0], toHSL), a[1] = _formatColors(a[1], toHSL)), _colorExp.lastIndex = 0
                }, TweenLite.defaultStringFilter || (TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter);
                var _getFormatter = function(dflt, clr, collapsible, multi) {
                        if (null == dflt) return function(v) {
                            return v
                        };
                        var formatter, dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
                            dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
                            pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
                            sfx = ")" === dflt.charAt(dflt.length - 1) ? ")" : "",
                            delim = -1 !== dflt.indexOf(" ") ? " " : ",",
                            numVals = dVals.length,
                            dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "";
                        return numVals ? formatter = clr ? function(v) {
                            var color, vals, i, a;
                            if ("number" == typeof v) v += dSfx;
                            else if (multi && _commasOutsideParenExp.test(v)) {
                                for (a = v.replace(_commasOutsideParenExp, "|").split("|"), i = 0; i < a.length; i++) a[i] = formatter(a[i]);
                                return a.join(",")
                            }
                            if (color = (v.match(_colorExp) || [dColor])[0], vals = v.split(color).join("").match(_valuesExp) || [], i = vals.length, numVals > i--)
                                for (; ++i < numVals;) vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
                            return pfx + vals.join(delim) + delim + color + sfx + (-1 !== v.indexOf("inset") ? " inset" : "")
                        } : function(v) {
                            var vals, a, i;
                            if ("number" == typeof v) v += dSfx;
                            else if (multi && _commasOutsideParenExp.test(v)) {
                                for (a = v.replace(_commasOutsideParenExp, "|").split("|"), i = 0; i < a.length; i++) a[i] = formatter(a[i]);
                                return a.join(",")
                            }
                            if (vals = v.match(_valuesExp) || [], i = vals.length, numVals > i--)
                                for (; ++i < numVals;) vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
                            return pfx + vals.join(delim) + sfx
                        } : function(v) {
                            return v
                        }
                    },
                    _getEdgeParser = function(props) {
                        return props = props.split(","),
                            function(t, e, p, cssp, pt, plugin, vars) {
                                var i, a = (e + "").split(" ");
                                for (vars = {}, i = 0; i < 4; i++) vars[props[i]] = a[i] = a[i] || a[(i - 1) / 2 >> 0];
                                return cssp.parse(t, vars, pt, plugin)
                            }
                    },
                    MiniPropTween = (_internals._setPluginRatio = function(v) {
                        this.plugin.setRatio(v);
                        for (var val, pt, i, str, p, d = this.data, proxy = d.proxy, mpt = d.firstMPT; mpt;) val = proxy[mpt.v], mpt.r ? val = Math.round(val) : val < 1e-6 && val > -1e-6 && (val = 0), mpt.t[mpt.p] = val, mpt = mpt._next;
                        if (d.autoRotate && (d.autoRotate.rotation = d.mod ? d.mod(proxy.rotation, this.t) : proxy.rotation), 1 === v || 0 === v)
                            for (mpt = d.firstMPT, p = 1 === v ? "e" : "b"; mpt;) {
                                if (pt = mpt.t, pt.type) {
                                    if (1 === pt.type) {
                                        for (str = pt.xs0 + pt.s + pt.xs1, i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                                        pt[p] = str
                                    }
                                } else pt[p] = pt.s + pt.xs0;
                                mpt = mpt._next
                            }
                    }, function(t, p, v, next, r) {
                        this.t = t, this.p = p, this.v = v, this.r = r, next && (next._prev = this, this._next = next)
                    }),
                    CSSPropTween = (_internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
                        var i, p, xp, mpt, firstPT, bpt = pt,
                            start = {},
                            end = {},
                            transform = cssp._transform,
                            oldForce = _forcePT;
                        for (cssp._transform = null, _forcePT = vars, pt = firstPT = cssp.parse(t, vars, pt, plugin), _forcePT = oldForce, shallow && (cssp._transform = transform, bpt && (bpt._prev = null, bpt._prev && (bpt._prev._next = null))); pt && pt !== bpt;) {
                            if (pt.type <= 1 && (p = pt.p, end[p] = pt.s + pt.c, start[p] = pt.s, shallow || (mpt = new MiniPropTween(pt, "s", p, mpt, pt.r), pt.c = 0), 1 === pt.type))
                                for (i = pt.l; --i > 0;) xp = "xn" + i, p = pt.p + "_" + xp, end[p] = pt.data[xp], start[p] = pt[xp], shallow || (mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]));
                            pt = pt._next
                        }
                        return {
                            proxy: start,
                            end: end,
                            firstMPT: mpt,
                            pt: firstPT
                        }
                    }, _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
                        this.t = t, this.p = p, this.s = s, this.c = c, this.n = n || p, t instanceof CSSPropTween || _overwriteProps.push(this.n), this.r = r, this.type = type || 0, pr && (this.pr = pr, _hasPriority = !0), this.b = void 0 === b ? s : b, this.e = void 0 === e ? s + c : e, next && (this._next = next, next._prev = this)
                    }),
                    _addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) {
                        var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
                        return pt.b = start, pt.e = pt.xs0 = end, pt
                    },
                    _parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
                        b = b || dflt || "", "function" == typeof e && (e = e(_index, _target)), pt = new CSSPropTween(t, p, 0, 0, pt, setRatio ? 2 : 1, null, !1, pr, b, e), e += "", clrs && _colorExp.test(e + b) && (e = [b, e], CSSPlugin.colorStringFilter(e), b = e[0], e = e[1]);
                        var i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL, ba = b.split(", ").join(",").split(" "),
                            ea = e.split(", ").join(",").split(" "),
                            l = ba.length,
                            autoRound = !1 !== _autoRound;
                        for (-1 === e.indexOf(",") && -1 === b.indexOf(",") || (ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" "), ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" "), l = ba.length), l !== ea.length && (ba = (dflt || "").split(" "), l = ba.length), pt.plugin = plugin, pt.setRatio = setRatio, _colorExp.lastIndex = 0, i = 0; i < l; i++)
                            if (bv = ba[i], ev = ea[i], (bn = parseFloat(bv)) || 0 === bn) pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && -1 !== ev.indexOf("px"), !0);
                            else if (clrs && _colorExp.test(bv)) str = ev.indexOf(")") + 1, str = ")" + (str ? ev.substr(str) : ""), useHSL = -1 !== ev.indexOf("hsl") && _supportsOpacity, bv = _parseColor(bv, useHSL), ev = _parseColor(ev, useHSL), hasAlpha = bv.length + ev.length > 6, hasAlpha && !_supportsOpacity && 0 === ev[3] ? (pt["xs" + pt.l] += pt.l ? " transparent" : "transparent", pt.e = pt.e.split(ea[i]).join("transparent")) : (_supportsOpacity || (hasAlpha = !1), useHSL ? pt.appendXtra(hasAlpha ? "hsla(" : "hsl(", bv[0], _parseChange(ev[0], bv[0]), ",", !1, !0).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", !1).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, !1) : pt.appendXtra(hasAlpha ? "rgba(" : "rgb(", bv[0], ev[0] - bv[0], ",", !0, !0).appendXtra("", bv[1], ev[1] - bv[1], ",", !0).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, !0), hasAlpha && (bv = bv.length < 4 ? 1 : bv[3], pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, !1))), _colorExp.lastIndex = 0;
                        else if (bnums = bv.match(_numExp)) {
                            if (!(enums = ev.match(_relNumExp)) || enums.length !== bnums.length) return pt;
                            for (ni = 0, xi = 0; xi < bnums.length; xi++) cv = bnums[xi], temp = bv.indexOf(cv, ni), pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && "px" === bv.substr(temp + cv.length, 2), 0 === xi), ni = temp + cv.length;
                            pt["xs" + pt.l] += bv.substr(ni)
                        } else pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev;
                        if (-1 !== e.indexOf("=") && pt.data) {
                            for (str = pt.xs0 + pt.data.s, i = 1; i < pt.l; i++) str += pt["xs" + i] + pt.data["xn" + i];
                            pt.e = str + pt["xs" + i]
                        }
                        return pt.l || (pt.type = -1, pt.xs0 = pt.e), pt.xfirst || pt
                    },
                    i = 9;
                for (p = CSSPropTween.prototype, p.l = p.pr = 0; --i > 0;) p["xn" + i] = 0, p["xs" + i] = "";
                p.xs0 = "", p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null, p.appendXtra = function(pfx, s, c, sfx, r, pad) {
                    var pt = this,
                        l = pt.l;
                    return pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "", c || 0 === l || pt.plugin ? (pt.l++, pt.type = pt.setRatio ? 2 : 1, pt["xs" + pt.l] = sfx || "", l > 0 ? (pt.data["xn" + l] = s + c, pt.rxp["xn" + l] = r, pt["xn" + l] = s, pt.plugin || (pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr), pt.xfirst.xs0 = 0), pt) : (pt.data = {
                        s: s + c
                    }, pt.rxp = {}, pt.s = s, pt.c = c, pt.r = r, pt)) : (pt["xs" + l] += s + (sfx || ""), pt)
                };
                var SpecialProp = function(p, options) {
                        options = options || {}, this.p = options.prefix ? _checkPropPrefix(p) || p : p, _specialProps[p] = _specialProps[this.p] = this, this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi), options.parser && (this.parse = options.parser), this.clrs = options.color, this.multi = options.multi, this.keyword = options.keyword, this.dflt = options.defaultValue, this.pr = options.priority || 0
                    },
                    _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
                        "object" != typeof options && (options = {
                            parser: defaults
                        });
                        var i, a = p.split(","),
                            d = options.defaultValue;
                        for (defaults = defaults || [d], i = 0; i < a.length; i++) options.prefix = 0 === i && options.prefix, options.defaultValue = defaults[i] || d, new SpecialProp(a[i], options)
                    },
                    _registerPluginProp = _internals._registerPluginProp = function(p) {
                        if (!_specialProps[p]) {
                            var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
                            _registerComplexSpecialProp(p, {
                                parser: function(t, e, p, cssp, pt, plugin, vars) {
                                    var pluginClass = _globals.com.greensock.plugins[pluginName];
                                    return pluginClass ? (pluginClass._cssRegister(), _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars)) : (_log("Error: " + pluginName + " js file not loaded."), pt)
                                }
                            })
                        }
                    };
                p = SpecialProp.prototype, p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
                    var i, ba, ea, l, bi, ei, kwd = this.keyword;
                    if (this.multi && (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b) ? (ba = b.replace(_commasOutsideParenExp, "|").split("|"),
                            ea = e.replace(_commasOutsideParenExp, "|").split("|")) : kwd && (ba = [b], ea = [e])), ea) {
                        for (l = ea.length > ba.length ? ea.length : ba.length, i = 0; i < l; i++) b = ba[i] = ba[i] || this.dflt, e = ea[i] = ea[i] || this.dflt, kwd && (bi = b.indexOf(kwd), ei = e.indexOf(kwd), bi !== ei && (-1 === ei ? ba[i] = ba[i].split(kwd).join("") : -1 === bi && (ba[i] += " " + kwd)));
                        b = ba.join(", "), e = ea.join(", ")
                    }
                    return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio)
                }, p.parse = function(t, e, p, cssp, pt, plugin, vars) {
                    return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, !1, this.dflt)), this.format(e), pt, plugin)
                }, CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
                    _registerComplexSpecialProp(name, {
                        parser: function(t, e, p, cssp, pt, plugin, vars) {
                            var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, !1, priority);
                            return rv.plugin = plugin, rv.setRatio = onInitTween(t, e, cssp._tween, p), rv
                        },
                        priority: priority
                    })
                }, CSSPlugin.useSVGTransformAttr = _isSafari || _isFirefox;
                var _useSVGTransformAttr, _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    _transformProp = _checkPropPrefix("transform"),
                    _transformPropCSS = _prefixCSS + "transform",
                    _transformOriginProp = _checkPropPrefix("transformOrigin"),
                    _supports3D = null !== _checkPropPrefix("perspective"),
                    Transform = _internals.Transform = function() {
                        this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0, this.force3D = !(!1 === CSSPlugin.defaultForce3D || !_supports3D) && (CSSPlugin.defaultForce3D || "auto")
                    },
                    _SVGElement = window.SVGElement,
                    _createSVG = function(type, container, attributes) {
                        var p, element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
                            reg = /([a-z])([A-Z])/g;
                        for (p in attributes) element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
                        return container.appendChild(element), element
                    },
                    _docElement = _doc.documentElement,
                    _forceSVGTransformAttr = function() {
                        var svg, rect, width, force = _ieVers || /Android/i.test(_agent) && !window.chrome;
                        return _doc.createElementNS && !force && (svg = _createSVG("svg", _docElement), rect = _createSVG("rect", svg, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), width = rect.getBoundingClientRect().width, rect.style[_transformOriginProp] = "50% 50%", rect.style[_transformProp] = "scaleX(0.5)", force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D), _docElement.removeChild(svg)), force
                    }(),
                    _parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
                        var v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld, tm = e._gsTransform,
                            m = _getMatrix(e, !0);
                        tm && (xOriginOld = tm.xOrigin, yOriginOld = tm.yOrigin), (!absolute || (v = absolute.split(" ")).length < 2) && (b = e.getBBox(), local = _parsePosition(local).split(" "), v = [(-1 !== local[0].indexOf("%") ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (-1 !== local[1].indexOf("%") ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y]), decoratee.xOrigin = xOrigin = parseFloat(v[0]), decoratee.yOrigin = yOrigin = parseFloat(v[1]), absolute && m !== _identity2DMatrix && (a = m[0], b = m[1], c = m[2], d = m[3], tx = m[4], ty = m[5], determinant = a * d - b * c, x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant, y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant, xOrigin = decoratee.xOrigin = v[0] = x, yOrigin = decoratee.yOrigin = v[1] = y), tm && (skipRecord && (decoratee.xOffset = tm.xOffset, decoratee.yOffset = tm.yOffset, tm = decoratee), smoothOrigin || !1 !== smoothOrigin && !1 !== CSSPlugin.defaultSmoothOrigin ? (x = xOrigin - xOriginOld, y = yOrigin - yOriginOld, tm.xOffset += x * m[0] + y * m[2] - x, tm.yOffset += x * m[1] + y * m[3] - y) : tm.xOffset = tm.yOffset = 0), skipRecord || e.setAttribute("data-svg-origin", v.join(" "))
                    },
                    _canGetBBox = function(e) {
                        try {
                            return e.getBBox()
                        } catch (e) {}
                    },
                    _isSVG = function(e) {
                        return !!(_SVGElement && e.getBBox && e.getCTM && _canGetBBox(e) && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM))
                    },
                    _identity2DMatrix = [1, 0, 0, 1, 0, 0],
                    _getMatrix = function(e, force2D) {
                        var isDefault, s, m, n, dec, none, tm = e._gsTransform || new Transform,
                            style = e.style;
                        if (_transformProp ? s = _getStyle(e, _transformPropCSS, null, !0) : e.currentStyle && (s = e.currentStyle.filter.match(_ieGetMatrixExp), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0].join(",") : ""), isDefault = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s, isDefault && _transformProp && ((none = "none" === _getComputedStyle(e).display) || !e.parentNode) && (none && (n = style.display, style.display = "block"), e.parentNode || (dec = 1, _docElement.appendChild(e)), s = _getStyle(e, _transformPropCSS, null, !0), isDefault = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s, n ? style.display = n : none && _removeProp(style, "display"), dec && _docElement.removeChild(e)), (tm.svg || e.getBBox && _isSVG(e)) && (isDefault && -1 !== (style[_transformProp] + "").indexOf("matrix") && (s = style[_transformProp], isDefault = 0), m = e.getAttribute("transform"), isDefault && m && (-1 !== m.indexOf("matrix") ? (s = m, isDefault = 0) : -1 !== m.indexOf("translate") && (s = "matrix(1,0,0,1," + m.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", isDefault = 0))), isDefault) return _identity2DMatrix;
                        for (m = (s || "").match(_numExp) || [], i = m.length; --i > -1;) n = Number(m[i]), m[i] = (dec = n - (n |= 0)) ? (1e5 * dec + (dec < 0 ? -.5 : .5) | 0) / 1e5 + n : n;
                        return force2D && m.length > 6 ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m
                    },
                    _getTransform = _internals.getTransform = function(t, cs, rec, parse) {
                        if (t._gsTransform && rec && !parse) return t._gsTransform;
                        var m, i, scaleX, scaleY, rotation, skewX, tm = rec ? t._gsTransform || new Transform : new Transform,
                            invX = tm.scaleX < 0,
                            zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, !1, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0,
                            defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
                        if (tm.svg = !(!t.getBBox || !_isSVG(t)), tm.svg && (_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, !1, "50% 50%") + "", tm, t.getAttribute("data-svg-origin")), _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr), (m = _getMatrix(t)) !== _identity2DMatrix) {
                            if (16 === m.length) {
                                var t1, t2, t3, cos, sin, a11 = m[0],
                                    a21 = m[1],
                                    a31 = m[2],
                                    a41 = m[3],
                                    a12 = m[4],
                                    a22 = m[5],
                                    a32 = m[6],
                                    a42 = m[7],
                                    a13 = m[8],
                                    a23 = m[9],
                                    a33 = m[10],
                                    a14 = m[12],
                                    a24 = m[13],
                                    a34 = m[14],
                                    a43 = m[11],
                                    angle = Math.atan2(a32, a33);
                                tm.zOrigin && (a34 = -tm.zOrigin, a14 = a13 * a34 - m[12], a24 = a23 * a34 - m[13], a34 = a33 * a34 + tm.zOrigin - m[14]), tm.rotationX = angle * _RAD2DEG, angle && (cos = Math.cos(-angle), sin = Math.sin(-angle), t1 = a12 * cos + a13 * sin, t2 = a22 * cos + a23 * sin, t3 = a32 * cos + a33 * sin, a13 = a12 * -sin + a13 * cos, a23 = a22 * -sin + a23 * cos, a33 = a32 * -sin + a33 * cos, a43 = a42 * -sin + a43 * cos, a12 = t1, a22 = t2, a32 = t3), angle = Math.atan2(-a31, a33), tm.rotationY = angle * _RAD2DEG, angle && (cos = Math.cos(-angle), sin = Math.sin(-angle), t1 = a11 * cos - a13 * sin, t2 = a21 * cos - a23 * sin, t3 = a31 * cos - a33 * sin, a23 = a21 * sin + a23 * cos, a33 = a31 * sin + a33 * cos, a43 = a41 * sin + a43 * cos, a11 = t1, a21 = t2, a31 = t3), angle = Math.atan2(a21, a11), tm.rotation = angle * _RAD2DEG, angle && (cos = Math.cos(-angle), sin = Math.sin(-angle), a11 = a11 * cos + a12 * sin, t2 = a21 * cos + a22 * sin, a22 = a21 * -sin + a22 * cos, a32 = a31 * -sin + a32 * cos, a21 = t2), tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9 && (tm.rotationX = tm.rotation = 0, tm.rotationY = 180 - tm.rotationY), tm.scaleX = (1e5 * Math.sqrt(a11 * a11 + a21 * a21) + .5 | 0) / 1e5, tm.scaleY = (1e5 * Math.sqrt(a22 * a22 + a23 * a23) + .5 | 0) / 1e5, tm.scaleZ = (1e5 * Math.sqrt(a32 * a32 + a33 * a33) + .5 | 0) / 1e5, tm.rotationX || tm.rotationY ? tm.skewX = 0 : (tm.skewX = a12 || a22 ? Math.atan2(a12, a22) * _RAD2DEG + tm.rotation : tm.skewX || 0, Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270 && (invX ? (tm.scaleX *= -1, tm.skewX += tm.rotation <= 0 ? 180 : -180, tm.rotation += tm.rotation <= 0 ? 180 : -180) : (tm.scaleY *= -1, tm.skewX += tm.skewX <= 0 ? 180 : -180))), tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0, tm.x = a14, tm.y = a24, tm.z = a34, tm.svg && (tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12), tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22))
                            } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
                                var k = m.length >= 6,
                                    a = k ? m[0] : 1,
                                    b = m[1] || 0,
                                    c = m[2] || 0,
                                    d = k ? m[3] : 1;
                                tm.x = m[4] || 0, tm.y = m[5] || 0, scaleX = Math.sqrt(a * a + b * b), scaleY = Math.sqrt(d * d + c * c), rotation = a || b ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0, skewX = c || d ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0, Math.abs(skewX) > 90 && Math.abs(skewX) < 270 && (invX ? (scaleX *= -1, skewX += rotation <= 0 ? 180 : -180, rotation += rotation <= 0 ? 180 : -180) : (scaleY *= -1, skewX += skewX <= 0 ? 180 : -180)), tm.scaleX = scaleX, tm.scaleY = scaleY, tm.rotation = rotation, tm.skewX = skewX, _supports3D && (tm.rotationX = tm.rotationY = tm.z = 0, tm.perspective = defaultTransformPerspective, tm.scaleZ = 1), tm.svg && (tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c), tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d))
                            }
                            tm.zOrigin = zOrigin;
                            for (i in tm) tm[i] < 2e-5 && tm[i] > -2e-5 && (tm[i] = 0)
                        }
                        return rec && (t._gsTransform = tm, tm.svg && (_useSVGTransformAttr && t.style[_transformProp] ? TweenLite.delayedCall(.001, function() {
                            _removeProp(t.style, _transformProp)
                        }) : !_useSVGTransformAttr && t.getAttribute("transform") && TweenLite.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), tm
                    },
                    _setIETransformRatio = function(v) {
                        var filters, val, t = this.data,
                            ang = -t.rotation * _DEG2RAD,
                            skew = ang + t.skewX * _DEG2RAD,
                            a = (Math.cos(ang) * t.scaleX * 1e5 | 0) / 1e5,
                            b = (Math.sin(ang) * t.scaleX * 1e5 | 0) / 1e5,
                            c = (Math.sin(skew) * -t.scaleY * 1e5 | 0) / 1e5,
                            d = (Math.cos(skew) * t.scaleY * 1e5 | 0) / 1e5,
                            style = this.t.style,
                            cs = this.t.currentStyle;
                        if (cs) {
                            val = b, b = -c, c = -val, filters = cs.filter, style.filter = "";
                            var dx, dy, w = this.t.offsetWidth,
                                h = this.t.offsetHeight,
                                clip = "absolute" !== cs.position,
                                m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
                                ox = t.x + w * t.xPercent / 100,
                                oy = t.y + h * t.yPercent / 100;
                            if (null != t.ox && (dx = (t.oxp ? w * t.ox * .01 : t.ox) - w / 2, dy = (t.oyp ? h * t.oy * .01 : t.oy) - h / 2, ox += dx - (dx * a + dy * b), oy += dy - (dx * c + dy * d)), clip ? (dx = w / 2, dy = h / 2, m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")") : m += ", sizingMethod='auto expand')", -1 !== filters.indexOf("DXImageTransform.Microsoft.Matrix(") ? style.filter = filters.replace(_ieSetMatrixExp, m) : style.filter = m + " " + filters, 0 !== v && 1 !== v || 1 === a && 0 === b && 0 === c && 1 === d && (clip && -1 === m.indexOf("Dx=0, Dy=0") || _opacityExp.test(filters) && 100 !== parseFloat(RegExp.$1) || -1 === filters.indexOf(filters.indexOf("Alpha")) && style.removeAttribute("filter")), !clip) {
                                var marg, prop, dif, mult = _ieVers < 8 ? 1 : -1;
                                for (dx = t.ieOffsetX || 0, dy = t.ieOffsetY || 0, t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox), t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy), i = 0; i < 4; i++) prop = _margins[i], marg = cs[prop], val = -1 !== marg.indexOf("px") ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0, dif = val !== t[prop] ? i < 2 ? -t.ieOffsetX : -t.ieOffsetY : i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY, style[prop] = (t[prop] = Math.round(val - dif * (0 === i || 2 === i ? 1 : mult))) + "px"
                            }
                        }
                    },
                    _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
                        var a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43, zOrigin, min, cos, sin, t1, t2, transform, comma, zero, skew, rnd, t = this.data,
                            style = this.t.style,
                            angle = t.rotation,
                            rotationX = t.rotationX,
                            rotationY = t.rotationY,
                            sx = t.scaleX,
                            sy = t.scaleY,
                            sz = t.scaleZ,
                            x = t.x,
                            y = t.y,
                            z = t.z,
                            isSVG = t.svg,
                            perspective = t.perspective,
                            force3D = t.force3D;
                        if (((1 === v || 0 === v) && "auto" === force3D && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && 1 === sz || _useSVGTransformAttr && isSVG || !_supports3D) return void(angle || t.skewX || isSVG ? (angle *= _DEG2RAD, skew = t.skewX * _DEG2RAD, rnd = 1e5, a11 = Math.cos(angle) * sx, a21 = Math.sin(angle) * sx, a12 = Math.sin(angle - skew) * -sy, a22 = Math.cos(angle - skew) * sy, skew && "simple" === t.skewType && (t1 = Math.tan(skew - t.skewY * _DEG2RAD), t1 = Math.sqrt(1 + t1 * t1), a12 *= t1, a22 *= t1, t.skewY && (t1 = Math.tan(t.skewY * _DEG2RAD), t1 = Math.sqrt(1 + t1 * t1), a11 *= t1, a21 *= t1)), isSVG && (x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset, y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset, _useSVGTransformAttr && (t.xPercent || t.yPercent) && (min = this.t.getBBox(), x += .01 * t.xPercent * min.width, y += .01 * t.yPercent * min.height), min = 1e-6, x < min && x > -min && (x = 0), y < min && y > -min && (y = 0)), transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")", isSVG && _useSVGTransformAttr ? this.t.setAttribute("transform", "matrix(" + transform) : style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform) : style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")");
                        if (_isFirefox && (min = 1e-4, sx < min && sx > -min && (sx = sz = 2e-5), sy < min && sy > -min && (sy = sz = 2e-5), !perspective || t.z || t.rotationX || t.rotationY || (perspective = 0)), angle || t.skewX) angle *= _DEG2RAD, cos = a11 = Math.cos(angle), sin = a21 = Math.sin(angle), t.skewX && (angle -= t.skewX * _DEG2RAD, cos = Math.cos(angle), sin = Math.sin(angle), "simple" === t.skewType && (t1 = Math.tan((t.skewX - t.skewY) * _DEG2RAD), t1 = Math.sqrt(1 + t1 * t1), cos *= t1, sin *= t1, t.skewY && (t1 = Math.tan(t.skewY * _DEG2RAD), t1 = Math.sqrt(1 + t1 * t1), a11 *= t1, a21 *= t1))), a12 = -sin, a22 = cos;
                        else {
                            if (!(rotationY || rotationX || 1 !== sz || perspective || isSVG)) return void(style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (1 !== sx || 1 !== sy ? " scale(" + sx + "," + sy + ")" : ""));
                            a11 = a22 = 1, a12 = a21 = 0
                        }
                        a33 = 1, a13 = a23 = a31 = a32 = a41 = a42 = 0, a43 = perspective ? -1 / perspective : 0, zOrigin = t.zOrigin, min = 1e-6, comma = ",", zero = "0", angle = rotationY * _DEG2RAD, angle && (cos = Math.cos(angle), sin = Math.sin(angle), a31 = -sin, a41 = a43 * -sin, a13 = a11 * sin, a23 = a21 * sin, a33 = cos, a43 *= cos, a11 *= cos, a21 *= cos), angle = rotationX * _DEG2RAD, angle && (cos = Math.cos(angle), sin = Math.sin(angle), t1 = a12 * cos + a13 * sin, t2 = a22 * cos + a23 * sin, a32 = a33 * sin, a42 = a43 * sin, a13 = a12 * -sin + a13 * cos, a23 = a22 * -sin + a23 * cos, a33 *= cos, a43 *= cos, a12 = t1, a22 = t2), 1 !== sz && (a13 *= sz, a23 *= sz, a33 *= sz, a43 *= sz), 1 !== sy && (a12 *= sy, a22 *= sy, a32 *= sy, a42 *= sy), 1 !== sx && (a11 *= sx, a21 *= sx, a31 *= sx, a41 *= sx), (zOrigin || isSVG) && (zOrigin && (x += a13 * -zOrigin, y += a23 * -zOrigin, z += a33 * -zOrigin + zOrigin), isSVG && (x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset, y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset), x < min && x > -min && (x = zero), y < min && y > -min && (y = zero), z < min && z > -min && (z = 0)), transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(", transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31), transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22), rotationX || rotationY || 1 !== sz ? (transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13), transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma) : transform += ",0,0,0,0,1,0,", transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")", style[_transformProp] = transform
                    };
                p = Transform.prototype, p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0, p.scaleX = p.scaleY = p.scaleZ = 1, _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, parsingProp, cssp, pt, plugin, vars) {
                        if (cssp._lastParsedTransform === vars) return pt;
                        cssp._lastParsedTransform = vars;
                        var swapFunc;
                        "function" == typeof vars[parsingProp] && (swapFunc = vars[parsingProp], vars[parsingProp] = e);
                        var m2, copy, has3D, hasChange, dr, x, y, matrix, p, originalGSTransform = t._gsTransform,
                            style = t.style,
                            i = _transformProps.length,
                            v = vars,
                            endRotations = {},
                            m1 = _getTransform(t, _cs, !0, v.parseTransform),
                            orig = v.transform && ("function" == typeof v.transform ? v.transform(_index, _target) : v.transform);
                        if (cssp._transform = m1, orig && "string" == typeof orig && _transformProp) copy = _tempDiv.style, copy[_transformProp] = orig, copy.display = "block", copy.position = "absolute", _doc.body.appendChild(_tempDiv), m2 = _getTransform(_tempDiv, null, !1), m1.svg && (x = m1.xOrigin, y = m1.yOrigin, m2.x -= m1.xOffset, m2.y -= m1.yOffset, (v.transformOrigin || v.svgOrigin) && (orig = {}, _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, !0), x = orig.xOrigin, y = orig.yOrigin, m2.x -= orig.xOffset - m1.xOffset, m2.y -= orig.yOffset - m1.yOffset), (x || y) && (matrix = _getMatrix(_tempDiv, !0), m2.x -= x - (x * matrix[0] + y * matrix[2]), m2.y -= y - (x * matrix[1] + y * matrix[3]))), _doc.body.removeChild(_tempDiv), m2.perspective || (m2.perspective = m1.perspective), null != v.xPercent && (m2.xPercent = _parseVal(v.xPercent, m1.xPercent)), null != v.yPercent && (m2.yPercent = _parseVal(v.yPercent, m1.yPercent));
                        else if ("object" == typeof v) {
                            if (m2 = {
                                    scaleX: _parseVal(null != v.scaleX ? v.scaleX : v.scale, m1.scaleX),
                                    scaleY: _parseVal(null != v.scaleY ? v.scaleY : v.scale, m1.scaleY),
                                    scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
                                    x: _parseVal(v.x, m1.x),
                                    y: _parseVal(v.y, m1.y),
                                    z: _parseVal(v.z, m1.z),
                                    xPercent: _parseVal(v.xPercent, m1.xPercent),
                                    yPercent: _parseVal(v.yPercent, m1.yPercent),
                                    perspective: _parseVal(v.transformPerspective, m1.perspective)
                                }, null != (dr = v.directionalRotation))
                                if ("object" == typeof dr)
                                    for (copy in dr) v[copy] = dr[copy];
                                else v.rotation = dr;
                            "string" == typeof v.x && -1 !== v.x.indexOf("%") && (m2.x = 0, m2.xPercent = _parseVal(v.x, m1.xPercent)), "string" == typeof v.y && -1 !== v.y.indexOf("%") && (m2.y = 0, m2.yPercent = _parseVal(v.y, m1.yPercent)), m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : "rotationZ" in v ? v.rotationZ : m1.rotation - m1.skewY, m1.rotation - m1.skewY, "rotation", endRotations), _supports3D && (m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations), m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations)), m2.skewX = _parseAngle(v.skewX, m1.skewX - m1.skewY), (m2.skewY = _parseAngle(v.skewY, m1.skewY)) && (m2.skewX += m2.skewY, m2.rotation += m2.skewY)
                        }
                        for (_supports3D && null != v.force3D && (m1.force3D = v.force3D, hasChange = !0), m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType, has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective, has3D || null == v.scale || (m2.scaleZ = 1); --i > -1;) p = _transformProps[i], ((orig = m2[p] - m1[p]) > 1e-6 || orig < -1e-6 || null != v[p] || null != _forcePT[p]) && (hasChange = !0, pt = new CSSPropTween(m1, p, m1[p], orig, pt), p in endRotations && (pt.e = endRotations[p]), pt.xs0 = 0, pt.plugin = plugin, cssp._overwriteProps.push(pt.n));
                        return orig = v.transformOrigin, m1.svg && (orig || v.svgOrigin) && (x = m1.xOffset, y = m1.yOffset, _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin), pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, "transformOrigin"), pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, "transformOrigin"), x === m1.xOffset && y === m1.yOffset || (pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, "transformOrigin"), pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, "transformOrigin")), orig = _useSVGTransformAttr ? null : "0px 0px"), (orig || _supports3D && has3D && m1.zOrigin) && (_transformProp ? (hasChange = !0, p = _transformOriginProp, orig = (orig || _getStyle(t, p, _cs, !1, "50% 50%")) + "", pt = new CSSPropTween(style, p, 0, 0, pt, -1, "transformOrigin"), pt.b = style[p], pt.plugin = plugin, _supports3D ? (copy = m1.zOrigin, orig = orig.split(" "), m1.zOrigin = (orig.length > 2 && (0 === copy || "0px" !== orig[2]) ? parseFloat(orig[2]) : copy) || 0, pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px", pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n), pt.b = copy, pt.xs0 = pt.e = m1.zOrigin) : pt.xs0 = pt.e = orig) : _parsePosition(orig + "", m1)), hasChange && (cssp._transformType = m1.svg && _useSVGTransformAttr || !has3D && 3 !== this._transformType ? 2 : 3), swapFunc && (vars[parsingProp] = swapFunc), pt
                    },
                    prefix: !0
                }), _registerComplexSpecialProp("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), _registerComplexSpecialProp("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        e = this.format(e);
                        var ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em, props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            style = t.style;
                        for (w = parseFloat(t.offsetWidth), h = parseFloat(t.offsetHeight), ea1 = e.split(" "), i = 0; i < props.length; i++) this.p.indexOf("border") && (props[i] = _checkPropPrefix(props[i])), bs = bs2 = _getStyle(t, props[i], _cs, !1, "0px"), -1 !== bs.indexOf(" ") && (bs2 = bs.split(" "), bs = bs2[0], bs2 = bs2[1]), es = es2 = ea1[i], bn = parseFloat(bs), bsfx = bs.substr((bn + "").length), rel = "=" === es.charAt(1), rel ? (en = parseInt(es.charAt(0) + "1", 10), es = es.substr(2), en *= parseFloat(es), esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "") : (en = parseFloat(es), esfx = es.substr((en + "").length)), "" === esfx && (esfx = _suffixMap[p] || bsfx), esfx !== bsfx && (hn = _convertToPixels(t, "borderLeft", bn, bsfx), vn = _convertToPixels(t, "borderTop", bn, bsfx), "%" === esfx ? (bs = hn / w * 100 + "%", bs2 = vn / h * 100 + "%") : "em" === esfx ? (em = _convertToPixels(t, "borderLeft", 1, "em"), bs = hn / em + "em", bs2 = vn / em + "em") : (bs = hn + "px", bs2 = vn + "px"), rel && (es = parseFloat(bs) + en + esfx, es2 = parseFloat(bs2) + en + esfx)), pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, !1, "0px", pt);
                        return pt
                    },
                    prefix: !0,
                    formatter: _getFormatter("0px 0px 0px 0px", !1, !0)
                }), _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, !1, "0px 0px")), this.format(e), !1, "0px", pt)
                    },
                    prefix: !0,
                    formatter: _getFormatter("0px 0px", !1, !0)
                }), _registerComplexSpecialProp("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        var ba, ea, i, pct, overlap, src, bp = "background-position",
                            cs = _cs || _getComputedStyle(t, null),
                            bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            es = this.format(e);
                        if (-1 !== bs.indexOf("%") != (-1 !== es.indexOf("%")) && es.split(",").length < 2 && (src = _getStyle(t, "backgroundImage").replace(_urlExp, "")) && "none" !== src) {
                            for (ba = bs.split(" "), ea = es.split(" "), _tempImg.setAttribute("src", src), i = 2; --i > -1;) bs = ba[i], (pct = -1 !== bs.indexOf("%")) !== (-1 !== ea[i].indexOf("%")) && (overlap = 0 === i ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height, ba[i] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%");
                            bs = ba.join(" ")
                        }
                        return this.parseComplex(t.style, bs, es, pt, plugin)
                    },
                    formatter: _parsePosition
                }), _registerComplexSpecialProp("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(v) {
                        return v += "", _parsePosition(-1 === v.indexOf(" ") ? v + " " + v : v)
                    }
                }), _registerComplexSpecialProp("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), _registerComplexSpecialProp("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), _registerComplexSpecialProp("transformStyle", {
                    prefix: !0
                }), _registerComplexSpecialProp("backfaceVisibility", {
                    prefix: !0
                }), _registerComplexSpecialProp("userSelect", {
                    prefix: !0
                }), _registerComplexSpecialProp("margin", {
                    parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
                }), _registerComplexSpecialProp("padding", {
                    parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), _registerComplexSpecialProp("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        var b, cs, delim;
                        return _ieVers < 9 ? (cs = t.currentStyle, delim = _ieVers < 8 ? " " : ",", b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")", e = this.format(e).split(",").join(delim)) : (b = this.format(_getStyle(t, this.p, _cs, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, b, e, pt, plugin)
                    }
                }), _registerComplexSpecialProp("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), _registerComplexSpecialProp("autoRound,strictUnits", {
                    parser: function(t, e, p, cssp, pt) {
                        return pt
                    }
                }), _registerComplexSpecialProp("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        var bw = _getStyle(t, "borderTopWidth", _cs, !1, "0px"),
                            end = this.format(e).split(" "),
                            esfx = end[0].replace(_suffixExp, "");
                        return "px" !== esfx && (bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx), this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, !1, "solid") + " " + _getStyle(t, "borderTopColor", _cs, !1, "#000")), end.join(" "), pt, plugin)
                    },
                    color: !0,
                    formatter: function(v) {
                        var a = v.split(" ");
                        return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0]
                    }
                }), _registerComplexSpecialProp("borderWidth", {
                    parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), _registerComplexSpecialProp("float,cssFloat,styleFloat", {
                    parser: function(t, e, p, cssp, pt, plugin) {
                        var s = t.style,
                            prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
                        return new CSSPropTween(s, prop, 0, 0, pt, -1, p, !1, 0, s[prop], e)
                    }
                });
                var _setIEOpacityRatio = function(v) {
                    var skip, t = this.t,
                        filters = t.filter || _getStyle(this.data, "filter") || "",
                        val = this.s + this.c * v | 0;
                    100 === val && (-1 === filters.indexOf("atrix(") && -1 === filters.indexOf("radient(") && -1 === filters.indexOf("oader(") ? (t.removeAttribute("filter"), skip = !_getStyle(this.data, "filter")) : (t.filter = filters.replace(_alphaFilterExp, ""), skip = !0)), skip || (this.xn1 && (t.filter = filters = filters || "alpha(opacity=" + val + ")"), -1 === filters.indexOf("pacity") ? 0 === val && this.xn1 || (t.filter = filters + " alpha(opacity=" + val + ")") : t.filter = filters.replace(_opacityExp, "opacity=" + val))
                };
                _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, p, cssp, pt, plugin) {
                        var b = parseFloat(_getStyle(t, "opacity", _cs, !1, "1")),
                            style = t.style,
                            isAutoAlpha = "autoAlpha" === p;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + b), isAutoAlpha && 1 === b && "hidden" === _getStyle(t, "visibility", _cs) && 0 !== e && (b = 0), _supportsOpacity ? pt = new CSSPropTween(style, "opacity", b, e - b, pt) : (pt = new CSSPropTween(style, "opacity", 100 * b, 100 * (e - b), pt), pt.xn1 = isAutoAlpha ? 1 : 0, style.zoom = 1, pt.type = 2, pt.b = "alpha(opacity=" + pt.s + ")", pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")", pt.data = t, pt.plugin = plugin, pt.setRatio = _setIEOpacityRatio), isAutoAlpha && (pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, !1, 0, 0 !== b ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), pt.xs0 = "inherit", cssp._overwriteProps.push(pt.n), cssp._overwriteProps.push(p)), pt
                    }
                });
                var _removeProp = function(s, p) {
                        p && (s.removeProperty ? ("ms" !== p.substr(0, 2) && "webkit" !== p.substr(0, 6) || (p = "-" + p), s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase())) : s.removeAttribute(p))
                    },
                    _setClassNameRatio = function(v) {
                        if (this.t._gsClassPT = this, 1 === v || 0 === v) {
                            this.t.setAttribute("class", 0 === v ? this.b : this.e);
                            for (var mpt = this.data, s = this.t.style; mpt;) mpt.v ? s[mpt.p] = mpt.v : _removeProp(s, mpt.p), mpt = mpt._next;
                            1 === v && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                _registerComplexSpecialProp("className", {
                    parser: function(t, e, p, cssp, pt, plugin, vars) {
                        var difData, bs, cnpt, cnptLookup, mpt, b = t.getAttribute("class") || "",
                            cssText = t.style.cssText;
                        if (pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2), pt.setRatio = _setClassNameRatio, pt.pr = -11, _hasPriority = !0, pt.b = b, bs = _getAllStyles(t, _cs), cnpt = t._gsClassPT) {
                            for (cnptLookup = {}, mpt = cnpt.data; mpt;) cnptLookup[mpt.p] = 1, mpt = mpt._next;
                            cnpt.setRatio(1)
                        }
                        return t._gsClassPT = pt, pt.e = "=" !== e.charAt(1) ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", pt.e), difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup), t.setAttribute("class", b), pt.data = difData.firstMPT, t.style.cssText = cssText, pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin)
                    }
                });
                var _setClearPropsRatio = function(v) {
                    if ((1 === v || 0 === v) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var a, p, i, clearTransform, transform, s = this.t.style,
                            transformParse = _specialProps.transform.parse;
                        if ("all" === this.e) s.cssText = "", clearTransform = !0;
                        else
                            for (a = this.e.split(" ").join("").split(","), i = a.length; --i > -1;) p = a[i], _specialProps[p] && (_specialProps[p].parse === transformParse ? clearTransform = !0 : p = "transformOrigin" === p ? _transformOriginProp : _specialProps[p].p), _removeProp(s, p);
                        clearTransform && (_removeProp(s, _transformProp), (transform = this.t._gsTransform) && (transform.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (_registerComplexSpecialProp("clearProps", {
                        parser: function(t, e, p, cssp, pt) {
                            return pt = new CSSPropTween(t, p, 0, 0, pt, 2), pt.setRatio = _setClearPropsRatio, pt.e = e, pt.pr = -10, pt.data = cssp._tween, _hasPriority = !0, pt
                        }
                    }), p = "bezier,throwProps,physicsProps,physics2D".split(","), i = p.length; i--;) _registerPluginProp(p[i]);
                p = CSSPlugin.prototype, p._firstPT = p._lastParsedTransform = p._transform = null, p._onInitTween = function(target, vars, tween, index) {
                    if (!target.nodeType) return !1;
                    this._target = _target = target, this._tween = tween, this._vars = vars, _index = index, _autoRound = vars.autoRound, _hasPriority = !1, _suffixMap = vars.suffixMap || CSSPlugin.suffixMap, _cs = _getComputedStyle(target, ""), _overwriteProps = this._overwriteProps;
                    var v, pt, pt2, first, last, next, zIndex, tpt, threeD, style = target.style;
                    if (_reqSafariFix && "" === style.zIndex && ("auto" !== (v = _getStyle(target, "zIndex", _cs)) && "" !== v || this._addLazySet(style, "zIndex", 0)), "string" == typeof vars && (first = style.cssText, v = _getAllStyles(target, _cs), style.cssText = first + ";" + vars, v = _cssDif(target, v, _getAllStyles(target)).difs, !_supportsOpacity && _opacityValExp.test(vars) && (v.opacity = parseFloat(RegExp.$1)), vars = v, style.cssText = first), vars.className ? this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars) : this._firstPT = pt = this.parse(target, vars, null), this._transformType) {
                        for (threeD = 3 === this._transformType, _transformProp ? _isSafari && (_reqSafariFix = !0, "" === style.zIndex && ("auto" !== (zIndex = _getStyle(target, "zIndex", _cs)) && "" !== zIndex || this._addLazySet(style, "zIndex", 0)), _isSafariLT6 && this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"))) : style.zoom = 1, pt2 = pt; pt2 && pt2._next;) pt2 = pt2._next;
                        tpt = new CSSPropTween(target, "transform", 0, 0, null, 2), this._linkCSSP(tpt, null, pt2), tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio, tpt.data = this._transform || _getTransform(target, _cs, !0), tpt.tween = tween, tpt.pr = -1, _overwriteProps.pop()
                    }
                    if (_hasPriority) {
                        for (; pt;) {
                            for (next = pt._next, pt2 = first; pt2 && pt2.pr > pt.pr;) pt2 = pt2._next;
                            (pt._prev = pt2 ? pt2._prev : last) ? pt._prev._next = pt: first = pt, (pt._next = pt2) ? pt2._prev = pt : last = pt, pt = next
                        }
                        this._firstPT = first
                    }
                    return !0
                }, p.parse = function(target, vars, pt, plugin) {
                    var p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel, style = target.style;
                    for (p in vars) es = vars[p], "function" == typeof es && (es = es(_index, _target)), sp = _specialProps[p], sp ? pt = sp.parse(target, es, p, this, pt, plugin, vars) : (bs = _getStyle(target, p, _cs) + "", isStr = "string" == typeof es, "color" === p || "fill" === p || "stroke" === p || -1 !== p.indexOf("Color") || isStr && _rgbhslExp.test(es) ? (isStr || (es = _parseColor(es), es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")"), pt = _parseComplex(style, p, bs, es, !0, "transparent", pt, 0, plugin)) : isStr && _complexExp.test(es) ? pt = _parseComplex(style, p, bs, es, !0, null, pt, 0, plugin) : (bn = parseFloat(bs), bsfx = bn || 0 === bn ? bs.substr((bn + "").length) : "", "" !== bs && "auto" !== bs || ("width" === p || "height" === p ? (bn = _getDimension(target, p, _cs), bsfx = "px") : "left" === p || "top" === p ? (bn = _calculateOffset(target, p, _cs), bsfx = "px") : (bn = "opacity" !== p ? 0 : 1, bsfx = "")), rel = isStr && "=" === es.charAt(1), rel ? (en = parseInt(es.charAt(0) + "1", 10), es = es.substr(2), en *= parseFloat(es), esfx = es.replace(_suffixExp, "")) : (en = parseFloat(es), esfx = isStr ? es.replace(_suffixExp, "") : ""), "" === esfx && (esfx = p in _suffixMap ? _suffixMap[p] : bsfx), es = en || 0 === en ? (rel ? en + bn : en) + esfx : vars[p], bsfx !== esfx && "" !== esfx && (en || 0 === en) && bn && (bn = _convertToPixels(target, p, bn, bsfx), "%" === esfx ? (bn /= _convertToPixels(target, p, 100, "%") / 100, !0 !== vars.strictUnits && (bs = bn + "%")) : "em" === esfx || "rem" === esfx || "vw" === esfx || "vh" === esfx ? bn /= _convertToPixels(target, p, 1, esfx) : "px" !== esfx && (en = _convertToPixels(target, p, en, esfx), esfx = "px"), rel && (en || 0 === en) && (es = en + bn + esfx)), rel && (en += bn), !bn && 0 !== bn || !en && 0 !== en ? void 0 !== style[p] && (es || es + "" != "NaN" && null != es) ? (pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, !1, 0, bs, es),
                        pt.xs0 = "none" !== es || "display" !== p && -1 === p.indexOf("Style") ? es : bs) : _log("invalid " + p + " tween value: " + vars[p]) : (pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, !1 !== _autoRound && ("px" === esfx || "zIndex" === p), 0, bs, es), pt.xs0 = esfx))), plugin && pt && !pt.plugin && (pt.plugin = plugin);
                    return pt
                }, p.setRatio = function(v) {
                    var val, str, i, pt = this._firstPT;
                    if (1 !== v || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (v || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                            for (; pt;) {
                                if (val = pt.c * v + pt.s, pt.r ? val = Math.round(val) : val < 1e-6 && val > -1e-6 && (val = 0), pt.type)
                                    if (1 === pt.type)
                                        if (2 === (i = pt.l)) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
                                        else if (3 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
                                else if (4 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
                                else if (5 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
                                else {
                                    for (str = pt.xs0 + val + pt.xs1, i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                                    pt.t[pt.p] = str
                                } else -1 === pt.type ? pt.t[pt.p] = pt.xs0 : pt.setRatio && pt.setRatio(v);
                                else pt.t[pt.p] = val + pt.xs0;
                                pt = pt._next
                            } else
                                for (; pt;) 2 !== pt.type ? pt.t[pt.p] = pt.b : pt.setRatio(v), pt = pt._next;
                        else
                            for (; pt;) {
                                if (2 !== pt.type)
                                    if (pt.r && -1 !== pt.type)
                                        if (val = Math.round(pt.s + pt.c), pt.type) {
                                            if (1 === pt.type) {
                                                for (i = pt.l, str = pt.xs0 + val + pt.xs1, i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                                                pt.t[pt.p] = str
                                            }
                                        } else pt.t[pt.p] = val + pt.xs0;
                                else pt.t[pt.p] = pt.e;
                                else pt.setRatio(v);
                                pt = pt._next
                            }
                }, p._enableTransforms = function(threeD) {
                    this._transform = this._transform || _getTransform(this._target, _cs, !0), this._transformType = this._transform.svg && _useSVGTransformAttr || !threeD && 3 !== this._transformType ? 2 : 3
                };
                var lazySet = function(v) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                p._addLazySet = function(t, p, v) {
                    var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
                    pt.e = v, pt.setRatio = lazySet, pt.data = this
                }, p._linkCSSP = function(pt, next, prev, remove) {
                    return pt && (next && (next._prev = pt), pt._next && (pt._next._prev = pt._prev), pt._prev ? pt._prev._next = pt._next : this._firstPT === pt && (this._firstPT = pt._next, remove = !0), prev ? prev._next = pt : remove || null !== this._firstPT || (this._firstPT = pt), pt._next = next, pt._prev = prev), pt
                }, p._mod = function(lookup) {
                    for (var pt = this._firstPT; pt;) "function" == typeof lookup[pt.p] && lookup[pt.p] === Math.round && (pt.r = 1), pt = pt._next
                }, p._kill = function(lookup) {
                    var pt, p, xfirst, copy = lookup;
                    if (lookup.autoAlpha || lookup.alpha) {
                        copy = {};
                        for (p in lookup) copy[p] = lookup[p];
                        copy.opacity = 1, copy.autoAlpha && (copy.visibility = 1)
                    }
                    for (lookup.className && (pt = this._classNamePT) && (xfirst = pt.xfirst, xfirst && xfirst._prev ? this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev) : xfirst === this._firstPT && (this._firstPT = pt._next), pt._next && this._linkCSSP(pt._next, pt._next._next, xfirst._prev), this._classNamePT = null), pt = this._firstPT; pt;) pt.plugin && pt.plugin !== p && pt.plugin._kill && (pt.plugin._kill(lookup), p = pt.plugin), pt = pt._next;
                    return TweenPlugin.prototype._kill.call(this, copy)
                };
                var _getChildStyles = function(e, props, targets) {
                    var children, i, child, type;
                    if (e.slice)
                        for (i = e.length; --i > -1;) _getChildStyles(e[i], props, targets);
                    else
                        for (children = e.childNodes, i = children.length; --i > -1;) child = children[i], type = child.type, child.style && (props.push(_getAllStyles(child)), targets && targets.push(child)), 1 !== type && 9 !== type && 11 !== type || !child.childNodes.length || _getChildStyles(child, props, targets)
                };
                return CSSPlugin.cascadeTo = function(target, duration, vars) {
                    var i, difs, p, from, tween = TweenLite.to(target, duration, vars),
                        results = [tween],
                        b = [],
                        e = [],
                        targets = [],
                        _reservedProps = TweenLite._internals.reservedProps;
                    for (target = tween._targets || tween.target, _getChildStyles(target, b, targets), tween.render(duration, !0, !0), _getChildStyles(target, e), tween.render(0, !0, !0), tween._enabled(!0), i = targets.length; --i > -1;)
                        if (difs = _cssDif(targets[i], b[i], e[i]), difs.firstMPT) {
                            difs = difs.difs;
                            for (p in vars) _reservedProps[p] && (difs[p] = vars[p]);
                            from = {};
                            for (p in difs) from[p] = b[i][p];
                            results.push(TweenLite.fromTo(targets[i], duration, from, difs))
                        }
                    return results
                }, TweenPlugin.activate([CSSPlugin]), CSSPlugin
            }, !0),
            function() {
                var RoundPropsPlugin = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.6.0",
                        priority: -1,
                        API: 2,
                        init: function(target, value, tween) {
                            return this._tween = tween, !0
                        }
                    }),
                    _roundLinkedList = function(node) {
                        for (; node;) node.f || node.blob || (node.m = Math.round), node = node._next
                    },
                    p = RoundPropsPlugin.prototype;
                p._onInitAllProps = function() {
                    for (var prop, pt, next, tween = this._tween, rp = tween.vars.roundProps.join ? tween.vars.roundProps : tween.vars.roundProps.split(","), i = rp.length, lookup = {}, rpt = tween._propLookup.roundProps; --i > -1;) lookup[rp[i]] = Math.round;
                    for (i = rp.length; --i > -1;)
                        for (prop = rp[i], pt = tween._firstPT; pt;) next = pt._next, pt.pg ? pt.t._mod(lookup) : pt.n === prop && (2 === pt.f && pt.t ? _roundLinkedList(pt.t._firstPT) : (this._add(pt.t, prop, pt.s, pt.c), next && (next._prev = pt._prev), pt._prev ? pt._prev._next = next : tween._firstPT === pt && (tween._firstPT = next), pt._next = pt._prev = null, tween._propLookup[prop] = rpt)), pt = next;
                    return !1
                }, p._add = function(target, p, s, c) {
                    this._addTween(target, p, s, s + c, p, Math.round), this._overwriteProps.push(p)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.6.0",
                    init: function(target, value, tween, index) {
                        var p, end;
                        if ("function" != typeof target.setAttribute) return !1;
                        for (p in value) end = value[p], "function" == typeof end && (end = end(index, target)), this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, !1, p), this._overwriteProps.push(p);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.0",
                API: 2,
                init: function(target, value, tween, index) {
                    "object" != typeof value && (value = {
                        rotation: value
                    }), this.finals = {};
                    var p, v, start, end, dif, split, cap = !0 === value.useRadians ? 2 * Math.PI : 360;
                    for (p in value) "useRadians" !== p && (end = value[p], "function" == typeof end && (end = end(index, target)), split = (end + "").split("_"), v = split[0], start = parseFloat("function" != typeof target[p] ? target[p] : target[p.indexOf("set") || "function" != typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)]()), end = this.finals[p] = "string" == typeof v && "=" === v.charAt(1) ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0, dif = end - start, split.length && (v = split.join("_"), -1 !== v.indexOf("short") && (dif %= cap) !== dif % (cap / 2) && (dif = dif < 0 ? dif + cap : dif - cap), -1 !== v.indexOf("_cw") && dif < 0 ? dif = (dif + 9999999999 * cap) % cap - (dif / cap | 0) * cap : -1 !== v.indexOf("ccw") && dif > 0 && (dif = (dif - 9999999999 * cap) % cap - (dif / cap | 0) * cap)), (dif > 1e-6 || dif < -1e-6) && (this._addTween(target, p, start, start + dif, p), this._overwriteProps.push(p)));
                    return !0
                },
                set: function(ratio) {
                    var pt;
                    if (1 !== ratio) this._super.setRatio.call(this, ratio);
                    else
                        for (pt = this._firstPT; pt;) pt.f ? pt.t[pt.p](this.finals[pt.p]) : pt.t[pt.p] = this.finals[pt.p], pt = pt._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
                var SteppedEase, RoughEase, _createElastic, w = _gsScope.GreenSockGlobals || _gsScope,
                    gs = w.com.greensock,
                    _2PI = 2 * Math.PI,
                    _HALF_PI = Math.PI / 2,
                    _class = gs._class,
                    _create = function(n, f) {
                        var C = _class("easing." + n, function() {}, !0),
                            p = C.prototype = new Ease;
                        return p.constructor = C, p.getRatio = f, C
                    },
                    _easeReg = Ease.register || function() {},
                    _wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
                        var C = _class("easing." + name, {
                            easeOut: new EaseOut,
                            easeIn: new EaseIn,
                            easeInOut: new EaseInOut
                        }, !0);
                        return _easeReg(C, name), C
                    },
                    EasePoint = function(time, value, next) {
                        this.t = time, this.v = value, next && (this.next = next, next.prev = this, this.c = next.v - value, this.gap = next.t - time)
                    },
                    _createBack = function(n, f) {
                        var C = _class("easing." + n, function(overshoot) {
                                this._p1 = overshoot || 0 === overshoot ? overshoot : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            p = C.prototype = new Ease;
                        return p.constructor = C, p.getRatio = f, p.config = function(overshoot) {
                            return new C(overshoot)
                        }, C
                    },
                    Back = _wrap("Back", _createBack("BackOut", function(p) {
                        return (p -= 1) * p * ((this._p1 + 1) * p + this._p1) + 1
                    }), _createBack("BackIn", function(p) {
                        return p * p * ((this._p1 + 1) * p - this._p1)
                    }), _createBack("BackInOut", function(p) {
                        return (p *= 2) < 1 ? .5 * p * p * ((this._p2 + 1) * p - this._p2) : .5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2)
                    })),
                    SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
                        power = power || 0 === power ? power : .7, null == linearRatio ? linearRatio = .7 : linearRatio > 1 && (linearRatio = 1), this._p = 1 !== linearRatio ? power : 0, this._p1 = (1 - linearRatio) / 2, this._p2 = linearRatio, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === yoyoMode
                    }, !0),
                    p = SlowMo.prototype = new Ease;
                return p.constructor = SlowMo, p.getRatio = function(p) {
                    var r = p + (.5 - p) * this._p;
                    return p < this._p1 ? this._calcEnd ? 1 - (p = 1 - p / this._p1) * p : r - (p = 1 - p / this._p1) * p * p * p * r : p > this._p3 ? this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + (p - r) * (p = (p - this._p3) / this._p1) * p * p * p : this._calcEnd ? 1 : r
                }, SlowMo.ease = new SlowMo(.7, .7), p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
                    return new SlowMo(linearRatio, power, yoyoMode)
                }, SteppedEase = _class("easing.SteppedEase", function(steps) {
                    steps = steps || 1, this._p1 = 1 / steps, this._p2 = steps + 1
                }, !0), p = SteppedEase.prototype = new Ease, p.constructor = SteppedEase, p.getRatio = function(p) {
                    return p < 0 ? p = 0 : p >= 1 && (p = .999999999), (this._p2 * p >> 0) * this._p1
                }, p.config = SteppedEase.config = function(steps) {
                    return new SteppedEase(steps)
                }, RoughEase = _class("easing.RoughEase", function(vars) {
                    vars = vars || {};
                    for (var x, y, bump, invX, obj, pnt, taper = vars.taper || "none", a = [], cnt = 0, points = 0 | (vars.points || 20), i = points, randomize = !1 !== vars.randomize, clamp = !0 === vars.clamp, template = vars.template instanceof Ease ? vars.template : null, strength = "number" == typeof vars.strength ? .4 * vars.strength : .4; --i > -1;) x = randomize ? Math.random() : 1 / points * i, y = template ? template.getRatio(x) : x, "none" === taper ? bump = strength : "out" === taper ? (invX = 1 - x, bump = invX * invX * strength) : "in" === taper ? bump = x * x * strength : x < .5 ? (invX = 2 * x, bump = invX * invX * .5 * strength) : (invX = 2 * (1 - x), bump = invX * invX * .5 * strength), randomize ? y += Math.random() * bump - .5 * bump : i % 2 ? y += .5 * bump : y -= .5 * bump, clamp && (y > 1 ? y = 1 : y < 0 && (y = 0)), a[cnt++] = {
                        x: x,
                        y: y
                    };
                    for (a.sort(function(a, b) {
                            return a.x - b.x
                        }), pnt = new EasePoint(1, 1, null), i = points; --i > -1;) obj = a[i], pnt = new EasePoint(obj.x, obj.y, pnt);
                    this._prev = new EasePoint(0, 0, 0 !== pnt.t ? pnt : pnt.next)
                }, !0), p = RoughEase.prototype = new Ease, p.constructor = RoughEase, p.getRatio = function(p) {
                    var pnt = this._prev;
                    if (p > pnt.t) {
                        for (; pnt.next && p >= pnt.t;) pnt = pnt.next;
                        pnt = pnt.prev
                    } else
                        for (; pnt.prev && p <= pnt.t;) pnt = pnt.prev;
                    return this._prev = pnt, pnt.v + (p - pnt.t) / pnt.gap * pnt.c
                }, p.config = function(vars) {
                    return new RoughEase(vars)
                }, RoughEase.ease = new RoughEase, _wrap("Bounce", _create("BounceOut", function(p) {
                    return p < 1 / 2.75 ? 7.5625 * p * p : p < 2 / 2.75 ? 7.5625 * (p -= 1.5 / 2.75) * p + .75 : p < 2.5 / 2.75 ? 7.5625 * (p -= 2.25 / 2.75) * p + .9375 : 7.5625 * (p -= 2.625 / 2.75) * p + .984375
                }), _create("BounceIn", function(p) {
                    return (p = 1 - p) < 1 / 2.75 ? 1 - 7.5625 * p * p : p < 2 / 2.75 ? 1 - (7.5625 * (p -= 1.5 / 2.75) * p + .75) : p < 2.5 / 2.75 ? 1 - (7.5625 * (p -= 2.25 / 2.75) * p + .9375) : 1 - (7.5625 * (p -= 2.625 / 2.75) * p + .984375)
                }), _create("BounceInOut", function(p) {
                    var invert = p < .5;
                    return p = invert ? 1 - 2 * p : 2 * p - 1, p < 1 / 2.75 ? p *= 7.5625 * p : p = p < 2 / 2.75 ? 7.5625 * (p -= 1.5 / 2.75) * p + .75 : p < 2.5 / 2.75 ? 7.5625 * (p -= 2.25 / 2.75) * p + .9375 : 7.5625 * (p -= 2.625 / 2.75) * p + .984375, invert ? .5 * (1 - p) : .5 * p + .5
                })), _wrap("Circ", _create("CircOut", function(p) {
                    return Math.sqrt(1 - (p -= 1) * p)
                }), _create("CircIn", function(p) {
                    return -(Math.sqrt(1 - p * p) - 1)
                }), _create("CircInOut", function(p) {
                    return (p *= 2) < 1 ? -.5 * (Math.sqrt(1 - p * p) - 1) : .5 * (Math.sqrt(1 - (p -= 2) * p) + 1)
                })), _createElastic = function(n, f, def) {
                    var C = _class("easing." + n, function(amplitude, period) {
                            this._p1 = amplitude >= 1 ? amplitude : 1, this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1), this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0), this._p2 = _2PI / this._p2
                        }, !0),
                        p = C.prototype = new Ease;
                    return p.constructor = C, p.getRatio = f, p.config = function(amplitude, period) {
                        return new C(amplitude, period)
                    }, C
                }, _wrap("Elastic", _createElastic("ElasticOut", function(p) {
                    return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1
                }, .3), _createElastic("ElasticIn", function(p) {
                    return -this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)
                }, .3), _createElastic("ElasticInOut", function(p) {
                    return (p *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * .5 + 1
                }, .45)), _wrap("Expo", _create("ExpoOut", function(p) {
                    return 1 - Math.pow(2, -10 * p)
                }), _create("ExpoIn", function(p) {
                    return Math.pow(2, 10 * (p - 1)) - .001
                }), _create("ExpoInOut", function(p) {
                    return (p *= 2) < 1 ? .5 * Math.pow(2, 10 * (p - 1)) : .5 * (2 - Math.pow(2, -10 * (p - 1)))
                })), _wrap("Sine", _create("SineOut", function(p) {
                    return Math.sin(p * _HALF_PI)
                }), _create("SineIn", function(p) {
                    return 1 - Math.cos(p * _HALF_PI)
                }), _create("SineInOut", function(p) {
                    return -.5 * (Math.cos(Math.PI * p) - 1)
                })), _class("easing.EaseLookup", {
                    find: function(s) {
                        return Ease.map[s]
                    }
                }, !0), _easeReg(w.SlowMo, "SlowMo", "ease,"), _easeReg(RoughEase, "RoughEase", "ease,"), _easeReg(SteppedEase, "SteppedEase", "ease,"), Back
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(window, moduleName) {
        "use strict";
        var _exports = {},
            _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
        if (!_globals.TweenLite) {
            var a, i, p, _ticker, _tickerActive, _namespace = function(ns) {
                    var i, a = ns.split("."),
                        p = _globals;
                    for (i = 0; i < a.length; i++) p[a[i]] = p = p[a[i]] || {};
                    return p
                },
                gs = _namespace("com.greensock"),
                _slice = function(a) {
                    var i, b = [],
                        l = a.length;
                    for (i = 0; i !== l; b.push(a[i++]));
                    return b
                },
                _emptyFunc = function() {},
                _isArray = function() {
                    var toString = Object.prototype.toString,
                        array = toString.call([]);
                    return function(obj) {
                        return null != obj && (obj instanceof Array || "object" == typeof obj && !!obj.push && toString.call(obj) === array)
                    }
                }(),
                _defLookup = {},
                Definition = function(ns, dependencies, func, global) {
                    this.sc = _defLookup[ns] ? _defLookup[ns].sc : [], _defLookup[ns] = this, this.gsClass = null, this.func = func;
                    var _classes = [];
                    this.check = function(init) {
                        for (var cur, a, n, cl, hasModule, i = dependencies.length, missing = i; --i > -1;)(cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass ? (_classes[i] = cur.gsClass, missing--) : init && cur.sc.push(this);
                        if (0 === missing && func) {
                            if (a = ("com.greensock." + ns).split("."), n = a.pop(), cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes), global)
                                if (_globals[n] = _exports[n] = cl, !(hasModule = "undefined" != typeof module && module.exports) && "function" == typeof define && define.amd) define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() {
                                    return cl
                                });
                                else if (hasModule)
                                if ("TweenMax" === ns) {
                                    module.exports = _exports.TweenMax = cl;
                                    for (i in _exports) cl[i] = _exports[i]
                                } else _exports.TweenMax && (_exports.TweenMax[n] = cl);
                            for (i = 0; i < this.sc.length; i++) this.sc[i].check()
                        }
                    }, this.check(!0)
                },
                _gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
                    return new Definition(ns, dependencies, func, global)
                },
                _class = gs._class = function(ns, func, global) {
                    return func = func || function() {}, _gsDefine(ns, [], function() {
                        return func
                    }, global), func
                };
            _gsDefine.globals = _globals;
            var _baseParams = [0, 0, 1, 1],
                Ease = _class("easing.Ease", function(func, extraParams, type, power) {
                    this._func = func, this._type = type || 0, this._power = power || 0, this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams
                }, !0),
                _easeMap = Ease.map = {},
                _easeReg = Ease.register = function(ease, names, types, create) {
                    for (var e, name, j, type, na = names.split(","), i = na.length, ta = (types || "easeIn,easeOut,easeInOut").split(","); --i > -1;)
                        for (name = na[i], e = create ? _class("easing." + name, null, !0) : gs.easing[name] || {}, j = ta.length; --j > -1;) type = ta[j], _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease
                };
            for (p = Ease.prototype, p._calcEnd = !1, p.getRatio = function(p) {
                    if (this._func) return this._params[0] = p, this._func.apply(null, this._params);
                    var t = this._type,
                        pw = this._power,
                        r = 1 === t ? 1 - p : 2 === t ? p : p < .5 ? 2 * p : 2 * (1 - p);
                    return 1 === pw ? r *= r : 2 === pw ? r *= r * r : 3 === pw ? r *= r * r * r : 4 === pw && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : p < .5 ? r / 2 : 1 - r / 2
                }, a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = a.length; --i > -1;) p = a[i] + ",Power" + i, _easeReg(new Ease(null, null, 1, i), p, "easeOut", !0), _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (0 === i ? ",easeNone" : "")), _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
            _easeMap.linear = gs.easing.Linear.easeIn, _easeMap.swing = gs.easing.Quad.easeInOut;
            var EventDispatcher = _class("events.EventDispatcher", function(target) {
                this._listeners = {}, this._eventTarget = target || this
            });
            p = EventDispatcher.prototype, p.addEventListener = function(type, callback, scope, useParam, priority) {
                priority = priority || 0;
                var listener, i, list = this._listeners[type],
                    index = 0;
                for (this !== _ticker || _tickerActive || _ticker.wake(), null == list && (this._listeners[type] = list = []), i = list.length; --i > -1;) listener = list[i], listener.c === callback && listener.s === scope ? list.splice(i, 1) : 0 === index && listener.pr < priority && (index = i + 1);
                list.splice(index, 0, {
                    c: callback,
                    s: scope,
                    up: useParam,
                    pr: priority
                })
            }, p.removeEventListener = function(type, callback) {
                var i, list = this._listeners[type];
                if (list)
                    for (i = list.length; --i > -1;)
                        if (list[i].c === callback) return void list.splice(i, 1)
            }, p.dispatchEvent = function(type) {
                var i, t, listener, list = this._listeners[type];
                if (list)
                    for (i = list.length, i > 1 && (list = list.slice(0)), t = this._eventTarget; --i > -1;)(listener = list[i]) && (listener.up ? listener.c.call(listener.s || t, {
                        type: type,
                        target: t
                    }) : listener.c.call(listener.s || t))
            };
            var _reqAnimFrame = window.requestAnimationFrame,
                _cancelAnimFrame = window.cancelAnimationFrame,
                _getTime = Date.now || function() {
                    return (new Date).getTime()
                },
                _lastUpdate = _getTime();
            for (a = ["ms", "moz", "webkit", "o"], i = a.length; --i > -1 && !_reqAnimFrame;) _reqAnimFrame = window[a[i] + "RequestAnimationFrame"], _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
            _class("Ticker", function(fps, useRAF) {
                var _fps, _req, _id, _gap, _nextTime, _self = this,
                    _startTime = _getTime(),
                    _useRAF = !(!1 === useRAF || !_reqAnimFrame) && "auto",
                    _lagThreshold = 500,
                    _adjustedLag = 33,
                    _tick = function(manual) {
                        var overlap, dispatch, elapsed = _getTime() - _lastUpdate;
                        elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag), _lastUpdate += elapsed, _self.time = (_lastUpdate - _startTime) / 1e3, overlap = _self.time - _nextTime, (!_fps || overlap > 0 || !0 === manual) && (_self.frame++, _nextTime += overlap + (overlap >= _gap ? .004 : _gap - overlap), dispatch = !0), !0 !== manual && (_id = _req(_tick)), dispatch && _self.dispatchEvent("tick")
                    };
                EventDispatcher.call(_self), _self.time = _self.frame = 0, _self.tick = function() {
                    _tick(!0)
                }, _self.lagSmoothing = function(threshold, adjustedLag) {
                    _lagThreshold = threshold || 1e10, _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0)
                }, _self.sleep = function() {
                    null != _id && (_useRAF && _cancelAnimFrame ? _cancelAnimFrame(_id) : clearTimeout(_id), _req = _emptyFunc, _id = null, _self === _ticker && (_tickerActive = !1))
                }, _self.wake = function(seamless) {
                    null !== _id ? _self.sleep() : seamless ? _startTime += -_lastUpdate + (_lastUpdate = _getTime()) : _self.frame > 10 && (_lastUpdate = _getTime() - _lagThreshold + 5), _req = 0 === _fps ? _emptyFunc : _useRAF && _reqAnimFrame ? _reqAnimFrame : function(f) {
                        return setTimeout(f, 1e3 * (_nextTime - _self.time) + 1 | 0)
                    }, _self === _ticker && (_tickerActive = !0), _tick(2)
                }, _self.fps = function(value) {
                    if (!arguments.length) return _fps;
                    _fps = value, _gap = 1 / (_fps || 60), _nextTime = this.time + _gap, _self.wake()
                }, _self.useRAF = function(value) {
                    if (!arguments.length) return _useRAF;
                    _self.sleep(), _useRAF = value, _self.fps(_fps)
                }, _self.fps(fps), setTimeout(function() {
                    "auto" === _useRAF && _self.frame < 5 && "hidden" !== document.visibilityState && _self.useRAF(!1)
                }, 1500)
            }), p = gs.Ticker.prototype = new gs.events.EventDispatcher, p.constructor = gs.Ticker;
            var Animation = _class("core.Animation", function(duration, vars) {
                if (this.vars = vars = vars || {}, this._duration = this._totalDuration = duration || 0, this._delay = Number(vars.delay) || 0, this._timeScale = 1, this._active = !0 === vars.immediateRender, this.data = vars.data, this._reversed = !0 === vars.reversed, _rootTimeline) {
                    _tickerActive || _ticker.wake();
                    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
                    tl.add(this, tl._time), this.vars.paused && this.paused(!0)
                }
            });
            _ticker = Animation.ticker = new gs.Ticker, p = Animation.prototype, p._dirty = p._gc = p._initted = p._paused = !1, p._totalTime = p._time = 0, p._rawPrevTime = -1, p._next = p._last = p._onUpdate = p._timeline = p.timeline = null, p._paused = !1;
            var _checkTimeout = function() {
                _tickerActive && _getTime() - _lastUpdate > 2e3 && _ticker.wake(), setTimeout(_checkTimeout, 2e3)
            };
            _checkTimeout(), p.play = function(from, suppressEvents) {
                return null != from && this.seek(from, suppressEvents), this.reversed(!1).paused(!1)
            }, p.pause = function(atTime, suppressEvents) {
                return null != atTime && this.seek(atTime, suppressEvents), this.paused(!0)
            }, p.resume = function(from, suppressEvents) {
                return null != from && this.seek(from, suppressEvents), this.paused(!1)
            }, p.seek = function(time, suppressEvents) {
                return this.totalTime(Number(time), !1 !== suppressEvents)
            }, p.restart = function(includeDelay, suppressEvents) {
                return this.reversed(!1).paused(!1).totalTime(includeDelay ? -this._delay : 0, !1 !== suppressEvents, !0)
            }, p.reverse = function(from, suppressEvents) {
                return null != from && this.seek(from || this.totalDuration(), suppressEvents), this.reversed(!0).paused(!1)
            }, p.render = function(time, suppressEvents, force) {}, p.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, p.isActive = function() {
                var rawTime, tl = this._timeline,
                    startTime = this._startTime;
                return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale
            }, p._enabled = function(enabled, ignoreTimeline) {
                return _tickerActive || _ticker.wake(), this._gc = !enabled, this._active = this.isActive(), !0 !== ignoreTimeline && (enabled && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !enabled && this.timeline && this._timeline._remove(this, !0)), !1
            }, p._kill = function(vars, target) {
                return this._enabled(!1, !1)
            }, p.kill = function(vars, target) {
                return this._kill(vars, target), this
            }, p._uncache = function(includeSelf) {
                for (var tween = includeSelf ? this : this.timeline; tween;) tween._dirty = !0, tween = tween.timeline;
                return this
            }, p._swapSelfInParams = function(params) {
                for (var i = params.length, copy = params.concat(); --i > -1;) "{self}" === params[i] && (copy[i] = this);
                return copy
            }, p._callback = function(type) {
                var v = this.vars,
                    callback = v[type],
                    params = v[type + "Params"],
                    scope = v[type + "Scope"] || v.callbackScope || this;
                switch (params ? params.length : 0) {
                    case 0:
                        callback.call(scope);
                        break;
                    case 1:
                        callback.call(scope, params[0]);
                        break;
                    case 2:
                        callback.call(scope, params[0], params[1]);
                        break;
                    default:
                        callback.apply(scope, params)
                }
            }, p.eventCallback = function(type, callback, params, scope) {
                if ("on" === (type || "").substr(0, 2)) {
                    var v = this.vars;
                    if (1 === arguments.length) return v[type];
                    null == callback ? delete v[type] : (v[type] = callback, v[type + "Params"] = _isArray(params) && -1 !== params.join("").indexOf("{self}") ? this._swapSelfInParams(params) : params, v[type + "Scope"] = scope), "onUpdate" === type && (this._onUpdate = callback)
                }
                return this
            }, p.delay = function(value) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + value - this._delay), this._delay = value, this) : this._delay
            }, p.duration = function(value) {
                return arguments.length ? (this._duration = this._totalDuration = value, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== value && this.totalTime(this._totalTime * (value / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, p.totalDuration = function(value) {
                return this._dirty = !1, arguments.length ? this.duration(value) : this._totalDuration
            }, p.time = function(value, suppressEvents) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(value > this._duration ? this._duration : value, suppressEvents)) : this._time
            }, p.totalTime = function(time, suppressEvents, uncapped) {
                if (_tickerActive || _ticker.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (time < 0 && !uncapped && (time += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var totalDuration = this._totalDuration,
                            tl = this._timeline;
                        if (time > totalDuration && !uncapped && (time = totalDuration), this._startTime = (this._paused ? this._pauseTime : tl._time) - (this._reversed ? totalDuration - time : time) / this._timeScale, tl._dirty || this._uncache(!1), tl._timeline)
                            for (; tl._timeline;) tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale && tl.totalTime(tl._totalTime, !0), tl = tl._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === time && 0 !== this._duration || (_lazyTweens.length && _lazyRender(), this.render(time, suppressEvents, !1), _lazyTweens.length && _lazyRender())
                }
                return this
            }, p.progress = p.totalProgress = function(value, suppressEvents) {
                var duration = this.duration();
                return arguments.length ? this.totalTime(duration * value, suppressEvents) : duration ? this._time / duration : this.ratio
            }, p.startTime = function(value) {
                return arguments.length ? (value !== this._startTime && (this._startTime = value, this.timeline && this.timeline._sortChildren && this.timeline.add(this, value - this._delay)), this) : this._startTime
            }, p.endTime = function(includeRepeats) {
                return this._startTime + (0 != includeRepeats ? this.totalDuration() : this.duration()) / this._timeScale
            }, p.timeScale = function(value) {
                if (!arguments.length) return this._timeScale;
                if (value = value || 1e-10, this._timeline && this._timeline.smoothChildTiming) {
                    var pauseTime = this._pauseTime,
                        t = pauseTime || 0 === pauseTime ? pauseTime : this._timeline.totalTime();
                    this._startTime = t - (t - this._startTime) * this._timeScale / value
                }
                return this._timeScale = value, this._uncache(!1)
            }, p.reversed = function(value) {
                return arguments.length ? (value != this._reversed && (this._reversed = value, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, p.paused = function(value) {
                if (!arguments.length) return this._paused;
                var raw, elapsed, tl = this._timeline;
                return value != this._paused && tl && (_tickerActive || value || _ticker.wake(), raw = tl.rawTime(), elapsed = raw - this._pauseTime, !value && tl.smoothChildTiming && (this._startTime += elapsed, this._uncache(!1)), this._pauseTime = value ? raw : null, this._paused = value, this._active = this.isActive(), !value && 0 !== elapsed && this._initted && this.duration() && (raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale, this.render(raw, raw === this._totalTime, !0))), this._gc && !value && this._enabled(!0, !1), this
            };
            var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
                Animation.call(this, 0, vars), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            p = SimpleTimeline.prototype = new Animation, p.constructor = SimpleTimeline, p.kill()._gc = !1, p._first = p._last = p._recent = null, p._sortChildren = !1, p.add = p.insert = function(child, position, align, stagger) {
                var prevTween, st;
                if (child._startTime = Number(position || 0) + child._delay, child._paused && this !== child._timeline && (child._pauseTime = child._startTime + (this.rawTime() - child._startTime) / child._timeScale), child.timeline && child.timeline._remove(child, !0), child.timeline = child._timeline = this, child._gc && child._enabled(!0, !0), prevTween = this._last, this._sortChildren)
                    for (st = child._startTime; prevTween && prevTween._startTime > st;) prevTween = prevTween._prev;
                return prevTween ? (child._next = prevTween._next, prevTween._next = child) : (child._next = this._first, this._first = child), child._next ? child._next._prev = child : this._last = child, child._prev = prevTween, this._recent = child, this._timeline && this._uncache(!0), this
            }, p._remove = function(tween, skipDisable) {
                return tween.timeline === this && (skipDisable || tween._enabled(!1, !0), tween._prev ? tween._prev._next = tween._next : this._first === tween && (this._first = tween._next), tween._next ? tween._next._prev = tween._prev : this._last === tween && (this._last = tween._prev), tween._next = tween._prev = tween.timeline = null, tween === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, p.render = function(time, suppressEvents, force) {
                var next, tween = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = time; tween;) next = tween._next, (tween._active || time >= tween._startTime && !tween._paused) && (tween._reversed ? tween.render((tween._dirty ? tween.totalDuration() : tween._totalDuration) - (time - tween._startTime) * tween._timeScale, suppressEvents, force) : tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force)), tween = next
            }, p.rawTime = function() {
                return _tickerActive || _ticker.wake(), this._totalTime
            };
            var TweenLite = _class("TweenLite", function(target, duration, vars) {
                    if (Animation.call(this, duration, vars), this.render = TweenLite.prototype.render, null == target) throw "Cannot tween a null target.";
                    this.target = target = "string" != typeof target ? target : TweenLite.selector(target) || target;
                    var i, targ, targets, isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
                        overwrite = this.vars.overwrite;
                    if (this._overwrite = overwrite = null == overwrite ? _overwriteLookup[TweenLite.defaultOverwrite] : "number" == typeof overwrite ? overwrite >> 0 : _overwriteLookup[overwrite], (isSelector || target instanceof Array || target.push && _isArray(target)) && "number" != typeof target[0])
                        for (this._targets = targets = _slice(target), this._propLookup = [], this._siblings = [], i = 0; i < targets.length; i++) targ = targets[i], targ ? "string" != typeof targ ? targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType) ? (targets.splice(i--, 1), this._targets = targets = targets.concat(_slice(targ))) : (this._siblings[i] = _register(targ, this, !1), 1 === overwrite && this._siblings[i].length > 1 && _applyOverwrite(targ, this, null, 1, this._siblings[i])) : "string" == typeof(targ = targets[i--] = TweenLite.selector(targ)) && targets.splice(i + 1, 1) : targets.splice(i--, 1);
                    else this._propLookup = {}, this._siblings = _register(target, this, !1), 1 === overwrite && this._siblings.length > 1 && _applyOverwrite(target, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === duration && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1e-10, this.render(Math.min(0, -this._delay)))
                }, !0),
                _isSelector = function(v) {
                    return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType)
                },
                _autoCSS = function(vars, target) {
                    var p, css = {};
                    for (p in vars) _reservedProps[p] || p in target && "transform" !== p && "x" !== p && "y" !== p && "width" !== p && "height" !== p && "className" !== p && "border" !== p || !(!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS) || (css[p] = vars[p], delete vars[p]);
                    vars.css = css
                };
            p = TweenLite.prototype = new Animation, p.constructor = TweenLite, p.kill()._gc = !1, p.ratio = 0, p._firstPT = p._targets = p._overwrittenProps = p._startAt = null, p._notifyPluginsOfEnabled = p._lazy = !1, TweenLite.version = "1.19.0", TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1), TweenLite.defaultOverwrite = "auto", TweenLite.ticker = _ticker, TweenLite.autoSleep = 120, TweenLite.lagSmoothing = function(threshold, adjustedLag) {
                _ticker.lagSmoothing(threshold, adjustedLag)
            }, TweenLite.selector = window.$ || window.jQuery || function(e) {
                var selector = window.$ || window.jQuery;
                return selector ? (TweenLite.selector = selector, selector(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var _lazyTweens = [],
                _lazyLookup = {},
                _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                _setRatio = function(v) {
                    for (var val, pt = this._firstPT; pt;) val = pt.blob ? v ? this.join("") : this.start : pt.c * v + pt.s, pt.m ? val = pt.m(val, this._target || pt.t) : val < 1e-6 && val > -1e-6 && (val = 0), pt.f ? pt.fp ? pt.t[pt.p](pt.fp, val) : pt.t[pt.p](val) : pt.t[pt.p] = val, pt = pt._next
                },
                _blobDif = function(start, end, filter, pt) {
                    var startNums, endNums, num, i, l, nonNumbers, currentNum, a = [start, end],
                        charIndex = 0,
                        s = "",
                        color = 0;
                    for (a.start = start, filter && (filter(a), start = a[0], end = a[1]), a.length = 0, startNums = start.match(_numbersExp) || [], endNums = end.match(_numbersExp) || [], pt && (pt._next = null, pt.blob = 1, a._firstPT = a._applyPT = pt), l = endNums.length, i = 0; i < l; i++) currentNum = endNums[i], nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex), s += nonNumbers || !i ? nonNumbers : ",", charIndex += nonNumbers.length, color ? color = (color + 1) % 5 : "rgba(" === nonNumbers.substr(-5) && (color = 1), currentNum === startNums[i] || startNums.length <= i ? s += currentNum : (s && (a.push(s), s = ""), num = parseFloat(startNums[i]), a.push(num), a._firstPT = {
                        _next: a._firstPT,
                        t: a,
                        p: a.length - 1,
                        s: num,
                        c: ("=" === currentNum.charAt(1) ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
                        f: 0,
                        m: color && color < 4 ? Math.round : 0
                    }), charIndex += currentNum.length;
                    return s += end.substr(charIndex), s && a.push(s), a.setRatio = _setRatio, a
                },
                _addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
                    "function" == typeof end && (end = end(index || 0, target));
                    var blob, getterName, s = "get" === start ? target[prop] : start,
                        type = typeof target[prop],
                        isRelative = "string" == typeof end && "=" === end.charAt(1),
                        pt = {
                            t: target,
                            p: prop,
                            s: s,
                            f: "function" === type,
                            pg: 0,
                            n: overwriteProp || prop,
                            m: mod ? "function" == typeof mod ? mod : Math.round : 0,
                            pr: 0,
                            c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
                        };
                    if ("number" !== type && ("function" === type && "get" === start && (getterName = prop.indexOf("set") || "function" != typeof target["get" + prop.substr(3)] ? prop : "get" + prop.substr(3), pt.s = s = funcParam ? target[getterName](funcParam) : target[getterName]()), "string" == typeof s && (funcParam || isNaN(s)) ? (pt.fp = funcParam, blob = _blobDif(s, end, stringFilter || TweenLite.defaultStringFilter, pt), pt = {
                            t: blob,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: overwriteProp || prop,
                            pr: 0,
                            m: 0
                        }) : isRelative || (pt.s = parseFloat(s), pt.c = parseFloat(end) - pt.s || 0)), pt.c) return (pt._next = this._firstPT) && (pt._next._prev = pt), this._firstPT = pt, pt
                },
                _internals = TweenLite._internals = {
                    isArray: _isArray,
                    isSelector: _isSelector,
                    lazyTweens: _lazyTweens,
                    blobDif: _blobDif
                },
                _plugins = TweenLite._plugins = {},
                _tweenLookup = _internals.tweenLookup = {},
                _tweenLookupNum = 0,
                _reservedProps = _internals.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1
                },
                _overwriteLookup = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline,
                _rootTimeline = Animation._rootTimeline = new SimpleTimeline,
                _nextGCFrame = 30,
                _lazyRender = _internals.lazyRender = function() {
                    var tween, i = _lazyTweens.length;
                    for (_lazyLookup = {}; --i > -1;)(tween = _lazyTweens[i]) && !1 !== tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], !0), tween._lazy = !1);
                    _lazyTweens.length = 0
                };
            _rootTimeline._startTime = _ticker.time, _rootFramesTimeline._startTime = _ticker.frame, _rootTimeline._active = _rootFramesTimeline._active = !0, setTimeout(_lazyRender, 1), Animation._updateRoot = TweenLite.render = function() {
                var i, a, p;
                if (_lazyTweens.length && _lazyRender(), _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, !1, !1), _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, !1, !1), _lazyTweens.length && _lazyRender(), _ticker.frame >= _nextGCFrame) {
                    _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
                    for (p in _tweenLookup) {
                        for (a = _tweenLookup[p].tweens, i = a.length; --i > -1;) a[i]._gc && a.splice(i, 1);
                        0 === a.length && delete _tweenLookup[p]
                    }
                    if ((!(p = _rootTimeline._first) || p._paused) && TweenLite.autoSleep && !_rootFramesTimeline._first && 1 === _ticker._listeners.tick.length) {
                        for (; p && p._paused;) p = p._next;
                        p || _ticker.sleep()
                    }
                }
            }, _ticker.addEventListener("tick", Animation._updateRoot);
            var _register = function(target, tween, scrub) {
                    var a, i, id = target._gsTweenID;
                    if (_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)] || (_tweenLookup[id] = {
                            target: target,
                            tweens: []
                        }), tween && (a = _tweenLookup[id].tweens, a[i = a.length] = tween, scrub))
                        for (; --i > -1;) a[i] === tween && a.splice(i, 1);
                    return _tweenLookup[id].tweens
                },
                _onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
                    var r1, r2, func = overwrittenTween.vars.onOverwrite;
                    return func && (r1 = func(overwrittenTween, overwritingTween, target, killedProps)), func = TweenLite.onOverwrite, func && (r2 = func(overwrittenTween, overwritingTween, target, killedProps)), !1 !== r1 && !1 !== r2
                },
                _applyOverwrite = function(target, tween, props, mode, siblings) {
                    var i, changed, curTween, l;
                    if (1 === mode || mode >= 4) {
                        for (l = siblings.length, i = 0; i < l; i++)
                            if ((curTween = siblings[i]) !== tween) curTween._gc || curTween._kill(null, target, tween) && (changed = !0);
                            else if (5 === mode) break;
                        return changed
                    }
                    var globalStart, startTime = tween._startTime + 1e-10,
                        overlaps = [],
                        oCount = 0,
                        zeroDur = 0 === tween._duration;
                    for (i = siblings.length; --i > -1;)(curTween = siblings[i]) === tween || curTween._gc || curTween._paused || (curTween._timeline !== tween._timeline ? (globalStart = globalStart || _checkOverlap(tween, 0, zeroDur), 0 === _checkOverlap(curTween, globalStart, zeroDur) && (overlaps[oCount++] = curTween)) : curTween._startTime <= startTime && curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime && ((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 2e-10 || (overlaps[oCount++] = curTween)));
                    for (i = oCount; --i > -1;)
                        if (curTween = overlaps[i], 2 === mode && curTween._kill(props, target, tween) && (changed = !0), 2 !== mode || !curTween._firstPT && curTween._initted) {
                            if (2 !== mode && !_onOverwrite(curTween, tween)) continue;
                            curTween._enabled(!1, !1) && (changed = !0)
                        }
                    return changed
                },
                _checkOverlap = function(tween, reference, zeroDur) {
                    for (var tl = tween._timeline, ts = tl._timeScale, t = tween._startTime; tl._timeline;) {
                        if (t += tl._startTime, ts *= tl._timeScale, tl._paused) return -100;
                        tl = tl._timeline
                    }
                    return t /= ts, t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2e-10 ? 1e-10 : (t += tween.totalDuration() / tween._timeScale / ts) > reference + 1e-10 ? 0 : t - reference - 1e-10
                };
            p._init = function() {
                var i, initPlugins, pt, p, startVars, l, v = this.vars,
                    op = this._overwrittenProps,
                    dur = this._duration,
                    immediate = !!v.immediateRender,
                    ease = v.ease;
                if (v.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), startVars = {};
                    for (p in v.startAt) startVars[p] = v.startAt[p];
                    if (startVars.overwrite = !1, startVars.immediateRender = !0, startVars.lazy = immediate && !1 !== v.lazy, startVars.startAt = startVars.delay = null, this._startAt = TweenLite.to(this.target, 0, startVars), immediate)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== dur) return
                } else if (v.runBackwards && 0 !== dur)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (immediate = !1), pt = {};
                        for (p in v) _reservedProps[p] && "autoCSS" !== p || (pt[p] = v[p]);
                        if (pt.overwrite = 0, pt.data = "isFromStart", pt.lazy = immediate && !1 !== v.lazy, pt.immediateRender = immediate, this._startAt = TweenLite.to(this.target, 0, pt), immediate) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = ease = ease ? ease instanceof Ease ? ease : "function" == typeof ease ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase : TweenLite.defaultEase, v.easeParams instanceof Array && ease.config && (this._ease = ease.config.apply(ease, v.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (l = this._targets.length, i = 0; i < l; i++) this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i) && (initPlugins = !0);
                else initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
                if (initPlugins && TweenLite._onPluginEvent("_onInitAllProps", this), op && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), v.runBackwards)
                    for (pt = this._firstPT; pt;) pt.s += pt.c, pt.c = -pt.c, pt = pt._next;
                this._onUpdate = v.onUpdate, this._initted = !0
            }, p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
                var p, i, initPlugins, plugin, pt, v;
                if (null == target) return !1;
                _lazyLookup[target._gsTweenID] && _lazyRender(), this.vars.css || target.style && target !== window && target.nodeType && _plugins.css && !1 !== this.vars.autoCSS && _autoCSS(this.vars, target);
                for (p in this.vars)
                    if (v = this.vars[p], _reservedProps[p]) v && (v instanceof Array || v.push && _isArray(v)) && -1 !== v.join("").indexOf("{self}") && (this.vars[p] = v = this._swapSelfInParams(v, this));
                    else if (_plugins[p] && (plugin = new _plugins[p])._onInitTween(target, this.vars[p], this, index)) {
                    for (this._firstPT = pt = {
                            _next: this._firstPT,
                            t: plugin,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: p,
                            pg: 1,
                            pr: plugin._priority,
                            m: 0
                        }, i = plugin._overwriteProps.length; --i > -1;) propLookup[plugin._overwriteProps[i]] = this._firstPT;
                    (plugin._priority || plugin._onInitAllProps) && (initPlugins = !0), (plugin._onDisable || plugin._onEnable) && (this._notifyPluginsOfEnabled = !0), pt._next && (pt._next._prev = pt)
                } else propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
                return overwrittenProps && this._kill(overwrittenProps, target) ? this._initProps(target, propLookup, siblings, overwrittenProps, index) : this._overwrite > 1 && this._firstPT && siblings.length > 1 && _applyOverwrite(target, this, propLookup, this._overwrite, siblings) ? (this._kill(propLookup, target), this._initProps(target, propLookup, siblings, overwrittenProps, index)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (_lazyLookup[target._gsTweenID] = !0), initPlugins)
            }, p.render = function(time, suppressEvents, force) {
                var isComplete, callback, pt, rawPrevTime, prevTime = this._time,
                    duration = this._duration,
                    prevRawPrevTime = this._rawPrevTime;
                if (time >= duration - 1e-7) this._totalTime = this._time = duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (isComplete = !0, callback = "onComplete", force = force || this._timeline.autoRemoveChildren), 0 === duration && (this._initted || !this.vars.lazy || force) && (this._startTime === this._timeline._duration && (time = 0), (prevRawPrevTime < 0 || time <= 0 && time >= -1e-7 || 1e-10 === prevRawPrevTime && "isPause" !== this.data) && prevRawPrevTime !== time && (force = !0, prevRawPrevTime > 1e-10 && (callback = "onReverseComplete")), this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : 1e-10);
                else if (time < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== prevTime || 0 === duration && prevRawPrevTime > 0) && (callback = "onReverseComplete", isComplete = this._reversed), time < 0 && (this._active = !1, 0 === duration && (this._initted || !this.vars.lazy || force) && (prevRawPrevTime >= 0 && (1e-10 !== prevRawPrevTime || "isPause" !== this.data) && (force = !0), this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : 1e-10)), this._initted || (force = !0);
                else if (this._totalTime = this._time = time, this._easeType) {
                    var r = time / duration,
                        type = this._easeType,
                        pow = this._easePower;
                    (1 === type || 3 === type && r >= .5) && (r = 1 - r), 3 === type && (r *= 2), 1 === pow ? r *= r : 2 === pow ? r *= r * r : 3 === pow ? r *= r * r * r : 4 === pow && (r *= r * r * r * r), this.ratio = 1 === type ? 1 - r : 2 === type ? r : time / duration < .5 ? r / 2 : 1 - r / 2
                } else this.ratio = this._ease.getRatio(time / duration);
                if (this._time !== prevTime || force) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!force && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = prevTime, this._rawPrevTime = prevRawPrevTime, _lazyTweens.push(this), void(this._lazy = [time, suppressEvents]);
                        this._time && !isComplete ? this.ratio = this._ease.getRatio(this._time / duration) : isComplete && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== prevTime && time >= 0 && (this._active = !0), 0 === prevTime && (this._startAt && (time >= 0 ? this._startAt.render(time, suppressEvents, force) : callback || (callback = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== duration || suppressEvents || this._callback("onStart"))), pt = this._firstPT; pt;) pt.f ? pt.t[pt.p](pt.c * this.ratio + pt.s) : pt.t[pt.p] = pt.c * this.ratio + pt.s, pt = pt._next;
                    this._onUpdate && (time < 0 && this._startAt && -1e-4 !== time && this._startAt.render(time, suppressEvents, force), suppressEvents || (this._time !== prevTime || isComplete || force) && this._callback("onUpdate")), callback && (this._gc && !force || (time < 0 && this._startAt && !this._onUpdate && -1e-4 !== time && this._startAt.render(time, suppressEvents, force), isComplete && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !suppressEvents && this.vars[callback] && this._callback(callback), 0 === duration && 1e-10 === this._rawPrevTime && 1e-10 !== rawPrevTime && (this._rawPrevTime = 0)))
                }
            }, p._kill = function(vars, target, overwritingTween) {
                if ("all" === vars && (vars = null), null == vars && (null == target || target === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                target = "string" != typeof target ? target || this._targets || this.target : TweenLite.selector(target) || target;
                var i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed, simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline;
                if ((_isArray(target) || _isSelector(target)) && "number" != typeof target[0])
                    for (i = target.length; --i > -1;) this._kill(vars, target[i], overwritingTween) && (changed = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (target === this._targets[i]) {
                                propLookup = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
                                break
                            }
                    } else {
                        if (target !== this.target) return !1;
                        propLookup = this._propLookup, overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all"
                    }
                    if (propLookup) {
                        if (killProps = vars || propLookup, record = vars !== overwrittenProps && "all" !== overwrittenProps && vars !== propLookup && ("object" != typeof vars || !vars._tempKill), overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
                            for (p in killProps) propLookup[p] && (killed || (killed = []), killed.push(p));
                            if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) return !1
                        }
                        for (p in killProps)(pt = propLookup[p]) && (simultaneousOverwrite && (pt.f ? pt.t[pt.p](pt.s) : pt.t[pt.p] = pt.s, changed = !0), pt.pg && pt.t._kill(killProps) && (changed = !0), pt.pg && 0 !== pt.t._overwriteProps.length || (pt._prev ? pt._prev._next = pt._next : pt === this._firstPT && (this._firstPT = pt._next), pt._next && (pt._next._prev = pt._prev), pt._next = pt._prev = null), delete propLookup[p]), record && (overwrittenProps[p] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return changed
            }, p.invalidate = function() {
                return this._notifyPluginsOfEnabled && TweenLite._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], Animation.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -1e-10, this.render(Math.min(0, -this._delay))), this
            }, p._enabled = function(enabled, ignoreTimeline) {
                if (_tickerActive || _ticker.wake(), enabled && this._gc) {
                    var i, targets = this._targets;
                    if (targets)
                        for (i = targets.length; --i > -1;) this._siblings[i] = _register(targets[i], this, !0);
                    else this._siblings = _register(this.target, this, !0)
                }
                return Animation.prototype._enabled.call(this, enabled, ignoreTimeline), !(!this._notifyPluginsOfEnabled || !this._firstPT) && TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this)
            }, TweenLite.to = function(target, duration, vars) {
                return new TweenLite(target, duration, vars)
            }, TweenLite.from = function(target, duration, vars) {
                return vars.runBackwards = !0, vars.immediateRender = 0 != vars.immediateRender, new TweenLite(target, duration, vars)
            }, TweenLite.fromTo = function(target, duration, fromVars, toVars) {
                return toVars.startAt = fromVars, toVars.immediateRender = 0 != toVars.immediateRender && 0 != fromVars.immediateRender, new TweenLite(target, duration, toVars)
            }, TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
                return new TweenLite(callback, 0, {
                    delay: delay,
                    onComplete: callback,
                    onCompleteParams: params,
                    callbackScope: scope,
                    onReverseComplete: callback,
                    onReverseCompleteParams: params,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: useFrames,
                    overwrite: 0
                })
            }, TweenLite.set = function(target, vars) {
                return new TweenLite(target, 0, vars)
            }, TweenLite.getTweensOf = function(target, onlyActive) {
                if (null == target) return [];
                target = "string" != typeof target ? target : TweenLite.selector(target) || target;
                var i, a, j, t;
                if ((_isArray(target) || _isSelector(target)) && "number" != typeof target[0]) {
                    for (i = target.length, a = []; --i > -1;) a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
                    for (i = a.length; --i > -1;)
                        for (t = a[i], j = i; --j > -1;) t === a[j] && a.splice(i, 1)
                } else
                    for (a = _register(target).concat(), i = a.length; --i > -1;)(a[i]._gc || onlyActive && !a[i].isActive()) && a.splice(i, 1);
                return a
            }, TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
                "object" == typeof onlyActive && (vars = onlyActive, onlyActive = !1);
                for (var a = TweenLite.getTweensOf(target, onlyActive), i = a.length; --i > -1;) a[i]._kill(vars, target)
            };
            var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
                this._overwriteProps = (props || "").split(","), this._propName = this._overwriteProps[0], this._priority = priority || 0, this._super = TweenPlugin.prototype
            }, !0);
            if (p = TweenPlugin.prototype, TweenPlugin.version = "1.19.0", TweenPlugin.API = 2, p._firstPT = null, p._addTween = _addPropTween, p.setRatio = _setRatio, p._kill = function(lookup) {
                    var i, a = this._overwriteProps,
                        pt = this._firstPT;
                    if (null != lookup[this._propName]) this._overwriteProps = [];
                    else
                        for (i = a.length; --i > -1;) null != lookup[a[i]] && a.splice(i, 1);
                    for (; pt;) null != lookup[pt.n] && (pt._next && (pt._next._prev = pt._prev), pt._prev ? (pt._prev._next = pt._next, pt._prev = null) : this._firstPT === pt && (this._firstPT = pt._next)), pt = pt._next;
                    return !1
                }, p._mod = p._roundProps = function(lookup) {
                    for (var val, pt = this._firstPT; pt;) val = lookup[this._propName] || null != pt.n && lookup[pt.n.split(this._propName + "_").join("")], val && "function" == typeof val && (2 === pt.f ? pt.t._applyPT.m = val : pt.m = val), pt = pt._next
                }, TweenLite._onPluginEvent = function(type, tween) {
                    var changed, pt2, first, last, next, pt = tween._firstPT;
                    if ("_onInitAllProps" === type) {
                        for (; pt;) {
                            for (next = pt._next, pt2 = first; pt2 && pt2.pr > pt.pr;) pt2 = pt2._next;
                            (pt._prev = pt2 ? pt2._prev : last) ? pt._prev._next = pt: first = pt, (pt._next = pt2) ? pt2._prev = pt : last = pt, pt = next
                        }
                        pt = tween._firstPT = first
                    }
                    for (; pt;) pt.pg && "function" == typeof pt.t[type] && pt.t[type]() && (changed = !0), pt = pt._next;
                    return changed
                }, TweenPlugin.activate = function(plugins) {
                    for (var i = plugins.length; --i > -1;) plugins[i].API === TweenPlugin.API && (_plugins[(new plugins[i])._propName] = plugins[i]);
                    return !0
                }, _gsDefine.plugin = function(config) {
                    if (!(config && config.propName && config.init && config.API)) throw "illegal plugin definition.";
                    var prop, propName = config.propName,
                        priority = config.priority || 0,
                        overwriteProps = config.overwriteProps,
                        map = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function() {
                            TweenPlugin.call(this, propName, priority), this._overwriteProps = overwriteProps || []
                        }, !0 === config.global),
                        p = Plugin.prototype = new TweenPlugin(propName);
                    p.constructor = Plugin, Plugin.API = config.API;
                    for (prop in map) "function" == typeof config[prop] && (p[map[prop]] = config[prop]);
                    return Plugin.version = config.version, TweenPlugin.activate([Plugin]), Plugin
                }, a = window._gsQueue) {
                for (i = 0; i < a.length; i++) a[i]();
                for (p in _defLookup) _defLookup[p].func || window.console.log("GSAP encountered missing dependency: " + p)
            }
            _tickerActive = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var _doc = document.documentElement,
            _window = window,
            _max = function(element, axis) {
                var dim = "x" === axis ? "Width" : "Height",
                    scroll = "scroll" + dim,
                    client = "client" + dim,
                    body = document.body;
                return element === _window || element === _doc || element === body ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim]
            },
            _unwrapElement = function(value) {
                return "string" == typeof value && (value = TweenLite.selector(value)), value.length && value !== _window && value[0] && value[0].style && !value.nodeType && (value = value[0]), value === _window || value.nodeType && value.style ? value : null
            },
            _buildGetter = function(e, axis) {
                var p = "scroll" + ("x" === axis ? "Left" : "Top");
                return e === _window && (null != e.pageXOffset ? p = "page" + axis.toUpperCase() + "Offset" : e = null != _doc[p] ? _doc : document.body),
                    function() {
                        return e[p]
                    }
            },
            _getOffset = function(element, container) {
                var rect = _unwrapElement(element).getBoundingClientRect(),
                    isRoot = !container || container === _window || container === document.body,
                    cRect = (isRoot ? _doc : container).getBoundingClientRect(),
                    offsets = {
                        x: rect.left - cRect.left,
                        y: rect.top - cRect.top
                    };
                return !isRoot && container && (offsets.x += _buildGetter(container, "x")(), offsets.y += _buildGetter(container, "y")()), offsets
            },
            _parseVal = function(value, target, axis) {
                var type = typeof value;
                return "number" === type || "string" === type && "=" === value.charAt(1) ? value : "max" === value ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis])
            },
            ScrollToPlugin = _gsScope._gsDefine.plugin({
                propName: "scrollTo",
                API: 2,
                version: "1.8.0",
                init: function(target, value, tween) {
                    return this._wdw = target === _window, this._target = target, this._tween = tween, "object" != typeof value ? (value = {
                        y: value
                    }, "string" == typeof value.y && "max" !== value.y && "=" !== value.y.charAt(1) && (value.x = value.y)) : value.nodeType && (value = {
                        y: value,
                        x: value
                    }), this.vars = value, this._autoKill = !1 !== value.autoKill, this.getX = _buildGetter(target, "x"), this.getY = _buildGetter(target, "y"), this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != value.x ? (this._addTween(this, "x", this.x, _parseVal(value.x, target, "x") - (value.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != value.y ? (this._addTween(this, "y", this.y, _parseVal(value.y, target, "y") - (value.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
                },
                set: function(v) {
                    this._super.setRatio.call(this, v);
                    var x = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                        y = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                        yDif = y - this.yPrev,
                        xDif = x - this.xPrev,
                        threshold = ScrollToPlugin.autoKillThreshold;
                    this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x") && (this.skipX = !0), !this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? _window.scrollTo(this.skipX ? x : this.x, this.skipY ? y : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
                }
            }),
            p = ScrollToPlugin.prototype;
        ScrollToPlugin.max = _max, ScrollToPlugin.getOffset = _getOffset, ScrollToPlugin.autoKillThreshold = 7, p._kill = function(lookup) {
            return lookup.scrollTo_x && (this.skipX = !0), lookup.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, lookup)
        }
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(name) {
        "use strict";
        var getGlobal = function() {
            return (_gsScope.GreenSockGlobals || _gsScope).ScrollToPlugin
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], getGlobal) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = getGlobal())
    }(),
    function($, window, document, undefined) {
        "use strict";

        function Plugin(element, options) {
            this.element = element, this.$context = $(element).data("api", this), this.$layers = this.$context.find(".layer");
            var data = {
                calibrateX: this.$context.data("calibrate-x") || null,
                calibrateY: this.$context.data("calibrate-y") || null,
                invertX: this.$context.data("invert-x") || null,
                invertY: this.$context.data("invert-y") || null,
                limitX: parseFloat(this.$context.data("limit-x")) || null,
                limitY: parseFloat(this.$context.data("limit-y")) || null,
                scalarX: parseFloat(this.$context.data("scalar-x")) || null,
                scalarY: parseFloat(this.$context.data("scalar-y")) || null,
                frictionX: parseFloat(this.$context.data("friction-x")) || null,
                frictionY: parseFloat(this.$context.data("friction-y")) || null,
                originX: parseFloat(this.$context.data("origin-x")) || null,
                originY: parseFloat(this.$context.data("origin-y")) || null
            };
            for (var key in data) null === data[key] && delete data[key];
            $.extend(this, DEFAULTS, options, data), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depths = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
        }
        var NAME = "parallax",
            DEFAULTS = {
                relativeInput: !1,
                clipRelativeInput: !1,
                calibrationThreshold: 100,
                calibrationDelay: 500,
                supportDelay: 500,
                calibrateX: !1,
                calibrateY: !0,
                invertX: !0,
                invertY: !0,
                limitX: !1,
                limitY: !1,
                scalarX: 10,
                scalarY: 10,
                frictionX: .1,
                frictionY: .1,
                originX: .5,
                originY: .5
            };
        Plugin.prototype.transformSupport = function(value) {
            for (var element = document.createElement("div"), propertySupport = !1, propertyValue = null, featureSupport = !1, cssProperty = null, jsProperty = null, i = 0, l = this.vendors.length; i < l; i++)
                if (null !== this.vendors[i] ? (cssProperty = this.vendors[i][0] + "transform", jsProperty = this.vendors[i][1] + "Transform") : (cssProperty = "transform", jsProperty = "transform"), void 0 !== element.style[jsProperty]) {
                    propertySupport = !0;
                    break
                }
            switch (value) {
                case "2D":
                    featureSupport = propertySupport;
                    break;
                case "3D":
                    if (propertySupport) {
                        var body = document.body || document.createElement("body"),
                            documentElement = document.documentElement,
                            documentOverflow = documentElement.style.overflow;
                        document.body || (documentElement.style.overflow = "hidden", documentElement.appendChild(body), body.style.overflow = "hidden", body.style.background = ""), body.appendChild(element), element.style[jsProperty] = "translate3d(1px,1px,1px)", propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty), featureSupport = void 0 !== propertyValue && propertyValue.length > 0 && "none" !== propertyValue, documentElement.style.overflow = documentOverflow, body.removeChild(element)
                    }
            }
            return featureSupport
        }, Plugin.prototype.ww = null, Plugin.prototype.wh = null, Plugin.prototype.wcx = null, Plugin.prototype.wcy = null, Plugin.prototype.wrx = null, Plugin.prototype.wry = null, Plugin.prototype.portrait = null, Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), Plugin.prototype.vendors = [null, ["-webkit-", "webkit"],
            ["-moz-", "Moz"],
            ["-o-", "O"],
            ["-ms-", "ms"]
        ], Plugin.prototype.motionSupport = !!window.DeviceMotionEvent, Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent, Plugin.prototype.orientationStatus = 0, Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport("2D"), Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport("3D"), Plugin.prototype.propertyCache = {}, Plugin.prototype.initialise = function() {
            "static" === this.$context.css("position") && this.$context.css({
                position: "relative"
            }), this.accelerate(this.$context), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
        }, Plugin.prototype.updateLayers = function() {
            this.$layers = this.$context.find(".layer"), this.depths = [], this.$layers.css({
                position: "absolute",
                display: "block",
                left: 0,
                top: 0
            }), this.$layers.first().css({
                position: "relative"
            }), this.accelerate(this.$layers), this.$layers.each($.proxy(function(index, element) {
                this.depths.push($(element).data("depth") || 0)
            }, this))
        }, Plugin.prototype.updateDimensions = function() {
            this.ww = window.innerWidth, this.wh = window.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
        }, Plugin.prototype.updateBounds = function() {
            this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
        }, Plugin.prototype.queueCalibration = function(delay) {
            clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay)
        }, Plugin.prototype.enable = function() {
            this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, window.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, window.addEventListener("mousemove", this.onMouseMove)), window.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
        }, Plugin.prototype.disable = function() {
            this.enabled && (this.enabled = !1, this.orientationSupport ? window.removeEventListener("deviceorientation", this.onDeviceOrientation) : window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
        }, Plugin.prototype.calibrate = function(x, y) {
            this.calibrateX = void 0 === x ? this.calibrateX : x, this.calibrateY = void 0 === y ? this.calibrateY : y
        }, Plugin.prototype.invert = function(x, y) {
            this.invertX = void 0 === x ? this.invertX : x, this.invertY = void 0 === y ? this.invertY : y
        }, Plugin.prototype.friction = function(x, y) {
            this.frictionX = void 0 === x ? this.frictionX : x, this.frictionY = void 0 === y ? this.frictionY : y
        }, Plugin.prototype.scalar = function(x, y) {
            this.scalarX = void 0 === x ? this.scalarX : x, this.scalarY = void 0 === y ? this.scalarY : y
        }, Plugin.prototype.limit = function(x, y) {
            this.limitX = void 0 === x ? this.limitX : x, this.limitY = void 0 === y ? this.limitY : y
        }, Plugin.prototype.origin = function(x, y) {
            this.originX = void 0 === x ? this.originX : x, this.originY = void 0 === y ? this.originY : y
        }, Plugin.prototype.clamp = function(value, min, max) {
            return value = Math.max(value, min), value = Math.min(value, max)
        }, Plugin.prototype.css = function(element, property, value) {
            var jsProperty = this.propertyCache[property];
            if (!jsProperty)
                for (var i = 0, l = this.vendors.length; i < l; i++)
                    if (jsProperty = null !== this.vendors[i] ? $.camelCase(this.vendors[i][1] + "-" + property) : property, void 0 !== element.style[jsProperty]) {
                        this.propertyCache[property] = jsProperty;
                        break
                    }
            element.style[jsProperty] = value
        }, Plugin.prototype.accelerate = function($element) {
            for (var i = 0, l = $element.length; i < l; i++) {
                var element = $element[i];
                this.css(element, "transform", "translate3d(0,0,0)"), this.css(element, "transform-style", "preserve-3d"), this.css(element, "backface-visibility", "hidden")
            }
        }, Plugin.prototype.setPosition = function(element, x, y) {
            x += "px", y += "px", this.transform3DSupport ? this.css(element, "transform", "translate3d(" + x + "," + y + ",0)") : this.transform2DSupport ? this.css(element, "transform", "translate(" + x + "," + y + ")") : (element.style.left = x, element.style.top = y)
        }, Plugin.prototype.onOrientationTimer = function(event) {
            this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
        }, Plugin.prototype.onCalibrationTimer = function(event) {
            this.calibrationFlag = !0
        }, Plugin.prototype.onWindowResize = function(event) {
            this.updateDimensions()
        }, Plugin.prototype.onAnimationFrame = function() {
            this.updateBounds();
            var dx = this.ix - this.cx,
                dy = this.iy - this.cy;
            (Math.abs(dx) > this.calibrationThreshold || Math.abs(dy) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? dy : this.iy, this.my = this.calibrateY ? dx : this.ix) : (this.mx = this.calibrateX ? dx : this.ix, this.my = this.calibrateY ? dy : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
            for (var i = 0, l = this.$layers.length; i < l; i++) {
                var depth = this.depths[i],
                    layer = this.$layers[i],
                    xOffset = this.vx * depth * (this.invertX ? -1 : 1),
                    yOffset = this.vy * depth * (this.invertY ? -1 : 1);
                this.setPosition(layer, xOffset, yOffset)
            }
            this.raf = requestAnimationFrame(this.onAnimationFrame)
        }, Plugin.prototype.onDeviceOrientation = function(event) {
            if (!this.desktop && null !== event.beta && null !== event.gamma) {
                this.orientationStatus = 1;
                var x = (event.beta || 0) / 30,
                    y = (event.gamma || 0) / 30,
                    portrait = window.innerHeight > window.innerWidth;
                this.portrait !== portrait && (this.portrait = portrait, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = x, this.cy = y), this.ix = x, this.iy = y
            }
        }, Plugin.prototype.onMouseMove = function(event) {
            var clientX = event.clientX,
                clientY = event.clientY;
            !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (clientX = Math.max(clientX, this.ex), clientX = Math.min(clientX, this.ex + this.ew),
                clientY = Math.max(clientY, this.ey), clientY = Math.min(clientY, this.ey + this.eh)), this.ix = (clientX - this.ex - this.ecx) / this.erx, this.iy = (clientY - this.ey - this.ecy) / this.ery) : (this.ix = (clientX - this.wcx) / this.wrx, this.iy = (clientY - this.wcy) / this.wry)
        };
        var API = {
            enable: Plugin.prototype.enable,
            disable: Plugin.prototype.disable,
            updateLayers: Plugin.prototype.updateLayers,
            calibrate: Plugin.prototype.calibrate,
            friction: Plugin.prototype.friction,
            invert: Plugin.prototype.invert,
            scalar: Plugin.prototype.scalar,
            limit: Plugin.prototype.limit,
            origin: Plugin.prototype.origin
        };
        $.fn[NAME] = function(value) {
            var args = arguments;
            return this.each(function() {
                var $this = $(this),
                    plugin = $this.data(NAME);
                plugin || (plugin = new Plugin(this, value), $this.data(NAME, plugin)), API[value] && plugin[value].apply(plugin, Array.prototype.slice.call(args, 1))
            })
        }
    }(window.jQuery || window.Zepto, window, document),
    function() {
        for (var lastTime = 0, vendors = ["ms", "moz", "webkit", "o"], x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
            var currTime = (new Date).getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function() {
                    callback(currTime + timeToCall)
                }, timeToCall);
            return lastTime = currTime + timeToCall, id
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        })
    }(),
    function(global, factory) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function($) {
            return factory($, global, global.document, global.Math)
        }) : "object" == typeof exports && exports ? module.exports = factory(require("jquery"), global, global.document, global.Math) : factory(jQuery, global, global.document, global.Math)
    }("undefined" != typeof window ? window : this, function($, window, document, Math, undefined) {
        "use strict";
        var WRAPPER = "fullpage-wrapper",
            WRAPPER_SEL = "." + WRAPPER,
            RESPONSIVE = "fp-responsive",
            NO_TRANSITION = "fp-notransition",
            DESTROYED = "fp-destroyed",
            ENABLED = "fp-enabled",
            VIEWING_PREFIX = "fp-viewing",
            ACTIVE = "active",
            ACTIVE_SEL = "." + ACTIVE,
            COMPLETELY = "fp-completely",
            COMPLETELY_SEL = "." + COMPLETELY,
            SECTION = "fp-section",
            SECTION_SEL = "." + SECTION,
            SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL,
            SECTION_FIRST_SEL = SECTION_SEL + ":first",
            SECTION_LAST_SEL = SECTION_SEL + ":last",
            TABLE_CELL = "fp-tableCell",
            TABLE_CELL_SEL = "." + TABLE_CELL,
            SECTION_NAV = "fp-nav",
            SECTION_NAV_SEL = "#" + SECTION_NAV,
            SECTION_NAV_TOOLTIP = "fp-tooltip",
            SECTION_NAV_TOOLTIP_SEL = "." + SECTION_NAV_TOOLTIP,
            SLIDE = "fp-slide",
            SLIDE_SEL = "." + SLIDE,
            SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL,
            SLIDES_WRAPPER = "fp-slides",
            SLIDES_WRAPPER_SEL = "." + SLIDES_WRAPPER,
            SLIDES_CONTAINER = "fp-slidesContainer",
            SLIDES_CONTAINER_SEL = "." + SLIDES_CONTAINER,
            TABLE = "fp-table",
            SLIDES_NAV = "fp-slidesNav",
            SLIDES_NAV_SEL = "." + SLIDES_NAV,
            SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + " a",
            SLIDES_ARROW_SEL = ".fp-controlArrow",
            SLIDES_PREV = "fp-prev",
            SLIDES_PREV_SEL = "." + SLIDES_PREV,
            SLIDES_ARROW_PREV = "fp-controlArrow " + SLIDES_PREV,
            SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL,
            SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + ".fp-next",
            $window = $(window),
            $document = $(document),
            iscrollOptions = {
                scrollbars: !0,
                mouseWheel: !0,
                hideScrollbars: !1,
                fadeScrollbars: !1,
                disableMouse: !0,
                interactiveScrollbars: !0
            };
        $.fn.fullpage = function(options) {
            function setAutoScrolling(value, type) {
                setVariableState("autoScrolling", value, type);
                var element = $(SECTION_ACTIVE_SEL);
                options.autoScrolling && !options.scrollBar ? ($htmlBody.css({
                    overflow: "hidden",
                    height: "100%"
                }), setRecordHistory(originals.recordHistory, "internal"), container.css({
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                }), element.length && silentScroll(element.position().top)) : ($htmlBody.css({
                    overflow: "visible",
                    height: "initial"
                }), setRecordHistory(!1, "internal"), container.css({
                    "-ms-touch-action": "",
                    "touch-action": ""
                }), silentScroll(0), element.length && $htmlBody.scrollTop(element.position().top))
            }

            function setRecordHistory(value, type) {
                setVariableState("recordHistory", value, type)
            }

            function setScrollingSpeed(value, type) {
                setVariableState("scrollingSpeed", value, type)
            }

            function setFitToSection(value, type) {
                setVariableState("fitToSection", value, type)
            }

            function setLockAnchors(value) {
                options.lockAnchors = value
            }

            function setMouseWheelScrolling(value) {
                value ? (addMouseWheelHandler(), addMiddleWheelHandler()) : (removeMouseWheelHandler(), removeMiddleWheelHandler())
            }

            function setAllowScrolling(value, directions) {
                void 0 !== directions ? (directions = directions.replace(/ /g, "").split(","), $.each(directions, function(index, direction) {
                    setIsScrollAllowed(value, direction, "m")
                })) : value ? (setMouseWheelScrolling(!0), addTouchHandler()) : (setMouseWheelScrolling(!1), removeTouchHandler())
            }

            function setKeyboardScrolling(value, directions) {
                void 0 !== directions ? (directions = directions.replace(/ /g, "").split(","), $.each(directions, function(index, direction) {
                    setIsScrollAllowed(value, direction, "k")
                })) : options.keyboardScrolling = value
            }

            function moveSectionUp() {
                var prev = $(SECTION_ACTIVE_SEL).prev(SECTION_SEL);
                prev.length || !options.loopTop && !options.continuousVertical || (prev = $(SECTION_SEL).last()), prev.length && scrollPage(prev, null, !0)
            }

            function moveSectionDown() {
                var next = $(SECTION_ACTIVE_SEL).next(SECTION_SEL);
                next.length || !options.loopBottom && !options.continuousVertical || (next = $(SECTION_SEL).first()), next.length && scrollPage(next, null, !1)
            }

            function silentMoveTo(sectionAnchor, slideAnchor) {
                setScrollingSpeed(0, "internal"), moveTo(sectionAnchor, slideAnchor), setScrollingSpeed(originals.scrollingSpeed, "internal")
            }

            function moveTo(sectionAnchor, slideAnchor) {
                var destiny = getSectionByAnchor(sectionAnchor);
                void 0 !== slideAnchor ? scrollPageAndSlide(sectionAnchor, slideAnchor) : destiny.length > 0 && scrollPage(destiny)
            }

            function moveSlideRight(section) {
                moveSlide("right", section)
            }

            function moveSlideLeft(section) {
                moveSlide("left", section)
            }

            function reBuild(resizing) {
                if (!container.hasClass(DESTROYED)) {
                    isResizing = !0, windowsHeight = $window.height(), $(SECTION_SEL).each(function() {
                        var slidesWrap = $(this).find(SLIDES_WRAPPER_SEL),
                            slides = $(this).find(SLIDE_SEL);
                        options.verticalCentered && $(this).find(TABLE_CELL_SEL).css("height", getTableHeight($(this)) + "px"), $(this).css("height", windowsHeight + "px"), options.scrollOverflow && (slides.length ? slides.each(function() {
                            createScrollBar($(this))
                        }) : createScrollBar($(this))), slides.length > 1 && landscapeScroll(slidesWrap, slidesWrap.find(SLIDE_ACTIVE_SEL))
                    });
                    var activeSection = $(SECTION_ACTIVE_SEL),
                        sectionIndex = activeSection.index(SECTION_SEL);
                    sectionIndex && silentMoveTo(sectionIndex + 1), isResizing = !1, $.isFunction(options.afterResize) && resizing && options.afterResize.call(container), $.isFunction(options.afterReBuild) && !resizing && options.afterReBuild.call(container)
                }
            }

            function setResponsive(active) {
                var isResponsive = $body.hasClass(RESPONSIVE);
                active ? isResponsive || (setAutoScrolling(!1, "internal"), setFitToSection(!1, "internal"), $(SECTION_NAV_SEL).hide(), $body.addClass(RESPONSIVE), $.isFunction(options.afterResponsive) && options.afterResponsive.call(container, active)) : isResponsive && (setAutoScrolling(originals.autoScrolling, "internal"), setFitToSection(originals.autoScrolling, "internal"), $(SECTION_NAV_SEL).show(), $body.removeClass(RESPONSIVE), $.isFunction(options.afterResponsive) && options.afterResponsive.call(container, active))
            }

            function setOptionsFromDOM() {
                var sections = container.find(options.sectionSelector);
                options.anchors.length || (options.anchors = sections.filter("[data-anchor]").map(function() {
                    return $(this).data("anchor").toString()
                }).get()), options.navigationTooltips.length || (options.navigationTooltips = sections.filter("[data-tooltip]").map(function() {
                    return $(this).data("tooltip").toString()
                }).get())
            }

            function prepareDom() {
                container.css({
                    height: "100%",
                    position: "relative"
                }), container.addClass(WRAPPER), $("html").addClass(ENABLED), windowsHeight = $window.height(), container.removeClass(DESTROYED), addInternalSelectors(), $(SECTION_SEL).each(function(index) {
                    var section = $(this),
                        slides = section.find(SLIDE_SEL),
                        numSlides = slides.length;
                    styleSection(section, index), styleMenu(section, index), numSlides > 0 ? styleSlides(section, slides, numSlides) : options.verticalCentered && addTableClass(section)
                }), options.fixedElements && options.css3 && $(options.fixedElements).appendTo($body), options.navigation && addVerticalNavigation(), enableYoutubeAPI(), options.scrollOverflow ? ("complete" === document.readyState && createScrollBarHandler(), $window.on("load", createScrollBarHandler)) : afterRenderActions()
            }

            function styleSlides(section, slides, numSlides) {
                var sliderWidth = 100 * numSlides,
                    slideWidth = 100 / numSlides;
                slides.wrapAll('<div class="' + SLIDES_CONTAINER + '" />'), slides.parent().wrap('<div class="' + SLIDES_WRAPPER + '" />'), section.find(SLIDES_CONTAINER_SEL).css("width", sliderWidth + "%"), numSlides > 1 && (options.controlArrows && createSlideArrows(section), options.slidesNavigation && addSlidesNavigation(section, numSlides)), slides.each(function(index) {
                    $(this).css("width", slideWidth + "%"), options.verticalCentered && addTableClass($(this))
                });
                var startingSlide = section.find(SLIDE_ACTIVE_SEL);
                startingSlide.length && (0 !== $(SECTION_ACTIVE_SEL).index(SECTION_SEL) || 0 === $(SECTION_ACTIVE_SEL).index(SECTION_SEL) && 0 !== startingSlide.index()) ? silentLandscapeScroll(startingSlide) : slides.eq(0).addClass(ACTIVE)
            }

            function styleSection(section, index) {
                index || 0 !== $(SECTION_ACTIVE_SEL).length || section.addClass(ACTIVE), section.css("height", windowsHeight + "px"), options.paddingTop && section.css("padding-top", options.paddingTop), options.paddingBottom && section.css("padding-bottom", options.paddingBottom), void 0 !== options.sectionsColor[index] && section.css("background-color", options.sectionsColor[index]), void 0 !== options.anchors[index] && section.attr("data-anchor", options.anchors[index])
            }

            function styleMenu(section, index) {
                void 0 !== options.anchors[index] && section.hasClass(ACTIVE) && activateMenuAndNav(options.anchors[index], index), options.menu && options.css3 && $(options.menu).closest(WRAPPER_SEL).length && $(options.menu).appendTo($body)
            }

            function addInternalSelectors() {
                container.find(options.sectionSelector).addClass(SECTION), container.find(options.slideSelector).addClass(SLIDE)
            }

            function createSlideArrows(section) {
                section.find(SLIDES_WRAPPER_SEL).after('<div class="' + SLIDES_ARROW_PREV + '"></div><div class="fp-controlArrow fp-next"></div>'), "#fff" != options.controlArrowColor && (section.find(SLIDES_ARROW_NEXT_SEL).css("border-color", "transparent transparent transparent " + options.controlArrowColor), section.find(SLIDES_ARROW_PREV_SEL).css("border-color", "transparent " + options.controlArrowColor + " transparent transparent")), options.loopHorizontal || section.find(SLIDES_ARROW_PREV_SEL).hide()
            }

            function addVerticalNavigation() {
                $body.append('<div id="' + SECTION_NAV + '"><ul></ul></div>');
                var nav = $(SECTION_NAV_SEL);
                nav.addClass(function() {
                    return options.showActiveTooltip ? "fp-show-active " + options.navigationPosition : options.navigationPosition
                });
                for (var i = 0; i < $(SECTION_SEL).length; i++) {
                    var link = "";
                    options.anchors.length && (link = options.anchors[i]);
                    var li = '<li><a href="#' + link + '"><span></span></a>',
                        tooltip = options.navigationTooltips[i];
                    void 0 !== tooltip && "" !== tooltip && (li += '<div class="' + SECTION_NAV_TOOLTIP + " " + options.navigationPosition + '">' + tooltip + "</div>"), li += "</li>", nav.find("ul").append(li)
                }
                $(SECTION_NAV_SEL).css("margin-top", "-" + $(SECTION_NAV_SEL).height() / 2 + "px"), $(SECTION_NAV_SEL).find("li").eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find("a").addClass(ACTIVE)
            }

            function createScrollBarHandler() {
                $(SECTION_SEL).each(function() {
                    var slides = $(this).find(SLIDE_SEL);
                    slides.length ? slides.each(function() {
                        createScrollBar($(this))
                    }) : createScrollBar($(this))
                }), afterRenderActions()
            }

            function enableYoutubeAPI() {
                container.find('iframe[src*="youtube.com/embed/"]').each(function() {
                    addURLParam($(this), "enablejsapi=1")
                })
            }

            function addURLParam(element, newParam) {
                var originalSrc = element.attr("src");
                element.attr("src", originalSrc + getUrlParamSign(originalSrc) + newParam)
            }

            function getUrlParamSign(url) {
                return /\?/.test(url) ? "&" : "?"
            }

            function afterRenderActions() {
                var section = $(SECTION_ACTIVE_SEL);
                section.addClass(COMPLETELY), options.scrollOverflowHandler.afterRender && options.scrollOverflowHandler.afterRender(section), lazyLoad(section), playMedia(section), options.scrollOverflowHandler.afterLoad(), $.isFunction(options.afterLoad) && options.afterLoad.call(section, section.data("anchor"), section.index(SECTION_SEL) + 1), $.isFunction(options.afterRender) && options.afterRender.call(container)
            }

            function scrollHandler() {
                var currentSection;
                if (!options.autoScrolling || options.scrollBar) {
                    var currentScroll = $window.scrollTop(),
                        scrollDirection = getScrollDirection(currentScroll),
                        visibleSectionIndex = 0,
                        screen_mid = currentScroll + $window.height() / 2,
                        isAtBottom = $body.height() - $window.height() === currentScroll,
                        sections = document.querySelectorAll(SECTION_SEL);
                    if (isAtBottom) visibleSectionIndex = sections.length - 1;
                    else if (currentScroll)
                        for (var i = 0; i < sections.length; ++i) {
                            var section = sections[i];
                            section.offsetTop <= screen_mid && (visibleSectionIndex = i)
                        } else visibleSectionIndex = 0;
                    if (isCompletelyInViewPort(scrollDirection) && ($(SECTION_ACTIVE_SEL).hasClass(COMPLETELY) || $(SECTION_ACTIVE_SEL).addClass(COMPLETELY).siblings().removeClass(COMPLETELY)), currentSection = $(sections).eq(visibleSectionIndex), !currentSection.hasClass(ACTIVE)) {
                        isScrolling = !0;
                        var slideIndex, slideAnchorLink, leavingSection = $(SECTION_ACTIVE_SEL),
                            leavingSectionIndex = leavingSection.index(SECTION_SEL) + 1,
                            yMovement = getYmovement(currentSection),
                            anchorLink = currentSection.data("anchor"),
                            sectionIndex = currentSection.index(SECTION_SEL) + 1,
                            activeSlide = currentSection.find(SLIDE_ACTIVE_SEL);
                        activeSlide.length && (slideAnchorLink = activeSlide.data("anchor"), slideIndex = activeSlide.index()), canScroll && (currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE), $.isFunction(options.onLeave) && options.onLeave.call(leavingSection, leavingSectionIndex, sectionIndex, yMovement), $.isFunction(options.afterLoad) && options.afterLoad.call(currentSection, anchorLink, sectionIndex), stopMedia(leavingSection), lazyLoad(currentSection), playMedia(currentSection), activateMenuAndNav(anchorLink, sectionIndex - 1), options.anchors.length && (lastScrolledDestiny = anchorLink), setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex)), clearTimeout(scrollId), scrollId = setTimeout(function() {
                            isScrolling = !1
                        }, 100)
                    }
                    options.fitToSection && (clearTimeout(scrollId2), scrollId2 = setTimeout(function() {
                        canScroll && options.fitToSection && ($(SECTION_ACTIVE_SEL).is(currentSection) && (isResizing = !0), scrollPage($(SECTION_ACTIVE_SEL)), isResizing = !1)
                    }, options.fitToSectionDelay))
                }
            }

            function isCompletelyInViewPort(movement) {
                var top = $(SECTION_ACTIVE_SEL).position().top,
                    bottom = top + $window.height();
                return "up" == movement ? bottom >= $window.scrollTop() + $window.height() : top <= $window.scrollTop()
            }

            function getScrollDirection(currentScroll) {
                var direction = currentScroll > lastScroll ? "down" : "up";
                return lastScroll = currentScroll, previousDestTop = currentScroll, direction
            }

            function scrolling(type, scrollable) {
                if (isScrollAllowed.m[type]) {
                    var check = "down" === type ? "bottom" : "top",
                        scrollSection = "down" === type ? moveSectionDown : moveSectionUp;
                    if (scrollable.length > 0) {
                        if (!options.scrollOverflowHandler.isScrolled(check, scrollable)) return !0;
                        scrollSection()
                    } else scrollSection()
                }
            }

            function preventBouncing(event) {
                var e = event.originalEvent;
                !checkParentForNormalScrollElement(event.target) && options.autoScrolling && isReallyTouch(e) && event.preventDefault()
            }

            function touchMoveHandler(event) {
                var e = event.originalEvent,
                    activeSection = $(e.target).closest(SECTION_SEL);
                if (!checkParentForNormalScrollElement(event.target) && isReallyTouch(e)) {
                    options.autoScrolling && event.preventDefault();
                    var scrollable = options.scrollOverflowHandler.scrollable(activeSection),
                        touchEvents = getEventsPage(e);
                    touchEndY = touchEvents.y, touchEndX = touchEvents.x, activeSection.find(SLIDES_WRAPPER_SEL).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY) ? !slideMoving && Math.abs(touchStartX - touchEndX) > $window.outerWidth() / 100 * options.touchSensitivity && (touchStartX > touchEndX ? isScrollAllowed.m.right && moveSlideRight(activeSection) : isScrollAllowed.m.left && moveSlideLeft(activeSection)) : options.autoScrolling && canScroll && Math.abs(touchStartY - touchEndY) > $window.height() / 100 * options.touchSensitivity && (touchStartY > touchEndY ? scrolling("down", scrollable) : touchEndY > touchStartY && scrolling("up", scrollable))
                }
            }

            function checkParentForNormalScrollElement(el, hop) {
                hop = hop || 0;
                var parent = $(el).parent();
                return !!(hop < options.normalScrollElementTouchThreshold && parent.is(options.normalScrollElements)) || hop != options.normalScrollElementTouchThreshold && checkParentForNormalScrollElement(parent, ++hop)
            }

            function isReallyTouch(e) {
                return void 0 === e.pointerType || "mouse" != e.pointerType
            }

            function touchStartHandler(event) {
                var e = event.originalEvent;
                if (options.fitToSection && $htmlBody.stop(), isReallyTouch(e)) {
                    var touchEvents = getEventsPage(e);
                    touchStartY = touchEvents.y, touchStartX = touchEvents.x
                }
            }

            function getAverage(elements, number) {
                for (var sum = 0, lastElements = elements.slice(Math.max(elements.length - number, 1)), i = 0; i < lastElements.length; i++) sum += lastElements[i];
                return Math.ceil(sum / number)
            }

            function MouseWheelHandler(e) {
                var curTime = (new Date).getTime(),
                    isNormalScroll = $(COMPLETELY_SEL).hasClass("fp-normal-scroll");
                if (options.autoScrolling && !controlPressed && !isNormalScroll) {
                    e = e || window.event;
                    var value = e.wheelDelta || -e.deltaY || -e.detail,
                        delta = Math.max(-1, Math.min(1, value)),
                        horizontalDetection = void 0 !== e.wheelDeltaX || void 0 !== e.deltaX,
                        isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
                    scrollings.length > 149 && scrollings.shift(), scrollings.push(Math.abs(value)), options.scrollBar && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                    var activeSection = $(SECTION_ACTIVE_SEL),
                        scrollable = options.scrollOverflowHandler.scrollable(activeSection),
                        timeDiff = curTime - prevTime;
                    return prevTime = curTime, timeDiff > 200 && (scrollings = []), canScroll && getAverage(scrollings, 10) >= getAverage(scrollings, 70) && isScrollingVertically && (delta < 0 ? scrolling("down", scrollable) : scrolling("up", scrollable)), !1
                }
                options.fitToSection && $htmlBody.stop()
            }

            function moveSlide(direction, section) {
                var activeSection = void 0 === section ? $(SECTION_ACTIVE_SEL) : section,
                    slides = activeSection.find(SLIDES_WRAPPER_SEL),
                    numSlides = slides.find(SLIDE_SEL).length;
                if (!(!slides.length || slideMoving || numSlides < 2)) {
                    var currentSlide = slides.find(SLIDE_ACTIVE_SEL),
                        destiny = null;
                    if (destiny = "left" === direction ? currentSlide.prev(SLIDE_SEL) : currentSlide.next(SLIDE_SEL), !destiny.length) {
                        if (!options.loopHorizontal) return;
                        destiny = "left" === direction ? currentSlide.siblings(":last") : currentSlide.siblings(":first")
                    }
                    slideMoving = !0, landscapeScroll(slides, destiny, direction)
                }
            }

            function keepSlidesPosition() {
                $(SLIDE_ACTIVE_SEL).each(function() {
                    silentLandscapeScroll($(this), "internal")
                })
            }

            function getDestinationPosition(element) {
                var elemPosition = element.position(),
                    position = elemPosition.top,
                    isScrollingDown = elemPosition.top > previousDestTop,
                    sectionBottom = position - windowsHeight + element.outerHeight(),
                    bigSectionsDestination = options.bigSectionsDestination;
                return element.outerHeight() > windowsHeight ? (isScrollingDown || bigSectionsDestination) && "bottom" !== bigSectionsDestination || (position = sectionBottom) : (isScrollingDown || isResizing && element.is(":last-child")) && (position = sectionBottom), previousDestTop = position, position
            }

            function scrollPage(element, callback, isMovementUp) {
                if (void 0 !== element) {
                    var slideAnchorLink, slideIndex, dtop = getDestinationPosition(element),
                        v = {
                            element: element,
                            callback: callback,
                            isMovementUp: isMovementUp,
                            dtop: dtop,
                            yMovement: getYmovement(element),
                            anchorLink: element.data("anchor"),
                            sectionIndex: element.index(SECTION_SEL),
                            activeSlide: element.find(SLIDE_ACTIVE_SEL),
                            activeSection: $(SECTION_ACTIVE_SEL),
                            leavingSection: $(SECTION_ACTIVE_SEL).index(SECTION_SEL) + 1,
                            localIsResizing: isResizing
                        };
                    v.activeSection.is(element) && !isResizing || options.scrollBar && $window.scrollTop() === v.dtop && !element.hasClass("fp-auto-height") || (v.activeSlide.length && (slideAnchorLink = v.activeSlide.data("anchor"), slideIndex = v.activeSlide.index()), options.autoScrolling && options.continuousVertical && void 0 !== v.isMovementUp && (!v.isMovementUp && "up" == v.yMovement || v.isMovementUp && "down" == v.yMovement) && (v = createInfiniteSections(v)), $.isFunction(options.onLeave) && !v.localIsResizing && !1 === options.onLeave.call(v.activeSection, v.leavingSection, v.sectionIndex + 1, v.yMovement) || (stopMedia(v.activeSection), options.scrollOverflowHandler.beforeLeave(), element.addClass(ACTIVE).siblings().removeClass(ACTIVE), lazyLoad(element), options.scrollOverflowHandler.onLeave(), canScroll = !1, setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex), performMovement(v), lastScrolledDestiny = v.anchorLink, activateMenuAndNav(v.anchorLink, v.sectionIndex)))
                }
            }

            function performMovement(v) {
                if (options.css3 && options.autoScrolling && !options.scrollBar) transformContainer("translate3d(0px, -" + Math.round(v.dtop) + "px, 0px)", !0), options.scrollingSpeed ? (clearTimeout(afterSectionLoadsId), afterSectionLoadsId = setTimeout(function() {
                    afterSectionLoads(v)
                }, options.scrollingSpeed)) : afterSectionLoads(v);
                else {
                    var scrollSettings = getScrollSettings(v);
                    $(scrollSettings.element).animate(scrollSettings.options, options.scrollingSpeed, options.easing).promise().done(function() {
                        options.scrollBar ? setTimeout(function() {
                            afterSectionLoads(v)
                        }, 30) : afterSectionLoads(v)
                    })
                }
            }

            function getScrollSettings(v) {
                var scroll = {};
                return options.autoScrolling && !options.scrollBar ? (scroll.options = {
                    top: -v.dtop
                }, scroll.element = WRAPPER_SEL) : (scroll.options = {
                    scrollTop: v.dtop
                }, scroll.element = "html, body"), scroll
            }

            function createInfiniteSections(v) {
                return v.isMovementUp ? $(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL)) : $(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse()), silentScroll($(SECTION_ACTIVE_SEL).position().top), keepSlidesPosition(), v.wrapAroundElements = v.activeSection, v.dtop = v.element.position().top, v.yMovement = getYmovement(v.element), v
            }

            function continuousVerticalFixSectionOrder(v) {
                v.wrapAroundElements && v.wrapAroundElements.length && (v.isMovementUp ? $(SECTION_FIRST_SEL).before(v.wrapAroundElements) : $(SECTION_LAST_SEL).after(v.wrapAroundElements), silentScroll($(SECTION_ACTIVE_SEL).position().top), keepSlidesPosition())
            }

            function afterSectionLoads(v) {
                continuousVerticalFixSectionOrder(v), $.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, v.sectionIndex + 1), options.scrollOverflowHandler.afterLoad(), v.localIsResizing || playMedia(v.element), v.element.addClass(COMPLETELY).siblings().removeClass(COMPLETELY), canScroll = !0, $.isFunction(v.callback) && v.callback.call(this)
            }

            function lazyLoad(destiny) {
                if (options.lazyLoading) {
                    var element;
                    getSlideOrSection(destiny).find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                        element = $(this), element.attr("src", element.data("src")), element.removeAttr("data-src"), element.is("source") && element.closest("video").get(0).load()
                    })
                }
            }

            function playMedia(destiny) {
                var panel = getSlideOrSection(destiny);
                panel.find("video, audio").each(function() {
                    var element = $(this).get(0);
                    element.hasAttribute("data-autoplay") && "function" == typeof element.play && element.play()
                }), panel.find('iframe[src*="youtube.com/embed/"]').each(function() {
                    var element = $(this).get(0);
                    element.hasAttribute("data-autoplay") && playYoutube(element), element.onload = function() {
                        element.hasAttribute("data-autoplay") && playYoutube(element)
                    }
                })
            }

            function playYoutube(element) {
                element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
            }

            function stopMedia(destiny) {
                var panel = getSlideOrSection(destiny);
                panel.find("video, audio").each(function() {
                    var element = $(this).get(0);
                    element.hasAttribute("data-keepplaying") || "function" != typeof element.pause || element.pause()
                }), panel.find('iframe[src*="youtube.com/embed/"]').each(function() {
                    var element = $(this).get(0);
                    /youtube\.com\/embed\//.test($(this).attr("src")) && !element.hasAttribute("data-keepplaying") && $(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
                })
            }

            function getSlideOrSection(destiny) {
                var slide = destiny.find(SLIDE_ACTIVE_SEL);
                return slide.length && (destiny = $(slide)), destiny
            }

            function scrollToAnchor() {
                var value = window.location.hash.replace("#", "").split("/"),
                    sectionAnchor = decodeURIComponent(value[0]),
                    slideAnchor = decodeURIComponent(value[1]);
                sectionAnchor && (options.animateAnchor ? scrollPageAndSlide(sectionAnchor, slideAnchor) : silentMoveTo(sectionAnchor, slideAnchor))
            }

            function hashChangeHandler() {
                if (!isScrolling && !options.lockAnchors) {
                    var value = window.location.hash.replace("#", "").split("/"),
                        sectionAnchor = decodeURIComponent(value[0]),
                        slideAnchor = decodeURIComponent(value[1]),
                        isFirstSlideMove = void 0 === lastScrolledDestiny,
                        isFirstScrollMove = void 0 === lastScrolledDestiny && void 0 === slideAnchor && !slideMoving;
                    sectionAnchor.length && (sectionAnchor && sectionAnchor !== lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !slideMoving && lastScrolledSlide != slideAnchor) && scrollPageAndSlide(sectionAnchor, slideAnchor)
                }
            }

            function keydownHandler(e) {
                clearTimeout(keydownId);
                var activeElement = $(":focus");
                if (!activeElement.is("textarea") && !activeElement.is("input") && !activeElement.is("select") && "true" !== activeElement.attr("contentEditable") && "" !== activeElement.attr("contentEditable") && options.keyboardScrolling && options.autoScrolling) {
                    var keyCode = e.which,
                        keyControls = [40, 38, 32, 33, 34];
                    $.inArray(keyCode, keyControls) > -1 && e.preventDefault(), controlPressed = e.ctrlKey, keydownId = setTimeout(function() {
                        onkeydown(e)
                    }, 150)
                }
            }

            function tooltipTextHandler() {
                $(this).prev().trigger("click")
            }

            function keyUpHandler(e) {
                isWindowFocused && (controlPressed = e.ctrlKey)
            }

            function mouseDownHandler(e) {
                2 == e.which && (oldPageY = e.pageY, container.on("mousemove", mouseMoveHandler))
            }

            function mouseUpHandler(e) {
                2 == e.which && container.off("mousemove")
            }

            function slideArrowHandler() {
                var section = $(this).closest(SECTION_SEL);
                $(this).hasClass(SLIDES_PREV) ? isScrollAllowed.m.left && moveSlideLeft(section) : isScrollAllowed.m.right && moveSlideRight(section)
            }

            function blurHandler() {
                isWindowFocused = !1, controlPressed = !1
            }

            function sectionBulletHandler(e) {
                e.preventDefault();
                var index = $(this).parent().index();
                scrollPage($(SECTION_SEL).eq(index))
            }

            function slideBulletHandler(e) {
                e.preventDefault();
                var slides = $(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL);
                landscapeScroll(slides, slides.find(SLIDE_SEL).eq($(this).closest("li").index()))
            }

            function onkeydown(e) {
                var shiftPressed = e.shiftKey;
                switch (e.which) {
                    case 38:
                    case 33:
                        isScrollAllowed.k.up && moveSectionUp();
                        break;
                    case 32:
                        if (shiftPressed && isScrollAllowed.k.up) {
                            moveSectionUp();
                            break
                        }
                    case 40:
                    case 34:
                        isScrollAllowed.k.down && moveSectionDown();
                        break;
                    case 36:
                        isScrollAllowed.k.up && moveTo(1);
                        break;
                    case 35:
                        isScrollAllowed.k.down && moveTo($(SECTION_SEL).length);
                        break;
                    case 37:
                        isScrollAllowed.k.left && moveSlideLeft();
                        break;
                    case 39:
                        isScrollAllowed.k.right && moveSlideRight();
                        break;
                    default:
                        return
                }
            }

            function mouseMoveHandler(e) {
                canScroll && (e.pageY < oldPageY && isScrollAllowed.m.up ? moveSectionUp() : e.pageY > oldPageY && isScrollAllowed.m.down && moveSectionDown()), oldPageY = e.pageY
            }

            function landscapeScroll(slides, destiny, direction) {
                var section = slides.closest(SECTION_SEL),
                    v = {
                        slides: slides,
                        destiny: destiny,
                        direction: direction,
                        destinyPos: destiny.position(),
                        slideIndex: destiny.index(),
                        section: section,
                        sectionIndex: section.index(SECTION_SEL),
                        anchorLink: section.data("anchor"),
                        slidesNav: section.find(SLIDES_NAV_SEL),
                        slideAnchor: getAnchor(destiny),
                        prevSlide: section.find(SLIDE_ACTIVE_SEL),
                        prevSlideIndex: section.find(SLIDE_ACTIVE_SEL).index(),
                        localIsResizing: isResizing
                    };
                if (v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex), v.localIsResizing || (canScroll = !1), options.onSlideLeave && !v.localIsResizing && "none" !== v.xMovement && $.isFunction(options.onSlideLeave) && !1 === options.onSlideLeave.call(v.prevSlide, v.anchorLink, v.sectionIndex + 1, v.prevSlideIndex, v.xMovement, v.slideIndex)) return void(slideMoving = !1);
                destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE), v.localIsResizing || (stopMedia(v.prevSlide), lazyLoad(destiny)), !options.loopHorizontal && options.controlArrows && (section.find(SLIDES_ARROW_PREV_SEL).toggle(0 !== v.slideIndex), section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(":last-child"))), section.hasClass(ACTIVE) && setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex), performHorizontalMove(slides, v, !0)
            }

            function afterSlideLoads(v) {
                activeSlidesNavigation(v.slidesNav, v.slideIndex), v.localIsResizing || ($.isFunction(options.afterSlideLoad) && options.afterSlideLoad.call(v.destiny, v.anchorLink, v.sectionIndex + 1, v.slideAnchor, v.slideIndex), canScroll = !0, playMedia(v.destiny)), slideMoving = !1
            }

            function performHorizontalMove(slides, v, fireCallback) {
                var destinyPos = v.destinyPos;
                if (options.css3) {
                    var translate3d = "translate3d(-" + Math.round(destinyPos.left) + "px, 0px, 0px)";
                    addAnimation(slides.find(SLIDES_CONTAINER_SEL)).css(getTransforms(translate3d)), afterSlideLoadsId = setTimeout(function() {
                        fireCallback && afterSlideLoads(v)
                    }, options.scrollingSpeed, options.easing)
                } else slides.animate({
                    scrollLeft: Math.round(destinyPos.left)
                }, options.scrollingSpeed, options.easing, function() {
                    fireCallback && afterSlideLoads(v)
                })
            }

            function activeSlidesNavigation(slidesNav, slideIndex) {
                slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE), slidesNav.find("li").eq(slideIndex).find("a").addClass(ACTIVE)
            }

            function resizeHandler() {
                if (responsive(), isTouchDevice) {
                    var activeElement = $(document.activeElement);
                    if (!activeElement.is("textarea") && !activeElement.is("input") && !activeElement.is("select")) {
                        var currentHeight = $window.height();
                        Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100 && (reBuild(!0), previousHeight = currentHeight)
                    }
                } else clearTimeout(resizeId), resizeId = setTimeout(function() {
                    reBuild(!0)
                }, 350)
            }

            function responsive() {
                var widthLimit = options.responsive || options.responsiveWidth,
                    heightLimit = options.responsiveHeight,
                    isBreakingPointWidth = widthLimit && $window.outerWidth() < widthLimit,
                    isBreakingPointHeight = heightLimit && $window.height() < heightLimit;
                widthLimit && heightLimit ? setResponsive(isBreakingPointWidth || isBreakingPointHeight) : widthLimit ? setResponsive(isBreakingPointWidth) : heightLimit && setResponsive(isBreakingPointHeight)
            }

            function addAnimation(element) {
                var transition = "all " + options.scrollingSpeed + "ms " + options.easingcss3;
                return element.removeClass(NO_TRANSITION), element.css({
                    "-webkit-transition": transition,
                    transition: transition
                })
            }

            function removeAnimation(element) {
                return element.addClass(NO_TRANSITION)
            }

            function activateNavDots(name, sectionIndex) {
                options.navigation && ($(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE), name ? $(SECTION_NAV_SEL).find('a[href="#' + name + '"]').addClass(ACTIVE) : $(SECTION_NAV_SEL).find("li").eq(sectionIndex).find("a").addClass(ACTIVE))
            }

            function activateMenuElement(name) {
                options.menu && ($(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE), $(options.menu).find('[data-menuanchor="' + name + '"]').addClass(ACTIVE))
            }

            function activateMenuAndNav(anchor, index) {
                activateMenuElement(anchor), activateNavDots(anchor, index)
            }

            function getYmovement(destiny) {
                var fromIndex = $(SECTION_ACTIVE_SEL).index(SECTION_SEL),
                    toIndex = destiny.index(SECTION_SEL);
                return fromIndex == toIndex ? "none" : fromIndex > toIndex ? "up" : "down"
            }

            function getXmovement(fromIndex, toIndex) {
                return fromIndex == toIndex ? "none" : fromIndex > toIndex ? "left" : "right"
            }

            function createScrollBar(element) {
                if (!element.hasClass("fp-noscroll")) {
                    element.css("overflow", "hidden");
                    var contentHeight, scrollOverflowHandler = options.scrollOverflowHandler,
                        wrap = scrollOverflowHandler.wrapContent(),
                        section = element.closest(SECTION_SEL),
                        scrollable = scrollOverflowHandler.scrollable(element);
                    scrollable.length ? contentHeight = scrollOverflowHandler.scrollHeight(element) : (contentHeight = element.get(0).scrollHeight, options.verticalCentered && (contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight));
                    var scrollHeight = windowsHeight - parseInt(section.css("padding-bottom")) - parseInt(section.css("padding-top"));
                    contentHeight > scrollHeight ? scrollable.length ? scrollOverflowHandler.update(element, scrollHeight) : (options.verticalCentered ? element.find(TABLE_CELL_SEL).wrapInner(wrap) : element.wrapInner(wrap),
                        scrollOverflowHandler.create(element, scrollHeight)) : scrollOverflowHandler.remove(element), element.css("overflow", "")
                }
            }

            function addTableClass(element) {
                element.hasClass(TABLE) || element.addClass(TABLE).wrapInner('<div class="' + TABLE_CELL + '" style="height:' + getTableHeight(element) + 'px;" />')
            }

            function getTableHeight(element) {
                var sectionHeight = windowsHeight;
                if (options.paddingTop || options.paddingBottom) {
                    var section = element;
                    section.hasClass(SECTION) || (section = element.closest(SECTION_SEL));
                    var paddings = parseInt(section.css("padding-top")) + parseInt(section.css("padding-bottom"));
                    sectionHeight = windowsHeight - paddings
                }
                return sectionHeight
            }

            function transformContainer(translate3d, animated) {
                animated ? addAnimation(container) : removeAnimation(container), container.css(getTransforms(translate3d)), setTimeout(function() {
                    container.removeClass(NO_TRANSITION)
                }, 10)
            }

            function getSectionByAnchor(sectionAnchor) {
                var section = container.find(SECTION_SEL + '[data-anchor="' + sectionAnchor + '"]');
                return section.length || (section = $(SECTION_SEL).eq(sectionAnchor - 1)), section
            }

            function getSlideByAnchor(slideAnchor, section) {
                var slides = section.find(SLIDES_WRAPPER_SEL),
                    slide = slides.find(SLIDE_SEL + '[data-anchor="' + slideAnchor + '"]');
                return slide.length || (slide = slides.find(SLIDE_SEL).eq(slideAnchor)), slide
            }

            function scrollPageAndSlide(destiny, slide) {
                var section = getSectionByAnchor(destiny);
                section.length && (void 0 === slide && (slide = 0), destiny === lastScrolledDestiny || section.hasClass(ACTIVE) ? scrollSlider(section, slide) : scrollPage(section, function() {
                    scrollSlider(section, slide)
                }))
            }

            function scrollSlider(section, slideAnchor) {
                if (void 0 !== slideAnchor) {
                    var slides = section.find(SLIDES_WRAPPER_SEL),
                        destiny = getSlideByAnchor(slideAnchor, section);
                    destiny.length && landscapeScroll(slides, destiny)
                }
            }

            function addSlidesNavigation(section, numSlides) {
                section.append('<div class="' + SLIDES_NAV + '"><ul></ul></div>');
                var nav = section.find(SLIDES_NAV_SEL);
                nav.addClass(options.slidesNavPosition);
                for (var i = 0; i < numSlides; i++) nav.find("ul").append('<li><a href="#"><span></span></a></li>');
                nav.css("margin-left", "-" + nav.width() / 2 + "px"), nav.find("li").first().find("a").addClass(ACTIVE)
            }

            function setState(slideIndex, slideAnchor, anchorLink, sectionIndex) {
                var sectionHash = "";
                options.anchors.length && !options.lockAnchors && (slideIndex ? (void 0 !== anchorLink && (sectionHash = anchorLink), void 0 === slideAnchor && (slideAnchor = slideIndex), lastScrolledSlide = slideAnchor, setUrlHash(sectionHash + "/" + slideAnchor)) : void 0 !== slideIndex ? (lastScrolledSlide = slideAnchor, setUrlHash(anchorLink)) : setUrlHash(anchorLink)), setBodyClass()
            }

            function setUrlHash(url) {
                if (options.recordHistory) location.hash = url;
                else if (isTouchDevice || isTouch) window.history.replaceState(undefined, undefined, "#" + url);
                else {
                    var baseUrl = window.location.href.split("#")[0];
                    window.location.replace(baseUrl + "#" + url)
                }
            }

            function getAnchor(element) {
                var anchor = element.data("anchor"),
                    index = element.index();
                return void 0 === anchor && (anchor = index), anchor
            }

            function setBodyClass() {
                var section = $(SECTION_ACTIVE_SEL),
                    slide = section.find(SLIDE_ACTIVE_SEL),
                    sectionAnchor = getAnchor(section),
                    slideAnchor = getAnchor(slide),
                    text = String(sectionAnchor);
                slide.length && (text = text + "-" + slideAnchor), text = text.replace("/", "-").replace("#", "");
                var classRe = new RegExp("\\b\\s?" + VIEWING_PREFIX + "-[^\\s]+\\b", "g");
                $body[0].className = $body[0].className.replace(classRe, ""), $body.addClass(VIEWING_PREFIX + "-" + text)
            }

            function support3d() {
                var has3d, el = document.createElement("p"),
                    transforms = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                document.body.insertBefore(el, null);
                for (var t in transforms) el.style[t] !== undefined && (el.style[t] = "translate3d(1px,1px,1px)", has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]));
                return document.body.removeChild(el), has3d !== undefined && has3d.length > 0 && "none" !== has3d
            }

            function removeMouseWheelHandler() {
                document.addEventListener ? (document.removeEventListener("mousewheel", MouseWheelHandler, !1), document.removeEventListener("wheel", MouseWheelHandler, !1), document.removeEventListener("MozMousePixelScroll", MouseWheelHandler, !1)) : document.detachEvent("onmousewheel", MouseWheelHandler)
            }

            function addMouseWheelHandler() {
                var _addEventListener, prefix = "";
                window.addEventListener ? _addEventListener = "addEventListener" : (_addEventListener = "attachEvent", prefix = "on");
                var support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
                "DOMMouseScroll" == support ? document[_addEventListener](prefix + "MozMousePixelScroll", MouseWheelHandler, !1) : document[_addEventListener](prefix + support, MouseWheelHandler, !1)
            }

            function addMiddleWheelHandler() {
                container.on("mousedown", mouseDownHandler).on("mouseup", mouseUpHandler)
            }

            function removeMiddleWheelHandler() {
                container.off("mousedown", mouseDownHandler).off("mouseup", mouseUpHandler)
            }

            function addTouchHandler() {
                if (options.autoScrolling && (isTouchDevice || isTouch)) {
                    var MSPointer = getMSPointer();
                    $body.off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, preventBouncing), $(WRAPPER_SEL).off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, touchStartHandler).off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, touchMoveHandler)
                }
            }

            function removeTouchHandler() {
                if (isTouchDevice || isTouch) {
                    var MSPointer = getMSPointer();
                    $(WRAPPER_SEL).off("touchstart " + MSPointer.down).off("touchmove " + MSPointer.move)
                }
            }

            function getMSPointer() {
                return window.PointerEvent ? {
                    down: "pointerdown",
                    move: "pointermove"
                } : {
                    down: "MSPointerDown",
                    move: "MSPointerMove"
                }
            }

            function getEventsPage(e) {
                var events = [];
                return events.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, events.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, isTouch && isReallyTouch(e) && options.scrollBar && (events.y = e.touches[0].pageY, events.x = e.touches[0].pageX), events
            }

            function silentLandscapeScroll(activeSlide, noCallbacks) {
                setScrollingSpeed(0, "internal"), void 0 !== noCallbacks && (isResizing = !0), landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL), activeSlide), void 0 !== noCallbacks && (isResizing = !1), setScrollingSpeed(originals.scrollingSpeed, "internal")
            }

            function silentScroll(top) {
                var roundedTop = Math.round(top);
                if (options.scrollBar || !options.autoScrolling) container.scrollTop(roundedTop);
                else if (options.css3) {
                    var translate3d = "translate3d(0px, -" + roundedTop + "px, 0px)";
                    transformContainer(translate3d, !1)
                } else container.css("top", -roundedTop)
            }

            function getTransforms(translate3d) {
                return {
                    "-webkit-transform": translate3d,
                    "-moz-transform": translate3d,
                    "-ms-transform": translate3d,
                    transform: translate3d
                }
            }

            function setIsScrollAllowed(value, direction, type) {
                switch (direction) {
                    case "up":
                        isScrollAllowed[type].up = value;
                        break;
                    case "down":
                        isScrollAllowed[type].down = value;
                        break;
                    case "left":
                        isScrollAllowed[type].left = value;
                        break;
                    case "right":
                        isScrollAllowed[type].right = value;
                        break;
                    case "all":
                        "m" == type ? setAllowScrolling(value) : setKeyboardScrolling(value)
                }
            }

            function destroy(all) {
                setAutoScrolling(!1, "internal"), setAllowScrolling(!1), setKeyboardScrolling(!1), container.addClass(DESTROYED), clearTimeout(afterSlideLoadsId), clearTimeout(afterSectionLoadsId), clearTimeout(resizeId), clearTimeout(scrollId), clearTimeout(scrollId2), $window.off("scroll", scrollHandler).off("hashchange", hashChangeHandler).off("resize", resizeHandler), $document.off("click touchstart", SECTION_NAV_SEL + " a").off("mouseenter", SECTION_NAV_SEL + " li").off("mouseleave", SECTION_NAV_SEL + " li").off("click touchstart", SLIDES_NAV_LINK_SEL).off("mouseover", options.normalScrollElements).off("mouseout", options.normalScrollElements), $(SECTION_SEL).off("click touchstart", SLIDES_ARROW_SEL), clearTimeout(afterSlideLoadsId), clearTimeout(afterSectionLoadsId), all && destroyStructure()
            }

            function destroyStructure() {
                silentScroll(0), container.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                    $(this).attr("src", $(this).data("src")), $(this).removeAttr("data-src")
                }), $(SECTION_NAV_SEL + ", " + SLIDES_NAV_SEL + ", " + SLIDES_ARROW_SEL).remove(), $(SECTION_SEL).css({
                    height: "",
                    "background-color": "",
                    padding: ""
                }), $(SLIDE_SEL).css({
                    width: ""
                }), container.css({
                    height: "",
                    position: "",
                    "-ms-touch-action": "",
                    "touch-action": ""
                }), $htmlBody.css({
                    overflow: "",
                    height: ""
                }), $("html").removeClass(ENABLED), $body.removeClass(RESPONSIVE), $.each($body.get(0).className.split(/\s+/), function(index, className) {
                    0 === className.indexOf(VIEWING_PREFIX) && $body.removeClass(className)
                }), $(SECTION_SEL + ", " + SLIDE_SEL).each(function() {
                    options.scrollOverflowHandler.remove($(this)), $(this).removeClass(TABLE + " " + ACTIVE)
                }), removeAnimation(container), container.find(TABLE_CELL_SEL + ", " + SLIDES_CONTAINER_SEL + ", " + SLIDES_WRAPPER_SEL).each(function() {
                    $(this).replaceWith(this.childNodes)
                }), $htmlBody.scrollTop(0);
                var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
                $.each(usedSelectors, function(index, value) {
                    $("." + value).removeClass(value)
                })
            }

            function setVariableState(variable, value, type) {
                options[variable] = value, "internal" !== type && (originals[variable] = value)
            }

            function displayWarnings() {
                var extensions = ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove"];
                if ($("html").hasClass(ENABLED)) return void showError("error", "Fullpage.js can only be initialized once and you are doing it multiple times!");
                options.continuousVertical && (options.loopTop || options.loopBottom) && (options.continuousVertical = !1, showError("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), options.scrollBar && options.scrollOverflow && showError("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !options.continuousVertical || !options.scrollBar && options.autoScrolling || (options.continuousVertical = !1, showError("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), $.each(extensions, function(index, extension) {
                    options[extension] && showError("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + extension)
                }), $.each(options.anchors, function(index, name) {
                    var nameAttr = $document.find("[name]").filter(function() {
                            return $(this).attr("name") && $(this).attr("name").toLowerCase() == name.toLowerCase()
                        }),
                        idAttr = $document.find("[id]").filter(function() {
                            return $(this).attr("id") && $(this).attr("id").toLowerCase() == name.toLowerCase()
                        });
                    (idAttr.length || nameAttr.length) && (showError("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), idAttr.length && showError("error", '"' + name + '" is is being used by another element `id` property'), nameAttr.length && showError("error", '"' + name + '" is is being used by another element `name` property'))
                })
            }

            function showError(type, text) {
                console && console[type] && console[type]("fullPage: " + text)
            }
            if ($("html").hasClass(ENABLED)) return void displayWarnings();
            var $htmlBody = $("html, body"),
                $body = $("body"),
                FP = $.fn.fullpage;
            options = $.extend({
                menu: !1,
                anchors: [],
                lockAnchors: !1,
                navigation: !1,
                navigationPosition: "right",
                navigationTooltips: [],
                showActiveTooltip: !1,
                slidesNavigation: !1,
                slidesNavPosition: "bottom",
                scrollBar: !1,
                hybrid: !1,
                css3: !0,
                scrollingSpeed: 700,
                autoScrolling: !0,
                fitToSection: !0,
                fitToSectionDelay: 1e3,
                easing: "easeInOutCubic",
                easingcss3: "ease",
                loopBottom: !1,
                loopTop: !1,
                loopHorizontal: !0,
                continuousVertical: !1,
                continuousHorizontal: !1,
                scrollHorizontally: !1,
                interlockedSlides: !1,
                dragAndMove: !1,
                offsetSections: !1,
                resetSliders: !1,
                fadingEffect: !1,
                normalScrollElements: null,
                scrollOverflow: !1,
                scrollOverflowHandler: iscrollHandler,
                scrollOverflowOptions: null,
                touchSensitivity: 5,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: null,
                keyboardScrolling: !0,
                animateAnchor: !0,
                recordHistory: !0,
                controlArrows: !0,
                controlArrowColor: "#fff",
                verticalCentered: !0,
                sectionsColor: [],
                paddingTop: 0,
                paddingBottom: 0,
                fixedElements: null,
                responsive: 0,
                responsiveWidth: 0,
                responsiveHeight: 0,
                responsiveSlides: !1,
                sectionSelector: ".section",
                slideSelector: ".slide",
                afterLoad: null,
                onLeave: null,
                afterRender: null,
                afterResize: null,
                afterReBuild: null,
                afterSlideLoad: null,
                onSlideLeave: null,
                afterResponsive: null,
                lazyLoading: !0
            }, options);
            var lastScrolledDestiny, lastScrolledSlide, controlPressed, slideMoving = !1,
                isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
                isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
                container = $(this),
                windowsHeight = $window.height(),
                isResizing = !1,
                isWindowFocused = !0,
                canScroll = !0,
                scrollings = [],
                isScrollAllowed = {};
            isScrollAllowed.m = {
                up: !0,
                down: !0,
                left: !0,
                right: !0
            }, isScrollAllowed.k = $.extend(!0, {}, isScrollAllowed.m);
            var resizeId, afterSectionLoadsId, afterSlideLoadsId, scrollId, scrollId2, keydownId, originals = $.extend(!0, {}, options);
            displayWarnings(), iscrollOptions.click = isTouch, iscrollOptions = $.extend(iscrollOptions, options.scrollOverflowOptions), $.extend($.easing, {
                easeInOutCubic: function(x, t, b, c, d) {
                    return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b
                }
            }), $(this).length && (FP.setAutoScrolling = setAutoScrolling, FP.setRecordHistory = setRecordHistory, FP.setScrollingSpeed = setScrollingSpeed, FP.setFitToSection = setFitToSection, FP.setLockAnchors = setLockAnchors, FP.setMouseWheelScrolling = setMouseWheelScrolling, FP.setAllowScrolling = setAllowScrolling, FP.setKeyboardScrolling = setKeyboardScrolling, FP.moveSectionUp = moveSectionUp, FP.moveSectionDown = moveSectionDown, FP.silentMoveTo = silentMoveTo, FP.moveTo = moveTo, FP.moveSlideRight = moveSlideRight, FP.moveSlideLeft = moveSlideLeft, FP.reBuild = reBuild, FP.setResponsive = setResponsive, FP.destroy = destroy, function() {
                options.css3 && (options.css3 = support3d()), options.scrollBar = options.scrollBar || options.hybrid, setOptionsFromDOM(), prepareDom(), setAllowScrolling(!0), setAutoScrolling(options.autoScrolling, "internal");
                var activeSlide = $(SECTION_ACTIVE_SEL).find(SLIDE_ACTIVE_SEL);
                activeSlide.length && (0 !== $(SECTION_ACTIVE_SEL).index(SECTION_SEL) || 0 === $(SECTION_ACTIVE_SEL).index(SECTION_SEL) && 0 !== activeSlide.index()) && silentLandscapeScroll(activeSlide), responsive(), setBodyClass(), "complete" === document.readyState && scrollToAnchor(), $window.on("load", scrollToAnchor)
            }(), function() {
                $window.on("scroll", scrollHandler).on("hashchange", hashChangeHandler).blur(blurHandler).resize(resizeHandler), $document.keydown(keydownHandler).keyup(keyUpHandler).on("click touchstart", SECTION_NAV_SEL + " a", sectionBulletHandler).on("click touchstart", SLIDES_NAV_LINK_SEL, slideBulletHandler).on("click", SECTION_NAV_TOOLTIP_SEL, tooltipTextHandler), $(SECTION_SEL).on("click touchstart", SLIDES_ARROW_SEL, slideArrowHandler), options.normalScrollElements && ($document.on("mouseenter", options.normalScrollElements, function() {
                    setMouseWheelScrolling(!1)
                }), $document.on("mouseleave", options.normalScrollElements, function() {
                    setMouseWheelScrolling(!0)
                }))
            }());
            var isScrolling = !1,
                lastScroll = 0,
                touchStartY = 0,
                touchStartX = 0,
                touchEndY = 0,
                touchEndX = 0,
                prevTime = (new Date).getTime(),
                previousDestTop = 0,
                oldPageY = 0,
                previousHeight = windowsHeight
        }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
            this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
        }, IScroll.prototype.wheelOff = function() {
            this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
        });
        var iscrollHandler = {
            refreshId: null,
            iScrollInstances: [],
            toggleWheel: function(value) {
                $(SECTION_ACTIVE_SEL).find(".fp-scrollable").each(function() {
                    var iScrollInstance = $(this).data("iscrollInstance");
                    void 0 !== iScrollInstance && iScrollInstance && (value ? iScrollInstance.wheelOn() : iScrollInstance.wheelOff())
                })
            },
            onLeave: function() {
                iscrollHandler.toggleWheel(!1)
            },
            beforeLeave: function() {
                iscrollHandler.onLeave()
            },
            afterLoad: function() {
                iscrollHandler.toggleWheel(!0)
            },
            create: function(element, scrollHeight) {
                var scrollable = element.find(".fp-scrollable");
                scrollable.height(scrollHeight), scrollable.each(function() {
                    var $this = $(this),
                        iScrollInstance = $this.data("iscrollInstance");
                    iScrollInstance && $.each(iscrollHandler.iScrollInstances, function() {
                        $(this).destroy()
                    }), iScrollInstance = new IScroll($this.get(0), iscrollOptions), iscrollHandler.iScrollInstances.push(iScrollInstance), iScrollInstance.wheelOff(), $this.data("iscrollInstance", iScrollInstance)
                })
            },
            isScrolled: function(type, scrollable) {
                var scroller = scrollable.data("iscrollInstance");
                return !scroller || ("top" === type ? scroller.y >= 0 && !scrollable.scrollTop() : "bottom" === type ? 0 - scroller.y + scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight : void 0)
            },
            scrollable: function(activeSection) {
                return activeSection.find(SLIDES_WRAPPER_SEL).length ? activeSection.find(SLIDE_ACTIVE_SEL).find(".fp-scrollable") : activeSection.find(".fp-scrollable")
            },
            scrollHeight: function(element) {
                return element.find(".fp-scrollable").children().first().get(0).scrollHeight
            },
            remove: function(element) {
                var scrollable = element.find(".fp-scrollable");
                if (scrollable.length) {
                    scrollable.data("iscrollInstance").destroy(), scrollable.data("iscrollInstance", null)
                }
                element.find(".fp-scrollable").children().first().children().first().unwrap().unwrap()
            },
            update: function(element, scrollHeight) {
                clearTimeout(iscrollHandler.refreshId), iscrollHandler.refreshId = setTimeout(function() {
                    $.each(iscrollHandler.iScrollInstances, function() {
                        $(this).get(0).refresh()
                    })
                }, 150), element.find(".fp-scrollable").css("height", scrollHeight + "px").parent().css("height", scrollHeight + "px")
            },
            wrapContent: function() {
                return '<div class="fp-scrollable"><div class="fp-scroller"></div></div>'
            }
        }
    }), jQuery.effects || function(e, t) {
        var i = !1 !== e.uiBackCompat,
            a = "ui-effects-";
        e.effects = {
                effect: {}
            },
            function(t, i) {
                function a(e, t, i) {
                    var a = c[t.type] || {};
                    return null == e ? i || !t.def ? null : t.def : (e = a.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : a.mod ? (e + a.mod) % a.mod : 0 > e ? 0 : e > a.max ? a.max : e)
                }

                function s(e) {
                    var a = u(),
                        s = a._rgba = [];
                    return e = e.toLowerCase(), m(l, function(t, n) {
                        var r, o = n.re.exec(e),
                            h = o && n.parse(o),
                            l = n.space || "rgba";
                        return h ? (r = a[l](h), a[d[l].cache] = r[d[l].cache], s = a._rgba = r._rgba, !1) : i
                    }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, r.transparent), a) : r[e]
                }

                function n(e, t, i) {
                    return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
                }
                var r, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
                    h = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        parse: function(e) {
                            return [e[1], e[2], e[3], e[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        parse: function(e) {
                            return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(e) {
                            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(e) {
                            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(e) {
                            return [e[1], e[2] / 100, e[3] / 100, e[4]]
                        }
                    }],
                    u = t.Color = function(e, i, a, s) {
                        return new t.Color.fn.parse(e, i, a, s)
                    },
                    d = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    c = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    p = u.support = {},
                    f = t("<p>")[0],
                    m = t.each;
                f.style.cssText = "background-color:rgba(1,1,1,.5)", p.rgba = f.style.backgroundColor.indexOf("rgba") > -1, m(d, function(e, t) {
                    t.cache = "_" + e, t.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), u.fn = t.extend(u.prototype, {
                    parse: function(n, o, h, l) {
                        if (n === i) return this._rgba = [null, null, null, null], this;
                        (n.jquery || n.nodeType) && (n = t(n).css(o), o = i);
                        var c = this,
                            p = t.type(n),
                            f = this._rgba = [];
                        return o !== i && (n = [n, o, h, l], p = "array"), "string" === p ? this.parse(s(n) || r._default) : "array" === p ? (m(d.rgba.props, function(e, t) {
                            f[t.idx] = a(n[t.idx], t)
                        }), this) : "object" === p ? (n instanceof u ? m(d, function(e, t) {
                            n[t.cache] && (c[t.cache] = n[t.cache].slice())
                        }) : m(d, function(t, i) {
                            var s = i.cache;
                            m(i.props, function(e, t) {
                                if (!c[s] && i.to) {
                                    if ("alpha" === e || null == n[e]) return;
                                    c[s] = i.to(c._rgba)
                                }
                                c[s][t.idx] = a(n[e], t, !0)
                            }), c[s] && 0 > e.inArray(null, c[s].slice(0, 3)) && (c[s][3] = 1, i.from && (c._rgba = i.from(c[s])))
                        }), this) : i
                    },
                    is: function(e) {
                        var t = u(e),
                            a = !0,
                            s = this;
                        return m(d, function(e, n) {
                            var r, o = t[n.cache];
                            return o && (r = s[n.cache] || n.to && n.to(s._rgba) || [], m(n.props, function(e, t) {
                                return null != o[t.idx] ? a = o[t.idx] === r[t.idx] : i
                            })), a
                        }), a
                    },
                    _space: function() {
                        var e = [],
                            t = this;
                        return m(d, function(i, a) {
                            t[a.cache] && e.push(i)
                        }), e.pop()
                    },
                    transition: function(e, t) {
                        var i = u(e),
                            s = i._space(),
                            n = d[s],
                            r = 0 === this.alpha() ? u("transparent") : this,
                            o = r[n.cache] || n.to(r._rgba),
                            h = o.slice();
                        return i = i[n.cache], m(n.props, function(e, s) {
                            var n = s.idx,
                                r = o[n],
                                l = i[n],
                                u = c[s.type] || {};
                            null !== l && (null === r ? h[n] = l : (u.mod && (l - r > u.mod / 2 ? r += u.mod : r - l > u.mod / 2 && (r -= u.mod)), h[n] = a((l - r) * t + r, s)))
                        }), this[s](h)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            a = i.pop(),
                            s = u(e)._rgba;
                        return u(t.map(i, function(e, t) {
                            return (1 - a) * s[t] + a * e
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(e, t) {
                                return null == e ? t > 2 ? 1 : 0 : e
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(e, t) {
                                return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            a = i.pop();
                        return e && i.push(~~(255 * a)), "#" + t.map(i, function(e) {
                            return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), u.fn.parse.prototype = u.fn, d.hsla.to = function(e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t, i, a = e[0] / 255,
                        s = e[1] / 255,
                        n = e[2] / 255,
                        r = e[3],
                        o = Math.max(a, s, n),
                        h = Math.min(a, s, n),
                        l = o - h,
                        u = o + h,
                        d = .5 * u;
                    return t = h === o ? 0 : a === o ? 60 * (s - n) / l + 360 : s === o ? 60 * (n - a) / l + 120 : 60 * (a - s) / l + 240, i = 0 === d || 1 === d ? d : .5 >= d ? l / u : l / (2 - u), [Math.round(t) % 360, i, d, null == r ? 1 : r]
                }, d.hsla.from = function(e) {
                    if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                    var t = e[0] / 360,
                        i = e[1],
                        a = e[2],
                        s = e[3],
                        r = .5 >= a ? a * (1 + i) : a + i - a * i,
                        o = 2 * a - r;
                    return [Math.round(255 * n(o, r, t + 1 / 3)), Math.round(255 * n(o, r, t)), Math.round(255 * n(o, r, t - 1 / 3)), s]
                }, m(d, function(e, s) {
                    var n = s.props,
                        r = s.cache,
                        o = s.to,
                        l = s.from;
                    u.fn[e] = function(e) {
                        if (o && !this[r] && (this[r] = o(this._rgba)), e === i) return this[r].slice();
                        var s, h = t.type(e),
                            d = "array" === h || "object" === h ? e : arguments,
                            c = this[r].slice();
                        return m(n, function(e, t) {
                            var i = d["object" === h ? e : t.idx];
                            null == i && (i = c[t.idx]), c[t.idx] = a(i, t)
                        }), l ? (s = u(l(c)), s[r] = c, s) : u(c)
                    }, m(n, function(i, a) {
                        u.fn[i] || (u.fn[i] = function(s) {
                            var n, r = t.type(s),
                                o = "alpha" === i ? this._hsla ? "hsla" : "rgba" : e,
                                l = this[o](),
                                u = l[a.idx];
                            return "undefined" === r ? u : ("function" === r && (s = s.call(this, u), r = t.type(s)), null == s && a.empty ? this : ("string" === r && (n = h.exec(s)) && (s = u + parseFloat(n[2]) * ("+" === n[1] ? 1 : -1)), l[a.idx] = s, this[o](l)))
                        })
                    })
                }), m(o, function(e, i) {
                    t.cssHooks[i] = {
                        set: function(e, a) {
                            var n, r, o = "";
                            if ("string" !== t.type(a) || (n = s(a))) {
                                if (a = u(n || a), !p.rgba && 1 !== a._rgba[3]) {
                                    for (r = "backgroundColor" === i ? e.parentNode : e;
                                        ("" === o || "transparent" === o) && r && r.style;) try {
                                        o = t.css(r, "backgroundColor"), r = r.parentNode
                                    } catch (h) {}
                                    a = a.blend(o && "transparent" !== o ? o : "_default")
                                }
                                a = a.toRgbaString()
                            }
                            try {
                                e.style[i] = a
                            } catch (l) {}
                        }
                    }, t.fx.step[i] = function(e) {
                        e.colorInit || (e.start = u(e.elem, i), e.end = u(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                    }
                }), t.cssHooks.borderColor = {
                    expand: function(e) {
                        var t = {};
                        return m(["Top", "Right", "Bottom", "Left"], function(i, a) {
                            t["border" + a + "Color"] = e
                        }), t
                    }
                }, r = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function i() {
                    var t, i, a = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
                        s = {};
                    if (a && a.length && a[0] && a[a[0]])
                        for (i = a.length; i--;) t = a[i], "string" == typeof a[t] && (s[e.camelCase(t)] = a[t]);
                    else
                        for (t in a) "string" == typeof a[t] && (s[t] = a[t]);
                    return s
                }

                function a(t, i) {
                    var a, s, r = {};
                    for (a in i) s = i[a], t[a] !== s && (n[a] || (e.fx.step[a] || !isNaN(parseFloat(s))) && (r[a] = s));
                    return r
                }
                var s = ["add", "remove", "toggle"],
                    n = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                    e.fx.step[i] = function(e) {
                        ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, i, e.end), e.setAttr = !0)
                    }
                }), e.effects.animateClass = function(t, n, r, o) {
                    var h = e.speed(n, r, o);
                    return this.queue(function() {
                        var n, r = e(this),
                            o = r.attr("class") || "",
                            l = h.children ? r.find("*").andSelf() : r;
                        l = l.map(function() {
                            return {
                                el: e(this),
                                start: i.call(this)
                            }
                        }), n = function() {
                            e.each(s, function(e, i) {
                                t[i] && r[i + "Class"](t[i])
                            })
                        }, n(), l = l.map(function() {
                            return this.end = i.call(this.el[0]), this.diff = a(this.start, this.end), this
                        }), r.attr("class", o), l = l.map(function() {
                            var t = this,
                                i = e.Deferred(),
                                a = jQuery.extend({}, h, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(t)
                                    }
                                });
                            return this.el.animate(this.diff, a), i.promise()
                        }), e.when.apply(e, l.get()).done(function() {
                            n(), e.each(arguments, function() {
                                var t = this.el;
                                e.each(this.diff, function(e) {
                                    t.css(e, "")
                                })
                            }), h.complete.call(r[0])
                        })
                    })
                }, e.fn.extend({
                    _addClass: e.fn.addClass,
                    addClass: function(t, i, a, s) {
                        return i ? e.effects.animateClass.call(this, {
                            add: t
                        }, i, a, s) : this._addClass(t)
                    },
                    _removeClass: e.fn.removeClass,
                    removeClass: function(t, i, a, s) {
                        return i ? e.effects.animateClass.call(this, {
                            remove: t
                        }, i, a, s) : this._removeClass(t)
                    },
                    _toggleClass: e.fn.toggleClass,
                    toggleClass: function(i, a, s, n, r) {
                        return "boolean" == typeof a || a === t ? s ? e.effects.animateClass.call(this, a ? {
                            add: i
                        } : {
                            remove: i
                        }, s, n, r) : this._toggleClass(i, a) : e.effects.animateClass.call(this, {
                            toggle: i
                        }, a, s, n)
                    },
                    switchClass: function(t, i, a, s, n) {
                        return e.effects.animateClass.call(this, {
                            add: i,
                            remove: t
                        }, a, s, n)
                    }
                })
            }(),
            function() {
                function s(t, i, a, s) {
                    return e.isPlainObject(t) && (i = t, t = t.effect), t = {
                        effect: t
                    }, null == i && (i = {}), e.isFunction(i) && (s = i, a = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (s = a, a = i, i = {}), e.isFunction(a) && (s = a, a = null), i && e.extend(t, i), a = a || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof a ? a : a in e.fx.speeds ? e.fx.speeds[a] : e.fx.speeds._default, t.complete = s || i.complete, t
                }

                function n(t) {
                    return !(t && "number" != typeof t && !e.fx.speeds[t]) || "string" == typeof t && !e.effects.effect[t] && (!i || !e.effects[t])
                }
                e.extend(e.effects, {
                    version: "1.9.2",
                    save: function(e, t) {
                        for (var i = 0; t.length > i; i++) null !== t[i] && e.data(a + t[i], e[0].style[t[i]])
                    },
                    restore: function(e, i) {
                        var s, n;
                        for (n = 0; i.length > n; n++) null !== i[n] && (s = e.data(a + i[n]), s === t && (s = ""), e.css(i[n], s))
                    },
                    setMode: function(e, t) {
                        return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                    },
                    getBaseline: function(e, t) {
                        var i, a;
                        switch (e[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = e[0] / t.height
                        }
                        switch (e[1]) {
                            case "left":
                                a = 0;
                                break;
                            case "center":
                                a = .5;
                                break;
                            case "right":
                                a = 1;
                                break;
                            default:
                                a = e[1] / t.width
                        }
                        return {
                            x: a,
                            y: i
                        }
                    },
                    createWrapper: function(t) {
                        if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                        var i = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                float: t.css("float")
                            },
                            a = e("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            s = {
                                width: t.width(),
                                height: t.height()
                            },
                            n = document.activeElement;
                        try {
                            n.id
                        } catch (r) {
                            n = document.body
                        }
                        return t.wrap(a), (t[0] === n || e.contains(t[0], n)) && e(n).focus(), a = t.parent(), "static" === t.css("position") ? (a.css({
                            position: "relative"
                        }), t.css({
                            position: "relative"
                        })) : (e.extend(i, {
                            position: t.css("position"),
                            zIndex: t.css("z-index")
                        }), e.each(["top", "left", "bottom", "right"], function(e, a) {
                            i[a] = t.css(a), isNaN(parseInt(i[a], 10)) && (i[a] = "auto")
                        }), t.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), t.css(s), a.css(i).show()
                    },
                    removeWrapper: function(t) {
                        var i = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
                    },
                    setTransition: function(t, i, a, s) {
                        return s = s || {}, e.each(i, function(e, i) {
                            var n = t.cssUnit(i);
                            n[0] > 0 && (s[i] = n[0] * a + n[1])
                        }), s
                    }
                }), e.fn.extend({
                    effect: function() {
                        function t(t) {
                            function i() {
                                e.isFunction(n) && n.call(s[0]), e.isFunction(t) && t()
                            }
                            var s = e(this),
                                n = a.complete,
                                r = a.mode;
                            (s.is(":hidden") ? "hide" === r : "show" === r) ? i(): o.call(s[0], a, i)
                        }
                        var a = s.apply(this, arguments),
                            n = a.mode,
                            r = a.queue,
                            o = e.effects.effect[a.effect],
                            h = !o && i && e.effects[a.effect];
                        return e.fx.off || !o && !h ? n ? this[n](a.duration, a.complete) : this.each(function() {
                            a.complete && a.complete.call(this)
                        }) : o ? !1 === r ? this.each(t) : this.queue(r || "fx", t) : h.call(this, {
                            options: a,
                            duration: a.duration,
                            callback: a.complete,
                            mode: a.mode
                        })
                    },
                    _show: e.fn.show,
                    show: function(e) {
                        if (n(e)) return this._show.apply(this, arguments);
                        var t = s.apply(this, arguments);
                        return t.mode = "show", this.effect.call(this, t)
                    },
                    _hide: e.fn.hide,
                    hide: function(e) {
                        if (n(e)) return this._hide.apply(this, arguments);
                        var t = s.apply(this, arguments);
                        return t.mode = "hide", this.effect.call(this, t)
                    },
                    __toggle: e.fn.toggle,
                    toggle: function(t) {
                        if (n(t) || "boolean" == typeof t || e.isFunction(t)) return this.__toggle.apply(this, arguments);
                        var i = s.apply(this, arguments);
                        return i.mode = "toggle", this.effect.call(this, i)
                    },
                    cssUnit: function(t) {
                        var i = this.css(t),
                            a = [];
                        return e.each(["em", "px", "%", "pt"], function(e, t) {
                            i.indexOf(t) > 0 && (a = [parseFloat(i), t])
                        }), a
                    }
                })
            }(),
            function() {
                var t = {};
                e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
                    t[i] = function(t) {
                        return Math.pow(t, e + 2)
                    }
                }), e.extend(t, {
                    Sine: function(e) {
                        return 1 - Math.cos(e * Math.PI / 2)
                    },
                    Circ: function(e) {
                        return 1 - Math.sqrt(1 - e * e)
                    },
                    Elastic: function(e) {
                        return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(e) {
                        return e * e * (3 * e - 2)
                    },
                    Bounce: function(e) {
                        for (var t, i = 4;
                            ((t = Math.pow(2, --i)) - 1) / 11 > e;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                    }
                }), e.each(t, function(t, i) {
                    e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) {
                        return 1 - i(1 - e)
                    }, e.easing["easeInOut" + t] = function(e) {
                        return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
                    }
                })
            }()
    }(jQuery),
    function(g, q, f) {
        function p(a, b) {
            this.wrapper = "string" == typeof a ? q.querySelector(a) : a, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                disablePointer: !d.hasPointer,
                disableTouch: d.hasPointer || !d.hasTouch,
                disableMouse: d.hasPointer || d.hasTouch,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                bindToWrapper: void 0 === g.onmousedown
            };
            for (var c in b) this.options[c] = b[c];
            this.translateZ = this.options.HWCompositing && d.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = d.hasTransition && this.options.useTransition, this.options.useTransform = d.hasTransform && this.options.useTransform, this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
                this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? d.ease[this.options.bounceEasing] || d.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, !0 === this.options.tap && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.directionY = this.directionX = this.y = this.x = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }

        function u(a, b, c) {
            var e = q.createElement("div"),
                d = q.createElement("div");
            return !0 === c && (e.style.cssText = "position:absolute;z-index:9999", d.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), d.className = "iScrollIndicator", "h" == a ? (!0 === c && (e.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", d.style.height = "100%"), e.className = "iScrollHorizontalScrollbar") : (!0 === c && (e.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", d.style.width = "100%"), e.className = "iScrollVerticalScrollbar"), e.style.cssText += ";overflow:hidden", b || (e.style.pointerEvents = "none"), e.appendChild(d), e
        }

        function v(a, b) {
            this.wrapper = "string" == typeof b.el ? q.querySelector(b.el) : b.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = a, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var c in b) this.options[c] = b[c];
            if (this.sizeRatioY = this.sizeRatioX = 1, this.maxPosY = this.maxPosX = 0, this.options.interactive && (this.options.disableTouch || (d.addEvent(this.indicator, "touchstart", this), d.addEvent(g, "touchend", this)), this.options.disablePointer || (d.addEvent(this.indicator, d.prefixPointerEvent("pointerdown"), this), d.addEvent(g, d.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (d.addEvent(this.indicator, "mousedown", this), d.addEvent(g, "mouseup", this))), this.options.fade) {
                this.wrapperStyle[d.style.transform] = this.scroller.translateZ;
                var e = d.style.transitionDuration;
                if (e) {
                    this.wrapperStyle[e] = d.isBadAndroid ? "0.0001ms" : "0ms";
                    var f = this;
                    d.isBadAndroid && t(function() {
                        "0.0001ms" === f.wrapperStyle[e] && (f.wrapperStyle[e] = "0s")
                    }), this.wrapperStyle.opacity = "0"
                }
            }
        }
        var t = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame || function(a) {
                g.setTimeout(a, 1e3 / 60)
            },
            d = function() {
                function a(a) {
                    return !1 !== e && ("" === e ? a : e + a.charAt(0).toUpperCase() + a.substr(1))
                }
                var b = {},
                    c = q.createElement("div").style,
                    e = function() {
                        for (var a = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, d = a.length; e < d; e++)
                            if (a[e] + "ransform" in c) return a[e].substr(0, a[e].length - 1);
                        return !1
                    }();
                b.getTime = Date.now || function() {
                    return (new Date).getTime()
                }, b.extend = function(a, b) {
                    for (var c in b) a[c] = b[c]
                }, b.addEvent = function(a, b, c, e) {
                    a.addEventListener(b, c, !!e)
                }, b.removeEvent = function(a, b, c, e) {
                    a.removeEventListener(b, c, !!e)
                }, b.prefixPointerEvent = function(a) {
                    return g.MSPointerEvent ? "MSPointer" + a.charAt(7).toUpperCase() + a.substr(8) : a
                }, b.momentum = function(a, b, c, e, d, k) {
                    b = a - b, c = f.abs(b) / c;
                    var g;
                    return k = void 0 === k ? 6e-4 : k, g = a + c * c / (2 * k) * (0 > b ? -1 : 1), k = c / k, g < e ? (g = d ? e - d / 2.5 * (c / 8) : e, b = f.abs(g - a), k = b / c) : 0 < g && (g = d ? d / 2.5 * (c / 8) : 0, b = f.abs(a) + g, k = b / c), {
                        destination: f.round(g),
                        duration: k
                    }
                };
                var d = a("transform");
                return b.extend(b, {
                    hasTransform: !1 !== d,
                    hasPerspective: a("perspective") in c,
                    hasTouch: "ontouchstart" in g,
                    hasPointer: !(!g.PointerEvent && !g.MSPointerEvent),
                    hasTransition: a("transition") in c
                }), b.isBadAndroid = function() {
                    var a = g.navigator.appVersion;
                    return !(!/Android/.test(a) || /Chrome\/\d/.test(a)) && (!((a = a.match(/Safari\/(\d+.\d)/)) && "object" == typeof a && 2 <= a.length) || 535.19 > parseFloat(a[1]))
                }(), b.extend(b.style = {}, {
                    transform: d,
                    transitionTimingFunction: a("transitionTimingFunction"),
                    transitionDuration: a("transitionDuration"),
                    transitionDelay: a("transitionDelay"),
                    transformOrigin: a("transformOrigin")
                }), b.hasClass = function(a, b) {
                    return new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
                }, b.addClass = function(a, c) {
                    if (!b.hasClass(a, c)) {
                        var e = a.className.split(" ");
                        e.push(c), a.className = e.join(" ")
                    }
                }, b.removeClass = function(a, c) {
                    b.hasClass(a, c) && (a.className = a.className.replace(new RegExp("(^|\\s)" + c + "(\\s|$)", "g"), " "))
                }, b.offset = function(a) {
                    for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
                    return {
                        left: b,
                        top: c
                    }
                }, b.preventDefaultException = function(a, b) {
                    for (var c in b)
                        if (b[c].test(a[c])) return !0;
                    return !1
                }, b.extend(b.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), b.extend(b.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(a) {
                            return a * (2 - a)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(a) {
                            return f.sqrt(1 - --a * a)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(a) {
                            return --a * a * (5 * a + 4) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(a) {
                            return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(a) {
                            return 0 === a ? 0 : 1 == a ? 1 : .4 * f.pow(2, -10 * a) * f.sin(2 * (a - .055) * f.PI / .22) + 1
                        }
                    }
                }), b.tap = function(a, b) {
                    var c = q.createEvent("Event");
                    c.initEvent(b, !0, !0), c.pageX = a.pageX, c.pageY = a.pageY, a.target.dispatchEvent(c)
                }, b.click = function(a) {
                    var c, b = a.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(b.tagName) || (c = q.createEvent(g.MouseEvent ? "MouseEvents" : "Event"), c.initEvent("click", !0, !0), c.view = a.view || g, c.detail = 1, c.screenX = b.screenX || 0, c.screenY = b.screenY || 0, c.clientX = b.clientX || 0, c.clientY = b.clientY || 0, c.ctrlKey = !!a.ctrlKey, c.altKey = !!a.altKey, c.shiftKey = !!a.shiftKey, c.metaKey = !!a.metaKey, c.button = 0, c.relatedTarget = null, c._constructed = !0, b.dispatchEvent(c))
                }, b
            }();
        p.prototype = {
            version: "5.2.0",
            _init: function() {
                this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
            },
            _transitionEnd: function(a) {
                a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(a) {
                if (!(1 != d.eventType[a.type] && 0 !== (a.which ? a.button : 2 > a.button ? 0 : 4 == a.button ? 1 : 2) || !this.enabled || this.initiated && d.eventType[a.type] !== this.initiated)) {
                    !this.options.preventDefault || d.isBadAndroid || d.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
                    var b = a.touches ? a.touches[0] : a;
                    this.initiated = d.eventType[a.type], this.moved = !1, this.directionLocked = this.directionY = this.directionX = this.distY = this.distX = 0, this.startTime = d.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, a = this.getComputedPosition(), this._translate(f.round(a.x), f.round(a.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = b.pageX, this.pointY = b.pageY, this._execEvent("beforeScrollStart")
                }
            },
            _move: function(a) {
                if (this.enabled && d.eventType[a.type] === this.initiated) {
                    this.options.preventDefault && a.preventDefault();
                    var h, b = a.touches ? a.touches[0] : a,
                        c = b.pageX - this.pointX,
                        e = b.pageY - this.pointY,
                        k = d.getTime();
                    if (this.pointX = b.pageX, this.pointY = b.pageY, this.distX += c, this.distY += e, b = f.abs(this.distX), h = f.abs(this.distY), !(300 < k - this.endTime && 10 > b && 10 > h)) {
                        if (this.directionLocked || this.options.freeScroll || (this.directionLocked = b > h + this.options.directionLockThreshold ? "h" : h >= b + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) a.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            e = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) a.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            c = 0
                        }
                        c = this.hasHorizontalScroll ? c : 0, e = this.hasVerticalScroll ? e : 0, a = this.x + c, b = this.y + e, (0 < a || a < this.maxScrollX) && (a = this.options.bounce ? this.x + c / 3 : 0 < a ? 0 : this.maxScrollX), (0 < b || b < this.maxScrollY) && (b = this.options.bounce ? this.y + e / 3 : 0 < b ? 0 : this.maxScrollY), this.directionX = 0 < c ? -1 : 0 > c ? 1 : 0, this.directionY = 0 < e ? -1 : 0 > e ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(a, b), 300 < k - this.startTime && (this.startTime = k, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(a) {
                if (this.enabled && d.eventType[a.type] === this.initiated) {
                    this.options.preventDefault && !d.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
                    var b, c;
                    c = d.getTime() - this.startTime;
                    var e = f.round(this.x),
                        k = f.round(this.y),
                        h = f.abs(e - this.startX),
                        g = f.abs(k - this.startY);
                    b = 0;
                    var l = "";
                    this.initiated = this.isInTransition = 0, this.endTime = d.getTime(), this.resetPosition(this.options.bounceTime) || (this.scrollTo(e, k), this.moved ? this._events.flick && 200 > c && 100 > h && 100 > g ? this._execEvent("flick") : (this.options.momentum && 300 > c && (b = this.hasHorizontalScroll ? d.momentum(this.x, this.startX, c, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                        destination: e,
                        duration: 0
                    }, c = this.hasVerticalScroll ? d.momentum(this.y, this.startY, c, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                        destination: k,
                        duration: 0
                    }, e = b.destination, k = c.destination, b = f.max(b.duration, c.duration), this.isInTransition = 1), this.options.snap && (this.currentPage = l = this._nearestSnap(e, k), b = this.options.snapSpeed || f.max(f.max(f.min(f.abs(e - l.x), 1e3), f.min(f.abs(k - l.y), 1e3)), 300), e = l.x, k = l.y, this.directionY = this.directionX = 0, l = this.options.bounceEasing), e != this.x || k != this.y ? ((0 < e || e < this.maxScrollX || 0 < k || k < this.maxScrollY) && (l = d.ease.quadratic), this.scrollTo(e, k, b, l)) : this._execEvent("scrollEnd")) : (this.options.tap && d.tap(a, this.options.tap), this.options.click && d.click(a), this._execEvent("scrollCancel")))
                }
            },
            _resize: function() {
                var a = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                    a.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(a) {
                var b = this.x,
                    c = this.y;
                return !this.hasHorizontalScroll || 0 < this.x ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || 0 < this.y ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), (b != this.x || c != this.y) && (this.scrollTo(b, c, a || 0, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && 0 > this.maxScrollX, this.hasVerticalScroll = this.options.scrollY && 0 > this.maxScrollY, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.directionY = this.directionX = this.endTime = 0, this.wrapperOffset = d.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            },
            on: function(a, b) {
                this._events[a] || (this._events[a] = []), this._events[a].push(b)
            },
            off: function(a, b) {
                if (this._events[a]) {
                    var c = this._events[a].indexOf(b); - 1 < c && this._events[a].splice(c, 1)
                }
            },
            _execEvent: function(a) {
                if (this._events[a]) {
                    var b = 0,
                        c = this._events[a].length;
                    if (c)
                        for (; b < c; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(a, b, c, e) {
                a = this.x + a, b = this.y + b, this.scrollTo(a, b, c || 0, e)
            },
            scrollTo: function(a, b, c, e) {
                e = e || d.ease.circular, this.isInTransition = this.options.useTransition && 0 < c;
                var f = this.options.useTransition && e.style;
                !c || f ? (f && (this._transitionTimingFunction(e.style), this._transitionTime(c)), this._translate(a, b)) : this._animate(a, b, c, e.fn)
            },
            scrollToElement: function(a, b, c, e, k) {
                if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
                    var h = d.offset(a);
                    h.left -= this.wrapperOffset.left, h.top -= this.wrapperOffset.top, !0 === c && (c = f.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === e && (e = f.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), h.left -= c || 0, h.top -= e || 0, h.left = 0 < h.left ? 0 : h.left < this.maxScrollX ? this.maxScrollX : h.left, h.top = 0 < h.top ? 0 : h.top < this.maxScrollY ? this.maxScrollY : h.top, b = void 0 === b || null === b || "auto" === b ? f.max(f.abs(this.x - h.left), f.abs(this.y - h.top)) : b, this.scrollTo(h.left, h.top, b, k)
                }
            },
            _transitionTime: function(a) {
                if (this.options.useTransition) {
                    a = a || 0;
                    var b = d.style.transitionDuration;
                    if (b) {
                        if (this.scrollerStyle[b] = a + "ms", !a && d.isBadAndroid) {
                            this.scrollerStyle[b] = "0.0001ms";
                            var c = this;
                            t(function() {
                                "0.0001ms" === c.scrollerStyle[b] && (c.scrollerStyle[b] = "0s")
                            })
                        }
                        if (this.indicators)
                            for (var e = this.indicators.length; e--;) this.indicators[e].transitionTime(a)
                    }
                }
            },
            _transitionTimingFunction: function(a) {
                if (this.scrollerStyle[d.style.transitionTimingFunction] = a, this.indicators)
                    for (var b = this.indicators.length; b--;) this.indicators[b].transitionTimingFunction(a)
            },
            _translate: function(a, b) {
                if (this.options.useTransform ? this.scrollerStyle[d.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = f.round(a), b = f.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b, this.indicators)
                    for (var c = this.indicators.length; c--;) this.indicators[c].updatePosition()
            },
            _initEvents: function(a) {
                a = a ? d.removeEvent : d.addEvent;
                var b = this.options.bindToWrapper ? this.wrapper : g;
                a(g, "orientationchange", this), a(g, "resize", this), this.options.click && a(this.wrapper, "click", this, !0), this.options.disableMouse || (a(this.wrapper, "mousedown", this), a(b, "mousemove", this), a(b, "mousecancel", this), a(b, "mouseup", this)), d.hasPointer && !this.options.disablePointer && (a(this.wrapper, d.prefixPointerEvent("pointerdown"), this), a(b, d.prefixPointerEvent("pointermove"), this), a(b, d.prefixPointerEvent("pointercancel"), this), a(b, d.prefixPointerEvent("pointerup"), this)), d.hasTouch && !this.options.disableTouch && (a(this.wrapper, "touchstart", this), a(b, "touchmove", this), a(b, "touchcancel", this), a(b, "touchend", this)), a(this.scroller, "transitionend", this), a(this.scroller, "webkitTransitionEnd", this), a(this.scroller, "oTransitionEnd", this), a(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var b, a = g.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (a = a[d.style.transform].split(")")[0].split(", "), b = +(a[12] || a[4]), a = +(a[13] || a[5])) : (b = +a.left.replace(/[^-\d.]/g, ""), a = +a.top.replace(/[^-\d.]/g, "")), {
                    x: b,
                    y: a
                }
            },
            _initIndicators: function() {
                function a(a) {
                    if (f.indicators)
                        for (var b = f.indicators.length; b--;) a.call(f.indicators[b])
                }
                var d, b = this.options.interactiveScrollbars,
                    c = "string" != typeof this.options.scrollbars,
                    e = [],
                    f = this;
                for (this.indicators = [], this.options.scrollbars && (this.options.scrollY && (d = {
                        el: u("v", b, this.options.scrollbars),
                        interactive: b,
                        defaultScrollbars: !0,
                        customStyle: c,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenX: !1
                    }, this.wrapper.appendChild(d.el), e.push(d)), this.options.scrollX && (d = {
                        el: u("h", b, this.options.scrollbars),
                        interactive: b,
                        defaultScrollbars: !0,
                        customStyle: c,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenY: !1
                    }, this.wrapper.appendChild(d.el), e.push(d))), this.options.indicators && (e = e.concat(this.options.indicators)), b = e.length; b--;) this.indicators.push(new v(this, e[b]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    a(function() {
                        this.fade()
                    })
                }), this.on("scrollCancel", function() {
                    a(function() {
                        this.fade()
                    })
                }), this.on("scrollStart", function() {
                    a(function() {
                        this.fade(1)
                    })
                }), this.on("beforeScrollStart", function() {
                    a(function() {
                        this.fade(1, !0)
                    })
                })), this.on("refresh", function() {
                    a(function() {
                        this.refresh()
                    })
                }), this.on("destroy", function() {
                    a(function() {
                        this.destroy()
                    }), delete this.indicators
                })
            },
            _initWheel: function() {
                d.addEvent(this.wrapper, "wheel", this), d.addEvent(this.wrapper, "mousewheel", this), d.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                    clearTimeout(this.wheelTimeout), this.wheelTimeout = null, d.removeEvent(this.wrapper, "wheel", this), d.removeEvent(this.wrapper, "mousewheel", this), d.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(a) {
                if (this.enabled) {
                    var b, c, e, d = this;
                    if (void 0 === this.wheelTimeout && d._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                            d.options.snap || d._execEvent("scrollEnd"), d.wheelTimeout = void 0
                        }, 400), "deltaX" in a) 1 === a.deltaMode ? (b = -a.deltaX * this.options.mouseWheelSpeed, a = -a.deltaY * this.options.mouseWheelSpeed) : (b = -a.deltaX, a = -a.deltaY);
                    else if ("wheelDeltaX" in a) b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed, a = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in a) b = a = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in a)) return;
                        b = a = -a.detail / 3 * this.options.mouseWheelSpeed
                    }
                    b *= this.options.invertWheelDirection, a *= this.options.invertWheelDirection, this.hasVerticalScroll || (b = a, a = 0), this.options.snap ? (c = this.currentPage.pageX, e = this.currentPage.pageY, 0 < b ? c-- : 0 > b && c++, 0 < a ? e-- : 0 > a && e++, this.goToPage(c, e)) : (c = this.x + f.round(this.hasHorizontalScroll ? b : 0), e = this.y + f.round(this.hasVerticalScroll ? a : 0), this.directionX = 0 < b ? -1 : 0 > b ? 1 : 0, this.directionY = 0 < a ? -1 : 0 > a ? 1 : 0, 0 < c ? c = 0 : c < this.maxScrollX && (c = this.maxScrollX), 0 < e ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY), this.scrollTo(c, e, 0))
                }
            },
            _initSnap: function() {
                this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                    var b, e, d, g, l, a = 0,
                        c = 0,
                        n = 0;
                    e = this.options.snapStepX || this.wrapperWidth;
                    var m = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (!0 === this.options.snap)
                            for (d = f.round(e / 2), g = f.round(m / 2); n > -this.scrollerWidth;) {
                                for (this.pages[a] = [], l = b = 0; l > -this.scrollerHeight;) this.pages[a][b] = {
                                    x: f.max(n, this.maxScrollX),
                                    y: f.max(l, this.maxScrollY),
                                    width: e,
                                    height: m,
                                    cx: n - d,
                                    cy: l - g
                                }, l -= m, b++;
                                n -= e, a++
                            } else
                                for (m = this.options.snap, b = m.length, e = -1; a < b; a++)(0 === a || m[a].offsetLeft <= m[a - 1].offsetLeft) && (c = 0, e++), this.pages[c] || (this.pages[c] = []), n = f.max(-m[a].offsetLeft, this.maxScrollX), l = f.max(-m[a].offsetTop, this.maxScrollY), d = n - f.round(m[a].offsetWidth / 2), g = l - f.round(m[a].offsetHeight / 2), this.pages[c][e] = {
                                    x: n,
                                    y: l,
                                    width: m[a].offsetWidth,
                                    height: m[a].offsetHeight,
                                    cx: d,
                                    cy: g
                                }, n > this.maxScrollX && c++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), 0 == this.options.snapThreshold % 1 ? this.snapThresholdY = this.snapThresholdX = this.options.snapThreshold : (this.snapThresholdX = f.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = f.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }), this.on("flick", function() {
                    var a = this.options.snapSpeed || f.max(f.max(f.min(f.abs(this.x - this.startX), 1e3), f.min(f.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
                })
            },
            _nearestSnap: function(a, b) {
                if (!this.pages.length) return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
                var c = 0,
                    e = this.pages.length,
                    d = 0;
                if (f.abs(a - this.absStartX) < this.snapThresholdX && f.abs(b - this.absStartY) < this.snapThresholdY) return this.currentPage;
                for (0 < a ? a = 0 : a < this.maxScrollX && (a = this.maxScrollX), 0 < b ? b = 0 : b < this.maxScrollY && (b = this.maxScrollY); c < e; c++)
                    if (a >= this.pages[c][0].cx) {
                        a = this.pages[c][0].x;
                        break
                    }
                for (e = this.pages[c].length; d < e; d++)
                    if (b >= this.pages[0][d].cy) {
                        b = this.pages[0][d].y;
                        break
                    }
                return c == this.currentPage.pageX && (c += this.directionX, 0 > c ? c = 0 : c >= this.pages.length && (c = this.pages.length - 1), a = this.pages[c][0].x), d == this.currentPage.pageY && (d += this.directionY, 0 > d ? d = 0 : d >= this.pages[0].length && (d = this.pages[0].length - 1), b = this.pages[0][d].y), {
                    x: a,
                    y: b,
                    pageX: c,
                    pageY: d
                }
            },
            goToPage: function(a, b, c, d) {
                d = d || this.options.bounceEasing, a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0), b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
                var g = this.pages[a][b].x,
                    h = this.pages[a][b].y;
                c = void 0 === c ? this.options.snapSpeed || f.max(f.max(f.min(f.abs(g - this.x), 1e3), f.min(f.abs(h - this.y), 1e3)), 300) : c, this.currentPage = {
                    x: g,
                    y: h,
                    pageX: a,
                    pageY: b
                }, this.scrollTo(g, h, c, d)
            },
            next: function(a, b) {
                var c = this.currentPage.pageX,
                    d = this.currentPage.pageY;
                c++, c >= this.pages.length && this.hasVerticalScroll && (c = 0, d++), this.goToPage(c, d, a, b)
            },
            prev: function(a, b) {
                var c = this.currentPage.pageX,
                    d = this.currentPage.pageY;
                c--, 0 > c && this.hasVerticalScroll && (c = 0, d--), this.goToPage(c, d, a, b)
            },
            _initKeys: function(a) {
                a = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                var b;
                if ("object" == typeof this.options.keyBindings)
                    for (b in this.options.keyBindings) "string" == typeof this.options.keyBindings[b] && (this.options.keyBindings[b] = this.options.keyBindings[b].toUpperCase().charCodeAt(0));
                else this.options.keyBindings = {};
                for (b in a) this.options.keyBindings[b] = this.options.keyBindings[b] || a[b];
                d.addEvent(g, "keydown", this), this.on("destroy", function() {
                    d.removeEvent(g, "keydown", this)
                })
            },
            _key: function(a) {
                if (this.enabled) {
                    var n, b = this.options.snap,
                        c = b ? this.currentPage.pageX : this.x,
                        e = b ? this.currentPage.pageY : this.y,
                        g = d.getTime(),
                        h = this.keyTime || 0;
                    switch (this.options.useTransition && this.isInTransition && (n = this.getComputedPosition(), this._translate(f.round(n.x), f.round(n.y)), this.isInTransition = !1), this.keyAcceleration = 200 > g - h ? f.min(this.keyAcceleration + .25, 50) : 0, a.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? c += b ? 1 : this.wrapperWidth : e += b ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? c -= b ? 1 : this.wrapperWidth : e -= b ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            c = b ? this.pages.length - 1 : this.maxScrollX, e = b ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            e = c = 0;
                            break;
                        case this.options.keyBindings.left:
                            c += b ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            e += b ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            c -= b ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            e -= b ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    b ? this.goToPage(c, e) : (0 < c ? this.keyAcceleration = c = 0 : c < this.maxScrollX && (c = this.maxScrollX, this.keyAcceleration = 0), 0 < e ? this.keyAcceleration = e = 0 : e < this.maxScrollY && (e = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(c, e, 0), this.keyTime = g)
                }
            },
            _animate: function(a, b, c, e) {
                function f() {
                    var p, r = d.getTime();
                    r >= q ? (g.isAnimating = !1, g._translate(a, b), g.resetPosition(g.options.bounceTime) || g._execEvent("scrollEnd")) : (r = (r - m) / c, p = e(r), r = (a - n) * p + n, p = (b - l) * p + l, g._translate(r, p), g.isAnimating && t(f))
                }
                var g = this,
                    n = this.x,
                    l = this.y,
                    m = d.getTime(),
                    q = m + c;
                this.isAnimating = !0, f()
            },
            handleEvent: function(a) {
                switch (a.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(a);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(a);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(a);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(a);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(a);
                        break;
                    case "keydown":
                        this._key(a);
                        break;
                    case "click":
                        this.enabled && !a._constructed && (a.preventDefault(), a.stopPropagation())
                }
            }
        }, v.prototype = {
            handleEvent: function(a) {
                switch (a.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(a);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(a);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(a)
                }
            },
            destroy: function() {
                this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (d.removeEvent(this.indicator, "touchstart", this), d.removeEvent(this.indicator, d.prefixPointerEvent("pointerdown"), this), d.removeEvent(this.indicator, "mousedown", this), d.removeEvent(g, "touchmove", this), d.removeEvent(g, d.prefixPointerEvent("pointermove"), this), d.removeEvent(g, "mousemove", this), d.removeEvent(g, "touchend", this), d.removeEvent(g, d.prefixPointerEvent("pointerup"), this), d.removeEvent(g, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(a) {
                var b = a.touches ? a.touches[0] : a;
                a.preventDefault(), a.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = b.pageX, this.lastPointY = b.pageY, this.startTime = d.getTime(), this.options.disableTouch || d.addEvent(g, "touchmove", this), this.options.disablePointer || d.addEvent(g, d.prefixPointerEvent("pointermove"), this), this.options.disableMouse || d.addEvent(g, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(a) {
                var c, e, b = a.touches ? a.touches[0] : a;
                d.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, c = b.pageX - this.lastPointX, this.lastPointX = b.pageX, e = b.pageY - this.lastPointY, this.lastPointY = b.pageY, this._pos(this.x + c, this.y + e), a.preventDefault(), a.stopPropagation()
            },
            _end: function(a) {
                if (this.initiated) {
                    if (this.initiated = !1, a.preventDefault(), a.stopPropagation(), d.removeEvent(g, "touchmove", this), d.removeEvent(g, d.prefixPointerEvent("pointermove"), this), d.removeEvent(g, "mousemove", this), this.scroller.options.snap) {
                        a = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
                        var b = this.options.snapSpeed || f.max(f.max(f.min(f.abs(this.scroller.x - a.x), 1e3), f.min(f.abs(this.scroller.y - a.y), 1e3)), 300);
                        this.scroller.x == a.x && this.scroller.y == a.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = a, this.scroller.scrollTo(a.x, a.y, b, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(a) {
                a = a || 0;
                var b = d.style.transitionDuration;
                if (b && (this.indicatorStyle[b] = a + "ms", !a && d.isBadAndroid)) {
                    this.indicatorStyle[b] = "0.0001ms";
                    var c = this;
                    t(function() {
                        "0.0001ms" === c.indicatorStyle[b] && (c.indicatorStyle[b] = "0s")
                    })
                }
            },
            transitionTimingFunction: function(a) {
                this.indicatorStyle[d.style.transitionTimingFunction] = a
            },
            refresh: function() {
                this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (d.addClass(this.wrapper, "iScrollBothScrollbars"), d.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (d.removeClass(this.wrapper, "iScrollBothScrollbars"), d.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = f.max(f.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = 8 - this.indicatorWidth, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = f.max(f.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = 8 - this.indicatorHeight, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
            },
            updatePosition: function() {
                var a = this.options.listenX && f.round(this.sizeRatioX * this.scroller.x) || 0,
                    b = this.options.listenY && f.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = f.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px"), a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = f.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = f.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px"), b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = f.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = a, this.y = b, this.scroller.options.useTransform ? this.indicatorStyle[d.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px", this.indicatorStyle.top = b + "px")
            },
            _pos: function(a, b) {
                0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX), 0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY), a = this.options.listenX ? f.round(a / this.sizeRatioX) : this.scroller.x, b = this.options.listenY ? f.round(b / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(a, b)
            },
            fade: function(a, b) {
                if (!b || this.visible) {
                    clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                    var c = a ? 0 : 300;
                    this.wrapperStyle[d.style.transitionDuration] = (a ? 250 : 500) + "ms", this.fadeTimeout = setTimeout(function(a) {
                        this.wrapperStyle.opacity = a, this.visible = +a
                    }.bind(this, a ? "1" : "0"), c)
                }
            }
        }, p.utils = d, "undefined" != typeof module && module.exports ? module.exports = p : "function" == typeof define && define.amd ? define(function() {
            return p
        }) : g.IScroll = p
    }(window, document, Math),
    function() {
        var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX, bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            },
            indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++)
                    if (i in this && this[i] === item) return i;
                return -1
            };
        Util = function() {
            function Util() {}
            return Util.prototype.extend = function(custom, defaults) {
                    var key, value;
                    for (key in defaults) value = defaults[key], null == custom[key] && (custom[key] = value);
                    return custom
                }, Util.prototype.isMobile = function(agent) {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
                },
                Util.prototype.createEvent = function(event, bubble, cancel, detail) {
                    var customEvent;
                    return null == bubble && (bubble = !1), null == cancel && (cancel = !1), null == detail && (detail = null), null != document.createEvent ? (customEvent = document.createEvent("CustomEvent"), customEvent.initCustomEvent(event, bubble, cancel, detail)) : null != document.createEventObject ? (customEvent = document.createEventObject(), customEvent.eventType = event) : customEvent.eventName = event, customEvent
                }, Util.prototype.emitEvent = function(elem, event) {
                    return null != elem.dispatchEvent ? elem.dispatchEvent(event) : event in (null != elem) ? elem[event]() : "on" + event in (null != elem) ? elem["on" + event]() : void 0
                }, Util.prototype.addEvent = function(elem, event, fn) {
                    return null != elem.addEventListener ? elem.addEventListener(event, fn, !1) : null != elem.attachEvent ? elem.attachEvent("on" + event, fn) : elem[event] = fn
                }, Util.prototype.removeEvent = function(elem, event, fn) {
                    return null != elem.removeEventListener ? elem.removeEventListener(event, fn, !1) : null != elem.detachEvent ? elem.detachEvent("on" + event, fn) : delete elem[event]
                }, Util.prototype.innerHeight = function() {
                    return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
                }, Util
        }(), WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function() {
            function WeakMap() {
                this.keys = [], this.values = []
            }
            return WeakMap.prototype.get = function(key) {
                var i, j, len, ref;
                for (ref = this.keys, i = j = 0, len = ref.length; j < len; i = ++j)
                    if (ref[i] === key) return this.values[i]
            }, WeakMap.prototype.set = function(key, value) {
                var i, j, len, ref;
                for (ref = this.keys, i = j = 0, len = ref.length; j < len; i = ++j)
                    if (ref[i] === key) return void(this.values[i] = value);
                return this.keys.push(key), this.values.push(value)
            }, WeakMap
        }()), MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function() {
            function MutationObserver() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return MutationObserver.notSupported = !0, MutationObserver.prototype.observe = function() {}, MutationObserver
        }()), getComputedStyle = this.getComputedStyle || function(el, pseudo) {
            return this.getPropertyValue = function(prop) {
                var ref;
                return "float" === prop && (prop = "styleFloat"), getComputedStyleRX.test(prop) && prop.replace(getComputedStyleRX, function(_, _char) {
                    return _char.toUpperCase()
                }), (null != (ref = el.currentStyle) ? ref[prop] : void 0) || null
            }, this
        }, getComputedStyleRX = /(\-([a-z]){1})/g, this.WOW = function() {
            function WOW(options) {
                null == options && (options = {}), this.scrollCallback = bind(this.scrollCallback, this), this.scrollHandler = bind(this.scrollHandler, this), this.resetAnimation = bind(this.resetAnimation, this), this.start = bind(this.start, this), this.scrolled = !0, this.config = this.util().extend(options, this.defaults), this.animationNameCache = new WeakMap, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }
            return WOW.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, WOW.prototype.init = function() {
                var ref;
                return this.element = window.document.documentElement, "interactive" === (ref = document.readyState) || "complete" === ref ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, WOW.prototype.start = function() {
                var box, j, len, ref;
                if (this.stopped = !1, this.boxes = function() {
                        var j, len, ref, results;
                        for (ref = this.element.querySelectorAll("." + this.config.boxClass), results = [], j = 0, len = ref.length; j < len; j++) box = ref[j], results.push(box);
                        return results
                    }.call(this), this.all = function() {
                        var j, len, ref, results;
                        for (ref = this.boxes, results = [], j = 0, len = ref.length; j < len; j++) box = ref[j], results.push(box);
                        return results
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (ref = this.boxes, j = 0, len = ref.length; j < len; j++) box = ref[j], this.applyStyle(box, !0);
                if (this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) return new MutationObserver(function(_this) {
                    return function(records) {
                        var k, len1, node, record, results;
                        for (results = [], k = 0, len1 = records.length; k < len1; k++) record = records[k], results.push(function() {
                            var l, len2, ref1, results1;
                            for (ref1 = record.addedNodes || [], results1 = [], l = 0, len2 = ref1.length; l < len2; l++) node = ref1[l], results1.push(this.doSync(node));
                            return results1
                        }.call(_this));
                        return results
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
            }, WOW.prototype.stop = function() {
                if (this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval)
            }, WOW.prototype.sync = function(element) {
                if (MutationObserver.notSupported) return this.doSync(this.element)
            }, WOW.prototype.doSync = function(element) {
                var box, j, len, ref, results;
                if (null == element && (element = this.element), 1 === element.nodeType) {
                    for (element = element.parentNode || element, ref = element.querySelectorAll("." + this.config.boxClass), results = [], j = 0, len = ref.length; j < len; j++) box = ref[j], indexOf.call(this.all, box) < 0 ? (this.boxes.push(box), this.all.push(box), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(box, !0), results.push(this.scrolled = !0)) : results.push(void 0);
                    return results
                }
            }, WOW.prototype.show = function(box) {
                return this.applyStyle(box), box.className = box.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(box), this.util().emitEvent(box, this.wowEvent), box
            }, WOW.prototype.applyStyle = function(box, hidden) {
                var delay, duration, iteration;
                return duration = box.getAttribute("data-wow-duration"), delay = box.getAttribute("data-wow-delay"), iteration = box.getAttribute("data-wow-iteration"), this.animate(function(_this) {
                    return function() {
                        return _this.customStyle(box, hidden, duration, delay, iteration)
                    }
                }(this))
            }, WOW.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(callback) {
                    return window.requestAnimationFrame(callback)
                } : function(callback) {
                    return callback()
                }
            }(), WOW.prototype.resetStyle = function() {
                var box, j, len, ref, results;
                for (ref = this.boxes, results = [], j = 0, len = ref.length; j < len; j++) box = ref[j], results.push(box.style.visibility = "visible");
                return results
            }, WOW.prototype.resetAnimation = function(event) {
                var target;
                if (event.type.toLowerCase().indexOf("animationend") >= 0) return target = event.target || event.srcElement, target.className = target.className.replace(this.config.animateClass, "").trim()
            }, WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
                return hidden && this.cacheAnimationName(box), box.style.visibility = hidden ? "hidden" : "visible", duration && this.vendorSet(box.style, {
                    animationDuration: duration
                }), delay && this.vendorSet(box.style, {
                    animationDelay: delay
                }), iteration && this.vendorSet(box.style, {
                    animationIterationCount: iteration
                }), this.vendorSet(box.style, {
                    animationName: hidden ? "none" : this.cachedAnimationName(box)
                }), box
            }, WOW.prototype.vendors = ["moz", "webkit"], WOW.prototype.vendorSet = function(elem, properties) {
                var name, results, value, vendor;
                results = [];
                for (name in properties) value = properties[name], elem["" + name] = value, results.push(function() {
                    var j, len, ref, results1;
                    for (ref = this.vendors, results1 = [], j = 0, len = ref.length; j < len; j++) vendor = ref[j], results1.push(elem["" + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
                    return results1
                }.call(this));
                return results
            }, WOW.prototype.vendorCSS = function(elem, property) {
                var j, len, ref, result, style, vendor;
                for (style = getComputedStyle(elem), result = style.getPropertyCSSValue(property), ref = this.vendors, j = 0, len = ref.length; j < len; j++) vendor = ref[j], result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
                return result
            }, WOW.prototype.animationName = function(box) {
                var animationName;
                try {
                    animationName = this.vendorCSS(box, "animation-name").cssText
                } catch (_error) {
                    animationName = getComputedStyle(box).getPropertyValue("animation-name")
                }
                return "none" === animationName ? "" : animationName
            }, WOW.prototype.cacheAnimationName = function(box) {
                return this.animationNameCache.set(box, this.animationName(box))
            }, WOW.prototype.cachedAnimationName = function(box) {
                return this.animationNameCache.get(box)
            }, WOW.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, WOW.prototype.scrollCallback = function() {
                var box;
                if (this.scrolled && (this.scrolled = !1, this.boxes = function() {
                        var j, len, ref, results;
                        for (ref = this.boxes, results = [], j = 0, len = ref.length; j < len; j++)(box = ref[j]) && (this.isVisible(box) ? this.show(box) : results.push(box));
                        return results
                    }.call(this), !this.boxes.length && !this.config.live)) return this.stop()
            }, WOW.prototype.offsetTop = function(element) {
                for (var top; void 0 === element.offsetTop;) element = element.parentNode;
                for (top = element.offsetTop; element = element.offsetParent;) top += element.offsetTop;
                return top
            }, WOW.prototype.isVisible = function(box) {
                var bottom, offset, top, viewBottom, viewTop;
                return offset = box.getAttribute("data-wow-offset") || this.config.offset, viewTop = window.pageYOffset, viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset, top = this.offsetTop(box), bottom = top + box.clientHeight, top <= viewBottom && bottom >= viewTop
            }, WOW.prototype.util = function() {
                return null != this._util ? this._util : this._util = new Util
            }, WOW.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, WOW
        }()
    }.call(this),
    function(root, factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : root.jQuery ? root.jQuery : root.Zepto)
    }(this, function($, undefined) {
        $.fn.jPlayer = function(options) {
            var isMethodCall = "string" == typeof options,
                args = Array.prototype.slice.call(arguments, 1),
                returnValue = this;
            return options = !isMethodCall && args.length ? $.extend.apply(null, [!0, options].concat(args)) : options, isMethodCall && "_" === options.charAt(0) ? returnValue : (isMethodCall ? this.each(function() {
                var instance = $(this).data("jPlayer"),
                    methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
                if (methodValue !== instance && methodValue !== undefined) return returnValue = methodValue, !1
            }) : this.each(function() {
                var instance = $(this).data("jPlayer");
                instance ? instance.option(options || {}) : $(this).data("jPlayer", new $.jPlayer(options, this))
            }), returnValue)
        }, $.jPlayer = function(options, element) {
            if (arguments.length) {
                this.element = $(element), this.options = $.extend(!0, {}, this.options, options);
                var self = this;
                this.element.bind("remove.jPlayer", function() {
                    self.destroy()
                }), this._init()
            }
        }, "function" != typeof $.fn.stop && ($.fn.stop = function() {}), $.jPlayer.emulateMethods = "load play pause", $.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate", $.jPlayer.emulateOptions = "muted volume", $.jPlayer.reservedEvent = "ready flashreset resize repeat error warning", $.jPlayer.event = {}, $.each(["ready", "setmedia", "flashreset", "resize", "repeat", "click", "error", "warning", "loadstart", "progress", "suspend", "abort", "emptied", "stalled", "play", "pause", "loadedmetadata", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"], function() {
            $.jPlayer.event[this] = "jPlayer_" + this
        }), $.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "canplay", "canplaythrough"], $.jPlayer.pause = function() {
            $.jPlayer.prototype.destroyRemoved(), $.each($.jPlayer.prototype.instances, function(i, element) {
                element.data("jPlayer").status.srcSet && element.jPlayer("pause")
            })
        }, $.jPlayer.timeFormat = {
            showHour: !1,
            showMin: !0,
            showSec: !0,
            padHour: !1,
            padMin: !0,
            padSec: !0,
            sepHour: ":",
            sepMin: ":",
            sepSec: ""
        };
        var ConvertTime = function() {
            this.init()
        };
        ConvertTime.prototype = {
            init: function() {
                this.options = {
                    timeFormat: $.jPlayer.timeFormat
                }
            },
            time: function(s) {
                s = s && "number" == typeof s ? s : 0;
                var myTime = new Date(1e3 * s),
                    hour = myTime.getUTCHours(),
                    min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + 60 * hour,
                    sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + 60 * min,
                    strHour = this.options.timeFormat.padHour && hour < 10 ? "0" + hour : hour,
                    strMin = this.options.timeFormat.padMin && min < 10 ? "0" + min : min,
                    strSec = this.options.timeFormat.padSec && sec < 10 ? "0" + sec : sec,
                    strTime = "";
                return strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "", strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "", strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : ""
            }
        };
        var myConvertTime = new ConvertTime;
        $.jPlayer.convertTime = function(s) {
            return myConvertTime.time(s)
        }, $.jPlayer.uaBrowser = function(userAgent) {
            var ua = userAgent.toLowerCase(),
                rwebkit = /(webkit)[ \/]([\w.]+)/,
                ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                rmsie = /(msie) ([\w.]+)/,
                rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            }
        }, $.jPlayer.uaPlatform = function(userAgent) {
            var ua = userAgent.toLowerCase(),
                rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/,
                rtablet = /(ipad|playbook)/,
                randroid = /(android)/,
                rmobile = /(mobile)/,
                platform = rplatform.exec(ua) || [],
                tablet = rtablet.exec(ua) || !rmobile.exec(ua) && randroid.exec(ua) || [];
            return platform[1] && (platform[1] = platform[1].replace(/\s/g, "_")), {
                platform: platform[1] || "",
                tablet: tablet[1] || ""
            }
        }, $.jPlayer.browser = {}, $.jPlayer.platform = {};
        var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
        browserMatch.browser && ($.jPlayer.browser[browserMatch.browser] = !0, $.jPlayer.browser.version = browserMatch.version);
        var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
        platformMatch.platform && ($.jPlayer.platform[platformMatch.platform] = !0, $.jPlayer.platform.mobile = !platformMatch.tablet, $.jPlayer.platform.tablet = !!platformMatch.tablet), $.jPlayer.getDocMode = function() {
            var docMode;
            return $.jPlayer.browser.msie && (document.documentMode ? docMode = document.documentMode : (docMode = 5, document.compatMode && "CSS1Compat" === document.compatMode && (docMode = 7))), docMode
        }, $.jPlayer.browser.documentMode = $.jPlayer.getDocMode(), $.jPlayer.nativeFeatures = {
            init: function() {
                var fs, i, il, d = document,
                    v = d.createElement("video"),
                    spec = {
                        w3c: ["fullscreenEnabled", "fullscreenElement", "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenerror"],
                        moz: ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"],
                        webkit: ["", "webkitCurrentFullScreenElement", "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", ""],
                        webkitVideo: ["webkitSupportsFullscreen", "webkitDisplayingFullscreen", "webkitEnterFullscreen", "webkitExitFullscreen", "", ""],
                        ms: ["", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"]
                    },
                    specOrder = ["w3c", "moz", "webkit", "webkitVideo", "ms"];
                for (this.fullscreen = fs = {
                        support: {
                            w3c: !!d[spec.w3c[0]],
                            moz: !!d[spec.moz[0]],
                            webkit: "function" == typeof d[spec.webkit[3]],
                            webkitVideo: "function" == typeof v[spec.webkitVideo[2]],
                            ms: "function" == typeof v[spec.ms[2]]
                        },
                        used: {}
                    }, i = 0, il = specOrder.length; i < il; i++) {
                    var n = specOrder[i];
                    if (fs.support[n]) {
                        fs.spec = n, fs.used[n] = !0;
                        break
                    }
                }
                if (fs.spec) {
                    var s = spec[fs.spec];
                    fs.api = {
                        fullscreenEnabled: !0,
                        fullscreenElement: function(elem) {
                            return elem = elem || d, elem[s[1]]
                        },
                        requestFullscreen: function(elem) {
                            return elem[s[2]]()
                        },
                        exitFullscreen: function(elem) {
                            return elem = elem || d, elem[s[3]]()
                        }
                    }, fs.event = {
                        fullscreenchange: s[4],
                        fullscreenerror: s[5]
                    }
                } else fs.api = {
                    fullscreenEnabled: !1,
                    fullscreenElement: function() {
                        return null
                    },
                    requestFullscreen: function() {},
                    exitFullscreen: function() {}
                }, fs.event = {}
            }
        }, $.jPlayer.nativeFeatures.init(), $.jPlayer.focus = null, $.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";
        var keyBindings = function(event) {
            var ignoreKey, f = $.jPlayer.focus;
            f && ($.each($.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
                if (event.target.nodeName.toUpperCase() === name.toUpperCase()) return ignoreKey = !0, !1
            }), ignoreKey || $.each(f.options.keyBindings, function(action, binding) {
                if (binding && $.isFunction(binding.fn) && ("number" == typeof binding.key && event.which === binding.key || "string" == typeof binding.key && event.key === binding.key)) return event.preventDefault(), binding.fn(f), !1
            }))
        };
        $.jPlayer.keys = function(en) {
            $(document.documentElement).unbind("keydown.jPlayer"), en && $(document.documentElement).bind("keydown.jPlayer", keyBindings)
        }, $.jPlayer.keys(!0), $.jPlayer.prototype = {
            count: 0,
            version: {
                script: "2.9.2",
                needFlash: "2.9.0",
                flash: "unknown"
            },
            options: {
                swfPath: "js",
                solution: "html, flash",
                supplied: "mp3",
                auroraFormats: "wav",
                preload: "metadata",
                volume: .8,
                muted: !1,
                remainingDuration: !1,
                toggleDuration: !1,
                captureDuration: !0,
                playbackRate: 1,
                defaultPlaybackRate: 1,
                minPlaybackRate: .5,
                maxPlaybackRate: 4,
                wmode: "opaque",
                backgroundColor: "#000000",
                cssSelectorAncestor: "#jp_container_1",
                cssSelector: {
                    videoPlay: ".jp-video-play",
                    play: ".jp-play",
                    pause: ".jp-pause",
                    stop: ".jp-stop",
                    seekBar: ".jp-seek-bar",
                    playBar: ".jp-play-bar",
                    mute: ".jp-mute",
                    unmute: ".jp-unmute",
                    volumeBar: ".jp-volume-bar",
                    volumeBarValue: ".jp-volume-bar-value",
                    volumeMax: ".jp-volume-max",
                    playbackRateBar: ".jp-playback-rate-bar",
                    playbackRateBarValue: ".jp-playback-rate-bar-value",
                    currentTime: ".jp-current-time",
                    duration: ".jp-duration",
                    title: ".jp-title",
                    fullScreen: ".jp-full-screen",
                    restoreScreen: ".jp-restore-screen",
                    repeat: ".jp-repeat",
                    repeatOff: ".jp-repeat-off",
                    gui: ".jp-gui",
                    noSolution: ".jp-no-solution"
                },
                stateClass: {
                    playing: "jp-state-playing",
                    seeking: "jp-state-seeking",
                    muted: "jp-state-muted",
                    looped: "jp-state-looped",
                    fullScreen: "jp-state-full-screen",
                    noVolume: "jp-state-no-volume"
                },
                useStateClassSkin: !1,
                autoBlur: !0,
                smoothPlayBar: !1,
                fullScreen: !1,
                fullWindow: !1,
                autohide: {
                    restored: !1,
                    full: !0,
                    fadeIn: 200,
                    fadeOut: 600,
                    hold: 1e3
                },
                loop: !1,
                repeat: function(event) {
                    event.jPlayer.options.loop ? $(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                        $(this).jPlayer("play")
                    }) : $(this).unbind(".jPlayerRepeat")
                },
                nativeVideoControls: {},
                noFullWindow: {
                    msie: /msie [0-6]\./,
                    ipad: /ipad.*?os [0-4]\./,
                    iphone: /iphone/,
                    ipod: /ipod/,
                    android_pad: /android [0-3]\.(?!.*?mobile)/,
                    android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
                    blackberry: /blackberry/,
                    windows_ce: /windows ce/,
                    iemobile: /iemobile/,
                    webos: /webos/
                },
                noVolume: {
                    ipad: /ipad/,
                    iphone: /iphone/,
                    ipod: /ipod/,
                    android_pad: /android(?!.*?mobile)/,
                    android_phone: /android.*?mobile/,
                    blackberry: /blackberry/,
                    windows_ce: /windows ce/,
                    iemobile: /iemobile/,
                    webos: /webos/,
                    playbook: /playbook/
                },
                timeFormat: {},
                keyEnabled: !1,
                audioFullScreen: !1,
                keyBindings: {
                    play: {
                        key: 80,
                        fn: function(f) {
                            f.status.paused ? f.play() : f.pause()
                        }
                    },
                    fullScreen: {
                        key: 70,
                        fn: function(f) {
                            (f.status.video || f.options.audioFullScreen) && f._setOption("fullScreen", !f.options.fullScreen)
                        }
                    },
                    muted: {
                        key: 77,
                        fn: function(f) {
                            f._muted(!f.options.muted)
                        }
                    },
                    volumeUp: {
                        key: 190,
                        fn: function(f) {
                            f.volume(f.options.volume + .1)
                        }
                    },
                    volumeDown: {
                        key: 188,
                        fn: function(f) {
                            f.volume(f.options.volume - .1)
                        }
                    },
                    loop: {
                        key: 76,
                        fn: function(f) {
                            f._loop(!f.options.loop)
                        }
                    }
                },
                verticalVolume: !1,
                verticalPlaybackRate: !1,
                globalVolume: !1,
                idPrefix: "jp",
                noConflict: "jQuery",
                emulateHtml: !1,
                consoleAlerts: !0,
                errorAlerts: !1,
                warningAlerts: !1
            },
            optionsAudio: {
                size: {
                    width: "0px",
                    height: "0px",
                    cssClass: ""
                },
                sizeFull: {
                    width: "0px",
                    height: "0px",
                    cssClass: ""
                }
            },
            optionsVideo: {
                size: {
                    width: "480px",
                    height: "270px",
                    cssClass: "jp-video-270p"
                },
                sizeFull: {
                    width: "100%",
                    height: "100%",
                    cssClass: "jp-video-full"
                }
            },
            instances: {},
            status: {
                src: "",
                media: {},
                paused: !0,
                format: {},
                formatType: "",
                waitForPlay: !0,
                waitForLoad: !0,
                srcSet: !1,
                video: !1,
                seekPercent: 0,
                currentPercentRelative: 0,
                currentPercentAbsolute: 0,
                currentTime: 0,
                duration: 0,
                remaining: 0,
                videoWidth: 0,
                videoHeight: 0,
                readyState: 0,
                networkState: 0,
                playbackRate: 1,
                ended: 0
            },
            internal: {
                ready: !1
            },
            solution: {
                html: !0,
                aurora: !0,
                flash: !0
            },
            format: {
                mp3: {
                    codec: "audio/mpeg",
                    flashCanPlay: !0,
                    media: "audio"
                },
                m4a: {
                    codec: 'audio/mp4; codecs="mp4a.40.2"',
                    flashCanPlay: !0,
                    media: "audio"
                },
                m3u8a: {
                    codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
                    flashCanPlay: !1,
                    media: "audio"
                },
                m3ua: {
                    codec: "audio/mpegurl",
                    flashCanPlay: !1,
                    media: "audio"
                },
                oga: {
                    codec: 'audio/ogg; codecs="vorbis, opus"',
                    flashCanPlay: !1,
                    media: "audio"
                },
                flac: {
                    codec: "audio/x-flac",
                    flashCanPlay: !1,
                    media: "audio"
                },
                wav: {
                    codec: 'audio/wav; codecs="1"',
                    flashCanPlay: !1,
                    media: "audio"
                },
                webma: {
                    codec: 'audio/webm; codecs="vorbis"',
                    flashCanPlay: !1,
                    media: "audio"
                },
                fla: {
                    codec: "audio/x-flv",
                    flashCanPlay: !0,
                    media: "audio"
                },
                rtmpa: {
                    codec: 'audio/rtmp; codecs="rtmp"',
                    flashCanPlay: !0,
                    media: "audio"
                },
                m4v: {
                    codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                    flashCanPlay: !0,
                    media: "video"
                },
                m3u8v: {
                    codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
                    flashCanPlay: !1,
                    media: "video"
                },
                m3uv: {
                    codec: "audio/mpegurl",
                    flashCanPlay: !1,
                    media: "video"
                },
                ogv: {
                    codec: 'video/ogg; codecs="theora, vorbis"',
                    flashCanPlay: !1,
                    media: "video"
                },
                webmv: {
                    codec: 'video/webm; codecs="vorbis, vp8"',
                    flashCanPlay: !1,
                    media: "video"
                },
                flv: {
                    codec: "video/x-flv",
                    flashCanPlay: !0,
                    media: "video"
                },
                rtmpv: {
                    codec: 'video/rtmp; codecs="rtmp"',
                    flashCanPlay: !0,
                    media: "video"
                }
            },
            _init: function() {
                var self = this;
                if (this.element.empty(), this.status = $.extend({}, this.status), this.internal = $.extend({}, this.internal), this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat), this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod, this.internal.domNode = this.element.get(0), this.options.keyEnabled && !$.jPlayer.focus && ($.jPlayer.focus = this), this.androidFix = {
                        setMedia: !1,
                        play: !1,
                        pause: !1,
                        time: NaN
                    }, $.jPlayer.platform.android && (this.options.preload = "auto" !== this.options.preload ? "metadata" : "auto"), this.formats = [], this.solutions = [], this.require = {}, this.htmlElement = {}, this.html = {}, this.html.audio = {}, this.html.video = {}, this.aurora = {}, this.aurora.formats = [], this.aurora.properties = [], this.flash = {}, this.css = {}, this.css.cs = {}, this.css.jq = {}, this.ancestorJq = [], this.options.volume = this._limitValue(this.options.volume, 0, 1), $.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
                        var format = value1.replace(/^\s+|\s+$/g, "");
                        if (self.format[format]) {
                            var dupFound = !1;
                            $.each(self.formats, function(index2, value2) {
                                if (format === value2) return dupFound = !0, !1
                            }), dupFound || self.formats.push(format)
                        }
                    }), $.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
                        var solution = value1.replace(/^\s+|\s+$/g, "");
                        if (self.solution[solution]) {
                            var dupFound = !1;
                            $.each(self.solutions, function(index2, value2) {
                                if (solution === value2) return dupFound = !0, !1
                            }), dupFound || self.solutions.push(solution)
                        }
                    }), $.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
                        var format = value1.replace(/^\s+|\s+$/g, "");
                        if (self.format[format]) {
                            var dupFound = !1;
                            $.each(self.aurora.formats, function(index2, value2) {
                                if (format === value2) return dupFound = !0, !1
                            }), dupFound || self.aurora.formats.push(format)
                        }
                    }), this.internal.instance = "jp_" + this.count, this.instances[this.internal.instance] = this.element, this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count), this.internal.self = $.extend({}, {
                        id: this.element.attr("id"),
                        jq: this.element
                    }), this.internal.audio = $.extend({}, {
                        id: this.options.idPrefix + "_audio_" + this.count,
                        jq: undefined
                    }), this.internal.video = $.extend({}, {
                        id: this.options.idPrefix + "_video_" + this.count,
                        jq: undefined
                    }), this.internal.flash = $.extend({}, {
                        id: this.options.idPrefix + "_flash_" + this.count,
                        jq: undefined,
                        swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "jquery.jplayer.swf" : "")
                    }), this.internal.poster = $.extend({}, {
                        id: this.options.idPrefix + "_poster_" + this.count,
                        jq: undefined
                    }), $.each($.jPlayer.event, function(eventName, eventType) {
                        self.options[eventName] !== undefined && (self.element.bind(eventType + ".jPlayer", self.options[eventName]), self.options[eventName] = undefined)
                    }), this.require.audio = !1, this.require.video = !1, $.each(this.formats, function(priority, format) {
                        self.require[self.format[format].media] = !0
                    }), this.require.video ? this.options = $.extend(!0, {}, this.optionsVideo, this.options) : this.options = $.extend(!0, {}, this.optionsAudio, this.options), this._setSize(), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow), this.status.noVolume = this._uaBlocklist(this.options.noVolume), $.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners(), this._restrictNativeVideoControls(), this.htmlElement.poster = document.createElement("img"), this.htmlElement.poster.id = this.internal.poster.id, this.htmlElement.poster.onload = function() {
                        self.status.video && !self.status.waitForPlay || self.internal.poster.jq.show()
                    }, this.element.append(this.htmlElement.poster), this.internal.poster.jq = $("#" + this.internal.poster.id), this.internal.poster.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    }), this.internal.poster.jq.hide(), this.internal.poster.jq.bind("click.jPlayer", function() {
                        self._trigger($.jPlayer.event.click)
                    }), this.html.audio.available = !1, this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)), this.html.video.available = !1, this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)), this.flash.available = this._checkForFlash(10.1), this.html.canPlay = {}, this.aurora.canPlay = {}, this.flash.canPlay = {}, $.each(this.formats, function(priority, format) {
                        self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec), self.aurora.canPlay[format] = $.inArray(format, self.aurora.formats) > -1, self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available
                    }), this.html.desired = !1, this.aurora.desired = !1, this.flash.desired = !1, $.each(this.solutions, function(solutionPriority, solution) {
                        if (0 === solutionPriority) self[solution].desired = !0;
                        else {
                            var audioCanPlay = !1,
                                videoCanPlay = !1;
                            $.each(self.formats, function(formatPriority, format) {
                                self[self.solutions[0]].canPlay[format] && ("video" === self.format[format].media ? videoCanPlay = !0 : audioCanPlay = !0)
                            }), self[solution].desired = self.require.audio && !audioCanPlay || self.require.video && !videoCanPlay
                        }
                    }), this.html.support = {}, this.aurora.support = {}, this.flash.support = {}, $.each(this.formats, function(priority, format) {
                        self.html.support[format] = self.html.canPlay[format] && self.html.desired, self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired, self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired
                    }), this.html.used = !1, this.aurora.used = !1, this.flash.used = !1, $.each(this.solutions, function(solutionPriority, solution) {
                        $.each(self.formats, function(formatPriority, format) {
                            if (self[solution].support[format]) return self[solution].used = !0, !1
                        })
                    }), this._resetActive(), this._resetGate(), this._cssSelectorAncestor(this.options.cssSelectorAncestor), this.html.used || this.aurora.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
                        type: $.jPlayer.error.NO_SOLUTION,
                        context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                        message: $.jPlayer.errorMsg.NO_SOLUTION,
                        hint: $.jPlayer.errorHint.NO_SOLUTION
                    }), this.css.jq.noSolution.length && this.css.jq.noSolution.show()), this.flash.used) {
                    var htmlObj, flashVars = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
                    if ($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
                        var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>',
                            paramStr = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + flashVars + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                        htmlObj = document.createElement(objStr);
                        for (var i = 0; i < paramStr.length; i++) htmlObj.appendChild(document.createElement(paramStr[i]))
                    } else {
                        var createParam = function(el, n, v) {
                            var p = document.createElement("param");
                            p.setAttribute("name", n), p.setAttribute("value", v), el.appendChild(p)
                        };
                        htmlObj = document.createElement("object"), htmlObj.setAttribute("id", this.internal.flash.id), htmlObj.setAttribute("name", this.internal.flash.id), htmlObj.setAttribute("data", this.internal.flash.swf), htmlObj.setAttribute("type", "application/x-shockwave-flash"), htmlObj.setAttribute("width", "1"), htmlObj.setAttribute("height", "1"), htmlObj.setAttribute("tabindex", "-1"), createParam(htmlObj, "flashvars", flashVars), createParam(htmlObj, "allowscriptaccess", "always"), createParam(htmlObj, "bgcolor", this.options.backgroundColor), createParam(htmlObj, "wmode", this.options.wmode)
                    }
                    this.element.append(htmlObj), this.internal.flash.jq = $(htmlObj)
                }
                this.html.used && !this.flash.used ? this.status.playbackRateEnabled = this._testPlaybackRate("audio") : this.status.playbackRateEnabled = !1, this._updatePlaybackRate(), this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = $("#" + this.internal.audio.id)), this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = $("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                }) : this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.internal.video.jq.bind("click.jPlayer", function() {
                    self._trigger($.jPlayer.event.click)
                }))), this.aurora.used, this.options.emulateHtml && this._emulateHtmlBridge(), !this.html.used && !this.aurora.used || this.flash.used || setTimeout(function() {
                    self.internal.ready = !0, self.version.flash = "n/a", self._trigger($.jPlayer.event.repeat), self._trigger($.jPlayer.event.ready)
                }, 100), this._updateNativeVideoControls(), this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), $.jPlayer.prototype.count++
            },
            destroy: function() {
                this.clearMedia(), this._removeUiClass(), this.css.jq.currentTime.length && this.css.jq.currentTime.text(""), this.css.jq.duration.length && this.css.jq.duration.text(""), $.each(this.css.jq, function(fn, jq) {
                    jq.length && jq.unbind(".jPlayer")
                }), this.internal.poster.jq.unbind(".jPlayer"), this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer"), this._fullscreenRemoveEventListeners(), this === $.jPlayer.focus && ($.jPlayer.focus = null), this.options.emulateHtml && this._destroyHtmlBridge(), this.element.removeData("jPlayer"), this.element.unbind(".jPlayer"), this.element.empty(), delete this.instances[this.internal.instance]
            },
            destroyRemoved: function() {
                var self = this;
                $.each(this.instances, function(i, element) {
                    self.element !== element && (element.data("jPlayer") || (element.jPlayer("destroy"), delete self.instances[i]))
                })
            },
            enable: function() {},
            disable: function() {},
            _testCanPlayType: function(elem) {
                try {
                    return elem.canPlayType(this.format.mp3.codec), !0
                } catch (err) {
                    return !1
                }
            },
            _testPlaybackRate: function(type) {
                var el;
                type = "string" == typeof type ? type : "audio", el = document.createElement(type);
                try {
                    return "playbackRate" in el && (el.playbackRate = .5, .5 === el.playbackRate)
                } catch (err) {
                    return !1
                }
            },
            _uaBlocklist: function(list) {
                var ua = navigator.userAgent.toLowerCase(),
                    block = !1;
                return $.each(list, function(p, re) {
                    if (re && re.test(ua)) return block = !0, !1
                }), block
            },
            _restrictNativeVideoControls: function() {
                this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullWindow = !0)
            },
            _updateNativeVideoControls: function() {
                this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(),
                    this.internal.video.jq.css({
                        width: this.status.width,
                        height: this.status.height
                    })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                })))
            },
            _addHtmlEventListeners: function(mediaElement, entity) {
                var self = this;
                mediaElement.preload = this.options.preload, mediaElement.muted = this.options.muted, mediaElement.volume = this.options.volume, this.status.playbackRateEnabled && (mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate, mediaElement.playbackRate = this.options.playbackRate), mediaElement.addEventListener("progress", function() {
                    entity.gate && (self.internal.cmdsIgnored && this.readyState > 0 && (self.internal.cmdsIgnored = !1), self._getHtmlStatus(mediaElement), self._updateInterface(), self._trigger($.jPlayer.event.progress))
                }, !1), mediaElement.addEventListener("loadeddata", function() {
                    entity.gate && (self.androidFix.setMedia = !1, self.androidFix.play && (self.androidFix.play = !1, self.play(self.androidFix.time)), self.androidFix.pause && (self.androidFix.pause = !1, self.pause(self.androidFix.time)), self._trigger($.jPlayer.event.loadeddata))
                }, !1), mediaElement.addEventListener("timeupdate", function() {
                    entity.gate && (self._getHtmlStatus(mediaElement), self._updateInterface(), self._trigger($.jPlayer.event.timeupdate))
                }, !1), mediaElement.addEventListener("durationchange", function() {
                    entity.gate && (self._getHtmlStatus(mediaElement), self._updateInterface(), self._trigger($.jPlayer.event.durationchange))
                }, !1), mediaElement.addEventListener("play", function() {
                    entity.gate && (self._updateButtons(!0), self._html_checkWaitForPlay(), self._trigger($.jPlayer.event.play))
                }, !1), mediaElement.addEventListener("playing", function() {
                    entity.gate && (self._updateButtons(!0), self._seeked(), self._trigger($.jPlayer.event.playing))
                }, !1), mediaElement.addEventListener("pause", function() {
                    entity.gate && (self._updateButtons(!1), self._trigger($.jPlayer.event.pause))
                }, !1), mediaElement.addEventListener("waiting", function() {
                    entity.gate && (self._seeking(), self._trigger($.jPlayer.event.waiting))
                }, !1), mediaElement.addEventListener("seeking", function() {
                    entity.gate && (self._seeking(), self._trigger($.jPlayer.event.seeking))
                }, !1), mediaElement.addEventListener("seeked", function() {
                    entity.gate && (self._seeked(), self._trigger($.jPlayer.event.seeked))
                }, !1), mediaElement.addEventListener("volumechange", function() {
                    entity.gate && (self.options.volume = mediaElement.volume, self.options.muted = mediaElement.muted, self._updateMute(), self._updateVolume(), self._trigger($.jPlayer.event.volumechange))
                }, !1), mediaElement.addEventListener("ratechange", function() {
                    entity.gate && (self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate, self.options.playbackRate = mediaElement.playbackRate, self._updatePlaybackRate(), self._trigger($.jPlayer.event.ratechange))
                }, !1), mediaElement.addEventListener("suspend", function() {
                    entity.gate && (self._seeked(), self._trigger($.jPlayer.event.suspend))
                }, !1), mediaElement.addEventListener("ended", function() {
                    entity.gate && ($.jPlayer.browser.webkit || (self.htmlElement.media.currentTime = 0), self.htmlElement.media.pause(), self._updateButtons(!1), self._getHtmlStatus(mediaElement, !0), self._updateInterface(), self._trigger($.jPlayer.event.ended))
                }, !1), mediaElement.addEventListener("error", function() {
                    entity.gate && (self._updateButtons(!1), self._seeked(), self.status.srcSet && (clearTimeout(self.internal.htmlDlyCmdId), self.status.waitForLoad = !0, self.status.waitForPlay = !0, self.status.video && !self.status.nativeVideoControls && self.internal.video.jq.css({
                        width: "0px",
                        height: "0px"
                    }), self._validString(self.status.media.poster) && !self.status.nativeVideoControls && self.internal.poster.jq.show(), self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(), self._error({
                        type: $.jPlayer.error.URL,
                        context: self.status.src,
                        message: $.jPlayer.errorMsg.URL,
                        hint: $.jPlayer.errorHint.URL
                    })))
                }, !1), $.each($.jPlayer.htmlEvent, function(i, eventType) {
                    mediaElement.addEventListener(this, function() {
                        entity.gate && self._trigger($.jPlayer.event[eventType])
                    }, !1)
                })
            },
            _addAuroraEventListeners: function(player, entity) {
                var self = this;
                player.volume = 100 * this.options.volume, player.on("progress", function() {
                    entity.gate && (self.internal.cmdsIgnored && this.readyState > 0 && (self.internal.cmdsIgnored = !1), self._getAuroraStatus(player), self._updateInterface(), self._trigger($.jPlayer.event.progress), player.duration > 0 && self._trigger($.jPlayer.event.timeupdate))
                }, !1), player.on("ready", function() {
                    entity.gate && self._trigger($.jPlayer.event.loadeddata)
                }, !1), player.on("duration", function() {
                    entity.gate && (self._getAuroraStatus(player), self._updateInterface(), self._trigger($.jPlayer.event.durationchange))
                }, !1), player.on("end", function() {
                    entity.gate && (self._updateButtons(!1), self._getAuroraStatus(player, !0), self._updateInterface(), self._trigger($.jPlayer.event.ended))
                }, !1), player.on("error", function() {
                    entity.gate && (self._updateButtons(!1), self._seeked(), self.status.srcSet && (self.status.waitForLoad = !0, self.status.waitForPlay = !0, self.status.video && !self.status.nativeVideoControls && self.internal.video.jq.css({
                        width: "0px",
                        height: "0px"
                    }), self._validString(self.status.media.poster) && !self.status.nativeVideoControls && self.internal.poster.jq.show(), self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(), self._error({
                        type: $.jPlayer.error.URL,
                        context: self.status.src,
                        message: $.jPlayer.errorMsg.URL,
                        hint: $.jPlayer.errorHint.URL
                    })))
                }, !1)
            },
            _getHtmlStatus: function(media, override) {
                var ct = 0,
                    cpa = 0,
                    sp = 0,
                    cpr = 0;
                isFinite(media.duration) && (this.status.duration = media.duration), ct = media.currentTime, cpa = this.status.duration > 0 ? 100 * ct / this.status.duration : 0, "object" == typeof media.seekable && media.seekable.length > 0 ? (sp = this.status.duration > 0 ? 100 * media.seekable.end(media.seekable.length - 1) / this.status.duration : 100, cpr = this.status.duration > 0 ? 100 * media.currentTime / media.seekable.end(media.seekable.length - 1) : 0) : (sp = 100, cpr = cpa), override && (ct = 0, cpr = 0, cpa = 0), this.status.seekPercent = sp, this.status.currentPercentRelative = cpr, this.status.currentPercentAbsolute = cpa, this.status.currentTime = ct, this.status.remaining = this.status.duration - this.status.currentTime, this.status.videoWidth = media.videoWidth, this.status.videoHeight = media.videoHeight, this.status.readyState = media.readyState, this.status.networkState = media.networkState, this.status.playbackRate = media.playbackRate, this.status.ended = media.ended
            },
            _getAuroraStatus: function(player, override) {
                var ct = 0,
                    cpa = 0,
                    sp = 0,
                    cpr = 0;
                this.status.duration = player.duration / 1e3, ct = player.currentTime / 1e3, cpa = this.status.duration > 0 ? 100 * ct / this.status.duration : 0, player.buffered > 0 ? (sp = this.status.duration > 0 ? player.buffered * this.status.duration / this.status.duration : 100, cpr = this.status.duration > 0 ? ct / (player.buffered * this.status.duration) : 0) : (sp = 100, cpr = cpa), override && (ct = 0, cpr = 0, cpa = 0), this.status.seekPercent = sp, this.status.currentPercentRelative = cpr, this.status.currentPercentAbsolute = cpa, this.status.currentTime = ct, this.status.remaining = this.status.duration - this.status.currentTime, this.status.readyState = 4, this.status.networkState = 0, this.status.playbackRate = 1, this.status.ended = !1
            },
            _resetStatus: function() {
                this.status = $.extend({}, this.status, $.jPlayer.prototype.status)
            },
            _trigger: function(eventType, error, warning) {
                var event = $.Event(eventType);
                event.jPlayer = {}, event.jPlayer.version = $.extend({}, this.version), event.jPlayer.options = $.extend(!0, {}, this.options), event.jPlayer.status = $.extend(!0, {}, this.status), event.jPlayer.html = $.extend(!0, {}, this.html), event.jPlayer.aurora = $.extend(!0, {}, this.aurora), event.jPlayer.flash = $.extend(!0, {}, this.flash), error && (event.jPlayer.error = $.extend({}, error)), warning && (event.jPlayer.warning = $.extend({}, warning)), this.element.trigger(event)
            },
            jPlayerFlashEvent: function(eventType, status) {
                if (eventType === $.jPlayer.event.ready)
                    if (this.internal.ready) {
                        if (this.flash.gate) {
                            if (this.status.srcSet) {
                                var currentTime = this.status.currentTime,
                                    paused = this.status.paused;
                                this.setMedia(this.status.media), this.volumeWorker(this.options.volume), currentTime > 0 && (paused ? this.pause(currentTime) : this.play(currentTime))
                            }
                            this._trigger($.jPlayer.event.flashreset)
                        }
                    } else this.internal.ready = !0, this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }), this.version.flash = status.version, this.version.needFlash !== this.version.flash && this._error({
                        type: $.jPlayer.error.VERSION,
                        context: this.version.flash,
                        message: $.jPlayer.errorMsg.VERSION + this.version.flash,
                        hint: $.jPlayer.errorHint.VERSION
                    }), this._trigger($.jPlayer.event.repeat), this._trigger(eventType);
                if (this.flash.gate) switch (eventType) {
                    case $.jPlayer.event.progress:
                    case $.jPlayer.event.timeupdate:
                        this._getFlashStatus(status), this._updateInterface(), this._trigger(eventType);
                        break;
                    case $.jPlayer.event.play:
                        this._seeked(), this._updateButtons(!0), this._trigger(eventType);
                        break;
                    case $.jPlayer.event.pause:
                    case $.jPlayer.event.ended:
                        this._updateButtons(!1), this._trigger(eventType);
                        break;
                    case $.jPlayer.event.click:
                        this._trigger(eventType);
                        break;
                    case $.jPlayer.event.error:
                        this.status.waitForLoad = !0, this.status.waitForPlay = !0, this.status.video && this.internal.flash.jq.css({
                            width: "0px",
                            height: "0px"
                        }), this._validString(this.status.media.poster) && this.internal.poster.jq.show(), this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show(), this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media), this._updateButtons(!1), this._error({
                            type: $.jPlayer.error.URL,
                            context: status.src,
                            message: $.jPlayer.errorMsg.URL,
                            hint: $.jPlayer.errorHint.URL
                        });
                        break;
                    case $.jPlayer.event.seeking:
                        this._seeking(), this._trigger(eventType);
                        break;
                    case $.jPlayer.event.seeked:
                        this._seeked(), this._trigger(eventType);
                        break;
                    case $.jPlayer.event.ready:
                        break;
                    default:
                        this._trigger(eventType)
                }
                return !1
            },
            _getFlashStatus: function(status) {
                this.status.seekPercent = status.seekPercent, this.status.currentPercentRelative = status.currentPercentRelative, this.status.currentPercentAbsolute = status.currentPercentAbsolute, this.status.currentTime = status.currentTime, this.status.duration = status.duration, this.status.remaining = status.duration - status.currentTime, this.status.videoWidth = status.videoWidth, this.status.videoHeight = status.videoHeight, this.status.readyState = 4, this.status.networkState = 0, this.status.playbackRate = 1, this.status.ended = !1
            },
            _updateButtons: function(playing) {
                playing === undefined ? playing = !this.status.paused : this.status.paused = !playing, playing ? this.addStateClass("playing") : this.removeStateClass("playing"), !this.status.noFullWindow && this.options.fullWindow ? this.addStateClass("fullScreen") : this.removeStateClass("fullScreen"), this.options.loop ? this.addStateClass("looped") : this.removeStateClass("looped"), this.css.jq.play.length && this.css.jq.pause.length && (playing ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide())), this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide())), this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
            },
            _updateInterface: function() {
                this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%"), this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
                    width: this.status.currentPercentAbsolute + "%"
                }, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
                this.css.jq.currentTime.length && this._convertTime(this.status.currentTime) !== this.css.jq.currentTime.text() && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
                var durationText = "",
                    duration = this.status.duration,
                    remaining = this.status.remaining;
                this.css.jq.duration.length && ("string" == typeof this.status.media.duration ? durationText = this.status.media.duration : ("number" == typeof this.status.media.duration && (duration = this.status.media.duration, remaining = duration - this.status.currentTime), durationText = this.options.remainingDuration ? (remaining > 0 ? "-" : "") + this._convertTime(remaining) : this._convertTime(duration)), durationText !== this.css.jq.duration.text() && this.css.jq.duration.text(durationText))
            },
            _convertTime: ConvertTime.prototype.time,
            _seeking: function() {
                this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg"), this.addStateClass("seeking")
            },
            _seeked: function() {
                this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg"), this.removeStateClass("seeking")
            },
            _resetGate: function() {
                this.html.audio.gate = !1, this.html.video.gate = !1, this.aurora.gate = !1, this.flash.gate = !1
            },
            _resetActive: function() {
                this.html.active = !1, this.aurora.active = !1, this.flash.active = !1
            },
            _escapeHtml: function(s) {
                return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")
            },
            _qualifyURL: function(url) {
                var el = document.createElement("div");
                return el.innerHTML = '<a href="' + this._escapeHtml(url) + '">x</a>', el.firstChild.href
            },
            _absoluteMediaUrls: function(media) {
                var self = this;
                return $.each(media, function(type, url) {
                    url && self.format[type] && "data:" !== url.substr(0, 5) && (media[type] = self._qualifyURL(url))
                }), media
            },
            addStateClass: function(state) {
                this.ancestorJq.length && this.ancestorJq.addClass(this.options.stateClass[state])
            },
            removeStateClass: function(state) {
                this.ancestorJq.length && this.ancestorJq.removeClass(this.options.stateClass[state])
            },
            setMedia: function(media) {
                var self = this,
                    supported = !1,
                    posterChanged = this.status.media.poster !== media.poster;
                this._resetMedia(), this._resetGate(), this._resetActive(), this.androidFix.setMedia = !1, this.androidFix.play = !1, this.androidFix.pause = !1, media = this._absoluteMediaUrls(media), $.each(this.formats, function(formatPriority, format) {
                    var isVideo = "video" === self.format[format].media;
                    if ($.each(self.solutions, function(solutionPriority, solution) {
                            if (self[solution].support[format] && self._validString(media[format])) {
                                var isHtml = "html" === solution,
                                    isAurora = "aurora" === solution;
                                return isVideo ? (isHtml ? (self.html.video.gate = !0, self._html_setVideo(media), self.html.active = !0) : (self.flash.gate = !0, self._flash_setVideo(media), self.flash.active = !0), self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(), self.status.video = !0) : (isHtml ? (self.html.audio.gate = !0, self._html_setAudio(media), self.html.active = !0, $.jPlayer.platform.android && (self.androidFix.setMedia = !0)) : isAurora ? (self.aurora.gate = !0, self._aurora_setAudio(media), self.aurora.active = !0) : (self.flash.gate = !0, self._flash_setAudio(media), self.flash.active = !0), self.css.jq.videoPlay.length && self.css.jq.videoPlay.hide(), self.status.video = !1), supported = !0, !1
                            }
                        }), supported) return !1
                }), supported ? (this.status.nativeVideoControls && this.html.video.gate || this._validString(media.poster) && (posterChanged ? this.htmlElement.poster.src = media.poster : this.internal.poster.jq.show()), "string" == typeof media.title && (this.css.jq.title.length && this.css.jq.title.html(media.title), this.htmlElement.audio && this.htmlElement.audio.setAttribute("title", media.title), this.htmlElement.video && this.htmlElement.video.setAttribute("title", media.title)), this.status.srcSet = !0, this.status.media = $.extend({}, media), this._updateButtons(!1), this._updateInterface(), this._trigger($.jPlayer.event.setmedia)) : this._error({
                    type: $.jPlayer.error.NO_SUPPORT,
                    context: "{supplied:'" + this.options.supplied + "'}",
                    message: $.jPlayer.errorMsg.NO_SUPPORT,
                    hint: $.jPlayer.errorHint.NO_SUPPORT
                })
            },
            _resetMedia: function() {
                this._resetStatus(), this._updateButtons(!1), this._updateInterface(), this._seeked(), this.internal.poster.jq.hide(), clearTimeout(this.internal.htmlDlyCmdId), this.html.active ? this._html_resetMedia() : this.aurora.active ? this._aurora_resetMedia() : this.flash.active && this._flash_resetMedia()
            },
            clearMedia: function() {
                this._resetMedia(), this.html.active ? this._html_clearMedia() : this.aurora.active ? this._aurora_clearMedia() : this.flash.active && this._flash_clearMedia(), this._resetGate(), this._resetActive()
            },
            load: function() {
                this.status.srcSet ? this.html.active ? this._html_load() : this.aurora.active ? this._aurora_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
            },
            focus: function() {
                this.options.keyEnabled && ($.jPlayer.focus = this)
            },
            play: function(time) {
                "object" == typeof time && this.options.useStateClassSkin && !this.status.paused ? this.pause(time) : (time = "number" == typeof time ? time : NaN, this.status.srcSet ? (this.focus(), this.html.active ? this._html_play(time) : this.aurora.active ? this._aurora_play(time) : this.flash.active && this._flash_play(time)) : this._urlNotSetError("play"))
            },
            videoPlay: function() {
                this.play()
            },
            pause: function(time) {
                time = "number" == typeof time ? time : NaN, this.status.srcSet ? this.html.active ? this._html_pause(time) : this.aurora.active ? this._aurora_pause(time) : this.flash.active && this._flash_pause(time) : this._urlNotSetError("pause")
            },
            tellOthers: function(command, conditions) {
                var self = this,
                    hasConditions = "function" == typeof conditions,
                    args = Array.prototype.slice.call(arguments);
                "string" == typeof command && (hasConditions && args.splice(1, 1), $.jPlayer.prototype.destroyRemoved(), $.each(this.instances, function() {
                    self.element !== this && (hasConditions && !conditions.call(this.data("jPlayer"), self) || this.jPlayer.apply(this, args))
                }))
            },
            pauseOthers: function(time) {
                this.tellOthers("pause", function() {
                    return this.status.srcSet
                }, time)
            },
            stop: function() {
                this.status.srcSet ? this.html.active ? this._html_pause(0) : this.aurora.active ? this._aurora_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
            },
            playHead: function(p) {
                p = this._limitValue(p, 0, 100), this.status.srcSet ? this.html.active ? this._html_playHead(p) : this.aurora.active ? this._aurora_playHead(p) : this.flash.active && this._flash_playHead(p) : this._urlNotSetError("playHead")
            },
            _muted: function(muted) {
                this.mutedWorker(muted), this.options.globalVolume && this.tellOthers("mutedWorker", function() {
                    return this.options.globalVolume
                }, muted)
            },
            mutedWorker: function(muted) {
                this.options.muted = muted, this.html.used && this._html_setProperty("muted", muted), this.aurora.used && this._aurora_mute(muted), this.flash.used && this._flash_mute(muted), this.html.video.gate || this.html.audio.gate || (this._updateMute(muted), this._updateVolume(this.options.volume), this._trigger($.jPlayer.event.volumechange))
            },
            mute: function(mute) {
                "object" == typeof mute && this.options.useStateClassSkin && this.options.muted ? this._muted(!1) : (mute = mute === undefined || !!mute, this._muted(mute))
            },
            unmute: function(unmute) {
                unmute = unmute === undefined || !!unmute, this._muted(!unmute)
            },
            _updateMute: function(mute) {
                mute === undefined && (mute = this.options.muted), mute ? this.addStateClass("muted") : this.removeStateClass("muted"), this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : mute ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
            },
            volume: function(v) {
                this.volumeWorker(v), this.options.globalVolume && this.tellOthers("volumeWorker", function() {
                    return this.options.globalVolume
                }, v)
            },
            volumeWorker: function(v) {
                v = this._limitValue(v, 0, 1), this.options.volume = v, this.html.used && this._html_setProperty("volume", v), this.aurora.used && this._aurora_volume(v), this.flash.used && this._flash_volume(v), this.html.video.gate || this.html.audio.gate || (this._updateVolume(v), this._trigger($.jPlayer.event.volumechange))
            },
            volumeBar: function(e) {
                if (this.css.jq.volumeBar.length) {
                    var $bar = $(e.currentTarget),
                        offset = $bar.offset(),
                        x = e.pageX - offset.left,
                        w = $bar.width(),
                        y = $bar.height() - e.pageY + offset.top,
                        h = $bar.height();
                    this.options.verticalVolume ? this.volume(y / h) : this.volume(x / w)
                }
                this.options.muted && this._muted(!1)
            },
            _updateVolume: function(v) {
                v === undefined && (v = this.options.volume), v = this.options.muted ? 0 : v, this.status.noVolume ? (this.addStateClass("noVolume"), this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.removeStateClass("noVolume"), this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * v + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
            },
            volumeMax: function() {
                this.volume(1), this.options.muted && this._muted(!1)
            },
            _cssSelectorAncestor: function(ancestor) {
                var self = this;
                this.options.cssSelectorAncestor = ancestor, this._removeUiClass(), this.ancestorJq = ancestor ? $(ancestor) : [], ancestor && 1 !== this.ancestorJq.length && this._warning({
                    type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                    context: ancestor,
                    message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                    hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
                }), this._addUiClass(), $.each(this.options.cssSelector, function(fn, cssSel) {
                    self._cssSelector(fn, cssSel)
                }), this._updateInterface(), this._updateButtons(), this._updateAutohide(), this._updateVolume(), this._updateMute()
            },
            _cssSelector: function(fn, cssSel) {
                var self = this;
                if ("string" == typeof cssSel)
                    if ($.jPlayer.prototype.options.cssSelector[fn]) {
                        if (this.css.jq[fn] && this.css.jq[fn].length && this.css.jq[fn].unbind(".jPlayer"), this.options.cssSelector[fn] = cssSel, this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel, this.css.jq[fn] = cssSel ? $(this.css.cs[fn]) : [], this.css.jq[fn].length && this[fn]) {
                            var handler = function(e) {
                                e.preventDefault(), self[fn](e), self.options.autoBlur ? $(this).blur() : $(this).focus()
                            };
                            this.css.jq[fn].bind("click.jPlayer", handler)
                        }
                        cssSel && 1 !== this.css.jq[fn].length && this._warning({
                            type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                            context: this.css.cs[fn],
                            message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
                            hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
                        })
                    } else this._warning({
                        type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
                        context: fn,
                        message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                        hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
                    });
                else this._warning({
                    type: $.jPlayer.warning.CSS_SELECTOR_STRING,
                    context: cssSel,
                    message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                    hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
                })
            },
            duration: function(e) {
                this.options.toggleDuration && (this.options.captureDuration && e.stopPropagation(), this._setOption("remainingDuration", !this.options.remainingDuration))
            },
            seekBar: function(e) {
                if (this.css.jq.seekBar.length) {
                    var $bar = $(e.currentTarget),
                        offset = $bar.offset(),
                        x = e.pageX - offset.left,
                        w = $bar.width(),
                        p = 100 * x / w;
                    this.playHead(p)
                }
            },
            playbackRate: function(pbr) {
                this._setOption("playbackRate", pbr)
            },
            playbackRateBar: function(e) {
                if (this.css.jq.playbackRateBar.length) {
                    var ratio, pbr, $bar = $(e.currentTarget),
                        offset = $bar.offset(),
                        x = e.pageX - offset.left,
                        w = $bar.width(),
                        y = $bar.height() - e.pageY + offset.top,
                        h = $bar.height();
                    ratio = this.options.verticalPlaybackRate ? y / h : x / w, pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate, this.playbackRate(pbr)
                }
            },
            _updatePlaybackRate: function() {
                var pbr = this.options.playbackRate,
                    ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
                this.status.playbackRateEnabled ? (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.show(), this.css.jq.playbackRateBarValue.length && (this.css.jq.playbackRateBarValue.show(), this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](100 * ratio + "%"))) : (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.hide(), this.css.jq.playbackRateBarValue.length && this.css.jq.playbackRateBarValue.hide())
            },
            repeat: function(event) {
                "object" == typeof event && this.options.useStateClassSkin && this.options.loop ? this._loop(!1) : this._loop(!0)
            },
            repeatOff: function() {
                this._loop(!1)
            },
            _loop: function(loop) {
                this.options.loop !== loop && (this.options.loop = loop, this._updateButtons(), this._trigger($.jPlayer.event.repeat))
            },
            option: function(key, value) {
                var options = key;
                if (0 === arguments.length) return $.extend(!0, {}, this.options);
                if ("string" == typeof key) {
                    var keys = key.split(".");
                    if (value === undefined) {
                        for (var opt = $.extend(!0, {}, this.options), i = 0; i < keys.length; i++) {
                            if (opt[keys[i]] === undefined) return this._warning({
                                type: $.jPlayer.warning.OPTION_KEY,
                                context: key,
                                message: $.jPlayer.warningMsg.OPTION_KEY,
                                hint: $.jPlayer.warningHint.OPTION_KEY
                            }), undefined;
                            opt = opt[keys[i]]
                        }
                        return opt
                    }
                    options = {};
                    for (var opts = options, j = 0; j < keys.length; j++) j < keys.length - 1 ? (opts[keys[j]] = {}, opts = opts[keys[j]]) : opts[keys[j]] = value
                }
                return this._setOptions(options), this
            },
            _setOptions: function(options) {
                var self = this;
                return $.each(options, function(key, value) {
                    self._setOption(key, value)
                }), this
            },
            _setOption: function(key, value) {
                var self = this;
                switch (key) {
                    case "volume":
                        this.volume(value);
                        break;
                    case "muted":
                        this._muted(value);
                        break;
                    case "globalVolume":
                        this.options[key] = value;
                        break;
                    case "cssSelectorAncestor":
                        this._cssSelectorAncestor(value);
                        break;
                    case "cssSelector":
                        $.each(value, function(fn, cssSel) {
                            self._cssSelector(fn, cssSel)
                        });
                        break;
                    case "playbackRate":
                        this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate), this.html.used && this._html_setProperty("playbackRate", value), this._updatePlaybackRate();
                        break;
                    case "defaultPlaybackRate":
                        this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate), this.html.used && this._html_setProperty("defaultPlaybackRate", value), this._updatePlaybackRate();
                        break;
                    case "minPlaybackRate":
                        this.options[key] = value = this._limitValue(value, .1, this.options.maxPlaybackRate - .1), this._updatePlaybackRate();
                        break;
                    case "maxPlaybackRate":
                        this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + .1, 16), this._updatePlaybackRate();
                        break;
                    case "fullScreen":
                        if (this.options[key] !== value) {
                            var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                            (!wkv || wkv && !this.status.waitForPlay) && (wkv || (this.options[key] = value), value ? this._requestFullscreen() : this._exitFullscreen(), wkv || this._setOption("fullWindow", value))
                        }
                        break;
                    case "fullWindow":
                        this.options[key] !== value && (this._removeUiClass(), this.options[key] = value, this._refreshSize());
                        break;
                    case "size":
                        this.options.fullWindow || this.options[key].cssClass === value.cssClass || this._removeUiClass(), this.options[key] = $.extend({}, this.options[key], value), this._refreshSize();
                        break;
                    case "sizeFull":
                        this.options.fullWindow && this.options[key].cssClass !== value.cssClass && this._removeUiClass(), this.options[key] = $.extend({}, this.options[key], value), this._refreshSize();
                        break;
                    case "autohide":
                        this.options[key] = $.extend({}, this.options[key], value), this._updateAutohide();
                        break;
                    case "loop":
                        this._loop(value);
                        break;
                    case "remainingDuration":
                        this.options[key] = value, this._updateInterface();
                        break;
                    case "toggleDuration":
                        this.options[key] = value;
                        break;
                    case "nativeVideoControls":
                        this.options[key] = $.extend({}, this.options[key], value), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this._restrictNativeVideoControls(), this._updateNativeVideoControls();
                        break;
                    case "noFullWindow":
                        this.options[key] = $.extend({}, this.options[key], value), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow), this._restrictNativeVideoControls(), this._updateButtons();
                        break;
                    case "noVolume":
                        this.options[key] = $.extend({}, this.options[key], value), this.status.noVolume = this._uaBlocklist(this.options.noVolume), this._updateVolume(), this._updateMute();
                        break;
                    case "emulateHtml":
                        this.options[key] !== value && (this.options[key] = value, value ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
                        break;
                    case "timeFormat":
                        this.options[key] = $.extend({}, this.options[key], value);
                        break;
                    case "keyEnabled":
                        this.options[key] = value, value || this !== $.jPlayer.focus || ($.jPlayer.focus = null);
                        break;
                    case "keyBindings":
                        this.options[key] = $.extend(!0, {}, this.options[key], value);
                        break;
                    case "audioFullScreen":
                    case "autoBlur":
                        this.options[key] = value
                }
                return this
            },
            _refreshSize: function() {
                this._setSize(), this._addUiClass(), this._updateSize(), this._updateButtons(), this._updateAutohide(), this._trigger($.jPlayer.event.resize)
            },
            _setSize: function() {
                this.options.fullWindow ? (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass), this.element.css({
                    width: this.status.width,
                    height: this.status.height
                })
            },
            _addUiClass: function() {
                this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
            },
            _removeUiClass: function() {
                this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
            },
            _updateSize: function() {
                this.internal.poster.jq.css({
                    width: this.status.width,
                    height: this.status.height
                }), !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })
            },
            _updateAutohide: function() {
                var self = this,
                    eventType = "mousemove.jPlayer.jPlayerAutohide",
                    handler = function(event) {
                        var deltaX, deltaY, moved = !1;
                        void 0 !== self.internal.mouse ? (deltaX = self.internal.mouse.x - event.pageX, deltaY = self.internal.mouse.y - event.pageY, moved = Math.floor(deltaX) > 0 || Math.floor(deltaY) > 0) : moved = !0, self.internal.mouse = {
                            x: event.pageX,
                            y: event.pageY
                        }, moved && self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
                            clearTimeout(self.internal.autohideId), self.internal.autohideId = setTimeout(function() {
                                self.css.jq.gui.fadeOut(self.options.autohide.fadeOut)
                            }, self.options.autohide.hold)
                        })
                    };
                this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), delete this.internal.mouse, this.element.unbind(".jPlayerAutohide"), this.css.jq.gui.unbind(".jPlayerAutohide"), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind(eventType, handler), this.css.jq.gui.bind(eventType, handler), this.css.jq.gui.hide()) : this.css.jq.gui.show())
            },
            fullScreen: function(event) {
                "object" == typeof event && this.options.useStateClassSkin && this.options.fullScreen ? this._setOption("fullScreen", !1) : this._setOption("fullScreen", !0)
            },
            restoreScreen: function() {
                this._setOption("fullScreen", !1)
            },
            _fullscreenAddEventListeners: function() {
                var self = this,
                    fs = $.jPlayer.nativeFeatures.fullscreen;
                fs.api.fullscreenEnabled && fs.event.fullscreenchange && ("function" != typeof this.internal.fullscreenchangeHandler && (this.internal.fullscreenchangeHandler = function() {
                    self._fullscreenchange()
                }), document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
            },
            _fullscreenRemoveEventListeners: function() {
                var fs = $.jPlayer.nativeFeatures.fullscreen;
                this.internal.fullscreenchangeHandler && document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
            },
            _fullscreenchange: function() {
                this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() && this._setOption("fullScreen", !1)
            },
            _requestFullscreen: function() {
                var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
                    fs = $.jPlayer.nativeFeatures.fullscreen;
                fs.used.webkitVideo && (e = this.htmlElement.video), fs.api.fullscreenEnabled && fs.api.requestFullscreen(e)
            },
            _exitFullscreen: function() {
                var e, fs = $.jPlayer.nativeFeatures.fullscreen;
                fs.used.webkitVideo && (e = this.htmlElement.video), fs.api.fullscreenEnabled && fs.api.exitFullscreen(e)
            },
            _html_initMedia: function(media) {
                var $media = $(this.htmlElement.media).empty();
                $.each(media.track || [], function(i, v) {
                    var track = document.createElement("track");
                    track.setAttribute("kind", v.kind ? v.kind : ""), track.setAttribute("src", v.src ? v.src : ""), track.setAttribute("srclang", v.srclang ? v.srclang : ""), track.setAttribute("label", v.label ? v.label : ""), v.def && track.setAttribute("default", v.def), $media.append(track)
                }), this.htmlElement.media.src = this.status.src, "none" !== this.options.preload && this._html_load(), this._trigger($.jPlayer.event.timeupdate)
            },
            _html_setFormat: function(media) {
                var self = this;
                $.each(this.formats, function(priority, format) {
                    if (self.html.support[format] && media[format]) return self.status.src = media[format], self.status.format[format] = !0, self.status.formatType = format, !1
                })
            },
            _html_setAudio: function(media) {
                this._html_setFormat(media), this.htmlElement.media = this.htmlElement.audio, this._html_initMedia(media)
            },
            _html_setVideo: function(media) {
                this._html_setFormat(media), this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : ""), this.htmlElement.media = this.htmlElement.video, this._html_initMedia(media)
            },
            _html_resetMedia: function() {
                this.htmlElement.media && (this.htmlElement.media.id !== this.internal.video.id || this.status.nativeVideoControls || this.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), this.htmlElement.media.pause())
            },
            _html_clearMedia: function() {
                this.htmlElement.media && (this.htmlElement.media.src = "about:blank", this.htmlElement.media.load())
            },
            _html_load: function() {
                this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load()), clearTimeout(this.internal.htmlDlyCmdId)
            },
            _html_play: function(time) {
                var self = this,
                    media = this.htmlElement.media;
                if (this.androidFix.pause = !1, this._html_load(), this.androidFix.setMedia) this.androidFix.play = !0, this.androidFix.time = time;
                else if (isNaN(time)) media.play();
                else {
                    this.internal.cmdsIgnored && media.play();
                    try {
                        if (media.seekable && !("object" == typeof media.seekable && media.seekable.length > 0)) throw 1;
                        media.currentTime = time, media.play()
                    } catch (err) {
                        return void(this.internal.htmlDlyCmdId = setTimeout(function() {
                            self.play(time)
                        }, 250))
                    }
                }
                this._html_checkWaitForPlay()
            },
            _html_pause: function(time) {
                var self = this,
                    media = this.htmlElement.media;
                if (this.androidFix.play = !1, time > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId), media.pause(), this.androidFix.setMedia) this.androidFix.pause = !0, this.androidFix.time = time;
                else if (!isNaN(time)) try {
                    if (media.seekable && !("object" == typeof media.seekable && media.seekable.length > 0)) throw 1;
                    media.currentTime = time
                } catch (err) {
                    return void(this.internal.htmlDlyCmdId = setTimeout(function() {
                        self.pause(time)
                    }, 250))
                }
                time > 0 && this._html_checkWaitForPlay()
            },
            _html_playHead: function(percent) {
                var self = this,
                    media = this.htmlElement.media;
                this._html_load();
                try {
                    if ("object" == typeof media.seekable && media.seekable.length > 0) media.currentTime = percent * media.seekable.end(media.seekable.length - 1) / 100;
                    else {
                        if (!(media.duration > 0) || isNaN(media.duration)) throw "e";
                        media.currentTime = percent * media.duration / 100
                    }
                } catch (err) {
                    return void(this.internal.htmlDlyCmdId = setTimeout(function() {
                        self.playHead(percent)
                    }, 250))
                }
                this.status.waitForLoad || this._html_checkWaitForPlay()
            },
            _html_checkWaitForPlay: function() {
                this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })))
            },
            _html_setProperty: function(property, value) {
                this.html.audio.available && (this.htmlElement.audio[property] = value), this.html.video.available && (this.htmlElement.video[property] = value)
            },
            _aurora_setAudio: function(media) {
                var self = this;
                $.each(this.formats, function(priority, format) {
                    if (self.aurora.support[format] && media[format]) return self.status.src = media[format], self.status.format[format] = !0, self.status.formatType = format, !1
                }), this.aurora.player = new AV.Player.fromURL(this.status.src), this._addAuroraEventListeners(this.aurora.player, this.aurora), "auto" === this.options.preload && (this._aurora_load(), this.status.waitForLoad = !1)
            },
            _aurora_resetMedia: function() {
                this.aurora.player && this.aurora.player.stop()
            },
            _aurora_clearMedia: function() {},
            _aurora_load: function() {
                this.status.waitForLoad && (this.status.waitForLoad = !1, this.aurora.player.preload())
            },
            _aurora_play: function(time) {
                this.status.waitForLoad || isNaN(time) || this.aurora.player.seek(time), this.aurora.player.playing || this.aurora.player.play(), this.status.waitForLoad = !1, this._aurora_checkWaitForPlay(), this._updateButtons(!0), this._trigger($.jPlayer.event.play)
            },
            _aurora_pause: function(time) {
                isNaN(time) || this.aurora.player.seek(1e3 * time), this.aurora.player.pause(), time > 0 && this._aurora_checkWaitForPlay(), this._updateButtons(!1), this._trigger($.jPlayer.event.pause)
            },
            _aurora_playHead: function(percent) {
                this.aurora.player.duration > 0 && this.aurora.player.seek(percent * this.aurora.player.duration / 100), this.status.waitForLoad || this._aurora_checkWaitForPlay()
            },
            _aurora_checkWaitForPlay: function() {
                this.status.waitForPlay && (this.status.waitForPlay = !1)
            },
            _aurora_volume: function(v) {
                this.aurora.player.volume = 100 * v
            },
            _aurora_mute: function(m) {
                m ? (this.aurora.properties.lastvolume = this.aurora.player.volume, this.aurora.player.volume = 0) : this.aurora.player.volume = this.aurora.properties.lastvolume, this.aurora.properties.muted = m
            },
            _flash_setAudio: function(media) {
                var self = this;
                try {
                    $.each(this.formats, function(priority, format) {
                        if (self.flash.support[format] && media[format]) {
                            switch (format) {
                                case "m4a":
                                case "fla":
                                    self._getMovie().fl_setAudio_m4a(media[format]);
                                    break;
                                case "mp3":
                                    self._getMovie().fl_setAudio_mp3(media[format]);
                                    break;
                                case "rtmpa":
                                    self._getMovie().fl_setAudio_rtmp(media[format])
                            }
                            return self.status.src = media[format], self.status.format[format] = !0, self.status.formatType = format, !1
                        }
                    }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
                } catch (err) {
                    this._flashError(err)
                }
            },
            _flash_setVideo: function(media) {
                var self = this;
                try {
                    $.each(this.formats, function(priority, format) {
                        if (self.flash.support[format] && media[format]) {
                            switch (format) {
                                case "m4v":
                                case "flv":
                                    self._getMovie().fl_setVideo_m4v(media[format]);
                                    break;
                                case "rtmpv":
                                    self._getMovie().fl_setVideo_rtmp(media[format])
                            }
                            return self.status.src = media[format], self.status.format[format] = !0, self.status.formatType = format, !1
                        }
                    }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
                } catch (err) {
                    this._flashError(err)
                }
            },
            _flash_resetMedia: function() {
                this.internal.flash.jq.css({
                    width: "0px",
                    height: "0px"
                }), this._flash_pause(NaN)
            },
            _flash_clearMedia: function() {
                try {
                    this._getMovie().fl_clearMedia()
                } catch (err) {
                    this._flashError(err)
                }
            },
            _flash_load: function() {
                try {
                    this._getMovie().fl_load()
                } catch (err) {
                    this._flashError(err)
                }
                this.status.waitForLoad = !1
            },
            _flash_play: function(time) {
                try {
                    this._getMovie().fl_play(time)
                } catch (err) {
                    this._flashError(err)
                }
                this.status.waitForLoad = !1, this._flash_checkWaitForPlay()
            },
            _flash_pause: function(time) {
                try {
                    this._getMovie().fl_pause(time)
                } catch (err) {
                    this._flashError(err)
                }
                time > 0 && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
            },
            _flash_playHead: function(p) {
                try {
                    this._getMovie().fl_play_head(p)
                } catch (err) {
                    this._flashError(err)
                }
                this.status.waitForLoad || this._flash_checkWaitForPlay()
            },
            _flash_checkWaitForPlay: function() {
                this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
                    width: this.status.width,
                    height: this.status.height
                })))
            },
            _flash_volume: function(v) {
                try {
                    this._getMovie().fl_volume(v)
                } catch (err) {
                    this._flashError(err)
                }
            },
            _flash_mute: function(m) {
                try {
                    this._getMovie().fl_mute(m)
                } catch (err) {
                    this._flashError(err)
                }
            },
            _getMovie: function() {
                return document[this.internal.flash.id]
            },
            _getFlashPluginVersion: function() {
                var flash, version = 0;
                if (window.ActiveXObject) try {
                    if (flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                        var v = flash.GetVariable("$version");
                        v && (v = v.split(" ")[1].split(","), version = parseInt(v[0], 10) + "." + parseInt(v[1], 10))
                    }
                } catch (e) {} else navigator.plugins && navigator.mimeTypes.length > 0 && (flash = navigator.plugins["Shockwave Flash"]) && (version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1"));
                return 1 * version
            },
            _checkForFlash: function(version) {
                var flashOk = !1;
                return this._getFlashPluginVersion() >= version && (flashOk = !0), flashOk
            },
            _validString: function(url) {
                return url && "string" == typeof url
            },
            _limitValue: function(value, min, max) {
                return value < min ? min : value > max ? max : value
            },
            _urlNotSetError: function(context) {
                this._error({
                    type: $.jPlayer.error.URL_NOT_SET,
                    context: context,
                    message: $.jPlayer.errorMsg.URL_NOT_SET,
                    hint: $.jPlayer.errorHint.URL_NOT_SET
                })
            },
            _flashError: function(error) {
                var errorType;
                errorType = this.internal.ready ? "FLASH_DISABLED" : "FLASH", this._error({
                    type: $.jPlayer.error[errorType],
                    context: this.internal.flash.swf,
                    message: $.jPlayer.errorMsg[errorType] + error.message,
                    hint: $.jPlayer.errorHint[errorType]
                }), this.internal.flash.jq.css({
                    width: "1px",
                    height: "1px"
                })
            },
            _error: function(error) {
                this._trigger($.jPlayer.event.error, error), this.options.errorAlerts && this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context)
            },
            _warning: function(warning) {
                this._trigger($.jPlayer.event.warning, undefined, warning), this.options.warningAlerts && this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context)
            },
            _alert: function(message) {
                var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + message;
                this.options.consoleAlerts ? window.console && window.console.log && window.console.log(msg) : alert(msg)
            },
            _emulateHtmlBridge: function() {
                var self = this;
                $.each($.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
                    self.internal.domNode[name] = function(arg) {
                        self[name](arg)
                    }
                }), $.each($.jPlayer.event, function(eventName, eventType) {
                    var nativeEvent = !0;
                    $.each($.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
                        if (name === eventName) return nativeEvent = !1, !1
                    }), nativeEvent && self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() {
                        self._emulateHtmlUpdate();
                        var domEvent = document.createEvent("Event");
                        domEvent.initEvent(eventName, !1, !0), self.internal.domNode.dispatchEvent(domEvent)
                    })
                })
            },
            _emulateHtmlUpdate: function() {
                var self = this;
                $.each($.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
                    self.internal.domNode[name] = self.status[name]
                }), $.each($.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
                    self.internal.domNode[name] = self.options[name]
                })
            },
            _destroyHtmlBridge: function() {
                var self = this;
                this.element.unbind(".jPlayerHtml");
                var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
                $.each(emulated.split(/\s+/g), function(i, name) {
                    delete self.internal.domNode[name]
                })
            }
        }, $.jPlayer.error = {
            FLASH: "e_flash",
            FLASH_DISABLED: "e_flash_disabled",
            NO_SOLUTION: "e_no_solution",
            NO_SUPPORT: "e_no_support",
            URL: "e_url",
            URL_NOT_SET: "e_url_not_set",
            VERSION: "e_version"
        }, $.jPlayer.errorMsg = {
            FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
            FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
            NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
            NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
            URL: "Media URL could not be loaded.",
            URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
            VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found "
        }, $.jPlayer.errorHint = {
            FLASH: "Check your swfPath option and that Jplayer.swf is there.",
            FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
            NO_SOLUTION: "Review the jPlayer options: support and supplied.",
            NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
            URL: "Check media URL is valid.",
            URL_NOT_SET: "Use setMedia() to set the media URL.",
            VERSION: "Update jPlayer files."
        }, $.jPlayer.warning = {
            CSS_SELECTOR_COUNT: "e_css_selector_count",
            CSS_SELECTOR_METHOD: "e_css_selector_method",
            CSS_SELECTOR_STRING: "e_css_selector_string",
            OPTION_KEY: "e_option_key"
        }, $.jPlayer.warningMsg = {
            CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
            CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
            CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
            OPTION_KEY: "The option requested in jPlayer('option') is undefined."
        }, $.jPlayer.warningHint = {
            CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
            CSS_SELECTOR_METHOD: "Check your method name.",
            CSS_SELECTOR_STRING: "Check your css selector is a string.",
            OPTION_KEY: "Check your option name."
        }
    }),
    function(factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory : factory(jQuery)
    }(function($) {
        function handler(event) {
            var orgEvent = event || window.event,
                args = slice.call(arguments, 1),
                delta = 0,
                deltaX = 0,
                deltaY = 0,
                absDelta = 0,
                offsetX = 0,
                offsetY = 0;
            if (event = $.event.fix(orgEvent), event.type = "mousewheel", "detail" in orgEvent && (deltaY = -1 * orgEvent.detail), "wheelDelta" in orgEvent && (deltaY = orgEvent.wheelDelta), "wheelDeltaY" in orgEvent && (deltaY = orgEvent.wheelDeltaY), "wheelDeltaX" in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX), "axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaX = -1 * deltaY, deltaY = 0), delta = 0 === deltaY ? deltaX : deltaY, "deltaY" in orgEvent && (deltaY = -1 * orgEvent.deltaY, delta = deltaY), "deltaX" in orgEvent && (deltaX = orgEvent.deltaX, 0 === deltaY && (delta = -1 * deltaX)), 0 !== deltaY || 0 !== deltaX) {
                if (1 === orgEvent.deltaMode) {
                    var lineHeight = $.data(this, "mousewheel-line-height");
                    delta *= lineHeight, deltaY *= lineHeight, deltaX *= lineHeight
                } else if (2 === orgEvent.deltaMode) {
                    var pageHeight = $.data(this, "mousewheel-page-height");
                    delta *= pageHeight, deltaY *= pageHeight, deltaX *= pageHeight
                }
                if (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDelta || absDelta < lowestDelta) && (lowestDelta = absDelta, shouldAdjustOldDeltas(orgEvent, absDelta) && (lowestDelta /= 40)), shouldAdjustOldDeltas(orgEvent, absDelta) && (delta /= 40, deltaX /= 40, deltaY /= 40), delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta), deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta), deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta), special.settings.normalizeOffset && this.getBoundingClientRect) {
                    var boundingRect = this.getBoundingClientRect();
                    offsetX = event.clientX - boundingRect.left, offsetY = event.clientY - boundingRect.top
                }
                return event.deltaX = deltaX, event.deltaY = deltaY, event.deltaFactor = lowestDelta, event.offsetX = offsetX, event.offsetY = offsetY, event.deltaMode = 0, args.unshift(event, delta, deltaX, deltaY), nullLowestDeltaTimeout && clearTimeout(nullLowestDeltaTimeout), nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200), ($.event.dispatch || $.event.handle).apply(this, args)
            }
        }

        function nullLowestDelta() {
            lowestDelta = null
        }

        function shouldAdjustOldDeltas(orgEvent, absDelta) {
            return special.settings.adjustOldDeltas && "mousewheel" === orgEvent.type && absDelta % 120 == 0
        }
        var nullLowestDeltaTimeout, lowestDelta, toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            slice = Array.prototype.slice;
        if ($.event.fixHooks)
            for (var i = toFix.length; i;) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        var special = $.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var i = toBind.length; i;) this.addEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = handler;
                $.data(this, "mousewheel-line-height", special.getLineHeight(this)), $.data(this, "mousewheel-page-height", special.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var i = toBind.length; i;) this.removeEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = null;
                $.removeData(this, "mousewheel-line-height"), $.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(elem) {
                var $elem = $(elem),
                    $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
                return $parent.length || ($parent = $("body")), parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16
            },
            getPageHeight: function(elem) {
                return $(elem).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
            },
            unmousewheel: function(fn) {
                return this.unbind("mousewheel", fn)
            }
        })
    }),
    function(e) {
        "use strict";
        e.srSmoothscroll = function(t) {
            var n = e.extend({
                    step: 55,
                    speed: 400,
                    ease: "swing",
                    target: e("body"),
                    container: e(window)
                }, t || {}),
                o = n.container,
                r = 0,
                i = n.step,
                s = o.height(),
                a = !1,
                c = "body" == n.target.selector ? -1 !== navigator.userAgent.indexOf("AppleWebKit") ? n.target : e("html") : o;
            n.target.mousewheel(function(e, t) {
                return a = !0, r = 0 > t ? r + s >= n.target.outerHeight(!0) ? r : r += i : 0 >= r ? 0 : r -= i, c.stop().animate({
                    scrollTop: r
                }, n.speed, n.ease, function() {
                    a = !1
                }), !1
            }), o.on("resize", function() {
                s = o.height()
            }).on("scroll", function() {
                a || (r = o.scrollTop())
            })
        }
    }(jQuery);
