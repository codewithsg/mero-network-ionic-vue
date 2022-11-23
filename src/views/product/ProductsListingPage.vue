<template>
    <base-layout>
        <product-listing-controller></product-listing-controller>
    </base-layout>
</template>

<script lang="ts">
import ProductListingController from '@/components/product/ProductListingController.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { mapGetters, } from 'vuex';
import store from '@/store/index';

export default defineComponent({
    name: 'ProductListingPage',
    components: {
        ProductListingController
    },
    data() {
        return {
            // products: mapGetters(['allProducts']),
        }
    }
})


</script>