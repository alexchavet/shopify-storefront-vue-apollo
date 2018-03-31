<template>
    <li class="Line-item">
        <div class="Line-item__img">
            <img v-if="line_item.variant.image"
                 :src="line_item.variant.image.src"
                 :alt="`${line_item.title} product shot`"/>
        </div>
        <div class="Line-item__content">
            <div class="Line-item__content-row">
                <div class="Line-item__variant-title">
                    {{line_item.variant.title}}
                </div>
                <span class="Line-item__title">
                {{line_item.title}}
            </span>
            </div>
            <div class="Line-item__content-row">
                <div class="Line-item__quantity-container">
                    <button class="Line-item__quantity-update" @click="decrementQuantity(line_item.id)">-</button>
                    <span class="Line-item__quantity">{{line_item.quantity}}</span>
                    <button class="Line-item__quantity-update" @click="incrementQuantity(line_item.id)">+</button>
                </div>
                <span class="Line-item__price">
                    $ {{ lineItemPrice }}
                </span>
                <button class="Line-item__remove" @click="removeLineItemInCart(line_item.id)">×</button>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        props: {
            removeLineItemInCart: {
                type: Function
            },
            updateLineItemInCart: {
                type: Function
            },
            line_item: {
                type: Object
            },
        },
        computed: {
            lineItemPrice() {
                return (this.line_item.quantity * this.line_item.variant.price).toFixed(2);
            }
        },
        methods: {
            decrementQuantity(lineItemId) {
                console.log(lineItemId);
                this.updateLineItemInCart(lineItemId, this.line_item.quantity - 1);
            },
            incrementQuantity(lineItemId) {
                console.log(lineItemId);
                this.updateLineItemInCart(lineItemId, this.line_item.quantity + 1)
            }
        }
    }
</script>
