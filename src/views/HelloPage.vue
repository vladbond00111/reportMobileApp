<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hello</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content>
          <ion-card-title>Hello Page</ion-card-title>
          <ion-text>Page for test routing</ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonCard, IonCardTitle } from '@ionic/vue';
</script>