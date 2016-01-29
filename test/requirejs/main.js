console.log('Init requirejs');

requirejs.config({
  paths: {
    'jwt-client': '../../jwt-client'
  }
});

require(['jwt-client'], function (jwt) {
  console.log(jwt);
  console.log('All good');
});
