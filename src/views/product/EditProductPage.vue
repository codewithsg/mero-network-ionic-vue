<template>
    <base-layout>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Edit Product</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="editProduct()">
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Product Name</ion-label>
                            <ion-input v-model="formData.name" required placeholder="Enter product name" />
                        </ion-item>
                        <ion-item>
                            <ion-select interface="popover" required v-model="formData.category"
                                placeholder="Select Category">
                                <ion-select-option value="smartphone">Smartphone</ion-select-option>
                                <ion-select-option value="laptop">Laptop</ion-select-option>
                                <ion-select-option value="tablet">Tablet</ion-select-option>
                                <ion-select-option value="printer">Printer</ion-select-option>
                                <ion-select-option value="monitor">Monitor</ion-select-option>
                            </ion-select>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Product Description</ion-label>
                            <ion-textarea :auto-grow="true" v-model="formData.description" required
                                placeholder="Enter description" />
                        </ion-item>
                    </ion-list>
                    <img v-if="formData.product_image" :src="formData.product_image" alt="image" />



                    <ion-button class="add-button" type=" submit">Edit</ion-button>
                    <ion-fab>
                        <ion-fab-button class="camera-icon" @click="getPhoto()">
                            <ion-icon :icon="camera"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </form>
            </ion-card-content>
        </ion-card>
    </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonFab,
    IonFabButton,
    IonIcon
} from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { usePhotoGallery } from '@/utils/uploadPhoto';
import store from '@/store';
import router from '@/router';

const { takePhoto } = usePhotoGallery();

// location.reload();

export default defineComponent({
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonTextarea,
        IonFab,
        IonFabButton,
        IonIcon
    },
    setup() {
        return {

            camera
        }
    },
    data() {
        return {
            productId: this.$route.params.id,
            formData: {
                "name": "",
                "category": "",
                "description": "",
                "product_image": "",
                "user_id": ""
            },

        }
    },
    mounted() {
        store.dispatch('getProductById', this.productId)
            .then(data => this.formData = data.data[0])
            .catch(err => console.log('err in by id:', err))
    },
    methods: {
        async getPhoto() {
            try {
                const photoInfo = await takePhoto();
                console.log('photo:', photoInfo);
                this.formData.product_image = `${photoInfo.webViewPath}`

            } catch (err) {
                console.log('err', err);
            }
        },
        async editProduct() {
            try {
                const response = await store.dispatch('editProduct', this.formData);
                // this.$router.push(`/products/${this.productId}`);
                store.commit('SET_REFRESH_PAGE', true)
                this.$router.replace('/home');
                // this.$router.push({ path: '/home', replace: true });
                // this.$router.go('/home')
            } catch (err) {
                console.log(err);
            }
        }
    }
})
</script>

<style focused>
.camera-icon {
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: center;
    justify-items: center;
}

.add-button {
    width: 50vw;
    margin-top: 80px;
    margin-left: 20vw;
    /* margin-right: 25vw; */
}
</style>