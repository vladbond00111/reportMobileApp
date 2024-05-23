<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item v-for="(item, index) in items">
            <ion-card style="padding-bottom: 8px">
              <ion-avatar slot="start">
                <img :src="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
              </ion-avatar>
              <ion-card-header>
                <ion-card-title>{{ item }}</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing more, nothing less.
              </ion-card-content>

              <ion-button fill="clear">Action 1</ion-button>
              <ion-button color="success">Action 2</ion-button>
            </ion-card>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  InfiniteScrollCustomEvent,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  components: {
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle
  },
  setup() {
    const items = reactive([]);

    const generateItems = () => {
      const count = items.length + 1;
      for (let i = 0; i < 50; i++) {
        items.push(`Item ${count + i}`);
      }
    };

    const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
      generateItems();
      setTimeout(() => ev.target.complete(), 500);
    };

    generateItems();

    return { ionInfinite, items };
  },
});
</script>
