<template>
  <ion-page style="margin-top: 56px">
    <ion-content :fullscreen="true">
      <ion-content>
        <ion-list class="widgets">
          <dashboard-widget
            title="300"
            :total= "count300"
            :currentDay="countToday300"
            :isActive="activeFilter === '300'"
            @toggleFilter="toggleFilter"
            :style="{borderColor: 'var(--accent-color)'}"
          />
          <dashboard-widget
            title="200"
            :total="count200"
            :currentDay="countToday200"
            :isActive="activeFilter === '200'"
            @toggleFilter="toggleFilter"
            :style="{borderColor: '#FF6969'}"
          />
          <dashboard-widget
            title="4.5.0"
          />
        </ion-list>
        <ion-list>
          <report-card
              v-for="report in filteredReports"
              :report="report"
              :key="report.id"
          />
        </ion-list>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { getAllFromReports, countHealthStatus, countTodayReports } from '@/compasables/useDatabase.js';
import ReportCard from "@/components/ReportCard/ReportCard.vue";
import DashboardWidget from "@/components/DashboardWidget/DashboardWidget.vue";

export default defineComponent({
  components: {
    ReportCard,
    DashboardWidget
  },

  setup() {

    const reportList = ref<any>(null);
    const count300 = ref<number>(0);
    const count200 = ref<number>(0);
    const countToday300 = ref<number>(0);
    const countToday200 = ref<number>(0);
    const activeFilter = ref<string | null>(null);

    const getData = async () => {
      reportList.value = await getAllFromReports();
      count300.value = await countHealthStatus('300');
      count200.value = await countHealthStatus('200');
      countToday300.value = await countTodayReports('300');
      countToday200.value = await countTodayReports('200');
    };

    const toggleFilter = (status: string) => {
      if(activeFilter.value === status) {
        activeFilter.value = null;
      } else {
        activeFilter.value = status;
      }
    };

    const filteredReports = computed(() => {
      if(activeFilter.value) {
        return reportList.value.filter((report: any) => report.healthStatus === activeFilter.value);
      }
      return reportList.value;
    });

    onMounted(async () => {
      getData();
    });

    return {
      reportList,
      count300,
      count200,
      countToday300,
      countToday200,
      toggleFilter,
      activeFilter,
      filteredReports
    };
  },
});
</script>

<style scoped>
.widgets {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 16px;
}
</style>