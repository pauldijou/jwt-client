# JWT Client

## Install

~~~ shell
bower install jwt-client
~~~

~~~ shell
npm install jwt-client
~~~

## Basic usage

~~~ javascript
var jwtHeader = '[here you need to write a way to retrieve such header value from HTTP response]';
var jwtValue = JWT.read(jwtHeader);

// Let's test if the token is a valid one
if (JWT.validate(jwtValue)) {
  // If so, save it for further use
  // (by default inside localStorage)
  JWT.keep(jwtValue);
  // Alternatively, you could also directly save the token itself
  JWT.keep(jwtHeader);
} else {
  // If not, we might want to remove
  // the last token. Or not. Depends on you...
  JWT.forget();
}
~~~

~~~ javascript
// You can access the parsed version of the token anytime
var session = JWT.remember();

// And access any useful info inside the claim
var userId = session.claim.userId;
~~~

~~~ javascript
// Don't forget to set the correct HTTP header when sending a request to your server
request.setHeader('Authorization', JWT.get());
~~~

## API

Value between brackets (like `[key]`) are optional and `JWT.defaults` will be used when missing. Most of the time, you should leave them empty.

### JWT.read(header)

Parse a JWT token string as a JavaScript object. It will decode the Base64 and parse the resulting string as a JSON.

### JWT.write(value)

Stringify a JavaScript object representing a JWT token into the actual JWT token string. The JavaScript object need at least a `header` and a `claim` properties.

### JWT.keep(value, [key], [storage])

Store `value` inside the default storage using the specified or default key. If `value` is a JavaScript object, `JWT.write` will be used to convert it to a string.

### JWT.remember()

Retrieve the token from the storage and parse it.

### JWT.forget()

Remove the token form the storage.

### JWT.validate(value, [issuer], [audience])

Check if `value` is a valid token. It can be either a JWT token string or a JavaScript object representing it. It will check both the `expiration` and `not before` dates but also the `issuer` and the `audience` if provided.

## Configuration

You can override any configuration parameter to make JWT client work the way you want. Impose your style!

~~~ javascript
JWT.defaults = {
  // The key used to store the token
  key: 'JWT_TOKEN',
  // This is the official token to use for JWT but feel free to use another one if you want
  tokenPrefix: 'Bearer ',
  // Where to store the token, by default localStorage
  storage: global.localStorage,
  // In Base64 url-safe mode, padding isn't mandatory, so we will disable it by default
  // but you can force it by setting this param to true if you want
  padding: false
};
~~~

To change a value, just do something lile :

~~~ javascript
JWT.defaults.padding = true;
~~~

## Examples

~~~ javascript
// Let's say we have our JWT token
var token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.' +
  'eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';

// We can parse it
var session = JWT.read(token);
// return a JavaScript object
// {
//   header: { alg: "HS256", typ: "JWT" },
//   claim: { sub: 1234567890, name: "John Doe", admin: true },
//   signature: 'eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts'
// }

// We can validate it
JWT.validate(token); // return true
JWT.validate(session); // also return true

// We can save it in a client-side storage
JWT.keep(token);
// Equivalent to
JWT.keep(session);

// We can retrieve it from the storage
var session2 = JWT.remember();
// Now, we have session == session2
// Not as a reference of course, but all their properties
// are the same

// If we need to retrieve the raw token
var token2 = JWT.get();
// token === token2

// If we need to stringify a session to a JWT token
var token3 = JWT.write(session2);
// token === token3
~~~

## Test

~~~ shell
npm install
npm test
~~~

## License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2015 Paul Dijou (http://pauldijou.fr).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
