<template>
  <ion-page>
    <ion-header id="header">
      <ion-toolbar style="height: 56px">
        <div
            v-if="title !== 'Список звітів'"
            class="back"
            @click="goBack"
        >
          Назад
        </div>
        <ion-title style="height: 56px; font-size: 18px">Форма100 - {{ title }}</ion-title>
        <img
            src="../assets/medicred.png"
            width="56"
            height="56"
            alt="logo"
            class="logo"
            @click="onGoTo('/tabs/tab3')"
        />
      </ion-toolbar>
    </ion-header>
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

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, useIonRouter } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
export default defineComponent({
  components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    const ionRouter = useIonRouter();
    const onGoTo = (link: string) => {
      ionRouter.push(link);
    }
    const goBack = () => {
      ionRouter.back();
    }

    const title = ref('Список звітів');
    const route = useRoute();
    watch(() => route.path, (newPath) => {
      if (newPath.includes('/tabs/tab1')) {
        title.value = 'Список звітів';
      } else if (newPath.includes('/tabs/tab2')) {
        title.value = 'Новий звіт';
      } else if (newPath.includes('/tabs/tab3')) {
        title.value = 'Завантажити дані';
      } else if (newPath.includes('/tabs/report')) {
        title.value = 'Деталі звіту';
      } else if (newPath.includes('/tabs/staff')) {
        title.value = 'Картка бійця';
      }
    });
    return {
      onGoTo,
      goBack,
      title,
      ellipse,
      square,
      triangle
    };
  },
});
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 10px;
  left: 8px;
  padding: 10px;
  font-weight: bolder;
  z-index: 1;
  color: var(--ion-color-primary);
}
.logo {
  position: absolute;
  top: 0;
  right: 8px;
  padding: 10px;
  z-index: 1;
}
</style>
