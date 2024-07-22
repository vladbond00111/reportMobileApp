<template>
  <ion-page style="margin-top: 56px">
    <ion-content :fullscreen="true">
      <ion-content>
        <ion-list class="widgets">
          <dashboard-widget title="300" :total="count300" :currentDay="countToday300" :isActive="activeFilter === '300'"
            @toggleFilter="toggleFilter" :style="{ borderColor: 'var(--accent-color)' }" />
          <dashboard-widget title="200" :total="count200" :currentDay="countToday200" :isActive="activeFilter === '200'"
            @toggleFilter="toggleFilter" :style="{ borderColor: 'var(--danger-color)' }" />
          <dashboard-widget title="4.5.0" />
        </ion-list>

        <div class="search-container">
          <ion-searchbar class="search-bar" v-model="searchQuery" :animated="true" :debounce="500" @ionBlur="onBlur" @ionFocus="onFocus" @ionInput="onSearchInput"
            placeholder="Пошук за ПІБ або позивним" />
          <ion-list v-if="isFocused && searchedStaff.length" class="autocomplete-tooltip">
            <ion-item v-for="staff in searchedStaff" :key="staff.id" @click="toStaffCard(staff.id)" button>
              <ion-label class="ion-text-wrap">
                <div style="font-weight: bold;">{{ staff.nickname }}</div>
                <div>{{ staff.name }}</div>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>

        <ion-list>
          <report-card v-for="report in filteredReports" :report="report" :key="report.id" />
        </ion-list>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { getAllFromReports, countHealthStatus, countTodayReports, searchInStaffTable } from '@/compasables/useDatabase.js';
import ReportCard from "@/components/ReportCard/ReportCard.vue";
import DashboardWidget from "@/components/DashboardWidget/DashboardWidget.vue";
import { IonSearchbar, useIonRouter } from '@ionic/vue';

export default defineComponent({
  components: {
    ReportCard,
    DashboardWidget,
    IonSearchbar
  },

  setup() {

    const reportList = ref<any>(null);
    const count300 = ref<number>(0);
    const count200 = ref<number>(0);
    const countToday300 = ref<number>(0);
    const countToday200 = ref<number>(0);
    const activeFilter = ref<string | null>(null);
    const searchQuery = ref<any>('');
    const searchedStaff = ref<any[]>([]);
    const isFocused = ref<boolean>(false);

    const getData = async () => {
      reportList.value = await getAllFromReports();
      count300.value = await countHealthStatus('300');
      count200.value = await countHealthStatus('200');
      countToday300.value = await countTodayReports('300');
      countToday200.value = await countTodayReports('200');
    };

    const onSearchInput = async () => {
      if (searchQuery.value.trim().length > 2) {
        searchedStaff.value = await searchInStaffTable(searchQuery.value.trim());
        console.log("test")
        console.log(searchedStaff.value);
      } else {
        searchedStaff.value = [];
      }
    };

    const onFocus = () => {
      isFocused.value = true;
    };

    const onBlur = () => {
      setTimeout(() => {
        isFocused.value = false;
      }, 150);
    };

    const ionRouter = useIonRouter();
    const toStaffCard = (id: number) => {
      ionRouter.push(`/tabs/staff/${id}`);
    };

    const toggleFilter = (status: string) => {
      if (activeFilter.value === status) {
        activeFilter.value = null;
      } else {
        activeFilter.value = status;
      }
    };

    const filteredReports = computed(() => {
      if (activeFilter.value) {
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
      filteredReports,
      searchQuery,
      onSearchInput,
      searchedStaff,
      toStaffCard,
      isFocused,
      onFocus,
      onBlur
    };
  },
});
</script>

<style scoped lang="scss">
.widgets {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 16px;
}
.search-bar {
  padding: 8px 16px 0px;
  --border-radius: 8px;
}
:deep .searchbar-input-container {
  min-height: 50px !important;
}
:deep .searchbar-input {
  padding-top: 6px !important;
  padding-left: calc(50% - 90px) !important;
}
:deep .searchbar-has-focus,
:deep .searchbar-has-value {
  .searchbar-input {
    padding-left: 42px !important;
  }
  .searchbar-search-icon {
    left: 12px !important;
  }
}
:deep .searchbar-clear-button {
  right: 6px !important;
}
.autocomplete-tooltip {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 1000;
  width: calc(100% - 32px);
  margin: 0 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>