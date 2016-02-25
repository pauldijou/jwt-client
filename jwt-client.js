(function (global_, factory) {
  if (typeof exports === 'object') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(global_);
    });
  }
  else {
    window.JWT = factory(global_);
  }
})(this, function (_global) {
  var JWT = {};

  JWT.defaults = {
    // The key used to store the token
    key: 'JWT_TOKEN',
    // This is the official token to use for JWT but feel free to use another one if you want
    tokenPrefix: 'Bearer ',
    // Where to store the token, by default localStorage
    storage: _global.localStorage,
    // In Base64 url-safe mode, padding isn't mandatory, so we will disable it by default
    // but you can force it by setting this param to true if you want
    padding: false
  };

  JWT.encode64 = function encode64(value) {
    var encoded = _global.btoa(_global.unescape(_global.encodeURIComponent(value)));
    if (!JWT.defaults.padding) { return encoded.replace(/=+$/, ''); }
    else { return encoded; }
  };

  JWT.decode64 = function decode64(value) {
    return _global.decodeURIComponent(_global.escape(_global.atob(value)));
  };

  JWT.write = function write(value) {
    return JWT.defaults.tokenPrefix +
            JWT.encode64(JSON.stringify(value.header)) + '.' +
            JWT.encode64(JSON.stringify(value.claim)) + '.' +
            (value.signature || '');
  };

  JWT.read = function read(header) {
    if (header.indexOf(JWT.defaults.tokenPrefix) === 0) {
      header = header.substring(JWT.defaults.tokenPrefix.length);
    }

    var parts = header.split('.');
    return {
      header: JSON.parse(JWT.decode64(parts[0])),
      claim: JSON.parse(JWT.decode64(parts[1])),
      signature: (parts[2] || '')
    };
  };

  JWT.validateClaim = function validateClaim(claim, issuer, audience) {
    var now = Date.now() / 1000;
    return claim &&
      (!claim.exp || claim.exp > now) &&
      (!claim.nbf || claim.nbf < now) &&
      (issuer === undefined || issuer === claim.iss) &&
      (audience === undefined || audience === claim.aud);
  };

  JWT.validate = function validate(value, issuer, audience) {
    if (isString(value)) { value = JWT.read(value); }
    return value && value.claim && JWT.validateClaim(value.claim, issuer, audience);
  };

  JWT.set = function set(value, key, storage) {
    var normalized = normalize(key, storage);
    return normalized.storage.setItem(normalized.key, value);
  };

  JWT.get = function get(key, storage) {
    var normalized = normalize(key, storage);
    return normalized.storage.getItem(normalized.key);
  };

  JWT.remove = function forget(key, storage) {
    var normalized = normalize(key, storage);
    return normalized.storage.removeItem(normalized.key);
  };

  JWT.keep = function keep(value, key, storage) {
    return JWT.set(isString(value) ? value : JWT.write(value), key, storage);
  };

  JWT.remember = function remember(key, storage) {
    var memory = JWT.get(key, storage);
    return memory && JWT.read(memory);
  };

  JWT.forget = JWT.remove;

  // Private functions
  // Just a little bit copy/pasted from Lodash
  function isString(value) {
    return typeof value == 'string' ||
      (value && typeof value == 'object' && Object.prototype.toString.call(value) == '[object String]') || false;
  }

  function normalize(key, storage) {
    if (key && !isString(key)) {
      storage = key;
      key = undefined;
    }
    return {
      key: key || JWT.defaults.key,
      storage: storage || JWT.defaults.storage
    };
  }

  return JWT;
});
