<template>
    <select
            class="Product__option"
            :name="option.name"
            :key="option.name"
            @change="handleOptionChange"
    >
        <option
                v-for="value in option.values"
                :value="value" :key="`${option.name}-${value}`"
        >
           {{value}}
        </option>
    </select>
</template>

<script>
    export default {
        props: {
            handleOptionChange : {
                type : Function
            },
            option : {
                type: Object
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
