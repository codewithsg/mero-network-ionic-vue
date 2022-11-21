<template>
    <base-layout>
        <ion-card>
            <ion-card-header>
                <ion-card-title>Login</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="login">
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Email Address</ion-label>
                            <ion-input v-model="formData.email" required placeholder="Enter your email address" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input v-model="formData.password" type="password" required
                                placeholder="Enter your password" />
                        </ion-item>
                    </ion-list>
                    <ion-button type="submit">Login</ion-button>
                </form>
                <p>Don't have an account? <a href="/register">Create account here...</a></p>
            </ion-card-content>
        </ion-card>
    </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { ILoginUSer } from './../../interfaces/User.Interface';
import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from '@ionic/vue';
import store from '@/store';
import router from '@/router';


export default defineComponent({
    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonCardTitle,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton
    },
    data() {
        return {
            formData: {
                "email": "",
                "password": ""
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await store.dispatch('loginUser', this.formData);
                console.log('response:', response);
                if (response.response !== undefined) {
                    if (response.response.status === 403) {
                        alert(response.response.data);
                    }
                    if (response.response.status === 204) {
                        alert(response.response.data);
                    }
                }
                router.push('/home');
            } catch (err: any) {
                console.log(err);
            }
        }
    }
})
</script>