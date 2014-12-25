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

This software is licensed under the Apache 2 license, quoted below.

Copyright 2015 Paul Dijou (http://pauldijou.fr).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
