<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Форма100 - {{ title }}</ion-title>
        <img
            src="../assets/logo1.png"
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
    const onGoTo = (link) => {
      ionRouter.push(link);
    }

    const title = ref('Список репортів');
    const route = useRoute();
    watch(() => route.path, (newPath) => {
      if (newPath.includes('/tabs/tab1')) {
        title.value = 'Список репортів';
      } else if (newPath.includes('/tabs/tab2')) {
        title.value = 'Новий звіт';
      } else if (newPath.includes('/tabs/tab3')) {
        title.value = 'Завантажити дані';
      }
    });
    return {
      onGoTo,
      title,
      ellipse,
      square,
      triangle
    };
  },
});
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 0;
  right: 8px;
  padding: 10px;
  z-index: 1;
}
</style>
