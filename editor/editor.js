var COMPILED = true, goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.getObjectByName(a) && !goog.implicitNamespaces_[a]) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    for(var b = a;b = b.substring(0, b.lastIndexOf("."));) {
      goog.implicitNamespaces_[b] = true
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
if(!COMPILED) {
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = true
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = true
    }
  }
};
goog.require = function(a) {
  if(!COMPILED && !goog.getObjectByName(a)) {
    var b = goog.getPathFromDeps_(a);
    if(b) {
      goog.included_[b] = true, goog.writeScripts_()
    }else {
      throw a = "goog.require could not find: " + a, goog.global.console && goog.global.console.error(a), Error(a);
    }
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    return a.instance_ || (a.instance_ = new a)
  }
};
if(!COMPILED) {
  goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return typeof a != "undefined" && "write" in a
  }, goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH
    }else {
      if(goog.inHtmlDocument_()) {
        for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;b >= 0;--b) {
          var c = a[b].src, d = c.lastIndexOf("?"), d = d == -1 ? c.length : d;
          if(c.substr(d - 7, 7) == "base.js") {
            goog.basePath = c.substr(0, d - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(a) {
    var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = true)
  }, goog.writeScriptTag_ = function(a) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), true) : false
  }, goog.writeScripts_ = function() {
    function a(e) {
      if(!(e in d.written)) {
        if(!(e in d.visited) && (d.visited[e] = true, e in d.requires)) {
          for(var g in d.requires[e]) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              if(!goog.getObjectByName(g)) {
                throw Error("Undefined nameToPath for " + g);
              }
            }
          }
        }
        e in c || (c[e] = true, b.push(e))
      }
    }
    var b = [], c = {}, d = goog.dependencies_, e;
    for(e in goog.included_) {
      d.written[e] || a(e)
    }
    for(e = 0;e < b.length;e++) {
      if(b[e]) {
        goog.importScript_(goog.basePath + b[e])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
  var b = typeof a;
  if(b == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }else {
        if(a instanceof Object) {
          return b
        }
      }
      var c = Object.prototype.toString.call(a);
      if(c == "[object Window]") {
        return"object"
      }
      if(c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(b == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return b
};
goog.propertyIsEnumerableCustom_ = function(a, b) {
  if(b in a) {
    for(var c in a) {
      if(c == b && Object.prototype.hasOwnProperty.call(a, b)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(a, b) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, b) : goog.propertyIsEnumerableCustom_(a, b)
};
goog.isDef = function(a) {
  return a !== void 0
};
goog.isNull = function(a) {
  return a === null
};
goog.isDefAndNotNull = function(a) {
  return a != null
};
goog.isArray = function(a) {
  return goog.typeOf(a) == "array"
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return b == "array" || b == "object" && typeof a.length == "number"
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && typeof a.getFullYear == "function"
};
goog.isString = function(a) {
  return typeof a == "string"
};
goog.isBoolean = function(a) {
  return typeof a == "boolean"
};
goog.isNumber = function(a) {
  return typeof a == "number"
};
goog.isFunction = function(a) {
  return goog.typeOf(a) == "function"
};
goog.isObject = function(a) {
  a = goog.typeOf(a);
  return a == "object" || a == "array" || a == "function"
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if(b == "object" || b == "array") {
    if(a.clone) {
      return a.clone()
    }
    var b = b == "array" ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  var d = b || goog.global;
  if(arguments.length > 2) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var b = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(b, e);
      return a.apply(d, b)
    }
  }else {
    return function() {
      return a.apply(d, arguments)
    }
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;"), typeof goog.global._et_ != "undefined" ? (delete goog.global._et_, goog.evalWorksForGlobals_ = true) : goog.evalWorksForGlobals_ = false
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = false;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d;
  d = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? c : function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  } : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = false, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = true
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
  this.stack = Error().stack || "";
  if(a) {
    this.message = String(a)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return a.lastIndexOf(b, 0) == 0
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return c >= 0 && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return goog.string.caseInsensitiveCompare(b, a.substr(0, b.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length)) == 0
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return a == " "
};
goog.string.isUnicodeChar = function(a) {
  return a.length == 1 && a >= " " && a <= "~" || a >= "\u0080" && a <= "\ufffd"
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      c = parseInt(g, 10);
      return!isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
  a = String(a);
  return!goog.string.encodeUriRegExp_.test(a) ? encodeURIComponent(a) : a
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(a)) {
      return a
    }
    a.indexOf("&") != -1 && (a = a.replace(goog.string.amperRe_, "&amp;"));
    a.indexOf("<") != -1 && (a = a.replace(goog.string.ltRe_, "&lt;"));
    a.indexOf(">") != -1 && (a = a.replace(goog.string.gtRe_, "&gt;"));
    a.indexOf('"') != -1 && (a = a.replace(goog.string.quotRe_, "&quot;"));
    return a
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global && !goog.string.contains(a, "<") ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = goog.global.document.createElement("div");
  b.innerHTML = "<pre>x" + a + "</pre>";
  if(b.firstChild[goog.string.NORMALIZE_FN_]) {
    b.firstChild[goog.string.NORMALIZE_FN_]()
  }
  a = b.firstChild.firstChild.nodeValue.slice(1);
  b.innerHTML = "";
  return goog.string.canonicalizeNewlines(a)
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(c.charAt(0) == "#") {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = c == 1 ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, d += b % 2, a = a.substring(0, d) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }else {
    for(var b = ['"'], c = 0;c < a.length;c++) {
      var d = a.charAt(c), e = d.charCodeAt(0);
      b[c + 1] = goog.string.specialEscapeChars_[d] || (e > 31 && e < 127 ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
  }
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(c > 31 && c < 127) {
    b = a
  }else {
    if(c < 256) {
      if(b = "\\x", c < 16 || c > 256) {
        b += "0"
      }
    }else {
      b = "\\u", c < 4096 && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = true
  }
  return b
};
goog.string.contains = function(a, b) {
  return a.indexOf(b) != -1
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  b >= 0 && b < a.length && c > 0 && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  if(c == -1) {
    c = a.length
  }
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return a == null ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;c == 0 && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var l = j.exec(h) || ["", "", ""], m = k.exec(i) || ["", "", ""];
      if(l[0].length == 0 && m[0].length == 0) {
        break
      }
      var c = l[1].length == 0 ? 0 : parseInt(l[1], 10), o = m[1].length == 0 ? 0 : parseInt(m[1], 10), c = goog.string.compareElements_(c, o) || goog.string.compareElements_(l[2].length == 0, m[2].length == 0) || goog.string.compareElements_(l[2], m[2])
    }while(c == 0)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  if(a < b) {
    return-1
  }else {
    if(a > b) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return b == 0 && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(a) {
  return goog.string.toCamelCaseCache_[a] || (goog.string.toCamelCaseCache_[a] = String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(a) {
  return goog.string.toSelectorCaseCache_[a] || (goog.string.toSelectorCaseCache_[a] = String(a).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    e += ": " + c;
    var f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == null ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || b.length != 1 ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, c == null ? a.length - 1 : c)
} : function(a, b, c) {
  c = c == null ? a.length - 1 : c;
  c < 0 && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || b.length != 1 ? -1 : a.lastIndexOf(b, c)
  }
  for(;c >= 0;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  var d = a.length, e = goog.isString(a) ? a.split("") : a;
  for(d -= 1;d >= 0;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return false
    }
  }
  return true
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return b < 0 ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return b < 0 ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  var d = a.length, e = goog.isString(a) ? a.split("") : a;
  for(d -= 1;d >= 0;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return goog.array.indexOf(a, b) >= 0
};
goog.array.isEmpty = function(a) {
  return a.length == 0
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;b >= 0;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  arguments.length == 2 || (d = goog.array.indexOf(a, c)) < 0 ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = c >= 0) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length == 1
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return b >= 0 ? (goog.array.removeAt(a, b), true) : false
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
  if(goog.isArray(a)) {
    return goog.array.concat(a)
  }else {
    for(var b = [], c = 0, d = a.length;c < d;c++) {
      b[c] = a[c]
    }
    return b
  }
};
goog.array.toArray = function(a) {
  return goog.isArray(a) ? goog.array.concat(a) : goog.array.clone(a)
};
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(a.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(a.length != null);
  return arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = true, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, false, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, true, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    j > 0 ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(a.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(e > 0 || e == 0 && c) {
      return false
    }
  }
  return true
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return false
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return c < 0 ? (goog.array.insertAt(a, b, -(c + 1)), true) : false
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return b >= 0 ? goog.array.removeAt(a, b) : false
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(a.length != null);
  a.length && (b %= a.length, b > 0 ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : b < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;d > 0;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = false;
  goog.userAgent.detectedIe_ = false;
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  goog.userAgent.detectedGecko_ = false;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var b = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = a.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && a.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && a.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && a.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && b.product == "Gecko"
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = typeof a == "function" ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = goog.string.compareVersions(goog.userAgent.VERSION, a) >= 0)
};
goog.dom = {};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isVersion("9"), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isVersion("9") || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
  a.className = b
};
goog.dom.classes.get = function(a) {
  return(a = a.className) && typeof a.split == "function" ? a.split(/\s+/) : []
};
goog.dom.classes.add = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), d = goog.dom.classes.add_(c, d);
  a.className = c.join(" ");
  return d
};
goog.dom.classes.remove = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), d = goog.dom.classes.remove_(c, d);
  a.className = c.join(" ");
  return d
};
goog.dom.classes.add_ = function(a, b) {
  for(var c = 0, d = 0;d < b.length;d++) {
    goog.array.contains(a, b[d]) || (a.push(b[d]), c++)
  }
  return c == b.length
};
goog.dom.classes.remove_ = function(a, b) {
  for(var c = 0, d = 0;d < a.length;d++) {
    goog.array.contains(b, a[d]) && (goog.array.splice(a, d--, 1), c++)
  }
  return c == b.length
};
goog.dom.classes.swap = function(a, b, c) {
  for(var d = goog.dom.classes.get(a), e = false, f = 0;f < d.length;f++) {
    d[f] == b && (goog.array.splice(d, f--, 1), e = true)
  }
  if(e) {
    d.push(c), a.className = d.join(" ")
  }
  return e
};
goog.dom.classes.addRemove = function(a, b, c) {
  var d = goog.dom.classes.get(a);
  goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && goog.dom.classes.remove_(d, b);
  goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
  a.className = d.join(" ")
};
goog.dom.classes.has = function(a, b) {
  return goog.array.contains(goog.dom.classes.get(a), b)
};
goog.dom.classes.enable = function(a, b, c) {
  c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
};
goog.dom.classes.toggle = function(a, b) {
  var c = !goog.dom.classes.has(a, b);
  goog.dom.classes.enable(a, b, c);
  return c
};
goog.math = {};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return"(" + this.x + ", " + this.y + ")"
  }
}
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? true : !a || !b ? false : a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b
};
goog.math.Size.equals = function(a, b) {
  return a == b ? true : !a || !b ? false : a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return"(" + this.width + " x " + this.height + ")"
  }
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return(this.width + this.height) * 2
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
goog.math.Size.prototype.scaleToFit = function(a) {
  return this.scale(this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height)
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return true
    }
  }
  return false
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length;c++) {
    if(a = a[d[c]], !goog.isDef(a)) {
      break
    }
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return false
  }
  return true
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if(b == "object" || b == "array") {
    if(a.clone) {
      return a.clone()
    }
    var b = b == "array" ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(b == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(b == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = true
  }
  return c
};
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(a) {
  return goog.isString(a) ? document.getElementById(a) : a
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  if(goog.dom.canUseQuerySelector_(c)) {
    return c.querySelectorAll("." + a)
  }else {
    if(c.getElementsByClassName) {
      return c.getElementsByClassName(a)
    }
  }
  return goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document, d = null;
  return(d = goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByClass(a, b)[0]) || null
};
goog.dom.canUseQuerySelector_ = function(a) {
  return a.querySelectorAll && a.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  b = b && b != "*" ? b.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(a) && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""))
  }
  if(c && a.getElementsByClassName) {
    if(a = a.getElementsByClassName(c), b) {
      for(var d = {}, e = 0, f = 0, g;g = a[f];f++) {
        b == g.nodeName && (d[e++] = g)
      }
      d.length = e;
      return d
    }else {
      return a
    }
  }
  a = a.getElementsByTagName(b || "*");
  if(c) {
    d = {};
    for(f = e = 0;g = a[f];f++) {
      b = g.className, typeof b.split == "function" && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g)
    }
    d.length = e;
    return d
  }else {
    return a
  }
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    d == "style" ? a.style.cssText = b : d == "class" ? a.className = b : d == "for" ? a.htmlFor = b : d in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : a[d] = b
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", maxlength:"maxLength", type:"type"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
  var b = a.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    typeof a.innerHeight == "undefined" && (a = window);
    var b = a.innerHeight, c = a.document.documentElement.scrollHeight;
    a == a.top && c < b && (b -= 15);
    return new goog.math.Size(a.innerWidth, b)
  }
  a = goog.dom.isCss1CompatMode_(b) ? b.documentElement : b.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if(b) {
    var a = goog.dom.getViewportSize_(a).height, c = b.body, d = b.documentElement;
    if(goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight
    }else {
      var b = d.scrollHeight, e = d.offsetHeight;
      if(d.clientHeight != e) {
        b = c.scrollHeight, e = c.offsetHeight
      }
      c = b > a ? b > e ? b : e : b < e ? b : e
    }
  }
  return c
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a), a = goog.dom.getWindow_(a);
  return new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
  var c = b[0], d = b[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if(d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var e = {};
      goog.object.extend(e, d);
      d = e;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  if(d) {
    goog.isString(d) ? c.className = d : goog.isArray(d) ? goog.dom.classes.add.apply(null, [c].concat(d)) : goog.dom.setProperties(c, d)
  }
  b.length > 2 && goog.dom.append_(a, c, b, 2);
  return c
};
goog.dom.append_ = function(a, b, c, d) {
  function e(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.clone(f) : f, e) : e(f)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(a)
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
  for(var e = ["<tr>"], f = 0;f < c;f++) {
    e.push(d ? "<td>&nbsp;</td>" : "<td></td>")
  }
  e.push("</tr>");
  e = e.join("");
  c = ["<table>"];
  for(f = 0;f < b;f++) {
    c.push(e)
  }
  c.push("</table>");
  a = a.createElement(goog.dom.TagName.DIV);
  a.innerHTML = c.join("");
  return a.removeChild(a.firstChild)
};
goog.dom.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
  var c = a.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
  if(c.childNodes.length == 1) {
    return c.removeChild(c.firstChild)
  }else {
    for(var d = a.createDocumentFragment();c.firstChild;) {
      d.appendChild(c.firstChild)
    }
    return d
  }
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : a.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(a) {
  if(a.nodeType != goog.dom.NodeType.ELEMENT) {
    return false
  }
  switch(a.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return false
  }
  return true
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b)
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
  for(var b;b = a.firstChild;) {
    a.removeChild(b)
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if(c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(a.removeNode) {
      return a.removeNode(false)
    }else {
      for(;b = a.firstChild;) {
        c.insertBefore(b, a)
      }
      return goog.dom.removeNode(a)
    }
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && a.children != void 0 ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(a) {
  return a.firstElementChild != void 0 ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, true)
};
goog.dom.getLastElementChild = function(a) {
  return a.lastElementChild != void 0 ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, false)
};
goog.dom.getNextElementSibling = function(a) {
  return a.nextElementSibling != void 0 ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(a) {
  return a.previousElementSibling != void 0 ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(a, b) {
  for(;a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling
  }
  return a
};
goog.dom.getNextNode = function(a) {
  if(!a) {
    return null
  }
  if(a.firstChild) {
    return a.firstChild
  }
  for(;a && !a.nextSibling;) {
    a = a.parentNode
  }
  return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
  if(!a) {
    return null
  }
  if(!a.previousSibling) {
    return a.parentNode
  }
  for(a = a.previousSibling;a && a.lastChild;) {
    a = a.lastChild
  }
  return a
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && a.nodeType > 0
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a
};
goog.dom.contains = function(a, b) {
  if(a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b)
  }
  if(typeof a.compareDocumentPosition != "undefined") {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
  if(a == b) {
    return 0
  }
  if(a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1
  }
  if("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if(c && d) {
      return a.sourceIndex - b.sourceIndex
    }else {
      var e = a.parentNode, f = b.parentNode;
      return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(true);
  d = d.createRange();
  d.selectNode(b);
  d.collapse(true);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if(c == b) {
    return-1
  }
  for(var d = b;d.parentNode != c;) {
    d = d.parentNode
  }
  return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for(var c = b;c = c.previousSibling;) {
    if(c == a) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if(c) {
    if(c == 1) {
      return arguments[0]
    }
  }else {
    return null
  }
  var d = [], e = Infinity;
  for(b = 0;b < c;b++) {
    for(var f = [], g = arguments[b];g;) {
      f.unshift(g), g = g.parentNode
    }
    d.push(f);
    e = Math.min(e, f.length)
  }
  f = null;
  for(b = 0;b < e;b++) {
    for(var g = d[0][b], h = 1;h < c;h++) {
      if(g != d[h][b]) {
        return f
      }
    }
    f = g
  }
  return f
};
goog.dom.getOwnerDocument = function(a) {
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
  return goog.userAgent.WEBKIT ? a.document || a.contentWindow.document : a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
  return a.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))
};
goog.dom.setTextContent = function(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      goog.dom.removeChildren(a);
      var c = goog.dom.getOwnerDocument(a);
      a.appendChild(c.createTextNode(b))
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  if("outerHTML" in a) {
    return a.outerHTML
  }else {
    var b = goog.dom.getOwnerDocument(a).createElement("div");
    b.appendChild(a.cloneNode(true));
    return b.innerHTML
  }
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, true) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, false);
  return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if(a != null) {
    for(var e = 0, f;f = a.childNodes[e];e++) {
      if(b(f) && (c.push(f), d)) {
        return true
      }
      if(goog.dom.findNodes_(f, b, c, d)) {
        return true
      }
    }
  }
  return false
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, goog.isNumber(a) && a >= 0) : false
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : a.removeAttribute("tabIndex")
};
goog.dom.getTextContent = function(a) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText)
  }else {
    var b = [];
    goog.dom.getTextContent_(a, b, true);
    a = b.join("")
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.userAgent.IE || (a = a.replace(/ +/g, " "));
  a != " " && (a = a.replace(/^\s*/, ""));
  return a
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, false);
  return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
  if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if(a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
  for(var c = b || goog.dom.getOwnerDocument(a).body, d = [];a && a != c;) {
    for(var e = a;e = e.previousSibling;) {
      d.unshift(goog.dom.getTextContent(e))
    }
    a = a.parentNode
  }
  return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  for(var a = [a], d = 0, e;a.length > 0 && d < b;) {
    if(e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if(e.nodeType == goog.dom.NodeType.TEXT) {
        var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
        d += f.length
      }else {
        if(e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length
        }else {
          for(f = e.childNodes.length - 1;f >= 0;f--) {
            a.push(e.childNodes[f])
          }
        }
      }
    }
  }
  if(goog.isObject(c)) {
    c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e
  }
  return e
};
goog.dom.isNodeList = function(a) {
  if(a && typeof a.length == "number") {
    if(goog.isObject(a)) {
      return typeof a.item == "function" || typeof a.item == "string"
    }else {
      if(goog.isFunction(a)) {
        return typeof a.item == "function"
      }
    }
  }
  return false
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c) {
  var d = b ? b.toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return(!d || a.nodeName == d) && (!c || goog.dom.classes.has(a, c))
  }, true)
};
goog.dom.getAncestorByClass = function(a, b) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b)
};
goog.dom.getAncestor = function(a, b, c, d) {
  if(!c) {
    a = a.parentNode
  }
  for(var c = d == null, e = 0;a && (c || e <= d);) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    e++
  }
  return null
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.isString(a) ? this.document_.getElementById(a) : a
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(a)
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
};
goog.math.Box.boundingBox = function(a) {
  for(var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    b.top = Math.min(b.top, d.y);
    b.right = Math.max(b.right, d.x);
    b.bottom = Math.max(b.bottom, d.y);
    b.left = Math.min(b.left, d.x)
  }
  return b
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
if(goog.DEBUG) {
  goog.math.Box.prototype.toString = function() {
    return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
  }
}
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
  return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.equals = function(a, b) {
  return a == b ? true : !a || !b ? false : a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
};
goog.math.Box.contains = function(a, b) {
  return!a || !b ? false : b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
goog.math.Box.distance = function(a, b) {
  return b.x >= a.left && b.x <= a.right ? b.y >= a.top && b.y <= a.bottom ? 0 : b.y < a.top ? a.top - b.y : b.y - a.bottom : b.y >= a.top && b.y <= a.bottom ? b.x < a.left ? a.left - b.x : b.x - a.right : goog.math.Coordinate.distance(b, new goog.math.Coordinate(b.x < a.left ? a.left : a.right, b.y < a.top ? a.top : a.bottom))
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
if(goog.DEBUG) {
  goog.math.Rect.prototype.toString = function() {
    return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
  }
}
goog.math.Rect.equals = function(a, b) {
  return a == b ? true : !a || !b ? false : a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if(b <= c) {
    var d = Math.max(this.top, a.top), a = Math.min(this.top + this.height, a.top + a.height);
    if(d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, true
    }
  }
  return false
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if(c <= d) {
    var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
    if(e <= f) {
      return new goog.math.Rect(c, e, d - c, f - e)
    }
  }
  return null
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if(!c || !c.height || !c.width) {
    return[a.clone()]
  }
  var c = [], d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, i = b.top + b.height;
  if(b.top > a.top) {
    c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top
  }
  i < g && (c.push(new goog.math.Rect(a.left, i, a.width, g - i)), e = i - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
  h < f && c.push(new goog.math.Rect(h, d, f - h, e));
  return c
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
  if(!a || !b) {
    return null
  }
  var c = a.clone();
  c.boundingRect(b);
  return c
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height)
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
  goog.isString(b) ? goog.style.setStyle_(a, c, b) : goog.object.forEach(b, goog.partial(goog.style.setStyle_, a))
};
goog.style.setStyle_ = function(a, b, c) {
  a.style[goog.string.toCamelCase(c)] = b
};
goog.style.getStyle = function(a, b) {
  return a.style[goog.string.toCamelCase(b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) : ""
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style[b]
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor")
};
goog.style.setPosition = function(a, b, c) {
  var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = goog.style.getPixelStyleValue_(d, e);
  a.style.top = goog.style.getPixelStyleValue_(b, e)
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
  a = a ? a.nodeType == goog.dom.NodeType.DOCUMENT ? a : goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return goog.userAgent.IE && !goog.userAgent.isVersion(9) && !goog.dom.getDomHelper(a).isCss1CompatMode() ? a.body : a.documentElement
};
goog.style.getBoundingClientRect_ = function(a) {
  var b = a.getBoundingClientRect();
  if(goog.userAgent.IE) {
    a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop
  }
  return b
};
goog.style.getOffsetParent = function(a) {
  if(goog.userAgent.IE) {
    return a.offsetParent
  }
  for(var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = c == "fixed" || c == "absolute", a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = goog.style.getStyle_(a, "position"), d = d && c == "static" && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || c == "fixed" || c == "absolute")) {
      return a
    }
  }
  return null
};
goog.style.getVisibleRectForElement = function(a) {
  for(var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocumentScrollElement(), f;a = goog.style.getOffsetParent(a);) {
    if((!goog.userAgent.IE || a.clientWidth != 0) && (!goog.userAgent.WEBKIT || a.clientHeight != 0 || a != d) && (a.scrollWidth != a.clientWidth || a.scrollHeight != a.clientHeight) && goog.style.getStyle_(a, "overflow") != "visible") {
      var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
      g.x += h.x;
      g.y += h.y;
      b.top = Math.max(b.top, g.y);
      b.right = Math.min(b.right, g.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
      b.left = Math.max(b.left, g.x);
      f = f || a != e
    }
  }
  d = e.scrollLeft;
  e = e.scrollTop;
  goog.userAgent.WEBKIT ? (b.left += d, b.top += e) : (b.left = Math.max(b.left, d), b.top = Math.max(b.top, e));
  if(!f || goog.userAgent.WEBKIT) {
    b.right += d, b.bottom += e
  }
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, e + c.height);
  return b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  var d = goog.style.getPageOffset(a), e = goog.style.getPageOffset(b), f = goog.style.getBorderBox(b), g = d.x - e.x - f.left, d = d.y - e.y - f.top, e = b.clientWidth - a.offsetWidth, a = b.clientHeight - a.offsetHeight;
  c ? (b.scrollLeft += g - e / 2, b.scrollTop += d - a / 2) : (b.scrollLeft += Math.min(g, Math.max(g - e, 0)), b.scrollTop += Math.min(d, Math.max(d - a, 0)))
};
goog.style.getClientLeftTop = function(a) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
    if(goog.style.isRightToLeft(a)) {
      var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth"));
      b += c
    }
    return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")))
  }
  return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
  var b, c = goog.dom.getOwnerDocument(a), d = goog.style.getStyle_(a, "position"), e = goog.userAgent.GECKO && c.getBoxObjectFor && !a.getBoundingClientRect && d == "absolute" && (b = c.getBoxObjectFor(a)) && (b.screenX < 0 || b.screenY < 0), f = new goog.math.Coordinate(0, 0), g = goog.style.getClientViewportElement(c);
  if(a == g) {
    return f
  }
  if(a.getBoundingClientRect) {
    b = goog.style.getBoundingClientRect_(a), a = goog.dom.getDomHelper(c).getDocumentScroll(), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !e) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(goog.userAgent.WEBKIT && goog.style.getComputedPosition(b) == "fixed") {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && d == "absolute") {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = goog.style.getOffsetParent(b)) && b != c.body && b != g;) {
        if(f.x -= b.scrollLeft, !goog.userAgent.OPERA || b.tagName != "TR") {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), e = a;
  do {
    var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPosition(e);
    c.x += f.x;
    c.y += f.y
  }while(d && d != b && (e = d.frameElement) && (d = d.parent));
  return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if(b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body, c = goog.style.getFramedPageOffset(d, c.getWindow()), c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    goog.userAgent.IE && !b.isCss1CompatMode() && (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y
  }
};
goog.style.getRelativePosition = function(a, b) {
  var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPosition = function(a) {
  var b = new goog.math.Coordinate;
  if(a.nodeType == goog.dom.NodeType.ELEMENT) {
    if(a.getBoundingClientRect) {
      a = goog.style.getBoundingClientRect_(a), b.x = a.left, b.y = a.top
    }else {
      var c = goog.dom.getDomHelper(a).getDocumentScroll(), a = goog.style.getPageOffset(a);
      b.x = a.x - c.x;
      b.y = a.y - c.y
    }
  }else {
    var c = goog.isFunction(a.getBrowserEvent), d = a;
    a.targetTouches ? d = a.targetTouches[0] : c && a.getBrowserEvent().targetTouches && (d = a.getBrowserEvent().targetTouches[0]);
    b.x = d.clientX;
    b.y = d.clientY
  }
  return b
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  if(b instanceof goog.math.Coordinate) {
    c = b.y, b = b.x
  }
  goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
};
goog.style.setSize = function(a, b, c) {
  if(b instanceof goog.math.Size) {
    c = b.height, b = b.width
  }else {
    if(c == void 0) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
  typeof a == "number" && (a = (b ? Math.round(a) : a) + "px");
  return a
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, true)
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, true)
};
goog.style.getSize = function(a) {
  if(goog.style.getStyle_(a, "display") != "none") {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
  }
  var b = a.style, c = b.display, d = b.visibility, e = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  var f = a.offsetWidth, a = a.offsetHeight;
  b.display = c;
  b.position = e;
  b.visibility = d;
  return new goog.math.Size(f, a)
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a), a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase(String(a))
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
  var b = a.style, a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
  return a == "" ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
  var c = a.style;
  if("opacity" in c) {
    c.opacity = b
  }else {
    if("MozOpacity" in c) {
      c.MozOpacity = b
    }else {
      if("filter" in c) {
        c.filter = b === "" ? "" : "alpha(opacity=" + b * 100 + ")"
      }
    }
  }
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  var c = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
  a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
  return a.style.display != "none"
};
goog.style.installStyles = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = null;
  if(goog.userAgent.IE) {
    d = c.getDocument().createStyleSheet(), goog.style.setStyles(d, a)
  }else {
    var e = c.getElementsByTagNameAndClass("head")[0];
    e || (d = c.getElementsByTagNameAndClass("body")[0], e = c.createDom("head"), d.parentNode.insertBefore(e, d));
    d = c.createDom("style");
    goog.style.setStyles(d, a);
    c.appendChild(e, d)
  }
  return d
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
  goog.userAgent.IE ? a.cssText = b : a[goog.userAgent.WEBKIT ? "innerText" : "innerHTML"] = b
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.zoom = "1", a.display = "inline") : a.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function(a) {
  return"rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  if(goog.style.unselectableStyle_) {
    return a.style[goog.style.unselectableStyle_].toLowerCase() == "none"
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      return a.getAttribute("unselectable") == "on"
    }
  }
  return false
};
goog.style.setUnselectable = function(a, b, c) {
  var c = !c ? a.getElementsByTagName("*") : null, d = goog.style.unselectableStyle_;
  if(d) {
    if(b = b ? "none" : "", a.style[d] = b, c) {
      for(var a = 0, e;e = c[a];a++) {
        e.style[d] = b
      }
    }
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;e = c[a];a++) {
          e.setAttribute("unselectable", b)
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
      c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    }else {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "border-box")
  }
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  return c && goog.dom.getDomHelper(b).isCss1CompatMode() && c.width != "auto" && c.height != "auto" && !c.boxSizing ? (b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a)) : (c = goog.style.getBorderBoxSize(a), b = goog.style.getPaddingBox(a), a = goog.style.getBorderBox(a), new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom))
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }else {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
      c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "content-box")
  }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = b.width + "px";
  a.height = b.height + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if(/^\d+px?$/.test(b)) {
    return parseInt(b, 10)
  }else {
    var e = a.style[c], f = a.runtimeStyle[c];
    a.runtimeStyle[c] = a.currentStyle[c];
    a.style[c] = b;
    b = a.style[d];
    a.style[c] = e;
    a.runtimeStyle[c] = f;
    return b
  }
};
goog.style.getIePixelDistance_ = function(a, b) {
  return goog.style.getIePixelValue_(a, goog.style.getCascadedStyle(a, b), "left", "pixelLeft")
};
goog.style.getBox_ = function(a, b) {
  if(goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(e, d, f, c)
  }else {
    return c = goog.style.getComputedStyle(a, b + "Left"), d = goog.style.getComputedStyle(a, b + "Right"), e = goog.style.getComputedStyle(a, b + "Top"), f = goog.style.getComputedStyle(a, b + "Bottom"), new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c))
  }
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if(goog.style.getCascadedStyle(a, b + "Style") == "none") {
    return 0
  }
  var c = goog.style.getCascadedStyle(a, b + "Width");
  return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
  if(goog.userAgent.IE) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop"), a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b)
  }else {
    return b = goog.style.getComputedStyle(a, "borderLeftWidth"), c = goog.style.getComputedStyle(a, "borderRightWidth"), d = goog.style.getComputedStyle(a, "borderTopWidth"), a = goog.style.getComputedStyle(a, "borderBottomWidth"), new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
  }
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if(b.body.createTextRange) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName")
    }catch(d) {
      c = ""
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  a.length > 1 && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return(a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if(b && "px" == c) {
    return parseInt(b, 10)
  }
  if(goog.userAgent.IE) {
    if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft")
    }else {
      if(a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
        return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
      }
    }
  }
  c = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    a = a.split(/\s*:\s*/);
    a.length == 2 && (b[goog.string.toCamelCase(a[0].toLowerCase())] = a[1])
  });
  return b
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";")
  });
  return b.join("")
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function() {
  var a = goog.dom.createElement("div");
  a.style.cssText = "visibility:hidden;overflow:scroll;position:absolute;top:0;width:100px;height:100px";
  goog.dom.appendChild(goog.dom.getDocument().body, a);
  var b = a.offsetWidth - a.clientWidth;
  goog.dom.removeNode(a);
  return b
};
goog.dom.a11y = {};
goog.dom.a11y.State = {ACTIVEDESCENDANT:"activedescendant", ATOMIC:"atomic", AUTOCOMPLETE:"autocomplete", BUSY:"busy", CHECKED:"checked", CONTROLS:"controls", DESCRIBEDBY:"describedby", DISABLED:"disabled", DROPEFFECT:"dropeffect", EXPANDED:"expanded", FLOWTO:"flowto", GRABBED:"grabbed", HASPOPUP:"haspopup", HIDDEN:"hidden", INVALID:"invalid", LABEL:"label", LABELLEDBY:"labelledby", LEVEL:"level", LIVE:"live", MULTILINE:"multiline", MULTISELECTABLE:"multiselectable", ORIENTATION:"orientation", OWNS:"owns", 
POSINSET:"posinset", PRESSED:"pressed", READONLY:"readonly", RELEVANT:"relevant", REQUIRED:"required", SELECTED:"selected", SETSIZE:"setsize", SORT:"sort", VALUEMAX:"valuemax", VALUEMIN:"valuemin", VALUENOW:"valuenow", VALUETEXT:"valuetext"};
goog.dom.a11y.Role = {ALERT:"alert", ALERTDIALOG:"alertdialog", APPLICATION:"application", ARTICLE:"article", BANNER:"banner", BUTTON:"button", CHECKBOX:"checkbox", COLUMNHEADER:"columnheader", COMBOBOX:"combobox", COMPLEMENTARY:"complementary", DIALOG:"dialog", DIRECTORY:"directory", DOCUMENT:"document", FORM:"form", GRID:"grid", GRIDCELL:"gridcell", GROUP:"group", HEADING:"heading", IMG:"img", LINK:"link", LIST:"list", LISTBOX:"listbox", LISTITEM:"listitem", LOG:"log", MAIN:"main", MARQUEE:"marquee", 
MATH:"math", MENU:"menu", MENUBAR:"menubar", MENU_ITEM:"menuitem", MENU_ITEM_CHECKBOX:"menuitemcheckbox", MENU_ITEM_RADIO:"menuitemradio", NAVIGATION:"navigation", NOTE:"note", OPTION:"option", PRESENTATION:"presentation", PROGRESSBAR:"progressbar", RADIO:"radio", RADIOGROUP:"radiogroup", REGION:"region", ROW:"row", ROWGROUP:"rowgroup", ROWHEADER:"rowheader", SCROLLBAR:"scrollbar", SEARCH:"search", SEPARATOR:"separator", SLIDER:"slider", SPINBUTTON:"spinbutton", STATUS:"status", TAB:"tab", TAB_LIST:"tablist", 
TAB_PANEL:"tabpanel", TEXTBOX:"textbox", TIMER:"timer", TOOLBAR:"toolbar", TOOLTIP:"tooltip", TREE:"tree", TREEGRID:"treegrid", TREEITEM:"treeitem"};
goog.dom.a11y.setRole = function(a, b) {
  a.setAttribute("role", b);
  a.roleName = b
};
goog.dom.a11y.getRole = function(a) {
  return a.roleName || ""
};
goog.dom.a11y.setState = function(a, b, c) {
  a.setAttribute("aria-" + b, c)
};
goog.dom.a11y.getState = function(a, b) {
  var c = a.getAttribute("aria-" + b);
  return c === true || c === false ? c ? "true" : "false" : c ? String(c) : ""
};
goog.dom.a11y.getActiveDescendant = function(a) {
  var b = goog.dom.a11y.getState(a, goog.dom.a11y.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument(a).getElementById(b)
};
goog.dom.a11y.setActiveDescendant = function(a, b) {
  goog.dom.a11y.setState(a, goog.dom.a11y.State.ACTIVEDESCENDANT, b ? b.id : "")
};
goog.ui = {};
goog.ui.ButtonSide = {NONE:0, START:1, END:2, BOTH:3};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.register = function(a) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
  for(var a = goog.bind(a.wrap, a), b = 0;b < goog.debug.entryPointRegistry.refList_.length;b++) {
    goog.debug.entryPointRegistry.refList_[b](a)
  }
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
  for(var a = goog.bind(a.unwrap, a), b = 0;b < goog.debug.entryPointRegistry.refList_.length;b++) {
    goog.debug.entryPointRegistry.refList_[b](a)
  }
};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(a) {
  return a
}};
goog.events = {};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isVersion("9"), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.Disposable = function() {
  goog.Disposable.ENABLE_MONITORING && (goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.ENABLE_MONITORING = false;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for(b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)])
  }
  return a
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_ && (this.disposed_ = true, this.disposeInternal(), goog.Disposable.ENABLE_MONITORING)) {
    var a = goog.getUid(this);
    if(!goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a]
  }
};
goog.Disposable.prototype.disposeInternal = function() {
};
goog.dispose = function(a) {
  a && typeof a.dispose == "function" && a.dispose()
};
goog.events.Event = function(a, b) {
  goog.Disposable.call(this);
  this.type = a;
  this.currentTarget = this.target = b
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = false;
goog.events.Event.prototype.returnValue_ = true;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = true
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = false
};
goog.events.Event.stopPropagation = function(a) {
  a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
  a.preventDefault()
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
MESSAGE:"message", CONNECT:"connect"};
goog.reflect = {};
goog.reflect.object = function(a, b) {
  return b
};
goog.reflect.sinkValue = new Function("a", "return a");
goog.events.BrowserEvent = function(a, b) {
  a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = false;
goog.events.BrowserEvent.prototype.altKey = false;
goog.events.BrowserEvent.prototype.shiftKey = false;
goog.events.BrowserEvent.prototype.metaKey = false;
goog.events.BrowserEvent.prototype.platformModifierKey = false;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(a, b) {
  var c = this.type = a.type;
  goog.events.Event.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(goog.userAgent.GECKO) {
      try {
        goog.reflect.sinkValue(d.nodeName)
      }catch(e) {
        d = null
      }
    }
  }else {
    if(c == goog.events.EventType.MOUSEOVER) {
      d = a.fromElement
    }else {
      if(c == goog.events.EventType.MOUSEOUT) {
        d = a.toElement
      }
    }
  }
  this.relatedTarget = d;
  this.offsetX = a.offsetX !== void 0 ? a.offsetX : a.layerX;
  this.offsetY = a.offsetY !== void 0 ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX;
  this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.event_ = a;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : this.type == "click" ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = true
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var a = this.event_;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = false, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if(a.ctrlKey || a.keyCode >= 112 && a.keyCode <= 123) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function() {
};
goog.events.EventWrapper.prototype.unlisten = function() {
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = false;
goog.events.Listener.prototype.callOnce = false;
goog.events.Listener.prototype.init = function(a, b, c, d, e, f) {
  if(goog.isFunction(a)) {
    this.isFunctionListener_ = true
  }else {
    if(a && a.handleEvent && goog.isFunction(a.handleEvent)) {
      this.isFunctionListener_ = false
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.handler = f;
  this.callOnce = false;
  this.key = ++goog.events.Listener.counter_;
  this.removed = false
};
goog.events.Listener.prototype.handleEvent = function(a) {
  return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, a) : this.listener.handleEvent.call(this.listener, a)
};
goog.structs = {};
goog.structs.SimplePool = function(a, b) {
  goog.Disposable.call(this);
  this.maxCount_ = b;
  this.freeQueue_ = [];
  this.createInitial_(a)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
goog.structs.SimplePool.prototype.createObjectFn_ = null;
goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
goog.structs.SimplePool.prototype.setCreateObjectFn = function(a) {
  this.createObjectFn_ = a
};
goog.structs.SimplePool.prototype.setDisposeObjectFn = function(a) {
  this.disposeObjectFn_ = a
};
goog.structs.SimplePool.prototype.getObject = function() {
  return this.freeQueue_.length ? this.freeQueue_.pop() : this.createObject()
};
goog.structs.SimplePool.prototype.releaseObject = function(a) {
  this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(a) : this.disposeObject(a)
};
goog.structs.SimplePool.prototype.createInitial_ = function(a) {
  if(a > this.maxCount_) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var b = 0;b < a;b++) {
    this.freeQueue_.push(this.createObject())
  }
};
goog.structs.SimplePool.prototype.createObject = function() {
  return this.createObjectFn_ ? this.createObjectFn_() : {}
};
goog.structs.SimplePool.prototype.disposeObject = function(a) {
  if(this.disposeObjectFn_) {
    this.disposeObjectFn_(a)
  }else {
    if(goog.isObject(a)) {
      if(goog.isFunction(a.dispose)) {
        a.dispose()
      }else {
        for(var b in a) {
          delete a[b]
        }
      }
    }
  }
};
goog.structs.SimplePool.prototype.disposeInternal = function() {
  goog.structs.SimplePool.superClass_.disposeInternal.call(this);
  for(var a = this.freeQueue_;a.length;) {
    this.disposeObject(a.pop())
  }
  delete this.freeQueue_
};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine" in goog.global && goog.global.ScriptEngine() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(a) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, a) >= 0
};
goog.events.pools = {};
goog.events.ASSUME_GOOD_GC = false;
(function() {
  function a() {
    return{count_:0, remaining_:0}
  }
  function b() {
    return[]
  }
  function c() {
    var a = function(b) {
      return g.call(a.src, a.key, b)
    };
    return a
  }
  function d() {
    return new goog.events.Listener
  }
  function e() {
    return new goog.events.BrowserEvent
  }
  var f = !goog.events.ASSUME_GOOD_GC && goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7"), g;
  goog.events.pools.setProxyCallbackFunction = function(a) {
    g = a
  };
  if(f) {
    goog.events.pools.getObject = function() {
      return h.getObject()
    };
    goog.events.pools.releaseObject = function(a) {
      h.releaseObject(a)
    };
    goog.events.pools.getArray = function() {
      return i.getObject()
    };
    goog.events.pools.releaseArray = function(a) {
      i.releaseObject(a)
    };
    goog.events.pools.getProxy = function() {
      return j.getObject()
    };
    goog.events.pools.releaseProxy = function() {
      j.releaseObject(c())
    };
    goog.events.pools.getListener = function() {
      return k.getObject()
    };
    goog.events.pools.releaseListener = function(a) {
      k.releaseObject(a)
    };
    goog.events.pools.getEvent = function() {
      return l.getObject()
    };
    goog.events.pools.releaseEvent = function(a) {
      l.releaseObject(a)
    };
    var h = new goog.structs.SimplePool(0, 600);
    h.setCreateObjectFn(a);
    var i = new goog.structs.SimplePool(0, 600);
    i.setCreateObjectFn(b);
    var j = new goog.structs.SimplePool(0, 600);
    j.setCreateObjectFn(c);
    var k = new goog.structs.SimplePool(0, 600);
    k.setCreateObjectFn(d);
    var l = new goog.structs.SimplePool(0, 600);
    l.setCreateObjectFn(e)
  }else {
    goog.events.pools.getObject = a, goog.events.pools.releaseObject = goog.nullFunction, goog.events.pools.getArray = b, goog.events.pools.releaseArray = goog.nullFunction, goog.events.pools.getProxy = c, goog.events.pools.releaseProxy = goog.nullFunction, goog.events.pools.getListener = d, goog.events.pools.releaseListener = goog.nullFunction, goog.events.pools.getEvent = e, goog.events.pools.releaseEvent = goog.nullFunction
  }
})();
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(a, b, c, d, e) {
  if(b) {
    if(goog.isArray(b)) {
      for(var f = 0;f < b.length;f++) {
        goog.events.listen(a, b[f], c, d, e)
      }
      return null
    }else {
      var d = !!d, g = goog.events.listenerTree_;
      b in g || (g[b] = goog.events.pools.getObject());
      g = g[b];
      d in g || (g[d] = goog.events.pools.getObject(), g.count_++);
      var g = g[d], h = goog.getUid(a), i;
      g.remaining_++;
      if(g[h]) {
        i = g[h];
        for(f = 0;f < i.length;f++) {
          if(g = i[f], g.listener == c && g.handler == e) {
            if(g.removed) {
              break
            }
            return i[f].key
          }
        }
      }else {
        i = g[h] = goog.events.pools.getArray(), g.count_++
      }
      f = goog.events.pools.getProxy();
      f.src = a;
      g = goog.events.pools.getListener();
      g.init(c, f, a, b, d, e);
      c = g.key;
      f.key = c;
      i.push(g);
      goog.events.listeners_[c] = g;
      goog.events.sources_[h] || (goog.events.sources_[h] = goog.events.pools.getArray());
      goog.events.sources_[h].push(g);
      a.addEventListener ? (a == goog.global || !a.customEvent_) && a.addEventListener(b, f, d) : a.attachEvent(goog.events.getOnString_(b), f);
      return c
    }
  }else {
    throw Error("Invalid event type");
  }
};
goog.events.listenOnce = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      goog.events.listenOnce(a, b[f], c, d, e)
    }
    return null
  }
  a = goog.events.listen(a, b, c, d, e);
  goog.events.listeners_[a].callOnce = true;
  return a
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
  b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      goog.events.unlisten(a, b[f], c, d, e)
    }
    return null
  }
  d = !!d;
  a = goog.events.getListeners_(a, b, d);
  if(!a) {
    return false
  }
  for(f = 0;f < a.length;f++) {
    if(a[f].listener == c && a[f].capture == d && a[f].handler == e) {
      return goog.events.unlistenByKey(a[f].key)
    }
  }
  return false
};
goog.events.unlistenByKey = function(a) {
  if(!goog.events.listeners_[a]) {
    return false
  }
  var b = goog.events.listeners_[a];
  if(b.removed) {
    return false
  }
  var c = b.src, d = b.type, e = b.proxy, f = b.capture;
  c.removeEventListener ? (c == goog.global || !c.customEvent_) && c.removeEventListener(d, e, f) : c.detachEvent && c.detachEvent(goog.events.getOnString_(d), e);
  c = goog.getUid(c);
  e = goog.events.listenerTree_[d][f][c];
  if(goog.events.sources_[c]) {
    var g = goog.events.sources_[c];
    goog.array.remove(g, b);
    g.length == 0 && delete goog.events.sources_[c]
  }
  b.removed = true;
  e.needsCleanup_ = true;
  goog.events.cleanUp_(d, f, c, e);
  delete goog.events.listeners_[a];
  return true
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e)
};
goog.events.cleanUp_ = function(a, b, c, d) {
  if(!d.locked_ && d.needsCleanup_) {
    for(var e = 0, f = 0;e < d.length;e++) {
      if(d[e].removed) {
        var g = d[e].proxy;
        g.src = null;
        goog.events.pools.releaseProxy(g);
        goog.events.pools.releaseListener(d[e])
      }else {
        e != f && (d[f] = d[e]), f++
      }
    }
    d.length = f;
    d.needsCleanup_ = false;
    f == 0 && (goog.events.pools.releaseArray(d), delete goog.events.listenerTree_[a][b][c], goog.events.listenerTree_[a][b].count_--, goog.events.listenerTree_[a][b].count_ == 0 && (goog.events.pools.releaseObject(goog.events.listenerTree_[a][b]), delete goog.events.listenerTree_[a][b], goog.events.listenerTree_[a].count_--), goog.events.listenerTree_[a].count_ == 0 && (goog.events.pools.releaseObject(goog.events.listenerTree_[a]), delete goog.events.listenerTree_[a]))
  }
};
goog.events.removeAll = function(a, b, c) {
  var d = 0, e = b == null, f = c == null, c = !!c;
  if(a == null) {
    goog.object.forEach(goog.events.sources_, function(a) {
      for(var g = a.length - 1;g >= 0;g--) {
        var h = a[g];
        if((e || b == h.type) && (f || c == h.capture)) {
          goog.events.unlistenByKey(h.key), d++
        }
      }
    })
  }else {
    if(a = goog.getUid(a), goog.events.sources_[a]) {
      for(var a = goog.events.sources_[a], g = a.length - 1;g >= 0;g--) {
        var h = a[g];
        if((e || b == h.type) && (f || c == h.capture)) {
          goog.events.unlistenByKey(h.key), d++
        }
      }
    }
  }
  return d
};
goog.events.getListeners = function(a, b, c) {
  return goog.events.getListeners_(a, b, c) || []
};
goog.events.getListeners_ = function(a, b, c) {
  var d = goog.events.listenerTree_;
  return b in d && (d = d[b], c in d && (d = d[c], a = goog.getUid(a), d[a])) ? d[a] : null
};
goog.events.getListener = function(a, b, c, d, e) {
  d = !!d;
  if(a = goog.events.getListeners_(a, b, d)) {
    for(b = 0;b < a.length;b++) {
      if(a[b].listener == c && a[b].capture == d && a[b].handler == e) {
        return a[b]
      }
    }
  }
  return null
};
goog.events.hasListener = function(a, b, c) {
  var a = goog.getUid(a), d = goog.events.sources_[a];
  if(d) {
    var e = goog.isDef(b), f = goog.isDef(c);
    return e && f ? (d = goog.events.listenerTree_[b], !!d && !!d[c] && a in d[c]) : !e && !f ? true : goog.array.some(d, function(a) {
      return e && a.type == b || f && a.capture == c
    })
  }
  return false
};
goog.events.expose = function(a) {
  var b = [], c;
  for(c in a) {
    a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c])
  }
  return b.join("\n")
};
goog.events.getOnString_ = function(a) {
  return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
  var e = goog.events.listenerTree_;
  return b in e && (e = e[b], c in e) ? goog.events.fireListeners_(e[c], a, b, c, d) : true
};
goog.events.fireListeners_ = function(a, b, c, d, e) {
  var f = 1, b = goog.getUid(b);
  if(a[b]) {
    a.remaining_--;
    a = a[b];
    a.locked_ ? a.locked_++ : a.locked_ = 1;
    try {
      for(var g = a.length, h = 0;h < g;h++) {
        var i = a[h];
        i && !i.removed && (f &= goog.events.fireListener(i, e) !== false)
      }
    }finally {
      a.locked_--, goog.events.cleanUp_(c, d, b, a)
    }
  }
  return Boolean(f)
};
goog.events.fireListener = function(a, b) {
  var c = a.handleEvent(b);
  a.callOnce && goog.events.unlistenByKey(a.key);
  return c
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(a, b) {
  var c = b.type || b, d = goog.events.listenerTree_;
  if(!(c in d)) {
    return true
  }
  if(goog.isString(b)) {
    b = new goog.events.Event(b, a)
  }else {
    if(b instanceof goog.events.Event) {
      b.target = b.target || a
    }else {
      var e = b, b = new goog.events.Event(c, a);
      goog.object.extend(b, e)
    }
  }
  var e = 1, f, d = d[c], c = true in d, g;
  if(c) {
    f = [];
    for(g = a;g;g = g.getParentEventTarget()) {
      f.push(g)
    }
    g = d[true];
    g.remaining_ = g.count_;
    for(var h = f.length - 1;!b.propagationStopped_ && h >= 0 && g.remaining_;h--) {
      b.currentTarget = f[h], e &= goog.events.fireListeners_(g, f[h], b.type, true, b) && b.returnValue_ != false
    }
  }
  if(false in d) {
    if(g = d[false], g.remaining_ = g.count_, c) {
      for(h = 0;!b.propagationStopped_ && h < f.length && g.remaining_;h++) {
        b.currentTarget = f[h], e &= goog.events.fireListeners_(g, f[h], b.type, false, b) && b.returnValue_ != false
      }
    }else {
      for(d = a;!b.propagationStopped_ && d && g.remaining_;d = d.getParentEventTarget()) {
        b.currentTarget = d, e &= goog.events.fireListeners_(g, d, b.type, false, b) && b.returnValue_ != false
      }
    }
  }
  return Boolean(e)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
  goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
  if(!goog.events.listeners_[a]) {
    return true
  }
  var c = goog.events.listeners_[a], d = c.type, e = goog.events.listenerTree_;
  if(!(d in e)) {
    return true
  }
  var e = e[d], f, g;
  if(goog.events.synthesizeEventPropagation_()) {
    f = b || goog.getObjectByName("window.event");
    var h = true in e, i = false in e;
    if(h) {
      if(goog.events.isMarkedIeEvent_(f)) {
        return true
      }
      goog.events.markIeEvent_(f)
    }
    var j = goog.events.pools.getEvent();
    j.init(f, this);
    f = true;
    try {
      if(h) {
        for(var k = goog.events.pools.getArray(), l = j.currentTarget;l;l = l.parentNode) {
          k.push(l)
        }
        g = e[true];
        g.remaining_ = g.count_;
        for(var m = k.length - 1;!j.propagationStopped_ && m >= 0 && g.remaining_;m--) {
          j.currentTarget = k[m], f &= goog.events.fireListeners_(g, k[m], d, true, j)
        }
        if(i) {
          g = e[false];
          g.remaining_ = g.count_;
          for(m = 0;!j.propagationStopped_ && m < k.length && g.remaining_;m++) {
            j.currentTarget = k[m], f &= goog.events.fireListeners_(g, k[m], d, false, j)
          }
        }
      }else {
        f = goog.events.fireListener(c, j)
      }
    }finally {
      if(k) {
        k.length = 0, goog.events.pools.releaseArray(k)
      }
      j.dispose();
      goog.events.pools.releaseEvent(j)
    }
    return f
  }
  d = new goog.events.BrowserEvent(b, this);
  try {
    f = goog.events.fireListener(c, d)
  }finally {
    d.dispose()
  }
  return f
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(a) {
  var b = false;
  if(a.keyCode == 0) {
    try {
      a.keyCode = -1;
      return
    }catch(c) {
      b = true
    }
  }
  if(b || a.returnValue == void 0) {
    a.returnValue = true
  }
};
goog.events.isMarkedIeEvent_ = function(a) {
  return a.keyCode < 0 || a.returnValue != void 0
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
  return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.synthesizeEventPropagation_ = function() {
  if(goog.events.requiresSyntheticEventPropagation_ === void 0) {
    goog.events.requiresSyntheticEventPropagation_ = goog.userAgent.IE && !goog.global.addEventListener
  }
  return goog.events.requiresSyntheticEventPropagation_
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
});
goog.events.EventHandler = function(a) {
  goog.Disposable.call(this);
  this.handler_ = a
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
goog.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
goog.events.EventHandler.keyPool_ = new goog.structs.SimplePool(goog.events.EventHandler.KEY_POOL_INITIAL_COUNT, goog.events.EventHandler.KEY_POOL_MAX_COUNT);
goog.events.EventHandler.keys_ = null;
goog.events.EventHandler.key_ = null;
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
  if(!goog.isArray(b)) {
    goog.events.EventHandler.typeArray_[0] = b, b = goog.events.EventHandler.typeArray_
  }
  for(var f = 0;f < b.length;f++) {
    this.recordListenerKey_(goog.events.listen(a, b[f], c || this, d || false, e || this.handler_ || this))
  }
  return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      this.listenOnce(a, b[f], c, d, e)
    }
  }else {
    this.recordListenerKey_(goog.events.listenOnce(a, b, c || this, d || false, e || this.handler_ || this))
  }
  return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d, e) {
  b.listen(a, c, d, e || this.handler_, this);
  return this
};
goog.events.EventHandler.prototype.recordListenerKey_ = function(a) {
  this.keys_ ? this.keys_[a] = true : this.key_ ? (this.keys_ = goog.events.EventHandler.keyPool_.getObject(), this.keys_[this.key_] = true, this.key_ = null, this.keys_[a] = true) : this.key_ = a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
  if(this.key_ || this.keys_) {
    if(goog.isArray(b)) {
      for(var f = 0;f < b.length;f++) {
        this.unlisten(a, b[f], c, d, e)
      }
    }else {
      if(a = goog.events.getListener(a, b, c || this, d || false, e || this.handler_ || this)) {
        if(a = a.key, goog.events.unlistenByKey(a), this.keys_) {
          goog.object.remove(this.keys_, a)
        }else {
          if(this.key_ == a) {
            this.key_ = null
          }
        }
      }
    }
  }
  return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e || this.handler_, this);
  return this
};
goog.events.EventHandler.prototype.removeAll = function() {
  if(this.keys_) {
    for(var a in this.keys_) {
      goog.events.unlistenByKey(a), delete this.keys_[a]
    }
    goog.events.EventHandler.keyPool_.releaseObject(this.keys_);
    this.keys_ = null
  }else {
    this.key_ && goog.events.unlistenByKey(this.key_)
  }
};
goog.events.EventHandler.prototype.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = true;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
  this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
  goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
  goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
  return goog.events.dispatchEvent(this, a)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.ui.IdGenerator = function() {
};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
  return":" + (this.nextId_++).toString(36)
};
goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();
goog.ui.Component = function(a) {
  goog.events.EventTarget.call(this);
  this.dom_ = a || goog.dom.getDomHelper();
  this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.defaultRightToLeft_ = null;
goog.ui.Component.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", HIDE:"hide", DISABLE:"disable", ENABLE:"enable", HIGHLIGHT:"highlight", UNHIGHLIGHT:"unhighlight", ACTIVATE:"activate", DEACTIVATE:"deactivate", SELECT:"select", UNSELECT:"unselect", CHECK:"check", UNCHECK:"uncheck", FOCUS:"focus", BLUR:"blur", OPEN:"open", CLOSE:"close", ENTER:"enter", LEAVE:"leave", ACTION:"action", CHANGE:"change"};
goog.ui.Component.Error = {NOT_SUPPORTED:"Method not supported", DECORATE_INVALID:"Invalid element to decorate", ALREADY_RENDERED:"Component already rendered", PARENT_UNABLE_TO_BE_SET:"Unable to set parent component", CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds", NOT_OUR_CHILD:"Child is not in parent component", NOT_IN_DOCUMENT:"Operation not supported while component is not in document", STATE_INVALID:"Invalid component state"};
goog.ui.Component.State = {ALL:255, DISABLED:1, HOVER:2, ACTIVE:4, SELECTED:8, CHECKED:16, FOCUSED:32, OPENED:64};
goog.ui.Component.getStateTransitionEvent = function(a, b) {
  switch(a) {
    case goog.ui.Component.State.DISABLED:
      return b ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
      return b ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
      return b ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
      return b ? goog.ui.Component.EventType.SELECT : goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
      return b ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
      return b ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
      return b ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE
  }
  throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function(a) {
  goog.ui.Component.defaultRightToLeft_ = a
};
goog.ui.Component.prototype.id_ = null;
goog.ui.Component.prototype.inDocument_ = false;
goog.ui.Component.prototype.element_ = null;
goog.ui.Component.prototype.rightToLeft_ = null;
goog.ui.Component.prototype.model_ = null;
goog.ui.Component.prototype.parent_ = null;
goog.ui.Component.prototype.children_ = null;
goog.ui.Component.prototype.childIndex_ = null;
goog.ui.Component.prototype.wasDecorated_ = false;
goog.ui.Component.prototype.getId = function() {
  return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function(a) {
  this.parent_ && this.parent_.childIndex_ && (goog.object.remove(this.parent_.childIndex_, this.id_), goog.object.add(this.parent_.childIndex_, a, this));
  this.id_ = a
};
goog.ui.Component.prototype.getElement = function() {
  return this.element_
};
goog.ui.Component.prototype.setElementInternal = function(a) {
  this.element_ = a
};
goog.ui.Component.prototype.getHandler = function() {
  return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
};
goog.ui.Component.prototype.setParent = function(a) {
  if(this == a) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  if(a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) {
    throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
  }
  this.parent_ = a;
  goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getParent = function() {
  return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function(a) {
  if(this.parent_ && this.parent_ != a) {
    throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
  }
  goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getDomHelper = function() {
  return this.dom_
};
goog.ui.Component.prototype.isInDocument = function() {
  return this.inDocument_
};
goog.ui.Component.prototype.createDom = function() {
  this.element_ = this.dom_.createElement("div")
};
goog.ui.Component.prototype.render = function(a) {
  this.render_(a)
};
goog.ui.Component.prototype.renderBefore = function(a) {
  this.render_(a.parentNode, a)
};
goog.ui.Component.prototype.render_ = function(a, b) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.element_ || this.createDom();
  a ? a.insertBefore(this.element_, b || null) : this.dom_.getDocument().body.appendChild(this.element_);
  (!this.parent_ || this.parent_.isInDocument()) && this.enterDocument()
};
goog.ui.Component.prototype.decorate = function(a) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }else {
    if(a && this.canDecorate(a)) {
      this.wasDecorated_ = true;
      if(!this.dom_ || this.dom_.getDocument() != goog.dom.getOwnerDocument(a)) {
        this.dom_ = goog.dom.getDomHelper(a)
      }
      this.decorateInternal(a);
      this.enterDocument()
    }else {
      throw Error(goog.ui.Component.Error.DECORATE_INVALID);
    }
  }
};
goog.ui.Component.prototype.canDecorate = function() {
  return true
};
goog.ui.Component.prototype.wasDecorated = function() {
  return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function(a) {
  this.element_ = a
};
goog.ui.Component.prototype.enterDocument = function() {
  this.inDocument_ = true;
  this.forEachChild(function(a) {
    !a.isInDocument() && a.getElement() && a.enterDocument()
  })
};
goog.ui.Component.prototype.exitDocument = function() {
  this.forEachChild(function(a) {
    a.isInDocument() && a.exitDocument()
  });
  this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
  this.inDocument_ = false
};
goog.ui.Component.prototype.disposeInternal = function() {
  goog.ui.Component.superClass_.disposeInternal.call(this);
  this.inDocument_ && this.exitDocument();
  this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
  this.forEachChild(function(a) {
    a.dispose()
  });
  !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
  this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null
};
goog.ui.Component.prototype.makeId = function(a) {
  return this.getId() + "." + a
};
goog.ui.Component.prototype.getModel = function() {
  return this.model_
};
goog.ui.Component.prototype.setModel = function(a) {
  this.model_ = a
};
goog.ui.Component.prototype.getFragmentFromId = function(a) {
  return a.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function(a) {
  if(!this.inDocument_) {
    throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
  }
  return this.dom_.getElement(this.makeId(a))
};
goog.ui.Component.prototype.addChild = function(a, b) {
  this.addChildAt(a, this.getChildCount(), b)
};
goog.ui.Component.prototype.addChildAt = function(a, b, c) {
  if(a.inDocument_ && (c || !this.inDocument_)) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  if(b < 0 || b > this.getChildCount()) {
    throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
  }
  if(!this.childIndex_ || !this.children_) {
    this.childIndex_ = {}, this.children_ = []
  }
  a.getParent() == this ? (goog.object.set(this.childIndex_, a.getId(), a), goog.array.remove(this.children_, a)) : goog.object.add(this.childIndex_, a.getId(), a);
  a.setParent(this);
  goog.array.insertAt(this.children_, a, b);
  a.inDocument_ && this.inDocument_ && a.getParent() == this ? (c = this.getContentElement(), c.insertBefore(a.getElement(), c.childNodes[b] || null)) : c ? (this.element_ || this.createDom(), b = this.getChildAt(b + 1), a.render_(this.getContentElement(), b ? b.element_ : null)) : this.inDocument_ && !a.inDocument_ && a.element_ && a.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function() {
  return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function() {
  if(this.rightToLeft_ == null) {
    this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body)
  }
  return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function(a) {
  if(this.inDocument_) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.rightToLeft_ = a
};
goog.ui.Component.prototype.hasChildren = function() {
  return!!this.children_ && this.children_.length != 0
};
goog.ui.Component.prototype.getChildCount = function() {
  return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function() {
  var a = [];
  this.forEachChild(function(b) {
    a.push(b.getId())
  });
  return a
};
goog.ui.Component.prototype.getChild = function(a) {
  return this.childIndex_ && a ? goog.object.get(this.childIndex_, a) || null : null
};
goog.ui.Component.prototype.getChildAt = function(a) {
  return this.children_ ? this.children_[a] || null : null
};
goog.ui.Component.prototype.forEachChild = function(a, b) {
  this.children_ && goog.array.forEach(this.children_, a, b)
};
goog.ui.Component.prototype.indexOfChild = function(a) {
  return this.children_ && a ? goog.array.indexOf(this.children_, a) : -1
};
goog.ui.Component.prototype.removeChild = function(a, b) {
  if(a) {
    var c = goog.isString(a) ? a : a.getId(), a = this.getChild(c);
    c && a && (goog.object.remove(this.childIndex_, c), goog.array.remove(this.children_, a), b && (a.exitDocument(), a.element_ && goog.dom.removeNode(a.element_)), a.setParent(null))
  }
  if(!a) {
    throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
  }
  return a
};
goog.ui.Component.prototype.removeChildAt = function(a, b) {
  return this.removeChild(this.getChildAt(a), b)
};
goog.ui.Component.prototype.removeChildren = function(a) {
  for(;this.hasChildren();) {
    this.removeChildAt(0, a)
  }
};
goog.ui.ControlRenderer = function() {
};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function(a, b) {
  var c = new a;
  c.getCssClass = function() {
    return b
  };
  return c
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.prototype.getAriaRole = function() {
};
goog.ui.ControlRenderer.prototype.createDom = function(a) {
  return a.getDomHelper().createDom("div", this.getClassNames(a).join(" "), a.getContent())
};
goog.ui.ControlRenderer.prototype.getContentElement = function(a) {
  return a
};
goog.ui.ControlRenderer.prototype.enableClassName = function(a, b, c) {
  if(a = a.getElement ? a.getElement() : a) {
    if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
      var d = this.getAppliedCombinedClassNames_(goog.dom.classes.get(a), b);
      d.push(b);
      goog.partial(c ? goog.dom.classes.add : goog.dom.classes.remove, a).apply(null, d)
    }else {
      goog.dom.classes.enable(a, b, c)
    }
  }
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function(a, b, c) {
  this.enableClassName(a, b, c)
};
goog.ui.ControlRenderer.prototype.canDecorate = function() {
  return true
};
goog.ui.ControlRenderer.prototype.decorate = function(a, b) {
  b.id && a.setId(b.id);
  var c = this.getContentElement(b);
  c && c.firstChild ? a.setContentInternal(c.firstChild.nextSibling ? goog.array.clone(c.childNodes) : c.firstChild) : a.setContentInternal(null);
  var d = 0, e = this.getCssClass(), f = this.getStructuralCssClass(), g = false, h = false, c = false, i = goog.dom.classes.get(b);
  goog.array.forEach(i, function(a) {
    !g && a == e ? (g = true, f == e && (h = true)) : !h && a == f ? h = true : d |= this.getStateFromClass(a)
  }, this);
  a.setStateInternal(d);
  g || (i.push(e), f == e && (h = true));
  h || i.push(f);
  var j = a.getExtraClassNames();
  j && i.push.apply(i, j);
  if(goog.userAgent.IE && !goog.userAgent.isVersion("7")) {
    var k = this.getAppliedCombinedClassNames_(i);
    k.length > 0 && (i.push.apply(i, k), c = true)
  }
  (!g || !h || j || c) && goog.dom.classes.set(b, i.join(" "));
  return b
};
goog.ui.ControlRenderer.prototype.initializeDom = function(a) {
  a.isRightToLeft() && this.setRightToLeft(a.getElement(), true);
  a.isEnabled() && this.setFocusable(a, a.isVisible())
};
goog.ui.ControlRenderer.prototype.setAriaRole = function(a) {
  var b = this.getAriaRole();
  b && goog.dom.a11y.setRole(a, b)
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(a, b) {
  goog.style.setUnselectable(a, !b, !goog.userAgent.IE && !goog.userAgent.OPERA)
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function(a, b) {
  this.enableClassName(a, this.getStructuralCssClass() + "-rtl", b)
};
goog.ui.ControlRenderer.prototype.isFocusable = function(a) {
  var b;
  return a.isSupportedState(goog.ui.Component.State.FOCUSED) && (b = a.getKeyEventTarget()) ? goog.dom.isFocusableTabIndex(b) : false
};
goog.ui.ControlRenderer.prototype.setFocusable = function(a, b) {
  var c;
  if(a.isSupportedState(goog.ui.Component.State.FOCUSED) && (c = a.getKeyEventTarget())) {
    if(!b && a.isFocused()) {
      try {
        c.blur()
      }catch(d) {
      }
      a.isFocused() && a.handleBlur(null)
    }
    goog.dom.isFocusableTabIndex(c) != b && goog.dom.setFocusableTabIndex(c, b)
  }
};
goog.ui.ControlRenderer.prototype.setVisible = function(a, b) {
  goog.style.showElement(a, b)
};
goog.ui.ControlRenderer.prototype.setState = function(a, b, c) {
  var d = a.getElement();
  if(d) {
    var e = this.getClassForState(b);
    e && this.enableClassName(a, e, c);
    this.updateAriaState(d, b, c)
  }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function(a, b, c) {
  if(!goog.ui.ControlRenderer.ARIA_STATE_MAP_) {
    goog.ui.ControlRenderer.ARIA_STATE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.dom.a11y.State.DISABLED, goog.ui.Component.State.ACTIVE, goog.dom.a11y.State.PRESSED, goog.ui.Component.State.SELECTED, goog.dom.a11y.State.SELECTED, goog.ui.Component.State.CHECKED, goog.dom.a11y.State.CHECKED, goog.ui.Component.State.OPENED, goog.dom.a11y.State.EXPANDED)
  }
  (b = goog.ui.ControlRenderer.ARIA_STATE_MAP_[b]) && goog.dom.a11y.setState(a, b, c)
};
goog.ui.ControlRenderer.prototype.setContent = function(a, b) {
  var c = this.getContentElement(a);
  if(c && (goog.dom.removeChildren(c), b)) {
    if(goog.isString(b)) {
      goog.dom.setTextContent(c, b)
    }else {
      var d = function(a) {
        if(a) {
          var b = goog.dom.getOwnerDocument(c);
          c.appendChild(goog.isString(a) ? b.createTextNode(a) : a)
        }
      };
      goog.isArray(b) ? goog.array.forEach(b, d) : goog.isArrayLike(b) && !("nodeType" in b) ? goog.array.forEach(goog.array.clone(b), d) : d(b)
    }
  }
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(a) {
  return a.getElement()
};
goog.ui.ControlRenderer.prototype.getCssClass = function() {
  return goog.ui.ControlRenderer.CSS_CLASS
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
  return[]
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
  return this.getCssClass()
};
goog.ui.ControlRenderer.prototype.getClassNames = function(a) {
  var b = this.getCssClass(), c = [b], d = this.getStructuralCssClass();
  d != b && c.push(d);
  b = this.getClassNamesForState(a.getState());
  c.push.apply(c, b);
  (a = a.getExtraClassNames()) && c.push.apply(c, a);
  goog.userAgent.IE && !goog.userAgent.isVersion("7") && c.push.apply(c, this.getAppliedCombinedClassNames_(c));
  return c
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(a, b) {
  var c = [];
  b && (a = a.concat([b]));
  goog.array.forEach(this.getIe6ClassCombinations(), function(d) {
    goog.array.every(d, goog.partial(goog.array.contains, a)) && (!b || goog.array.contains(d, b)) && c.push(d.join("_"))
  });
  return c
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function(a) {
  for(var b = [];a;) {
    var c = a & -a;
    b.push(this.getClassForState(c));
    a &= ~c
  }
  return b
};
goog.ui.ControlRenderer.prototype.getClassForState = function(a) {
  this.classByState_ || this.createClassByStateMap_();
  return this.classByState_[a]
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function(a) {
  this.stateByClass_ || this.createStateByClassMap_();
  a = parseInt(this.stateByClass_[a], 10);
  return isNaN(a) ? 0 : a
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
  var a = this.getStructuralCssClass();
  this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, a + "-disabled", goog.ui.Component.State.HOVER, a + "-hover", goog.ui.Component.State.ACTIVE, a + "-active", goog.ui.Component.State.SELECTED, a + "-selected", goog.ui.Component.State.CHECKED, a + "-checked", goog.ui.Component.State.FOCUSED, a + "-focused", goog.ui.Component.State.OPENED, a + "-open")
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
  this.classByState_ || this.createClassByStateMap_();
  this.stateByClass_ = goog.object.transpose(this.classByState_)
};
goog.ui.ButtonRenderer = function() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.ButtonRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.ButtonRenderer);
goog.ui.ButtonRenderer.CSS_CLASS = "goog-button";
goog.ui.ButtonRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.BUTTON
};
goog.ui.ButtonRenderer.prototype.updateAriaState = function(a, b, c) {
  b == goog.ui.Component.State.CHECKED ? goog.dom.a11y.setState(a, goog.dom.a11y.State.PRESSED, c) : goog.ui.ButtonRenderer.superClass_.updateAriaState.call(this, a, b, c)
};
goog.ui.ButtonRenderer.prototype.createDom = function(a) {
  var b = goog.ui.ButtonRenderer.superClass_.createDom.call(this, a), c = a.getTooltip();
  c && this.setTooltip(b, c);
  (c = a.getValue()) && this.setValue(b, c);
  a.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState(b, goog.ui.Component.State.CHECKED, false);
  return b
};
goog.ui.ButtonRenderer.prototype.decorate = function(a, b) {
  b = goog.ui.ButtonRenderer.superClass_.decorate.call(this, a, b);
  a.setValueInternal(this.getValue(b));
  a.setTooltipInternal(this.getTooltip(b));
  a.isSupportedState(goog.ui.Component.State.CHECKED) && this.updateAriaState(b, goog.ui.Component.State.CHECKED, false);
  return b
};
goog.ui.ButtonRenderer.prototype.getValue = goog.nullFunction;
goog.ui.ButtonRenderer.prototype.setValue = goog.nullFunction;
goog.ui.ButtonRenderer.prototype.getTooltip = function(a) {
  return a.title
};
goog.ui.ButtonRenderer.prototype.setTooltip = function(a, b) {
  if(a) {
    a.title = b || ""
  }
};
goog.ui.ButtonRenderer.prototype.setCollapsed = function(a, b) {
  var c = a.isRightToLeft(), d = this.getStructuralCssClass() + "-collapse-left", e = this.getStructuralCssClass() + "-collapse-right";
  a.enableClassName(c ? e : d, !!(b & goog.ui.ButtonSide.START));
  a.enableClassName(c ? d : e, !!(b & goog.ui.ButtonSide.END))
};
goog.ui.ButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.ButtonRenderer.CSS_CLASS
};
goog.ui.INLINE_BLOCK_CLASSNAME = "goog-inline-block";
goog.ui.CustomButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this)
};
goog.inherits(goog.ui.CustomButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(goog.ui.CustomButtonRenderer);
goog.ui.CustomButtonRenderer.CSS_CLASS = "goog-custom-button";
goog.ui.CustomButtonRenderer.prototype.createDom = function(a) {
  var b = this.getClassNames(a), b = {"class":goog.ui.INLINE_BLOCK_CLASSNAME + " " + b.join(" "), title:a.getTooltip() || ""};
  return a.getDomHelper().createDom("div", b, this.createButton(a.getContent(), a.getDomHelper()))
};
goog.ui.CustomButtonRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.BUTTON
};
goog.ui.CustomButtonRenderer.prototype.getContentElement = function(a) {
  return a && a.firstChild.firstChild
};
goog.ui.CustomButtonRenderer.prototype.createButton = function(a, b) {
  return b.createDom("div", goog.ui.INLINE_BLOCK_CLASSNAME + " " + (this.getCssClass() + "-outer-box"), b.createDom("div", goog.ui.INLINE_BLOCK_CLASSNAME + " " + (this.getCssClass() + "-inner-box"), a))
};
goog.ui.CustomButtonRenderer.prototype.canDecorate = function(a) {
  return a.tagName == "DIV"
};
goog.ui.CustomButtonRenderer.prototype.hasBoxStructure = function(a, b) {
  var c = a.getDomHelper().getFirstElementChild(b);
  return c && c.className.indexOf(this.getCssClass() + "-outer-box") != -1 && (c = a.getDomHelper().getFirstElementChild(c)) && c.className.indexOf(this.getCssClass() + "-inner-box") != -1 ? true : false
};
goog.ui.CustomButtonRenderer.prototype.decorate = function(a, b) {
  goog.ui.CustomButtonRenderer.trimTextNodes_(b, true);
  goog.ui.CustomButtonRenderer.trimTextNodes_(b, false);
  this.hasBoxStructure(a, b) || b.appendChild(this.createButton(b.childNodes, a.getDomHelper()));
  goog.dom.classes.add(b, goog.ui.INLINE_BLOCK_CLASSNAME, this.getCssClass());
  return goog.ui.CustomButtonRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.CustomButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.CustomButtonRenderer.CSS_CLASS
};
goog.ui.CustomButtonRenderer.trimTextNodes_ = function(a, b) {
  if(a) {
    for(var c = b ? a.firstChild : a.lastChild, d;c && c.parentNode == a;) {
      d = b ? c.nextSibling : c.previousSibling;
      if(c.nodeType == goog.dom.NodeType.TEXT) {
        var e = c.nodeValue;
        if(goog.string.trim(e) == "") {
          a.removeChild(c)
        }else {
          c.nodeValue = b ? goog.string.trimLeft(e) : goog.string.trimRight(e);
          break
        }
      }else {
        break
      }
      c = d
    }
  }
};
goog.events.KeyCodes = {MAC_ENTER:3, BACKSPACE:8, TAB:9, NUM_CENTER:12, ENTER:13, SHIFT:16, CTRL:17, ALT:18, PAUSE:19, CAPS_LOCK:20, ESC:27, SPACE:32, PAGE_UP:33, PAGE_DOWN:34, END:35, HOME:36, LEFT:37, UP:38, RIGHT:39, DOWN:40, PRINT_SCREEN:44, INSERT:45, DELETE:46, ZERO:48, ONE:49, TWO:50, THREE:51, FOUR:52, FIVE:53, SIX:54, SEVEN:55, EIGHT:56, NINE:57, QUESTION_MARK:63, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, 
V:86, W:87, X:88, Y:89, Z:90, META:91, CONTEXT_MENU:93, NUM_ZERO:96, NUM_ONE:97, NUM_TWO:98, NUM_THREE:99, NUM_FOUR:100, NUM_FIVE:101, NUM_SIX:102, NUM_SEVEN:103, NUM_EIGHT:104, NUM_NINE:105, NUM_MULTIPLY:106, NUM_PLUS:107, NUM_MINUS:109, NUM_PERIOD:110, NUM_DIVISION:111, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, NUMLOCK:144, SEMICOLON:186, DASH:189, EQUALS:187, COMMA:188, PERIOD:190, SLASH:191, APOSTROPHE:192, SINGLE_QUOTE:222, OPEN_SQUARE_BRACKET:219, 
BACKSLASH:220, CLOSE_SQUARE_BRACKET:221, WIN_KEY:224, MAC_FF_META:224, WIN_IME:229, PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
  if(a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) {
    return false
  }
  switch(a.keyCode) {
    case goog.events.KeyCodes.ALT:
    ;
    case goog.events.KeyCodes.CAPS_LOCK:
    ;
    case goog.events.KeyCodes.CONTEXT_MENU:
    ;
    case goog.events.KeyCodes.CTRL:
    ;
    case goog.events.KeyCodes.DOWN:
    ;
    case goog.events.KeyCodes.END:
    ;
    case goog.events.KeyCodes.ESC:
    ;
    case goog.events.KeyCodes.HOME:
    ;
    case goog.events.KeyCodes.INSERT:
    ;
    case goog.events.KeyCodes.LEFT:
    ;
    case goog.events.KeyCodes.MAC_FF_META:
    ;
    case goog.events.KeyCodes.META:
    ;
    case goog.events.KeyCodes.NUMLOCK:
    ;
    case goog.events.KeyCodes.NUM_CENTER:
    ;
    case goog.events.KeyCodes.PAGE_DOWN:
    ;
    case goog.events.KeyCodes.PAGE_UP:
    ;
    case goog.events.KeyCodes.PAUSE:
    ;
    case goog.events.KeyCodes.PHANTOM:
    ;
    case goog.events.KeyCodes.PRINT_SCREEN:
    ;
    case goog.events.KeyCodes.RIGHT:
    ;
    case goog.events.KeyCodes.SHIFT:
    ;
    case goog.events.KeyCodes.UP:
    ;
    case goog.events.KeyCodes.WIN_KEY:
      return false;
    default:
      return true
  }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e) {
  if(!goog.userAgent.IE && (!goog.userAgent.WEBKIT || !goog.userAgent.isVersion("525"))) {
    return true
  }
  if(goog.userAgent.MAC && e) {
    return goog.events.KeyCodes.isCharacterKey(a)
  }
  if(e && !d) {
    return false
  }
  if(!c && (b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT)) {
    return false
  }
  if(goog.userAgent.IE && d && b == a) {
    return false
  }
  switch(a) {
    case goog.events.KeyCodes.ENTER:
      return true;
    case goog.events.KeyCodes.ESC:
      return!goog.userAgent.WEBKIT
  }
  return goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
  if(a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE) {
    return true
  }
  if(a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY) {
    return true
  }
  if(a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z) {
    return true
  }
  if(goog.userAgent.WEBKIT && a == 0) {
    return true
  }
  switch(a) {
    case goog.events.KeyCodes.SPACE:
    ;
    case goog.events.KeyCodes.QUESTION_MARK:
    ;
    case goog.events.KeyCodes.NUM_PLUS:
    ;
    case goog.events.KeyCodes.NUM_MINUS:
    ;
    case goog.events.KeyCodes.NUM_PERIOD:
    ;
    case goog.events.KeyCodes.NUM_DIVISION:
    ;
    case goog.events.KeyCodes.SEMICOLON:
    ;
    case goog.events.KeyCodes.DASH:
    ;
    case goog.events.KeyCodes.EQUALS:
    ;
    case goog.events.KeyCodes.COMMA:
    ;
    case goog.events.KeyCodes.PERIOD:
    ;
    case goog.events.KeyCodes.SLASH:
    ;
    case goog.events.KeyCodes.APOSTROPHE:
    ;
    case goog.events.KeyCodes.SINGLE_QUOTE:
    ;
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    ;
    case goog.events.KeyCodes.BACKSLASH:
    ;
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
      return true;
    default:
      return false
  }
};
goog.events.KeyHandler = function(a, b) {
  goog.events.EventTarget.call(this);
  a && this.attach(a, b)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.EventType = {KEY:"key"};
goog.events.KeyHandler.safariKey_ = {3:goog.events.KeyCodes.ENTER, 12:goog.events.KeyCodes.NUMLOCK, 63232:goog.events.KeyCodes.UP, 63233:goog.events.KeyCodes.DOWN, 63234:goog.events.KeyCodes.LEFT, 63235:goog.events.KeyCodes.RIGHT, 63236:goog.events.KeyCodes.F1, 63237:goog.events.KeyCodes.F2, 63238:goog.events.KeyCodes.F3, 63239:goog.events.KeyCodes.F4, 63240:goog.events.KeyCodes.F5, 63241:goog.events.KeyCodes.F6, 63242:goog.events.KeyCodes.F7, 63243:goog.events.KeyCodes.F8, 63244:goog.events.KeyCodes.F9, 
63245:goog.events.KeyCodes.F10, 63246:goog.events.KeyCodes.F11, 63247:goog.events.KeyCodes.F12, 63248:goog.events.KeyCodes.PRINT_SCREEN, 63272:goog.events.KeyCodes.DELETE, 63273:goog.events.KeyCodes.HOME, 63275:goog.events.KeyCodes.END, 63276:goog.events.KeyCodes.PAGE_UP, 63277:goog.events.KeyCodes.PAGE_DOWN, 63289:goog.events.KeyCodes.NUMLOCK, 63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_ = {Up:goog.events.KeyCodes.UP, Down:goog.events.KeyCodes.DOWN, Left:goog.events.KeyCodes.LEFT, Right:goog.events.KeyCodes.RIGHT, Enter:goog.events.KeyCodes.ENTER, F1:goog.events.KeyCodes.F1, F2:goog.events.KeyCodes.F2, F3:goog.events.KeyCodes.F3, F4:goog.events.KeyCodes.F4, F5:goog.events.KeyCodes.F5, F6:goog.events.KeyCodes.F6, F7:goog.events.KeyCodes.F7, F8:goog.events.KeyCodes.F8, F9:goog.events.KeyCodes.F9, F10:goog.events.KeyCodes.F10, F11:goog.events.KeyCodes.F11, 
F12:goog.events.KeyCodes.F12, "U+007F":goog.events.KeyCodes.DELETE, Home:goog.events.KeyCodes.HOME, End:goog.events.KeyCodes.END, PageUp:goog.events.KeyCodes.PAGE_UP, PageDown:goog.events.KeyCodes.PAGE_DOWN, Insert:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ = {61:187, 59:186};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
  if(goog.userAgent.WEBKIT && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey)) {
    this.keyCode_ = this.lastKey_ = -1
  }
  goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.keyCode_ = goog.userAgent.GECKO && a.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ? goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[a.keyCode] : a.keyCode
};
goog.events.KeyHandler.prototype.handleKeyup_ = function() {
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.handleEvent = function(a) {
  var b = a.getBrowserEvent(), c, d;
  if(goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS) {
    c = this.keyCode_, d = c != goog.events.KeyCodes.ENTER && c != goog.events.KeyCodes.ESC ? b.keyCode : 0
  }else {
    if(goog.userAgent.WEBKIT && a.type == goog.events.EventType.KEYPRESS) {
      c = this.keyCode_, d = b.charCode >= 0 && b.charCode < 63232 && goog.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0
    }else {
      if(goog.userAgent.OPERA) {
        c = this.keyCode_, d = goog.events.KeyCodes.isCharacterKey(c) ? b.keyCode : 0
      }else {
        if(c = b.keyCode || this.keyCode_, d = b.charCode || 0, goog.userAgent.MAC && d == goog.events.KeyCodes.QUESTION_MARK && !c) {
          c = goog.events.KeyCodes.SLASH
        }
      }
    }
  }
  var e = c, f = b.keyIdentifier;
  c ? c >= 63232 && c in goog.events.KeyHandler.safariKey_ ? e = goog.events.KeyHandler.safariKey_[c] : c == 25 && a.shiftKey && (e = 9) : f && f in goog.events.KeyHandler.keyIdentifier_ && (e = goog.events.KeyHandler.keyIdentifier_[f]);
  a = e == this.lastKey_;
  this.lastKey_ = e;
  b = new goog.events.KeyEvent(e, d, a, b);
  try {
    this.dispatchEvent(b)
  }finally {
    b.dispose()
  }
};
goog.events.KeyHandler.prototype.getElement = function() {
  return this.element_
};
goog.events.KeyHandler.prototype.attach = function(a, b) {
  this.keyUpKey_ && this.detach();
  this.element_ = a;
  this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
  this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
  this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
};
goog.events.KeyHandler.prototype.detach = function() {
  if(this.keyPressKey_) {
    goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null
  }
  this.element_ = null;
  this.keyCode_ = this.lastKey_ = -1
};
goog.events.KeyHandler.prototype.disposeInternal = function() {
  goog.events.KeyHandler.superClass_.disposeInternal.call(this);
  this.detach()
};
goog.events.KeyEvent = function(a, b, c, d) {
  goog.events.BrowserEvent.call(this, d);
  this.type = goog.events.KeyHandler.EventType.KEY;
  this.keyCode = a;
  this.charCode = b;
  this.repeat = c
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function(a) {
  for(var b;a;) {
    b = goog.getUid(a);
    if(b = goog.ui.registry.defaultRenderers_[b]) {
      break
    }
    a = a.superClass_ ? a.superClass_.constructor : null
  }
  return b ? goog.isFunction(b.getInstance) ? b.getInstance() : new b : null
};
goog.ui.registry.setDefaultRenderer = function(a, b) {
  if(!goog.isFunction(a)) {
    throw Error("Invalid component class " + a);
  }
  if(!goog.isFunction(b)) {
    throw Error("Invalid renderer class " + b);
  }
  var c = goog.getUid(a);
  goog.ui.registry.defaultRenderers_[c] = b
};
goog.ui.registry.getDecoratorByClassName = function(a) {
  return a in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[a]() : null
};
goog.ui.registry.setDecoratorByClassName = function(a, b) {
  if(!a) {
    throw Error("Invalid class name " + a);
  }
  if(!goog.isFunction(b)) {
    throw Error("Invalid decorator function " + b);
  }
  goog.ui.registry.decoratorFunctions_[a] = b
};
goog.ui.registry.getDecorator = function(a) {
  for(var b = goog.dom.classes.get(a), c = 0, d = b.length;c < d;c++) {
    if(a = goog.ui.registry.getDecoratorByClassName(b[c])) {
      return a
    }
  }
  return null
};
goog.ui.registry.reset = function() {
  goog.ui.registry.defaultRenderers_ = {};
  goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.decorate = function(a) {
  var b = goog.ui.registry.getDecorator(a);
  b && b.decorate(a);
  return b
};
goog.ui.Control = function(a, b, c) {
  goog.ui.Component.call(this, c);
  this.renderer_ = b || goog.ui.registry.getDefaultRenderer(this.constructor);
  this.setContentInternal(a)
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = true;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = true;
goog.ui.Control.prototype.allowTextSelection_ = false;
goog.ui.Control.prototype.isHandleMouseEvents = function() {
  return this.handleMouseEvents_
};
goog.ui.Control.prototype.setHandleMouseEvents = function(a) {
  this.isInDocument() && a != this.handleMouseEvents_ && this.enableMouseEventHandling_(a);
  this.handleMouseEvents_ = a
};
goog.ui.Control.prototype.getKeyEventTarget = function() {
  return this.renderer_.getKeyEventTarget(this)
};
goog.ui.Control.prototype.getKeyHandler = function() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
goog.ui.Control.prototype.getRenderer = function() {
  return this.renderer_
};
goog.ui.Control.prototype.setRenderer = function(a) {
  if(this.isInDocument()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.getElement() && this.setElementInternal(null);
  this.renderer_ = a
};
goog.ui.Control.prototype.getExtraClassNames = function() {
  return this.extraClassNames_
};
goog.ui.Control.prototype.addClassName = function(a) {
  if(a) {
    this.extraClassNames_ ? goog.array.contains(this.extraClassNames_, a) || this.extraClassNames_.push(a) : this.extraClassNames_ = [a], this.renderer_.enableExtraClassName(this, a, true)
  }
};
goog.ui.Control.prototype.removeClassName = function(a) {
  if(a && this.extraClassNames_) {
    goog.array.remove(this.extraClassNames_, a);
    if(this.extraClassNames_.length == 0) {
      this.extraClassNames_ = null
    }
    this.renderer_.enableExtraClassName(this, a, false)
  }
};
goog.ui.Control.prototype.enableClassName = function(a, b) {
  b ? this.addClassName(a) : this.removeClassName(a)
};
goog.ui.Control.prototype.createDom = function() {
  var a = this.renderer_.createDom(this);
  this.setElementInternal(a);
  this.renderer_.setAriaRole(a);
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, false);
  this.isVisible() || this.renderer_.setVisible(a, false)
};
goog.ui.Control.prototype.getContentElement = function() {
  return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Control.prototype.canDecorate = function(a) {
  return this.renderer_.canDecorate(a)
};
goog.ui.Control.prototype.decorateInternal = function(a) {
  a = this.renderer_.decorate(this, a);
  this.setElementInternal(a);
  this.renderer_.setAriaRole(a);
  this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, false);
  this.visible_ = a.style.display != "none"
};
goog.ui.Control.prototype.enterDocument = function() {
  goog.ui.Control.superClass_.enterDocument.call(this);
  this.renderer_.initializeDom(this);
  if(this.supportedStates_ & ~goog.ui.Component.State.DISABLED && (this.isHandleMouseEvents() && this.enableMouseEventHandling_(true), this.isSupportedState(goog.ui.Component.State.FOCUSED))) {
    var a = this.getKeyEventTarget();
    if(a) {
      var b = this.getKeyHandler();
      b.attach(a);
      this.getHandler().listen(b, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(a, goog.events.EventType.FOCUS, this.handleFocus).listen(a, goog.events.EventType.BLUR, this.handleBlur)
    }
  }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function(a) {
  var b = this.getHandler(), c = this.getElement();
  a ? (b.listen(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut), goog.userAgent.IE && b.listen(c, goog.events.EventType.DBLCLICK, this.handleDblClick)) : (b.unlisten(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(c, 
  goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut), goog.userAgent.IE && b.unlisten(c, goog.events.EventType.DBLCLICK, this.handleDblClick))
};
goog.ui.Control.prototype.exitDocument = function() {
  goog.ui.Control.superClass_.exitDocument.call(this);
  this.keyHandler_ && this.keyHandler_.detach();
  this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, false)
};
goog.ui.Control.prototype.disposeInternal = function() {
  goog.ui.Control.superClass_.disposeInternal.call(this);
  this.keyHandler_ && (this.keyHandler_.dispose(), delete this.keyHandler_);
  delete this.renderer_;
  this.extraClassNames_ = this.content_ = null
};
goog.ui.Control.prototype.getContent = function() {
  return this.content_
};
goog.ui.Control.prototype.setContent = function(a) {
  this.renderer_.setContent(this.getElement(), a);
  this.setContentInternal(a)
};
goog.ui.Control.prototype.setContentInternal = function(a) {
  this.content_ = a
};
goog.ui.Control.prototype.getCaption = function() {
  var a = this.getContent();
  if(!a) {
    return""
  }
  if(goog.isString(a)) {
    return a
  }
  a = goog.isArray(a) ? goog.array.map(a, goog.dom.getTextContent).join("") : goog.dom.getTextContent(a);
  return goog.string.trim(a)
};
goog.ui.Control.prototype.setCaption = function(a) {
  this.setContent(a)
};
goog.ui.Control.prototype.setRightToLeft = function(a) {
  goog.ui.Control.superClass_.setRightToLeft.call(this, a);
  var b = this.getElement();
  b && this.renderer_.setRightToLeft(b, a)
};
goog.ui.Control.prototype.isAllowTextSelection = function() {
  return this.allowTextSelection_
};
goog.ui.Control.prototype.setAllowTextSelection = function(a) {
  this.allowTextSelection_ = a;
  var b = this.getElement();
  b && this.renderer_.setAllowTextSelection(b, a)
};
goog.ui.Control.prototype.isVisible = function() {
  return this.visible_
};
goog.ui.Control.prototype.setVisible = function(a, b) {
  if(b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    var c = this.getElement();
    c && this.renderer_.setVisible(c, a);
    this.isEnabled() && this.renderer_.setFocusable(this, a);
    this.visible_ = a;
    return true
  }
  return false
};
goog.ui.Control.prototype.isEnabled = function() {
  return!this.hasState(goog.ui.Component.State.DISABLED)
};
goog.ui.Control.prototype.isParentDisabled_ = function() {
  var a = this.getParent();
  return!!a && typeof a.isEnabled == "function" && !a.isEnabled()
};
goog.ui.Control.prototype.setEnabled = function(a) {
  !this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !a) && (a || (this.setActive(false), this.setHighlighted(false)), this.isVisible() && this.renderer_.setFocusable(this, a), this.setState(goog.ui.Component.State.DISABLED, !a))
};
goog.ui.Control.prototype.isHighlighted = function() {
  return this.hasState(goog.ui.Component.State.HOVER)
};
goog.ui.Control.prototype.setHighlighted = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.HOVER, a) && this.setState(goog.ui.Component.State.HOVER, a)
};
goog.ui.Control.prototype.isActive = function() {
  return this.hasState(goog.ui.Component.State.ACTIVE)
};
goog.ui.Control.prototype.setActive = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, a) && this.setState(goog.ui.Component.State.ACTIVE, a)
};
goog.ui.Control.prototype.isSelected = function() {
  return this.hasState(goog.ui.Component.State.SELECTED)
};
goog.ui.Control.prototype.setSelected = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.SELECTED, a) && this.setState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.Control.prototype.isChecked = function() {
  return this.hasState(goog.ui.Component.State.CHECKED)
};
goog.ui.Control.prototype.setChecked = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.CHECKED, a) && this.setState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.Control.prototype.isFocused = function() {
  return this.hasState(goog.ui.Component.State.FOCUSED)
};
goog.ui.Control.prototype.setFocused = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, a) && this.setState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.Control.prototype.isOpen = function() {
  return this.hasState(goog.ui.Component.State.OPENED)
};
goog.ui.Control.prototype.setOpen = function(a) {
  this.isTransitionAllowed(goog.ui.Component.State.OPENED, a) && this.setState(goog.ui.Component.State.OPENED, a)
};
goog.ui.Control.prototype.getState = function() {
  return this.state_
};
goog.ui.Control.prototype.hasState = function(a) {
  return!!(this.state_ & a)
};
goog.ui.Control.prototype.setState = function(a, b) {
  if(this.isSupportedState(a) && b != this.hasState(a)) {
    this.renderer_.setState(this, a, b), this.state_ = b ? this.state_ | a : this.state_ & ~a
  }
};
goog.ui.Control.prototype.setStateInternal = function(a) {
  this.state_ = a
};
goog.ui.Control.prototype.isSupportedState = function(a) {
  return!!(this.supportedStates_ & a)
};
goog.ui.Control.prototype.setSupportedState = function(a, b) {
  if(this.isInDocument() && this.hasState(a) && !b) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  !b && this.hasState(a) && this.setState(a, false);
  this.supportedStates_ = b ? this.supportedStates_ | a : this.supportedStates_ & ~a
};
goog.ui.Control.prototype.isAutoState = function(a) {
  return!!(this.autoStates_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setAutoStates = function(a, b) {
  this.autoStates_ = b ? this.autoStates_ | a : this.autoStates_ & ~a
};
goog.ui.Control.prototype.isDispatchTransitionEvents = function(a) {
  return!!(this.statesWithTransitionEvents_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function(a, b) {
  this.statesWithTransitionEvents_ = b ? this.statesWithTransitionEvents_ | a : this.statesWithTransitionEvents_ & ~a
};
goog.ui.Control.prototype.isTransitionAllowed = function(a, b) {
  return this.isSupportedState(a) && this.hasState(a) != b && (!(this.statesWithTransitionEvents_ & a) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a, b))) && !this.isDisposed()
};
goog.ui.Control.prototype.handleMouseOver = function(a) {
  !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true)
};
goog.ui.Control.prototype.handleMouseOut = function(a) {
  !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE) && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false), this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(false))
};
goog.ui.Control.isMouseEventWithinElement_ = function(a, b) {
  return!!a.relatedTarget && goog.dom.contains(b, a.relatedTarget)
};
goog.ui.Control.prototype.handleMouseDown = function(a) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true), a.isMouseActionButton() && (this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(true), this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()));
  !this.isAllowTextSelection() && a.isMouseActionButton() && a.preventDefault()
};
goog.ui.Control.prototype.handleMouseUp = function(a) {
  this.isEnabled() && (this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true), this.isActive() && this.performActionInternal(a) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false))
};
goog.ui.Control.prototype.handleDblClick = function(a) {
  this.isEnabled() && this.performActionInternal(a)
};
goog.ui.Control.prototype.performActionInternal = function(a) {
  this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
  this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(true);
  this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
  var b = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
  if(a) {
    for(var c = ["altKey", "ctrlKey", "metaKey", "shiftKey", "platformModifierKey"], d, e = 0;d = c[e];e++) {
      b[d] = a[d]
    }
  }
  return this.dispatchEvent(b)
};
goog.ui.Control.prototype.handleFocus = function() {
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(true)
};
goog.ui.Control.prototype.handleBlur = function() {
  this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false);
  this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(false)
};
goog.ui.Control.prototype.handleKeyEvent = function(a) {
  return this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), true) : false
};
goog.ui.Control.prototype.handleKeyEventInternal = function(a) {
  return a.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(a)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
  return new goog.ui.Control(null)
});
goog.ui.MenuSeparatorRenderer = function() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuSeparatorRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);
goog.ui.MenuSeparatorRenderer.CSS_CLASS = "goog-menuseparator";
goog.ui.MenuSeparatorRenderer.prototype.createDom = function(a) {
  return a.getDomHelper().createDom("div", this.getCssClass())
};
goog.ui.MenuSeparatorRenderer.prototype.decorate = function(a, b) {
  if(b.tagName == "HR") {
    var c = b, b = this.createDom(a);
    goog.dom.insertSiblingBefore(b, c);
    goog.dom.removeNode(c)
  }else {
    goog.dom.classes.add(b, this.getCssClass())
  }
  return b
};
goog.ui.MenuSeparatorRenderer.prototype.setContent = function() {
};
goog.ui.MenuSeparatorRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuSeparatorRenderer.CSS_CLASS
};
goog.ui.Separator = function(a, b) {
  goog.ui.Control.call(this, null, a || goog.ui.MenuSeparatorRenderer.getInstance(), b);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  this.setSupportedState(goog.ui.Component.State.HOVER, false);
  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.Separator, goog.ui.Control);
goog.ui.Separator.prototype.enterDocument = function() {
  goog.ui.Separator.superClass_.enterDocument.call(this);
  goog.dom.a11y.setRole(this.getElement(), "separator")
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
  return new goog.ui.Separator
});
goog.ui.ContainerRenderer = function() {
};
goog.addSingletonGetter(goog.ui.ContainerRenderer);
goog.ui.ContainerRenderer.getCustomRenderer = function(a, b) {
  var c = new a;
  c.getCssClass = function() {
    return b
  };
  return c
};
goog.ui.ContainerRenderer.CSS_CLASS = "goog-container";
goog.ui.ContainerRenderer.prototype.getAriaRole = function() {
};
goog.ui.ContainerRenderer.prototype.enableTabIndex = function(a, b) {
  if(a) {
    a.tabIndex = b ? 0 : -1
  }
};
goog.ui.ContainerRenderer.prototype.createDom = function(a) {
  return a.getDomHelper().createDom("div", this.getClassNames(a).join(" "))
};
goog.ui.ContainerRenderer.prototype.getContentElement = function(a) {
  return a
};
goog.ui.ContainerRenderer.prototype.canDecorate = function(a) {
  return a.tagName == "DIV"
};
goog.ui.ContainerRenderer.prototype.decorate = function(a, b) {
  b.id && a.setId(b.id);
  var c = this.getCssClass(), d = false, e = goog.dom.classes.get(b);
  e && goog.array.forEach(e, function(b) {
    b == c ? d = true : b && this.setStateFromClassName(a, b, c)
  }, this);
  d || goog.dom.classes.add(b, c);
  this.decorateChildren(a, this.getContentElement(b));
  return b
};
goog.ui.ContainerRenderer.prototype.setStateFromClassName = function(a, b, c) {
  b == c + "-disabled" ? a.setEnabled(false) : b == c + "-horizontal" ? a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL) : b == c + "-vertical" && a.setOrientation(goog.ui.Container.Orientation.VERTICAL)
};
goog.ui.ContainerRenderer.prototype.decorateChildren = function(a, b, c) {
  if(b) {
    for(var c = c || b.firstChild, d;c && c.parentNode == b;) {
      d = c.nextSibling;
      if(c.nodeType == goog.dom.NodeType.ELEMENT) {
        var e = this.getDecoratorForChild(c);
        e && (e.setElementInternal(c), a.isEnabled() || e.setEnabled(false), a.addChild(e), e.decorate(c))
      }else {
        (!c.nodeValue || goog.string.trim(c.nodeValue) == "") && b.removeChild(c)
      }
      c = d
    }
  }
};
goog.ui.ContainerRenderer.prototype.getDecoratorForChild = function(a) {
  return goog.ui.registry.getDecorator(a)
};
goog.ui.ContainerRenderer.prototype.initializeDom = function(a) {
  a = a.getElement();
  goog.style.setUnselectable(a, true, goog.userAgent.GECKO);
  if(goog.userAgent.IE) {
    a.hideFocus = true
  }
  var b = this.getAriaRole();
  b && goog.dom.a11y.setRole(a, b)
};
goog.ui.ContainerRenderer.prototype.getKeyEventTarget = function(a) {
  return a.getElement()
};
goog.ui.ContainerRenderer.prototype.getCssClass = function() {
  return goog.ui.ContainerRenderer.CSS_CLASS
};
goog.ui.ContainerRenderer.prototype.getClassNames = function(a) {
  var b = this.getCssClass(), c = a.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL, c = [b, c ? b + "-horizontal" : b + "-vertical"];
  a.isEnabled() || c.push(b + "-disabled");
  return c
};
goog.ui.ContainerRenderer.prototype.getDefaultOrientation = function() {
  return goog.ui.Container.Orientation.VERTICAL
};
goog.ui.Container = function(a, b, c) {
  goog.ui.Component.call(this, c);
  this.renderer_ = b || goog.ui.ContainerRenderer.getInstance();
  this.orientation_ = a || this.renderer_.getDefaultOrientation()
};
goog.inherits(goog.ui.Container, goog.ui.Component);
goog.ui.Container.EventType = {AFTER_SHOW:"aftershow", AFTER_HIDE:"afterhide"};
goog.ui.Container.Orientation = {HORIZONTAL:"horizontal", VERTICAL:"vertical"};
goog.ui.Container.prototype.keyEventTarget_ = null;
goog.ui.Container.prototype.keyHandler_ = null;
goog.ui.Container.prototype.renderer_ = null;
goog.ui.Container.prototype.orientation_ = null;
goog.ui.Container.prototype.visible_ = true;
goog.ui.Container.prototype.enabled_ = true;
goog.ui.Container.prototype.focusable_ = true;
goog.ui.Container.prototype.highlightedIndex_ = -1;
goog.ui.Container.prototype.openItem_ = null;
goog.ui.Container.prototype.mouseButtonPressed_ = false;
goog.ui.Container.prototype.allowFocusableChildren_ = false;
goog.ui.Container.prototype.openFollowsHighlight_ = true;
goog.ui.Container.prototype.childElementIdMap_ = null;
goog.ui.Container.prototype.getKeyEventTarget = function() {
  return this.keyEventTarget_ || this.renderer_.getKeyEventTarget(this)
};
goog.ui.Container.prototype.setKeyEventTarget = function(a) {
  if(this.focusable_) {
    var b = this.getKeyEventTarget(), c = this.isInDocument();
    this.keyEventTarget_ = a;
    var d = this.getKeyEventTarget();
    if(c) {
      this.keyEventTarget_ = b, this.enableFocusHandling_(false), this.keyEventTarget_ = a, this.getKeyHandler().attach(d), this.enableFocusHandling_(true)
    }
  }else {
    throw Error("Can't set key event target for container that doesn't support keyboard focus!");
  }
};
goog.ui.Container.prototype.getKeyHandler = function() {
  return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler(this.getKeyEventTarget()))
};
goog.ui.Container.prototype.getRenderer = function() {
  return this.renderer_
};
goog.ui.Container.prototype.setRenderer = function(a) {
  if(this.getElement()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.renderer_ = a
};
goog.ui.Container.prototype.createDom = function() {
  this.setElementInternal(this.renderer_.createDom(this))
};
goog.ui.Container.prototype.getContentElement = function() {
  return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Container.prototype.canDecorate = function(a) {
  return this.renderer_.canDecorate(a)
};
goog.ui.Container.prototype.decorateInternal = function(a) {
  this.setElementInternal(this.renderer_.decorate(this, a));
  if(a.style.display == "none") {
    this.visible_ = false
  }
};
goog.ui.Container.prototype.enterDocument = function() {
  goog.ui.Container.superClass_.enterDocument.call(this);
  this.forEachChild(function(a) {
    a.isInDocument() && this.registerChildId_(a)
  }, this);
  var a = this.getElement();
  this.renderer_.initializeDom(this);
  this.setVisible(this.visible_, true);
  this.getHandler().listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterItem).listen(this, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem).listen(this, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem).listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).listen(a, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(goog.dom.getOwnerDocument(a), goog.events.EventType.MOUSEUP, 
  this.handleDocumentMouseUp).listen(a, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOVER, goog.events.EventType.MOUSEOUT], this.handleChildMouseEvents);
  this.isFocusable() && this.enableFocusHandling_(true)
};
goog.ui.Container.prototype.enableFocusHandling_ = function(a) {
  var b = this.getHandler(), c = this.getKeyEventTarget();
  a ? b.listen(c, goog.events.EventType.FOCUS, this.handleFocus).listen(c, goog.events.EventType.BLUR, this.handleBlur).listen(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent) : b.unlisten(c, goog.events.EventType.FOCUS, this.handleFocus).unlisten(c, goog.events.EventType.BLUR, this.handleBlur).unlisten(this.getKeyHandler(), goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent)
};
goog.ui.Container.prototype.exitDocument = function() {
  this.setHighlightedIndex(-1);
  this.openItem_ && this.openItem_.setOpen(false);
  this.mouseButtonPressed_ = false;
  goog.ui.Container.superClass_.exitDocument.call(this)
};
goog.ui.Container.prototype.disposeInternal = function() {
  goog.ui.Container.superClass_.disposeInternal.call(this);
  if(this.keyHandler_) {
    this.keyHandler_.dispose(), this.keyHandler_ = null
  }
  this.renderer_ = this.openItem_ = this.childElementIdMap_ = null
};
goog.ui.Container.prototype.handleEnterItem = function() {
  return true
};
goog.ui.Container.prototype.handleHighlightItem = function(a) {
  var b = this.indexOfChild(a.target);
  if(b > -1 && b != this.highlightedIndex_) {
    var c = this.getHighlighted();
    c && c.setHighlighted(false);
    this.highlightedIndex_ = b;
    c = this.getHighlighted();
    this.isMouseButtonPressed() && c.setActive(true);
    this.openFollowsHighlight_ && this.openItem_ && c != this.openItem_ && (c.isSupportedState(goog.ui.Component.State.OPENED) ? c.setOpen(true) : this.openItem_.setOpen(false))
  }
  goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, a.target.getElement().id)
};
goog.ui.Container.prototype.handleUnHighlightItem = function(a) {
  if(a.target == this.getHighlighted()) {
    this.highlightedIndex_ = -1
  }
  goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, "")
};
goog.ui.Container.prototype.handleOpenItem = function(a) {
  if((a = a.target) && a != this.openItem_ && a.getParent() == this) {
    this.openItem_ && this.openItem_.setOpen(false), this.openItem_ = a
  }
};
goog.ui.Container.prototype.handleCloseItem = function(a) {
  if(a.target == this.openItem_) {
    this.openItem_ = null
  }
};
goog.ui.Container.prototype.handleMouseDown = function(a) {
  this.enabled_ && this.setMouseButtonPressed(true);
  var b = this.getKeyEventTarget();
  b && goog.dom.isFocusableTabIndex(b) ? b.focus() : a.preventDefault()
};
goog.ui.Container.prototype.handleDocumentMouseUp = function() {
  this.setMouseButtonPressed(false)
};
goog.ui.Container.prototype.handleChildMouseEvents = function(a) {
  var b = this.getOwnerControl(a.target);
  if(b) {
    switch(a.type) {
      case goog.events.EventType.MOUSEDOWN:
        b.handleMouseDown(a);
        break;
      case goog.events.EventType.MOUSEUP:
        b.handleMouseUp(a);
        break;
      case goog.events.EventType.MOUSEOVER:
        b.handleMouseOver(a);
        break;
      case goog.events.EventType.MOUSEOUT:
        b.handleMouseOut(a)
    }
  }
};
goog.ui.Container.prototype.getOwnerControl = function(a) {
  if(this.childElementIdMap_) {
    for(var b = this.getElement();a && a !== b;) {
      var c = a.id;
      if(c in this.childElementIdMap_) {
        return this.childElementIdMap_[c]
      }
      a = a.parentNode
    }
  }
  return null
};
goog.ui.Container.prototype.handleFocus = function() {
};
goog.ui.Container.prototype.handleBlur = function() {
  this.setHighlightedIndex(-1);
  this.setMouseButtonPressed(false);
  this.openItem_ && this.openItem_.setOpen(false)
};
goog.ui.Container.prototype.handleKeyEvent = function(a) {
  return this.isEnabled() && this.isVisible() && (this.getChildCount() != 0 || this.keyEventTarget_) && this.handleKeyEventInternal(a) ? (a.preventDefault(), a.stopPropagation(), true) : false
};
goog.ui.Container.prototype.handleKeyEventInternal = function(a) {
  var b = this.getHighlighted();
  if(b && typeof b.handleKeyEvent == "function" && b.handleKeyEvent(a)) {
    return true
  }
  if(this.openItem_ && this.openItem_ != b && typeof this.openItem_.handleKeyEvent == "function" && this.openItem_.handleKeyEvent(a)) {
    return true
  }
  if(a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) {
    return false
  }
  switch(a.keyCode) {
    case goog.events.KeyCodes.ESC:
      if(this.isFocusable()) {
        this.getKeyEventTarget().blur()
      }else {
        return false
      }
      break;
    case goog.events.KeyCodes.HOME:
      this.highlightFirst();
      break;
    case goog.events.KeyCodes.END:
      this.highlightLast();
      break;
    case goog.events.KeyCodes.UP:
      if(this.orientation_ == goog.ui.Container.Orientation.VERTICAL) {
        this.highlightPrevious()
      }else {
        return false
      }
      break;
    case goog.events.KeyCodes.LEFT:
      if(this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) {
        this.isRightToLeft() ? this.highlightNext() : this.highlightPrevious()
      }else {
        return false
      }
      break;
    case goog.events.KeyCodes.DOWN:
      if(this.orientation_ == goog.ui.Container.Orientation.VERTICAL) {
        this.highlightNext()
      }else {
        return false
      }
      break;
    case goog.events.KeyCodes.RIGHT:
      if(this.orientation_ == goog.ui.Container.Orientation.HORIZONTAL) {
        this.isRightToLeft() ? this.highlightPrevious() : this.highlightNext()
      }else {
        return false
      }
      break;
    default:
      return false
  }
  return true
};
goog.ui.Container.prototype.registerChildId_ = function(a) {
  var b = a.getElement(), b = b.id || (b.id = a.getId());
  if(!this.childElementIdMap_) {
    this.childElementIdMap_ = {}
  }
  this.childElementIdMap_[b] = a
};
goog.ui.Container.prototype.addChild = function(a, b) {
  goog.ui.Container.superClass_.addChild.call(this, a, b)
};
goog.ui.Container.prototype.addChildAt = function(a, b, c) {
  a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, true);
  a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, true);
  (this.isFocusable() || !this.isFocusableChildrenAllowed()) && a.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  a.setHandleMouseEvents(false);
  goog.ui.Container.superClass_.addChildAt.call(this, a, b, c);
  c && this.isInDocument() && this.registerChildId_(a);
  b <= this.highlightedIndex_ && this.highlightedIndex_++
};
goog.ui.Container.prototype.removeChild = function(a, b) {
  if(a = goog.isString(a) ? this.getChild(a) : a) {
    var c = this.indexOfChild(a);
    c != -1 && (c == this.highlightedIndex_ ? a.setHighlighted(false) : c < this.highlightedIndex_ && this.highlightedIndex_--);
    (c = a.getElement()) && c.id && goog.object.remove(this.childElementIdMap_, c.id)
  }
  a = goog.ui.Container.superClass_.removeChild.call(this, a, b);
  a.setHandleMouseEvents(true);
  return a
};
goog.ui.Container.prototype.getOrientation = function() {
  return this.orientation_
};
goog.ui.Container.prototype.setOrientation = function(a) {
  if(this.getElement()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.orientation_ = a
};
goog.ui.Container.prototype.isVisible = function() {
  return this.visible_
};
goog.ui.Container.prototype.setVisible = function(a, b) {
  if(b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
    this.visible_ = a;
    var c = this.getElement();
    c && (goog.style.showElement(c, a), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), this.enabled_ && this.visible_), b || this.dispatchEvent(this.visible_ ? goog.ui.Container.EventType.AFTER_SHOW : goog.ui.Container.EventType.AFTER_HIDE));
    return true
  }
  return false
};
goog.ui.Container.prototype.isEnabled = function() {
  return this.enabled_
};
goog.ui.Container.prototype.setEnabled = function(a) {
  if(this.enabled_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.ENABLE : goog.ui.Component.EventType.DISABLE)) {
    a ? (this.enabled_ = true, this.forEachChild(function(a) {
      a.wasDisabled ? delete a.wasDisabled : a.setEnabled(true)
    })) : (this.forEachChild(function(a) {
      a.isEnabled() ? a.setEnabled(false) : a.wasDisabled = true
    }), this.enabled_ = false, this.setMouseButtonPressed(false)), this.isFocusable() && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a && this.visible_)
  }
};
goog.ui.Container.prototype.isFocusable = function() {
  return this.focusable_
};
goog.ui.Container.prototype.setFocusable = function(a) {
  a != this.focusable_ && this.isInDocument() && this.enableFocusHandling_(a);
  this.focusable_ = a;
  this.enabled_ && this.visible_ && this.renderer_.enableTabIndex(this.getKeyEventTarget(), a)
};
goog.ui.Container.prototype.isFocusableChildrenAllowed = function() {
  return this.allowFocusableChildren_
};
goog.ui.Container.prototype.setFocusableChildrenAllowed = function(a) {
  this.allowFocusableChildren_ = a
};
goog.ui.Container.prototype.isOpenFollowsHighlight = function() {
  return this.openFollowsHighlight_
};
goog.ui.Container.prototype.setOpenFollowsHighlight = function(a) {
  this.openFollowsHighlight_ = a
};
goog.ui.Container.prototype.getHighlightedIndex = function() {
  return this.highlightedIndex_
};
goog.ui.Container.prototype.setHighlightedIndex = function(a) {
  (a = this.getChildAt(a)) ? a.setHighlighted(true) : this.highlightedIndex_ > -1 && this.getHighlighted().setHighlighted(false)
};
goog.ui.Container.prototype.setHighlighted = function(a) {
  this.setHighlightedIndex(this.indexOfChild(a))
};
goog.ui.Container.prototype.getHighlighted = function() {
  return this.getChildAt(this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightFirst = function() {
  this.highlightHelper(function(a, b) {
    return(a + 1) % b
  }, this.getChildCount() - 1)
};
goog.ui.Container.prototype.highlightLast = function() {
  this.highlightHelper(function(a, b) {
    a--;
    return a < 0 ? b - 1 : a
  }, 0)
};
goog.ui.Container.prototype.highlightNext = function() {
  this.highlightHelper(function(a, b) {
    return(a + 1) % b
  }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightPrevious = function() {
  this.highlightHelper(function(a, b) {
    a--;
    return a < 0 ? b - 1 : a
  }, this.highlightedIndex_)
};
goog.ui.Container.prototype.highlightHelper = function(a, b) {
  for(var c = b < 0 ? this.indexOfChild(this.openItem_) : b, d = this.getChildCount(), c = a.call(this, c, d), e = 0;e <= d;) {
    var f = this.getChildAt(c);
    if(f && this.canHighlightItem(f)) {
      return this.setHighlightedIndexFromKeyEvent(c), true
    }
    e++;
    c = a.call(this, c, d)
  }
  return false
};
goog.ui.Container.prototype.canHighlightItem = function(a) {
  return a.isVisible() && a.isEnabled() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent = function(a) {
  this.setHighlightedIndex(a)
};
goog.ui.Container.prototype.getOpenItem = function() {
  return this.openItem_
};
goog.ui.Container.prototype.isMouseButtonPressed = function() {
  return this.mouseButtonPressed_
};
goog.ui.Container.prototype.setMouseButtonPressed = function(a) {
  this.mouseButtonPressed_ = a
};
goog.ui.MenuHeaderRenderer = function() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.MenuHeaderRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuHeaderRenderer);
goog.ui.MenuHeaderRenderer.CSS_CLASS = "goog-menuheader";
goog.ui.MenuHeaderRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuHeaderRenderer.CSS_CLASS
};
goog.ui.MenuHeader = function(a, b, c) {
  goog.ui.Control.call(this, a, c || goog.ui.MenuHeaderRenderer.getInstance(), b);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  this.setSupportedState(goog.ui.Component.State.HOVER, false);
  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setStateInternal(goog.ui.Component.State.DISABLED)
};
goog.inherits(goog.ui.MenuHeader, goog.ui.Control);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS, function() {
  return new goog.ui.MenuHeader(null)
});
goog.ui.MenuItemRenderer = function() {
  goog.ui.ControlRenderer.call(this);
  this.classNameCache_ = []
};
goog.inherits(goog.ui.MenuItemRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.MenuItemRenderer);
goog.ui.MenuItemRenderer.CSS_CLASS = "goog-menuitem";
goog.ui.MenuItemRenderer.CompositeCssClassIndex_ = {HOVER:0, CHECKBOX:1, CONTENT:2};
goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_ = function(a) {
  var b = this.classNameCache_[a];
  if(!b) {
    switch(a) {
      case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:
        b = this.getStructuralCssClass() + "-highlight";
        break;
      case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:
        b = this.getStructuralCssClass() + "-checkbox";
        break;
      case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:
        b = this.getStructuralCssClass() + "-content"
    }
    this.classNameCache_[a] = b
  }
  return b
};
goog.ui.MenuItemRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.MENU_ITEM
};
goog.ui.MenuItemRenderer.prototype.createDom = function(a) {
  var b = a.getDomHelper().createDom("div", this.getClassNames(a).join(" "), this.createContent(a.getContent(), a.getDomHelper()));
  this.setEnableCheckBoxStructure(a, b, a.isSupportedState(goog.ui.Component.State.SELECTED) || a.isSupportedState(goog.ui.Component.State.CHECKED));
  return b
};
goog.ui.MenuItemRenderer.prototype.getContentElement = function(a) {
  return a && a.firstChild
};
goog.ui.MenuItemRenderer.prototype.decorate = function(a, b) {
  this.hasContentStructure(b) || b.appendChild(this.createContent(b.childNodes, a.getDomHelper()));
  goog.dom.classes.has(b, "goog-option") && (a.setCheckable(true), this.setCheckable(a, b, true));
  return goog.ui.MenuItemRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.MenuItemRenderer.prototype.setContent = function(a, b) {
  var c = this.getContentElement(a), d = this.hasCheckBoxStructure(a) ? c.firstChild : null;
  goog.ui.MenuItemRenderer.superClass_.setContent.call(this, a, b);
  d && !this.hasCheckBoxStructure(a) && c.insertBefore(d, c.firstChild || null)
};
goog.ui.MenuItemRenderer.prototype.hasContentStructure = function(a) {
  var a = goog.dom.getFirstElementChild(a), b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
  return!!a && a.className.indexOf(b) != -1
};
goog.ui.MenuItemRenderer.prototype.createContent = function(a, b) {
  var c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);
  return b.createDom("div", c, a)
};
goog.ui.MenuItemRenderer.prototype.setSelectable = function(a, b, c) {
  b && (goog.dom.a11y.setRole(b, c ? goog.dom.a11y.Role.MENU_ITEM_RADIO : this.getAriaRole()), this.setEnableCheckBoxStructure(a, b, c))
};
goog.ui.MenuItemRenderer.prototype.setCheckable = function(a, b, c) {
  b && (goog.dom.a11y.setRole(b, c ? goog.dom.a11y.Role.MENU_ITEM_CHECKBOX : this.getAriaRole()), this.setEnableCheckBoxStructure(a, b, c))
};
goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure = function(a) {
  if(a = this.getContentElement(a)) {
    var a = a.firstChild, b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);
    return!!a && !!a.className && a.className.indexOf(b) != -1
  }
  return false
};
goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure = function(a, b, c) {
  c != this.hasCheckBoxStructure(b) && (goog.dom.classes.enable(b, "goog-option", c), b = this.getContentElement(b), c ? (c = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX), b.insertBefore(a.getDomHelper().createDom("div", c), b.firstChild || null)) : b.removeChild(b.firstChild))
};
goog.ui.MenuItemRenderer.prototype.getClassForState = function(a) {
  switch(a) {
    case goog.ui.Component.State.HOVER:
      return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
    case goog.ui.Component.State.CHECKED:
    ;
    case goog.ui.Component.State.SELECTED:
      return"goog-option-selected";
    default:
      return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this, a)
  }
};
goog.ui.MenuItemRenderer.prototype.getStateFromClass = function(a) {
  var b = this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);
  switch(a) {
    case "goog-option-selected":
      return goog.ui.Component.State.CHECKED;
    case b:
      return goog.ui.Component.State.HOVER;
    default:
      return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this, a)
  }
};
goog.ui.MenuItemRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuItemRenderer.CSS_CLASS
};
goog.ui.MenuItem = function(a, b, c, d) {
  goog.ui.Control.call(this, a, d || goog.ui.MenuItemRenderer.getInstance(), c);
  this.setValue(b)
};
goog.inherits(goog.ui.MenuItem, goog.ui.Control);
goog.ui.MenuItem.prototype.getValue = function() {
  var a = this.getModel();
  return a != null ? a : this.getCaption()
};
goog.ui.MenuItem.prototype.setValue = function(a) {
  this.setModel(a)
};
goog.ui.MenuItem.prototype.setSelectable = function(a) {
  this.setSupportedState(goog.ui.Component.State.SELECTED, a);
  this.isChecked() && !a && this.setChecked(false);
  var b = this.getElement();
  b && this.getRenderer().setSelectable(this, b, a)
};
goog.ui.MenuItem.prototype.setCheckable = function(a) {
  this.setSupportedState(goog.ui.Component.State.CHECKED, a);
  var b = this.getElement();
  b && this.getRenderer().setCheckable(this, b, a)
};
goog.ui.MenuItem.prototype.getCaption = function() {
  var a = this.getContent();
  return goog.isArray(a) ? goog.array.map(a, function(a) {
    return goog.dom.classes.has(a, "goog-menuitem-accel") ? "" : goog.dom.getTextContent(a)
  }).join("") : goog.ui.MenuItem.superClass_.getCaption.call(this)
};
goog.ui.MenuItem.prototype.handleMouseUp = function(a) {
  var b = this.getParent();
  if(b) {
    var c = b.openingCoords;
    b.openingCoords = null;
    if(c && goog.isNumber(a.clientX) && (b = new goog.math.Coordinate(a.clientX, a.clientY), goog.math.Coordinate.equals(c, b))) {
      return
    }
  }
  goog.ui.MenuItem.superClass_.handleMouseUp.call(this, a)
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS, function() {
  return new goog.ui.MenuItem(null)
});
goog.ui.MenuRenderer = function() {
  goog.ui.ContainerRenderer.call(this)
};
goog.inherits(goog.ui.MenuRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.MenuRenderer);
goog.ui.MenuRenderer.CSS_CLASS = "goog-menu";
goog.ui.MenuRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.MENU
};
goog.ui.MenuRenderer.prototype.canDecorate = function(a) {
  return a.tagName == "UL" || goog.ui.MenuRenderer.superClass_.canDecorate.call(this, a)
};
goog.ui.MenuRenderer.prototype.getDecoratorForChild = function(a) {
  return a.tagName == "HR" ? new goog.ui.Separator : goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this, a)
};
goog.ui.MenuRenderer.prototype.containsElement = function(a, b) {
  return goog.dom.contains(a.getElement(), b)
};
goog.ui.MenuRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuRenderer.CSS_CLASS
};
goog.ui.MenuRenderer.prototype.initializeDom = function(a) {
  goog.ui.MenuRenderer.superClass_.initializeDom.call(this, a);
  a = a.getElement();
  goog.dom.a11y.setState(a, goog.dom.a11y.State.HASPOPUP, "true")
};
goog.ui.MenuSeparator = function(a) {
  goog.ui.Separator.call(this, goog.ui.MenuSeparatorRenderer.getInstance(), a)
};
goog.inherits(goog.ui.MenuSeparator, goog.ui.Separator);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {
  return new goog.ui.Separator
});
goog.ui.Menu = function(a, b) {
  goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, b || goog.ui.MenuRenderer.getInstance(), a);
  this.setFocusable(false)
};
goog.inherits(goog.ui.Menu, goog.ui.Container);
goog.ui.Menu.EventType = {BEFORE_SHOW:goog.ui.Component.EventType.BEFORE_SHOW, SHOW:goog.ui.Component.EventType.SHOW, BEFORE_HIDE:goog.ui.Component.EventType.HIDE, HIDE:goog.ui.Component.EventType.HIDE};
goog.ui.Menu.CSS_CLASS = goog.ui.MenuRenderer.CSS_CLASS;
goog.ui.Menu.prototype.allowAutoFocus_ = true;
goog.ui.Menu.prototype.allowHighlightDisabled_ = false;
goog.ui.Menu.prototype.getCssClass = function() {
  return this.getRenderer().getCssClass()
};
goog.ui.Menu.prototype.containsElement = function(a) {
  if(this.getRenderer().containsElement(this, a)) {
    return true
  }
  for(var b = 0, c = this.getChildCount();b < c;b++) {
    var d = this.getChildAt(b);
    if(typeof d.containsElement == "function" && d.containsElement(a)) {
      return true
    }
  }
  return false
};
goog.ui.Menu.prototype.addItem = function(a) {
  this.addChild(a, true)
};
goog.ui.Menu.prototype.addItemAt = function(a, b) {
  this.addChildAt(a, b, true)
};
goog.ui.Menu.prototype.removeItem = function(a) {
  (a = this.removeChild(a, true)) && a.dispose()
};
goog.ui.Menu.prototype.removeItemAt = function(a) {
  (a = this.removeChildAt(a, true)) && a.dispose()
};
goog.ui.Menu.prototype.getItemAt = function(a) {
  return this.getChildAt(a)
};
goog.ui.Menu.prototype.getItemCount = function() {
  return this.getChildCount()
};
goog.ui.Menu.prototype.getItems = function() {
  var a = [];
  this.forEachChild(function(b) {
    a.push(b)
  });
  return a
};
goog.ui.Menu.prototype.setPosition = function(a, b) {
  var c = this.isVisible();
  c || goog.style.showElement(this.getElement(), true);
  goog.style.setPageOffset(this.getElement(), a, b);
  c || goog.style.showElement(this.getElement(), false)
};
goog.ui.Menu.prototype.getPosition = function() {
  return this.isVisible() ? goog.style.getPageOffset(this.getElement()) : null
};
goog.ui.Menu.prototype.setAllowAutoFocus = function(a) {
  (this.allowAutoFocus_ = a) && this.setFocusable(true)
};
goog.ui.Menu.prototype.getAllowAutoFocus = function() {
  return this.allowAutoFocus_
};
goog.ui.Menu.prototype.setAllowHighlightDisabled = function(a) {
  this.allowHighlightDisabled_ = a
};
goog.ui.Menu.prototype.getAllowHighlightDisabled = function() {
  return this.allowHighlightDisabled_
};
goog.ui.Menu.prototype.setVisible = function(a, b, c) {
  (b = goog.ui.Menu.superClass_.setVisible.call(this, a, b)) && a && this.isInDocument() && this.allowAutoFocus_ && this.getKeyEventTarget().focus();
  this.openingCoords = a && c && goog.isNumber(c.clientX) ? new goog.math.Coordinate(c.clientX, c.clientY) : null;
  return b
};
goog.ui.Menu.prototype.handleEnterItem = function(a) {
  this.allowAutoFocus_ && this.getKeyEventTarget().focus();
  return goog.ui.Menu.superClass_.handleEnterItem.call(this, a)
};
goog.ui.Menu.prototype.highlightNextPrefix = function(a) {
  var b = RegExp("^" + goog.string.regExpEscape(a), "i");
  return this.highlightHelper(function(a, d) {
    var e = a < 0 ? 0 : a, f = false;
    do {
      ++a;
      a == d && (a = 0, f = true);
      var g = this.getChildAt(a).getCaption();
      if(g && g.match(b)) {
        return a
      }
    }while(!f || a != e);
    return this.getHighlightedIndex()
  }, this.getHighlightedIndex())
};
goog.ui.Menu.prototype.canHighlightItem = function(a) {
  return(this.allowHighlightDisabled_ || a.isEnabled()) && a.isVisible() && a.isSupportedState(goog.ui.Component.State.HOVER)
};
goog.ui.Menu.prototype.decorateInternal = function(a) {
  this.decorateContent(a);
  goog.ui.Menu.superClass_.decorateInternal.call(this, a)
};
goog.ui.Menu.prototype.decorateContent = function(a) {
  for(var b = this.getRenderer(), a = this.getDomHelper().getElementsByTagNameAndClass("div", b.getCssClass() + "-content", a), c, d = 0;c = a[d];d++) {
    b.decorateChildren(this, c)
  }
};
goog.ui.MenuButtonRenderer = function() {
  goog.ui.CustomButtonRenderer.call(this)
};
goog.inherits(goog.ui.MenuButtonRenderer, goog.ui.CustomButtonRenderer);
goog.addSingletonGetter(goog.ui.MenuButtonRenderer);
goog.ui.MenuButtonRenderer.CSS_CLASS = "goog-menu-button";
goog.ui.MenuButtonRenderer.WRAPPER_PROP_ = "__goog_wrapper_div";
if(goog.userAgent.GECKO) {
  goog.ui.MenuButtonRenderer.prototype.setContent = function(a, b) {
    var c = goog.ui.MenuButtonRenderer.superClass_.getContentElement.call(this, a && a.firstChild);
    c && goog.dom.replaceNode(this.createCaption(b, goog.dom.getDomHelper(a)), c)
  }
}
goog.ui.MenuButtonRenderer.prototype.getContentElement = function(a) {
  a = goog.ui.MenuButtonRenderer.superClass_.getContentElement.call(this, a && a.firstChild);
  if(goog.userAgent.GECKO && a && a[goog.ui.MenuButtonRenderer.WRAPPER_PROP_]) {
    a = a.firstChild
  }
  return a
};
goog.ui.MenuButtonRenderer.prototype.decorate = function(a, b) {
  var c = goog.dom.getElementsByTagNameAndClass("*", goog.ui.MenuRenderer.CSS_CLASS, b)[0];
  if(c) {
    goog.style.showElement(c, false);
    goog.dom.appendChild(goog.dom.getOwnerDocument(c).body, c);
    var d = new goog.ui.Menu;
    d.decorate(c);
    a.setMenu(d)
  }
  return goog.ui.MenuButtonRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.MenuButtonRenderer.prototype.createButton = function(a, b) {
  return goog.ui.MenuButtonRenderer.superClass_.createButton.call(this, [this.createCaption(a, b), this.createDropdown(b)], b)
};
goog.ui.MenuButtonRenderer.prototype.createCaption = function(a, b) {
  return goog.ui.MenuButtonRenderer.wrapCaption(a, this.getCssClass(), b)
};
goog.ui.MenuButtonRenderer.wrapCaption = function(a, b, c) {
  return c.createDom("div", goog.ui.INLINE_BLOCK_CLASSNAME + " " + (b + "-caption"), a)
};
goog.ui.MenuButtonRenderer.prototype.createDropdown = function(a) {
  return a.createDom("div", goog.ui.INLINE_BLOCK_CLASSNAME + " " + (this.getCssClass() + "-dropdown"), "\u00a0")
};
goog.ui.MenuButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.MenuButtonRenderer.CSS_CLASS
};
goog.string.StringBuffer = function(a, b) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  a != null && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.set = function(a) {
  this.clear();
  this.append(a)
};
goog.userAgent.jscript.HAS_JSCRIPT ? (goog.string.StringBuffer.prototype.bufferLength_ = 0, goog.string.StringBuffer.prototype.append = function(a, b, c) {
  b == null ? this.buffer_[this.bufferLength_++] = a : (this.buffer_.push.apply(this.buffer_, arguments), this.bufferLength_ = this.buffer_.length);
  return this
}) : goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(b != null) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  goog.userAgent.jscript.HAS_JSCRIPT ? this.bufferLength_ = this.buffer_.length = 0 : this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var a = this.buffer_.join("");
    this.clear();
    a && this.append(a);
    return a
  }else {
    return this.buffer_
  }
};
goog.positioning = {};
goog.positioning.Corner = {TOP_LEFT:0, TOP_RIGHT:2, BOTTOM_LEFT:1, BOTTOM_RIGHT:3, TOP_START:4, TOP_END:6, BOTTOM_START:5, BOTTOM_END:7};
goog.positioning.CornerBit = {BOTTOM:1, RIGHT:2, FLIP_RTL:4};
goog.positioning.Overflow = {IGNORE:0, ADJUST_X:1, FAIL_X:2, ADJUST_Y:4, FAIL_Y:8, RESIZE_WIDTH:16, RESIZE_HEIGHT:32};
goog.positioning.OverflowStatus = {NONE:0, ADJUSTED_X:1, ADJUSTED_Y:2, WIDTH_ADJUSTED:4, HEIGHT_ADJUSTED:8, FAILED_LEFT:16, FAILED_RIGHT:32, FAILED_TOP:64, FAILED_BOTTOM:128, FAILED_OUTSIDE_VIEWPORT:256};
goog.positioning.OverflowStatus.FAILED = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT | goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM | goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
goog.positioning.OverflowStatus.FAILED_HORIZONTAL = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT;
goog.positioning.OverflowStatus.FAILED_VERTICAL = goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM;
goog.positioning.positionAtAnchor = function(a, b, c, d, e, f, g, h) {
  var i, j = c.offsetParent;
  if(j) {
    var k = j.tagName == goog.dom.TagName.HTML || j.tagName == goog.dom.TagName.BODY;
    if(!k || goog.style.getComputedPosition(j) != "static") {
      i = goog.style.getPageOffset(j), k || (i = goog.math.Coordinate.difference(i, new goog.math.Coordinate(j.scrollLeft, j.scrollTop)))
    }
  }
  j = goog.positioning.getVisiblePart_(a);
  goog.style.translateRectForAnotherFrame(j, goog.dom.getDomHelper(a), goog.dom.getDomHelper(c));
  a = goog.positioning.getEffectiveCorner(a, b);
  b = new goog.math.Coordinate(a & goog.positioning.CornerBit.RIGHT ? j.left + j.width : j.left, a & goog.positioning.CornerBit.BOTTOM ? j.top + j.height : j.top);
  i && (b = goog.math.Coordinate.difference(b, i));
  e && (b.x += (a & goog.positioning.CornerBit.RIGHT ? -1 : 1) * e.x, b.y += (a & goog.positioning.CornerBit.BOTTOM ? -1 : 1) * e.y);
  var l;
  if(g && (l = goog.style.getVisibleRectForElement(c)) && i) {
    l.top = Math.max(0, l.top - i.y), l.right -= i.x, l.bottom -= i.y, l.left = Math.max(0, l.left - i.x)
  }
  return goog.positioning.positionAtCoordinate(b, c, d, f, l, g, h)
};
goog.positioning.getVisiblePart_ = function(a) {
  var b = goog.style.getBounds(a);
  (a = goog.style.getVisibleRectForElement(a)) && b.intersection(goog.math.Rect.createFromBox(a));
  return b
};
goog.positioning.positionAtCoordinate = function(a, b, c, d, e, f, g) {
  var a = a.clone(), h = goog.positioning.OverflowStatus.NONE, c = goog.positioning.getEffectiveCorner(b, c), i = goog.style.getSize(b), g = g ? g.clone() : i;
  if(d || c != goog.positioning.Corner.TOP_LEFT) {
    c & goog.positioning.CornerBit.RIGHT ? a.x -= g.width + (d ? d.right : 0) : d && (a.x += d.left), c & goog.positioning.CornerBit.BOTTOM ? a.y -= g.height + (d ? d.bottom : 0) : d && (a.y += d.top)
  }
  if(f && (h = e ? goog.positioning.adjustForViewport(a, g, e, f) : goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT, h & goog.positioning.OverflowStatus.FAILED)) {
    return h
  }
  goog.style.setPosition(b, a);
  goog.math.Size.equals(i, g) || goog.style.setSize(b, g);
  return h
};
goog.positioning.adjustForViewport = function(a, b, c, d) {
  var e = goog.positioning.OverflowStatus.NONE;
  if(a.x < c.left && d & goog.positioning.Overflow.ADJUST_X) {
    a.x = c.left, e |= goog.positioning.OverflowStatus.ADJUSTED_X
  }
  a.x < c.left && a.x + b.width > c.right && d & goog.positioning.Overflow.RESIZE_WIDTH && (b.width -= a.x + b.width - c.right, e |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED);
  if(a.x + b.width > c.right && d & goog.positioning.Overflow.ADJUST_X) {
    a.x = Math.max(c.right - b.width, c.left), e |= goog.positioning.OverflowStatus.ADJUSTED_X
  }
  d & goog.positioning.Overflow.FAIL_X && (e |= (a.x < c.left ? goog.positioning.OverflowStatus.FAILED_LEFT : 0) | (a.x + b.width > c.right ? goog.positioning.OverflowStatus.FAILED_RIGHT : 0));
  if(a.y < c.top && d & goog.positioning.Overflow.ADJUST_Y) {
    a.y = c.top, e |= goog.positioning.OverflowStatus.ADJUSTED_Y
  }
  a.y >= c.top && a.y + b.height > c.bottom && d & goog.positioning.Overflow.RESIZE_HEIGHT && (b.height -= a.y + b.height - c.bottom, e |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED);
  if(a.y + b.height > c.bottom && d & goog.positioning.Overflow.ADJUST_Y) {
    a.y = Math.max(c.bottom - b.height, c.top), e |= goog.positioning.OverflowStatus.ADJUSTED_Y
  }
  d & goog.positioning.Overflow.FAIL_Y && (e |= (a.y < c.top ? goog.positioning.OverflowStatus.FAILED_TOP : 0) | (a.y + b.height > c.bottom ? goog.positioning.OverflowStatus.FAILED_BOTTOM : 0));
  return e
};
goog.positioning.getEffectiveCorner = function(a, b) {
  return(b & goog.positioning.CornerBit.FLIP_RTL && goog.style.isRightToLeft(a) ? b ^ goog.positioning.CornerBit.RIGHT : b) & ~goog.positioning.CornerBit.FLIP_RTL
};
goog.positioning.flipCornerHorizontal = function(a) {
  return a ^ goog.positioning.CornerBit.RIGHT
};
goog.positioning.flipCornerVertical = function(a) {
  return a ^ goog.positioning.CornerBit.BOTTOM
};
goog.positioning.flipCorner = function(a) {
  return a ^ goog.positioning.CornerBit.BOTTOM ^ goog.positioning.CornerBit.RIGHT
};
goog.positioning.AbstractPosition = function() {
};
goog.positioning.AbstractPosition.prototype.reposition = function() {
};
goog.positioning.AnchoredPosition = function(a, b) {
  this.element = a;
  this.corner = b
};
goog.inherits(goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);
goog.positioning.AnchoredPosition.prototype.reposition = function(a, b, c) {
  goog.positioning.positionAtAnchor(this.element, this.corner, a, b, void 0, c)
};
goog.dom.ViewportSizeMonitor = function(a) {
  goog.events.EventTarget.call(this);
  this.window_ = a || window;
  this.listenerKey_ = goog.events.listen(this.window_, goog.events.EventType.RESIZE, this.handleResize_, false, this);
  this.size_ = goog.dom.getViewportSize(this.window_);
  if(this.isPollingRequired_()) {
    this.windowSizePollInterval_ = window.setInterval(goog.bind(this.checkForSizeChange_, this), goog.dom.ViewportSizeMonitor.WINDOW_SIZE_POLL_RATE)
  }
};
goog.inherits(goog.dom.ViewportSizeMonitor, goog.events.EventTarget);
goog.dom.ViewportSizeMonitor.getInstanceForWindow = function(a) {
  var a = a || window, b = goog.getUid(a);
  return goog.dom.ViewportSizeMonitor.windowInstanceMap_[b] = goog.dom.ViewportSizeMonitor.windowInstanceMap_[b] || new goog.dom.ViewportSizeMonitor(a)
};
goog.dom.ViewportSizeMonitor.windowInstanceMap_ = {};
goog.dom.ViewportSizeMonitor.WINDOW_SIZE_POLL_RATE = 500;
goog.dom.ViewportSizeMonitor.prototype.listenerKey_ = null;
goog.dom.ViewportSizeMonitor.prototype.window_ = null;
goog.dom.ViewportSizeMonitor.prototype.size_ = null;
goog.dom.ViewportSizeMonitor.prototype.windowSizePollInterval_ = null;
goog.dom.ViewportSizeMonitor.prototype.isPollingRequired_ = function() {
  return goog.userAgent.WEBKIT && goog.userAgent.WINDOWS || goog.userAgent.OPERA && this.window_.self != this.window_.top
};
goog.dom.ViewportSizeMonitor.prototype.getSize = function() {
  return this.size_ ? this.size_.clone() : null
};
goog.dom.ViewportSizeMonitor.prototype.disposeInternal = function() {
  goog.dom.ViewportSizeMonitor.superClass_.disposeInternal.call(this);
  if(this.listenerKey_) {
    goog.events.unlistenByKey(this.listenerKey_), this.listenerKey_ = null
  }
  if(this.windowSizePollInterval_) {
    window.clearInterval(this.windowSizePollInterval_), this.windowSizePollInterval_ = null
  }
  this.size_ = this.window_ = null
};
goog.dom.ViewportSizeMonitor.prototype.handleResize_ = function() {
  this.checkForSizeChange_()
};
goog.dom.ViewportSizeMonitor.prototype.checkForSizeChange_ = function() {
  var a = goog.dom.getViewportSize(this.window_);
  if(!goog.math.Size.equals(a, this.size_)) {
    this.size_ = a, this.dispatchEvent(goog.events.EventType.RESIZE)
  }
};
goog.Timer = function(a, b) {
  goog.events.EventTarget.call(this);
  this.interval_ = a || 1;
  this.timerObject_ = b || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global.window;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
  this.interval_ = a;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
  if(this.enabled) {
    var a = goog.now() - this.last_;
    if(a > 0 && a < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a)
    }else {
      if(this.dispatchTick(), this.enabled) {
        this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()
      }
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
  this.enabled = true;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = false;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_), this.timer_ = null
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
  if(goog.isFunction(a)) {
    c && (a = goog.bind(a, c))
  }else {
    if(a && typeof a.handleEvent == "function") {
      a = goog.bind(a.handleEvent, a)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  return b > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
  goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.dom.iframe = {};
goog.dom.iframe.BLANK_SOURCE = 'javascript:""';
goog.dom.iframe.STYLES_ = "border:0;vertical-align:bottom;";
goog.dom.iframe.createBlank = function(a, b) {
  return a.createDom("iframe", {frameborder:0, style:goog.dom.iframe.STYLES_ + (b || ""), src:goog.dom.iframe.BLANK_SOURCE})
};
goog.dom.iframe.writeContent = function(a, b) {
  var c = goog.dom.getFrameContentDocument(a);
  c.open();
  c.write(b);
  c.close()
};
goog.dom.iframe.createWithContent = function(a, b, c, d, e) {
  var f = goog.dom.getDomHelper(a), g = [];
  e || g.push("<!DOCTYPE html>");
  g.push("<html><head>", b, "</head><body>", c, "</body></html>");
  b = goog.dom.iframe.createBlank(f, d);
  a.appendChild(b);
  goog.dom.iframe.writeContent(b, g.join(""));
  return b
};
goog.events.FocusHandler = function(a) {
  goog.events.EventTarget.call(this);
  this.element_ = a;
  a = goog.userAgent.IE ? "focusout" : "blur";
  this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
  this.listenKeyOut_ = goog.events.listen(this.element_, a, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {FOCUSIN:"focusin", FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent = function(a) {
  var b = a.getBrowserEvent(), b = new goog.events.BrowserEvent(b);
  b.type = a.type == "focusin" || a.type == "focus" ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
  try {
    this.dispatchEvent(b)
  }finally {
    b.dispose()
  }
};
goog.events.FocusHandler.prototype.disposeInternal = function() {
  goog.events.FocusHandler.superClass_.disposeInternal.call(this);
  goog.events.unlistenByKey(this.listenKeyIn_);
  goog.events.unlistenByKey(this.listenKeyOut_);
  delete this.element_
};
goog.fx = {};
goog.fx.Dragger = function(a, b, c) {
  goog.events.EventTarget.call(this);
  this.target = a;
  this.handle = b || a;
  this.limits = c || new goog.math.Rect(NaN, NaN, NaN, NaN);
  this.document_ = goog.dom.getOwnerDocument(a);
  this.eventHandler_ = new goog.events.EventHandler(this);
  goog.events.listen(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, false, this)
};
goog.inherits(goog.fx.Dragger, goog.events.EventTarget);
goog.fx.Dragger.HAS_SET_CAPTURE_ = goog.userAgent.IE || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.3");
goog.fx.Dragger.EventType = {START:"start", BEFOREDRAG:"beforedrag", DRAG:"drag", END:"end"};
goog.fx.Dragger.prototype.clientX = 0;
goog.fx.Dragger.prototype.clientY = 0;
goog.fx.Dragger.prototype.screenX = 0;
goog.fx.Dragger.prototype.screenY = 0;
goog.fx.Dragger.prototype.startX = 0;
goog.fx.Dragger.prototype.startY = 0;
goog.fx.Dragger.prototype.deltaX = 0;
goog.fx.Dragger.prototype.deltaY = 0;
goog.fx.Dragger.prototype.enabled_ = true;
goog.fx.Dragger.prototype.dragging_ = false;
goog.fx.Dragger.prototype.hysteresisDistanceSquared_ = 0;
goog.fx.Dragger.prototype.mouseDownTime_ = 0;
goog.fx.Dragger.prototype.ieDragStartCancellingOn_ = false;
goog.fx.Dragger.prototype.getHandler = function() {
  return this.eventHandler_
};
goog.fx.Dragger.prototype.setLimits = function(a) {
  this.limits = a || new goog.math.Rect(NaN, NaN, NaN, NaN)
};
goog.fx.Dragger.prototype.setHysteresis = function(a) {
  this.hysteresisDistanceSquared_ = Math.pow(a, 2)
};
goog.fx.Dragger.prototype.getHysteresis = function() {
  return Math.sqrt(this.hysteresisDistanceSquared_)
};
goog.fx.Dragger.prototype.setScrollTarget = function(a) {
  this.scrollTarget_ = a
};
goog.fx.Dragger.prototype.setCancelIeDragStart = function(a) {
  this.ieDragStartCancellingOn_ = a
};
goog.fx.Dragger.prototype.getEnabled = function() {
  return this.enabled_
};
goog.fx.Dragger.prototype.setEnabled = function(a) {
  this.enabled_ = a
};
goog.fx.Dragger.prototype.disposeInternal = function() {
  goog.fx.Dragger.superClass_.disposeInternal.call(this);
  goog.events.unlisten(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, false, this);
  this.eventHandler_.dispose();
  delete this.target;
  delete this.handle;
  delete this.eventHandler_
};
goog.fx.Dragger.prototype.startDrag = function(a) {
  var b = a.type == goog.events.EventType.MOUSEDOWN;
  if(this.enabled_ && !this.dragging_ && (!b || a.isMouseActionButton())) {
    this.maybeReinitTouchEvent_(a);
    if(this.hysteresisDistanceSquared_ == 0) {
      if(this.initializeDrag_(a), this.dragging_) {
        a.preventDefault()
      }else {
        return
      }
    }else {
      a.preventDefault()
    }
    this.setupDragHandlers();
    this.clientX = this.startX = a.clientX;
    this.clientY = this.startY = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    this.deltaX = this.target.offsetLeft;
    this.deltaY = this.target.offsetTop;
    this.pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll();
    this.mouseDownTime_ = goog.now()
  }
};
goog.fx.Dragger.prototype.setupDragHandlers = function() {
  var a = this.document_, b = a.documentElement, c = !goog.fx.Dragger.HAS_SET_CAPTURE_;
  this.eventHandler_.listen(a, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.handleMove_, c);
  this.eventHandler_.listen(a, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.endDrag, c);
  goog.fx.Dragger.HAS_SET_CAPTURE_ ? (b.setCapture(false), this.eventHandler_.listen(b, goog.events.EventType.LOSECAPTURE, this.endDrag)) : this.eventHandler_.listen(goog.dom.getWindow(a), goog.events.EventType.BLUR, this.endDrag);
  goog.userAgent.IE && this.ieDragStartCancellingOn_ && this.eventHandler_.listen(a, goog.events.EventType.DRAGSTART, goog.events.Event.preventDefault);
  this.scrollTarget_ && this.eventHandler_.listen(this.scrollTarget_, goog.events.EventType.SCROLL, this.onScroll_, c)
};
goog.fx.Dragger.prototype.initializeDrag_ = function(a) {
  if(this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.START, this, a.clientX, a.clientY, a)) !== false) {
    this.dragging_ = true
  }
};
goog.fx.Dragger.prototype.endDrag = function(a, b) {
  this.eventHandler_.removeAll();
  goog.fx.Dragger.HAS_SET_CAPTURE_ && this.document_.releaseCapture();
  if(this.dragging_) {
    this.maybeReinitTouchEvent_(a);
    this.dragging_ = false;
    var c = this.limitX(this.deltaX), d = this.limitY(this.deltaY);
    this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.END, this, a.clientX, a.clientY, a, c, d, b || a.type == goog.events.EventType.TOUCHCANCEL))
  }
  (a.type == goog.events.EventType.TOUCHEND || a.type == goog.events.EventType.TOUCHCANCEL) && a.preventDefault()
};
goog.fx.Dragger.prototype.endDragCancel = function(a) {
  this.endDrag(a, true)
};
goog.fx.Dragger.prototype.maybeReinitTouchEvent_ = function(a) {
  var b = a.type;
  b == goog.events.EventType.TOUCHSTART || b == goog.events.EventType.TOUCHMOVE ? a.init(a.getBrowserEvent().targetTouches[0], a.currentTarget) : (b == goog.events.EventType.TOUCHEND || b == goog.events.EventType.TOUCHCANCEL) && a.init(a.getBrowserEvent().changedTouches[0], a.currentTarget)
};
goog.fx.Dragger.prototype.handleMove_ = function(a) {
  if(this.enabled_) {
    this.maybeReinitTouchEvent_(a);
    var b = a.clientX - this.clientX, c = a.clientY - this.clientY;
    this.clientX = a.clientX;
    this.clientY = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    if(!this.dragging_) {
      var d = this.startX - this.clientX, e = this.startY - this.clientY;
      if(d * d + e * e > this.hysteresisDistanceSquared_ && (this.initializeDrag_(a), !this.dragging_)) {
        this.endDrag(a);
        return
      }
    }
    c = this.calculatePosition_(b, c);
    b = c.x;
    c = c.y;
    this.dragging_ && this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.BEFOREDRAG, this, a.clientX, a.clientY, a, b, c)) !== false && (this.doDrag(a, b, c, false), a.preventDefault())
  }
};
goog.fx.Dragger.prototype.calculatePosition_ = function(a, b) {
  var c = goog.dom.getDomHelper(this.document_).getDocumentScroll();
  a += c.x - this.pageScroll.x;
  b += c.y - this.pageScroll.y;
  this.pageScroll = c;
  this.deltaX += a;
  this.deltaY += b;
  var c = this.limitX(this.deltaX), d = this.limitY(this.deltaY);
  return new goog.math.Coordinate(c, d)
};
goog.fx.Dragger.prototype.onScroll_ = function(a) {
  var b = this.calculatePosition_(0, 0);
  a.clientX = this.pageScroll.x - this.clientX;
  a.clientY = this.pageScroll.y - this.clientY;
  this.doDrag(a, b.x, b.y, true)
};
goog.fx.Dragger.prototype.doDrag = function(a, b, c) {
  this.defaultAction(b, c);
  this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.DRAG, this, a.clientX, a.clientY, a, b, c))
};
goog.fx.Dragger.prototype.limitX = function(a) {
  var b = this.limits, c = !isNaN(b.left) ? b.left : null, b = !isNaN(b.width) ? b.width : 0;
  return Math.min(c != null ? c + b : Infinity, Math.max(c != null ? c : -Infinity, a))
};
goog.fx.Dragger.prototype.limitY = function(a) {
  var b = this.limits, c = !isNaN(b.top) ? b.top : null, b = !isNaN(b.height) ? b.height : 0;
  return Math.min(c != null ? c + b : Infinity, Math.max(c != null ? c : -Infinity, a))
};
goog.fx.Dragger.prototype.defaultAction = function(a, b) {
  this.target.style.left = a + "px";
  this.target.style.top = b + "px"
};
goog.fx.DragEvent = function(a, b, c, d, e, f, g, h) {
  goog.events.Event.call(this, a);
  this.clientX = c;
  this.clientY = d;
  this.browserEvent = e;
  this.left = goog.isDef(f) ? f : b.deltaX;
  this.top = goog.isDef(g) ? g : b.deltaY;
  this.dragger = b;
  this.dragCanceled = !!h
};
goog.inherits(goog.fx.DragEvent, goog.events.Event);
goog.structs.getCount = function(a) {
  return typeof a.getCount == "function" ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
  if(typeof a.getValues == "function") {
    return a.getValues()
  }
  if(goog.isString(a)) {
    return a.split("")
  }
  if(goog.isArrayLike(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
  if(typeof a.getKeys == "function") {
    return a.getKeys()
  }
  if(typeof a.getValues != "function") {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      for(var b = [], a = a.length, c = 0;c < a;c++) {
        b.push(c)
      }
      return b
    }
    return goog.object.getKeys(a)
  }
};
goog.structs.contains = function(a, b) {
  return typeof a.contains == "function" ? a.contains(b) : typeof a.containsValue == "function" ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
  return typeof a.isEmpty == "function" ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
  typeof a.clear == "function" ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
  if(typeof a.forEach == "function") {
    a.forEach(b, c)
  }else {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c)
    }else {
      for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a)
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if(typeof a.filter == "function") {
    return a.filter(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      b.call(c, f[h], void 0, a) && d.push(f[h])
    }
  }
  return d
};
goog.structs.map = function(a, b, c) {
  if(typeof a.map == "function") {
    return a.map(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      d[e[h]] = b.call(c, f[h], e[h], a)
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      d[h] = b.call(c, f[h], void 0, a)
    }
  }
  return d
};
goog.structs.some = function(a, b, c) {
  if(typeof a.some == "function") {
    return a.some(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(b.call(c, e[g], d && d[g], a)) {
      return true
    }
  }
  return false
};
goog.structs.every = function(a, b, c) {
  if(typeof a.every == "function") {
    return a.every(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(!b.call(c, e[g], d && d[g], a)) {
      return false
    }
  }
  return true
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this
};
goog.iter.toIterator = function(a) {
  if(a instanceof goog.iter.Iterator) {
    return a
  }
  if(typeof a.__iterator__ == "function") {
    return a.__iterator__(false)
  }
  if(goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for(;;) {
        if(b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if(b in a) {
          return a[b++]
        }else {
          b++
        }
      }
    };
    return c
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if(goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c)
    }catch(d) {
      if(d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }else {
    a = goog.iter.toIterator(a);
    try {
      for(;;) {
        b.call(c, a.next(), void 0, a)
      }
    }catch(e) {
      if(e !== goog.iter.StopIteration) {
        throw e;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(b.call(c, d, void 0, a)) {
        return d
      }
    }
  };
  return d
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  arguments.length > 1 && (d = a, e = b);
  if(f == 0) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if(f > 0 && d >= e || f < 0 && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d += f;
    return a
  };
  return g
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      return b.call(c, d, void 0, a)
    }
  };
  return d
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a)
  });
  return e
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(b.call(c, a.next(), void 0, a)) {
        return true
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return false
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(!b.call(c, a.next(), void 0, a)) {
        return false
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return true
};
goog.iter.chain = function(a) {
  var b = arguments, c = b.length, d = 0, e = new goog.iter.Iterator;
  e.next = function() {
    try {
      if(d >= c) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator(b[d]).next()
    }catch(a) {
      if(a !== goog.iter.StopIteration || d >= c) {
        throw a;
      }else {
        return d++, this.next()
      }
    }
  };
  return e
};
goog.iter.dropWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = true;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(!e || !b.call(c, d, void 0, a)) {
        return e = false, d
      }
    }
  };
  return d
};
goog.iter.takeWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = true;
  d.next = function() {
    for(;;) {
      if(e) {
        var d = a.next();
        if(b.call(c, d, void 0, a)) {
          return d
        }else {
          e = false
        }
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return d
};
goog.iter.toArray = function(a) {
  if(goog.isArrayLike(a)) {
    return goog.array.toArray(a)
  }
  var a = goog.iter.toIterator(a), b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a)
  });
  return b
};
goog.iter.equals = function(a, b) {
  var a = goog.iter.toIterator(a), b = goog.iter.toIterator(b), c, d;
  try {
    for(;;) {
      c = d = false;
      var e = a.next();
      c = true;
      var f = b.next();
      d = true;
      if(e != f) {
        break
      }
    }
  }catch(g) {
    if(g !== goog.iter.StopIteration) {
      throw g;
    }else {
      if(c && !d) {
        return false
      }
      if(!d) {
        try {
          b.next()
        }catch(h) {
          if(h !== goog.iter.StopIteration) {
            throw h;
          }
          return true
        }
      }
    }
  }
  return false
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next()
  }catch(c) {
    if(c != goog.iter.StopIteration) {
      throw c;
    }
    return b
  }
};
goog.iter.product = function(a) {
  if(goog.array.some(arguments, function(a) {
    return!a.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if(d) {
      for(var a = goog.array.map(d, function(a, b) {
        return c[b][a]
      }), b = d.length - 1;b >= 0;b--) {
        goog.asserts.assert(d);
        if(d[b] < c[b].length - 1) {
          d[b]++;
          break
        }
        if(b == 0) {
          d = null;
          break
        }
        d[b] = 0
      }
      return a
    }
    throw goog.iter.StopIteration;
  };
  return b
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  var c = arguments.length;
  if(c > 1) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    a && this.addAll(a)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for(var a = [], b = 0;b < this.keys_.length;b++) {
    a.push(this.map_[this.keys_[b]])
  }
  return a
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
  for(var b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    if(goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return true
    }
  }
  return false
};
goog.structs.Map.prototype.equals = function(a, b) {
  if(this === a) {
    return true
  }
  if(this.count_ != a.getCount()) {
    return false
  }
  var c = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var d, e = 0;d = this.keys_[e];e++) {
    if(!c(this.get(d), a.get(d))) {
      return false
    }
  }
  return true
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.count_ == 0
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), true) : false
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    for(var a = 0, b = 0;a < this.keys_.length;) {
      var c = this.keys_[a];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
      a++
    }
    this.keys_.length = b
  }
  if(this.count_ != this.keys_.length) {
    for(var d = {}, b = a = 0;a < this.keys_.length;) {
      c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++
    }
    this.keys_.length = b
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
  var b;
  a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
  for(var c = 0;c < b.length;c++) {
    this.set(b[c], a[c])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  for(var a = new goog.structs.Map, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c)
  }
  return a
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for(var a = {}, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c]
  }
  return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.keys_, d = this.map_, e = this.version_, f = this, g = new goog.iter.Iterator;
  g.next = function() {
    for(;;) {
      if(e != f.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(b >= c.length) {
        throw goog.iter.StopIteration;
      }
      var g = c[b++];
      return a ? g : d[g]
    }
  };
  return g
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
};
goog.ui.Dialog = function(a, b, c) {
  goog.ui.Component.call(this, c);
  this.class_ = a || "modal-dialog";
  this.useIframeMask_ = !!b;
  this.buttons_ = goog.ui.Dialog.ButtonSet.createOkCancel()
};
goog.inherits(goog.ui.Dialog, goog.ui.Component);
goog.ui.Dialog.prototype.focusHandler_ = null;
goog.ui.Dialog.prototype.escapeToCancel_ = true;
goog.ui.Dialog.prototype.hasTitleCloseButton_ = true;
goog.ui.Dialog.prototype.useIframeMask_ = false;
goog.ui.Dialog.prototype.modal_ = true;
goog.ui.Dialog.prototype.draggable_ = true;
goog.ui.Dialog.prototype.backgroundElementOpacity_ = 0.5;
goog.ui.Dialog.prototype.title_ = "";
goog.ui.Dialog.prototype.content_ = "";
goog.ui.Dialog.prototype.buttons_ = null;
goog.ui.Dialog.prototype.dragger_ = null;
goog.ui.Dialog.prototype.visible_ = false;
goog.ui.Dialog.prototype.disposeOnHide_ = false;
goog.ui.Dialog.prototype.bgEl_ = null;
goog.ui.Dialog.prototype.bgIframeEl_ = null;
goog.ui.Dialog.prototype.titleEl_ = null;
goog.ui.Dialog.prototype.titleTextEl_ = null;
goog.ui.Dialog.prototype.titleId_ = null;
goog.ui.Dialog.prototype.titleCloseEl_ = null;
goog.ui.Dialog.prototype.contentEl_ = null;
goog.ui.Dialog.prototype.buttonEl_ = null;
goog.ui.Dialog.prototype.setTitle = function(a) {
  this.title_ = a;
  this.titleTextEl_ && goog.dom.setTextContent(this.titleTextEl_, a)
};
goog.ui.Dialog.prototype.getTitle = function() {
  return this.title_
};
goog.ui.Dialog.prototype.setContent = function(a) {
  this.content_ = a;
  if(this.contentEl_) {
    this.contentEl_.innerHTML = a
  }
};
goog.ui.Dialog.prototype.getContent = function() {
  return this.content_
};
goog.ui.Dialog.prototype.renderIfNoDom_ = function() {
  this.getElement() || this.render()
};
goog.ui.Dialog.prototype.getContentElement = function() {
  this.renderIfNoDom_();
  return this.contentEl_
};
goog.ui.Dialog.prototype.getTitleElement = function() {
  this.renderIfNoDom_();
  return this.titleEl_
};
goog.ui.Dialog.prototype.getTitleTextElement = function() {
  this.renderIfNoDom_();
  return this.titleTextEl_
};
goog.ui.Dialog.prototype.getTitleCloseElement = function() {
  this.renderIfNoDom_();
  return this.titleCloseEl_
};
goog.ui.Dialog.prototype.getButtonElement = function() {
  this.renderIfNoDom_();
  return this.buttonEl_
};
goog.ui.Dialog.prototype.getDialogElement = function() {
  this.renderIfNoDom_();
  return this.getElement()
};
goog.ui.Dialog.prototype.getBackgroundElement = function() {
  this.renderIfNoDom_();
  return this.bgEl_
};
goog.ui.Dialog.prototype.getBackgroundElementOpacity = function() {
  return this.backgroundElementOpacity_
};
goog.ui.Dialog.prototype.setBackgroundElementOpacity = function(a) {
  this.backgroundElementOpacity_ = a;
  this.bgEl_ && goog.style.setOpacity(this.bgEl_, this.backgroundElementOpacity_)
};
goog.ui.Dialog.prototype.setModal = function(a) {
  this.modal_ = a;
  this.manageBackgroundDom_();
  var b = this.getDomHelper();
  this.isInDocument() && a && this.isVisible() && (this.bgIframeEl_ && b.insertSiblingBefore(this.bgIframeEl_, this.getElement()), this.bgEl_ && b.insertSiblingBefore(this.bgEl_, this.getElement()), this.resizeBackground_())
};
goog.ui.Dialog.prototype.getModal = function() {
  return this.modal_
};
goog.ui.Dialog.prototype.getClass = function() {
  return this.class_
};
goog.ui.Dialog.prototype.setDraggable = function(a) {
  if((this.draggable_ = a) && !this.dragger_ && this.getElement()) {
    this.dragger_ = this.createDraggableTitleDom_()
  }else {
    if(!this.draggable_ && this.dragger_) {
      this.getElement() && goog.dom.classes.remove(this.titleEl_, this.class_ + "-title-draggable"), this.dragger_.dispose(), this.dragger_ = null
    }
  }
};
goog.ui.Dialog.prototype.createDraggableTitleDom_ = function() {
  var a = new goog.fx.Dragger(this.getElement(), this.titleEl_);
  goog.dom.classes.add(this.titleEl_, this.class_ + "-title-draggable");
  return a
};
goog.ui.Dialog.prototype.getDraggable = function() {
  return this.draggable_
};
goog.ui.Dialog.prototype.createDom = function() {
  this.manageBackgroundDom_();
  var a = this.getDomHelper();
  this.setElementInternal(a.createDom("div", {className:this.class_, tabIndex:0}, this.titleEl_ = a.createDom("div", {className:this.class_ + "-title", id:this.getId()}, this.titleTextEl_ = a.createDom("span", this.class_ + "-title-text", this.title_), this.titleCloseEl_ = a.createDom("span", this.class_ + "-title-close")), this.contentEl_ = a.createDom("div", this.class_ + "-content"), this.buttonEl_ = a.createDom("div", this.class_ + "-buttons"), this.tabCatcherEl_ = a.createDom("span", {tabIndex:0})));
  this.titleId_ = this.titleEl_.id;
  goog.dom.a11y.setRole(this.getElement(), "dialog");
  goog.dom.a11y.setState(this.getElement(), "labelledby", this.titleId_ || "");
  if(this.content_) {
    this.contentEl_.innerHTML = this.content_
  }
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);
  goog.style.showElement(this.getElement(), false);
  this.buttons_ && this.buttons_.attachToElement(this.buttonEl_)
};
goog.ui.Dialog.prototype.manageBackgroundDom_ = function() {
  if(this.useIframeMask_ && this.modal_ && !this.bgIframeEl_) {
    this.bgIframeEl_ = goog.dom.iframe.createBlank(this.getDomHelper()), this.bgIframeEl_.className = this.class_ + "-bg", goog.style.showElement(this.bgIframeEl_, false), goog.style.setOpacity(this.bgIframeEl_, 0)
  }else {
    if((!this.useIframeMask_ || !this.modal_) && this.bgIframeEl_) {
      goog.dom.removeNode(this.bgIframeEl_), this.bgIframeEl_ = null
    }
  }
  if(this.modal_ && !this.bgEl_) {
    this.bgEl_ = this.getDomHelper().createDom("div", this.class_ + "-bg"), goog.style.setOpacity(this.bgEl_, this.backgroundElementOpacity_), goog.style.showElement(this.bgEl_, false)
  }else {
    if(!this.modal_ && this.bgEl_) {
      goog.dom.removeNode(this.bgEl_), this.bgEl_ = null
    }
  }
};
goog.ui.Dialog.prototype.render = function(a) {
  if(this.isInDocument()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.getElement() || this.createDom();
  a = a || this.getDomHelper().getDocument().body;
  this.renderBackground_(a);
  goog.ui.Dialog.superClass_.render.call(this, a)
};
goog.ui.Dialog.prototype.renderBackground_ = function(a) {
  this.bgIframeEl_ && a.appendChild(this.bgIframeEl_);
  this.bgEl_ && a.appendChild(this.bgEl_)
};
goog.ui.Dialog.prototype.renderBefore = function() {
  throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
};
goog.ui.Dialog.prototype.canDecorate = function(a) {
  return a && a.tagName && a.tagName == "DIV" && goog.ui.Dialog.superClass_.canDecorate.call(this, a)
};
goog.ui.Dialog.prototype.decorateInternal = function(a) {
  goog.ui.Dialog.superClass_.decorateInternal.call(this, a);
  goog.dom.classes.add(this.getElement(), this.class_);
  a = this.class_ + "-content";
  if(this.contentEl_ = goog.dom.getElementsByTagNameAndClass(null, a, this.getElement())[0]) {
    this.content_ = this.contentEl_.innerHTML
  }else {
    this.contentEl_ = this.getDomHelper().createDom("div", a);
    if(this.content_) {
      this.contentEl_.innerHTML = this.content_
    }
    this.getElement().appendChild(this.contentEl_)
  }
  var a = this.class_ + "-title", b = this.class_ + "-title-text", c = this.class_ + "-title-close";
  (this.titleEl_ = goog.dom.getElementsByTagNameAndClass(null, a, this.getElement())[0]) ? (this.titleTextEl_ = goog.dom.getElementsByTagNameAndClass(null, b, this.titleEl_)[0], this.titleCloseEl_ = goog.dom.getElementsByTagNameAndClass(null, c, this.titleEl_)[0]) : (this.titleEl_ = this.getDomHelper().createDom("div", a), this.getElement().insertBefore(this.titleEl_, this.contentEl_));
  this.titleTextEl_ ? this.title_ = goog.dom.getTextContent(this.titleTextEl_) : (this.titleTextEl_ = this.getDomHelper().createDom("span", b, this.title_), this.titleEl_.appendChild(this.titleTextEl_));
  goog.dom.a11y.setState(this.getElement(), "labelledby", this.titleId_ || "");
  if(!this.titleCloseEl_) {
    this.titleCloseEl_ = this.getDomHelper().createDom("span", c), this.titleEl_.appendChild(this.titleCloseEl_)
  }
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);
  a = this.class_ + "-buttons";
  (this.buttonEl_ = goog.dom.getElementsByTagNameAndClass(null, a, this.getElement())[0]) ? (this.buttons_ = new goog.ui.Dialog.ButtonSet(this.getDomHelper()), this.buttons_.decorate(this.buttonEl_)) : (this.buttonEl_ = this.getDomHelper().createDom("div", a), this.getElement().appendChild(this.buttonEl_), this.buttons_ && this.buttons_.attachToElement(this.buttonEl_));
  this.manageBackgroundDom_();
  this.renderBackground_(goog.dom.getOwnerDocument(this.getElement()).body);
  goog.style.showElement(this.getElement(), false)
};
goog.ui.Dialog.prototype.enterDocument = function() {
  goog.ui.Dialog.superClass_.enterDocument.call(this);
  this.focusHandler_ = new goog.events.FocusHandler(this.getDomHelper().getDocument());
  if(this.draggable_ && !this.dragger_) {
    this.dragger_ = this.createDraggableTitleDom_()
  }
  this.getHandler().listen(this.titleCloseEl_, goog.events.EventType.CLICK, this.onTitleCloseClick_).listen(this.focusHandler_, goog.events.FocusHandler.EventType.FOCUSIN, this.onFocus_);
  goog.dom.a11y.setRole(this.getElement(), "dialog");
  this.titleTextEl_.id !== "" && goog.dom.a11y.setState(this.getElement(), "labelledby", this.titleTextEl_.id)
};
goog.ui.Dialog.prototype.exitDocument = function() {
  this.isVisible() && this.setVisible(false);
  this.focusHandler_.dispose();
  this.focusHandler_ = null;
  if(this.dragger_) {
    this.dragger_.dispose(), this.dragger_ = null
  }
  goog.ui.Dialog.superClass_.exitDocument.call(this)
};
goog.ui.Dialog.prototype.setVisible = function(a) {
  if(a != this.visible_) {
    var b = this.getDomHelper().getDocument(), c = goog.dom.getWindow(b) || window;
    this.isInDocument() || this.render(b.body);
    a ? (this.resizeBackground_(), this.reposition(), this.getHandler().listen(this.getElement(), goog.events.EventType.KEYDOWN, this.onKey_).listen(this.getElement(), goog.events.EventType.KEYPRESS, this.onKey_).listen(c, goog.events.EventType.RESIZE, this.onResize_)) : this.getHandler().unlisten(this.getElement(), goog.events.EventType.KEYDOWN, this.onKey_).unlisten(this.getElement(), goog.events.EventType.KEYPRESS, this.onKey_).unlisten(c, goog.events.EventType.RESIZE, this.onResize_);
    this.bgIframeEl_ && goog.style.showElement(this.bgIframeEl_, a);
    this.bgEl_ && goog.style.showElement(this.bgEl_, a);
    goog.style.showElement(this.getElement(), a);
    a && this.focus();
    (this.visible_ = a) ? this.getHandler().listen(this.buttonEl_, goog.events.EventType.CLICK, this.onButtonClick_) : (this.getHandler().unlisten(this.buttonEl_, goog.events.EventType.CLICK, this.onButtonClick_), this.dispatchEvent(goog.ui.Dialog.EventType.AFTER_HIDE), this.disposeOnHide_ && this.dispose())
  }
};
goog.ui.Dialog.prototype.isVisible = function() {
  return this.visible_
};
goog.ui.Dialog.prototype.focus = function() {
  try {
    this.getElement().focus()
  }catch(a) {
  }
  if(this.getButtonSet()) {
    var b = this.getButtonSet().getDefault();
    if(b) {
      for(var c = this.getDomHelper().getDocument(), d = this.buttonEl_.getElementsByTagName("button"), e = 0, f;f = d[e];e++) {
        if(f.name == b) {
          try {
            if(goog.userAgent.WEBKIT || goog.userAgent.OPERA) {
              var g = c.createElement("input");
              g.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.getElement().appendChild(g);
              g.focus();
              this.getElement().removeChild(g)
            }
            f.focus()
          }catch(h) {
          }
          break
        }
      }
    }
  }
};
goog.ui.Dialog.prototype.resizeBackground_ = function() {
  this.bgIframeEl_ && goog.style.showElement(this.bgIframeEl_, false);
  this.bgEl_ && goog.style.showElement(this.bgEl_, false);
  var a = this.getDomHelper().getDocument(), b = goog.dom.getWindow(a) || window, c = goog.dom.getViewportSize(b), b = Math.max(a.body.scrollWidth, c.width), a = Math.max(a.body.scrollHeight, c.height);
  this.bgIframeEl_ && (goog.style.showElement(this.bgIframeEl_, true), goog.style.setSize(this.bgIframeEl_, b, a));
  this.bgEl_ && (goog.style.showElement(this.bgEl_, true), goog.style.setSize(this.bgEl_, b, a));
  if(this.draggable_) {
    c = goog.style.getSize(this.getElement()), this.dragger_.limits = new goog.math.Rect(0, 0, b - c.width, a - c.height)
  }
};
goog.ui.Dialog.prototype.reposition = function() {
  var a = this.getDomHelper().getDocument(), b = goog.dom.getWindow(a) || window;
  if(goog.style.getComputedPosition(this.getElement()) == "fixed") {
    var c = a = 0
  }else {
    c = this.getDomHelper().getDocumentScroll(), a = c.x, c = c.y
  }
  var d = goog.style.getSize(this.getElement()), b = goog.dom.getViewportSize(b), a = Math.max(a + b.width / 2 - d.width / 2, 0), c = Math.max(c + b.height / 2 - d.height / 2, 0);
  goog.style.setPosition(this.getElement(), a, c)
};
goog.ui.Dialog.prototype.onTitleCloseClick_ = function() {
  if(this.hasTitleCloseButton_) {
    var a = this.getButtonSet(), b = a && a.getCancel();
    b ? (a = a.get(b), this.dispatchEvent(new goog.ui.Dialog.Event(b, a)) && this.setVisible(false)) : this.setVisible(false)
  }
};
goog.ui.Dialog.prototype.getHasTitleCloseButton = function() {
  return this.hasTitleCloseButton_
};
goog.ui.Dialog.prototype.setHasTitleCloseButton = function(a) {
  this.hasTitleCloseButton_ = a;
  this.titleCloseEl_ && goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_)
};
goog.ui.Dialog.prototype.isEscapeToCancel = function() {
  return this.escapeToCancel_
};
goog.ui.Dialog.prototype.setEscapeToCancel = function(a) {
  this.escapeToCancel_ = a
};
goog.ui.Dialog.prototype.setDisposeOnHide = function(a) {
  this.disposeOnHide_ = a
};
goog.ui.Dialog.prototype.getDisposeOnHide = function() {
  return this.disposeOnHide_
};
goog.ui.Dialog.prototype.disposeInternal = function() {
  goog.ui.Dialog.superClass_.disposeInternal.call(this);
  if(this.bgEl_) {
    goog.dom.removeNode(this.bgEl_), this.bgEl_ = null
  }
  if(this.bgIframeEl_) {
    goog.dom.removeNode(this.bgIframeEl_), this.bgIframeEl_ = null
  }
  this.tabCatcherEl_ = this.buttonEl_ = this.titleCloseEl_ = null
};
goog.ui.Dialog.prototype.setButtonSet = function(a) {
  this.buttons_ = a;
  if(this.buttonEl_) {
    this.buttons_ ? this.buttons_.attachToElement(this.buttonEl_) : this.buttonEl_.innerHTML = ""
  }
};
goog.ui.Dialog.prototype.getButtonSet = function() {
  return this.buttons_
};
goog.ui.Dialog.prototype.onButtonClick_ = function(a) {
  if((a = this.findParentButton_(a.target)) && !a.disabled) {
    var a = a.name, b = this.getButtonSet().get(a);
    this.dispatchEvent(new goog.ui.Dialog.Event(a, b)) && this.setVisible(false)
  }
};
goog.ui.Dialog.prototype.findParentButton_ = function(a) {
  for(;a != null && a != this.buttonEl_;) {
    if(a.tagName == "BUTTON") {
      return a
    }
    a = a.parentNode
  }
  return null
};
goog.ui.Dialog.prototype.onKey_ = function(a) {
  var b = false, c = false, d = this.getButtonSet(), e = a.target;
  if(a.type == goog.events.EventType.KEYDOWN) {
    if(this.escapeToCancel_ && a.keyCode == goog.events.KeyCodes.ESC) {
      var f = d && d.getCancel(), e = e.tagName == "SELECT" && !e.disabled;
      f && !e ? (c = true, b = d.get(f), b = this.dispatchEvent(new goog.ui.Dialog.Event(f, b))) : e || (b = true)
    }else {
      a.keyCode == goog.events.KeyCodes.TAB && a.shiftKey && e == this.getElement() && (c = true)
    }
  }else {
    if(a.keyCode == goog.events.KeyCodes.ENTER) {
      if(e.tagName == "BUTTON") {
        f = e.name
      }else {
        if(d) {
          var g = d.getDefault(), h = g && d.getButton(g), e = (e.tagName == "TEXTAREA" || e.tagName == "SELECT") && !e.disabled;
          h && !h.disabled && !e && (f = g)
        }
      }
      f && (c = true, b = this.dispatchEvent(new goog.ui.Dialog.Event(f, String(d.get(f)))))
    }
  }
  if(b || c) {
    a.stopPropagation(), a.preventDefault()
  }
  b && this.setVisible(false)
};
goog.ui.Dialog.prototype.onResize_ = function() {
  this.resizeBackground_()
};
goog.ui.Dialog.prototype.onFocus_ = function(a) {
  this.tabCatcherEl_ == a.target && goog.Timer.callOnce(this.focusElement_, 0, this)
};
goog.ui.Dialog.prototype.focusElement_ = function() {
  goog.userAgent.IE && this.getDomHelper().getDocument().body.focus();
  this.getElement().focus()
};
goog.ui.Dialog.Event = function(a, b) {
  this.type = goog.ui.Dialog.EventType.SELECT;
  this.key = a;
  this.caption = b
};
goog.inherits(goog.ui.Dialog.Event, goog.events.Event);
goog.ui.Dialog.SELECT_EVENT = "dialogselect";
goog.ui.Dialog.EventType = {SELECT:"dialogselect", AFTER_HIDE:"afterhide"};
goog.ui.Dialog.ButtonSet = function(a) {
  this.dom_ = a || goog.dom.getDomHelper();
  goog.structs.Map.call(this)
};
goog.inherits(goog.ui.Dialog.ButtonSet, goog.structs.Map);
goog.ui.Dialog.ButtonSet.prototype.class_ = "goog-buttonset";
goog.ui.Dialog.ButtonSet.prototype.defaultButton_ = null;
goog.ui.Dialog.ButtonSet.prototype.element_ = null;
goog.ui.Dialog.ButtonSet.prototype.cancelButton_ = null;
goog.ui.Dialog.ButtonSet.prototype.set = function(a, b, c, d) {
  goog.structs.Map.prototype.set.call(this, a, b);
  if(c) {
    this.defaultButton_ = a
  }
  if(d) {
    this.cancelButton_ = a
  }
  return this
};
goog.ui.Dialog.ButtonSet.prototype.addButton = function(a, b, c) {
  return this.set(a.key, a.caption, b, c)
};
goog.ui.Dialog.ButtonSet.prototype.attachToElement = function(a) {
  this.element_ = a;
  this.render()
};
goog.ui.Dialog.ButtonSet.prototype.render = function() {
  if(this.element_) {
    this.element_.innerHTML = "";
    var a = goog.dom.getDomHelper(this.element_);
    goog.structs.forEach(this, function(b, c) {
      var d = a.createDom("button", {name:c}, b);
      if(c == this.defaultButton_) {
        d.className = this.class_ + "-default"
      }
      this.element_.appendChild(d)
    }, this)
  }
};
goog.ui.Dialog.ButtonSet.prototype.decorate = function(a) {
  if(a && a.nodeType == goog.dom.NodeType.ELEMENT) {
    this.element_ = a;
    for(var a = this.element_.getElementsByTagName("button"), b = 0, c, d, e;c = a[b];b++) {
      if(d = c.name || c.id, e = goog.dom.getTextContent(c) || c.value, d) {
        var f = b == 0;
        this.set(d, e, f, c.name == goog.ui.Dialog.DefaultButtonKeys.CANCEL);
        f && goog.dom.classes.add(c, this.class_ + "-default")
      }
    }
  }
};
goog.ui.Dialog.ButtonSet.prototype.setDefault = function(a) {
  this.defaultButton_ = a
};
goog.ui.Dialog.ButtonSet.prototype.getDefault = function() {
  return this.defaultButton_
};
goog.ui.Dialog.ButtonSet.prototype.setCancel = function(a) {
  this.cancelButton_ = a
};
goog.ui.Dialog.ButtonSet.prototype.getCancel = function() {
  return this.cancelButton_
};
goog.ui.Dialog.ButtonSet.prototype.getButton = function(a) {
  for(var b = this.getAllButtons(), c = 0, d;d = b[c];c++) {
    if(d.name == a || d.id == a) {
      return d
    }
  }
  return null
};
goog.ui.Dialog.ButtonSet.prototype.getAllButtons = function() {
  return this.element_.getElementsByTagName(goog.dom.TagName.BUTTON)
};
goog.ui.Dialog.ButtonSet.prototype.setButtonEnabled = function(a, b) {
  var c = this.getButton(a);
  if(c) {
    c.disabled = !b
  }
};
goog.ui.Dialog.ButtonSet.prototype.setAllButtonsEnabled = function(a) {
  for(var b = this.getAllButtons(), c = 0, d;d = b[c];c++) {
    d.disabled = !a
  }
};
goog.ui.Dialog.DefaultButtonKeys = {OK:"ok", CANCEL:"cancel", YES:"yes", NO:"no", SAVE:"save", CONTINUE:"continue"};
goog.ui.Dialog.MSG_DIALOG_OK_ = goog.getMsg("OK");
goog.ui.Dialog.MSG_DIALOG_CANCEL_ = goog.getMsg("Cancel");
goog.ui.Dialog.MSG_DIALOG_YES_ = goog.getMsg("Yes");
goog.ui.Dialog.MSG_DIALOG_NO_ = goog.getMsg("No");
goog.ui.Dialog.MSG_DIALOG_SAVE_ = goog.getMsg("Save");
goog.ui.Dialog.MSG_DIALOG_CONTINUE_ = goog.getMsg("Continue");
goog.ui.Dialog.DefaultButtonCaptions = {OK:goog.ui.Dialog.MSG_DIALOG_OK_, CANCEL:goog.ui.Dialog.MSG_DIALOG_CANCEL_, YES:goog.ui.Dialog.MSG_DIALOG_YES_, NO:goog.ui.Dialog.MSG_DIALOG_NO_, SAVE:goog.ui.Dialog.MSG_DIALOG_SAVE_, CONTINUE:goog.ui.Dialog.MSG_DIALOG_CONTINUE_};
goog.ui.Dialog.ButtonSet.DefaultButtons = {OK:{key:goog.ui.Dialog.DefaultButtonKeys.OK, caption:goog.ui.Dialog.DefaultButtonCaptions.OK}, CANCEL:{key:goog.ui.Dialog.DefaultButtonKeys.CANCEL, caption:goog.ui.Dialog.DefaultButtonCaptions.CANCEL}, YES:{key:goog.ui.Dialog.DefaultButtonKeys.YES, caption:goog.ui.Dialog.DefaultButtonCaptions.YES}, NO:{key:goog.ui.Dialog.DefaultButtonKeys.NO, caption:goog.ui.Dialog.DefaultButtonCaptions.NO}, SAVE:{key:goog.ui.Dialog.DefaultButtonKeys.SAVE, caption:goog.ui.Dialog.DefaultButtonCaptions.SAVE}, 
CONTINUE:{key:goog.ui.Dialog.DefaultButtonKeys.CONTINUE, caption:goog.ui.Dialog.DefaultButtonCaptions.CONTINUE}};
goog.ui.Dialog.ButtonSet.createOk = function() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, true, true)
};
goog.ui.Dialog.ButtonSet.createOkCancel = function() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.OK, true).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true)
};
goog.ui.Dialog.ButtonSet.createYesNo = function() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES, true).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, false, true)
};
goog.ui.Dialog.ButtonSet.createYesNoCancel = function() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.YES).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.NO, true).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true)
};
goog.ui.Dialog.ButtonSet.createContinueSaveCancel = function() {
  return(new goog.ui.Dialog.ButtonSet).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CONTINUE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.SAVE).addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, true, true)
};
(function() {
  goog.ui.Dialog.ButtonSet.OK = goog.ui.Dialog.ButtonSet.createOk();
  goog.ui.Dialog.ButtonSet.OK_CANCEL = goog.ui.Dialog.ButtonSet.createOkCancel();
  goog.ui.Dialog.ButtonSet.YES_NO = goog.ui.Dialog.ButtonSet.createYesNo();
  goog.ui.Dialog.ButtonSet.YES_NO_CANCEL = goog.ui.Dialog.ButtonSet.createYesNoCancel();
  goog.ui.Dialog.ButtonSet.CONTINUE_SAVE_CANCEL = goog.ui.Dialog.ButtonSet.createContinueSaveCancel()
})();
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return b == "object" && a || b == "function" ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.add(a[c])
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.remove(a[c])
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
  for(var b = new goog.structs.Set, a = goog.structs.getValues(a), c = 0;c < a.length;c++) {
    var d = a[c];
    this.contains(d) && b.add(d)
  }
  return b
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if(this.getCount() > b) {
    return false
  }
  !(a instanceof goog.structs.Set) && b > 5 && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b)
  })
};
goog.structs.Set.prototype.__iterator__ = function() {
  return this.map_.__iterator__(false)
};
goog.debug.catchErrors = function(a, b, c) {
  var c = c || goog.global, d = c.onerror;
  c.onerror = function(c, f, g) {
    d && d(c, f, g);
    a({message:c, fileName:f, line:g});
    return Boolean(b)
  }
};
goog.debug.expose = function(a, b) {
  if(typeof a == "undefined") {
    return"undefined"
  }
  if(a == null) {
    return"NULL"
  }
  var c = [], d;
  for(d in a) {
    if(b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d]
      }catch(f) {
        e += "*** " + f + " ***"
      }
      c.push(e)
    }
  }
  return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
  var c = new goog.structs.Set, d = [], e = function(a, g) {
    var h = g + "  ";
    try {
      if(goog.isDef(a)) {
        if(goog.isNull(a)) {
          d.push("NULL")
        }else {
          if(goog.isString(a)) {
            d.push('"' + a.replace(/\n/g, "\n" + g) + '"')
          }else {
            if(goog.isFunction(a)) {
              d.push(String(a).replace(/\n/g, "\n" + g))
            }else {
              if(goog.isObject(a)) {
                if(c.contains(a)) {
                  d.push("*** reference loop detected ***")
                }else {
                  c.add(a);
                  d.push("{");
                  for(var i in a) {
                    if(b || !goog.isFunction(a[i])) {
                      d.push("\n"), d.push(h), d.push(i + " = "), e(a[i], h)
                    }
                  }
                  d.push("\n" + g + "}")
                }
              }else {
                d.push(a)
              }
            }
          }
        }
      }else {
        d.push("undefined")
      }
    }catch(j) {
      d.push("*** " + j + " ***")
    }
  };
  e(a, "");
  return d.join("")
};
goog.debug.exposeArray = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c])
  }
  return"[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a);
    return"Message: " + goog.string.htmlEscape(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(b) + "-> ")
  }catch(d) {
    return"Exception trying to expose exception! You win, we lose. " + d
  }
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if(goog.isString(a)) {
    return{message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"}
  }
  var c, d, e = false;
  try {
    c = a.lineNumber || a.line || "Not available"
  }catch(f) {
    c = "Not available", e = true
  }
  try {
    d = a.fileName || a.filename || a.sourceURL || b
  }catch(g) {
    d = "Not available", e = true
  }
  return e || !a.lineNumber || !a.fileName || !a.stack ? {message:a.message, name:a.name, lineNumber:c, fileName:d, stack:a.stack || "Not available"} : a
};
goog.debug.enhanceError = function(a, b) {
  var c = typeof a == "string" ? Error(a) : a;
  if(!c.stack) {
    c.stack = goog.debug.getStacktrace(arguments.callee.caller)
  }
  if(b) {
    for(var d = 0;c["message" + d];) {
      ++d
    }
    c["message" + d] = String(b)
  }
  return c
};
goog.debug.getStacktraceSimple = function(a) {
  for(var b = [], c = arguments.callee.caller, d = 0;c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller
    }catch(e) {
      b.push("[exception trying to get caller]\n");
      break
    }
    d++;
    if(d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(a) {
  return goog.debug.getStacktraceHelper_(a || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if(goog.array.contains(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        e > 0 && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = String(f);
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        f.length > 40 && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
};
goog.debug.getFunctionName = function(a) {
  a = String(a);
  if(!goog.debug.fnNameCache_[a]) {
    var b = /function ([^\(]+)/.exec(a);
    goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]"
  }
  return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = true;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  if(goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS) {
    this.sequenceNumber_ = typeof e == "number" ? e : goog.debug.LogRecord.nextSequenceNumber_++
  }
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(a) {
  this.exceptionText_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  if(!goog.debug.LogBuffer.instance_) {
    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer
  }
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if(this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return goog.debug.LogBuffer.CAPACITY > 0
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = false
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if(b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d])
    }while(d != c)
  }
};
goog.debug.Logger = function(a) {
  this.name_ = a
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = true;
if(!goog.debug.Logger.ENABLE_HIERARCHY) {
  goog.debug.Logger.rootHandlers_ = []
}
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var a = 0, b;b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if(a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a]
  }
  for(var b = 0;b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if(c.value <= a) {
      return c
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(a)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)
  }
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!b && goog.array.remove(b, a)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
  goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a)
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  this.isLoggable(a) && this.doLogRecord_(this.getLogRecord(a, b, c))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  var d = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
  c && (d.setException(c), d.setExceptionText(goog.debug.exposeException(c, arguments.callee.caller)));
  return d
};
goog.debug.Logger.prototype.shout = function(a, b) {
  this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
  this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
  this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
  this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
  this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
  this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
  this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
  this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
  this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.logToSpeedTracer_ = function(a) {
  goog.global.console && goog.global.console.markTimeline && goog.global.console.markTimeline(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  this.logToSpeedTracer_("log:" + a.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var b = this;b;) {
      b.callPublish_(a), b = b.getParent()
    }
  }else {
    for(var b = 0, c;c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if(this.handlers_) {
    for(var b = 0, c;c = this.handlers_[b];b++) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(""), goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d)
  }
  return goog.debug.LogManager.loggers_[a] = b
};
goog.dom.SavedRange = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.dom.SavedRange, goog.Disposable);
goog.dom.SavedRange.logger_ = goog.debug.Logger.getLogger("goog.dom.SavedRange");
goog.dom.SavedRange.prototype.restore = function(a) {
  this.isDisposed() && goog.dom.SavedRange.logger_.severe("Disposed SavedRange objects cannot be restored.");
  var b = this.restoreInternal();
  a || this.dispose();
  return b
};
goog.dom.SavedCaretRange = function(a) {
  goog.dom.SavedRange.call(this);
  this.startCaretId_ = goog.string.createUniqueString();
  this.endCaretId_ = goog.string.createUniqueString();
  this.dom_ = goog.dom.getDomHelper(a.getDocument());
  a.surroundWithNodes(this.createCaret_(true), this.createCaret_(false))
};
goog.inherits(goog.dom.SavedCaretRange, goog.dom.SavedRange);
goog.dom.SavedCaretRange.prototype.toAbstractRange = function() {
  var a = null, b = this.getCaret(true), c = this.getCaret(false);
  b && c && (a = goog.dom.Range.createFromNodes(b, 0, c, 0));
  return a
};
goog.dom.SavedCaretRange.prototype.getCaret = function(a) {
  return this.dom_.getElement(a ? this.startCaretId_ : this.endCaretId_)
};
goog.dom.SavedCaretRange.prototype.removeCarets = function(a) {
  goog.dom.removeNode(this.getCaret(true));
  goog.dom.removeNode(this.getCaret(false));
  return a
};
goog.dom.SavedCaretRange.prototype.setRestorationDocument = function(a) {
  this.dom_.setDocument(a)
};
goog.dom.SavedCaretRange.prototype.restoreInternal = function() {
  var a = null, b = this.getCaret(true), c = this.getCaret(false);
  if(b && c) {
    var a = b.parentNode, b = goog.array.indexOf(a.childNodes, b), d = c.parentNode, c = goog.array.indexOf(d.childNodes, c);
    d == a && (c -= 1);
    a = goog.dom.Range.createFromNodes(a, b, d, c);
    a = this.removeCarets(a);
    a.select()
  }else {
    this.removeCarets()
  }
  return a
};
goog.dom.SavedCaretRange.prototype.disposeInternal = function() {
  this.removeCarets();
  this.dom_ = null
};
goog.dom.SavedCaretRange.prototype.createCaret_ = function(a) {
  return this.dom_.createDom(goog.dom.TagName.SPAN, {id:a ? this.startCaretId_ : this.endCaretId_})
};
goog.dom.SavedCaretRange.CARET_REGEX = /<span\s+id="?goog_\d+"?><\/span>/ig;
goog.dom.SavedCaretRange.htmlEqual = function(a, b) {
  return a == b || a.replace(goog.dom.SavedCaretRange.CARET_REGEX, "") == b.replace(goog.dom.SavedCaretRange.CARET_REGEX, "")
};
goog.dom.TagWalkType = {START_TAG:1, OTHER:0, END_TAG:-1};
goog.dom.TagIterator = function(a, b, c, d, e) {
  this.reversed = !!b;
  a && this.setPosition(a, d);
  this.depth = e != void 0 ? e : this.tagType || 0;
  this.reversed && (this.depth *= -1);
  this.constrained = !c
};
goog.inherits(goog.dom.TagIterator, goog.iter.Iterator);
goog.dom.TagIterator.prototype.node = null;
goog.dom.TagIterator.prototype.tagType = goog.dom.TagWalkType.OTHER;
goog.dom.TagIterator.prototype.started_ = false;
goog.dom.TagIterator.prototype.setPosition = function(a, b, c) {
  if(this.node = a) {
    this.tagType = goog.isNumber(b) ? b : this.node.nodeType != goog.dom.NodeType.ELEMENT ? goog.dom.TagWalkType.OTHER : this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG
  }
  if(goog.isNumber(c)) {
    this.depth = c
  }
};
goog.dom.TagIterator.prototype.copyFrom = function(a) {
  this.node = a.node;
  this.tagType = a.tagType;
  this.depth = a.depth;
  this.reversed = a.reversed;
  this.constrained = a.constrained
};
goog.dom.TagIterator.prototype.clone = function() {
  return new goog.dom.TagIterator(this.node, this.reversed, !this.constrained, this.tagType, this.depth)
};
goog.dom.TagIterator.prototype.skipTag = function() {
  var a = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
  if(this.tagType == a) {
    this.tagType = a * -1, this.depth += this.tagType * (this.reversed ? -1 : 1)
  }
};
goog.dom.TagIterator.prototype.restartTag = function() {
  var a = this.reversed ? goog.dom.TagWalkType.START_TAG : goog.dom.TagWalkType.END_TAG;
  if(this.tagType == a) {
    this.tagType = a * -1, this.depth += this.tagType * (this.reversed ? -1 : 1)
  }
};
goog.dom.TagIterator.prototype.next = function() {
  var a;
  if(this.started_) {
    if(!this.node || this.constrained && this.depth == 0) {
      throw goog.iter.StopIteration;
    }
    a = this.node;
    var b = this.reversed ? goog.dom.TagWalkType.END_TAG : goog.dom.TagWalkType.START_TAG;
    if(this.tagType == b) {
      var c = this.reversed ? a.lastChild : a.firstChild;
      c ? this.setPosition(c) : this.setPosition(a, b * -1)
    }else {
      (c = this.reversed ? a.previousSibling : a.nextSibling) ? this.setPosition(c) : this.setPosition(a.parentNode, b * -1)
    }
    this.depth += this.tagType * (this.reversed ? -1 : 1)
  }else {
    this.started_ = true
  }
  a = this.node;
  if(!this.node) {
    throw goog.iter.StopIteration;
  }
  return a
};
goog.dom.TagIterator.prototype.isStarted = function() {
  return this.started_
};
goog.dom.TagIterator.prototype.isStartTag = function() {
  return this.tagType == goog.dom.TagWalkType.START_TAG
};
goog.dom.TagIterator.prototype.isEndTag = function() {
  return this.tagType == goog.dom.TagWalkType.END_TAG
};
goog.dom.TagIterator.prototype.isNonElement = function() {
  return this.tagType == goog.dom.TagWalkType.OTHER
};
goog.dom.TagIterator.prototype.equals = function(a) {
  return a.node == this.node && (!this.node || a.tagType == this.tagType)
};
goog.dom.TagIterator.prototype.splice = function(a) {
  var b = this.node;
  this.restartTag();
  this.reversed = !this.reversed;
  goog.dom.TagIterator.prototype.next.call(this);
  this.reversed = !this.reversed;
  for(var c = goog.isArrayLike(arguments[0]) ? arguments[0] : arguments, d = c.length - 1;d >= 0;d--) {
    goog.dom.insertSiblingAfter(c[d], b)
  }
  goog.dom.removeNode(b)
};
goog.dom.RangeType = {TEXT:"text", CONTROL:"control", MULTI:"mutli"};
goog.dom.AbstractRange = function() {
};
goog.dom.AbstractRange.getBrowserSelectionForWindow = function(a) {
  if(a.getSelection) {
    return a.getSelection()
  }else {
    var a = a.document, b = a.selection;
    if(b) {
      try {
        var c = b.createRange();
        if(c.parentElement) {
          if(c.parentElement().document != a) {
            return null
          }
        }else {
          if(!c.length || c.item(0).document != a) {
            return null
          }
        }
      }catch(d) {
        return null
      }
      return b
    }
    return null
  }
};
goog.dom.AbstractRange.isNativeControlRange = function(a) {
  return!!a && !!a.addElement
};
goog.dom.AbstractRange.prototype.setBrowserRangeObject = function() {
  return false
};
goog.dom.AbstractRange.prototype.getTextRanges = function() {
  for(var a = [], b = 0, c = this.getTextRangeCount();b < c;b++) {
    a.push(this.getTextRange(b))
  }
  return a
};
goog.dom.AbstractRange.prototype.getContainerElement = function() {
  var a = this.getContainer();
  return a.nodeType == goog.dom.NodeType.ELEMENT ? a : a.parentNode
};
goog.dom.AbstractRange.prototype.getAnchorNode = function() {
  return this.isReversed() ? this.getEndNode() : this.getStartNode()
};
goog.dom.AbstractRange.prototype.getAnchorOffset = function() {
  return this.isReversed() ? this.getEndOffset() : this.getStartOffset()
};
goog.dom.AbstractRange.prototype.getFocusNode = function() {
  return this.isReversed() ? this.getStartNode() : this.getEndNode()
};
goog.dom.AbstractRange.prototype.getFocusOffset = function() {
  return this.isReversed() ? this.getStartOffset() : this.getEndOffset()
};
goog.dom.AbstractRange.prototype.isReversed = function() {
  return false
};
goog.dom.AbstractRange.prototype.getDocument = function() {
  return goog.dom.getOwnerDocument(goog.userAgent.IE ? this.getContainer() : this.getStartNode())
};
goog.dom.AbstractRange.prototype.getWindow = function() {
  return goog.dom.getWindow(this.getDocument())
};
goog.dom.AbstractRange.prototype.containsNode = function(a, b) {
  return this.containsRange(goog.dom.Range.createFromNodeContents(a), b)
};
goog.dom.AbstractRange.prototype.replaceContentsWithNode = function(a) {
  this.isCollapsed() || this.removeContents();
  return this.insertNode(a, true)
};
goog.dom.AbstractRange.prototype.saveUsingCarets = function() {
  return this.getStartNode() && this.getEndNode() ? new goog.dom.SavedCaretRange(this) : null
};
goog.dom.RangeIterator = function(a, b) {
  goog.dom.TagIterator.call(this, a, b, true)
};
goog.inherits(goog.dom.RangeIterator, goog.dom.TagIterator);
goog.dom.AbstractMultiRange = function() {
};
goog.inherits(goog.dom.AbstractMultiRange, goog.dom.AbstractRange);
goog.dom.AbstractMultiRange.prototype.containsRange = function(a, b) {
  var c = this.getTextRanges(), d = a.getTextRanges();
  return(b ? goog.array.some : goog.array.every)(d, function(a) {
    return goog.array.some(c, function(c) {
      return c.containsRange(a, b)
    })
  })
};
goog.dom.AbstractMultiRange.prototype.insertNode = function(a, b) {
  b ? goog.dom.insertSiblingBefore(a, this.getStartNode()) : goog.dom.insertSiblingAfter(a, this.getEndNode());
  return a
};
goog.dom.AbstractMultiRange.prototype.surroundWithNodes = function(a, b) {
  this.insertNode(a, true);
  this.insertNode(b, false)
};
goog.positioning.AnchoredViewportPosition = function(a, b, c) {
  goog.positioning.AnchoredPosition.call(this, a, b);
  this.adjust_ = c
};
goog.inherits(goog.positioning.AnchoredViewportPosition, goog.positioning.AnchoredPosition);
goog.positioning.AnchoredViewportPosition.prototype.reposition = function(a, b, c, d) {
  var e = goog.positioning.positionAtAnchor(this.element, this.corner, a, b, null, c, goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y, d);
  if(e & goog.positioning.OverflowStatus.FAILED) {
    var f = this.corner, g = b;
    e & goog.positioning.OverflowStatus.FAILED_HORIZONTAL && (f = goog.positioning.flipCornerHorizontal(f), g = goog.positioning.flipCornerHorizontal(g));
    e & goog.positioning.OverflowStatus.FAILED_VERTICAL && (f = goog.positioning.flipCornerVertical(f), g = goog.positioning.flipCornerVertical(g));
    e = goog.positioning.positionAtAnchor(this.element, f, a, g, null, c, goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y, d);
    e & goog.positioning.OverflowStatus.FAILED && (this.adjust_ ? goog.positioning.positionAtAnchor(this.element, this.corner, a, b, null, c, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y, d) : goog.positioning.positionAtAnchor(this.element, this.corner, a, b, null, c, goog.positioning.Overflow.IGNORE, d))
  }
};
goog.positioning.MenuAnchoredPosition = function(a, b, c, d) {
  goog.positioning.AnchoredViewportPosition.call(this, a, b, c);
  this.resize_ = d
};
goog.inherits(goog.positioning.MenuAnchoredPosition, goog.positioning.AnchoredViewportPosition);
goog.positioning.MenuAnchoredPosition.prototype.reposition = function(a, b, c, d) {
  this.resize_ ? goog.positioning.positionAtAnchor(this.element, this.corner, a, b, null, c, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.RESIZE_HEIGHT, d) : goog.positioning.MenuAnchoredPosition.superClass_.reposition.call(this, a, b, c, d)
};
goog.ui.NativeButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this)
};
goog.inherits(goog.ui.NativeButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(goog.ui.NativeButtonRenderer);
goog.ui.NativeButtonRenderer.prototype.getAriaRole = function() {
};
goog.ui.NativeButtonRenderer.prototype.createDom = function(a) {
  this.setUpNativeButton_(a);
  return a.getDomHelper().createDom("button", {"class":this.getClassNames(a).join(" "), disabled:!a.isEnabled(), title:a.getTooltip() || "", value:a.getValue() || ""}, a.getCaption() || "")
};
goog.ui.NativeButtonRenderer.prototype.canDecorate = function(a) {
  return a.tagName == "BUTTON" || a.tagName == "INPUT" && (a.type == "button" || a.type == "submit" || a.type == "reset")
};
goog.ui.NativeButtonRenderer.prototype.decorate = function(a, b) {
  this.setUpNativeButton_(a);
  b.disabled && goog.dom.classes.add(b, this.getClassForState(goog.ui.Component.State.DISABLED));
  return goog.ui.NativeButtonRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.NativeButtonRenderer.prototype.initializeDom = function(a) {
  a.getHandler().listen(a.getElement(), goog.events.EventType.CLICK, a.performActionInternal)
};
goog.ui.NativeButtonRenderer.prototype.setAllowTextSelection = goog.nullFunction;
goog.ui.NativeButtonRenderer.prototype.setRightToLeft = goog.nullFunction;
goog.ui.NativeButtonRenderer.prototype.isFocusable = function(a) {
  return a.isEnabled()
};
goog.ui.NativeButtonRenderer.prototype.setFocusable = goog.nullFunction;
goog.ui.NativeButtonRenderer.prototype.setState = function(a, b, c) {
  goog.ui.NativeButtonRenderer.superClass_.setState.call(this, a, b, c);
  if((a = a.getElement()) && b == goog.ui.Component.State.DISABLED) {
    a.disabled = c
  }
};
goog.ui.NativeButtonRenderer.prototype.getValue = function(a) {
  return a.value
};
goog.ui.NativeButtonRenderer.prototype.setValue = function(a, b) {
  if(a) {
    a.value = b
  }
};
goog.ui.NativeButtonRenderer.prototype.updateAriaState = goog.nullFunction;
goog.ui.NativeButtonRenderer.prototype.setUpNativeButton_ = function(a) {
  a.setHandleMouseEvents(false);
  a.setAutoStates(goog.ui.Component.State.ALL, false);
  a.setSupportedState(goog.ui.Component.State.FOCUSED, false)
};
goog.ui.Button = function(a, b, c) {
  goog.ui.Control.call(this, a, b || goog.ui.NativeButtonRenderer.getInstance(), c)
};
goog.inherits(goog.ui.Button, goog.ui.Control);
goog.ui.Button.Side = goog.ui.ButtonSide;
goog.ui.Button.prototype.getValue = function() {
  return this.value_
};
goog.ui.Button.prototype.setValue = function(a) {
  this.value_ = a;
  this.getRenderer().setValue(this.getElement(), a)
};
goog.ui.Button.prototype.setValueInternal = function(a) {
  this.value_ = a
};
goog.ui.Button.prototype.getTooltip = function() {
  return this.tooltip_
};
goog.ui.Button.prototype.setTooltip = function(a) {
  this.tooltip_ = a;
  this.getRenderer().setTooltip(this.getElement(), a)
};
goog.ui.Button.prototype.setTooltipInternal = function(a) {
  this.tooltip_ = a
};
goog.ui.Button.prototype.setCollapsed = function(a) {
  this.getRenderer().setCollapsed(this, a)
};
goog.ui.Button.prototype.disposeInternal = function() {
  goog.ui.Button.superClass_.disposeInternal.call(this);
  delete this.value_;
  delete this.tooltip_
};
goog.ui.Button.prototype.enterDocument = function() {
  goog.ui.Button.superClass_.enterDocument.call(this);
  if(this.isSupportedState(goog.ui.Component.State.FOCUSED)) {
    var a = this.getKeyEventTarget();
    a && this.getHandler().listen(a, goog.events.EventType.KEYUP, this.handleKeyEventInternal)
  }
};
goog.ui.Button.prototype.handleKeyEventInternal = function(a) {
  return a.keyCode == goog.events.KeyCodes.ENTER && a.type == goog.events.KeyHandler.EventType.KEY || a.keyCode == goog.events.KeyCodes.SPACE && a.type == goog.events.EventType.KEYUP ? this.performActionInternal(a) : a.keyCode == goog.events.KeyCodes.SPACE
};
goog.ui.registry.setDecoratorByClassName(goog.ui.ButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.Button(null)
});
goog.ui.MenuButton = function(a, b, c, d) {
  goog.ui.Button.call(this, a, c || goog.ui.MenuButtonRenderer.getInstance(), d);
  this.setSupportedState(goog.ui.Component.State.OPENED, true);
  b && this.setMenu(b);
  this.timer_ = new goog.Timer(500)
};
goog.inherits(goog.ui.MenuButton, goog.ui.Button);
goog.ui.MenuButton.prototype.alignToStart_ = true;
goog.ui.MenuButton.prototype.scrollOnOverflow_ = false;
goog.ui.MenuButton.prototype.isFocusablePopupMenu_ = false;
goog.ui.MenuButton.prototype.renderMenuAsSibling_ = false;
goog.ui.MenuButton.prototype.enterDocument = function() {
  goog.ui.MenuButton.superClass_.enterDocument.call(this);
  this.menu_ && this.attachMenuEventListeners_(this.menu_, true);
  goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.HASPOPUP, "true")
};
goog.ui.MenuButton.prototype.exitDocument = function() {
  goog.ui.MenuButton.superClass_.exitDocument.call(this);
  if(this.menu_) {
    this.setOpen(false);
    this.menu_.exitDocument();
    this.attachMenuEventListeners_(this.menu_, false);
    var a = this.menu_.getElement();
    a && goog.dom.removeNode(a)
  }
};
goog.ui.MenuButton.prototype.disposeInternal = function() {
  goog.ui.MenuButton.superClass_.disposeInternal.call(this);
  this.menu_ && (this.menu_.dispose(), delete this.menu_);
  delete this.positionElement_;
  this.timer_.dispose()
};
goog.ui.MenuButton.prototype.handleMouseDown = function(a) {
  goog.ui.MenuButton.superClass_.handleMouseDown.call(this, a);
  this.isActive() && (this.setOpen(!this.isOpen(), a), this.menu_ && this.menu_.setMouseButtonPressed(this.isOpen()))
};
goog.ui.MenuButton.prototype.handleMouseUp = function(a) {
  goog.ui.MenuButton.superClass_.handleMouseUp.call(this, a);
  this.menu_ && !this.isActive() && this.menu_.setMouseButtonPressed(false)
};
goog.ui.MenuButton.prototype.performActionInternal = function() {
  this.setActive(false);
  return true
};
goog.ui.MenuButton.prototype.handleDocumentMouseDown = function(a) {
  this.menu_ && this.menu_.isVisible() && !this.containsElement(a.target) && this.setOpen(false)
};
goog.ui.MenuButton.prototype.containsElement = function(a) {
  return a && goog.dom.contains(this.getElement(), a) || this.menu_ && this.menu_.containsElement(a) || false
};
goog.ui.MenuButton.prototype.handleKeyEventInternal = function(a) {
  if(a.keyCode == goog.events.KeyCodes.SPACE) {
    if(a.preventDefault(), a.type != goog.events.EventType.KEYUP) {
      return false
    }
  }else {
    if(a.type != goog.events.KeyHandler.EventType.KEY) {
      return false
    }
  }
  if(this.menu_ && this.menu_.isVisible()) {
    var b = this.menu_.handleKeyEvent(a);
    return a.keyCode == goog.events.KeyCodes.ESC ? (this.setOpen(false), true) : b
  }
  return a.keyCode == goog.events.KeyCodes.DOWN || a.keyCode == goog.events.KeyCodes.UP || a.keyCode == goog.events.KeyCodes.SPACE ? (this.setOpen(true), true) : false
};
goog.ui.MenuButton.prototype.handleMenuAction = function() {
  this.setOpen(false)
};
goog.ui.MenuButton.prototype.handleMenuBlur = function() {
  this.isActive() || this.setOpen(false)
};
goog.ui.MenuButton.prototype.handleBlur = function(a) {
  this.isFocusablePopupMenu() || this.setOpen(false);
  goog.ui.MenuButton.superClass_.handleBlur.call(this, a)
};
goog.ui.MenuButton.prototype.getMenu = function() {
  this.menu_ || this.setMenu(new goog.ui.Menu(this.getDomHelper()));
  return this.menu_ || null
};
goog.ui.MenuButton.prototype.setMenu = function(a) {
  var b = this.menu_;
  if(a != b && (b && (this.setOpen(false), this.isInDocument() && this.attachMenuEventListeners_(b, false), delete this.menu_), a)) {
    this.menu_ = a, a.setParent(this), a.setVisible(false), a.setAllowAutoFocus(this.isFocusablePopupMenu()), this.isInDocument() && this.attachMenuEventListeners_(a, true)
  }
  return b
};
goog.ui.MenuButton.prototype.setPositionElement = function(a) {
  this.positionElement_ = a;
  this.positionMenu()
};
goog.ui.MenuButton.prototype.addItem = function(a) {
  this.getMenu().addChild(a, true)
};
goog.ui.MenuButton.prototype.addItemAt = function(a, b) {
  this.getMenu().addChildAt(a, b, true)
};
goog.ui.MenuButton.prototype.removeItem = function(a) {
  (a = this.getMenu().removeChild(a, true)) && a.dispose()
};
goog.ui.MenuButton.prototype.removeItemAt = function(a) {
  (a = this.getMenu().removeChildAt(a, true)) && a.dispose()
};
goog.ui.MenuButton.prototype.getItemAt = function(a) {
  return this.menu_ ? this.menu_.getChildAt(a) : null
};
goog.ui.MenuButton.prototype.getItemCount = function() {
  return this.menu_ ? this.menu_.getChildCount() : 0
};
goog.ui.MenuButton.prototype.setVisible = function(a, b) {
  var c = goog.ui.MenuButton.superClass_.setVisible.call(this, a, b);
  c && !this.isVisible() && this.setOpen(false);
  return c
};
goog.ui.MenuButton.prototype.setEnabled = function(a) {
  goog.ui.MenuButton.superClass_.setEnabled.call(this, a);
  this.isEnabled() || this.setOpen(false)
};
goog.ui.MenuButton.prototype.isAlignMenuToStart = function() {
  return this.alignToStart_
};
goog.ui.MenuButton.prototype.setAlignMenuToStart = function(a) {
  this.alignToStart_ = a
};
goog.ui.MenuButton.prototype.setScrollOnOverflow = function(a) {
  this.scrollOnOverflow_ = a
};
goog.ui.MenuButton.prototype.isScrollOnOverflow = function() {
  return this.scrollOnOverflow_
};
goog.ui.MenuButton.prototype.isFocusablePopupMenu = function() {
  return this.isFocusablePopupMenu_
};
goog.ui.MenuButton.prototype.setFocusablePopupMenu = function(a) {
  this.isFocusablePopupMenu_ = a
};
goog.ui.MenuButton.prototype.setRenderMenuAsSibling = function(a) {
  this.renderMenuAsSibling_ = a
};
goog.ui.MenuButton.prototype.showMenu = function() {
  this.setOpen(true)
};
goog.ui.MenuButton.prototype.hideMenu = function() {
  this.setOpen(false)
};
goog.ui.MenuButton.prototype.setOpen = function(a, b) {
  goog.ui.MenuButton.superClass_.setOpen.call(this, a);
  if(this.menu_ && this.hasState(goog.ui.Component.State.OPENED) == a) {
    if(a) {
      this.menu_.isInDocument() || (this.renderMenuAsSibling_ ? this.menu_.render(this.getElement().parentNode) : this.menu_.render()), this.viewportBox_ = goog.style.getVisibleRectForElement(this.getElement()), this.buttonRect_ = goog.style.getBounds(this.getElement()), this.positionMenu(), this.menu_.setHighlightedIndex(-1)
    }else {
      if(this.setActive(false), this.menu_.setMouseButtonPressed(false), this.getElement() && goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, ""), goog.isDefAndNotNull(this.originalSize_)) {
        this.originalSize_ = void 0;
        var c = this.menu_.getElement();
        c && goog.style.setSize(c, "", "")
      }
    }
    this.menu_.setVisible(a, false, b);
    this.attachPopupListeners_(a)
  }
};
goog.ui.MenuButton.prototype.positionMenu = function() {
  if(this.menu_.isInDocument()) {
    var a = this.positionElement_ || this.getElement(), b = this.isAlignMenuToStart() ? goog.positioning.Corner.BOTTOM_START : goog.positioning.Corner.BOTTOM_END, a = new goog.positioning.MenuAnchoredPosition(a, b, !this.scrollOnOverflow_, this.scrollOnOverflow_), b = this.menu_.getElement();
    if(!this.menu_.isVisible()) {
      b.style.visibility = "hidden", goog.style.showElement(b, true)
    }
    if(!this.originalSize_ && this.scrollOnOverflow_) {
      this.originalSize_ = goog.style.getSize(b)
    }
    var c = this.isAlignMenuToStart() ? goog.positioning.Corner.TOP_START : goog.positioning.Corner.TOP_END;
    a.reposition(b, c, null, this.originalSize_);
    if(!this.menu_.isVisible()) {
      goog.style.showElement(b, false), b.style.visibility = "visible"
    }
  }
};
goog.ui.MenuButton.prototype.onTick_ = function() {
  var a = goog.style.getBounds(this.getElement()), b = goog.style.getVisibleRectForElement(this.getElement());
  if(!goog.math.Rect.equals(this.buttonRect_, a) || !goog.math.Box.equals(this.viewportBox_, b)) {
    this.buttonRect_ = a, this.viewportBox_ = b, this.positionMenu()
  }
};
goog.ui.MenuButton.prototype.attachMenuEventListeners_ = function(a, b) {
  var c = this.getHandler(), d = b ? c.listen : c.unlisten;
  d.call(c, a, goog.ui.Component.EventType.ACTION, this.handleMenuAction);
  d.call(c, a, goog.ui.Component.EventType.HIGHLIGHT, this.handleHighlightItem);
  d.call(c, a, goog.ui.Component.EventType.UNHIGHLIGHT, this.handleUnHighlightItem)
};
goog.ui.MenuButton.prototype.handleHighlightItem = function(a) {
  goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, a.target.getElement().id)
};
goog.ui.MenuButton.prototype.handleUnHighlightItem = function() {
  this.menu_.getHighlighted() || goog.dom.a11y.setState(this.getElement(), goog.dom.a11y.State.ACTIVEDESCENDANT, "")
};
goog.ui.MenuButton.prototype.attachPopupListeners_ = function(a) {
  var b = this.getHandler(), c = a ? b.listen : b.unlisten;
  c.call(b, this.getDomHelper().getDocument(), goog.events.EventType.MOUSEDOWN, this.handleDocumentMouseDown, true);
  this.isFocusablePopupMenu() && c.call(b, this.menu_, goog.ui.Component.EventType.BLUR, this.handleMenuBlur);
  c.call(b, this.timer_, goog.Timer.TICK, this.onTick_);
  a ? this.timer_.start() : this.timer_.stop()
};
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.MenuButton(null)
});
goog.ui.ToolbarMenuButtonRenderer = function() {
  goog.ui.MenuButtonRenderer.call(this)
};
goog.inherits(goog.ui.ToolbarMenuButtonRenderer, goog.ui.MenuButtonRenderer);
goog.addSingletonGetter(goog.ui.ToolbarMenuButtonRenderer);
goog.ui.ToolbarMenuButtonRenderer.CSS_CLASS = "goog-toolbar-menu-button";
goog.ui.ToolbarMenuButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.ToolbarMenuButtonRenderer.CSS_CLASS
};
goog.ui.ToolbarMenuButton = function(a, b, c, d) {
  goog.ui.MenuButton.call(this, a, b, c || goog.ui.ToolbarMenuButtonRenderer.getInstance(), d)
};
goog.inherits(goog.ui.ToolbarMenuButton, goog.ui.MenuButton);
goog.ui.registry.setDecoratorByClassName(goog.ui.ToolbarMenuButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.ToolbarMenuButton(null)
});
goog.editor = {};
goog.editor.Command = {UNDO:"+undo", REDO:"+redo", LINK:"+link", FORMAT_BLOCK:"+formatBlock", INDENT:"+indent", OUTDENT:"+outdent", REMOVE_FORMAT:"+removeFormat", STRIKE_THROUGH:"+strikeThrough", HORIZONTAL_RULE:"+insertHorizontalRule", SUBSCRIPT:"+subscript", SUPERSCRIPT:"+superscript", UNDERLINE:"+underline", BOLD:"+bold", ITALIC:"+italic", FONT_SIZE:"+fontSize", FONT_FACE:"+fontName", FONT_COLOR:"+foreColor", EMOTICON:"+emoticon", BACKGROUND_COLOR:"+backColor", ORDERED_LIST:"+insertOrderedList", 
UNORDERED_LIST:"+insertUnorderedList", TABLE:"+table", JUSTIFY_CENTER:"+justifyCenter", JUSTIFY_FULL:"+justifyFull", JUSTIFY_RIGHT:"+justifyRight", JUSTIFY_LEFT:"+justifyLeft", BLOCKQUOTE:"+BLOCKQUOTE", DIR_LTR:"ltr", DIR_RTL:"rtl", IMAGE:"image", EDIT_HTML:"editHtml", DEFAULT_TAG:"+defaultTag", CLEAR_LOREM:"clearlorem", UPDATE_LOREM:"updatelorem", USING_LOREM:"usinglorem", MODAL_LINK_EDITOR:"link"};
goog.dom.TextRangeIterator = function(a, b, c, d, e) {
  var f;
  if(a) {
    this.startNode_ = a;
    this.startOffset_ = b;
    this.endNode_ = c;
    this.endOffset_ = d;
    if(a.nodeType == goog.dom.NodeType.ELEMENT && a.tagName != goog.dom.TagName.BR) {
      if(a = a.childNodes, b = a[b]) {
        this.startNode_ = b, this.startOffset_ = 0
      }else {
        if(a.length) {
          this.startNode_ = goog.array.peek(a)
        }
        f = true
      }
    }
    if(c.nodeType == goog.dom.NodeType.ELEMENT) {
      (this.endNode_ = c.childNodes[d]) ? this.endOffset_ = 0 : this.endNode_ = c
    }
  }
  goog.dom.RangeIterator.call(this, e ? this.endNode_ : this.startNode_, e);
  if(f) {
    try {
      this.next()
    }catch(g) {
      if(g != goog.iter.StopIteration) {
        throw g;
      }
    }
  }
};
goog.inherits(goog.dom.TextRangeIterator, goog.dom.RangeIterator);
goog.dom.TextRangeIterator.prototype.startNode_ = null;
goog.dom.TextRangeIterator.prototype.endNode_ = null;
goog.dom.TextRangeIterator.prototype.startOffset_ = 0;
goog.dom.TextRangeIterator.prototype.endOffset_ = 0;
goog.dom.TextRangeIterator.prototype.getStartTextOffset = function() {
  return this.node.nodeType != goog.dom.NodeType.TEXT ? -1 : this.node == this.startNode_ ? this.startOffset_ : 0
};
goog.dom.TextRangeIterator.prototype.getEndTextOffset = function() {
  return this.node.nodeType != goog.dom.NodeType.TEXT ? -1 : this.node == this.endNode_ ? this.endOffset_ : this.node.nodeValue.length
};
goog.dom.TextRangeIterator.prototype.getStartNode = function() {
  return this.startNode_
};
goog.dom.TextRangeIterator.prototype.setStartNode = function(a) {
  this.isStarted() || this.setPosition(a);
  this.startNode_ = a;
  this.startOffset_ = 0
};
goog.dom.TextRangeIterator.prototype.getEndNode = function() {
  return this.endNode_
};
goog.dom.TextRangeIterator.prototype.setEndNode = function(a) {
  this.endNode_ = a;
  this.endOffset_ = 0
};
goog.dom.TextRangeIterator.prototype.isLast = function() {
  return this.isStarted() && this.node == this.endNode_ && (!this.endOffset_ || !this.isStartTag())
};
goog.dom.TextRangeIterator.prototype.next = function() {
  if(this.isLast()) {
    throw goog.iter.StopIteration;
  }
  return goog.dom.TextRangeIterator.superClass_.next.call(this)
};
goog.dom.TextRangeIterator.prototype.skipTag = function() {
  goog.dom.TextRangeIterator.superClass_.skipTag.apply(this);
  if(goog.dom.contains(this.node, this.endNode_)) {
    throw goog.iter.StopIteration;
  }
};
goog.dom.TextRangeIterator.prototype.copyFrom = function(a) {
  this.startNode_ = a.startNode_;
  this.endNode_ = a.endNode_;
  this.startOffset_ = a.startOffset_;
  this.endOffset_ = a.endOffset_;
  this.isReversed_ = a.isReversed_;
  goog.dom.TextRangeIterator.superClass_.copyFrom.call(this, a)
};
goog.dom.TextRangeIterator.prototype.clone = function() {
  var a = new goog.dom.TextRangeIterator(this.startNode_, this.startOffset_, this.endNode_, this.endOffset_, this.isReversed_);
  a.copyFrom(this);
  return a
};
goog.dom.RangeEndpoint = {START:1, END:0};
goog.dom.browserrange = {};
goog.dom.browserrange.AbstractRange = function() {
};
goog.dom.browserrange.AbstractRange.prototype.containsRange = function(a, b) {
  var c = b && !a.isCollapsed(), d = a.getBrowserRange(), e = goog.dom.RangeEndpoint.START, f = goog.dom.RangeEndpoint.END;
  try {
    return c ? this.compareBrowserRangeEndpoints(d, f, e) >= 0 && this.compareBrowserRangeEndpoints(d, e, f) <= 0 : this.compareBrowserRangeEndpoints(d, f, f) >= 0 && this.compareBrowserRangeEndpoints(d, e, e) <= 0
  }catch(g) {
    if(!goog.userAgent.IE) {
      throw g;
    }
    return false
  }
};
goog.dom.browserrange.AbstractRange.prototype.containsNode = function(a, b) {
  return this.containsRange(goog.dom.browserrange.createRangeFromNodeContents(a), b)
};
goog.dom.browserrange.AbstractRange.prototype.getHtmlFragment = function() {
  var a = new goog.string.StringBuffer;
  goog.iter.forEach(this, function(b, c, d) {
    b.nodeType == goog.dom.NodeType.TEXT ? a.append(goog.string.htmlEscape(b.nodeValue.substring(d.getStartTextOffset(), d.getEndTextOffset()))) : b.nodeType == goog.dom.NodeType.ELEMENT && (d.isEndTag() ? goog.dom.canHaveChildren(b) && a.append("</" + b.tagName + ">") : (c = b.cloneNode(false), c = goog.dom.getOuterHtml(c), goog.userAgent.IE && b.tagName == goog.dom.TagName.LI ? a.append(c) : (b = c.lastIndexOf("<"), a.append(b ? c.substr(0, b) : c))))
  }, this);
  return a.toString()
};
goog.dom.browserrange.AbstractRange.prototype.__iterator__ = function() {
  return new goog.dom.TextRangeIterator(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
};
goog.dom.browserrange.W3cRange = function(a) {
  this.range_ = a
};
goog.inherits(goog.dom.browserrange.W3cRange, goog.dom.browserrange.AbstractRange);
goog.dom.browserrange.W3cRange.getBrowserRangeForNode = function(a) {
  var b = goog.dom.getOwnerDocument(a).createRange();
  if(a.nodeType == goog.dom.NodeType.TEXT) {
    b.setStart(a, 0), b.setEnd(a, a.length)
  }else {
    if(goog.dom.browserrange.canContainRangeEndpoint(a)) {
      for(var c, d = a;(c = d.firstChild) && goog.dom.browserrange.canContainRangeEndpoint(c);) {
        d = c
      }
      b.setStart(d, 0);
      for(d = a;(c = d.lastChild) && goog.dom.browserrange.canContainRangeEndpoint(c);) {
        d = c
      }
      b.setEnd(d, d.nodeType == goog.dom.NodeType.ELEMENT ? d.childNodes.length : d.length)
    }else {
      c = a.parentNode, a = goog.array.indexOf(c.childNodes, a), b.setStart(c, a), b.setEnd(c, a + 1)
    }
  }
  return b
};
goog.dom.browserrange.W3cRange.getBrowserRangeForNodes = function(a, b, c, d) {
  var e = goog.dom.getOwnerDocument(a).createRange();
  e.setStart(a, b);
  e.setEnd(c, d);
  return e
};
goog.dom.browserrange.W3cRange.createFromNodeContents = function(a) {
  return new goog.dom.browserrange.W3cRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNode(a))
};
goog.dom.browserrange.W3cRange.createFromNodes = function(a, b, c, d) {
  return new goog.dom.browserrange.W3cRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(a, b, c, d))
};
goog.dom.browserrange.W3cRange.prototype.clone = function() {
  return new this.constructor(this.range_.cloneRange())
};
goog.dom.browserrange.W3cRange.prototype.getBrowserRange = function() {
  return this.range_
};
goog.dom.browserrange.W3cRange.prototype.getContainer = function() {
  return this.range_.commonAncestorContainer
};
goog.dom.browserrange.W3cRange.prototype.getStartNode = function() {
  return this.range_.startContainer
};
goog.dom.browserrange.W3cRange.prototype.getStartOffset = function() {
  return this.range_.startOffset
};
goog.dom.browserrange.W3cRange.prototype.getEndNode = function() {
  return this.range_.endContainer
};
goog.dom.browserrange.W3cRange.prototype.getEndOffset = function() {
  return this.range_.endOffset
};
goog.dom.browserrange.W3cRange.prototype.compareBrowserRangeEndpoints = function(a, b, c) {
  return this.range_.compareBoundaryPoints(c == goog.dom.RangeEndpoint.START ? b == goog.dom.RangeEndpoint.START ? goog.global.Range.START_TO_START : goog.global.Range.START_TO_END : b == goog.dom.RangeEndpoint.START ? goog.global.Range.END_TO_START : goog.global.Range.END_TO_END, a)
};
goog.dom.browserrange.W3cRange.prototype.isCollapsed = function() {
  return this.range_.collapsed
};
goog.dom.browserrange.W3cRange.prototype.getText = function() {
  return this.range_.toString()
};
goog.dom.browserrange.W3cRange.prototype.getValidHtml = function() {
  var a = goog.dom.getDomHelper(this.range_.startContainer).createDom("div");
  a.appendChild(this.range_.cloneContents());
  a = a.innerHTML;
  if(goog.string.startsWith(a, "<") || !this.isCollapsed() && !goog.string.contains(a, "<")) {
    return a
  }
  var b = this.getContainer(), b = b.nodeType == goog.dom.NodeType.ELEMENT ? b : b.parentNode;
  return goog.dom.getOuterHtml(b.cloneNode(false)).replace(">", ">" + a)
};
goog.dom.browserrange.W3cRange.prototype.select = function(a) {
  this.selectInternal(goog.dom.getWindow(goog.dom.getOwnerDocument(this.getStartNode())).getSelection(), a)
};
goog.dom.browserrange.W3cRange.prototype.selectInternal = function(a) {
  a.removeAllRanges();
  a.addRange(this.range_)
};
goog.dom.browserrange.W3cRange.prototype.removeContents = function() {
  var a = this.range_;
  a.extractContents();
  if(a.startContainer.hasChildNodes() && (a = a.startContainer.childNodes[a.startOffset])) {
    var b = a.previousSibling;
    goog.dom.getRawTextContent(a) == "" && goog.dom.removeNode(a);
    b && goog.dom.getRawTextContent(b) == "" && goog.dom.removeNode(b)
  }
};
goog.dom.browserrange.W3cRange.prototype.surroundContents = function(a) {
  this.range_.surroundContents(a);
  return a
};
goog.dom.browserrange.W3cRange.prototype.insertNode = function(a, b) {
  var c = this.range_.cloneRange();
  c.collapse(b);
  c.insertNode(a);
  c.detach();
  return a
};
goog.dom.browserrange.W3cRange.prototype.surroundWithNodes = function(a, b) {
  var c = goog.dom.getWindow(goog.dom.getOwnerDocument(this.getStartNode()));
  if(c = goog.dom.Range.createFromWindow(c)) {
    var d = c.getStartNode(), e = c.getEndNode(), f = c.getStartOffset(), g = c.getEndOffset()
  }
  var h = this.range_.cloneRange(), i = this.range_.cloneRange();
  h.collapse(false);
  i.collapse(true);
  h.insertNode(b);
  i.insertNode(a);
  h.detach();
  i.detach();
  if(c) {
    if(d.nodeType == goog.dom.NodeType.TEXT) {
      for(;f > d.length;) {
        f -= d.length;
        do {
          d = d.nextSibling
        }while(d == a || d == b)
      }
    }
    if(e.nodeType == goog.dom.NodeType.TEXT) {
      for(;g > e.length;) {
        g -= e.length;
        do {
          e = e.nextSibling
        }while(e == a || e == b)
      }
    }
    goog.dom.Range.createFromNodes(d, f, e, g).select()
  }
};
goog.dom.browserrange.W3cRange.prototype.collapse = function(a) {
  this.range_.collapse(a)
};
goog.dom.browserrange.GeckoRange = function(a) {
  goog.dom.browserrange.W3cRange.call(this, a)
};
goog.inherits(goog.dom.browserrange.GeckoRange, goog.dom.browserrange.W3cRange);
goog.dom.browserrange.GeckoRange.createFromNodeContents = function(a) {
  return new goog.dom.browserrange.GeckoRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNode(a))
};
goog.dom.browserrange.GeckoRange.createFromNodes = function(a, b, c, d) {
  return new goog.dom.browserrange.GeckoRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(a, b, c, d))
};
goog.dom.browserrange.GeckoRange.prototype.selectInternal = function(a, b) {
  var c = b ? this.getEndNode() : this.getStartNode(), d = b ? this.getEndOffset() : this.getStartOffset(), e = b ? this.getStartNode() : this.getEndNode(), f = b ? this.getStartOffset() : this.getEndOffset();
  a.collapse(c, d);
  (c != e || d != f) && a.extend(e, f)
};
goog.dom.NodeIterator = function(a, b, c, d) {
  goog.dom.TagIterator.call(this, a, b, c, null, d)
};
goog.inherits(goog.dom.NodeIterator, goog.dom.TagIterator);
goog.dom.NodeIterator.prototype.next = function() {
  do {
    goog.dom.NodeIterator.superClass_.next.call(this)
  }while(this.isEndTag());
  return this.node
};
goog.dom.browserrange.IeRange = function(a, b) {
  this.range_ = a;
  this.doc_ = b
};
goog.inherits(goog.dom.browserrange.IeRange, goog.dom.browserrange.AbstractRange);
goog.dom.browserrange.IeRange.logger_ = goog.debug.Logger.getLogger("goog.dom.browserrange.IeRange");
goog.dom.browserrange.IeRange.getBrowserRangeForNode_ = function(a) {
  var b = goog.dom.getOwnerDocument(a).body.createTextRange();
  if(a.nodeType == goog.dom.NodeType.ELEMENT) {
    b.moveToElementText(a), goog.dom.browserrange.canContainRangeEndpoint(a) && !a.childNodes.length && b.collapse(false)
  }else {
    for(var c = 0, d = a;d = d.previousSibling;) {
      var e = d.nodeType;
      if(e == goog.dom.NodeType.TEXT) {
        c += d.length
      }else {
        if(e == goog.dom.NodeType.ELEMENT) {
          b.moveToElementText(d);
          break
        }
      }
    }
    d || b.moveToElementText(a.parentNode);
    b.collapse(!d);
    c && b.move("character", c);
    b.moveEnd("character", a.length)
  }
  return b
};
goog.dom.browserrange.IeRange.getBrowserRangeForNodes_ = function(a, b, c, d) {
  var g;
  var e = false;
  a.nodeType == goog.dom.NodeType.ELEMENT && (b > a.childNodes.length && goog.dom.browserrange.IeRange.logger_.severe("Cannot have startOffset > startNode child count"), b = a.childNodes[b], e = !b, a = b || a.lastChild || a, b = 0);
  var f = goog.dom.browserrange.IeRange.getBrowserRangeForNode_(a);
  b && f.move("character", b);
  if(a == c && b == d) {
    return f.collapse(true), f
  }
  e && f.collapse(false);
  e = false;
  c.nodeType == goog.dom.NodeType.ELEMENT && (d > c.childNodes.length && goog.dom.browserrange.IeRange.logger_.severe("Cannot have endOffset > endNode child count"), g = (b = c.childNodes[d]) || c.lastChild || c, c = g, d = 0, e = !b);
  a = goog.dom.browserrange.IeRange.getBrowserRangeForNode_(c);
  a.collapse(!e);
  d && a.moveEnd("character", d);
  f.setEndPoint("EndToEnd", a);
  return f
};
goog.dom.browserrange.IeRange.createFromNodeContents = function(a) {
  var b = new goog.dom.browserrange.IeRange(goog.dom.browserrange.IeRange.getBrowserRangeForNode_(a), goog.dom.getOwnerDocument(a));
  if(goog.dom.browserrange.canContainRangeEndpoint(a)) {
    for(var c, d = a;(c = d.firstChild) && goog.dom.browserrange.canContainRangeEndpoint(c);) {
      d = c
    }
    b.startNode_ = d;
    b.startOffset_ = 0;
    for(d = a;(c = d.lastChild) && goog.dom.browserrange.canContainRangeEndpoint(c);) {
      d = c
    }
    b.endNode_ = d;
    b.endOffset_ = d.nodeType == goog.dom.NodeType.ELEMENT ? d.childNodes.length : d.length;
    b.parentNode_ = a
  }else {
    b.startNode_ = b.endNode_ = b.parentNode_ = a.parentNode, b.startOffset_ = goog.array.indexOf(b.parentNode_.childNodes, a), b.endOffset_ = b.startOffset_ + 1
  }
  return b
};
goog.dom.browserrange.IeRange.createFromNodes = function(a, b, c, d) {
  var e = new goog.dom.browserrange.IeRange(goog.dom.browserrange.IeRange.getBrowserRangeForNodes_(a, b, c, d), goog.dom.getOwnerDocument(a));
  e.startNode_ = a;
  e.startOffset_ = b;
  e.endNode_ = c;
  e.endOffset_ = d;
  return e
};
goog.dom.browserrange.IeRange.prototype.parentNode_ = null;
goog.dom.browserrange.IeRange.prototype.startNode_ = null;
goog.dom.browserrange.IeRange.prototype.endNode_ = null;
goog.dom.browserrange.IeRange.prototype.startOffset_ = -1;
goog.dom.browserrange.IeRange.prototype.endOffset_ = -1;
goog.dom.browserrange.IeRange.prototype.clone = function() {
  var a = new goog.dom.browserrange.IeRange(this.range_.duplicate(), this.doc_);
  a.parentNode_ = this.parentNode_;
  a.startNode_ = this.startNode_;
  a.endNode_ = this.endNode_;
  return a
};
goog.dom.browserrange.IeRange.prototype.getBrowserRange = function() {
  return this.range_
};
goog.dom.browserrange.IeRange.prototype.clearCachedValues_ = function() {
  this.parentNode_ = this.startNode_ = this.endNode_ = null;
  this.startOffset_ = this.endOffset_ = -1
};
goog.dom.browserrange.IeRange.prototype.getContainer = function() {
  if(!this.parentNode_) {
    var a = this.range_.text, b = this.range_.duplicate(), c = a.replace(/ +$/, "");
    (c = a.length - c.length) && b.moveEnd("character", -c);
    c = b.parentElement();
    b = goog.string.stripNewlines(b.htmlText).length;
    if(this.isCollapsed() && b > 0) {
      return this.parentNode_ = c
    }
    for(;b > goog.string.stripNewlines(c.outerHTML).length;) {
      c = c.parentNode
    }
    for(;c.childNodes.length == 1 && c.innerText == goog.dom.browserrange.IeRange.getNodeText_(c.firstChild);) {
      if(!goog.dom.browserrange.canContainRangeEndpoint(c.firstChild)) {
        break
      }
      c = c.firstChild
    }
    a.length == 0 && (c = this.findDeepestContainer_(c));
    this.parentNode_ = c
  }
  return this.parentNode_
};
goog.dom.browserrange.IeRange.prototype.findDeepestContainer_ = function(a) {
  for(var b = a.childNodes, c = 0, d = b.length;c < d;c++) {
    var e = b[c];
    if(goog.dom.browserrange.canContainRangeEndpoint(e)) {
      var f = goog.dom.browserrange.IeRange.getBrowserRangeForNode_(e), g = goog.dom.RangeEndpoint.START, h = goog.dom.RangeEndpoint.END, i = f.htmlText != e.outerHTML;
      if(this.isCollapsed() && i ? this.compareBrowserRangeEndpoints(f, g, g) >= 0 && this.compareBrowserRangeEndpoints(f, g, h) <= 0 : this.range_.inRange(f)) {
        return this.findDeepestContainer_(e)
      }
    }
  }
  return a
};
goog.dom.browserrange.IeRange.prototype.getStartNode = function() {
  if(!this.startNode_ && (this.startNode_ = this.getEndpointNode_(goog.dom.RangeEndpoint.START), this.isCollapsed())) {
    this.endNode_ = this.startNode_
  }
  return this.startNode_
};
goog.dom.browserrange.IeRange.prototype.getStartOffset = function() {
  if(this.startOffset_ < 0 && (this.startOffset_ = this.getOffset_(goog.dom.RangeEndpoint.START), this.isCollapsed())) {
    this.endOffset_ = this.startOffset_
  }
  return this.startOffset_
};
goog.dom.browserrange.IeRange.prototype.getEndNode = function() {
  if(this.isCollapsed()) {
    return this.getStartNode()
  }
  if(!this.endNode_) {
    this.endNode_ = this.getEndpointNode_(goog.dom.RangeEndpoint.END)
  }
  return this.endNode_
};
goog.dom.browserrange.IeRange.prototype.getEndOffset = function() {
  if(this.isCollapsed()) {
    return this.getStartOffset()
  }
  if(this.endOffset_ < 0 && (this.endOffset_ = this.getOffset_(goog.dom.RangeEndpoint.END), this.isCollapsed())) {
    this.startOffset_ = this.endOffset_
  }
  return this.endOffset_
};
goog.dom.browserrange.IeRange.prototype.compareBrowserRangeEndpoints = function(a, b, c) {
  return this.range_.compareEndPoints((b == goog.dom.RangeEndpoint.START ? "Start" : "End") + "To" + (c == goog.dom.RangeEndpoint.START ? "Start" : "End"), a)
};
goog.dom.browserrange.IeRange.prototype.getEndpointNode_ = function(a, b) {
  var c = b || this.getContainer();
  if(!c || !c.firstChild) {
    return c
  }
  for(var d = goog.dom.RangeEndpoint.START, e = goog.dom.RangeEndpoint.END, f = a == d, g = 0, h = c.childNodes.length;g < h;g++) {
    var i = f ? g : h - g - 1, j = c.childNodes[i], k;
    try {
      k = goog.dom.browserrange.createRangeFromNodeContents(j)
    }catch(l) {
      continue
    }
    var m = k.getBrowserRange();
    if(this.isCollapsed()) {
      if(goog.dom.browserrange.canContainRangeEndpoint(j)) {
        if(k.containsRange(this)) {
          return this.getEndpointNode_(a, j)
        }
      }else {
        if(this.compareBrowserRangeEndpoints(m, d, d) == 0) {
          this.startOffset_ = this.endOffset_ = i;
          break
        }
      }
    }else {
      if(this.containsRange(k)) {
        if(!goog.dom.browserrange.canContainRangeEndpoint(j)) {
          f ? this.startOffset_ = i : this.endOffset_ = i + 1;
          break
        }
        return this.getEndpointNode_(a, j)
      }else {
        if(this.compareBrowserRangeEndpoints(m, d, e) < 0 && this.compareBrowserRangeEndpoints(m, e, d) > 0) {
          return this.getEndpointNode_(a, j)
        }
      }
    }
  }
  return c
};
goog.dom.browserrange.IeRange.prototype.compareNodeEndpoints_ = function(a, b, c) {
  return this.range_.compareEndPoints((b == goog.dom.RangeEndpoint.START ? "Start" : "End") + "To" + (c == goog.dom.RangeEndpoint.START ? "Start" : "End"), goog.dom.browserrange.createRangeFromNodeContents(a).getBrowserRange())
};
goog.dom.browserrange.IeRange.prototype.getOffset_ = function(a, b) {
  var c = a == goog.dom.RangeEndpoint.START, d = b || (c ? this.getStartNode() : this.getEndNode());
  if(d.nodeType == goog.dom.NodeType.ELEMENT) {
    for(var d = d.childNodes, e = d.length, f = c ? 1 : -1, g = c ? 0 : e - 1;g >= 0 && g < e;g += f) {
      var h = d[g];
      if(!goog.dom.browserrange.canContainRangeEndpoint(h) && this.compareNodeEndpoints_(h, a, a) == 0) {
        return c ? g : g + 1
      }
    }
    return g == -1 ? 0 : g
  }else {
    return e = this.range_.duplicate(), f = goog.dom.browserrange.IeRange.getBrowserRangeForNode_(d), e.setEndPoint(c ? "EndToEnd" : "StartToStart", f), e = e.text.length, c ? d.length - e : e
  }
};
goog.dom.browserrange.IeRange.getNodeText_ = function(a) {
  return a.nodeType == goog.dom.NodeType.TEXT ? a.nodeValue : a.innerText
};
goog.dom.browserrange.IeRange.prototype.isRangeInDocument = function() {
  var a = this.doc_.body.createTextRange();
  a.moveToElementText(this.doc_.body);
  return this.containsRange(new goog.dom.browserrange.IeRange(a, this.doc_), true)
};
goog.dom.browserrange.IeRange.prototype.isCollapsed = function() {
  return this.range_.compareEndPoints("StartToEnd", this.range_) == 0
};
goog.dom.browserrange.IeRange.prototype.getText = function() {
  return this.range_.text
};
goog.dom.browserrange.IeRange.prototype.getValidHtml = function() {
  return this.range_.htmlText
};
goog.dom.browserrange.IeRange.prototype.select = function() {
  this.range_.select()
};
goog.dom.browserrange.IeRange.prototype.removeContents = function() {
  if(this.range_.htmlText) {
    var a = this.getStartNode(), b = this.getEndNode(), c = this.range_.text, d = this.range_.duplicate();
    d.moveStart("character", 1);
    d.moveStart("character", -1);
    if(d.text != c) {
      var e = new goog.dom.NodeIterator(a, false, true), f = [];
      goog.iter.forEach(e, function(a) {
        a.nodeType != goog.dom.NodeType.TEXT && this.containsNode(a) && (f.push(a), e.skipTag());
        if(a == b) {
          throw goog.iter.StopIteration;
        }
      });
      this.collapse(true);
      goog.array.forEach(f, goog.dom.removeNode);
      this.clearCachedValues_()
    }else {
      this.range_ = d;
      this.range_.text = "";
      this.clearCachedValues_();
      c = this.getStartNode();
      d = this.getStartOffset();
      try {
        var g = a.nextSibling;
        if(a == b && a.parentNode && a.nodeType == goog.dom.NodeType.TEXT && g && g.nodeType == goog.dom.NodeType.TEXT) {
          a.nodeValue += g.nodeValue, goog.dom.removeNode(g), this.range_ = goog.dom.browserrange.IeRange.getBrowserRangeForNode_(c), this.range_.move("character", d), this.clearCachedValues_()
        }
      }catch(h) {
      }
    }
  }
};
goog.dom.browserrange.IeRange.getDomHelper_ = function(a) {
  return goog.dom.getDomHelper(a.parentElement())
};
goog.dom.browserrange.IeRange.pasteElement_ = function(a, b, c) {
  var c = c || goog.dom.browserrange.IeRange.getDomHelper_(a), d, e = d = b.id;
  if(!d) {
    d = b.id = goog.string.createUniqueString()
  }
  a.pasteHTML(b.outerHTML);
  (b = c.getElement(d)) && (e || b.removeAttribute("id"));
  return b
};
goog.dom.browserrange.IeRange.prototype.surroundContents = function(a) {
  goog.dom.removeNode(a);
  a.innerHTML = this.range_.htmlText;
  (a = goog.dom.browserrange.IeRange.pasteElement_(this.range_, a)) && this.range_.moveToElementText(a);
  this.clearCachedValues_();
  return a
};
goog.dom.browserrange.IeRange.insertNode_ = function(a, b, c, d) {
  var d = d || goog.dom.browserrange.IeRange.getDomHelper_(a), e;
  b.nodeType != goog.dom.NodeType.ELEMENT && (e = true, b = d.createDom(goog.dom.TagName.DIV, null, b));
  a.collapse(c);
  b = goog.dom.browserrange.IeRange.pasteElement_(a, b, d);
  if(e) {
    a = b.firstChild, d.flattenElement(b), b = a
  }
  return b
};
goog.dom.browserrange.IeRange.prototype.insertNode = function(a, b) {
  var c = goog.dom.browserrange.IeRange.insertNode_(this.range_.duplicate(), a, b);
  this.clearCachedValues_();
  return c
};
goog.dom.browserrange.IeRange.prototype.surroundWithNodes = function(a, b) {
  var c = this.range_.duplicate(), d = this.range_.duplicate();
  goog.dom.browserrange.IeRange.insertNode_(c, a, true);
  goog.dom.browserrange.IeRange.insertNode_(d, b, false);
  this.clearCachedValues_()
};
goog.dom.browserrange.IeRange.prototype.collapse = function(a) {
  this.range_.collapse(a);
  a ? (this.endNode_ = this.startNode_, this.endOffset_ = this.startOffset_) : (this.startNode_ = this.endNode_, this.startOffset_ = this.endOffset_)
};
goog.dom.browserrange.OperaRange = function(a) {
  goog.dom.browserrange.W3cRange.call(this, a)
};
goog.inherits(goog.dom.browserrange.OperaRange, goog.dom.browserrange.W3cRange);
goog.dom.browserrange.OperaRange.createFromNodeContents = function(a) {
  return new goog.dom.browserrange.OperaRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNode(a))
};
goog.dom.browserrange.OperaRange.createFromNodes = function(a, b, c, d) {
  return new goog.dom.browserrange.OperaRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(a, b, c, d))
};
goog.dom.browserrange.OperaRange.prototype.selectInternal = function(a) {
  a.collapse(this.getStartNode(), this.getStartOffset());
  (this.getEndNode() != this.getStartNode() || this.getEndOffset() != this.getStartOffset()) && a.extend(this.getEndNode(), this.getEndOffset());
  a.rangeCount == 0 && a.addRange(this.range_)
};
goog.dom.browserrange.WebKitRange = function(a) {
  goog.dom.browserrange.W3cRange.call(this, a)
};
goog.inherits(goog.dom.browserrange.WebKitRange, goog.dom.browserrange.W3cRange);
goog.dom.browserrange.WebKitRange.createFromNodeContents = function(a) {
  return new goog.dom.browserrange.WebKitRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNode(a))
};
goog.dom.browserrange.WebKitRange.createFromNodes = function(a, b, c, d) {
  return new goog.dom.browserrange.WebKitRange(goog.dom.browserrange.W3cRange.getBrowserRangeForNodes(a, b, c, d))
};
goog.dom.browserrange.WebKitRange.prototype.compareBrowserRangeEndpoints = function(a, b, c) {
  return goog.userAgent.isVersion("528") ? goog.dom.browserrange.WebKitRange.superClass_.compareBrowserRangeEndpoints.call(this, a, b, c) : this.range_.compareBoundaryPoints(c == goog.dom.RangeEndpoint.START ? b == goog.dom.RangeEndpoint.START ? goog.global.Range.START_TO_START : goog.global.Range.END_TO_START : b == goog.dom.RangeEndpoint.START ? goog.global.Range.START_TO_END : goog.global.Range.END_TO_END, a)
};
goog.dom.browserrange.WebKitRange.prototype.selectInternal = function(a, b) {
  a.removeAllRanges();
  b ? a.setBaseAndExtent(this.getEndNode(), this.getEndOffset(), this.getStartNode(), this.getStartOffset()) : a.setBaseAndExtent(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
};
goog.dom.browserrange.Error = {NOT_IMPLEMENTED:"Not Implemented"};
goog.dom.browserrange.createRange = function(a) {
  return goog.userAgent.IE && !goog.userAgent.isVersion("9") ? new goog.dom.browserrange.IeRange(a, goog.dom.getOwnerDocument(a.parentElement())) : goog.userAgent.WEBKIT ? new goog.dom.browserrange.WebKitRange(a) : goog.userAgent.GECKO ? new goog.dom.browserrange.GeckoRange(a) : goog.userAgent.OPERA ? new goog.dom.browserrange.OperaRange(a) : new goog.dom.browserrange.W3cRange(a)
};
goog.dom.browserrange.createRangeFromNodeContents = function(a) {
  return goog.userAgent.IE && !goog.userAgent.isVersion("9") ? goog.dom.browserrange.IeRange.createFromNodeContents(a) : goog.userAgent.WEBKIT ? goog.dom.browserrange.WebKitRange.createFromNodeContents(a) : goog.userAgent.GECKO ? goog.dom.browserrange.GeckoRange.createFromNodeContents(a) : goog.userAgent.OPERA ? goog.dom.browserrange.OperaRange.createFromNodeContents(a) : goog.dom.browserrange.W3cRange.createFromNodeContents(a)
};
goog.dom.browserrange.createRangeFromNodes = function(a, b, c, d) {
  return goog.userAgent.IE && !goog.userAgent.isVersion("9") ? goog.dom.browserrange.IeRange.createFromNodes(a, b, c, d) : goog.userAgent.WEBKIT ? goog.dom.browserrange.WebKitRange.createFromNodes(a, b, c, d) : goog.userAgent.GECKO ? goog.dom.browserrange.GeckoRange.createFromNodes(a, b, c, d) : goog.userAgent.OPERA ? goog.dom.browserrange.OperaRange.createFromNodes(a, b, c, d) : goog.dom.browserrange.W3cRange.createFromNodes(a, b, c, d)
};
goog.dom.browserrange.canContainRangeEndpoint = function(a) {
  return goog.dom.canHaveChildren(a) || a.nodeType == goog.dom.NodeType.TEXT
};
goog.dom.TextRange = function() {
};
goog.inherits(goog.dom.TextRange, goog.dom.AbstractRange);
goog.dom.TextRange.createFromBrowserRange = function(a, b) {
  return goog.dom.TextRange.createFromBrowserRangeWrapper_(goog.dom.browserrange.createRange(a), b)
};
goog.dom.TextRange.createFromBrowserRangeWrapper_ = function(a, b) {
  var c = new goog.dom.TextRange;
  c.browserRangeWrapper_ = a;
  c.isReversed_ = !!b;
  return c
};
goog.dom.TextRange.createFromNodeContents = function(a, b) {
  return goog.dom.TextRange.createFromBrowserRangeWrapper_(goog.dom.browserrange.createRangeFromNodeContents(a), b)
};
goog.dom.TextRange.createFromNodes = function(a, b, c, d) {
  var e = new goog.dom.TextRange;
  e.isReversed_ = goog.dom.Range.isReversed(a, b, c, d);
  if(a.tagName == "BR") {
    var f = a.parentNode, b = goog.array.indexOf(f.childNodes, a), a = f
  }
  if(c.tagName == "BR") {
    f = c.parentNode, d = goog.array.indexOf(f.childNodes, c), c = f
  }
  e.isReversed_ ? (e.startNode_ = c, e.startOffset_ = d, e.endNode_ = a, e.endOffset_ = b) : (e.startNode_ = a, e.startOffset_ = b, e.endNode_ = c, e.endOffset_ = d);
  return e
};
goog.dom.TextRange.prototype.browserRangeWrapper_ = null;
goog.dom.TextRange.prototype.startNode_ = null;
goog.dom.TextRange.prototype.startOffset_ = null;
goog.dom.TextRange.prototype.endNode_ = null;
goog.dom.TextRange.prototype.endOffset_ = null;
goog.dom.TextRange.prototype.isReversed_ = false;
goog.dom.TextRange.prototype.clone = function() {
  var a = new goog.dom.TextRange;
  a.browserRangeWrapper_ = this.browserRangeWrapper_;
  a.startNode_ = this.startNode_;
  a.startOffset_ = this.startOffset_;
  a.endNode_ = this.endNode_;
  a.endOffset_ = this.endOffset_;
  a.isReversed_ = this.isReversed_;
  return a
};
goog.dom.TextRange.prototype.getType = function() {
  return goog.dom.RangeType.TEXT
};
goog.dom.TextRange.prototype.getBrowserRangeObject = function() {
  return this.getBrowserRangeWrapper_().getBrowserRange()
};
goog.dom.TextRange.prototype.setBrowserRangeObject = function(a) {
  if(goog.dom.AbstractRange.isNativeControlRange(a)) {
    return false
  }
  this.browserRangeWrapper_ = goog.dom.browserrange.createRange(a);
  this.clearCachedValues_();
  return true
};
goog.dom.TextRange.prototype.clearCachedValues_ = function() {
  this.startNode_ = this.startOffset_ = this.endNode_ = this.endOffset_ = null
};
goog.dom.TextRange.prototype.getTextRangeCount = function() {
  return 1
};
goog.dom.TextRange.prototype.getTextRange = function() {
  return this
};
goog.dom.TextRange.prototype.getBrowserRangeWrapper_ = function() {
  return this.browserRangeWrapper_ || (this.browserRangeWrapper_ = goog.dom.browserrange.createRangeFromNodes(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset()))
};
goog.dom.TextRange.prototype.getContainer = function() {
  return this.getBrowserRangeWrapper_().getContainer()
};
goog.dom.TextRange.prototype.getStartNode = function() {
  return this.startNode_ || (this.startNode_ = this.getBrowserRangeWrapper_().getStartNode())
};
goog.dom.TextRange.prototype.getStartOffset = function() {
  return this.startOffset_ != null ? this.startOffset_ : this.startOffset_ = this.getBrowserRangeWrapper_().getStartOffset()
};
goog.dom.TextRange.prototype.getEndNode = function() {
  return this.endNode_ || (this.endNode_ = this.getBrowserRangeWrapper_().getEndNode())
};
goog.dom.TextRange.prototype.getEndOffset = function() {
  return this.endOffset_ != null ? this.endOffset_ : this.endOffset_ = this.getBrowserRangeWrapper_().getEndOffset()
};
goog.dom.TextRange.prototype.moveToNodes = function(a, b, c, d, e) {
  this.startNode_ = a;
  this.startOffset_ = b;
  this.endNode_ = c;
  this.endOffset_ = d;
  this.isReversed_ = e;
  this.browserRangeWrapper_ = null
};
goog.dom.TextRange.prototype.isReversed = function() {
  return this.isReversed_
};
goog.dom.TextRange.prototype.containsRange = function(a, b) {
  var c = a.getType();
  if(c == goog.dom.RangeType.TEXT) {
    return this.getBrowserRangeWrapper_().containsRange(a.getBrowserRangeWrapper_(), b)
  }else {
    if(c == goog.dom.RangeType.CONTROL) {
      return c = a.getElements(), (b ? goog.array.some : goog.array.every)(c, function(a) {
        return this.containsNode(a, b)
      }, this)
    }
  }
  return false
};
goog.dom.TextRange.isAttachedNode = function(a) {
  if(goog.userAgent.IE && !goog.userAgent.isVersion("9")) {
    var b = false;
    try {
      b = a.parentNode
    }catch(c) {
    }
    return!!b
  }else {
    return goog.dom.contains(a.ownerDocument.body, a)
  }
};
goog.dom.TextRange.prototype.isRangeInDocument = function() {
  return(!this.startNode_ || goog.dom.TextRange.isAttachedNode(this.startNode_)) && (!this.endNode_ || goog.dom.TextRange.isAttachedNode(this.endNode_)) && (!(goog.userAgent.IE && !goog.userAgent.isVersion("9")) || this.getBrowserRangeWrapper_().isRangeInDocument())
};
goog.dom.TextRange.prototype.isCollapsed = function() {
  return this.getBrowserRangeWrapper_().isCollapsed()
};
goog.dom.TextRange.prototype.getText = function() {
  return this.getBrowserRangeWrapper_().getText()
};
goog.dom.TextRange.prototype.getHtmlFragment = function() {
  return this.getBrowserRangeWrapper_().getHtmlFragment()
};
goog.dom.TextRange.prototype.getValidHtml = function() {
  return this.getBrowserRangeWrapper_().getValidHtml()
};
goog.dom.TextRange.prototype.getPastableHtml = function() {
  var a = this.getValidHtml();
  if(a.match(/^\s*<td\b/i)) {
    a = "<table><tbody><tr>" + a + "</tr></tbody></table>"
  }else {
    if(a.match(/^\s*<tr\b/i)) {
      a = "<table><tbody>" + a + "</tbody></table>"
    }else {
      if(a.match(/^\s*<tbody\b/i)) {
        a = "<table>" + a + "</table>"
      }else {
        if(a.match(/^\s*<li\b/i)) {
          for(var b = this.getContainer(), c = goog.dom.TagName.UL;b;) {
            if(b.tagName == goog.dom.TagName.OL) {
              c = goog.dom.TagName.OL;
              break
            }else {
              if(b.tagName == goog.dom.TagName.UL) {
                break
              }
            }
            b = b.parentNode
          }
          a = goog.string.buildString("<", c, ">", a, "</", c, ">")
        }
      }
    }
  }
  return a
};
goog.dom.TextRange.prototype.__iterator__ = function() {
  return new goog.dom.TextRangeIterator(this.getStartNode(), this.getStartOffset(), this.getEndNode(), this.getEndOffset())
};
goog.dom.TextRange.prototype.select = function() {
  this.getBrowserRangeWrapper_().select(this.isReversed_)
};
goog.dom.TextRange.prototype.removeContents = function() {
  this.getBrowserRangeWrapper_().removeContents();
  this.clearCachedValues_()
};
goog.dom.TextRange.prototype.surroundContents = function(a) {
  a = this.getBrowserRangeWrapper_().surroundContents(a);
  this.clearCachedValues_();
  return a
};
goog.dom.TextRange.prototype.insertNode = function(a, b) {
  var c = this.getBrowserRangeWrapper_().insertNode(a, b);
  this.clearCachedValues_();
  return c
};
goog.dom.TextRange.prototype.surroundWithNodes = function(a, b) {
  this.getBrowserRangeWrapper_().surroundWithNodes(a, b);
  this.clearCachedValues_()
};
goog.dom.TextRange.prototype.saveUsingDom = function() {
  return new goog.dom.DomSavedTextRange_(this)
};
goog.dom.TextRange.prototype.collapse = function(a) {
  a = this.isReversed() ? !a : a;
  this.browserRangeWrapper_ && this.browserRangeWrapper_.collapse(a);
  a ? (this.endNode_ = this.startNode_, this.endOffset_ = this.startOffset_) : (this.startNode_ = this.endNode_, this.startOffset_ = this.endOffset_);
  this.isReversed_ = false
};
goog.dom.DomSavedTextRange_ = function(a) {
  this.anchorNode_ = a.getAnchorNode();
  this.anchorOffset_ = a.getAnchorOffset();
  this.focusNode_ = a.getFocusNode();
  this.focusOffset_ = a.getFocusOffset()
};
goog.inherits(goog.dom.DomSavedTextRange_, goog.dom.SavedRange);
goog.dom.DomSavedTextRange_.prototype.restoreInternal = function() {
  return goog.dom.Range.createFromNodes(this.anchorNode_, this.anchorOffset_, this.focusNode_, this.focusOffset_)
};
goog.dom.DomSavedTextRange_.prototype.disposeInternal = function() {
  goog.dom.DomSavedTextRange_.superClass_.disposeInternal.call(this);
  this.focusNode_ = this.anchorNode_ = null
};
goog.dom.ControlRange = function() {
};
goog.inherits(goog.dom.ControlRange, goog.dom.AbstractMultiRange);
goog.dom.ControlRange.createFromBrowserRange = function(a) {
  var b = new goog.dom.ControlRange;
  b.range_ = a;
  return b
};
goog.dom.ControlRange.createFromElements = function(a) {
  for(var b = goog.dom.getOwnerDocument(arguments[0]).body.createControlRange(), c = 0, d = arguments.length;c < d;c++) {
    b.addElement(arguments[c])
  }
  return goog.dom.ControlRange.createFromBrowserRange(b)
};
goog.dom.ControlRange.prototype.range_ = null;
goog.dom.ControlRange.prototype.elements_ = null;
goog.dom.ControlRange.prototype.sortedElements_ = null;
goog.dom.ControlRange.prototype.clearCachedValues_ = function() {
  this.sortedElements_ = this.elements_ = null
};
goog.dom.ControlRange.prototype.clone = function() {
  return goog.dom.ControlRange.createFromElements.apply(this, this.getElements())
};
goog.dom.ControlRange.prototype.getType = function() {
  return goog.dom.RangeType.CONTROL
};
goog.dom.ControlRange.prototype.getBrowserRangeObject = function() {
  return this.range_ || document.body.createControlRange()
};
goog.dom.ControlRange.prototype.setBrowserRangeObject = function(a) {
  if(!goog.dom.AbstractRange.isNativeControlRange(a)) {
    return false
  }
  this.range_ = a;
  return true
};
goog.dom.ControlRange.prototype.getTextRangeCount = function() {
  return this.range_ ? this.range_.length : 0
};
goog.dom.ControlRange.prototype.getTextRange = function(a) {
  return goog.dom.TextRange.createFromNodeContents(this.range_.item(a))
};
goog.dom.ControlRange.prototype.getContainer = function() {
  return goog.dom.findCommonAncestor.apply(null, this.getElements())
};
goog.dom.ControlRange.prototype.getStartNode = function() {
  return this.getSortedElements()[0]
};
goog.dom.ControlRange.prototype.getStartOffset = function() {
  return 0
};
goog.dom.ControlRange.prototype.getEndNode = function() {
  var a = this.getSortedElements(), b = goog.array.peek(a);
  return goog.array.find(a, function(a) {
    return goog.dom.contains(a, b)
  })
};
goog.dom.ControlRange.prototype.getEndOffset = function() {
  return this.getEndNode().childNodes.length
};
goog.dom.ControlRange.prototype.getElements = function() {
  if(!this.elements_ && (this.elements_ = [], this.range_)) {
    for(var a = 0;a < this.range_.length;a++) {
      this.elements_.push(this.range_.item(a))
    }
  }
  return this.elements_
};
goog.dom.ControlRange.prototype.getSortedElements = function() {
  if(!this.sortedElements_) {
    this.sortedElements_ = this.getElements().concat(), this.sortedElements_.sort(function(a, b) {
      return a.sourceIndex - b.sourceIndex
    })
  }
  return this.sortedElements_
};
goog.dom.ControlRange.prototype.isRangeInDocument = function() {
  var a = false;
  try {
    a = goog.array.every(this.getElements(), function(a) {
      return goog.userAgent.IE ? a.parentNode : goog.dom.contains(a.ownerDocument.body, a)
    })
  }catch(b) {
  }
  return a
};
goog.dom.ControlRange.prototype.isCollapsed = function() {
  return!this.range_ || !this.range_.length
};
goog.dom.ControlRange.prototype.getText = function() {
  return""
};
goog.dom.ControlRange.prototype.getHtmlFragment = function() {
  return goog.array.map(this.getSortedElements(), goog.dom.getOuterHtml).join("")
};
goog.dom.ControlRange.prototype.getValidHtml = function() {
  return this.getHtmlFragment()
};
goog.dom.ControlRange.prototype.getPastableHtml = goog.dom.ControlRange.prototype.getValidHtml;
goog.dom.ControlRange.prototype.__iterator__ = function() {
  return new goog.dom.ControlRangeIterator(this)
};
goog.dom.ControlRange.prototype.select = function() {
  this.range_ && this.range_.select()
};
goog.dom.ControlRange.prototype.removeContents = function() {
  if(this.range_) {
    for(var a = [], b = 0, c = this.range_.length;b < c;b++) {
      a.push(this.range_.item(b))
    }
    goog.array.forEach(a, goog.dom.removeNode);
    this.collapse(false)
  }
};
goog.dom.ControlRange.prototype.replaceContentsWithNode = function(a) {
  a = this.insertNode(a, true);
  this.isCollapsed() || this.removeContents();
  return a
};
goog.dom.ControlRange.prototype.saveUsingDom = function() {
  return new goog.dom.DomSavedControlRange_(this)
};
goog.dom.ControlRange.prototype.collapse = function() {
  this.range_ = null;
  this.clearCachedValues_()
};
goog.dom.DomSavedControlRange_ = function(a) {
  this.elements_ = a.getElements()
};
goog.inherits(goog.dom.DomSavedControlRange_, goog.dom.SavedRange);
goog.dom.DomSavedControlRange_.prototype.restoreInternal = function() {
  for(var a = (this.elements_.length ? goog.dom.getOwnerDocument(this.elements_[0]) : document).body.createControlRange(), b = 0, c = this.elements_.length;b < c;b++) {
    a.addElement(this.elements_[b])
  }
  return goog.dom.ControlRange.createFromBrowserRange(a)
};
goog.dom.DomSavedControlRange_.prototype.disposeInternal = function() {
  goog.dom.DomSavedControlRange_.superClass_.disposeInternal.call(this);
  delete this.elements_
};
goog.dom.ControlRangeIterator = function(a) {
  if(a) {
    this.elements_ = a.getSortedElements(), this.startNode_ = this.elements_.shift(), this.endNode_ = goog.array.peek(this.elements_) || this.startNode_
  }
  goog.dom.RangeIterator.call(this, this.startNode_, false)
};
goog.inherits(goog.dom.ControlRangeIterator, goog.dom.RangeIterator);
goog.dom.ControlRangeIterator.prototype.startNode_ = null;
goog.dom.ControlRangeIterator.prototype.endNode_ = null;
goog.dom.ControlRangeIterator.prototype.elements_ = null;
goog.dom.ControlRangeIterator.prototype.getStartTextOffset = function() {
  return 0
};
goog.dom.ControlRangeIterator.prototype.getEndTextOffset = function() {
  return 0
};
goog.dom.ControlRangeIterator.prototype.getStartNode = function() {
  return this.startNode_
};
goog.dom.ControlRangeIterator.prototype.getEndNode = function() {
  return this.endNode_
};
goog.dom.ControlRangeIterator.prototype.isLast = function() {
  return!this.depth && !this.elements_.length
};
goog.dom.ControlRangeIterator.prototype.next = function() {
  if(this.isLast()) {
    throw goog.iter.StopIteration;
  }else {
    if(!this.depth) {
      var a = this.elements_.shift();
      this.setPosition(a, goog.dom.TagWalkType.START_TAG, goog.dom.TagWalkType.START_TAG);
      return a
    }
  }
  return goog.dom.ControlRangeIterator.superClass_.next.call(this)
};
goog.dom.ControlRangeIterator.prototype.copyFrom = function(a) {
  this.elements_ = a.elements_;
  this.startNode_ = a.startNode_;
  this.endNode_ = a.endNode_;
  goog.dom.ControlRangeIterator.superClass_.copyFrom.call(this, a)
};
goog.dom.ControlRangeIterator.prototype.clone = function() {
  var a = new goog.dom.ControlRangeIterator(null);
  a.copyFrom(this);
  return a
};
goog.dom.MultiRange = function() {
  this.browserRanges_ = [];
  this.ranges_ = [];
  this.container_ = this.sortedRanges_ = null
};
goog.inherits(goog.dom.MultiRange, goog.dom.AbstractMultiRange);
goog.dom.MultiRange.createFromBrowserSelection = function(a) {
  for(var b = new goog.dom.MultiRange, c = 0, d = a.rangeCount;c < d;c++) {
    b.browserRanges_.push(a.getRangeAt(c))
  }
  return b
};
goog.dom.MultiRange.createFromBrowserRanges = function(a) {
  var b = new goog.dom.MultiRange;
  b.browserRanges_ = goog.array.clone(a);
  return b
};
goog.dom.MultiRange.createFromTextRanges = function(a) {
  var b = new goog.dom.MultiRange;
  b.ranges_ = a;
  b.browserRanges_ = goog.array.map(a, function(a) {
    return a.getBrowserRangeObject()
  });
  return b
};
goog.dom.MultiRange.prototype.logger_ = goog.debug.Logger.getLogger("goog.dom.MultiRange");
goog.dom.MultiRange.prototype.clearCachedValues_ = function() {
  this.ranges_ = [];
  this.container_ = this.sortedRanges_ = null
};
goog.dom.MultiRange.prototype.clone = function() {
  return goog.dom.MultiRange.createFromBrowserRanges(this.browserRanges_)
};
goog.dom.MultiRange.prototype.getType = function() {
  return goog.dom.RangeType.MULTI
};
goog.dom.MultiRange.prototype.getBrowserRangeObject = function() {
  this.browserRanges_.length > 1 && this.logger_.warning("getBrowserRangeObject called on MultiRange with more than 1 range");
  return this.browserRanges_[0]
};
goog.dom.MultiRange.prototype.setBrowserRangeObject = function() {
  return false
};
goog.dom.MultiRange.prototype.getTextRangeCount = function() {
  return this.browserRanges_.length
};
goog.dom.MultiRange.prototype.getTextRange = function(a) {
  this.ranges_[a] || (this.ranges_[a] = goog.dom.TextRange.createFromBrowserRange(this.browserRanges_[a]));
  return this.ranges_[a]
};
goog.dom.MultiRange.prototype.getContainer = function() {
  if(!this.container_) {
    for(var a = [], b = 0, c = this.getTextRangeCount();b < c;b++) {
      a.push(this.getTextRange(b).getContainer())
    }
    this.container_ = goog.dom.findCommonAncestor.apply(null, a)
  }
  return this.container_
};
goog.dom.MultiRange.prototype.getSortedRanges = function() {
  if(!this.sortedRanges_) {
    this.sortedRanges_ = this.getTextRanges(), this.sortedRanges_.sort(function(a, b) {
      var c = a.getStartNode(), d = a.getStartOffset(), e = b.getStartNode(), f = b.getStartOffset();
      return c == e && d == f ? 0 : goog.dom.Range.isReversed(c, d, e, f) ? 1 : -1
    })
  }
  return this.sortedRanges_
};
goog.dom.MultiRange.prototype.getStartNode = function() {
  return this.getSortedRanges()[0].getStartNode()
};
goog.dom.MultiRange.prototype.getStartOffset = function() {
  return this.getSortedRanges()[0].getStartOffset()
};
goog.dom.MultiRange.prototype.getEndNode = function() {
  return goog.array.peek(this.getSortedRanges()).getEndNode()
};
goog.dom.MultiRange.prototype.getEndOffset = function() {
  return goog.array.peek(this.getSortedRanges()).getEndOffset()
};
goog.dom.MultiRange.prototype.isRangeInDocument = function() {
  return goog.array.every(this.getTextRanges(), function(a) {
    return a.isRangeInDocument()
  })
};
goog.dom.MultiRange.prototype.isCollapsed = function() {
  return this.browserRanges_.length == 0 || this.browserRanges_.length == 1 && this.getTextRange(0).isCollapsed()
};
goog.dom.MultiRange.prototype.getText = function() {
  return goog.array.map(this.getTextRanges(), function(a) {
    return a.getText()
  }).join("")
};
goog.dom.MultiRange.prototype.getHtmlFragment = function() {
  return this.getValidHtml()
};
goog.dom.MultiRange.prototype.getValidHtml = function() {
  return goog.array.map(this.getTextRanges(), function(a) {
    return a.getValidHtml()
  }).join("")
};
goog.dom.MultiRange.prototype.getPastableHtml = function() {
  return this.getValidHtml()
};
goog.dom.MultiRange.prototype.__iterator__ = function() {
  return new goog.dom.MultiRangeIterator(this)
};
goog.dom.MultiRange.prototype.select = function() {
  var a = goog.dom.AbstractRange.getBrowserSelectionForWindow(this.getWindow());
  a.removeAllRanges();
  for(var b = 0, c = this.getTextRangeCount();b < c;b++) {
    a.addRange(this.getTextRange(b).getBrowserRangeObject())
  }
};
goog.dom.MultiRange.prototype.removeContents = function() {
  goog.array.forEach(this.getTextRanges(), function(a) {
    a.removeContents()
  })
};
goog.dom.MultiRange.prototype.saveUsingDom = function() {
  return new goog.dom.DomSavedMultiRange_(this)
};
goog.dom.MultiRange.prototype.collapse = function(a) {
  if(!this.isCollapsed()) {
    var b = a ? this.getTextRange(0) : this.getTextRange(this.getTextRangeCount() - 1);
    this.clearCachedValues_();
    b.collapse(a);
    this.ranges_ = [b];
    this.sortedRanges_ = [b];
    this.browserRanges_ = [b.getBrowserRangeObject()]
  }
};
goog.dom.DomSavedMultiRange_ = function(a) {
  this.savedRanges_ = goog.array.map(a.getTextRanges(), function(a) {
    return a.saveUsingDom()
  })
};
goog.inherits(goog.dom.DomSavedMultiRange_, goog.dom.SavedRange);
goog.dom.DomSavedMultiRange_.prototype.restoreInternal = function() {
  var a = goog.array.map(this.savedRanges_, function(a) {
    return a.restore()
  });
  return goog.dom.MultiRange.createFromTextRanges(a)
};
goog.dom.DomSavedMultiRange_.prototype.disposeInternal = function() {
  goog.dom.DomSavedMultiRange_.superClass_.disposeInternal.call(this);
  goog.array.forEach(this.savedRanges_, function(a) {
    a.dispose()
  });
  delete this.savedRanges_
};
goog.dom.MultiRangeIterator = function(a) {
  if(a) {
    this.iterators_ = goog.array.map(a.getSortedRanges(), function(a) {
      return goog.iter.toIterator(a)
    })
  }
  goog.dom.RangeIterator.call(this, a ? this.getStartNode() : null, false)
};
goog.inherits(goog.dom.MultiRangeIterator, goog.dom.RangeIterator);
goog.dom.MultiRangeIterator.prototype.iterators_ = null;
goog.dom.MultiRangeIterator.prototype.currentIdx_ = 0;
goog.dom.MultiRangeIterator.prototype.getStartTextOffset = function() {
  return this.iterators_[this.currentIdx_].getStartTextOffset()
};
goog.dom.MultiRangeIterator.prototype.getEndTextOffset = function() {
  return this.iterators_[this.currentIdx_].getEndTextOffset()
};
goog.dom.MultiRangeIterator.prototype.getStartNode = function() {
  return this.iterators_[0].getStartNode()
};
goog.dom.MultiRangeIterator.prototype.getEndNode = function() {
  return goog.array.peek(this.iterators_).getEndNode()
};
goog.dom.MultiRangeIterator.prototype.isLast = function() {
  return this.iterators_[this.currentIdx_].isLast()
};
goog.dom.MultiRangeIterator.prototype.next = function() {
  try {
    var a = this.iterators_[this.currentIdx_], b = a.next();
    this.setPosition(a.node, a.tagType, a.depth);
    return b
  }catch(c) {
    if(c !== goog.iter.StopIteration || this.iterators_.length - 1 == this.currentIdx_) {
      throw c;
    }else {
      return this.currentIdx_++, this.next()
    }
  }
};
goog.dom.MultiRangeIterator.prototype.copyFrom = function(a) {
  this.iterators_ = goog.array.clone(a.iterators_);
  goog.dom.MultiRangeIterator.superClass_.copyFrom.call(this, a)
};
goog.dom.MultiRangeIterator.prototype.clone = function() {
  var a = new goog.dom.MultiRangeIterator(null);
  a.copyFrom(this);
  return a
};
goog.dom.Range = {};
goog.dom.Range.createFromWindow = function(a) {
  return(a = goog.dom.AbstractRange.getBrowserSelectionForWindow(a || window)) && goog.dom.Range.createFromBrowserSelection(a)
};
goog.dom.Range.createFromBrowserSelection = function(a) {
  var b, c = false;
  if(a.createRange) {
    try {
      b = a.createRange()
    }catch(d) {
      return null
    }
  }else {
    if(a.rangeCount) {
      if(a.rangeCount > 1) {
        return goog.dom.MultiRange.createFromBrowserSelection(a)
      }else {
        b = a.getRangeAt(0), c = goog.dom.Range.isReversed(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset)
      }
    }else {
      return null
    }
  }
  return goog.dom.Range.createFromBrowserRange(b, c)
};
goog.dom.Range.createFromBrowserRange = function(a, b) {
  return goog.dom.AbstractRange.isNativeControlRange(a) ? goog.dom.ControlRange.createFromBrowserRange(a) : goog.dom.TextRange.createFromBrowserRange(a, b)
};
goog.dom.Range.createFromNodeContents = function(a, b) {
  return goog.dom.TextRange.createFromNodeContents(a, b)
};
goog.dom.Range.createCaret = function(a, b) {
  return goog.dom.TextRange.createFromNodes(a, b, a, b)
};
goog.dom.Range.createFromNodes = function(a, b, c, d) {
  return goog.dom.TextRange.createFromNodes(a, b, c, d)
};
goog.dom.Range.clearSelection = function(a) {
  if(a = goog.dom.AbstractRange.getBrowserSelectionForWindow(a || window)) {
    if(a.empty) {
      try {
        a.empty()
      }catch(b) {
      }
    }else {
      a.removeAllRanges()
    }
  }
};
goog.dom.Range.hasSelection = function(a) {
  a = goog.dom.AbstractRange.getBrowserSelectionForWindow(a || window);
  return!!a && (goog.userAgent.IE ? a.type != "None" : !!a.rangeCount)
};
goog.dom.Range.isReversed = function(a, b, c, d) {
  if(a == c) {
    return d < b
  }
  var e;
  if(a.nodeType == goog.dom.NodeType.ELEMENT && b) {
    if(e = a.childNodes[b]) {
      a = e, b = 0
    }else {
      if(goog.dom.contains(a, c)) {
        return true
      }
    }
  }
  if(c.nodeType == goog.dom.NodeType.ELEMENT && d) {
    if(e = c.childNodes[d]) {
      c = e, d = 0
    }else {
      if(goog.dom.contains(c, a)) {
        return false
      }
    }
  }
  return(goog.dom.compareNodeOrder(a, c) || b - d) > 0
};
goog.async = {};
goog.async.Delay = function(a, b, c) {
  goog.Disposable.call(this);
  this.listener_ = a;
  this.interval_ = b || 0;
  this.handler_ = c;
  this.callback_ = goog.bind(this.doAction_, this)
};
goog.inherits(goog.async.Delay, goog.Disposable);
goog.Delay = goog.async.Delay;
goog.async.Delay.prototype.id_ = 0;
goog.async.Delay.prototype.disposeInternal = function() {
  goog.async.Delay.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.listener_;
  delete this.handler_
};
goog.async.Delay.prototype.start = function(a) {
  this.stop();
  this.id_ = goog.Timer.callOnce(this.callback_, goog.isDef(a) ? a : this.interval_)
};
goog.async.Delay.prototype.stop = function() {
  this.isActive() && goog.Timer.clear(this.id_);
  this.id_ = 0
};
goog.async.Delay.prototype.fire = function() {
  this.stop();
  this.doAction_()
};
goog.async.Delay.prototype.fireIfActive = function() {
  this.isActive() && this.fire()
};
goog.async.Delay.prototype.isActive = function() {
  return this.id_ != 0
};
goog.async.Delay.prototype.doAction_ = function() {
  this.id_ = 0;
  this.listener_ && this.listener_.call(this.handler_)
};
goog.editor.defines = {};
goog.editor.defines.USE_CONTENTEDITABLE_IN_FIREFOX_3 = false;
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = false;
goog.userAgent.product.ASSUME_CAMINO = false;
goog.userAgent.product.ASSUME_IPHONE = false;
goog.userAgent.product.ASSUME_IPAD = false;
goog.userAgent.product.ASSUME_ANDROID = false;
goog.userAgent.product.ASSUME_CHROME = false;
goog.userAgent.product.ASSUME_SAFARI = false;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function() {
  goog.userAgent.product.detectedFirefox_ = false;
  goog.userAgent.product.detectedCamino_ = false;
  goog.userAgent.product.detectedIphone_ = false;
  goog.userAgent.product.detectedIpad_ = false;
  goog.userAgent.product.detectedAndroid_ = false;
  goog.userAgent.product.detectedChrome_ = false;
  goog.userAgent.product.detectedSafari_ = false;
  var a = goog.userAgent.getUserAgentString();
  if(a) {
    if(a.indexOf("Firefox") != -1) {
      goog.userAgent.product.detectedFirefox_ = true
    }else {
      if(a.indexOf("Camino") != -1) {
        goog.userAgent.product.detectedCamino_ = true
      }else {
        if(a.indexOf("iPhone") != -1 || a.indexOf("iPod") != -1) {
          goog.userAgent.product.detectedIphone_ = true
        }else {
          if(a.indexOf("iPad") != -1) {
            goog.userAgent.product.detectedIpad_ = true
          }else {
            if(a.indexOf("Android") != -1) {
              goog.userAgent.product.detectedAndroid_ = true
            }else {
              if(a.indexOf("Chrome") != -1) {
                goog.userAgent.product.detectedChrome_ = true
              }else {
                if(a.indexOf("Safari") != -1) {
                  goog.userAgent.product.detectedSafari_ = true
                }
              }
            }
          }
        }
      }
    }
  }
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.userAgent.product.detectedIpad_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;
goog.userAgent.product.determineVersion_ = function() {
  var a = "", b, c;
  if(goog.userAgent.product.FIREFOX) {
    b = /Firefox\/([0-9.]+)/
  }else {
    if(goog.userAgent.product.IE || goog.userAgent.product.OPERA) {
      return goog.userAgent.VERSION
    }else {
      goog.userAgent.product.CHROME ? b = /Chrome\/([0-9.]+)/ : goog.userAgent.product.SAFARI ? b = /Version\/([0-9.]+)/ : goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD ? (b = /Version\/(\S+).*Mobile\/(\S+)/, c = true) : goog.userAgent.product.ANDROID ? b = /Android\s+([0-9.]+)(?:.*Version\/([0-9.]+))?/ : goog.userAgent.product.CAMINO && (b = /Camino\/([0-9.]+)/)
    }
  }
  b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? c ? a[1] + "." + a[2] : a[2] || a[1] : "");
  return a
};
goog.userAgent.product.VERSION = goog.userAgent.product.determineVersion_();
goog.userAgent.product.isVersion = function(a) {
  return goog.string.compareVersions(goog.userAgent.product.VERSION, a) >= 0
};
goog.editor.BrowserFeature = {HAS_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isVersion("9"), HAS_W3C_RANGES:goog.userAgent.GECKO || goog.userAgent.WEBKIT || goog.userAgent.OPERA || goog.userAgent.IE && goog.userAgent.isVersion("9"), HAS_CONTENT_EDITABLE:goog.userAgent.IE || goog.userAgent.WEBKIT || goog.userAgent.OPERA || goog.editor.defines.USE_CONTENTEDITABLE_IN_FIREFOX_3 && goog.userAgent.GECKO && goog.userAgent.isVersion("1.9"), USE_MUTATION_EVENTS:goog.userAgent.GECKO, HAS_DOM_SUBTREE_MODIFIED_EVENT:goog.userAgent.WEBKIT || 
goog.editor.defines.USE_CONTENTEDITABLE_IN_FIREFOX_3 && goog.userAgent.GECKO && goog.userAgent.isVersion("1.9"), HAS_DOCUMENT_INDEPENDENT_NODES:goog.userAgent.GECKO, PUTS_CURSOR_BEFORE_FIRST_BLOCK_ELEMENT_ON_FOCUS:goog.userAgent.GECKO, CLEARS_SELECTION_WHEN_FOCUS_LEAVES:goog.userAgent.IE || goog.userAgent.WEBKIT || goog.userAgent.OPERA, HAS_UNSELECTABLE_STYLE:goog.userAgent.GECKO || goog.userAgent.WEBKIT, FORMAT_BLOCK_WORKS_FOR_BLOCKQUOTES:goog.userAgent.GECKO || goog.userAgent.WEBKIT || goog.userAgent.OPERA, 
CREATES_MULTIPLE_BLOCKQUOTES:goog.userAgent.WEBKIT || goog.userAgent.OPERA, WRAPS_BLOCKQUOTE_IN_DIVS:goog.userAgent.OPERA, PREFERS_READY_STATE_CHANGE_EVENT:goog.userAgent.IE, TAB_FIRES_KEYPRESS:!goog.userAgent.IE, NEEDS_99_WIDTH_IN_STANDARDS_MODE:goog.userAgent.IE, USE_DOCUMENT_FOR_KEY_EVENTS:goog.userAgent.GECKO && !goog.editor.defines.USE_CONTENTEDITABLE_IN_FIREFOX_3, SHOWS_CUSTOM_ATTRS_IN_INNER_HTML:goog.userAgent.IE, COLLAPSES_EMPTY_NODES:goog.userAgent.GECKO || goog.userAgent.WEBKIT || goog.userAgent.OPERA, 
CONVERT_TO_B_AND_I_TAGS:goog.userAgent.GECKO || goog.userAgent.OPERA, TABS_THROUGH_IMAGES:goog.userAgent.IE, UNESCAPES_URLS_WITHOUT_ASKING:goog.userAgent.IE && !goog.userAgent.isVersion("7.0"), HAS_STYLE_WITH_CSS:goog.userAgent.GECKO && goog.userAgent.isVersion("1.8") || goog.userAgent.WEBKIT || goog.userAgent.OPERA, FOLLOWS_EDITABLE_LINKS:goog.userAgent.WEBKIT, HAS_ACTIVE_ELEMENT:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9"), HAS_SET_CAPTURE:goog.userAgent.IE, 
EATS_EMPTY_BACKGROUND_COLOR:goog.userAgent.GECKO || goog.userAgent.WEBKIT, SUPPORTS_FOCUSIN:goog.userAgent.IE || goog.userAgent.OPERA, SELECTS_IMAGES_ON_CLICK:goog.userAgent.IE || goog.userAgent.OPERA, MOVES_STYLE_TO_HEAD:goog.userAgent.WEBKIT, COLLAPSES_SELECTION_ONMOUSEDOWN:false, CARET_INSIDE_SELECTION:goog.userAgent.OPERA, FOCUSES_EDITABLE_BODY_ON_HTML_CLICK:true, USES_KEYDOWN:goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525"), ADDS_NBSPS_IN_REMOVE_FORMAT:goog.userAgent.WEBKIT && 
!goog.userAgent.isVersion("531"), GETS_STUCK_IN_LINKS:goog.userAgent.WEBKIT && !goog.userAgent.isVersion("528"), NORMALIZE_CORRUPTS_EMPTY_TEXT_NODES:goog.userAgent.GECKO && goog.userAgent.isVersion("1.9") || goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT && goog.userAgent.isVersion("531"), NORMALIZE_CORRUPTS_ALL_TEXT_NODES:goog.userAgent.IE, NESTS_SUBSCRIPT_SUPERSCRIPT:goog.userAgent.IE || goog.userAgent.GECKO || goog.userAgent.OPERA, CAN_SELECT_EMPTY_ELEMENT:!goog.userAgent.IE && 
!goog.userAgent.WEBKIT, FORGETS_FORMATTING_WHEN_LISTIFYING:goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.isVersion("526"), LEAVES_P_WHEN_REMOVING_LISTS:goog.userAgent.IE || goog.userAgent.OPERA, CAN_LISTIFY_BR:!goog.userAgent.IE && !goog.userAgent.OPERA, DOESNT_OVERRIDE_FONT_SIZE_IN_STYLE_ATTR:!goog.userAgent.WEBKIT, SUPPORTS_HTML5_FILE_DRAGGING:goog.userAgent.product.CHROME && goog.userAgent.product.isVersion("4") || goog.userAgent.product.SAFARI && goog.userAgent.isVersion("533")};
goog.functions = {};
goog.functions.constant = function(a) {
  return function() {
    return a
  }
};
goog.functions.FALSE = goog.functions.constant(false);
goog.functions.TRUE = goog.functions.constant(true);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a) {
  return a
};
goog.functions.error = function(a) {
  return function() {
    throw Error(a);
  }
};
goog.functions.lock = function(a) {
  return function() {
    return a.call(this)
  }
};
goog.functions.withReturnValue = function(a, b) {
  return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.compose = function(a) {
  var b = arguments, c = b.length;
  return function() {
    var a;
    c && (a = b[c - 1].apply(this, arguments));
    for(var e = c - 2;e >= 0;e--) {
      a = b[e].call(this, a)
    }
    return a
  }
};
goog.functions.sequence = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a, e = 0;e < c;e++) {
      a = b[e].apply(this, arguments)
    }
    return a
  }
};
goog.functions.and = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a = 0;a < c;a++) {
      if(!b[a].apply(this, arguments)) {
        return false
      }
    }
    return true
  }
};
goog.functions.or = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a = 0;a < c;a++) {
      if(b[a].apply(this, arguments)) {
        return true
      }
    }
    return false
  }
};
goog.functions.not = function(a) {
  return function() {
    return!a.apply(this, arguments)
  }
};
goog.functions.create = function(a, b) {
  var c = function() {
  };
  c.prototype = a.prototype;
  c = new c;
  a.apply(c, Array.prototype.slice.call(arguments, 1));
  return c
};
goog.editor.Plugin = function() {
  goog.events.EventTarget.call(this);
  this.enabled_ = this.activeOnUneditableFields()
};
goog.inherits(goog.editor.Plugin, goog.events.EventTarget);
goog.editor.Plugin.prototype.fieldObject = null;
goog.editor.Plugin.prototype.getFieldDomHelper = function() {
  return this.fieldObject && this.fieldObject.getEditableDomHelper()
};
goog.editor.Plugin.prototype.autoDispose_ = true;
goog.editor.Plugin.prototype.logger = goog.debug.Logger.getLogger("goog.editor.Plugin");
goog.editor.Plugin.prototype.registerFieldObject = function(a) {
  this.fieldObject = a
};
goog.editor.Plugin.prototype.unregisterFieldObject = function() {
  if(this.fieldObject) {
    this.disable(this.fieldObject), this.fieldObject = null
  }
};
goog.editor.Plugin.prototype.enable = function(a) {
  this.fieldObject == a ? this.enabled_ = true : this.logger.severe("Trying to enable an unregistered field with this plugin.")
};
goog.editor.Plugin.prototype.disable = function(a) {
  this.fieldObject == a ? this.enabled_ = false : this.logger.severe("Trying to disable an unregistered field with this plugin.")
};
goog.editor.Plugin.prototype.isEnabled = function(a) {
  return this.fieldObject == a ? this.enabled_ : false
};
goog.editor.Plugin.prototype.setAutoDispose = function(a) {
  this.autoDispose_ = a
};
goog.editor.Plugin.prototype.isAutoDispose = function() {
  return this.autoDispose_
};
goog.editor.Plugin.prototype.activeOnUneditableFields = goog.functions.FALSE;
goog.editor.Plugin.prototype.isSilentCommand = goog.functions.FALSE;
goog.editor.Plugin.prototype.disposeInternal = function() {
  this.fieldObject && this.unregisterFieldObject(this.fieldObject);
  goog.editor.Plugin.superClass_.disposeInternal.call(this)
};
goog.editor.Plugin.Op = {KEYDOWN:1, KEYPRESS:2, KEYUP:3, SELECTION:4, SHORTCUT:5, EXEC_COMMAND:6, QUERY_COMMAND:7, PREPARE_CONTENTS_HTML:8, CLEAN_CONTENTS_HTML:10, CLEAN_CONTENTS_DOM:11};
goog.editor.Plugin.OPCODE = goog.object.transpose(goog.reflect.object(goog.editor.Plugin, {handleKeyDown:goog.editor.Plugin.Op.KEYDOWN, handleKeyPress:goog.editor.Plugin.Op.KEYPRESS, handleKeyUp:goog.editor.Plugin.Op.KEYUP, handleSelectionChange:goog.editor.Plugin.Op.SELECTION, handleKeyboardShortcut:goog.editor.Plugin.Op.SHORTCUT, execCommand:goog.editor.Plugin.Op.EXEC_COMMAND, queryCommandValue:goog.editor.Plugin.Op.QUERY_COMMAND, prepareContentsHtml:goog.editor.Plugin.Op.PREPARE_CONTENTS_HTML, 
cleanContentsHtml:goog.editor.Plugin.Op.CLEAN_CONTENTS_HTML, cleanContentsDom:goog.editor.Plugin.Op.CLEAN_CONTENTS_DOM}));
goog.editor.Plugin.IRREPRESSIBLE_OPS = goog.object.createSet(goog.editor.Plugin.Op.PREPARE_CONTENTS_HTML, goog.editor.Plugin.Op.CLEAN_CONTENTS_HTML, goog.editor.Plugin.Op.CLEAN_CONTENTS_DOM);
goog.editor.Plugin.prototype.execCommand = function(a, b) {
  var c = this.isSilentCommand(a);
  c || (goog.userAgent.GECKO && this.fieldObject.stopChangeEvents(true, true), this.fieldObject.dispatchBeforeChange());
  try {
    var d = this.execCommandInternal.apply(this, arguments)
  }finally {
    c || (this.fieldObject.dispatchChange(), a != goog.editor.Command.LINK && this.fieldObject.dispatchSelectionChangeEvent())
  }
  return d
};
goog.editor.Plugin.prototype.isSupportedCommand = function() {
  return false
};
goog.editor.icontent = {};
goog.editor.icontent.FieldFormatInfo = function(a, b, c, d, e) {
  this.fieldId_ = a;
  this.standards_ = b;
  this.blended_ = c;
  this.fixedHeight_ = d;
  this.extraStyles_ = e || {}
};
goog.editor.icontent.FieldStyleInfo = function(a, b) {
  this.wrapper_ = a;
  this.css_ = b
};
goog.editor.icontent.useStandardsModeIframes_ = false;
goog.editor.icontent.forceStandardsModeIframes = function() {
  goog.editor.icontent.useStandardsModeIframes_ = true
};
goog.editor.icontent.getInitialIframeContent_ = function(a, b, c) {
  var d = [];
  (a.blended_ && a.standards_ || goog.editor.icontent.useStandardsModeIframes_) && d.push("<!DOCTYPE HTML>");
  d.push('<html style="background:none transparent;');
  a.blended_ && d.push("height:", a.fixedHeight_ ? "100%" : "auto");
  d.push('">');
  d.push("<head><style>");
  c && c.css_ && d.push(c.css_);
  goog.userAgent.GECKO && a.standards_ && d.push(" img {-moz-force-broken-image-icon: 1;}");
  d.push("</style></head>");
  d.push('<body g_editable="true" hidefocus="true" ');
  goog.editor.BrowserFeature.HAS_CONTENT_EDITABLE && d.push("contentEditable ");
  d.push('class="editable ');
  d.push('" id="', a.fieldId_, '" style="');
  goog.userAgent.GECKO && a.blended_ && (d.push(";width:100%;border:0;margin:0;background:none transparent;", ";height:", a.standards_ ? "100%" : "auto"), a.fixedHeight_ ? d.push(";overflow:auto") : d.push(";overflow-y:hidden;overflow-x:auto"));
  goog.userAgent.OPERA && d.push(";outline:hidden");
  for(var e in a.extraStyles_) {
    d.push(";" + e + ":" + a.extraStyles_[e])
  }
  d.push('">', b, "</body></html>");
  return d.join("")
};
goog.editor.icontent.writeNormalInitialBlendedIframe = function(a, b, c, d) {
  if(a.blended_) {
    var e = goog.style.getPaddingBox(c.wrapper_);
    (e.top || e.left || e.right || e.bottom) && goog.style.setStyle(d, "margin", -e.top + "px " + -e.right + "px " + -e.bottom + "px " + -e.left + "px")
  }
  goog.editor.icontent.writeNormalInitialIframe(a, b, c, d)
};
goog.editor.icontent.writeNormalInitialIframe = function(a, b, c, d) {
  a = goog.editor.icontent.getInitialIframeContent_(a, b, c);
  d = goog.dom.getFrameContentDocument(d);
  d.open();
  d.write(a);
  d.close()
};
goog.editor.icontent.writeHttpsInitialIframe = function(a, b, c) {
  b = b.body;
  if(goog.editor.BrowserFeature.HAS_CONTENT_EDITABLE) {
    b.contentEditable = true
  }
  b.className = "editable";
  b.setAttribute("g_editable", true);
  b.hideFocus = true;
  b.id = a.fieldId_;
  goog.style.setStyle(b, a.extraStyles_);
  b.innerHTML = c
};
goog.dom.iter = {};
goog.dom.iter.SiblingIterator = function(a, b, c) {
  this.node_ = a;
  this.reverse_ = !!c;
  a && !b && this.next()
};
goog.inherits(goog.dom.iter.SiblingIterator, goog.iter.Iterator);
goog.dom.iter.SiblingIterator.prototype.next = function() {
  var a = this.node_;
  if(!a) {
    throw goog.iter.StopIteration;
  }
  this.node_ = this.reverse_ ? a.previousSibling : a.nextSibling;
  return a
};
goog.dom.iter.ChildIterator = function(a, b, c) {
  goog.isDef(c) || (c = b && a.childNodes.length ? a.childNodes.length - 1 : 0);
  goog.dom.iter.SiblingIterator.call(this, a.childNodes[c], true, b)
};
goog.inherits(goog.dom.iter.ChildIterator, goog.dom.iter.SiblingIterator);
goog.dom.iter.AncestorIterator = function(a, b) {
  (this.node_ = a) && !b && this.next()
};
goog.inherits(goog.dom.iter.AncestorIterator, goog.iter.Iterator);
goog.dom.iter.AncestorIterator.prototype.next = function() {
  var a = this.node_;
  if(!a) {
    throw goog.iter.StopIteration;
  }
  this.node_ = a.parentNode;
  return a
};
goog.editor.node = {};
goog.editor.node.BLOCK_TAG_NAMES_ = goog.object.createSet("ADDRESS", "BLOCKQUOTE", "BODY", "CAPTION", "CENTER", "COL", "COLGROUP", "DIR", "DIV", "DL", "DD", "DT", "FIELDSET", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HR", "ISINDEX", "OL", "LI", "MAP", "MENU", "OPTGROUP", "OPTION", "P", "PRE", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "TL", "UL");
goog.editor.node.NON_EMPTY_TAGS_ = goog.object.createSet(goog.dom.TagName.IMG, goog.dom.TagName.IFRAME, "EMBED");
goog.editor.node.isStandardsMode = function(a) {
  return goog.dom.getDomHelper(a).isCss1CompatMode()
};
goog.editor.node.getRightMostLeaf = function(a) {
  for(var b;b = goog.editor.node.getLastChild(a);) {
    a = b
  }
  return a
};
goog.editor.node.getLeftMostLeaf = function(a) {
  for(var b;b = goog.editor.node.getFirstChild(a);) {
    a = b
  }
  return a
};
goog.editor.node.getFirstChild = function(a) {
  return goog.editor.node.getChildHelper_(a, false)
};
goog.editor.node.getLastChild = function(a) {
  return goog.editor.node.getChildHelper_(a, true)
};
goog.editor.node.getPreviousSibling = function(a) {
  return goog.editor.node.getFirstValue_(goog.iter.filter(new goog.dom.iter.SiblingIterator(a, false, true), goog.editor.node.isImportant))
};
goog.editor.node.getNextSibling = function(a) {
  return goog.editor.node.getFirstValue_(goog.iter.filter(new goog.dom.iter.SiblingIterator(a), goog.editor.node.isImportant))
};
goog.editor.node.getChildHelper_ = function(a, b) {
  return!a || a.nodeType != goog.dom.NodeType.ELEMENT ? null : goog.editor.node.getFirstValue_(goog.iter.filter(new goog.dom.iter.ChildIterator(a, b), goog.editor.node.isImportant))
};
goog.editor.node.getFirstValue_ = function(a) {
  try {
    return a.next()
  }catch(b) {
    return null
  }
};
goog.editor.node.isImportant = function(a) {
  return a.nodeType == goog.dom.NodeType.ELEMENT || a.nodeType == goog.dom.NodeType.TEXT && !goog.editor.node.isAllNonNbspWhiteSpace(a)
};
goog.editor.node.isAllNonNbspWhiteSpace = function(a) {
  return goog.string.isBreakingWhitespace(a.nodeValue)
};
goog.editor.node.isEmpty = function(a, b) {
  var c = goog.dom.getRawTextContent(a);
  if(a.getElementsByTagName) {
    for(var d in goog.editor.node.NON_EMPTY_TAGS_) {
      if(a.tagName == d || a.getElementsByTagName(d).length > 0) {
        return false
      }
    }
  }
  return!b && c == goog.string.Unicode.NBSP || goog.string.isBreakingWhitespace(c)
};
goog.editor.node.getActiveElementIE = function(a) {
  try {
    return a.activeElement
  }catch(b) {
  }
  return null
};
goog.editor.node.getLength = function(a) {
  return a.length || a.childNodes.length
};
goog.editor.node.findInChildren = function(a, b) {
  for(var c = 0, d = a.childNodes.length;c < d;c++) {
    if(b(a.childNodes[c])) {
      return c
    }
  }
  return null
};
goog.editor.node.findHighestMatchingAncestor = function(a, b) {
  for(var c = a.parentNode, d = null;c && b(c);) {
    d = c, c = c.parentNode
  }
  return d
};
goog.editor.node.isBlockTag = function(a) {
  return!!goog.editor.node.BLOCK_TAG_NAMES_[a.tagName]
};
goog.editor.node.skipEmptyTextNodes = function(a) {
  for(;a && a.nodeType == goog.dom.NodeType.TEXT && !a.nodeValue;) {
    a = a.nextSibling
  }
  return a
};
goog.editor.node.isEditableContainer = function(a) {
  return a.getAttribute && a.getAttribute("g_editable") == "true"
};
goog.editor.node.isEditable = function(a) {
  return!!goog.dom.getAncestor(a, goog.editor.node.isEditableContainer)
};
goog.editor.node.findTopMostEditableAncestor = function(a, b) {
  for(var c = null;a && !goog.editor.node.isEditableContainer(a);) {
    b(a) && (c = a), a = a.parentNode
  }
  return c
};
goog.editor.node.splitDomTreeAt = function(a, b, c) {
  for(var d;a != c && (d = a.parentNode);) {
    b = goog.editor.node.getSecondHalfOfNode_(d, a, b), a = d
  }
  return b
};
goog.editor.node.getSecondHalfOfNode_ = function(a, b, c) {
  for(a = a.cloneNode(false);b.nextSibling;) {
    goog.dom.appendChild(a, b.nextSibling)
  }
  c && a.insertBefore(c, a.firstChild);
  return a
};
goog.editor.node.transferChildren = function(a, b) {
  goog.dom.append(a, b.childNodes)
};
goog.editor.style = {};
goog.editor.style.getComputedOrCascadedStyle_ = function(a, b) {
  return a.nodeType != goog.dom.NodeType.ELEMENT ? null : goog.userAgent.IE ? goog.style.getCascadedStyle(a, b) : goog.style.getComputedStyle(a, b)
};
goog.editor.style.isDisplayBlock = function(a) {
  return goog.editor.style.getComputedOrCascadedStyle_(a, "display") == "block"
};
goog.editor.style.isContainer = function(a) {
  var b = a && a.nodeName.toLowerCase();
  return!(!a || !goog.editor.style.isDisplayBlock(a) && !(b == "td" || b == "table" || b == "li"))
};
goog.editor.style.getContainer = function(a) {
  return goog.dom.getAncestor(a, goog.editor.style.isContainer, true)
};
goog.editor.style.SELECTABLE_INPUT_TYPES_ = goog.object.createSet("text", "file", "url");
goog.editor.style.cancelMouseDownHelper_ = function(a) {
  var b = a.target.tagName;
  b != goog.dom.TagName.TEXTAREA && b != goog.dom.TagName.INPUT && a.preventDefault()
};
goog.editor.style.makeUnselectable = function(a, b) {
  goog.editor.BrowserFeature.HAS_UNSELECTABLE_STYLE && b.listen(a, goog.events.EventType.MOUSEDOWN, goog.editor.style.cancelMouseDownHelper_, true);
  goog.style.setUnselectable(a, true);
  for(var c = a.getElementsByTagName(goog.dom.TagName.INPUT), d = 0, e = c.length;d < e;d++) {
    var f = c[d];
    f.type in goog.editor.style.SELECTABLE_INPUT_TYPES_ && goog.editor.style.makeSelectable(f)
  }
  goog.array.forEach(a.getElementsByTagName(goog.dom.TagName.TEXTAREA), goog.editor.style.makeSelectable)
};
goog.editor.style.makeSelectable = function(a) {
  goog.style.setUnselectable(a, false);
  if(goog.editor.BrowserFeature.HAS_UNSELECTABLE_STYLE) {
    for(var b = a, a = a.parentNode;a && a.tagName != goog.dom.TagName.HTML;) {
      if(goog.style.isUnselectable(a)) {
        goog.style.setUnselectable(a, false, true);
        for(var c = 0, d = a.childNodes.length;c < d;c++) {
          var e = a.childNodes[c];
          e != b && e.nodeType == goog.dom.NodeType.ELEMENT && goog.style.setUnselectable(a.childNodes[c], true)
        }
      }
      b = a;
      a = a.parentNode
    }
  }
};
goog.editor.range = {};
goog.editor.range.narrow = function(a, b) {
  var c = a.getStartNode(), d = a.getEndNode();
  if(c && d) {
    var e = function(a) {
      return a == b
    }, c = goog.dom.getAncestor(c, e, true), d = goog.dom.getAncestor(d, e, true);
    if(c && d) {
      return a.clone()
    }else {
      if(c) {
        return d = goog.editor.node.getRightMostLeaf(b), goog.dom.Range.createFromNodes(a.getStartNode(), a.getStartOffset(), d, goog.editor.node.getLength(d))
      }else {
        if(d) {
          return goog.dom.Range.createFromNodes(goog.editor.node.getLeftMostLeaf(b), 0, a.getEndNode(), a.getEndOffset())
        }
      }
    }
  }
  return null
};
goog.editor.range.expand = function(a, b) {
  var c = goog.editor.range.expandEndPointToContainer_(a, goog.dom.RangeEndpoint.START, b), c = goog.editor.range.expandEndPointToContainer_(c, goog.dom.RangeEndpoint.END, b), d = c.getStartNode(), e = c.getEndNode(), f = c.getStartOffset(), c = c.getEndOffset();
  if(d == e) {
    for(;e != b && f == 0 && c == goog.editor.node.getLength(e);) {
      d = e.parentNode, f = goog.array.indexOf(d.childNodes, e), c = f + 1, e = d
    }
    d = e
  }
  return goog.dom.Range.createFromNodes(d, f, e, c)
};
goog.editor.range.expandEndPointToContainer_ = function(a, b, c) {
  for(var d = (b = b == goog.dom.RangeEndpoint.START) ? a.getStartNode() : a.getEndNode(), e = b ? a.getStartOffset() : a.getEndOffset(), f = a.getContainerElement();d != f && d != c;) {
    if(b && e != 0 || !b && e != goog.editor.node.getLength(d)) {
      break
    }
    var g = d.parentNode, d = goog.array.indexOf(g.childNodes, d), e = b ? d : d + 1, d = g
  }
  return goog.dom.Range.createFromNodes(b ? d : a.getStartNode(), b ? e : a.getStartOffset(), b ? a.getEndNode() : d, b ? a.getEndOffset() : e)
};
goog.editor.range.selectNodeStart = function(a) {
  goog.dom.Range.createCaret(goog.editor.node.getLeftMostLeaf(a), 0).select()
};
goog.editor.range.placeCursorNextTo = function(a, b) {
  var c = a.parentNode, d = goog.array.indexOf(c.childNodes, a) + (b ? 0 : 1), c = goog.editor.range.Point.createDeepestPoint(c, d, b), c = goog.dom.Range.createCaret(c.node, c.offset);
  c.select();
  return c
};
goog.editor.range.selectionPreservingNormalize = function(a) {
  var b = goog.dom.getOwnerDocument(a), b = goog.dom.Range.createFromWindow(goog.dom.getWindow(b));
  (a = goog.editor.range.rangePreservingNormalize(a, b)) && a.select()
};
goog.editor.range.normalizeNodeIe_ = function(a) {
  for(var b = null, c = a.firstChild;c;) {
    var d = c.nextSibling;
    c.nodeType == goog.dom.NodeType.TEXT ? c.nodeValue == "" ? a.removeChild(c) : b ? (b.nodeValue += c.nodeValue, a.removeChild(c)) : b = c : (goog.editor.range.normalizeNodeIe_(c), b = null);
    c = d
  }
};
goog.editor.range.normalizeNode = function(a) {
  goog.userAgent.IE ? goog.editor.range.normalizeNodeIe_(a) : a.normalize()
};
goog.editor.range.rangePreservingNormalize = function(a, b) {
  if(b) {
    var c = goog.editor.range.normalize(b), d = goog.editor.style.getContainer(b.getContainerElement())
  }
  d ? goog.editor.range.normalizeNode(goog.dom.findCommonAncestor(d, a)) : a && goog.editor.range.normalizeNode(a);
  return c ? c() : null
};
goog.editor.range.getDeepEndPoint = function(a, b) {
  return b ? goog.editor.range.Point.createDeepestPoint(a.getStartNode(), a.getStartOffset()) : goog.editor.range.Point.createDeepestPoint(a.getEndNode(), a.getEndOffset())
};
goog.editor.range.normalize = function(a) {
  var b = goog.editor.range.normalizePoint_(goog.editor.range.getDeepEndPoint(a, true)), c = b.getParentPoint(), d = b.node.previousSibling;
  if(b.node.nodeType == goog.dom.NodeType.TEXT) {
    b.node = null
  }
  var e = goog.editor.range.normalizePoint_(goog.editor.range.getDeepEndPoint(a, false)), f = e.getParentPoint(), g = e.node.previousSibling;
  if(e.node.nodeType == goog.dom.NodeType.TEXT) {
    e.node = null
  }
  return function() {
    if(!b.node && d) {
      b.node = d.nextSibling, b.node || (b = goog.editor.range.Point.getPointAtEndOfNode(d))
    }
    if(!e.node && g) {
      e.node = g.nextSibling, e.node || (e = goog.editor.range.Point.getPointAtEndOfNode(g))
    }
    return goog.dom.Range.createFromNodes(b.node || c.node.firstChild || c.node, b.offset, e.node || f.node.firstChild || f.node, e.offset)
  }
};
goog.editor.range.normalizePoint_ = function(a) {
  var b;
  if(a.node.nodeType == goog.dom.NodeType.TEXT) {
    for(b = a.node.previousSibling;b && b.nodeType == goog.dom.NodeType.TEXT;b = b.previousSibling) {
      a.offset += goog.editor.node.getLength(b)
    }
  }else {
    b = a.node.previousSibling
  }
  var c = a.node.parentNode;
  a.node = b ? b.nextSibling : c.firstChild;
  return a
};
goog.editor.range.isEditable = function(a) {
  var b = a.getContainerElement();
  return a.getStartNode() != b.parentElement && goog.editor.node.isEditableContainer(b) || goog.editor.node.isEditable(b)
};
goog.editor.range.intersectsTag = function(a, b) {
  return goog.dom.getAncestorByTagNameAndClass(a.getContainerElement(), b) ? true : goog.iter.some(a, function(a) {
    return a.tagName == b
  })
};
goog.editor.range.Point = function(a, b) {
  this.node = a;
  this.offset = b
};
goog.editor.range.Point.prototype.getParentPoint = function() {
  var a = this.node.parentNode;
  return new goog.editor.range.Point(a, goog.array.indexOf(a.childNodes, this.node))
};
goog.editor.range.Point.createDeepestPoint = function(a, b, c) {
  for(;a.nodeType == goog.dom.NodeType.ELEMENT;) {
    var d = a.childNodes[b];
    if(!d && !a.lastChild) {
      break
    }
    d ? (a = d.previousSibling, c && a ? b = goog.editor.node.getLength(a) : (a = d, b = 0)) : (a = a.lastChild, b = goog.editor.node.getLength(a))
  }
  return new goog.editor.range.Point(a, b)
};
goog.editor.range.Point.getPointAtEndOfNode = function(a) {
  return new goog.editor.range.Point(a, goog.editor.node.getLength(a))
};
goog.editor.range.saveUsingNormalizedCarets = function(a) {
  return new goog.editor.range.NormalizedCaretRange_(a)
};
goog.editor.range.NormalizedCaretRange_ = function(a) {
  goog.dom.SavedCaretRange.call(this, a)
};
goog.inherits(goog.editor.range.NormalizedCaretRange_, goog.dom.SavedCaretRange);
goog.editor.range.NormalizedCaretRange_.prototype.removeCarets = function(a) {
  var b = this.getCaret(true), c = this.getCaret(false), b = b && c ? goog.dom.findCommonAncestor(b, c) : b || c;
  goog.editor.range.NormalizedCaretRange_.superClass_.removeCarets.call(this);
  if(a) {
    return goog.editor.range.rangePreservingNormalize(b, a)
  }else {
    b && goog.editor.range.selectionPreservingNormalize(b)
  }
};
goog.editor.Field = function(a, b) {
  goog.events.EventTarget.call(this);
  this.hashCode_ = this.id = a;
  this.editableDomHelper = null;
  this.plugins_ = {};
  this.indexedPlugins_ = {};
  for(var c in goog.editor.Plugin.OPCODE) {
    this.indexedPlugins_[c] = []
  }
  this.cssStyles = "";
  if(goog.userAgent.WEBKIT && goog.userAgent.isVersion("525.13") && goog.string.compareVersions(goog.userAgent.VERSION, "525.18") <= 0) {
    this.workaroundClassName_ = "tr-webkit-workaround", this.cssStyles = "." + this.workaroundClassName_ + ">*{padding-right:1}"
  }
  this.stoppedEvents_ = {};
  this.stopEvent(goog.editor.Field.EventType.CHANGE);
  this.stopEvent(goog.editor.Field.EventType.DELAYEDCHANGE);
  this.isEverModified_ = this.isModified_ = false;
  this.delayedChangeTimer_ = new goog.async.Delay(this.dispatchDelayedChange_, goog.editor.Field.DELAYED_CHANGE_FREQUENCY, this);
  this.debouncedEvents_ = {};
  for(var d in goog.editor.Field.EventType) {
    this.debouncedEvents_[goog.editor.Field.EventType[d]] = 0
  }
  if(goog.editor.BrowserFeature.USE_MUTATION_EVENTS) {
    this.changeTimerGecko_ = new goog.async.Delay(this.handleChange, goog.editor.Field.CHANGE_FREQUENCY, this)
  }
  this.eventRegister = new goog.events.EventHandler(this);
  this.wrappers_ = [];
  this.loadState_ = goog.editor.Field.LoadState_.UNEDITABLE;
  this.originalDomHelper = goog.dom.getDomHelper(b || document);
  this.originalElement = this.originalDomHelper.getElement(this.id);
  this.appWindow_ = this.originalDomHelper.getWindow()
};
goog.inherits(goog.editor.Field, goog.events.EventTarget);
goog.editor.Field.prototype.field = null;
goog.editor.Field.prototype.originalElement = null;
goog.editor.Field.prototype.logger = goog.debug.Logger.getLogger("goog.editor.Field");
goog.editor.Field.EventType = {COMMAND_VALUE_CHANGE:"cvc", LOAD:"load", UNLOAD:"unload", BEFORECHANGE:"beforechange", CHANGE:"change", DELAYEDCHANGE:"delayedchange", BEFOREFOCUS:"beforefocus", FOCUS:"focus", BLUR:"blur", BEFORETAB:"beforetab", SELECTIONCHANGE:"selectionchange"};
goog.editor.Field.LoadState_ = {UNEDITABLE:0, LOADING:1, EDITABLE:2};
goog.editor.Field.DEBOUNCE_TIME_MS_ = 500;
goog.editor.Field.activeFieldId_ = null;
goog.editor.Field.prototype.inModalMode_ = false;
goog.editor.Field.setActiveFieldId = function(a) {
  goog.editor.Field.activeFieldId_ = a
};
goog.editor.Field.getActiveFieldId = function() {
  return goog.editor.Field.activeFieldId_
};
goog.editor.Field.prototype.inModalMode = function() {
  return this.inModalMode_
};
goog.editor.Field.prototype.setModalMode = function(a) {
  this.inModalMode_ = a
};
goog.editor.Field.prototype.getHashCode = function() {
  return this.hashCode_
};
goog.editor.Field.prototype.getElement = function() {
  return this.field
};
goog.editor.Field.prototype.getOriginalElement = function() {
  return this.originalElement
};
goog.editor.Field.prototype.addListener = function(a, b, c, d) {
  var e = this.getElement();
  if(e && goog.editor.BrowserFeature.USE_DOCUMENT_FOR_KEY_EVENTS) {
    e = e.ownerDocument
  }
  this.eventRegister.listen(e, a, b, c, d)
};
goog.editor.Field.prototype.getPluginByClassId = function(a) {
  return this.plugins_[a]
};
goog.editor.Field.prototype.registerPlugin = function(a) {
  var b = a.getTrogClassId();
  this.plugins_[b] && this.logger.severe("Cannot register the same class of plugin twice.");
  this.plugins_[b] = a;
  for(var c in goog.editor.Plugin.OPCODE) {
    a[goog.editor.Plugin.OPCODE[c]] && this.indexedPlugins_[c].push(a)
  }
  a.registerFieldObject(this);
  this.isLoaded() && a.enable(this)
};
goog.editor.Field.prototype.unregisterPlugin = function(a) {
  var b = a.getTrogClassId();
  this.plugins_[b] || this.logger.severe("Cannot unregister a plugin that isn't registered.");
  delete this.plugins_[b];
  for(var c in goog.editor.Plugin.OPCODE) {
    a[goog.editor.Plugin.OPCODE[c]] && goog.array.remove(this.indexedPlugins_[c], a)
  }
  a.unregisterFieldObject(this)
};
goog.editor.Field.prototype.setInitialStyle = function(a) {
  this.cssText = a
};
goog.editor.Field.prototype.resetOriginalElemProperties = function() {
  var a = this.getOriginalElement();
  a.removeAttribute("contentEditable");
  a.removeAttribute("g_editable");
  this.id ? a.id = this.id : a.removeAttribute("id");
  a.className = this.savedClassName_ || "";
  var b = this.cssText;
  b ? goog.dom.setProperties(a, {style:b}) : a.removeAttribute("style");
  if(goog.isString(this.originalFieldLineHeight_)) {
    goog.style.setStyle(a, "lineHeight", this.originalFieldLineHeight_), this.originalFieldLineHeight_ = null
  }
};
goog.editor.Field.prototype.isModified = function(a) {
  return a ? this.isEverModified_ : this.isModified_
};
goog.editor.Field.CHANGE_FREQUENCY = 15;
goog.editor.Field.DELAYED_CHANGE_FREQUENCY = 250;
goog.editor.Field.prototype.usesIframe = goog.functions.TRUE;
goog.editor.Field.prototype.isFixedHeight = goog.functions.TRUE;
goog.editor.Field.KEYS_CAUSING_CHANGES_ = {46:true, 8:true};
goog.userAgent.IE || (goog.editor.Field.KEYS_CAUSING_CHANGES_[9] = true);
goog.editor.Field.CTRL_KEYS_CAUSING_CHANGES_ = {86:true, 88:true};
goog.userAgent.IE && (goog.editor.Field.KEYS_CAUSING_CHANGES_[229] = true);
goog.editor.Field.isGeneratingKey_ = function(a, b) {
  return goog.editor.Field.isSpecialGeneratingKey_(a) ? true : !(!b || a.ctrlKey || a.metaKey || goog.userAgent.GECKO && !a.charCode)
};
goog.editor.Field.isSpecialGeneratingKey_ = function(a) {
  var b = !(a.ctrlKey || a.metaKey) && a.keyCode in goog.editor.Field.KEYS_CAUSING_CHANGES_;
  return(a.ctrlKey || a.metaKey) && a.keyCode in goog.editor.Field.CTRL_KEYS_CAUSING_CHANGES_ || b
};
goog.editor.Field.prototype.setAppWindow = function(a) {
  this.appWindow_ = a
};
goog.editor.Field.prototype.getAppWindow = function() {
  return this.appWindow_
};
goog.editor.Field.prototype.setBaseZindex = function(a) {
  this.baseZindex_ = a
};
goog.editor.Field.prototype.getBaseZindex = function() {
  return this.baseZindex_ || 0
};
goog.editor.Field.prototype.setupFieldObject = function(a) {
  this.loadState_ = goog.editor.Field.LoadState_.EDITABLE;
  this.field = a;
  this.editableDomHelper = goog.dom.getDomHelper(a);
  this.isEverModified_ = this.isModified_ = false;
  a.setAttribute("g_editable", "true")
};
goog.editor.Field.prototype.tearDownFieldObject_ = function() {
  this.loadState_ = goog.editor.Field.LoadState_.UNEDITABLE;
  for(var a in this.plugins_) {
    var b = this.plugins_[a];
    b.activeOnUneditableFields() || b.disable(this)
  }
  this.editableDomHelper = this.field = null
};
goog.editor.Field.prototype.setupChangeListeners_ = function() {
  if(goog.userAgent.OPERA && this.usesIframe()) {
    this.boundFocusListenerOpera_ = goog.bind(this.dispatchFocusAndBeforeFocus_, this);
    this.boundBlurListenerOpera_ = goog.bind(this.dispatchBlur, this);
    var a = this.getEditableDomHelper().getWindow();
    a.addEventListener(goog.events.EventType.FOCUS, this.boundFocusListenerOpera_, false);
    a.addEventListener(goog.events.EventType.BLUR, this.boundBlurListenerOpera_, false)
  }else {
    goog.editor.BrowserFeature.SUPPORTS_FOCUSIN ? (this.addListener(goog.events.EventType.FOCUS, this.dispatchFocus_), this.addListener(goog.events.EventType.FOCUSIN, this.dispatchBeforeFocus_)) : this.addListener(goog.events.EventType.FOCUS, this.dispatchFocusAndBeforeFocus_), this.addListener(goog.events.EventType.BLUR, this.dispatchBlur, goog.editor.BrowserFeature.USE_MUTATION_EVENTS)
  }
  goog.editor.BrowserFeature.USE_MUTATION_EVENTS ? this.setupMutationEventHandlersGecko() : (this.addListener(["beforecut", "beforepaste", "drop", "dragend"], this.dispatchBeforeChange), this.addListener(["cut", "paste"], this.dispatchChange), this.addListener("drop", this.handleDrop_));
  this.addListener(goog.userAgent.WEBKIT ? "dragend" : "dragdrop", this.handleDrop_);
  this.addListener(goog.events.EventType.KEYDOWN, this.handleKeyDown_);
  this.addListener(goog.events.EventType.KEYPRESS, this.handleKeyPress_);
  this.addListener(goog.events.EventType.KEYUP, this.handleKeyUp_);
  this.selectionChangeTimer_ = new goog.async.Delay(this.handleSelectionChangeTimer_, goog.editor.Field.SELECTION_CHANGE_FREQUENCY_, this);
  goog.editor.BrowserFeature.FOLLOWS_EDITABLE_LINKS && this.addListener(goog.events.EventType.CLICK, goog.editor.Field.cancelLinkClick_);
  this.addListener(goog.events.EventType.MOUSEDOWN, this.handleMouseDown_);
  this.addListener(goog.events.EventType.MOUSEUP, this.handleMouseUp_)
};
goog.editor.Field.SELECTION_CHANGE_FREQUENCY_ = 250;
goog.editor.Field.prototype.clearListeners_ = function() {
  this.eventRegister && this.eventRegister.removeAll();
  if(goog.userAgent.OPERA && this.usesIframe()) {
    try {
      var a = this.getEditableDomHelper().getWindow();
      a.removeEventListener(goog.events.EventType.FOCUS, this.boundFocusListenerOpera_, false);
      a.removeEventListener(goog.events.EventType.BLUR, this.boundBlurListenerOpera_, false)
    }catch(b) {
    }
    delete this.boundFocusListenerOpera_;
    delete this.boundBlurListenerOpera_
  }
  this.changeTimerGecko_ && this.changeTimerGecko_.stop();
  this.delayedChangeTimer_.stop()
};
goog.editor.Field.prototype.disposeInternal = function() {
  (this.isLoading() || this.isLoaded()) && this.logger.warning("Disposing a field that is in use.");
  this.getOriginalElement() && this.execCommand(goog.editor.Command.CLEAR_LOREM);
  this.tearDownFieldObject_();
  this.clearListeners_();
  this.originalDomHelper = null;
  if(this.eventRegister) {
    this.eventRegister.dispose(), this.eventRegister = null
  }
  this.removeAllWrappers();
  goog.editor.Field.getActiveFieldId() == this.id && goog.editor.Field.setActiveFieldId(null);
  for(var a in this.plugins_) {
    var b = this.plugins_[a];
    b.isAutoDispose() && b.dispose()
  }
  delete this.plugins_;
  goog.editor.Field.superClass_.disposeInternal.call(this)
};
goog.editor.Field.prototype.attachWrapper = function(a) {
  this.wrappers_.push(a)
};
goog.editor.Field.prototype.removeAllWrappers = function() {
  for(var a;a = this.wrappers_.pop();) {
    a.dispose()
  }
};
goog.editor.Field.MUTATION_EVENTS_GECKO = ["DOMNodeInserted", "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMNodeInsertedIntoDocument", "DOMCharacterDataModified"];
goog.editor.Field.prototype.setupMutationEventHandlersGecko = function() {
  if(goog.editor.BrowserFeature.HAS_DOM_SUBTREE_MODIFIED_EVENT) {
    this.eventRegister.listen(this.getElement(), "DOMSubtreeModified", this.handleMutationEventGecko_)
  }else {
    var a = this.getEditableDomHelper().getDocument();
    this.eventRegister.listen(a, goog.editor.Field.MUTATION_EVENTS_GECKO, this.handleMutationEventGecko_, true);
    this.eventRegister.listen(a, "DOMAttrModified", goog.bind(this.handleDomAttrChange, this, this.handleMutationEventGecko_), true)
  }
};
goog.editor.Field.prototype.handleBeforeChangeKeyEvent_ = function(a) {
  if(a.keyCode == goog.events.KeyCodes.TAB && !this.dispatchBeforeTab_(a) || goog.userAgent.GECKO && a.metaKey && (a.keyCode == goog.events.KeyCodes.LEFT || a.keyCode == goog.events.KeyCodes.RIGHT)) {
    return a.preventDefault(), false
  }else {
    (this.gotGeneratingKey_ = a.charCode || goog.editor.Field.isGeneratingKey_(a, goog.userAgent.GECKO)) && this.dispatchBeforeChange()
  }
  return true
};
goog.editor.Field.SELECTION_CHANGE_KEYCODES_ = {8:1, 9:1, 13:1, 33:1, 34:1, 35:1, 36:1, 37:1, 38:1, 39:1, 40:1, 46:1};
goog.editor.Field.CTRL_KEYS_CAUSING_SELECTION_CHANGES_ = {65:true, 86:true, 88:true};
goog.editor.Field.POTENTIAL_SHORTCUT_KEYCODES_ = {8:1, 9:1, 13:1, 27:1, 33:1, 34:1, 37:1, 38:1, 39:1, 40:1};
goog.editor.Field.prototype.invokeShortCircuitingOp_ = function(a, b) {
  for(var c = this.indexedPlugins_[a], d = goog.array.slice(arguments, 1), e = 0;e < c.length;++e) {
    var f = c[e];
    if((f.isEnabled(this) || goog.editor.Plugin.IRREPRESSIBLE_OPS[a]) && f[goog.editor.Plugin.OPCODE[a]].apply(f, d)) {
      return true
    }
  }
  return false
};
goog.editor.Field.prototype.invokeOp_ = function(a, b) {
  for(var c = this.indexedPlugins_[a], d = goog.array.slice(arguments, 1), e = 0;e < c.length;++e) {
    var f = c[e];
    (f.isEnabled(this) || goog.editor.Plugin.IRREPRESSIBLE_OPS[a]) && f[goog.editor.Plugin.OPCODE[a]].apply(f, d)
  }
};
goog.editor.Field.prototype.reduceOp_ = function(a, b, c) {
  for(var d = this.indexedPlugins_[a], e = goog.array.slice(arguments, 1), f = 0;f < d.length;++f) {
    var g = d[f];
    if(g.isEnabled(this) || goog.editor.Plugin.IRREPRESSIBLE_OPS[a]) {
      e[0] = g[goog.editor.Plugin.OPCODE[a]].apply(g, e)
    }
  }
  return e[0]
};
goog.editor.Field.prototype.injectContents = function(a, b) {
  var c = {}, d = this.getInjectableContents(a, c);
  goog.style.setStyle(b, c);
  b.innerHTML = d
};
goog.editor.Field.prototype.getInjectableContents = function(a, b) {
  return this.reduceOp_(goog.editor.Plugin.Op.PREPARE_CONTENTS_HTML, a || "", b)
};
goog.editor.Field.prototype.handleKeyDown_ = function(a) {
  (goog.editor.BrowserFeature.USE_MUTATION_EVENTS || this.handleBeforeChangeKeyEvent_(a)) && !this.invokeShortCircuitingOp_(goog.editor.Plugin.Op.KEYDOWN, a) && goog.editor.BrowserFeature.USES_KEYDOWN && this.handleKeyboardShortcut_(a)
};
goog.editor.Field.prototype.handleKeyPress_ = function(a) {
  if(goog.editor.BrowserFeature.USE_MUTATION_EVENTS) {
    if(!this.handleBeforeChangeKeyEvent_(a)) {
      return
    }
  }else {
    this.gotGeneratingKey_ = true, this.dispatchBeforeChange()
  }
  !this.invokeShortCircuitingOp_(goog.editor.Plugin.Op.KEYPRESS, a) && !goog.editor.BrowserFeature.USES_KEYDOWN && this.handleKeyboardShortcut_(a)
};
goog.editor.Field.prototype.handleKeyUp_ = function(a) {
  !goog.editor.BrowserFeature.USE_MUTATION_EVENTS && (this.gotGeneratingKey_ || goog.editor.Field.isSpecialGeneratingKey_(a)) && this.handleChange();
  this.invokeShortCircuitingOp_(goog.editor.Plugin.Op.KEYUP, a);
  this.isEventStopped(goog.editor.Field.EventType.SELECTIONCHANGE) || (goog.editor.Field.SELECTION_CHANGE_KEYCODES_[a.keyCode] || (a.ctrlKey || a.metaKey) && goog.editor.Field.CTRL_KEYS_CAUSING_SELECTION_CHANGES_[a.keyCode]) && this.selectionChangeTimer_.start()
};
goog.editor.Field.prototype.handleKeyboardShortcut_ = function(a) {
  if(!a.altKey) {
    var b = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    if(b || goog.editor.Field.POTENTIAL_SHORTCUT_KEYCODES_[a.keyCode]) {
      var c = a.charCode || a.keyCode;
      c != 17 && (c = String.fromCharCode(c).toLowerCase(), this.invokeShortCircuitingOp_(goog.editor.Plugin.Op.SHORTCUT, a, c, b) && a.preventDefault())
    }
  }
};
goog.editor.Field.prototype.execCommand = function(a, b) {
  for(var c = arguments, d, e = this.indexedPlugins_[goog.editor.Plugin.Op.EXEC_COMMAND], f = 0;f < e.length;++f) {
    var g = e[f];
    if(g.isEnabled(this) && g.isSupportedCommand(a)) {
      d = g.execCommand.apply(g, c);
      break
    }
  }
  return d
};
goog.editor.Field.prototype.queryCommandValue = function(a) {
  var b = this.isLoaded() && this.isSelectionEditable();
  if(goog.isString(a)) {
    return this.queryCommandValueInternal_(a, b)
  }else {
    for(var c = {}, d = 0;d < a.length;d++) {
      c[a[d]] = this.queryCommandValueInternal_(a[d], b)
    }
    return c
  }
};
goog.editor.Field.prototype.queryCommandValueInternal_ = function(a, b) {
  for(var c = this.indexedPlugins_[goog.editor.Plugin.Op.QUERY_COMMAND], d = 0;d < c.length;++d) {
    var e = c[d];
    if(e.isEnabled(this) && e.isSupportedCommand(a) && (b || e.activeOnUneditableFields())) {
      return e.queryCommandValue(a)
    }
  }
  return b ? null : false
};
goog.editor.Field.prototype.handleDomAttrChange = function(a, b) {
  if(!this.isEventStopped(goog.editor.Field.EventType.CHANGE)) {
    b = b.getBrowserEvent();
    try {
      if(b.originalTarget.prefix || b.originalTarget.nodeName == "scrollbar") {
        return
      }
    }catch(c) {
      return
    }
    b.prevValue != b.newValue && a.call(this, b)
  }
};
goog.editor.Field.prototype.handleMutationEventGecko_ = function(a) {
  if(!this.isEventStopped(goog.editor.Field.EventType.CHANGE) && (a = a.getBrowserEvent ? a.getBrowserEvent() : a, !a.target.firebugIgnore)) {
    this.isEverModified_ = this.isModified_ = true, this.changeTimerGecko_.start()
  }
};
goog.editor.Field.prototype.handleDrop_ = function() {
  goog.userAgent.IE && this.execCommand(goog.editor.Command.CLEAR_LOREM, true);
  goog.editor.BrowserFeature.USE_MUTATION_EVENTS && this.dispatchFocusAndBeforeFocus_();
  this.dispatchChange()
};
goog.editor.Field.prototype.getEditableIframe = function() {
  var a;
  return this.usesIframe() && (a = this.getEditableDomHelper()) ? (a = a.getWindow()) && a.frameElement : null
};
goog.editor.Field.prototype.getEditableDomHelper = function() {
  return this.editableDomHelper
};
goog.editor.Field.prototype.getRange = function() {
  var a = this.editableDomHelper && this.editableDomHelper.getWindow();
  return a && goog.dom.Range.createFromWindow(a)
};
goog.editor.Field.prototype.dispatchSelectionChangeEvent = function(a, b) {
  if(!this.isEventStopped(goog.editor.Field.EventType.SELECTIONCHANGE)) {
    var c = this.getRange(), c = c && c.getContainerElement();
    this.isSelectionEditable_ = !!c && goog.dom.contains(this.getElement(), c);
    this.dispatchCommandValueChange();
    this.dispatchEvent({type:goog.editor.Field.EventType.SELECTIONCHANGE, originalType:a && a.type});
    this.invokeShortCircuitingOp_(goog.editor.Plugin.Op.SELECTION, a, b)
  }
};
goog.editor.Field.prototype.handleSelectionChangeTimer_ = function() {
  var a = this.selectionChangeTarget_;
  this.selectionChangeTarget_ = null;
  this.dispatchSelectionChangeEvent(void 0, a)
};
goog.editor.Field.prototype.dispatchBeforeChange = function() {
  this.isEventStopped(goog.editor.Field.EventType.BEFORECHANGE) || this.dispatchEvent(goog.editor.Field.EventType.BEFORECHANGE)
};
goog.editor.Field.prototype.dispatchBeforeTab_ = function(a) {
  return this.dispatchEvent({type:goog.editor.Field.EventType.BEFORETAB, shiftKey:a.shiftKey, altKey:a.altKey, ctrlKey:a.ctrlKey})
};
goog.editor.Field.prototype.stopChangeEvents = function(a, b) {
  a && (this.changeTimerGecko_ && this.changeTimerGecko_.fireIfActive(), this.stopEvent(goog.editor.Field.EventType.CHANGE));
  b && (this.clearDelayedChange(), this.stopEvent(goog.editor.Field.EventType.DELAYEDCHANGE))
};
goog.editor.Field.prototype.startChangeEvents = function(a, b) {
  !a && this.changeTimerGecko_ && this.changeTimerGecko_.fireIfActive();
  this.startEvent(goog.editor.Field.EventType.CHANGE);
  this.startEvent(goog.editor.Field.EventType.DELAYEDCHANGE);
  a && this.handleChange();
  b && this.dispatchDelayedChange_()
};
goog.editor.Field.prototype.stopEvent = function(a) {
  this.stoppedEvents_[a] = 1
};
goog.editor.Field.prototype.startEvent = function(a) {
  this.stoppedEvents_[a] = 0
};
goog.editor.Field.prototype.debounceEvent = function(a) {
  this.debouncedEvents_[a] = goog.now()
};
goog.editor.Field.prototype.isEventStopped = function(a) {
  return!!this.stoppedEvents_[a] || this.debouncedEvents_[a] && goog.now() - this.debouncedEvents_[a] <= goog.editor.Field.DEBOUNCE_TIME_MS_
};
goog.editor.Field.prototype.manipulateDom = function(a, b, c) {
  this.stopChangeEvents(true, true);
  try {
    a.call(c)
  }finally {
    this.isLoaded() && (b ? (this.startEvent(goog.editor.Field.EventType.CHANGE), this.handleChange(), this.startEvent(goog.editor.Field.EventType.DELAYEDCHANGE)) : this.dispatchChange())
  }
};
goog.editor.Field.prototype.dispatchCommandValueChange = function(a) {
  a ? this.dispatchEvent({type:goog.editor.Field.EventType.COMMAND_VALUE_CHANGE, commands:a}) : this.dispatchEvent(goog.editor.Field.EventType.COMMAND_VALUE_CHANGE)
};
goog.editor.Field.prototype.dispatchChange = function(a) {
  this.startChangeEvents(true, a)
};
goog.editor.Field.prototype.handleChange = function() {
  if(!this.isEventStopped(goog.editor.Field.EventType.CHANGE)) {
    this.changeTimerGecko_ && this.changeTimerGecko_.stop(), this.isEverModified_ = this.isModified_ = true, this.isEventStopped(goog.editor.Field.EventType.DELAYEDCHANGE) || this.delayedChangeTimer_.start()
  }
};
goog.editor.Field.prototype.dispatchDelayedChange_ = function() {
  if(!this.isEventStopped(goog.editor.Field.EventType.DELAYEDCHANGE)) {
    this.delayedChangeTimer_.stop(), this.isModified_ = false, this.dispatchEvent(goog.editor.Field.EventType.DELAYEDCHANGE)
  }
};
goog.editor.Field.prototype.clearDelayedChange = function() {
  this.changeTimerGecko_ && this.changeTimerGecko_.fireIfActive();
  this.delayedChangeTimer_.fireIfActive()
};
goog.editor.Field.prototype.dispatchFocusAndBeforeFocus_ = function() {
  this.dispatchBeforeFocus_();
  this.dispatchFocus_()
};
goog.editor.Field.prototype.dispatchBeforeFocus_ = function() {
  this.isEventStopped(goog.editor.Field.EventType.BEFOREFOCUS) || (this.execCommand(goog.editor.Command.CLEAR_LOREM, true), this.dispatchEvent(goog.editor.Field.EventType.BEFOREFOCUS))
};
goog.editor.Field.prototype.dispatchFocus_ = function() {
  if(!this.isEventStopped(goog.editor.Field.EventType.FOCUS)) {
    goog.editor.Field.setActiveFieldId(this.id);
    this.isSelectionEditable_ = true;
    this.dispatchEvent(goog.editor.Field.EventType.FOCUS);
    if(goog.editor.BrowserFeature.PUTS_CURSOR_BEFORE_FIRST_BLOCK_ELEMENT_ON_FOCUS) {
      var a = this.getElement(), b = this.getRange();
      if(b) {
        var c = b.getFocusNode();
        b.getFocusOffset() == 0 && (!c || c == a || c.tagName == goog.dom.TagName.BODY) && goog.editor.range.selectNodeStart(a)
      }
    }
    !goog.editor.BrowserFeature.CLEARS_SELECTION_WHEN_FOCUS_LEAVES && this.usesIframe() && this.getEditableDomHelper().getWindow().parent.getSelection().removeAllRanges()
  }
};
goog.editor.Field.prototype.dispatchBlur = function() {
  if(!this.isEventStopped(goog.editor.Field.EventType.BLUR)) {
    goog.editor.Field.getActiveFieldId() == this.id && goog.editor.Field.setActiveFieldId(null), this.isSelectionEditable_ = false, this.dispatchEvent(goog.editor.Field.EventType.BLUR)
  }
};
goog.editor.Field.prototype.isSelectionEditable = function() {
  return this.isSelectionEditable_
};
goog.editor.Field.cancelLinkClick_ = function(a) {
  goog.dom.getAncestorByTagNameAndClass(a.target, goog.dom.TagName.A) && a.preventDefault()
};
goog.editor.Field.prototype.handleMouseDown_ = function(a) {
  goog.editor.Field.getActiveFieldId() || goog.editor.Field.setActiveFieldId(this.id);
  if(goog.userAgent.IE) {
    var b = a.target;
    b && b.tagName == goog.dom.TagName.A && a.ctrlKey && this.originalDomHelper.getWindow().open(b.href)
  }
};
goog.editor.Field.prototype.handleMouseUp_ = function(a) {
  this.dispatchSelectionChangeEvent(a);
  if(goog.userAgent.IE) {
    this.selectionChangeTarget_ = a.target, this.selectionChangeTimer_.start()
  }
};
goog.editor.Field.prototype.getCleanContents = function() {
  if(this.queryCommandValue(goog.editor.Command.USING_LOREM)) {
    return goog.string.Unicode.NBSP
  }
  if(!this.isLoaded()) {
    var a = this.getOriginalElement();
    a || this.logger.shout("Couldn't get the field element to read the contents");
    return a.innerHTML
  }
  a = this.getFieldCopy();
  this.invokeOp_(goog.editor.Plugin.Op.CLEAN_CONTENTS_DOM, a);
  return this.reduceOp_(goog.editor.Plugin.Op.CLEAN_CONTENTS_HTML, a.innerHTML)
};
goog.editor.Field.prototype.getFieldCopy = function() {
  var a = this.getElement(), b = a.cloneNode(false), a = a.innerHTML;
  goog.userAgent.IE && a.match(/^\s*<script/i) && (a = goog.string.Unicode.NBSP + a);
  b.innerHTML = a;
  return b
};
goog.editor.Field.prototype.setHtml = function(a, b, c, d) {
  this.isLoading() ? this.logger.severe("Can't set html while loading Trogedit") : (d && this.execCommand(goog.editor.Command.CLEAR_LOREM), b && a && (b = "<p>" + b + "</p>"), c && this.stopChangeEvents(false, true), this.setInnerHtml_(b), d && this.execCommand(goog.editor.Command.UPDATE_LOREM), this.isLoaded() && (c ? (goog.editor.BrowserFeature.USE_MUTATION_EVENTS && this.changeTimerGecko_.fireIfActive(), this.startChangeEvents()) : this.dispatchChange()))
};
goog.editor.Field.prototype.setInnerHtml_ = function(a) {
  var b = this.getElement();
  if(b) {
    if(this.usesIframe() && goog.editor.BrowserFeature.MOVES_STYLE_TO_HEAD) {
      for(var c = b.ownerDocument.getElementsByTagName("HEAD"), d = c.length - 1;d >= 1;--d) {
        c[d].parentNode.removeChild(c[d])
      }
    }
  }else {
    b = this.getOriginalElement()
  }
  b && this.injectContents(a, b)
};
goog.editor.Field.prototype.turnOnDesignModeGecko = function() {
  var a = this.getEditableDomHelper().getDocument();
  a.designMode = "on";
  goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && a.execCommand("styleWithCSS", false, false)
};
goog.editor.Field.prototype.installStyles = function() {
  this.cssStyles && this.shouldLoadAsynchronously() && goog.style.installStyles(this.cssStyles, this.getElement())
};
goog.editor.Field.prototype.dispatchLoadEvent_ = function() {
  var a = this.getElement();
  this.workaroundClassName_ && goog.dom.classes.add(a, this.workaroundClassName_);
  this.installStyles();
  this.startChangeEvents();
  this.logger.info("Dispatching load " + this.id);
  this.dispatchEvent(goog.editor.Field.EventType.LOAD)
};
goog.editor.Field.prototype.isUneditable = function() {
  return this.loadState_ == goog.editor.Field.LoadState_.UNEDITABLE
};
goog.editor.Field.prototype.isLoaded = function() {
  return this.loadState_ == goog.editor.Field.LoadState_.EDITABLE
};
goog.editor.Field.prototype.isLoading = function() {
  return this.loadState_ == goog.editor.Field.LoadState_.LOADING
};
goog.editor.Field.prototype.focus = function() {
  if(!goog.editor.BrowserFeature.HAS_CONTENT_EDITABLE || goog.userAgent.WEBKIT) {
    this.getEditableDomHelper().getWindow().focus()
  }else {
    if(goog.userAgent.OPERA) {
      var a = this.appWindow_.pageXOffset, b = this.appWindow_.pageYOffset
    }
    this.getElement().focus();
    goog.userAgent.OPERA && this.appWindow_.scrollTo(a, b)
  }
};
goog.editor.Field.prototype.focusAndPlaceCursorAtStart = function() {
  (goog.editor.BrowserFeature.HAS_IE_RANGES || goog.userAgent.WEBKIT) && this.placeCursorAtStart();
  this.focus()
};
goog.editor.Field.prototype.placeCursorAtStart = function() {
  var a = this.getElement();
  if(a) {
    var b = goog.editor.node.getLeftMostLeaf(a);
    a == b ? goog.dom.Range.createCaret(a, 0).select() : goog.editor.range.placeCursorNextTo(b, true);
    this.dispatchSelectionChangeEvent()
  }
};
goog.editor.Field.prototype.makeEditable = function(a) {
  this.loadState_ = goog.editor.Field.LoadState_.LOADING;
  var b = this.getOriginalElement();
  this.nodeName = b.nodeName;
  this.savedClassName_ = b.className;
  this.setInitialStyle(b.style.cssText);
  b.className += " editable";
  this.makeEditableInternal(a)
};
goog.editor.Field.prototype.makeEditableInternal = function(a) {
  this.makeIframeField_(a)
};
goog.editor.Field.prototype.handleFieldLoad = function() {
  goog.userAgent.IE && goog.dom.Range.clearSelection(this.editableDomHelper.getWindow());
  goog.editor.Field.getActiveFieldId() != this.id && this.execCommand(goog.editor.Command.UPDATE_LOREM);
  this.setupChangeListeners_();
  this.dispatchLoadEvent_();
  for(var a in this.plugins_) {
    this.plugins_[a].enable(this)
  }
};
goog.editor.Field.prototype.makeUneditable = function(a) {
  if(this.isUneditable()) {
    throw Error("makeUneditable: Field is already uneditable");
  }
  this.clearDelayedChange();
  this.selectionChangeTimer_.fireIfActive();
  this.execCommand(goog.editor.Command.CLEAR_LOREM);
  var b = null;
  !a && this.getElement() && (b = this.getCleanContents());
  this.clearFieldLoadListener_();
  a = this.getOriginalElement();
  goog.editor.Field.getActiveFieldId() == a.id && goog.editor.Field.setActiveFieldId(null);
  this.clearListeners_();
  if(goog.isString(b)) {
    a.innerHTML = b, this.resetOriginalElemProperties()
  }
  this.restoreDom();
  this.tearDownFieldObject_();
  goog.userAgent.WEBKIT && a.blur();
  this.execCommand(goog.editor.Command.UPDATE_LOREM);
  this.dispatchEvent(goog.editor.Field.EventType.UNLOAD)
};
goog.editor.Field.prototype.restoreDom = function() {
  var a = this.getOriginalElement();
  if(a) {
    var b = this.getEditableIframe();
    b && goog.dom.replaceNode(a, b)
  }
};
goog.editor.Field.prototype.shouldLoadAsynchronously = function() {
  if(!goog.isDef(this.isHttps_) && (this.isHttps_ = false, goog.userAgent.IE && this.usesIframe())) {
    for(var a = this.originalDomHelper.getWindow();a != a.parent;) {
      try {
        a = a.parent
      }catch(b) {
        break
      }
    }
    a = a.location;
    this.isHttps_ = a.protocol == "https:" && a.search.indexOf("nocheckhttps") == -1
  }
  return this.isHttps_
};
goog.editor.Field.prototype.makeIframeField_ = function(a) {
  var b = this.getOriginalElement();
  if(b) {
    var b = b.innerHTML, c = {}, b = this.reduceOp_(goog.editor.Plugin.Op.PREPARE_CONTENTS_HTML, b, c), d = this.originalDomHelper.createDom(goog.dom.TagName.IFRAME, this.getIframeAttributes());
    if(this.shouldLoadAsynchronously()) {
      var e = goog.bind(this.iframeFieldLoadHandler, this, d, b, c);
      this.fieldLoadListenerKey_ = goog.events.listen(d, goog.events.EventType.LOAD, e, true);
      if(a) {
        d.src = a
      }
    }
    this.attachIframe(d);
    this.shouldLoadAsynchronously() || this.iframeFieldLoadHandler(d, b, c)
  }
};
goog.editor.Field.prototype.attachIframe = function(a) {
  var b = this.getOriginalElement();
  a.className = b.className;
  a.id = b.id;
  goog.dom.replaceNode(a, b)
};
goog.editor.Field.prototype.getFieldFormatInfo = function(a) {
  var b = this.getOriginalElement(), b = goog.editor.node.isStandardsMode(b);
  return new goog.editor.icontent.FieldFormatInfo(this.id, b, false, false, a)
};
goog.editor.Field.prototype.writeIframeContent = function(a, b, c) {
  c = this.getFieldFormatInfo(c);
  if(this.shouldLoadAsynchronously()) {
    a = goog.dom.getFrameContentDocument(a), goog.editor.icontent.writeHttpsInitialIframe(c, a, b)
  }else {
    var d = new goog.editor.icontent.FieldStyleInfo(this.getElement(), this.cssStyles);
    goog.editor.icontent.writeNormalInitialIframe(c, b, d, a)
  }
};
goog.editor.Field.prototype.iframeFieldLoadHandler = function(a, b, c) {
  this.clearFieldLoadListener_();
  a.allowTransparency = "true";
  this.writeIframeContent(a, b, c);
  this.setupFieldObject(goog.dom.getFrameContentDocument(a).body);
  goog.editor.BrowserFeature.HAS_CONTENT_EDITABLE || this.turnOnDesignModeGecko();
  this.handleFieldLoad()
};
goog.editor.Field.prototype.clearFieldLoadListener_ = function() {
  if(this.fieldLoadListenerKey_) {
    goog.events.unlistenByKey(this.fieldLoadListenerKey_), this.fieldLoadListenerKey_ = null
  }
};
goog.editor.Field.prototype.getIframeAttributes = function() {
  var a = "padding:0;" + this.getOriginalElement().style.cssText;
  goog.string.endsWith(a, ";") || (a += ";");
  a += "background-color:white;";
  goog.userAgent.IE && (a += "overflow:visible;");
  return{frameBorder:0, style:a}
};
goog.ui.editor = {};
goog.ui.editor.AbstractDialog = function(a) {
  goog.events.EventTarget.call(this);
  this.dom = a
};
goog.inherits(goog.ui.editor.AbstractDialog, goog.events.EventTarget);
goog.ui.editor.AbstractDialog.prototype.show = function() {
  if(!this.dialogInternal_) {
    this.dialogInternal_ = this.createDialogControl(), this.dialogInternal_.addEventListener(goog.ui.Dialog.EventType.AFTER_HIDE, this.handleAfterHide_, false, this)
  }
  this.dialogInternal_.setVisible(true)
};
goog.ui.editor.AbstractDialog.prototype.hide = function() {
  this.dialogInternal_ && this.dialogInternal_.setVisible(false)
};
goog.ui.editor.AbstractDialog.prototype.isOpen = function() {
  return!!this.dialogInternal_ && this.dialogInternal_.isVisible()
};
goog.ui.editor.AbstractDialog.prototype.processOkAndClose = function() {
  this.handleOk(new goog.ui.Dialog.Event(goog.ui.Dialog.DefaultButtonKeys.OK, null)) && this.hide()
};
goog.ui.editor.AbstractDialog.EventType = {AFTER_HIDE:"afterhide", CANCEL:"cancel", OK:"ok"};
goog.ui.editor.AbstractDialog.Builder = function(a) {
  this.editorDialog_ = a;
  this.wrappedDialog_ = new goog.ui.Dialog("", true, this.editorDialog_.dom);
  this.buttonSet_ = new goog.ui.Dialog.ButtonSet(this.editorDialog_.dom);
  this.buttonHandlers_ = {};
  this.addClassName("tr-dialog")
};
goog.ui.editor.AbstractDialog.Builder.prototype.setTitle = function(a) {
  this.wrappedDialog_.setTitle(a);
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.addOkButton = function(a) {
  var b = goog.ui.Dialog.DefaultButtonKeys.OK, c = goog.getMsg("OK");
  this.buttonSet_.set(b, a || c, true);
  this.buttonHandlers_[b] = goog.bind(this.editorDialog_.handleOk, this.editorDialog_);
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.addCancelButton = function(a) {
  var b = goog.ui.Dialog.DefaultButtonKeys.CANCEL, c = goog.getMsg("Cancel");
  this.buttonSet_.set(b, a || c, false, true);
  this.buttonHandlers_[b] = goog.bind(this.editorDialog_.handleCancel, this.editorDialog_);
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.addButton = function(a, b, c) {
  c = c || goog.string.createUniqueString();
  this.buttonSet_.set(c, a);
  this.buttonHandlers_[c] = b;
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.addClassName = function(a) {
  goog.dom.classes.add(this.wrappedDialog_.getDialogElement(), a);
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.setContent = function(a) {
  goog.dom.appendChild(this.wrappedDialog_.getContentElement(), a);
  return this
};
goog.ui.editor.AbstractDialog.Builder.prototype.build = function() {
  this.buttonSet_.isEmpty() && (this.addOkButton(), this.addCancelButton());
  this.wrappedDialog_.setButtonSet(this.buttonSet_);
  var a = this.buttonHandlers_;
  this.buttonHandlers_ = null;
  this.wrappedDialog_.addEventListener(goog.ui.Dialog.EventType.SELECT, function(b) {
    if(a[b.key]) {
      return a[b.key](b)
    }
  });
  this.wrappedDialog_.setModal(true);
  var b = this.wrappedDialog_;
  this.wrappedDialog_ = null;
  return b
};
goog.ui.editor.AbstractDialog.prototype.getOkButtonElement = function() {
  return this.getButtonElement(goog.ui.Dialog.DefaultButtonKeys.OK)
};
goog.ui.editor.AbstractDialog.prototype.getCancelButtonElement = function() {
  return this.getButtonElement(goog.ui.Dialog.DefaultButtonKeys.CANCEL)
};
goog.ui.editor.AbstractDialog.prototype.getButtonElement = function(a) {
  return this.dialogInternal_.getButtonSet().getButton(a)
};
goog.ui.editor.AbstractDialog.prototype.handleOk = function(a) {
  return(a = this.createOkEvent(a)) ? this.dispatchEvent(a) : false
};
goog.ui.editor.AbstractDialog.prototype.handleCancel = function() {
  return this.dispatchEvent(goog.ui.editor.AbstractDialog.EventType.CANCEL)
};
goog.ui.editor.AbstractDialog.prototype.disposeInternal = function() {
  if(this.dialogInternal_) {
    this.hide(), this.dialogInternal_.dispose(), this.dialogInternal_ = null
  }
  goog.ui.editor.AbstractDialog.superClass_.disposeInternal.call(this)
};
goog.ui.editor.AbstractDialog.prototype.handleAfterHide_ = function() {
  this.dispatchEvent(goog.ui.editor.AbstractDialog.EventType.AFTER_HIDE)
};
goog.editor.plugins = {};
goog.editor.plugins.AbstractDialogPlugin = function(a) {
  goog.editor.Plugin.call(this);
  this.command_ = a
};
goog.inherits(goog.editor.plugins.AbstractDialogPlugin, goog.editor.Plugin);
goog.editor.plugins.AbstractDialogPlugin.prototype.isSupportedCommand = function(a) {
  return a == this.command_
};
goog.editor.plugins.AbstractDialogPlugin.prototype.execCommand = function(a, b) {
  return this.execCommandInternal.apply(this, arguments)
};
goog.editor.plugins.AbstractDialogPlugin.EventType = {OPENED:"dialogOpened", CLOSED:"dialogClosed"};
goog.editor.plugins.AbstractDialogPlugin.prototype.getDialog = function() {
  return this.dialog_
};
goog.editor.plugins.AbstractDialogPlugin.prototype.setReuseDialog = function(a) {
  this.reuseDialog_ = a
};
goog.editor.plugins.AbstractDialogPlugin.prototype.execCommandInternal = function(a, b) {
  this.reuseDialog_ || this.disposeDialog_();
  if(!this.dialog_) {
    this.dialog_ = this.createDialog(goog.dom.getDomHelper(this.fieldObject.getAppWindow()), b)
  }
  var c = this.fieldObject.getRange();
  this.savedRange_ = c && goog.editor.range.saveUsingNormalizedCarets(c);
  goog.dom.Range.clearSelection(this.fieldObject.getEditableDomHelper().getWindow());
  goog.events.listenOnce(this.dialog_, goog.ui.editor.AbstractDialog.EventType.AFTER_HIDE, this.handleAfterHide, false, this);
  this.fieldObject.setModalMode(true);
  this.dialog_.show();
  this.dispatchEvent(goog.editor.plugins.AbstractDialogPlugin.EventType.OPENED);
  this.fieldObject.dispatchSelectionChangeEvent();
  return true
};
goog.editor.plugins.AbstractDialogPlugin.prototype.handleAfterHide = function() {
  this.fieldObject.setModalMode(false);
  this.restoreOriginalSelection();
  this.reuseDialog_ || this.disposeDialog_();
  this.dispatchEvent(goog.editor.plugins.AbstractDialogPlugin.EventType.CLOSED);
  this.fieldObject.dispatchSelectionChangeEvent();
  this.fieldObject.debounceEvent(goog.editor.Field.EventType.SELECTIONCHANGE)
};
goog.editor.plugins.AbstractDialogPlugin.prototype.restoreOriginalSelection = function() {
  this.fieldObject.focus();
  if(this.savedRange_) {
    this.savedRange_.restore(), this.savedRange_ = null
  }
};
goog.editor.plugins.AbstractDialogPlugin.prototype.disposeOriginalSelection = function() {
  if(this.savedRange_) {
    this.savedRange_.dispose(), this.savedRange_ = null
  }
};
goog.editor.plugins.AbstractDialogPlugin.prototype.disposeInternal = function() {
  this.disposeDialog_();
  goog.editor.plugins.AbstractDialogPlugin.superClass_.disposeInternal.call(this)
};
goog.editor.plugins.AbstractDialogPlugin.prototype.reuseDialog_ = false;
goog.editor.plugins.AbstractDialogPlugin.prototype.isDisposingDialog_ = false;
goog.editor.plugins.AbstractDialogPlugin.prototype.disposeDialog_ = function() {
  if(this.dialog_ && !this.isDisposingDialog_) {
    this.isDisposingDialog_ = true, this.dialog_.dispose(), this.dialog_ = null, this.isDisposingDialog_ = false
  }
};
goog.dom.selection = {};
goog.dom.selection.setStart = function(a, b) {
  if(goog.dom.selection.useSelectionProperties_(a)) {
    a.selectionStart = b
  }else {
    if(goog.userAgent.IE) {
      var c = goog.dom.selection.getRangeIe_(a), d = c[0];
      d.inRange(c[1]) && (b = goog.dom.selection.canonicalizePositionIe_(a, b), d.collapse(true), d.move("character", b), d.select())
    }
  }
};
goog.dom.selection.getStart = function(a) {
  return goog.dom.selection.getEndPoints_(a, true)[0]
};
goog.dom.selection.getEndPointsTextareaIe_ = function(a, b, c) {
  for(var b = b.duplicate(), d = a.text, e = d, f = b.text, g = f, h = false;!h;) {
    a.compareEndPoints("StartToEnd", a) == 0 ? h = true : (a.moveEnd("character", -1), a.text == d ? e += "\r\n" : h = true)
  }
  if(c) {
    return[e.length, -1]
  }
  for(a = false;!a;) {
    b.compareEndPoints("StartToEnd", b) == 0 ? a = true : (b.moveEnd("character", -1), b.text == f ? g += "\r\n" : a = true)
  }
  return[e.length, e.length + g.length]
};
goog.dom.selection.getEndPoints = function(a) {
  return goog.dom.selection.getEndPoints_(a, false)
};
goog.dom.selection.getEndPoints_ = function(a, b) {
  var c = 0, d = 0;
  if(goog.dom.selection.useSelectionProperties_(a)) {
    c = a.selectionStart, d = b ? -1 : a.selectionEnd
  }else {
    if(goog.userAgent.IE) {
      var e = goog.dom.selection.getRangeIe_(a), f = e[0], e = e[1];
      if(f.inRange(e)) {
        f.setEndPoint("EndToStart", e);
        if(a.type == "textarea") {
          return goog.dom.selection.getEndPointsTextareaIe_(f, e, b)
        }
        c = f.text.length;
        d = b ? -1 : f.text.length + e.text.length
      }
    }
  }
  return[c, d]
};
goog.dom.selection.setEnd = function(a, b) {
  if(goog.dom.selection.useSelectionProperties_(a)) {
    a.selectionEnd = b
  }else {
    if(goog.userAgent.IE) {
      var c = goog.dom.selection.getRangeIe_(a), d = c[1];
      c[0].inRange(d) && (b = goog.dom.selection.canonicalizePositionIe_(a, b), c = goog.dom.selection.canonicalizePositionIe_(a, goog.dom.selection.getStart(a)), d.collapse(true), d.moveEnd("character", b - c), d.select())
    }
  }
};
goog.dom.selection.getEnd = function(a) {
  return goog.dom.selection.getEndPoints_(a, false)[1]
};
goog.dom.selection.setCursorPosition = function(a, b) {
  if(goog.dom.selection.useSelectionProperties_(a)) {
    a.selectionStart = b, a.selectionEnd = b
  }else {
    if(goog.userAgent.IE) {
      var b = goog.dom.selection.canonicalizePositionIe_(a, b), c = a.createTextRange();
      c.collapse(true);
      c.move("character", b);
      c.select()
    }
  }
};
goog.dom.selection.setText = function(a, b) {
  if(goog.dom.selection.useSelectionProperties_(a)) {
    var c = a.value, d = a.selectionStart, e = c.substr(0, d), c = c.substr(a.selectionEnd);
    a.value = e + b + c;
    a.selectionStart = d;
    a.selectionEnd = d + b.length
  }else {
    if(goog.userAgent.IE) {
      if(e = goog.dom.selection.getRangeIe_(a), d = e[1], e[0].inRange(d)) {
        e = d.duplicate(), d.text = b, d.setEndPoint("StartToStart", e), d.select()
      }
    }else {
      throw Error("Cannot set the selection end");
    }
  }
};
goog.dom.selection.getText = function(a) {
  if(goog.dom.selection.useSelectionProperties_(a)) {
    return a.value.substring(a.selectionStart, a.selectionEnd)
  }
  if(goog.userAgent.IE) {
    var b = goog.dom.selection.getRangeIe_(a), c = b[1];
    if(b[0].inRange(c)) {
      if(a.type == "textarea") {
        return goog.dom.selection.getSelectionRangeText_(c)
      }
    }else {
      return""
    }
    return c.text
  }
  throw Error("Cannot get the selection text");
};
goog.dom.selection.getSelectionRangeText_ = function(a) {
  for(var a = a.duplicate(), b = a.text, c = b, d = false;!d;) {
    a.compareEndPoints("StartToEnd", a) == 0 ? d = true : (a.moveEnd("character", -1), a.text == b ? c += "\r\n" : d = true)
  }
  return c
};
goog.dom.selection.getRangeIe_ = function(a) {
  var b = a.ownerDocument || a.document, c = b.selection.createRange();
  a.type == "textarea" ? (b = b.body.createTextRange(), b.moveToElementText(a)) : b = a.createTextRange();
  return[b, c]
};
goog.dom.selection.canonicalizePositionIe_ = function(a, b) {
  if(a.type == "textarea") {
    var c = a.value.substring(0, b), b = goog.string.canonicalizeNewlines(c).length
  }
  return b
};
goog.dom.selection.useSelectionProperties_ = function(a) {
  try {
    return typeof a.selectionStart == "number"
  }catch(b) {
    return false
  }
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = [];
  a && h.push(a, ":");
  c && (h.push("//"), b && h.push(b, "@"), h.push(c), d && h.push(":", d));
  e && h.push(e);
  f && h.push("?", f);
  g && h.push("#", g);
  return h.join("")
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a) {
  return a && decodeURIComponent(a)
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a))
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a))
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return b < 0 ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return b < 0 ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if(goog.DEBUG && (a.indexOf("#") >= 0 || a.indexOf("?") >= 0)) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if(a[1]) {
    var b = a[0], c = b.indexOf("#");
    c >= 0 && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    c < 0 ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
  }
  return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if(goog.isArray(b)) {
    for(var d = 0;d < b.length;d++) {
      c.push("&", a), b[d] !== "" && c.push("=", goog.string.urlEncode(b[d]))
    }
  }else {
    b != null && (c.push("&", a), b !== "" && c.push("=", goog.string.urlEncode(b)))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(Math.max(b.length - (c || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  for(c = c || 0;c < b.length;c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a)
  }
  return a
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for(var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a)
  }
  return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(arguments.length == 2 ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
  return goog.uri.utils.appendQueryData_([a, "&", b, "=", goog.string.urlEncode(c)])
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for(var e = c.length;(b = a.indexOf(c, b)) >= 0 && b < d;) {
    var f = a.charCodeAt(b - 1);
    if(f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if(f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b
      }
    }
    b += e + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_)) >= 0
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if(d < 0) {
    return null
  }else {
    var e = a.indexOf("&", d);
    if(e < 0 || e > c) {
      e = c
    }
    d += b.length + 1;
    return goog.string.urlDecode(a.substr(d, e - d))
  }
};
goog.uri.utils.getParamValues = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];(e = goog.uri.utils.findParam_(a, d, b, c)) >= 0;) {
    d = a.indexOf("&", e);
    if(d < 0 || d > c) {
      d = c
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)))
  }
  return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];(e = goog.uri.utils.findParam_(a, d, b, c)) >= 0;) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c)
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.editor.Link = function(a, b) {
  this.anchor_ = a;
  this.isNew_ = b
};
goog.editor.Link.prototype.getAnchor = function() {
  return this.anchor_
};
goog.editor.Link.prototype.getCurrentText = function() {
  if(!this.currentText_) {
    this.currentText_ = goog.dom.getRawTextContent(this.getAnchor())
  }
  return this.currentText_
};
goog.editor.Link.prototype.isNew = function() {
  return this.isNew_
};
goog.editor.Link.prototype.initializeUrl = function(a) {
  this.getAnchor().href = a
};
goog.editor.Link.prototype.removeLink = function() {
  goog.dom.flattenElement(this.anchor_);
  this.anchor_ = null
};
goog.editor.Link.prototype.setTextAndUrl = function(a, b) {
  var c = this.getAnchor();
  c.href = b;
  var d = this.getCurrentText();
  if(a != d) {
    var e = goog.editor.node.getLeftMostLeaf(c);
    if(e.nodeType == goog.dom.NodeType.TEXT) {
      e = e.parentNode
    }
    goog.dom.getRawTextContent(e) != d && (e = c);
    goog.dom.removeChildren(e);
    c = goog.dom.getDomHelper(e);
    goog.dom.appendChild(e, c.createTextNode(a));
    this.currentText_ = null
  }
  this.isNew_ = false
};
goog.editor.Link.prototype.placeCursorRightOf = function() {
  var a = this.getAnchor();
  if(goog.editor.BrowserFeature.GETS_STUCK_IN_LINKS) {
    var b;
    b = a.nextSibling;
    if(!b || !(b.nodeType == goog.dom.NodeType.TEXT && (goog.string.startsWith(b.data, goog.string.Unicode.NBSP) || goog.string.startsWith(b.data, " ")))) {
      b = goog.dom.getDomHelper(a).createTextNode(goog.string.Unicode.NBSP), goog.dom.insertSiblingAfter(b, a)
    }
    goog.dom.Range.createCaret(b, 1).select()
  }else {
    goog.editor.range.placeCursorNextTo(a, false)
  }
};
goog.editor.Link.createNewLink = function(a, b, c) {
  var d = new goog.editor.Link(a, true);
  d.initializeUrl(b);
  if(c) {
    a.target = c
  }
  return d
};
goog.editor.Link.isLikelyUrl = function(a) {
  if(/\s/.test(a)) {
    return false
  }
  if(goog.editor.Link.isLikelyEmailAddress(a)) {
    return false
  }
  var b = false;
  /^[^:\/?#.]+:/.test(a) || (a = "http://" + a, b = true);
  a = goog.uri.utils.split(a);
  if(goog.array.indexOf(["mailto", "aim"], a[goog.uri.utils.ComponentIndex.SCHEME]) != -1) {
    return true
  }
  var c = a[goog.uri.utils.ComponentIndex.DOMAIN];
  if(!c || b && c.indexOf(".") == -1) {
    return false
  }
  b = a[goog.uri.utils.ComponentIndex.PATH];
  return!b || b.indexOf("/") == 0
};
goog.editor.Link.LIKELY_EMAIL_ADDRESS_ = /^[\w-]+(\.[\w-]+)*\@([\w-]+\.)+(\d+|\w\w+)$/i;
goog.editor.Link.isLikelyEmailAddress = function(a) {
  return goog.editor.Link.LIKELY_EMAIL_ADDRESS_.test(a)
};
goog.editor.Link.isMailto = function(a) {
  return!!a && goog.string.startsWith(a, "mailto:")
};
goog.editor.focus = {};
goog.editor.focus.focusInputField = function(a) {
  a.focus();
  goog.dom.selection.setCursorPosition(a, a.value.length)
};
goog.events.InputHandler = function(a) {
  goog.events.EventTarget.call(this);
  this.element_ = a;
  this.inputEventEmulation_ = goog.userAgent.IE || goog.userAgent.WEBKIT && !goog.userAgent.isVersion("531") && a.tagName == "TEXTAREA";
  this.eventHandler_ = new goog.events.EventHandler;
  this.eventHandler_.listen(this.element_, this.inputEventEmulation_ ? ["keydown", "paste", "cut", "drop"] : "input", this)
};
goog.inherits(goog.events.InputHandler, goog.events.EventTarget);
goog.events.InputHandler.EventType = {INPUT:"input"};
goog.events.InputHandler.prototype.timer_ = null;
goog.events.InputHandler.prototype.handleEvent = function(a) {
  if(this.inputEventEmulation_) {
    if(a.type != "keydown" || goog.events.KeyCodes.isTextModifyingKeyEvent(a)) {
      var b = a.type == "keydown" ? this.element_.value : null;
      goog.userAgent.IE && a.keyCode == goog.events.KeyCodes.WIN_IME && (b = null);
      var c = this.createInputEvent_(a);
      this.cancelTimerIfSet_();
      this.timer_ = goog.Timer.callOnce(function() {
        this.timer_ = null;
        this.element_.value != b && this.dispatchAndDisposeEvent_(c)
      }, 0, this)
    }
  }else {
    (!goog.userAgent.OPERA || this.element_ == goog.dom.getOwnerDocument(this.element_).activeElement) && this.dispatchAndDisposeEvent_(this.createInputEvent_(a))
  }
};
goog.events.InputHandler.prototype.cancelTimerIfSet_ = function() {
  if(this.timer_ != null) {
    goog.Timer.clear(this.timer_), this.timer_ = null
  }
};
goog.events.InputHandler.prototype.createInputEvent_ = function(a) {
  a = new goog.events.BrowserEvent(a.getBrowserEvent());
  a.type = goog.events.InputHandler.EventType.INPUT;
  return a
};
goog.events.InputHandler.prototype.dispatchAndDisposeEvent_ = function(a) {
  try {
    this.dispatchEvent(a)
  }finally {
    a.dispose()
  }
};
goog.events.InputHandler.prototype.disposeInternal = function() {
  goog.events.InputHandler.superClass_.disposeInternal.call(this);
  this.eventHandler_.dispose();
  this.cancelTimerIfSet_();
  delete this.element_
};
goog.ui.FlatButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this)
};
goog.inherits(goog.ui.FlatButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(goog.ui.FlatButtonRenderer);
goog.ui.FlatButtonRenderer.CSS_CLASS = "goog-flat-button";
goog.ui.FlatButtonRenderer.prototype.createDom = function(a) {
  var b = this.getClassNames(a), b = {"class":goog.ui.INLINE_BLOCK_CLASSNAME + " " + b.join(" "), title:a.getTooltip() || ""};
  return a.getDomHelper().createDom("div", b, a.getContent())
};
goog.ui.FlatButtonRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.BUTTON
};
goog.ui.FlatButtonRenderer.prototype.canDecorate = function(a) {
  return a.tagName == "DIV"
};
goog.ui.FlatButtonRenderer.prototype.decorate = function(a, b) {
  goog.dom.classes.add(b, goog.ui.INLINE_BLOCK_CLASSNAME);
  return goog.ui.FlatButtonRenderer.superClass_.decorate.call(this, a, b)
};
goog.ui.FlatButtonRenderer.prototype.getValue = function() {
  return null
};
goog.ui.FlatButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.FlatButtonRenderer.CSS_CLASS
};
goog.ui.registry.setDecoratorByClassName(goog.ui.FlatButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.Button(null, goog.ui.FlatButtonRenderer.getInstance())
});
goog.ui.LinkButtonRenderer = function() {
  goog.ui.FlatButtonRenderer.call(this)
};
goog.inherits(goog.ui.LinkButtonRenderer, goog.ui.FlatButtonRenderer);
goog.addSingletonGetter(goog.ui.LinkButtonRenderer);
goog.ui.LinkButtonRenderer.CSS_CLASS = "goog-link-button";
goog.ui.LinkButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.LinkButtonRenderer.CSS_CLASS
};
goog.ui.registry.setDecoratorByClassName(goog.ui.LinkButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.Button(null, goog.ui.LinkButtonRenderer.getInstance())
});
goog.ui.TabRenderer = function() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.TabRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.TabRenderer);
goog.ui.TabRenderer.CSS_CLASS = "goog-tab";
goog.ui.TabRenderer.prototype.getCssClass = function() {
  return goog.ui.TabRenderer.CSS_CLASS
};
goog.ui.TabRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.TAB
};
goog.ui.TabRenderer.prototype.createDom = function(a) {
  var b = goog.ui.TabRenderer.superClass_.createDom.call(this, a);
  (a = a.getTooltip()) && this.setTooltip(b, a);
  return b
};
goog.ui.TabRenderer.prototype.decorate = function(a, b) {
  var b = goog.ui.TabRenderer.superClass_.decorate.call(this, a, b), c = this.getTooltip(b);
  c && a.setTooltipInternal(c);
  if(a.isSelected() && (c = a.getParent()) && goog.isFunction(c.setSelectedTab)) {
    a.setState(goog.ui.Component.State.SELECTED, false), c.setSelectedTab(a)
  }
  return b
};
goog.ui.TabRenderer.prototype.getTooltip = function(a) {
  return a.title || ""
};
goog.ui.TabRenderer.prototype.setTooltip = function(a, b) {
  if(a) {
    a.title = b || ""
  }
};
goog.ui.Tab = function(a, b, c) {
  goog.ui.Control.call(this, a, b || goog.ui.TabRenderer.getInstance(), c);
  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.DISABLED | goog.ui.Component.State.SELECTED, true)
};
goog.inherits(goog.ui.Tab, goog.ui.Control);
goog.ui.Tab.prototype.getTooltip = function() {
  return this.tooltip_
};
goog.ui.Tab.prototype.setTooltip = function(a) {
  this.getRenderer().setTooltip(this.getElement(), a);
  this.setTooltipInternal(a)
};
goog.ui.Tab.prototype.setTooltipInternal = function(a) {
  this.tooltip_ = a
};
goog.ui.registry.setDecoratorByClassName(goog.ui.TabRenderer.CSS_CLASS, function() {
  return new goog.ui.Tab(null)
});
goog.ui.TabBarRenderer = function() {
  goog.ui.ContainerRenderer.call(this)
};
goog.inherits(goog.ui.TabBarRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.TabBarRenderer);
goog.ui.TabBarRenderer.CSS_CLASS = "goog-tab-bar";
goog.ui.TabBarRenderer.prototype.getCssClass = function() {
  return goog.ui.TabBarRenderer.CSS_CLASS
};
goog.ui.TabBarRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.TAB_LIST
};
goog.ui.TabBarRenderer.prototype.setStateFromClassName = function(a, b, c) {
  this.locationByClass_ || this.createLocationByClassMap_();
  var d = this.locationByClass_[b];
  d ? a.setLocation(d) : goog.ui.TabBarRenderer.superClass_.setStateFromClassName.call(this, a, b, c)
};
goog.ui.TabBarRenderer.prototype.getClassNames = function(a) {
  var b = goog.ui.TabBarRenderer.superClass_.getClassNames.call(this, a);
  this.classByLocation_ || this.createClassByLocationMap_();
  b.push(this.classByLocation_[a.getLocation()]);
  return b
};
goog.ui.TabBarRenderer.prototype.createClassByLocationMap_ = function() {
  var a = this.getCssClass();
  this.classByLocation_ = goog.object.create(goog.ui.TabBar.Location.TOP, a + "-top", goog.ui.TabBar.Location.BOTTOM, a + "-bottom", goog.ui.TabBar.Location.START, a + "-start", goog.ui.TabBar.Location.END, a + "-end")
};
goog.ui.TabBarRenderer.prototype.createLocationByClassMap_ = function() {
  this.classByLocation_ || this.createClassByLocationMap_();
  this.locationByClass_ = goog.object.transpose(this.classByLocation_)
};
goog.ui.TabBar = function(a, b, c) {
  this.setLocation(a || goog.ui.TabBar.Location.TOP);
  goog.ui.Container.call(this, this.getOrientation(), b || goog.ui.TabBarRenderer.getInstance(), c);
  this.listenToTabEvents_()
};
goog.inherits(goog.ui.TabBar, goog.ui.Container);
goog.ui.TabBar.Location = {TOP:"top", BOTTOM:"bottom", START:"start", END:"end"};
goog.ui.TabBar.prototype.autoSelectTabs_ = true;
goog.ui.TabBar.prototype.selectedTab_ = null;
goog.ui.TabBar.prototype.enterDocument = function() {
  goog.ui.TabBar.superClass_.enterDocument.call(this);
  this.listenToTabEvents_()
};
goog.ui.TabBar.prototype.disposeInternal = function() {
  goog.ui.TabBar.superClass_.disposeInternal.call(this);
  this.selectedTab_ = null
};
goog.ui.TabBar.prototype.removeChild = function(a, b) {
  this.deselectIfSelected(a);
  return goog.ui.TabBar.superClass_.removeChild.call(this, a, b)
};
goog.ui.TabBar.prototype.getLocation = function() {
  return this.location_
};
goog.ui.TabBar.prototype.setLocation = function(a) {
  this.setOrientation(goog.ui.TabBar.getOrientationFromLocation(a));
  this.location_ = a
};
goog.ui.TabBar.prototype.isAutoSelectTabs = function() {
  return this.autoSelectTabs_
};
goog.ui.TabBar.prototype.setAutoSelectTabs = function(a) {
  this.autoSelectTabs_ = a
};
goog.ui.TabBar.prototype.setHighlightedIndexFromKeyEvent = function(a) {
  goog.ui.TabBar.superClass_.setHighlightedIndexFromKeyEvent.call(this, a);
  this.autoSelectTabs_ && this.setSelectedTabIndex(a)
};
goog.ui.TabBar.prototype.getSelectedTab = function() {
  return this.selectedTab_
};
goog.ui.TabBar.prototype.setSelectedTab = function(a) {
  a ? a.setSelected(true) : this.getSelectedTab() && this.getSelectedTab().setSelected(false)
};
goog.ui.TabBar.prototype.getSelectedTabIndex = function() {
  return this.indexOfChild(this.getSelectedTab())
};
goog.ui.TabBar.prototype.setSelectedTabIndex = function(a) {
  this.setSelectedTab(this.getChildAt(a))
};
goog.ui.TabBar.prototype.deselectIfSelected = function(a) {
  if(a && a == this.getSelectedTab()) {
    for(var b = this.indexOfChild(a), c = b - 1;a = this.getChildAt(c);c--) {
      if(this.isSelectableTab(a)) {
        this.setSelectedTab(a);
        return
      }
    }
    for(b += 1;a = this.getChildAt(b);b++) {
      if(this.isSelectableTab(a)) {
        this.setSelectedTab(a);
        return
      }
    }
    this.setSelectedTab(null)
  }
};
goog.ui.TabBar.prototype.isSelectableTab = function(a) {
  return a.isVisible() && a.isEnabled()
};
goog.ui.TabBar.prototype.handleTabSelect = function(a) {
  this.selectedTab_ && this.selectedTab_ != a.target && this.selectedTab_.setSelected(false);
  this.selectedTab_ = a.target
};
goog.ui.TabBar.prototype.handleTabUnselect = function(a) {
  if(a.target == this.selectedTab_) {
    this.selectedTab_ = null
  }
};
goog.ui.TabBar.prototype.handleTabDisable = function(a) {
  this.deselectIfSelected(a.target)
};
goog.ui.TabBar.prototype.handleTabHide = function(a) {
  this.deselectIfSelected(a.target)
};
goog.ui.TabBar.prototype.handleFocus = function() {
  this.getHighlighted() || this.setHighlighted(this.getSelectedTab() || this.getChildAt(0))
};
goog.ui.TabBar.prototype.listenToTabEvents_ = function() {
  this.getHandler().listen(this, goog.ui.Component.EventType.SELECT, this.handleTabSelect).listen(this, goog.ui.Component.EventType.UNSELECT, this.handleTabUnselect).listen(this, goog.ui.Component.EventType.DISABLE, this.handleTabDisable).listen(this, goog.ui.Component.EventType.HIDE, this.handleTabHide)
};
goog.ui.TabBar.getOrientationFromLocation = function(a) {
  return a == goog.ui.TabBar.Location.START || a == goog.ui.TabBar.Location.END ? goog.ui.Container.Orientation.VERTICAL : goog.ui.Container.Orientation.HORIZONTAL
};
goog.ui.registry.setDecoratorByClassName(goog.ui.TabBarRenderer.CSS_CLASS, function() {
  return new goog.ui.TabBar
});
goog.ui.editor.TabPane = function(a, b) {
  goog.ui.Component.call(this, a);
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.tabBar_ = new goog.ui.TabBar(goog.ui.TabBar.Location.START, void 0, this.dom_);
  this.tabBar_.setFocusable(false);
  this.tabContent_ = this.dom_.createDom(goog.dom.TagName.DIV, {className:"goog-tab-content"});
  this.visibleContent_ = this.selectedRadio_ = null;
  if(b) {
    var c = new goog.ui.Control(b, void 0, this.dom_);
    c.addClassName("tr-tabpane-caption");
    c.setEnabled(false);
    this.tabBar_.addChild(c, true)
  }
};
goog.inherits(goog.ui.editor.TabPane, goog.ui.Component);
goog.ui.editor.TabPane.prototype.getCurrentTabId = function() {
  return this.tabBar_.getSelectedTab().getId()
};
goog.ui.editor.TabPane.prototype.setSelectedTabId = function(a) {
  this.tabBar_.setSelectedTab(this.tabBar_.getChild(a))
};
goog.ui.editor.TabPane.prototype.addTab = function(a, b, c, d) {
  var e = this.dom_.createDom(goog.dom.TagName.INPUT, {type:"radio"}), b = new goog.ui.Tab([e, this.dom_.createTextNode(b)], void 0, this.dom_);
  b.setId(a);
  b.setTooltip(c);
  this.tabBar_.addChild(b, true);
  this.eventHandler_.listen(e, goog.events.EventType.SELECT, goog.bind(this.tabBar_.setSelectedTab, this.tabBar_, b));
  d.id = a + "-tab";
  this.tabContent_.appendChild(d);
  goog.style.showElement(d, false)
};
goog.ui.editor.TabPane.prototype.enterDocument = function() {
  goog.ui.editor.TabPane.superClass_.enterDocument.call(this);
  var a = this.getElement();
  goog.dom.classes.add(a, "tr-tabpane");
  this.addChild(this.tabBar_, true);
  this.eventHandler_.listen(this.tabBar_, goog.ui.Component.EventType.SELECT, this.handleTabSelect_);
  a.appendChild(this.tabContent_);
  a.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, {className:"goog-tab-bar-clear"}))
};
goog.ui.editor.TabPane.prototype.handleTabSelect_ = function(a) {
  a = a.target;
  this.visibleContent_ && goog.style.showElement(this.visibleContent_, false);
  this.visibleContent_ = this.dom_.getElement(a.getId() + "-tab");
  goog.style.showElement(this.visibleContent_, true);
  if(this.selectedRadio_) {
    this.selectedRadio_.checked = false
  }
  this.selectedRadio_ = a.getElement().getElementsByTagName(goog.dom.TagName.INPUT)[0];
  this.selectedRadio_.checked = true
};
goog.ui.editor.messages = {};
goog.ui.editor.messages.MSG_LINK_CAPTION = goog.getMsg("Link");
goog.ui.editor.messages.MSG_EDIT_LINK = goog.getMsg("Edit Link");
goog.ui.editor.messages.MSG_TEXT_TO_DISPLAY = goog.getMsg("Text to display:");
goog.ui.editor.messages.MSG_LINK_TO = goog.getMsg("Link to:");
goog.ui.editor.messages.MSG_ON_THE_WEB = goog.getMsg("Web address");
goog.ui.editor.messages.MSG_ON_THE_WEB_TIP = goog.getMsg("Link to a page or file somewhere else on the web");
goog.ui.editor.messages.MSG_TEST_THIS_LINK = goog.getMsg("Test this link");
goog.ui.editor.messages.MSG_TR_LINK_EXPLANATION = goog.getMsg("{$startBold}Not sure what to put in the box?{$endBold} First, find the page on the web that you want to link to. (A {$searchEngineLink}search engine{$endLink} might be useful.) Then, copy the web address from the box in your browser's address bar, and paste it into the box above.", {startBold:"<b>", endBold:"</b>", searchEngineLink:"<a href='http://www.google.com/' target='_new'>", endLink:"</a>"});
goog.ui.editor.messages.MSG_WHAT_URL = goog.getMsg("To what URL should this link go?");
goog.ui.editor.messages.MSG_EMAIL_ADDRESS = goog.getMsg("Email address");
goog.ui.editor.messages.MSG_EMAIL_ADDRESS_TIP = goog.getMsg("Link to an email address");
goog.ui.editor.messages.MSG_INVALID_EMAIL = goog.getMsg("Invalid email address");
goog.ui.editor.messages.MSG_WHAT_EMAIL = goog.getMsg("To what email address should this link?");
goog.ui.editor.messages.MSG_EMAIL_EXPLANATION = goog.getMsg("{$preb}Be careful.{$postb} Remember that any time you include an email address on a web page, nasty spammers can find it too.", {preb:"<b>", postb:"</b>"});
goog.ui.editor.messages.MSG_IMAGE_CAPTION = goog.getMsg("Image");
goog.window = {};
goog.window.DEFAULT_POPUP_HEIGHT = 500;
goog.window.DEFAULT_POPUP_WIDTH = 690;
goog.window.DEFAULT_POPUP_TARGET = "google_popup";
goog.window.open = function(a, b, c) {
  b || (b = {});
  var d = c || window, c = typeof a.href != "undefined" ? a.href : String(a), a = b.target || a.target, e = [], f;
  for(f in b) {
    switch(f) {
      case "width":
      ;
      case "height":
      ;
      case "top":
      ;
      case "left":
        e.push(f + "=" + b[f]);
        break;
      case "target":
      ;
      case "noreferrer":
        break;
      default:
        e.push(f + "=" + (b[f] ? 1 : 0))
    }
  }
  f = e.join(",");
  if(b.noreferrer) {
    if(b = d.open("", a, f)) {
      goog.userAgent.IE && c.indexOf(";") != -1 && (c = "'" + c.replace(/'/g, "%27") + "'"), c = goog.string.htmlEscape(c), b.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + c + '">'), b.document.close()
    }
  }else {
    b = d.open(c, a, f)
  }
  return b
};
goog.window.openBlank = function(a, b, c) {
  a = a ? goog.string.htmlEscape(a) : "";
  return goog.window.open('javascript:"' + encodeURI(a) + '"', b, c)
};
goog.window.popup = function(a, b) {
  b || (b = {});
  b.target = b.target || a.target || goog.window.DEFAULT_POPUP_TARGET;
  b.width = b.width || goog.window.DEFAULT_POPUP_WIDTH;
  b.height = b.height || goog.window.DEFAULT_POPUP_HEIGHT;
  var c = goog.window.open(a, b);
  if(!c) {
    return true
  }
  c.focus();
  return false
};
goog.ui.editor.LinkDialog = function(a, b) {
  goog.ui.editor.AbstractDialog.call(this, a);
  this.targetLink_ = b;
  this.eventHandler_ = new goog.events.EventHandler(this)
};
goog.inherits(goog.ui.editor.LinkDialog, goog.ui.editor.AbstractDialog);
goog.ui.editor.LinkDialog.EventType = {BEFORE_TEST_LINK:"beforetestlink"};
goog.ui.editor.LinkDialog.OkEvent = function(a, b) {
  goog.events.Event.call(this, goog.ui.editor.AbstractDialog.EventType.OK);
  this.linkText = a;
  this.linkUrl = b
};
goog.inherits(goog.ui.editor.LinkDialog.OkEvent, goog.events.Event);
goog.ui.editor.LinkDialog.BeforeTestLinkEvent = function(a) {
  goog.events.Event.call(this, goog.ui.editor.LinkDialog.EventType.BEFORE_TEST_LINK);
  this.url = a
};
goog.inherits(goog.ui.editor.LinkDialog.BeforeTestLinkEvent, goog.events.Event);
goog.ui.editor.LinkDialog.prototype.setEmailWarning = function(a) {
  this.emailWarning_ = a
};
goog.ui.editor.LinkDialog.prototype.show = function() {
  goog.ui.editor.LinkDialog.superClass_.show.call(this);
  this.selectAppropriateTab_(this.textToDisplayInput_.value, this.getTargetUrl_());
  this.syncOkButton_()
};
goog.ui.editor.LinkDialog.prototype.hide = function() {
  this.disableAutogenFlag_(false);
  goog.ui.editor.LinkDialog.superClass_.hide.call(this)
};
goog.ui.editor.LinkDialog.prototype.setTextToDisplayVisible = function(a) {
  this.textToDisplayDiv_ && goog.style.setStyle(this.textToDisplayDiv_, "display", a ? "block" : "none")
};
goog.ui.editor.LinkDialog.prototype.setStopReferrerLeaks = function(a) {
  this.stopReferrerLeaks_ = a
};
goog.ui.editor.LinkDialog.prototype.setAutogenFeatureEnabled = function(a) {
  this.autogenFeatureEnabled_ = a
};
goog.ui.editor.LinkDialog.prototype.createDialogControl = function() {
  this.textToDisplayDiv_ = this.buildTextToDisplayDiv_();
  var a = this.dom.createDom(goog.dom.TagName.DIV, null, this.textToDisplayDiv_), b = new goog.ui.editor.AbstractDialog.Builder(this);
  b.setTitle(goog.ui.editor.messages.MSG_EDIT_LINK).setContent(a);
  this.tabPane_ = new goog.ui.editor.TabPane(this.dom, goog.ui.editor.messages.MSG_LINK_TO);
  this.tabPane_.addTab(goog.ui.editor.LinkDialog.Id_.ON_WEB_TAB, goog.ui.editor.messages.MSG_ON_THE_WEB, goog.ui.editor.messages.MSG_ON_THE_WEB_TIP, this.buildTabOnTheWeb_());
  this.tabPane_.addTab(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_TAB, goog.ui.editor.messages.MSG_EMAIL_ADDRESS, goog.ui.editor.messages.MSG_EMAIL_ADDRESS_TIP, this.buildTabEmailAddress_());
  this.tabPane_.render(a);
  this.eventHandler_.listen(this.tabPane_, goog.ui.Component.EventType.SELECT, this.onChangeTab_);
  return b.build()
};
goog.ui.editor.LinkDialog.prototype.createOkEvent = function() {
  return this.tabPane_.getCurrentTabId() == goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_TAB ? this.createOkEventFromEmailTab_() : this.createOkEventFromWebTab_()
};
goog.ui.editor.LinkDialog.prototype.disposeInternal = function() {
  this.eventHandler_.dispose();
  this.eventHandler_ = null;
  this.urlInputHandler_.dispose();
  this.urlInputHandler_ = null;
  this.emailInputHandler_.dispose();
  this.emailInputHandler_ = null;
  goog.ui.editor.LinkDialog.superClass_.disposeInternal.call(this)
};
goog.ui.editor.LinkDialog.prototype.autogenFeatureEnabled_ = true;
goog.ui.editor.LinkDialog.prototype.stopReferrerLeaks_ = false;
goog.ui.editor.LinkDialog.prototype.buildTextToDisplayDiv_ = function() {
  var a = this.dom.createTable(1, 2);
  a.cellSpacing = "0";
  a.cellPadding = "0";
  a.style.fontSize = "10pt";
  var b = this.dom.createDom(goog.dom.TagName.DIV);
  a.rows[0].cells[0].innerHTML = '<span style="position: relative; bottom: 2px; padding-right: 1px; white-space: nowrap;">' + goog.ui.editor.messages.MSG_TEXT_TO_DISPLAY + "&nbsp;</span>";
  var c = this.textToDisplayInput_ = this.dom.createDom(goog.dom.TagName.INPUT, {id:goog.ui.editor.LinkDialog.Id_.TEXT_TO_DISPLAY});
  goog.style.setStyle(c, "width", "98%");
  goog.style.setStyle(a.rows[0].cells[1], "width", "100%");
  goog.dom.appendChild(a.rows[0].cells[1], c);
  c.value = this.targetLink_.getCurrentText();
  this.eventHandler_.listen(c, goog.events.EventType.KEYUP, goog.bind(this.onTextToDisplayEdit_, this));
  goog.dom.appendChild(b, a);
  return b
};
goog.ui.editor.LinkDialog.prototype.buildTabOnTheWeb_ = function() {
  var a = this.dom.createElement(goog.dom.TagName.DIV), b = this.dom.createDom(goog.dom.TagName.DIV, {innerHTML:"<b>" + goog.ui.editor.messages.MSG_WHAT_URL + "</b>"}), c = this.dom.createDom(goog.dom.TagName.INPUT, {id:goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT, className:goog.ui.editor.LinkDialog.TARGET_INPUT_CLASSNAME_});
  if(!goog.userAgent.IE) {
    c.type = "url"
  }
  if(goog.editor.BrowserFeature.NEEDS_99_WIDTH_IN_STANDARDS_MODE && goog.editor.node.isStandardsMode(c)) {
    c.style.width = "99%"
  }
  var d = this.dom.createDom(goog.dom.TagName.DIV, null, c);
  this.urlInputHandler_ = new goog.events.InputHandler(c);
  this.eventHandler_.listen(this.urlInputHandler_, goog.events.InputHandler.EventType.INPUT, this.onUrlOrEmailInputChange_);
  c = new goog.ui.Button(goog.ui.editor.messages.MSG_TEST_THIS_LINK, goog.ui.LinkButtonRenderer.getInstance(), this.dom);
  c.render(d);
  c.getElement().style.marginTop = "1em";
  this.eventHandler_.listen(c, goog.ui.Component.EventType.ACTION, this.onWebTestLink_);
  c = this.dom.createDom(goog.dom.TagName.DIV, {className:goog.ui.editor.LinkDialog.EXPLANATION_TEXT_CLASSNAME_, innerHTML:goog.ui.editor.messages.MSG_TR_LINK_EXPLANATION});
  a.appendChild(b);
  a.appendChild(d);
  a.appendChild(c);
  return a
};
goog.ui.editor.LinkDialog.prototype.buildTabEmailAddress_ = function() {
  var a = this.dom.createDom(goog.dom.TagName.DIV), b = this.dom.createDom(goog.dom.TagName.DIV, {innerHTML:"<b>" + goog.ui.editor.messages.MSG_WHAT_EMAIL + "</b>"});
  goog.dom.appendChild(a, b);
  b = this.dom.createDom(goog.dom.TagName.INPUT, {id:goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_INPUT, className:goog.ui.editor.LinkDialog.TARGET_INPUT_CLASSNAME_});
  if(goog.editor.BrowserFeature.NEEDS_99_WIDTH_IN_STANDARDS_MODE && goog.editor.node.isStandardsMode(b)) {
    b.style.width = "99%"
  }
  goog.dom.appendChild(a, b);
  this.emailInputHandler_ = new goog.events.InputHandler(b);
  this.eventHandler_.listen(this.emailInputHandler_, goog.events.InputHandler.EventType.INPUT, this.onUrlOrEmailInputChange_);
  goog.dom.appendChild(a, this.dom.createDom(goog.dom.TagName.DIV, {id:goog.ui.editor.LinkDialog.Id_.EMAIL_WARNING, className:goog.ui.editor.LinkDialog.EMAIL_WARNING_CLASSNAME_, style:"visibility:hidden"}, goog.ui.editor.messages.MSG_INVALID_EMAIL));
  this.emailWarning_ && (b = this.dom.createDom(goog.dom.TagName.DIV, {className:goog.ui.editor.LinkDialog.EXPLANATION_TEXT_CLASSNAME_, innerHTML:this.emailWarning_}), goog.dom.appendChild(a, b));
  return a
};
goog.ui.editor.LinkDialog.prototype.getTargetUrl_ = function() {
  return this.targetLink_.getAnchor().getAttribute("href") || ""
};
goog.ui.editor.LinkDialog.prototype.selectAppropriateTab_ = function(a, b) {
  this.isNewLink_() ? this.guessUrlAndSelectTab_(a) : (goog.editor.Link.isMailto(b) ? (this.tabPane_.setSelectedTabId(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_TAB), this.dom.getElement(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_INPUT).value = b.substring(b.indexOf(":") + 1)) : (this.tabPane_.setSelectedTabId(goog.ui.editor.LinkDialog.Id_.ON_WEB_TAB), this.dom.getElement(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT).value = this.isNewLink_() ? "http://" : b), this.setAutogenFlagFromCurInput_())
};
goog.ui.editor.LinkDialog.prototype.guessUrlAndSelectTab_ = function(a) {
  goog.editor.Link.isLikelyEmailAddress(a) ? (this.tabPane_.setSelectedTabId(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_TAB), this.dom.getElement(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_INPUT).value = a, this.setAutogenFlag_(true), this.disableAutogenFlag_(true)) : goog.editor.Link.isLikelyUrl(a) ? (this.tabPane_.setSelectedTabId(goog.ui.editor.LinkDialog.Id_.ON_WEB_TAB), this.dom.getElement(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT).value = a, this.setAutogenFlag_(true), this.disableAutogenFlag_(true)) : 
  (this.targetLink_.getCurrentText() || this.setAutogenFlag_(true), this.tabPane_.setSelectedTabId(goog.ui.editor.LinkDialog.Id_.ON_WEB_TAB))
};
goog.ui.editor.LinkDialog.prototype.syncOkButton_ = function() {
  var a;
  if(this.tabPane_.getCurrentTabId() == goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_TAB) {
    a = this.dom.getElement(goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_INPUT).value, this.toggleInvalidEmailWarning_(a != "" && !goog.editor.Link.isLikelyEmailAddress(a))
  }else {
    if(this.tabPane_.getCurrentTabId() == goog.ui.editor.LinkDialog.Id_.ON_WEB_TAB) {
      a = this.dom.getElement(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT).value
    }else {
      return
    }
  }
  this.getOkButtonElement().disabled = goog.string.isEmpty(a)
};
goog.ui.editor.LinkDialog.prototype.toggleInvalidEmailWarning_ = function(a) {
  this.dom.getElement(goog.ui.editor.LinkDialog.Id_.EMAIL_WARNING).style.visibility = a ? "visible" : "hidden"
};
goog.ui.editor.LinkDialog.prototype.onTextToDisplayEdit_ = function() {
  this.textToDisplayInput_.value == "" ? this.setAutogenFlag_(true) : this.setAutogenFlagFromCurInput_()
};
goog.ui.editor.LinkDialog.prototype.createOkEventFromWebTab_ = function() {
  var a = this.dom.getElement(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT).value;
  return goog.editor.Link.isLikelyEmailAddress(a) ? this.createOkEventFromEmailTab_(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT) : (a.search(/:/) < 0 && (a = "http://" + goog.string.trimLeft(a)), this.createOkEventFromUrl_(a))
};
goog.ui.editor.LinkDialog.prototype.createOkEventFromEmailTab_ = function(a) {
  a = this.dom.getElement(a || goog.ui.editor.LinkDialog.Id_.EMAIL_ADDRESS_INPUT).value;
  return this.createOkEventFromUrl_("mailto:" + a)
};
goog.ui.editor.LinkDialog.prototype.onWebTestLink_ = function() {
  var a = this.dom.getElement(goog.ui.editor.LinkDialog.Id_.ON_WEB_INPUT).value;
  a.search(/:/) < 0 && (a = "http://" + goog.string.trimLeft(a));
  if(this.dispatchEvent(new goog.ui.editor.LinkDialog.BeforeTestLinkEvent(a))) {
    var b = this.dom.getWindow(), c = goog.dom.getViewportSize(b), c = {target:"_blank", width:Math.max(c.width - 50, 50), height:Math.max(c.height - 50, 50), toolbar:true, scrollbars:true, location:true, statusbar:false, menubar:true, resizable:true, noreferrer:this.stopReferrerLeaks_};
    goog.window.open(a, c, b)
  }
};
goog.ui.editor.LinkDialog.prototype.onUrlOrEmailInputChange_ = function() {
  this.autogenerateTextToDisplay_ ? this.setTextToDisplayFromAuto_() : this.textToDisplayInput_.value == "" && this.setAutogenFlagFromCurInput_();
  this.syncOkButton_()
};
goog.ui.editor.LinkDialog.prototype.onChangeTab_ = function(a) {
  a = this.dom.getElement(a.target.getId() + goog.ui.editor.LinkDialog.Id_.TAB_INPUT_SUFFIX);
  goog.editor.focus.focusInputField(a);
  a.style.width = "";
  a.style.width = a.offsetWidth + "px";
  this.syncOkButton_();
  this.setTextToDisplayFromAuto_()
};
goog.ui.editor.LinkDialog.prototype.setTextToDisplayFromAuto_ = function() {
  if(this.autogenFeatureEnabled_ && this.autogenerateTextToDisplay_) {
    this.textToDisplayInput_.value = this.dom.getElement(this.tabPane_.getCurrentTabId() + goog.ui.editor.LinkDialog.Id_.TAB_INPUT_SUFFIX).value
  }
};
goog.ui.editor.LinkDialog.prototype.setAutogenFlag_ = function(a) {
  this.autogenerateTextToDisplay_ = a
};
goog.ui.editor.LinkDialog.prototype.disableAutogenFlag_ = function(a) {
  this.setAutogenFlag_(!a);
  this.disableAutogen_ = a
};
goog.ui.editor.LinkDialog.prototype.createOkEventFromUrl_ = function(a) {
  this.setTextToDisplayFromAuto_();
  return new goog.ui.editor.LinkDialog.OkEvent(this.textToDisplayInput_.value, a)
};
goog.ui.editor.LinkDialog.prototype.setAutogenFlagFromCurInput_ = function() {
  var a = false;
  this.disableAutogen_ || (a = this.dom.getElement(this.tabPane_.getCurrentTabId() + goog.ui.editor.LinkDialog.Id_.TAB_INPUT_SUFFIX).value == this.textToDisplayInput_.value);
  this.setAutogenFlag_(a)
};
goog.ui.editor.LinkDialog.prototype.isNewLink_ = function() {
  return this.targetLink_.isNew()
};
goog.ui.editor.LinkDialog.Id_ = {TEXT_TO_DISPLAY:"linkdialog-text", ON_WEB_TAB:"linkdialog-onweb", ON_WEB_INPUT:"linkdialog-onweb-tab-input", EMAIL_ADDRESS_TAB:"linkdialog-email", EMAIL_ADDRESS_INPUT:"linkdialog-email-tab-input", EMAIL_WARNING:"linkdialog-email-warning", TAB_INPUT_SUFFIX:"-tab-input"};
goog.ui.editor.LinkDialog.TARGET_INPUT_CLASSNAME_ = "tr-link-dialog-target-input";
goog.ui.editor.LinkDialog.EMAIL_WARNING_CLASSNAME_ = "tr-link-dialog-email-warning";
goog.ui.editor.LinkDialog.EXPLANATION_TEXT_CLASSNAME_ = "tr-link-dialog-explanation-text";
goog.editor.plugins.LinkDialogPlugin = function() {
  goog.editor.plugins.AbstractDialogPlugin.call(this, goog.editor.Command.MODAL_LINK_EDITOR);
  this.eventHandler_ = new goog.events.EventHandler(this)
};
goog.inherits(goog.editor.plugins.LinkDialogPlugin, goog.editor.plugins.AbstractDialogPlugin);
goog.editor.plugins.LinkDialogPlugin.prototype.stopReferrerLeaks_ = false;
goog.editor.plugins.LinkDialogPlugin.prototype.getTrogClassId = goog.functions.constant("LinkDialogPlugin");
goog.editor.plugins.LinkDialogPlugin.prototype.stopReferrerLeaks = function() {
  this.stopReferrerLeaks_ = true
};
goog.editor.plugins.LinkDialogPlugin.prototype.setEmailWarning = function(a) {
  this.emailWarning_ = a
};
goog.editor.plugins.LinkDialogPlugin.prototype.execCommandInternal = function(a, b) {
  this.currentLink_ = b;
  return goog.editor.plugins.LinkDialogPlugin.superClass_.execCommandInternal.call(this, a, b)
};
goog.editor.plugins.LinkDialogPlugin.prototype.handleAfterHide = function(a) {
  goog.editor.plugins.LinkDialogPlugin.superClass_.handleAfterHide.call(this, a);
  this.currentLink_ = null
};
goog.editor.plugins.LinkDialogPlugin.prototype.getEventHandler = function() {
  return this.eventHandler_
};
goog.editor.plugins.LinkDialogPlugin.prototype.getCurrentLink = function() {
  return this.currentLink_
};
goog.editor.plugins.LinkDialogPlugin.prototype.createDialog = function(a, b) {
  var c = new goog.ui.editor.LinkDialog(a, b);
  this.emailWarning_ && c.setEmailWarning(this.emailWarning_);
  c.setStopReferrerLeaks(this.stopReferrerLeaks_);
  this.eventHandler_.listen(c, goog.ui.editor.AbstractDialog.EventType.OK, this.handleOk_).listen(c, goog.ui.editor.AbstractDialog.EventType.CANCEL, this.handleCancel_);
  return c
};
goog.editor.plugins.LinkDialogPlugin.prototype.disposeInternal = function() {
  goog.editor.plugins.LinkDialogPlugin.superClass_.disposeInternal.call(this);
  this.eventHandler_.dispose()
};
goog.editor.plugins.LinkDialogPlugin.prototype.handleOk_ = function(a) {
  this.disposeOriginalSelection();
  this.currentLink_.setTextAndUrl(a.linkText, a.linkUrl);
  this.currentLink_.placeCursorRightOf();
  this.fieldObject.dispatchSelectionChangeEvent();
  this.fieldObject.dispatchChange();
  this.eventHandler_.removeAll()
};
goog.editor.plugins.LinkDialogPlugin.prototype.handleCancel_ = function() {
  this.currentLink_.isNew() && (goog.dom.flattenElement(this.currentLink_.getAnchor()), this.fieldObject.dispatchChange());
  this.eventHandler_.removeAll()
};
goog.ui.ToolbarButtonRenderer = function() {
  goog.ui.CustomButtonRenderer.call(this)
};
goog.inherits(goog.ui.ToolbarButtonRenderer, goog.ui.CustomButtonRenderer);
goog.addSingletonGetter(goog.ui.ToolbarButtonRenderer);
goog.ui.ToolbarButtonRenderer.CSS_CLASS = "goog-toolbar-button";
goog.ui.ToolbarButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.ToolbarButtonRenderer.CSS_CLASS
};
goog.ui.ToolbarButton = function(a, b, c) {
  goog.ui.Button.call(this, a, b || goog.ui.ToolbarButtonRenderer.getInstance(), c)
};
goog.inherits(goog.ui.ToolbarButton, goog.ui.Button);
goog.ui.registry.setDecoratorByClassName(goog.ui.ToolbarButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.ToolbarButton(null)
});
goog.ui.Option = function(a, b, c) {
  goog.ui.MenuItem.call(this, a, b, c);
  this.setSelectable(true)
};
goog.inherits(goog.ui.Option, goog.ui.MenuItem);
goog.ui.Option.prototype.performActionInternal = function() {
  return this.dispatchEvent(goog.ui.Component.EventType.ACTION)
};
goog.ui.registry.setDecoratorByClassName("goog-option", function() {
  return new goog.ui.Option(null)
});
goog.ui.PopupBase = function(a, b) {
  this.handler_ = new goog.events.EventHandler(this);
  this.setElement(a || null);
  b && this.setType(b)
};
goog.inherits(goog.ui.PopupBase, goog.events.EventTarget);
goog.ui.PopupBase.Type = {TOGGLE_DISPLAY:"toggle_display", MOVE_OFFSCREEN:"move_offscreen"};
goog.ui.PopupBase.prototype.element_ = null;
goog.ui.PopupBase.prototype.autoHide_ = true;
goog.ui.PopupBase.prototype.autoHideRegion_ = null;
goog.ui.PopupBase.prototype.isVisible_ = false;
goog.ui.PopupBase.prototype.shouldHideAsync_ = false;
goog.ui.PopupBase.prototype.lastShowTime_ = -1;
goog.ui.PopupBase.prototype.lastHideTime_ = -1;
goog.ui.PopupBase.prototype.hideOnEscape_ = false;
goog.ui.PopupBase.prototype.enableCrossIframeDismissal_ = true;
goog.ui.PopupBase.prototype.type_ = goog.ui.PopupBase.Type.TOGGLE_DISPLAY;
goog.ui.PopupBase.EventType = {BEFORE_SHOW:"beforeshow", SHOW:"show", BEFORE_HIDE:"beforehide", HIDE:"hide"};
goog.ui.PopupBase.DEBOUNCE_DELAY_MS = 150;
goog.ui.PopupBase.prototype.getType = function() {
  return this.type_
};
goog.ui.PopupBase.prototype.setType = function(a) {
  this.type_ = a
};
goog.ui.PopupBase.prototype.shouldHideAsync = function() {
  return this.shouldHideAsync_
};
goog.ui.PopupBase.prototype.setShouldHideAsync = function(a) {
  this.shouldHideAsync_ = a
};
goog.ui.PopupBase.prototype.getElement = function() {
  return this.element_
};
goog.ui.PopupBase.prototype.setElement = function(a) {
  this.ensureNotVisible_();
  this.element_ = a
};
goog.ui.PopupBase.prototype.getAutoHide = function() {
  return this.autoHide_
};
goog.ui.PopupBase.prototype.setAutoHide = function(a) {
  this.ensureNotVisible_();
  this.autoHide_ = a
};
goog.ui.PopupBase.prototype.getHideOnEscape = function() {
  return this.hideOnEscape_
};
goog.ui.PopupBase.prototype.setHideOnEscape = function(a) {
  this.ensureNotVisible_();
  this.hideOnEscape_ = a
};
goog.ui.PopupBase.prototype.getEnableCrossIframeDismissal = function() {
  return this.enableCrossIframeDismissal_
};
goog.ui.PopupBase.prototype.setEnableCrossIframeDismissal = function(a) {
  this.enableCrossIframeDismissal_ = a
};
goog.ui.PopupBase.prototype.getAutoHideRegion = function() {
  return this.autoHideRegion_
};
goog.ui.PopupBase.prototype.setAutoHideRegion = function(a) {
  this.autoHideRegion_ = a
};
goog.ui.PopupBase.prototype.getLastShowTime = function() {
  return this.lastShowTime_
};
goog.ui.PopupBase.prototype.getLastHideTime = function() {
  return this.lastHideTime_
};
goog.ui.PopupBase.prototype.ensureNotVisible_ = function() {
  if(this.isVisible_) {
    throw Error("Can not change this state of the popup while showing.");
  }
};
goog.ui.PopupBase.prototype.isVisible = function() {
  return this.isVisible_
};
goog.ui.PopupBase.prototype.isOrWasRecentlyVisible = function() {
  return this.isVisible_ || goog.now() - this.lastHideTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.setVisible = function(a) {
  a ? this.show_() : this.hide_()
};
goog.ui.PopupBase.prototype.reposition = goog.nullFunction;
goog.ui.PopupBase.prototype.show_ = function() {
  if(!this.isVisible_ && this.onBeforeShow()) {
    if(!this.element_) {
      throw Error("Caller must call setElement before trying to show the popup");
    }
    this.reposition();
    var a = goog.dom.getOwnerDocument(this.element_);
    this.hideOnEscape_ && this.handler_.listen(a, goog.events.EventType.KEYDOWN, this.onDocumentKeyDown_, true);
    if(this.autoHide_) {
      if(this.handler_.listen(a, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, true), goog.userAgent.IE) {
        for(var b = a.activeElement;b && b.nodeName == "IFRAME";) {
          try {
            var c = goog.dom.getFrameContentDocument(b)
          }catch(d) {
            break
          }
          a = c;
          b = a.activeElement
        }
        this.handler_.listen(a, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, true);
        this.handler_.listen(a, goog.events.EventType.DEACTIVATE, this.onDocumentBlur_)
      }else {
        this.handler_.listen(a, goog.events.EventType.BLUR, this.onDocumentBlur_)
      }
    }
    this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.showPopupElement() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.reposition();
    this.isVisible_ = true;
    this.onShow_()
  }
};
goog.ui.PopupBase.prototype.hide_ = function(a) {
  if(!this.isVisible_ || !this.onBeforeHide_(a)) {
    return false
  }
  this.handler_ && this.handler_.removeAll();
  this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.shouldHideAsync_ ? goog.Timer.callOnce(this.hidePopupElement_, 0, this) : this.hidePopupElement_() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.moveOffscreen_();
  this.isVisible_ = false;
  this.onHide_(a);
  return true
};
goog.ui.PopupBase.prototype.showPopupElement = function() {
  this.element_.style.visibility = "visible";
  goog.style.showElement(this.element_, true)
};
goog.ui.PopupBase.prototype.hidePopupElement_ = function() {
  this.element_.style.visibility = "hidden";
  goog.style.showElement(this.element_, false)
};
goog.ui.PopupBase.prototype.moveOffscreen_ = function() {
  this.element_.style.left = "-200px";
  this.element_.style.top = "-200px"
};
goog.ui.PopupBase.prototype.onBeforeShow = function() {
  return this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)
};
goog.ui.PopupBase.prototype.onShow_ = function() {
  this.lastShowTime_ = goog.now();
  this.lastHideTime_ = -1;
  this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)
};
goog.ui.PopupBase.prototype.onBeforeHide_ = function(a) {
  return this.dispatchEvent({type:goog.ui.PopupBase.EventType.BEFORE_HIDE, target:a})
};
goog.ui.PopupBase.prototype.onHide_ = function(a) {
  this.lastHideTime_ = goog.now();
  this.dispatchEvent({type:goog.ui.PopupBase.EventType.HIDE, target:a})
};
goog.ui.PopupBase.prototype.onDocumentMouseDown_ = function(a) {
  a = a.target;
  !goog.dom.contains(this.element_, a) && (!this.autoHideRegion_ || goog.dom.contains(this.autoHideRegion_, a)) && !this.shouldDebounce_() && this.hide_(a)
};
goog.ui.PopupBase.prototype.onDocumentKeyDown_ = function(a) {
  a.keyCode == goog.events.KeyCodes.ESC && this.hide_(a.target) && (a.preventDefault(), a.stopPropagation())
};
goog.ui.PopupBase.prototype.onDocumentBlur_ = function(a) {
  if(this.enableCrossIframeDismissal_) {
    var b = goog.dom.getOwnerDocument(this.element_);
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if((a = b.activeElement) && goog.dom.contains(this.element_, a)) {
        return
      }
    }else {
      if(a.target != b) {
        return
      }
    }
    this.shouldDebounce_() || this.hide_()
  }
};
goog.ui.PopupBase.prototype.shouldDebounce_ = function() {
  return goog.now() - this.lastShowTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.disposeInternal = function() {
  goog.ui.PopupBase.superClass_.disposeInternal.call(this);
  this.handler_.dispose();
  delete this.element_;
  delete this.handler_
};
goog.ui.editor.Bubble = function(a, b) {
  goog.events.EventTarget.call(this);
  this.dom_ = new goog.dom.getDomHelper(a);
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.viewPortSizeMonitor_ = new goog.dom.ViewportSizeMonitor(this.dom_.getWindow());
  this.panels_ = {};
  this.bubbleContainer_ = this.dom_.createDom(goog.dom.TagName.DIV, {className:goog.ui.editor.Bubble.BUBBLE_CLASSNAME});
  goog.style.showElement(this.bubbleContainer_, false);
  goog.dom.appendChild(a, this.bubbleContainer_);
  goog.style.setStyle(this.bubbleContainer_, "zIndex", b);
  this.bubbleContents_ = this.createBubbleDom(this.dom_, this.bubbleContainer_);
  this.closeBox_ = this.dom_.createDom(goog.dom.TagName.DIV, {className:"tr_bubble_closebox", innerHTML:"&nbsp;"});
  this.bubbleContents_.appendChild(this.closeBox_);
  goog.editor.style.makeUnselectable(this.bubbleContainer_, this.eventHandler_);
  this.popup_ = new goog.ui.PopupBase(this.bubbleContainer_)
};
goog.inherits(goog.ui.editor.Bubble, goog.events.EventTarget);
goog.ui.editor.Bubble.BUBBLE_CLASSNAME = "tr_bubble";
goog.ui.editor.Bubble.prototype.createBubbleDom = function(a, b) {
  return b
};
goog.ui.editor.Bubble.prototype.logger = goog.debug.Logger.getLogger("goog.ui.editor.Bubble");
goog.ui.editor.Bubble.prototype.disposeInternal = function() {
  goog.ui.editor.Bubble.superClass_.disposeInternal.call(this);
  goog.dom.removeNode(this.bubbleContainer_);
  this.bubbleContainer_ = null;
  this.eventHandler_.dispose();
  this.eventHandler_ = null;
  this.viewPortSizeMonitor_.dispose();
  this.viewPortSizeMonitor_ = null
};
goog.ui.editor.Bubble.prototype.getContentElement = function() {
  return this.bubbleContents_
};
goog.ui.editor.Bubble.prototype.getContainerElement = function() {
  return this.bubbleContainer_
};
goog.ui.editor.Bubble.prototype.getEventHandler = function() {
  return this.eventHandler_
};
goog.ui.editor.Bubble.prototype.handleWindowResize_ = function() {
  this.isVisible() && this.reposition()
};
goog.ui.editor.Bubble.prototype.hasPanelOfType = function(a) {
  return goog.object.some(this.panels_, function(b) {
    return b.type == a
  })
};
goog.ui.editor.Bubble.prototype.addPanel = function(a, b, c, d, e) {
  var f = goog.string.createUniqueString(), b = new goog.ui.editor.Bubble.Panel_(this.dom_, f, a, b, c, !e);
  this.panels_[f] = b;
  for(var g, c = 0, e = this.bubbleContents_.childNodes.length - 1;c < e;c++) {
    var h = this.bubbleContents_.childNodes[c];
    if(this.panels_[h.id].type > a) {
      g = h;
      break
    }
  }
  goog.dom.insertSiblingBefore(b.element, g || this.bubbleContents_.lastChild);
  d(b.getContentElement());
  goog.editor.style.makeUnselectable(b.element, this.eventHandler_);
  a = goog.object.getCount(this.panels_);
  a == 1 ? this.openBubble_() : a == 2 && goog.dom.classes.add(this.bubbleContainer_, "tr_multi_bubble");
  this.reposition();
  return f
};
goog.ui.editor.Bubble.prototype.removePanel = function(a) {
  goog.dom.removeNode(this.panels_[a].element);
  delete this.panels_[a];
  a = goog.object.getCount(this.panels_);
  a <= 1 && goog.dom.classes.remove(this.bubbleContainer_, "tr_multi_bubble");
  a == 0 ? this.closeBubble_() : this.reposition()
};
goog.ui.editor.Bubble.prototype.openBubble_ = function() {
  this.eventHandler_.listen(this.closeBox_, goog.events.EventType.CLICK, this.closeBubble_).listen(this.viewPortSizeMonitor_, goog.events.EventType.RESIZE, this.handleWindowResize_).listen(this.popup_, goog.ui.PopupBase.EventType.HIDE, this.handlePopupHide);
  this.popup_.setVisible(true);
  this.reposition()
};
goog.ui.editor.Bubble.prototype.closeBubble_ = function() {
  this.popup_.setVisible(false)
};
goog.ui.editor.Bubble.prototype.handlePopupHide = function() {
  for(var a in this.panels_) {
    goog.dom.removeNode(this.panels_[a].element)
  }
  this.panels_ = {};
  goog.dom.classes.remove(this.bubbleContainer_, "tr_multi_bubble");
  this.eventHandler_.removeAll();
  this.dispatchEvent(goog.ui.Component.EventType.HIDE)
};
goog.ui.editor.Bubble.prototype.isVisible = function() {
  return this.popup_.isVisible()
};
goog.ui.editor.Bubble.VERTICAL_CLEARANCE_ = goog.userAgent.IE ? 4 : 2;
goog.ui.editor.Bubble.MARGIN_BOX_ = new goog.math.Box(goog.ui.editor.Bubble.VERTICAL_CLEARANCE_, 0, goog.ui.editor.Bubble.VERTICAL_CLEARANCE_, 0);
goog.ui.editor.Bubble.prototype.reposition = function() {
  var a = null, b = true, c;
  for(c in this.panels_) {
    var d = this.panels_[c], a = d.targetElement, b = b && d.preferBottomPosition
  }
  c = goog.positioning.OverflowStatus.FAILED;
  a = goog.style.isRightToLeft(this.bubbleContainer_) != goog.style.isRightToLeft(a);
  b && (c = this.positionAtAnchor_(a ? goog.positioning.Corner.BOTTOM_END : goog.positioning.Corner.BOTTOM_START, goog.positioning.Corner.TOP_START, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y));
  c & goog.positioning.OverflowStatus.FAILED && (c = this.positionAtAnchor_(a ? goog.positioning.Corner.TOP_END : goog.positioning.Corner.TOP_START, goog.positioning.Corner.BOTTOM_START, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y));
  c & goog.positioning.OverflowStatus.FAILED && (c = this.positionAtAnchor_(a ? goog.positioning.Corner.BOTTOM_END : goog.positioning.Corner.BOTTOM_START, goog.positioning.Corner.TOP_START, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y), c & goog.positioning.OverflowStatus.FAILED && this.logger.warning("reposition(): positionAtAnchor() failed with " + c))
};
goog.ui.editor.Bubble.prototype.positionAtAnchor_ = function(a, b, c) {
  var d = null, e;
  for(e in this.panels_) {
    var f = this.panels_[e].targetElement;
    if(!d || goog.dom.contains(f, d)) {
      d = this.panels_[e].targetElement
    }
  }
  return goog.positioning.positionAtAnchor(d, a, this.bubbleContainer_, b, null, goog.ui.editor.Bubble.MARGIN_BOX_, c)
};
goog.ui.editor.Bubble.Panel_ = function(a, b, c, d, e, f) {
  this.type = c;
  this.targetElement = e;
  this.preferBottomPosition = f;
  this.element = a.createDom(goog.dom.TagName.DIV, {className:"tr_bubble_panel", id:b}, a.createDom(goog.dom.TagName.DIV, {className:"tr_bubble_panel_title"}, d + ":"), a.createDom(goog.dom.TagName.DIV, {className:"tr_bubble_panel_content"}))
};
goog.ui.editor.Bubble.Panel_.prototype.getContentElement = function() {
  return this.element.lastChild
};
goog.editor.plugins.AbstractTabHandler = function() {
  goog.editor.Plugin.call(this)
};
goog.inherits(goog.editor.plugins.AbstractTabHandler, goog.editor.Plugin);
goog.editor.plugins.AbstractTabHandler.prototype.handleKeyboardShortcut = function(a) {
  return goog.userAgent.GECKO && this.fieldObject.inModalMode() ? false : a.keyCode == goog.events.KeyCodes.TAB && !a.metaKey && !a.ctrlKey ? this.handleTabKey(a) : false
};
goog.editor.plugins.ListTabHandler = function() {
  goog.editor.plugins.AbstractTabHandler.call(this)
};
goog.inherits(goog.editor.plugins.ListTabHandler, goog.editor.plugins.AbstractTabHandler);
goog.editor.plugins.ListTabHandler.prototype.getTrogClassId = function() {
  return"ListTabHandler"
};
goog.editor.plugins.ListTabHandler.prototype.handleTabKey = function(a) {
  var b = this.fieldObject.getRange();
  return goog.dom.getAncestorByTagNameAndClass(b.getContainerElement(), goog.dom.TagName.LI) || goog.iter.some(b, function(a) {
    return a.tagName == goog.dom.TagName.LI
  }) ? (this.fieldObject.execCommand(a.shiftKey ? goog.editor.Command.OUTDENT : goog.editor.Command.INDENT), a.preventDefault(), true) : false
};
goog.editor.plugins.AbstractBubblePlugin = function() {
  goog.editor.Plugin.call(this);
  this.eventRegister = new goog.events.EventHandler(this)
};
goog.inherits(goog.editor.plugins.AbstractBubblePlugin, goog.editor.Plugin);
goog.editor.plugins.AbstractBubblePlugin.OPTION_LINK_CLASSNAME_ = "tr_option-link";
goog.editor.plugins.AbstractBubblePlugin.LINK_CLASSNAME_ = "tr_bubble_link";
goog.editor.plugins.AbstractBubblePlugin.DASH_NBSP_STRING = goog.string.Unicode.NBSP + "-" + goog.string.Unicode.NBSP;
goog.editor.plugins.AbstractBubblePlugin.defaultBubbleFactory_ = function(a, b) {
  return new goog.ui.editor.Bubble(a, b)
};
goog.editor.plugins.AbstractBubblePlugin.bubbleFactory_ = goog.editor.plugins.AbstractBubblePlugin.defaultBubbleFactory_;
goog.editor.plugins.AbstractBubblePlugin.setBubbleFactory = function(a) {
  goog.editor.plugins.AbstractBubblePlugin.bubbleFactory_ = a
};
goog.editor.plugins.AbstractBubblePlugin.bubbleMap_ = {};
goog.editor.plugins.AbstractBubblePlugin.prototype.panelId_ = null;
goog.editor.plugins.AbstractBubblePlugin.prototype.setBubbleParent = function(a) {
  this.bubbleParent_ = a
};
goog.editor.plugins.AbstractBubblePlugin.prototype.getBubbleDom = function() {
  return this.dom_
};
goog.editor.plugins.AbstractBubblePlugin.prototype.getTrogClassId = goog.functions.constant("AbstractBubblePlugin");
goog.editor.plugins.AbstractBubblePlugin.prototype.getTargetElement = function() {
  return this.targetElement_
};
goog.editor.plugins.AbstractBubblePlugin.prototype.handleKeyUp = function() {
  this.isVisible() && this.handleSelectionChange();
  return false
};
goog.editor.plugins.AbstractBubblePlugin.prototype.handleSelectionChange = function(a, b) {
  var c;
  if(a) {
    c = a.target
  }else {
    if(b) {
      c = b
    }else {
      var d = this.fieldObject.getRange();
      if(d) {
        var e = d.getStartNode(), f = d.getEndNode(), g = d.getStartOffset(), h = d.getEndOffset();
        goog.userAgent.IE && d.isCollapsed() && e != f && (d = goog.dom.Range.createCaret(e, g));
        e.nodeType == goog.dom.NodeType.ELEMENT && e == f && g == h - 1 && (e = e.childNodes[g], e.nodeType == goog.dom.NodeType.ELEMENT && (c = e))
      }
      c = c || d && d.getContainerElement()
    }
  }
  return this.handleSelectionChangeInternal_(c)
};
goog.editor.plugins.AbstractBubblePlugin.prototype.handleSelectionChangeInternal_ = function(a) {
  if(a && (a = this.getBubbleTargetFromSelection(a))) {
    if(a != this.targetElement_ || !this.panelId_) {
      this.panelId_ && this.closeBubble(), this.createBubble(a)
    }
    return false
  }
  this.panelId_ && this.closeBubble();
  return false
};
goog.editor.plugins.AbstractBubblePlugin.prototype.disable = function(a) {
  if(a.isUneditable()) {
    var b = goog.editor.plugins.AbstractBubblePlugin.bubbleMap_[a.id];
    b && (b.dispose(), delete goog.editor.plugins.AbstractBubblePlugin.bubbleMap_[a.id])
  }
};
goog.editor.plugins.AbstractBubblePlugin.prototype.getSharedBubble_ = function() {
  var a = this.bubbleParent_ || this.fieldObject.getAppWindow().document.body;
  this.dom_ = new goog.dom.getDomHelper(a);
  var b = goog.editor.plugins.AbstractBubblePlugin.bubbleMap_[this.fieldObject.id];
  b || (b = goog.editor.plugins.AbstractBubblePlugin.bubbleFactory_.call(null, a, this.fieldObject.getBaseZindex()), goog.editor.plugins.AbstractBubblePlugin.bubbleMap_[this.fieldObject.id] = b);
  return b
};
goog.editor.plugins.AbstractBubblePlugin.prototype.createBubble = function(a) {
  var b = this.getSharedBubble_();
  if(!b.hasPanelOfType(this.getBubbleType())) {
    this.targetElement_ = a, this.panelId_ = b.addPanel(this.getBubbleType(), this.getBubbleTitle(), a, goog.bind(this.createBubbleContents, this), this.shouldPreferBubbleAboveElement()), this.eventRegister.listen(b, goog.ui.Component.EventType.HIDE, this.handlePanelClosed_), this.onShow()
  }
};
goog.editor.plugins.AbstractBubblePlugin.prototype.getBubbleType = function() {
  return""
};
goog.editor.plugins.AbstractBubblePlugin.prototype.getBubbleTitle = function() {
  return""
};
goog.editor.plugins.AbstractBubblePlugin.prototype.shouldPreferBubbleAboveElement = goog.functions.FALSE;
goog.editor.plugins.AbstractBubblePlugin.prototype.registerClickHandler = function(a, b) {
  this.eventRegister.listen(a, goog.events.EventType.CLICK, b)
};
goog.editor.plugins.AbstractBubblePlugin.prototype.closeBubble = function() {
  this.panelId_ && (this.getSharedBubble_().removePanel(this.panelId_), this.handlePanelClosed_())
};
goog.editor.plugins.AbstractBubblePlugin.prototype.onShow = goog.nullFunction;
goog.editor.plugins.AbstractBubblePlugin.prototype.handlePanelClosed_ = function() {
  this.panelId_ = this.targetElement_ = null;
  this.eventRegister.removeAll()
};
goog.editor.plugins.AbstractBubblePlugin.prototype.isVisible = function() {
  return!!this.panelId_
};
goog.editor.plugins.AbstractBubblePlugin.prototype.reposition = function() {
  var a = this.getSharedBubble_();
  a && a.reposition()
};
goog.editor.plugins.AbstractBubblePlugin.prototype.createLinkOption = function(a) {
  return this.dom_.createDom(goog.dom.TagName.SPAN, {id:a, className:goog.editor.plugins.AbstractBubblePlugin.OPTION_LINK_CLASSNAME_}, this.dom_.createTextNode(goog.editor.plugins.AbstractBubblePlugin.DASH_NBSP_STRING))
};
goog.editor.plugins.AbstractBubblePlugin.prototype.createLink = function(a, b, c, d) {
  a = this.createLinkHelper(a, b, false, d);
  c && this.registerClickHandler(a, c);
  return a
};
goog.editor.plugins.AbstractBubblePlugin.prototype.createLinkHelper = function(a, b, c, d) {
  b = this.dom_.createDom(c ? goog.dom.TagName.A : goog.dom.TagName.SPAN, {className:goog.editor.plugins.AbstractBubblePlugin.LINK_CLASSNAME_}, b);
  this.setupLink(b, a, d);
  goog.editor.style.makeUnselectable(b, this.eventRegister);
  return b
};
goog.editor.plugins.AbstractBubblePlugin.prototype.setupLink = function(a, b, c) {
  c ? c.appendChild(a) : (c = this.dom_.getElement(b)) && goog.dom.replaceNode(a, c);
  a.id = b
};
goog.ui.editor.ToolbarController = function(a, b) {
  goog.events.EventTarget.call(this);
  this.handler_ = new goog.events.EventHandler(this);
  this.field_ = a;
  this.toolbar_ = b;
  this.queryCommands_ = [];
  this.toolbar_.forEachChild(function(a) {
    a.queryable && this.queryCommands_.push(this.getComponentId(a.getId()))
  }, this);
  this.toolbar_.setFocusable(false);
  this.handler_.listen(this.field_, goog.editor.Field.EventType.COMMAND_VALUE_CHANGE, this.updateToolbar).listen(this.toolbar_, goog.ui.Component.EventType.ACTION, this.handleAction)
};
goog.inherits(goog.ui.editor.ToolbarController, goog.events.EventTarget);
goog.ui.editor.ToolbarController.prototype.getComponentId = function(a) {
  return a
};
goog.ui.editor.ToolbarController.prototype.getCommand = function(a) {
  return a
};
goog.ui.editor.ToolbarController.prototype.getHandler = function() {
  return this.handler_
};
goog.ui.editor.ToolbarController.prototype.getField = function() {
  return this.field_
};
goog.ui.editor.ToolbarController.prototype.getToolbar = function() {
  return this.toolbar_
};
goog.ui.editor.ToolbarController.prototype.isVisible = function() {
  return this.toolbar_.isVisible()
};
goog.ui.editor.ToolbarController.prototype.setVisible = function(a) {
  this.toolbar_.setVisible(a)
};
goog.ui.editor.ToolbarController.prototype.isEnabled = function() {
  return this.toolbar_.isEnabled()
};
goog.ui.editor.ToolbarController.prototype.setEnabled = function(a) {
  this.toolbar_.setEnabled(a)
};
goog.ui.editor.ToolbarController.prototype.blur = function() {
  this.toolbar_.handleBlur(null)
};
goog.ui.editor.ToolbarController.prototype.disposeInternal = function() {
  goog.ui.editor.ToolbarController.superClass_.disposeInternal.call(this);
  this.handler_ && (this.handler_.dispose(), delete this.handler_);
  this.toolbar_ && (this.toolbar_.dispose(), delete this.toolbar_);
  delete this.field_;
  delete this.queryCommands_
};
goog.ui.editor.ToolbarController.prototype.updateToolbar = function(a) {
  if(this.toolbar_.isEnabled() && this.dispatchEvent(goog.ui.Component.EventType.CHANGE)) {
    var b;
    try {
      b = this.field_.queryCommandValue(a.commands || this.queryCommands_)
    }catch(c) {
      b = {}
    }
    this.updateToolbarFromState(b)
  }
};
goog.ui.editor.ToolbarController.prototype.updateToolbarFromState = function(a) {
  for(var b in a) {
    var c = this.toolbar_.getChild(this.getComponentId(b));
    if(c) {
      var d = a[b];
      c.updateFromValue ? c.updateFromValue(d) : c.setChecked(!!d)
    }
  }
};
goog.ui.editor.ToolbarController.prototype.handleAction = function(a) {
  this.field_.execCommand(this.getCommand(a.target.getId()), a.target.getValue())
};
goog.dom.NodeOffset = function(a, b) {
  goog.Disposable.call(this);
  this.offsetStack_ = [];
  for(this.nameStack_ = [];a && a.nodeName != goog.dom.TagName.BODY && a != b;) {
    for(var c = 0, d = a.previousSibling;d;) {
      d = d.previousSibling, ++c
    }
    this.offsetStack_.unshift(c);
    this.nameStack_.unshift(a.nodeName);
    a = a.parentNode
  }
};
goog.inherits(goog.dom.NodeOffset, goog.Disposable);
goog.dom.NodeOffset.prototype.toString = function() {
  for(var a = [], b, c = 0;b = this.nameStack_[c];c++) {
    a.push(this.offsetStack_[c] + "," + b)
  }
  return a.join("\n")
};
goog.dom.NodeOffset.prototype.findTargetNode = function(a) {
  for(var b = a, c = 0;a = this.nameStack_[c];++c) {
    if(b = b.childNodes[this.offsetStack_[c]], !b || b.nodeName != a) {
      return null
    }
  }
  return b
};
goog.dom.NodeOffset.prototype.disposeInternal = function() {
  delete this.offsetStack_;
  delete this.nameStack_
};
goog.editor.plugins.UndoRedoState = function(a) {
  this.asynchronous_ = a
};
goog.inherits(goog.editor.plugins.UndoRedoState, goog.events.EventTarget);
goog.editor.plugins.UndoRedoState.ACTION_COMPLETED = "action_completed";
goog.editor.plugins.UndoRedoState.prototype.isAsynchronous = function() {
  return this.asynchronous_
};
goog.editor.plugins.UndoRedoManager = function() {
  goog.events.EventTarget.call(this);
  this.maxUndoDepth_ = 100;
  this.undoStack_ = [];
  this.redoStack_ = [];
  this.pendingActions_ = []
};
goog.inherits(goog.editor.plugins.UndoRedoManager, goog.events.EventTarget);
goog.editor.plugins.UndoRedoManager.EventType = {STATE_CHANGE:"state_change", STATE_ADDED:"state_added", BEFORE_UNDO:"before_undo", BEFORE_REDO:"before_redo"};
goog.editor.plugins.UndoRedoManager.prototype.inProgressActionKey_ = null;
goog.editor.plugins.UndoRedoManager.prototype.setMaxUndoDepth = function(a) {
  this.maxUndoDepth_ = a
};
goog.editor.plugins.UndoRedoManager.prototype.addState = function(a) {
  if(this.undoStack_.length == 0 || !a.equals(this.undoStack_[this.undoStack_.length - 1])) {
    this.undoStack_.push(a);
    this.undoStack_.length > this.maxUndoDepth_ && this.undoStack_.shift();
    var b = this.redoStack_.length;
    this.redoStack_.length = 0;
    this.dispatchEvent({type:goog.editor.plugins.UndoRedoManager.EventType.STATE_ADDED, state:a});
    (this.undoStack_.length == 1 || b) && this.dispatchStateChange_()
  }
};
goog.editor.plugins.UndoRedoManager.prototype.dispatchStateChange_ = function() {
  this.dispatchEvent(goog.editor.plugins.UndoRedoManager.EventType.STATE_CHANGE)
};
goog.editor.plugins.UndoRedoManager.prototype.undo = function() {
  this.shiftState_(this.undoStack_, this.redoStack_)
};
goog.editor.plugins.UndoRedoManager.prototype.redo = function() {
  this.shiftState_(this.redoStack_, this.undoStack_)
};
goog.editor.plugins.UndoRedoManager.prototype.hasUndoState = function() {
  return this.undoStack_.length > 0
};
goog.editor.plugins.UndoRedoManager.prototype.hasRedoState = function() {
  return this.redoStack_.length > 0
};
goog.editor.plugins.UndoRedoManager.prototype.shiftState_ = function(a, b) {
  if(a.length) {
    var c = a.pop();
    b.push(c);
    this.addAction_({type:a == this.undoStack_ ? goog.editor.plugins.UndoRedoManager.EventType.BEFORE_UNDO : goog.editor.plugins.UndoRedoManager.EventType.BEFORE_REDO, func:a == this.undoStack_ ? c.undo : c.redo, state:c});
    (a.length == 0 || b.length == 1) && this.dispatchStateChange_()
  }
};
goog.editor.plugins.UndoRedoManager.prototype.addAction_ = function(a) {
  this.pendingActions_.push(a);
  this.pendingActions_.length == 1 && this.doAction_()
};
goog.editor.plugins.UndoRedoManager.prototype.doAction_ = function() {
  if(!(this.inProgressActionKey_ || this.pendingActions_.length == 0)) {
    var a = this.pendingActions_.shift();
    if(this.dispatchEvent({type:a.type, state:a.state})) {
      a.state.isAsynchronous() ? (this.inProgressActionKey_ = goog.events.listen(a.state, goog.editor.plugins.UndoRedoState.ACTION_COMPLETED, this.finishAction_, false, this), a.func.call(a.state)) : (a.func.call(a.state), this.doAction_())
    }
  }
};
goog.editor.plugins.UndoRedoManager.prototype.finishAction_ = function() {
  goog.events.unlistenByKey(this.inProgressActionKey_);
  this.inProgressActionKey_ = null;
  this.doAction_()
};
goog.editor.plugins.UndoRedoManager.prototype.clearHistory = function() {
  if(this.undoStack_.length > 0 || this.redoStack_.length > 0) {
    this.undoStack_.length = 0, this.redoStack_.length = 0, this.dispatchStateChange_()
  }
};
goog.editor.plugins.UndoRedoManager.prototype.undoPeek = function() {
  return this.undoStack_[this.undoStack_.length - 1]
};
goog.editor.plugins.UndoRedoManager.prototype.redoPeek = function() {
  return this.redoStack_[this.redoStack_.length - 1]
};
goog.editor.plugins.UndoRedo = function(a) {
  goog.editor.Plugin.call(this);
  this.setUndoRedoManager(a || new goog.editor.plugins.UndoRedoManager);
  this.eventHandlers_ = {};
  this.currentStates_ = {};
  this.initialFieldChange_ = null;
  this.boundRestoreState_ = goog.bind(this.restoreState, this)
};
goog.inherits(goog.editor.plugins.UndoRedo, goog.editor.Plugin);
goog.editor.plugins.UndoRedo.prototype.logger = goog.debug.Logger.getLogger("goog.editor.plugins.UndoRedo");
goog.editor.plugins.UndoRedo.prototype.inProgressUndo_ = null;
goog.editor.plugins.UndoRedo.COMMAND = {UNDO:"+undo", REDO:"+redo"};
goog.editor.plugins.UndoRedo.SUPPORTED_COMMANDS_ = goog.object.transpose(goog.editor.plugins.UndoRedo.COMMAND);
goog.editor.plugins.UndoRedo.prototype.setMaxUndoDepth = function(a) {
  this.undoManager_.setMaxUndoDepth(a)
};
goog.editor.plugins.UndoRedo.prototype.setUndoRedoManager = function(a) {
  this.managerStateChangeKey_ && goog.events.unlistenByKey(this.managerStateChangeKey_);
  this.undoManager_ = a;
  this.managerStateChangeKey_ = goog.events.listen(this.undoManager_, goog.editor.plugins.UndoRedoManager.EventType.STATE_CHANGE, this.dispatchCommandValueChange_, false, this)
};
goog.editor.plugins.UndoRedo.prototype.isSupportedCommand = function(a) {
  return a in goog.editor.plugins.UndoRedo.SUPPORTED_COMMANDS_
};
goog.editor.plugins.UndoRedo.prototype.registerFieldObject = function(a) {
  this.fieldObject = a
};
goog.editor.plugins.UndoRedo.prototype.unregisterFieldObject = function(a) {
  this.disable(a);
  this.fieldObject = null
};
goog.editor.plugins.UndoRedo.prototype.getCurrentFieldObject = function() {
  return this.fieldObject
};
goog.editor.plugins.UndoRedo.prototype.getFieldObject = function() {
  return this.fieldObject
};
goog.editor.plugins.UndoRedo.prototype.getCurrentEventTarget = function() {
  return this.fieldObject
};
goog.editor.plugins.UndoRedo.prototype.enable = function(a) {
  if(!this.isEnabled(a)) {
    a.clearDelayedChange();
    var b = new goog.events.EventHandler(this);
    goog.editor.BrowserFeature.USE_MUTATION_EVENTS || b.listen(a, goog.editor.Field.EventType.BEFORECHANGE, this.handleBeforeChange_);
    b.listen(a, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
    b.listen(a, goog.editor.Field.EventType.BLUR, this.handleBlur_);
    this.eventHandlers_[a.getHashCode()] = b;
    this.updateCurrentState_(a)
  }
};
goog.editor.plugins.UndoRedo.prototype.disable = function(a) {
  a.clearDelayedChange();
  var b = this.eventHandlers_[a.getHashCode()];
  b && (b.dispose(), delete this.eventHandlers_[a.getHashCode()]);
  this.currentStates_[a.getHashCode()] && delete this.currentStates_[a.getHashCode()]
};
goog.editor.plugins.UndoRedo.prototype.isEnabled = function(a) {
  return!!this.eventHandlers_[a.getHashCode()]
};
goog.editor.plugins.UndoRedo.prototype.disposeInternal = function() {
  goog.editor.plugins.UndoRedo.superClass_.disposeInternal.call(this);
  for(var a in this.eventHandlers_) {
    this.eventHandlers_[a].dispose(), delete this.eventHandlers_[a]
  }
  this.fieldObject = null;
  this.undoManager_ && (this.undoManager_.dispose(), delete this.undoManager_)
};
goog.editor.plugins.UndoRedo.prototype.getTrogClassId = function() {
  return"UndoRedo"
};
goog.editor.plugins.UndoRedo.prototype.execCommand = function(a) {
  a == goog.editor.plugins.UndoRedo.COMMAND.UNDO ? this.undoManager_.undo() : a == goog.editor.plugins.UndoRedo.COMMAND.REDO && this.undoManager_.redo()
};
goog.editor.plugins.UndoRedo.prototype.queryCommandValue = function(a) {
  var b = null;
  a == goog.editor.plugins.UndoRedo.COMMAND.UNDO ? b = this.undoManager_.hasUndoState() : a == goog.editor.plugins.UndoRedo.COMMAND.REDO && (b = this.undoManager_.hasRedoState());
  return b
};
goog.editor.plugins.UndoRedo.prototype.dispatchCommandValueChange_ = function() {
  this.getCurrentEventTarget().dispatchEvent({type:goog.editor.Field.EventType.COMMAND_VALUE_CHANGE, commands:[goog.editor.plugins.UndoRedo.COMMAND.REDO, goog.editor.plugins.UndoRedo.COMMAND.UNDO]})
};
goog.editor.plugins.UndoRedo.prototype.restoreState = function(a, b, c) {
  var d = this.getFieldObject(a.fieldHashCode);
  if(d) {
    d.stopChangeEvents(true, true);
    try {
      d.dispatchBeforeChange();
      d.execCommand(goog.editor.Command.CLEAR_LOREM, true);
      d.getElement().innerHTML = b;
      c && c.select();
      var e = this.getCurrentFieldObject();
      d.focus();
      e && e.getHashCode() != a.fieldHashCode && e.execCommand(goog.editor.Command.UPDATE_LOREM);
      this.currentStates_[a.fieldHashCode].setUndoState(b, c)
    }catch(f) {
      this.logger.severe("Error while restoring undo state", f)
    }finally {
      this.inProgressUndo_ = a, d.dispatchChange(), d.dispatchSelectionChangeEvent()
    }
  }
};
goog.editor.plugins.UndoRedo.prototype.handleKeyboardShortcut = function(a, b, c) {
  if(c) {
    var d;
    if(b == "z") {
      d = a.shiftKey ? goog.editor.plugins.UndoRedo.COMMAND.REDO : goog.editor.plugins.UndoRedo.COMMAND.UNDO
    }else {
      if(b == "y") {
        d = goog.editor.plugins.UndoRedo.COMMAND.REDO
      }
    }
    if(d) {
      return(a = d == goog.editor.plugins.UndoRedo.COMMAND.UNDO ? this.undoManager_.undoPeek() : this.undoManager_.redoPeek()) && a.fieldHashCode ? this.getCurrentFieldObject().execCommand(d) : this.execCommand(d), true
    }
  }
  return false
};
goog.editor.plugins.UndoRedo.prototype.clearHistory = function() {
  this.fieldObject.stopChangeEvents(true, true);
  this.undoManager_.clearHistory();
  this.fieldObject.startChangeEvents()
};
goog.editor.plugins.UndoRedo.prototype.refreshCurrentState = function(a) {
  this.isEnabled(a) && (this.currentStates_[a.getHashCode()] && delete this.currentStates_[a.getHashCode()], this.updateCurrentState_(a))
};
goog.editor.plugins.UndoRedo.prototype.handleBeforeChange_ = function(a) {
  if(!this.inProgressUndo_) {
    var a = a.target, b = a.getHashCode();
    if(this.initialFieldChange_ != b) {
      this.initialFieldChange_ = b, this.updateCurrentState_(a)
    }
  }
};
goog.editor.plugins.UndoRedo.prototype.handleDelayedChange_ = function(a) {
  this.inProgressUndo_ ? (a = this.inProgressUndo_, this.inProgressUndo_ = null, a.dispatchEvent(goog.editor.plugins.UndoRedoState.ACTION_COMPLETED)) : this.updateCurrentState_(a.target)
};
goog.editor.plugins.UndoRedo.prototype.handleBlur_ = function(a) {
  (a = a.target) && a.clearDelayedChange()
};
goog.editor.plugins.UndoRedo.prototype.getCursorPosition_ = function(a) {
  a = new goog.editor.plugins.UndoRedo.CursorPosition_(a);
  return!a.isValid() ? null : a
};
goog.editor.plugins.UndoRedo.prototype.updateCurrentState_ = function(a) {
  var b = a.getHashCode(), c, d;
  a.queryCommandValue(goog.editor.Command.USING_LOREM) ? (c = "", d = null) : (c = a.getElement().innerHTML, d = this.getCursorPosition_(a));
  var e = this.currentStates_[b];
  if(e) {
    if(e.undoContent_ == c) {
      return
    }else {
      if(c == "" || e.undoContent_ == "") {
        if(a = a.getInjectableContents("", {}), c == a && e.undoContent_ == "" || e.undoContent_ == a && c == "") {
          return
        }
      }
    }
    e.setRedoState(c, d);
    this.undoManager_.addState(e)
  }
  this.currentStates_[b] = new goog.editor.plugins.UndoRedo.UndoState_(b, c, d, this.boundRestoreState_)
};
goog.editor.plugins.UndoRedo.UndoState_ = function(a, b, c, d) {
  goog.editor.plugins.UndoRedoState.call(this, true);
  this.fieldHashCode = a;
  this.restore_ = d;
  this.setUndoState(b, c)
};
goog.inherits(goog.editor.plugins.UndoRedo.UndoState_, goog.editor.plugins.UndoRedoState);
goog.editor.plugins.UndoRedo.UndoState_.prototype.undo = function() {
  this.restore_(this, this.undoContent_, this.undoCursorPosition_)
};
goog.editor.plugins.UndoRedo.UndoState_.prototype.redo = function() {
  this.restore_(this, this.redoContent_, this.redoCursorPosition_)
};
goog.editor.plugins.UndoRedo.UndoState_.prototype.setUndoState = function(a, b) {
  this.undoContent_ = a;
  this.undoCursorPosition_ = b
};
goog.editor.plugins.UndoRedo.UndoState_.prototype.setRedoState = function(a, b) {
  this.redoContent_ = a;
  this.redoCursorPosition_ = b
};
goog.editor.plugins.UndoRedo.UndoState_.prototype.equals = function(a) {
  return this.fieldHashCode == a.fieldHashCode && this.undoContent_ == a.undoContent_ && this.redoContent_ == a.redoContent_
};
goog.editor.plugins.UndoRedo.CursorPosition_ = function(a) {
  this.field_ = a;
  var b = a.getEditableDomHelper().getWindow(), a = (a = a.getRange()) && a.isRangeInDocument() && a.getWindow() == b ? a : null;
  goog.editor.BrowserFeature.HAS_W3C_RANGES ? this.initW3C_(a) : goog.editor.BrowserFeature.HAS_IE_RANGES && this.initIE_(a)
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.initW3C_ = function(a) {
  this.isValid_ = false;
  if(a) {
    var b = a.getAnchorNode(), c = a.getFocusNode();
    if(b && c) {
      var d = a.getAnchorOffset(), b = new goog.dom.NodeOffset(b, this.field_.getElement()), e = a.getFocusOffset(), c = new goog.dom.NodeOffset(c, this.field_.getElement());
      a.isReversed() ? (this.startOffset_ = c, this.startChildOffset_ = e, this.endOffset_ = b, this.endChildOffset_ = d) : (this.startOffset_ = b, this.startChildOffset_ = d, this.endOffset_ = c, this.endChildOffset_ = e);
      this.isValid_ = true
    }
  }
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.initIE_ = function(a) {
  this.isValid_ = false;
  if(a) {
    var b = a.getTextRange(0).getBrowserRangeObject();
    if(goog.dom.contains(this.field_.getElement(), b.parentElement())) {
      a = this.field_.getEditableDomHelper().getDocument().body.createTextRange();
      a.moveToElementText(this.field_.getElement());
      var c = b.duplicate();
      c.collapse(true);
      c.setEndPoint("StartToStart", a);
      this.startOffset_ = goog.editor.plugins.UndoRedo.CursorPosition_.computeEndOffsetIE_(c);
      b = b.duplicate();
      b.setEndPoint("StartToStart", a);
      this.endOffset_ = goog.editor.plugins.UndoRedo.CursorPosition_.computeEndOffsetIE_(b);
      this.isValid_ = true
    }
  }
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.isValid = function() {
  return this.isValid_
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.toString = function() {
  return goog.editor.BrowserFeature.HAS_W3C_RANGES ? "W3C:" + this.startOffset_.toString() + "\n" + this.startChildOffset_ + ":" + this.endOffset_.toString() + "\n" + this.endChildOffset_ : "IE:" + this.startOffset_ + "," + this.endOffset_
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.select = function() {
  var a = this.getRange_(this.field_.getElement());
  a && (goog.editor.BrowserFeature.HAS_IE_RANGES && this.field_.getElement().focus(), goog.dom.Range.createFromBrowserRange(a).select())
};
goog.editor.plugins.UndoRedo.CursorPosition_.prototype.getRange_ = function(a) {
  if(goog.editor.BrowserFeature.HAS_W3C_RANGES) {
    var b = this.startOffset_.findTargetNode(a), a = this.endOffset_.findTargetNode(a);
    return!b || !a ? null : goog.dom.Range.createFromNodes(b, this.startChildOffset_, a, this.endChildOffset_).getBrowserRangeObject()
  }
  b = a.ownerDocument.body.createTextRange();
  b.moveToElementText(a);
  b.collapse(true);
  b.moveEnd("character", this.endOffset_);
  b.moveStart("character", this.startOffset_);
  return b
};
goog.editor.plugins.UndoRedo.CursorPosition_.computeEndOffsetIE_ = function(a) {
  var b = a.duplicate(), c = a.text, d = c.length;
  b.collapse(true);
  b.moveEnd("character", d);
  for(var e, f = 10;e = b.compareEndPoints("EndToEnd", a);) {
    if(d -= e, b.moveEnd("character", -e), --f, 0 == f) {
      break
    }
  }
  a = 0;
  for(b = c.indexOf("\n\r");b != -1;) {
    ++a, b = c.indexOf("\n\r", b + 1)
  }
  return d + a
};
goog.editor.plugins.SpacesTabHandler = function() {
  goog.editor.plugins.AbstractTabHandler.call(this)
};
goog.inherits(goog.editor.plugins.SpacesTabHandler, goog.editor.plugins.AbstractTabHandler);
goog.editor.plugins.SpacesTabHandler.prototype.getTrogClassId = function() {
  return"SpacesTabHandler"
};
goog.editor.plugins.SpacesTabHandler.prototype.handleTabKey = function(a) {
  var b = this.getFieldDomHelper(), c = this.fieldObject.getRange();
  return!goog.editor.range.intersectsTag(c, goog.dom.TagName.LI) ? (a.shiftKey || (this.fieldObject.stopChangeEvents(true, true), c.isCollapsed() || (b.getDocument().execCommand("delete", false, null), c = this.fieldObject.getRange()), b = b.createDom("span", null, "\u00a0\u00a0 \u00a0"), b = c.insertNode(b, false), this.fieldObject.dispatchChange(), goog.editor.range.placeCursorNextTo(b, false), this.fieldObject.dispatchSelectionChangeEvent()), a.preventDefault(), true) : false
};
goog.editor.plugins.Blockquote = function(a, b) {
  goog.editor.Plugin.call(this);
  this.requiresClassNameToSplit_ = a;
  this.className_ = b || "tr_bq"
};
goog.inherits(goog.editor.plugins.Blockquote, goog.editor.Plugin);
goog.editor.plugins.Blockquote.SPLIT_COMMAND = "+splitBlockquote";
goog.editor.plugins.Blockquote.CLASS_ID = "Blockquote";
goog.editor.plugins.Blockquote.prototype.logger = goog.debug.Logger.getLogger("goog.editor.plugins.Blockquote");
goog.editor.plugins.Blockquote.prototype.getTrogClassId = function() {
  return goog.editor.plugins.Blockquote.CLASS_ID
};
goog.editor.plugins.Blockquote.prototype.isSilentCommand = goog.functions.TRUE;
goog.editor.plugins.Blockquote.isBlockquote = function(a, b, c, d) {
  if(a.tagName != goog.dom.TagName.BLOCKQUOTE) {
    return false
  }
  if(!c) {
    return b
  }
  a = goog.dom.classes.has(a, d);
  return b ? a : !a
};
goog.editor.plugins.Blockquote.findAndRemoveSingleChildAncestor_ = function(a, b) {
  var c = goog.editor.node.findHighestMatchingAncestor(a, function(a) {
    return a != b && a.childNodes.length == 1
  });
  c || (c = a);
  goog.dom.removeNode(c)
};
goog.editor.plugins.Blockquote.removeAllWhiteSpaceNodes_ = function(a) {
  for(var b = 0;b < a.length;++b) {
    goog.editor.node.isEmpty(a[b], true) && goog.dom.removeNode(a[b])
  }
};
goog.editor.plugins.Blockquote.prototype.isSetupBlockquote = function(a) {
  return goog.editor.plugins.Blockquote.isBlockquote(a, true, this.requiresClassNameToSplit_, this.className_)
};
goog.editor.plugins.Blockquote.prototype.isSupportedCommand = function(a) {
  return a == goog.editor.plugins.Blockquote.SPLIT_COMMAND
};
goog.editor.plugins.Blockquote.prototype.execCommandInternal = function(a, b) {
  if(a == goog.editor.plugins.Blockquote.SPLIT_COMMAND && b && (this.className_ || !this.requiresClassNameToSplit_)) {
    return goog.editor.BrowserFeature.HAS_W3C_RANGES ? this.splitQuotedBlockW3C_(b) : this.splitQuotedBlockIE_(b)
  }
};
goog.editor.plugins.Blockquote.prototype.splitQuotedBlockW3C_ = function(a) {
  var b = a.node, c = goog.editor.node.findTopMostEditableAncestor(b.parentNode, goog.bind(this.isSetupBlockquote, this)), d, e, f = false;
  c ? b.nodeType == goog.dom.NodeType.TEXT ? a.offset == b.length ? (d = b.nextSibling) && d.tagName == goog.dom.TagName.BR ? (b = d, d = d.nextSibling) : d = e = b.splitText(a.offset) : d = b.splitText(a.offset) : b.tagName == goog.dom.TagName.BR ? d = b.nextSibling : f = true : this.isSetupBlockquote(b) && (c = b, f = true);
  f && (b = this.insertEmptyTextNodeBeforeRange_(), d = this.insertEmptyTextNodeBeforeRange_());
  if(!c) {
    return false
  }
  d = goog.editor.node.splitDomTreeAt(b, d, c);
  goog.dom.insertSiblingAfter(d, c);
  a = this.getFieldDomHelper();
  b = this.fieldObject.queryCommandValue(goog.editor.Command.DEFAULT_TAG) || goog.dom.TagName.DIV;
  b = a.createElement(b);
  b.innerHTML = "&nbsp;";
  c.parentNode.insertBefore(b, d);
  a.getWindow().getSelection().collapse(b, 0);
  e && goog.editor.plugins.Blockquote.findAndRemoveSingleChildAncestor_(e, d);
  goog.editor.plugins.Blockquote.removeAllWhiteSpaceNodes_([c, d]);
  return true
};
goog.editor.plugins.Blockquote.prototype.insertEmptyTextNodeBeforeRange_ = function() {
  var a = this.fieldObject.getRange(), b = this.getFieldDomHelper().createTextNode("");
  a.insertNode(b, true);
  return b
};
goog.editor.plugins.Blockquote.prototype.splitQuotedBlockIE_ = function(a) {
  var b = this.getFieldDomHelper(), c = goog.editor.node.findTopMostEditableAncestor(a.parentNode, goog.bind(this.isSetupBlockquote, this));
  if(!c) {
    return false
  }
  var d = a.cloneNode(false);
  if(a.nextSibling && a.nextSibling.tagName == goog.dom.TagName.BR) {
    a = a.nextSibling
  }
  var e = goog.editor.node.splitDomTreeAt(a, d, c);
  goog.dom.insertSiblingAfter(e, c);
  var f = this.fieldObject.queryCommandValue(goog.editor.Command.DEFAULT_TAG) || goog.dom.TagName.DIV, f = b.createElement(f);
  c.parentNode.insertBefore(f, e);
  f.innerHTML = "&nbsp;";
  b = b.getDocument().selection.createRange();
  b.moveToElementText(a);
  b.move("character", 2);
  b.select();
  f.innerHTML = "";
  b.pasteHTML("");
  goog.editor.plugins.Blockquote.findAndRemoveSingleChildAncestor_(d, e);
  goog.editor.plugins.Blockquote.removeAllWhiteSpaceNodes_([c, e]);
  return true
};
goog.editor.plugins.EnterHandler = function() {
  goog.editor.Plugin.call(this)
};
goog.inherits(goog.editor.plugins.EnterHandler, goog.editor.Plugin);
goog.editor.plugins.EnterHandler.prototype.getTrogClassId = function() {
  return"EnterHandler"
};
goog.editor.plugins.EnterHandler.prototype.prepareContentsHtml = function(a) {
  return!a || goog.string.isBreakingWhitespace(a) ? goog.editor.BrowserFeature.COLLAPSES_EMPTY_NODES ? this.getNonCollapsingBlankHtml() : "" : a
};
goog.editor.plugins.EnterHandler.prototype.getNonCollapsingBlankHtml = goog.functions.constant("<br>");
goog.editor.plugins.EnterHandler.prototype.handleBackspaceInternal = function(a, b) {
  var c = this.fieldObject.getElement(), d = b && b.getStartNode();
  c.firstChild == d && goog.editor.node.isEmpty(d) && (a.preventDefault(), a.stopPropagation())
};
goog.editor.plugins.EnterHandler.prototype.processParagraphTagsInternal = function(a, b) {
  if(goog.userAgent.IE || goog.userAgent.OPERA) {
    this.ensureBlockIeOpera(goog.dom.TagName.DIV)
  }else {
    if(!b && goog.userAgent.WEBKIT) {
      var c = this.fieldObject.getRange();
      if(c && goog.editor.plugins.EnterHandler.isDirectlyInBlockquote(c.getContainerElement())) {
        var d = this.getFieldDomHelper(), e = d.createElement(goog.dom.TagName.BR);
        c.insertNode(e, true);
        goog.editor.node.isBlockTag(e.parentNode) && !goog.editor.node.skipEmptyTextNodes(e.nextSibling) && goog.dom.insertSiblingBefore(d.createElement(goog.dom.TagName.BR), e);
        goog.editor.range.placeCursorNextTo(e, false);
        a.preventDefault()
      }
    }
  }
};
goog.editor.plugins.EnterHandler.isDirectlyInBlockquote = function(a) {
  for(;a;a = a.parentNode) {
    if(goog.editor.node.isBlockTag(a)) {
      return a.tagName == goog.dom.TagName.BLOCKQUOTE
    }
  }
  return false
};
goog.editor.plugins.EnterHandler.prototype.handleDeleteGecko = function(a) {
  this.deleteBrGecko(a)
};
goog.editor.plugins.EnterHandler.prototype.deleteBrGecko = function(a) {
  var b = this.fieldObject.getRange();
  if(b.isCollapsed()) {
    var c = b.getEndNode();
    if(c.nodeType == goog.dom.NodeType.ELEMENT && (b = c.childNodes[b.getEndOffset()]) && b.tagName == goog.dom.TagName.BR) {
      var d = goog.editor.node.getPreviousSibling(b), e = b.nextSibling;
      c.removeChild(b);
      a.preventDefault();
      e && goog.editor.node.isBlockTag(e) && (d && !(d.tagName == goog.dom.TagName.BR || goog.editor.node.isBlockTag(d)) ? goog.dom.Range.createCaret(d, goog.editor.node.getLength(d)).select() : (a = goog.editor.node.getLeftMostLeaf(e), goog.dom.Range.createCaret(a, 0).select()))
    }
  }
};
goog.editor.plugins.EnterHandler.prototype.handleKeyPress = function(a) {
  if(goog.userAgent.GECKO && this.fieldObject.inModalMode()) {
    return false
  }
  if(a.keyCode == goog.events.KeyCodes.BACKSPACE) {
    this.handleBackspaceInternal(a, this.fieldObject.getRange())
  }else {
    if(a.keyCode == goog.events.KeyCodes.ENTER) {
      if(goog.userAgent.GECKO) {
        a.shiftKey || this.handleEnterGecko_(a)
      }else {
        this.fieldObject.dispatchBeforeChange();
        var b = this.deleteCursorSelection_(), c = !!this.fieldObject.execCommand(goog.editor.plugins.Blockquote.SPLIT_COMMAND, b);
        c && (a.preventDefault(), a.stopPropagation());
        this.releasePositionObject_(b);
        goog.userAgent.WEBKIT && this.handleEnterWebkitInternal(a);
        this.processParagraphTagsInternal(a, c);
        this.fieldObject.dispatchChange()
      }
    }else {
      goog.userAgent.GECKO && a.keyCode == goog.events.KeyCodes.DELETE && this.handleDeleteGecko(a)
    }
  }
  return false
};
goog.editor.plugins.EnterHandler.prototype.handleKeyUp = function(a) {
  if(goog.userAgent.GECKO && this.fieldObject.inModalMode()) {
    return false
  }
  this.handleKeyUpInternal(a);
  return false
};
goog.editor.plugins.EnterHandler.prototype.handleKeyUpInternal = function(a) {
  (goog.userAgent.IE || goog.userAgent.OPERA) && a.keyCode == goog.events.KeyCodes.ENTER && this.ensureBlockIeOpera(goog.dom.TagName.DIV, true)
};
goog.editor.plugins.EnterHandler.prototype.handleEnterGecko_ = function(a) {
  var b = this.fieldObject.getRange(), c = !b || b.isCollapsed(), d = this.deleteCursorSelection_(), e = this.fieldObject.execCommand(goog.editor.plugins.Blockquote.SPLIT_COMMAND, d);
  e && (a.preventDefault(), a.stopPropagation());
  this.releasePositionObject_(d);
  e || this.handleEnterAtCursorGeckoInternal(a, c, b)
};
goog.editor.plugins.EnterHandler.prototype.handleEnterWebkitInternal = goog.nullFunction;
goog.editor.plugins.EnterHandler.prototype.handleEnterAtCursorGeckoInternal = goog.nullFunction;
goog.editor.plugins.EnterHandler.DO_NOT_ENSURE_BLOCK_NODES_ = goog.object.createSet(goog.dom.TagName.LI, goog.dom.TagName.DIV, goog.dom.TagName.H1, goog.dom.TagName.H2, goog.dom.TagName.H3, goog.dom.TagName.H4, goog.dom.TagName.H5, goog.dom.TagName.H6);
goog.editor.plugins.EnterHandler.isBrElem = function(a) {
  return goog.editor.node.isEmpty(a) && a.getElementsByTagName(goog.dom.TagName.BR).length == 1
};
goog.editor.plugins.EnterHandler.prototype.ensureBlockIeOpera = function(a, b) {
  for(var c = this.fieldObject.getRange(), d = c.getContainer(), e = this.fieldObject.getElement(), f;d && d != e;) {
    var g = d.nodeName;
    if(g == a || goog.editor.plugins.EnterHandler.DO_NOT_ENSURE_BLOCK_NODES_[g] && (!b || !goog.editor.plugins.EnterHandler.isBrElem(d))) {
      if(goog.userAgent.OPERA && f) {
        g == a && f == d.lastChild && goog.editor.node.isEmpty(f) && (goog.dom.insertSiblingAfter(f, d), goog.dom.Range.createFromNodeContents(f).select());
        break
      }
      return
    }
    goog.userAgent.OPERA && b && g == goog.dom.TagName.P && g != a && (f = d);
    d = d.parentNode
  }
  if(goog.userAgent.IE && !goog.userAgent.isVersion(9)) {
    var h = false, c = c.getBrowserRangeObject(), d = c.duplicate();
    d.moveEnd("character", 1);
    if(d.text.length && (h = d.parentElement(), d = d.duplicate(), d.collapse(false), d = d.parentElement(), h = h != d && d != c.parentElement())) {
      c.move("character", -1), c.select()
    }
  }
  this.fieldObject.getEditableDomHelper().getDocument().execCommand("FormatBlock", false, "<" + a + ">");
  h && (c.move("character", 1), c.select())
};
goog.editor.plugins.EnterHandler.prototype.deleteCursorSelection_ = function() {
  return goog.editor.BrowserFeature.HAS_W3C_RANGES ? this.deleteCursorSelectionW3C_() : this.deleteCursorSelectionIE_()
};
goog.editor.plugins.EnterHandler.prototype.releasePositionObject_ = function(a) {
  goog.editor.BrowserFeature.HAS_W3C_RANGES || a.removeNode(true)
};
goog.editor.plugins.EnterHandler.prototype.deleteCursorSelectionIE_ = function() {
  var a = this.getFieldDomHelper().getDocument(), b = a.selection.createRange(), c = goog.string.createUniqueString();
  b.pasteHTML('<span id="' + c + '"></span>');
  a = a.getElementById(c);
  a.id = "";
  return a
};
goog.editor.plugins.EnterHandler.prototype.deleteCursorSelectionW3C_ = function() {
  var a = this.fieldObject.getRange();
  if(!a.isCollapsed()) {
    var b = true;
    if(goog.userAgent.OPERA) {
      var c = a.getStartNode(), d = a.getStartOffset();
      c == a.getEndNode() && c.lastChild && c.lastChild.tagName == goog.dom.TagName.BR && d == c.childNodes.length - 1 && (b = false)
    }
    b && goog.editor.plugins.EnterHandler.deleteW3cRange_(a)
  }
  return goog.editor.range.getDeepEndPoint(a, true)
};
goog.editor.plugins.EnterHandler.deleteW3cRange_ = function(a) {
  if(a && !a.isCollapsed()) {
    var b = true, c = a.getContainerElement(), d = new goog.dom.NodeOffset(a.getStartNode(), c), e = a.getStartOffset(), f = goog.editor.plugins.EnterHandler.isInOneContainerW3c_(a), g = !f && goog.editor.plugins.EnterHandler.isPartialEndW3c_(a);
    a.removeContents();
    a = goog.dom.Range.createCaret(d.findTargetNode(c), e);
    a.select();
    if(f && (f = goog.editor.style.getContainer(a.getStartNode()), goog.editor.node.isEmpty(f, true))) {
      b = "&nbsp;", goog.userAgent.OPERA && f.tagName == goog.dom.TagName.LI && (b = "<br>"), f.innerHTML = b, goog.editor.range.selectNodeStart(f.firstChild), b = false
    }
    g && (a = goog.editor.style.getContainer(a.getStartNode()), g = goog.editor.node.getNextSibling(a), a && g && (goog.dom.append(a, g.childNodes), goog.dom.removeNode(g)));
    b && (a = goog.dom.Range.createCaret(d.findTargetNode(c), e), a.select())
  }
};
goog.editor.plugins.EnterHandler.isInOneContainerW3c_ = function(a) {
  var b = a.getStartNode();
  goog.editor.style.isContainer(b) && (b = b.childNodes[a.getStartOffset()] || b);
  var b = goog.editor.style.getContainer(b), c = a.getEndNode();
  goog.editor.style.isContainer(c) && (c = c.childNodes[a.getEndOffset()] || c);
  c = goog.editor.style.getContainer(c);
  return b == c
};
goog.editor.plugins.EnterHandler.isPartialEndW3c_ = function(a) {
  var b = a.getEndNode(), a = a.getEndOffset(), c = b;
  if(goog.editor.style.isContainer(c)) {
    var d = c.childNodes[a];
    if(!d || d.nodeType == goog.dom.NodeType.ELEMENT && goog.editor.style.isContainer(d)) {
      return false
    }
  }
  for(d = goog.editor.style.getContainer(c);d != c;) {
    if(goog.editor.node.getNextSibling(c)) {
      return true
    }
    c = c.parentNode
  }
  return a != goog.editor.node.getLength(b)
};
goog.ui.ToolbarSeparatorRenderer = function() {
  goog.ui.MenuSeparatorRenderer.call(this)
};
goog.inherits(goog.ui.ToolbarSeparatorRenderer, goog.ui.MenuSeparatorRenderer);
goog.addSingletonGetter(goog.ui.ToolbarSeparatorRenderer);
goog.ui.ToolbarSeparatorRenderer.CSS_CLASS = "goog-toolbar-separator";
goog.ui.ToolbarSeparatorRenderer.prototype.createDom = function(a) {
  return a.getDomHelper().createDom("div", this.getCssClass() + " " + goog.ui.INLINE_BLOCK_CLASSNAME, "\u00a0")
};
goog.ui.ToolbarSeparatorRenderer.prototype.decorate = function(a, b) {
  b = goog.ui.ToolbarSeparatorRenderer.superClass_.decorate.call(this, a, b);
  goog.dom.classes.add(b, goog.ui.INLINE_BLOCK_CLASSNAME);
  return b
};
goog.ui.ToolbarSeparatorRenderer.prototype.getCssClass = function() {
  return goog.ui.ToolbarSeparatorRenderer.CSS_CLASS
};
goog.ui.ToolbarRenderer = function() {
  goog.ui.ContainerRenderer.call(this)
};
goog.inherits(goog.ui.ToolbarRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(goog.ui.ToolbarRenderer);
goog.ui.ToolbarRenderer.CSS_CLASS = "goog-toolbar";
goog.ui.ToolbarRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.TOOLBAR
};
goog.ui.ToolbarRenderer.prototype.getDecoratorForChild = function(a) {
  return a.tagName == "HR" ? new goog.ui.Separator(goog.ui.ToolbarSeparatorRenderer.getInstance()) : goog.ui.ToolbarRenderer.superClass_.getDecoratorForChild.call(this, a)
};
goog.ui.ToolbarRenderer.prototype.getCssClass = function() {
  return goog.ui.ToolbarRenderer.CSS_CLASS
};
goog.ui.ToolbarRenderer.prototype.getDefaultOrientation = function() {
  return goog.ui.Container.Orientation.HORIZONTAL
};
goog.ui.Toolbar = function(a, b, c) {
  goog.ui.Container.call(this, b, a || goog.ui.ToolbarRenderer.getInstance(), c)
};
goog.inherits(goog.ui.Toolbar, goog.ui.Container);
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return c * b < 0 ? c + b : c
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1.0E-6)
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360)
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
  return a * 180 / Math.PI
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  c > 180 ? c -= 360 : c <= -180 && (c = 360 + c);
  return c
};
goog.math.sign = function(a) {
  return a == 0 ? 0 : a < 0 ? -1 : 1
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  for(var c = c || function(a, b) {
    return a == b
  }, d = d || function(b) {
    return a[b]
  }, e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0
  }
  for(var i = 0;i < f + 1;i++) {
    g[0][i] = 0
  }
  for(h = 1;h <= e;h++) {
    for(i = 1;i <= e;i++) {
      g[h][i] = c(a[h - 1], b[i - 1]) ? g[h - 1][i - 1] + 1 : Math.max(g[h - 1][i], g[h][i - 1])
    }
  }
  for(var j = [], h = e, i = f;h > 0 && i > 0;) {
    c(a[h - 1], b[i - 1]) ? (j.unshift(d(h - 1, i - 1)), h--, i--) : g[h - 1][i] > g[h][i - 1] ? h-- : i--
  }
  return j
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c
  }, 0)
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function(a) {
  var b = arguments.length;
  if(b < 2) {
    return 0
  }
  var c = goog.math.average.apply(null, arguments), b = goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2)
  })) / (b - 1);
  return Math.sqrt(b)
};
goog.math.isInt = function(a) {
  return isFinite(a) && a % 1 == 0
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a)
};
goog.color.parse = function(a) {
  var b = {}, a = String(a), c = goog.color.prependPoundIfNecessary_(a);
  if(goog.color.isValidHexColor_(c)) {
    return b.hex = goog.color.normalizeHex(c), b.type = "hex", b
  }else {
    if(c = goog.color.isValidRgbColor_(a), c.length) {
      return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b
    }else {
      if(goog.color.names && (c = goog.color.names[a.toLowerCase()])) {
        return b.hex = c, b.type = "named", b
      }
    }
  }
  throw Error(a + " is not a valid color string");
};
goog.color.parseRgb = function(a) {
  var b = goog.color.isValidRgbColor_(a);
  if(!b.length) {
    throw Error(a + " is not a valid RGB color");
  }
  return b
};
goog.color.hexToRgbStyle = function(a) {
  return goog.color.rgbStyle_(goog.color.hexToRgb(a))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
  if(!goog.color.isValidHexColor_(a)) {
    throw Error("'" + a + "' is not a valid hex color");
  }
  a.length == 4 && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
  return a.toLowerCase()
};
goog.color.hexToRgb = function(a) {
  var a = goog.color.normalizeHex(a), b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16), a = parseInt(a.substr(5, 2), 16);
  return[b, c, a]
};
goog.color.rgbToHex = function(a, b, c) {
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if(isNaN(a) || a < 0 || a > 255 || isNaN(b) || b < 0 || b > 255 || isNaN(c) || c < 0 || c > 255) {
    throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
  }
  a = goog.color.prependZeroIfNecessary_(a.toString(16));
  b = goog.color.prependZeroIfNecessary_(b.toString(16));
  c = goog.color.prependZeroIfNecessary_(c.toString(16));
  return"#" + a + b + c
};
goog.color.rgbArrayToHex = function(a) {
  return goog.color.rgbToHex(a[0], a[1], a[2])
};
goog.color.rgbToHsl = function(a, b, c) {
  a /= 255;
  b /= 255;
  c /= 255;
  var d = Math.max(a, b, c), e = Math.min(a, b, c), f = 0, g = 0, h = 0.5 * (d + e);
  d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && h <= 0.5 ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
  return[Math.round(f + 360) % 360, g, h]
};
goog.color.rgbArrayToHsl = function(a) {
  return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hueToRgb_ = function(a, b, c) {
  c < 0 ? c += 1 : c > 1 && (c -= 1);
  if(6 * c < 1) {
    return a + (b - a) * 6 * c
  }else {
    if(2 * c < 1) {
      return b
    }else {
      if(3 * c < 2) {
        return a + (b - a) * (2 / 3 - c) * 6
      }
    }
  }
  return a
};
goog.color.hslToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0;
  a /= 360;
  if(b == 0) {
    d = e = f = c * 255
  }else {
    var g = f = 0, g = c < 0.5 ? c * (1 + b) : c + b - b * c, f = 2 * c - g, d = 255 * goog.color.hueToRgb_(f, g, a + 1 / 3), e = 255 * goog.color.hueToRgb_(f, g, a), f = 255 * goog.color.hueToRgb_(f, g, a - 1 / 3)
  }
  return[Math.round(d), Math.round(e), Math.round(f)]
};
goog.color.hslArrayToRgb = function(a) {
  return goog.color.hslToRgb(a[0], a[1], a[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
  return goog.color.validHexColorRe_.test(a)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function(a) {
  return goog.color.normalizedHexColorRe_.test(a)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
  var b = a.match(goog.color.rgbColorRe_);
  if(b) {
    var a = Number(b[1]), c = Number(b[2]), b = Number(b[3]);
    if(a >= 0 && a <= 255 && c >= 0 && c <= 255 && b >= 0 && b <= 255) {
      return[a, c, b]
    }
  }
  return[]
};
goog.color.prependZeroIfNecessary_ = function(a) {
  return a.length == 1 ? "0" + a : a
};
goog.color.prependPoundIfNecessary_ = function(a) {
  return a.charAt(0) == "#" ? a : "#" + a
};
goog.color.rgbStyle_ = function(a) {
  return"rgb(" + a.join(",") + ")"
};
goog.color.hsvToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0;
  if(b == 0) {
    f = e = d = c
  }else {
    var g = Math.floor(a / 60), h = a / 60 - g, a = c * (1 - b), i = c * (1 - b * h), b = c * (1 - b * (1 - h));
    switch(g) {
      case 1:
        d = i;
        e = c;
        f = a;
        break;
      case 2:
        d = a;
        e = c;
        f = b;
        break;
      case 3:
        d = a;
        e = i;
        f = c;
        break;
      case 4:
        d = b;
        e = a;
        f = c;
        break;
      case 5:
        d = c;
        e = a;
        f = i;
        break;
      case 6:
      ;
      case 0:
        d = c, e = b, f = a
    }
  }
  return[Math.floor(d), Math.floor(e), Math.floor(f)]
};
goog.color.rgbToHsv = function(a, b, c) {
  var d = Math.max(Math.max(a, b), c), e = Math.min(Math.min(a, b), c);
  if(e == d) {
    e = a = 0
  }else {
    var f = d - e, e = f / d, a = a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f;
    a *= 60;
    a < 0 && (a += 360);
    a > 360 && (a -= 360)
  }
  return[a, e, d]
};
goog.color.rgbArrayToHsv = function(a) {
  return goog.color.rgbToHsv(a[0], a[1], a[2])
};
goog.color.hsvArrayToRgb = function(a) {
  return goog.color.hsvToRgb(a[0], a[1], a[2])
};
goog.color.hexToHsl = function(a) {
  a = goog.color.hexToRgb(a);
  return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hslToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
};
goog.color.hslArrayToHex = function(a) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
};
goog.color.hexToHsv = function(a) {
  return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
};
goog.color.hsvToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
};
goog.color.hsvArrayToHex = function(a) {
  return goog.color.hsvToHex(a[0], a[1], a[2])
};
goog.color.hslDistance = function(a, b) {
  var c, d;
  c = a[2] <= 0.5 ? a[1] * a[2] : a[1] * (1 - a[2]);
  d = b[2] <= 0.5 ? b[1] * b[2] : b[1] * (1 - b[2]);
  return(a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos((a[0] / 360 - b[0] / 360) * 2 * Math.PI)
};
goog.color.blend = function(a, b, c) {
  c = goog.math.clamp(c, 0, 1);
  return[Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
};
goog.color.darken = function(a, b) {
  return goog.color.blend([0, 0, 0], a, b)
};
goog.color.lighten = function(a, b) {
  return goog.color.blend([255, 255, 255], a, b)
};
goog.color.highContrast = function(a, b) {
  for(var c = [], d = 0;d < b.length;d++) {
    c.push({color:b[d], diff:goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)})
  }
  c.sort(function(a, b) {
    return b.diff - a.diff
  });
  return c[0].color
};
goog.color.yiqBrightness_ = function(a) {
  return Math.round((a[0] * 299 + a[1] * 587 + a[2] * 114) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function(a, b) {
  return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
};
goog.color.colorDiff_ = function(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
};
goog.ui.ColorMenuButtonRenderer = function() {
  goog.ui.MenuButtonRenderer.call(this)
};
goog.inherits(goog.ui.ColorMenuButtonRenderer, goog.ui.MenuButtonRenderer);
goog.addSingletonGetter(goog.ui.ColorMenuButtonRenderer);
goog.ui.ColorMenuButtonRenderer.CSS_CLASS = "goog-color-menu-button";
goog.ui.ColorMenuButtonRenderer.prototype.createCaption = function(a, b) {
  return goog.ui.ColorMenuButtonRenderer.superClass_.createCaption.call(this, goog.ui.ColorMenuButtonRenderer.wrapCaption(a, b), b)
};
goog.ui.ColorMenuButtonRenderer.wrapCaption = function(a, b) {
  return b.createDom("div", goog.ui.ColorMenuButtonRenderer.CSS_CLASS + "-indicator", a)
};
goog.ui.ColorMenuButtonRenderer.prototype.setValue = function(a, b) {
  a && goog.ui.ColorMenuButtonRenderer.setCaptionValue(this.getContentElement(a), b)
};
goog.ui.ColorMenuButtonRenderer.setCaptionValue = function(a, b) {
  if(a && a.firstChild) {
    var c;
    try {
      c = goog.color.parse(b).hex
    }catch(d) {
      c = null
    }
    a.firstChild.style.borderBottomColor = c || (goog.userAgent.IE ? "" : "transparent")
  }
};
goog.ui.ColorMenuButtonRenderer.prototype.initializeDom = function(a) {
  this.setValue(a.getElement(), a.getValue());
  goog.dom.classes.add(a.getElement(), goog.ui.ColorMenuButtonRenderer.CSS_CLASS);
  goog.ui.ColorMenuButtonRenderer.superClass_.initializeDom.call(this, a)
};
goog.ui.PaletteRenderer = function() {
  goog.ui.ControlRenderer.call(this)
};
goog.inherits(goog.ui.PaletteRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(goog.ui.PaletteRenderer);
goog.ui.PaletteRenderer.cellId_ = 0;
goog.ui.PaletteRenderer.CSS_CLASS = "goog-palette";
goog.ui.PaletteRenderer.prototype.createDom = function(a) {
  var b = this.getClassNames(a);
  return a.getDomHelper().createDom("div", b ? b.join(" ") : null, this.createGrid(a.getContent(), a.getSize(), a.getDomHelper()))
};
goog.ui.PaletteRenderer.prototype.createGrid = function(a, b, c) {
  for(var d = [], e = 0, f = 0;e < b.height;e++) {
    for(var g = [], h = 0;h < b.width;h++) {
      var i = a && a[f++];
      g.push(this.createCell(i, c))
    }
    d.push(this.createRow(g, c))
  }
  return this.createTable(d, c)
};
goog.ui.PaletteRenderer.prototype.createTable = function(a, b) {
  var c = b.createDom("table", this.getCssClass() + "-table", b.createDom("tbody", this.getCssClass() + "-body", a));
  c.cellSpacing = 0;
  c.cellPadding = 0;
  goog.dom.a11y.setRole(c, "grid");
  return c
};
goog.ui.PaletteRenderer.prototype.createRow = function(a, b) {
  return b.createDom("tr", this.getCssClass() + "-row", a)
};
goog.ui.PaletteRenderer.prototype.createCell = function(a, b) {
  var c = b.createDom("td", {"class":this.getCssClass() + "-cell", id:this.getCssClass() + "-cell-" + goog.ui.PaletteRenderer.cellId_++}, a);
  goog.dom.a11y.setRole(c, "gridcell");
  return c
};
goog.ui.PaletteRenderer.prototype.canDecorate = function() {
  return false
};
goog.ui.PaletteRenderer.prototype.decorate = function() {
  return null
};
goog.ui.PaletteRenderer.prototype.setContent = function(a, b) {
  if(a) {
    var c = goog.dom.getElementsByTagNameAndClass("tbody", this.getCssClass() + "-body", a)[0];
    if(c) {
      var d = 0;
      goog.array.forEach(c.rows, function(a) {
        goog.array.forEach(a.cells, function(a) {
          goog.dom.removeChildren(a);
          if(b) {
            var c = b[d++];
            c && goog.dom.appendChild(a, c)
          }
        })
      });
      if(d < b.length) {
        for(var e = [], f = goog.dom.getDomHelper(a), g = c.rows[0].cells.length;d < b.length;) {
          var h = b[d++];
          e.push(this.createCell(h, f));
          if(e.length == g) {
            h = this.createRow(e, f), goog.dom.appendChild(c, h), e.length = 0
          }
        }
        if(e.length > 0) {
          for(;e.length < g;) {
            e.push(this.createCell("", f))
          }
          h = this.createRow(e, f);
          goog.dom.appendChild(c, h)
        }
      }
    }
    goog.style.setUnselectable(a, true, goog.userAgent.GECKO)
  }
};
goog.ui.PaletteRenderer.prototype.getContainingItem = function(a, b) {
  for(var c = a.getElement();b && b.nodeType == goog.dom.NodeType.ELEMENT && b != c;) {
    if(b.tagName == "TD" && goog.dom.classes.has(b, this.getCssClass() + "-cell")) {
      return b.firstChild
    }
    b = b.parentNode
  }
  return null
};
goog.ui.PaletteRenderer.prototype.highlightCell = function(a, b, c) {
  if(b) {
    b = b.parentNode, goog.dom.classes.enable(b, this.getCssClass() + "-cell-hover", c), a = a.getElement().firstChild, goog.dom.a11y.setState(a, "activedescendent", b.id)
  }
};
goog.ui.PaletteRenderer.prototype.selectCell = function(a, b, c) {
  b && goog.dom.classes.enable(b.parentNode, this.getCssClass() + "-cell-selected", c)
};
goog.ui.PaletteRenderer.prototype.getCssClass = function() {
  return goog.ui.PaletteRenderer.CSS_CLASS
};
goog.ui.SelectionModel = function(a) {
  goog.events.EventTarget.call(this);
  this.items_ = [];
  this.addItems(a)
};
goog.inherits(goog.ui.SelectionModel, goog.events.EventTarget);
goog.ui.SelectionModel.prototype.selectedItem_ = null;
goog.ui.SelectionModel.prototype.selectionHandler_ = null;
goog.ui.SelectionModel.prototype.getSelectionHandler = function() {
  return this.selectionHandler_
};
goog.ui.SelectionModel.prototype.setSelectionHandler = function(a) {
  this.selectionHandler_ = a
};
goog.ui.SelectionModel.prototype.getItemCount = function() {
  return this.items_.length
};
goog.ui.SelectionModel.prototype.indexOfItem = function(a) {
  return a ? goog.array.indexOf(this.items_, a) : -1
};
goog.ui.SelectionModel.prototype.getFirst = function() {
  return this.items_[0]
};
goog.ui.SelectionModel.prototype.getLast = function() {
  return this.items_[this.items_.length - 1]
};
goog.ui.SelectionModel.prototype.getItemAt = function(a) {
  return this.items_[a] || null
};
goog.ui.SelectionModel.prototype.addItems = function(a) {
  a && (goog.array.forEach(a, function(a) {
    this.selectItem_(a, false)
  }, this), goog.array.extend(this.items_, a))
};
goog.ui.SelectionModel.prototype.addItem = function(a) {
  this.addItemAt(a, this.getItemCount())
};
goog.ui.SelectionModel.prototype.addItemAt = function(a, b) {
  a && (this.selectItem_(a, false), goog.array.insertAt(this.items_, a, b))
};
goog.ui.SelectionModel.prototype.removeItem = function(a) {
  if(a && goog.array.remove(this.items_, a) && a == this.selectedItem_) {
    this.selectedItem_ = null, this.dispatchEvent(goog.events.EventType.SELECT)
  }
};
goog.ui.SelectionModel.prototype.removeItemAt = function(a) {
  this.removeItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.getSelectedItem = function() {
  return this.selectedItem_
};
goog.ui.SelectionModel.prototype.setSelectedItem = function(a) {
  if(a != this.selectedItem_) {
    this.selectItem_(this.selectedItem_, false), this.selectedItem_ = a, this.selectItem_(a, true)
  }
  this.dispatchEvent(goog.events.EventType.SELECT)
};
goog.ui.SelectionModel.prototype.getSelectedIndex = function() {
  return this.indexOfItem(this.selectedItem_)
};
goog.ui.SelectionModel.prototype.setSelectedIndex = function(a) {
  this.setSelectedItem(this.getItemAt(a))
};
goog.ui.SelectionModel.prototype.clear = function() {
  goog.array.clear(this.items_);
  this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.disposeInternal = function() {
  goog.ui.SelectionModel.superClass_.disposeInternal.call(this);
  delete this.items_;
  this.selectedItem_ = null
};
goog.ui.SelectionModel.prototype.selectItem_ = function(a, b) {
  a && (typeof this.selectionHandler_ == "function" ? this.selectionHandler_(a, b) : typeof a.setSelected == "function" && a.setSelected(b))
};
goog.ui.Palette = function(a, b, c) {
  goog.ui.Control.call(this, a, b || goog.ui.PaletteRenderer.getInstance(), c)
};
goog.inherits(goog.ui.Palette, goog.ui.Control);
goog.ui.Palette.prototype.size_ = null;
goog.ui.Palette.prototype.highlightedIndex_ = -1;
goog.ui.Palette.prototype.selectionModel_ = null;
goog.ui.Palette.prototype.disposeInternal = function() {
  goog.ui.Palette.superClass_.disposeInternal.call(this);
  if(this.selectionModel_) {
    this.selectionModel_.dispose(), this.selectionModel_ = null
  }
  this.size_ = null
};
goog.ui.Palette.prototype.setContentInternal = function(a) {
  goog.ui.Palette.superClass_.setContentInternal.call(this, a);
  this.adjustSize_();
  this.selectionModel_ ? (this.selectionModel_.clear(), this.selectionModel_.addItems(a)) : (this.selectionModel_ = new goog.ui.SelectionModel(a), this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_, this)), this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange));
  this.highlightedIndex_ = -1
};
goog.ui.Palette.prototype.getCaption = function() {
  return null
};
goog.ui.Palette.prototype.setCaption = function() {
};
goog.ui.Palette.prototype.handleMouseOver = function(a) {
  goog.ui.Palette.superClass_.handleMouseOver.call(this, a);
  var b = this.getRenderer().getContainingItem(this, a.target);
  (!b || !a.relatedTarget || !goog.dom.contains(b, a.relatedTarget)) && b != this.getHighlightedItem() && this.setHighlightedItem(b)
};
goog.ui.Palette.prototype.handleMouseOut = function(a) {
  goog.ui.Palette.superClass_.handleMouseOut.call(this, a);
  var b = this.getRenderer().getContainingItem(this, a.target);
  (!b || !a.relatedTarget || !goog.dom.contains(b, a.relatedTarget)) && b == this.getHighlightedItem() && this.getRenderer().highlightCell(this, b, false)
};
goog.ui.Palette.prototype.handleMouseDown = function(a) {
  goog.ui.Palette.superClass_.handleMouseDown.call(this, a);
  this.isActive() && (a = this.getRenderer().getContainingItem(this, a.target), a != this.getHighlightedItem() && this.setHighlightedItem(a))
};
goog.ui.Palette.prototype.performActionInternal = function() {
  var a = this.getHighlightedItem();
  return a ? (this.setSelectedItem(a), this.dispatchEvent(goog.ui.Component.EventType.ACTION)) : false
};
goog.ui.Palette.prototype.handleKeyEvent = function(a) {
  var b = this.getContent(), b = b ? b.length : 0, c = this.size_.width;
  if(b == 0 || !this.isEnabled()) {
    return false
  }
  if(a.keyCode == goog.events.KeyCodes.ENTER || a.keyCode == goog.events.KeyCodes.SPACE) {
    return this.performActionInternal(a)
  }
  if(a.keyCode == goog.events.KeyCodes.HOME) {
    return this.setHighlightedIndex(0), true
  }else {
    if(a.keyCode == goog.events.KeyCodes.END) {
      return this.setHighlightedIndex(b - 1), true
    }
  }
  var d = this.highlightedIndex_ < 0 ? this.getSelectedIndex() : this.highlightedIndex_;
  switch(a.keyCode) {
    case goog.events.KeyCodes.LEFT:
      d == -1 && (d = b);
      if(d > 0) {
        return this.setHighlightedIndex(d - 1), a.preventDefault(), true
      }
      break;
    case goog.events.KeyCodes.RIGHT:
      if(d < b - 1) {
        return this.setHighlightedIndex(d + 1), a.preventDefault(), true
      }
      break;
    case goog.events.KeyCodes.UP:
      d == -1 && (d = b + c - 1);
      if(d >= c) {
        return this.setHighlightedIndex(d - c), a.preventDefault(), true
      }
      break;
    case goog.events.KeyCodes.DOWN:
      if(d == -1 && (d = -c), d < b - c) {
        return this.setHighlightedIndex(d + c), a.preventDefault(), true
      }
  }
  return false
};
goog.ui.Palette.prototype.handleSelectionChange = function() {
};
goog.ui.Palette.prototype.getSize = function() {
  return this.size_
};
goog.ui.Palette.prototype.setSize = function(a, b) {
  if(this.getElement()) {
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }
  this.size_ = goog.isNumber(a) ? new goog.math.Size(a, b) : a;
  this.adjustSize_()
};
goog.ui.Palette.prototype.getHighlightedIndex = function() {
  return this.highlightedIndex_
};
goog.ui.Palette.prototype.getHighlightedItem = function() {
  var a = this.getContent();
  return a && a[this.highlightedIndex_]
};
goog.ui.Palette.prototype.setHighlightedIndex = function(a) {
  if(a != this.highlightedIndex_) {
    this.highlightIndex_(this.highlightedIndex_, false), this.highlightedIndex_ = a, this.highlightIndex_(a, true)
  }
};
goog.ui.Palette.prototype.setHighlightedItem = function(a) {
  var b = this.getContent();
  this.setHighlightedIndex(b ? goog.array.indexOf(b, a) : -1)
};
goog.ui.Palette.prototype.getSelectedIndex = function() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
};
goog.ui.Palette.prototype.getSelectedItem = function() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
};
goog.ui.Palette.prototype.setSelectedIndex = function(a) {
  this.selectionModel_ && this.selectionModel_.setSelectedIndex(a)
};
goog.ui.Palette.prototype.setSelectedItem = function(a) {
  this.selectionModel_ && this.selectionModel_.setSelectedItem(a)
};
goog.ui.Palette.prototype.highlightIndex_ = function(a, b) {
  if(this.getElement()) {
    var c = this.getContent();
    c && a >= 0 && a < c.length && this.getRenderer().highlightCell(this, c[a], b)
  }
};
goog.ui.Palette.prototype.selectItem_ = function(a, b) {
  this.getElement() && this.getRenderer().selectCell(this, a, b)
};
goog.ui.Palette.prototype.adjustSize_ = function() {
  var a = this.getContent();
  if(a) {
    if(this.size_ && this.size_.width) {
      if(a = Math.ceil(a.length / this.size_.width), !goog.isNumber(this.size_.height) || this.size_.height < a) {
        this.size_.height = a
      }
    }else {
      a = Math.ceil(Math.sqrt(a.length)), this.size_ = new goog.math.Size(a, a)
    }
  }else {
    this.size_ = new goog.math.Size(0, 0)
  }
};
goog.ui.ColorPalette = function(a, b, c) {
  this.colors_ = a || [];
  goog.ui.Palette.call(this, null, b || goog.ui.PaletteRenderer.getInstance(), c);
  this.setColors(this.colors_)
};
goog.inherits(goog.ui.ColorPalette, goog.ui.Palette);
goog.ui.ColorPalette.prototype.normalizedColors_ = null;
goog.ui.ColorPalette.prototype.getColors = function() {
  return this.colors_
};
goog.ui.ColorPalette.prototype.setColors = function(a) {
  this.colors_ = a;
  this.normalizedColors_ = null;
  this.setContent(this.createColorNodes_())
};
goog.ui.ColorPalette.prototype.getSelectedColor = function() {
  var a = this.getSelectedItem();
  return a ? (a = goog.style.getStyle(a, "background-color"), goog.ui.ColorPalette.parseColor_(a)) : null
};
goog.ui.ColorPalette.prototype.setSelectedColor = function(a) {
  a = goog.ui.ColorPalette.parseColor_(a);
  if(!this.normalizedColors_) {
    this.normalizedColors_ = goog.array.map(this.colors_, function(a) {
      return goog.ui.ColorPalette.parseColor_(a)
    })
  }
  this.setSelectedIndex(a ? goog.array.indexOf(this.normalizedColors_, a) : -1)
};
goog.ui.ColorPalette.prototype.createColorNodes_ = function() {
  return goog.array.map(this.colors_, function(a) {
    var b = this.getDomHelper().createDom("div", {"class":this.getRenderer().getCssClass() + "-colorswatch", style:"background-color:" + a});
    b.title = a.charAt(0) == "#" ? "RGB (" + goog.color.hexToRgb(a).join(", ") + ")" : a;
    return b
  }, this)
};
goog.ui.ColorPalette.parseColor_ = function(a) {
  if(a) {
    try {
      return goog.color.parse(a).hex
    }catch(b) {
    }
  }
  return null
};
goog.ui.ColorMenuButton = function(a, b, c, d) {
  goog.ui.MenuButton.call(this, a, b, c || goog.ui.ColorMenuButtonRenderer.getInstance(), d)
};
goog.inherits(goog.ui.ColorMenuButton, goog.ui.MenuButton);
goog.ui.ColorMenuButton.PALETTES = {GRAYSCALE:"#000,#444,#666,#999,#ccc,#eee,#f3f3f3,#fff".split(","), SOLID:"#f00,#f90,#ff0,#0f0,#0ff,#00f,#90f,#f0f".split(","), PASTEL:"#f4cccc,#fce5cd,#fff2cc,#d9ead3,#d0e0e3,#cfe2f3,#d9d2e9,#ead1dc,#ea9999,#f9cb9c,#ffe599,#b6d7a8,#a2c4c9,#9fc5e8,#b4a7d6,#d5a6bd,#e06666,#f6b26b,#ffd966,#93c47d,#76a5af,#6fa8dc,#8e7cc3,#c27ba0,#cc0000,#e69138,#f1c232,#6aa84f,#45818e,#3d85c6,#674ea7,#a64d79,#990000,#b45f06,#bf9000,#38761d,#134f5c,#0b5394,#351c75,#741b47,#660000,#783f04,#7f6000,#274e13,#0c343d,#073763,#20124d,#4c1130".split(",")};
goog.ui.ColorMenuButton.NO_COLOR = "none";
goog.ui.ColorMenuButton.newColorMenu = function(a, b) {
  var c = new goog.ui.Menu(b);
  a && goog.array.forEach(a, function(a) {
    c.addChild(a, true)
  });
  goog.object.forEach(goog.ui.ColorMenuButton.PALETTES, function(a) {
    a = new goog.ui.ColorPalette(a, null, b);
    a.setSize(8);
    c.addChild(a, true)
  });
  return c
};
goog.ui.ColorMenuButton.prototype.getSelectedColor = function() {
  return this.getValue()
};
goog.ui.ColorMenuButton.prototype.setSelectedColor = function(a) {
  this.setValue(a)
};
goog.ui.ColorMenuButton.prototype.setValue = function(a) {
  for(var b = 0, c;c = this.getItemAt(b);b++) {
    typeof c.setSelectedColor == "function" && c.setSelectedColor(a)
  }
  goog.ui.ColorMenuButton.superClass_.setValue.call(this, a)
};
goog.ui.ColorMenuButton.prototype.handleMenuAction = function(a) {
  typeof a.target.getSelectedColor == "function" ? this.setValue(a.target.getSelectedColor()) : a.target.getValue() == goog.ui.ColorMenuButton.NO_COLOR && this.setValue(null);
  goog.ui.ColorMenuButton.superClass_.handleMenuAction.call(this, a);
  a.stopPropagation();
  this.dispatchEvent(goog.ui.Component.EventType.ACTION)
};
goog.ui.ColorMenuButton.prototype.setOpen = function(a, b) {
  a && this.getItemCount() == 0 && (this.setMenu(goog.ui.ColorMenuButton.newColorMenu(null, this.getDomHelper())), this.setValue(this.getValue()));
  goog.ui.ColorMenuButton.superClass_.setOpen.call(this, a, b)
};
goog.ui.registry.setDecoratorByClassName(goog.ui.ColorMenuButtonRenderer.CSS_CLASS, function() {
  return new goog.ui.ColorMenuButton(null)
});
goog.ui.ToolbarColorMenuButtonRenderer = function() {
  goog.ui.ToolbarMenuButtonRenderer.call(this)
};
goog.inherits(goog.ui.ToolbarColorMenuButtonRenderer, goog.ui.ToolbarMenuButtonRenderer);
goog.addSingletonGetter(goog.ui.ToolbarColorMenuButtonRenderer);
goog.ui.ToolbarColorMenuButtonRenderer.prototype.createCaption = function(a, b) {
  return goog.ui.MenuButtonRenderer.wrapCaption(goog.ui.ColorMenuButtonRenderer.wrapCaption(a, b), this.getCssClass(), b)
};
goog.ui.ToolbarColorMenuButtonRenderer.prototype.setValue = function(a, b) {
  a && goog.ui.ColorMenuButtonRenderer.setCaptionValue(this.getContentElement(a), b)
};
goog.ui.ToolbarColorMenuButtonRenderer.prototype.initializeDom = function(a) {
  this.setValue(a.getElement(), a.getValue());
  goog.dom.classes.add(a.getElement(), "goog-toolbar-color-menu-button");
  goog.ui.ToolbarColorMenuButtonRenderer.superClass_.initializeDom.call(this, a)
};
goog.ui.ToolbarColorMenuButton = function(a, b, c, d) {
  goog.ui.ColorMenuButton.call(this, a, b, c || goog.ui.ToolbarColorMenuButtonRenderer.getInstance(), d)
};
goog.inherits(goog.ui.ToolbarColorMenuButton, goog.ui.ColorMenuButton);
goog.ui.registry.setDecoratorByClassName("goog-toolbar-color-menu-button", function() {
  return new goog.ui.ToolbarColorMenuButton(null)
});
goog.ui.Select = function(a, b, c, d) {
  goog.ui.MenuButton.call(this, a, b, c, d);
  this.setDefaultCaption(a)
};
goog.inherits(goog.ui.Select, goog.ui.MenuButton);
goog.ui.Select.prototype.selectionModel_ = null;
goog.ui.Select.prototype.defaultCaption_ = null;
goog.ui.Select.prototype.enterDocument = function() {
  goog.ui.Select.superClass_.enterDocument.call(this);
  this.updateCaption_();
  this.listenToSelectionModelEvents_()
};
goog.ui.Select.prototype.decorateInternal = function(a) {
  goog.ui.Select.superClass_.decorateInternal.call(this, a);
  (a = this.getCaption()) ? this.setDefaultCaption(a) : this.setSelectedIndex(0)
};
goog.ui.Select.prototype.disposeInternal = function() {
  goog.ui.Select.superClass_.disposeInternal.call(this);
  if(this.selectionModel_) {
    this.selectionModel_.dispose(), this.selectionModel_ = null
  }
  this.defaultCaption_ = null
};
goog.ui.Select.prototype.handleMenuAction = function(a) {
  this.setSelectedItem(a.target);
  goog.ui.Select.superClass_.handleMenuAction.call(this, a);
  a.stopPropagation();
  this.dispatchEvent(goog.ui.Component.EventType.ACTION)
};
goog.ui.Select.prototype.handleSelectionChange = function() {
  var a = this.getSelectedItem();
  goog.ui.Select.superClass_.setValue.call(this, a && a.getValue());
  this.updateCaption_()
};
goog.ui.Select.prototype.setMenu = function(a) {
  var b = goog.ui.Select.superClass_.setMenu.call(this, a);
  a != b && (this.selectionModel_ && this.selectionModel_.clear(), a && (this.selectionModel_ ? a.forEachChild(function(a) {
    this.selectionModel_.addItem(a)
  }, this) : this.createSelectionModel_(a)));
  return b
};
goog.ui.Select.prototype.getDefaultCaption = function() {
  return this.defaultCaption_
};
goog.ui.Select.prototype.setDefaultCaption = function(a) {
  this.defaultCaption_ = a;
  this.updateCaption_()
};
goog.ui.Select.prototype.addItem = function(a) {
  goog.ui.Select.superClass_.addItem.call(this, a);
  this.selectionModel_ ? this.selectionModel_.addItem(a) : this.createSelectionModel_(this.getMenu())
};
goog.ui.Select.prototype.addItemAt = function(a, b) {
  goog.ui.Select.superClass_.addItemAt.call(this, a, b);
  this.selectionModel_ ? this.selectionModel_.addItemAt(a, b) : this.createSelectionModel_(this.getMenu())
};
goog.ui.Select.prototype.removeItem = function(a) {
  goog.ui.Select.superClass_.removeItem.call(this, a);
  this.selectionModel_ && this.selectionModel_.removeItem(a)
};
goog.ui.Select.prototype.removeItemAt = function(a) {
  goog.ui.Select.superClass_.removeItemAt.call(this, a);
  this.selectionModel_ && this.selectionModel_.removeItemAt(a)
};
goog.ui.Select.prototype.setSelectedItem = function(a) {
  this.selectionModel_ && this.selectionModel_.setSelectedItem(a)
};
goog.ui.Select.prototype.setSelectedIndex = function(a) {
  this.selectionModel_ && this.setSelectedItem(this.selectionModel_.getItemAt(a))
};
goog.ui.Select.prototype.setValue = function(a) {
  if(goog.isDefAndNotNull(a) && this.selectionModel_) {
    for(var b = 0, c;c = this.selectionModel_.getItemAt(b);b++) {
      if(c && typeof c.getValue == "function" && c.getValue() == a) {
        this.setSelectedItem(c);
        return
      }
    }
  }
  this.setSelectedItem(null)
};
goog.ui.Select.prototype.getSelectedItem = function() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedItem() : null
};
goog.ui.Select.prototype.getSelectedIndex = function() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1
};
goog.ui.Select.prototype.getSelectionModel = function() {
  return this.selectionModel_
};
goog.ui.Select.prototype.createSelectionModel_ = function(a) {
  this.selectionModel_ = new goog.ui.SelectionModel;
  a && a.forEachChild(function(a) {
    this.selectionModel_.addItem(a)
  }, this);
  this.listenToSelectionModelEvents_()
};
goog.ui.Select.prototype.listenToSelectionModelEvents_ = function() {
  this.selectionModel_ && this.getHandler().listen(this.selectionModel_, goog.events.EventType.SELECT, this.handleSelectionChange)
};
goog.ui.Select.prototype.updateCaption_ = function() {
  var a = this.getSelectedItem();
  this.setContent(a ? a.getCaption() : this.defaultCaption_)
};
goog.ui.Select.prototype.setOpen = function(a, b) {
  goog.ui.Select.superClass_.setOpen.call(this, a, b);
  this.isOpen() && this.getMenu().setHighlightedIndex(this.getSelectedIndex())
};
goog.ui.registry.setDecoratorByClassName("goog-select", function() {
  return new goog.ui.Select(null)
});
goog.ui.ToolbarSelect = function(a, b, c, d) {
  goog.ui.Select.call(this, a, b, c || goog.ui.ToolbarMenuButtonRenderer.getInstance(), d)
};
goog.inherits(goog.ui.ToolbarSelect, goog.ui.Select);
goog.ui.registry.setDecoratorByClassName("goog-toolbar-select", function() {
  return new goog.ui.ToolbarSelect(null)
});
goog.ui.editor.ToolbarFactory = {};
goog.ui.editor.ToolbarFactory.getPrimaryFont = function(a) {
  var b = a.indexOf(","), a = (b != -1 ? a.substring(0, b) : a).toLowerCase();
  return goog.string.stripQuotes(a, "\"'")
};
goog.ui.editor.ToolbarFactory.addFonts = function(a, b) {
  goog.array.forEach(b, function(b) {
    goog.ui.editor.ToolbarFactory.addFont(a, b.caption, b.value)
  })
};
goog.ui.editor.ToolbarFactory.addFont = function(a, b, c) {
  var d = goog.ui.editor.ToolbarFactory.getPrimaryFont(c), b = new goog.ui.Option(b, c, a.dom_);
  b.setId(d);
  a.addItem(b);
  b.getContentElement().style.fontFamily = c
};
goog.ui.editor.ToolbarFactory.addFontSizes = function(a, b) {
  goog.array.forEach(b, function(b) {
    goog.ui.editor.ToolbarFactory.addFontSize(a, b.caption, b.value)
  })
};
goog.ui.editor.ToolbarFactory.addFontSize = function(a, b, c) {
  b = new goog.ui.Option(b, c, a.dom_);
  a.addItem(b);
  a = b.getContentElement();
  a.style.fontSize = goog.ui.editor.ToolbarFactory.getPxFromLegacySize(c) + "px";
  a.firstChild.style.height = "1.1em"
};
goog.ui.editor.ToolbarFactory.getPxFromLegacySize = function(a) {
  return goog.ui.editor.ToolbarFactory.LEGACY_SIZE_TO_PX_MAP_[a] || 10
};
goog.ui.editor.ToolbarFactory.getLegacySizeFromPx = function(a) {
  return goog.array.lastIndexOf(goog.ui.editor.ToolbarFactory.LEGACY_SIZE_TO_PX_MAP_, a)
};
goog.ui.editor.ToolbarFactory.LEGACY_SIZE_TO_PX_MAP_ = [10, 10, 13, 16, 18, 24, 32, 48];
goog.ui.editor.ToolbarFactory.addFormatOptions = function(a, b) {
  goog.array.forEach(b, function(b) {
    goog.ui.editor.ToolbarFactory.addFormatOption(a, b.caption, b.command)
  })
};
goog.ui.editor.ToolbarFactory.addFormatOption = function(a, b, c) {
  b = new goog.ui.Option(a.dom_.createDom(goog.dom.TagName.DIV, null, b), c, a.dom_);
  b.setId(c);
  a.addItem(b)
};
goog.ui.editor.ToolbarFactory.makeToolbar = function(a, b, c) {
  var d = goog.dom.getDomHelper(b), d = new goog.ui.Toolbar(goog.ui.ToolbarRenderer.getInstance(), goog.ui.Container.Orientation.HORIZONTAL, d), c = c || goog.style.isRightToLeft(b);
  d.setRightToLeft(c);
  d.setFocusable(false);
  for(var e = 0, f;f = a[e];e++) {
    f.setSupportedState(goog.ui.Component.State.FOCUSED, false), f.setRightToLeft(c), d.addChild(f, true)
  }
  d.render(b);
  return d
};
goog.ui.editor.ToolbarFactory.makeButton = function(a, b, c, d, e, f) {
  c = new goog.ui.ToolbarButton(goog.ui.editor.ToolbarFactory.createContent_(c, d, f), e, f);
  c.setId(a);
  c.setTooltip(b);
  return c
};
goog.ui.editor.ToolbarFactory.makeToggleButton = function(a, b, c, d, e, f) {
  a = goog.ui.editor.ToolbarFactory.makeButton(a, b, c, d, e, f);
  a.setSupportedState(goog.ui.Component.State.CHECKED, true);
  return a
};
goog.ui.editor.ToolbarFactory.makeMenuButton = function(a, b, c, d, e, f) {
  c = new goog.ui.ToolbarMenuButton(goog.ui.editor.ToolbarFactory.createContent_(c, d, f), null, e, f);
  c.setId(a);
  c.setTooltip(b);
  return c
};
goog.ui.editor.ToolbarFactory.makeSelectButton = function(a, b, c, d, e, f) {
  e = new goog.ui.ToolbarSelect(null, null, e, f);
  d && goog.array.forEach(d.split(/\s+/), e.addClassName, e);
  e.addClassName("goog-toolbar-select");
  e.setDefaultCaption(c);
  e.setId(a);
  e.setTooltip(b);
  return e
};
goog.ui.editor.ToolbarFactory.makeColorMenuButton = function(a, b, c, d, e, f) {
  c = new goog.ui.ToolbarColorMenuButton(goog.ui.editor.ToolbarFactory.createContent_(c, d, f), null, e, f);
  c.setId(a);
  c.setTooltip(b);
  return c
};
goog.ui.editor.ToolbarFactory.createContent_ = function(a, b, c) {
  if((!a || a == "") && goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9a")) {
    a = goog.string.Unicode.NBSP
  }
  return(c || goog.dom.getDomHelper()).createDom(goog.dom.TagName.DIV, b ? {"class":b} : null, a)
};
goog.editor.plugins.BasicTextFormatter = function() {
  goog.editor.Plugin.call(this)
};
goog.inherits(goog.editor.plugins.BasicTextFormatter, goog.editor.Plugin);
goog.editor.plugins.BasicTextFormatter.prototype.getTrogClassId = function() {
  return"BTF"
};
goog.editor.plugins.BasicTextFormatter.prototype.logger = goog.debug.Logger.getLogger("goog.editor.plugins.BasicTextFormatter");
goog.editor.plugins.BasicTextFormatter.COMMAND = {LINK:"+link", FORMAT_BLOCK:"+formatBlock", INDENT:"+indent", OUTDENT:"+outdent", STRIKE_THROUGH:"+strikeThrough", HORIZONTAL_RULE:"+insertHorizontalRule", SUBSCRIPT:"+subscript", SUPERSCRIPT:"+superscript", UNDERLINE:"+underline", BOLD:"+bold", ITALIC:"+italic", FONT_SIZE:"+fontSize", FONT_FACE:"+fontName", FONT_COLOR:"+foreColor", BACKGROUND_COLOR:"+backColor", ORDERED_LIST:"+insertOrderedList", UNORDERED_LIST:"+insertUnorderedList", JUSTIFY_CENTER:"+justifyCenter", 
JUSTIFY_FULL:"+justifyFull", JUSTIFY_RIGHT:"+justifyRight", JUSTIFY_LEFT:"+justifyLeft"};
goog.editor.plugins.BasicTextFormatter.SUPPORTED_COMMANDS_ = goog.object.transpose(goog.editor.plugins.BasicTextFormatter.COMMAND);
goog.editor.plugins.BasicTextFormatter.prototype.isSupportedCommand = function(a) {
  return a in goog.editor.plugins.BasicTextFormatter.SUPPORTED_COMMANDS_
};
goog.editor.plugins.BasicTextFormatter.prototype.getRange_ = function() {
  return this.fieldObject.getRange()
};
goog.editor.plugins.BasicTextFormatter.prototype.getDocument_ = function() {
  return this.getFieldDomHelper().getDocument()
};
goog.editor.plugins.BasicTextFormatter.prototype.execCommandInternal = function(a, b) {
  var c, d, e, f, g, h = b;
  switch(a) {
    case goog.editor.plugins.BasicTextFormatter.COMMAND.BACKGROUND_COLOR:
      goog.isNull(h) || (goog.editor.BrowserFeature.EATS_EMPTY_BACKGROUND_COLOR ? this.applyBgColorManually_(h) : goog.userAgent.OPERA ? this.execCommandHelper_("hiliteColor", h) : this.execCommandHelper_(a, h));
      break;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.LINK:
      g = this.toggleLink_(h);
      break;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_CENTER:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_FULL:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_RIGHT:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_LEFT:
      this.justify_(a);
      break;
    default:
      goog.userAgent.IE && a == goog.editor.plugins.BasicTextFormatter.COMMAND.FORMAT_BLOCK && h && (h = "<" + h + ">");
      if(a == goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_COLOR && goog.isNull(h)) {
        break
      }
      switch(a) {
        case goog.editor.plugins.BasicTextFormatter.COMMAND.INDENT:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.OUTDENT:
          goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && (goog.userAgent.GECKO && (d = true), goog.userAgent.OPERA && (d = a == goog.editor.plugins.BasicTextFormatter.COMMAND.OUTDENT ? !this.getDocument_().queryCommandEnabled("outdent") : true));
        case goog.editor.plugins.BasicTextFormatter.COMMAND.ORDERED_LIST:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.UNORDERED_LIST:
          goog.editor.BrowserFeature.LEAVES_P_WHEN_REMOVING_LISTS && this.queryCommandStateInternal_(this.getDocument_(), a) ? e = this.fieldObject.queryCommandValue(goog.editor.Command.DEFAULT_TAG) != goog.dom.TagName.P : goog.editor.BrowserFeature.CAN_LISTIFY_BR || this.convertBreaksToDivs_(), goog.userAgent.GECKO && goog.editor.BrowserFeature.FORGETS_FORMATTING_WHEN_LISTIFYING && !this.queryCommandValue(a) && (f |= this.beforeInsertListGecko_());
        case goog.editor.plugins.BasicTextFormatter.COMMAND.FORMAT_BLOCK:
          c = !!this.fieldObject.getPluginByClassId("Bidi");
          break;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.SUBSCRIPT:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.SUPERSCRIPT:
          goog.editor.BrowserFeature.NESTS_SUBSCRIPT_SUPERSCRIPT && this.applySubscriptSuperscriptWorkarounds_(a);
          break;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.UNDERLINE:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.BOLD:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.ITALIC:
          d = goog.userAgent.GECKO && goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && this.queryCommandValue(a);
          break;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_COLOR:
        ;
        case goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_FACE:
          d = goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && goog.userAgent.GECKO
      }
      this.execCommandHelper_(a, h, c, d);
      f && this.getDocument_().execCommand("Delete", false, true);
      e && this.getDocument_().execCommand("FormatBlock", false, "<div>")
  }
  goog.userAgent.GECKO && !this.fieldObject.inModalMode() && this.focusField_();
  return g
};
goog.editor.plugins.BasicTextFormatter.prototype.focusField_ = function() {
  this.getFieldDomHelper().getWindow().focus()
};
goog.editor.plugins.BasicTextFormatter.prototype.queryCommandValue = function(a) {
  var b;
  switch(a) {
    case goog.editor.plugins.BasicTextFormatter.COMMAND.LINK:
      return this.isNodeInState_(goog.dom.TagName.A);
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_CENTER:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_FULL:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_RIGHT:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.JUSTIFY_LEFT:
      return this.isJustification_(a);
    case goog.editor.plugins.BasicTextFormatter.COMMAND.FORMAT_BLOCK:
      return goog.editor.plugins.BasicTextFormatter.getSelectionBlockState_(this.fieldObject.getRange());
    case goog.editor.plugins.BasicTextFormatter.COMMAND.INDENT:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.OUTDENT:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.HORIZONTAL_RULE:
      return false;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_SIZE:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_FACE:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.FONT_COLOR:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.BACKGROUND_COLOR:
      return this.queryCommandValueInternal_(this.getDocument_(), a, goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && goog.userAgent.GECKO);
    case goog.editor.plugins.BasicTextFormatter.COMMAND.UNDERLINE:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.BOLD:
    ;
    case goog.editor.plugins.BasicTextFormatter.COMMAND.ITALIC:
      b = goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && goog.userAgent.GECKO;
    default:
      return this.queryCommandStateInternal_(this.getDocument_(), a, b)
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.prepareContentsHtml = function(a) {
  goog.editor.BrowserFeature.COLLAPSES_EMPTY_NODES && a.match(/^\s*<script/i) && (a = "&nbsp;" + a);
  goog.editor.BrowserFeature.CONVERT_TO_B_AND_I_TAGS && (a = a.replace(/<(\/?)strong([^\w])/gi, "<$1b$2"), a = a.replace(/<(\/?)em([^\w])/gi, "<$1i$2"));
  return a
};
goog.editor.plugins.BasicTextFormatter.prototype.cleanContentsDom = function(a) {
  for(var a = a.getElementsByTagName(goog.dom.TagName.IMG), b = 0, c;c = a[b];b++) {
    if(goog.editor.BrowserFeature.SHOWS_CUSTOM_ATTRS_IN_INNER_HTML && (c.removeAttribute("tabIndex"), c.removeAttribute("tabIndexSet"), goog.removeUid(c), c.oldTabIndex)) {
      c.tabIndex = c.oldTabIndex
    }
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.cleanContentsHtml = function(a) {
  if(goog.editor.BrowserFeature.MOVES_STYLE_TO_HEAD) {
    for(var b = this.fieldObject.getEditableDomHelper().getElementsByTagNameAndClass(goog.dom.TagName.HEAD), c = [], d = b.length, e = 1;e < d;++e) {
      for(var f = b[e].getElementsByTagName(goog.dom.TagName.STYLE), g = f.length, h = 0;h < g;++h) {
        c.push(f[h].outerHTML)
      }
    }
    return c.join("") + a
  }
  return a
};
goog.editor.plugins.BasicTextFormatter.prototype.handleKeyboardShortcut = function(a, b, c) {
  if(!c) {
    return false
  }
  var d;
  switch(b) {
    case "b":
      d = goog.editor.plugins.BasicTextFormatter.COMMAND.BOLD;
      break;
    case "i":
      d = goog.editor.plugins.BasicTextFormatter.COMMAND.ITALIC;
      break;
    case "u":
      d = goog.editor.plugins.BasicTextFormatter.COMMAND.UNDERLINE;
      break;
    case "s":
      return true
  }
  return d ? (this.fieldObject.execCommand(d), true) : false
};
goog.editor.plugins.BasicTextFormatter.BR_REGEXP_ = goog.userAgent.IE ? /<br([^\/>]*)\/?>/gi : /<br([^\/>]*)\/?>(?!<\/(div|p)>)/gi;
goog.editor.plugins.BasicTextFormatter.prototype.convertBreaksToDivs_ = function() {
  if(!goog.userAgent.IE && !goog.userAgent.OPERA) {
    return false
  }
  var a = this.getRange_(), b = a.getContainerElement(), c = this.getDocument_();
  goog.editor.plugins.BasicTextFormatter.BR_REGEXP_.lastIndex = 0;
  return goog.editor.plugins.BasicTextFormatter.BR_REGEXP_.test(b.innerHTML) ? (a = a.saveUsingCarets(), b.tagName == goog.dom.TagName.P ? goog.editor.plugins.BasicTextFormatter.convertParagraphToDiv_(b, true) : (b.innerHTML = b.innerHTML.replace(goog.editor.plugins.BasicTextFormatter.BR_REGEXP_, '<p$1 trtempbr="temp_br">'), b = goog.array.toArray(b.getElementsByTagName(goog.dom.TagName.P)), goog.iter.forEach(b, function(a) {
    if(a.getAttribute("trtempbr") == "temp_br") {
      a.removeAttribute("trtempbr");
      if(goog.string.isBreakingWhitespace(goog.dom.getTextContent(a))) {
        var b = goog.userAgent.IE ? c.createTextNode(goog.string.Unicode.NBSP) : c.createElement(goog.dom.TagName.BR);
        a.appendChild(b)
      }
      goog.editor.plugins.BasicTextFormatter.convertParagraphToDiv_(a)
    }
  })), a.restore(), true) : false
};
goog.editor.plugins.BasicTextFormatter.convertParagraphToDiv_ = function(a, b) {
  if(goog.userAgent.IE || goog.userAgent.OPERA) {
    var c = a.outerHTML.replace(/<(\/?)p/gi, "<$1div");
    b && (c = c.replace(goog.editor.plugins.BasicTextFormatter.BR_REGEXP_, "</div><div$1>"));
    goog.userAgent.OPERA && !/<\/div>$/i.test(c) && (c += "</div>");
    a.outerHTML = c
  }
};
goog.editor.plugins.BasicTextFormatter.convertToRealExecCommand_ = function(a) {
  return a.indexOf("+") == 0 ? a.substring(1) : a
};
goog.editor.plugins.BasicTextFormatter.prototype.justify_ = function(a) {
  this.execCommandHelper_(a, null, false, true);
  goog.userAgent.GECKO && this.execCommandHelper_(a, null, false, true);
  (!goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS || !goog.userAgent.GECKO) && goog.iter.forEach(this.fieldObject.getRange(), goog.editor.plugins.BasicTextFormatter.convertContainerToTextAlign_)
};
goog.editor.plugins.BasicTextFormatter.convertContainerToTextAlign_ = function(a) {
  a = goog.editor.style.getContainer(a);
  if(a.align) {
    a.style.textAlign = a.align, a.removeAttribute("align")
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.execCommandHelper_ = function(a, b, c, d) {
  var e = null;
  c && (e = this.fieldObject.queryCommandValue(goog.editor.Command.DIR_RTL) ? "rtl" : this.fieldObject.queryCommandValue(goog.editor.Command.DIR_LTR) ? "ltr" : null);
  var a = goog.editor.plugins.BasicTextFormatter.convertToRealExecCommand_(a), f, g;
  goog.userAgent.IE && (g = this.applyExecCommandIEFixes_(a), f = g[0], g = g[1]);
  goog.userAgent.WEBKIT && (f = this.applyExecCommandSafariFixes_(a));
  goog.userAgent.GECKO && this.applyExecCommandGeckoFixes_(a);
  goog.editor.BrowserFeature.DOESNT_OVERRIDE_FONT_SIZE_IN_STYLE_ATTR && a.toLowerCase() == "fontsize" && this.removeFontSizeFromStyleAttrs_();
  c = this.getDocument_();
  d && goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && (c.execCommand("styleWithCSS", false, true), goog.userAgent.OPERA && this.invalidateInlineCss_());
  c.execCommand(a, false, b);
  d && goog.editor.BrowserFeature.HAS_STYLE_WITH_CSS && c.execCommand("styleWithCSS", false, false);
  goog.userAgent.WEBKIT && !goog.userAgent.isVersion("526") && a.toLowerCase() == "formatblock" && b && /^[<]?h\d[>]?$/i.test(b) && this.cleanUpSafariHeadings_();
  /insert(un)?orderedlist/i.test(a) && (goog.userAgent.WEBKIT && this.fixSafariLists_(), goog.userAgent.IE && (this.fixIELists_(), g && goog.dom.removeNode(g)));
  f && goog.dom.removeNode(f);
  e && this.fieldObject.execCommand(e)
};
goog.editor.plugins.BasicTextFormatter.prototype.applyBgColorManually_ = function(a) {
  var b = goog.userAgent.GECKO, c = this.fieldObject.getRange(), d, e;
  if(c && c.isCollapsed()) {
    d = this.getFieldDomHelper().createTextNode(b ? " " : ""), e = c.getStartNode(), e = e.nodeType == goog.dom.NodeType.ELEMENT ? e : e.parentNode, e.innerHTML == "" ? (e.style.textIndent = "-10000px", e.appendChild(d)) : (e = this.getFieldDomHelper().createDom("span", {style:"text-indent:-10000px"}, d), c.replaceContentsWithNode(e)), goog.dom.Range.createFromNodeContents(d).select()
  }
  this.execCommandHelper_("hiliteColor", a, false, true);
  if(d) {
    if(b) {
      d.data = ""
    }
    e.style.textIndent = ""
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.toggleLink_ = function(a) {
  this.fieldObject.isSelectionEditable() || this.focusField_();
  var b = this.getRange_(), c = b && b.getContainerElement();
  if((c = goog.dom.getAncestorByTagNameAndClass(c, goog.dom.TagName.A)) && goog.editor.node.isEditable(c)) {
    goog.dom.flattenElement(c)
  }else {
    if(a = this.createLink_(b, "/", a)) {
      if(!this.fieldObject.execCommand(goog.editor.Command.MODAL_LINK_EDITOR, a)) {
        if(b = this.fieldObject.getAppWindow().prompt(goog.ui.editor.messages.MSG_LINK_TO, "http://")) {
          a.setTextAndUrl(a.getCurrentText() || b, b), a.placeCursorRightOf()
        }else {
          return b = goog.editor.range.saveUsingNormalizedCarets(goog.dom.Range.createFromNodeContents(a.getAnchor())), a.removeLink(), b.restore().select(), null
        }
      }
      return a
    }
  }
  return null
};
goog.editor.plugins.BasicTextFormatter.prototype.createLink_ = function(a, b, c) {
  var d = null, e = a && a.getContainerElement();
  if(e && e.tagName == goog.dom.TagName.IMG) {
    return null
  }
  if(a && a.isCollapsed()) {
    a = a.getTextRange(0).getBrowserRangeObject(), goog.editor.BrowserFeature.HAS_W3C_RANGES ? (d = this.getFieldDomHelper().createElement(goog.dom.TagName.A), a.insertNode(d)) : goog.editor.BrowserFeature.HAS_IE_RANGES && (a.pasteHTML("<a id='newLink'></a>"), d = this.getFieldDomHelper().getElement("newLink"), d.removeAttribute("id"))
  }else {
    var f = goog.string.createUniqueString();
    this.execCommandHelper_("CreateLink", f);
    goog.array.forEach(this.fieldObject.getElement().getElementsByTagName(goog.dom.TagName.A), function(a) {
      goog.string.endsWith(a.href, f) && (d = a)
    })
  }
  return goog.editor.Link.createNewLink(d, b, c)
};
goog.editor.plugins.BasicTextFormatter.brokenExecCommandsIE_ = {indent:1, outdent:1, insertOrderedList:1, insertUnorderedList:1, justifyCenter:1, justifyFull:1, justifyRight:1, justifyLeft:1, ltr:1, rtl:1};
goog.editor.plugins.BasicTextFormatter.blockquoteHatingCommandsIE_ = {insertOrderedList:1, insertUnorderedList:1};
goog.editor.plugins.BasicTextFormatter.prototype.applySubscriptSuperscriptWorkarounds_ = function(a) {
  if(!this.queryCommandValue(a)) {
    var a = a == goog.editor.plugins.BasicTextFormatter.COMMAND.SUBSCRIPT ? goog.editor.plugins.BasicTextFormatter.COMMAND.SUPERSCRIPT : goog.editor.plugins.BasicTextFormatter.COMMAND.SUBSCRIPT, b = goog.editor.plugins.BasicTextFormatter.convertToRealExecCommand_(a);
    this.queryCommandValue(a) || this.getDocument_().execCommand(b, false, null);
    this.getDocument_().execCommand(b, false, null)
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.removeFontSizeFromStyleAttrs_ = function() {
  var a = goog.editor.range.expand(this.fieldObject.getRange(), this.fieldObject.getElement());
  goog.iter.forEach(goog.iter.filter(a, function(b, c, d) {
    return d.isStartTag() && a.containsNode(b)
  }), function(a) {
    goog.style.setStyle(a, "font-size", "");
    goog.userAgent.GECKO && a.style.length == 0 && a.getAttribute("style") != null && a.removeAttribute("style")
  })
};
goog.editor.plugins.BasicTextFormatter.prototype.applyExecCommandIEFixes_ = function(a) {
  var b = [], c = null, d = this.getRange_(), e = this.getFieldDomHelper();
  if(a in goog.editor.plugins.BasicTextFormatter.blockquoteHatingCommandsIE_) {
    var f = d && d.getContainerElement();
    if(f) {
      for(var g = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.BLOCKQUOTE, null, f), h, i = 0;i < g.length;i++) {
        if(d.containsNode(g[i])) {
          h = g[i];
          break
        }
      }
      if(f = h || goog.dom.getAncestorByTagNameAndClass(f, "BLOCKQUOTE")) {
        c = e.createDom("div", {style:"height:0"}), goog.dom.appendChild(f, c), b.push(c), h ? d = goog.dom.Range.createFromNodes(h, 0, c, 0) : d.containsNode(c) && (d = goog.dom.Range.createFromNodes(d.getStartNode(), d.getStartOffset(), c, 0)), d.select()
      }
    }
  }
  h = this.fieldObject;
  !h.usesIframe() && !c && a in goog.editor.plugins.BasicTextFormatter.brokenExecCommandsIE_ && (a = h.getElement(), d && d.isCollapsed() && !goog.dom.getFirstElementChild(a) && (c = d.getTextRange(0).getBrowserRangeObject(), d = c.duplicate(), d.moveToElementText(a), d.collapse(false), d.isEqual(c) && (d = e.createTextNode(goog.string.Unicode.NBSP), a.appendChild(d), c.move("character", 1), c.move("character", -1), c.select(), b.push(d))), c = e.createDom("div", {style:"height:0"}), goog.dom.appendChild(a, 
  c), b.push(c));
  return b
};
goog.editor.plugins.BasicTextFormatter.prototype.cleanUpSafariHeadings_ = function() {
  goog.iter.forEach(this.getRange_(), function(a) {
    if(a.className == "Apple-style-span") {
      a.style.fontSize = "", a.style.fontWeight = ""
    }
  })
};
goog.editor.plugins.BasicTextFormatter.prototype.fixSafariLists_ = function() {
  var a = false;
  goog.iter.forEach(this.getRange_(), function(b) {
    var c = b.tagName;
    if(c == goog.dom.TagName.UL || c == goog.dom.TagName.OL) {
      if(a) {
        if(c = goog.dom.getPreviousElementSibling(b)) {
          var d = b.ownerDocument.createRange();
          d.setStartAfter(c);
          d.setEndBefore(b);
          if(goog.string.isEmpty(d.toString()) && c.nodeName == b.nodeName) {
            for(;c.lastChild;) {
              b.insertBefore(c.lastChild, b.firstChild)
            }
            c.parentNode.removeChild(c)
          }
        }
      }else {
        a = true
      }
    }
  })
};
goog.editor.plugins.BasicTextFormatter.orderedListTypes_ = {1:1, a:1, A:1, i:1, I:1};
goog.editor.plugins.BasicTextFormatter.unorderedListTypes_ = {disc:1, circle:1, square:1};
goog.editor.plugins.BasicTextFormatter.prototype.fixIELists_ = function() {
  for(var a = this.getRange_(), a = a && a.getContainer();a && a.tagName != goog.dom.TagName.UL && a.tagName != goog.dom.TagName.OL;) {
    a = a.parentNode
  }
  if(a) {
    a = a.parentNode
  }
  if(a) {
    var b = goog.array.toArray(a.getElementsByTagName(goog.dom.TagName.UL));
    goog.array.extend(b, goog.array.toArray(a.getElementsByTagName(goog.dom.TagName.OL)));
    goog.array.forEach(b, function(a) {
      var b = a.type;
      if(b && !(a.tagName == goog.dom.TagName.UL ? goog.editor.plugins.BasicTextFormatter.unorderedListTypes_ : goog.editor.plugins.BasicTextFormatter.orderedListTypes_)[b]) {
        a.type = ""
      }
    })
  }
};
goog.editor.plugins.BasicTextFormatter.brokenExecCommandsSafari_ = {justifyCenter:1, justifyFull:1, justifyRight:1, justifyLeft:1, formatBlock:1};
goog.editor.plugins.BasicTextFormatter.hangingExecCommandWebkit_ = {insertOrderedList:1, insertUnorderedList:1};
goog.editor.plugins.BasicTextFormatter.prototype.applyExecCommandSafariFixes_ = function(a) {
  var b;
  goog.editor.plugins.BasicTextFormatter.brokenExecCommandsSafari_[a] && (b = this.getFieldDomHelper().createDom("div", {style:"height: 0"}, "x"), goog.dom.appendChild(this.fieldObject.getElement(), b));
  goog.editor.plugins.BasicTextFormatter.hangingExecCommandWebkit_[a] && (a = this.fieldObject.getElement(), b = this.getFieldDomHelper().createDom("div", {style:"height: 0"}, "x"), a.insertBefore(b, a.firstChild));
  return b
};
goog.editor.plugins.BasicTextFormatter.prototype.applyExecCommandGeckoFixes_ = function(a) {
  if(goog.userAgent.isVersion("1.9") && a.toLowerCase() == "formatblock") {
    var a = this.getRange_(), b = a.getStartNode();
    if(a.isCollapsed() && b && b.tagName == goog.dom.TagName.BODY) {
      var c = a.getStartOffset();
      if((b = b.childNodes[c]) && b.tagName == goog.dom.TagName.BR) {
        a = a.getBrowserRangeObject(), a.setStart(b, 0), a.setEnd(b, 0)
      }
    }
  }
};
goog.editor.plugins.BasicTextFormatter.prototype.invalidateInlineCss_ = function() {
  var a = [], b = this.fieldObject.getRange().getContainerElement();
  do {
    a.push(b)
  }while(b = b.parentNode);
  a = goog.iter.chain(goog.iter.toIterator(this.fieldObject.getRange()), goog.iter.toIterator(a));
  a = goog.iter.filter(a, goog.editor.style.isContainer);
  goog.iter.forEach(a, function(a) {
    var b = a.style.outline;
    a.style.outline = "0px solid red";
    a.style.outline = b
  })
};
goog.editor.plugins.BasicTextFormatter.prototype.beforeInsertListGecko_ = function() {
  var a = this.fieldObject.queryCommandValue(goog.editor.Command.DEFAULT_TAG);
  if(a == goog.dom.TagName.P || a == goog.dom.TagName.DIV) {
    return false
  }
  a = this.getRange_();
  if(a.isCollapsed() && a.getContainer().nodeType != goog.dom.NodeType.TEXT) {
    var b = this.getFieldDomHelper().createTextNode(goog.string.Unicode.NBSP);
    a.insertNode(b, false);
    goog.dom.Range.createFromNodeContents(b).select();
    return true
  }
  return false
};
goog.editor.plugins.BasicTextFormatter.getSelectionBlockState_ = function(a) {
  var b = null;
  goog.iter.forEach(a, function(a, d, e) {
    if(!e.isEndTag()) {
      a = goog.editor.style.getContainer(a).tagName;
      b = b || a;
      if(b != a) {
        throw b = null, goog.iter.StopIteration;
      }
      e.skipTag()
    }
  });
  return b
};
goog.editor.plugins.BasicTextFormatter.SUPPORTED_JUSTIFICATIONS_ = {center:1, justify:1, right:1, left:1};
goog.editor.plugins.BasicTextFormatter.prototype.isJustification_ = function(a) {
  a = a.replace("+justify", "").toLowerCase();
  a == "full" && (a = "justify");
  var b = this.fieldObject.getPluginByClassId("Bidi");
  if(b) {
    return a == b.getSelectionAlignment()
  }else {
    var c = this.getRange_();
    if(!c) {
      return false
    }
    for(var d = c.getContainerElement(), b = goog.array.filter(d.childNodes, function(a) {
      return goog.editor.node.isImportant(a) && c.containsNode(a, true)
    }), b = b.length ? b : [d], d = 0;d < b.length;d++) {
      var e = goog.editor.style.getContainer(b[d]);
      if(a != goog.editor.plugins.BasicTextFormatter.getNodeJustification_(e)) {
        return false
      }
    }
    return true
  }
};
goog.editor.plugins.BasicTextFormatter.getNodeJustification_ = function(a) {
  var b = goog.style.getComputedTextAlign(a), b = b.replace(/^-(moz|webkit)-/, "");
  goog.editor.plugins.BasicTextFormatter.SUPPORTED_JUSTIFICATIONS_[b] || (b = a.align || "left");
  return b
};
goog.editor.plugins.BasicTextFormatter.prototype.isNodeInState_ = function(a) {
  var b = this.getRange_(), b = b && b.getContainerElement(), a = goog.dom.getAncestorByTagNameAndClass(b, a);
  return!!a && goog.editor.node.isEditable(a)
};
goog.editor.plugins.BasicTextFormatter.prototype.queryCommandStateInternal_ = function(a, b, c) {
  return this.queryCommandHelper_(true, a, b, c)
};
goog.editor.plugins.BasicTextFormatter.prototype.queryCommandValueInternal_ = function(a, b, c) {
  return this.queryCommandHelper_(false, a, b, c)
};
goog.editor.plugins.BasicTextFormatter.prototype.queryCommandHelper_ = function(a, b, c, d) {
  c = goog.editor.plugins.BasicTextFormatter.convertToRealExecCommand_(c);
  if(d) {
    var e = this.getDocument_();
    e.execCommand("styleWithCSS", false, true)
  }
  a = a ? b.queryCommandState(c) : b.queryCommandValue(c);
  d && e.execCommand("styleWithCSS", false, false);
  return a
};
goog.editor.plugins.LinkBubble = function(a) {
  goog.editor.plugins.AbstractBubblePlugin.call(this);
  this.extraActions_ = goog.array.toArray(arguments);
  this.actionSpans_ = []
};
goog.inherits(goog.editor.plugins.LinkBubble, goog.editor.plugins.AbstractBubblePlugin);
goog.editor.plugins.LinkBubble.LINK_TEXT_ID_ = "tr_link-text";
goog.editor.plugins.LinkBubble.TEST_LINK_SPAN_ID_ = "tr_test-link-span";
goog.editor.plugins.LinkBubble.TEST_LINK_ID_ = "tr_test-link";
goog.editor.plugins.LinkBubble.CHANGE_LINK_SPAN_ID_ = "tr_change-link-span";
goog.editor.plugins.LinkBubble.CHANGE_LINK_ID_ = "tr_change-link";
goog.editor.plugins.LinkBubble.DELETE_LINK_SPAN_ID_ = "tr_delete-link-span";
goog.editor.plugins.LinkBubble.DELETE_LINK_ID_ = "tr_delete-link";
goog.editor.plugins.LinkBubble.LINK_DIV_ID_ = "tr_link-div";
var MSG_LINK_BUBBLE_TEST_LINK = goog.getMsg("Go to link: "), MSG_LINK_BUBBLE_CHANGE = goog.getMsg("Change"), MSG_LINK_BUBBLE_REMOVE = goog.getMsg("Remove");
goog.editor.plugins.LinkBubble.prototype.stopReferrerLeaks_ = false;
goog.editor.plugins.LinkBubble.prototype.stopReferrerLeaks = function() {
  this.stopReferrerLeaks_ = true
};
goog.editor.plugins.LinkBubble.prototype.getTrogClassId = function() {
  return"LinkBubble"
};
goog.editor.plugins.LinkBubble.prototype.getBubbleTargetFromSelection = function(a) {
  a = goog.dom.getAncestorByTagNameAndClass(a, goog.dom.TagName.A);
  if(!a) {
    var b = this.fieldObject.getRange();
    if(b && b.isCollapsed() && b.getStartOffset() == 0) {
      (b = b.getStartNode().previousSibling) && b.tagName == goog.dom.TagName.A && (a = b)
    }
  }
  return a
};
goog.editor.plugins.LinkBubble.prototype.setTestLinkUrlFn = function(a) {
  this.testLinkUrlFn_ = a
};
goog.editor.plugins.LinkBubble.prototype.getTargetUrl = function() {
  return this.getTargetElement().getAttribute("href") || ""
};
goog.editor.plugins.LinkBubble.prototype.getBubbleType = function() {
  return goog.dom.TagName.A
};
goog.editor.plugins.LinkBubble.prototype.getBubbleTitle = function() {
  return goog.ui.editor.messages.MSG_LINK_CAPTION
};
goog.editor.plugins.LinkBubble.prototype.createBubbleContents = function(a) {
  var b = this.getLinkToTextObj_(), c = b.valid ? "black" : "red";
  if(goog.editor.Link.isLikelyEmailAddress(b.linkText) || !b.valid) {
    c = this.dom_.createDom(goog.dom.TagName.SPAN, {id:goog.editor.plugins.LinkBubble.LINK_TEXT_ID_, style:"color:" + c}, this.dom_.createTextNode(b.linkText))
  }else {
    var d = this.dom_.createDom(goog.dom.TagName.SPAN, {id:goog.editor.plugins.LinkBubble.TEST_LINK_SPAN_ID_}, MSG_LINK_BUBBLE_TEST_LINK), c = this.dom_.createDom(goog.dom.TagName.SPAN, {id:goog.editor.plugins.LinkBubble.LINK_TEXT_ID_, style:"color:" + c}, ""), b = goog.string.truncateMiddle(b.linkText, 48);
    this.createLink(goog.editor.plugins.LinkBubble.TEST_LINK_ID_, this.dom_.createTextNode(b).data, this.testLink, c)
  }
  var e = this.createLinkOption(goog.editor.plugins.LinkBubble.CHANGE_LINK_SPAN_ID_);
  this.createLink(goog.editor.plugins.LinkBubble.CHANGE_LINK_ID_, MSG_LINK_BUBBLE_CHANGE, this.showLinkDialog_, e);
  this.actionSpans_ = [];
  for(b = 0;b < this.extraActions_.length;b++) {
    var f = this.extraActions_[b], g = this.createLinkOption(f.spanId_);
    this.actionSpans_.push(g);
    this.createLink(f.linkId_, f.message_, function() {
      f.actionFn_(this.getTargetUrl())
    }, g)
  }
  g = this.createLinkOption(goog.editor.plugins.LinkBubble.DELETE_LINK_SPAN_ID_);
  this.createLink(goog.editor.plugins.LinkBubble.DELETE_LINK_ID_, MSG_LINK_BUBBLE_REMOVE, this.deleteLink_, g);
  this.onShow();
  d = this.dom_.createDom(goog.dom.TagName.DIV, {id:goog.editor.plugins.LinkBubble.LINK_DIV_ID_}, d || "", c, e);
  for(b = 0;b < this.actionSpans_.length;b++) {
    d.appendChild(this.actionSpans_[b])
  }
  d.appendChild(g);
  goog.dom.appendChild(a, d)
};
goog.editor.plugins.LinkBubble.prototype.testLink = function() {
  goog.window.open(this.getTestLinkAction_(), {target:"_blank", noreferrer:this.stopReferrerLeaks_}, this.fieldObject.getAppWindow())
};
goog.editor.plugins.LinkBubble.prototype.isInvalidUrl = goog.functions.FALSE;
goog.editor.plugins.LinkBubble.prototype.getLinkToTextObj_ = function() {
  var a, b = this.getTargetUrl();
  this.isInvalidUrl(b) ? (b = goog.getMsg("invalid url"), a = true) : goog.editor.Link.isMailto(b) && (b = b.substring(7));
  return{linkText:b, valid:!a}
};
goog.editor.plugins.LinkBubble.prototype.showLinkDialog_ = function() {
  this.fieldObject.execCommand(goog.editor.Command.MODAL_LINK_EDITOR, new goog.editor.Link(this.getTargetElement(), false));
  this.closeBubble()
};
goog.editor.plugins.LinkBubble.prototype.deleteLink_ = function() {
  this.fieldObject.dispatchBeforeChange();
  var a = this.getTargetElement(), b = a.lastChild;
  goog.dom.flattenElement(a);
  goog.editor.range.placeCursorNextTo(b, false);
  this.closeBubble();
  this.fieldObject.dispatchChange()
};
goog.editor.plugins.LinkBubble.prototype.onShow = function() {
  if(this.dom_.getElement(goog.editor.plugins.LinkBubble.LINK_DIV_ID_)) {
    var a = this.dom_.getElement(goog.editor.plugins.LinkBubble.TEST_LINK_SPAN_ID_);
    if(a) {
      var b = this.getTargetUrl();
      goog.style.showElement(a, !goog.editor.Link.isMailto(b))
    }
    for(a = 0;a < this.extraActions_.length;a++) {
      var b = this.extraActions_[a], c = this.dom_.getElement(b.spanId_);
      c && goog.style.showElement(c, b.toShowFn_(this.getTargetUrl()))
    }
  }
};
goog.editor.plugins.LinkBubble.prototype.getTestLinkAction_ = function() {
  var a = this.getTargetUrl();
  return this.testLinkUrlFn_ ? this.testLinkUrlFn_(a) : a
};
goog.editor.plugins.LinkBubble.Action = function(a, b, c, d, e) {
  this.spanId_ = a;
  this.linkId_ = b;
  this.message_ = c;
  this.toShowFn_ = d;
  this.actionFn_ = e
};
goog.ui.editor.DefaultToolbar = {};
goog.ui.editor.DefaultToolbar.MSG_FONT_NORMAL = goog.getMsg("Normal");
goog.ui.editor.DefaultToolbar.MSG_FONT_NORMAL_SERIF = goog.getMsg("Normal / serif");
goog.ui.editor.DefaultToolbar.FONTS_ = [{caption:goog.ui.editor.DefaultToolbar.MSG_FONT_NORMAL, value:"arial,sans-serif"}, {caption:goog.ui.editor.DefaultToolbar.MSG_FONT_NORMAL_SERIF, value:"times new roman,serif"}, {caption:"Courier New", value:"courier new,monospace"}, {caption:"Georgia", value:"georgia,serif"}, {caption:"Trebuchet", value:"trebuchet ms,sans-serif"}, {caption:"Verdana", value:"verdana,sans-serif"}];
goog.ui.editor.DefaultToolbar.I18N_FONTS_ = {ja:[{caption:"\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af", value:"ms pgothic,sans-serif"}, {caption:"\uff2d\uff33 \uff30\u660e\u671d", value:"ms pmincho,serif"}, {caption:"\uff2d\uff33 \u30b4\u30b7\u30c3\u30af", value:"ms gothic,monospace"}], ko:[{caption:"\uad74\ub9bc", value:"gulim,sans-serif"}, {caption:"\ubc14\ud0d5", value:"batang,serif"}, {caption:"\uad74\ub9bc\uccb4", value:"gulimche,monospace"}], "zh-tw":[{caption:"\u65b0\u7d30\u660e\u9ad4", value:"pmingliu,serif"}, 
{caption:"\u7d30\u660e\u9ad4", value:"mingliu,serif"}], "zh-cn":[{caption:"\u5b8b\u4f53", value:"simsun,serif"}, {caption:"\u9ed1\u4f53", value:"simhei,sans-serif"}, {caption:"MS Song", value:"ms song,monospace"}]};
goog.ui.editor.DefaultToolbar.locale_ = "en-us";
goog.ui.editor.DefaultToolbar.setLocale = function(a) {
  goog.ui.editor.DefaultToolbar.locale_ = a
};
goog.ui.editor.DefaultToolbar.addDefaultFonts = function(a) {
  var b = goog.ui.editor.DefaultToolbar.locale_.replace(/_/, "-").toLowerCase(), c = [];
  b in goog.ui.editor.DefaultToolbar.I18N_FONTS_ && (c = goog.ui.editor.DefaultToolbar.I18N_FONTS_[b]);
  c.length && goog.ui.editor.ToolbarFactory.addFonts(a, c);
  goog.ui.editor.ToolbarFactory.addFonts(a, goog.ui.editor.DefaultToolbar.FONTS_)
};
goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_SMALL = goog.getMsg("Small");
goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_NORMAL = goog.getMsg("Normal");
goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_LARGE = goog.getMsg("Large");
goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_HUGE = goog.getMsg("Huge");
goog.ui.editor.DefaultToolbar.FONT_SIZES_ = [{caption:goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_SMALL, value:1}, {caption:goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_NORMAL, value:2}, {caption:goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_LARGE, value:4}, {caption:goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_HUGE, value:6}];
goog.ui.editor.DefaultToolbar.addDefaultFontSizes = function(a) {
  goog.ui.editor.ToolbarFactory.addFontSizes(a, goog.ui.editor.DefaultToolbar.FONT_SIZES_)
};
goog.ui.editor.DefaultToolbar.MSG_FORMAT_HEADING = goog.getMsg("Heading");
goog.ui.editor.DefaultToolbar.MSG_FORMAT_SUBHEADING = goog.getMsg("Subheading");
goog.ui.editor.DefaultToolbar.MSG_FORMAT_MINOR_HEADING = goog.getMsg("Minor heading");
goog.ui.editor.DefaultToolbar.MSG_FORMAT_NORMAL = goog.getMsg("Normal");
goog.ui.editor.DefaultToolbar.FORMAT_OPTIONS_ = [{caption:goog.ui.editor.DefaultToolbar.MSG_FORMAT_HEADING, command:goog.dom.TagName.H2}, {caption:goog.ui.editor.DefaultToolbar.MSG_FORMAT_SUBHEADING, command:goog.dom.TagName.H3}, {caption:goog.ui.editor.DefaultToolbar.MSG_FORMAT_MINOR_HEADING, command:goog.dom.TagName.H4}, {caption:goog.ui.editor.DefaultToolbar.MSG_FORMAT_NORMAL, command:goog.dom.TagName.P}];
goog.ui.editor.DefaultToolbar.addDefaultFormatOptions = function(a) {
  goog.ui.editor.ToolbarFactory.addFormatOptions(a, goog.ui.editor.DefaultToolbar.FORMAT_OPTIONS_)
};
goog.ui.editor.DefaultToolbar.makeDefaultToolbar = function(a, b) {
  var c = b || goog.style.isRightToLeft(a) ? goog.ui.editor.DefaultToolbar.DEFAULT_BUTTONS_RTL : goog.ui.editor.DefaultToolbar.DEFAULT_BUTTONS;
  return goog.ui.editor.DefaultToolbar.makeToolbar(c, a, b)
};
goog.ui.editor.DefaultToolbar.makeToolbar = function(a, b, c) {
  for(var d = goog.dom.getDomHelper(b), e = [], f = 0, g;g = a[f];f++) {
    goog.isString(g) && (g = goog.ui.editor.DefaultToolbar.makeBuiltInToolbarButton(g, d)), g && e.push(g)
  }
  return goog.ui.editor.ToolbarFactory.makeToolbar(e, b, c)
};
goog.ui.editor.DefaultToolbar.makeBuiltInToolbarButton = function(a, b) {
  var c, d = goog.ui.editor.DefaultToolbar.buttons_[a];
  if(d) {
    c = d.factory || goog.ui.editor.ToolbarFactory.makeToggleButton;
    var e = d.command, f = d.tooltip, g = d.caption, h = d.classes, i = b || goog.dom.getDomHelper();
    c = c(e, f, g, h, null, i);
    if(d.queryable) {
      c.queryable = true
    }
  }
  return c
};
goog.ui.editor.DefaultToolbar.DEFAULT_BUTTONS = [goog.editor.Command.IMAGE, goog.editor.Command.LINK, goog.editor.Command.BOLD, goog.editor.Command.ITALIC, goog.editor.Command.UNORDERED_LIST, goog.editor.Command.FONT_COLOR, goog.editor.Command.FONT_FACE, goog.editor.Command.FONT_SIZE, goog.editor.Command.JUSTIFY_LEFT, goog.editor.Command.JUSTIFY_CENTER, goog.editor.Command.JUSTIFY_RIGHT, goog.editor.Command.EDIT_HTML];
goog.ui.editor.DefaultToolbar.DEFAULT_BUTTONS_RTL = [goog.editor.Command.IMAGE, goog.editor.Command.LINK, goog.editor.Command.BOLD, goog.editor.Command.ITALIC, goog.editor.Command.UNORDERED_LIST, goog.editor.Command.FONT_COLOR, goog.editor.Command.FONT_FACE, goog.editor.Command.FONT_SIZE, goog.editor.Command.JUSTIFY_RIGHT, goog.editor.Command.JUSTIFY_CENTER, goog.editor.Command.JUSTIFY_LEFT, goog.editor.Command.DIR_RTL, goog.editor.Command.DIR_LTR, goog.editor.Command.EDIT_HTML];
goog.ui.editor.DefaultToolbar.rtlButtonFactory_ = function(a, b, c, d, e, f) {
  var g = goog.ui.editor.ToolbarFactory.makeToggleButton(a, b, c, d, e, f);
  g.updateFromValue = function(a) {
    a = !!a;
    goog.dom.classes.enable(g.getParent().getElement(), "tr-rtl-mode", a);
    g.setChecked(a)
  };
  return g
};
goog.ui.editor.DefaultToolbar.undoRedoButtonFactory_ = function(a, b, c, d, e, f) {
  var g = goog.ui.editor.ToolbarFactory.makeButton(a, b, c, d, e, f);
  g.updateFromValue = function(a) {
    g.setEnabled(a)
  };
  return g
};
goog.ui.editor.DefaultToolbar.fontFaceFactory_ = function(a, b, c, d, e, f) {
  var g = goog.ui.editor.ToolbarFactory.makeSelectButton(a, b, c, d, e, f);
  goog.ui.editor.DefaultToolbar.addDefaultFonts(g);
  g.setDefaultCaption(goog.ui.editor.DefaultToolbar.MSG_FONT_NORMAL);
  goog.dom.classes.add(g.getMenu().getContentElement(), "goog-menu-noaccel");
  g.updateFromValue = function(a) {
    var b = null;
    a && a.length > 0 && (b = g.getMenu().getChild(goog.ui.editor.ToolbarFactory.getPrimaryFont(a)));
    a = g.getSelectedItem();
    b != a && g.setSelectedItem(b)
  };
  return g
};
goog.ui.editor.DefaultToolbar.fontSizeFactory_ = function(a, b, c, d, e, f) {
  var g = goog.ui.editor.ToolbarFactory.makeSelectButton(a, b, c, d, e, f);
  goog.ui.editor.DefaultToolbar.addDefaultFontSizes(g);
  g.setDefaultCaption(goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_NORMAL);
  goog.dom.classes.add(g.getMenu().getContentElement(), "goog-menu-noaccel");
  g.updateFromValue = function(a) {
    goog.isString(a) && goog.style.getLengthUnits(a) == "px" && (a = goog.ui.editor.ToolbarFactory.getLegacySizeFromPx(parseInt(a, 10)));
    a = a > 0 ? a : null;
    a != g.getValue() && g.setValue(a)
  };
  return g
};
goog.ui.editor.DefaultToolbar.colorUpdateFromValue_ = function(a, b) {
  try {
    if(goog.userAgent.IE) {
      var c = "000000" + b.toString(16), d = c.substr(c.length - 6, 6), b = (new goog.string.StringBuffer("#", d.substring(4, 6), d.substring(2, 4), d.substring(0, 2))).toString()
    }
    b != a.getValue() && a.setValue(b)
  }catch(e) {
  }
};
goog.ui.editor.DefaultToolbar.fontColorFactory_ = function(a, b, c, d, e, f) {
  a = goog.ui.editor.ToolbarFactory.makeColorMenuButton(a, b, c, d, e, f);
  a.setSelectedColor("#000");
  a.updateFromValue = goog.partial(goog.ui.editor.DefaultToolbar.colorUpdateFromValue_, a);
  return a
};
goog.ui.editor.DefaultToolbar.backgroundColorFactory_ = function(a, b, c, d, e, f) {
  a = goog.ui.editor.ToolbarFactory.makeColorMenuButton(a, b, c, d, e, f);
  a.setSelectedColor("#FFF");
  a.updateFromValue = goog.partial(goog.ui.editor.DefaultToolbar.colorUpdateFromValue_, a);
  return a
};
goog.ui.editor.DefaultToolbar.formatBlockFactory_ = function(a, b, c, d, e, f) {
  var g = goog.ui.editor.ToolbarFactory.makeSelectButton(a, b, c, d, e, f);
  goog.ui.editor.DefaultToolbar.addDefaultFormatOptions(g);
  g.setDefaultCaption(goog.ui.editor.DefaultToolbar.MSG_FORMAT_NORMAL);
  goog.dom.classes.add(g.getMenu().getContentElement(), "goog-menu-noaccel");
  g.updateFromValue = function(a) {
    a = a && a.length > 0 ? a : null;
    a != g.getValue() && g.setValue(a)
  };
  return g
};
goog.ui.editor.DefaultToolbar.MSG_FORMAT_BLOCK_TITLE = goog.getMsg("Format");
goog.ui.editor.DefaultToolbar.MSG_FORMAT_BLOCK_CAPTION = goog.getMsg("Format");
goog.ui.editor.DefaultToolbar.MSG_UNDO_TITLE = goog.getMsg("Undo");
goog.ui.editor.DefaultToolbar.MSG_REDO_TITLE = goog.getMsg("Redo");
goog.ui.editor.DefaultToolbar.MSG_FONT_FACE_TITLE = goog.getMsg("Font");
goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_TITLE = goog.getMsg("Font size");
goog.ui.editor.DefaultToolbar.MSG_FONT_COLOR_TITLE = goog.getMsg("Text color");
goog.ui.editor.DefaultToolbar.MSG_BOLD_TITLE = goog.getMsg("Bold");
goog.ui.editor.DefaultToolbar.MSG_ITALIC_TITLE = goog.getMsg("Italic");
goog.ui.editor.DefaultToolbar.MSG_UNDERLINE_TITLE = goog.getMsg("Underline");
goog.ui.editor.DefaultToolbar.MSG_BACKGROUND_COLOR_TITLE = goog.getMsg("Text background color");
goog.ui.editor.DefaultToolbar.MSG_LINK_TITLE = goog.getMsg("Add or remove link");
goog.ui.editor.DefaultToolbar.MSG_ORDERED_LIST_TITLE = goog.getMsg("Numbered list");
goog.ui.editor.DefaultToolbar.MSG_UNORDERED_LIST_TITLE = goog.getMsg("Bullet list");
goog.ui.editor.DefaultToolbar.MSG_OUTDENT_TITLE = goog.getMsg("Decrease indent");
goog.ui.editor.DefaultToolbar.MSG_INDENT_TITLE = goog.getMsg("Increase indent");
goog.ui.editor.DefaultToolbar.MSG_ALIGN_LEFT_TITLE = goog.getMsg("Align left");
goog.ui.editor.DefaultToolbar.MSG_ALIGN_CENTER_TITLE = goog.getMsg("Align center");
goog.ui.editor.DefaultToolbar.MSG_ALIGN_RIGHT_TITLE = goog.getMsg("Align right");
goog.ui.editor.DefaultToolbar.MSG_JUSTIFY_TITLE = goog.getMsg("Justify");
goog.ui.editor.DefaultToolbar.MSG_REMOVE_FORMAT_TITLE = goog.getMsg("Remove formatting");
goog.ui.editor.DefaultToolbar.MSG_IMAGE_TITLE = goog.getMsg("Insert image");
goog.ui.editor.DefaultToolbar.MSG_STRIKE_THROUGH_TITLE = goog.getMsg("Strikethrough");
goog.ui.editor.DefaultToolbar.MSG_DIR_LTR_TITLE = goog.getMsg("Left-to-right");
goog.ui.editor.DefaultToolbar.MSG_DIR_RTL_TITLE = goog.getMsg("Right-to-left");
goog.ui.editor.DefaultToolbar.MSG_BLOCKQUOTE_TITLE = goog.getMsg("Quote");
goog.ui.editor.DefaultToolbar.MSG_EDIT_HTML_TITLE = goog.getMsg("Edit HTML source");
goog.ui.editor.DefaultToolbar.MSG_SUBSCRIPT = goog.getMsg("Subscript");
goog.ui.editor.DefaultToolbar.MSG_SUPERSCRIPT = goog.getMsg("Superscript");
goog.ui.editor.DefaultToolbar.MSG_EDIT_HTML_CAPTION = goog.getMsg("Edit HTML");
goog.ui.editor.DefaultToolbar.buttons_ = {};
goog.ui.editor.DefaultToolbar.BUTTONS_ = [{command:goog.editor.Command.UNDO, tooltip:goog.ui.editor.DefaultToolbar.MSG_UNDO_TITLE, classes:"tr-icon tr-undo", factory:goog.ui.editor.DefaultToolbar.undoRedoButtonFactory_, queryable:true}, {command:goog.editor.Command.REDO, tooltip:goog.ui.editor.DefaultToolbar.MSG_REDO_TITLE, classes:"tr-icon tr-redo", factory:goog.ui.editor.DefaultToolbar.undoRedoButtonFactory_, queryable:true}, {command:goog.editor.Command.FONT_FACE, tooltip:goog.ui.editor.DefaultToolbar.MSG_FONT_FACE_TITLE, 
classes:"tr-fontName", factory:goog.ui.editor.DefaultToolbar.fontFaceFactory_, queryable:true}, {command:goog.editor.Command.FONT_SIZE, tooltip:goog.ui.editor.DefaultToolbar.MSG_FONT_SIZE_TITLE, classes:"tr-fontSize", factory:goog.ui.editor.DefaultToolbar.fontSizeFactory_, queryable:true}, {command:goog.editor.Command.BOLD, tooltip:goog.ui.editor.DefaultToolbar.MSG_BOLD_TITLE, classes:"tr-icon tr-bold", queryable:true}, {command:goog.editor.Command.ITALIC, tooltip:goog.ui.editor.DefaultToolbar.MSG_ITALIC_TITLE, 
classes:"tr-icon tr-italic", queryable:true}, {command:goog.editor.Command.UNDERLINE, tooltip:goog.ui.editor.DefaultToolbar.MSG_UNDERLINE_TITLE, classes:"tr-icon tr-underline", queryable:true}, {command:goog.editor.Command.FONT_COLOR, tooltip:goog.ui.editor.DefaultToolbar.MSG_FONT_COLOR_TITLE, classes:"tr-icon tr-foreColor", factory:goog.ui.editor.DefaultToolbar.fontColorFactory_, queryable:true}, {command:goog.editor.Command.BACKGROUND_COLOR, tooltip:goog.ui.editor.DefaultToolbar.MSG_BACKGROUND_COLOR_TITLE, 
classes:"tr-icon tr-backColor", factory:goog.ui.editor.DefaultToolbar.backgroundColorFactory_, queryable:true}, {command:goog.editor.Command.LINK, tooltip:goog.ui.editor.DefaultToolbar.MSG_LINK_TITLE, caption:goog.ui.editor.messages.MSG_LINK_CAPTION, classes:"tr-link", queryable:true}, {command:goog.editor.Command.ORDERED_LIST, tooltip:goog.ui.editor.DefaultToolbar.MSG_ORDERED_LIST_TITLE, classes:"tr-icon tr-insertOrderedList", queryable:true}, {command:goog.editor.Command.UNORDERED_LIST, tooltip:goog.ui.editor.DefaultToolbar.MSG_UNORDERED_LIST_TITLE, 
classes:"tr-icon tr-insertUnorderedList", queryable:true}, {command:goog.editor.Command.OUTDENT, tooltip:goog.ui.editor.DefaultToolbar.MSG_OUTDENT_TITLE, classes:"tr-icon tr-outdent", factory:goog.ui.editor.ToolbarFactory.makeButton}, {command:goog.editor.Command.INDENT, tooltip:goog.ui.editor.DefaultToolbar.MSG_INDENT_TITLE, classes:"tr-icon tr-indent", factory:goog.ui.editor.ToolbarFactory.makeButton}, {command:goog.editor.Command.JUSTIFY_LEFT, tooltip:goog.ui.editor.DefaultToolbar.MSG_ALIGN_LEFT_TITLE, 
classes:"tr-icon tr-justifyLeft", queryable:true}, {command:goog.editor.Command.JUSTIFY_CENTER, tooltip:goog.ui.editor.DefaultToolbar.MSG_ALIGN_CENTER_TITLE, classes:"tr-icon tr-justifyCenter", queryable:true}, {command:goog.editor.Command.JUSTIFY_RIGHT, tooltip:goog.ui.editor.DefaultToolbar.MSG_ALIGN_RIGHT_TITLE, classes:"tr-icon tr-justifyRight", queryable:true}, {command:goog.editor.Command.JUSTIFY_FULL, tooltip:goog.ui.editor.DefaultToolbar.MSG_JUSTIFY_TITLE, classes:"tr-icon tr-justifyFull", 
queryable:true}, {command:goog.editor.Command.REMOVE_FORMAT, tooltip:goog.ui.editor.DefaultToolbar.MSG_REMOVE_FORMAT_TITLE, classes:"tr-icon tr-removeFormat", factory:goog.ui.editor.ToolbarFactory.makeButton}, {command:goog.editor.Command.IMAGE, tooltip:goog.ui.editor.DefaultToolbar.MSG_IMAGE_TITLE, classes:"tr-icon tr-image", factory:goog.ui.editor.ToolbarFactory.makeButton}, {command:goog.editor.Command.STRIKE_THROUGH, tooltip:goog.ui.editor.DefaultToolbar.MSG_STRIKE_THROUGH_TITLE, classes:"tr-icon tr-strikeThrough", 
queryable:true}, {command:goog.editor.Command.SUBSCRIPT, tooltip:goog.ui.editor.DefaultToolbar.MSG_SUBSCRIPT, classes:"tr-icon tr-subscript", queryable:true}, {command:goog.editor.Command.SUPERSCRIPT, tooltip:goog.ui.editor.DefaultToolbar.MSG_SUPERSCRIPT, classes:"tr-icon tr-superscript", queryable:true}, {command:goog.editor.Command.DIR_LTR, tooltip:goog.ui.editor.DefaultToolbar.MSG_DIR_LTR_TITLE, classes:"tr-icon tr-ltr", queryable:true}, {command:goog.editor.Command.DIR_RTL, tooltip:goog.ui.editor.DefaultToolbar.MSG_DIR_RTL_TITLE, 
classes:"tr-icon tr-rtl", factory:goog.ui.editor.DefaultToolbar.rtlButtonFactory_, queryable:true}, {command:goog.editor.Command.BLOCKQUOTE, tooltip:goog.ui.editor.DefaultToolbar.MSG_BLOCKQUOTE_TITLE, classes:"tr-icon tr-BLOCKQUOTE", queryable:true}, {command:goog.editor.Command.FORMAT_BLOCK, tooltip:goog.ui.editor.DefaultToolbar.MSG_FORMAT_BLOCK_TITLE, caption:goog.ui.editor.DefaultToolbar.MSG_FORMAT_BLOCK_CAPTION, classes:"tr-formatBlock", factory:goog.ui.editor.DefaultToolbar.formatBlockFactory_, 
queryable:true}, {command:goog.editor.Command.EDIT_HTML, tooltip:goog.ui.editor.DefaultToolbar.MSG_EDIT_HTML_TITLE, caption:goog.ui.editor.DefaultToolbar.MSG_EDIT_HTML_CAPTION, classes:"tr-editHtml", factory:goog.ui.editor.ToolbarFactory.makeButton}];
(function() {
  for(var a = 0, b;b = goog.ui.editor.DefaultToolbar.BUTTONS_[a];a++) {
    goog.ui.editor.DefaultToolbar.buttons_[b.command] = b
  }
  delete goog.ui.editor.DefaultToolbar.BUTTONS_
})();
goog.editor.plugins.RemoveFormatting = function() {
  goog.editor.Plugin.call(this);
  this.optRemoveFormattingFunc_ = null
};
goog.inherits(goog.editor.plugins.RemoveFormatting, goog.editor.Plugin);
goog.editor.plugins.RemoveFormatting.REMOVE_FORMATTING_COMMAND = "+removeFormat";
goog.editor.plugins.RemoveFormatting.BLOCK_RE_ = /^(DIV|TR|LI|BLOCKQUOTE|H\d|PRE|XMP)/;
goog.editor.plugins.RemoveFormatting.appendNewline_ = function(a) {
  a.push("<br>")
};
goog.editor.plugins.RemoveFormatting.createRangeDelimitedByRanges_ = function(a, b) {
  return goog.dom.Range.createFromNodes(a.getStartNode(), a.getStartOffset(), b.getEndNode(), b.getEndOffset())
};
goog.editor.plugins.RemoveFormatting.prototype.getTrogClassId = function() {
  return"RemoveFormatting"
};
goog.editor.plugins.RemoveFormatting.prototype.isSupportedCommand = function(a) {
  return a == goog.editor.plugins.RemoveFormatting.REMOVE_FORMATTING_COMMAND
};
goog.editor.plugins.RemoveFormatting.prototype.execCommandInternal = function(a) {
  a == goog.editor.plugins.RemoveFormatting.REMOVE_FORMATTING_COMMAND && this.removeFormatting_()
};
goog.editor.plugins.RemoveFormatting.prototype.handleKeyboardShortcut = function(a, b, c) {
  if(!c) {
    return false
  }
  return b == " " ? (this.fieldObject.execCommand(goog.editor.plugins.RemoveFormatting.REMOVE_FORMATTING_COMMAND), true) : false
};
goog.editor.plugins.RemoveFormatting.prototype.removeFormatting_ = function() {
  this.fieldObject.getRange().isCollapsed() || (this.convertSelectedHtmlText_(this.optRemoveFormattingFunc_ || goog.bind(this.removeFormattingWorker_, this)), this.getFieldDomHelper().getDocument().execCommand("RemoveFormat", false, void 0), goog.editor.BrowserFeature.ADDS_NBSPS_IN_REMOVE_FORMAT && this.convertSelectedHtmlText_(function(a) {
    var b = goog.userAgent.isVersion("528") ? /&nbsp;/g : /\u00A0/g;
    return a.replace(b, " ")
  }))
};
goog.editor.plugins.RemoveFormatting.getTableAncestor_ = function(a) {
  return goog.dom.getAncestor(a, function(a) {
    return a.tagName == goog.dom.TagName.TABLE
  }, true)
};
goog.editor.plugins.RemoveFormatting.prototype.pasteHtml_ = function(a) {
  var b = this.fieldObject.getRange(), c = this.getFieldDomHelper(), d = goog.string.createUniqueString(), e = goog.string.createUniqueString(), a = '<span id="' + d + '"></span>' + a + '<span id="' + e + '"></span>', f = goog.string.createUniqueString(), g = '<span id="' + f + '"></span>';
  if(goog.editor.BrowserFeature.HAS_IE_RANGES) {
    var h = b.getTextRange(0).getBrowserRangeObject();
    h.pasteHTML(g);
    for(var i;(i = h.parentElement()) && goog.editor.node.isEmpty(i) && !goog.editor.node.isEditableContainer(i);) {
      b = i.nodeName;
      if(b == goog.dom.TagName.TD || b == goog.dom.TagName.TR || b == goog.dom.TagName.TH) {
        break
      }
      goog.dom.removeNode(i)
    }
    h.pasteHTML(a);
    (f = c.getElement(f)) && goog.dom.removeNode(f)
  }else {
    if(goog.editor.BrowserFeature.HAS_W3C_RANGES) {
      c.getDocument().execCommand("insertImage", false, f);
      b = RegExp("<[^<]*" + f + "[^>]*>");
      i = this.fieldObject.getRange().getContainerElement();
      if(i.nodeType == goog.dom.NodeType.TEXT) {
        i = i.parentNode
      }
      for(;!b.test(i.innerHTML);) {
        i = i.parentNode
      }
      if(goog.userAgent.GECKO) {
        i.innerHTML = i.innerHTML.replace(b, a)
      }else {
        i.innerHTML = i.innerHTML.replace(b, g);
        for(i = f = c.getElement(f);(i = f.parentNode) && goog.editor.node.isEmpty(i) && !goog.editor.node.isEditableContainer(i);) {
          b = i.nodeName;
          if(b == goog.dom.TagName.TD || b == goog.dom.TagName.TR || b == goog.dom.TagName.TH) {
            break
          }
          goog.dom.insertSiblingAfter(f, i);
          goog.dom.removeNode(i)
        }
        i.innerHTML = i.innerHTML.replace(RegExp(g, "i"), a)
      }
    }
  }
  a = c.getElement(d);
  c = c.getElement(e);
  goog.dom.Range.createFromNodes(a, 0, c, c.childNodes.length).select();
  goog.dom.removeNode(a);
  goog.dom.removeNode(c)
};
goog.editor.plugins.RemoveFormatting.prototype.getHtmlText_ = function(a) {
  var b = this.getFieldDomHelper().createDom("div"), c = a.getBrowserRangeObject();
  if(goog.editor.BrowserFeature.HAS_W3C_RANGES) {
    b.appendChild(c.cloneContents())
  }else {
    if(goog.editor.BrowserFeature.HAS_IE_RANGES) {
      var d = a.getText(), d = d.replace(/\r\n/g, "\r"), e = d.length, a = e - goog.string.trimLeft(d).length, d = e - goog.string.trimRight(d).length;
      c.moveStart("character", a);
      c.moveEnd("character", -d);
      a = c.htmlText;
      c.queryCommandValue("formatBlock") == "Formatted" && (a = goog.string.newLineToBr(c.htmlText));
      b.innerHTML = a
    }
  }
  return b.innerHTML
};
goog.editor.plugins.RemoveFormatting.prototype.adjustRangeForTables_ = function(a, b, c) {
  var d = goog.editor.range.saveUsingNormalizedCarets(a), e = a.getStartNode(), f = a.getStartOffset(), g = a.getEndNode(), a = a.getEndOffset(), h = this.getFieldDomHelper();
  if(b) {
    var i = h.createTextNode("");
    goog.dom.insertSiblingAfter(i, b);
    e = i;
    f = 0
  }
  c && (i = h.createTextNode(""), goog.dom.insertSiblingBefore(i, c), g = i, a = 0);
  goog.dom.Range.createFromNodes(e, f, g, a).select();
  return d
};
goog.editor.plugins.RemoveFormatting.prototype.putCaretInCave_ = function(a, b) {
  var c = goog.dom.removeNode(a.getCaret(b));
  b ? this.startCaretInCave_ = c : this.endCaretInCave_ = c
};
goog.editor.plugins.RemoveFormatting.prototype.restoreCaretsFromCave_ = function() {
  var a = this.fieldObject.getElement();
  if(this.startCaretInCave_) {
    a.insertBefore(this.startCaretInCave_, a.firstChild), this.startCaretInCave_ = null
  }
  if(this.endCaretInCave_) {
    a.appendChild(this.endCaretInCave_), this.endCaretInCave_ = null
  }
};
goog.editor.plugins.RemoveFormatting.prototype.convertSelectedHtmlText_ = function(a) {
  var b = this.fieldObject.getRange();
  if(!(b.getTextRangeCount() > 1)) {
    if(goog.userAgent.GECKO) {
      var c = goog.editor.range.expand(b, this.fieldObject.getElement()), d = goog.editor.plugins.RemoveFormatting.getTableAncestor_(c.getStartNode()), e = goog.editor.plugins.RemoveFormatting.getTableAncestor_(c.getEndNode());
      if(d || e) {
        if(d == e) {
          return
        }
        var f = this.adjustRangeForTables_(b, d, e);
        d || this.putCaretInCave_(f, true);
        e || this.putCaretInCave_(f, false);
        b = this.fieldObject.getRange();
        c = goog.editor.range.expand(b, this.fieldObject.getElement())
      }
      c.select();
      b = c
    }
    b = this.getHtmlText_(b);
    this.pasteHtml_(a(b));
    goog.userAgent.GECKO && f && (b = this.fieldObject.getRange(), this.restoreCaretsFromCave_(), a = f.toAbstractRange(), goog.editor.plugins.RemoveFormatting.createRangeDelimitedByRanges_(d ? a : b, e ? a : b).select(), f.dispose())
  }
};
goog.editor.plugins.RemoveFormatting.prototype.removeFormattingWorker_ = function(a) {
  var b = goog.dom.createElement("div");
  b.innerHTML = a;
  for(var a = [], b = [b.childNodes, 0], c = [], d = 0, e = [], f = 0, g = 0;g >= 0;g -= 2) {
    for(var h = false;f > 0 && g <= e[f - 1];) {
      f--, h = true
    }
    h && goog.editor.plugins.RemoveFormatting.appendNewline_(a);
    for(h = false;d > 0 && g <= c[d - 1];) {
      d--, h = true
    }
    h && goog.editor.plugins.RemoveFormatting.appendNewline_(a);
    for(var h = b[g], i = b[g + 1];i < h.length;) {
      var j = h[i++], k = j.nodeName, l = this.getValueForNode(j);
      if(goog.isDefAndNotNull(l)) {
        a.push(l)
      }else {
        switch(k) {
          case "#text":
            j = d > 0 ? j.nodeValue : goog.string.stripNewlines(j.nodeValue);
            j = goog.string.htmlEscape(j);
            a.push(j);
            continue;
          case goog.dom.TagName.P:
            goog.editor.plugins.RemoveFormatting.appendNewline_(a);
            goog.editor.plugins.RemoveFormatting.appendNewline_(a);
            break;
          case goog.dom.TagName.BR:
            goog.editor.plugins.RemoveFormatting.appendNewline_(a);
            continue;
          case goog.dom.TagName.TABLE:
            goog.editor.plugins.RemoveFormatting.appendNewline_(a);
            e[f++] = g;
            break;
          case goog.dom.TagName.PRE:
          ;
          case "XMP":
            c[d++] = g;
            break;
          case goog.dom.TagName.STYLE:
          ;
          case goog.dom.TagName.SCRIPT:
          ;
          case goog.dom.TagName.SELECT:
            continue;
          case goog.dom.TagName.A:
            if(j.href && j.href != "") {
              a.push("<a href='");
              a.push(j.href);
              a.push("'>");
              a.push(this.removeFormattingWorker_(j.innerHTML));
              a.push("</a>");
              continue
            }else {
              break
            }
          ;
          case goog.dom.TagName.IMG:
            a.push("<img src='");
            a.push(j.src);
            a.push("'");
            j.border == "0" && a.push(" border='0'");
            a.push(">");
            continue;
          case goog.dom.TagName.TD:
            j.previousSibling && a.push(" ");
            break;
          case goog.dom.TagName.TR:
            j.previousSibling && goog.editor.plugins.RemoveFormatting.appendNewline_(a);
            break;
          case goog.dom.TagName.DIV:
            if(l = j.parentNode, l.firstChild == j && goog.editor.plugins.RemoveFormatting.BLOCK_RE_.test(l.tagName)) {
              break
            }
          ;
          default:
            goog.editor.plugins.RemoveFormatting.BLOCK_RE_.test(k) && goog.editor.plugins.RemoveFormatting.appendNewline_(a)
        }
        j = j.childNodes;
        j.length > 0 && (b[g++] = h, b[g++] = i, h = j, i = 0)
      }
    }
  }
  return goog.string.normalizeSpaces(a.join(""))
};
goog.editor.plugins.RemoveFormatting.prototype.getValueForNode = function() {
  return null
};
goog.editor.plugins.RemoveFormatting.prototype.setRemoveFormattingFunc = function(a) {
  this.optRemoveFormattingFunc_ = a
};
goog.editor.plugins.HeaderFormatter = function() {
  goog.editor.Plugin.call(this)
};
goog.inherits(goog.editor.plugins.HeaderFormatter, goog.editor.Plugin);
goog.editor.plugins.HeaderFormatter.prototype.getTrogClassId = function() {
  return"HeaderFormatter"
};
goog.editor.plugins.HeaderFormatter.HEADER_COMMAND = {H1:"H1", H2:"H2", H3:"H3", H4:"H4"};
goog.editor.plugins.HeaderFormatter.prototype.handleKeyboardShortcut = function(a, b, c) {
  if(!c) {
    return false
  }
  c = null;
  switch(b) {
    case "1":
      c = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H1;
      break;
    case "2":
      c = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H2;
      break;
    case "3":
      c = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H3;
      break;
    case "4":
      c = goog.editor.plugins.HeaderFormatter.HEADER_COMMAND.H4
  }
  return c ? (this.fieldObject.execCommand(goog.editor.Command.FORMAT_BLOCK, c), goog.userAgent.GECKO && a.stopPropagation(), true) : false
};
var cljs = {core:{}};
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function(a) {
  return a != null && a !== false
};
cljs.core.type_satisfies_ = function(a, b) {
  var c = a[goog.typeOf.call(null, b)];
  return cljs.core.truth_(c) ? c : (c = a._, cljs.core.truth_(c) ? c : false)
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function(a, b) {
  return Error.call(null, "No protocol method " + a + " defined for type " + goog.typeOf.call(null, b) + ": " + b)
};
cljs.core.aclone = function(a) {
  return Array.prototype.slice.call(a)
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.aget = function(a, b) {
  return a[b]
};
cljs.core.aset = function(a, b, c) {
  return a[b] = c
};
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICounted$_count : a)) {
    a = a.cljs$core$ICounted$_count(a)
  }else {
    var b;
    b = cljs.core._count[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._count._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ICounted.-count", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEmptyableCollection$_empty : a)) {
    a = a.cljs$core$IEmptyableCollection$_empty(a)
  }else {
    var b;
    b = cljs.core._empty[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._empty._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICollection$_conj : a)) {
    c = a.cljs$core$ICollection$_conj(a, b)
  }else {
    c = cljs.core._conj[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._conj._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "ICollection.-conj", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          e = a.cljs$core$IIndexed$_nth(a, c)
        }else {
          e = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._nth._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          e = a.cljs$core$IIndexed$_nth(a, c, d)
        }else {
          e = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._nth._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_first : a)) {
    a = a.cljs$core$ISeq$_first(a)
  }else {
    var b;
    b = cljs.core._first[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._first._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-first", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._rest = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_rest : a)) {
    a = a.cljs$core$ISeq$_rest(a)
  }else {
    var b;
    b = cljs.core._rest[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._rest._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-rest", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          e = a.cljs$core$ILookup$_lookup(a, c)
        }else {
          e = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._lookup._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          e = a.cljs$core$ILookup$_lookup(a, c, d)
        }else {
          e = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._lookup._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_contains_key_QMARK_ : a)) {
    c = a.cljs$core$IAssociative$_contains_key_QMARK_(a, b)
  }else {
    c = cljs.core._contains_key_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._contains_key_QMARK_._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._assoc = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_assoc : a)) {
    a = a.cljs$core$IAssociative$_assoc(a, b, c)
  }else {
    var d;
    d = cljs.core._assoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._assoc._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMap$_dissoc : a)) {
    c = a.cljs$core$IMap$_dissoc(a, b)
  }else {
    c = cljs.core._dissoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._dissoc._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISet$_disjoin : a)) {
    c = a.cljs$core$ISet$_disjoin(a, b)
  }else {
    c = cljs.core._disjoin[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._disjoin._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_peek : a)) {
    a = a.cljs$core$IStack$_peek(a)
  }else {
    var b;
    b = cljs.core._peek[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._peek._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-peek", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._pop = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_pop : a)) {
    a = a.cljs$core$IStack$_pop(a)
  }else {
    var b;
    b = cljs.core._pop[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._pop._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-pop", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IVector$_assoc_n : a)) {
    a = a.cljs$core$IVector$_assoc_n(a, b, c)
  }else {
    var d;
    d = cljs.core._assoc_n[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._assoc_n._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDeref$_deref : a)) {
    a = a.cljs$core$IDeref$_deref(a)
  }else {
    var b;
    b = cljs.core._deref[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._deref._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IDeref.-deref", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout : a)) {
    a = a.cljs$core$IDerefWithTimeout$_deref_with_timeout(a, b, c)
  }else {
    var d;
    d = cljs.core._deref_with_timeout[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._deref_with_timeout._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMeta$_meta : a)) {
    a = a.cljs$core$IMeta$_meta(a)
  }else {
    var b;
    b = cljs.core._meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._meta._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMeta.-meta", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWithMeta$_with_meta : a)) {
    c = a.cljs$core$IWithMeta$_with_meta(a, b)
  }else {
    c = cljs.core._with_meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._with_meta._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          e = a.cljs$core$IReduce$_reduce(a, c)
        }else {
          e = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._reduce._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          e = a.cljs$core$IReduce$_reduce(a, c, d)
        }else {
          e = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._reduce._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEquiv$_equiv : a)) {
    c = a.cljs$core$IEquiv$_equiv(a, b)
  }else {
    c = cljs.core._equiv[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._equiv._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IHash$_hash : a)) {
    a = a.cljs$core$IHash$_hash(a)
  }else {
    var b;
    b = cljs.core._hash[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._hash._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IHash.-hash", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeqable$_seq : a)) {
    a = a.cljs$core$ISeqable$_seq(a)
  }else {
    var b;
    b = cljs.core._seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._seq._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPrintable$_pr_seq : a)) {
    c = a.cljs$core$IPrintable$_pr_seq(a, b)
  }else {
    c = cljs.core._pr_seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._pr_seq._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPending$_realized_QMARK_ : a)) {
    a = a.cljs$core$IPending$_realized_QMARK_(a)
  }else {
    var b;
    b = cljs.core._realized_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._realized_QMARK_._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IPending.-realized?", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_notify_watches : a)) {
    a = a.cljs$core$IWatchable$_notify_watches(a, b, c)
  }else {
    var d;
    d = cljs.core._notify_watches[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._notify_watches._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._add_watch = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_add_watch : a)) {
    a = a.cljs$core$IWatchable$_add_watch(a, b, c)
  }else {
    var d;
    d = cljs.core._add_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._add_watch._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._remove_watch = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_remove_watch : a)) {
    c = a.cljs$core$IWatchable$_remove_watch(a, b)
  }else {
    c = cljs.core._remove_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._remove_watch._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core._EQ_ = function(a, b) {
  return cljs.core._equiv.call(null, a, b)
};
cljs.core.nil_QMARK_ = function(a) {
  return cljs.core.identical_QMARK_.call(null, a, null)
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(a, b, c) {
  return cljs.core.hash_map.call(null, b, c)
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(a, b) {
  return cljs.core.list.call(null, b)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return c.call(null);
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function() {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function() {
  return null
};
cljs.core._rest["null"] = function() {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(a, b) {
  return cljs.core.nil_QMARK_.call(null, b)
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.identical_QMARK_.call(null, a.toString(), b.toString())
};
cljs.core.IHash.number = true;
cljs.core._hash.number = function(a) {
  return a
};
cljs.core.IEquiv.number = true;
cljs.core._equiv.number = function(a, b) {
  return cljs.core.identical_QMARK_.call(null, a, b)
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(a) {
  return a === true ? 1 : 0
};
cljs.core.IHash["function"] = true;
cljs.core._hash["function"] = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.ci_reduce = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        a: {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, cljs.core._count.call(null, a)))) {
            f = c.call(null)
          }else {
            for(var g = cljs.core._nth.call(null, a, 0), h = 1;;) {
              if(cljs.core.truth_(h < cljs.core._count.call(null, a))) {
                g = c.call(null, g, cljs.core._nth.call(null, a, h)), h += 1
              }else {
                f = g;
                break a
              }
            }
          }
        }
        return f;
      case 3:
        a: {
          f = d;
          for(h = 0;;) {
            if(cljs.core.truth_(h < cljs.core._count.call(null, a))) {
              f = c.call(null, f, cljs.core._nth.call(null, a, h)), h += 1
            }else {
              g = f;
              break a
            }
          }
        }
        return g;
      case 4:
        a: {
          f = d;
          for(g = e;;) {
            if(cljs.core.truth_(g < cljs.core._count.call(null, a))) {
              f = c.call(null, f, cljs.core._nth.call(null, a, g)), g += 1
            }else {
              h = f;
              break a
            }
          }
        }
        return h
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq = function(a, b) {
  this.a = a;
  this.i = b
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c, this.a[this.i], this.i + 1);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d, this.i)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = c + this.i;
        return cljs.core.truth_(e < this.a.length) ? this.a[e] : null;
      case 3:
        return e = c + this.i, cljs.core.truth_(e < this.a.length) ? this.a[e] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = function() {
  return this.a.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = function() {
  return this.a[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(this.i + 1 < this.a.length) ? new cljs.core.IndexedSeq(this.a, this.i + 1) : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.prim_seq = function(a, b) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, 0, a.length)) ? null : new cljs.core.IndexedSeq(a, b)
};
cljs.core.array_seq = function(a, b) {
  return cljs.core.prim_seq.call(null, a, b)
};
cljs.core.IReduce.array = true;
cljs.core._reduce.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.array = true;
cljs.core._lookup.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a[c];
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.array = true;
cljs.core._nth.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(c < a.length) ? a[c] : null;
      case 3:
        return cljs.core.truth_(c < a.length) ? a[c] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.array = true;
cljs.core._count.array = function(a) {
  return a.length
};
cljs.core.ISeqable.array = true;
cljs.core._seq.array = function(a) {
  return cljs.core.array_seq.call(null, a, 0)
};
cljs.core.seq = function(a) {
  return cljs.core.truth_(a) ? cljs.core._seq.call(null, a) : null
};
cljs.core.first = function(a) {
  a = cljs.core.seq.call(null, a);
  return cljs.core.truth_(a) ? cljs.core._first.call(null, a) : null
};
cljs.core.rest = function(a) {
  return cljs.core._rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.next = function(a) {
  return cljs.core.truth_(a) ? cljs.core.seq.call(null, cljs.core.rest.call(null, a)) : null
};
cljs.core.second = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first.call(null, cljs.core.first.call(null, a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next.call(null, cljs.core.first.call(null, a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next.call(null, cljs.core.next.call(null, a))
};
cljs.core.last = function(a) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.first.call(null, a)
    }
  }
};
cljs.core.ICounted._ = true;
cljs.core._count._ = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = 0;;) {
    if(cljs.core.truth_(a)) {
      a = cljs.core.next.call(null, a), b += 1
    }else {
      return b
    }
  }
};
cljs.core.IEquiv._ = true;
cljs.core._equiv._ = function(a, b) {
  return cljs.core.identical_QMARK_.call(null, a, b)
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? false : true
};
cljs.core.conj = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(d)) {
          b = a.call(null, b, c), c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return a.call(null, b, c)
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._conj.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty.call(null, a)
};
cljs.core.count = function(a) {
  return cljs.core._count.call(null, a)
};
cljs.core.nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c);
      case 3:
        return cljs.core._lookup.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      for(;;) {
        if(b = a.call(null, b, c, d), cljs.core.truth_(h)) {
          c = cljs.core.first.call(null, h), d = cljs.core.second.call(null, h), h = cljs.core.nnext.call(null, h)
        }else {
          return b
        }
      }
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 3:
        return cljs.core._assoc.call(null, a, d, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._dissoc.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.with_meta = function(a, b) {
  return cljs.core._with_meta.call(null, a, b)
};
cljs.core.meta = function(a) {
  return cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$IMeta$;
        return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMeta$")) : b
      }else {
        return a
      }
    }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, a)
  }()) ? cljs.core._meta.call(null, a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek.call(null, a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop.call(null, a)
};
cljs.core.disj = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._disjoin.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.hash = function(a) {
  return cljs.core._hash.call(null, a)
};
cljs.core.empty_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, a))
};
cljs.core.coll_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? false : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICollection$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICollection$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? false : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISet$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISet$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IAssociative$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IAssociative$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISequential$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISequential$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.ISequential, a)
};
cljs.core.counted_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICounted$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICounted$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.ICounted, a)
};
cljs.core.map_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? false : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IMap$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMap$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IVector$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IVector$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IVector, a)
};
cljs.core.js_obj = function() {
  return{}
};
cljs.core.js_keys = function(a) {
  var b = cljs.core.array.call(null);
  goog.object.forEach.call(null, a, function(a, d) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
cljs.core.false_QMARK_ = function(a) {
  return a === false
};
cljs.core.true_QMARK_ = function(a) {
  return a === true
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.instance_QMARK_ = function(a, b) {
  return b instanceof a
};
cljs.core.seq_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? false : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISeq$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeq$")) : b
    }else {
      return a
    }
  }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? true : false
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core.not.call(null, function() {
    var b = cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0");
    return cljs.core.truth_(b) ? b : cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1")
  }()) : b
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0") : b
};
cljs.core.symbol_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1") : b
};
cljs.core.number_QMARK_ = function(a) {
  return goog.isNumber.call(null, a)
};
cljs.core.fn_QMARK_ = function(a) {
  return goog.isFunction.call(null, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = cljs.core.number_QMARK_.call(null, a);
  return cljs.core.truth_(b) ? a == a.toFixed() : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.truth_(cljs.core.identical_QMARK_.call(null, cljs.core._lookup.call(null, a, b, cljs.core.lookup_sentinel), cljs.core.lookup_sentinel)) ? false : true
};
cljs.core.find = function(a, b) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var c = cljs.core.associative_QMARK_.call(null, a);
      return cljs.core.truth_(c) ? cljs.core.contains_QMARK_.call(null, a, b) : c
    }else {
      return a
    }
  }()) ? cljs.core.Vector.fromArray([b, cljs.core._lookup.call(null, a, b)]) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._EQ_.call(null, a, b)))) {
        a = cljs.core.set([b, a]);
        for(b = c;;) {
          var d = cljs.core.first.call(null, b), c = cljs.core.next.call(null, b);
          if(cljs.core.truth_(b)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, a, d))) {
              return false
            }else {
              a = cljs.core.conj.call(null, a, d), b = c
            }
          }else {
            return true
          }
        }
      }else {
        return false
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare = function(a, b) {
  return goog.array.defaultCompare.call(null, a, b)
};
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a, cljs.core.compare)) ? cljs.core.compare : function(b, c) {
    var d = a.call(null, b, c);
    return cljs.core.truth_(cljs.core.number_QMARK_.call(null, d)) ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.compare, b);
      case 2:
        var d;
        cljs.core.truth_(cljs.core.seq.call(null, c)) ? (d = cljs.core.to_array.call(null, c), goog.array.stableSort.call(null, d, cljs.core.fn__GT_comparator.call(null, b)), d = cljs.core.seq.call(null, d)) : d = cljs.core.List.EMPTY;
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.sort_by = function() {
  var a = null, b = function(a, b, e) {
    return cljs.core.sort.call(null, function(e, g) {
      return cljs.core.fn__GT_comparator.call(null, b).call(null, a.call(null, e), a.call(null, g))
    }, e)
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, cljs.core.compare, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._reduce.call(null, c, a);
      case 3:
        return cljs.core._reduce.call(null, d, a, c)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.seq_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core.seq.call(null, c);
        e = cljs.core.truth_(e) ? cljs.core.reduce.call(null, a, cljs.core.first.call(null, e), cljs.core.next.call(null, e)) : a.call(null);
        return e;
      case 3:
        a: {
          for(var f = c, g = cljs.core.seq.call(null, d);;) {
            if(cljs.core.truth_(g)) {
              f = a.call(null, f, cljs.core.first.call(null, g)), g = cljs.core.next.call(null, g)
            }else {
              e = f;
              break a
            }
          }
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IReduce._ = true;
cljs.core._reduce._ = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.seq_reduce.call(null, c, a);
      case 3:
        return cljs.core.seq_reduce.call(null, c, d, a)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core._PLUS_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return 1 / a;
      case 2:
        return a / d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return false
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return a < d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return false
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return a <= d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return false
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return a > d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return false
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return a >= d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a > d ? a : d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a < d ? a : d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.fix = function(a) {
  return cljs.core.truth_(a >= 0) ? Math.floor.call(null, a) : Math.ceil.call(null, a)
};
cljs.core.mod = function(a, b) {
  return a % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix.call(null, (a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot.call(null, a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return Math.random.call(null);
      case 1:
        return b * a.call(null)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return(a & 1 << b) != 0
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return false
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return true;
      case 2:
        return cljs.core._equiv.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return a < 0
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return cljs.core.truth_(a) ? c > 0 : a
    }())) {
      var e = c - 1, f = cljs.core.next.call(null, d), c = e, d = f
    }else {
      return d
    }
  }
};
cljs.core.IIndexed._ = true;
cljs.core._nth._ = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core.nthnext.call(null, a, c);
        if(cljs.core.truth_(e)) {
          e = cljs.core.first.call(null, e)
        }else {
          throw Error("Index out of bounds");
        }
        return e;
      case 3:
        return e = cljs.core.nthnext.call(null, a, c), e = cljs.core.truth_(e) ? cljs.core.first.call(null, e) : d, e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.str_STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, c) {
      return function(b, c) {
        for(;;) {
          if(cljs.core.truth_(c)) {
            var d = b.append(a.call(null, cljs.core.first.call(null, c))), e = cljs.core.next.call(null, c), b = d, c = e
          }else {
            return a.call(null, b)
          }
        }
      }.call(null, new goog.string.StringBuffer(a.call(null, b)), c)
    }, d = function(a, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, g)
    };
    d.cljs$lang$maxFixedArity = 1;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, d, a)
    };
    return d
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var c = null;
      goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return cljs.core.apply.call(null, cljs.core.str_STAR_, a, c)
    };
    a.cljs$lang$maxFixedArity = 1;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.rest(a);
      return cljs.core.apply.call(null, cljs.core.str_STAR_, b, a)
    };
    return a
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? a.substring(2, a.length) : cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.str_STAR_.call(null, ":", a.substring(2, a.length)) : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.subs = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.symbol = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) || cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) && cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, b, 2)), cljs.core.str_STAR_.call(null, "\ufdd1", "'", b);
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.keyword = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) ? b : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, b, 2)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", b) : null;
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.sequential_QMARK_.call(null, b)) ? function() {
    for(var c = cljs.core.seq.call(null, a), d = cljs.core.seq.call(null, b);;) {
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c))) {
        return cljs.core.nil_QMARK_.call(null, d)
      }else {
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
          return false
        }else {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, c), cljs.core.first.call(null, d)))) {
            c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
          }else {
            return cljs.core.truth_("\ufdd0'else") ? false : null
          }
        }
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.hash_combine.call(null, a, cljs.core.hash.call(null, c))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, a)), cljs.core.next.call(null, a))
};
cljs.core.extend_object_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, b);
  if(cljs.core.truth_(c)) {
    var d = cljs.core.first.call(null, c);
    cljs.core.nth.call(null, d, 0, null);
    for(cljs.core.nth.call(null, d, 1, null);;) {
      var e = d, d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), d = cljs.core.name.call(null, d);
      a[d] = e;
      c = cljs.core.next.call(null, c);
      if(cljs.core.truth_(c)) {
        d = c, c = cljs.core.first.call(null, d), e = d, d = c, c = e
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d
};
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1)
};
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop = function(a) {
  return cljs.core._rest.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest = function() {
  return this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count)
};
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(a) {
  this.meta = a
};
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = function(a) {
  return a
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reverse = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, a))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.Cons = function(a, b, c) {
  this.meta = a;
  this.first = b;
  this.rest = c
};
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Cons(null, b, a)
};
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this.rest)) ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest)
};
cljs.core.cons = function(a, b) {
  return new cljs.core.Cons(null, a, b)
};
cljs.core.IReduce.string = true;
cljs.core._reduce.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.string = true;
cljs.core._lookup.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.string = true;
cljs.core._nth.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(c < cljs.core._count.call(null, a)) ? a.charAt(c) : null;
      case 3:
        return cljs.core.truth_(c < cljs.core._count.call(null, a)) ? a.charAt(c) : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.string = true;
cljs.core._count.string = function(a) {
  return a.length
};
cljs.core.ISeqable.string = true;
cljs.core._seq.string = function(a) {
  return cljs.core.prim_seq.call(null, a, 0)
};
cljs.core.IHash.string = true;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode.call(null, a)
};
String.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.get.call(null, c, this.toString());
      case 3:
        return cljs.core.get.call(null, c, this.toString(), d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
String.prototype.apply = function(a, b) {
  return cljs.core.truth_(cljs.core.count.call(null, b) < 2) ? cljs.core.get.call(null, b[0], a) : cljs.core.get.call(null, b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  return cljs.core.truth_(a.realized) ? b : (a.x = b.call(null), a.realized = true, a.x)
};
cljs.core.LazySeq = function(a, b, c) {
  this.meta = a;
  this.realized = b;
  this.x = c
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = function(a) {
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x)
};
cljs.core.to_array = function(a) {
  for(var b = cljs.core.array.call(null);;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, a))) {
      b.push(cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.bounded_count = function(a, b) {
  for(var c = a, d = b, e = 0;;) {
    if(cljs.core.truth_(function() {
      var a = d > 0;
      return cljs.core.truth_(a) ? cljs.core.seq.call(null, c) : a
    }())) {
      var f = cljs.core.next.call(null, c), g = d - 1;
      e += 1;
      c = f;
      d = g
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? null : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.next.call(null, b))) ? cljs.core.seq.call(null, cljs.core.first.call(null, b)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.cons.call(null, cljs.core.first.call(null, b), spread.call(null, cljs.core.next.call(null, b))) : null
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    })
  }, c = function(a) {
    return new cljs.core.LazySeq(null, false, function() {
      return a
    })
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, false, function() {
      var d = cljs.core.seq.call(null, b);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), a.call(null, cljs.core.rest.call(null, d), c)) : c
    })
  }, e = function() {
    var b = function(b, c, d) {
      return function l(a, b) {
        return new cljs.core.LazySeq(null, false, function() {
          var c = cljs.core.seq.call(null, a);
          return cljs.core.truth_(c) ? cljs.core.cons.call(null, cljs.core.first.call(null, c), l.call(null, cljs.core.rest.call(null, c), b)) : cljs.core.truth_(b) ? l.call(null, cljs.core.first.call(null, b), cljs.core.next.call(null, b)) : null
        })
      }.call(null, a.call(null, b, c), d)
    }, c = function(a, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, e)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, c, d, a)
    };
    return c
  }(), a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c, d, i) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, i)))))
    }, b = function(b, d, g, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, d, g, h, j)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), h = cljs.core.first(cljs.core.next(cljs.core.next(b))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, d, g, h, i, b)
    };
    return b
  }(), a = function(a, d, e, f, g) {
    switch(arguments.length) {
      case 1:
        return cljs.core.seq.call(null, a);
      case 2:
        return cljs.core.cons.call(null, a, d);
      case 3:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, d, e));
      case 4:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, f)));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.apply = function() {
  var a = null, b = function() {
    var a = function(a, b, c, d, i, j) {
      b = cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.cons.call(null, i, cljs.core.spread.call(null, j)))));
      c = a.cljs$lang$maxFixedArity;
      return cljs.core.truth_(a.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, b, c) <= c) ? a.apply(a, cljs.core.to_array.call(null, b)) : a.cljs$lang$applyTo(b) : a.apply(a, cljs.core.to_array.call(null, b))
    }, b = function(b, d, g, h, i, j) {
      var k = null;
      goog.isDef(j) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return a.call(this, b, d, g, h, i, k)
    };
    b.cljs$lang$maxFixedArity = 5;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), h = cljs.core.first(cljs.core.next(cljs.core.next(b))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), j = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b))))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b)))));
      return a.call(this, d, g, h, i, j, b)
    };
    return b
  }(), a = function(a, d, e, f, g, h) {
    switch(arguments.length) {
      case 2:
        var i = a, j = d, k = i.cljs$lang$maxFixedArity;
        return cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k + 1) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 3:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 4:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e, f), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 5:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e, f, g), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta.call(null, a, cljs.core.apply.call(null, b, cljs.core.meta.call(null, a), e))
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      var g = null;
      goog.isDef(c) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, a, b, g))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, b, c, a))
    };
    return a
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return false;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.truth_(cljs.core.seq.call(null, a)) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.seq.call(null, b)))) {
      return true
    }else {
      if(cljs.core.truth_(a.call(null, cljs.core.first.call(null, b)))) {
        var c = a, d = cljs.core.next.call(null, b), a = c, b = d
      }else {
        return cljs.core.truth_("\ufdd0'else") ? false : null
      }
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.every_QMARK_.call(null, a, b))
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
      var c = a.call(null, cljs.core.first.call(null, b));
      if(cljs.core.truth_(c)) {
        return c
      }else {
        var c = a, d = cljs.core.next.call(null, b), a = c, b = d
      }
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.some.call(null, a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null, a))) {
    return(a & 1) === 0
  }else {
    throw Error(cljs.core.str.call(null, "Argument must be an integer: ", a));
  }
};
cljs.core.odd_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.even_QMARK_.call(null, a))
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  return function() {
    var b = null, c = function() {
      var b = function(b, c, d) {
        var h = null;
        goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, b, c, h))
      };
      b.cljs$lang$maxFixedArity = 2;
      b.cljs$lang$applyTo = function(b) {
        var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, c, d, b))
      };
      return b
    }(), b = function(b, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.not.call(null, a.call(null));
        case 1:
          return cljs.core.not.call(null, a.call(null, b));
        case 2:
          return cljs.core.not.call(null, a.call(null, b, e));
        default:
          return c.apply(this, arguments)
      }
      throw"Invalid arity: " + arguments.length;
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = c.cljs$lang$applyTo;
    return b
  }()
};
cljs.core.constantly = function(a) {
  return function() {
    var b = function(b) {
      goog.isDef(b) && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
      return a
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      cljs.core.seq(b);
      return a
    };
    return b
  }()
};
cljs.core.comp = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, g, h) {
          var i = null;
          goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, cljs.core.apply.call(null, b, c, d, g, i))
        };
        c.cljs$lang$maxFixedArity = 3;
        c.cljs$lang$applyTo = function(c) {
          var d = cljs.core.first(c), g = cljs.core.first(cljs.core.next(c)), h = cljs.core.first(cljs.core.next(cljs.core.next(c))), c = cljs.core.rest(cljs.core.next(cljs.core.next(c)));
          return a.call(null, cljs.core.apply.call(null, b, d, g, h, c))
        };
        return c
      }(), c = function(c, g, k, l) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null));
          case 1:
            return a.call(null, b.call(null, c));
          case 2:
            return a.call(null, b.call(null, c, g));
          case 3:
            return a.call(null, b.call(null, c, g, k));
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = null, i = function() {
        var d = function(d, h, i, j) {
          var n = null;
          goog.isDef(j) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, b.call(null, cljs.core.apply.call(null, c, d, h, i, n)))
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(d) {
          var h = cljs.core.first(d), i = cljs.core.first(cljs.core.next(d)), j = cljs.core.first(cljs.core.next(cljs.core.next(d))), d = cljs.core.rest(cljs.core.next(cljs.core.next(d)));
          return a.call(null, b.call(null, cljs.core.apply.call(null, c, h, i, j, d)))
        };
        return d
      }(), d = function(d, h, l, m) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null, c.call(null)));
          case 1:
            return a.call(null, b.call(null, c.call(null, d)));
          case 2:
            return a.call(null, b.call(null, c.call(null, d, h)));
          case 3:
            return a.call(null, b.call(null, c.call(null, d, h, l)));
          default:
            return i.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = i.cljs$lang$applyTo;
      return d
    }()
  }, d = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, a, b, c, d));
      return function() {
        var a = function(a) {
          for(var a = cljs.core.apply.call(null, cljs.core.first.call(null, e), a), b = cljs.core.next.call(null, e);;) {
            if(cljs.core.truth_(b)) {
              a = cljs.core.first.call(null, b).call(null, a), b = cljs.core.next.call(null, b)
            }else {
              return a
            }
          }
        }, b = function(b) {
          var c = null;
          goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return a.call(this, c)
        };
        b.cljs$lang$maxFixedArity = 0;
        b.cljs$lang$applyTo = function(b) {
          b = cljs.core.seq(b);
          return a.call(this, b)
        };
        return b
      }()
    }, b = function(b, c, d, f) {
      var k = null;
      goog.isDef(f) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, k)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, f, b)
    };
    return b
  }(), a = function(a, f, g, h) {
    switch(arguments.length) {
      case 0:
        return cljs.core.identity;
      case 1:
        return a;
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      default:
        return d.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = function(c) {
        var d = null;
        goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, d)
      };
      c.cljs$lang$maxFixedArity = 0;
      c.cljs$lang$applyTo = function(c) {
        c = cljs.core.seq(c);
        return cljs.core.apply.call(null, a, b, c)
      };
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = function(d) {
        var e = null;
        goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, c, e)
      };
      d.cljs$lang$maxFixedArity = 0;
      d.cljs$lang$applyTo = function(d) {
        d = cljs.core.seq(d);
        return cljs.core.apply.call(null, a, b, c, d)
      };
      return d
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var e = function(e) {
        var j = null;
        goog.isDef(e) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, c, d, j)
      };
      e.cljs$lang$maxFixedArity = 0;
      e.cljs$lang$applyTo = function(e) {
        e = cljs.core.seq(e);
        return cljs.core.apply.call(null, a, b, c, d, e)
      };
      return e
    }()
  }, e = function() {
    var a = function(a, b, c, d, e) {
      return function() {
        var f = function(f) {
          return cljs.core.apply.call(null, a, b, c, d, cljs.core.concat.call(null, e, f))
        }, g = function(a) {
          var b = null;
          goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return f.call(this, b)
        };
        g.cljs$lang$maxFixedArity = 0;
        g.cljs$lang$applyTo = function(a) {
          a = cljs.core.seq(a);
          return f.call(this, a)
        };
        return g
      }()
    }, b = function(b, c, d, e, g) {
      var m = null;
      goog.isDef(g) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, c, d, e, m)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, c, d, e, g, b)
    };
    return b
  }(), a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, i);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, g, h) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, d, g, h)
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), c = function(c, g, k, l) {
        switch(arguments.length) {
          case 1:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c);
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, g);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, g, k);
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = null, i = function() {
        var d = function(d, h, i, j) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h, i, j)
        }, h = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        h.cljs$lang$maxFixedArity = 3;
        h.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return h
      }(), d = function(d, h, l, m) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h, l);
          default:
            return i.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = i.cljs$lang$applyTo;
      return d
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var i = null, j = function() {
        var i = function(i, j, k, l) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, j)) ? c : j, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, k)) ? d : k, l)
        }, j = function(a, b, c, d) {
          var e = null;
          goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return i.call(this, a, b, c, e)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return i.call(this, b, c, d, a)
        };
        return j
      }(), i = function(i, l, m, o) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, l)) ? c : l);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, l)) ? c : l, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, m)) ? d : m);
          default:
            return j.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      i.cljs$lang$maxFixedArity = 3;
      i.cljs$lang$applyTo = j.cljs$lang$applyTo;
      return i
    }()
  };
  return function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.map_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, false, function() {
      var g = cljs.core.seq.call(null, f);
      return cljs.core.truth_(g) ? cljs.core.cons.call(null, a.call(null, b, cljs.core.first.call(null, g)), d.call(null, b + 1, cljs.core.rest.call(null, g))) : null
    })
  }.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = b.call(null, cljs.core.first.call(null, d));
      return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e)) ? keep.call(null, b, cljs.core.rest.call(null, d)) : cljs.core.cons.call(null, e, keep.call(null, b, cljs.core.rest.call(null, d)))
    }else {
      return null
    }
  })
};
cljs.core.keep_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, false, function() {
      var g = cljs.core.seq.call(null, f);
      if(cljs.core.truth_(g)) {
        var h = a.call(null, b, cljs.core.first.call(null, g));
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? d.call(null, b + 1, cljs.core.rest.call(null, g)) : cljs.core.cons.call(null, h, d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }else {
        return null
      }
    })
  }.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function(b, c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, b);
          return cljs.core.truth_(d) ? a.call(null, c) : d
        }())
      }, d = function(b, c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, b);
          return cljs.core.truth_(e) ? (e = a.call(null, c), cljs.core.truth_(e) ? a.call(null, d) : e) : e
        }())
      }, e = function() {
        var c = function(c, d, e, h) {
          return cljs.core.boolean$.call(null, function() {
            var i = b.call(null, c, d, e);
            return cljs.core.truth_(i) ? cljs.core.every_QMARK_.call(null, a, h) : i
          }())
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), b = function(b, g, m, o) {
        switch(arguments.length) {
          case 0:
            return true;
          case 1:
            return cljs.core.boolean$.call(null, a.call(null, b));
          case 2:
            return c.call(this, b, g);
          case 3:
            return d.call(this, b, g, m);
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, c);
          return cljs.core.truth_(d) ? b.call(null, c) : d
        }())
      }, e = function(c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, c);
          return cljs.core.truth_(e) ? (e = a.call(null, d), cljs.core.truth_(e) ? (e = b.call(null, c), cljs.core.truth_(e) ? b.call(null, d) : e) : e) : e
        }())
      }, k = function(c, d, e) {
        return cljs.core.boolean$.call(null, function() {
          var h = a.call(null, c);
          return cljs.core.truth_(h) ? (h = a.call(null, d), cljs.core.truth_(h) ? (h = a.call(null, e), cljs.core.truth_(h) ? (h = b.call(null, c), cljs.core.truth_(h) ? (h = b.call(null, d), cljs.core.truth_(h) ? b.call(null, e) : h) : h) : h) : h) : h
        }())
      }, l = function() {
        var d = function(d, e, i, j) {
          return cljs.core.boolean$.call(null, function() {
            var k = c.call(null, d, e, i);
            return cljs.core.truth_(k) ? cljs.core.every_QMARK_.call(null, function(c) {
              var d = a.call(null, c);
              return cljs.core.truth_(d) ? b.call(null, c) : d
            }, j) : k
          }())
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), c = function(a, b, c, f) {
        switch(arguments.length) {
          case 0:
            return true;
          case 1:
            return d.call(this, a);
          case 2:
            return e.call(this, a, b);
          case 3:
            return k.call(this, a, b, c);
          default:
            return l.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
        }())
      }, k = function(d, e) {
        return cljs.core.boolean$.call(null, function() {
          var i = a.call(null, d);
          return cljs.core.truth_(i) ? (i = b.call(null, d), cljs.core.truth_(i) ? (i = c.call(null, d), cljs.core.truth_(i) ? (i = a.call(null, e), cljs.core.truth_(i) ? (i = b.call(null, e), cljs.core.truth_(i) ? c.call(null, e) : i) : i) : i) : i) : i
        }())
      }, l = function(d, e, i) {
        return cljs.core.boolean$.call(null, function() {
          var j = a.call(null, d);
          return cljs.core.truth_(j) ? (j = b.call(null, d), cljs.core.truth_(j) ? (j = c.call(null, d), cljs.core.truth_(j) ? (j = a.call(null, e), cljs.core.truth_(j) ? (j = b.call(null, e), cljs.core.truth_(j) ? (j = c.call(null, e), cljs.core.truth_(j) ? (j = a.call(null, i), cljs.core.truth_(j) ? (j = b.call(null, i), cljs.core.truth_(j) ? c.call(null, i) : j) : j) : j) : j) : j) : j) : j) : j
        }())
      }, m = function() {
        var e = function(e, j, k, l) {
          return cljs.core.boolean$.call(null, function() {
            var m = d.call(null, e, j, k);
            return cljs.core.truth_(m) ? cljs.core.every_QMARK_.call(null, function(d) {
              var e = a.call(null, d);
              return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
            }, l) : m
          }())
        }, j = function(a, b, c, d) {
          var f = null;
          goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, c, d, a)
        };
        return j
      }(), d = function(a, b, c, d) {
        switch(arguments.length) {
          case 0:
            return true;
          case 1:
            return e.call(this, a);
          case 2:
            return k.call(this, a, b);
          case 3:
            return l.call(this, a, b, c);
          default:
            return m.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = m.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.every_QMARK_.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.every_QMARK_.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? c.call(null, b) : d
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.every_QMARK_.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? (e = d.call(null, b), cljs.core.truth_(e) ? d.call(null, c) : e) : e
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            return cljs.core.boolean$.call(null, function() {
              var g = a.call(null, b, c, d);
              return cljs.core.truth_(g) ? cljs.core.every_QMARK_.call(null, function(a) {
                return cljs.core.every_QMARK_.call(null, a, f)
              }, e) : g
            }())
          }, c = function(a, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, c, d, e, a)
          };
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return true;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function() {
        var c = function(c, d, e, h) {
          c = b.call(null, c, d, e);
          return cljs.core.truth_(c) ? c : cljs.core.some.call(null, a, h)
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), b = function(b, d, e, g) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return a.call(null, b);
          case 2:
            var m = d, o = a.call(null, b);
            return cljs.core.truth_(o) ? o : a.call(null, m);
          case 3:
            var o = d, m = e, n = a.call(null, b);
            cljs.core.truth_(n) ? m = n : (o = a.call(null, o), m = cljs.core.truth_(o) ? o : a.call(null, m));
            return m;
          default:
            return c.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = c.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c, d, e) {
        var h = a.call(null, c);
        return cljs.core.truth_(h) ? h : (h = a.call(null, d), cljs.core.truth_(h) ? h : (h = a.call(null, e), cljs.core.truth_(h) ? h : (c = b.call(null, c), cljs.core.truth_(c) ? c : (d = b.call(null, d), cljs.core.truth_(d) ? d : b.call(null, e)))))
      }, e = function() {
        var d = function(d, e, i, j) {
          d = c.call(null, d, e, i);
          return cljs.core.truth_(d) ? d : cljs.core.some.call(null, function(c) {
            var d = a.call(null, c);
            return cljs.core.truth_(d) ? d : b.call(null, c)
          }, j)
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), c = function(c, h, m, o) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var n = c, q = a.call(null, n);
            return cljs.core.truth_(q) ? q : b.call(null, n);
          case 2:
            var q = c, n = h, p = a.call(null, q);
            cljs.core.truth_(p) ? n = p : (p = a.call(null, n), cljs.core.truth_(p) ? n = p : (q = b.call(null, q), n = cljs.core.truth_(q) ? q : b.call(null, n)));
            return n;
          case 3:
            return d.call(this, c, h, m);
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d, e) {
        var i = a.call(null, d);
        return cljs.core.truth_(i) ? i : (i = b.call(null, d), cljs.core.truth_(i) ? i : (i = c.call(null, d), cljs.core.truth_(i) ? i : (i = a.call(null, e), cljs.core.truth_(i) ? i : (i = b.call(null, e), cljs.core.truth_(i) ? i : c.call(null, e)))))
      }, k = function(d, e, i) {
        var j = a.call(null, d);
        return cljs.core.truth_(j) ? j : (j = b.call(null, d), cljs.core.truth_(j) ? j : (d = c.call(null, d), cljs.core.truth_(d) ? d : (d = a.call(null, e), cljs.core.truth_(d) ? d : (d = b.call(null, e), cljs.core.truth_(d) ? d : (e = c.call(null, e), cljs.core.truth_(e) ? e : (e = a.call(null, i), cljs.core.truth_(e) ? e : (e = b.call(null, i), cljs.core.truth_(e) ? e : c.call(null, i))))))))
      }, l = function() {
        var e = function(e, j, k, l) {
          e = d.call(null, e, j, k);
          return cljs.core.truth_(e) ? e : cljs.core.some.call(null, function(d) {
            var e = a.call(null, d);
            return cljs.core.truth_(e) ? e : (e = b.call(null, d), cljs.core.truth_(e) ? e : c.call(null, d))
          }, l)
        }, j = function(a, b, c, d) {
          var f = null;
          goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, c, d, a)
        };
        return j
      }(), d = function(d, i, n, q) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var p;
            p = d;
            var r = a.call(null, p);
            cljs.core.truth_(r) ? p = r : (r = b.call(null, p), p = cljs.core.truth_(r) ? r : c.call(null, p));
            return p;
          case 2:
            return e.call(this, d, i);
          case 3:
            return k.call(this, d, i, n);
          default:
            return l.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.some.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.some.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? d : c.call(null, b)
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.some.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? e : (e = d.call(null, b), cljs.core.truth_(e) ? e : d.call(null, c))
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            b = a.call(null, b, c, d);
            return cljs.core.truth_(b) ? b : cljs.core.some.call(null, function(a) {
              return cljs.core.some.call(null, a, f)
            }, e)
          }, c = function(a, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, c, d, e, a)
          };
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return null;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, false, function() {
      var d = cljs.core.seq.call(null, c);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, d)), a.call(null, b, cljs.core.rest.call(null, d))) : null
    })
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, false, function() {
      var e = cljs.core.seq.call(null, c), j = cljs.core.seq.call(null, d);
      return cljs.core.truth_(cljs.core.truth_(e) ? j : e) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, e), cljs.core.first.call(null, j)), a.call(null, b, cljs.core.rest.call(null, e), cljs.core.rest.call(null, j))) : null
    })
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, false, function() {
      var j = cljs.core.seq.call(null, c), k = cljs.core.seq.call(null, d), l = cljs.core.seq.call(null, e);
      return cljs.core.truth_(cljs.core.truth_(j) ? cljs.core.truth_(k) ? l : k : j) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, j), cljs.core.first.call(null, k), cljs.core.first.call(null, l)), a.call(null, b, cljs.core.rest.call(null, j), cljs.core.rest.call(null, k), cljs.core.rest.call(null, l))) : null
    })
  }, e = function() {
    var b = function(b, c, d, e, f) {
      return a.call(null, function(a) {
        return cljs.core.apply.call(null, b, a)
      }, function o(b) {
        return new cljs.core.LazySeq(null, false, function() {
          var c = a.call(null, cljs.core.seq, b);
          return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, c)) ? cljs.core.cons.call(null, a.call(null, cljs.core.first, c), o.call(null, a.call(null, cljs.core.rest, c))) : null
        })
      }.call(null, cljs.core.conj.call(null, f, e, d, c)))
    }, c = function(a, c, d, e, g) {
      var m = null;
      goog.isDef(g) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, a, c, d, e, m)
    };
    c.cljs$lang$maxFixedArity = 4;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
      return b.call(this, c, d, e, g, a)
    };
    return c
  }(), a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, i);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    if(cljs.core.truth_(b > 0)) {
      var d = cljs.core.seq.call(null, c);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take.call(null, b - 1, cljs.core.rest.call(null, d))) : null
    }else {
      return null
    }
  })
};
cljs.core.drop = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = a > 0;
        return cljs.core.truth_(b) ? c : b
      }())) {
        var g = a - 1, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return c.call(null, a, b)
  })
};
cljs.core.drop_last = function() {
  var a = null, b = function(a, b) {
    return cljs.core.map.call(null, function(a) {
      return a
    }, b, cljs.core.drop.call(null, a, b))
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, 1, c);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = cljs.core.seq.call(null, cljs.core.drop.call(null, a, b));;) {
    if(cljs.core.truth_(d)) {
      c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = c;
        return cljs.core.truth_(b) ? a.call(null, cljs.core.first.call(null, c)) : b
      }())) {
        var g = a, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return c.call(null, a, b)
  })
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, false, function() {
    var c = cljs.core.seq.call(null, b);
    return cljs.core.truth_(c) ? cljs.core.concat.call(null, c, cycle.call(null, c)) : null
  })
};
cljs.core.split_at = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take.call(null, a, b), cljs.core.drop.call(null, a, b)])
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, b, a.call(null, b))
    })
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return cljs.core.take.call(null, c, a.call(null, d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take.call(null, a, cljs.core.repeat.call(null, b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, b.call(null), a.call(null, b))
    })
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return cljs.core.take.call(null, c, a.call(null, d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, b, b.call(null, c))
  }))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, false, function() {
      var f = cljs.core.seq.call(null, b), g = cljs.core.seq.call(null, c);
      return cljs.core.truth_(cljs.core.truth_(f) ? g : f) ? cljs.core.cons.call(null, cljs.core.first.call(null, f), cljs.core.cons.call(null, cljs.core.first.call(null, g), a.call(null, cljs.core.rest.call(null, f), cljs.core.rest.call(null, g)))) : null
    })
  }, c = function() {
    var b = function(b, c, d) {
      return new cljs.core.LazySeq(null, false, function() {
        var e = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, d, c, b));
        return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, e)) ? cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, e), cljs.core.apply.call(null, a, cljs.core.map.call(null, cljs.core.rest, e))) : null
      })
    }, c = function(a, c, e) {
      var i = null;
      goog.isDef(e) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, i)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, c, e, a)
    };
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      default:
        return c.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, false, function() {
      var f = cljs.core.seq.call(null, a);
      return cljs.core.truth_(f) ? cljs.core.cons.call(null, cljs.core.first.call(null, f), c.call(null, cljs.core.rest.call(null, f), e)) : cljs.core.truth_(cljs.core.seq.call(null, e)) ? c.call(null, cljs.core.first.call(null, e), cljs.core.rest.call(null, e)) : null
    })
  }.call(null, null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      var g = null;
      goog.isDef(c) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, a, b, g))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, b, c, a))
    };
    return a
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.flatten1.call(null, cljs.core.map.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), d = cljs.core.rest.call(null, d);
      return cljs.core.truth_(b.call(null, e)) ? cljs.core.cons.call(null, e, filter.call(null, b, d)) : filter.call(null, b, d)
    }else {
      return null
    }
  })
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, c, cljs.core.truth_(a.call(null, c)) ? cljs.core.mapcat.call(null, e, b.call(null, c)) : null)
    })
  }.call(null, c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter.call(null, function(a) {
    return cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, a))
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  return cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.partition = function() {
  var a = null, b = function(b, c, f) {
    return new cljs.core.LazySeq(null, false, function() {
      var g = cljs.core.seq.call(null, f);
      if(cljs.core.truth_(g)) {
        var h = cljs.core.take.call(null, b, g);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, h))) ? cljs.core.cons.call(null, h, a.call(null, b, c, cljs.core.drop.call(null, c, g))) : null
      }else {
        return null
      }
    })
  }, c = function(b, c, f, g) {
    return new cljs.core.LazySeq(null, false, function() {
      var h = cljs.core.seq.call(null, g);
      if(cljs.core.truth_(h)) {
        var i = cljs.core.take.call(null, b, h);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, i))) ? cljs.core.cons.call(null, i, a.call(null, b, c, f, cljs.core.drop.call(null, c, h))) : cljs.core.list.call(null, cljs.core.take.call(null, b, cljs.core.concat.call(null, i, f)))
      }else {
        return null
      }
    })
  };
  return a = function(d, e, f, g) {
    switch(arguments.length) {
      case 2:
        return a.call(null, d, d, e);
      case 3:
        return b.call(this, d, e, f);
      case 4:
        return c.call(this, d, e, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get_in = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reduce.call(null, cljs.core.get, a, c);
      case 3:
        var e;
        a: {
          for(var f = cljs.core.lookup_sentinel, g = a, h = cljs.core.seq.call(null, c);;) {
            if(cljs.core.truth_(h)) {
              if(g = cljs.core.get.call(null, g, cljs.core.first.call(null, h), f), cljs.core.truth_(cljs.core.identical_QMARK_.call(null, f, g))) {
                e = d;
                break a
              }else {
                h = cljs.core.next.call(null, h)
              }
            }else {
              e = g;
              break a
            }
          }
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, assoc_in.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d)
};
cljs.core.update_in = function() {
  var a = function(a, d, e, f) {
    var g = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nthnext.call(null, d, 1);
    return cljs.core.truth_(d) ? cljs.core.assoc.call(null, a, g, cljs.core.apply.call(null, b, cljs.core.get.call(null, a, g), d, e, f)) : cljs.core.assoc.call(null, a, g, cljs.core.apply.call(null, e, cljs.core.get.call(null, a, g), f))
  }, b = function(b, d, e, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, d, e, g)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
    return a.call(this, d, e, f, b)
  };
  return b
}();
cljs.core.Vector = function(a, b) {
  this.meta = a;
  this.array = b
};
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c, null);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  a = cljs.core.aclone.call(null, this.array);
  a[b] = c;
  return new cljs.core.Vector(this.meta, a)
};
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = function(a, b) {
  var c = cljs.core.aclone.call(null, this.array);
  c.push(b);
  return new cljs.core.Vector(this.meta, c)
};
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, this.array, c);
      case 3:
        return cljs.core.ci_reduce.call(null, this.array, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(a.array.length > 0) ? function c(d) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.truth_(d < a.array.length) ? cljs.core.cons.call(null, a.array[d], c.call(null, d + 1)) : null
    })
  }.call(null, 0) : null
};
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = function() {
  return this.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = function() {
  var a = this.array.length;
  return cljs.core.truth_(a > 0) ? this.array[a - 1] : null
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop = function() {
  if(cljs.core.truth_(this.array.length > 0)) {
    var a = cljs.core.aclone.call(null, this.array);
    a.pop();
    return new cljs.core.Vector(this.meta, a)
  }else {
    throw Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = function(a, b, c) {
  return cljs.core._assoc.call(null, a, b, c)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Vector(b, this.array)
};
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var c = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < c.array.length : a
    }()) ? c.array[b] : null
  }, c = function(a, b, c) {
    var g = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < g.array.length : a
    }()) ? g.array[b] : c
  };
  return function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, cljs.core.array.call(null));
cljs.core.Vector.fromArray = function(a) {
  return new cljs.core.Vector(null, a)
};
cljs.core.Vector.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.vec = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.Vector.EMPTY, a)
};
cljs.core.vector = function() {
  var a = function(a) {
    var c = null;
    goog.isDef(a) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return cljs.core.vec.call(null, c)
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return cljs.core.vec.call(null, a)
  };
  return a
}();
cljs.core.NeverEquiv = function() {
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = function() {
  return false
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b))) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(a) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, b, cljs.core.first.call(null, a), cljs.core.never_equiv), cljs.core.second.call(null, a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(cljs.core.truth_(e < d)) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, b, c[e]))) {
        return e
      }else {
        e += a
      }
    }else {
      return null
    }
  }
};
cljs.core.obj_map_contains_key_QMARK_ = function() {
  var a = null, b = function(a, b, e, f) {
    return cljs.core.truth_(function() {
      var e = goog.isString.call(null, a);
      return cljs.core.truth_(e) ? b.hasOwnProperty(a) : e
    }()) ? e : f
  };
  return a = function(c, d, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, d, true, false);
      case 4:
        return b.call(this, c, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap = function(a, b, c) {
  this.meta = a;
  this.keys = b;
  this.strobj = c
};
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        return cljs.core.obj_map_contains_key_QMARK_.call(null, c, this.strobj, this.strobj[c], d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  if(cljs.core.truth_(goog.isString.call(null, b))) {
    var a = goog.object.clone.call(null, this.strobj), d = a.hasOwnProperty(b);
    a[b] = c;
    return cljs.core.truth_(d) ? new cljs.core.ObjMap(this.meta, this.keys, a) : (c = cljs.core.aclone.call(null, this.keys), c.push(b), new cljs.core.ObjMap(this.meta, c, a))
  }else {
    return cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null, b, c), cljs.core.seq.call(null, a)), this.meta)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  return cljs.core.obj_map_contains_key_QMARK_.call(null, b, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(a.keys.length > 0) ? cljs.core.map.call(null, function(b) {
    return cljs.core.vector.call(null, b, a.strobj[b])
  }, a.keys) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var c = this;
  if(cljs.core.truth_(function() {
    var a = goog.isString.call(null, b);
    return cljs.core.truth_(a) ? c.strobj.hasOwnProperty(b) : a
  }())) {
    var d = cljs.core.aclone.call(null, c.keys), e = goog.object.clone.call(null, c.strobj);
    d.splice(cljs.core.scan_array.call(null, 1, b, d), 1);
    cljs.core.js_delete.call(null, e, b);
    return new cljs.core.ObjMap(c.meta, d, e)
  }else {
    return a
  }
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, cljs.core.array.call(null), cljs.core.js_obj.call(null));
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b)
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap = function(a, b, c) {
  this.meta = a;
  this.count = b;
  this.hashobj = c
};
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        var e = this.hashobj[cljs.core.hash.call(null, c)], f = cljs.core.truth_(e) ? cljs.core.scan_array.call(null, 2, c, e) : null;
        return cljs.core.truth_(f) ? e[f + 1] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  var a = cljs.core.hash.call(null, b), d = this.hashobj[a];
  if(cljs.core.truth_(d)) {
    var d = cljs.core.aclone.call(null, d), e = goog.object.clone.call(null, this.hashobj);
    e[a] = d;
    a = cljs.core.scan_array.call(null, 2, b, d);
    return cljs.core.truth_(a) ? (d[a + 1] = c, new cljs.core.HashMap(this.meta, this.count, e)) : (d.push(b, c), new cljs.core.HashMap(this.meta, this.count + 1, e))
  }else {
    return d = goog.object.clone.call(null, this.hashobj), d[a] = cljs.core.array.call(null, b, c), new cljs.core.HashMap(this.meta, this.count + 1, d)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  var c = this.hashobj[cljs.core.hash.call(null, b)], c = cljs.core.truth_(c) ? cljs.core.scan_array.call(null, 2, b, c) : null;
  return cljs.core.truth_(c) ? true : false
};
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  if(cljs.core.truth_(a.count > 0)) {
    var b = cljs.core.js_keys.call(null, a.hashobj);
    return cljs.core.mapcat.call(null, function(b) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, a.hashobj[b]))
    }, b)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.HashMap(b, this.count, this.hashobj)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var c = cljs.core.hash.call(null, b), d = this.hashobj[c], e = cljs.core.truth_(d) ? cljs.core.scan_array.call(null, 2, b, d) : null;
  if(cljs.core.truth_(cljs.core.not.call(null, e))) {
    return a
  }else {
    var f = goog.object.clone.call(null, this.hashobj);
    cljs.core.truth_(3 > d.length) ? cljs.core.js_delete.call(null, f, c) : (d = cljs.core.aclone.call(null, d), d.splice(e, 2), f[c] = d);
    return new cljs.core.HashMap(this.meta, this.count - 1, f)
  }
};
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, cljs.core.js_obj.call(null));
cljs.core.HashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.HashMap.EMPTY;;) {
    if(cljs.core.truth_(d < c)) {
      var f = d + 1, e = cljs.core.assoc.call(null, e, a[d], b[d]), d = f
    }else {
      return e
    }
  }
};
cljs.core.HashMap.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq.call(null, a), b = cljs.core.HashMap.EMPTY;;) {
      if(cljs.core.truth_(a)) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a)), a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.keys = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, a))
};
cljs.core.vals = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, a))
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, a)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.conj.call(null, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, b))) {
      var e = function(b, d) {
        var e = cljs.core.first.call(null, d), i = cljs.core.second.call(null, d);
        return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, b, e)) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), i)) : cljs.core.assoc.call(null, b, e, i)
      };
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.reduce.call(null, e, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), cljs.core.seq.call(null, b))
      }, b)
    }else {
      return null
    }
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, d, b)
  };
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.ObjMap.fromObject([], {}), d = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), f = cljs.core.get.call(null, a, e, "\ufdd0'user/not-found"), c = cljs.core.truth_(cljs.core.not_EQ_.call(null, f, "\ufdd0'user/not-found")) ? cljs.core.assoc.call(null, c, e, f) : c, d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.Set = function(a, b) {
  this.meta = a;
  this.hash_map = b
};
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        return cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this.hash_map, c)) ? c : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.assoc.call(null, this.hash_map, b, null))
};
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = function() {
  return cljs.core.keys.call(null, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.dissoc.call(null, this.hash_map, b))
};
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.count.call(null, cljs.core.seq.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  var c = cljs.core.set_QMARK_.call(null, b);
  return cljs.core.truth_(c) ? (c = cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b)), cljs.core.truth_(c) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c) : c
};
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Set(b, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Set.EMPTY, this.meta)
};
cljs.core.Set.EMPTY = new cljs.core.Set(null, cljs.core.hash_map.call(null));
cljs.core.Set.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.set = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = cljs.core.Set.EMPTY;;) {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.empty_QMARK_.call(null, a)))) {
      var c = cljs.core.rest.call(null, a), b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = c
    }else {
      return b
    }
  }
};
cljs.core.replace = function(a, b) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b))) {
    var c = cljs.core.count.call(null, b);
    return cljs.core.reduce.call(null, function(b, c) {
      var f = cljs.core.find.call(null, a, cljs.core.nth.call(null, b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.call(null, b, c, cljs.core.second.call(null, f)) : b
    }, b, cljs.core.take.call(null, c, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(b) {
      var c = cljs.core.find.call(null, a, b);
      return cljs.core.truth_(c) ? cljs.core.second.call(null, c) : b
    }, b)
  }
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(a, d) {
        for(;;) {
          var e = a, i = cljs.core.nth.call(null, e, 0, null), e = cljs.core.seq.call(null, e);
          if(cljs.core.truth_(e)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, d, i))) {
              i = cljs.core.rest.call(null, e), e = d, a = i, d = e
            }else {
              return cljs.core.cons.call(null, i, c.call(null, cljs.core.rest.call(null, e), cljs.core.conj.call(null, d, i)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    })
  }.call(null, a, cljs.core.set([]))
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.Vector.fromArray([]);;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.seq.call(null, b)
    }
  }
};
cljs.core.name = function(a) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, a))) {
    return a
  }else {
    if(cljs.core.truth_(function() {
      var b = cljs.core.keyword_QMARK_.call(null, a);
      return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
    }())) {
      var b = a.lastIndexOf("/");
      return cljs.core.truth_(b < 0) ? cljs.core.subs.call(null, a, 2) : cljs.core.subs.call(null, a, b + 1)
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        throw Error(cljs.core.str.call(null, "Doesn't support name: ", a));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function(a) {
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_.call(null, a);
    return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
  }())) {
    var b = a.lastIndexOf("/");
    return cljs.core.truth_(b > -1) ? cljs.core.subs.call(null, a, 2, b) : null
  }else {
    throw Error(cljs.core.str.call(null, "Doesn't support namespace: ", a));
  }
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.ObjMap.fromObject([], {}), d = cljs.core.seq.call(null, a), e = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return cljs.core.truth_(a) ? e : a
    }())) {
      var c = cljs.core.assoc.call(null, c, cljs.core.first.call(null, d), cljs.core.first.call(null, e)), f = cljs.core.next.call(null, d), g = cljs.core.next.call(null, e), d = f, e = g
    }else {
      return c
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), h)
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 2:
        return d;
      case 3:
        return cljs.core.truth_(a.call(null, d) > a.call(null, e)) ? d : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), h)
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 2:
        return d;
      case 3:
        return cljs.core.truth_(a.call(null, d) < a.call(null, e)) ? d : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, d, e) {
    return new cljs.core.LazySeq(null, false, function() {
      var f = cljs.core.seq.call(null, e);
      return cljs.core.truth_(f) ? cljs.core.cons.call(null, cljs.core.take.call(null, b, f), a.call(null, b, d, cljs.core.drop.call(null, d, f))) : null
    })
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, c, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    var d = cljs.core.seq.call(null, c);
    return cljs.core.truth_(d) ? cljs.core.truth_(b.call(null, cljs.core.first.call(null, d))) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_while.call(null, b, cljs.core.rest.call(null, d))) : null : null
  })
};
cljs.core.Range = function(a, b, c, d) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d
};
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = function(a) {
  var b = cljs.core.truth_(this.step > 0) ? cljs.core._LT_ : cljs.core._GT_;
  return cljs.core.truth_(b.call(null, this.start, this.end)) ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.truth_(cljs.core.not.call(null, cljs.core._seq.call(null, a))) ? 0 : Math.ceil.call(null, (this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.truth_(cljs.core._seq.call(null, a)) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step) : cljs.core.list.call(null)
};
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step)
};
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var c = this;
    if(cljs.core.truth_(b < cljs.core._count.call(null, a))) {
      return c.start + b * c.step
    }else {
      if(cljs.core.truth_(function() {
        var a = c.start > c.end;
        return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, c.step, 0) : a
      }())) {
        return c.start
      }else {
        throw Error("Index out of bounds");
      }
    }
  }, c = function(a, b, c) {
    var g = this;
    return cljs.core.truth_(b < cljs.core._count.call(null, a)) ? g.start + b * g.step : cljs.core.truth_(function() {
      var a = g.start > g.end;
      return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, g.step, 0) : a
    }()) ? g.start : c
  };
  return function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.range = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 0, Number.MAX_VALUE, 1);
      case 1:
        return a.call(null, 0, b, 1);
      case 2:
        return a.call(null, b, c, 1);
      case 3:
        return new cljs.core.Range(null, b, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    var d = cljs.core.seq.call(null, c);
    return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_nth.call(null, b, cljs.core.drop.call(null, b, d))) : null
  })
};
cljs.core.split_with = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take_while.call(null, a, b), cljs.core.drop_while.call(null, a, b)])
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, false, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), f = b.call(null, e), e = cljs.core.cons.call(null, e, cljs.core.take_while.call(null, function(c) {
        return cljs.core._EQ_.call(null, f, b.call(null, c))
      }, cljs.core.next.call(null, d)));
      return cljs.core.cons.call(null, e, partition_by.call(null, b, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, e), d))))
    }else {
      return null
    }
  })
};
cljs.core.frequencies = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.assoc.call(null, a, c, cljs.core.get.call(null, a, c, 0) + 1)
  }, cljs.core.ObjMap.fromObject([], {}), a)
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, false, function() {
      var f = cljs.core.seq.call(null, c);
      return cljs.core.truth_(f) ? a.call(null, b, cljs.core.first.call(null, f), cljs.core.rest.call(null, f)) : cljs.core.list.call(null, b.call(null))
    })
  }, c = function(b, c, f) {
    return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, false, function() {
      var g = cljs.core.seq.call(null, f);
      return cljs.core.truth_(g) ? a.call(null, b, b.call(null, c, cljs.core.first.call(null, g)), cljs.core.rest.call(null, g)) : null
    }))
  };
  return a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function() {
        var b = function(b, c, d, e) {
          var g = null;
          goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, b, c, d, g))
        };
        b.cljs$lang$maxFixedArity = 3;
        b.cljs$lang$applyTo = function(b) {
          var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, c, d, e, b))
        };
        return b
      }(), b = function(b, d, e, g) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, b));
          case 2:
            return cljs.core.vector.call(null, a.call(null, b, d));
          case 3:
            return cljs.core.vector.call(null, a.call(null, b, d, e));
          default:
            return c.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = c.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, e, h) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, c, d, e, h), cljs.core.apply.call(null, b, c, d, e, h))
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), c = function(c, e, h, m) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, c), b.call(null, c));
          case 2:
            return cljs.core.vector.call(null, a.call(null, c, e), b.call(null, c, e));
          case 3:
            return cljs.core.vector.call(null, a.call(null, c, e, h), b.call(null, c, e, h));
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, i, j) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, d, e, i, j), cljs.core.apply.call(null, b, d, e, i, j), cljs.core.apply.call(null, c, d, e, i, j))
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), d = function(d, i, m, o) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null), c.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, d), b.call(null, d), c.call(null, d));
          case 2:
            return cljs.core.vector.call(null, a.call(null, d, i), b.call(null, d, i), c.call(null, d, i));
          case 3:
            return cljs.core.vector.call(null, a.call(null, d, i, m), b.call(null, d, i, m), c.call(null, d, i, m));
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function() {
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null))
          }, cljs.core.Vector.fromArray([]), e)
        }, c = function(a) {
          return cljs.core.reduce.call(null, function(b, c) {
            return cljs.core.conj.call(null, b, c.call(null, a))
          }, cljs.core.Vector.fromArray([]), e)
        }, d = function(a, b) {
          return cljs.core.reduce.call(null, function(c, d) {
            return cljs.core.conj.call(null, c, d.call(null, a, b))
          }, cljs.core.Vector.fromArray([]), e)
        }, f = function(a, b, c) {
          return cljs.core.reduce.call(null, function(d, e) {
            return cljs.core.conj.call(null, d, e.call(null, a, b, c))
          }, cljs.core.Vector.fromArray([]), e)
        }, g = function() {
          var a = function(a, b, c, d) {
            return cljs.core.reduce.call(null, function(e, f) {
              return cljs.core.conj.call(null, e, cljs.core.apply.call(null, f, a, b, c, d))
            }, cljs.core.Vector.fromArray([]), e)
          }, b = function(b, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return a.call(this, b, c, d, f)
          };
          b.cljs$lang$maxFixedArity = 3;
          b.cljs$lang$applyTo = function(b) {
            var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
            return a.call(this, c, d, e, b)
          };
          return b
        }(), a = function(a, e, h, i) {
          switch(arguments.length) {
            case 0:
              return b.call(this);
            case 1:
              return c.call(this, a);
            case 2:
              return d.call(this, a, e);
            case 3:
              return f.call(this, a, e, h);
            default:
              return g.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = g.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var e = cljs.core.seq.call(null, b);
        return cljs.core.truth_(e) ? a > 0 : e
      }())) {
        var e = a - 1, f = cljs.core.next.call(null, b), a = e, b = f
      }else {
        return null
      }
    }
  };
  return function(a, d) {
    switch(arguments.length) {
      case 1:
        var e;
        a: {
          for(var f = a;;) {
            if(cljs.core.truth_(cljs.core.seq.call(null, f))) {
              f = cljs.core.next.call(null, f)
            }else {
              e = null;
              break a
            }
          }
        }
        return e;
      case 2:
        return b.call(this, a, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.doall = function() {
  var a = null;
  return function(a, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.dorun.call(null, a), a;
      case 2:
        return cljs.core.dorun.call(null, a, c), c
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, c), b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, c), 1)) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? null : cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, c), 1)) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find.call(null, b, c), e = c.search(b), f = cljs.core.truth_(cljs.core.coll_QMARK_.call(null, d)) ? cljs.core.first.call(null, d) : d, g = cljs.core.subs.call(null, c, e + cljs.core.count.call(null, f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, false, function() {
    return cljs.core.cons.call(null, d, re_seq.call(null, b, g))
  }) : null
};
cljs.core.re_pattern = function(a) {
  return RegExp(a)
};
cljs.core.pr_sequential = function(a, b, c, d, e, f) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([b]), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.Vector.fromArray([c]), cljs.core.map.call(null, function(b) {
    return a.call(null, b, e)
  }, f))), cljs.core.Vector.fromArray([d]))
};
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.pr_seq = function pr_seq(b, c) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? cljs.core.list.call(null, "nil") : cljs.core.truth_(cljs.core.undefined_QMARK_.call(null, b)) ? cljs.core.list.call(null, "#<undefined>") : cljs.core.truth_("\ufdd0'else") ? cljs.core.concat.call(null, cljs.core.truth_(function() {
    var d = cljs.core.get.call(null, c, "\ufdd0'meta");
    return cljs.core.truth_(d) ? (d = function() {
      return cljs.core.truth_(function() {
        if(cljs.core.truth_(b)) {
          var c = b.cljs$core$IMeta$;
          return cljs.core.truth_(c) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IMeta$")) : c
        }else {
          return b
        }
      }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, b)
    }(), cljs.core.truth_(d) ? cljs.core.meta.call(null, b) : d) : d
  }()) ? cljs.core.concat.call(null, cljs.core.Vector.fromArray(["^"]), pr_seq.call(null, cljs.core.meta.call(null, b), c), cljs.core.Vector.fromArray([" "])) : null, cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(b)) {
        var c = b.cljs$core$IPrintable$;
        return cljs.core.truth_(c) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IPrintable$")) : c
      }else {
        return b
      }
    }()) ? true : cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, b)
  }()) ? cljs.core._pr_seq.call(null, b, c) : cljs.core.list.call(null, "#<", cljs.core.str.call(null, b), ">")) : null
};
cljs.core.pr_str_with_opts = function(a, b) {
  var c = cljs.core.first.call(null, a), d = new goog.string.StringBuffer, e = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(e)) {
    for(var f = cljs.core.first.call(null, e);;) {
      cljs.core.truth_(cljs.core.identical_QMARK_.call(null, f, c)) || d.append(" ");
      var g = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, f, b));
      if(cljs.core.truth_(g)) {
        for(f = cljs.core.first.call(null, g);;) {
          if(d.append(f), f = cljs.core.next.call(null, g), cljs.core.truth_(f)) {
            g = f, f = cljs.core.first.call(null, g)
          }else {
            break
          }
        }
      }
      e = cljs.core.next.call(null, e);
      if(cljs.core.truth_(e)) {
        f = e, e = cljs.core.first.call(null, f), g = f, f = e, e = g
      }else {
        break
      }
    }
  }
  return cljs.core.str.call(null, d)
};
cljs.core.pr_with_opts = function(a, b) {
  var c = cljs.core.first.call(null, a), d = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(d)) {
    for(var e = cljs.core.first.call(null, d);;) {
      cljs.core.truth_(cljs.core.identical_QMARK_.call(null, e, c)) || cljs.core.string_print.call(null, " ");
      var f = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, e, b));
      if(cljs.core.truth_(f)) {
        for(e = cljs.core.first.call(null, f);;) {
          if(cljs.core.string_print.call(null, e), e = cljs.core.next.call(null, f), cljs.core.truth_(e)) {
            f = e, e = cljs.core.first.call(null, f)
          }else {
            break
          }
        }
      }
      d = cljs.core.next.call(null, d);
      if(cljs.core.truth_(d)) {
        e = d, d = cljs.core.first.call(null, e), f = e, e = d, d = f
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.newline = function(a) {
  cljs.core.string_print.call(null, "\n");
  return cljs.core.truth_(cljs.core.get.call(null, a, "\ufdd0'flush-on-newline")) ? cljs.core.flush.call(null) : null
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.IPrintable.number = true;
cljs.core._pr_seq.number = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", b, a)
};
cljs.core.IPrintable.string = true;
cljs.core._pr_seq.string = function(a, b) {
  return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, ":", function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_("\ufdd0'else") ? cljs.core.list.call(null, cljs.core.truth_("\ufdd0'readably".call(null, b)) ? goog.string.quote.call(null, a) : a) : null
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable.array = true;
cljs.core._pr_seq.array = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", b, a)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "()")
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d
};
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = function(a, b, c) {
  var d = cljs.core.seq.call(null, this.watches);
  if(cljs.core.truth_(d)) {
    var e = cljs.core.first.call(null, d);
    cljs.core.nth.call(null, e, 0, null);
    for(cljs.core.nth.call(null, e, 1, null);;) {
      var f = e, e = cljs.core.nth.call(null, f, 0, null), f = cljs.core.nth.call(null, f, 1, null);
      f.call(null, e, a, b, c);
      d = cljs.core.next.call(null, d);
      if(cljs.core.truth_(d)) {
        e = d, d = cljs.core.first.call(null, e), f = e, e = d, d = f
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = function(a, b, c) {
  return a.watches = cljs.core.assoc.call(null, this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = function(a, b) {
  return a.watches = cljs.core.dissoc.call(null, this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray(["#<Atom: "]), cljs.core._pr_seq.call(null, this.state, b), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.identical_QMARK_.call(null, a, b)
};
cljs.core.atom = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, d = cljs.core.get.call(null, c, "\ufdd0'validator"), c = cljs.core.get.call(null, c, "\ufdd0'meta");
      return new cljs.core.Atom(a, c, d, null)
    }, b = function(b, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return a.call(this, b, g)
    };
    b.cljs$lang$maxFixedArity = 1;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), b = cljs.core.rest(b);
      return a.call(this, d, b)
    };
    return b
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return new cljs.core.Atom(a, null, null, null);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.call(null, b))) {
    throw Error(cljs.core.str.call(null, "Assert failed: ", "Validator rejected reference state", "\n", cljs.core.pr_str.call(null, cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"))));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches.call(null, a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c, g, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, b, a.state, c, g, h, j))
    };
    a.cljs$lang$maxFixedArity = 5;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), g = cljs.core.first(cljs.core.next(cljs.core.next(a))), h = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a))))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a)))));
      return cljs.core.reset_BANG_.call(null, b, cljs.core.apply.call(null, c, b.state, g, h, i, a))
    };
    return a
  }(), a = function(a, d, e, f, g, h) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state));
      case 3:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e));
      case 4:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e, f));
      case 5:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e, f, g));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a.state, b)) ? (cljs.core.reset_BANG_.call(null, a, c), true) : false
};
cljs.core.deref = function(a) {
  return cljs.core._deref.call(null, a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, c, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.meta = cljs.core.apply.call(null, c, a.meta, e)
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c.meta = cljs.core.apply.call(null, d, c.meta, a)
  };
  return a
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch.call(null, a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch.call(null, a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, "G__");
      case 1:
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.gensym_counter))) {
          cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
        }
        return cljs.core.symbol.call(null, cljs.core.str.call(null, b, cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc)))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.f = a;
  this.state = b
};
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = function() {
  return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, cljs.core.deref.call(null, this.state)))
};
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = function() {
  cljs.core.truth_(cljs.core.deref.call(null, this.state)) || cljs.core.swap_BANG_.call(null, this.state, this.f);
  return cljs.core.deref.call(null, this.state)
};
cljs.core.delay = function() {
  var a = function(a) {
    return new cljs.core.Delay(function() {
      return cljs.core.apply.call(null, cljs.core.identity, a)
    }, cljs.core.atom.call(null, null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.delay_QMARK_ = function(a) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, a)
};
cljs.core.force = function(a) {
  return cljs.core.truth_(cljs.core.delay_QMARK_.call(null, a)) ? cljs.core.deref.call(null, a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_.call(null, a)
};
cljs.core.js__GT_clj = function() {
  var a = function(a, b) {
    var e = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, e = cljs.core.get.call(null, e, "\ufdd0'keywordize-keys"), f = cljs.core.truth_(e) ? cljs.core.keyword : cljs.core.str;
    return function h(a) {
      return cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.doall.call(null, cljs.core.map.call(null, h, a)) : cljs.core.truth_(cljs.core.coll_QMARK_.call(null, a)) ? cljs.core.into.call(null, cljs.core.empty.call(null, a), cljs.core.map.call(null, h, a)) : cljs.core.truth_(goog.isArray.call(null, a)) ? cljs.core.vec.call(null, cljs.core.map.call(null, h, a)) : cljs.core.truth_(goog.isObject.call(null, a)) ? cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), function() {
        return function k(b) {
          return new cljs.core.LazySeq(null, false, function() {
            for(;;) {
              if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
                var c = cljs.core.first.call(null, b);
                return cljs.core.cons.call(null, cljs.core.Vector.fromArray([f.call(null, c), h.call(null, a[c])]), k.call(null, cljs.core.rest.call(null, b)))
              }else {
                return null
              }
            }
          })
        }.call(null, cljs.core.js_keys.call(null, a))
      }()) : cljs.core.truth_("\ufdd0'else") ? a : null
    }.call(null, a)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, d, b)
  };
  return b
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
  return function() {
    var c = function(c) {
      var d = cljs.core.get.call(null, cljs.core.deref.call(null, b), c);
      cljs.core.truth_(d) || (d = cljs.core.apply.call(null, a, c), cljs.core.swap_BANG_.call(null, b, cljs.core.assoc, c, d));
      return d
    }, d = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c.call(this, a)
    };
    return d
  }()
};
cljs.core.trampoline = function() {
  var a = null, b = function() {
    var b = function(b, c) {
      return a.call(null, function() {
        return cljs.core.apply.call(null, b, c)
      })
    }, d = function(a, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, g)
    };
    d.cljs$lang$maxFixedArity = 1;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, d, a)
    };
    return d
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 1:
        var e;
        a: {
          for(var f = a;;) {
            if(f = f.call(null), !cljs.core.truth_(cljs.core.fn_QMARK_.call(null, f))) {
              e = f;
              break a
            }
          }
        }
        return e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 1);
      case 1:
        return Math.random() * b
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return Math.floor(Math.random() * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.call(null, a, cljs.core.rand_int.call(null, cljs.core.count.call(null, a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    var e = a.call(null, d);
    return cljs.core.assoc.call(null, b, e, cljs.core.conj.call(null, cljs.core.get.call(null, b, e, cljs.core.Vector.fromArray([])), d))
  }, cljs.core.ObjMap.fromObject([], {}), b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'descendants":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'ancestors":cljs.core.ObjMap.fromObject([], {})})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, d, e) {
    var f = cljs.core._EQ_.call(null, d, e);
    if(cljs.core.truth_(f)) {
      return f
    }else {
      if(f = cljs.core.contains_QMARK_.call(null, "\ufdd0'ancestors".call(null, b).call(null, d), e), cljs.core.truth_(f)) {
        return f
      }else {
        if(f = cljs.core.vector_QMARK_.call(null, e), cljs.core.truth_(f)) {
          if(f = cljs.core.vector_QMARK_.call(null, d), cljs.core.truth_(f)) {
            if(f = cljs.core._EQ_.call(null, cljs.core.count.call(null, e), cljs.core.count.call(null, d)), cljs.core.truth_(f)) {
              for(var g = true, h = 0;;) {
                if(cljs.core.truth_(function() {
                  var a = cljs.core.not.call(null, g);
                  return cljs.core.truth_(a) ? a : cljs.core._EQ_.call(null, h, cljs.core.count.call(null, e))
                }())) {
                  return g
                }else {
                  var f = a.call(null, b, d.call(null, h), e.call(null, h)), i = h + 1, g = f, h = i
                }
              }
            }else {
              return f
            }
          }else {
            return f
          }
        }else {
          return f
        }
      }
    }
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), c, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.parents = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'parents".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ancestors = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'ancestors".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.descendants = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'descendants".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.derive = function() {
  var a = null, b = function(a, b, e) {
    if(!cljs.core.truth_(cljs.core.not_EQ_.call(null, b, e))) {
      throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"))));
    }
    var f = "\ufdd0'parents".call(null, a), g = "\ufdd0'descendants".call(null, a), h = "\ufdd0'ancestors".call(null, a), i = function(a, b, c, d, e) {
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.assoc.call(null, a, b, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, e, b, cljs.core.set([])), cljs.core.cons.call(null, d, e.call(null, d))))
      }, a, cljs.core.cons.call(null, b, c.call(null, b)))
    };
    if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, f.call(null, b), e))) {
      b = null
    }else {
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, h.call(null, b), e))) {
        throw Error(cljs.core.str.call(null, b, "already has", e, "as ancestor"));
      }
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, h.call(null, e), b))) {
        throw Error(cljs.core.str.call(null, "Cyclic derivation:", e, "has", b, "as ancestor"));
      }
      b = cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, "\ufdd0'parents".call(null, a), b, cljs.core.conj.call(null, cljs.core.get.call(null, f, b, cljs.core.set([])), e)), "\ufdd0'ancestors":i.call(null, "\ufdd0'ancestors".call(null, a), b, g, e, h), "\ufdd0'descendants":i.call(null, "\ufdd0'descendants".call(null, a), e, h, b, g)})
    }
    return cljs.core.truth_(b) ? b : a
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        if(!cljs.core.truth_(cljs.core.namespace.call(null, d))) {
          throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"))));
        }
        cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, c, d);
        return null;
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.underive = function() {
  var a = null, b = function(a, b, e) {
    var f = "\ufdd0'parents".call(null, a), g = cljs.core.truth_(f.call(null, b)) ? cljs.core.disj.call(null, f.call(null, b), e) : cljs.core.set([]), g = cljs.core.truth_(cljs.core.not_empty.call(null, g)) ? cljs.core.assoc.call(null, f, b, g) : cljs.core.dissoc.call(null, f, b), g = cljs.core.flatten.call(null, cljs.core.map.call(null, function(a) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, a), cljs.core.interpose.call(null, cljs.core.first.call(null, a), cljs.core.second.call(null, a)))
    }, cljs.core.seq.call(null, g)));
    return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, f.call(null, b), e)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.apply.call(null, cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, g)) : a
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, c, d), null;
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.call(null, a, function() {
    return cljs.core.deref.call(null, b)
  });
  return cljs.core.swap_BANG_.call(null, c, function() {
    return cljs.core.deref.call(null, d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref.call(null, d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.call(null, c) : e) ? true : null;
  return cljs.core.truth_(e) ? e : (e = function() {
    for(var e = cljs.core.parents.call(null, c);;) {
      if(cljs.core.truth_(cljs.core.count.call(null, e) > 0)) {
        cljs.core.truth_(prefers_STAR_.call(null, b, cljs.core.first.call(null, e), d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }(), cljs.core.truth_(e) ? e : (e = function() {
    for(var e = cljs.core.parents.call(null, b);;) {
      if(cljs.core.truth_(cljs.core.count.call(null, e) > 0)) {
        cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, e), c, d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }(), cljs.core.truth_(e) ? e : false))
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_.call(null, a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.call(null, a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var i = cljs.core.reduce.call(null, function(d, e) {
    var g = cljs.core.nth.call(null, e, 0, null);
    cljs.core.nth.call(null, e, 1, null);
    if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null, c, g))) {
      var h = cljs.core.truth_(function() {
        var b = cljs.core.nil_QMARK_.call(null, d);
        return cljs.core.truth_(b) ? b : cljs.core.dominates.call(null, g, cljs.core.first.call(null, d), f)
      }()) ? e : d;
      if(!cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, h), g, f))) {
        throw Error(cljs.core.str.call(null, "Multiple methods in multimethod '", b, "' match dispatch value: ", c, " -> ", g, " and ", cljs.core.first.call(null, h), ", and neither is preferred"));
      }
      return h
    }else {
      return null
    }
  }, null, cljs.core.deref.call(null, e));
  return cljs.core.truth_(i) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, h), cljs.core.deref.call(null, d))) ? (cljs.core.swap_BANG_.call(null, g, cljs.core.assoc, c, cljs.core.second.call(null, i)), cljs.core.second.call(null, i)) : (cljs.core.reset_cache.call(null, g, e, h, d), find_and_cache_best_method.call(null, b, c, d, e, f, g, h)) : null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_reset : a)) {
    a = a.cljs$core$IMultiFn$_reset(a)
  }else {
    var b;
    b = cljs.core._reset[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._reset._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._add_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_add_method : a)) {
    a = a.cljs$core$IMultiFn$_add_method(a, b, c)
  }else {
    var d;
    d = cljs.core._add_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._add_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._remove_method = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_remove_method : a)) {
    c = a.cljs$core$IMultiFn$_remove_method(a, b)
  }else {
    c = cljs.core._remove_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._remove_method._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._prefer_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefer_method : a)) {
    a = a.cljs$core$IMultiFn$_prefer_method(a, b, c)
  }else {
    var d;
    d = cljs.core._prefer_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._prefer_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._get_method = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_get_method : a)) {
    c = a.cljs$core$IMultiFn$_get_method(a, b)
  }else {
    c = cljs.core._get_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._get_method._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._methods = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_methods : a)) {
    a = a.cljs$core$IMultiFn$_methods(a)
  }else {
    var b;
    b = cljs.core._methods[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._methods._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._prefers = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefers : a)) {
    a = a.cljs$core$IMultiFn$_prefers(a)
  }else {
    var b;
    b = cljs.core._prefers[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._prefers._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._invoke = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_invoke : a)) {
    c = a.cljs$core$IMultiFn$_invoke(a, b)
  }else {
    c = cljs.core._invoke[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._invoke._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-invoke", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.do_invoke = function(a, b, c) {
  b = cljs.core.apply.call(null, b, c);
  a = cljs.core._get_method.call(null, a, b);
  if(!cljs.core.truth_(a)) {
    throw Error(cljs.core.str.call(null, "No method in multimethod '", cljs.core.name, "' for dispatch value: ", b));
  }
  return cljs.core.apply.call(null, a, c)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = function(a) {
  cljs.core.swap_BANG_.call(null, this.method_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.method_cache, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.prefer_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = function(a, b, c) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = function(a, b) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = function(a, b) {
  cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this.cached_hierarchy), cljs.core.deref.call(null, this.hierarchy))) || cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref.call(null, this.method_cache).call(null, b);
  return cljs.core.truth_(c) ? c : (c = cljs.core.find_and_cache_best_method.call(null, this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy), cljs.core.truth_(c) ? c : cljs.core.deref.call(null, this.method_table).call(null, this.default_dispatch_val))
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, b, c, this.prefer_table))) {
    throw Error(cljs.core.str.call(null, "Preference conflict in multimethod '", this.name, "': ", c, " is already preferred to ", b));
  }
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.assoc.call(null, a, b, cljs.core.conj.call(null, cljs.core.get.call(null, a, b, cljs.core.set([])), c))
  });
  return cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = function() {
  return cljs.core.deref.call(null, this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = function() {
  return cljs.core.deref.call(null, this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = function(a, b) {
  return cljs.core.do_invoke.call(null, a, this.dispatch_fn, b)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, c) {
    var d = null;
    goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return cljs.core._invoke.call(null, this, d)
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = function(a) {
    cljs.core.first(a);
    a = cljs.core.rest(a);
    return cljs.core._invoke.call(null, this, a)
  };
  return a
}();
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset.call(null, a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method.call(null, a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method.call(null, a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods.call(null, a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method.call(null, a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers.call(null, a)
};
var editor = {add_link:function(a, b) {
  var c = goog.dom.createDom.call(null, "link");
  goog.dom.setProperties.call(null, c, cljs.core.ObjMap.fromObject(["type", "rel", "href"], {type:"text/css", rel:"stylesheet", href:b}).strobj);
  return goog.dom.appendChild.call(null, a, c)
}};
editor.prepenvironment = function() {
  var a = function(a, b) {
    return cljs.core.str.call(null, a, cljs.core.name.call(null, b), ".css")
  }, b = goog.dom.getElementsByTagNameAndClass.call(null, "head").item(0), c = cljs.core.seq.call(null, cljs.core.map.call(null, function(b) {
    return a.call(null, "../css/", b)
  }, cljs.core.Vector.fromArray("\ufdd0'demo,\ufdd0'button,\ufdd0'dialog,\ufdd0'linkbutton,\ufdd0'menu,\ufdd0'menuitem,\ufdd0'menuseparator,\ufdd0'tab,\ufdd0'tabbar,\ufdd0'toolbar,\ufdd0'colormenubutton,\ufdd0'palette,\ufdd0'colorpalette,\ufdd0'editortoolbar".split(","))));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(editor.add_link.call(null, b, d), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  c = cljs.core.seq.call(null, cljs.core.map.call(null, function(b) {
    return a.call(null, "css/editor/", b)
  }, cljs.core.Vector.fromArray(["\ufdd0'bubble", "\ufdd0'dialog", "\ufdd0'linkdialog"])));
  if(cljs.core.truth_(c)) {
    for(d = cljs.core.first.call(null, c);;) {
      if(editor.add_link.call(null, b, d), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
goog.exportSymbol("editor.prepenvironment", editor.prepenvironment);
editor.buildeditor = function(a, b) {
  var c = new goog.editor.Field(a), d = cljs.core.vec.call(null, cljs.core.map.call(null, function(a) {
    return goog.editor.Command[cljs.core.name.call(null, a)]
  }, cljs.core.Vector.fromArray("\ufdd0'BOLD,\ufdd0'ITALIC,\ufdd0'UNDERLINE,\ufdd0'FONT_COLOR,\ufdd0'BACKGROUND_COLOR,\ufdd0'FONT_FACE,\ufdd0'FONT_SIZE,\ufdd0'LINK,\ufdd0'UNDO,\ufdd0'REDO,\ufdd0'UNORDERED_LIST,\ufdd0'ORDERED_LIST,\ufdd0'INDENT,\ufdd0'OUTDENT,\ufdd0'JUSTIFY_LEFT,\ufdd0'JUSTIFY_CENTER,\ufdd0'JUSTIFY_RIGHT,\ufdd0'SUBSCRIPT,\ufdd0'SUPERSCRIPT,\ufdd0'STRIKE_THROUGH,\ufdd0'REMOVE_FORMAT".split(","))));
  new goog.ui.editor.ToolbarController(c, new goog.ui.editor.DefaultToolbar.makeToolbar(d.array, new goog.dom.getElement(b)));
  cljs.core.apply.call(null, function(a) {
    return c.registerPlugin(new (goog.editor.plugins[cljs.core.name.call(null, a)]))
  }, cljs.core.Vector.fromArray("\ufdd0'BasicTextFormatter,\ufdd0'RemoveFormatting,\ufdd0'UndoRedo,\ufdd0'ListTabHandler,\ufdd0'SpacesTabHandler,\ufdd0'EnterHandler,\ufdd0'HeaderFormatter,\ufdd0'LinkDialogPlugin,\ufdd0'LinkBubble".split(",")));
  return c.makeEditable()
};
goog.exportSymbol("editor.buildeditor", editor.buildeditor);

