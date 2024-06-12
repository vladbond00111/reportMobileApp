<template>
  <ion-page style="margin-top: 56px">
    <ion-content v-if="report" class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">1. Дата та час події</ion-label>
          <ion-text class="item-text">{{ report.date }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">2. Позивний (ПІБ)</ion-label>
          <ion-text class="item-text">{{ report.nickname }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">3. ПІБ</ion-label>
          <ion-text class="item-text">{{ report.name }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">4. Підрозділ</ion-label>
          <ion-text class="item-text">{{ report.unit }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">5. Звання, посада</ion-label>
          <ion-text class="item-text">{{ report.rank }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">6. Телефон</ion-label>
          <ion-text class="item-text">{{ report.phone }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">7. Місце події</ion-label>
          <ion-text class="item-text">{{ report.location }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">8. Обставини</ion-label>
          <ion-text class="item-text">{{ report.situation }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">9. Свідки</ion-label>
          <ion-text class="item-text">{{ report.witnesses }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">10. Попередній діагноз</ion-label>
          <ion-text class="item-text">{{ report.diagnosis }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">11. Надана допомога</ion-label>
          <ion-text class="item-text">{{ report.help }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">12. TQ</ion-label>
          <ion-text class="item-text">{{ report.tq }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">13. Стан в динаміці</ion-label>
          <ion-text class="item-text">{{ report.state }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">14. В засобах індивідуального захисту</ion-label>
          <ion-text class="item-text">{{ report.additional }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">15. Втрачене майно</ion-label>
          <ion-text class="item-text">{{ report.lost }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">16. Час передачі на</ion-label>
          <ion-text class="item-text">{{ report.timePass }}</ion-text>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">17. Ким евакуйований</ion-label>
          <ion-text class="item-text">{{ report.evacuatedBy }}</ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
    <div class="buttons-block">
      <ion-button
          color="success"
          style="margin-left: 20px"
          @click="toReportEdit(report.id)"
      >
        Редагувати
      </ion-button>
      <ion-button
          color="tertiary"
          style="margin-left: 20px"
      >
        Передати по nfc
      </ion-button>
    </div>
  </ion-page>
</template>

<script lang="ts">
import Report from '@/components/Report/Report.vue';
import {defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import {getByIdFromReports} from '@/compasables/useDatabase.js';
import {useIonRouter} from "@ionic/vue";

export default defineComponent({
  components: { Report },
  setup(context) {
    const report = ref<any>(null);
    const fetchData = async (id: number) => {
      report.value = await getByIdFromReports(id);
    };

    onMounted(() => {
      const route = useRoute();
      const reportId = +route.params.id;
      fetchData(reportId);
    });

    const ionRouter = useIonRouter();
    const toReportEdit = (id) => {
      ionRouter.push(`/tabs/report/${id}/edit`);
    };
    return {
      report,
      toReportEdit
    };
  },
});
</script>

<style lang="scss">
.buttons-block {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  margin-bottom: 10px;
  border-top: #dddddd 1px solid;
}
.item-text {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>