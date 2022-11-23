<template>
    <base-layout>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Add new product</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="addProduct()">
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

                    <ion-fab>
                        <ion-fab-button @click="getPhoto()">
                            <ion-icon :icon="camera"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>

                    <ion-button class="add-button" type=" submit">Add</ion-button>
                </form>
                <p>this is product image {{ formData.product_image }}</p>
            </ion-card-content>
        </ion-card>
    </base-layout>
</template>

<script lang="ts">
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
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { camera } from 'ionicons/icons';
import { usePhotoGallery } from '@/utils/uploadPhoto';
import store from '@/store/index';
import router from '@/router';

const { takePhoto } = usePhotoGallery();

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
            formData: {
                "name": "",
                "category": "",
                "description": "",
                "product_image": "",
                "user_id": ""
            }
        }
    },
    methods: {
        async addProduct() {
            try {
                if (store.state.user_id) {
                    this.formData.user_id = store.state.user_id
                }
                // console.log(store.state.user_id);
                if (this.formData.product_image == '') {
                    this.formData.product_image = 'https://consumer.huawei.com/content/dam/huawei-cbg-site/southeast-asia/bd/mkt/plp/laptops/matebook-d-15.jpg';
                }
                console.log('submitting...', this.formData)
                const response = await store.dispatch('addProduct', this.formData);
                router.push('/products');
            } catch (err: any) {
                console.log('err:', err);
            }
        },
        async getPhoto() {
            try {
                const photoInfo = await takePhoto();
                console.log('photo:', photoInfo);
                this.formData.product_image = photoInfo.filePath

            } catch (err) {
                console.log('err', err);
            }
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    }
})
</script>

<style scoped>
.camera-icon {
    margin-top: 10px;
    margin-bottom: 10px;
}

.add-button {
    width: 50vw;
    margin-top: 80px;
    margin-left: 20vw;
    /* margin-right: 25vw; */
}
</style>