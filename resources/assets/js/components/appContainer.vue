<template>
    <div class="container">

    </div>
</template>

<script>
    import {
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

    export default {
        data() {
            return {
                isCartOpen: false,
                isCustomerAuthOpen: false,
                isNewCustomer: false,
                products: [],
                checkout: { lineItems: { edges: [] } }
            }
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
