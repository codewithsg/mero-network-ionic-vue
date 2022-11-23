<template>
    <ion-card :router-link="`/products/${product.id}`">
        <img :src="product.product_image" alt="{{product.name}}" />
        <ion-card-header>
            <ion-card-title>{{ product.name }}</ion-card-title>
            <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
        </ion-card-header>
        <!-- {{ product.product_image }} -->
        <ion-card-content>{{ product.description }}</ion-card-content>
    </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
} from '@ionic/vue';

export default defineComponent({
    props: ['product'],
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent
    }
})
</script>