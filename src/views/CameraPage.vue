<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Photo Gallery</ion-title>
            </ion-toolbar>

        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Photo Gallery</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-grid>
                <ion-row>
                    <ion-col size="6" :key="photo" v-for="photo in photos">
                        <ion-img :src="photo.webViewPath"></ion-img>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button>
                    <ion-icon :icon="camera" @click="takePhoto()"></ion-icon>
                </ion-fab-button>
                <ion-tab-button tab="tab2" href="/tabs/tabs2">
                    <ion-icon :icon="images" />
                    <ion-label>Photos</ion-label>
                </ion-tab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { camera, images, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/utils/uploadPhoto';
import { actionSheetController } from '@ionic/core';

export default defineComponent({
    name: 'Tab2Page',
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonPage
    },
    setup() {
        const { takePhoto, photos, deletePhoto } = usePhotoGallery();

        const showActionSheet = async (photo: UserPhoto) => {
            const actionSheet = await actionSheetController.create({
                header: 'Photos',
                buttons: [
                    {
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            deletePhoto(photo);
                        },
                    }, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel',
                        handler: () => {
                            // nothing to do, action sheet is automatically closed
                        }
                    }
                ]
            });
            await actionSheet.present();
        }

        return {
            takePhoto,
            camera,
            images,
            photos,
            trash,
            close
        }
    }
});
</script>
  