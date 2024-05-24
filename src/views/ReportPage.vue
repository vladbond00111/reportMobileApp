<template>
  <ion-page>
    <ion-input
        class="ion-margin-bottom"
        label="Дата та час події"
        label-placement="floating"
        fill="outline"
    />
    <ion-header>
      <ion-toolbar>
        <ion-title>Редагування</ion-title>
      </ion-toolbar>
    </ion-header>
    <report v-if="report" :report="report" type="edit" />
  </ion-page>
</template>

<script lang="js">
import Report from '@/components/Report/Report.vue';
import {defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import {getAllFromReports, getByIdFromReports} from '@/compasables/useDatabase.js';

export default defineComponent({
  components: { Report },
  setup(context) {
    const report = ref(null);
    const fetchData = async (id) => {
      const reports = await getAllFromReports();
      console.log('id', id);
      console.log('reports', reports);
      console.log('reports', reports[0]);
      report.value = await getByIdFromReports(id);
      console.log('report', report);
    };

    onMounted(() => {
      const route = useRoute();
      const reportId = +route.params.id;
      fetchData(reportId);
    });
    return {
      report
    };
  },
});
</script>

<style lang="scss">
</style>