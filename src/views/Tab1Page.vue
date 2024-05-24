<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Список репортів</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-content>
        <ion-list>
          <ion-item v-for="(report, index) in reportList">
            <ion-card style="padding-bottom: 8px; width: 100%">
              <ion-avatar slot="start">
                <img :src="'https://picsum.photos/80/80?random=' + index" alt="avatar" />
              </ion-avatar>
              <ion-card-header>
                <ion-card-title>{{ report.nickname }}</ion-card-title>
                <ion-card-subtitle>{{ report.name }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                {{ report.description }}
              </ion-card-content>

<!--              <ion-button fill="clear" @click="toReportView(report.id)">Переглянути</ion-button>-->
              <ion-button color="success" style="margin-left: 20px" @click="toReportView(report.id)">Редагувати</ion-button>
            </ion-card>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useIonRouter } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import { getAllFromReports } from '@/compasables/useDatabase.js';

export default defineComponent({
  components: {

  },
  setup() {
    const ionRouter = useIonRouter();

    const reportList = ref(null);
    onMounted(async () => {
      reportList.value = await getAllFromReports();
    });

    const handleAddData = () => {
      const newItem = { someField: 'New', anotherField: 'Data' };
      // addData('reportsTable', newItem).then(() => loadData('reportsTable'));
    };

    // const testData = [
    //   {
    //     name: 'first',
    //     nickname: 'firstnick',
    //     time: '12:00 12.03.2024',
    //     description: 'first description'
    //   }
    // ];

    onMounted(() => {
      // addTestData(testData).then(() => {
      //   console.log('Test data has been added to the database');
      // });
      // addSimpleTestData().then(id => {
      //   console.log('Test data added with ID:', id);
      // });
    });

    const toReportView = (id: string) => {
      ionRouter.push(`/tabs/report/${id}`);
    };

    return {
      toReportView,
      reportList
    };
  },
});
</script>
