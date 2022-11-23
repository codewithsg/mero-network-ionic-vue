<template>
    <base-layout>
        <ion-card>
            <img :src="product.product_image" alt="{{product.name}}" />
            <ion-card-header>
                <ion-card-title>{{ product.name }}</ion-card-title>
                <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
            </ion-card-header>
            <!-- {{ product.product_image }} -->
            <ion-card-content>{{ product.description }}</ion-card-content>
            <!-- <ion-fab class="icon-css" horizontal="start" vertical="bottom" slot="fixed">
                <ion-fab-button>
                    <ion-icon :icon="createOutline" />
                </ion-fab-button>
            </ion-fab> -->
            <div class="button-css" v-if="product.user_id == getUserId">
                <ion-button class="ion-button-css">
                    <ion-icon class="ion-icon-edit" slot="icon-only" :icon="createOutline"></ion-icon>
                </ion-button>
                <ion-button class="ion-button-css">
                    <ion-icon class="ion-icon-delete" slot="icon-only" :icon="trash"></ion-icon>
                </ion-button>
            </div>
        </ion-card>
    </base-layout>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import { createOutline, trash } from 'ionicons/icons';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon
} from '@ionic/vue';
import { mapGetters } from 'vuex';


export default defineComponent({
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonIcon
    },
    setup() {
        return {
            createOutline,
            trash
        }
    },

    data() {
        return {
            listingId: this.$route.params.id,
            product: {} as any,
            userId: store.getters
        }
    },
    mounted() {
        store.dispatch('getProductById', this.listingId)
            .then(data => this.product = data.data[0])
            .catch(err => console.log('err in by id:', err))
    },
    computed: {
        ...mapGetters(['getUserId'])
    }
})
</script>

<style scoped>
.ion-icon-edit {
    align-items: flex-start;
}

.ion-icon-delete {
    align-items: flex-end;
}

.ion-button-css {
    flex: auto;
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 17px;
    margin-bottom: 17px;
}

.button-css {
    display: flex;
}
</style>