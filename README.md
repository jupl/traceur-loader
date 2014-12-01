# traceur-loader 0.6.3
[Traceur](https://github.com/google/traceur-compiler) 0.0.72 loader for
[Webpack](https://webpack.github.io/).

## Usage
```javascript
// Simple option (does not include Traceur runtime)
require("traceur!./script-file");

// Include Traceur runtime automatically
require("traceur?runtime!./script-file");

// Specify Traceur options
require("traceur?experimental&symbols!./script-file");

// All together now
require("traceur?runtime&symbols!./script-file");
```

### Recommended configuration (do not process modules)
```javascript
{
  module: {
    loaders: [
      {
        test: /^(?!.*(bower_components|node_modules))+.+\.js$/,
        loader: 'traceur'
      }
    ]
  }
}

// With parameters
{
  module: {
    loaders: [
      {
        test: /^(?!.*(bower_components|node_modules))+.+\.js$/,
        loader: 'traceur?experimental&runtime'
      }
    ]
  }
}
```

### Defaults
```javascript
{
  // Modules set to CommonJS (consistent with Node.js and Webpack)
  modules: 'commonjs',

  // Source maps are built and fed to Webpack (use Webpack options)
  sourceMaps: true,

  // Traceur runtime by default not auto included
  runtime: false
}
```

### Runtime path
Access to the runtime path is available as a direct reference:
`require('traceur-loader').runtime`.

To view all Traceur options, visit
[here](https://github.com/google/traceur-compiler/blob/master/src/Options.js).
