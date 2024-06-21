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
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button
                style="width: 100%"
                color="success"
                @click="toReportEdit(report.id)"
            >
              Редагувати
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
                color="tertiary"
                style="width: 100%"
                @click="copy(report)"
            >
              Копіювати
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
    <ion-toast
        :is-open="isOpenAlert"
        position="top"
        position-anchor="header"
        message="Дані скопійовано"
        :duration="2000"
        @didDismiss="setOpenAlert(false)"
    ></ion-toast>
  </ion-page>
</template>

<script lang="ts">
import Report from '@/components/Report/Report.vue';
import {defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import {getByIdFromReports} from '@/compasables/useDatabase.js';
import {useIonRouter, IonToast} from "@ionic/vue";

export default defineComponent({
  components: { Report, IonToast },
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

    const isOpenAlert = ref(false);
    const setOpenAlert = (state: boolean) => {
      isOpenAlert.value = state;
    };

    const copy = async (reportData) => {
      const formattedText = `
1. Дата та час події - ${reportData.date}
2. Позивний (ПІБ) - ${reportData.nickname}
3. ПІБ - ${reportData.name}
4. Підрозділ - ${reportData.unit}
5. Звання, посада - ${reportData.rank}
6. Телефон - ${reportData.phone}
7. Місце події - ${reportData.location}
8. Обставини - ${reportData.situation}
9. Свідки - ${reportData.witnesses}
10. Попередній діагноз - ${reportData.diagnosis}
11. Надана допомога - ${reportData.help}
12. TQ - ${reportData.tq}
13. Стан в динаміці - ${reportData.state}
14. В засобах індивідуального захисту - ${reportData.additional}
15. Втрачене майно - ${reportData.lost}
16. Час передачі на - ${reportData.timePass}
17. Ким евакуйований - ${reportData.evacuatedBy}
      `.trim();

      try {
        await navigator.clipboard.writeText(formattedText);
        // alert('Дані скопійовано!');
        setOpenAlert(true);
      } catch (err) {
        console.error('Не вдалося скопіювати дані', err);
        alert('Помилка при копіюванні даних');
      }
    };

    return {
      report,
      isOpenAlert,
      copy,
      toReportEdit,
      setOpenAlert
    };
  },
});
</script>

<style scoped lang="scss">
.buttons-block {
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
  border-top: #dddddd 1px solid;
}
.item-text {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>