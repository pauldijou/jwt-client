(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(global);
  }
  else if (typeof define === 'function' && define.amd) {
    define(['global'], factory);
  }
  else {
    window.JWT = factory(window);
  }
})(function (global) {
  var JWT = {};

  JWT.defaults = {
    key: 'JWT_TOKEN',
    storage: global.localStorage
  };

  JWT.encode64 = function encode64(value) {
    return global.btoa(global.unescape(global.encodeURIComponent(value)));
  };

  JWT.decode64 = function decode64(value) {
    return global.decodeURIComponent(global.escape(global.atob(value)));
  };

  JWT.write = function write(value) {
    return JWT.encode64(JSON.stringify(value.header)) + '.' +
            JWT.encode64(JSON.stringify(value.claim)) + '.' +
            (value.signature || '');
  };

  JWT.read = function read(token) {
    var parts = token.split('.');
    return {
      header: JSON.parse(JWT.decode64(parts[0])),
      claim: JSON.parse(JWT.decode64(parts[1])),
      signature: (parts[2] || '')
    };
  };

  JWT.validateClaim = function validateClaim(claim, issuer, audience) {
    var now = Date.now();
    return claim &&
      (!claim.exp || claim.exp > now) &&
      (!claim.nbf || claim.nbf < now) &&
      (issuer === undefined || issuer === claim.iss) &&
      (audience === undefined || audience === claim.aud);
  };

  JWT.validate = function validate(value, issuer, audience) {
    return value && value.claim && JWT.validateClaim(value.claim, issuer, audience);
  };

  JWT.set = function set(token, key, storage) {
    var normalized = normalize(key, storage);
    return normalized.storage.setItem(normalized.key, token);
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
    return JWT.set(JWT.write(value), key, storage);
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
      (value && typeof value == 'object' && toString.call(value) == '[object String]') || false;
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
