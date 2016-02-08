console.log('Init browserify');

var JWT = require('../../');

console.log(JWT);

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts';
var value = JWT.read(token);

console.log('Read', value);
console.log('Validate', JWT.validate(value));

JWT.keep(value);
console.log('Keep', window.localStorage.getItem('JWT_TOKEN'));
console.log('Remember', JWT.remember());

JWT.forget();
console.log('Forget', JWT.remember());
