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
            value.signature;
  };

  JWT.read = function read(token) {
    var parts = token.split('.');
    return {
      header: JSON.parse(JWT.decode64(parts[0])),
      claim: JSON.parse(JWT.decode64(parts[1])),
      signature: parts[2]
    };
  };

  JWT.validate = function validate(value, issuer, audience) {
    var now = Date.now();
    return value &&
      (!value.exp || value.exp < now) &&
      (!value.nbf || value.nbf > now) &&
      (issuer === undefined || issuer === value.iss) &&
      (audience === undefined || audience === value.aud);
  };

  JWT.set = function set(token, key, storage) {
    key = key || JWT.defaults.key;
    storage = storage || JWT.defaults.storage;
    return storage.setItem(key, token);
  };

  JWT.get = function get(key, storage) {
    key = key || JWT.defaults.key;
    storage = storage || JWT.defaults.storage;
    return storage.getItem(key);
  };

  JWT.keep = function keep(value, key, storage) {
    return JWT.set(JWT.write(value.header, value.claim, value.signature), key, storage);
  };

  JWT.remember = function remember(key, storage) {
    return JWT.read(JWT.get(key, storage));
  };

  JWT.forget = function forget(key, storage) {
    key = key || JWT.defaults.key;
    storage = storage || JWT.defaults.storage;
    return storage.removeItem(key);
  };

  return JWT;
});
