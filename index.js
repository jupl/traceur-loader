'use strict';

var extend = require('extend-object');
var loaderUtils = require('loader-utils');
var os = require('os');
var traceur = require('traceur');
var defaults = {
  modules: 'commonjs',
  runtime: false,
  sourceMaps: true
};

module.exports = function(source) {
  var filename = loaderUtils.getRemainingRequest(this);
  var content = source;
  var map;
  var options = {};
  var result;

  this.cacheable && this.cacheable();

  // Process query and setup options/defaults/forced for Traceur
  extend(options, defaults, loaderUtils.parseQuery(this.query));
  Object.keys(options).forEach(function(key) {
    switch(options[key]) {
      case 'true':
        options[key] = true;
        break;
      case 'false':
        options[key] = false;
        break;
      case 'undefined':
        options[key] = undefined;
        break;
      case 'null':
        options[key] = null;
        break;
    }
  });

  // Handle Traceur runtime
  if(filename === traceur.RUNTIME_PATH) {
    return content;
  }
  if(options.runtime) {
    content = 'require("' + traceur.RUNTIME_PATH + '");' + content;
  }

  // Parse code through Traceur
  try {
    delete options.runtime;
    var compiler = new traceur.Compiler(options);
    result = compiler.compile(content, filename);

    // Process source map (if available) and return result
    if(options.sourceMaps) {
      map = JSON.parse(compiler.getSourceMap());
      map.sourcesContent = [source];
      this.callback(null, result, map);
    }
    else {
      return result;
    }
  }
  catch(errors) {
    throw new Error(errors.join(os.EOL));
  }
};

module.exports.runtime = traceur.RUNTIME_PATH;
