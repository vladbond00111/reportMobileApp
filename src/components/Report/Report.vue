<template>
  <ion-content class="ion-padding">
    <ion-input
        v-model="form.date"
        class="ion-margin-bottom"
        label="Дата та час події"
        label-placement="floating"
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
        v-model="form.nickname"
        class="ion-margin-bottom"
        label="Позивний"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.unit"
        class="ion-margin-bottom"
        label="Підрозділ"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.rank"
        class="ion-margin-bottom"
        label="Звання, посада"
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
    <ion-input
        v-model="form.location"
        class="ion-margin-bottom"
        label="Звання, посада"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.situation"
        class="ion-margin-bottom"
        label="Обставини"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.witnesses"
        class="ion-margin-bottom"
        label="Свідки"
        label-placement="floating"
        fill="outline"
    />
    <ion-textarea
        v-model="form.diagnosis"
        class="ion-margin-bottom"
        label="Попередній діагноз"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.help"
        class="ion-margin-bottom"
        label="Надана допомога"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.tq"
        class="ion-margin-bottom"
        label="TQ"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.state"
        class="ion-margin-bottom"
        label="Стан в динаміці"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.additional"
        class="ion-margin-bottom"
        label="В засобах індивідуального захисту"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.lost"
        class="ion-margin-bottom"
        label="Втрачене майно"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.timePass"
        class="ion-margin-bottom"
        label="Час передачі на"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.evacuatedBy"
        class="ion-margin-bottom"
        label="Ким евакуйований"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-button
        expand="block"
        @click="saveReport"
    >
      Зберегти
    </ion-button>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { postToReports } from '@/compasables/useDatabase.js';
export default defineComponent({
  props: {
    report: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  setup(props) {
    const form = ref({
      date: '',
      name: '',
      nickname: '',
      unit: '',
      rank: '',
      phone: '',
      location: '',
      situation: '',
      witnesses: '',
      diagnosis: '',
      help: '',
      tq: '',
      state: '',
      additional: '',
      lost: '',
      timePass: '',
      evacuatedBy: ''
    });
    watch(() => props.report, (value: any) => {
      if (value) {
        form.value = value;
      }
    });

    const saveReport = async () => {
      await postToReports(form.value);
    };
    return {
      saveReport,
      form
    };
  },
});
</script>

<style scoped>
</style>
