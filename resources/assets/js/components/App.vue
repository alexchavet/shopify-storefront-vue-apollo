<template>
    <div class="container" v-if="$apollo.loading">
        <h1 class="display-3">Loading...</h1>
    </div>
    <div class="container" v-else>
        <header class="App__header">
            <ul class="App__nav">
                <li class="btn btn-primary App__customer-actions" @click="openCustomerAuth" data-customer-type="new-customer">Create an Account</li>
                <li class="btn btn-link App__customer-actions" @click="openCustomerAuth" >Log in</li>
            </ul>

            <div class="App__view-cart-wrapper" >
                <button class="btn btn-secondary" v-show="!isCartOpen" @click="isCartOpen = true" >
                    Cart <span class="badge badge-light ml-1">{{itemsInCart}}</span>
                </button>
            </div>

            <div class="App__title">
                <h1>{{shop.name}}: Vue Example</h1>
                <h2>{{shop.description}}</h2>
            </div>
        </header>
        <div class="Product-wrapper">
            <Product v-for="product in shop.products.edges"
                     :addVariantToCart="addVariantToCart"
                     :checkout="checkout"
                     :key="product.node.id.toString()"
                     :product="product.node"
            ></Product>
        </div>
        <div class="cart-wrapper">
            <Cart
                    :removeLineItemInCart="removeLineItemInCart"
                    :updateLineItemInCart="updateLineItemInCart"
                    :checkout="checkout"
                    :isCartOpen="isCartOpen"
                    :handleCartClose="handleCartClose"
                    :customerAccessToken="customerAccessToken"
            />
        </div>
    </div>
</template>

<script>
    import {
        getShopData,
        createCheckout,
        checkoutLineItemsAdd,
        checkoutLineItemsUpdate,
        checkoutLineItemsRemove,
        checkoutCustomerAssociate,
        addVariantToCart,
        updateLineItemInCart,
        removeLineItemInCart,
        associateCustomerCheckout
    } from './../queries/checkout';

    import get from 'lodash';

    import Cart from "./Cart";
    import Product from "./Product";

    export default {
        data() {
            return {
                isCartOpen: false,
                isCustomerAuthOpen: false,
                isNewCustomer: false,
                customerAccessToken: '',
                products: [],
                checkout: { lineItems: { edges: [] } },
                shop: {}
            }
        },
        apollo :{
            shop() {
                return {
                    query : getShopData,
                    update(res) {
                        return res.shop
                    }
                }
            }
        },
        components: {
            'Cart' : Cart,
            'Product' : Product,
        },
        computed: {
            itemsInCart() {
                return this.checkout.lineItems.edges.length;
            }
        },
        methods: {
            checkoutLineItemsAdd(){},
            checkoutLineItemsUpdate(){},
            checkoutLineItemsRemove(){},
            checkoutCustomerAssociate(){},
            addVariantToCart(variantId, quantity){

                this.$apollo.mutate({
                    // Query
                    mutation: checkoutLineItemsAdd,
                    // Parameters
                    variables: {
                        checkoutId: this.checkout.id,
                        lineItems:  [
                            {variantId, quantity: parseInt(quantity, 10)}
                        ]
                    }
                }).then((res) => {
                    this.checkout = res.data.checkoutLineItemsAdd.checkout;
                }).catch((error) => {
                    console.error(error)
                });
                this.handleCartOpen();
            },
            updateLineItemInCart(){},
            removeLineItemInCart(){},
            associateCustomerCheckout(){},
            createCheckout() {
                this.$apollo.mutate({
                    // Query
                    mutation: createCheckout,
                    // Parameters
                    variables: {
                        input: {}
                    }
                }).then((res) => {
                    this.checkout = res.data.checkoutCreate.checkout;
                }).catch((error) => {
                    console.error(error)
                })
            },
            handleCartClose(){
                this.isCartOpen = false
            },
            handleCartOpen(){
                this.isCartOpen = true
            },
            openCustomerAuth(event) {
                if (event.target.getAttribute('data-customer-type') === "new-customer") {
                        this.isNewCustomer = true;
                        this.isCustomerAuthOpen = true
                } else {
                        this.isNewCustomer = false;
                        this.isCustomerAuthOpen = true
                }
            }
        },
        mounted() {
            this.createCheckout();
        }
    }
</script>
