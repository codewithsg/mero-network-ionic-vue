<template>
    <base-layout page-default-back-link="/home">
        <ion-card>
            <ion-card-header>
                <ion-card-title>
                    Register
                </ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <form @submit.prevent="signUp">
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">First Name</ion-label>
                            <ion-input v-model="formData.firstName" required placeholder="Enter your first name" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Last Name</ion-label>
                            <ion-input v-model="formData.lastName" required placeholder="Enter your last name" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Email Address</ion-label>
                            <ion-input v-model="formData.email" type="email" required
                                placeholder="Enter your email address" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" v-model="formData.password" required
                                placeholder="Enter password" />
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Confirm Password</ion-label>
                            <ion-input type="password" v-model="formData.confirmPassword" required
                                placeholder="Enter password to be sure" />
                        </ion-item>
                    </ion-list>
                    <ion-button type="submit">Register</ion-button>
                </form>
                <p>Already have an account? <a href="/login">Login Here</a></p>
            </ion-card-content>
        </ion-card>
    </base-layout>
</template>

<script lang="ts">

import router from '@/router';
import store from '@/store';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { IRegisterUser } from './../../interfaces/User.Interface';


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
        IonButton
    },
    data() {
        return {
            formData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    },
    methods: {
        async signUp() {
            try {
                // checking password and confirm password
                if (this.formData.password !== this.formData.confirmPassword) {
                    return alert('Your password does not match');
                }
                const newUser: IRegisterUser = {
                    firstName: this.formData.firstName,
                    lastName: this.formData.lastName,
                    email: this.formData.email,
                    password: this.formData.password
                }
                // console.log('abcd:', newUser);
                const response = await store.dispatch('registerUser', newUser);
                if (response.response != undefined) {
                    if (response.response.data.message.includes("key 'users.users_email_unique'")) {
                        return alert('Email address is already in use');
                    }
                }
                router.push('/home');
                // console.log('data:', response);

            } catch (err) {
                console.log(err);
            }
        }
    }
})
</script>