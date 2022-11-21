<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-nav>
                        
                    </ion-nav>
                </ion-title>
            </ion-toolbar>
        </ion-header>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonNav,
    IonHeader,
    IonToolbar,
    IonTitle
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        IonPage,
        IonNav,
        IonHeader,
        IonToolbar,
        IonTitle
    }
})
</script>