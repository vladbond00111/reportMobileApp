<template>
  <ion-page style="margin-top: 56px">
    <ion-content :fullscreen="true">
      <ion-searchbar class="search-bar" v-model="searchQuery" placeholder="Пошук за ПІБ або позивним" :animated="true" :debounce="500"></ion-searchbar>
      <ion-list>
        <staff-card v-for="staff in filteredStaff" :staff="staff" :key="staff.id" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { getAllFromStaffTable } from '@/compasables/useDatabase.js';
import StaffCard from "@/components/StaffCard/StaffCard.vue";
import { IonSearchbar, useIonRouter } from '@ionic/vue';

export default defineComponent({
  components: {
    StaffCard,
    IonSearchbar
  },
  setup() {
    const staffList = ref<any>([]);
    const searchQuery = ref<any>('');

    const getData = async () => {
      staffList.value = await getAllFromStaffTable();
    };

    const ionRouter = useIonRouter();
    const toStaffCard = (id: number) => {
      ionRouter.push(`/tabs/staff/${id}`);
    };

    const filteredStaff = computed(() => {
      if (!searchQuery.value) {
        return staffList.value;
      }
      const searchLower = searchQuery.value.toLowerCase().trim();
      return staffList.value.filter((staff: any) => {
        const fullName = staff.name.toLowerCase().trim();
        const callSign = staff.nickname.toLowerCase().trim();
        return fullName.startsWith(searchLower) || callSign.startsWith(searchLower);
      });
    });

    onMounted(async () => {
      await getData();
    });

    return {
      staffList,
      searchQuery,
      filteredStaff,
      toStaffCard
    };
  },
});
</script>

<style scoped lang="scss">
.search-bar {
  margin-top: 18px;
  padding: 8px 16px 0px;
  --border-radius: 8px;
}
:deep .searchbar-input-container {
  min-height: 50px !important;
}
:deep .searchbar-input {
  padding-top: 7px !important;
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
</style>