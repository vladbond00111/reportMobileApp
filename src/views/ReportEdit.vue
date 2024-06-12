<template>
  <ion-page style="margin-top: 56px">
    <report v-if="report" :report="report" type="edit" />
  </ion-page>
</template>

<script lang="ts">
import Report from '@/components/Report/Report.vue';
import {defineComponent, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import {getAllFromReports, getByIdFromReports} from '@/compasables/useDatabase.js';

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
    return {
      report
    };
  },
});
</script>

<style lang="scss">
</style>