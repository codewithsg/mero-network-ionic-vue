<template>
  <base-layout>
    <div v-if="isLoading">
      <img class="loading-icon" src="@/files/icons8-spinner.gif " alt="">
    </div>
    <div v-if="!isLoading">
      <ion-card v-for="product in products" :key="product.id" :router-link="`/products/${product.id}`">
        <img :src="product.product_image" alt="{{product.name}}" />
        <ion-card-header>
          <ion-card-title>{{ product.name }}</ion-card-title>
          <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
        </ion-card-header>
        <!-- {{ product.product_image }} -->
        <ion-card-content>
          <div class="description-css">
            {{ product.description }}
          </div>
        </ion-card-content>
      </ion-card>
    </div>

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
import { mapState } from 'vuex';

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
      isLoading: true
    }

  },
  beforeCreate() {
    store.dispatch('getProducts')
      .then(data => {
        console.log('beforecreated:', data)
        this.products = data.data
      })
      .catch(err => console.log(err))
  },
  // async serverPrefetch() {
  //   try {

  //     this.products = await store.dispatch('getProducts')
  //   } catch (err) {
  //     console.log('err');
  //   }

  // },
  // created() {
  //   store.dispatch('getProducts')
  //     .then(data => {
  //       this.products = data.data
  //       console.log('data:', data);
  //       this.isLoading = false;
  //     })
  //     .catch(err => console.log(err))
  // },
  mounted() {
    this.getProducts()
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
    },
    getProducts() {
      store.dispatch('getProducts')
        .then(data => {
          this.products = data.data
          console.log('data:', data);
          this.isLoading = false;
        })
        .catch(err => console.log(err))
    }
  },
  computed: mapState(['refresh']),
  watch: {
    refresh(newValue, oldValue) {
      console.log(`ne value:${newValue}  & oldValue::${oldValue}`)

      if (newValue == true) {
        this.getProducts()
        store.commit('SET_REFRESH_PAGE', false)
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

.loading-icon {
  align-items: center;
}

.description-css {
  overflow: hidden;
  max-height: 80px;
}
</style>
