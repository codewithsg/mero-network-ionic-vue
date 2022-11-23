<template>
    <single-product-listing v-for="product in products" :key="product.id" :product="product">
    </single-product-listing>
    <slot />
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import SingleProductListing from '@/components/product/ProductSingleListingComponent.vue';


export default defineComponent({
    components: {
        SingleProductListing
    },
    data() {
        return {
            products: [{}] as any,
            isProductAvailable: false
        }
    },
    mounted() {
        // console.log(store.dispatch('getProducts'));
        store.dispatch('getProducts')
            // .then((response) => response.json())
            .then(data => {
                this.products = data.data
            })
            .catch((err) => console.log(err))
    },
    methods: {
    }

})
</script>