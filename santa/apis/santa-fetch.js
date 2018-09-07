define(['exports', 'babel-runtime/helpers/objectWithoutProperties', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/defineProperty', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/json/stringify', 'babel-runtime/helpers/typeof', 'es6-promise', 'isomorphic-fetch', 'fetch-jsonp', 'qs', 'babel-runtime/core-js/object/define-properties', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits'], function (exports, _objectWithoutProperties, _regeneratorRuntime, _Promise, _asyncToGenerator, _Object$assign, _defineProperty, _extends, _Object$keys, _JSON$stringify, _typeof, Promise, isomorphicFetch, fetchJsonp, qs, _Object$defineProperties, _Object$getPrototypeOf, _classCallCheck, _createClass, _possibleConstructorReturn, _inherits) { 'use strict';

_objectWithoutProperties = 'default' in _objectWithoutProperties ? _objectWithoutProperties['default'] : _objectWithoutProperties;
_regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
_Promise = 'default' in _Promise ? _Promise['default'] : _Promise;
_asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
_Object$assign = 'default' in _Object$assign ? _Object$assign['default'] : _Object$assign;
_defineProperty = 'default' in _defineProperty ? _defineProperty['default'] : _defineProperty;
_extends = 'default' in _extends ? _extends['default'] : _extends;
_Object$keys = 'default' in _Object$keys ? _Object$keys['default'] : _Object$keys;
_JSON$stringify = 'default' in _JSON$stringify ? _JSON$stringify['default'] : _JSON$stringify;
_typeof = 'default' in _typeof ? _typeof['default'] : _typeof;
Promise = 'default' in Promise ? Promise['default'] : Promise;
fetchJsonp = 'default' in fetchJsonp ? fetchJsonp['default'] : fetchJsonp;
qs = 'default' in qs ? qs['default'] : qs;
_Object$defineProperties = 'default' in _Object$defineProperties ? _Object$defineProperties['default'] : _Object$defineProperties;
_Object$getPrototypeOf = 'default' in _Object$getPrototypeOf ? _Object$getPrototypeOf['default'] : _Object$getPrototypeOf;
_classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
_createClass = 'default' in _createClass ? _createClass['default'] : _createClass;
_possibleConstructorReturn = 'default' in _possibleConstructorReturn ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
_inherits = 'default' in _inherits ? _inherits['default'] : _inherits;

var FetchPromise = function (_Promise$$1) {
  _inherits(FetchPromise, _Promise$$1);

  function FetchPromise(target, controller) {
    _classCallCheck(this, FetchPromise);

    var promise = void 0;

    var _this = _possibleConstructorReturn(this, (FetchPromise.__proto__ || _Object$getPrototypeOf(FetchPromise)).call(this, function (resolve) {
      promise = target.then(function (response) {
        resolve();
        return response;
      });
    }));

    _Object$defineProperties(_this, {
      controller: {
        value: controller
      },
      promise: {
        value: promise,
        writable: true
      }
    });
    return _this;
  }

  _createClass(FetchPromise, [{
    key: 'then',
    value: function then(onFulfilled, onRejected) {
      this.promise = this.promise.then(onFulfilled, onRejected);
      return this;
    }
  }, {
    key: 'catch',
    value: function _catch(onRejected) {
      this.promise = this.promise.catch(onRejected);
      return this;
    }
  }, {
    key: 'finally',
    value: function _finally(onFinally) {
      this.promise = this.promise.finally(onFinally);
      return this;
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.controller.abort();
      return this;
    }
  }]);

  return FetchPromise;
}(Promise);

var SUCCESS_CODE = 200;
var REDIRECT_CODE = 300;
var AS = '?';
var AND = '&';
var JSON_CONTENTTYPE = 'application/json';
var FORM_CONTENTTYPE = 'application/x-www-form-urlencoded';
var MULTIPART_CONTENTTYPE = 'multipart/form-data';
var TEXT_CONTENTTYPE = 'text/html';
var PLAIN_CONTENTTYPE = 'text/plain';
var CROSS_ORIGIN = 'cors';
var CREDENTIAL_INCLUDE = 'include';
var HTTP_GET = 'GET';
var HTTP_POST = 'POST';
var HTTP_PUT = 'PUT';
var CONTENTTYPE = 'Content-Type';

var getOptions = {
  mode: CROSS_ORIGIN,
  credentials: CREDENTIAL_INCLUDE
};
var postOptions = {
  headers: _defineProperty({}, CONTENTTYPE, FORM_CONTENTTYPE),
  credentials: CREDENTIAL_INCLUDE
};
var putOptions = {
  headers: _defineProperty({}, CONTENTTYPE, JSON_CONTENTTYPE),
  credentials: CREDENTIAL_INCLUDE
};
var userData = {};

/**
 * Get next options by beforeSend function.
 * @param {object} options The options came from user.
 * @return {object} The next options.
 */
var beforeSendHandler = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options) {
    var clonedOptions, _clonedOptions$before, beforeSend, params, isValidParams;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clonedOptions = _Object$assign({}, options);
            _clonedOptions$before = clonedOptions.beforeSend, beforeSend = _clonedOptions$before === undefined ? function () {
              return new _Promise(function (resolve) {
                return resolve({});
              });
            } : _clonedOptions$before;
            _context.next = 4;
            return beforeSend();

          case 4:
            params = _context.sent;
            isValidParams = (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && params !== null && _Object$keys(params).length > 0;

            if (isValidParams) {
              clonedOptions.data = _extends({}, clonedOptions.data, params.data);
              clonedOptions.headers = _extends({}, clonedOptions.headers, params.headers);
            }
            return _context.abrupt('return', clonedOptions);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function beforeSendHandler(_x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Request generator. It was used to output controller and fetch promise separetely.
 * @param {*} options The request options.
 * @return {object} Return controller at first time the next called.
 * @return {Promise} Return fetch promise.
 */


var _marked = /*#__PURE__*/_regeneratorRuntime.mark(requestGenerator);

var _window = window;
var FormData = _window.FormData;

var defaultData = userData;
var defaultGetOptions = getOptions;
var defaultPostOptions = postOptions;
var defaultPutOptions = putOptions;

/**
 * Parse request response by contetnt-type.
 * @param {object} response The response of request.
 * @return {promise} The request promise with formating handling.
 */
function parseResponse(response) {
  var result = void 0;
  if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && response !== null) {
    var headers = response.headers;

    var hasContentType = headers.has(CONTENTTYPE);
    var contentType = headers.get(CONTENTTYPE);
    var isJsonFormat = hasContentType && contentType.indexOf(JSON_CONTENTTYPE) > -1;
    var isFormFormat = hasContentType && (contentType.indexOf(FORM_CONTENTTYPE) > -1 || contentType.indexOf(MULTIPART_CONTENTTYPE) > -1);
    var isTextFormat = hasContentType && (contentType.indexOf(TEXT_CONTENTTYPE) > -1 || contentType.indexOf(PLAIN_CONTENTTYPE) > -1);
    if (isJsonFormat) {
      result = response.json();
    } else if (isFormFormat) {
      result = response.formData();
    } else if (isTextFormat) {
      result = response.text();
    } else {
      result = response.text();
      try {
        result = JSON.parse(result);
      } catch (e) {}
    }
  }
  return result;
}
/**
 * Check response status. If the code is between 200 to 300, the request is successful, and vice versa.
 * @param {object} response The request response.
 * @return {object} The check result.
 */
function checkStatus(response) {
  var isSuccess = response.status >= SUCCESS_CODE && response.status < REDIRECT_CODE;
  if (isSuccess) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * Combine url and data into uri.
 * @param {string} url The request url.
 * @param {any} data The parameter to be sent.
 * @return {string} The uri for get method.
 */
var getGetUrl = function getGetUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments[1];

  var queryString = qs.stringify(data);
  var DELIMITER = url.indexOf(AS) > 0 ? AND : AS;
  DELIMITER = queryString !== '' ? DELIMITER : '';
  return '' + url + DELIMITER + queryString;
};
/**
 * Resolve user data to get post data in body.
 * @param {any} data The input data came from user.
 * @param {string?} contentType The content type of body.
 * @return {string} The post data in body.
 */
var getPostData = function getPostData(data) {
  var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var postData = '';
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null) {
    if (FormData && data instanceof FormData) {
      postData = data;
    } else if (data && contentType === JSON_CONTENTTYPE) {
      postData = _JSON$stringify(data);
    } else if (Array.isArray(data)) {
      postData = _JSON$stringify(data);
    } else {
      var postBody = _Object$keys(data).map(function (objKey) {
        var param = _typeof(data[objKey]) === 'object' ? _JSON$stringify(data[objKey]) : String(data[objKey]);
        return objKey + '=' + param;
      });
      postData = postBody.join('&');
    }
  } else if (data) {
    postData = String(data);
  }
  return postData;
};
/**
 * Get fetch options
 * @param {*} options The options from user.
 * @return {object} The fetch options, including fetch options and fetch url.
 */
function getFetchOptions(options) {
  var url = options.url,
      _options$method = options.method,
      method = _options$method === undefined ? HTTP_GET : _options$method,
      mode = options.mode,
      credentials = options.credentials,
      data = options.data,
      contentType = options.contentType,
      headers = options.headers;

  var defaultOptions = { method: method };
  if (mode) {
    defaultOptions.mode = mode;
  }
  if (credentials) {
    defaultOptions.credentials = credentials;
  }
  var fetchOptions = _extends({}, defaultGetOptions, defaultOptions);
  var fetchUrl = url;
  var fetchData = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null ? _extends({}, defaultData, data) : data;
  if (method && method.toUpperCase() === HTTP_POST) {
    fetchOptions = _extends({}, defaultPostOptions, defaultOptions, {
      headers: _extends(_defineProperty({}, CONTENTTYPE, contentType ? contentType : defaultPostOptions.headers[CONTENTTYPE]), headers),
      body: getPostData(fetchData, contentType)
    });
  } else if (method && method.toUpperCase() === HTTP_PUT) {
    fetchOptions = _extends({}, defaultPutOptions, defaultOptions, {
      headers: _extends(_defineProperty({}, CONTENTTYPE, contentType ? contentType : defaultPutOptions.headers[CONTENTTYPE]), headers),
      body: _JSON$stringify(fetchData)
    });
  } else {
    fetchOptions = _Object$assign(fetchOptions, { headers: _extends({}, headers) });
    fetchUrl = getGetUrl(url, data);
  }
  return _extends({ fetchUrl: fetchUrl }, fetchOptions);
}
/**
 * Set global configurations.
 * @param {object} settings The settings.
 */
function setGlobal(settings) {
  var _settings$data = settings.data,
      data = _settings$data === undefined ? {} : _settings$data,
      _settings$getOptions = settings.getOptions,
      getOptions$$1 = _settings$getOptions === undefined ? {} : _settings$getOptions,
      _settings$postOptions = settings.postOptions,
      postOptions$$1 = _settings$postOptions === undefined ? {} : _settings$postOptions;

  _Object$assign(defaultData, data);
  _Object$assign(defaultGetOptions, getOptions$$1);
  _Object$assign(defaultPostOptions, postOptions$$1);
}function requestGenerator(options) {
  var timeout, controller, signal, promise;
  return _regeneratorRuntime.wrap(function requestGenerator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          timeout = options.timeout;
          controller = new AbortController();
          _context2.next = 4;
          return controller;

        case 4:
          signal = controller.signal;
          promise = beforeSendHandler(options).then(function (nextOptions) {
            var _getFetchOptions = getFetchOptions(nextOptions),
                fetchUrl = _getFetchOptions.fetchUrl,
                fetchOptions = _objectWithoutProperties(_getFetchOptions, ['fetchUrl']);

            fetchOptions.signal = signal;
            if (timeout) {
              setTimeout(function () {
                controller.abort();
              }, timeout);
            }
            return fetch(fetchUrl, fetchOptions);
          });
          _context2.next = 8;
          return promise;

        case 8:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked, this);
}
/**
 * Requests a URL, returning a promise && support promise.abort
 * @param {string} options The request options.
 * @returns {Promise} The promise of request.
 */
function request(options) {
  var generator = requestGenerator(options);
  var controller = generator.next().value;
  var promise = generator.next().value;
  var fetchContainer = new FetchPromise(promise, controller);
  return fetchContainer;
}
/**
 * Request data from server-side.
 * @param {string} url The URL we want to request
 * @param {string} method 'POST', 'PUT' or 'GET' default: 'GET'
 * @param {object} headers The header information of request.
 * @param {number} timeout Timeout to request
 * @param {object} data The options we want to pass to "fetch"
 * @param {string} mode 'cors' || 'same-origin' || 'no-cors' || 'navigate'
 * @param {string} credentials 'include' || 'same-origin' || 'omit'
 * @returns {Promise} The fetch promise with contoller.
 */
var requestData = function requestData() {
  var promise = request.apply(undefined, arguments).then(checkStatus).then(parseResponse).then(function (data) {
    var result = { data: data };
    return result;
  });
  return promise;
};
/**
 * Request by jsonp format.
 * @param {*} args Arguments of request.
 * @returns {Promise} The fetch promise.
 */
var jsonp = function jsonp() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return fetchJsonp(args).then(function (res) {
    return res.json();
  });
};

exports.setGlobal = setGlobal;
exports.request = request;
exports.requestData = requestData;
exports.checkStatus = checkStatus;
exports.parseResponse = parseResponse;
exports.jsonp = jsonp;

Object.defineProperty(exports, '__esModule', { value: true });

});
