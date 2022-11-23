<template>
  <base-layout>
    <ion-card v-for="product in products" :key="product.id" :router-link="`/products/${product.id}`">
      <img :src="product.product_image" alt="{{product.name}}" />
      <ion-card-header>
        <ion-card-title>{{ product.name }}</ion-card-title>
        <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
      </ion-card-header>
      <!-- {{ product.product_image }} -->
      <ion-card-content>{{ product.description }}</ion-card-content>
    </ion-card>
  </base-layout>
</template>

<script lang="ts">
// import { } from '@ionic/vue';
import { defineComponent } from 'vue';
import store from '@/store';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  },
  data() {
    return {
      products: [{}] as any,
    }
  },
  mounted() {
    store.dispatch('getProducts')
      .then(data => {
        this.products = data.data
        console.log('data:', data);
      })
      .catch(err => console.log(err))
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
