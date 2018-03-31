<template>
    <div class="Cart" :class="{ 'Cart--open' : isCartOpen }">
    <header class="Cart__header">
        <h2>Cart</h2>
        <button
                @click="handleCartClose"
                class="Cart__close">
            ×
        </button>
    </header>
    <ul class="Cart__line-items">
        <!--{line_items}-->
    </ul>
    <footer class="Cart__footer">
        <div class="Cart-info clearfix">
            <div class="Cart-info__total Cart-info__small">Subtotal</div>
            <div class="Cart-info__pricing">
                <span class="pricing">$ {{checkout.subtotalPrice}}</span>
            </div>
        </div>
        <div class="Cart-info clearfix">
            <div class="Cart-info__total Cart-info__small">Taxes</div>
            <div class="Cart-info__pricing">
                <span class="pricing">$ {{checkout.totalTax}}</span>
            </div>
        </div>
        <div class="Cart-info clearfix">
            <div class="Cart-info__total Cart-info__small">Total</div>
            <div class="Cart-info__pricing">
                <span class="pricing">$ {{checkout.totalPrice}}</span>
            </div>
        </div>
        <button class="Cart__checkout button" @click="openCheckout">Checkout</button>
    </footer>
    </div>
</template>
<script>

export default {
    mounted() {
        console.log('Component mounted.')
    },
    props: {
        checkout : {
            type : Object
        },
        isCartOpen : {
            type: Boolean
        },
        handleCartClose : {
            type: Function
        },
        removeLineItemInCart : {
            type : Function
        },
        updateLineItemInCart : {
            type : Function
        },
        customerAccessToken : {
            type : String
        },
    },
    methods: {
        openCheckout() {
            window.open(this.checkout.webUrl);
        }
    }
}
</script>