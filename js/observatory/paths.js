/*
Specifies commonly used data paths within Observatory.
(Version for LIVE instance of Observatory)
*/
(function() {
  var exports = new EventEmitter();
  exports.dataRoot = 'https://storage.googleapis.com/mlab-observatory/';

  if (!window.mlabOpenInternet) {
    window.mlabOpenInternet = {};
  }

  window.mlabOpenInternet.paths = exports;
})();
