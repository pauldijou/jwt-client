describe('Memory', function () {
  var header = {"alg": "HS256", "typ": "JWT" };
  var claim = { "sub": 1234567890, "name": "John Doe", "admin": true };
  var signature = 'eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';
  var value = { header: header, claim: claim, signature: signature };
  var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ==.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';

  afterEach(function () {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should keep a JWT object', function () {
    JWT.keep(value);
    expect(JWT.get()).toEqual(token);
  });

  it('should remember a JWT object', function () {
    JWT.keep(value);
    expect(JWT.remember()).toEqual(value);
  });

  it('should be able to forget', function () {
    JWT.keep(value);
    expect(JWT.remember()).toEqual(value);
    JWT.forget();
    expect(JWT.get()).toEqual(null);
    expect(JWT.remember()).toEqual(null);
  });
});
