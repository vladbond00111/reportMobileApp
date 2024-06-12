<template>
  <ion-item>
    <ion-card
      class="card"
      @click="toReportView(report.id)"
    >
      <ion-card-header>
        <ion-card-title>{{ report.nickname }}</ion-card-title>
        <ion-card-subtitle>{{ report.name }}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        {{ report.description }}
      </ion-card-content>

      <!--              <ion-button fill="clear" @click="toReportView(report.id)">Переглянути</ion-button>-->
<!--      <ion-button color="success" style="margin-left: 20px">Редагувати</ion-button>-->
    </ion-card>
  </ion-item>
</template>

<script>
import { defineComponent } from 'vue';
import { useIonRouter } from '@ionic/vue';
export default defineComponent({
  props: {
    report: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const ionRouter = useIonRouter();
    const toReportView = (id) => {
      ionRouter.push(`/tabs/report/${id}`);
    };
    return {
      toReportView
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  padding-bottom: 8px;
  width: 100%;
  cursor: pointer;
}
</style>
