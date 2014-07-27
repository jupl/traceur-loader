'use strict';

var extend = require('extend-object');
var loaderUtils = require('loader-utils');
var os = require('os');
var traceur = require('traceur');
var defaults = {
  experimental: true,
  modules: 'commonjs',
  runtime: false
};

module.exports = function(source) {
  var content = source;
  var map;
  var options = {};
  var result;

  this.cacheable && this.cacheable();

  // Process query and setup options/defaults/forced for Traceur
  extend(options, defaults, loaderUtils.parseQuery(this.query), {
    filename: loaderUtils.getRemainingRequest(this),
    sourceMap: true
  });
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
  if(options.runtime) {
    if(options.filename === traceur.RUNTIME_PATH) {
      return content;
    }
    content = 'require("' + traceur.RUNTIME_PATH + '");' + content;
  }

  // Parse code through Traceur
  delete options.runtime;
  result = traceur.compile(content, options);
  if(result.errors.length) {
    throw new Error(result.errors.join(os.EOL));
  }

  // Process source map (if available) and return result
  if(options.sourceMap) {
    map = JSON.parse(result.sourceMap);
    map.sourcesContent = [source];
    this.callback(null, result.js, map);
  }
  else {
    return result.js;
  }
};
