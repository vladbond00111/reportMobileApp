<template>
  <ion-card
      class="card"
      @click="toReportView(report.id)"
      :style="borderColor"
  >
    <ion-card-header>
      <ion-card-title>{{ report.nickname }}</ion-card-title>
      <ion-card-subtitle>{{ report.name }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ report.description }}
    </ion-card-content>

                 <!-- <ion-button fill="clear" @click="toReportView(report.id)">Переглянути</ion-button>-->
    <!--      <ion-button color="primary" style="margin-left: 20px">Редагувати</ion-button> -->
  </ion-card>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useIonRouter } from '@ionic/vue';
export default defineComponent({
  props: {
    report: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const ionRouter = useIonRouter();
    const toReportView = (id) => {
      ionRouter.push(`/tabs/report/${id}`);
    };

    const borderColor = computed(() => {
      let color;
      if (props.report.healthStatus === '200') {
        color = 'var(--danger-color)';
      } else if (props.report.healthStatus === '300') {
        color = 'var(--accent-color)';
      } else if (props.report.healthStatus === 'Хвороба') {
        color = 'var(--disease-color)';
      }
      return { borderLeft: `3px solid ${color}` };
    });

    return {
      toReportView,
      borderColor
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 16px;
  cursor: pointer;
}
</style>
