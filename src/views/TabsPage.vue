<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" @click="onGoTo('/tabs/tab1')">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Репорти</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" @click="onGoTo('/tabs/tab2')">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Новий</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" @click="onGoTo('/tabs/tab3')">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Завантажити дані</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, useIonRouter } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
const ionRouter = useIonRouter();
const onGoTo = (link) => {
  ionRouter.push(link);
}
</script>
