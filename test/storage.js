describe('Storage', function () {
  var defaultKey;
  var defaultStorage;

  beforeEach(function () {
    defaultKey = JWT.defaults.key;
    defaultStorage = JWT.defaults.storage;
  });

  afterEach(function () {
    JWT.defaults.key = defaultKey;
    JWT.defaults.storage = defaultStorage;
    localStorage.clear();
    sessionStorage.clear();
  });

  var header = {"alg": "HS256", "typ": "JWT" };
  var claim = { "sub": 1234567890, "name": "John Doe", "admin": true };
  var signature = 'eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';
  var value = { header: header, claim: claim, signature: signature };
  var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ==.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';

  var runDefaultTests = function () {
    it('should store a token', function () {
      JWT.set(token + 'a');
      expect(JWT.defaults.storage.getItem(JWT.defaults.key)).toEqual(token + 'a');
      JWT.set(token);
      expect(JWT.defaults.storage.getItem(JWT.defaults.key)).toEqual(token);
    });

    it('should retrieve a token', function () {
      JWT.set(token);
      expect(JWT.get()).toEqual(token);
      JWT.defaults.storage.setItem(JWT.defaults.key, token + 'a');
      expect(JWT.get()).toEqual(token + 'a');
    });

    it('should remove a stored token', function () {
      JWT.set(token);
      expect(JWT.get()).toEqual(token);
      JWT.remove();
      expect(JWT.get()).toEqual(null);
    });
  };

  describe('Default Storage', function () {
    runDefaultTests();
  });

  describe('Set default storage as localStorage', function () {
    beforeEach(function () {
      JWT.defaults.storage = localStorage;
    });

    runDefaultTests();
  });

  describe('Set default storage as sessionStorage', function () {
    beforeEach(function () {
      JWT.defaults.storage = sessionStorage;
    });

    runDefaultTests();
  });

  describe('Manually impose localStorage', function () {
    it('should store a token', function () {
      JWT.set(token + 'a', localStorage);
      expect(localStorage.getItem(JWT.defaults.key)).toEqual(token + 'a');
      JWT.set(token, localStorage);
      expect(localStorage.getItem(JWT.defaults.key)).toEqual(token);
    });

    it('should retrieve a token', function () {
      JWT.set(token, localStorage);
      expect(JWT.get(localStorage)).toEqual(token);
      localStorage.setItem(JWT.defaults.key, token + 'a');
      expect(JWT.get(localStorage)).toEqual(token + 'a');
    });

    it('should remove a stored token', function () {
      JWT.set(token, localStorage);
      expect(JWT.get(localStorage)).toEqual(token);
      JWT.remove(localStorage);
      expect(JWT.get(localStorage)).toEqual(null);
    });
  });

  describe('Manually impose sessionStorage', function () {
    it('should store a token', function () {
      JWT.set(token + 'a', sessionStorage);
      expect(sessionStorage.getItem(JWT.defaults.key)).toEqual(token + 'a');
      JWT.set(token, sessionStorage);
      expect(sessionStorage.getItem(JWT.defaults.key)).toEqual(token);
    });

    it('should retrieve a token', function () {
      JWT.set(token, sessionStorage);
      expect(JWT.get(sessionStorage)).toEqual(token);
      sessionStorage.setItem(JWT.defaults.key, token + 'a');
      expect(JWT.get(sessionStorage)).toEqual(token + 'a');
    });

    it('should remove a stored token', function () {
      JWT.set(token, sessionStorage);
      expect(JWT.get(sessionStorage)).toEqual(token);
      JWT.remove(sessionStorage);
      expect(JWT.get(sessionStorage)).toEqual(null);
    });
  });
});
