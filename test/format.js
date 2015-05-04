describe('Format', function () {
  var values = [{
    raw: 'a',
    enc: 'YQ'
  }, {
    raw: '{"iss":"me","exp":1234579789,"id":"totoro"}',
    enc: 'eyJpc3MiOiJtZSIsImV4cCI6MTIzNDU3OTc4OSwiaWQiOiJ0b3Rvcm8ifQ'
  },{
    raw: '{ "msg_en": "Hello", "msg_jp": "こんにちは", "msg_cn": "你好", "msg_kr": "안녕하세요", "msg_ru": "Здравствуйте!", "msg_de": "Grüß Gott" }',
    enc: 'eyAibXNnX2VuIjogIkhlbGxvIiwgIm1zZ19qcCI6ICLjgZPjgpPjgavjgaHjga8iLCAibXNnX2NuIjogIuS9oOWlvSIsICJtc2dfa3IiOiAi7JWI64WV7ZWY7IS47JqUIiwgIm1zZ19ydSI6ICLQl9C00YDQsNCy0YHRgtCy0YPQudGC0LUhIiwgIm1zZ19kZSI6ICJHcsO8w58gR290dCIgfQ'
  }];

  var header = {"alg": "HS256", "typ": "JWT" };
  var claim = { "sub": 1234567890, "name": "John Doe", "admin": true };
  var signature = 'eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';
  var value = { header: header, claim: claim, signature: signature };
  var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';

  it('should encode raw string to base64 ones', function () {
    values.forEach(function (value) {
      expect(JWT.encode64(value.raw)).toEqual(value.enc);
    });
  });

  it('should encode base64 string to raw ones', function () {
    values.forEach(function (value) {
      expect(JWT.decode64(value.enc)).toEqual(value.raw);
    });
  });

  it('should transform a JWT object to a JWT token', function () {
    expect(JWT.write(value)).toEqual(token);
  });

  it('should extract a JWT token as a JWT object', function () {
    expect(JWT.read(token)).toEqual(value);
  });

  describe('validateClaim', function () {
    it('should check a valid JWT object', function () {
      expect(JWT.validateClaim(value.claim)).toEqual(true);
    });

    it('should detect an expired JWT object', function () {
      var expiredValue = {exp: Date.now() - 5000};
      expect(JWT.validateClaim(expiredValue)).toEqual(false);
    });

    it('should detect a JWT object that is not started yet', function () {
      var tooEarlyValue = {nbf: Date.now() + 5000};
      expect(JWT.validateClaim(tooEarlyValue)).toEqual(false);
    });

    it('should check the issuer', function () {
      var wrongIssuer = {iss: 'someone'};
      expect(JWT.validateClaim(wrongIssuer, 'BFF')).toEqual(false);
    });

    it('should check the audience', function () {
      var wrongAudience = {aud: 'me'};
      expect(JWT.validateClaim(wrongAudience, undefined, 'you')).toEqual(false);
    });
  });

  describe('validate', function () {
    it('should check a valid JWT object', function () {
      expect(JWT.validate(value)).toEqual(true);
    });

    it('should detect an expired JWT object', function () {
      var expiredValue = { header: header, claim: {exp: Date.now() - 5000}, signature: signature };
      expect(JWT.validate(expiredValue)).toEqual(false);
    });

    it('should detect a JWT object that is not started yet', function () {
      var tooEarlyValue = { header: header, claim: {nbf: Date.now() + 5000}, signature: signature };
      expect(JWT.validate(tooEarlyValue)).toEqual(false);
    });

    it('should check the issuer', function () {
      var wrongIssuer = { header: header, claim: {iss: 'someone'}, signature: signature };
      expect(JWT.validate(wrongIssuer, 'BFF')).toEqual(false);
    });

    it('should check the audience', function () {
      var wrongAudience = { header: header, claim: {aud: 'me'}, signature: signature };
      expect(JWT.validate(wrongAudience, undefined, 'you')).toEqual(false);
    });
  });
});
