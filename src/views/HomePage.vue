<template>
  <base-layout>
    <product-listing>
    </product-listing>
  </base-layout>
</template>

<script lang="ts">
// import { } from '@ionic/vue';
import { defineComponent } from 'vue';
import store from '@/store';
import ProductListing from '@/components/product/ProductListingController.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductListing
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    // console.log(store.dispatch('addProduct', { 'name': "laptop", "category": "laptop", "description": "description", "user_id": "1", "product_image": 'hello' }));
    // this.getAllProduct()
    //   .then((data) => console.log('data:', data))
    //   .catch((err) => console.log(err))
  },
  methods: {
    async getAllProduct() {
      try {
        const response = await store.dispatch('getProducts');
        console.log('response', response);
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
