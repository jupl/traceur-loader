# traceur-loader 0.1.1
[![Dependency Status](https://gemnasium.com/jupl/traceur-loader.png)](https://gemnasium.com/jupl/traceur-loader)

[Traceur](https://github.com/google/traceur-compiler) loader for [Webpack](https://webpack.github.io/).

## Usage
```javascript
// Simple option (does not include Traceur runtime)
require("traceur!./script-file");

// Include Traceur runtime
require("traceur?runtime=true!./script-file");

// Specify Traceur options
require("traceur?generators=false&symbols=true!./script-file");

// All together now
require("traceur?runtime=true&arrowFunctions=false!./script-file");
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
      {test: /\*.js$/, loader: 'traceur-loader?runtime=true&modules=register'}
    ]
  }
}
```

### Defaults
- `experimental = true` - Experimental features enabled
- `modules = 'commonjs'` - Modules set to CommonJS (consistent with Node.js and Webpack)
- `runtime = false` - Traceur runtime by default not included

To view all Traceur options, visit [here](https://github.com/google/traceur-compiler/blob/master/src/Options.js).
