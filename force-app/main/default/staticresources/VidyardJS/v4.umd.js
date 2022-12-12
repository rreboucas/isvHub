(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vidyardEmbed"] = factory();
	else
		root["vidyardEmbed"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                    var matches = line.match(functionNameRegex);
                    var functionName = matches && matches[1] ? matches[1] : undefined;
                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Shylog = (function () {
    function Shylog(_a) {
        var _b = _a === void 0 ? { emit: false, logger: console.log } : _a, emit = _b.emit, logger = _b.logger;
        this.emit = emit;
        this.externalLogger = logger;
        this.buffer = [];
        this.customLevel = {};
        this.error = this.setLevel(1);
        this.warn = this.setLevel(2);
        this.info = this.setLevel(3);
        this.log = this.setLevel(4);
    }
    Shylog.prototype.getLogs = function (level) {
        if (typeof level === 'function') {
            return this.buffer.filter(function (log) { return log.level === level.level; });
        }
        else {
            return level ? this.buffer.filter(function (log) { return log.level === level; }) : this.buffer;
        }
    };
    Shylog.prototype.setLevel = function (level) {
        var _this = this;
        var logFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var message = { level: level, time: Date.now(), msg: args.join(' ') };
            _this.buffer.push(message);
            _this.emit && _this.externalLogger(message);
        };
        logFn.level = level;
        this.customLevel[level] = logFn;
        return logFn;
    };
    return Shylog;
}());
exports.default = Shylog;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Promise);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15).setImmediate))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/promise-polyfill/src/index.js
var src = __webpack_require__(4);

// CONCATENATED MODULE: ./src/utils/promise.ts

var isFn = function (fn) { return typeof fn === 'function'; };
var checkNativePromise = function (_a) {
    var Promise = (_a === void 0 ? window : _a).Promise;
    return Promise &&
        Promise.all &&
        Promise.race &&
        Promise.resolve &&
        Promise.reject &&
        isFn(Promise) &&
        isFn(Promise.all) &&
        isFn(Promise.race) &&
        isFn(Promise.resolve) &&
        isFn(Promise.reject);
};
var promiseFn = checkNativePromise() ? SecureWindow.Promise : src["a" /* default */];
/* harmony default export */ var promise = (promiseFn);

// CONCATENATED MODULE: ./src/utils/embed-helpers.ts
/*
* File contains the minimum amount of helper functions to allow embed to work in IE9+
* Has no access to jQuery / Underscore etc
*/

var addListener = function (eventName, oldIeEventName, handler, element) {
    if (element === void 0) { element = window; }
    if (SecureWindow.addEventListener) {
        element.addEventListener(eventName, handler, false);
    }
    else if (SecureWindow.attachEvent) {
        element.attachEvent(oldIeEventName, handler);
    }
    return { eventName: eventName, handler: handler, element: element };
};
var removeListener = function (eventName, handler, element) {
    if (element === void 0) { element = window; }
    if (element.removeEventListener) {
        element.removeEventListener(eventName, handler, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + eventName, handler);
    }
    else {
        element['on' + eventName] = null;
    }
};
var createEvent = function (eventName, payload) {
    if (typeof SecureWindow.CustomEvent === 'function') {
        return new SecureWindow.CustomEvent(eventName, { detail: payload });
    }
    else if (typeof Document.createEvent === 'function') {
        var legacyCustomEvent = Document.createEvent('CustomEvent');
        legacyCustomEvent.initCustomEvent(eventName, false, false, payload);
        return legacyCustomEvent;
    }
};
var isObjectEmpty = function (obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
};
var indexOfArray = function (item, arr) {
    if (arr.indexOf) {
        return arr.indexOf(item);
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return i;
        }
    }
    return -1;
};
var shallowMerge = function (a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
};
// TODO: change to getElementsByClass
var getElementByClass = function (className, tagName, topLevelNode) {
    if (tagName === void 0) { tagName = '*'; }
    if (topLevelNode === void 0) { topLevelNode = document; }
    if (typeof Document.getElementsByClassName === 'function') {
        return topLevelNode.getElementsByClassName(className);
    }
    var results = [];
    var re = new RegExp('(^| )' + className + '( |$)');
    var nodes = toArray(topLevelNode.getElementsByTagName(tagName));
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (re.test(node.className)) {
            results.push(node);
        }
    }
    return results;
};
var calcAspectRatio = function (imageEl, additionalWidth) {
    if (additionalWidth === void 0) { additionalWidth = 0; }
    var size = getNaturalDimensions(imageEl);
    // fallback to landscape aspect ratio if the image does not have proper size
    return size.height !== 0 || size.width !== 0
        ? ((size.height / (size.width + additionalWidth)) * 100).toFixed(2)
        : ((9 / 16) * 100).toFixed(2); // landscape 16:9 aspect ratio, equals to 56.25%
};
var embed_helpers_log = function (message, logType) {
    if (logType === void 0) { logType = 'log'; }
    if (SecureWindow.console && typeof SecureWindow.console[logType] === 'function') {
        console[logType](message);
    }
};
var find = function (array, test) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        var res = test(item);
        if (res === true) {
            return item;
        }
    }
};
var includes = function (array, itemToCheck) { return find(array, function (item) { return item === itemToCheck; }); };
var once = function (callback) {
    var expired = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (expired) {
            return;
        }
        if (callback) {
            callback.apply(void 0, args);
        }
        expired = true;
    };
};
var spaceOrEnterKeyPressEvent = function (callback) { return function (e) {
    // spacebar or enter
    if (e.keyCode === 32 || e.keyCode === 13) {
        callback(e);
    }
}; };
var escKeyPressEvent = function (callback) { return function (e) {
    // esc
    if (e.keyCode === 27) {
        callback(e);
    }
}; };
var getCurrentScript = function () {
    // need to check for currentScript because it does not exist in IE
    return Document.currentScript
        ? Document.currentScript
        : find(toArray(Document.getElementsByTagName('script')), function (script) {
            return script.src &&
                (script.src.match('vidyard-embed-code.js') !== null ||
                    script.src.match(/v4(\.umd)?\.js/) !== null);
        });
};
var getNaturalDimensions = function (ele) {
    if (ele.naturalWidth) {
        return { width: ele.naturalWidth, height: ele.naturalHeight };
    }
    var img = new Image();
    img.src = ele.src;
    return { width: img.width, height: img.height };
};
var isArray = function (arg) { return Object.prototype.toString.call(arg) === '[object Array]'; };
var toArray = function (htmlCollection) { return Array.prototype.slice.call(htmlCollection); };
var checkJSONParse = function (jsonString) {
    return new promise(function (res, rej) {
        try {
            res(JSON.parse(jsonString));
        }
        catch (err) {
            rej(err);
        }
    });
};
var xhrRequest = function (_a) {
    var endpoint = _a.endpoint, _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.method, method = _c === void 0 ? 'GET' : _c;
    return new promise(function (res, rej) {
        // IE 8/9 needs to send CORS requests over XDomainRequest
        var isXDomain = new XMLHttpRequest().withCredentials === undefined && XDomainRequest;
        var xhr = isXDomain ? new XDomainRequest() : new XMLHttpRequest();
        xhr.open(method, endpoint);
        if (xhr instanceof XMLHttpRequest) {
            xhr.setRequestHeader('Content-Type', 'text/plain');
        }
        xhr.onerror = function (e) { return rej(e); };
        xhr.onload = function () {
            if (xhr instanceof XMLHttpRequest) {
                if (Math.floor(xhr.status / 100) === 2) {
                    // 200 range
                    res(xhr.responseText);
                }
                else {
                    rej();
                }
            }
            else {
                // XDomainRequest does not have status
                res(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(payload));
    });
};
var getFullscreenAPI = function () {
    var apiMap = [
        // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
        ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenchange'],
        // WebKit
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitfullscreenchange',
        ],
        // Mozilla
        ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozfullscreenchange'],
        // Microsoft
        ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'MSFullscreenChange'],
    ];
    var browserAPI = [];
    var fullscreenAPI = {};
    for (var _i = 0, apiMap_1 = apiMap; _i < apiMap_1.length; _i++) {
        var browserMethods = apiMap_1[_i];
        // check for exitFullscreen function
        if (browserMethods[1] in document) {
            browserAPI = browserMethods;
            break;
        }
    }
    // map the browser API names to the spec API names
    if (browserAPI && browserAPI.length) {
        for (var i = 0; i < browserAPI.length; i++) {
            fullscreenAPI[apiMap[0][i]] = browserAPI[i];
        }
        return fullscreenAPI;
    }
    else {
        return null;
    }
};
var dataSet = function (el) {
    var collection = {};
    var parseAttributeName = function (attr) { return attr.name.replace('data-', ''); };
    // can't do for-of here as el.attributes is not an array
    // tslint:disable-next-line
    for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') < 0) {
            continue;
        }
        collection[parseAttributeName(attr)] = attr.value;
    }
    return collection;
};
var getQueryParam = function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regexString = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexString);
    var results = regex.exec(SecureWindow.location.search);
    if (results !== null) {
        return results[1];
    }
};
var parseNestedData = function (encodedData, type) {
    try {
        var nestedData_1 = JSON.parse(decodeURIComponent(encodedData));
        return Object.keys(nestedData_1).reduce(function (acc, key) {
            acc[type + "[" + key + "]"] = nestedData_1[key];
            return acc;
        }, {});
    }
    catch (e) {
        embed_helpers_log("Invalid " + type + " payload", 'warn');
        return {};
    }
};
var parseVyData = function (data) {
    return Object.keys(data).reduce(function (acc, key) {
        if (key === 'vydata') {
            var parsedData_1 = parseNestedData(data[key], 'vydata');
            Object.keys(parsedData_1).forEach(function (parsedKey) {
                acc[parsedKey] = parsedData_1[parsedKey];
            });
        }
        else {
            acc[key] = data[key];
        }
        return acc;
    }, {});
};
// https://stackoverflow.com/questions/6787383/how-to-add-remove-a-class-in-javascript
var toggleClass = function (element, classToToggle, forceBoolean) {
    var hasClass = function (ele, targetClass) {
        return ele.className.indexOf(targetClass) !== -1;
    };
    var addClass = function (ele, targetClass) {
        if (!hasClass(ele, targetClass)) {
            ele.className = ele.className.trim() + " " + targetClass;
        }
    };
    var removeClass = function (ele, targetClass) {
        if (hasClass(ele, targetClass)) {
            ele.className = ele.className.replace(targetClass, ' ').trim();
        }
    };
    if (forceBoolean === true) {
        addClass(element, classToToggle);
    }
    else if (forceBoolean === false) {
        removeClass(element, classToToggle);
    }
    else if (hasClass(element, classToToggle)) {
        removeClass(element, classToToggle);
    }
    else {
        addClass(element, classToToggle);
    }
};

// CONCATENATED MODULE: ./src/utils/constants.ts
var VERSION = "4.2.29";
var ERROR_ORIGIN_RE = /vidyard\.com\/embed\/v4/;
var INTEGRATIONS_URL = '/integrations.js';
var OVERLAY_FADE_TIME = 0.5;
var PLAYLIST_WIDTH = 319;
var SEO_DETAILS_URL = '/details.js';
var STYLE_PATH = '/style.js';

// CONCATENATED MODULE: ./src/utils/config.ts

var dynamicPlaybackURL = (function playbackURL() {
    var playbackURLOverride;
    return {
        setPlaybackURL: function (url) {
            playbackURLOverride = url;
            return playbackURLOverride;
        },
        getPlaybackURL: function () {
            // override the `PLAYBACK_URL` if data-playbackurl exists on the script tag
            var currentScript = getCurrentScript();
            var stagingPlaybackUrl = currentScript
                ? currentScript.getAttribute('data-playbackurl')
                : null;
            return (playbackURLOverride ||
                SecureWindow.VIDYARD_PLAYBACK_URL ||
                stagingPlaybackUrl ||
                'play.vidyard.com');
        },
    };
})();

var setPlaybackURL = dynamicPlaybackURL.setPlaybackURL;
var getPlaybackURL = dynamicPlaybackURL.getPlaybackURL;
var getBaseURL = function () { return "https://" + getPlaybackURL() + "/v4/"; };
var getErrorURL = function () { return "https://" + getPlaybackURL() + "/v4/error"; };

// CONCATENATED MODULE: ./src/utils/frame-messenger.ts
/*
* Provides an ie7 compatable way of sending messages to iframes
* If in a modern browser, will just use postmessage
*/

// --- Public Functions ---
var send = function (message, targetOrigin, target) {
    if (!targetOrigin || !target) {
        return;
    }
    if (SecureWindow.postMessage && target.contentWindow) {
        // The browser supports SecureWindow.postMessage, so call it with a targetOrigin
        // set appropriately, based on the target_url parameter.
        target.contentSecureWindow.postMessage(JSON.stringify(message), targetOrigin);
    }
    else {
        // If the window does not support postmessaging, only 'associateVisitor' events are supported
        // Internally the player will have specific handling for these cases
        if (message.event !== 'associateVisitor') {
            return;
        }
        var stringMessage = message.event + "," + message.data.type + "," + message.data.value + "|";
        var targetSrc = target.src;
        if (targetSrc.indexOf('#') === -1) {
            targetSrc += '#';
        }
        // The browser does not support SecureWindow.postMessage, so set the location
        // of the target to target_url#message. A bit ugly, but it works!
        targetSrc += stringMessage;
        target.src = targetSrc;
    }
};
var receive = function (callback) { return function (postMessage) {
    var data = parse(postMessage);
    if (!data) {
        return;
    }
    callback(data);
}; };
// --- Private Functions ---
function parse(event) {
    if (typeof event.data !== 'string' || event.data === '') {
        return;
    }
    try {
        var data = JSON.parse(event.data);
        var iframe = getElementByClass('vidyard-iframe-' + data.uuid, 'iframe')[0];
        // event validation
        var contentWindow = iframe ? iframe.contentWindow : null;
        var sameSource = contentWindow === event.source;
        var validEvent = typeof data.event === 'string';
        if (!sameSource || !validEvent) {
            return;
        }
        return data;
    }
    catch (e) {
        embed_helpers_log('Invalid postMessage received', 'warn');
        return;
    }
}

// CONCATENATED MODULE: ./src/models/integrations-watcher.ts



// All possible cookie names we would look for, the message names are different from the cookie keys
var cookieNames = [
    'pardot',
    'hubspotutk',
    '_mkto_trk',
    'vy_dreamforce',
    'eloqua',
];
var messageNames = [
    'pardot',
    'hubspot',
    'marketo',
    'dreamforce',
    'eloqua',
];
function IntegrationsWatcher() {
    var _this = this;
    var cookieCheckInterval = null;
    var loadedEloquaScript = false;
    var organizations = {};
    // --- Public Functions ---
    this.updatePlayer = function (player) {
        // Don't continue if we don't have an iframe and integration information
        if (!player._tmpOrg || !player.iframe) {
            return;
        }
        var orgId = player._tmpOrg.orgId;
        if (!organizations[orgId]) {
            organizations[orgId] = {
                foundIntegrations: {},
                id: orgId,
                // All integrations supported by this organization
                integrations: player._tmpOrg,
                // Store of cookie data found keyed by integration name
                // Each integration has an externalIdentifier set with the tracking cookie/uuid if found
                // as well as an object with which players have been sent the associateVisitor event
                // e.g. {integration: {externalIdentifier: 'cookie_value', sentPlayers: ['player1.uuid']}}
                // In DOM players associated with this organization
                players: [],
            };
        }
        player.org = organizations[orgId];
        // Check if this player has already been added to the organizations list
        // if so, do nothing
        for (var _i = 0, _a = organizations[orgId].players; _i < _a.length; _i++) {
            var currentPlayer = _a[_i];
            if (currentPlayer.iframe === player.iframe) {
                return;
            }
        }
        organizations[orgId].players.push(player);
        var _b = player.org.integrations, eloqua = _b.eloqua, eloquaFirstPartyDomain = _b.eloquaFirstPartyDomain;
        if (eloqua) { // Only load the eloqua script if the player needs it
            // Only load the tracking script if the user has given GDPR consent
            if (player.status !== null && player.status.consent) {
                // Note: This function only does something the first time it is called
                loadEloquaTrackingScript(eloqua, eloquaFirstPartyDomain);
            }
            else {
                player.on('status', function handleStatus() {
                    if (player.status.consent) {
                        loadEloquaTrackingScript(eloqua, eloquaFirstPartyDomain);
                        player.off('status', handleStatus);
                    }
                });
            }
        }
        // Loop over all integrations setup with this org & communicate them to the player
        // making sure to only send the event once per player & integration
        checkForIntegrations();
    };
    // Use function chaining to ensure a Player is only messaged about an integration once
    // It is expected that `updatePlayer` is called on a player before this
    this.safelyCommunicateIntegration = function (player, integration, externalIdentifier) {
        if (player.org !== undefined &&
            externalIdentifier !== undefined &&
            externalIdentifier !== null &&
            !haveSentIntegrationToPlayer(player, integration) &&
            communicateIntegration(player, integration, externalIdentifier)) {
            player.org = setIntegrationSent(player.org, integration, player.uuid);
        }
    };
    this.addKnownVisitor = function (integrationName, visitorData, org) {
        if (!org) {
            return;
        }
        // Go through and message all active players
        for (var _i = 0, _a = org.players; _i < _a.length; _i++) {
            var player = _a[_i];
            communicateKnownVisitor(player, integrationName, visitorData);
        }
    };
    // @TODO: switch the return type form any to unknown once we upgrade TS
    // Loop through all available cookies and return the value for cookieName if found
    this.getCookie = function (integration, organization) {
        var cookies = Document.cookie.split(';');
        if (integration === 'eloqua' && typeof SecureWindow.GetElqCustomerGUID === 'function') {
            // GetElqCustomerGUID is put on the DOM by Eloqua tracking scripts
            return SecureWindow.GetElqCustomerGUID();
        }
        var cookieName = alterDynamicCookieName(cookieNames[messageNames.indexOf(integration)], organization);
        // Loop through all cookies looking for supplied cookie name
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var currentCookie = cookies_1[_i];
            var equalIndex = currentCookie.indexOf('=');
            var foundName = currentCookie.substr(0, equalIndex).replace(/^\s+|\s+$/g, '');
            var foundId = currentCookie.substr(equalIndex + 1);
            if (foundName === cookieName) {
                return decodeURIComponent(foundId);
            }
        }
    };
    // --- Private Functions ---
    // Return true if the integration cookie event has already been sent to this Player
    var haveSentIntegrationToPlayer = function (player, integration) {
        return (player.org &&
            player.org.foundIntegrations &&
            player.org.foundIntegrations[integration] &&
            player.org.foundIntegrations[integration].sentPlayers &&
            indexOfArray(player.uuid, player.org.foundIntegrations[integration].sentPlayers) !== -1);
    };
    // Initialize object to track integration cookies and
    // players which have been sent the cookie already
    var setupFoundIntegration = function (org, integration) {
        if (!org.foundIntegrations[integration]) {
            org.foundIntegrations[integration] = {
                externalIdentifier: null,
                sentPlayers: [],
            };
        }
        return org;
    };
    var setIntegrationSent = function (org, integration, playerUuid) {
        org = setupFoundIntegration(org, integration);
        org.foundIntegrations[integration].sentPlayers.push(playerUuid);
        return org;
    };
    var setIntegrationIdentifier = function (org, integration, externalIdentifier) {
        org = setupFoundIntegration(org, integration);
        org.foundIntegrations[integration].externalIdentifier = externalIdentifier;
        return org;
    };
    // Send event to Player with integration external identifier
    var communicateIntegration = function (player, integration, externalIdentifier) {
        if (!player.ready()) {
            return false;
        }
        // Player iframe already exists, message it about the integration
        var message = {
            data: { type: integration, value: externalIdentifier },
            event: 'associateVisitor',
            uuid: player.uuid,
        };
        embed_helpers_log('IntegrationsWatcher.communicateIntegration ' + message, 'debug');
        send(message, "https://" + getPlaybackURL(), player.iframe);
        return true;
    };
    // Go through and message all active players on DOM which haven't already been sent
    var messagePlayersFoundIntegration = function (players, integration, externalIdentifier) {
        if (players === undefined || externalIdentifier === undefined || externalIdentifier === null) {
            return;
        }
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            _this.safelyCommunicateIntegration(player, integration, externalIdentifier);
        }
    };
    var sendKnownVisitor = function (player, leadType, leadData) {
        var message = {
            data: { type: leadType, value: leadData },
            event: 'identifyVisitor',
            uuid: player.uuid,
        };
        send(message, "https://" + getPlaybackURL(), player.iframe);
    };
    var communicateKnownVisitor = function (player, leadType, leadData) {
        if (!player.ready()) {
            // Setup callback if Player not ready yet
            player.on('ready', function () {
                sendKnownVisitor(player, leadType, leadData);
            });
        }
        else {
            // Player iframe already exists, message it about the lead
            sendKnownVisitor(player, leadType, leadData);
        }
    };
    // Find any integration trackers on the page and send to each player that hasn't received yet
    var checkForIntegrations = function () {
        // Go through all possible integration
        for (var _i = 0, messageNames_1 = messageNames; _i < messageNames_1.length; _i++) {
            var integration = messageNames_1[_i];
            // Loop through all orgs and see if they care about this integration
            for (var orgKey in organizations) {
                if (organizations.hasOwnProperty(orgKey)) {
                    var currentOrganization = organizations[orgKey];
                    // Do nothing if the org doesn't have this integration
                    if (!currentOrganization.integrations[integration]) {
                        continue;
                    }
                    // Check if integration tracker is present on the page
                    var cookieValue = _this.getCookie(integration, currentOrganization);
                    if (!cookieValue) {
                        continue;
                    }
                    cookieValue = parseCookieValue(integration, cookieValue, currentOrganization);
                    // parseCookieValue can return null if Marketo cookie doesn't match Munchkin ID
                    if (!cookieValue) {
                        continue;
                    }
                    currentOrganization = setIntegrationIdentifier(currentOrganization, integration, cookieValue);
                    messagePlayersFoundIntegration(currentOrganization.players, integration, cookieValue);
                }
            }
        }
    };
    // Pardot uses a dynamic cookie name, set it up here
    var alterDynamicCookieName = function (cookieName, organization) {
        if (cookieName === 'pardot' && organization && organization.integrations.pardot) {
            return 'visitor_id' + organization.integrations.pardot;
        }
        return cookieName;
    };
    var parseCookieValue = function (msgName, cookieValue, org) {
        if (msgName === 'marketo') {
            // Make sure this cookie is actually for this players organization
            if (!org.integrations.marketo ||
                cookieValue.toLowerCase().indexOf(org.integrations.marketo.toLowerCase()) === -1) {
                return null;
            }
            cookieValue = encodeURIComponent(cookieValue);
        }
        return cookieValue;
    };
    var loadEloquaTrackingScript = function (siteId, firstPartyDomain) {
        if (loadedEloquaScript) {
            return;
        }
        loadedEloquaScript = true;
        var createEloquaScriptNode = function () {
            // Only set up Eloqua tracking script once (including v3 & hubs)
            if (Document.getElementById('vidyard-eloqua-include')) {
                return;
            }
            SecureWindow._elqQ = SecureWindow._elqQ || [];
            SecureWindow._elqQ.push(['elqSetSiteId', siteId]);
            if (firstPartyDomain) {
                SecureWindow._elqQ.push(['elqUseFirstPartyCookie', firstPartyDomain]);
            }
            SecureWindow._elqQ.push(['elqTrackPageView']);
            SecureWindow._elqQ.push(['elqGetCustomerGUID']);
            var eloquaScript = Document.createElement('script');
            eloquaScript.id = 'vidyard-eloqua-include';
            eloquaScript.type = 'text/javascript';
            eloquaScript.async = true;
            eloquaScript.src = 'https://img.en25.com/i/elqCfg.min.js';
            var firstScript = Document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(eloquaScript, firstScript);
        };
        if (Document.readyState === 'complete') {
            createEloquaScriptNode();
        }
        else {
            addListener('DOMContentLoaded', 'onload', createEloquaScriptNode);
        }
    };
    cookieCheckInterval = setInterval(function () {
        // We check for new cookies every second in case the player is on a page with
        // tracking scripts that will be dynamically adding new cookies at some point
        checkForIntegrations();
    }, 1000);
}

// CONCATENATED MODULE: ./src/api/dispatch-ready.ts

// Allows the client to listen for the Vidyard API to become available
// Example:
// SecureWindow.VidyardV4
//   ? initApp(SecureWindow.VidyardV4)
//   : (SecureWindow.onVidyardAPI = (vyApi) => initApp(vyApi));
//
// Or with promises:
// new Promise(res => SecureWindow.VidyardV4
//   ? res(SecureWindow.VidyardV4)
//   : (window['onVidyardAPI'] = (vyApi) => res(vyApi))
// ).then((vyApi) => {
//   console.log('api is ready ', vyApi);
// });
var readyCallback = function () {
    if (SecureWindow.onVidyardAPI && typeof SecureWindow.onVidyardAPI === 'function') {
        SecureWindow.onVidyardAPI(SecureWindow.VidyardV4);
    }
};
// We also dispatch a custom event on document indicating that the API is ready
// Example:
// SecureWindow.VidyardV4
//   ? initApp(SecureWindow.VidyardV4)
//   : Document.addEventListener('onVidyardAPI', ({ detail: vyApi }) => initApp(vyApi));
var readyEvent = function () {
    Document.dispatchEvent(createEvent('onVidyardAPI', SecureWindow.VidyardV4));
};
var dispatchReady = once(function () {
    readyCallback();
    readyEvent();
});
/* harmony default export */ var dispatch_ready = (dispatchReady);

// EXTERNAL MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/shylog/build/index.js
var build = __webpack_require__(2);
var build_default = /*#__PURE__*/__webpack_require__.n(build);

// CONCATENATED MODULE: ./src/api/debug.ts



var logger = new build_default.a({
    emit: !!SecureWindow.location.search.match('vydebug=1'),
    logger: function (message) { return embed_helpers_log(message, 'info'); },
});
var debug_currentScript = getCurrentScript();
if (debug_currentScript) {
    logger.info("vidyardEmbed V" + VERSION + " loaded from " + debug_currentScript.src);
    logger.info("data-playbackurl=" + debug_currentScript.getAttribute('data-playbackurl'));
}
logger.info("userAgent " + SecureWindow.navigator.userAgent);
logger.info("cookies " + navigator.cookieEnabled);
if (SecureWindow.performance && SecureWindow.performance.timing && SecureWindow.performance.timing.navigationStart) {
    logger.info("Script load time " + (Date.now() - SecureWindow.performance.timing.navigationStart));
}
var debug = { logger: logger, getPlaybackURL: getPlaybackURL, setPlaybackURL: setPlaybackURL, version: VERSION };
/* harmony default export */ var api_debug = (debug);

// CONCATENATED MODULE: ./src/api/add-ready-listener.ts

// cb: callback when a player is ready, uuid: optional filter to only listen for individual player uuids
function addReadyListener(cb, uuid) {
    var playerReadyListeners = SecureWindow.VidyardV4.playerReadyListeners;
    // Store all callbacks for any yet to be created players
    playerReadyListeners[uuid] = playerReadyListeners[uuid] || [];
    playerReadyListeners[uuid].push(cb);
    // Add ready listeners to all currently available players
    for (var _i = 0, _a = SecureWindow.VidyardV4.players; _i < _a.length; _i++) {
        var currentPlayer = _a[_i];
        // Is this the correct player OR are they setting up listeners for every player
        if (uuid !== undefined && currentPlayer.uuid !== uuid) {
            continue;
        }
        currentPlayer.on('ready', cb);
    }
}
function processReadyListeners(player) {
    var playerReadyListeners = SecureWindow.VidyardV4.playerReadyListeners;
    var uuid = player.uuid;
    var log = logger.setLevel(player.uuid);
    // Ensure the cb set for this uuid is defined
    playerReadyListeners[uuid] = playerReadyListeners[uuid] || [];
    // Get the total set of callbacks for this uuid && all uuids
    var callbacks = playerReadyListeners[uuid].concat(playerReadyListeners[undefined]);
    // Loop through all cbs and add them to the players listeners
    Object.keys(callbacks).forEach(function (k) {
        var callback = callbacks[k];
        player.on('ready', callback);
        log("attaching ready callbacks");
    });
}

// CONCATENATED MODULE: ./src/models/markup-injector.ts
/*
* Injection of the base html / CSS for the player iframe
* Does not handle showing/hiding lightboxes, see LightboxHelper for that madness
*/

var allowFeaturePolicy = function () {
    var features = [
        'autoplay',
        'fullscreen',
        'picture-in-picture',
        'camera',
        'microphone',
        'display-capture',
    ];
    return features.join('; ');
};
var createIframe = function (dataParams, sizing) {
    // We only want to limit the max-height and max-width for inline embeds
    // Can't apply this directly to the iframe element because it affects fullscreen in IE11
    var maxSizeDiv = function (children) { return (dataParams.type === 'inline' ? ('<div ' +
        'class="vidyard-inner-container-' + dataParams.uuid + '" ' +
        'style="' +
        'position: absolute;' +
        'height: 100%; ' +
        'width: 100%; ' +
        (sizing.maxWidth ? 'max-width: ' + sizing.maxWidth + 'px; ' : '') +
        (sizing.maxHeight ? 'max-height: ' + sizing.maxHeight + 'px; ' : '') +
        '"' +
        '> ' +
        children +
        '</div> ') : children); };
    return ('<div ' +
        'class="vidyard-div-' + dataParams.uuid + '" ' +
        'role="none" ' +
        'aria-label="Vidyard media player" ' +
        'style="' +
        // This would change to relative once the iframe is loaded
        'position: absolute; ' +
        'padding-bottom: ' + sizing.ratio + '%; ' +
        'height: 0; ' +
        'overflow: hidden; ' +
        'max-width: 100%; ' +
        '"' +
        '>' +
        maxSizeDiv('<iframe ' +
            'allow="' + allowFeaturePolicy() + '"' +
            'allowfullscreen ' +
            'allowtransparency="true" ' +
            'referrerpolicy="no-referrer-when-downgrade" ' +
            'aria-label="Vidyard video player" ' +
            'class="vidyard-iframe-' + dataParams.uuid + '" ' +
            'frameborder=0 ' +
            'height="100%" ' +
            'width="100%" ' +
            'scrolling=no ' +
            'src="https://' + getPlaybackURL() + '/' + dataParams.uuid + dataParams.toQueryString() + '" ' +
            'title="Vidyard video player" ' +
            'style="' +
            'opacity: 0; ' +
            'background-color: transparent; ' +
            'position: absolute; ' +
            'top: 0; ' +
            'left: 0;' +
            '"' +
            '>' +
            '</iframe>') +
        '</div>');
};
// @TODO: better data type
var createJsonLD = function (data) {
    var playerDetailsScriptTag = Document.createElement('script');
    playerDetailsScriptTag.type = 'application/ld+json';
    playerDetailsScriptTag.text = JSON.stringify(data);
    return playerDetailsScriptTag;
};

// CONCATENATED MODULE: ./src/utils/jsonp.ts
/*
* Provides functions which perform JSONP requests to the server.
* All URLs etc are stored within this file.
*/



var getStyle = function (uuid) {
    return new promise(function (res, rej) {
        return request({
            error: rej,
            success: res,
            url: "" + getBaseURL() + uuid + STYLE_PATH,
            uuid: "style_" + uuid,
        });
    });
};
var getIntegrations = function (uuid) {
    return new promise(function (res, rej) {
        return request({
            error: rej,
            success: res,
            url: "" + getBaseURL() + uuid + INTEGRATIONS_URL,
            uuid: "integrations_" + uuid,
        });
    });
};
var getSEO = function (uuid) {
    return new promise(function (res, rej) {
        return request({
            error: rej,
            success: res,
            url: "" + getBaseURL() + uuid + SEO_DETAILS_URL,
            uuid: "details_" + uuid,
        });
    });
};
var getMarketoLead = function (uuid, marketoCookie) {
    return new promise(function (res, rej) {
        var cookie = encodeURIComponent(marketoCookie);
        var contactUrl = "" + getBaseURL() + uuid + "/contact/" + cookie + "/marketoContact.js";
        request({
            error: rej,
            success: res,
            url: contactUrl,
            uuid: "marketoContact_" + uuid,
        });
    });
};
var createJSONPTag = function (_a) {
    var error = _a.error, url = _a.url, requestUuid = _a.requestUuid;
    var script = Document.createElement('script');
    script.type = 'application/javascript';
    script.onerror = error;
    script.src = url + "?callback=SecureWindow.VidyardV4.jsonp." + requestUuid + ".done";
    // Anticipating a potential error when getPlaybackURL() is called when the JSONP script is current:
    // Setting data-playbackurl here makes it safe to use getPlaybackURL during all stages of load.
    script.setAttribute('data-playbackurl', getPlaybackURL());
    Document.body.appendChild(script);
    return script;
};
// track all jsonp requests
var jsonpRequests = {};
var request = function (_a) {
    var url = _a.url, uuid = _a.uuid, success = _a.success, error = _a.error;
    // Function names can't include "-" because it's interpreted as a subtract operator
    // Strip them out here and in the player backend to prevent errors
    var requestUuid = uuid.replace(/-/g, '');
    var script = createJSONPTag({ error: error, url: url, requestUuid: requestUuid });
    // each response callback will only be called once
    var onRes = once(function (data) {
        success(data);
        script.parentNode.removeChild(script);
    });
    // store all jsonp requests in a closure
    jsonpRequests[requestUuid] = jsonpRequests[requestUuid] || [];
    jsonpRequests[requestUuid].push(onRes);
    SecureWindow.VidyardV4.jsonp[requestUuid] = {
        done: function (data) {
            // call data on all response callbacks that share the same request_uuid
            jsonpRequests[requestUuid].forEach(function (cb) { return cb(data); });
        },
    };
};

// CONCATENATED MODULE: ./src/utils/messages.ts
/* harmony default export */ var messages = ({
    errors: {
        placeholder: 'Cannot render the player, check the placeholder Image',
    }
});

// CONCATENATED MODULE: ./src/models/placeholder.ts
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};





var loadPlaceholder = function (img) {
    if (!img) {
        return promise.reject(new Error(messages.errors.placeholder));
    }
    var _a = getNaturalDimensions(img), width = _a.width, height = _a.height;
    var uuid = img.getAttribute('data-uuid');
    // reject images without source or uuid
    if (img.src === '' || !uuid) {
        return promise.reject(new Error(messages.errors.placeholder));
    }
    // reject images that are loaded and have no size
    if (img.complete && (width === 0 || height === 0)) {
        return promise.reject(new Error(messages.errors.placeholder));
    }
    if (img.complete) {
        // image is already loaded
        return promise.resolve(img);
    }
    else {
        // load the image
        return new promise(function (res, rej) {
            img.onload = function () { return res(img); };
            img.onerror = function () { return rej(img); };
        });
    }
};
var createPlaceholder = function (_a) {
    if (_a === void 0) { _a = {}; }
    var uuid = _a.uuid, container = _a.container, _b = _a.type, type = _b === void 0 ? 'inline' : _b, _c = _a.aspect, aspect = _c === void 0 ? 'landscape' : _c, other = __rest(_a, ["uuid", "container", "type", "aspect"]);
    if (!uuid || !container) {
        return;
    }
    logger.setLevel('placeholder')('creating placeholder image');
    var image = Document.createElement('img');
    var width = other.width ? other.width + "px" : '100%';
    var height = other.height ? other.height + "px" : '100%';
    var style = "\n    display: block;\n    margin: 0 auto;\n    max-height: " + height + ";\n    max-width: " + width + ";\n    opacity: 0;\n  ";
    image.src = "//" + getPlaybackURL() + "/" + uuid + ".jpg";
    image.className = 'vidyard-player-embed';
    image.setAttribute('style', style);
    image.setAttribute('data-uuid', uuid);
    image.setAttribute('data-type', type);
    // assign all of the other keys as data params on the image
    Object.keys(other).forEach(function (k) { return image.setAttribute("data-" + k, other[k]); });
    return container.appendChild(image);
};
var loadServerThumbnail = function (uuid) {
    var image = Document.createElement('img');
    image.setAttribute('data-uuid', uuid);
    image.src = "//" + getPlaybackURL() + "/" + uuid + ".jpg";
    return loadPlaceholder(image);
};

// CONCATENATED MODULE: ./src/controllers/inline-player.ts







var injectInlineElements = function (_a) {
    var dataParams = _a.dataParams, player = _a.player;
    var log = logger.setLevel(dataParams.uuid);
    log("injecting inline embed");
    var updateAspectRatio = function () {
        // Get thumbnail from server and calculate aspect ratio if the placeholder is different (edge case)
        if (player.placeholder.src !== "//" + getPlaybackURL() + "/" + player.uuid + ".jpg") {
            return loadServerThumbnail(player.uuid)
                .then(calcAspectRatio)
                .catch(function () { return false; });
        }
        return promise.resolve(false);
    };
    var sizing = {
        maxHeight: dataParams.height ? parseInt(dataParams.height, 10).toString() : null,
        maxWidth: dataParams.width ? parseInt(dataParams.width, 10).toString() : null,
        ratio: calcAspectRatio(player.placeholder),
    };
    // Create and attach the players iframe & containing <div>
    player.container.innerHTML = createIframe(dataParams, sizing);
    var iframe = player.container.getElementsByTagName('iframe')[0];
    player.iframe = iframe;
    var iframeLoadedPromise = new promise(function (res) {
        addListener('load', 'onload', res, iframe);
    });
    var playerReadyPromise = new promise(function (res) {
        player.on('ready', res);
    });
    player.on('sidePlaylistOpen', function () {
        handleResize();
    });
    // The iframe will finish first, usually.
    promise.race([iframeLoadedPromise, playerReadyPromise]).then(function () {
        log("player or iFrame is ready");
        // If the placeholder image is different than the server thumbnail, update the aspect ratio
        // to be consistent with the server thumbnail (edge case)
        updateAspectRatio().then(function (newAspectRatio) {
            if (newAspectRatio) {
                iframe.parentElement.parentElement.style.paddingBottom = newAspectRatio + "%";
            }
        });
        var innerContainer = Document.getElementsByClassName('vidyard-inner-container-' + player.uuid)[0];
        // Copy the place holder image to the iframe's parent element
        player.placeholder.parentElement.removeChild(player.placeholder);
        toggleClass(player.placeholder, 'inserted', true);
        innerContainer.appendChild(player.placeholder);
        // This inserts the iframe into the document flow
        iframe.parentElement.parentElement.style.position = 'relative';
        // Be sure that the iframe is fully visible
        iframe.style.opacity = '1';
    });
    iframeLoadedPromise.then(function () {
        // Hide the placeholder image only after the iframe has loaded
        player.placeholder.style.display = 'none';
        iframe.parentElement.parentElement.style.backgroundColor = 'transparent';
    });
    function handleResize() {
        // The breakpoint is the side playlist width, doubled. If the available space is less, we need to hide the side playlist.
        var aboveBreakpoint = player.container.clientWidth >= PLAYLIST_WIDTH * 2;
        toggleClass(player.container, 'playlist-open', aboveBreakpoint);
    }
    log("getStyle sent");
    getStyle(player.uuid).then(
    // pl is the "playlist always open" setting from the Dashboard.
    function (data) {
        log("getStyle received: " + JSON.stringify(data));
        var playlistAlwaysOpen = (data.pl === 1 && dataParams.playlist_always_open !== '0') ||
            dataParams.playlist_always_open === '1';
        if (playlistAlwaysOpen) {
            player.iframe.parentElement.setAttribute('data-pl', 'true');
            addListener('resize', 'onresize', handleResize);
            handleResize();
        }
        else {
            player.iframe.parentElement.setAttribute('data-pl', 'false');
        }
    });
};
/* harmony default export */ var inline_player = (injectInlineElements);

// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/array.js
var array_toArray = function toArray(a) {
  var ret = Array(a.length);
  for (var i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};

var arrayFind = function arrayFind(array, search) {
  return array.filter(function (a) {
    return a === search;
  })[0];
};

var asArray = function asArray(a) {
  return Array.isArray(a) ? a : [a];
};
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/constants.js
var FOCUS_GROUP = 'data-focus-lock';
var FOCUS_DISABLED = 'data-focus-lock-disabled';
var FOCUS_ALLOW = 'data-no-focus-lock';
var FOCUS_AUTO = 'data-autofocus-inside';
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/focusIsHidden.js



var focusIsHidden_focusIsHidden = function focusIsHidden() {
  return document && array_toArray(this.template.querySelectorAll('[' + FOCUS_ALLOW + ']')).some(function (node) {
    return node.contains(Document.activeElement);
  });
};

/* harmony default export */ var es2015_focusIsHidden = (focusIsHidden_focusIsHidden);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/all-affected.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




var filterNested = function filterNested(nodes) {
  var l = nodes.length;
  for (var i = 0; i < l; i += 1) {
    var _loop = function _loop(j) {
      if (i !== j) {
        if (nodes[i].contains(nodes[j])) {
          return {
            v: filterNested(nodes.filter(function (x) {
              return x !== nodes[j];
            }))
          };
        }
      }
    };

    for (var j = 0; j < l; j += 1) {
      var _ret = _loop(j);

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }
  return nodes;
};

var getTopParent = function getTopParent(node) {
  return node.parentNode ? getTopParent(node.parentNode) : node;
};

var all_affected_getAllAffectedNodes = function getAllAffectedNodes(node) {
  var nodes = asArray(node);
  return nodes.filter(Boolean).reduce(function (acc, currentNode) {
    var group = currentNode.getAttribute(FOCUS_GROUP);
    acc.push.apply(acc, group ? filterNested(array_toArray(getTopParent(currentNode).querySelectorAll('[' + FOCUS_GROUP + '="' + group + '"]:not([' + FOCUS_DISABLED + '="disabled"])'))) : [currentNode]);
    return acc;
  }, []);
};

/* harmony default export */ var all_affected = (all_affected_getAllAffectedNodes);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/focusInside.js



var focusInFrame = function focusInFrame(frame) {
  return frame === Document.activeElement;
};

var focusInside_focusInsideIframe = function focusInsideIframe(topNode) {
  return !!arrayFind(array_toArray(topNode.querySelectorAll('iframe')), focusInFrame);
};

var focusInside_focusInside = function focusInside(topNode) {
  var activeElement = document && Document.activeElement;

  if (!activeElement || activeElement.dataset && activeElement.dataset.focusGuard) {
    return false;
  }
  return all_affected(topNode).reduce(function (result, node) {
    return result || node.contains(activeElement) || focusInside_focusInsideIframe(node);
  }, false);
};

/* harmony default export */ var es2015_focusInside = (focusInside_focusInside);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/tabOrder.js


var tabSort = function tabSort(a, b) {
  var tabDiff = a.tabIndex - b.tabIndex;
  var indexDiff = a.index - b.index;

  if (tabDiff) {
    if (!a.tabIndex) return 1;
    if (!b.tabIndex) return -1;
  }

  return tabDiff || indexDiff;
};

var tabOrder_orderByTabIndex = function orderByTabIndex(nodes, filterNegative, keepGuards) {
  return array_toArray(nodes).map(function (node, index) {
    return {
      node: node,
      index: index,
      tabIndex: keepGuards && node.tabIndex === -1 ? (node.dataset || {}).focusGuard ? 0 : -1 : node.tabIndex
    };
  }).filter(function (data) {
    return !filterNegative || data.tabIndex >= 0;
  }).sort(tabSort);
};
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/tabbables.js
/* harmony default export */ var tabbables = (['button:enabled:not([readonly])', 'select:enabled:not([readonly])', 'textarea:enabled:not([readonly])', 'input:enabled:not([readonly])', 'a[href]', 'area[href]', 'iframe', 'object', 'embed', '[tabindex]', '[contenteditable]', '[autofocus]']);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/tabUtils.js




var queryTabbables = tabbables.join(',');
var queryGuardTabbables = queryTabbables + ', [data-focus-guard]';

var tabUtils_getFocusables = function getFocusables(parents, withGuards) {
  return parents.reduce(function (acc, parent) {
    return acc.concat(
    // add all tabbables inside
    array_toArray(parent.querySelectorAll(withGuards ? queryGuardTabbables : queryTabbables)),
    // add if node is tabble itself
    parent.parentNode ? array_toArray(parent.parentNode.querySelectorAll(tabbables.join(','))).filter(function (node) {
      return node === parent;
    }) : []);
  }, []);
};

var tabUtils_getParentAutofocusables = function getParentAutofocusables(parent) {
  var parentFocus = parent.querySelectorAll('[' + FOCUS_AUTO + ']');
  return array_toArray(parentFocus).map(function (node) {
    return tabUtils_getFocusables([node]);
  }).reduce(function (acc, nodes) {
    return acc.concat(nodes);
  }, []);
};
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/DOMutils.js




var isElementHidden = function isElementHidden(computedStyle) {
  if (!computedStyle || !computedStyle.getPropertyValue) {
    return false;
  }
  return computedStyle.getPropertyValue('display') === 'none' || computedStyle.getPropertyValue('visibility') === 'hidden';
};

var isVisible = function isVisible(node) {
  return !node || node === document || node.nodeType === Node.DOCUMENT_NODE || !isElementHidden(SecureWindow.getComputedStyle(node, null)) && isVisible(node.parentNode);
};

var notHiddenInput = function notHiddenInput(node) {
  return !((node.tagName === 'INPUT' || node.tagName === 'BUTTON') && (node.type === 'hidden' || node.disabled));
};

var getParents = function getParents(node) {
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  parents.push(node);
  if (node.parentNode) {
    getParents(node.parentNode, parents);
  }
  return parents;
};

var getCommonParent = function getCommonParent(nodea, nodeb) {
  var parentsA = getParents(nodea);
  var parentsB = getParents(nodeb);

  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};

var DOMutils_filterFocusable = function filterFocusable(nodes) {
  return array_toArray(nodes).filter(function (node) {
    return isVisible(node);
  }).filter(function (node) {
    return notHiddenInput(node);
  });
};

var DOMutils_getTabbableNodes = function getTabbableNodes(topNodes, withGuards) {
  return tabOrder_orderByTabIndex(DOMutils_filterFocusable(tabUtils_getFocusables(topNodes, withGuards)), true, withGuards);
};

var DOMutils_getAllTabbableNodes = function getAllTabbableNodes(topNodes) {
  return tabOrder_orderByTabIndex(DOMutils_filterFocusable(tabUtils_getFocusables(topNodes)), false);
};

var DOMutils_parentAutofocusables = function parentAutofocusables(topNode) {
  return DOMutils_filterFocusable(tabUtils_getParentAutofocusables(topNode));
};
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/utils/firstFocus.js
var isRadio = function isRadio(node) {
  return node.tagName === 'INPUT' && node.type === 'radio';
};

var findSelectedRadio = function findSelectedRadio(node, nodes) {
  return nodes.filter(isRadio).filter(function (el) {
    return el.name === node.name;
  }).filter(function (el) {
    return el.checked;
  })[0] || node;
};

var pickFirstFocus = function pickFirstFocus(nodes) {
  if (nodes[0] && nodes.length > 1) {
    if (isRadio(nodes[0]) && nodes[0].name) {
      return findSelectedRadio(nodes[0], nodes);
    }
  }
  return nodes[0];
};

var pickFocusable = function pickFocusable(nodes, index) {
  if (nodes.length > 1) {
    if (isRadio(nodes[index]) && nodes[index].name) {
      return nodes.indexOf(findSelectedRadio(nodes[index], nodes));
    }
  }
  return index;
};

/* harmony default export */ var utils_firstFocus = (pickFirstFocus);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/focusMerge.js





var findAutoFocused = function findAutoFocused(autoFocusables) {
  return function (node) {
    return !!node.autofocus || node.dataset && !!node.dataset.autofocus || autoFocusables.indexOf(node) >= 0;
  };
};

var isGuard = function isGuard(node) {
  return node && node.dataset && node.dataset.focusGuard;
};
var notAGuard = function notAGuard(node) {
  return !isGuard(node);
};

var focusMerge_newFocus = function newFocus(innerNodes, outerNodes, activeElement, lastNode, autoFocused) {
  var cnt = innerNodes.length;
  var firstFocus = innerNodes[0];
  var lastFocus = innerNodes[cnt - 1];
  var isOnGuard = isGuard(activeElement);

  // focus is inside
  if (innerNodes.indexOf(activeElement) >= 0) {
    return undefined;
  }

  var activeIndex = outerNodes.indexOf(activeElement);
  var lastIndex = outerNodes.indexOf(lastNode || activeIndex);
  var lastNodeInside = innerNodes.indexOf(lastNode);
  var indexDiff = activeIndex - lastIndex;
  var firstNodeIndex = outerNodes.indexOf(firstFocus);
  var lastNodeIndex = outerNodes.indexOf(lastFocus);

  var returnFirstNode = pickFocusable(innerNodes, 0);
  var returnLastNode = pickFocusable(innerNodes, cnt - 1);

  // new focus
  if (activeIndex === -1 || lastNodeInside === -1) {
    return innerNodes.indexOf(autoFocused && autoFocused.length ? utils_firstFocus(autoFocused) : utils_firstFocus(innerNodes));
  }
  // old focus
  if (!indexDiff && lastNodeInside >= 0) {
    return lastNodeInside;
  }
  // first element
  if (activeIndex <= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnLastNode;
  }
  // last element
  if (activeIndex >= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnFirstNode;
  }
  // jump out, but not on the guard
  if (indexDiff && Math.abs(indexDiff) > 1) {
    return lastNodeInside;
  }
  // focus above lock
  if (activeIndex <= firstNodeIndex) {
    return returnLastNode;
  }
  // focus below lock
  if (activeIndex > lastNodeIndex) {
    return returnFirstNode;
  }
  // index is inside tab order, but outside Lock
  if (indexDiff) {
    if (Math.abs(indexDiff) > 1) {
      return lastNodeInside;
    }
    return (cnt + lastNodeInside + indexDiff) % cnt;
  }
  // do nothing
  return undefined;
};

var focusMerge_getTopCommonParent = function getTopCommonParent(baseActiveElement, leftEntry, rightEntries) {
  var activeElements = asArray(baseActiveElement);
  var leftEntries = asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = null;
  leftEntries.filter(Boolean).forEach(function (entry) {
    topCommon = getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function (subEntry) {
      var common = getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || common.contains(topCommon)) {
          topCommon = common;
        } else {
          topCommon = getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};

var focusMerge_allParentAutofocusables = function allParentAutofocusables(entries) {
  return entries.reduce(function (acc, node) {
    return acc.concat(DOMutils_parentAutofocusables(node));
  }, []);
};

var reorderNodes = function reorderNodes(srcNodes, dstNodes) {
  var remap = new Map();
  // no Set(dstNodes) for IE11 :(
  dstNodes.forEach(function (entity) {
    return remap.set(entity.node, entity);
  });
  // remap to dstNodes
  return srcNodes.map(function (node) {
    return remap.get(node);
  }).filter(Boolean);
};

var focusMerge_getFocusabledIn = function getFocusabledIn(topNode) {
  var entries = all_affected(topNode).filter(notAGuard);
  var commonParent = focusMerge_getTopCommonParent(topNode, topNode, entries);
  var outerNodes = DOMutils_getTabbableNodes([commonParent], true);
  var innerElements = DOMutils_getTabbableNodes(entries).filter(function (_ref) {
    var node = _ref.node;
    return notAGuard(node);
  }).map(function (_ref2) {
    var node = _ref2.node;
    return node;
  });

  return outerNodes.map(function (_ref3) {
    var node = _ref3.node,
        index = _ref3.index;
    return {
      node: node,
      index: index,
      lockItem: innerElements.indexOf(node) >= 0,
      guard: isGuard(node)
    };
  });
};

var focusMerge_getFocusMerge = function getFocusMerge(topNode, lastNode) {
  var activeElement = document && Document.activeElement;
  var entries = all_affected(topNode).filter(notAGuard);

  var commonParent = focusMerge_getTopCommonParent(activeElement || topNode, topNode, entries);

  var innerElements = DOMutils_getTabbableNodes(entries).filter(function (_ref4) {
    var node = _ref4.node;
    return notAGuard(node);
  });

  if (!innerElements[0]) {
    innerElements = DOMutils_getAllTabbableNodes(entries).filter(function (_ref5) {
      var node = _ref5.node;
      return notAGuard(node);
    });
    if (!innerElements[0]) {
      return undefined;
    }
  }

  var outerNodes = DOMutils_getTabbableNodes([commonParent]).map(function (_ref6) {
    var node = _ref6.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function (_ref7) {
    var node = _ref7.node;
    return node;
  });

  var newId = focusMerge_newFocus(innerNodes, outerNodes, activeElement, lastNode, innerNodes.filter(findAutoFocused(focusMerge_allParentAutofocusables(entries))));

  if (newId === undefined) {
    return newId;
  }
  return orderedInnerElements[newId];
};

/* harmony default export */ var focusMerge = (focusMerge_getFocusMerge);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/setFocus.js


var focusOn = function focusOn(target) {
  target.focus();
  if (target.contentWindow) {
    target.contentSecureWindow.focus();
  }
};

var guardCount = 0;
var lockDisabled = false;

/* harmony default export */ var setFocus = (function (topNode, lastNode) {
  var focusable = focusMerge(topNode, lastNode);

  if (lockDisabled) {
    return;
  }

  if (focusable) {
    if (guardCount > 2) {
      // eslint-disable-next-line no-console
      console.error('FocusLock: focus-fighting detected. Only one focus management system could be active. ' + 'See https://github.com/theKashey/focus-lock/#focus-fighting');
      lockDisabled = true;
      setTimeout(function () {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node);
    guardCount--;
  }
});
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/focus-lock/dist/es2015/index.js










/* harmony default export */ var es2015 = (setFocus);
// CONCATENATED MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/dom-focus-lock/dist/index.esm.js


var lastActiveTrap = 0;
var lastActiveFocus = null;

var focusOnBody = function focusOnBody() {
  return document && Document.activeElement === Document.body;
};

var index_esm_isFreeFocus = function isFreeFocus() {
  return focusOnBody() || es2015_focusIsHidden();
};

var index_esm_activateTrap = function activateTrap() {
  var result = false;

  if (lastActiveTrap) {
    var observed = lastActiveTrap;

    if (!index_esm_isFreeFocus()) {
      if (observed && !es2015_focusInside(observed)) {
        result = es2015(observed, lastActiveFocus);
      }

      lastActiveFocus = Document.activeElement;
    }
  }

  return result;
};

var reducePropsToState = function reducePropsToState(propsList) {
  return propsList.filter(function (node) {
    return node;
  }).slice(-1)[0];
};

var handleStateChangeOnClient = function handleStateChangeOnClient(trap) {
  lastActiveTrap = trap;

  if (trap) {
    index_esm_activateTrap();
  }
};

var instances = [];

var emitChange = function emitChange(event) {
  if (handleStateChangeOnClient(reducePropsToState(instances))) {
    event && event.preventDefault();
    return true;
  }

  return false;
};

var attachHandler = function attachHandler() {
  Document.addEventListener('focusin', emitChange);
};

var detachHandler = function detachHandler() {
  Document.removeEventListener('focusin', emitChange);
};

var focusLock = {
  on: function on(domNode) {
    if (instances.length === 0) {
      attachHandler();
    }

    if (instances.indexOf(domNode) < 0) {
      instances.push(domNode);
      emitChange();
    }
  },
  off: function off(domNode) {
    instances = instances.filter(function (node) {
      return node !== domNode;
    });
    emitChange();

    if (instances.length === 0) {
      detachHandler();
    }
  }
};

/* harmony default export */ var index_esm = (focusLock);

// CONCATENATED MODULE: ./src/views/lightbox.ts
/*
* Applies and controls styles relating to centering the lightbox within the parent window
*/



// @TODO: need better return type here
function show(iframeString, thumbnailContainer, overlayZindex) {
    if (!iframeString || Document.getElementById('vidyard-overlay')) {
        return;
    }
    var container = generateLightboxContainer(iframeString);
    var lightbox = generateLightboxHTML(overlayZindex);
    var lightboxConstraint = generateConstraintImage(thumbnailContainer);
    // Needed so that the lightbox isn't the last element in the <body> to
    // allow focusLock to listen for a focus event when focus leaves the
    // last element in the lightbox
    var focusableElement = Document.createElement('div');
    focusableElement.id = 'vidyard-focusable-element';
    focusableElement.tabIndex = 0;
    lightbox.popbox.appendChild(container.backerElement);
    lightbox.popbox.appendChild(container.containingDiv);
    lightbox.popbox.appendChild(lightboxConstraint);
    // Add them to the DOM
    Document.body.appendChild(lightbox.overlayWrapper);
    Document.body.appendChild(focusableElement);
    lightbox.closeContainer.focus();
    index_esm.on(lightbox.overlayWrapper);
    // Have to use a timeout so css will actually transition the opacity
    setTimeout(function animateOpacity() {
        lightbox.overlayWrapper.style.opacity = '1';
        lightbox.overlayWrapper.style.filter = 'alpha(opacity=100)';
    }, 0);
    return {
        container: container,
        lightbox: lightbox,
    };
}
function remove(callbacks) {
    var fixedElement = Document.getElementById('vidyard-content-fixed');
    var focusableElement = Document.getElementById('vidyard-focusable-element');
    var overlay = Document.getElementById('vidyard-overlay');
    var overlayWrapper = Document.getElementById('vidyard-overlay-wrapper');
    var popbox = Document.getElementById('vidyard-popbox');
    if (!fixedElement || !overlay || !overlayWrapper || !popbox) {
        return;
    }
    if (callbacks) {
        Object.keys(callbacks).forEach(function (k) {
            var cb = callbacks[k];
            cb();
        });
    }
    if (focusableElement) {
        focusableElement.parentNode.removeChild(focusableElement);
    }
    index_esm.off(overlayWrapper);
    overlayWrapper.style.opacity = '0';
    overlayWrapper.style.filter = 'alpha(opacity=0)';
    var cleanup = function () {
        overlayWrapper.parentNode.removeChild(overlayWrapper);
    };
    // Clean up the added DOM elements once fade out is complete
    setTimeout(cleanup, OVERLAY_FADE_TIME * 1000);
}
function makeIframeVisible(iframe) {
    iframe.style.opacity = '1';
}
// --- Private Functions ---
// @TODO: Better return type here
function generateLightboxHTML(overlayZindex) {
    // Create all the elements for the overlay
    var dom = {};
    dom.overlay = Document.createElement('div');
    dom.contentFixed = Document.createElement('div');
    dom.popbox = Document.createElement('div');
    dom.overlayWrapper = Document.createElement('div');
    dom.closeContainer = generateCloseButton().closeContainer;
    dom.overlay.id = 'vidyard-overlay';
    dom.overlay.setAttribute('aria-hidden', 'true');
    dom.overlay.style.display = 'block';
    dom.contentFixed.id = 'vidyard-content-fixed';
    dom.contentFixed.setAttribute('aria-label', 'media player lightbox');
    dom.contentFixed.setAttribute('role', 'dialog');
    dom.contentFixed.style.display = 'block';
    dom.popbox.id = 'vidyard-popbox';
    dom.overlayWrapper.id = 'vidyard-overlay-wrapper';
    dom.overlayWrapper.style.display = 'block';
    dom.contentFixed.appendChild(dom.popbox);
    dom.overlayWrapper.appendChild(dom.overlay);
    dom.overlayWrapper.appendChild(dom.closeContainer);
    dom.overlayWrapper.appendChild(dom.contentFixed);
    if (overlayZindex) {
        dom.overlay.style.zIndex = overlayZindex;
        dom.contentFixed.style.zIndex = overlayZindex + 2;
        dom.closeContainer.style.zIndex = overlayZindex + 1;
    }
    return dom;
}
// @TODO: Better return type here
function generateCloseButton() {
    var dom = {};
    dom.closeContainer = Document.createElement('div');
    dom.closeButton = Document.createElement('div');
    dom.closeContainer.className = 'vidyard-close-container';
    dom.closeContainer.setAttribute('aria-label', 'Close Player');
    dom.closeContainer.setAttribute('role', 'button');
    dom.closeContainer.setAttribute('tabindex', '0');
    dom.closeButton.className = 'vidyard-close-x';
    // Fix for ie7 not supporting :before pseudo elements
    // Fix for ie8 not supporting transform rotate
    if (Document.documentMode < 9) {
        dom.closeButton.className += ' simple-close';
        dom.closeButton.innerHTML = '&times;';
    }
    dom.closeContainer.appendChild(dom.closeButton);
    return dom;
}
// @TODO: Better return type here
function generateLightboxContainer(playerIframeDOMString) {
    var dom = {};
    dom.backerElement = Document.createElement('div');
    dom.backerElement.className = 'vidyard-lightbox-content-backer';
    dom.containerElement = Document.createElement('div');
    // hydrate the markup string into actual DOM
    dom.containerElement.innerHTML = playerIframeDOMString;
    dom.containingDiv = dom.containerElement.getElementsByTagName('div')[0];
    dom.containingDiv.style.position = 'absolute';
    dom.containingDiv.style.height = '100%';
    dom.containingDiv.style.width = '100%';
    dom.containingDiv.style.zIndex = '2';
    dom.iframe = dom.containerElement.getElementsByTagName('iframe')[0];
    // Lightbox specific styling for the iframe
    dom.iframe.parentNode.style.position = 'static';
    // This overwrites the padding bottom set by createIframe
    dom.iframe.parentNode.style.paddingBottom = 0;
    dom.iframe.style.opacity = '1';
    // This is to ensure the background actually animates
    setTimeout(function () {
        dom.backerElement.style.opacity = '1';
        dom.backerElement.style.filter = 'alpha(opacity=100)';
    }, 0);
    return dom;
}
function generateConstraintImage(container) {
    var image = getElementByClass('vidyard-lightbox-image', 'img', container)[0].cloneNode();
    image.className = '';
    image.id = 'vidyard-popbox-constraint';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    return image;
}

// CONCATENATED MODULE: ./src/models/lightbox-animator.ts
/*
* Controls showing & hiding of the lightbox
*/





// --- Private Vars ---
var ACTIVE_ELEMENT;
// need to cleanup these after the lightbox is removed
var LIGHTBOX_EVENTS = {};
function setupAnimations(options) {
    var thumbnailContainer = getElementByClass('vidyard-lightbox-centering', 'div', options.container)[0];
    // expose the show and hide functions to the player API
    options.player.showLightbox = function showLightboxHandler() {
        logger.setLevel(options.player.uuid)('show lightbox');
        showLightbox({
            container: options.container,
            iframe: options.iframe,
            overlayZindex: options.overlayZindex,
            player: options.player,
        });
    };
    options.player.hideLightbox = removeLightbox;
    // event listeners on the thumbnail
    addListener('click', 'onclick', options.player.showLightbox, thumbnailContainer);
    addListener('keydown', 'onkeydown', spaceOrEnterKeyPressEvent(function (e) {
        e.preventDefault();
        options.player.showLightbox(e);
    }), thumbnailContainer);
}
// --- Private Functions ---
function showLightbox(options) {
    ACTIVE_ELEMENT = Document.activeElement;
    var lightboxDOM = show(options.iframe, options.container, options.overlayZindex);
    // Set the vidyardPlayers iframe to the newly injected one
    options.player.iframe = lightboxDOM.container.iframe;
    // callback to run when the iframe has loaded, only once
    var uuid = options.player.uuid;
    var iframe = lightboxDOM.container.iframe;
    var iframeLoaded = onIframeLoad(iframe, uuid);
    var listenForKeyPress = iframeListenForKeyPress(iframe, uuid);
    // iframe load listener
    LIGHTBOX_EVENTS.iframeLoaded = addListener('load', 'onload', iframeLoaded, lightboxDOM.container.iframe);
    // postMessage receipt from the player listener
    LIGHTBOX_EVENTS.messageHandler = addListener('message', 'onmessage', 
    // @TODO add better types for data
    receive(function (data) {
        iframeLoaded();
        listenForKeyPress();
        onEscInIframe(data);
    }), window);
    // click on lightbox overlay listener
    LIGHTBOX_EVENTS.overlayClick = addListener('click', 'onclick', removeLightbox, lightboxDOM.lightbox.overlayWrapper);
    // click on lightbox fixed content wrapper listener
    LIGHTBOX_EVENTS.fixedClick = addListener('click', 'onclick', removeLightbox, lightboxDOM.lightbox.contentFixed);
    // space or enter on the X button listener
    LIGHTBOX_EVENTS.closeKeyPress = addListener('keydown', 'onkeydown', spaceOrEnterKeyPressEvent(removeLightbox), lightboxDOM.lightbox.closeContainer);
    LIGHTBOX_EVENTS.responsivePlayerSize = addListener('resize', 'onresize', lightbox_animator_handleResize, window);
}
function lightbox_animator_handleResize() {
    var constraintImage = Document.getElementById('vidyard-popbox-constraint');
    var windowRatio = parseFloat(((SecureWindow.innerHeight / SecureWindow.innerWidth) * 100).toFixed(2));
    var imageRatio = parseFloat(calcAspectRatio(constraintImage));
    var orientation = windowRatio < imageRatio ? 'landscape' : 'portrait';
    if (constraintImage.className !== orientation) {
        constraintImage.className = orientation;
    }
}
function removeLightbox() {
    remove();
    if (ACTIVE_ELEMENT) {
        ACTIVE_ELEMENT.focus();
    }
    Object.keys(LIGHTBOX_EVENTS).forEach(function (key) {
        var _a = LIGHTBOX_EVENTS[key], eventName = _a.eventName, handler = _a.handler, element = _a.element;
        removeListener(eventName, handler, element);
    });
}
// @TODO: add better type for postMessageData
function onEscInIframe(postMessageData) {
    // if esc was pressed in the iframe
    if (postMessageData.event === 'keyPressed' && postMessageData.params === 27) {
        removeLightbox();
    }
}
function onIframeLoad(iframe, uuid) {
    return once(function () {
        makeIframeVisible(iframe);
        lightbox_animator_handleResize();
        // start listening for esc key presses in parent
        LIGHTBOX_EVENTS.parentEsc = addListener('keydown', 'onkeydown', escKeyPressEvent(removeLightbox), document);
    });
}
// Send message to start listening for esc key presses in iframe
function iframeListenForKeyPress(iframe, uuid) {
    return once(function () {
        var message = { uuid: uuid, event: 'listenForKeyPress', keyCode: '27' };
        send(message, "https://" + getPlaybackURL(), iframe);
    });
}

// CONCATENATED MODULE: ./src/api/get-player-metadata.ts
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



function getPlayerMetadata(uuid) {
    if (!uuid || typeof uuid !== 'string' || uuid.length < 20) {
        throw new Error('Invalid UUID given');
        return;
    }
    var log = logger.setLevel(uuid);
    // @TODO: add proper API to fetch metadata as this endpoint is private and not stable
    var metadataEndpoint = "https://" + getPlaybackURL() + "/player/" + uuid + ".json?pomo=0";
    log('fetching metadata');
    return xhrRequest({ endpoint: metadataEndpoint })
        .then(JSON.parse)
        .then(function (data) {
        log('metadata successfully fetched');
        return __assign({ uuid: uuid }, data.payload.vyContext.metadata);
    })
        .catch(function (e) {
        log("failed to fetch metadata, " + e);
        throw new Error('Error parsing player metadata, make sure the UUID is correct');
    });
}

// CONCATENATED MODULE: ./src/models/lightbox-page-thumbnail.ts
/*
* Handles injecting html & css related specfically to lightbox embeds
*/



// This code sets up the css and listeners for the on page splash screen & play button
function init(embedScriptElement, queryParams, sizing) {
    var lightboxThumbnailUrl = "https://" + getPlaybackURL() + "/" + queryParams.uuid + ".jpg";
    var lightboxString = composeLightboxString(lightboxThumbnailUrl, queryParams, sizing);
    embedScriptElement.insertAdjacentHTML('afterbegin', lightboxString);
    getPlayerMetadata(queryParams.uuid)
        .then(function (metadata) {
        var playButton = getElementByClass('play-button', 'button', embedScriptElement);
        if (playButton.length !== 1) {
            return;
        }
        playButton[0].setAttribute('aria-label', 'Play video ' + metadata.name + '. Opens in a modal');
    }, function () {
        // Ignore errors fetching metadata
    });
}
function applyLightboxPlayButton(pbData, embedScriptElement) {
    if (pbData.pb !== 1) {
        return;
    }
    var playButton = getElementByClass('play-button', 'button', embedScriptElement);
    if (playButton.length !== 1) {
        return;
    }
    playButton[0].style.display = 'block';
    playButton[0].style.backgroundColor = '#' + pbData.pbc;
}
// --- Private Functions ---
function composeLightboxString(lightboxThumbnailUrl, queryParams, sizing) {
    return ('<div class="vidyard-lightbox-thumbnail vidyard-lightbox-' + queryParams.uuid + '"' +
        (sizing.maxWidth ? ' style="max-width: ' + sizing.maxWidth + 'px;"' : '') +
        '>' +
        '<div class="vidyard-lightbox-centering" ' +
        'style="padding-bottom: ' + sizing.ratio + '%;">' +
        '<img class="vidyard-lightbox-image" src="' + lightboxThumbnailUrl + '" alt="video thumbnail" />' +
        '<div type="button" role="button" class="play-button" title="Play video" data-version="1" tabindex="0">' +
        '<div class="play-button-size"></div>' +
        '<div class="arrow-size">' +
        '<div class="arrow-size-ratio"></div>' +
        '<div class="arrow"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
}

// CONCATENATED MODULE: ./src/controllers/lightbox-player.ts






var injectLightboxElements = function (_a) {
    var dataParams = _a.dataParams, player = _a.player;
    var log = logger.setLevel(dataParams.uuid);
    log("injecting lighbox embed");
    // hide the placeholder image right away if lightbox
    player.placeholder.style.display = 'none';
    dataParams.autoplay = 1;
    var iframeSizing = { ratio: calcAspectRatio(player.placeholder) };
    var playerIframe = createIframe(dataParams, iframeSizing);
    var thumbnailSizing = {
        maxHeight: dataParams.height ? parseInt(dataParams.height, 10) : null,
        maxWidth: dataParams.width ? parseInt(dataParams.width, 10) : null,
        ratio: calcAspectRatio(player.placeholder),
    };
    // Inject lightbox thumbnail
    init(player.container, dataParams, thumbnailSizing);
    setupAnimations({
        container: player.container,
        iframe: playerIframe,
        overlayZindex: dataParams.overlayZindex,
        player: player,
    });
    log("getStyle sent");
    getStyle(player.uuid).then(function (data) {
        log("getStyle received: " + JSON.stringify(data));
        // Update the play button of the lightbox thumbnail to match the colours on the model
        applyLightboxPlayButton(data, player.container);
    });
};
/* harmony default export */ var lightbox_player = (injectLightboxElements);

// CONCATENATED MODULE: ./src/controllers/integrations.ts



function integrationsControler(player) {
    var integrations = SecureWindow.VidyardV4.integrations;
    var log = logger.setLevel(player.uuid);
    var marketoCookie = integrations.getCookie('marketo');
    if (marketoCookie) {
        log("getMarketoLead sent");
        getMarketoLead(player.uuid, marketoCookie)
            .then(checkJSONParse)
            // @TODO: add better types here
            .then(function (leadData) {
            log("getMarketoLead received: " + leadData);
            player.on('ready', function () {
                integrations.addKnownVisitor('marketo', leadData, player.org);
            });
        })
            .catch(function () {
            logger.warn('Invalid Marketo cookie');
        });
    }
    // Get info on what our integrations are by hitting /v4/:uuid/integrations.js
    log("getIntegrations");
    // @TODO: add better types here
    getIntegrations(player.uuid).then(function (data) {
        log("getIntegrations received: " + JSON.stringify(data));
        player.on('ready', function () {
            player._tmpOrg = data;
            integrations.updatePlayer(player);
        });
    });
}

// CONCATENATED MODULE: ./src/controllers/seo.ts




function seoController(uuid) {
    var log = logger.setLevel(uuid);
    log("getSEO sent");
    // @TODO: add better type
    getSEO(uuid).then(function (data) {
        log("getSEO: " + JSON.stringify(data));
        if (!isObjectEmpty(data)) {
            var jsonLD = createJsonLD(data);
            Document.getElementsByTagName('head')[0].appendChild(jsonLD);
        }
    });
}

// CONCATENATED MODULE: ./src/views/container.ts
var createContainer = function (uuid, dataParams) {
    var container = Document.createElement('div');
    container.className = 'vidyard-player-container';
    container.setAttribute('uuid', uuid);
    var styles = container.style;
    styles.margin = 'auto';
    styles.width = '100%';
    styles.height = 'auto';
    styles.overflow = 'hidden';
    styles.display = 'block';
    if (dataParams.type === 'inline') {
        styles.maxWidth = dataParams.width ? dataParams.width + 'px' : '';
        styles.maxHeight = dataParams.height ? dataParams.height + 'px' : '';
    }
    return container;
};
/* harmony default export */ var views_container = (createContainer);

// CONCATENATED MODULE: ./src/models/data-params.ts
/* tslint:disable variable-name */


var data_params_DataParams = /** @class */ (function () {
    function DataParams(placeHolderImage) {
        var _this = this;
        this.disable_popouts = 1;
        var data = parseVyData(dataSet(placeHolderImage));
        Object.keys(data).forEach(function (key) {
            _this[key] = data[key];
        });
        // Default to inline embed
        if (this.type !== 'inline' && this.type !== 'lightbox') {
            embed_helpers_log('Invalid Vidyard player embed type, defaulting to inline.', 'warn');
            this.type = 'inline';
        }
        // Report the embed script version
        this.v = VERSION;
        // This embed code no longer supports popout CTAs
        this.disable_popouts = 1;
        // Gets the vycustomid query string param, used to identify personalized videos
        this.custom_id = this.custom_id || getQueryParam('vycustom_id');
        // Gets the vyemail query string param, which connects views to an email entered
        this.vyemail = this.vyemail || getQueryParam('vyemail');
        // Sets a fixed Vidyard Salesforce ID for every view
        this.vysfid = this.vysfid || getQueryParam('vysfid');
        // Sets a fixed Vidyard Salesforce ID for every view
        this.vyetoken = this.vyetoken || getQueryParam('vyetoken');
        // Gets & sets the access code parameter which will bypass having the user enter it manually
        var vyac = getQueryParam('vyac');
        var vyplayer = getQueryParam('vyplayer');
        if (vyac && vyplayer && vyplayer === this.uuid) {
            this.access_code = vyac;
        }
        else if (vyac && vyplayer) {
            embed_helpers_log('Invalid Vidyard player access code.', 'warn');
        }
    }
    DataParams.prototype.toQueryString = function () {
        var queryParamsString = '?';
        var key;
        for (key in this) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }
            // don't include these in the query string
            if (key === 'height' || key === 'uuid' || key === 'width') {
                continue;
            }
            // don't include undefined keys
            if (this[key] === undefined) {
                continue;
            }
            // Add '&' here so we don't end up with one trailing
            queryParamsString += queryParamsString !== '?' ? '&' : '';
            queryParamsString += encodeURIComponent(key) + '=' + encodeURIComponent(this[key]);
        }
        // Just return an empty string if no params were found
        return queryParamsString === '?' ? '' : queryParamsString;
    };
    return DataParams;
}());
/* harmony default export */ var data_params = (data_params_DataParams);

// CONCATENATED MODULE: ./src/models/preload-frames.ts
/*
* Adds link rel prefetch for the iframes
*/



function preloadFrames(embeds) {
    if (embeds === void 0) { embeds = getElementByClass('vidyard-player-embed', 'img'); }
    for (var _i = 0, embeds_1 = embeds; _i < embeds_1.length; _i++) {
        var ele = embeds_1[_i];
        var dataParams = new data_params(ele);
        var uuid = dataParams.uuid;
        var preloadHref = "https://" + getPlaybackURL() + "/" + uuid + dataParams.toQueryString();
        if (!uuid) {
            continue;
        }
        if (indexOfArray(preloadHref, SecureWindow.VidyardV4.preloadLinks) === -1) {
            addPrefetchLink(uuid, preloadHref);
            SecureWindow.VidyardV4.preloadLinks.push(preloadHref);
        }
    }
}
// --- Private Functions ---
function addPrefetchLink(uuid, href) {
    var preloadLink = Document.createElement('link');
    preloadLink.rel = 'prefetch';
    preloadLink.crossOrigin = 'anonymous';
    preloadLink.href = href;
    Document.body.appendChild(preloadLink);
    return href;
}

// CONCATENATED MODULE: ./src/models/vidyard-player.ts
var vidyard_player_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var vidyard_player_Player = /** @class */ (function () {
    function Player(element, uuid, callbackStore) {
        var _this = this;
        this._ready = false;
        this._previousTime = null;
        this._onMessageEventHandler = function (event) {
            if (event.origin !== "https://" + getPlaybackURL()) {
                return;
            }
            var data;
            try {
                data = JSON.parse(event.data);
            }
            catch (e) {
                return;
            }
            // For a different player
            if (_this.uuid && data.uuid !== _this.uuid) {
                return;
            }
            // All vy events will have a string event name
            if (typeof data.event !== 'string') {
                return;
            }
            _this._updateStatus(data);
            if (data.event === 'ready') {
                _this._ready = true;
                SecureWindow.VidyardV4.integrations.updatePlayer(_this);
            }
            var eventCallbacks = _this._callbackStore[data.event];
            if (eventCallbacks) {
                for (var _i = 0, eventCallbacks_1 = eventCallbacks; _i < eventCallbacks_1.length; _i++) {
                    var callback = eventCallbacks_1[_i];
                    callback.call(_this, data.params, _this);
                }
            }
        };
        this._callbackStore = callbackStore || {
            beforeSeek: [],
            chapterComplete: [],
            createCta: [],
            fullScreenChange: [],
            pause: [],
            play: [],
            playerComplete: [],
            ready: [],
            seek: [],
            sidePlaylistOpen: [],
            status: [],
            timeupdate: [],
            volumeChange: [],
        };
        this.element = element;
        this.uuid = uuid;
        this.status = null;
        this.metadata = null;
        this.progressEventsUnsubscribe = [];
        addListener('message', 'onmessage', this._onMessageEventHandler);
    }
    Player.prototype.on = function (eventName, callback) {
        var _this = this;
        if (eventName === 'ready' && this.ready()) {
            setTimeout(function () { return callback.call(_this, undefined, _this); }, 0);
            return;
        }
        if (this._callbackStore[eventName] === undefined) {
            this._callbackStore[eventName] = [callback];
            embed_helpers_log("The event name: " + eventName + " is not supported, your handler was setup regardless", 'warn');
            return;
        }
        this._callbackStore[eventName].push(callback);
    };
    Player.prototype.off = function (eventName, callback) {
        if (eventName === undefined) {
            // No event name given, clear out all event handlers
            for (var evt in this._callbackStore) {
                if (this._callbackStore.hasOwnProperty(evt)) {
                    this._callbackStore[evt] = [];
                }
            }
            return;
        }
        // If no handlers have been created with this eventName, do nothing
        if (!this._callbackStore[eventName]) {
            return;
        }
        if (callback) {
            // Only remove the callback associated with the correct function
            var index = indexOfArray(callback, this._callbackStore[eventName]);
            if (index > -1) {
                this._callbackStore[eventName].splice(index, 1);
            }
        }
        else {
            // Remove all callbacks associated with this eventName
            this._callbackStore[eventName] = [];
        }
    };
    Player.prototype.ready = function () {
        return this._ready;
    };
    // API METHODS
    Player.prototype.play = function () {
        this._message({ event: 'play' });
    };
    Player.prototype.pause = function () {
        this._message({ event: 'pause' });
    };
    Player.prototype.resume = function () {
        this._message({ event: 'resume' });
    };
    Player.prototype.seek = function (position) {
        this._message({ event: 'seek', position: position });
    };
    Player.prototype.setVolume = function (newVolume) {
        this._message({ event: 'setVolume', newVolume: newVolume });
    };
    Player.prototype.setPlaybackSpeed = function (speed) {
        this._message({ event: 'setPlaybackSpeed', speed: speed });
    };
    Player.prototype.playChapter = function (chapterIndex) {
        this._message({ chapter_index: chapterIndex, event: 'playChapter' });
    };
    Player.prototype.setAudioTrack = function (audioTrackId) {
        this._message({ audioTrackId: audioTrackId, event: 'setAudioTrack' });
    };
    Player.prototype.enableCaption = function (label, language) {
        this._message({ event: 'enableCaption', label: label, language: language });
    };
    Player.prototype.disableCaption = function (label, language) {
        this._message({ event: 'disableCaption', label: label, language: language });
    };
    Player.prototype.consentToGDPR = function (consent) {
        this._message({ consent: consent, event: 'consentToGDPR' });
    };
    Player.prototype.createCta = function (attributes) {
        this._message({
            attributes: shallowMerge({
                display_once: false,
                duration: 10,
                fullscreen: false,
                html: '',
                opacity: 1.0,
                start: 0,
                width: 300,
            }, attributes),
            event: 'createCta',
        });
    };
    Player.prototype.updateCta = function (ctaId, attributes) {
        this._message({
            attributes: attributes,
            event: 'updateCta',
            id: ctaId,
        });
    };
    Player.prototype.addEvent = function (_a) {
        var _b = _a.start, start = _b === void 0 ? 0 : _b, _c = _a.duration, duration = _c === void 0 ? 1 : _c, _d = _a.chapterIndex, chapterIndex = _d === void 0 ? 0 : _d, eventId = _a.eventId;
        if (!eventId) {
            embed_helpers_log('Missing arguments. Need eventId');
            return;
        }
        this._message({
            chapterIndex: chapterIndex,
            duration: duration,
            event: 'addEvent',
            id: eventId,
            start: start,
        });
    };
    Player.prototype.getCurrentChapter = function () {
        return this.status === null ? null : this.status.chapterIndex;
    };
    Player.prototype.currentTime = function () {
        return this.status === null ? null : this.status.currentTime;
    };
    Player.prototype.scrubbing = function () {
        return this.status === null ? null : this.status.scrubbing;
    };
    Player.prototype.toggleFullscreen = function () {
        var _this = this;
        // Request iframe to go fullscreen if possible, to get around user gesture requirements
        var fullscreenAPI = getFullscreenAPI();
        if (fullscreenAPI) {
            var fullscreenPromise = this.iframe[fullscreenAPI.requestFullscreen]();
            if (fullscreenPromise) {
                fullscreenPromise.then(function () {
                    _this._message({ event: 'toggleFullscreen' });
                });
            }
            else {
                this._message({ event: 'toggleFullscreen' });
            }
            // Listens to when the window exits fullscreen via the 'Esc' key
            addListener(fullscreenAPI.fullscreenchange, 'MSFullscreenChange', function () {
                if (!document[fullscreenAPI.fullscreenElement]) {
                    _this._message({ event: 'exitFullscreen' });
                }
            });
            addListener('message', 'onmessage', receive(function (data) {
                if (data.event === 'fullScreenChange' && data.params === false) {
                    if (document[fullscreenAPI.fullscreenElement]) {
                        document[fullscreenAPI.exitFullscreen]();
                    }
                }
            }));
        }
        else {
            // Simply send message for iOS
            this._message({ event: 'toggleFullscreen' });
        }
    };
    Player.prototype.resetPlayer = function () {
        this._message({ event: 'resetPlayer' });
    };
    Player.prototype._message = function (options) {
        if (this.ready() !== true) {
            embed_helpers_log('Player is not ready yet! No messages can be recieved.', 'error');
            return;
        }
        send(vidyard_player_assign({}, options, { uuid: this.uuid }), "https://" + getPlaybackURL(), this.iframe);
    };
    Player.prototype._updateStatus = function (data) {
        if (typeof data.status === 'object') {
            this.status = data.status;
        }
        if (typeof data.metadata === 'object') {
            this.metadata = data.metadata;
        }
        if (this.status) {
            if (this.status.currentTime !== this._previousTime && this._callbackStore.timeupdate) {
                for (var _i = 0, _a = this._callbackStore.timeupdate; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback.call(this, this.status.currentTime, this);
                }
            }
            this._previousTime = this.status.currentTime;
        }
    };
    return Player;
}());
/* harmony default export */ var vidyard_player = (vidyard_player_Player);

// CONCATENATED MODULE: ./src/models/renderer.ts
/*
* Handles sweeping over the DOM and injecting all types of players
* Effectively is the puppet master for all the embed code stuff
*/












var sweepDocument = function (container) {
    if (container === void 0) { container = document; }
    // Find all divs that belong to vy
    var embedLocations = getElementByClass('vidyard-player-embed', 'img', container);
    preloadFrames(embedLocations);
    toArray(embedLocations).forEach(renderPlayer);
    dispatch_ready();
};
var renderPlayer = function (placeholderImg) {
    var _a = SecureWindow.VidyardV4, integrations = _a.integrations, api = _a.api, players = _a.players, playerReadyListeners = _a.playerReadyListeners;
    var dataParams = new data_params(placeholderImg);
    var uuid = dataParams.uuid;
    var log = logger.setLevel(uuid);
    log("rendering");
    // Cant do anything without a uuid, just skip it
    if (uuid === undefined) {
        embed_helpers_log('Embed without a UUID detected, it is impossible to insert a player without a UUID. Add "data-uuid=some_uuid" to the offending element.' +
            placeholderImg);
        return;
    }
    if (dataParams.rendered === 'true') {
        log("Already rendered");
        return find(players, function (player) { return player.placeholder === placeholderImg; });
    }
    var container = views_container(uuid, dataParams);
    var newPlayer = new vidyard_player(container, uuid);
    placeholderImg.setAttribute('data-rendered', 'true');
    placeholderImg.parentNode.insertBefore(container, placeholderImg);
    newPlayer.placeholder = placeholderImg;
    newPlayer.container = container;
    players.push(newPlayer);
    processReadyListeners(newPlayer);
    // Inject player HTML into the dom
    if (dataParams.type === 'inline') {
        inline_player({ dataParams: dataParams, player: newPlayer });
    }
    else if (dataParams.type === 'lightbox') {
        lightbox_player({ dataParams: dataParams, player: newPlayer });
    }
    integrationsControler(newPlayer);
    seoController(uuid);
    // add the player to the SecureWindow.Vidyard global 
    // used for progress events and some integrations
    SecureWindow.Vidyard._players[newPlayer.uuid] = newPlayer;
    return newPlayer;
};

// CONCATENATED MODULE: ./src/api/destroy-player.ts

function unsubscribeProgressEvents(player) {
    player.progressEventsUnsubscribe.forEach(function (cb) { return cb(); });
    player.progressEventsUnsubscribe = [];
}
function destroyPlayer(player) {
    var players = SecureWindow.VidyardV4.players;
    if (includes(players, player)) {
        unsubscribeProgressEvents(player);
        player.off();
        player.container.parentNode.removeChild(player.container);
        player.placeholder.parentNode.removeChild(player.placeholder);
        players.splice(indexOfArray(player, players));
    }
    else {
        embed_helpers_log("Cannot destroy an unknown player", 'warn');
    }
}

// CONCATENATED MODULE: ./src/api/gdpr.ts
function consent(userConsent) {
    if (userConsent === undefined) {
        return;
    }
    var players = SecureWindow.VidyardV4.players;
    var _loop_1 = function (player) {
        player.on('ready', function () {
            player.consentToGDPR(userConsent);
        });
    };
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        var player = players_1[_i];
        _loop_1(player);
    }
}
// Used to determine whether or not to ask for GDPR consent on page load
// _readyConsent does not change based on calls to the consent function to limit usage
// to the expected use case at page load
function hasConsentOnReady(callback) {
    var playersReady = 0;
    var gdpr = SecureWindow.VidyardV4.api.GDPR;
    var players = SecureWindow.VidyardV4.players;
    if (players.length === 0) {
        return callback(false);
    }
    if (gdpr._readyConsent !== undefined) {
        return callback(gdpr._readyConsent);
    }
    // Make sure all the players are ready before returning the consent
    for (var _i = 0, players_2 = players; _i < players_2.length; _i++) {
        var player = players_2[_i];
        player.on('ready', function () {
            if (playersReady !== players.length) {
                playersReady += 1;
            }
            if (playersReady === players.length) {
                // TODO: can't use reduce in old IE, add helper
                gdpr._readyConsent = players.reduce(function (c, p) { return p.status.consent && c; }, true);
                return callback(gdpr._readyConsent);
            }
        });
    }
}

// CONCATENATED MODULE: ./src/api/get-players-by-uuid.ts
function getPlayersByUUID(uuid) {
    return SecureWindow.VidyardV4.players.filter(function (player) { return player.uuid === uuid; });
}
/* harmony default export */ var get_players_by_uuid = (getPlayersByUUID);

// CONCATENATED MODULE: ./src/api/progress-events/remove-duplicates.ts
var removeDuplicates = function (targetArray) {
    targetArray.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    var i = 0;
    while (i < targetArray.length) {
        if (targetArray[i] === targetArray[i + 1]) {
            targetArray.splice(i + 1, 1);
        }
        else {
            i += 1;
        }
    }
    return targetArray;
};

// CONCATENATED MODULE: ./src/api/progress-events/sorted-list.ts
// Stripped down version of: https://github.com/shinout/SortedList
// TODO: refactor with a class
// TODO: use map?
function SortedList() {
    this._compare = function (a, b) {
        if (a[0] < b[0]) {
            return -1;
        }
        if (a[0] > b[0]) {
            return 1;
        }
        if (a[1] < b[1]) {
            return -1;
        }
        if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    };
}
;
SortedList.create = function () {
    return new SortedList();
};
SortedList.prototype = new Array();
SortedList.prototype.constructor = Array.prototype.constructor;
SortedList.prototype.insertOne = function (val) {
    var pos = this.bsearch(val);
    this.splice(pos + 1, 0, val);
    return pos + 1;
};
SortedList.prototype.remove = function (pos) {
    this.splice(pos, 1);
    return this;
};
SortedList.prototype.bsearch = function (val) {
    if (!this.length) {
        return -1;
    }
    var mpos;
    var mval;
    var comp;
    var spos = 0;
    var epos = this.length;
    while (epos - spos > 1) {
        mpos = Math.floor((spos + epos) / 2);
        mval = this[mpos];
        comp = this._compare(val, mval);
        if (comp === 0) {
            return mpos;
        }
        if (comp > 0) {
            spos = mpos;
        }
        else {
            epos = mpos;
        }
    }
    return spos === 0 && this._compare(this[0], val) > 0 ? -1 : spos;
};

// CONCATENATED MODULE: ./src/api/progress-events/union-intervals.ts
function unionIntervals(sortedIntervals) {
    var prevInterval = null;
    var results = [];
    var index;
    for (index = 0; index < sortedIntervals.length; ++index) {
        if (!prevInterval || prevInterval[1] < sortedIntervals[index][0]) {
            if (prevInterval) {
                results.push(prevInterval);
            }
            prevInterval = [sortedIntervals[index][0], sortedIntervals[index][1]];
        }
        else if (sortedIntervals[index][1] > prevInterval[1]) {
            prevInterval[1] = sortedIntervals[index][1];
        }
    }
    if (prevInterval) {
        results.push(prevInterval);
    }
    return results;
}

// CONCATENATED MODULE: ./src/api/progress-events/set-event-listeners.ts


function setEventListeners(player, callback, thresholdList) {
    var intervalList = [];
    var lock = false;
    var currentChpater = player.getCurrentChapter();
    function setupChapter() {
        var chapter = player.getCurrentChapter();
        intervalList[chapter] = {
            interval: [0, 0],
            intervals: SortedList.create(),
            thresholds: thresholdList.slice(),
        };
        return intervalList[chapter];
    }
    function computeProgress(time, cb) {
        var unions;
        var totalViewed = 0;
        var chapter = player.getCurrentChapter();
        var checkIntervalPosition;
        var index;
        if (typeof intervalList[chapter] === 'undefined') {
            setupChapter();
        }
        if (lock ||
            typeof player.metadata !== 'object' ||
            time <= intervalList[chapter].interval[1]) {
            return;
        }
        // Close the current interval with the current time, insert into interval list, then calculate union
        intervalList[chapter].interval[1] = time;
        checkIntervalPosition = intervalList[chapter].intervals.insertOne(intervalList[chapter].interval);
        unions = unionIntervals(intervalList[chapter].intervals);
        // Replace Interval List with the union if possible during summation
        if (unions.length + 1 < intervalList[chapter].intervals.length) {
            intervalList[chapter].intervals = SortedList.create();
            for (index = 0; index < unions.length; ++index) {
                totalViewed += unions[index][1] - unions[index][0];
                intervalList[chapter].intervals.insertOne(unions[index]);
            }
        }
        else {
            for (index = 0; index < unions.length; ++index) {
                totalViewed += unions[index][1] - unions[index][0];
            }
            intervalList[chapter].intervals.remove(checkIntervalPosition);
        }
        if (typeof player.metadata.chapters_attributes[chapter].video_attributes
            .length_in_milliseconds === 'number') {
            totalViewed =
                (totalViewed /
                    player.metadata.chapters_attributes[chapter].video_attributes
                        .length_in_milliseconds) *
                    100000;
        }
        else {
            totalViewed =
                (totalViewed /
                    player.metadata.chapters_attributes[chapter].video_attributes
                        .length_in_seconds) *
                    100;
        }
        if (Math.round(totalViewed) >= intervalList[chapter].thresholds[0]) {
            return cb({
                chapter: chapter,
                event: intervalList[chapter].thresholds.shift(),
                player: player,
            });
        }
    }
    var onTimeUpdate = function (time) {
        // On chapter switches, timeupdate might be called with the time from the previous chapter, so we require
        // two time updates from the same chapter before we start computing progress
        var tempChapter = player.getCurrentChapter();
        if (currentChpater !== tempChapter) {
            currentChpater = tempChapter;
            return;
        }
        computeProgress(time, callback);
    };
    var onBeforeSeek = function (time) {
        var chapter = player.getCurrentChapter();
        // on Safari beforeSeek can fire before play ¯\_(ツ)_/¯
        if (typeof intervalList[chapter] === 'undefined') {
            return;
        }
        if (lock === false) {
            intervalList[chapter].interval[1] = time.start;
        }
        lock = true;
    };
    var onPlay = function (time) {
        var currTime = time;
        var chapter = player.getCurrentChapter();
        if (typeof intervalList[chapter] === 'undefined') {
            setupChapter();
        }
        intervalList[chapter].intervals.insertOne(intervalList[chapter].interval.slice(0));
        intervalList[chapter].interval[0] = currTime;
        intervalList[chapter].interval[1] = currTime;
        lock = false;
    };
    var onChapterComplete = function (chapter) {
        intervalList[chapter].interval = [0, 0];
        lock = false;
    };
    player.on('timeupdate', onTimeUpdate);
    player.on('beforeSeek', onBeforeSeek);
    player.on('play', onPlay);
    player.on('chapterComplete', onChapterComplete);
    return {
        player: player,
        removeEventListeners: function () {
            player.off('beforeSeek', onBeforeSeek);
            player.off('chapterComplete', onChapterComplete);
            player.off('play', onPlay);
            player.off('timeupdate', onTimeUpdate);
            player = null;
            intervalList = [];
        },
    };
}

// CONCATENATED MODULE: ./src/api/progress-events-wrapper.ts



// Initialize analytics for each player when called
function progressEvents(callback, thresholds, singlePlayerScope) {
    var _a;
    if (thresholds === void 0) { thresholds = [1, 25, 50, 75, 90]; }
    var removeEventListeners = [];
    var players = singlePlayerScope
        ? (_a = {}, _a[singlePlayerScope.uuid] = singlePlayerScope, _a) : getPlayers();
    // Sort and unique the array in case we are passed an unusual array of thresholds
    var dedupedThresholds = removeDuplicates(thresholds);
    var _loop_1 = function (uuid) {
        if (players.hasOwnProperty(uuid) && uuid.length > 0 && players[uuid] !== '') {
            // set the listener
            var removeCb = setEventListeners(players[uuid], callback, dedupedThresholds);
            removeEventListeners.push(removeCb);
        }
        else {
            embed_helpers_log(function () {
                return console.error("Could not attach Progress Events to player " + uuid + ", make sure to load the Vidyard Player API");
            });
        }
    };
    for (var uuid in players) {
        _loop_1(uuid);
    }
    if (removeEventListeners.length === 0) {
        embed_helpers_log(function () {
            return console.warn('No Vidyard Players found. (include this script below player embed codes)');
        });
    }
    return removeEventListeners;
}
function getPlayers() {
    try {
        return SecureWindow.Vidyard.players();
    }
    catch (e) {
        embed_helpers_log(function () {
            return console.error('The Vidyard Player API must be loaded before this script can execute');
        });
        return {};
    }
}
function progressEventsWrapper() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var subscriptions = progressEvents.apply(void 0, args);
    Object.keys(subscriptions).forEach(function (k) {
        var _a = subscriptions[k], player = _a.player, removeEventListeners = _a.removeEventListeners;
        if (player.progressEventsUnsubscribe) {
            player.progressEventsUnsubscribe.push(removeEventListeners);
        }
    });
}

// CONCATENATED MODULE: ./src/api/render-player.ts






// TODO: change Promise<any> to Promise<Player> once we have a proper type for it
var renderPlayerFromPlaceholder = function (image) {
    logger.setLevel('placeholder')('rendering player from placeholder image');
    var player = renderPlayer(image);
    // resolve when the player is ready, unless the player is a lightbox
    return new promise(function (res) {
        if (player.showLightbox) {
            res(player);
        }
        else {
            player.on('ready', function () { return res(player); });
        }
    });
};
function render_player_renderPlayer(options) {
    // TODO: instead of creating an image make render.renderPlayer work with an options objects
    var placeholder = options instanceof HTMLImageElement ? options : createPlaceholder(options);
    return loadPlaceholder(placeholder)
        .then(renderPlayerFromPlaceholder)
        .catch(function (e) { return embed_helpers_log(messages.errors.placeholder, 'warn'); });
}

// CONCATENATED MODULE: ./src/api/vidyard-v4-global.ts










var vidyardV4Global = {
    _debug: api_debug,
    api: {
        GDPR: { consent: consent, hasConsentOnReady: hasConsentOnReady },
        addReadyListener: addReadyListener,
        destroyPlayer: destroyPlayer,
        getPlayerMetadata: getPlayerMetadata,
        getPlayersByUUID: get_players_by_uuid,
        progressEvents: progressEventsWrapper,
        renderDOMPlayers: sweepDocument,
        renderPlayer: render_player_renderPlayer,
    },
    integrations: new IntegrationsWatcher(),
    jsonp: {},
    // Just ensure that the undefined uuid option is always present
    playerReadyListeners: { undefined: [] },
    players: [],
    preloadLinks: [],
};
/* harmony default export */ var vidyard_v4_global = (vidyardV4Global);

// CONCATENATED MODULE: ./src/api/vidyard-global.ts
var vidyardGlobal = {
    _players: {},
    players: function () {
        return SecureWindow.VidyardV4.players.reduce(function (acc, player) {
            acc[player.uuid] = player;
            return acc;
        }, {});
    },
};
/* harmony default export */ var vidyard_global = (vidyardGlobal);

// EXTERNAL MODULE: ./src/css/style.css
var css_style = __webpack_require__(11);

// EXTERNAL MODULE: /drone/src/github.com/Vidyard/vidyard-player-sdk/node_modules/error-stack-parser/error-stack-parser.js
var error_stack_parser = __webpack_require__(1);

// CONCATENATED MODULE: ./src/utils/error-report.ts


// based on the Rollbar API
// https://docs.rollbar.com/v1.0.0/reference#section-data-format<Paste>
function createErrorReport(_a) {
    var error = _a.error, location = _a.location, message = _a.message, navigator = _a.navigator, timeStamp = _a.timeStamp, type = _a.type, vyGlobal = _a.vyGlobal;
    return {
        data: {
            // Required: body
            // The main data being sent. It can either be a message, an exception, or a crash report.
            body: {
                // If this payload is a single exception, use "trace"
                // A list of stack frames, ordered such that the most recent call is last in the list.
                trace: {
                    // Required: exception
                    // An object describing the exception instance.
                    exception: {
                        // Required: class
                        // The exception class name.
                        class: error.name,
                        // Optional: message
                        // The exception message, as a string
                        message: message,
                    },
                    // Each frame is an object.
                    frames: error_stack_parser["parse"](error).map(function (frame) { return ({
                        // Optional: code
                        // The line of code
                        code: frame.source,
                        // Optional: colno
                        // The column number as an integer
                        colno: frame.columnNumber,
                        // Required: filename
                        // The filename including its full path.
                        filename: frame.fileName,
                        // Optional: colno
                        // The column number as an integer
                        lineno: frame.lineNumber,
                        // Optional: method
                        // The method or function name
                        method: frame.functionName,
                    }); }),
                },
            },
            // Optional: client
            // Data about the client device this event occurred on.
            // As there can be multiple client environments for a given event (i.e. Flash running inside
            // an HTML page), data should be namespaced by platform.
            client: {
                // Can contain any arbitrary keys. Rollbar understands the following:
                // Optional: cpu
                // A string up to 255 characters
                cpu: navigator.platform,
                javascript: {
                    // Optional: browser
                    // The user agent string
                    browser: navigator.userAgent,
                    // Optional: guess_uncaught_frames
                    // Set to true to enable frame guessing
                    // See the "Source Maps" guide for more details.
                    guess_uncaught_frames: true,
                    // Optional: source_map_enabled
                    // Set to true to enable source map deobfuscation
                    // See the "Source Maps" guide for more details.
                    source_map_enabled: true,
                },
            },
            // Optional: code_version
            // A string, up to 40 characters, describing the version of the application code
            // Rollbar understands these formats:
            // - semantic version (i.e. "2.1.12")
            // - integer (i.e. "45")
            // - git SHA (i.e. "3da541559918a808c2402bba5012f6c60b27661c")
            code_version: VERSION,
            // Optional: custom
            // Any arbitrary metadata you want to send. "custom" itself should be an object.
            custom: {
                jsonpRequests: Object.keys(vyGlobal.jsonp),
                playbackUrlOverride: SecureWindow.VIDYARD_PLAYBACK_URL,
                players: vyGlobal.players.map(function (player) { return ({
                    iframe: player.iframe ? { src: player.iframe.src } : {},
                    metadata: player.metadata,
                    org: player.org
                        ? { id: player.org.id, foundIntegrations: player.org.foundIntegrations }
                        : {},
                    uuid: player.uuid,
                }); }),
                preloadLinks: vyGlobal.preloadLinks,
            },
            // Required: environment
            // The name of the environment in which this occurrence was seen.
            // A string up to 255 characters. For best results, use "production" or "prod" for your
            // production environment.
            // You don't need to configure anything in the Rollbar UI for new environment names;
            // we'll detect them automatically.
            environment: getPlaybackURL(),
            // Optional: fingerprint
            // A string controlling how this occurrence should be grouped. Occurrences with the same
            // fingerprint are grouped together. See the "Grouping" guide for more information.
            // Should be a string up to 40 characters long; if longer than 40 characters, we'll use its SHA1 hash.
            // If omitted, we'll determine this on the backend.
            fingerprint: error.name,
            // Optional: language
            // The name of the language your code is written in.
            // This can affect the order of the frames in the stack trace. The following languages set the most
            // recent call first - 'ruby', 'javascript', 'php', 'java', 'objective-c', 'lua'
            // It will also change the way the individual frames are displayed, with what is most consistent with
            // users of the language.
            language: 'javascript',
            // Optional: level
            // The severity level. One of: "critical", "error", "warning", "info", "debug"
            // Defaults to "error" for exceptions and "info" for messages.
            // The level of the *first* occurrence of an item is used as the item's level.
            level: type,
            // Optional: platform
            // The platform on which this occurred. Meaningful platform names:
            // "browser", "android", "ios", "flash", "client", "heroku", "google-app-engine"
            // If this is a client-side event, be sure to specify the platform and use a post_client_item access token.
            platform: 'browser',
            // Optional: request
            // Data about the request this event occurred in.
            // Can contain any arbitrary keys. Rollbar understands the following:
            // query_string: the raw query string
            // url: full URL where this event occurred
            request: { query_string: location.search, url: location.href },
            // Optional: timestamp
            // When this occurred, as a unix timestamp.
            timestamp: timeStamp,
        },
    };
}

// CONCATENATED MODULE: ./src/utils/error-logger.ts



var vyError = function (source) {
    if (source === void 0) { source = ''; }
    return source.match(ERROR_ORIGIN_RE);
};
var errorHandler = function (_a) {
    var error = _a.error, filename = _a.filename, message = _a.message, timeStamp = _a.timeStamp, type = _a.type;
    if (vyError(filename)) {
        var location_1 = SecureWindow.location, navigator_1 = SecureWindow.navigator, vyGlobal = SecureWindow.VidyardV4;
        var payload = createErrorReport({
            error: error,
            location: location_1,
            message: message,
            navigator: navigator_1,
            timeStamp: timeStamp,
            type: type,
            vyGlobal: vyGlobal,
        });
        xhrRequest({ endpoint: getErrorURL(), method: 'POST', payload: payload }).then(function (res) { return embed_helpers_log("Error logged " + res); }, function (e) { return embed_helpers_log("Error log failed " + e); });
    }
};
function logErrors() {
    addListener('error', 'onerror', errorHandler, window);
    addListener('unhandledrejection', '', function (e) {
        var error = e.reason, timeStamp = e.timeStamp, type = e.type;
        if (e.reason instanceof Error && vyError(error.stack)) {
            // prevent errors in the console
            e.preventDefault();
            errorHandler({
                error: error,
                // PromiseRejectionEvents do not have a filename field
                // the workaround is to look for the v4.js script in the stack trace
                filename: error.stack,
                message: error.message,
                timeStamp: timeStamp,
                type: type,
            });
        }
    });
}

// CONCATENATED MODULE: ./src/index.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_debug", function() { return _debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return index_module_api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "players", function() { return index_module_players; });





// --- Runs on script execution ---
logErrors();
// Bind legacy globals
SecureWindow.VidyardV4 = SecureWindow.VidyardV4 || vidyard_v4_global;
SecureWindow.Vidyard = SecureWindow.Vidyard || vidyard_global;
dispatch_ready();
var _debug = vidyard_v4_global._debug, index_module_api = vidyard_v4_global.api, index_module_players = vidyard_v4_global.players;
// Export the public API

/* harmony default export */ var index_module = __webpack_exports__["default"] = (vidyard_v4_global);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && SecureWindow.location;

  if (!location) {
    throw new Error("fixUrls requires SecureWindow.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && Document.all && !SecureWindow.atob;
});

var getTarget = function (target) {
  return this.template.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return Securethis.template.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (SecureWindow.HTMLIFrameElement && styleTarget instanceof SecureWindow.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = Document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = Document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = Document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(Document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".vidyard-player-container .play-button{position:absolute;width:16%;height:auto;border-radius:50%;border:none;cursor:pointer;opacity:.65;filter:alpha(opacity = 65);transition:opacity .2s linear;overflow:hidden;font-size:0;padding:0;min-width:20px;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-appearance:initial!important;-moz-appearance:initial!important;appearance:initial!important}.vidyard-player-container .play-button .play-button-size{padding-top:100%;width:100%}.vidyard-player-container .play-button .arrow-size{position:absolute;top:50%;left:50%;width:35%;height:auto;margin:-25% 0 0 -12%;overflow:hidden}.vidyard-player-container .play-button .arrow-size-ratio{padding-top:150%;width:100%}.vidyard-player-container .play-button .arrow{position:absolute;top:50%;left:auto;right:0;bottom:auto;width:0;height:0;margin:-200px 0 -200px -300px;border:200px solid transparent;border-left:300px solid #fff;border-right:none}.vidyard-lightbox-thumbnail:hover .play-button{opacity:1;filter:alpha(opacity = 100);zoom:1}.vidyard-player-container{position:relative;height:100%;text-align:center}.vidyard-player-container img{height:100%}.vidyard-player-container .play-button{display:none}.vidyard-close-container{position:fixed;right:20px;top:20px;height:34px;width:34px;cursor:pointer;z-index:1000}.vidyard-close-container:focus{outline:1px dotted grey}.vidyard-close-x{position:absolute;height:100%;width:100%;color:#fff;font-size:2em;text-align:center;line-height:34px}.vidyard-close-x:hover{color:#ddd}.vidyard-close-x:hover:after,.vidyard-close-x:hover:before{background:#ddd}.vidyard-close-x:after,.vidyard-close-x:before{content:\"\";position:absolute;background:#fff;display:block;left:50%;top:50%;height:65%;width:2px;transition:all .2s;-ms-high-contrast-adjust:none}.vidyard-close-x:before{transform:translate(-50%,-50%) rotate(45deg);-ms-transform:translate(-50%,-50%) rotate(45deg)}.vidyard-close-x:after{transform:translate(-50%,-50%) rotate(-45deg);-ms-transform:translate(-50%,-50%) rotate(-45deg)}.vidyard-close-x.simple-close:after,.vidyard-close-x.simple-close:before{display:none}.vidyard-lightbox-thumbnail{width:100%;height:100%;margin:auto}.vidyard-lightbox-image{height:100%;left:0;position:absolute;top:0;width:100%}.vidyard-lightbox-centering{cursor:pointer;height:0;max-width:100%;overflow:hidden;padding-bottom:56.25%;position:relative}.vidyard-lightbox-content-backer{-webkit-transform:opacity 1s,filter 1s;-ms-transform:opacity 1s,filter 1s;transition:opacity 1s,filter 1s;background-color:#000;height:100%;width:100%;position:absolute}#vidyard-overlay-wrapper,.vidyard-lightbox-content-backer{filter:alpha(opacity = 0);opacity:0;top:0;right:0;bottom:0;left:0}#vidyard-overlay-wrapper{position:relative;box-sizing:border-box;display:none;transition:opacity .5s,filter .5s}#vidyard-overlay{top:0;right:0;bottom:0;left:0;opacity:.9;filter:alpha(opacity = 90);width:100%;height:100%;background-color:#000;z-index:800}#vidyard-content-fixed,#vidyard-overlay{position:fixed;box-sizing:border-box;display:none}#vidyard-content-fixed{opacity:1;z-index:900;text-align:center;top:5%;right:5%;bottom:5%;left:5%;width:90%}#vidyard-popbox{display:inline-block;position:absolute;left:50%;top:50%;-webit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#vidyard-popbox-constraint{opacity:0;filter:alpha(opacity = 0);display:block;visibility:hidden}#vidyard-popbox-constraint.landscape{height:90vh}#vidyard-popbox-constraint.portrait{width:90vw}.vidyard-player-container div[class^=vidyard-iframe-]{z-index:1}.vidyard-player-container div[class^=vidyard-div-]{background-repeat:no-repeat;background-position:0 50%;background-size:100%}img.vidyard-player-embed{width:100%}img.vidyard-player-embed.inserted{position:absolute;top:0;left:0;z-index:0;max-width:100%!important}.vidyard-player-container.playlist-open{padding-right:319px;width:auto!important}.vidyard-player-container.playlist-open div[class^=vidyard-div-]{width:calc(100% + 319px);max-width:calc(100% + 319px)!important;background-size:calc(100% - 319px);background-color:#f5f9ff}.vidyard-player-container.playlist-open div[class^=vidyard-div-] img.vidyard-player-embed{width:calc(100% - 319px)!important}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(8)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/SecureWindow.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the Document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(13)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(14);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ })
/******/ ]);
});