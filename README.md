# traceur-loader 0.6.0
[Traceur](https://github.com/google/traceur-compiler) 0.0.72 loader for [Webpack](https://webpack.github.io/).

## Usage
```javascript
// Simple option (does not include Traceur runtime)
require("traceur!./script-file");

// Include Traceur runtime automatically
require("traceur?runtime!./script-file");

// Specify Traceur options
require("traceur?experimental&symbols!./script-file");

// All together now
require("traceur?experimental&runtime&symbols!./script-file");
```

### Recommended configuration
```javascript
{
  loaders: [
    {test: /\*.js$/, loader: 'traceur'}
  ]
}

// With parameters
{
  loaders: [
    {test: /\*.js$/, loader: 'traceur?experimental&runtime'}
  ]
}
```

### Defaults
- `modules = 'commonjs'` - Modules set to CommonJS (consistent with Node.js and Webpack)
- `runtime = false` - Traceur runtime by default not auto included


### Runtime path
Access to the runtime path is available as a direct reference:
`require('traceur-loader').runtime`.

To view all Traceur options, visit [here](https://github.com/google/traceur-compiler/blob/master/src/Options.js).
