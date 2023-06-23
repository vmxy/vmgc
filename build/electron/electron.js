/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 487:
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 1012:
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 520:
/***/ ((module) => {

"use strict";


function padWithZeros(vNumber, width) {
  var numAsString = vNumber.toString();
  while (numAsString.length < width) {
    numAsString = "0" + numAsString;
  }
  return numAsString;
}

function addZero(vNumber) {
  return padWithZeros(vNumber, 2);
}

/**
 * Formats the TimeOffset
 * Thanks to http://www.svendtofte.com/code/date_format/
 * @private
 */
function offset(timezoneOffset) {
  var os = Math.abs(timezoneOffset);
  var h = String(Math.floor(os / 60));
  var m = String(os % 60);
  h = ("0" + h).slice(-2);
  m = ("0" + m).slice(-2);
  return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h + ":" + m;
}

function asString(format, date) {
  if (typeof format !== "string") {
    date = format;
    format = module.exports.ISO8601_FORMAT;
  }
  if (!date) {
    date = module.exports.now();
  }

  // Issue # 14 - Per ISO8601 standard, the time string should be local time
  // with timezone info.
  // See https://en.wikipedia.org/wiki/ISO_8601 section "Time offsets from UTC"

  var vDay = addZero(date.getDate());
  var vMonth = addZero(date.getMonth() + 1);
  var vYearLong = addZero(date.getFullYear());
  var vYearShort = addZero(vYearLong.substring(2, 4));
  var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
  var vHour = addZero(date.getHours());
  var vMinute = addZero(date.getMinutes());
  var vSecond = addZero(date.getSeconds());
  var vMillisecond = padWithZeros(date.getMilliseconds(), 3);
  var vTimeZone = offset(date.getTimezoneOffset());
  var formatted = format
    .replace(/dd/g, vDay)
    .replace(/MM/g, vMonth)
    .replace(/y{1,4}/g, vYear)
    .replace(/hh/g, vHour)
    .replace(/mm/g, vMinute)
    .replace(/ss/g, vSecond)
    .replace(/SSS/g, vMillisecond)
    .replace(/O/g, vTimeZone);
  return formatted;
}

function setDatePart(date, part, value, local) {
  date['set' + (local ? '' : 'UTC') + part](value);
}

function extractDateParts(pattern, str, missingValuesDate) {
  // Javascript Date object doesn't support custom timezone.  Sets all felds as
  // GMT based to begin with.  If the timezone offset is provided, then adjust
  // it using provided timezone, otherwise, adjust it with the system timezone.
  var local = pattern.indexOf('O') < 0;
  var monthOverflow = false;
  var matchers = [
    {
      pattern: /y{1,4}/,
      regexp: "\\d{1,4}",
      fn: function(date, value) {
        setDatePart(date, 'FullYear', value, local);
      }
    },
    {
      pattern: /MM/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        setDatePart(date, 'Month', (value - 1), local);
        if (date.getMonth() !== (value - 1)) {
          // in the event of 31 May --> 31 Feb --> 3 Mar
          // this is correct behavior if no Date is involved
          monthOverflow = true;
        }
      }
    },
    {
      pattern: /dd/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        // in the event of 31 May --> 31 Feb --> 3 Mar
        // reset Mar back to Feb, before setting the Date
        if (monthOverflow) {
          setDatePart(date, 'Month', (date.getMonth() - 1), local);
        }
        setDatePart(date, 'Date', value, local);
      }
    },
    {
      pattern: /hh/,
      regexp: "\\d{1,2}",
      fn: function(date, value) {
        setDatePart(date, 'Hours', value, local);
      }
    },
    {
      pattern: /mm/,
      regexp: "\\d\\d",
      fn: function(date, value) {
        setDatePart(date, 'Minutes', value, local);
      }
    },
    {
      pattern: /ss/,
      regexp: "\\d\\d",
      fn: function(date, value) {
        setDatePart(date, 'Seconds', value, local);
      }
    },
    {
      pattern: /SSS/,
      regexp: "\\d\\d\\d",
      fn: function(date, value) {
        setDatePart(date, 'Milliseconds', value, local);
      }
    },
    {
      pattern: /O/,
      regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
      fn: function(date, value) {
        if (value === "Z") {
          value = 0;
        }
        else {
          value = value.replace(":", "");
        }
        var offset = Math.abs(value);
        var timezoneOffset = (value > 0 ? -1 :  1 ) * ((offset % 100) + Math.floor(offset / 100) * 60);
        // Per ISO8601 standard: UTC = local time - offset
        //
        // For example, 2000-01-01T01:00:00-0700
        //   local time: 2000-01-01T01:00:00
        //   ==> UTC   : 2000-01-01T08:00:00 ( 01 - (-7) = 8 )
        //
        // To make it even more confusing, the date.getTimezoneOffset() is
        // opposite sign of offset string in the ISO8601 standard.  So if offset
        // is '-0700' the getTimezoneOffset() would be (+)420. The line above
        // calculates timezoneOffset to matche Javascript's behavior.
        //
        // The date/time of the input is actually the local time, so the date
        // object that was constructed is actually local time even thought the
        // UTC setters are used.  This means the date object's internal UTC
        // representation was wrong.  It needs to be fixed by substracting the
        // offset (or adding the offset minutes as they are opposite sign).
        //
        // Note: the time zone has to be processed after all other fields are
        // set.  The result would be incorrect if the offset was calculated
        // first then overriden by the other filed setters.
        date.setUTCMinutes(date.getUTCMinutes() + timezoneOffset);
      }
    }
  ];

  var parsedPattern = matchers.reduce(
    function(p, m) {
      if (m.pattern.test(p.regexp)) {
        m.index = p.regexp.match(m.pattern).index;
        p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
      } else {
        m.index = -1;
      }
      return p;
    },
    { regexp: pattern, index: [] }
  );

  var dateFns = matchers.filter(function(m) {
    return m.index > -1;
  });
  dateFns.sort(function(a, b) {
    return a.index - b.index;
  });

  var matcher = new RegExp(parsedPattern.regexp);
  var matches = matcher.exec(str);
  if (matches) {
    var date = missingValuesDate || module.exports.now();
    dateFns.forEach(function(f, i) {
      f.fn(date, matches[i + 1]);
    });

    return date;
  }

  throw new Error(
    "String '" + str + "' could not be parsed as '" + pattern + "'"
  );
}

function parse(pattern, str, missingValuesDate) {
  if (!pattern) {
    throw new Error("pattern must be supplied");
  }

  return extractDateParts(pattern, str, missingValuesDate);
}

/**
 * Used for testing - replace this function with a fixed date.
 */
function now() {
  return new Date();
}

module.exports = asString;
module.exports.asString = asString;
module.exports.parse = parse;
module.exports.now = now;
module.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
module.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
module.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";


/***/ }),

/***/ 1227:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(2447)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(7824);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 5158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(1227);
} else {
	module.exports = __webpack_require__(39);
}


/***/ }),

/***/ 39:
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(6224);
const util = __webpack_require__(3837);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(2130);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(2447)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 6458:
/***/ ((module) => {

"use strict";


module.exports = clone

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__
}

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),

/***/ 77:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(7147)
var polyfills = __webpack_require__(2161)
var legacy = __webpack_require__(8520)
var clone = __webpack_require__(6458)

var util = __webpack_require__(3837)

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue
var previousSymbol

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue')
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous')
} else {
  gracefulQueue = '___graceful-fs.queue'
  previousSymbol = '___graceful-fs.previous'
}

function noop () {}

function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  })
}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

// Once time initialization
if (!fs[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue = global[gracefulQueue] || []
  publishQueue(fs, queue)

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          resetQueue()
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments)
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    })
    return close
  })(fs.close)

  fs.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs, arguments)
      resetQueue()
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    })
    return closeSync
  })(fs.closeSync)

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs[gracefulQueue])
      __webpack_require__(9491).equal(fs[gracefulQueue].length, 0)
    })
  }
}

if (!global[gracefulQueue]) {
  publishQueue(global, fs[gracefulQueue]);
}

module.exports = patch(clone(fs))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module.exports = patch(fs)
    fs.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch

  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb, startTime) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb, startTime) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb, startTime) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$copyFile = fs.copyFile
  if (fs$copyFile)
    fs.copyFile = copyFile
  function copyFile (src, dest, flags, cb) {
    if (typeof flags === 'function') {
      cb = flags
      flags = 0
    }
    return go$copyFile(src, dest, flags, cb)

    function go$copyFile (src, dest, flags, cb, startTime) {
      return fs$copyFile(src, dest, flags, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  var noReaddirOptionVersions = /^v[0-5]\./
  function readdir (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    var go$readdir = noReaddirOptionVersions.test(process.version)
      ? function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }
      : function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, options, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }

    return go$readdir(path, options, cb)

    function fs$readdirCallback (path, options, cb, startTime) {
      return function (err, files) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([
            go$readdir,
            [path, options, cb],
            err,
            startTime || Date.now(),
            Date.now()
          ])
        else {
          if (files && files.sort)
            files.sort()

          if (typeof cb === 'function')
            cb.call(this, err, files)
        }
      }
    }
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype)
    ReadStream.prototype.open = ReadStream$open
  }

  var fs$WriteStream = fs.WriteStream
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype)
    WriteStream.prototype.open = WriteStream$open
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  // legacy names
  var FileReadStream = ReadStream
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val
    },
    enumerable: true,
    configurable: true
  })
  var FileWriteStream = WriteStream
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val
    },
    enumerable: true,
    configurable: true
  })

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb, startTime) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  fs[gracefulQueue].push(elem)
  retry()
}

// keep track of the timeout between retry() calls
var retryTimer

// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function resetQueue () {
  var now = Date.now()
  for (var i = 0; i < fs[gracefulQueue].length; ++i) {
    // entries that are only a length of 2 are from an older version, don't
    // bother modifying those since they'll be retried anyway.
    if (fs[gracefulQueue][i].length > 2) {
      fs[gracefulQueue][i][3] = now // startTime
      fs[gracefulQueue][i][4] = now // lastTime
    }
  }
  // call retry to make sure we're actively processing the queue
  retry()
}

function retry () {
  // clear the timer and remove it to help prevent unintended concurrency
  clearTimeout(retryTimer)
  retryTimer = undefined

  if (fs[gracefulQueue].length === 0)
    return

  var elem = fs[gracefulQueue].shift()
  var fn = elem[0]
  var args = elem[1]
  // these items may be unset if they were added by an older graceful-fs
  var err = elem[2]
  var startTime = elem[3]
  var lastTime = elem[4]

  // if we don't have a startTime we have no way of knowing if we've waited
  // long enough, so go ahead and retry this item now
  if (startTime === undefined) {
    debug('RETRY', fn.name, args)
    fn.apply(null, args)
  } else if (Date.now() - startTime >= 60000) {
    // it's been more than 60 seconds total, bail now
    debug('TIMEOUT', fn.name, args)
    var cb = args.pop()
    if (typeof cb === 'function')
      cb.call(null, err)
  } else {
    // the amount of time between the last attempt and right now
    var sinceAttempt = Date.now() - lastTime
    // the amount of time between when we first tried, and when we last tried
    // rounded up to at least 1
    var sinceStart = Math.max(lastTime - startTime, 1)
    // backoff. wait longer than the total time we've been retrying, but only
    // up to a maximum of 100ms
    var desiredDelay = Math.min(sinceStart * 1.2, 100)
    // it's been long enough since the last retry, do it again
    if (sinceAttempt >= desiredDelay) {
      debug('RETRY', fn.name, args)
      fn.apply(null, args.concat([startTime]))
    } else {
      // if we can't do this job yet, push it to the end of the queue
      // and let the next iteration check again
      fs[gracefulQueue].push(elem)
    }
  }

  // schedule our next run if one isn't already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(retry, 0)
  }
}


/***/ }),

/***/ 8520:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stream = (__webpack_require__(2781).Stream)

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),

/***/ 2161:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constants = __webpack_require__(2057)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

// This check is needed until node.js 12 is required
if (typeof process.chdir === 'function') {
  var chdir = process.chdir
  process.chdir = function (d) {
    cwd = null
    chdir.call(process, d)
  }
  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (fs.chmod && !fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (fs.chown && !fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = typeof fs.rename !== 'function' ? fs.rename
    : (function (fs$rename) {
      function rename (from, to, cb) {
        var start = Date.now()
        var backoff = 0;
        fs$rename(from, to, function CB (er) {
          if (er
              && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY")
              && Date.now() - start < 60000) {
            setTimeout(function() {
              fs.stat(to, function (stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from, to, CB);
                else
                  cb(er)
              })
            }, backoff)
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb) cb(er)
        })
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename)
      return rename
    })(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = typeof fs.read !== 'function' ? fs.read
  : (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments)
        }
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read)
    return read
  })(fs.read)

  fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync
  : (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants.O_WRONLY | constants.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err)
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2)
          })
        })
      })
    }

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true
      var ret
      try {
        ret = fs.fchmodSync(fd, mode)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }
  }

  function patchLutimes (fs) {
    if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er)
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2)
            })
          })
        })
      }

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants.O_SYMLINK)
        var ret
        var threw = true
        try {
          ret = fs.futimesSync(fd, at, mt)
          threw = false
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd)
            } catch (er) {}
          } else {
            fs.closeSync(fd)
          }
        }
        return ret
      }

    } else if (fs.futimes) {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
      fs.lutimesSync = function () {}
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null
        if (cb) cb.apply(this, arguments)
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000
          if (stats.gid < 0) stats.gid += 0x100000000
        }
        if (cb) cb.apply(this, arguments)
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target)
      if (stats) {
        if (stats.uid < 0) stats.uid += 0x100000000
        if (stats.gid < 0) stats.gid += 0x100000000
      }
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}


/***/ }),

/***/ 6560:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 8738:
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 4421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_getLocationKeys"] }] */

const flatted = __webpack_require__(939);
const levels = __webpack_require__(1935);

class SerDe {
  constructor() {
    const deserialise = {
      __LOG4JS_undefined__: undefined,
      __LOG4JS_NaN__: Number('abc'),
      __LOG4JS_Infinity__: 1 / 0,
      '__LOG4JS_-Infinity__': -1 / 0,
    };
    this.deMap = deserialise;
    this.serMap = {};
    Object.keys(this.deMap).forEach((key) => {
      const value = this.deMap[key];
      this.serMap[value] = key;
    });
  }

  canSerialise(key) {
    if (typeof key === 'string') return false;
    return key in this.serMap;
  }

  serialise(key) {
    if (this.canSerialise(key)) return this.serMap[key];
    return key;
  }

  canDeserialise(key) {
    return key in this.deMap;
  }

  deserialise(key) {
    if (this.canDeserialise(key)) return this.deMap[key];
    return key;
  }
}
const serde = new SerDe();

/**
 * @name LoggingEvent
 * @namespace Log4js
 */
class LoggingEvent {
  /**
   * Models a logging event.
   * @constructor
   * @param {string} categoryName name of category
   * @param {Log4js.Level} level level of message
   * @param {Array} data objects to log
   * @param {Error} [error]
   * @author Seth Chisamore
   */
  constructor(categoryName, level, data, context, location, error) {
    this.startTime = new Date();
    this.categoryName = categoryName;
    this.data = data;
    this.level = level;
    this.context = Object.assign({}, context); // eslint-disable-line prefer-object-spread
    this.pid = process.pid;
    this.error = error;

    if (typeof location !== 'undefined') {
      if (!location || typeof location !== 'object' || Array.isArray(location))
        throw new TypeError(
          'Invalid location type passed to LoggingEvent constructor'
        );

      this.constructor._getLocationKeys().forEach((key) => {
        if (typeof location[key] !== 'undefined') this[key] = location[key];
      });
    }
  }

  /** @private */
  static _getLocationKeys() {
    return [
      'fileName',
      'lineNumber',
      'columnNumber',
      'callStack',
      'className',
      'functionName',
      'functionAlias',
      'callerName',
    ];
  }

  serialise() {
    return flatted.stringify(this, (key, value) => {
      // JSON.stringify(new Error('test')) returns {}, which is not really useful for us.
      // The following allows us to serialize errors (semi) correctly.
      if (value instanceof Error) {
        // eslint-disable-next-line prefer-object-spread
        value = Object.assign(
          { message: value.message, stack: value.stack },
          value
        );
      }
      // JSON.stringify({a: Number('abc'), b: 1/0, c: -1/0}) returns {a: null, b: null, c: null}.
      // The following allows us to serialize to NaN, Infinity and -Infinity correctly.
      // JSON.stringify([undefined]) returns [null].
      // The following allows us to serialize to undefined correctly.
      return serde.serialise(value);
    });
  }

  static deserialise(serialised) {
    let event;
    try {
      const rehydratedEvent = flatted.parse(serialised, (key, value) => {
        if (value && value.message && value.stack) {
          const fakeError = new Error(value);
          Object.keys(value).forEach((k) => {
            fakeError[k] = value[k];
          });
          value = fakeError;
        }
        return serde.deserialise(value);
      });
      this._getLocationKeys().forEach((key) => {
        if (typeof rehydratedEvent[key] !== 'undefined') {
          if (!rehydratedEvent.location) rehydratedEvent.location = {};
          rehydratedEvent.location[key] = rehydratedEvent[key];
        }
      });
      event = new LoggingEvent(
        rehydratedEvent.categoryName,
        levels.getLevel(rehydratedEvent.level.levelStr),
        rehydratedEvent.data,
        rehydratedEvent.context,
        rehydratedEvent.location,
        rehydratedEvent.error
      );
      event.startTime = new Date(rehydratedEvent.startTime);
      event.pid = rehydratedEvent.pid;
      if (rehydratedEvent.cluster) {
        event.cluster = rehydratedEvent.cluster;
      }
    } catch (e) {
      event = new LoggingEvent('log4js', levels.ERROR, [
        'Unable to parse log:',
        serialised,
        'because: ',
        e,
      ]);
    }

    return event;
  }
}

module.exports = LoggingEvent;


/***/ }),

/***/ 6889:
/***/ ((module) => {

function maxFileSizeUnitTransform(maxLogSize) {
  if (typeof maxLogSize === 'number' && Number.isInteger(maxLogSize)) {
    return maxLogSize;
  }

  const units = {
    K: 1024,
    M: 1024 * 1024,
    G: 1024 * 1024 * 1024,
  };
  const validUnit = Object.keys(units);
  const unit = maxLogSize.slice(-1).toLocaleUpperCase();
  const value = maxLogSize.slice(0, -1).trim();

  if (validUnit.indexOf(unit) < 0 || !Number.isInteger(Number(value))) {
    throw Error(`maxLogSize: "${maxLogSize}" is invalid`);
  } else {
    return value * units[unit];
  }
}

function adapter(configAdapter, config) {
  const newConfig = Object.assign({}, config); // eslint-disable-line prefer-object-spread
  Object.keys(configAdapter).forEach((key) => {
    if (newConfig[key]) {
      newConfig[key] = configAdapter[key](config[key]);
    }
  });
  return newConfig;
}

function fileAppenderAdapter(config) {
  const configAdapter = {
    maxLogSize: maxFileSizeUnitTransform,
  };
  return adapter(configAdapter, config);
}

const adapters = {
  dateFile: fileAppenderAdapter,
  file: fileAppenderAdapter,
  fileSync: fileAppenderAdapter,
};

module.exports.modifyConfig = (config) =>
  adapters[config.type] ? adapters[config.type](config) : config;


/***/ }),

/***/ 6028:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:categoryFilter');

function categoryFilter(excludes, appender) {
  if (typeof excludes === 'string') excludes = [excludes];
  return (logEvent) => {
    debug(`Checking ${logEvent.categoryName} against ${excludes}`);
    if (excludes.indexOf(logEvent.categoryName) === -1) {
      debug('Not excluded, sending to appender');
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender) {
  const appender = findAppender(config.appender);
  return categoryFilter(config.exclude, appender);
}

module.exports.configure = configure;


/***/ }),

/***/ 6713:
/***/ ((module) => {

// eslint-disable-next-line no-console
const consoleLog = console.log.bind(console);

function consoleAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    consoleLog(layout(loggingEvent, timezoneOffset));
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return consoleAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;


/***/ }),

/***/ 8501:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const streams = __webpack_require__(6929);
const os = __webpack_require__(2037);

const eol = os.EOL;

function openTheStream(filename, pattern, options) {
  const stream = new streams.DateRollingFileStream(filename, pattern, options);
  stream.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(
      'log4js.dateFileAppender - Writing to file %s, error happened ',
      filename,
      err
    );
  });
  stream.on('drain', () => {
    process.emit('log4js:pause', false);
  });
  return stream;
}

/**
 * File appender that rolls files according to a date pattern.
 * @param filename base filename.
 * @param pattern the format that will be added to the end of filename when rolling,
 *          also used to check when to roll files - defaults to '.yyyy-MM-dd'
 * @param layout layout function for log messages - defaults to basicLayout
 * @param options - options to be passed to the underlying stream
 * @param timezoneOffset - optional timezone offset in minutes (default system local)
 */
function appender(filename, pattern, layout, options, timezoneOffset) {
  // the options for file appender use maxLogSize, but the docs say any file appender
  // options should work for dateFile as well.
  options.maxSize = options.maxLogSize;

  const writer = openTheStream(filename, pattern, options);

  const app = function (logEvent) {
    if (!writer.writable) {
      return;
    }
    if (!writer.write(layout(logEvent, timezoneOffset) + eol, 'utf8')) {
      process.emit('log4js:pause', true);
    }
  };

  app.shutdown = function (complete) {
    writer.end('', 'utf-8', complete);
  };

  return app;
}

function configure(config, layouts) {
  let layout = layouts.basicLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  if (!config.alwaysIncludePattern) {
    config.alwaysIncludePattern = false;
  }

  // security default (instead of relying on streamroller default)
  config.mode = config.mode || 0o600;

  return appender(
    config.filename,
    config.pattern,
    layout,
    config,
    config.timezoneOffset
  );
}

module.exports.configure = configure;


/***/ }),

/***/ 5992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:file');
const path = __webpack_require__(1017);
const streams = __webpack_require__(6929);
const os = __webpack_require__(2037);

const eol = os.EOL;

let mainSighupListenerStarted = false;
const sighupListeners = new Set();
function mainSighupHandler() {
  sighupListeners.forEach((app) => {
    app.sighupHandler();
  });
}

/**
 * File Appender writing the logs to a text file. Supports rolling of logs by size.
 *
 * @param file the file log messages will be written to
 * @param layout a function that takes a logEvent and returns a string
 *   (defaults to basicLayout).
 * @param logSize - the maximum size (in bytes) for a log file,
 *   if not provided then logs won't be rotated.
 * @param numBackups - the number of log files to keep after logSize
 *   has been reached (default 5)
 * @param options - options to be passed to the underlying stream
 * @param timezoneOffset - optional timezone offset in minutes (default system local)
 */
function fileAppender(
  file,
  layout,
  logSize,
  numBackups,
  options,
  timezoneOffset
) {
  if (typeof file !== 'string' || file.length === 0) {
    throw new Error(`Invalid filename: ${file}`);
  } else if (file.endsWith(path.sep)) {
    throw new Error(`Filename is a directory: ${file}`);
  } else if (file.indexOf(`~${path.sep}`) === 0) {
    // handle ~ expansion: https://github.com/nodejs/node/issues/684
    // exclude ~ and ~filename as these can be valid files
    file = file.replace('~', os.homedir());
  }
  file = path.normalize(file);
  numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;

  debug(
    'Creating file appender (',
    file,
    ', ',
    logSize,
    ', ',
    numBackups,
    ', ',
    options,
    ', ',
    timezoneOffset,
    ')'
  );

  function openTheStream(filePath, fileSize, numFiles, opt) {
    const stream = new streams.RollingFileStream(
      filePath,
      fileSize,
      numFiles,
      opt
    );
    stream.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(
        'log4js.fileAppender - Writing to file %s, error happened ',
        filePath,
        err
      );
    });
    stream.on('drain', () => {
      process.emit('log4js:pause', false);
    });
    return stream;
  }

  let writer = openTheStream(file, logSize, numBackups, options);

  const app = function (loggingEvent) {
    if (!writer.writable) {
      return;
    }
    if (options.removeColor === true) {
      // eslint-disable-next-line no-control-regex
      const regex = /\x1b[[0-9;]*m/g;
      loggingEvent.data = loggingEvent.data.map((d) => {
        if (typeof d === 'string') return d.replace(regex, '');
        return d;
      });
    }
    if (!writer.write(layout(loggingEvent, timezoneOffset) + eol, 'utf8')) {
      process.emit('log4js:pause', true);
    }
  };

  app.reopen = function () {
    writer.end(() => {
      writer = openTheStream(file, logSize, numBackups, options);
    });
  };

  app.sighupHandler = function () {
    debug('SIGHUP handler called.');
    app.reopen();
  };

  app.shutdown = function (complete) {
    sighupListeners.delete(app);
    if (sighupListeners.size === 0 && mainSighupListenerStarted) {
      process.removeListener('SIGHUP', mainSighupHandler);
      mainSighupListenerStarted = false;
    }
    writer.end('', 'utf-8', complete);
  };

  // On SIGHUP, close and reopen all files. This allows this appender to work with
  // logrotate. Note that if you are using logrotate, you should not set
  // `logSize`.
  sighupListeners.add(app);
  if (!mainSighupListenerStarted) {
    process.on('SIGHUP', mainSighupHandler);
    mainSighupListenerStarted = true;
  }

  return app;
}

function configure(config, layouts) {
  let layout = layouts.basicLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  // security default (instead of relying on streamroller default)
  config.mode = config.mode || 0o600;

  return fileAppender(
    config.filename,
    layout,
    config.maxLogSize,
    config.backups,
    config,
    config.timezoneOffset
  );
}

module.exports.configure = configure;


/***/ }),

/***/ 6566:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:fileSync');
const path = __webpack_require__(1017);
const fs = __webpack_require__(7147);
const os = __webpack_require__(2037);

const eol = os.EOL;

function touchFile(file, options) {
  // attempt to create the directory
  const mkdir = (dir) => {
    try {
      return fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      // backward-compatible fs.mkdirSync for nodejs pre-10.12.0 (without recursive option)
      // recursive creation of parent first
      if (e.code === 'ENOENT') {
        mkdir(path.dirname(dir));
        return mkdir(dir);
      }

      // throw error for all except EEXIST and EROFS (read-only filesystem)
      if (e.code !== 'EEXIST' && e.code !== 'EROFS') {
        throw e;
      }

      // EEXIST: throw if file and not directory
      // EROFS : throw if directory not found
      else {
        try {
          if (fs.statSync(dir).isDirectory()) {
            return dir;
          }
          throw e;
        } catch (err) {
          throw e;
        }
      }
    }
  };
  mkdir(path.dirname(file));

  // try to throw EISDIR, EROFS, EACCES
  fs.appendFileSync(file, '', { mode: options.mode, flag: options.flags });
}

class RollingFileSync {
  constructor(filename, maxLogSize, backups, options) {
    debug('In RollingFileStream');

    if (maxLogSize < 0) {
      throw new Error(`maxLogSize (${maxLogSize}) should be > 0`);
    }

    this.filename = filename;
    this.size = maxLogSize;
    this.backups = backups;
    this.options = options;
    this.currentSize = 0;

    function currentFileSize(file) {
      let fileSize = 0;

      try {
        fileSize = fs.statSync(file).size;
      } catch (e) {
        // file does not exist
        touchFile(file, options);
      }
      return fileSize;
    }

    this.currentSize = currentFileSize(this.filename);
  }

  shouldRoll() {
    debug(
      'should roll with current size %d, and max size %d',
      this.currentSize,
      this.size
    );
    return this.currentSize >= this.size;
  }

  roll(filename) {
    const that = this;
    const nameMatcher = new RegExp(`^${path.basename(filename)}`);

    function justTheseFiles(item) {
      return nameMatcher.test(item);
    }

    function index(filename_) {
      return (
        parseInt(filename_.slice(`${path.basename(filename)}.`.length), 10) || 0
      );
    }

    function byIndex(a, b) {
      return index(a) - index(b);
    }

    function increaseFileIndex(fileToRename) {
      const idx = index(fileToRename);
      debug(`Index of ${fileToRename} is ${idx}`);
      if (that.backups === 0) {
        fs.truncateSync(filename, 0);
      } else if (idx < that.backups) {
        // on windows, you can get a EEXIST error if you rename a file to an existing file
        // so, we'll try to delete the file we're renaming to first
        try {
          fs.unlinkSync(`${filename}.${idx + 1}`);
        } catch (e) {
          // ignore err: if we could not delete, it's most likely that it doesn't exist
        }

        debug(`Renaming ${fileToRename} -> ${filename}.${idx + 1}`);
        fs.renameSync(
          path.join(path.dirname(filename), fileToRename),
          `${filename}.${idx + 1}`
        );
      }
    }

    function renameTheFiles() {
      // roll the backups (rename file.n to file.n+1, where n <= numBackups)
      debug('Renaming the old files');

      const files = fs.readdirSync(path.dirname(filename));
      files
        .filter(justTheseFiles)
        .sort(byIndex)
        .reverse()
        .forEach(increaseFileIndex);
    }

    debug('Rolling, rolling, rolling');
    renameTheFiles();
  }

  // eslint-disable-next-line no-unused-vars
  write(chunk, encoding) {
    const that = this;

    function writeTheChunk() {
      debug('writing the chunk to the file');
      that.currentSize += chunk.length;
      fs.appendFileSync(that.filename, chunk);
    }

    debug('in write');

    if (this.shouldRoll()) {
      this.currentSize = 0;
      this.roll(this.filename);
    }

    writeTheChunk();
  }
}

/**
 * File Appender writing the logs to a text file. Supports rolling of logs by size.
 *
 * @param file the file log messages will be written to
 * @param layout a function that takes a logevent and returns a string
 *   (defaults to basicLayout).
 * @param logSize - the maximum size (in bytes) for a log file,
 *   if not provided then logs won't be rotated.
 * @param numBackups - the number of log files to keep after logSize
 *   has been reached (default 5)
 * @param options - options to be passed to the underlying stream
 * @param timezoneOffset - optional timezone offset in minutes (default system local)
 */
function fileAppender(
  file,
  layout,
  logSize,
  numBackups,
  options,
  timezoneOffset
) {
  if (typeof file !== 'string' || file.length === 0) {
    throw new Error(`Invalid filename: ${file}`);
  } else if (file.endsWith(path.sep)) {
    throw new Error(`Filename is a directory: ${file}`);
  } else if (file.indexOf(`~${path.sep}`) === 0) {
    // handle ~ expansion: https://github.com/nodejs/node/issues/684
    // exclude ~ and ~filename as these can be valid files
    file = file.replace('~', os.homedir());
  }
  file = path.normalize(file);
  numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;

  debug(
    'Creating fileSync appender (',
    file,
    ', ',
    logSize,
    ', ',
    numBackups,
    ', ',
    options,
    ', ',
    timezoneOffset,
    ')'
  );

  function openTheStream(filePath, fileSize, numFiles) {
    let stream;

    if (fileSize) {
      stream = new RollingFileSync(filePath, fileSize, numFiles, options);
    } else {
      stream = ((f) => {
        // touch the file to apply flags (like w to truncate the file)
        touchFile(f, options);

        return {
          write(data) {
            fs.appendFileSync(f, data);
          },
        };
      })(filePath);
    }

    return stream;
  }

  const logFile = openTheStream(file, logSize, numBackups);

  return (loggingEvent) => {
    logFile.write(layout(loggingEvent, timezoneOffset) + eol);
  };
}

function configure(config, layouts) {
  let layout = layouts.basicLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  const options = {
    flags: config.flags || 'a',
    encoding: config.encoding || 'utf8',
    mode: config.mode || 0o600,
  };

  return fileAppender(
    config.filename,
    layout,
    config.maxLogSize,
    config.backups,
    options,
    config.timezoneOffset
  );
}

module.exports.configure = configure;


/***/ }),

/***/ 3530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const path = __webpack_require__(1017);
const debug = __webpack_require__(5158)('log4js:appenders');
const configuration = __webpack_require__(3338);
const clustering = __webpack_require__(5885);
const levels = __webpack_require__(1935);
const layouts = __webpack_require__(1219);
const adapters = __webpack_require__(6889);

// pre-load the core appenders so that webpack can find them
const coreAppenders = new Map();
coreAppenders.set('console', __webpack_require__(6713));
coreAppenders.set('stdout', __webpack_require__(2489));
coreAppenders.set('stderr', __webpack_require__(9545));
coreAppenders.set('logLevelFilter', __webpack_require__(2861));
coreAppenders.set('categoryFilter', __webpack_require__(6028));
coreAppenders.set('noLogFilter', __webpack_require__(4029));
coreAppenders.set('file', __webpack_require__(5992));
coreAppenders.set('dateFile', __webpack_require__(8501));
coreAppenders.set('fileSync', __webpack_require__(6566));
coreAppenders.set('tcp', __webpack_require__(2383));

const appenders = new Map();

const tryLoading = (modulePath, config) => {
  let resolvedPath;
  try {
    const modulePathCJS = `${modulePath}.cjs`;
    resolvedPath = /*require.resolve*/(__webpack_require__(2213).resolve(modulePathCJS));
    debug('Loading module from ', modulePathCJS);
  } catch (e) {
    resolvedPath = modulePath;
    debug('Loading module from ', modulePath);
  }
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return __webpack_require__(2213)(resolvedPath);
  } catch (e) {
    // if the module was found, and we still got an error, then raise it
    configuration.throwExceptionIf(
      config,
      e.code !== 'MODULE_NOT_FOUND',
      `appender "${modulePath}" could not be loaded (error was: ${e})`
    );
    return undefined;
  }
};

const loadAppenderModule = (type, config) =>
  coreAppenders.get(type) ||
  tryLoading(`./${type}`, config) ||
  tryLoading(type, config) ||
  (__webpack_require__.c[__webpack_require__.s] &&
    __webpack_require__.c[__webpack_require__.s].filename &&
    tryLoading(path.join(path.dirname(__webpack_require__.c[__webpack_require__.s].filename), type), config)) ||
  tryLoading(path.join(process.cwd(), type), config);

const appendersLoading = new Set();

const getAppender = (name, config) => {
  if (appenders.has(name)) return appenders.get(name);
  if (!config.appenders[name]) return false;
  if (appendersLoading.has(name))
    throw new Error(`Dependency loop detected for appender ${name}.`);
  appendersLoading.add(name);

  debug(`Creating appender ${name}`);
  // eslint-disable-next-line no-use-before-define
  const appender = createAppender(name, config);
  appendersLoading.delete(name);
  appenders.set(name, appender);
  return appender;
};

const createAppender = (name, config) => {
  const appenderConfig = config.appenders[name];
  const appenderModule = appenderConfig.type.configure
    ? appenderConfig.type
    : loadAppenderModule(appenderConfig.type, config);
  configuration.throwExceptionIf(
    config,
    configuration.not(appenderModule),
    `appender "${name}" is not valid (type "${appenderConfig.type}" could not be found)`
  );
  if (appenderModule.appender) {
    process.emitWarning(
      `Appender ${appenderConfig.type} exports an appender function.`,
      'DeprecationWarning',
      'log4js-node-DEP0001'
    );
    debug(
      '[log4js-node-DEP0001]',
      `DEPRECATION: Appender ${appenderConfig.type} exports an appender function.`
    );
  }
  if (appenderModule.shutdown) {
    process.emitWarning(
      `Appender ${appenderConfig.type} exports a shutdown function.`,
      'DeprecationWarning',
      'log4js-node-DEP0002'
    );
    debug(
      '[log4js-node-DEP0002]',
      `DEPRECATION: Appender ${appenderConfig.type} exports a shutdown function.`
    );
  }

  debug(`${name}: clustering.isMaster ? ${clustering.isMaster()}`);
  debug(
    // eslint-disable-next-line global-require
    `${name}: appenderModule is ${(__webpack_require__(3837).inspect)(appenderModule)}`
  );
  return clustering.onlyOnMaster(
    () => {
      debug(
        `calling appenderModule.configure for ${name} / ${appenderConfig.type}`
      );
      return appenderModule.configure(
        adapters.modifyConfig(appenderConfig),
        layouts,
        (appender) => getAppender(appender, config),
        levels
      );
    },
    /* istanbul ignore next: fn never gets called by non-master yet needed to pass config validation */ () => {}
  );
};

const setup = (config) => {
  appenders.clear();
  appendersLoading.clear();
  if (!config) {
    return;
  }

  const usedAppenders = [];
  Object.values(config.categories).forEach((category) => {
    usedAppenders.push(...category.appenders);
  });
  Object.keys(config.appenders).forEach((name) => {
    // dodgy hard-coding of special case for tcp-server and multiprocess which may not have
    // any categories associated with it, but needs to be started up anyway
    if (
      usedAppenders.includes(name) ||
      config.appenders[name].type === 'tcp-server' ||
      config.appenders[name].type === 'multiprocess'
    ) {
      getAppender(name, config);
    }
  });
};

const init = () => {
  setup();
};
init();

configuration.addListener((config) => {
  configuration.throwExceptionIf(
    config,
    configuration.not(configuration.anObject(config.appenders)),
    'must have a property "appenders" of type object.'
  );
  const appenderNames = Object.keys(config.appenders);
  configuration.throwExceptionIf(
    config,
    configuration.not(appenderNames.length),
    'must define at least one appender.'
  );

  appenderNames.forEach((name) => {
    configuration.throwExceptionIf(
      config,
      configuration.not(config.appenders[name].type),
      `appender "${name}" is not valid (must be an object with property "type")`
    );
  });
});

configuration.addListener(setup);

module.exports = appenders;
module.exports.init = init;


/***/ }),

/***/ 2861:
/***/ ((module) => {

function logLevelFilter(minLevelString, maxLevelString, appender, levels) {
  const minLevel = levels.getLevel(minLevelString);
  const maxLevel = levels.getLevel(maxLevelString, levels.FATAL);
  return (logEvent) => {
    const eventLevel = logEvent.level;
    if (
      minLevel.isLessThanOrEqualTo(eventLevel) &&
      maxLevel.isGreaterThanOrEqualTo(eventLevel)
    ) {
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender, levels) {
  const appender = findAppender(config.appender);
  return logLevelFilter(config.level, config.maxLevel, appender, levels);
}

module.exports.configure = configure;


/***/ }),

/***/ 4029:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:noLogFilter');

/**
 * The function removes empty or null regexp from the array
 * @param {string[]} regexp
 * @returns {string[]} a filtered string array with not empty or null regexp
 */
function removeNullOrEmptyRegexp(regexp) {
  const filtered = regexp.filter((el) => el != null && el !== '');
  return filtered;
}

/**
 * Returns a function that will exclude the events in case they match
 * with the regular expressions provided
 * @param {(string|string[])} filters contains the regexp that will be used for the evaluation
 * @param {*} appender
 * @returns {function}
 */
function noLogFilter(filters, appender) {
  return (logEvent) => {
    debug(`Checking data: ${logEvent.data} against filters: ${filters}`);
    if (typeof filters === 'string') {
      filters = [filters];
    }
    filters = removeNullOrEmptyRegexp(filters);
    const regex = new RegExp(filters.join('|'), 'i');
    if (
      filters.length === 0 ||
      logEvent.data.findIndex((value) => regex.test(value)) < 0
    ) {
      debug('Not excluded, sending to appender');
      appender(logEvent);
    }
  };
}

function configure(config, layouts, findAppender) {
  const appender = findAppender(config.appender);
  return noLogFilter(config.exclude, appender);
}

module.exports.configure = configure;


/***/ }),

/***/ 2344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:recording');

const recordedEvents = [];

function configure() {
  return function (logEvent) {
    debug(
      `received logEvent, number of events now ${recordedEvents.length + 1}`
    );
    debug('log event was ', logEvent);
    recordedEvents.push(logEvent);
  };
}

function replay() {
  return recordedEvents.slice();
}

function reset() {
  recordedEvents.length = 0;
}

module.exports = {
  configure,
  replay,
  playback: replay,
  reset,
  erase: reset,
};


/***/ }),

/***/ 9545:
/***/ ((module) => {

function stderrAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    process.stderr.write(`${layout(loggingEvent, timezoneOffset)}\n`);
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return stderrAppender(layout, config.timezoneOffset);
}

module.exports.configure = configure;


/***/ }),

/***/ 2489:
/***/ ((__unused_webpack_module, exports) => {

function stdoutAppender(layout, timezoneOffset) {
  return (loggingEvent) => {
    process.stdout.write(`${layout(loggingEvent, timezoneOffset)}\n`);
  };
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return stdoutAppender(layout, config.timezoneOffset);
}

exports.configure = configure;


/***/ }),

/***/ 2383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:tcp');
const net = __webpack_require__(1808);

function appender(config, layout) {
  let canWrite = false;
  const buffer = [];
  let socket;
  let shutdownAttempts = 3;
  let endMsg = '__LOG4JS__';

  function write(loggingEvent) {
    debug('Writing log event to socket');
    canWrite = socket.write(`${layout(loggingEvent)}${endMsg}`, 'utf8');
  }

  function emptyBuffer() {
    let evt;
    debug('emptying buffer');
    while ((evt = buffer.shift())) {
      write(evt);
    }
  }

  function createSocket() {
    debug(
      `appender creating socket to ${config.host || 'localhost'}:${
        config.port || 5000
      }`
    );
    endMsg = `${config.endMsg || '__LOG4JS__'}`;
    socket = net.createConnection(
      config.port || 5000,
      config.host || 'localhost'
    );
    socket.on('connect', () => {
      debug('socket connected');
      emptyBuffer();
      canWrite = true;
    });
    socket.on('drain', () => {
      debug('drain event received, emptying buffer');
      canWrite = true;
      emptyBuffer();
    });
    socket.on('timeout', socket.end.bind(socket));
    socket.on('error', (e) => {
      debug('connection error', e);
      canWrite = false;
      emptyBuffer();
    });
    socket.on('close', createSocket);
  }

  createSocket();

  function log(loggingEvent) {
    if (canWrite) {
      write(loggingEvent);
    } else {
      debug('buffering log event because it cannot write at the moment');
      buffer.push(loggingEvent);
    }
  }

  log.shutdown = function (cb) {
    debug('shutdown called');
    if (buffer.length && shutdownAttempts) {
      debug('buffer has items, waiting 100ms to empty');
      shutdownAttempts -= 1;
      setTimeout(() => {
        log.shutdown(cb);
      }, 100);
    } else {
      socket.removeAllListeners('close');
      socket.end(cb);
    }
  };
  return log;
}

function configure(config, layouts) {
  debug(`configure with config = ${config}`);
  let layout = function (loggingEvent) {
    return loggingEvent.serialise();
  };
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return appender(config, layout);
}

module.exports.configure = configure;


/***/ }),

/***/ 2213:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 2213;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 3785:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:categories');
const configuration = __webpack_require__(3338);
const levels = __webpack_require__(1935);
const appenders = __webpack_require__(3530);

const categories = new Map();

/**
 * Add inherited config to this category.  That includes extra appenders from parent,
 * and level, if none is set on this category.
 * This is recursive, so each parent also gets loaded with inherited appenders.
 * Inheritance is blocked if a category has inherit=false
 * @param  {*} config
 * @param  {*} category the child category
 * @param  {string} categoryName dotted path to category
 * @return {void}
 */
function inheritFromParent(config, category, categoryName) {
  if (category.inherit === false) return;
  const lastDotIndex = categoryName.lastIndexOf('.');
  if (lastDotIndex < 0) return; // category is not a child
  const parentCategoryName = categoryName.slice(0, lastDotIndex);
  let parentCategory = config.categories[parentCategoryName];

  if (!parentCategory) {
    // parent is missing, so implicitly create it, so that it can inherit from its parents
    parentCategory = { inherit: true, appenders: [] };
  }

  // make sure parent has had its inheritance taken care of before pulling its properties to this child
  inheritFromParent(config, parentCategory, parentCategoryName);

  // if the parent is not in the config (because we just created it above),
  // and it inherited a valid configuration, add it to config.categories
  if (
    !config.categories[parentCategoryName] &&
    parentCategory.appenders &&
    parentCategory.appenders.length &&
    parentCategory.level
  ) {
    config.categories[parentCategoryName] = parentCategory;
  }

  category.appenders = category.appenders || [];
  category.level = category.level || parentCategory.level;

  // merge in appenders from parent (parent is already holding its inherited appenders)
  parentCategory.appenders.forEach((ap) => {
    if (!category.appenders.includes(ap)) {
      category.appenders.push(ap);
    }
  });
  category.parent = parentCategory;
}

/**
 * Walk all categories in the config, and pull down any configuration from parent to child.
 * This includes inherited appenders, and level, where level is not set.
 * Inheritance is skipped where a category has inherit=false.
 * @param  {*} config
 */
function addCategoryInheritance(config) {
  if (!config.categories) return;
  const categoryNames = Object.keys(config.categories);
  categoryNames.forEach((name) => {
    const category = config.categories[name];
    // add inherited appenders and level to this category
    inheritFromParent(config, category, name);
  });
}

configuration.addPreProcessingListener((config) =>
  addCategoryInheritance(config)
);

configuration.addListener((config) => {
  configuration.throwExceptionIf(
    config,
    configuration.not(configuration.anObject(config.categories)),
    'must have a property "categories" of type object.'
  );

  const categoryNames = Object.keys(config.categories);
  configuration.throwExceptionIf(
    config,
    configuration.not(categoryNames.length),
    'must define at least one category.'
  );

  categoryNames.forEach((name) => {
    const category = config.categories[name];
    configuration.throwExceptionIf(
      config,
      [
        configuration.not(category.appenders),
        configuration.not(category.level),
      ],
      `category "${name}" is not valid (must be an object with properties "appenders" and "level")`
    );

    configuration.throwExceptionIf(
      config,
      configuration.not(Array.isArray(category.appenders)),
      `category "${name}" is not valid (appenders must be an array of appender names)`
    );

    configuration.throwExceptionIf(
      config,
      configuration.not(category.appenders.length),
      `category "${name}" is not valid (appenders must contain at least one appender name)`
    );

    if (Object.prototype.hasOwnProperty.call(category, 'enableCallStack')) {
      configuration.throwExceptionIf(
        config,
        typeof category.enableCallStack !== 'boolean',
        `category "${name}" is not valid (enableCallStack must be boolean type)`
      );
    }

    category.appenders.forEach((appender) => {
      configuration.throwExceptionIf(
        config,
        configuration.not(appenders.get(appender)),
        `category "${name}" is not valid (appender "${appender}" is not defined)`
      );
    });

    configuration.throwExceptionIf(
      config,
      configuration.not(levels.getLevel(category.level)),
      `category "${name}" is not valid (level "${category.level}" not recognised;` +
        ` valid levels are ${levels.levels.join(', ')})`
    );
  });

  configuration.throwExceptionIf(
    config,
    configuration.not(config.categories.default),
    'must define a "default" category.'
  );
});

const setup = (config) => {
  categories.clear();
  if (!config) {
    return;
  }

  const categoryNames = Object.keys(config.categories);
  categoryNames.forEach((name) => {
    const category = config.categories[name];
    const categoryAppenders = [];
    category.appenders.forEach((appender) => {
      categoryAppenders.push(appenders.get(appender));
      debug(`Creating category ${name}`);
      categories.set(name, {
        appenders: categoryAppenders,
        level: levels.getLevel(category.level),
        enableCallStack: category.enableCallStack || false,
      });
    });
  });
};

const init = () => {
  setup();
};
init();

configuration.addListener(setup);

const configForCategory = (category) => {
  debug(`configForCategory: searching for config for ${category}`);
  if (categories.has(category)) {
    debug(`configForCategory: ${category} exists in config, returning it`);
    return categories.get(category);
  }

  let sourceCategoryConfig;
  if (category.indexOf('.') > 0) {
    debug(`configForCategory: ${category} has hierarchy, cloning from parents`);
    sourceCategoryConfig = {
      ...configForCategory(category.slice(0, category.lastIndexOf('.'))),
    };
  } else {
    if (!categories.has('default')) {
      setup({ categories: { default: { appenders: ['out'], level: 'OFF' } } });
    }
    debug('configForCategory: cloning default category');
    sourceCategoryConfig = { ...categories.get('default') };
  }
  categories.set(category, sourceCategoryConfig);
  return sourceCategoryConfig;
};

const appendersForCategory = (category) =>
  configForCategory(category).appenders;

const getLevelForCategory = (category) => configForCategory(category).level;
const setLevelForCategory = (category, level) => {
  configForCategory(category).level = level;
};

const getEnableCallStackForCategory = (category) =>
  configForCategory(category).enableCallStack === true;
const setEnableCallStackForCategory = (category, useCallStack) => {
  configForCategory(category).enableCallStack = useCallStack;
};

module.exports = categories;
module.exports = Object.assign(module.exports, {
  appendersForCategory,
  getLevelForCategory,
  setLevelForCategory,
  getEnableCallStackForCategory,
  setEnableCallStackForCategory,
  init,
});


/***/ }),

/***/ 5885:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('log4js:clustering');
const LoggingEvent = __webpack_require__(4421);
const configuration = __webpack_require__(3338);

let disabled = false;
let cluster = null;
try {
  // eslint-disable-next-line global-require
  cluster = __webpack_require__(5001);
} catch (e) {
  debug('cluster module not present');
  disabled = true;
}

const listeners = [];

let pm2 = false;
let pm2InstanceVar = 'NODE_APP_INSTANCE';

const isPM2Master = () => pm2 && process.env[pm2InstanceVar] === '0';
const isMaster = () =>
  disabled || (cluster && cluster.isMaster) || isPM2Master();

const sendToListeners = (logEvent) => {
  listeners.forEach((l) => l(logEvent));
};

// in a multi-process node environment, worker loggers will use
// process.send
const receiver = (worker, message) => {
  // prior to node v6, the worker parameter was not passed (args were message, handle)
  debug('cluster message received from worker ', worker, ': ', message);
  if (worker.topic && worker.data) {
    message = worker;
    worker = undefined;
  }
  if (message && message.topic && message.topic === 'log4js:message') {
    debug('received message: ', message.data);
    const logEvent = LoggingEvent.deserialise(message.data);
    sendToListeners(logEvent);
  }
};

if (!disabled) {
  configuration.addListener((config) => {
    // clear out the listeners, because configure has been called.
    listeners.length = 0;

    ({
      pm2,
      disableClustering: disabled,
      pm2InstanceVar = 'NODE_APP_INSTANCE',
    } = config);

    debug(`clustering disabled ? ${disabled}`);
    debug(`cluster.isMaster ? ${cluster && cluster.isMaster}`);
    debug(`pm2 enabled ? ${pm2}`);
    debug(`pm2InstanceVar = ${pm2InstanceVar}`);
    debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);

    // just in case configure is called after shutdown
    if (pm2) {
      process.removeListener('message', receiver);
    }
    if (cluster && cluster.removeListener) {
      cluster.removeListener('message', receiver);
    }

    if (disabled || config.disableClustering) {
      debug('Not listening for cluster messages, because clustering disabled.');
    } else if (isPM2Master()) {
      // PM2 cluster support
      // PM2 runs everything as workers - install pm2-intercom for this to work.
      // we only want one of the app instances to write logs
      debug('listening for PM2 broadcast messages');
      process.on('message', receiver);
    } else if (cluster && cluster.isMaster) {
      debug('listening for cluster messages');
      cluster.on('message', receiver);
    } else {
      debug('not listening for messages, because we are not a master process');
    }
  });
}

module.exports = {
  onlyOnMaster: (fn, notMaster) => (isMaster() ? fn() : notMaster),
  isMaster,
  send: (msg) => {
    if (isMaster()) {
      sendToListeners(msg);
    } else {
      if (!pm2) {
        msg.cluster = {
          workerId: cluster.worker.id,
          worker: process.pid,
        };
      }
      process.send({ topic: 'log4js:message', data: msg.serialise() });
    }
  },
  onMessage: (listener) => {
    listeners.push(listener);
  },
};


/***/ }),

/***/ 3338:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const util = __webpack_require__(3837);
const debug = __webpack_require__(5158)('log4js:configuration');

const preProcessingListeners = [];
const listeners = [];

const not = (thing) => !thing;

const anObject = (thing) =>
  thing && typeof thing === 'object' && !Array.isArray(thing);

const validIdentifier = (thing) => /^[A-Za-z][A-Za-z0-9_]*$/g.test(thing);

const anInteger = (thing) =>
  thing && typeof thing === 'number' && Number.isInteger(thing);

const addListener = (fn) => {
  listeners.push(fn);
  debug(`Added listener, now ${listeners.length} listeners`);
};

const addPreProcessingListener = (fn) => {
  preProcessingListeners.push(fn);
  debug(
    `Added pre-processing listener, now ${preProcessingListeners.length} listeners`
  );
};

const throwExceptionIf = (config, checks, message) => {
  const tests = Array.isArray(checks) ? checks : [checks];
  tests.forEach((test) => {
    if (test) {
      throw new Error(
        `Problem with log4js configuration: (${util.inspect(config, {
          depth: 5,
        })}) - ${message}`
      );
    }
  });
};

const configure = (candidate) => {
  debug('New configuration to be validated: ', candidate);
  throwExceptionIf(candidate, not(anObject(candidate)), 'must be an object.');

  debug(`Calling pre-processing listeners (${preProcessingListeners.length})`);
  preProcessingListeners.forEach((listener) => listener(candidate));
  debug('Configuration pre-processing finished.');

  debug(`Calling configuration listeners (${listeners.length})`);
  listeners.forEach((listener) => listener(candidate));
  debug('Configuration finished.');
};

module.exports = {
  configure,
  addListener,
  addPreProcessingListener,
  throwExceptionIf,
  anObject,
  anInteger,
  validIdentifier,
  not,
};


/***/ }),

/***/ 198:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-underscore-dangle: ["error", { "allow": ["__statusCode", "_remoteAddress", "__headers", "_logging"] }] */

const levels = __webpack_require__(1935);

const DEFAULT_FORMAT =
  ':remote-addr - -' +
  ' ":method :url HTTP/:http-version"' +
  ' :status :content-length ":referrer"' +
  ' ":user-agent"';

/**
 * Return request url path,
 * adding this function prevents the Cyclomatic Complexity,
 * for the assemble_tokens function at low, to pass the tests.
 *
 * @param  {IncomingMessage} req
 * @return {string}
 * @api private
 */
function getUrl(req) {
  return req.originalUrl || req.url;
}

/**
 * Adds custom {token, replacement} objects to defaults,
 * overwriting the defaults if any tokens clash
 *
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {Array} customTokens
 *    [{ token: string-or-regexp, replacement: string-or-replace-function }]
 * @return {Array}
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        // not === because token can be regexp object
        // eslint-disable-next-line eqeqeq
        if (a[i].token == a[j].token) {
          a.splice(j--, 1); // eslint-disable-line no-plusplus
        }
      }
    }
    return a;
  };

  const defaultTokens = [];
  defaultTokens.push({ token: ':url', replacement: getUrl(req) });
  defaultTokens.push({ token: ':protocol', replacement: req.protocol });
  defaultTokens.push({ token: ':hostname', replacement: req.hostname });
  defaultTokens.push({ token: ':method', replacement: req.method });
  defaultTokens.push({
    token: ':status',
    replacement: res.__statusCode || res.statusCode,
  });
  defaultTokens.push({
    token: ':response-time',
    replacement: res.responseTime,
  });
  defaultTokens.push({ token: ':date', replacement: new Date().toUTCString() });
  defaultTokens.push({
    token: ':referrer',
    replacement: req.headers.referer || req.headers.referrer || '',
  });
  defaultTokens.push({
    token: ':http-version',
    replacement: `${req.httpVersionMajor}.${req.httpVersionMinor}`,
  });
  defaultTokens.push({
    token: ':remote-addr',
    replacement:
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req._remoteAddress ||
      (req.socket &&
        (req.socket.remoteAddress ||
          (req.socket.socket && req.socket.socket.remoteAddress))),
  });
  defaultTokens.push({
    token: ':user-agent',
    replacement: req.headers['user-agent'],
  });
  defaultTokens.push({
    token: ':content-length',
    replacement:
      res.getHeader('content-length') ||
      (res.__headers && res.__headers['Content-Length']) ||
      '-',
  });
  defaultTokens.push({
    token: /:req\[([^\]]+)]/g,
    replacement(_, field) {
      return req.headers[field.toLowerCase()];
    },
  });
  defaultTokens.push({
    token: /:res\[([^\]]+)]/g,
    replacement(_, field) {
      return (
        res.getHeader(field.toLowerCase()) ||
        (res.__headers && res.__headers[field])
      );
    },
  });

  return arrayUniqueTokens(customTokens.concat(defaultTokens));
}

/**
 * Return formatted log line.
 *
 * @param  {string} str
 * @param {Array} tokens
 * @return {string}
 * @api private
 */
function format(str, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    str = str.replace(tokens[i].token, tokens[i].replacement);
  }
  return str;
}

/**
 * Return RegExp Object about nolog
 *
 * @param  {(string|Array)} nolog
 * @return {RegExp}
 * @api private
 *
 * syntax
 *  1. String
 *   1.1 "\\.gif"
 *         NOT LOGGING http://example.com/hoge.gif and http://example.com/hoge.gif?fuga
 *         LOGGING http://example.com/hoge.agif
 *   1.2 in "\\.gif|\\.jpg$"
 *         NOT LOGGING http://example.com/hoge.gif and
 *           http://example.com/hoge.gif?fuga and http://example.com/hoge.jpg?fuga
 *         LOGGING http://example.com/hoge.agif,
 *           http://example.com/hoge.ajpg and http://example.com/hoge.jpg?hoge
 *   1.3 in "\\.(gif|jpe?g|png)$"
 *         NOT LOGGING http://example.com/hoge.gif and http://example.com/hoge.jpeg
 *         LOGGING http://example.com/hoge.gif?uid=2 and http://example.com/hoge.jpg?pid=3
 *  2. RegExp
 *   2.1 in /\.(gif|jpe?g|png)$/
 *         SAME AS 1.3
 *  3. Array
 *   3.1 ["\\.jpg$", "\\.png", "\\.gif"]
 *         SAME AS "\\.jpg|\\.png|\\.gif"
 */
function createNoLogCondition(nolog) {
  let regexp = null;

  if (nolog instanceof RegExp) {
    regexp = nolog;
  }

  if (typeof nolog === 'string') {
    regexp = new RegExp(nolog);
  }

  if (Array.isArray(nolog)) {
    // convert to strings
    const regexpsAsStrings = nolog.map((reg) =>
      reg.source ? reg.source : reg
    );
    regexp = new RegExp(regexpsAsStrings.join('|'));
  }

  return regexp;
}

/**
 * Allows users to define rules around status codes to assign them to a specific
 * logging level.
 * There are two types of rules:
 *   - RANGE: matches a code within a certain range
 *     E.g. { 'from': 200, 'to': 299, 'level': 'info' }
 *   - CONTAINS: matches a code to a set of expected codes
 *     E.g. { 'codes': [200, 203], 'level': 'debug' }
 * Note*: Rules are respected only in order of prescendence.
 *
 * @param {Number} statusCode
 * @param {Level} currentLevel
 * @param {Object} ruleSet
 * @return {Level}
 * @api private
 */
function matchRules(statusCode, currentLevel, ruleSet) {
  let level = currentLevel;

  if (ruleSet) {
    const matchedRule = ruleSet.find((rule) => {
      let ruleMatched = false;
      if (rule.from && rule.to) {
        ruleMatched = statusCode >= rule.from && statusCode <= rule.to;
      } else {
        ruleMatched = rule.codes.indexOf(statusCode) !== -1;
      }
      return ruleMatched;
    });
    if (matchedRule) {
      level = levels.getLevel(matchedRule.level, level);
    }
  }
  return level;
}

/**
 * Log requests with the given `options` or a `format` string.
 *
 * Options:
 *
 *   - `format`        Format string, see below for tokens
 *   - `level`         A log4js levels instance. Supports also 'auto'
 *   - `nolog`         A string or RegExp to exclude target logs or function(req, res): boolean
 *   - `statusRules`   A array of rules for setting specific logging levels base on status codes
 *   - `context`       Whether to add a response of express to the context
 *
 * Tokens:
 *
 *   - `:req[header]` ex: `:req[Accept]`
 *   - `:res[header]` ex: `:res[Content-Length]`
 *   - `:http-version`
 *   - `:response-time`
 *   - `:remote-addr`
 *   - `:date`
 *   - `:method`
 *   - `:url`
 *   - `:referrer`
 *   - `:user-agent`
 *   - `:status`
 *
 * @return {Function}
 * @param logger4js
 * @param options
 * @api public
 */
module.exports = function getLogger(logger4js, options) {
  if (typeof options === 'string' || typeof options === 'function') {
    options = { format: options };
  } else {
    options = options || {};
  }

  const thisLogger = logger4js;
  let level = levels.getLevel(options.level, levels.INFO);
  const fmt = options.format || DEFAULT_FORMAT;

  return (req, res, next) => {
    // mount safety
    if (typeof req._logging !== 'undefined') return next();

    // nologs
    if (typeof options.nolog !== 'function') {
      const nolog = createNoLogCondition(options.nolog);
      if (nolog && nolog.test(req.originalUrl)) return next();
    }

    if (thisLogger.isLevelEnabled(level) || options.level === 'auto') {
      const start = new Date();
      const { writeHead } = res;

      // flag as logging
      req._logging = true;

      // proxy for statusCode.
      res.writeHead = (code, headers) => {
        res.writeHead = writeHead;
        res.writeHead(code, headers);

        res.__statusCode = code;
        res.__headers = headers || {};
      };

      // hook on end request to emit the log entry of the HTTP request.
      let finished = false;
      const handler = () => {
        if (finished) {
          return;
        }
        finished = true;

        // nologs
        if (typeof options.nolog === 'function') {
          if (options.nolog(req, res) === true) {
            req._logging = false;
            return;
          }
        }

        res.responseTime = new Date() - start;
        // status code response level handling
        if (res.statusCode && options.level === 'auto') {
          level = levels.INFO;
          if (res.statusCode >= 300) level = levels.WARN;
          if (res.statusCode >= 400) level = levels.ERROR;
        }
        level = matchRules(res.statusCode, level, options.statusRules);

        const combinedTokens = assembleTokens(req, res, options.tokens || []);

        if (options.context) thisLogger.addContext('res', res);
        if (typeof fmt === 'function') {
          const line = fmt(req, res, (str) => format(str, combinedTokens));
          if (line) thisLogger.log(level, line);
        } else {
          thisLogger.log(level, format(fmt, combinedTokens));
        }
        if (options.context) thisLogger.removeContext('res');
      };
      res.on('end', handler);
      res.on('finish', handler);
      res.on('error', handler);
      res.on('close', handler);
    }

    // ensure next gets always called
    return next();
  };
};


/***/ }),

/***/ 1219:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dateFormat = __webpack_require__(520);
const os = __webpack_require__(2037);
const util = __webpack_require__(3837);
const path = __webpack_require__(1017);
const url = __webpack_require__(7310);
const debug = __webpack_require__(5158)('log4js:layouts');

const styles = {
  // styles
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [91, 39],
  yellow: [33, 39],
};

function colorizeStart(style) {
  return style ? `\x1B[${styles[style][0]}m` : '';
}

function colorizeEnd(style) {
  return style ? `\x1B[${styles[style][1]}m` : '';
}

/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, style) {
  return colorizeStart(style) + str + colorizeEnd(style);
}

function timestampLevelAndCategory(loggingEvent, colour) {
  return colorize(
    util.format(
      '[%s] [%s] %s - ',
      dateFormat.asString(loggingEvent.startTime),
      loggingEvent.level.toString(),
      loggingEvent.categoryName
    ),
    colour
  );
}

/**
 * BasicLayout is a simple layout for storing the logs. The logs are stored
 * in following format:
 * <pre>
 * [startTime] [logLevel] categoryName - message\n
 * </pre>
 *
 * @author Stephan Strittmatter
 */
function basicLayout(loggingEvent) {
  return (
    timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data)
  );
}

/**
 * colouredLayout - taken from masylum's fork.
 * same as basicLayout, but with colours.
 */
function colouredLayout(loggingEvent) {
  return (
    timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) +
    util.format(...loggingEvent.data)
  );
}

function messagePassThroughLayout(loggingEvent) {
  return util.format(...loggingEvent.data);
}

function dummyLayout(loggingEvent) {
  return loggingEvent.data[0];
}

/**
 * PatternLayout
 * Format for specifiers is %[padding].[truncation][field]{[format]}
 * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
 * both padding and truncation can be negative.
 * Negative truncation = trunc from end of string
 * Positive truncation = trunc from start of string
 * Negative padding = pad right
 * Positive padding = pad left
 *
 * Fields can be any of:
 *  - %r time in toLocaleTimeString format
 *  - %p log level
 *  - %c log category
 *  - %h hostname
 *  - %m log data
 *  - %m{l} where l is an integer, log data.slice(l)
 *  - %m{l,u} where l and u are integers, log data.slice(l, u)
 *  - %d date in constious formats
 *  - %% %
 *  - %n newline
 *  - %z pid
 *  - %f filename
 *  - %l line number
 *  - %o column postion
 *  - %s call stack
 *  - %C class name [#1316](https://github.com/log4js-node/log4js-node/pull/1316)
 *  - %M method or function name [#1316](https://github.com/log4js-node/log4js-node/pull/1316)
 *  - %A method or function alias [#1316](https://github.com/log4js-node/log4js-node/pull/1316)
 *  - %F fully qualified caller name [#1316](https://github.com/log4js-node/log4js-node/pull/1316)
 *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
 *  - %X{<tokenname>} add dynamic tokens to your log. Tokens are specified in logger context
 * You can use %[ and %] to define a colored block.
 *
 * Tokens are specified as simple key:value objects.
 * The key represents the token name whereas the value can be a string or function
 * which is called to extract the value to put in the log message. If token is not
 * found, it doesn't replace the field.
 *
 * A sample token would be: { 'pid' : function() { return process.pid; } }
 *
 * Takes a pattern string, array of tokens and returns a layout function.
 * @return {Function}
 * @param pattern
 * @param tokens
 * @param timezoneOffset
 *
 * @authors ['Stephan Strittmatter', 'Jan Schmidle']
 */
function patternLayout(pattern, tokens) {
  const TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n';
  const regex =
    /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;

  pattern = pattern || TTCC_CONVERSION_PATTERN;

  function categoryName(loggingEvent, specifier) {
    let loggerName = loggingEvent.categoryName;
    if (specifier) {
      const precision = parseInt(specifier, 10);
      const loggerNameBits = loggerName.split('.');
      if (precision < loggerNameBits.length) {
        loggerName = loggerNameBits
          .slice(loggerNameBits.length - precision)
          .join('.');
      }
    }
    return loggerName;
  }

  function formatAsDate(loggingEvent, specifier) {
    let format = dateFormat.ISO8601_FORMAT;
    if (specifier) {
      format = specifier;
      // Pick up special cases
      switch (format) {
        case 'ISO8601':
        case 'ISO8601_FORMAT':
          format = dateFormat.ISO8601_FORMAT;
          break;
        case 'ISO8601_WITH_TZ_OFFSET':
        case 'ISO8601_WITH_TZ_OFFSET_FORMAT':
          format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
          break;
        case 'ABSOLUTE':
          process.emitWarning(
            'Pattern %d{ABSOLUTE} is deprecated in favor of %d{ABSOLUTETIME}. ' +
              'Please use %d{ABSOLUTETIME} instead.',
            'DeprecationWarning',
            'log4js-node-DEP0003'
          );
          debug(
            '[log4js-node-DEP0003]',
            'DEPRECATION: Pattern %d{ABSOLUTE} is deprecated and replaced by %d{ABSOLUTETIME}.'
          );
        // falls through
        case 'ABSOLUTETIME':
        case 'ABSOLUTETIME_FORMAT':
          format = dateFormat.ABSOLUTETIME_FORMAT;
          break;
        case 'DATE':
          process.emitWarning(
            'Pattern %d{DATE} is deprecated due to the confusion it causes when used. ' +
              'Please use %d{DATETIME} instead.',
            'DeprecationWarning',
            'log4js-node-DEP0004'
          );
          debug(
            '[log4js-node-DEP0004]',
            'DEPRECATION: Pattern %d{DATE} is deprecated and replaced by %d{DATETIME}.'
          );
        // falls through
        case 'DATETIME':
        case 'DATETIME_FORMAT':
          format = dateFormat.DATETIME_FORMAT;
          break;
        // no default
      }
    }
    // Format the date
    return dateFormat.asString(format, loggingEvent.startTime);
  }

  function hostname() {
    return os.hostname().toString();
  }

  function formatMessage(loggingEvent, specifier) {
    let dataSlice = loggingEvent.data;
    if (specifier) {
      const [lowerBound, upperBound] = specifier.split(',');
      dataSlice = dataSlice.slice(lowerBound, upperBound);
    }
    return util.format(...dataSlice);
  }

  function endOfLine() {
    return os.EOL;
  }

  function logLevel(loggingEvent) {
    return loggingEvent.level.toString();
  }

  function startTime(loggingEvent) {
    return dateFormat.asString('hh:mm:ss', loggingEvent.startTime);
  }

  function startColour(loggingEvent) {
    return colorizeStart(loggingEvent.level.colour);
  }

  function endColour(loggingEvent) {
    return colorizeEnd(loggingEvent.level.colour);
  }

  function percent() {
    return '%';
  }

  function pid(loggingEvent) {
    return loggingEvent && loggingEvent.pid
      ? loggingEvent.pid.toString()
      : process.pid.toString();
  }

  function clusterInfo() {
    // this used to try to return the master and worker pids,
    // but it would never have worked because master pid is not available to workers
    // leaving this here to maintain compatibility for patterns
    return pid();
  }

  function userDefined(loggingEvent, specifier) {
    if (typeof tokens[specifier] !== 'undefined') {
      return typeof tokens[specifier] === 'function'
        ? tokens[specifier](loggingEvent)
        : tokens[specifier];
    }

    return null;
  }

  function contextDefined(loggingEvent, specifier) {
    const resolver = loggingEvent.context[specifier];

    if (typeof resolver !== 'undefined') {
      return typeof resolver === 'function' ? resolver(loggingEvent) : resolver;
    }

    return null;
  }

  function fileName(loggingEvent, specifier) {
    let filename = loggingEvent.fileName || '';

    // support for ESM as it uses url instead of path for file
    /* istanbul ignore next: unsure how to simulate ESM for test coverage */
    const convertFileURLToPath = function (filepath) {
      const urlPrefix = 'file://';
      if (filepath.startsWith(urlPrefix)) {
        // https://nodejs.org/api/url.html#urlfileurltopathurl
        if (typeof url.fileURLToPath === 'function') {
          filepath = url.fileURLToPath(filepath);
        }
        // backward-compatible for nodejs pre-10.12.0 (without url.fileURLToPath method)
        else {
          // posix: file:///hello/world/foo.txt -> /hello/world/foo.txt -> /hello/world/foo.txt
          // win32: file:///C:/path/foo.txt     -> /C:/path/foo.txt     -> \C:\path\foo.txt     -> C:\path\foo.txt
          // win32: file://nas/foo.txt          -> //nas/foo.txt        -> nas\foo.txt          -> \\nas\foo.txt
          filepath = path.normalize(
            filepath.replace(new RegExp(`^${urlPrefix}`), '')
          );
          if (process.platform === 'win32') {
            if (filepath.startsWith('\\')) {
              filepath = filepath.slice(1);
            } else {
              filepath = path.sep + path.sep + filepath;
            }
          }
        }
      }
      return filepath;
    };
    filename = convertFileURLToPath(filename);

    if (specifier) {
      const fileDepth = parseInt(specifier, 10);
      const fileList = filename.split(path.sep);
      if (fileList.length > fileDepth) {
        filename = fileList.slice(-fileDepth).join(path.sep);
      }
    }

    return filename;
  }

  function lineNumber(loggingEvent) {
    return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : '';
  }

  function columnNumber(loggingEvent) {
    return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : '';
  }

  function callStack(loggingEvent) {
    return loggingEvent.callStack || '';
  }

  function className(loggingEvent) {
    return loggingEvent.className || '';
  }

  function functionName(loggingEvent) {
    return loggingEvent.functionName || '';
  }

  function functionAlias(loggingEvent) {
    return loggingEvent.functionAlias || '';
  }

  function callerName(loggingEvent) {
    return loggingEvent.callerName || '';
  }

  const replacers = {
    c: categoryName,
    d: formatAsDate,
    h: hostname,
    m: formatMessage,
    n: endOfLine,
    p: logLevel,
    r: startTime,
    '[': startColour,
    ']': endColour,
    y: clusterInfo,
    z: pid,
    '%': percent,
    x: userDefined,
    X: contextDefined,
    f: fileName,
    l: lineNumber,
    o: columnNumber,
    s: callStack,
    C: className,
    M: functionName,
    A: functionAlias,
    F: callerName,
  };

  function replaceToken(conversionCharacter, loggingEvent, specifier) {
    return replacers[conversionCharacter](loggingEvent, specifier);
  }

  function truncate(truncation, toTruncate) {
    let len;
    if (truncation) {
      len = parseInt(truncation.slice(1), 10);
      // negative truncate length means truncate from end of string
      return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
    }

    return toTruncate;
  }

  function pad(padding, toPad) {
    let len;
    if (padding) {
      if (padding.charAt(0) === '-') {
        len = parseInt(padding.slice(1), 10);
        // Right pad with spaces
        while (toPad.length < len) {
          toPad += ' ';
        }
      } else {
        len = parseInt(padding, 10);
        // Left pad with spaces
        while (toPad.length < len) {
          toPad = ` ${toPad}`;
        }
      }
    }
    return toPad;
  }

  function truncateAndPad(toTruncAndPad, truncation, padding) {
    let replacement = toTruncAndPad;
    replacement = truncate(truncation, replacement);
    replacement = pad(padding, replacement);
    return replacement;
  }

  return function (loggingEvent) {
    let formattedString = '';
    let result;
    let searchString = pattern;

    while ((result = regex.exec(searchString)) !== null) {
      // const matchedString = result[0];
      const padding = result[1];
      const truncation = result[2];
      const conversionCharacter = result[3];
      const specifier = result[5];
      const text = result[6];

      // Check if the pattern matched was just normal text
      if (text) {
        formattedString += text.toString();
      } else {
        // Create a raw replacement string based on the conversion
        // character and specifier
        const replacement = replaceToken(
          conversionCharacter,
          loggingEvent,
          specifier
        );
        formattedString += truncateAndPad(replacement, truncation, padding);
      }
      searchString = searchString.slice(result.index + result[0].length);
    }
    return formattedString;
  };
}

const layoutMakers = {
  messagePassThrough() {
    return messagePassThroughLayout;
  },
  basic() {
    return basicLayout;
  },
  colored() {
    return colouredLayout;
  },
  coloured() {
    return colouredLayout;
  },
  pattern(config) {
    return patternLayout(config && config.pattern, config && config.tokens);
  },
  dummy() {
    return dummyLayout;
  },
};

module.exports = {
  basicLayout,
  messagePassThroughLayout,
  patternLayout,
  colouredLayout,
  coloredLayout: colouredLayout,
  dummyLayout,
  addLayout(name, serializerGenerator) {
    layoutMakers[name] = serializerGenerator;
  },
  layout(name, config) {
    return layoutMakers[name] && layoutMakers[name](config);
  },
};


/***/ }),

/***/ 1935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const configuration = __webpack_require__(3338);

const validColours = [
  'white',
  'grey',
  'black',
  'blue',
  'cyan',
  'green',
  'magenta',
  'red',
  'yellow',
];

class Level {
  constructor(level, levelStr, colour) {
    this.level = level;
    this.levelStr = levelStr;
    this.colour = colour;
  }

  toString() {
    return this.levelStr;
  }

  /**
   * converts given String to corresponding Level
   * @param {(Level|string)} sArg -- String value of Level OR Log4js.Level
   * @param {Level} [defaultLevel] -- default Level, if no String representation
   * @return {Level}
   */
  static getLevel(sArg, defaultLevel) {
    if (!sArg) {
      return defaultLevel;
    }

    if (sArg instanceof Level) {
      return sArg;
    }

    // a json-serialised level won't be an instance of Level (see issue #768)
    if (sArg instanceof Object && sArg.levelStr) {
      sArg = sArg.levelStr;
    }

    return Level[sArg.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels) {
    if (customLevels) {
      const levels = Object.keys(customLevels);
      levels.forEach((l) => {
        const levelStr = l.toUpperCase();
        Level[levelStr] = new Level(
          customLevels[l].value,
          levelStr,
          customLevels[l].colour
        );
        const existingLevelIndex = Level.levels.findIndex(
          (lvl) => lvl.levelStr === levelStr
        );
        if (existingLevelIndex > -1) {
          Level.levels[existingLevelIndex] = Level[levelStr];
        } else {
          Level.levels.push(Level[levelStr]);
        }
      });
      Level.levels.sort((a, b) => a.level - b.level);
    }
  }

  isLessThanOrEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level <= otherLevel.level;
  }

  isGreaterThanOrEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level >= otherLevel.level;
  }

  isEqualTo(otherLevel) {
    if (typeof otherLevel === 'string') {
      otherLevel = Level.getLevel(otherLevel);
    }
    return this.level === otherLevel.level;
  }
}

Level.levels = [];
Level.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: 'grey' },
  TRACE: { value: 5000, colour: 'blue' },
  DEBUG: { value: 10000, colour: 'cyan' },
  INFO: { value: 20000, colour: 'green' },
  WARN: { value: 30000, colour: 'yellow' },
  ERROR: { value: 40000, colour: 'red' },
  FATAL: { value: 50000, colour: 'magenta' },
  MARK: { value: 9007199254740992, colour: 'grey' }, // 2^53
  OFF: { value: Number.MAX_VALUE, colour: 'grey' },
});

configuration.addListener((config) => {
  const levelConfig = config.levels;
  if (levelConfig) {
    configuration.throwExceptionIf(
      config,
      configuration.not(configuration.anObject(levelConfig)),
      'levels must be an object'
    );
    const newLevels = Object.keys(levelConfig);
    newLevels.forEach((l) => {
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.validIdentifier(l)),
        `level name "${l}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.anObject(levelConfig[l])),
        `level "${l}" must be an object`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(levelConfig[l].value),
        `level "${l}" must have a 'value' property`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(configuration.anInteger(levelConfig[l].value)),
        `level "${l}".value must have an integer value`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(levelConfig[l].colour),
        `level "${l}" must have a 'colour' property`
      );
      configuration.throwExceptionIf(
        config,
        configuration.not(validColours.indexOf(levelConfig[l].colour) > -1),
        `level "${l}".colour must be one of ${validColours.join(', ')}`
      );
    });
  }
});

configuration.addListener((config) => {
  Level.addLevels(config.levels);
});

module.exports = Level;


/***/ }),

/***/ 4296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @fileoverview log4js is a library to log in JavaScript in similar manner
 * than in log4j for Java (but not really).
 *
 * <h3>Example:</h3>
 * <pre>
 *  const logging = require('log4js');
 *  const log = logging.getLogger('some-category');
 *
 *  //call the log
 *  log.trace('trace me' );
 * </pre>
 *
 * NOTE: the authors below are the original browser-based log4js authors
 * don't try to contact them about bugs in this version :)
 * @author Stephan Strittmatter - http://jroller.com/page/stritti
 * @author Seth Chisamore - http://www.chisamore.com
 * @since 2005-05-20
 * Website: http://log4js.berlios.de
 */
const debug = __webpack_require__(5158)('log4js:main');
const fs = __webpack_require__(7147);
const deepClone = __webpack_require__(3188)({ proto: true });
const configuration = __webpack_require__(3338);
const layouts = __webpack_require__(1219);
const levels = __webpack_require__(1935);
const appenders = __webpack_require__(3530);
const categories = __webpack_require__(3785);
const Logger = __webpack_require__(6055);
const clustering = __webpack_require__(5885);
const connectLogger = __webpack_require__(198);
const recordingModule = __webpack_require__(2344);

let enabled = false;

function sendLogEventToAppender(logEvent) {
  if (!enabled) return;
  debug('Received log event ', logEvent);
  const categoryAppenders = categories.appendersForCategory(
    logEvent.categoryName
  );
  categoryAppenders.forEach((appender) => {
    appender(logEvent);
  });
}

function loadConfigurationFile(filename) {
  debug(`Loading configuration from ${filename}`);
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    throw new Error(
      `Problem reading config from file "${filename}". Error was ${e.message}`,
      e
    );
  }
}

function configure(configurationFileOrObject) {
  if (enabled) {
    // eslint-disable-next-line no-use-before-define
    shutdown();
  }

  let configObject = configurationFileOrObject;

  if (typeof configObject === 'string') {
    configObject = loadConfigurationFile(configurationFileOrObject);
  }
  debug(`Configuration is ${configObject}`);

  configuration.configure(deepClone(configObject));

  clustering.onMessage(sendLogEventToAppender);

  enabled = true;

  // eslint-disable-next-line no-use-before-define
  return log4js;
}

function isConfigured() {
  return enabled;
}

function recording() {
  return recordingModule;
}

/**
 * This callback type is called `shutdownCallback` and is displayed as a global symbol.
 *
 * @callback shutdownCallback
 * @param {Error} [error]
 */

/**
 * Shutdown all log appenders. This will first disable all writing to appenders
 * and then call the shutdown function each appender.
 *
 * @param {shutdownCallback} [callback] - The callback to be invoked once all appenders have
 *  shutdown. If an error occurs, the callback will be given the error object
 *  as the first argument.
 */
function shutdown(callback = () => {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('Invalid callback passed to shutdown');
  }
  debug('Shutdown called. Disabling all log writing.');
  // First, disable all writing to appenders. This prevents appenders from
  // not being able to be drained because of run-away log writes.
  enabled = false;

  // Clone out to maintain a reference
  const appendersToCheck = Array.from(appenders.values());

  // Reset immediately to prevent leaks
  appenders.init();
  categories.init();

  // Count the number of shutdown functions
  const shutdownFunctions = appendersToCheck.reduce(
    (accum, next) => (next.shutdown ? accum + 1 : accum),
    0
  );
  if (shutdownFunctions === 0) {
    debug('No appenders with shutdown functions found.');
    callback();
  }

  let completed = 0;
  let error;
  debug(`Found ${shutdownFunctions} appenders with shutdown functions.`);
  function complete(err) {
    error = error || err;
    completed += 1;
    debug(`Appender shutdowns complete: ${completed} / ${shutdownFunctions}`);
    if (completed >= shutdownFunctions) {
      debug('All shutdown functions completed.');
      callback(error);
    }
  }

  // Call each of the shutdown functions
  appendersToCheck
    .filter((a) => a.shutdown)
    .forEach((a) => a.shutdown(complete));
}

/**
 * Get a logger instance.
 * @static
 * @param {string} [category=default]
 * @return {Logger} instance of logger for the category
 */
function getLogger(category) {
  if (!enabled) {
    configure(
      process.env.LOG4JS_CONFIG || {
        appenders: { out: { type: 'stdout' } },
        categories: { default: { appenders: ['out'], level: 'OFF' } },
      }
    );
  }
  return new Logger(category || 'default');
}

/**
 * @name log4js
 * @namespace Log4js
 * @property getLogger
 * @property configure
 * @property shutdown
 */
const log4js = {
  getLogger,
  configure,
  isConfigured,
  shutdown,
  connectLogger,
  levels,
  addLayout: layouts.addLayout,
  recording,
};

module.exports = log4js;


/***/ }),

/***/ 6055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-underscore-dangle: ["error", { "allow": ["_log"] }] */

const debug = __webpack_require__(5158)('log4js:logger');
const LoggingEvent = __webpack_require__(4421);
const levels = __webpack_require__(1935);
const clustering = __webpack_require__(5885);
const categories = __webpack_require__(3785);
const configuration = __webpack_require__(3338);

const stackReg = /^(?:\s*)at (?:(.+) \()?(?:([^(]+?):(\d+):(\d+))\)?$/;
/**
 * The top entry is the Error
 */
const baseCallStackSkip = 1;
/**
 * The _log function is 3 levels deep, we need to skip those to make it to the callSite
 */
const defaultErrorCallStackSkip = 3;

/**
 *
 * @param {Error} data
 * @param {number} skipIdx
 * @returns {import('../types/log4js').CallStack | null}
 */
function defaultParseCallStack(
  data,
  skipIdx = defaultErrorCallStackSkip + baseCallStackSkip
) {
  try {
    const stacklines = data.stack.split('\n').slice(skipIdx);
    if (!stacklines.length) {
      // There's no stack in this stack
      // Should we try a previous index if skipIdx was set?
      return null;
    }
    const lineMatch = stackReg.exec(stacklines[0]);
    /* istanbul ignore else: failsafe */
    if (lineMatch && lineMatch.length === 5) {
      // extract class, function and alias names
      let className = '';
      let functionName = '';
      let functionAlias = '';
      if (lineMatch[1] && lineMatch[1] !== '') {
        // WARN: this will unset alias if alias is not present.
        [functionName, functionAlias] = lineMatch[1]
          .replace(/[[\]]/g, '')
          .split(' as ');
        functionAlias = functionAlias || '';

        if (functionName.includes('.'))
          [className, functionName] = functionName.split('.');
      }

      return {
        fileName: lineMatch[2],
        lineNumber: parseInt(lineMatch[3], 10),
        columnNumber: parseInt(lineMatch[4], 10),
        callStack: stacklines.join('\n'),
        className,
        functionName,
        functionAlias,
        callerName: lineMatch[1] || '',
      };
      // eslint-disable-next-line no-else-return
    } else {
      // will never get here unless nodejs has changes to Error
      console.error('log4js.logger - defaultParseCallStack error'); // eslint-disable-line no-console
    }
  } catch (err) {
    // will never get error unless nodejs has breaking changes to Error
    console.error('log4js.logger - defaultParseCallStack error', err); // eslint-disable-line no-console
  }
  return null;
}

/**
 * Logger to log messages.
 * use {@see log4js#getLogger(String)} to get an instance.
 *
 * @name Logger
 * @namespace Log4js
 * @param name name of category to log to
 * @param level - the loglevel for the category
 * @param dispatch - the function which will receive the logevents
 *
 * @author Stephan Strittmatter
 */
class Logger {
  constructor(name) {
    if (!name) {
      throw new Error('No category provided.');
    }
    this.category = name;
    this.context = {};
    /** @private */
    this.callStackSkipIndex = 0;
    /** @private */
    this.parseCallStack = defaultParseCallStack;
    debug(`Logger created (${this.category}, ${this.level})`);
  }

  get level() {
    return levels.getLevel(
      categories.getLevelForCategory(this.category),
      levels.OFF
    );
  }

  set level(level) {
    categories.setLevelForCategory(
      this.category,
      levels.getLevel(level, this.level)
    );
  }

  get useCallStack() {
    return categories.getEnableCallStackForCategory(this.category);
  }

  set useCallStack(bool) {
    categories.setEnableCallStackForCategory(this.category, bool === true);
  }

  get callStackLinesToSkip() {
    return this.callStackSkipIndex;
  }

  set callStackLinesToSkip(number) {
    if (typeof number !== 'number') {
      throw new TypeError('Must be a number');
    }
    if (number < 0) {
      throw new RangeError('Must be >= 0');
    }
    this.callStackSkipIndex = number;
  }

  log(level, ...args) {
    const logLevel = levels.getLevel(level);
    if (!logLevel) {
      if (configuration.validIdentifier(level) && args.length > 0) {
        // logLevel not found but of valid signature, WARN before fallback to INFO
        this.log(
          levels.WARN,
          'log4js:logger.log: valid log-level not found as first parameter given:',
          level
        );
        this.log(levels.INFO, `[${level}]`, ...args);
      } else {
        // apart from fallback, allow .log(...args) to be synonym with .log("INFO", ...args)
        this.log(levels.INFO, level, ...args);
      }
    } else if (this.isLevelEnabled(logLevel)) {
      this._log(logLevel, args);
    }
  }

  isLevelEnabled(otherLevel) {
    return this.level.isLessThanOrEqualTo(otherLevel);
  }

  _log(level, data) {
    debug(`sending log data (${level}) to appenders`);
    const error = data.find((item) => item instanceof Error);
    let callStack;
    if (this.useCallStack) {
      try {
        if (error) {
          callStack = this.parseCallStack(
            error,
            this.callStackSkipIndex + baseCallStackSkip
          );
        }
      } catch (_err) {
        // Ignore Error and use the original method of creating a new Error.
      }
      callStack =
        callStack ||
        this.parseCallStack(
          new Error(),
          this.callStackSkipIndex +
            defaultErrorCallStackSkip +
            baseCallStackSkip
        );
    }
    const loggingEvent = new LoggingEvent(
      this.category,
      level,
      data,
      this.context,
      callStack,
      error
    );
    clustering.send(loggingEvent);
  }

  addContext(key, value) {
    this.context[key] = value;
  }

  removeContext(key) {
    delete this.context[key];
  }

  clearContext() {
    this.context = {};
  }

  setParseCallStackFunction(parseFunction) {
    if (typeof parseFunction === 'function') {
      this.parseCallStack = parseFunction;
    } else if (typeof parseFunction === 'undefined') {
      this.parseCallStack = defaultParseCallStack;
    } else {
      throw new TypeError('Invalid type passed to setParseCallStackFunction');
    }
  }
}

function addLevelMethods(target) {
  const level = levels.getLevel(target);

  const levelStrLower = level.toString().toLowerCase();
  const levelMethod = levelStrLower.replace(/_([a-z])/g, (g) =>
    g[1].toUpperCase()
  );
  const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);

  Logger.prototype[`is${isLevelMethod}Enabled`] = function () {
    return this.isLevelEnabled(level);
  };

  Logger.prototype[levelMethod] = function (...args) {
    this.log(level, ...args);
  };
}

levels.levels.forEach(addLevelMethods);

configuration.addListener(() => {
  levels.levels.forEach(addLevelMethods);
});

module.exports = Logger;


/***/ }),

/***/ 2568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(){
  var crypt = __webpack_require__(1012),
      utf8 = (__webpack_require__(487).utf8),
      isBuffer = __webpack_require__(8738),
      bin = (__webpack_require__(487).bin),

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ 7824:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 1572:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(t,n){ true?module.exports=n(__webpack_require__(2081),__webpack_require__(6113)):0}(this,function(t,n){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){t.exports=r(34)},function(t,n,r){var e=r(29)("wks"),o=r(33),i=r(2).Symbol,c="function"==typeof i,u=t.exports=function(t){return e[t]||(e[t]=c&&i[t]||(c?i:o)("Symbol."+t))};u.store=e},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(9);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(t,n,r){t.exports=!r(24)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,r){var e=r(12),o=r(17);t.exports=r(4)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(t,n,r){var e=r(14);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports={}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(3),o=r(26),i=r(32),c=Object.defineProperty;n.f=r(4)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return c(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(42),o=r(15);t.exports=function(t){return e(o(t))}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){var e=r(9),o=r(2).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(12).f,o=r(8),i=r(1)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n,r){var e=r(29)("keys"),o=r(33);t.exports=function(t){return e[t]||(e[t]=o(t))}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(11),o=r(1)("toStringTag"),i="Arguments"==e(function(){return arguments}()),c=function(t,n){try{return t[n]}catch(t){}};t.exports=function(t){var n,r,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=c(n=Object(t),o))?r:i?e(n):"Object"==(u=e(n))&&"function"==typeof n.callee?"Arguments":u}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,r){var e=r(2),o=r(6),i=r(7),c=r(5),u="prototype",s=function(t,n,r){var f,a,p,l=t&s.F,v=t&s.G,h=t&s.S,d=t&s.P,y=t&s.B,_=t&s.W,x=v?o:o[n]||(o[n]={}),m=x[u],w=v?e:h?e[n]:(e[n]||{})[u];v&&(r=n);for(f in r)a=!l&&w&&void 0!==w[f],a&&f in x||(p=a?w[f]:r[f],x[f]=v&&"function"!=typeof w[f]?r[f]:y&&a?i(p,e):_&&w[f]==p?function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n[u]=t[u],n}(p):d&&"function"==typeof p?i(Function.call,p):p,d&&((x.virtual||(x.virtual={}))[f]=p,t&s.R&&m&&!m[f]&&c(m,f,p)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,r){t.exports=r(2).document&&document.documentElement},function(t,n,r){t.exports=!r(4)&&!r(24)(function(){return 7!=Object.defineProperty(r(16)("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){"use strict";var e=r(28),o=r(23),i=r(57),c=r(5),u=r(8),s=r(10),f=r(45),a=r(18),p=r(52),l=r(1)("iterator"),v=!([].keys&&"next"in[].keys()),h="@@iterator",d="keys",y="values",_=function(){return this};t.exports=function(t,n,r,x,m,w,g){f(r,n,x);var b,O,j,S=function(t){if(!v&&t in T)return T[t];switch(t){case d:return function(){return new r(this,t)};case y:return function(){return new r(this,t)}}return function(){return new r(this,t)}},E=n+" Iterator",P=m==y,M=!1,T=t.prototype,A=T[l]||T[h]||m&&T[m],k=A||S(m),C=m?P?S("entries"):k:void 0,I="Array"==n?T.entries||A:A;if(I&&(j=p(I.call(new t)),j!==Object.prototype&&(a(j,E,!0),e||u(j,l)||c(j,l,_))),P&&A&&A.name!==y&&(M=!0,k=function(){return A.call(this)}),e&&!g||!v&&!M&&T[l]||c(T,l,k),s[n]=k,s[E]=_,m)if(b={values:P?k:S(y),keys:w?k:S(d),entries:C},g)for(O in b)O in T||i(T,O,b[O]);else o(o.P+o.F*(v||M),n,b);return b}},function(t,n){t.exports=!0},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e,o,i,c=r(7),u=r(41),s=r(25),f=r(16),a=r(2),p=a.process,l=a.setImmediate,v=a.clearImmediate,h=a.MessageChannel,d=0,y={},_="onreadystatechange",x=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},m=function(t){x.call(t.data)};l&&v||(l=function(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return y[++d]=function(){u("function"==typeof t?t:Function(t),n)},e(d),d},v=function(t){delete y[t]},"process"==r(11)(p)?e=function(t){p.nextTick(c(x,t,1))}:h?(o=new h,i=o.port2,o.port1.onmessage=m,e=c(i.postMessage,i,1)):a.addEventListener&&"function"==typeof postMessage&&!a.importScripts?(e=function(t){a.postMessage(t+"","*")},a.addEventListener("message",m,!1)):e=_ in f("script")?function(t){s.appendChild(f("script"))[_]=function(){s.removeChild(this),x.call(t)}}:function(t){setTimeout(c(x,t,1),0)}),t.exports={set:l,clear:v}},function(t,n,r){var e=r(20),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){var e=r(9);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function o(){return"win32"!==process.platform?"":"ia32"===process.arch&&process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")?"mixed":"native"}function i(t){return(0,l.createHash)("sha256").update(t).digest("hex")}function c(t){switch(h){case"darwin":return t.split("IOPlatformUUID")[1].split("\n")[0].replace(/\=|\s+|\"/gi,"").toLowerCase();case"win32":return t.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi,"").toLowerCase();case"linux":return t.toString().replace(/\r+|\n+|\s+/gi,"").toLowerCase();case"freebsd":return t.toString().replace(/\r+|\n+|\s+/gi,"").toLowerCase();default:throw new Error("Unsupported platform: "+process.platform)}}function u(t){var n=c((0,p.execSync)(y[h]).toString());return t?n:i(n)}function s(t){return new a.default(function(n,r){return(0,p.exec)(y[h],{},function(e,o,u){if(e)return r(new Error("Error while obtaining machine id: "+e.stack));var s=c(o.toString());return n(t?s:i(s))})})}Object.defineProperty(n,"__esModule",{value:!0});var f=r(35),a=e(f);n.machineIdSync=u,n.machineId=s;var p=r(70),l=r(71),v=process,h=v.platform,d={native:"%windir%\\System32",mixed:"%windir%\\sysnative\\cmd.exe /c %windir%\\System32"},y={darwin:"ioreg -rd1 -c IOPlatformExpertDevice",win32:d[o()]+"\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid",linux:"( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :",freebsd:"kenv -q smbios.system.uuid || sysctl -n kern.hostuuid"}},function(t,n,r){t.exports={default:r(36),__esModule:!0}},function(t,n,r){r(66),r(68),r(69),r(67),t.exports=r(6).Promise},function(t,n){t.exports=function(){}},function(t,n){t.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},function(t,n,r){var e=r(13),o=r(31),i=r(62);t.exports=function(t){return function(n,r,c){var u,s=e(n),f=o(s.length),a=i(c,f);if(t&&r!=r){for(;f>a;)if(u=s[a++],u!=u)return!0}else for(;f>a;a++)if((t||a in s)&&s[a]===r)return t||a||0;return!t&&-1}}},function(t,n,r){var e=r(7),o=r(44),i=r(43),c=r(3),u=r(31),s=r(64),f={},a={},n=t.exports=function(t,n,r,p,l){var v,h,d,y,_=l?function(){return t}:s(t),x=e(r,p,n?2:1),m=0;if("function"!=typeof _)throw TypeError(t+" is not iterable!");if(i(_)){for(v=u(t.length);v>m;m++)if(y=n?x(c(h=t[m])[0],h[1]):x(t[m]),y===f||y===a)return y}else for(d=_.call(t);!(h=d.next()).done;)if(y=o(d,x,h.value,n),y===f||y===a)return y};n.BREAK=f,n.RETURN=a},function(t,n){t.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},function(t,n,r){var e=r(11);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},function(t,n,r){var e=r(10),o=r(1)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(e.Array===t||i[o]===t)}},function(t,n,r){var e=r(3);t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(n){var i=t.return;throw void 0!==i&&e(i.call(t)),n}}},function(t,n,r){"use strict";var e=r(49),o=r(17),i=r(18),c={};r(5)(c,r(1)("iterator"),function(){return this}),t.exports=function(t,n,r){t.prototype=e(c,{next:o(1,r)}),i(t,n+" Iterator")}},function(t,n,r){var e=r(1)("iterator"),o=!1;try{var i=[7][e]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var r=!1;try{var i=[7],c=i[e]();c.next=function(){return{done:r=!0}},i[e]=function(){return c},t(i)}catch(t){}return r}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,r){var e=r(2),o=r(30).set,i=e.MutationObserver||e.WebKitMutationObserver,c=e.process,u=e.Promise,s="process"==r(11)(c);t.exports=function(){var t,n,r,f=function(){var e,o;for(s&&(e=c.domain)&&e.exit();t;){o=t.fn,t=t.next;try{o()}catch(e){throw t?r():n=void 0,e}}n=void 0,e&&e.enter()};if(s)r=function(){c.nextTick(f)};else if(i){var a=!0,p=document.createTextNode("");new i(f).observe(p,{characterData:!0}),r=function(){p.data=a=!a}}else if(u&&u.resolve){var l=u.resolve();r=function(){l.then(f)}}else r=function(){o.call(e,f)};return function(e){var o={fn:e,next:void 0};n&&(n.next=o),t||(t=o,r()),n=o}}},function(t,n,r){var e=r(3),o=r(50),i=r(22),c=r(19)("IE_PROTO"),u=function(){},s="prototype",f=function(){var t,n=r(16)("iframe"),e=i.length,o=">";for(n.style.display="none",r(25).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),f=t.F;e--;)delete f[s][i[e]];return f()};t.exports=Object.create||function(t,n){var r;return null!==t?(u[s]=e(t),r=new u,u[s]=null,r[c]=t):r=f(),void 0===n?r:o(r,n)}},function(t,n,r){var e=r(12),o=r(3),i=r(54);t.exports=r(4)?Object.defineProperties:function(t,n){o(t);for(var r,c=i(n),u=c.length,s=0;u>s;)e.f(t,r=c[s++],n[r]);return t}},function(t,n,r){var e=r(55),o=r(17),i=r(13),c=r(32),u=r(8),s=r(26),f=Object.getOwnPropertyDescriptor;n.f=r(4)?f:function(t,n){if(t=i(t),n=c(n,!0),s)try{return f(t,n)}catch(t){}if(u(t,n))return o(!e.f.call(t,n),t[n])}},function(t,n,r){var e=r(8),o=r(63),i=r(19)("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),e(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n,r){var e=r(8),o=r(13),i=r(39)(!1),c=r(19)("IE_PROTO");t.exports=function(t,n){var r,u=o(t),s=0,f=[];for(r in u)r!=c&&e(u,r)&&f.push(r);for(;n.length>s;)e(u,r=n[s++])&&(~i(f,r)||f.push(r));return f}},function(t,n,r){var e=r(53),o=r(22);t.exports=Object.keys||function(t){return e(t,o)}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,r){var e=r(5);t.exports=function(t,n,r){for(var o in n)r&&t[o]?t[o]=n[o]:e(t,o,n[o]);return t}},function(t,n,r){t.exports=r(5)},function(t,n,r){var e=r(9),o=r(3),i=function(t,n){if(o(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,e){try{e=r(7)(Function.call,r(51).f(Object.prototype,"__proto__").set,2),e(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,r){return i(t,r),n?t.__proto__=r:e(t,r),t}}({},!1):void 0),check:i}},function(t,n,r){"use strict";var e=r(2),o=r(6),i=r(12),c=r(4),u=r(1)("species");t.exports=function(t){var n="function"==typeof o[t]?o[t]:e[t];c&&n&&!n[u]&&i.f(n,u,{configurable:!0,get:function(){return this}})}},function(t,n,r){var e=r(3),o=r(14),i=r(1)("species");t.exports=function(t,n){var r,c=e(t).constructor;return void 0===c||void 0==(r=e(c)[i])?n:o(r)}},function(t,n,r){var e=r(20),o=r(15);t.exports=function(t){return function(n,r){var i,c,u=String(o(n)),s=e(r),f=u.length;return s<0||s>=f?t?"":void 0:(i=u.charCodeAt(s),i<55296||i>56319||s+1===f||(c=u.charCodeAt(s+1))<56320||c>57343?t?u.charAt(s):i:t?u.slice(s,s+2):(i-55296<<10)+(c-56320)+65536)}}},function(t,n,r){var e=r(20),o=Math.max,i=Math.min;t.exports=function(t,n){return t=e(t),t<0?o(t+n,0):i(t,n)}},function(t,n,r){var e=r(15);t.exports=function(t){return Object(e(t))}},function(t,n,r){var e=r(21),o=r(1)("iterator"),i=r(10);t.exports=r(6).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[e(t)]}},function(t,n,r){"use strict";var e=r(37),o=r(47),i=r(10),c=r(13);t.exports=r(27)(Array,"Array",function(t,n){this._t=c(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==n?o(0,r):"values"==n?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,e("keys"),e("values"),e("entries")},function(t,n){},function(t,n,r){"use strict";var e,o,i,c=r(28),u=r(2),s=r(7),f=r(21),a=r(23),p=r(9),l=(r(3),r(14)),v=r(38),h=r(40),d=(r(58).set,r(60)),y=r(30).set,_=r(48)(),x="Promise",m=u.TypeError,w=u.process,g=u[x],w=u.process,b="process"==f(w),O=function(){},j=!!function(){try{var t=g.resolve(1),n=(t.constructor={})[r(1)("species")]=function(t){t(O,O)};return(b||"function"==typeof PromiseRejectionEvent)&&t.then(O)instanceof n}catch(t){}}(),S=function(t,n){return t===n||t===g&&n===i},E=function(t){var n;return!(!p(t)||"function"!=typeof(n=t.then))&&n},P=function(t){return S(g,t)?new M(t):new o(t)},M=o=function(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw m("Bad Promise constructor");n=t,r=e}),this.resolve=l(n),this.reject=l(r)},T=function(t){try{t()}catch(t){return{error:t}}},A=function(t,n){if(!t._n){t._n=!0;var r=t._c;_(function(){for(var e=t._v,o=1==t._s,i=0,c=function(n){var r,i,c=o?n.ok:n.fail,u=n.resolve,s=n.reject,f=n.domain;try{c?(o||(2==t._h&&I(t),t._h=1),c===!0?r=e:(f&&f.enter(),r=c(e),f&&f.exit()),r===n.promise?s(m("Promise-chain cycle")):(i=E(r))?i.call(r,u,s):u(r)):s(e)}catch(t){s(t)}};r.length>i;)c(r[i++]);t._c=[],t._n=!1,n&&!t._h&&k(t)})}},k=function(t){y.call(u,function(){var n,r,e,o=t._v;if(C(t)&&(n=T(function(){b?w.emit("unhandledRejection",o,t):(r=u.onunhandledrejection)?r({promise:t,reason:o}):(e=u.console)&&e.error&&e.error("Unhandled promise rejection",o)}),t._h=b||C(t)?2:1),t._a=void 0,n)throw n.error})},C=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!C(n.promise))return!1;return!0},I=function(t){y.call(u,function(){var n;b?w.emit("rejectionHandled",t):(n=u.onrejectionhandled)&&n({promise:t,reason:t._v})})},R=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),A(n,!0))},F=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw m("Promise can't be resolved itself");(n=E(t))?_(function(){var e={_w:r,_d:!1};try{n.call(t,s(F,e,1),s(R,e,1))}catch(t){R.call(e,t)}}):(r._v=t,r._s=1,A(r,!1))}catch(t){R.call({_w:r,_d:!1},t)}}};j||(g=function(t){v(this,g,x,"_h"),l(t),e.call(this);try{t(s(F,this,1),s(R,this,1))}catch(t){R.call(this,t)}},e=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=r(56)(g.prototype,{then:function(t,n){var r=P(d(this,g));return r.ok="function"!=typeof t||t,r.fail="function"==typeof n&&n,r.domain=b?w.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&A(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),M=function(){var t=new e;this.promise=t,this.resolve=s(F,t,1),this.reject=s(R,t,1)}),a(a.G+a.W+a.F*!j,{Promise:g}),r(18)(g,x),r(59)(x),i=r(6)[x],a(a.S+a.F*!j,x,{reject:function(t){var n=P(this),r=n.reject;return r(t),n.promise}}),a(a.S+a.F*(c||!j),x,{resolve:function(t){if(t instanceof g&&S(t.constructor,this))return t;var n=P(this),r=n.resolve;return r(t),n.promise}}),a(a.S+a.F*!(j&&r(46)(function(t){g.all(t).catch(O)})),x,{all:function(t){var n=this,r=P(n),e=r.resolve,o=r.reject,i=T(function(){var r=[],i=0,c=1;h(t,!1,function(t){var u=i++,s=!1;r.push(void 0),c++,n.resolve(t).then(function(t){s||(s=!0,r[u]=t,--c||e(r))},o)}),--c||e(r)});return i&&o(i.error),r.promise},race:function(t){var n=this,r=P(n),e=r.reject,o=T(function(){h(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return o&&e(o.error),r.promise}})},function(t,n,r){"use strict";var e=r(61)(!0);r(27)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},function(t,n,r){r(65);for(var e=r(2),o=r(5),i=r(10),c=r(1)("toStringTag"),u=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],s=0;s<5;s++){var f=u[s],a=e[f],p=a&&a.prototype;p&&!p[c]&&o(p,c,f),i[f]=i.Array}},function(t,n){t.exports=__webpack_require__(2081)},function(t,n){t.exports=__webpack_require__(6113)}])});

/***/ }),

/***/ 3188:
/***/ ((module) => {

"use strict";

module.exports = rfdc

function copyBuffer (cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

function rfdc (opts) {
  opts = opts || {}

  if (opts.circles) return rfdcCircles(opts)
  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a)
    var a2 = new Array(keys.length)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]
      var cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur)
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur)
      } else {
        a2[k] = fn(cur)
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {}
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone))
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone))
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = clone(cur)
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {}
    for (var k in o) {
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto))
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto))
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = cloneProto(cur)
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  var refs = []
  var refsNew = []

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    var keys = Object.keys(a)
    var a2 = new Array(keys.length)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]
      var cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur instanceof Date) {
        a2[k] = new Date(cur)
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur)
      } else {
        var index = refs.indexOf(cur)
        if (index !== -1) {
          a2[k] = refsNew[index]
        } else {
          a2[k] = fn(cur)
        }
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
    var o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), clone))
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), clone))
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        var i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = clone(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (o instanceof Date) return new Date(o)
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
    if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
    var o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (var k in o) {
      var cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur instanceof Date) {
        o2[k] = new Date(cur)
      } else if (cur instanceof Map) {
        o2[k] = new Map(cloneArray(Array.from(cur), cloneProto))
      } else if (cur instanceof Set) {
        o2[k] = new Set(cloneArray(Array.from(cur), cloneProto))
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        var i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = cloneProto(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }
}


/***/ }),

/***/ 4745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const RollingFileWriteStream = __webpack_require__(2040);

// just to adapt the previous version
class DateRollingFileStream extends RollingFileWriteStream {
  constructor(filename, pattern, options) {
    if (pattern && typeof(pattern) === 'object') {
      options = pattern;
      pattern = null;
    }
    if (!options) {
      options = {};
    }
    if (!pattern) {
      pattern = 'yyyy-MM-dd';
    }
    options.pattern = pattern;
    if (!options.numBackups && options.numBackups !== 0) {
      if (!options.daysToKeep && options.daysToKeep !== 0) {
        options.daysToKeep = 1;
      } else {
        process.emitWarning(
          "options.daysToKeep is deprecated due to the confusion it causes when used " + 
          "together with file size rolling. Please use options.numBackups instead.",
          "DeprecationWarning", "streamroller-DEP0001"
        );
      }
      options.numBackups = options.daysToKeep;
    } else {
      options.daysToKeep = options.numBackups;
    }
    super(filename, options);
    this.mode = this.options.mode;
  }

  get theStream() {
    return this.currentFileStream;
  }

}

module.exports = DateRollingFileStream;


/***/ }),

/***/ 6667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const RollingFileWriteStream = __webpack_require__(2040);

// just to adapt the previous version
class RollingFileStream extends RollingFileWriteStream {
  constructor(filename, size, backups, options) {
    if (!options) {
      options = {};
    }
    if (size) {
      options.maxSize = size;
    }
    if (!options.numBackups && options.numBackups !== 0) {
      if (!backups && backups !== 0) {
        backups = 1;
      }
      options.numBackups = backups;
    }
    super(filename, options);
    this.backups = options.numBackups;
    this.size = this.options.maxSize;
  }

  get theStream() {
    return this.currentFileStream;
  }

}

module.exports = RollingFileStream;


/***/ }),

/***/ 2040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)("streamroller:RollingFileWriteStream");
const fs = __webpack_require__(9646);
const path = __webpack_require__(1017);
const os = __webpack_require__(2037);
const newNow = __webpack_require__(142);
const format = __webpack_require__(520);
const { Writable } = __webpack_require__(2781);
const fileNameFormatter = __webpack_require__(5651);
const fileNameParser = __webpack_require__(1297);
const moveAndMaybeCompressFile = __webpack_require__(1845);

const deleteFiles = fileNames => {
  debug(`deleteFiles: files to delete: ${fileNames}`);
  return Promise.all(fileNames.map(f => fs.unlink(f).catch((e) => {
    debug(`deleteFiles: error when unlinking ${f}, ignoring. Error was ${e}`);
  })));
};

/**
 * RollingFileWriteStream is mainly used when writing to a file rolling by date or size.
 * RollingFileWriteStream inherits from stream.Writable
 */
class RollingFileWriteStream extends Writable {
  /**
   * Create a RollingFileWriteStream
   * @constructor
   * @param {string} filePath - The file path to write.
   * @param {object} options - The extra options
   * @param {number} options.numToKeep - The max numbers of files to keep.
   * @param {number} options.maxSize - The maxSize one file can reach. Unit is Byte.
   *                                   This should be more than 1024. The default is 0.
   *                                   If not specified or 0, then no log rolling will happen.
   * @param {string} options.mode - The mode of the files. The default is '0600'. Refer to stream.writable for more.
   * @param {string} options.flags - The default is 'a'. Refer to stream.flags for more.
   * @param {boolean} options.compress - Whether to compress backup files.
   * @param {boolean} options.keepFileExt - Whether to keep the file extension.
   * @param {string} options.pattern - The date string pattern in the file name.
   * @param {boolean} options.alwaysIncludePattern - Whether to add date to the name of the first file.
   */
  constructor(filePath, options) {
    debug(`constructor: creating RollingFileWriteStream. path=${filePath}`);
    if (typeof filePath !== "string" || filePath.length === 0) {
      throw new Error(`Invalid filename: ${filePath}`);
    } else if (filePath.endsWith(path.sep)) {
      throw new Error(`Filename is a directory: ${filePath}`);
    } else if (filePath.indexOf(`~${path.sep}`) === 0) {
      // handle ~ expansion: https://github.com/nodejs/node/issues/684
      // exclude ~ and ~filename as these can be valid files
      filePath = filePath.replace("~", os.homedir());
    }
    super(options);
    this.options = this._parseOption(options);
    this.fileObject = path.parse(filePath);
    if (this.fileObject.dir === "") {
      this.fileObject = path.parse(path.join(process.cwd(), filePath));
    }
    this.fileFormatter = fileNameFormatter({
      file: this.fileObject,
      alwaysIncludeDate: this.options.alwaysIncludePattern,
      needsIndex: this.options.maxSize < Number.MAX_SAFE_INTEGER,
      compress: this.options.compress,
      keepFileExt: this.options.keepFileExt,
      fileNameSep: this.options.fileNameSep
    });

    this.fileNameParser = fileNameParser({
      file: this.fileObject,
      keepFileExt: this.options.keepFileExt,
      pattern: this.options.pattern,
      fileNameSep: this.options.fileNameSep
    });

    this.state = {
      currentSize: 0
    };

    if (this.options.pattern) {
      this.state.currentDate = format(this.options.pattern, newNow());
    }

    this.filename = this.fileFormatter({
      index: 0,
      date: this.state.currentDate
    });
    if (["a", "a+", "as", "as+"].includes(this.options.flags)) {
      this._setExistingSizeAndDate();
    }

    debug(
      `constructor: create new file ${this.filename}, state=${JSON.stringify(
        this.state
      )}`
    );
    this._renewWriteStream();
  }

  _setExistingSizeAndDate() {
    try {
      const stats = fs.statSync(this.filename);
      this.state.currentSize = stats.size;
      if (this.options.pattern) {
        this.state.currentDate = format(this.options.pattern, stats.mtime);
      }
    } catch (e) {
      //file does not exist, that's fine - move along
      return;
    }
  }

  _parseOption(rawOptions) {
    const defaultOptions = {
      maxSize: 0,
      numToKeep: Number.MAX_SAFE_INTEGER,
      encoding: "utf8",
      mode: parseInt("0600", 8),
      flags: "a",
      compress: false,
      keepFileExt: false,
      alwaysIncludePattern: false
    };
    const options = Object.assign({}, defaultOptions, rawOptions);
    if (!options.maxSize) {
      delete options.maxSize;
    } else if (options.maxSize <= 0) {
      throw new Error(`options.maxSize (${options.maxSize}) should be > 0`);
    }
    // options.numBackups will supercede options.numToKeep
    if (options.numBackups || options.numBackups === 0) {
      if (options.numBackups < 0) {
        throw new Error(`options.numBackups (${options.numBackups}) should be >= 0`);
      } else if (options.numBackups >= Number.MAX_SAFE_INTEGER) {
        // to cater for numToKeep (include the hot file) at Number.MAX_SAFE_INTEGER
        throw new Error(`options.numBackups (${options.numBackups}) should be < Number.MAX_SAFE_INTEGER`);
      } else {
        options.numToKeep = options.numBackups + 1;
      }
    } else if (options.numToKeep <= 0) {
      throw new Error(`options.numToKeep (${options.numToKeep}) should be > 0`);
    }
    debug(
      `_parseOption: creating stream with option=${JSON.stringify(options)}`
    );
    return options;
  }

  _final(callback) {
    this.currentFileStream.end("", this.options.encoding, callback);
  }

  _write(chunk, encoding, callback) {
    this._shouldRoll().then(() => {
      debug(
        `_write: writing chunk. ` +
          `file=${this.currentFileStream.path} ` +
          `state=${JSON.stringify(this.state)} ` +
          `chunk=${chunk}`
      );
      this.currentFileStream.write(chunk, encoding, e => {
        this.state.currentSize += chunk.length;
        callback(e);
      });
    });
  }

  async _shouldRoll() {
    if (this._dateChanged() || this._tooBig()) {
      debug(
        `_shouldRoll: rolling because dateChanged? ${this._dateChanged()} or tooBig? ${this._tooBig()}`
      );
      await this._roll();
    }
  }

  _dateChanged() {
    return (
      this.state.currentDate &&
      this.state.currentDate !== format(this.options.pattern, newNow())
    );
  }

  _tooBig() {
    return this.state.currentSize >= this.options.maxSize;
  }

  _roll() {
    debug(`_roll: closing the current stream`);
    return new Promise((resolve, reject) => {
      this.currentFileStream.end("", this.options.encoding, () => {
        this._moveOldFiles()
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async _moveOldFiles() {
    const files = await this._getExistingFiles();
    const todaysFiles = this.state.currentDate
      ? files.filter(f => f.date === this.state.currentDate)
      : files;
    for (let i = todaysFiles.length; i >= 0; i--) {
      debug(`_moveOldFiles: i = ${i}`);
      const sourceFilePath = this.fileFormatter({
        date: this.state.currentDate,
        index: i
      });
      const targetFilePath = this.fileFormatter({
        date: this.state.currentDate,
        index: i + 1
      });

      const moveAndCompressOptions = {
        compress: this.options.compress && i === 0,
        mode: this.options.mode
      };
      await moveAndMaybeCompressFile(
        sourceFilePath,
        targetFilePath,
        moveAndCompressOptions
      );
    }

    this.state.currentSize = 0;
    this.state.currentDate = this.state.currentDate
      ? format(this.options.pattern, newNow())
      : null;
    debug(
      `_moveOldFiles: finished rolling files. state=${JSON.stringify(
        this.state
      )}`
    );
    this._renewWriteStream();
    // wait for the file to be open before cleaning up old ones,
    // otherwise the daysToKeep calculations can be off
    await new Promise((resolve, reject) => {
      this.currentFileStream.write("", "utf8", () => {
        this._clean()
          .then(resolve)
          .catch(reject);
      });
    });
  }

  // Sorted from the oldest to the latest
  async _getExistingFiles() {
    const files = await fs.readdir(this.fileObject.dir)
      .catch( /* istanbul ignore next: will not happen on windows */ () => []);

    debug(`_getExistingFiles: files=${files}`);
    const existingFileDetails = files
      .map(n => this.fileNameParser(n))
      .filter(n => n);

    const getKey = n =>
      (n.timestamp ? n.timestamp : newNow().getTime()) - n.index;
    existingFileDetails.sort((a, b) => getKey(a) - getKey(b));

    return existingFileDetails;
  }

  _renewWriteStream() {
    const filePath = this.fileFormatter({
      date: this.state.currentDate,
      index: 0
    });

    // attempt to create the directory
    const mkdir = (dir) => {
      try {
        return fs.mkdirSync(dir, { recursive: true });
      }
      // backward-compatible fs.mkdirSync for nodejs pre-10.12.0 (without recursive option)
      catch (e) {
        // recursive creation of parent first
        if (e.code === "ENOENT") {
          mkdir(path.dirname(dir));
          return mkdir(dir);
        }

        // throw error for all except EEXIST and EROFS (read-only filesystem)
        if (e.code !== "EEXIST" && e.code !== "EROFS") {
          throw e;
        }

        // EEXIST: throw if file and not directory
        // EROFS : throw if directory not found
        else {
          try {
            if (fs.statSync(dir).isDirectory()) {
              return dir;
            }
            throw e;
          } catch (err) {
            throw e;
          }
        }
      }
    };
    mkdir(this.fileObject.dir);

    const ops = {
      flags: this.options.flags,
      encoding: this.options.encoding,
      mode: this.options.mode
    };
    const renameKey = function(obj, oldKey, newKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
      return obj;
    };
    // try to throw EISDIR, EROFS, EACCES
    fs.appendFileSync(filePath, "", renameKey({ ...ops }, "flags", "flag"));
    this.currentFileStream = fs.createWriteStream(filePath, ops);
    this.currentFileStream.on("error", e => {
      this.emit("error", e);
    });
  }

  async _clean() {
    const existingFileDetails = await this._getExistingFiles();
    debug(
      `_clean: numToKeep = ${this.options.numToKeep}, existingFiles = ${existingFileDetails.length}`
    );
    debug("_clean: existing files are: ", existingFileDetails);
    if (this._tooManyFiles(existingFileDetails.length)) {
      const fileNamesToRemove = existingFileDetails
        .slice(0, existingFileDetails.length - this.options.numToKeep)
        .map(f => path.format({ dir: this.fileObject.dir, base: f.filename }));
      await deleteFiles(fileNamesToRemove);
    }
  }

  _tooManyFiles(numFiles) {
    return this.options.numToKeep > 0 && numFiles > this.options.numToKeep;
  }
}

module.exports = RollingFileWriteStream;


/***/ }),

/***/ 5651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)("streamroller:fileNameFormatter");
const path = __webpack_require__(1017);
const ZIP_EXT = ".gz";
const DEFAULT_FILENAME_SEP = ".";

module.exports = ({
  file,
  keepFileExt,
  needsIndex,
  alwaysIncludeDate,
  compress,
  fileNameSep
}) => {
  let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
  const dirAndName = path.join(file.dir, file.name);

  const ext = f => f + file.ext;

  const index = (f, i, d) =>
    (needsIndex || !d) && i ? f + FILENAME_SEP + i : f;

  const date = (f, i, d) => {
    return (i > 0 || alwaysIncludeDate) && d ? f + FILENAME_SEP + d : f;
  };

  const gzip = (f, i) => (i && compress ? f + ZIP_EXT : f);

  const parts = keepFileExt
    ? [date, index, ext, gzip]
    : [ext, date, index, gzip];

  return ({ date, index }) => {
    debug(`_formatFileName: date=${date}, index=${index}`);
    return parts.reduce(
      (filename, part) => part(filename, index, date),
      dirAndName
    );
  };
};


/***/ }),

/***/ 1297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)("streamroller:fileNameParser");
const ZIP_EXT = ".gz";
const format = __webpack_require__(520);
const DEFAULT_FILENAME_SEP = ".";

module.exports = ({ file, keepFileExt, pattern, fileNameSep }) => {
  let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
  // All these functions take two arguments: f, the filename, and p, the result placeholder
  // They return the filename with any matching parts removed.
  // The "zip" function, for instance, removes the ".gz" part of the filename (if present)
  const zip = (f, p) => {
    if (f.endsWith(ZIP_EXT)) {
      debug("it is gzipped");
      p.isCompressed = true;
      return f.slice(0, -1 * ZIP_EXT.length);
    }
    return f;
  };

  const __NOT_MATCHING__ = "__NOT_MATCHING__";

  const extAtEnd = f => {
    if (f.startsWith(file.name) && f.endsWith(file.ext)) {
      debug("it starts and ends with the right things");
      return f.slice(file.name.length + 1, -1 * file.ext.length);
    }
    return __NOT_MATCHING__;
  };

  const extInMiddle = f => {
    if (f.startsWith(file.base)) {
      debug("it starts with the right things");
      return f.slice(file.base.length + 1);
    }
    return __NOT_MATCHING__;
  };

  const dateAndIndex = (f, p) => {
    const items = f.split(FILENAME_SEP);
    let indexStr = items[items.length - 1];
    debug("items: ", items, ", indexStr: ", indexStr);
    let dateStr = f;
    if (indexStr !== undefined && indexStr.match(/^\d+$/)) {
      dateStr = f.slice(0, -1 * (indexStr.length + 1));
      debug(`dateStr is ${dateStr}`);
      if (pattern && !dateStr) {
        dateStr = indexStr;
        indexStr = "0";
      }
    } else {
      indexStr = "0";
    }

    try {
      // Two arguments for new Date() are intentional. This will set other date
      // components to minimal values in the current timezone instead of UTC,
      // as new Date(0) will do.
      const date = format.parse(pattern, dateStr, new Date(0, 0));
      if (format.asString(pattern, date) !== dateStr) return f;
      p.index = parseInt(indexStr, 10);
      p.date = dateStr;
      p.timestamp = date.getTime();
      return "";
    } catch (e) {
      //not a valid date, don't panic.
      debug(`Problem parsing ${dateStr} as ${pattern}, error was: `, e);
      return f;
    }
  };

  const index = (f, p) => {
    if (f.match(/^\d+$/)) {
      debug("it has an index");
      p.index = parseInt(f, 10);
      return "";
    }
    return f;
  };

  let parts = [
    zip,
    keepFileExt ? extAtEnd : extInMiddle,
    pattern ? dateAndIndex : index
  ];

  return filename => {
    let result = { filename, index: 0, isCompressed: false };
    // pass the filename through each of the file part parsers
    let whatsLeftOver = parts.reduce(
      (remains, part) => part(remains, result),
      filename
    );
    // if there's anything left after parsing, then it wasn't a valid filename
    return whatsLeftOver ? null : result;
  };
};


/***/ }),

/***/ 6929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  RollingFileWriteStream: __webpack_require__(2040),
  RollingFileStream: __webpack_require__(6667),
  DateRollingFileStream: __webpack_require__(4745)
};


/***/ }),

/***/ 1845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(5158)('streamroller:moveAndMaybeCompressFile');
const fs = __webpack_require__(9646);
const zlib = __webpack_require__(9796);

const _parseOption = function(rawOptions){
  const defaultOptions = {
    mode: parseInt("0600", 8),
    compress: false,
  };
  const options = Object.assign({}, defaultOptions, rawOptions);
  debug(`_parseOption: moveAndMaybeCompressFile called with option=${JSON.stringify(options)}`);
  return options;
};

const moveAndMaybeCompressFile = async (
  sourceFilePath,
  targetFilePath,
  options
) => {
  options = _parseOption(options);

  if (sourceFilePath === targetFilePath) {
    debug(`moveAndMaybeCompressFile: source and target are the same, not doing anything`);
    return;
  }

  if (await fs.pathExists(sourceFilePath)) {
    debug(
      `moveAndMaybeCompressFile: moving file from ${sourceFilePath} to ${targetFilePath} ${
        options.compress ? "with" : "without"
      } compress`
    );
    if (options.compress) {
      await new Promise((resolve, reject) => {
        let isCreated = false;
        // to avoid concurrency, the forked process which can create the file will proceed (using flags wx)
        const writeStream = fs.createWriteStream(targetFilePath, { mode: options.mode, flags: "wx" })
          // wait until writable stream is valid before proceeding to read
          .on("open", () => {
            isCreated = true;
            const readStream = fs.createReadStream(sourceFilePath)
              // wait until readable stream is valid before piping
              .on("open", () => {
                readStream.pipe(zlib.createGzip()).pipe(writeStream);
              })
              .on("error", (e) => {
                debug(`moveAndMaybeCompressFile: error reading ${sourceFilePath}`, e);
                // manually close writable: https://nodejs.org/api/stream.html#readablepipedestination-options
                writeStream.destroy(e);
              });
          })
          .on("finish", () => {
            debug(`moveAndMaybeCompressFile: finished compressing ${targetFilePath}, deleting ${sourceFilePath}`);
            // delete sourceFilePath
            fs.unlink(sourceFilePath)
              .then(resolve)
              .catch((e) => {
                debug(`moveAndMaybeCompressFile: error deleting ${sourceFilePath}, truncating instead`, e);
                // fallback to truncate
                fs.truncate(sourceFilePath)
                  .then(resolve)
                  .catch((e) => {
                    debug(`moveAndMaybeCompressFile: error truncating ${sourceFilePath}`, e);
                    reject(e);
                  });
              });
          })
          .on("error", (e) => {
            if (!isCreated) {
              debug(`moveAndMaybeCompressFile: error creating ${targetFilePath}`, e);
              // do not do anything if handled by another forked process
              reject(e);
            } else {
              debug(`moveAndMaybeCompressFile: error writing ${targetFilePath}, deleting`, e);
              // delete targetFilePath (taking as nothing happened)
              fs.unlink(targetFilePath)
                .then(() => { reject(e); })
                .catch((e) => {
                  debug(`moveAndMaybeCompressFile: error deleting ${targetFilePath}`, e);
                  reject(e);
                });
            }
          });
      }).catch(() => {});
    } else {
      debug(`moveAndMaybeCompressFile: renaming ${sourceFilePath} to ${targetFilePath}`);
      try {
        await fs.move(sourceFilePath, targetFilePath, { overwrite: true });
      } catch (e) {
        debug(`moveAndMaybeCompressFile: error renaming ${sourceFilePath} to ${targetFilePath}`, e);
        /* istanbul ignore else: no need to do anything if file does not exist */
        if (e.code !== "ENOENT") {
          debug(`moveAndMaybeCompressFile: trying copy+truncate instead`);
          try {
            await fs.copy(sourceFilePath, targetFilePath, { overwrite: true });
            await fs.truncate(sourceFilePath);
          } catch (e) {
            debug(`moveAndMaybeCompressFile: error copy+truncate`, e);
          }
        }
      }
    }
  }
};

module.exports = moveAndMaybeCompressFile;


/***/ }),

/***/ 142:
/***/ ((module) => {

// allows us to inject a mock date in tests
module.exports = () => new Date();


/***/ }),

/***/ 8128:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const mkdirpSync = (__webpack_require__(2690).mkdirsSync)
const utimesSync = (__webpack_require__(3239).utimesMillisSync)
const stat = __webpack_require__(5432)

function copySync (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  opts = opts || {}
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy')
  stat.checkParentPathsSync(src, srcStat, dest, 'copy')
  return handleFilterAndCopy(destStat, src, dest, opts)
}

function handleFilterAndCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  const destParent = path.dirname(dest)
  if (!fs.existsSync(destParent)) mkdirpSync(destParent)
  return startCopy(destStat, src, dest, opts)
}

function startCopy (destStat, src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  return getStats(destStat, src, dest, opts)
}

function getStats (destStat, src, dest, opts) {
  const statSync = opts.dereference ? fs.statSync : fs.lstatSync
  const srcStat = statSync(src)

  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
  else if (srcStat.isFile() ||
           srcStat.isCharacterDevice() ||
           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
}

function onFile (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile(srcStat, src, dest, opts)
  return mayCopyFile(srcStat, src, dest, opts)
}

function mayCopyFile (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs.unlinkSync(dest)
    return copyFile(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile (srcStat, src, dest, opts) {
  if (typeof fs.copyFileSync === 'function') {
    fs.copyFileSync(src, dest)
    fs.chmodSync(dest, srcStat.mode)
    if (opts.preserveTimestamps) {
      return utimesSync(dest, srcStat.atime, srcStat.mtime)
    }
    return
  }
  return copyFileFallback(srcStat, src, dest, opts)
}

function copyFileFallback (srcStat, src, dest, opts) {
  const BUF_LENGTH = 64 * 1024
  const _buff = __webpack_require__(5389)(BUF_LENGTH)

  const fdr = fs.openSync(src, 'r')
  const fdw = fs.openSync(dest, 'w', srcStat.mode)
  let pos = 0

  while (pos < srcStat.size) {
    const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

function onDir (srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)
  if (destStat && !destStat.isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
  }
  return copyDir(src, dest, opts)
}

function mkDirAndCopy (srcStat, src, dest, opts) {
  fs.mkdirSync(dest)
  copyDir(src, dest, opts)
  return fs.chmodSync(dest, srcStat.mode)
}

function copyDir (src, dest, opts) {
  fs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts))
}

function copyDirItem (item, src, dest, opts) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy')
  return startCopy(destStat, srcItem, destItem, opts)
}

function onLink (destStat, src, dest, opts) {
  let resolvedSrc = fs.readlinkSync(src)
  if (opts.dereference) {
    resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
  }

  if (!destStat) {
    return fs.symlinkSync(resolvedSrc, dest)
  } else {
    let resolvedDest
    try {
      resolvedDest = fs.readlinkSync(dest)
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)
      throw err
    }
    if (opts.dereference) {
      resolvedDest = path.resolve(process.cwd(), resolvedDest)
    }
    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
    }

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
    }
    return copyLink(resolvedSrc, dest)
  }
}

function copyLink (resolvedSrc, dest) {
  fs.unlinkSync(dest)
  return fs.symlinkSync(resolvedSrc, dest)
}

module.exports = copySync


/***/ }),

/***/ 8755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  copySync: __webpack_require__(8128)
}


/***/ }),

/***/ 1127:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const mkdirp = (__webpack_require__(2690).mkdirs)
const pathExists = (__webpack_require__(2576).pathExists)
const utimes = (__webpack_require__(3239).utimesMillis)
const stat = __webpack_require__(5432)

function copy (src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts
    opts = {}
  } else if (typeof opts === 'function') {
    opts = { filter: opts }
  }

  cb = cb || function () {}
  opts = opts || {}

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  stat.checkPaths(src, dest, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'copy', err => {
      if (err) return cb(err)
      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
      return checkParentDir(destStat, src, dest, opts, cb)
    })
  })
}

function checkParentDir (destStat, src, dest, opts, cb) {
  const destParent = path.dirname(dest)
  pathExists(destParent, (err, dirExists) => {
    if (err) return cb(err)
    if (dirExists) return startCopy(destStat, src, dest, opts, cb)
    mkdirp(destParent, err => {
      if (err) return cb(err)
      return startCopy(destStat, src, dest, opts, cb)
    })
  })
}

function handleFilter (onInclude, destStat, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest)).then(include => {
    if (include) return onInclude(destStat, src, dest, opts, cb)
    return cb()
  }, error => cb(error))
}

function startCopy (destStat, src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)
  return getStats(destStat, src, dest, opts, cb)
}

function getStats (destStat, src, dest, opts, cb) {
  const stat = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err, srcStat) => {
    if (err) return cb(err)

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isFile() ||
             srcStat.isCharacterDevice() ||
             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)
  })
}

function onFile (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)
  return mayCopyFile(srcStat, src, dest, opts, cb)
}

function mayCopyFile (srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    fs.unlink(dest, err => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat, src, dest, opts, cb) {
  if (typeof fs.copyFile === 'function') {
    return fs.copyFile(src, dest, err => {
      if (err) return cb(err)
      return setDestModeAndTimestamps(srcStat, dest, opts, cb)
    })
  }
  return copyFileFallback(srcStat, src, dest, opts, cb)
}

function copyFileFallback (srcStat, src, dest, opts, cb) {
  const rs = fs.createReadStream(src)
  rs.on('error', err => cb(err)).once('open', () => {
    const ws = fs.createWriteStream(dest, { mode: srcStat.mode })
    ws.on('error', err => cb(err))
      .on('open', () => rs.pipe(ws))
      .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))
  })
}

function setDestModeAndTimestamps (srcStat, dest, opts, cb) {
  fs.chmod(dest, srcStat.mode, err => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) {
      return utimes(dest, srcStat.atime, srcStat.mtime, cb)
    }
    return cb()
  })
}

function onDir (srcStat, destStat, src, dest, opts, cb) {
  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb)
  if (destStat && !destStat.isDirectory()) {
    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
  }
  return copyDir(src, dest, opts, cb)
}

function mkDirAndCopy (srcStat, src, dest, opts, cb) {
  fs.mkdir(dest, err => {
    if (err) return cb(err)
    copyDir(src, dest, opts, err => {
      if (err) return cb(err)
      return fs.chmod(dest, srcStat.mode, cb)
    })
  })
}

function copyDir (src, dest, opts, cb) {
  fs.readdir(src, (err, items) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items, src, dest, opts, cb) {
  const item = items.pop()
  if (!item) return cb()
  return copyDirItem(items, item, src, dest, opts, cb)
}

function copyDirItem (items, item, src, dest, opts, cb) {
  const srcItem = path.join(src, item)
  const destItem = path.join(dest, item)
  stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
    if (err) return cb(err)
    const { destStat } = stats
    startCopy(destStat, srcItem, destItem, opts, err => {
      if (err) return cb(err)
      return copyDirItems(items, src, dest, opts, cb)
    })
  })
}

function onLink (destStat, src, dest, opts, cb) {
  fs.readlink(src, (err, resolvedSrc) => {
    if (err) return cb(err)
    if (opts.dereference) {
      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)
    }

    if (!destStat) {
      return fs.symlink(resolvedSrc, dest, cb)
    } else {
      fs.readlink(dest, (err, resolvedDest) => {
        if (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)
          return cb(err)
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest)
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
        }

        // do not copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
        }
        return copyLink(resolvedSrc, dest, cb)
      })
    }
  })
}

function copyLink (resolvedSrc, dest, cb) {
  fs.unlink(dest, err => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrc, dest, cb)
  })
}

module.exports = copy


/***/ }),

/***/ 2268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
module.exports = {
  copy: u(__webpack_require__(1127))
}


/***/ }),

/***/ 9850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const mkdir = __webpack_require__(2690)
const remove = __webpack_require__(2734)

const emptyDir = u(function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, (err, items) => {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(item => path.join(dir, item))

    deleteItem()

    function deleteItem () {
      const item = items.pop()
      if (!item) return callback()
      remove.remove(item, err => {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
})

function emptyDirSync (dir) {
  let items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}


/***/ }),

/***/ 3005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const path = __webpack_require__(1017)
const fs = __webpack_require__(77)
const mkdir = __webpack_require__(2690)
const pathExists = (__webpack_require__(2576).pathExists)

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = path.dirname(file)
    pathExists(dir, (err, dirExists) => {
      if (err) return callback(err)
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  let stats
  try {
    stats = fs.statSync(file)
  } catch (e) {}
  if (stats && stats.isFile()) return

  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: u(createFile),
  createFileSync
}


/***/ }),

/***/ 6906:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const file = __webpack_require__(3005)
const link = __webpack_require__(5014)
const symlink = __webpack_require__(8707)

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}


/***/ }),

/***/ 5014:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const path = __webpack_require__(1017)
const fs = __webpack_require__(77)
const mkdir = __webpack_require__(2690)
const pathExists = (__webpack_require__(2576).pathExists)

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null)
    })
  }

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      const dir = path.dirname(dstpath)
      pathExists(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir = path.dirname(dstpath)
  const dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: u(createLink),
  createLinkSync
}


/***/ }),

/***/ 2148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(1017)
const fs = __webpack_require__(77)
const pathExists = (__webpack_require__(2576).pathExists)

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    return pathExists(relativeToDst, (err, exists) => {
      if (err) return callback(err)
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  let exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  symlinkPaths,
  symlinkPathsSync
}


/***/ }),

/***/ 8805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  let stats

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType,
  symlinkTypeSync
}


/***/ }),

/***/ 8707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const path = __webpack_require__(1017)
const fs = __webpack_require__(77)
const _mkdirs = __webpack_require__(2690)
const mkdirs = _mkdirs.mkdirs
const mkdirsSync = _mkdirs.mkdirsSync

const _symlinkPaths = __webpack_require__(2148)
const symlinkPaths = _symlinkPaths.symlinkPaths
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

const _symlinkType = __webpack_require__(8805)
const symlinkType = _symlinkType.symlinkType
const symlinkTypeSync = _symlinkType.symlinkTypeSync

const pathExists = (__webpack_require__(2576).pathExists)

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  pathExists(dstpath, (err, destinationExists) => {
    if (err) return callback(err)
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err)
        const dir = path.dirname(dstpath)
        pathExists(dir, (err, dirExists) => {
          if (err) return callback(err)
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, err => {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = path.dirname(dstpath)
  const exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: u(createSymlink),
  createSymlinkSync
}


/***/ }),

/***/ 1690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const fs = __webpack_require__(77)

const api = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'lchmod',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
].filter(key => {
  // Some commands are not available on some systems. Ex:
  // fs.copyFile was added in Node.js v8.5.0
  // fs.mkdtemp was added in Node.js v5.10.0
  // fs.lchown is not available on at least some Linux
  return typeof fs[key] === 'function'
})

// Export all keys:
Object.keys(fs).forEach(key => {
  if (key === 'promises') {
    // fs.promises is a getter property that triggers ExperimentalWarning
    // Don't re-export it here, the getter is defined in "lib/index.js"
    return
  }
  exports[key] = fs[key]
})

// Universalify async methods:
api.forEach(method => {
  exports[method] = u(fs[method])
})

// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
exports.exists = function (filename, callback) {
  if (typeof callback === 'function') {
    return fs.exists(filename, callback)
  }
  return new Promise(resolve => {
    return fs.exists(filename, resolve)
  })
}

// fs.read() & fs.write need special treatment due to multiple callback args

exports.read = function (fd, buffer, offset, length, position, callback) {
  if (typeof callback === 'function') {
    return fs.read(fd, buffer, offset, length, position, callback)
  }
  return new Promise((resolve, reject) => {
    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
      if (err) return reject(err)
      resolve({ bytesRead, buffer })
    })
  })
}

// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// We need to handle both cases, so we use ...args
exports.write = function (fd, buffer, ...args) {
  if (typeof args[args.length - 1] === 'function') {
    return fs.write(fd, buffer, ...args)
  }

  return new Promise((resolve, reject) => {
    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
      if (err) return reject(err)
      resolve({ bytesWritten, buffer })
    })
  })
}

// fs.realpath.native only available in Node v9.2+
if (typeof fs.realpath.native === 'function') {
  exports.realpath.native = u(fs.realpath.native)
}


/***/ }),

/***/ 9646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = Object.assign(
  {},
  // Export promiseified graceful-fs:
  __webpack_require__(1690),
  // Export extra methods:
  __webpack_require__(8755),
  __webpack_require__(2268),
  __webpack_require__(9850),
  __webpack_require__(6906),
  __webpack_require__(6653),
  __webpack_require__(2690),
  __webpack_require__(7924),
  __webpack_require__(5825),
  __webpack_require__(3313),
  __webpack_require__(2576),
  __webpack_require__(2734)
)

// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const fs = __webpack_require__(7147)
if (Object.getOwnPropertyDescriptor(fs, 'promises')) {
  Object.defineProperty(module.exports, "promises", ({
    get () { return fs.promises }
  }))
}


/***/ }),

/***/ 6653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const jsonFile = __webpack_require__(6267)

jsonFile.outputJson = u(__webpack_require__(3885))
jsonFile.outputJsonSync = __webpack_require__(5942)
// aliases
jsonFile.outputJSON = jsonFile.outputJson
jsonFile.outputJSONSync = jsonFile.outputJsonSync
jsonFile.writeJSON = jsonFile.writeJson
jsonFile.writeJSONSync = jsonFile.writeJsonSync
jsonFile.readJSON = jsonFile.readJson
jsonFile.readJSONSync = jsonFile.readJsonSync

module.exports = jsonFile


/***/ }),

/***/ 6267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const jsonFile = __webpack_require__(592)

module.exports = {
  // jsonfile exports
  readJson: u(jsonFile.readFile),
  readJsonSync: jsonFile.readFileSync,
  writeJson: u(jsonFile.writeFile),
  writeJsonSync: jsonFile.writeFileSync
}


/***/ }),

/***/ 5942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const mkdir = __webpack_require__(2690)
const jsonFile = __webpack_require__(6267)

function outputJsonSync (file, data, options) {
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),

/***/ 3885:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(1017)
const mkdir = __webpack_require__(2690)
const pathExists = (__webpack_require__(2576).pathExists)
const jsonFile = __webpack_require__(6267)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const dir = path.dirname(file)

  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),

/***/ 2690:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const mkdirs = u(__webpack_require__(3172))
const mkdirsSync = __webpack_require__(3249)

module.exports = {
  mkdirs,
  mkdirsSync,
  // alias
  mkdirp: mkdirs,
  mkdirpSync: mkdirsSync,
  ensureDir: mkdirs,
  ensureDirSync: mkdirsSync
}


/***/ }),

/***/ 3249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const invalidWin32Path = (__webpack_require__(8038).invalidWin32Path)

const o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    throw errInval
  }

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    if (err0.code === 'ENOENT') {
      if (path.dirname(p) === p) throw err0
      made = mkdirsSync(path.dirname(p), opts, made)
      mkdirsSync(p, opts, made)
    } else {
      // In the case of any other error, just see if there's a dir there
      // already. If so, then hooray!  If not, then something is borked.
      let stat
      try {
        stat = xfs.statSync(p)
      } catch (err1) {
        throw err0
      }
      if (!stat.isDirectory()) throw err0
    }
  }

  return made
}

module.exports = mkdirsSync


/***/ }),

/***/ 3172:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const invalidWin32Path = (__webpack_require__(8038).invalidWin32Path)

const o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, er => {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, (er, made) => {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, (er2, stat) => {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs


/***/ }),

/***/ 8038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(1017)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
const INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath,
  invalidWin32Path
}


/***/ }),

/***/ 7924:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  moveSync: __webpack_require__(5808)
}


/***/ }),

/***/ 5808:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const copySync = (__webpack_require__(8755).copySync)
const removeSync = (__webpack_require__(2734).removeSync)
const mkdirpSync = (__webpack_require__(2690).mkdirpSync)
const stat = __webpack_require__(5432)

function moveSync (src, dest, opts) {
  opts = opts || {}
  const overwrite = opts.overwrite || opts.clobber || false

  const { srcStat } = stat.checkPathsSync(src, dest, 'move')
  stat.checkParentPathsSync(src, srcStat, dest, 'move')
  mkdirpSync(path.dirname(dest))
  return doRename(src, dest, overwrite)
}

function doRename (src, dest, overwrite) {
  if (overwrite) {
    removeSync(dest)
    return rename(src, dest, overwrite)
  }
  if (fs.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src, dest, overwrite) {
  try {
    fs.renameSync(src, dest)
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copySync(src, dest, opts)
  return removeSync(src)
}

module.exports = moveSync


/***/ }),

/***/ 5825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
module.exports = {
  move: u(__webpack_require__(6967))
}


/***/ }),

/***/ 6967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const copy = (__webpack_require__(2268).copy)
const remove = (__webpack_require__(2734).remove)
const mkdirp = (__webpack_require__(2690).mkdirp)
const pathExists = (__webpack_require__(2576).pathExists)
const stat = __webpack_require__(5432)

function move (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  const overwrite = opts.overwrite || opts.clobber || false

  stat.checkPaths(src, dest, 'move', (err, stats) => {
    if (err) return cb(err)
    const { srcStat } = stats
    stat.checkParentPaths(src, srcStat, dest, 'move', err => {
      if (err) return cb(err)
      mkdirp(path.dirname(dest), err => {
        if (err) return cb(err)
        return doRename(src, dest, overwrite, cb)
      })
    })
  })
}

function doRename (src, dest, overwrite, cb) {
  if (overwrite) {
    return remove(dest, err => {
      if (err) return cb(err)
      return rename(src, dest, overwrite, cb)
    })
  }
  pathExists(dest, (err, destExists) => {
    if (err) return cb(err)
    if (destExists) return cb(new Error('dest already exists.'))
    return rename(src, dest, overwrite, cb)
  })
}

function rename (src, dest, overwrite, cb) {
  fs.rename(src, dest, err => {
    if (!err) return cb()
    if (err.code !== 'EXDEV') return cb(err)
    return moveAcrossDevice(src, dest, overwrite, cb)
  })
}

function moveAcrossDevice (src, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  }
  copy(src, dest, opts, err => {
    if (err) return cb(err)
    return remove(src, cb)
  })
}

module.exports = move


/***/ }),

/***/ 3313:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const mkdir = __webpack_require__(2690)
const pathExists = (__webpack_require__(2576).pathExists)

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  pathExists(dir, (err, itDoes) => {
    if (err) return callback(err)
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, ...args) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync(file, ...args)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync(file, ...args)
}

module.exports = {
  outputFile: u(outputFile),
  outputFileSync
}


/***/ }),

/***/ 2576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const u = (__webpack_require__(2096)/* .fromPromise */ .p)
const fs = __webpack_require__(1690)

function pathExists (path) {
  return fs.access(path).then(() => true).catch(() => false)
}

module.exports = {
  pathExists: u(pathExists),
  pathExistsSync: fs.existsSync
}


/***/ }),

/***/ 2734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const u = (__webpack_require__(2096)/* .fromCallback */ .E)
const rimraf = __webpack_require__(4792)

module.exports = {
  remove: u(rimraf),
  removeSync: rimraf.sync
}


/***/ }),

/***/ 4792:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)
const assert = __webpack_require__(9491)

const isWindows = (process.platform === 'win32')

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
}

function rimraf (p, options, cb) {
  let busyTries = 0

  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  rimraf_(p, options, function CB (er) {
    if (er) {
      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++
        const time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null
    }

    cb(er)
  })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er) {
    assert(er instanceof Error)
  }

  options.chmod(p, 0o666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er)
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er)
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb)
        } else {
          options.unlink(p, cb)
        }
      })
    }
  })
}

function fixWinEPERMSync (p, options, er) {
  let stats

  assert(p)
  assert(options)
  if (er) {
    assert(er instanceof Error)
  }

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er)
  } else {
    options.unlinkSync(p)
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb)
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr)
    } else {
      cb(er)
    }
  })
}

function rmkids (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length
    let errState

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb)
        }
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st

  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')

  try {
    st = options.lstatSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er)
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null)
    } else {
      options.unlinkSync(p)
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er)
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options)
    } else if (er.code !== 'ENOENT') {
      throw er
    }
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  if (isWindows) {
    // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.
    const startTime = Date.now()
    do {
      try {
        const ret = options.rmdirSync(p, options)
        return ret
      } catch (er) { }
    } while (Date.now() - startTime < 500) // give up after 500ms
  } else {
    const ret = options.rmdirSync(p, options)
    return ret
  }
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),

/***/ 5389:
/***/ ((module) => {

"use strict";

/* eslint-disable node/no-deprecated-api */
module.exports = function (size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    try {
      return Buffer.allocUnsafe(size)
    } catch (e) {
      return new Buffer(size)
    }
  }
  return new Buffer(size)
}


/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const path = __webpack_require__(1017)

const NODE_VERSION_MAJOR_WITH_BIGINT = 10
const NODE_VERSION_MINOR_WITH_BIGINT = 5
const NODE_VERSION_PATCH_WITH_BIGINT = 0
const nodeVersion = process.versions.node.split('.')
const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10)
const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10)
const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10)

function nodeSupportsBigInt () {
  if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
    return true
  } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
    if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
      return true
    } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
      if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
        return true
      }
    }
  }
  return false
}

function getStats (src, dest, cb) {
  if (nodeSupportsBigInt()) {
    fs.stat(src, { bigint: true }, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  } else {
    fs.stat(src, (err, srcStat) => {
      if (err) return cb(err)
      fs.stat(dest, (err, destStat) => {
        if (err) {
          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
          return cb(err)
        }
        return cb(null, { srcStat, destStat })
      })
    })
  }
}

function getStatsSync (src, dest) {
  let srcStat, destStat
  if (nodeSupportsBigInt()) {
    srcStat = fs.statSync(src, { bigint: true })
  } else {
    srcStat = fs.statSync(src)
  }
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(dest, { bigint: true })
    } else {
      destStat = fs.statSync(dest)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

function checkPaths (src, dest, funcName, cb) {
  getStats(src, dest, (err, stats) => {
    if (err) return cb(err)
    const { srcStat, destStat } = stats
    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      return cb(new Error('Source and destination must not be the same.'))
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      return cb(new Error(errMsg(src, dest, funcName)))
    }
    return cb(null, { srcStat, destStat })
  })
}

function checkPathsSync (src, dest, funcName) {
  const { srcStat, destStat } = getStatsSync(src, dest)
  if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error('Source and destination must not be the same.')
  }
  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
function checkParentPaths (src, srcStat, dest, funcName, cb) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
  if (nodeSupportsBigInt()) {
    fs.stat(destParent, { bigint: true }, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  } else {
    fs.stat(destParent, (err, destStat) => {
      if (err) {
        if (err.code === 'ENOENT') return cb()
        return cb(err)
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src, dest, funcName)))
      }
      return checkParentPaths(src, srcStat, destParent, funcName, cb)
    })
  }
}

function checkParentPathsSync (src, srcStat, dest, funcName) {
  const srcParent = path.resolve(path.dirname(src))
  const destParent = path.resolve(path.dirname(dest))
  if (destParent === srcParent || destParent === path.parse(destParent).root) return
  let destStat
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs.statSync(destParent, { bigint: true })
    } else {
      destStat = fs.statSync(destParent)
    }
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src, dest) {
  const srcArr = path.resolve(src).split(path.sep).filter(i => i)
  const destArr = path.resolve(dest).split(path.sep).filter(i => i)
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
}

function errMsg (src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

module.exports = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir
}


/***/ }),

/***/ 3239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(77)
const os = __webpack_require__(2037)
const path = __webpack_require__(1017)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  const fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', (err, fd) => {
      if (err) return callback(err)
      fs.futimes(fd, d, d, err => {
        if (err) return callback(err)
        fs.close(fd, err => {
          if (err) return callback(err)
          fs.stat(tmpfile, (err, stats) => {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

function utimesMillisSync (path, atime, mtime) {
  const fd = fs.openSync(path, 'r+')
  fs.futimesSync(fd, atime, mtime)
  return fs.closeSync(fd)
}

module.exports = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis,
  utimesMillisSync
}


/***/ }),

/***/ 592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _fs
try {
  _fs = __webpack_require__(77)
} catch (_) {
  _fs = __webpack_require__(7147)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  if ('throws' in options) {
    shouldThrow = options.throws
  }

  try {
    var content = fs.readFileSync(file, options)
    content = stripBom(content)
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function stringify (obj, options) {
  var spaces
  var EOL = '\n'
  if (typeof options === 'object' && options !== null) {
    if (options.spaces) {
      spaces = options.spaces
    }
    if (options.EOL) {
      EOL = options.EOL
    }
  }

  var str = JSON.stringify(obj, options ? options.replacer : null, spaces)

  return str.replace(/\n/g, EOL) + EOL
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var str = ''
  try {
    str = stringify(obj, options)
  } catch (err) {
    // Need to return whether a callback was passed or not
    if (callback) callback(err, null)
    return
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var str = stringify(obj, options)
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),

/***/ 2096:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.E = function (fn) {
  return Object.defineProperty(function () {
    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
    else {
      return new Promise((resolve, reject) => {
        arguments[arguments.length] = (err, res) => {
          if (err) return reject(err)
          resolve(res)
        }
        arguments.length++
        fn.apply(this, arguments)
      })
    }
  }, 'name', { value: fn.name })
}

exports.p = function (fn) {
  return Object.defineProperty(function () {
    const cb = arguments[arguments.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, arguments)
    else fn.apply(this, arguments).then(r => cb(null, r), cb)
  }, 'name', { value: fn.name })
}


/***/ }),

/***/ 2130:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(2037);
const tty = __webpack_require__(6224);
const hasFlag = __webpack_require__(6560);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 3002:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CapacitorSplashScreen = exports.configCapacitor = void 0;
var config_1 = __importDefault(__webpack_require__(8913));
var fs_1 = __importDefault(__webpack_require__(7147));
var path_1 = __importDefault(__webpack_require__(1017));
var url_1 = __importDefault(__webpack_require__(7310));
var electron_1 = __webpack_require__(2298);
var logger_1 = __importDefault(__webpack_require__(6645));
var util_1 = __webpack_require__(3980);
var utils_1 = __webpack_require__(5928);
function getURLFileContents(path) {
    console.trace();
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, function (err, data) {
            if (err)
                reject(err);
            resolve(data.toString());
        });
    });
}
function getUserAgent(webContents) {
    return webContents.userAgent || webContents.getUserAgent() || "";
}
var capacitorConfig = (0, util_1.getStaticResource)("./electron/capacitor.config.json");
var configCapacitor = function (mainWindow) {
    return __awaiter(this, void 0, void 0, function () {
        var start, ua, capConfigJson, appendUserAgent, overrideUserAgent;
        return __generator(this, function (_a) {
            start = Date.now();
            ua = getUserAgent(mainWindow.webContents);
            capConfigJson = JSON.parse(fs_1.default.readFileSync(capacitorConfig, "utf-8"));
            logger_1.default.info("===configCapacitor time", Date.now() - start);
            appendUserAgent = capConfigJson.electron && capConfigJson.electron.appendUserAgent
                ? capConfigJson.electron.appendUserAgent
                : capConfigJson.appendUserAgent;
            if (appendUserAgent) {
                mainWindow.webContents.setUserAgent(ua + " " + appendUserAgent);
            }
            overrideUserAgent = capConfigJson.electron && capConfigJson.electron.overrideUserAgent
                ? capConfigJson.electron.overrideUserAgent
                : capConfigJson.overrideUserAgent;
            if (overrideUserAgent) {
                mainWindow.webContents.setUserAgent(overrideUserAgent);
            }
            mainWindow.webContents.setUserAgent(ua.replace(/ LightNet\/[^ ]*/gi, "").replace(/ Electron\/[^ ]*/gi, ""));
            return [2];
        });
    });
};
exports.configCapacitor = configCapacitor;
var CapacitorSplashScreen = (function () {
    function CapacitorSplashScreen(mainWindow, splashOptions) {
        var _this = this;
        this.splashOptions = {};
        this.mainWindowRef = null;
        if (!splashOptions) {
            splashOptions = {};
        }
        this.splashOptions = {
            imageFileName: splashOptions.imageFileName || "splash.png",
            windowWidth: splashOptions.windowWidth || 400,
            windowHeight: splashOptions.windowHeight || 400,
            textColor: splashOptions.textColor || "#43A8FF",
            loadingText: splashOptions.loadingText || "Loading...",
            textPercentageFromTop: splashOptions.textPercentageFromTop || 75,
            transparentWindow: splashOptions.transparentWindow || false,
            autoHideLaunchSplash: splashOptions.autoHideLaunchSplash != false,
            customHtml: splashOptions.customHtml || false,
        };
        this.mainWindowRef = mainWindow;
        try {
            var capConfigJson = JSON.parse(fs_1.default.readFileSync(capacitorConfig, "utf-8"));
            this.splashOptions = Object.assign(this.splashOptions, capConfigJson.plugins.SplashScreen || {});
        }
        catch (e) {
            logger_1.default.error(e.message);
        }
        var start = Date.now();
        electron_1.ipcMain.on("showCapacitorSplashScreen", function (event, options) {
            _this.show();
            logger_1.default.info("showCapacitorSplashScreen", Date.now() - start);
            if (options) {
                if (options.autoHide) {
                    var showTime = options.showDuration || 3000;
                    setTimeout(function () {
                        _this.hide();
                    }, showTime);
                }
            }
        });
        electron_1.ipcMain.on("hideCapacitorSplashScreen", function (event, options) {
            logger_1.default.info("hideCapacitorSplashScreen", Date.now() - start);
            _this.hide();
        });
    }
    CapacitorSplashScreen.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rootPath, imagePath, imageUrl, useFallback, splashHtml, start;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootPath = electron_1.app.getAppPath();
                        imagePath = path_1.default.join(rootPath, "splash_assets", this.splashOptions.imageFileName);
                        imageUrl = "";
                        useFallback = false;
                        try {
                            imageUrl = url_1.default.pathToFileURL(imagePath).href;
                        }
                        catch (err) {
                            useFallback = true;
                            imageUrl = "./".concat(this.splashOptions.imageFileName);
                        }
                        splashHtml = this.splashOptions.customHtml ||
                            "\n      <html style=\"width: 100%; height: 100%; margin: 0; overflow: hidden;\">\n      <body style=\"background-image: url('".concat(imageUrl, "'); background-position: center center; background-repeat: no-repeat; width: 100%; height: 100%; margin: 0; overflow: hidden;\">       <div style=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ").concat(this.splashOptions.textColor, "; position: absolute; top: ").concat(this.splashOptions.textPercentageFromTop, "%; text-align: center; font-size: 10vw; width: 100vw;\">\n            ").concat(this.splashOptions.loadingText, "\n          </div>\n        </body>\n      </html>\n    ");
                        return [4, (0, utils_1.wait)(500)];
                    case 1:
                        _a.sent();
                        this.mainWindowRef.loadURL("http://127.0.0.1:".concat(config_1.default.port));
                        if (this.splashOptions.autoHideLaunchSplash) {
                            start = Date.now();
                            this.mainWindowRef.show();
                            this.mainWindowRef.webContents.on("dom-ready", function () {
                                _this.mainWindowRef.show();
                            });
                            this.mainWindowRef.webContents.on("did-fail-load", function (err) {
                            });
                        }
                        return [2];
                }
            });
        });
    };
    CapacitorSplashScreen.prototype.show = function () {
        this.mainWindowRef.hide();
    };
    CapacitorSplashScreen.prototype.hide = function () {
        this.splashWindow.hide();
    };
    return CapacitorSplashScreen;
}());
exports.CapacitorSplashScreen = CapacitorSplashScreen;
exports["default"] = {
    configCapacitor: exports.configCapacitor,
    CapacitorSplashScreen: CapacitorSplashScreen,
};


/***/ }),

/***/ 8913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getProjectDistPath = void 0;
var node_machine_id_1 = __webpack_require__(1572);
var md5_1 = __importDefault(__webpack_require__(2568));
var path_1 = __importDefault(__webpack_require__(1017));
var package_json_1 = __importDefault(__webpack_require__(4147));
var commander_1 = __webpack_require__(7461);
var os_1 = __importDefault(__webpack_require__(2037));
var isDev = "production" != "production";
console.info("==============isDev", isDev);
var input = commander_1.program
    .option("-p, --port <type>", "端口", "1080")
    .option("-d, --user-data-dir <type>", "用户存储目录", path_1.default.join(os_1.default.homedir(), isDev ? ".ight-dev" : ".ight"))
    .option("-l, --log", "打印隐藏日志")
    .option("-h, --host <type>", "端口", "127.0.0.1")
    .option("-show-set-host, --show-set-host", "显示设置host")
    .parse(process.argv);
function getProjectDistPath(_path) {
    if (_path === void 0) { _path = ""; }
    var p = _path.replace(/^\//, "");
    if (isDev) {
        p = path_1.default.resolve(p);
    }
    else {
        p = path_1.default.resolve("resources/app.asar/dist/electron", p);
    }
    return p;
}
exports.getProjectDistPath = getProjectDistPath;
var width = 480;
var height = /win/.test(process.platform) ? 800 : 700;
var proxyList = [];
var device = (0, md5_1.default)((0, node_machine_id_1.machineIdSync)()).toUpperCase();
var Config = {
    isDev: isDev,
    appVersion: package_json_1.default.version,
    appVersionCode: package_json_1.default["versionCode"],
    appName: package_json_1.default.name,
    electronUpdateUrl: "https://dl.light-network.net/app",
    port: 5858,
    homedir: function (str) {
        var home = os_1.default.homedir();
        return str ? path_1.default.join(home, str) : home;
    },
    width: width,
    height: height,
    frame: true,
    device: device,
    userSecret: "",
    proxyList: proxyList,
    addProxyList: function (list) {
        proxyList.push.apply(proxyList, __spreadArray([], __read(list), false));
    },
};
exports["default"] = Config;


/***/ }),

/***/ 706:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var http_1 = __importDefault(__webpack_require__(3685));
var config_1 = __importDefault(__webpack_require__(8913));
var fs_1 = __importDefault(__webpack_require__(7147));
var util_1 = __webpack_require__(3980);
var logger_1 = __importDefault(__webpack_require__(6645));
var electron_1 = __webpack_require__(2298);
var server = http_1.default.createServer(function (req, res) {
    var reqStart = Date.now();
    var _path = req.url || '';
    _path = _path == '/' ? '/index.html' : _path;
    _path = (0, util_1.getStaticResource)(_path);
    var suff = _path.replace(/[?].*/, '');
    var lastIdx = suff.lastIndexOf('.');
    suff = lastIdx > suff.length - 6 ? suff.substring(lastIdx) : '';
    if (!suff) {
        _path = (0, util_1.getStaticResource)('/index.html');
        suff = '.html';
    }
    var mtype = mimeType(suff);
    fs_1.default.readFile(_path, function (err, data) {
        if (err) {
            res.writeHead(404, { 'content-type': mtype });
            res.end();
            logger_1.default.info("req ", req.url, 404);
            return;
        }
        res.writeHead(200, { 'content-type': mtype + '; charset=utf8' });
        res.end(data);
    });
});
function mimeType(suff) {
    switch (suff) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.htm':
        case '.html':
            return 'text/html';
        case '.ico':
            return 'image/vnd.microsoft.icon';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.css':
            return 'text/css';
        case '.txt':
            return 'text/plain';
        case '.map':
            return 'text/plain';
        case '.svg':
            return 'image/svg+xml';
        case '.ttf':
            return 'font/ttf';
        case '.woff':
            return 'application/font-woff';
    }
    return 'text/plain';
}
server.listen(0, "127.0.0.1", function () {
    var address = server.address();
    config_1.default.port = typeof address == 'string' ? parseInt(address.substring(address.indexOf(':'))) : (address === null || address === void 0 ? void 0 : address.port) || 0;
    logger_1.default.console.info('http server port ', config_1.default.port);
});
electron_1.app.on('quit', function () {
    server.close();
    process.exit();
});


/***/ }),

/***/ 8519:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var electron_1 = __webpack_require__(2298);
__webpack_require__(706);
var bridge_1 = __webpack_require__(3002);
var config_1 = __importDefault(__webpack_require__(8913));
var util_1 = __webpack_require__(3980);
var logger_1 = __importDefault(__webpack_require__(6645));
var ui_tray_1 = __importDefault(__webpack_require__(9309));
electron_1.app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
electron_1.app.commandLine.appendSwitch("--disable-web-security");
var mainWindow;
var appTray;
var splashScreen;
var useSplashScreen = true;
var start = Date.now();
electron_1.ipcMain.on("test", function (event, arg) {
    console.log("message test", event, arg);
});
function getScreen() {
    try {
        var width = electron_1.screen.getPrimaryDisplay().workAreaSize.width;
        var height = electron_1.screen.getPrimaryDisplay().workAreaSize.height;
        return { width: width, height: height };
    }
    catch (err) {
        return {
            width: 1440,
            height: 760,
        };
    }
}
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, width, height;
        return __generator(this, function (_b) {
            _a = getScreen(), width = _a.width, height = _a.height;
            mainWindow = new electron_1.BrowserWindow({
                width: Math.floor(width * 0.9),
                minWidth: Math.floor(width * 0.5),
                maxWidth: width,
                height: Math.floor(height * 0.9),
                minHeight: Math.floor(height * 0.75),
                maxHeight: height,
                frame: true,
                icon: (0, util_1.getStaticResource)("logo.png"),
                show: true,
                webPreferences: {
                    nodeIntegration: false,
                    nodeIntegrationInWorker: false,
                    preload: (0, util_1.getStaticResource)("./preload/preload.js"),
                    plugins: true,
                    scrollBounce: true,
                    devTools: config_1.default.isDev ? true : false,
                    webSecurity: false,
                },
            });
            logger_1.default.info("===========open window========");
            (0, bridge_1.configCapacitor)(mainWindow);
            electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate([]));
            if (config_1.default.isDev) {
                mainWindow.webContents.openDevTools();
            }
            console.info("===========useSplashScreen", useSplashScreen);
            if (useSplashScreen) {
                splashScreen = new bridge_1.CapacitorSplashScreen(mainWindow);
                splashScreen.init();
            }
            else {
                setTimeout(function () {
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.on("dom-ready", function () {
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
                    });
                }, 2000);
            }
            appTray = (0, ui_tray_1.default)(mainWindow);
            return [2, {
                    window: mainWindow,
                    tray: appTray,
                }];
        });
    });
}
electron_1.app.on("ready", function () { return __awaiter(void 0, void 0, void 0, function () {
    var gotTheLock, filter, timeMap_1, _a, window, tray;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                gotTheLock = electron_1.app.requestSingleInstanceLock();
                logger_1.default.info("ready ", Date.now() - start);
                if (!!gotTheLock) return [3, 1];
                electron_1.app.quit();
                return [3, 3];
            case 1:
                electron_1.app.on("second-instance", function (event, commandLine, workingDirectory) {
                    if (mainWindow) {
                        if (mainWindow.isMinimized())
                            mainWindow.restore();
                        mainWindow.focus();
                        mainWindow.show();
                    }
                });
                filter = {
                    urls: ["*://*/*"],
                };
                timeMap_1 = {};
                electron_1.session.defaultSession.webRequest.onBeforeSendHeaders(filter, function (details, callback) { return __awaiter(void 0, void 0, void 0, function () {
                    var ua;
                    return __generator(this, function (_a) {
                        ua = details.requestHeaders["User-Agent"] || "";
                        details.requestHeaders["User-Agent"] = ua = ua
                            .replace(/ LightNet\/[^ ]*/gi, "")
                            .replace(/ Electron\/[^ ]*/gi, "");
                        timeMap_1[details.url] = Date.now();
                        callback({ requestHeaders: details.requestHeaders });
                        return [2];
                    });
                }); });
                electron_1.session.defaultSession.webRequest.onHeadersReceived(filter, function (details, callback) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        delete timeMap_1[details.url];
                        callback({ responseHeaders: details.responseHeaders });
                        return [2];
                    });
                }); });
                electron_1.session.defaultSession.webRequest.onErrorOccurred(filter, function (details) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        config_1.default.isDev &&
                            logger_1.default.info("req error", padding(details.method, 4), padding(Date.now() - timeMap_1[details.url], 4), parseInt(timeMap_1[details.url] / 1000 + ""), details.error, details.url);
                        delete timeMap_1[details.url];
                        return [2];
                    });
                }); });
                electron_1.session.defaultSession.setCertificateVerifyProc(function (request, callback) {
                    var hostname = request.hostname;
                    callback(0);
                });
                return [4, createWindow()];
            case 2:
                _a = _b.sent(), window = _a.window, tray = _a.tray;
                mainWindow = window;
                appTray = tray;
                _b.label = 3;
            case 3: return [2];
        }
    });
}); });
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
    electron_1.app.quit();
});
electron_1.app.on("activate", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, window, tray;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logger_1.default.info("activate ", Date.now() - start);
                if (!(mainWindow == null)) return [3, 2];
                return [4, createWindow()];
            case 1:
                _a = _b.sent(), window = _a.window, tray = _a.tray;
                mainWindow = window;
                appTray = tray;
                _b.label = 2;
            case 2: return [2];
        }
    });
}); });
function padding(str, length) {
    if (length === void 0) { length = 3; }
    str = String(str);
    if (str.length > length)
        return str.substring(0, length);
    var ar = [];
    for (var i = 0; i < length - str.length; i++)
        ar.push(" ");
    return str + "" + ar.join("");
}
electron_1.app.on("gpu-process-crashed", function (err) {
    logger_1.default.error("GPU进程崩溃，程序退出", err);
    electron_1.app.exit(0);
});
process.on("uncaughtException", function (err) {
    logger_1.default.info("uncaughtException logger", err);
});
electron_1.app.on("ready", function () {
});


/***/ }),

/***/ 9309:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var electron_1 = __webpack_require__(2298);
var logger_1 = __importDefault(__webpack_require__(6645));
var util_1 = __webpack_require__(3980);
var config_1 = __importDefault(__webpack_require__(8913));
function default_1(win, options) {
    options = Object.assign({}, options);
    options.icon = options.icon || (0, util_1.getAppRoot)('dist/logo.png');
    var isTrayQuit = false;
    var trayMenuTemplate = [
        {
            label: 'Open',
            click: function () {
                win.show();
            },
        },
        {
            label: 'Exist',
            click: function () {
                isTrayQuit = true;
                electron_1.app.quit();
                electron_1.app.quit();
            },
        },
    ];
    win.on('close', function (event) {
        if ((0, util_1.isWindows)()) {
            if (!isTrayQuit) {
                event.preventDefault();
                event.returnValue = false;
                win.hide();
            }
            else {
                win.destroy();
                electron_1.app.quit();
                electron_1.app.quit();
            }
        }
        else {
            win.destroy();
            electron_1.app.quit();
            electron_1.app.quit();
        }
    });
    win.on('error', function (error) {
        logger_1.default.error('error', error.messsage);
    });
    var appTray = new electron_1.Tray(options.icon || '');
    var contextMenu = electron_1.Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setToolTip(config_1.default.appName + (config_1.default.isDev ? '-Dev' : ''));
    appTray.setContextMenu(contextMenu);
    appTray.on('click', function () {
        win.show();
    });
    return appTray;
}
exports["default"] = default_1;


/***/ }),

/***/ 5928:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wait = void 0;
function wait(ttl) {
    if (ttl === void 0) { ttl = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ttl); })];
        });
    });
}
exports.wait = wait;


/***/ }),

/***/ 6645:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiThread = exports.Log = void 0;
var log4js_1 = __webpack_require__(4296);
var tcfactor_1 = __importDefault(__webpack_require__(6066));
var electron_1 = __webpack_require__(2298);
var config_1 = __importDefault(__webpack_require__(8913));
var util_1 = __webpack_require__(3980);
var logger = (0, log4js_1.getLogger)();
logger.level = "info";
var isDev = (/* unused pure expression or super */ null && ("production" != "production"));
var filename = (0, util_1.isWindows)() ? "log.log" : config_1.default.homedir("log.log");
console.log("filename", filename);
var layout = {
    type: "pattern",
    pattern: "%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c%] %m",
};
(0, log4js_1.configure)({
    appenders: {
        console: { type: "console", layout: layout },
        log: { type: "file", filename: filename, layout: layout },
    },
    categories: {
        default: { appenders: ["console", "log"], level: logger.level },
        console: { appenders: ["console", "log"], level: logger.level },
    },
});
var Log = (function () {
    function Log(logger) {
        this.categories = {};
        this.logger = logger;
    }
    Log.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.logger).log.apply(_a, __spreadArray(["log"], __read(args), false));
    };
    Log.prototype.isLevelEnabled = function (level) {
        return this.logger.isLevelEnabled(level);
    };
    Log.prototype.isTraceEnabled = function () {
        return this.logger.isTraceEnabled();
    };
    Log.prototype.isDebugEnabled = function () {
        return this.logger.isDebugEnabled();
    };
    Log.prototype.isInfoEnabled = function () {
        return this.logger.isInfoEnabled();
    };
    Log.prototype.isWarnEnabled = function () {
        return this.logger.isWarnEnabled();
    };
    Log.prototype.isErrorEnabled = function () {
        return this.logger.isErrorEnabled();
    };
    Log.prototype.isFatalEnabled = function () {
        return this.logger.isFatalEnabled();
    };
    Log.prototype._log = function (level, data) {
        return this.logger._log(level, data);
    };
    Log.prototype.addContext = function (key, value) {
        return this.logger.addContext(key, value);
    };
    Log.prototype.removeContext = function (key) {
        return this.logger.removeContext(key);
    };
    Log.prototype.clearContext = function () {
        return this.logger.clearContext();
    };
    Log.prototype.trace = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).trace.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.debug = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).debug.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.info = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).info.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.warn = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).warn.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.error = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).error.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.fatal = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.logger).fatal.apply(_a, __spreadArray([message], __read(args), false));
    };
    Log.prototype.getLogger = function (category) {
        if (!this.categories[category])
            this.categories[category] = new Log((0, log4js_1.getLogger)(category));
        return this.categories[category];
    };
    Object.defineProperty(Log.prototype, "console", {
        get: function () {
            return this.getLogger("console");
        },
        enumerable: false,
        configurable: true
    });
    return Log;
}());
exports.Log = Log;
var isMaster = !!electron_1.ipcMain;
var mlogger = new Log(logger);
function multiThread(options) {
    return new tcfactor_1.default({
        app: options.app || "logger",
        env: options.env,
        isMaster: options.isMaster,
        thread: options.thread,
        executor: function () {
            if (options.isMaster) {
                return mlogger;
            }
            else {
                var res = {};
                var _loop_1 = function (key) {
                    var target = Log.prototype[key];
                    if (key.startsWith("_"))
                        return "continue";
                    if (target instanceof Function) {
                        res[key] = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            mlogger[key].bind(mlogger).apply(void 0, __spreadArray([], __read(args), false));
                            return target;
                        };
                    }
                };
                for (var key in Log.prototype) {
                    _loop_1(key);
                }
                return res;
            }
        },
    }).executor;
}
exports.multiThread = multiThread;
var log;
if (electron_1.ipcRenderer || electron_1.ipcMain) {
    log = multiThread({
        app: "logger",
        env: "electron",
        thread: isMaster ? electron_1.ipcMain : electron_1.ipcRenderer,
        isMaster: isMaster,
    });
}
else {
    log = mlogger;
}
exports["default"] = log;


/***/ }),

/***/ 6066:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var events_1 = __webpack_require__(2361);
function makeSendFromWorkerFun(env, event) {
    switch (env) {
        case "electron":
            return function (data) {
                event.reply("message", data);
            };
        case "cluster":
            return function (data) {
                event.send(data);
            };
        case "browser":
            return function (data) {
                var _a;
                (_a = global["self"]) === null || _a === void 0 ? void 0 : _a.postMessage(data, "/");
            };
    }
}
function makeSendFromMainFun(env, thread) {
    switch (env) {
        case "electron":
            return function (data) {
                thread.send("message", data);
            };
        case "cluster":
            return function (data) {
                var _a;
                (_a = thread === null || thread === void 0 ? void 0 : thread.send) === null || _a === void 0 ? void 0 : _a.apply(thread, [data]);
            };
        case "browser":
            return function (data) {
                var _a;
                (_a = global["self"]) === null || _a === void 0 ? void 0 : _a.postMessage(data, "/");
            };
    }
}
var TCFactor = (function (_super) {
    __extends(TCFactor, _super);
    function TCFactor(options) {
        var _this_1 = _super.call(this) || this;
        _this_1.taskCallback = {};
        _this_1.setMaxListeners(9999);
        _this_1.env = options.env;
        _this_1.app = options.app;
        if (TCFactor.___apps[_this_1.app])
            throw new Error("\u5DF2\u7ECF\u5B58\u5728\u5E94\u7528".concat(_this_1.app));
        TCFactor.___apps[_this_1.app] = true;
        _this_1.isMaster = options.isMaster;
        _this_1.executor = options.executor();
        _this_1.thread = options.thread;
        _this_1.initEvent(_this_1.thread);
        return _this_1;
    }
    TCFactor.prototype.initEvent = function (thread) {
        return __awaiter(this, void 0, void 0, function () {
            var _this, executor_1, _loop_1, this_1, key;
            var _this_1 = this;
            return __generator(this, function (_a) {
                _this = this;
                if (!thread)
                    throw new Error("工作线程或进程都不存在");
                if (this.isMaster) {
                    executor_1 = this.executor;
                    thread.on("message", function (event, _a) {
                        var app = _a.app, task = _a.task, method = _a.method, args = _a.args;
                        return __awaiter(_this_1, void 0, void 0, function () {
                            var send, target, value;
                            var _this_1 = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (app != this.app)
                                            return [2];
                                        send = makeSendFromWorkerFun(this.env, event);
                                        if (args[args.length - 1] === "[function]") {
                                            args[args.length - 1] = function (key, value) {
                                                send ? send({ app: app, task: task, code: 2, key: key, value: value }) : console.warn("\u4E3B\u7EBF\u7A0B\u73AF\u5883".concat(_this_1.env, "\u4E0D\u5B58\u5728\u53D1\u9001\u65B9\u6CD5"));
                                            };
                                        }
                                        target = executor_1[method];
                                        value = undefined;
                                        if (!(target instanceof Function)) return [3, 2];
                                        return [4, target.apply(executor_1, args)];
                                    case 1:
                                        value = _b.sent();
                                        return [3, 3];
                                    case 2:
                                        value = target;
                                        _b.label = 3;
                                    case 3:
                                        send ? send({ app: app, task: task, code: 1, value: value }) : console.warn("\u4E3B\u7EBF\u7A0B\u73AF\u5883".concat(this.env, "\u4E0D\u5B58\u5728\u53D1\u9001\u65B9\u6CD5"));
                                        return [2];
                                }
                            });
                        });
                    });
                }
                else {
                    thread.on("message", function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return __awaiter(_this_1, void 0, void 0, function () {
                            var data, app, task, code, value, key;
                            var _a;
                            return __generator(this, function (_b) {
                                data = {};
                                if (this.env == "electron") {
                                    data = args[1];
                                }
                                else if (this.env == "cluster") {
                                    data = args[0];
                                }
                                else {
                                    data = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.data;
                                }
                                app = data.app, task = data.task, code = data.code, value = data.value, key = data.key;
                                this.emit(task, { code: code, value: value, key: key });
                                return [2];
                            });
                        });
                    });
                    _loop_1 = function (key) {
                        if (key.startsWith("_"))
                            return "continue";
                        var targetFun = this_1.executor[key];
                        if (targetFun instanceof Function) {
                            this_1.executor[key] = new Proxy(this_1.executor[key], {
                                apply: function (target, thisArg, args) {
                                    targetFun.bind(target).apply(void 0, __spreadArray([], __read(args), false));
                                    return _this.execute.apply(_this, __spreadArray([key], __read(args), false));
                                },
                            });
                        }
                    };
                    this_1 = this;
                    for (key in this.executor) {
                        _loop_1(key);
                    }
                }
                return [2];
            });
        });
    };
    TCFactor.prototype.execute = function (method) {
        var _this_1 = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isMaster) {
            return this.executor[method].apply(this.executor, args);
        }
        return new Promise(function (resolve, reject) {
            var task = "task-" + Math.floor(Math.random() * 9999999999);
            if (args[args.length - 1] instanceof Function) {
                _this_1.taskCallback[task] = args[args.length - 1];
                args[args.length - 1] = "[function]";
            }
            _this_1.on(task, function (_a) {
                var code = _a.code, value = _a.value, key = _a.key, message = _a.message;
                if (code == 1) {
                    _this_1.removeAllListeners(task);
                    resolve(value);
                }
                else if (code == 2) {
                    _this_1.taskCallback[task](key, value);
                }
                else {
                    reject(new Error(message));
                }
            });
            var send = makeSendFromMainFun(_this_1.env, _this_1.thread);
            send ? send({ app: _this_1.app, task: task, method: method, args: args }) : console.warn("\u5B50\u7EBF\u7A0B\u73AF\u5883".concat(_this_1.env, "\u4E0D\u5B58\u5728\u53D1\u9001\u65B9\u6CD5"));
        });
    };
    TCFactor.___apps = {};
    return TCFactor;
}(events_1.EventEmitter));
exports["default"] = TCFactor;


/***/ }),

/***/ 3980:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buffer2array = exports.cycle = exports.random2Int = exports.bit2Int = exports.int2Bit = exports.string2Bit = exports.md5 = exports.getPage = exports.loadResource = exports.getResourceAbsPath = exports.getAppRoot = exports.getProjectDistPath = exports.getStaticResource = exports.getResourceBrowserPath = exports.isLinux = exports.isMac = exports.isWindows = void 0;
var config_1 = __importDefault(__webpack_require__(8913));
var path_1 = __importDefault(__webpack_require__(1017));
var fs_1 = __importDefault(__webpack_require__(7147));
var isDev = config_1.default.isDev;
function isWindows() {
    return process.platform == "win32";
}
exports.isWindows = isWindows;
function isMac() {
    return process.platform == "darwin";
}
exports.isMac = isMac;
function isLinux() {
    return process.platform == "linux";
}
exports.isLinux = isLinux;
function getResourceBrowserPath(_path) {
    if (_path === void 0) { _path = ""; }
    if (isDev) {
        return "http://127.0.0.1:".concat(config_1.default.port, "/") + _path.replace(/^\//, "");
    }
    else {
        var p = path_1.default.join("file:///", __dirname, "/" + _path.replace(/^\//, ""));
        console.info("res", p);
        return p;
    }
}
exports.getResourceBrowserPath = getResourceBrowserPath;
function getStaticResource(_path) {
    if (_path === void 0) { _path = ""; }
    var p = _path.replace(/^\//, "");
    if (isDev) {
        p = path_1.default.resolve("dist", p);
    }
    else {
        p = path_1.default.join(getAppRoot(), "dist", p);
    }
    return p;
}
exports.getStaticResource = getStaticResource;
function getProjectDistPath(_path) {
    if (_path === void 0) { _path = ""; }
    var p = _path.replace(/^\//, "");
    if (isDev) {
        p = path_1.default.join(getAppRoot(), "", p);
    }
    else {
        p = path_1.default.join(getAppRoot(), "dist/electron", p);
    }
    return p;
}
exports.getProjectDistPath = getProjectDistPath;
function getAppRoot(_path) {
    if (_path === void 0) { _path = ""; }
    var p = _path.replace(/^\//, "");
    if (isDev) {
        p = path_1.default.resolve(p);
    }
    else {
        if (isWindows())
            p = path_1.default.resolve("resources/app.asar/", p);
        else
            p = path_1.default.resolve(__dirname.replace(/dist\/electron(\/)?$/g, ""), p);
    }
    return p;
}
exports.getAppRoot = getAppRoot;
function getResourceAbsPath(_path) {
    if (_path === void 0) { _path = ""; }
    var p = _path.replace(/^\//, "");
    if (isDev) {
        p = path_1.default.join(getAppRoot(), "resources", p);
    }
    else {
        p = path_1.default.join(getAppRoot(), "dist/electron/resources", p);
    }
    return p;
}
exports.getResourceAbsPath = getResourceAbsPath;
function loadResource(name, isJSON) {
    try {
        var txt = fs_1.default.readFileSync(getResourceAbsPath(name)).toString("utf8") || "";
        if (isJSON)
            return JSON.parse(txt);
        else
            return txt.trim();
    }
    catch (e) {
        return {};
    }
}
exports.loadResource = loadResource;
function getPage(_path, _query) {
    if (_path === void 0) { _path = ""; }
    return getResourceBrowserPath("/index.html#" + _path);
}
exports.getPage = getPage;
var crypto_1 = __importDefault(__webpack_require__(6113));
function md5(value) {
    var md5 = crypto_1.default.createHash("md5");
    var result = md5.update(value.toString()).digest("hex");
    return result.toUpperCase();
}
exports.md5 = md5;
function string2Bit(value, length) {
    if (length === void 0) { length = 6; }
    value = value.substring(0, length);
    return value.split("").map(function (v) { return v.charCodeAt(0); });
}
exports.string2Bit = string2Bit;
function int2Bit(value, length) {
    if (length === void 0) { length = 6; }
    var max = 6;
    var s = Array(max);
    value = Math.floor(value % 281474976710656);
    var high = Math.floor(value / Math.pow(2, 32));
    var low = Math.floor(value % Math.pow(2, 32));
    for (var i = max - 1; i >= 0; i--) {
        if (i >= 2) {
            s[i] = (low >> ((max - i - 1) * 8)) & 0xff;
        }
        else {
            s[i] = (high >> (((max - i - 1) % 4) * 8)) & 0xff;
        }
    }
    return s.slice(max - Math.min(length, max));
}
exports.int2Bit = int2Bit;
function bit2Int(value) {
    var max = 6;
    value = value.slice(Math.max(value.length - max, 0));
    var result = 0;
    var low = 0, high = 0;
    for (var i = 0; i < value.length; i++) {
        var move = (value.length - i - 1) * 8;
        var v = value[i];
        if (move >= 32) {
            high += Math.pow(2, 32) * (v << move % 32);
        }
        else if (move <= 24) {
            low += move == 24 ? v * Math.pow(2, 24) : v << move;
        }
    }
    result = high + low;
    return result;
}
exports.bit2Int = bit2Int;
function random2Int(max) {
    return Math.floor(Math.random() * (max + 1));
}
exports.random2Int = random2Int;
function cycle(interval, handle) {
    if (interval === void 0) { interval = 5; }
    interval = Math.max(interval, 1);
    var thread;
    (function _cycle() {
        thread = setTimeout(function () {
            try {
                handle && handle();
                _cycle();
            }
            catch (e) { }
        }, interval * 1000);
    })();
    return {
        stop: function () {
            clearTimeout(thread);
        },
    };
}
exports.cycle = cycle;
function buffer2array(buffer, limit) {
    var ret = [];
    var max = limit ? limit : buffer.length;
    max = Math.min(max, buffer.length);
    for (var i = 0; i < max; i++) {
        ret.push(buffer[i]);
    }
    return ret;
}
exports.buffer2array = buffer2array;


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 2081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 5001:
/***/ ((module) => {

"use strict";
module.exports = require("cluster");

/***/ }),

/***/ 2057:
/***/ ((module) => {

"use strict";
module.exports = require("constants");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 2298:
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 6224:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 7461:
/***/ ((module, exports, __webpack_require__) => {

const { Argument } = __webpack_require__(8998);
const { Command } = __webpack_require__(5282);
const { CommanderError, InvalidArgumentError } = __webpack_require__(8056);
const { Help } = __webpack_require__(8917);
const { Option } = __webpack_require__(5790);

// @ts-check

/**
 * Expose the root command.
 */

exports = module.exports = new Command();
exports.program = exports; // More explicit access to global command.
// Implicit export of createArgument, createCommand, and createOption.

/**
 * Expose classes
 */

exports.Argument = Argument;
exports.Command = Command;
exports.CommanderError = CommanderError;
exports.Help = Help;
exports.InvalidArgumentError = InvalidArgumentError;
exports.InvalidOptionArgumentError = InvalidArgumentError; // Deprecated
exports.Option = Option;


/***/ }),

/***/ 8998:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const { InvalidArgumentError } = __webpack_require__(8056);

// @ts-check

class Argument {
  /**
   * Initialize a new command argument with the given name and description.
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @param {string} name
   * @param {string} [description]
   */

  constructor(name, description) {
    this.description = description || '';
    this.variadic = false;
    this.parseArg = undefined;
    this.defaultValue = undefined;
    this.defaultValueDescription = undefined;
    this.argChoices = undefined;

    switch (name[0]) {
      case '<': // e.g. <required>
        this.required = true;
        this._name = name.slice(1, -1);
        break;
      case '[': // e.g. [optional]
        this.required = false;
        this._name = name.slice(1, -1);
        break;
      default:
        this.required = true;
        this._name = name;
        break;
    }

    if (this._name.length > 3 && this._name.slice(-3) === '...') {
      this.variadic = true;
      this._name = this._name.slice(0, -3);
    }
  }

  /**
   * Return argument name.
   *
   * @return {string}
   */

  name() {
    return this._name;
  }

  /**
   * @api private
   */

  _concatValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }

    return previous.concat(value);
  }

  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Argument}
   */

  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }

  /**
   * Set the custom handler for processing CLI command arguments into argument values.
   *
   * @param {Function} [fn]
   * @return {Argument}
   */

  argParser(fn) {
    this.parseArg = fn;
    return this;
  }

  /**
   * Only allow argument value to be one of choices.
   *
   * @param {string[]} values
   * @return {Argument}
   */

  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(', ')}.`);
      }
      if (this.variadic) {
        return this._concatValue(arg, previous);
      }
      return arg;
    };
    return this;
  }

  /**
   * Make argument required.
   */
  argRequired() {
    this.required = true;
    return this;
  }

  /**
   * Make argument optional.
   */
  argOptional() {
    this.required = false;
    return this;
  }
}

/**
 * Takes an argument and returns its human readable equivalent for help usage.
 *
 * @param {Argument} arg
 * @return {string}
 * @api private
 */

function humanReadableArgName(arg) {
  const nameOutput = arg.name() + (arg.variadic === true ? '...' : '');

  return arg.required
    ? '<' + nameOutput + '>'
    : '[' + nameOutput + ']';
}

exports.Argument = Argument;
exports.humanReadableArgName = humanReadableArgName;


/***/ }),

/***/ 5282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const EventEmitter = (__webpack_require__(2361).EventEmitter);
const childProcess = __webpack_require__(2081);
const path = __webpack_require__(1017);
const fs = __webpack_require__(7147);
const process = __webpack_require__(7282);

const { Argument, humanReadableArgName } = __webpack_require__(8998);
const { CommanderError } = __webpack_require__(8056);
const { Help } = __webpack_require__(8917);
const { Option, splitOptionFlags, DualOptions } = __webpack_require__(5790);
const { suggestSimilar } = __webpack_require__(1812);

// @ts-check

class Command extends EventEmitter {
  /**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */

  constructor(name) {
    super();
    /** @type {Command[]} */
    this.commands = [];
    /** @type {Option[]} */
    this.options = [];
    this.parent = null;
    this._allowUnknownOption = false;
    this._allowExcessArguments = true;
    /** @type {Argument[]} */
    this._args = [];
    /** @type {string[]} */
    this.args = []; // cli args with options removed
    this.rawArgs = [];
    this.processedArgs = []; // like .args but after custom processing and collecting variadic
    this._scriptPath = null;
    this._name = name || '';
    this._optionValues = {};
    this._optionValueSources = {}; // default, env, cli etc
    this._storeOptionsAsProperties = false;
    this._actionHandler = null;
    this._executableHandler = false;
    this._executableFile = null; // custom name for executable
    this._executableDir = null; // custom search directory for subcommands
    this._defaultCommandName = null;
    this._exitCallback = null;
    this._aliases = [];
    this._combineFlagAndOptionalValue = true;
    this._description = '';
    this._summary = '';
    this._argsDescription = undefined; // legacy
    this._enablePositionalOptions = false;
    this._passThroughOptions = false;
    this._lifeCycleHooks = {}; // a hash of arrays
    /** @type {boolean | string} */
    this._showHelpAfterError = false;
    this._showSuggestionAfterError = true;

    // see .configureOutput() for docs
    this._outputConfiguration = {
      writeOut: (str) => process.stdout.write(str),
      writeErr: (str) => process.stderr.write(str),
      getOutHelpWidth: () => process.stdout.isTTY ? process.stdout.columns : undefined,
      getErrHelpWidth: () => process.stderr.isTTY ? process.stderr.columns : undefined,
      outputError: (str, write) => write(str)
    };

    this._hidden = false;
    this._hasHelpOption = true;
    this._helpFlags = '-h, --help';
    this._helpDescription = 'display help for command';
    this._helpShortFlag = '-h';
    this._helpLongFlag = '--help';
    this._addImplicitHelpCommand = undefined; // Deliberately undefined, not decided whether true or false
    this._helpCommandName = 'help';
    this._helpCommandnameAndArgs = 'help [command]';
    this._helpCommandDescription = 'display help for command';
    this._helpConfiguration = {};
  }

  /**
   * Copy settings that are useful to have in common across root command and subcommands.
   *
   * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
   *
   * @param {Command} sourceCommand
   * @return {Command} `this` command for chaining
   */
  copyInheritedSettings(sourceCommand) {
    this._outputConfiguration = sourceCommand._outputConfiguration;
    this._hasHelpOption = sourceCommand._hasHelpOption;
    this._helpFlags = sourceCommand._helpFlags;
    this._helpDescription = sourceCommand._helpDescription;
    this._helpShortFlag = sourceCommand._helpShortFlag;
    this._helpLongFlag = sourceCommand._helpLongFlag;
    this._helpCommandName = sourceCommand._helpCommandName;
    this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
    this._helpCommandDescription = sourceCommand._helpCommandDescription;
    this._helpConfiguration = sourceCommand._helpConfiguration;
    this._exitCallback = sourceCommand._exitCallback;
    this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
    this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
    this._allowExcessArguments = sourceCommand._allowExcessArguments;
    this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
    this._showHelpAfterError = sourceCommand._showHelpAfterError;
    this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;

    return this;
  }

  /**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * @example
   * // Command implemented using action handler (description is supplied separately to `.command`)
   * program
   *   .command('clone <source> [destination]')
   *   .description('clone a repository into a newly created directory')
   *   .action((source, destination) => {
   *     console.log('clone command called');
   *   });
   *
   * // Command implemented using separate executable file (description is second parameter to `.command`)
   * program
   *   .command('start <service>', 'start named service')
   *   .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {Object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */

  command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
    let desc = actionOptsOrExecDesc;
    let opts = execOpts;
    if (typeof desc === 'object' && desc !== null) {
      opts = desc;
      desc = null;
    }
    opts = opts || {};
    const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);

    const cmd = this.createCommand(name);
    if (desc) {
      cmd.description(desc);
      cmd._executableHandler = true;
    }
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    cmd._hidden = !!(opts.noHelp || opts.hidden); // noHelp is deprecated old name for hidden
    cmd._executableFile = opts.executableFile || null; // Custom name for executable file, set missing to null to match constructor
    if (args) cmd.arguments(args);
    this.commands.push(cmd);
    cmd.parent = this;
    cmd.copyInheritedSettings(this);

    if (desc) return this;
    return cmd;
  }

  /**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */

  createCommand(name) {
    return new Command(name);
  }

  /**
   * You can customise the help with a subclass of Help by overriding createHelp,
   * or by overriding Help properties using configureHelp().
   *
   * @return {Help}
   */

  createHelp() {
    return Object.assign(new Help(), this.configureHelp());
  }

  /**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */

  configureHelp(configuration) {
    if (configuration === undefined) return this._helpConfiguration;

    this._helpConfiguration = configuration;
    return this;
  }

  /**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *     // functions to change where being written, stdout and stderr
   *     writeOut(str)
   *     writeErr(str)
   *     // matching functions to specify width for wrapping help
   *     getOutHelpWidth()
   *     getErrHelpWidth()
   *     // functions based on what is being written out
   *     outputError(str, write) // used for displaying errors, and not used for displaying help
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */

  configureOutput(configuration) {
    if (configuration === undefined) return this._outputConfiguration;

    Object.assign(this._outputConfiguration, configuration);
    return this;
  }

  /**
   * Display the help or a custom message after an error occurs.
   *
   * @param {boolean|string} [displayHelp]
   * @return {Command} `this` command for chaining
   */
  showHelpAfterError(displayHelp = true) {
    if (typeof displayHelp !== 'string') displayHelp = !!displayHelp;
    this._showHelpAfterError = displayHelp;
    return this;
  }

  /**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   *
   * @param {boolean} [displaySuggestion]
   * @return {Command} `this` command for chaining
   */
  showSuggestionAfterError(displaySuggestion = true) {
    this._showSuggestionAfterError = !!displaySuggestion;
    return this;
  }

  /**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {Object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */

  addCommand(cmd, opts) {
    if (!cmd._name) {
      throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
    }

    opts = opts || {};
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    if (opts.noHelp || opts.hidden) cmd._hidden = true; // modifying passed command due to existing implementation

    this.commands.push(cmd);
    cmd.parent = this;
    return this;
  }

  /**
   * Factory routine to create a new unattached argument.
   *
   * See .argument() for creating an attached argument, which uses this routine to
   * create the argument. You can override createArgument to return a custom argument.
   *
   * @param {string} name
   * @param {string} [description]
   * @return {Argument} new argument
   */

  createArgument(name, description) {
    return new Argument(name, description);
  }

  /**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * program.argument('<input-file>');
   * program.argument('[output-file]');
   *
   * @param {string} name
   * @param {string} [description]
   * @param {Function|*} [fn] - custom argument processing function
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  argument(name, description, fn, defaultValue) {
    const argument = this.createArgument(name, description);
    if (typeof fn === 'function') {
      argument.default(defaultValue).argParser(fn);
    } else {
      argument.default(fn);
    }
    this.addArgument(argument);
    return this;
  }

  /**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * program.arguments('<cmd> [env]');
   *
   * @param {string} names
   * @return {Command} `this` command for chaining
   */

  arguments(names) {
    names.split(/ +/).forEach((detail) => {
      this.argument(detail);
    });
    return this;
  }

  /**
   * Define argument syntax for command, adding a prepared argument.
   *
   * @param {Argument} argument
   * @return {Command} `this` command for chaining
   */
  addArgument(argument) {
    const previousArgument = this._args.slice(-1)[0];
    if (previousArgument && previousArgument.variadic) {
      throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
    }
    if (argument.required && argument.defaultValue !== undefined && argument.parseArg === undefined) {
      throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
    }
    this._args.push(argument);
    return this;
  }

  /**
   * Override default decision whether to add implicit help command.
   *
   *    addHelpCommand() // force on
   *    addHelpCommand(false); // force off
   *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
   *
   * @return {Command} `this` command for chaining
   */

  addHelpCommand(enableOrNameAndArgs, description) {
    if (enableOrNameAndArgs === false) {
      this._addImplicitHelpCommand = false;
    } else {
      this._addImplicitHelpCommand = true;
      if (typeof enableOrNameAndArgs === 'string') {
        this._helpCommandName = enableOrNameAndArgs.split(' ')[0];
        this._helpCommandnameAndArgs = enableOrNameAndArgs;
      }
      this._helpCommandDescription = description || this._helpCommandDescription;
    }
    return this;
  }

  /**
   * @return {boolean}
   * @api private
   */

  _hasImplicitHelpCommand() {
    if (this._addImplicitHelpCommand === undefined) {
      return this.commands.length && !this._actionHandler && !this._findCommand('help');
    }
    return this._addImplicitHelpCommand;
  }

  /**
   * Add hook for life cycle event.
   *
   * @param {string} event
   * @param {Function} listener
   * @return {Command} `this` command for chaining
   */

  hook(event, listener) {
    const allowedValues = ['preSubcommand', 'preAction', 'postAction'];
    if (!allowedValues.includes(event)) {
      throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    if (this._lifeCycleHooks[event]) {
      this._lifeCycleHooks[event].push(listener);
    } else {
      this._lifeCycleHooks[event] = [listener];
    }
    return this;
  }

  /**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */

  exitOverride(fn) {
    if (fn) {
      this._exitCallback = fn;
    } else {
      this._exitCallback = (err) => {
        if (err.code !== 'commander.executeSubCommandAsync') {
          throw err;
        } else {
          // Async callback from spawn events, not useful to throw.
        }
      };
    }
    return this;
  }

  /**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @api private
   */

  _exit(exitCode, code, message) {
    if (this._exitCallback) {
      this._exitCallback(new CommanderError(exitCode, code, message));
      // Expecting this line is not reached.
    }
    process.exit(exitCode);
  }

  /**
   * Register callback `fn` for the command.
   *
   * @example
   * program
   *   .command('serve')
   *   .description('start service')
   *   .action(function() {
   *      // do work here
   *   });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */

  action(fn) {
    const listener = (args) => {
      // The .action callback takes an extra parameter which is the command or options.
      const expectedArgsCount = this._args.length;
      const actionArgs = args.slice(0, expectedArgsCount);
      if (this._storeOptionsAsProperties) {
        actionArgs[expectedArgsCount] = this; // backwards compatible "options"
      } else {
        actionArgs[expectedArgsCount] = this.opts();
      }
      actionArgs.push(this);

      return fn.apply(this, actionArgs);
    };
    this._actionHandler = listener;
    return this;
  }

  /**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */

  createOption(flags, description) {
    return new Option(flags, description);
  }

  /**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addOption(option) {
    const oname = option.name();
    const name = option.attributeName();

    // store default value
    if (option.negate) {
      // --no-foo is special and defaults foo to true, unless a --foo option is already defined
      const positiveLongFlag = option.long.replace(/^--no-/, '--');
      if (!this._findOption(positiveLongFlag)) {
        this.setOptionValueWithSource(name, option.defaultValue === undefined ? true : option.defaultValue, 'default');
      }
    } else if (option.defaultValue !== undefined) {
      this.setOptionValueWithSource(name, option.defaultValue, 'default');
    }

    // register the option
    this.options.push(option);

    // handler for cli and env supplied values
    const handleOptionValue = (val, invalidValueMessage, valueSource) => {
      // val is null for optional option used without an optional-argument.
      // val is undefined for boolean and negated option.
      if (val == null && option.presetArg !== undefined) {
        val = option.presetArg;
      }

      // custom processing
      const oldValue = this.getOptionValue(name);
      if (val !== null && option.parseArg) {
        try {
          val = option.parseArg(val, oldValue);
        } catch (err) {
          if (err.code === 'commander.invalidArgument') {
            const message = `${invalidValueMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      } else if (val !== null && option.variadic) {
        val = option._concatValue(val, oldValue);
      }

      // Fill-in appropriate missing values. Long winded but easy to follow.
      if (val == null) {
        if (option.negate) {
          val = false;
        } else if (option.isBoolean() || option.optional) {
          val = true;
        } else {
          val = ''; // not normal, parseArg might have failed or be a mock function for testing
        }
      }
      this.setOptionValueWithSource(name, val, valueSource);
    };

    this.on('option:' + oname, (val) => {
      const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
      handleOptionValue(val, invalidValueMessage, 'cli');
    });

    if (option.envVar) {
      this.on('optionEnv:' + oname, (val) => {
        const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
        handleOptionValue(val, invalidValueMessage, 'env');
      });
    }

    return this;
  }

  /**
   * Internal implementation shared by .option() and .requiredOption()
   *
   * @api private
   */
  _optionEx(config, flags, description, fn, defaultValue) {
    if (typeof flags === 'object' && flags instanceof Option) {
      throw new Error('To add an Option object use addOption() instead of option() or requiredOption()');
    }
    const option = this.createOption(flags, description);
    option.makeOptionMandatory(!!config.mandatory);
    if (typeof fn === 'function') {
      option.default(defaultValue).argParser(fn);
    } else if (fn instanceof RegExp) {
      // deprecated
      const regex = fn;
      fn = (val, def) => {
        const m = regex.exec(val);
        return m ? m[0] : def;
      };
      option.default(defaultValue).argParser(fn);
    } else {
      option.default(fn);
    }

    return this.addOption(option);
  }

  /**
   * Define option with `flags`, `description` and optional
   * coercion `fn`.
   *
   * The `flags` string contains the short and/or long flags,
   * separated by comma, a pipe or space. The following are all valid
   * all will output this way when `--help` is used.
   *
   *     "-p, --pepper"
   *     "-p|--pepper"
   *     "-p --pepper"
   *
   * @example
   * // simple boolean defaulting to undefined
   * program.option('-p, --pepper', 'add pepper');
   *
   * program.pepper
   * // => undefined
   *
   * --pepper
   * program.pepper
   * // => true
   *
   * // simple boolean defaulting to true (unless non-negated option is also defined)
   * program.option('-C, --no-cheese', 'remove cheese');
   *
   * program.cheese
   * // => true
   *
   * --no-cheese
   * program.cheese
   * // => false
   *
   * // required argument
   * program.option('-C, --chdir <path>', 'change the working directory');
   *
   * --chdir /tmp
   * program.chdir
   * // => "/tmp"
   *
   * // optional argument
   * program.option('-c, --cheese [type]', 'add cheese [marble]');
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {Function|*} [fn] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */

  option(flags, description, fn, defaultValue) {
    return this._optionEx({}, flags, description, fn, defaultValue);
  }

  /**
  * Add a required option which must have a value after parsing. This usually means
  * the option must be specified on the command line. (Otherwise the same as .option().)
  *
  * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
  *
  * @param {string} flags
  * @param {string} [description]
  * @param {Function|*} [fn] - custom option processing function or default value
  * @param {*} [defaultValue]
  * @return {Command} `this` command for chaining
  */

  requiredOption(flags, description, fn, defaultValue) {
    return this._optionEx({ mandatory: true }, flags, description, fn, defaultValue);
  }

  /**
   * Alter parsing of short flags with optional values.
   *
   * @example
   * // for `.option('-f,--flag [value]'):
   * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
   * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
   */
  combineFlagAndOptionalValue(combine = true) {
    this._combineFlagAndOptionalValue = !!combine;
    return this;
  }

  /**
   * Allow unknown options on the command line.
   *
   * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
   * for unknown options.
   */
  allowUnknownOption(allowUnknown = true) {
    this._allowUnknownOption = !!allowUnknown;
    return this;
  }

  /**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
   * for excess arguments.
   */
  allowExcessArguments(allowExcess = true) {
    this._allowExcessArguments = !!allowExcess;
    return this;
  }

  /**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {Boolean} [positional=true]
   */
  enablePositionalOptions(positional = true) {
    this._enablePositionalOptions = !!positional;
    return this;
  }

  /**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {Boolean} [passThrough=true]
   * for unknown options.
   */
  passThroughOptions(passThrough = true) {
    this._passThroughOptions = !!passThrough;
    if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
      throw new Error('passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)');
    }
    return this;
  }

  /**
    * Whether to store option values as properties on command object,
    * or store separately (specify false). In both cases the option values can be accessed using .opts().
    *
    * @param {boolean} [storeAsProperties=true]
    * @return {Command} `this` command for chaining
    */

  storeOptionsAsProperties(storeAsProperties = true) {
    this._storeOptionsAsProperties = !!storeAsProperties;
    if (this.options.length) {
      throw new Error('call .storeOptionsAsProperties() before adding options');
    }
    return this;
  }

  /**
   * Retrieve option value.
   *
   * @param {string} key
   * @return {Object} value
   */

  getOptionValue(key) {
    if (this._storeOptionsAsProperties) {
      return this[key];
    }
    return this._optionValues[key];
  }

  /**
   * Store option value.
   *
   * @param {string} key
   * @param {Object} value
   * @return {Command} `this` command for chaining
   */

  setOptionValue(key, value) {
    return this.setOptionValueWithSource(key, value, undefined);
  }

  /**
    * Store option value and where the value came from.
    *
    * @param {string} key
    * @param {Object} value
    * @param {string} source - expected values are default/config/env/cli/implied
    * @return {Command} `this` command for chaining
    */

  setOptionValueWithSource(key, value, source) {
    if (this._storeOptionsAsProperties) {
      this[key] = value;
    } else {
      this._optionValues[key] = value;
    }
    this._optionValueSources[key] = source;
    return this;
  }

  /**
    * Get source of option value.
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */

  getOptionValueSource(key) {
    return this._optionValueSources[key];
  }

  /**
    * Get source of option value. See also .optsWithGlobals().
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */

  getOptionValueSourceWithGlobals(key) {
    // global overwrites local, like optsWithGlobals
    let source;
    getCommandAndParents(this).forEach((cmd) => {
      if (cmd.getOptionValueSource(key) !== undefined) {
        source = cmd.getOptionValueSource(key);
      }
    });
    return source;
  }

  /**
   * Get user arguments from implied or explicit arguments.
   * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
   *
   * @api private
   */

  _prepareUserArgs(argv, parseOptions) {
    if (argv !== undefined && !Array.isArray(argv)) {
      throw new Error('first parameter to parse must be array or undefined');
    }
    parseOptions = parseOptions || {};

    // Default to using process.argv
    if (argv === undefined) {
      argv = process.argv;
      // @ts-ignore: unknown property
      if (process.versions && process.versions.electron) {
        parseOptions.from = 'electron';
      }
    }
    this.rawArgs = argv.slice();

    // make it a little easier for callers by supporting various argv conventions
    let userArgs;
    switch (parseOptions.from) {
      case undefined:
      case 'node':
        this._scriptPath = argv[1];
        userArgs = argv.slice(2);
        break;
      case 'electron':
        // @ts-ignore: unknown property
        if (process.defaultApp) {
          this._scriptPath = argv[1];
          userArgs = argv.slice(2);
        } else {
          userArgs = argv.slice(1);
        }
        break;
      case 'user':
        userArgs = argv.slice(0);
        break;
      default:
        throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
    }

    // Find default name for program from arguments.
    if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
    this._name = this._name || 'program';

    return userArgs;
  }

  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * program.parse(process.argv);
   * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */

  parse(argv, parseOptions) {
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    this._parseCommand([], userArgs);

    return this;
  }

  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * await program.parseAsync(process.argv);
   * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
   * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {Object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */

  async parseAsync(argv, parseOptions) {
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    await this._parseCommand([], userArgs);

    return this;
  }

  /**
   * Execute a sub-command executable.
   *
   * @api private
   */

  _executeSubCommand(subcommand, args) {
    args = args.slice();
    let launchWithNode = false; // Use node for source targets so do not need to get permissions correct, and on Windows.
    const sourceExt = ['.js', '.ts', '.tsx', '.mjs', '.cjs'];

    function findFile(baseDir, baseName) {
      // Look for specified file
      const localBin = path.resolve(baseDir, baseName);
      if (fs.existsSync(localBin)) return localBin;

      // Stop looking if candidate already has an expected extension.
      if (sourceExt.includes(path.extname(baseName))) return undefined;

      // Try all the extensions.
      const foundExt = sourceExt.find(ext => fs.existsSync(`${localBin}${ext}`));
      if (foundExt) return `${localBin}${foundExt}`;

      return undefined;
    }

    // Not checking for help first. Unlikely to have mandatory and executable, and can't robustly test for help flags in external command.
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();

    // executableFile and executableDir might be full path, or just a name
    let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
    let executableDir = this._executableDir || '';
    if (this._scriptPath) {
      let resolvedScriptPath; // resolve possible symlink for installed npm binary
      try {
        resolvedScriptPath = fs.realpathSync(this._scriptPath);
      } catch (err) {
        resolvedScriptPath = this._scriptPath;
      }
      executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
    }

    // Look for a local file in preference to a command in PATH.
    if (executableDir) {
      let localFile = findFile(executableDir, executableFile);

      // Legacy search using prefix of script name instead of command name
      if (!localFile && !subcommand._executableFile && this._scriptPath) {
        const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
        if (legacyName !== this._name) {
          localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
        }
      }
      executableFile = localFile || executableFile;
    }

    launchWithNode = sourceExt.includes(path.extname(executableFile));

    let proc;
    if (process.platform !== 'win32') {
      if (launchWithNode) {
        args.unshift(executableFile);
        // add executable arguments to spawn
        args = incrementNodeInspectorPort(process.execArgv).concat(args);

        proc = childProcess.spawn(process.argv[0], args, { stdio: 'inherit' });
      } else {
        proc = childProcess.spawn(executableFile, args, { stdio: 'inherit' });
      }
    } else {
      args.unshift(executableFile);
      // add executable arguments to spawn
      args = incrementNodeInspectorPort(process.execArgv).concat(args);
      proc = childProcess.spawn(process.execPath, args, { stdio: 'inherit' });
    }

    if (!proc.killed) { // testing mainly to avoid leak warnings during unit tests with mocked spawn
      const signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];
      signals.forEach((signal) => {
        // @ts-ignore
        process.on(signal, () => {
          if (proc.killed === false && proc.exitCode === null) {
            proc.kill(signal);
          }
        });
      });
    }

    // By default terminate process when spawned process terminates.
    // Suppressing the exit if exitCallback defined is a bit messy and of limited use, but does allow process to stay running!
    const exitCallback = this._exitCallback;
    if (!exitCallback) {
      proc.on('close', process.exit.bind(process));
    } else {
      proc.on('close', () => {
        exitCallback(new CommanderError(process.exitCode || 0, 'commander.executeSubCommandAsync', '(close)'));
      });
    }
    proc.on('error', (err) => {
      // @ts-ignore
      if (err.code === 'ENOENT') {
        const executableDirMessage = executableDir
          ? `searched for local subcommand relative to directory '${executableDir}'`
          : 'no directory for search for local subcommand, use .executableDir() to supply a custom directory';
        const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
        throw new Error(executableMissing);
      // @ts-ignore
      } else if (err.code === 'EACCES') {
        throw new Error(`'${executableFile}' not executable`);
      }
      if (!exitCallback) {
        process.exit(1);
      } else {
        const wrappedError = new CommanderError(1, 'commander.executeSubCommandAsync', '(error)');
        wrappedError.nestedError = err;
        exitCallback(wrappedError);
      }
    });

    // Store the reference to the child process
    this.runningCommand = proc;
  }

  /**
   * @api private
   */

  _dispatchSubcommand(commandName, operands, unknown) {
    const subCommand = this._findCommand(commandName);
    if (!subCommand) this.help({ error: true });

    let hookResult;
    hookResult = this._chainOrCallSubCommandHook(hookResult, subCommand, 'preSubcommand');
    hookResult = this._chainOrCall(hookResult, () => {
      if (subCommand._executableHandler) {
        this._executeSubCommand(subCommand, operands.concat(unknown));
      } else {
        return subCommand._parseCommand(operands, unknown);
      }
    });
    return hookResult;
  }

  /**
   * Check this.args against expected this._args.
   *
   * @api private
   */

  _checkNumberOfArguments() {
    // too few
    this._args.forEach((arg, i) => {
      if (arg.required && this.args[i] == null) {
        this.missingArgument(arg.name());
      }
    });
    // too many
    if (this._args.length > 0 && this._args[this._args.length - 1].variadic) {
      return;
    }
    if (this.args.length > this._args.length) {
      this._excessArguments(this.args);
    }
  }

  /**
   * Process this.args using this._args and save as this.processedArgs!
   *
   * @api private
   */

  _processArguments() {
    const myParseArg = (argument, value, previous) => {
      // Extra processing for nice error message on parsing failure.
      let parsedValue = value;
      if (value !== null && argument.parseArg) {
        try {
          parsedValue = argument.parseArg(value, previous);
        } catch (err) {
          if (err.code === 'commander.invalidArgument') {
            const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      return parsedValue;
    };

    this._checkNumberOfArguments();

    const processedArgs = [];
    this._args.forEach((declaredArg, index) => {
      let value = declaredArg.defaultValue;
      if (declaredArg.variadic) {
        // Collect together remaining arguments for passing together as an array.
        if (index < this.args.length) {
          value = this.args.slice(index);
          if (declaredArg.parseArg) {
            value = value.reduce((processed, v) => {
              return myParseArg(declaredArg, v, processed);
            }, declaredArg.defaultValue);
          }
        } else if (value === undefined) {
          value = [];
        }
      } else if (index < this.args.length) {
        value = this.args[index];
        if (declaredArg.parseArg) {
          value = myParseArg(declaredArg, value, declaredArg.defaultValue);
        }
      }
      processedArgs[index] = value;
    });
    this.processedArgs = processedArgs;
  }

  /**
   * Once we have a promise we chain, but call synchronously until then.
   *
   * @param {Promise|undefined} promise
   * @param {Function} fn
   * @return {Promise|undefined}
   * @api private
   */

  _chainOrCall(promise, fn) {
    // thenable
    if (promise && promise.then && typeof promise.then === 'function') {
      // already have a promise, chain callback
      return promise.then(() => fn());
    }
    // callback might return a promise
    return fn();
  }

  /**
   *
   * @param {Promise|undefined} promise
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */

  _chainOrCallHooks(promise, event) {
    let result = promise;
    const hooks = [];
    getCommandAndParents(this)
      .reverse()
      .filter(cmd => cmd._lifeCycleHooks[event] !== undefined)
      .forEach(hookedCommand => {
        hookedCommand._lifeCycleHooks[event].forEach((callback) => {
          hooks.push({ hookedCommand, callback });
        });
      });
    if (event === 'postAction') {
      hooks.reverse();
    }

    hooks.forEach((hookDetail) => {
      result = this._chainOrCall(result, () => {
        return hookDetail.callback(hookDetail.hookedCommand, this);
      });
    });
    return result;
  }

  /**
   *
   * @param {Promise|undefined} promise
   * @param {Command} subCommand
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */

  _chainOrCallSubCommandHook(promise, subCommand, event) {
    let result = promise;
    if (this._lifeCycleHooks[event] !== undefined) {
      this._lifeCycleHooks[event].forEach((hook) => {
        result = this._chainOrCall(result, () => {
          return hook(this, subCommand);
        });
      });
    }
    return result;
  }

  /**
   * Process arguments in context of this command.
   * Returns action result, in case it is a promise.
   *
   * @api private
   */

  _parseCommand(operands, unknown) {
    const parsed = this.parseOptions(unknown);
    this._parseOptionsEnv(); // after cli, so parseArg not called on both cli and env
    this._parseOptionsImplied();
    operands = operands.concat(parsed.operands);
    unknown = parsed.unknown;
    this.args = operands.concat(unknown);

    if (operands && this._findCommand(operands[0])) {
      return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
    }
    if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
      if (operands.length === 1) {
        this.help();
      }
      return this._dispatchSubcommand(operands[1], [], [this._helpLongFlag]);
    }
    if (this._defaultCommandName) {
      outputHelpIfRequested(this, unknown); // Run the help for default command from parent rather than passing to default command
      return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
    }
    if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
      // probably missing subcommand and no handler, user needs help (and exit)
      this.help({ error: true });
    }

    outputHelpIfRequested(this, parsed.unknown);
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();

    // We do not always call this check to avoid masking a "better" error, like unknown command.
    const checkForUnknownOptions = () => {
      if (parsed.unknown.length > 0) {
        this.unknownOption(parsed.unknown[0]);
      }
    };

    const commandEvent = `command:${this.name()}`;
    if (this._actionHandler) {
      checkForUnknownOptions();
      this._processArguments();

      let actionResult;
      actionResult = this._chainOrCallHooks(actionResult, 'preAction');
      actionResult = this._chainOrCall(actionResult, () => this._actionHandler(this.processedArgs));
      if (this.parent) {
        actionResult = this._chainOrCall(actionResult, () => {
          this.parent.emit(commandEvent, operands, unknown); // legacy
        });
      }
      actionResult = this._chainOrCallHooks(actionResult, 'postAction');
      return actionResult;
    }
    if (this.parent && this.parent.listenerCount(commandEvent)) {
      checkForUnknownOptions();
      this._processArguments();
      this.parent.emit(commandEvent, operands, unknown); // legacy
    } else if (operands.length) {
      if (this._findCommand('*')) { // legacy default command
        return this._dispatchSubcommand('*', operands, unknown);
      }
      if (this.listenerCount('command:*')) {
        // skip option check, emit event for possible misspelling suggestion
        this.emit('command:*', operands, unknown);
      } else if (this.commands.length) {
        this.unknownCommand();
      } else {
        checkForUnknownOptions();
        this._processArguments();
      }
    } else if (this.commands.length) {
      checkForUnknownOptions();
      // This command has subcommands and nothing hooked up at this level, so display help (and exit).
      this.help({ error: true });
    } else {
      checkForUnknownOptions();
      this._processArguments();
      // fall through for caller to handle after calling .parse()
    }
  }

  /**
   * Find matching command.
   *
   * @api private
   */
  _findCommand(name) {
    if (!name) return undefined;
    return this.commands.find(cmd => cmd._name === name || cmd._aliases.includes(name));
  }

  /**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @api private
   */

  _findOption(arg) {
    return this.options.find(option => option.is(arg));
  }

  /**
   * Display an error message if a mandatory option does not have a value.
   * Called after checking for help flags in leaf subcommand.
   *
   * @api private
   */

  _checkForMissingMandatoryOptions() {
    // Walk up hierarchy so can call in subcommand after checking for displaying help.
    for (let cmd = this; cmd; cmd = cmd.parent) {
      cmd.options.forEach((anOption) => {
        if (anOption.mandatory && (cmd.getOptionValue(anOption.attributeName()) === undefined)) {
          cmd.missingMandatoryOptionValue(anOption);
        }
      });
    }
  }

  /**
   * Display an error message if conflicting options are used together in this.
   *
   * @api private
   */
  _checkForConflictingLocalOptions() {
    const definedNonDefaultOptions = this.options.filter(
      (option) => {
        const optionKey = option.attributeName();
        if (this.getOptionValue(optionKey) === undefined) {
          return false;
        }
        return this.getOptionValueSource(optionKey) !== 'default';
      }
    );

    const optionsWithConflicting = definedNonDefaultOptions.filter(
      (option) => option.conflictsWith.length > 0
    );

    optionsWithConflicting.forEach((option) => {
      const conflictingAndDefined = definedNonDefaultOptions.find((defined) =>
        option.conflictsWith.includes(defined.attributeName())
      );
      if (conflictingAndDefined) {
        this._conflictingOption(option, conflictingAndDefined);
      }
    });
  }

  /**
   * Display an error message if conflicting options are used together.
   * Called after checking for help flags in leaf subcommand.
   *
   * @api private
   */
  _checkForConflictingOptions() {
    // Walk up hierarchy so can call in subcommand after checking for displaying help.
    for (let cmd = this; cmd; cmd = cmd.parent) {
      cmd._checkForConflictingLocalOptions();
    }
  }

  /**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Examples:
   *
   *     argv => operands, unknown
   *     --known kkk op => [op], []
   *     op --known kkk => [op], []
   *     sub --unknown uuu op => [sub], [--unknown uuu op]
   *     sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {String[]} argv
   * @return {{operands: String[], unknown: String[]}}
   */

  parseOptions(argv) {
    const operands = []; // operands, not options or values
    const unknown = []; // first unknown option and remaining unknown args
    let dest = operands;
    const args = argv.slice();

    function maybeOption(arg) {
      return arg.length > 1 && arg[0] === '-';
    }

    // parse options
    let activeVariadicOption = null;
    while (args.length) {
      const arg = args.shift();

      // literal
      if (arg === '--') {
        if (dest === unknown) dest.push(arg);
        dest.push(...args);
        break;
      }

      if (activeVariadicOption && !maybeOption(arg)) {
        this.emit(`option:${activeVariadicOption.name()}`, arg);
        continue;
      }
      activeVariadicOption = null;

      if (maybeOption(arg)) {
        const option = this._findOption(arg);
        // recognised option, call listener to assign value with possible custom processing
        if (option) {
          if (option.required) {
            const value = args.shift();
            if (value === undefined) this.optionMissingArgument(option);
            this.emit(`option:${option.name()}`, value);
          } else if (option.optional) {
            let value = null;
            // historical behaviour is optional value is following arg unless an option
            if (args.length > 0 && !maybeOption(args[0])) {
              value = args.shift();
            }
            this.emit(`option:${option.name()}`, value);
          } else { // boolean flag
            this.emit(`option:${option.name()}`);
          }
          activeVariadicOption = option.variadic ? option : null;
          continue;
        }
      }

      // Look for combo options following single dash, eat first one if known.
      if (arg.length > 2 && arg[0] === '-' && arg[1] !== '-') {
        const option = this._findOption(`-${arg[1]}`);
        if (option) {
          if (option.required || (option.optional && this._combineFlagAndOptionalValue)) {
            // option with value following in same argument
            this.emit(`option:${option.name()}`, arg.slice(2));
          } else {
            // boolean option, emit and put back remainder of arg for further processing
            this.emit(`option:${option.name()}`);
            args.unshift(`-${arg.slice(2)}`);
          }
          continue;
        }
      }

      // Look for known long flag with value, like --foo=bar
      if (/^--[^=]+=/.test(arg)) {
        const index = arg.indexOf('=');
        const option = this._findOption(arg.slice(0, index));
        if (option && (option.required || option.optional)) {
          this.emit(`option:${option.name()}`, arg.slice(index + 1));
          continue;
        }
      }

      // Not a recognised option by this command.
      // Might be a command-argument, or subcommand option, or unknown option, or help command or option.

      // An unknown option means further arguments also classified as unknown so can be reprocessed by subcommands.
      if (maybeOption(arg)) {
        dest = unknown;
      }

      // If using positionalOptions, stop processing our options at subcommand.
      if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
        if (this._findCommand(arg)) {
          operands.push(arg);
          if (args.length > 0) unknown.push(...args);
          break;
        } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
          operands.push(arg);
          if (args.length > 0) operands.push(...args);
          break;
        } else if (this._defaultCommandName) {
          unknown.push(arg);
          if (args.length > 0) unknown.push(...args);
          break;
        }
      }

      // If using passThroughOptions, stop processing options at first command-argument.
      if (this._passThroughOptions) {
        dest.push(arg);
        if (args.length > 0) dest.push(...args);
        break;
      }

      // add arg
      dest.push(arg);
    }

    return { operands, unknown };
  }

  /**
   * Return an object containing local option values as key-value pairs.
   *
   * @return {Object}
   */
  opts() {
    if (this._storeOptionsAsProperties) {
      // Preserve original behaviour so backwards compatible when still using properties
      const result = {};
      const len = this.options.length;

      for (let i = 0; i < len; i++) {
        const key = this.options[i].attributeName();
        result[key] = key === this._versionOptionName ? this._version : this[key];
      }
      return result;
    }

    return this._optionValues;
  }

  /**
   * Return an object containing merged local and global option values as key-value pairs.
   *
   * @return {Object}
   */
  optsWithGlobals() {
    // globals overwrite locals
    return getCommandAndParents(this).reduce(
      (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
      {}
    );
  }

  /**
   * Display error message and exit (or call exitOverride).
   *
   * @param {string} message
   * @param {Object} [errorOptions]
   * @param {string} [errorOptions.code] - an id string representing the error
   * @param {number} [errorOptions.exitCode] - used with process.exit
   */
  error(message, errorOptions) {
    // output handling
    this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr);
    if (typeof this._showHelpAfterError === 'string') {
      this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`);
    } else if (this._showHelpAfterError) {
      this._outputConfiguration.writeErr('\n');
      this.outputHelp({ error: true });
    }

    // exit handling
    const config = errorOptions || {};
    const exitCode = config.exitCode || 1;
    const code = config.code || 'commander.error';
    this._exit(exitCode, code, message);
  }

  /**
   * Apply any option related environment variables, if option does
   * not have a value from cli or client code.
   *
   * @api private
   */
  _parseOptionsEnv() {
    this.options.forEach((option) => {
      if (option.envVar && option.envVar in process.env) {
        const optionKey = option.attributeName();
        // Priority check. Do not overwrite cli or options from unknown source (client-code).
        if (this.getOptionValue(optionKey) === undefined || ['default', 'config', 'env'].includes(this.getOptionValueSource(optionKey))) {
          if (option.required || option.optional) { // option can take a value
            // keep very simple, optional always takes value
            this.emit(`optionEnv:${option.name()}`, process.env[option.envVar]);
          } else { // boolean
            // keep very simple, only care that envVar defined and not the value
            this.emit(`optionEnv:${option.name()}`);
          }
        }
      }
    });
  }

  /**
   * Apply any implied option values, if option is undefined or default value.
   *
   * @api private
   */
  _parseOptionsImplied() {
    const dualHelper = new DualOptions(this.options);
    const hasCustomOptionValue = (optionKey) => {
      return this.getOptionValue(optionKey) !== undefined && !['default', 'implied'].includes(this.getOptionValueSource(optionKey));
    };
    this.options
      .filter(option => (option.implied !== undefined) &&
        hasCustomOptionValue(option.attributeName()) &&
        dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option))
      .forEach((option) => {
        Object.keys(option.implied)
          .filter(impliedKey => !hasCustomOptionValue(impliedKey))
          .forEach(impliedKey => {
            this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], 'implied');
          });
      });
  }

  /**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @api private
   */

  missingArgument(name) {
    const message = `error: missing required argument '${name}'`;
    this.error(message, { code: 'commander.missingArgument' });
  }

  /**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @api private
   */

  optionMissingArgument(option) {
    const message = `error: option '${option.flags}' argument missing`;
    this.error(message, { code: 'commander.optionMissingArgument' });
  }

  /**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @api private
   */

  missingMandatoryOptionValue(option) {
    const message = `error: required option '${option.flags}' not specified`;
    this.error(message, { code: 'commander.missingMandatoryOptionValue' });
  }

  /**
   * `Option` conflicts with another option.
   *
   * @param {Option} option
   * @param {Option} conflictingOption
   * @api private
   */
  _conflictingOption(option, conflictingOption) {
    // The calling code does not know whether a negated option is the source of the
    // value, so do some work to take an educated guess.
    const findBestOptionFromValue = (option) => {
      const optionKey = option.attributeName();
      const optionValue = this.getOptionValue(optionKey);
      const negativeOption = this.options.find(target => target.negate && optionKey === target.attributeName());
      const positiveOption = this.options.find(target => !target.negate && optionKey === target.attributeName());
      if (negativeOption && (
        (negativeOption.presetArg === undefined && optionValue === false) ||
        (negativeOption.presetArg !== undefined && optionValue === negativeOption.presetArg)
      )) {
        return negativeOption;
      }
      return positiveOption || option;
    };

    const getErrorMessage = (option) => {
      const bestOption = findBestOptionFromValue(option);
      const optionKey = bestOption.attributeName();
      const source = this.getOptionValueSource(optionKey);
      if (source === 'env') {
        return `environment variable '${bestOption.envVar}'`;
      }
      return `option '${bestOption.flags}'`;
    };

    const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
    this.error(message, { code: 'commander.conflictingOption' });
  }

  /**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @api private
   */

  unknownOption(flag) {
    if (this._allowUnknownOption) return;
    let suggestion = '';

    if (flag.startsWith('--') && this._showSuggestionAfterError) {
      // Looping to pick up the global options too
      let candidateFlags = [];
      let command = this;
      do {
        const moreFlags = command.createHelp().visibleOptions(command)
          .filter(option => option.long)
          .map(option => option.long);
        candidateFlags = candidateFlags.concat(moreFlags);
        command = command.parent;
      } while (command && !command._enablePositionalOptions);
      suggestion = suggestSimilar(flag, candidateFlags);
    }

    const message = `error: unknown option '${flag}'${suggestion}`;
    this.error(message, { code: 'commander.unknownOption' });
  }

  /**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @api private
   */

  _excessArguments(receivedArgs) {
    if (this._allowExcessArguments) return;

    const expected = this._args.length;
    const s = (expected === 1) ? '' : 's';
    const forSubcommand = this.parent ? ` for '${this.name()}'` : '';
    const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
    this.error(message, { code: 'commander.excessArguments' });
  }

  /**
   * Unknown command.
   *
   * @api private
   */

  unknownCommand() {
    const unknownName = this.args[0];
    let suggestion = '';

    if (this._showSuggestionAfterError) {
      const candidateNames = [];
      this.createHelp().visibleCommands(this).forEach((command) => {
        candidateNames.push(command.name());
        // just visible alias
        if (command.alias()) candidateNames.push(command.alias());
      });
      suggestion = suggestSimilar(unknownName, candidateNames);
    }

    const message = `error: unknown command '${unknownName}'${suggestion}`;
    this.error(message, { code: 'commander.unknownCommand' });
  }

  /**
   * Set the program version to `str`.
   *
   * This method auto-registers the "-V, --version" flag
   * which will print the version number when passed.
   *
   * You can optionally supply the  flags and description to override the defaults.
   *
   * @param {string} str
   * @param {string} [flags]
   * @param {string} [description]
   * @return {this | string} `this` command for chaining, or version string if no arguments
   */

  version(str, flags, description) {
    if (str === undefined) return this._version;
    this._version = str;
    flags = flags || '-V, --version';
    description = description || 'output the version number';
    const versionOption = this.createOption(flags, description);
    this._versionOptionName = versionOption.attributeName();
    this.options.push(versionOption);
    this.on('option:' + versionOption.name(), () => {
      this._outputConfiguration.writeOut(`${str}\n`);
      this._exit(0, 'commander.version', str);
    });
    return this;
  }

  /**
   * Set the description.
   *
   * @param {string} [str]
   * @param {Object} [argsDescription]
   * @return {string|Command}
   */
  description(str, argsDescription) {
    if (str === undefined && argsDescription === undefined) return this._description;
    this._description = str;
    if (argsDescription) {
      this._argsDescription = argsDescription;
    }
    return this;
  }

  /**
   * Set the summary. Used when listed as subcommand of parent.
   *
   * @param {string} [str]
   * @return {string|Command}
   */
  summary(str) {
    if (str === undefined) return this._summary;
    this._summary = str;
    return this;
  }

  /**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {string|Command}
   */

  alias(alias) {
    if (alias === undefined) return this._aliases[0]; // just return first, for backwards compatibility

    /** @type {Command} */
    let command = this;
    if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
      // assume adding alias for last added executable subcommand, rather than this
      command = this.commands[this.commands.length - 1];
    }

    if (alias === command._name) throw new Error('Command alias can\'t be the same as its name');

    command._aliases.push(alias);
    return this;
  }

  /**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {string[]|Command}
   */

  aliases(aliases) {
    // Getter for the array of aliases is the main reason for having aliases() in addition to alias().
    if (aliases === undefined) return this._aliases;

    aliases.forEach((alias) => this.alias(alias));
    return this;
  }

  /**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {String|Command}
   */

  usage(str) {
    if (str === undefined) {
      if (this._usage) return this._usage;

      const args = this._args.map((arg) => {
        return humanReadableArgName(arg);
      });
      return [].concat(
        (this.options.length || this._hasHelpOption ? '[options]' : []),
        (this.commands.length ? '[command]' : []),
        (this._args.length ? args : [])
      ).join(' ');
    }

    this._usage = str;
    return this;
  }

  /**
   * Get or set the name of the command.
   *
   * @param {string} [str]
   * @return {string|Command}
   */

  name(str) {
    if (str === undefined) return this._name;
    this._name = str;
    return this;
  }

  /**
   * Set the name of the command from script filename, such as process.argv[1],
   * or require.main.filename, or __filename.
   *
   * (Used internally and public although not documented in README.)
   *
   * @example
   * program.nameFromFilename(require.main.filename);
   *
   * @param {string} filename
   * @return {Command}
   */

  nameFromFilename(filename) {
    this._name = path.basename(filename, path.extname(filename));

    return this;
  }

  /**
   * Get or set the directory for searching for executable subcommands of this command.
   *
   * @example
   * program.executableDir(__dirname);
   * // or
   * program.executableDir('subcommands');
   *
   * @param {string} [path]
   * @return {string|Command}
   */

  executableDir(path) {
    if (path === undefined) return this._executableDir;
    this._executableDir = path;
    return this;
  }

  /**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */

  helpInformation(contextOptions) {
    const helper = this.createHelp();
    if (helper.helpWidth === undefined) {
      helper.helpWidth = (contextOptions && contextOptions.error) ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
    }
    return helper.formatHelp(this, helper);
  }

  /**
   * @api private
   */

  _getHelpContext(contextOptions) {
    contextOptions = contextOptions || {};
    const context = { error: !!contextOptions.error };
    let write;
    if (context.error) {
      write = (arg) => this._outputConfiguration.writeErr(arg);
    } else {
      write = (arg) => this._outputConfiguration.writeOut(arg);
    }
    context.write = contextOptions.write || write;
    context.command = this;
    return context;
  }

  /**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */

  outputHelp(contextOptions) {
    let deprecatedCallback;
    if (typeof contextOptions === 'function') {
      deprecatedCallback = contextOptions;
      contextOptions = undefined;
    }
    const context = this._getHelpContext(contextOptions);

    getCommandAndParents(this).reverse().forEach(command => command.emit('beforeAllHelp', context));
    this.emit('beforeHelp', context);

    let helpInformation = this.helpInformation(context);
    if (deprecatedCallback) {
      helpInformation = deprecatedCallback(helpInformation);
      if (typeof helpInformation !== 'string' && !Buffer.isBuffer(helpInformation)) {
        throw new Error('outputHelp callback must return a string or a Buffer');
      }
    }
    context.write(helpInformation);

    this.emit(this._helpLongFlag); // deprecated
    this.emit('afterHelp', context);
    getCommandAndParents(this).forEach(command => command.emit('afterAllHelp', context));
  }

  /**
   * You can pass in flags and a description to override the help
   * flags and help description for your command. Pass in false to
   * disable the built-in help option.
   *
   * @param {string | boolean} [flags]
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */

  helpOption(flags, description) {
    if (typeof flags === 'boolean') {
      this._hasHelpOption = flags;
      return this;
    }
    this._helpFlags = flags || this._helpFlags;
    this._helpDescription = description || this._helpDescription;

    const helpFlags = splitOptionFlags(this._helpFlags);
    this._helpShortFlag = helpFlags.shortFlag;
    this._helpLongFlag = helpFlags.longFlag;

    return this;
  }

  /**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */

  help(contextOptions) {
    this.outputHelp(contextOptions);
    let exitCode = process.exitCode || 0;
    if (exitCode === 0 && contextOptions && typeof contextOptions !== 'function' && contextOptions.error) {
      exitCode = 1;
    }
    // message: do not have all displayed text available so only passing placeholder.
    this._exit(exitCode, 'commander.help', '(outputHelp)');
  }

  /**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {string | Function} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */
  addHelpText(position, text) {
    const allowedValues = ['beforeAll', 'before', 'after', 'afterAll'];
    if (!allowedValues.includes(position)) {
      throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    const helpEvent = `${position}Help`;
    this.on(helpEvent, (context) => {
      let helpStr;
      if (typeof text === 'function') {
        helpStr = text({ error: context.error, command: context.command });
      } else {
        helpStr = text;
      }
      // Ignore falsy value when nothing to output.
      if (helpStr) {
        context.write(`${helpStr}\n`);
      }
    });
    return this;
  }
}

/**
 * Output help information if help flags specified
 *
 * @param {Command} cmd - command to output help for
 * @param {Array} args - array of options to search for help flags
 * @api private
 */

function outputHelpIfRequested(cmd, args) {
  const helpOption = cmd._hasHelpOption && args.find(arg => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
  if (helpOption) {
    cmd.outputHelp();
    // (Do not have all displayed text available so only passing placeholder.)
    cmd._exit(0, 'commander.helpDisplayed', '(outputHelp)');
  }
}

/**
 * Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
 *
 * @param {string[]} args - array of arguments from node.execArgv
 * @returns {string[]}
 * @api private
 */

function incrementNodeInspectorPort(args) {
  // Testing for these options:
  //  --inspect[=[host:]port]
  //  --inspect-brk[=[host:]port]
  //  --inspect-port=[host:]port
  return args.map((arg) => {
    if (!arg.startsWith('--inspect')) {
      return arg;
    }
    let debugOption;
    let debugHost = '127.0.0.1';
    let debugPort = '9229';
    let match;
    if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
      // e.g. --inspect
      debugOption = match[1];
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
      debugOption = match[1];
      if (/^\d+$/.test(match[3])) {
        // e.g. --inspect=1234
        debugPort = match[3];
      } else {
        // e.g. --inspect=localhost
        debugHost = match[3];
      }
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      // e.g. --inspect=localhost:1234
      debugOption = match[1];
      debugHost = match[3];
      debugPort = match[4];
    }

    if (debugOption && debugPort !== '0') {
      return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
    }
    return arg;
  });
}

/**
 * @param {Command} startCommand
 * @returns {Command[]}
 * @api private
 */

function getCommandAndParents(startCommand) {
  const result = [];
  for (let command = startCommand; command; command = command.parent) {
    result.push(command);
  }
  return result;
}

exports.Command = Command;


/***/ }),

/***/ 8056:
/***/ ((__unused_webpack_module, exports) => {

// @ts-check

/**
 * CommanderError class
 * @class
 */
class CommanderError extends Error {
  /**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @constructor
   */
  constructor(exitCode, code, message) {
    super(message);
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.exitCode = exitCode;
    this.nestedError = undefined;
  }
}

/**
 * InvalidArgumentError class
 * @class
 */
class InvalidArgumentError extends CommanderError {
  /**
   * Constructs the InvalidArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   * @constructor
   */
  constructor(message) {
    super(1, 'commander.invalidArgument', message);
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

exports.CommanderError = CommanderError;
exports.InvalidArgumentError = InvalidArgumentError;


/***/ }),

/***/ 8917:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const { humanReadableArgName } = __webpack_require__(8998);

/**
 * TypeScript import types for JSDoc, used by Visual Studio Code IntelliSense and `npm run typescript-checkJS`
 * https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
 * @typedef { import("./argument.js").Argument } Argument
 * @typedef { import("./command.js").Command } Command
 * @typedef { import("./option.js").Option } Option
 */

// @ts-check

// Although this is a class, methods are static in style to allow override using subclass or just functions.
class Help {
  constructor() {
    this.helpWidth = undefined;
    this.sortSubcommands = false;
    this.sortOptions = false;
    this.showGlobalOptions = false;
  }

  /**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */

  visibleCommands(cmd) {
    const visibleCommands = cmd.commands.filter(cmd => !cmd._hidden);
    if (cmd._hasImplicitHelpCommand()) {
      // Create a command matching the implicit help command.
      const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
      const helpCommand = cmd.createCommand(helpName)
        .helpOption(false);
      helpCommand.description(cmd._helpCommandDescription);
      if (helpArgs) helpCommand.arguments(helpArgs);
      visibleCommands.push(helpCommand);
    }
    if (this.sortSubcommands) {
      visibleCommands.sort((a, b) => {
        // @ts-ignore: overloaded return type
        return a.name().localeCompare(b.name());
      });
    }
    return visibleCommands;
  }

  /**
   * Compare options for sort.
   *
   * @param {Option} a
   * @param {Option} b
   * @returns number
   */
  compareOptions(a, b) {
    const getSortKey = (option) => {
      // WYSIWYG for order displayed in help. Short used for comparison if present. No special handling for negated.
      return option.short ? option.short.replace(/^-/, '') : option.long.replace(/^--/, '');
    };
    return getSortKey(a).localeCompare(getSortKey(b));
  }

  /**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */

  visibleOptions(cmd) {
    const visibleOptions = cmd.options.filter((option) => !option.hidden);
    // Implicit help
    const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
    const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
    if (showShortHelpFlag || showLongHelpFlag) {
      let helpOption;
      if (!showShortHelpFlag) {
        helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
      } else if (!showLongHelpFlag) {
        helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
      } else {
        helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
      }
      visibleOptions.push(helpOption);
    }
    if (this.sortOptions) {
      visibleOptions.sort(this.compareOptions);
    }
    return visibleOptions;
  }

  /**
   * Get an array of the visible global options. (Not including help.)
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */

  visibleGlobalOptions(cmd) {
    if (!this.showGlobalOptions) return [];

    const globalOptions = [];
    for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
      const visibleOptions = parentCmd.options.filter((option) => !option.hidden);
      globalOptions.push(...visibleOptions);
    }
    if (this.sortOptions) {
      globalOptions.sort(this.compareOptions);
    }
    return globalOptions;
  }

  /**
   * Get an array of the arguments if any have a description.
   *
   * @param {Command} cmd
   * @returns {Argument[]}
   */

  visibleArguments(cmd) {
    // Side effect! Apply the legacy descriptions before the arguments are displayed.
    if (cmd._argsDescription) {
      cmd._args.forEach(argument => {
        argument.description = argument.description || cmd._argsDescription[argument.name()] || '';
      });
    }

    // If there are any arguments with a description then return all the arguments.
    if (cmd._args.find(argument => argument.description)) {
      return cmd._args;
    }
    return [];
  }

  /**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */

  subcommandTerm(cmd) {
    // Legacy. Ignores custom usage string, and nested commands.
    const args = cmd._args.map(arg => humanReadableArgName(arg)).join(' ');
    return cmd._name +
      (cmd._aliases[0] ? '|' + cmd._aliases[0] : '') +
      (cmd.options.length ? ' [options]' : '') + // simplistic check for non-help option
      (args ? ' ' + args : '');
  }

  /**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */

  optionTerm(option) {
    return option.flags;
  }

  /**
   * Get the argument term to show in the list of arguments.
   *
   * @param {Argument} argument
   * @returns {string}
   */

  argumentTerm(argument) {
    return argument.name();
  }

  /**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */

  longestSubcommandTermLength(cmd, helper) {
    return helper.visibleCommands(cmd).reduce((max, command) => {
      return Math.max(max, helper.subcommandTerm(command).length);
    }, 0);
  }

  /**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */

  longestOptionTermLength(cmd, helper) {
    return helper.visibleOptions(cmd).reduce((max, option) => {
      return Math.max(max, helper.optionTerm(option).length);
    }, 0);
  }

  /**
   * Get the longest global option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */

  longestGlobalOptionTermLength(cmd, helper) {
    return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
      return Math.max(max, helper.optionTerm(option).length);
    }, 0);
  }

  /**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */

  longestArgumentTermLength(cmd, helper) {
    return helper.visibleArguments(cmd).reduce((max, argument) => {
      return Math.max(max, helper.argumentTerm(argument).length);
    }, 0);
  }

  /**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */

  commandUsage(cmd) {
    // Usage
    let cmdName = cmd._name;
    if (cmd._aliases[0]) {
      cmdName = cmdName + '|' + cmd._aliases[0];
    }
    let parentCmdNames = '';
    for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
      parentCmdNames = parentCmd.name() + ' ' + parentCmdNames;
    }
    return parentCmdNames + cmdName + ' ' + cmd.usage();
  }

  /**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */

  commandDescription(cmd) {
    // @ts-ignore: overloaded return type
    return cmd.description();
  }

  /**
   * Get the subcommand summary to show in the list of subcommands.
   * (Fallback to description for backwards compatibility.)
   *
   * @param {Command} cmd
   * @returns {string}
   */

  subcommandDescription(cmd) {
    // @ts-ignore: overloaded return type
    return cmd.summary() || cmd.description();
  }

  /**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */

  optionDescription(option) {
    const extraInfo = [];

    if (option.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
    }
    if (option.defaultValue !== undefined) {
      // default for boolean and negated more for programmer than end user,
      // but show true/false for boolean option as may be for hand-rolled env or config processing.
      const showDefault = option.required || option.optional ||
        (option.isBoolean() && typeof option.defaultValue === 'boolean');
      if (showDefault) {
        extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
      }
    }
    // preset for boolean and negated are more for programmer than end user
    if (option.presetArg !== undefined && option.optional) {
      extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
    }
    if (option.envVar !== undefined) {
      extraInfo.push(`env: ${option.envVar}`);
    }
    if (extraInfo.length > 0) {
      return `${option.description} (${extraInfo.join(', ')})`;
    }

    return option.description;
  }

  /**
   * Get the argument description to show in the list of arguments.
   *
   * @param {Argument} argument
   * @return {string}
   */

  argumentDescription(argument) {
    const extraInfo = [];
    if (argument.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
    }
    if (argument.defaultValue !== undefined) {
      extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
    }
    if (extraInfo.length > 0) {
      const extraDescripton = `(${extraInfo.join(', ')})`;
      if (argument.description) {
        return `${argument.description} ${extraDescripton}`;
      }
      return extraDescripton;
    }
    return argument.description;
  }

  /**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */

  formatHelp(cmd, helper) {
    const termWidth = helper.padWidth(cmd, helper);
    const helpWidth = helper.helpWidth || 80;
    const itemIndentWidth = 2;
    const itemSeparatorWidth = 2; // between term and description
    function formatItem(term, description) {
      if (description) {
        const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
        return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
      }
      return term;
    }
    function formatList(textArray) {
      return textArray.join('\n').replace(/^/gm, ' '.repeat(itemIndentWidth));
    }

    // Usage
    let output = [`Usage: ${helper.commandUsage(cmd)}`, ''];

    // Description
    const commandDescription = helper.commandDescription(cmd);
    if (commandDescription.length > 0) {
      output = output.concat([helper.wrap(commandDescription, helpWidth, 0), '']);
    }

    // Arguments
    const argumentList = helper.visibleArguments(cmd).map((argument) => {
      return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
    });
    if (argumentList.length > 0) {
      output = output.concat(['Arguments:', formatList(argumentList), '']);
    }

    // Options
    const optionList = helper.visibleOptions(cmd).map((option) => {
      return formatItem(helper.optionTerm(option), helper.optionDescription(option));
    });
    if (optionList.length > 0) {
      output = output.concat(['Options:', formatList(optionList), '']);
    }

    if (this.showGlobalOptions) {
      const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
        return formatItem(helper.optionTerm(option), helper.optionDescription(option));
      });
      if (globalOptionList.length > 0) {
        output = output.concat(['Global Options:', formatList(globalOptionList), '']);
      }
    }

    // Commands
    const commandList = helper.visibleCommands(cmd).map((cmd) => {
      return formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd));
    });
    if (commandList.length > 0) {
      output = output.concat(['Commands:', formatList(commandList), '']);
    }

    return output.join('\n');
  }

  /**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */

  padWidth(cmd, helper) {
    return Math.max(
      helper.longestOptionTermLength(cmd, helper),
      helper.longestGlobalOptionTermLength(cmd, helper),
      helper.longestSubcommandTermLength(cmd, helper),
      helper.longestArgumentTermLength(cmd, helper)
    );
  }

  /**
   * Wrap the given string to width characters per line, with lines after the first indented.
   * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
   *
   * @param {string} str
   * @param {number} width
   * @param {number} indent
   * @param {number} [minColumnWidth=40]
   * @return {string}
   *
   */

  wrap(str, width, indent, minColumnWidth = 40) {
    // Full \s characters, minus the linefeeds.
    const indents = ' \\f\\t\\v\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff';
    // Detect manually wrapped and indented strings by searching for line break followed by spaces.
    const manualIndent = new RegExp(`[\\n][${indents}]+`);
    if (str.match(manualIndent)) return str;
    // Do not wrap if not enough room for a wrapped column of text (as could end up with a word per line).
    const columnWidth = width - indent;
    if (columnWidth < minColumnWidth) return str;

    const leadingStr = str.slice(0, indent);
    const columnText = str.slice(indent).replace('\r\n', '\n');
    const indentString = ' '.repeat(indent);
    const zeroWidthSpace = '\u200B';
    const breaks = `\\s${zeroWidthSpace}`;
    // Match line end (so empty lines don't collapse),
    // or as much text as will fit in column, or excess text up to first break.
    const regex = new RegExp(`\n|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, 'g');
    const lines = columnText.match(regex) || [];
    return leadingStr + lines.map((line, i) => {
      if (line === '\n') return ''; // preserve empty lines
      return ((i > 0) ? indentString : '') + line.trimEnd();
    }).join('\n');
  }
}

exports.Help = Help;


/***/ }),

/***/ 5790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const { InvalidArgumentError } = __webpack_require__(8056);

// @ts-check

class Option {
  /**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */

  constructor(flags, description) {
    this.flags = flags;
    this.description = description || '';

    this.required = flags.includes('<'); // A value must be supplied when the option is specified.
    this.optional = flags.includes('['); // A value is optional when the option is specified.
    // variadic test ignores <value,...> et al which might be used to describe custom splitting of single argument
    this.variadic = /\w\.\.\.[>\]]$/.test(flags); // The option can take multiple values.
    this.mandatory = false; // The option must have a value after parsing, which usually means it must be specified on command line.
    const optionFlags = splitOptionFlags(flags);
    this.short = optionFlags.shortFlag;
    this.long = optionFlags.longFlag;
    this.negate = false;
    if (this.long) {
      this.negate = this.long.startsWith('--no-');
    }
    this.defaultValue = undefined;
    this.defaultValueDescription = undefined;
    this.presetArg = undefined;
    this.envVar = undefined;
    this.parseArg = undefined;
    this.hidden = false;
    this.argChoices = undefined;
    this.conflictsWith = [];
    this.implied = undefined;
  }

  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Option}
   */

  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }

  /**
   * Preset to use when option used without option-argument, especially optional but also boolean and negated.
   * The custom processing (parseArg) is called.
   *
   * @example
   * new Option('--color').default('GREYSCALE').preset('RGB');
   * new Option('--donate [amount]').preset('20').argParser(parseFloat);
   *
   * @param {any} arg
   * @return {Option}
   */

  preset(arg) {
    this.presetArg = arg;
    return this;
  }

  /**
   * Add option name(s) that conflict with this option.
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @example
   * new Option('--rgb').conflicts('cmyk');
   * new Option('--js').conflicts(['ts', 'jsx']);
   *
   * @param {string | string[]} names
   * @return {Option}
   */

  conflicts(names) {
    this.conflictsWith = this.conflictsWith.concat(names);
    return this;
  }

  /**
   * Specify implied option values for when this option is set and the implied options are not.
   *
   * The custom processing (parseArg) is not called on the implied values.
   *
   * @example
   * program
   *   .addOption(new Option('--log', 'write logging information to file'))
   *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
   *
   * @param {Object} impliedOptionValues
   * @return {Option}
   */
  implies(impliedOptionValues) {
    let newImplied = impliedOptionValues;
    if (typeof impliedOptionValues === 'string') {
      // string is not documented, but easy mistake and we can do what user probably intended.
      newImplied = { [impliedOptionValues]: true };
    }
    this.implied = Object.assign(this.implied || {}, newImplied);
    return this;
  }

  /**
   * Set environment variable to check for option value.
   *
   * An environment variable is only used if when processed the current option value is
   * undefined, or the source of the current value is 'default' or 'config' or 'env'.
   *
   * @param {string} name
   * @return {Option}
   */

  env(name) {
    this.envVar = name;
    return this;
  }

  /**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */

  argParser(fn) {
    this.parseArg = fn;
    return this;
  }

  /**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */

  makeOptionMandatory(mandatory = true) {
    this.mandatory = !!mandatory;
    return this;
  }

  /**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */

  hideHelp(hide = true) {
    this.hidden = !!hide;
    return this;
  }

  /**
   * @api private
   */

  _concatValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }

    return previous.concat(value);
  }

  /**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */

  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(', ')}.`);
      }
      if (this.variadic) {
        return this._concatValue(arg, previous);
      }
      return arg;
    };
    return this;
  }

  /**
   * Return option name.
   *
   * @return {string}
   */

  name() {
    if (this.long) {
      return this.long.replace(/^--/, '');
    }
    return this.short.replace(/^-/, '');
  }

  /**
   * Return option name, in a camelcase format that can be used
   * as a object attribute key.
   *
   * @return {string}
   * @api private
   */

  attributeName() {
    return camelcase(this.name().replace(/^no-/, ''));
  }

  /**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @api private
   */

  is(arg) {
    return this.short === arg || this.long === arg;
  }

  /**
   * Return whether a boolean option.
   *
   * Options are one of boolean, negated, required argument, or optional argument.
   *
   * @return {boolean}
   * @api private
   */

  isBoolean() {
    return !this.required && !this.optional && !this.negate;
  }
}

/**
 * This class is to make it easier to work with dual options, without changing the existing
 * implementation. We support separate dual options for separate positive and negative options,
 * like `--build` and `--no-build`, which share a single option value. This works nicely for some
 * use cases, but is tricky for others where we want separate behaviours despite
 * the single shared option value.
 */
class DualOptions {
  /**
   * @param {Option[]} options
   */
  constructor(options) {
    this.positiveOptions = new Map();
    this.negativeOptions = new Map();
    this.dualOptions = new Set();
    options.forEach(option => {
      if (option.negate) {
        this.negativeOptions.set(option.attributeName(), option);
      } else {
        this.positiveOptions.set(option.attributeName(), option);
      }
    });
    this.negativeOptions.forEach((value, key) => {
      if (this.positiveOptions.has(key)) {
        this.dualOptions.add(key);
      }
    });
  }

  /**
   * Did the value come from the option, and not from possible matching dual option?
   *
   * @param {any} value
   * @param {Option} option
   * @returns {boolean}
   */
  valueFromOption(value, option) {
    const optionKey = option.attributeName();
    if (!this.dualOptions.has(optionKey)) return true;

    // Use the value to deduce if (probably) came from the option.
    const preset = this.negativeOptions.get(optionKey).presetArg;
    const negativeValue = (preset !== undefined) ? preset : false;
    return option.negate === (negativeValue === value);
  }
}

/**
 * Convert string from kebab-case to camelCase.
 *
 * @param {string} str
 * @return {string}
 * @api private
 */

function camelcase(str) {
  return str.split('-').reduce((str, word) => {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

/**
 * Split the short and long flag out of something like '-m,--mixed <value>'
 *
 * @api private
 */

function splitOptionFlags(flags) {
  let shortFlag;
  let longFlag;
  // Use original very loose parsing to maintain backwards compatibility for now,
  // which allowed for example unintended `-sw, --short-word` [sic].
  const flagParts = flags.split(/[ |,]+/);
  if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift();
  longFlag = flagParts.shift();
  // Add support for lone short flag without significantly changing parsing!
  if (!shortFlag && /^-[^-]$/.test(longFlag)) {
    shortFlag = longFlag;
    longFlag = undefined;
  }
  return { shortFlag, longFlag };
}

exports.Option = Option;
exports.splitOptionFlags = splitOptionFlags;
exports.DualOptions = DualOptions;


/***/ }),

/***/ 1812:
/***/ ((__unused_webpack_module, exports) => {

const maxDistance = 3;

function editDistance(a, b) {
  // https://en.wikipedia.org/wiki/Damerau–Levenshtein_distance
  // Calculating optimal string alignment distance, no substring is edited more than once.
  // (Simple implementation.)

  // Quick early exit, return worst case.
  if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length);

  // distance between prefix substrings of a and b
  const d = [];

  // pure deletions turn a into empty string
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
  }
  // pure insertions turn empty string into b
  for (let j = 0; j <= b.length; j++) {
    d[0][j] = j;
  }

  // fill matrix
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      let cost = 1;
      if (a[i - 1] === b[j - 1]) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );
      // transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }

  return d[a.length][b.length];
}

/**
 * Find close matches, restricted to same number of edits.
 *
 * @param {string} word
 * @param {string[]} candidates
 * @returns {string}
 */

function suggestSimilar(word, candidates) {
  if (!candidates || candidates.length === 0) return '';
  // remove possible duplicates
  candidates = Array.from(new Set(candidates));

  const searchingOptions = word.startsWith('--');
  if (searchingOptions) {
    word = word.slice(2);
    candidates = candidates.map(candidate => candidate.slice(2));
  }

  let similar = [];
  let bestDistance = maxDistance;
  const minSimilarity = 0.4;
  candidates.forEach((candidate) => {
    if (candidate.length <= 1) return; // no one character guesses

    const distance = editDistance(word, candidate);
    const length = Math.max(word.length, candidate.length);
    const similarity = (length - distance) / length;
    if (similarity > minSimilarity) {
      if (distance < bestDistance) {
        // better edit distance, throw away previous worse matches
        bestDistance = distance;
        similar = [candidate];
      } else if (distance === bestDistance) {
        similar.push(candidate);
      }
    }
  });

  similar.sort((a, b) => a.localeCompare(b));
  if (searchingOptions) {
    similar = similar.map(candidate => `--${candidate}`);
  }

  if (similar.length > 1) {
    return `\n(Did you mean one of ${similar.join(', ')}?)`;
  }
  if (similar.length === 1) {
    return `\n(Did you mean ${similar[0]}?)`;
  }
  return '';
}

exports.suggestSimilar = suggestSimilar;


/***/ }),

/***/ 939:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*! (c) 2020 Andrea Giammarchi */

const {parse: $parse, stringify: $stringify} = JSON;
const {keys} = Object;

const Primitive = String;   // it could be Number
const primitive = 'string'; // it could be 'number'

const ignore = {};
const object = 'object';

const noop = (_, value) => value;

const primitives = value => (
  value instanceof Primitive ? Primitive(value) : value
);

const Primitives = (_, value) => (
  typeof value === primitive ? new Primitive(value) : value
);

const revive = (input, parsed, output, $) => {
  const lazy = [];
  for (let ke = keys(output), {length} = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];
    if (value instanceof Primitive) {
      const tmp = input[value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({k, a: [input, parsed, tmp, $]});
      }
      else
        output[k] = $.call(output, k, tmp);
    }
    else if (output[k] !== ignore)
      output[k] = $.call(output, k, value);
  }
  for (let {length} = lazy, i = 0; i < length; i++) {
    const {k, a} = lazy[i];
    output[k] = $.call(output, k, revive.apply(null, a));
  }
  return output;
};

const set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

const parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const value = input[0];
  const $ = reviver || noop;
  const tmp = typeof value === object && value ?
              revive(input, new Set, value, $) :
              value;
  return $.call({'': tmp}, '', tmp);
};
exports.parse = parse;

const stringify = (value, replacer, space) => {
  const $ = replacer && typeof replacer === object ?
            (k, v) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0) :
            (replacer || noop);
  const known = new Map;
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({'': value}, '', value));
  let firstRun = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key, value) {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after = $.call(this, key, value);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};
exports.stringify = stringify;

const toJSON = any => $parse(stringify(any));
exports.toJSON = toJSON;
const fromJSON = any => parse($stringify(any));
exports.fromJSON = fromJSON;


/***/ }),

/***/ 4147:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"electron","version":"1.0.0","description":"A minimal Electron application","main":"dist/electron/main.js","scripts":{"start":"electron .","dev":"ts-node ./build/dev-runner.js","build":"ts-node ./build/build.js && electron-builder"},"repository":"","keywords":["Electron","quick","start","tutorial","demo"],"author":"GitHub","license":"CC0-1.0","dependencies":{"@capacitor/electron":"^2.5.0","commander":"^10.0.1","electron-updater":"^5.3.0","eventemitter3":"^5.0.1","log4js":"^6.3.0","lru-cache":"^9.1.2","md5":"^2.3.0","node-machine-id":"^1.1.12"},"devDependencies":{"@types/node":"^14.11.8","cfonts":"^2.8.6","chalk":"^4.1.0","copy-webpack-plugin":"^6.2.1","del":"^6.0.0","electron":"^25.1.0","electron-builder":"^23.6.0","multispinner":"^0.2.1","node-loader":"^1.0.2","npm-run-all":"^4.1.5","prettier":"^2.8.8","ts-loader":"^9.4.3","tslint":"^6.1.3","tslint-config-prettier":"^1.18.0","typescript":"^5.1.3","webpack":"^5.86.0","webpack-cli":"^5.1.4","webpack-merge":"^5.2.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 8519);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;