import {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STORE_URL
} from "./config";

import Vue from "vue"
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo);

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: SHOPIFY_STORE_URL + '/api/graphql',
    headers: {
        'X-Shopify-Storefront-Access-Token' : SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
});

// Create the apollo client
export default  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});