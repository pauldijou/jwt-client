# JWT Reader

## Install

~~~ shell
bower install jwt-client
~~~

~~~ shell
npm install jwt-client
~~~

## Basic usage

~~~ javascript
var jwtHeader = '[here you need to write a way to retrieve such header value]';
var jwtValue = JWT.read(jwtHeader);

// Let's test if the token is a valid one
if (JWT.validate(jwtValue)) {
  // If so, save it for further use
  // (by default inside localStorage)
  JWT.keep(jwtValue);
} else {
  // If not, we might want to remove
  // the last token. Or not. Depends on you...
  JWT.forget();
}
~~~

~~~ javascript
var userId = JWT.remember().claim.userId;
~~~

~~~ javascript
request.setHeader('Authorization', JWT.get());
~~~

## API

## Test

~~~ shell
npm install
npm test
~~~

## License
