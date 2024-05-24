<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Редагування</ion-title>
      </ion-toolbar>
    </ion-header>
    <report v-if="report && report.length" :report="report" type="edit" />
  </ion-page>
</template>

<script lang="js">
import Report from '@/components/Report/Report.vue';
import {defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import { getByIdFromReports } from '@/compasables/useDatabase.js';

export default defineComponent({
  components: { Report },
  setup(context) {
    const report = ref(null);
    const fetchData = async (id) => {
      report.value = await getByIdFromReports(id);
      console.log('report', report);
    };

    onMounted(() => {
      const route = useRoute();
      const reportId = route.params.id;
      fetchData(reportId);
    });
    return {
    };
  },
});
</script>

<style lang="scss">
</style>