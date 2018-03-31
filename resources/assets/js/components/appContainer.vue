<template>
    <div class="container" v-if="$apollo.loading">
        <h1 class="display-3">Loading...</h1>
    </div>
    <div class="container" v-else>
        <h1 class="display-3">{{shop.name}}</h1>
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

    export default {
        data() {
            return {
                isCartOpen: false,
                isCustomerAuthOpen: false,
                isNewCustomer: false,
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
        computed: {
            
        },
        methods: {
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
        },
        mounted() {
            this.createCheckout();
        }
    }
</script>
