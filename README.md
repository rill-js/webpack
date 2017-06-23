<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/webpack
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/refresh-with">
    <img src="https://img.shields.io/npm/v/@rill/refresh-with.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/refresh-with">
    <img src="https://img.shields.io/npm/dm/@rill/refresh-with.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Webpack dev and hot reload middleware for Rill. (Automatically removed in the browser)

# Installation

```console
npm install @rill/webpack
```

# Example

```js
const app = require('rill')()
const devMiddleware = require('@rill/webpack')
const hotMiddleware = require('@rill/webpack/hot?overlay=false&timeout=1000') // pass in client side options via query string.

// Setup the dev middleware (provide config path relative to project root).
app.use(devMiddleware('webpack.config.js', {
  quiet: true
}))

// Setup the hot middleware (provide config path relative to project root).
app.use(hotMiddleware('webpack.config.js', {
  heartbeat: 2000
}))
```

---

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
