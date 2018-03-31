# Shopify Store-front API with Vue 2 and Apollo

An example using vue-apollo built with Vue. This project is a Vuejs translation of [storefront-api-examples/react-apollo](https://github.com/Shopify/storefront-api-examples/tree/master/react-apollo). This example uses webpack included in the Laravel instalation. Laravel is not required to run the example.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)
* [Laravel](https://Laravel.com/) - optional

## Installation

* `git clone git@github.com:alexchavet/shopify-storefront-vue-apollo.git` this repository
* `cd shopify-storefront-vue-apollo`
* `yarn`

## Configuring

If you would like to connect your store to this example, rename `ressources/assets/js/config-example.js` to `config.js` and update the `domain` and `storefrontAccessToken`:

```js
 export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = "ea..your-token..f67";
 export const SHOPIFY_STORE_URL = "your-store.myshopify.com";
```
If you would like to run browsersync, please update the proxy to your local environement URL:
```js
mix.browserSync({
    proxy: 'localhostXXX'
});
```

## Running

Start a local server:

```
yarn watch
```

* Visit your app at [http://localhost:3000](http://localhost:3000).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.
