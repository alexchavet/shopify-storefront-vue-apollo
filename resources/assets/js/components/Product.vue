<template>
    <div class="Product">
        <img v-if="hasImage"
             :src="variantImage" alt="`${product.title} product shot`"/>
        <h5 class="Product__title">{{product.title}}</h5>
        <span class="Product__price">${{variant.price}}</span>
        <Variant-Selectors
                v-for="option in product.options"
                :handleOptionChange="handleOptionChange"
                :key="option.id.toString()"
                :option="option"
        />
        <label class="Product__option">
            Quantity
            <input min="1" type="number" v-model="selectedVariantQuantity">
        </label>
        <button class="Product__buy button" @click="addVariantToCart(variant.id, selectedVariantQuantity)">Add to Cart
        </button>
    </div>
</template>

<script>
    import VariantSelectors from './VariantSelectors';

    export default {
        data() {
            return {
                selectedVariantImage: '',
                selectedVariantQuantity: 1,
                selectedOptions: {}
            }
        },
        props: {
            product: {
                type: Object
            },
            addVariantToCart: {
                type: Function
            }
        },
        components: {
            'Variant-Selectors': VariantSelectors
        },
        computed: {
            hasImage() {
                return this.product.images.edges.length;
            },
            variant() {
                return this.selectedVariant || this.product.variants.edges[0].node;
            },
            variantImage() {
                if (!this.hasImage) {
                    return '';
                }
                return this.selectedVariantImage || this.product.images.edges[0].node.src;

            }
        },
        methods: {
            findImage(images, variantId) {
                const primary = images[0];

                const image = images.filter(function (image) {
                    return image.variant_ids.includes(variantId);
                })[0];

                return (image || primary).src;
            },
            handleOptionChange(event) {
                const target = event.target
                let selectedOptions = this.state.selectedOptions;
                selectedOptions[target.name] = target.value;

                const selectedVariant = this.props.product.variants.edges.find((variant) => {
                    return variant.node.selectedOptions.every((selectedOption) => {
                        return selectedOptions[selectedOption.name] === selectedOption.value;
                    });
                }).node;

                this.setState({
                    selectedVariant: selectedVariant,
                    selectedVariantImage: selectedVariant.image.src
                });
            }
        },
        mounted() {
            this.product.options.forEach((selector) => {
                this.selectedOptions = {[selector.name]: selector.values[0]}
            });
        },
    }
</script>
