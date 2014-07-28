# traceur-loader 0.2.3
[![Dependency Status](http://img.shields.io/gemnasium/jupl/traceur-loader.svg?style=flat)](https://gemnasium.com/jupl/traceur-loader)

[Traceur](https://github.com/google/traceur-compiler) loader for [Webpack](https://webpack.github.io/).

## Usage
```javascript
// Simple option (does not include Traceur runtime)
require("traceur!./script-file");

// Include Traceur runtime automatically
require("traceur?runtime=true!./script-file");

// Specify Traceur options
require("traceur?experimental=true&symbols=true!./script-file");

// All together now
require("traceur?experimental=true&runtime=true&symbols=true!./script-file");
```

### Recommended configuration
```javascript
{
  module: {
    loaders: [
      {test: /\*.js$/, loader: 'traceur'}
    ]
  }
}

// With parameters
{
  module: {
    loaders: [
      {test: /\*.js$/, loader: 'traceur?experimental=true&runtime=true'}
    ]
  }
}
```

### Defaults
- `modules = 'commonjs'` - Modules set to CommonJS (consistent with Node.js and Webpack)
- `runtime = false` - Traceur runtime by default not auto included

To view all Traceur options, visit [here](https://github.com/google/traceur-compiler/blob/master/src/Options.js).
