<template>
  <ion-button
      id="open-modal"
      style="margin: 0 0 16px 10px"
      expand="block"
      color="primary"
  >
    Створити
  </ion-button>
  <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="primary" @click="cancel()">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Картка бійця</ion-title>
        <ion-buttons slot="end">
          <ion-button color="primary" :strong="true" @click="confirm()">Confirm</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-textarea
          v-model="form.nickname"
          class="ion-margin-bottom"
          label="Позивний"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
      <ion-input
          v-model="form.name"
          class="ion-margin-bottom"
          label="ПІБ"
          label-placement="floating"
          fill="outline"
      />
      <ion-input
          v-model="form.birthdate"
          class="ion-margin-bottom"
          label="Дата народження"
          label-placement="floating"
          fill="outline"
      />
      <ion-input
          v-model="form.rank"
          class="ion-margin-bottom"
          label="Звання"
          label-placement="floating"
          fill="outline"
      />
      <ion-input
          v-model="form.workPosition"
          class="ion-margin-bottom"
          label="Посада"
          label-placement="floating"
          fill="outline"
      />
      <ion-input
          v-model="form.phone"
          class="ion-margin-bottom"
          type="number"
          label="Телефон"
          label-placement="floating"
          fill="outline"
      />
      <ion-textarea
          v-model="form.unit"
          class="ion-margin-bottom"
          label="Відділення"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
      <ion-textarea
          v-model="form.unit2"
          class="ion-margin-bottom"
          label="Взвод"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
      <ion-textarea
          v-model="form.unit3"
          class="ion-margin-bottom"
          label="Рота"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
      <ion-textarea
          v-model="form.unit4"
          class="ion-margin-bottom"
          label="Батальйон"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
      <ion-textarea
          v-model="form.unit5"
          class="ion-margin-bottom"
          label="Бригада"
          label-placement="floating"
          :auto-grow="true"
          fill="outline"
      />
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonInput,
} from '@ionic/vue';
import { OverlayEventDetail } from '@ionic/core/components';
import {defineComponent, ref} from 'vue';
import {postToStaffTable} from "@/compasables/useDatabase";

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonInput,
  },
  setup(_props, {emit}) {
    const modal = ref();
    const form = ref({
      nickname: '',
      name: '',
      birthdate: '',
      rank: '',
      workPosition: '',
      phone: '',
      unit: '',
      unit2: '',
      unit3: '',
      unit4: '',
      unit5: '',
    });

    const cancel = () => modal.value.$el.dismiss(null, 'cancel');

    const confirm = async () => {
      await postToStaffTable(form.value);
      emit('new-staff', form.value);
      modal.value.$el.dismiss(name, 'confirm');
    };

    const onWillDismiss = async (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === 'confirm') {
      }
    };

    return {
      modal,
      form,
      cancel,
      confirm,
      onWillDismiss,
    };
  },
});
</script>

<style lang="scss">
:deep {
  .label-text {
    color: #666;
  }
}
</style>