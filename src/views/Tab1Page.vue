<template>
  <ion-page style="margin-top: 56px">
    <ion-content :fullscreen="true">
      <ion-content>
        <ion-list>
          <report-card
              v-for="report in reportList"
              :report="report"
              :key="report.id"
          />
        </ion-list>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getAllFromReports } from '@/compasables/useDatabase.js';
import ReportCard from "@/components/ReportCard/ReportCard.vue";

export default defineComponent({
  components: {
    ReportCard

  },
  setup() {

    const reportList = ref<any>(null);
    const getData = async () => {
      reportList.value = await getAllFromReports();
    };
    onMounted(async () => {
      getData();
    });


    return {
      reportList
    };
  },
});
</script>
