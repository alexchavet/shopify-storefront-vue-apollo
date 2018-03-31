<template>
    <div class="container" v-if="$apollo.loading">
        <h1 class="display-3">Loading...</h1>
    </div>
    <div class="container" v-else>
        <div class="Flash__message-wrapper">
            <p :class="{'Flash__message--open' : accountVerificationMessage}" class="Flash__message">
                We have sent you an email, please click the link included to verify your email address
            </p>
        </div>
        <Customer-Auth-With-Mutation
                :closeCustomerAuth="closeCustomerAuth"
                :isCustomerAuthOpen="isCustomerAuthOpen"
                :newCustomer="isNewCustomer"
                :associateCustomerCheckout="associateCustomerCheckout"
                :showAccountVerificationMessage="showAccountVerificationMessage"
        />
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
    import CustomerAuthWithMutation from "./CustomerAuthWithMutation";

    export default {
        data() {
            return {
                isCartOpen: false,
                isCustomerAuthOpen: false,
                isNewCustomer: false,
                customerAccessToken: '',
                accountVerificationMessage: '',
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
            'Customer-Auth-With-Mutation' : CustomerAuthWithMutation
        },
        computed: {
            itemsInCart() {
                if(this.checkout) {
                    return 0;
                }
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
            updateLineItemInCart(lineItemId, quantity){
                this.$apollo.mutate({
                    // Query
                    mutation: checkoutLineItemsUpdate,
                    // Parameters
                    variables: {
                        checkoutId: this.checkout.id,
                        lineItems:  [
                            {id: lineItemId, quantity: parseInt(quantity, 10)}
                        ]
                    }
                }).then((res) => {
                    console.log(res)
                    this.checkout = res.data.checkoutLineItemsUpdate.checkout;
                }).catch((error) => {
                    console.error(error)
                });
            },
            removeLineItemInCart(lineItemId){
                this.$apollo.mutate({
                    // Query
                    mutation: checkoutLineItemsRemove,
                    // Parameters
                    variables: {
                        checkoutId: this.checkout.id,
                        lineItemIds:  [
                            lineItemId
                        ]
                    }
                }).then((res) => {
                    this.checkout = res.data.checkoutLineItemsRemove.checkout;
                    if(!this.itemsInCart) {
                        this.handleCartClose();
                    }
                }).catch((error) => {
                    console.error(error)
                });
            },
            associateCustomerCheckout(customerAccessToken){
                this.$apollo.mutate({
                    // Query
                    mutation: checkoutCustomerAssociate,
                    // Parameters
                    variables: {
                        checkoutId: this.checkout.id, customerAccessToken: customerAccessToken
                    }
                }).then((res) => {
                    this.checkout = res.data.checkoutCustomerAssociate.checkout;
                        this.isCustomerAuthOpen = false;
                }).catch((error) => {
                    console.error(error)
                })
            },
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
            },
            showAccountVerificationMessage(){
                this.accountVerificationMessage = true;
                setTimeout(() => {
                    this.accountVerificationMessage = false;
                }, 5000);
            },
            closeCustomerAuth() {
                this.isCustomerAuthOpen = false;
            }
        },
        mounted() {
            this.createCheckout();
        }
    }
</script>
