import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import {
  IonicVue,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonText,
  IonTextarea,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCol,
  IonRow
} from '@ionic/vue';

const components = {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonText,
  IonTextarea,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCol,
  IonRow
};
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/vue/css/palettes/dark.always.css';
// import '@ionic/vue/css/palettes/dark.class.css';
// import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


const app = createApp(App)
  .use(IonicVue, {
    mode: 'ios'
  })
  .use(router);



Object.entries(components).forEach(([name, component]) => {
  app.component(name, component);
});

router.isReady().then(() => {
  app.mount('#app');
});
