<template>
  <ion-page style="margin-top: 56px">
    <report/>
  </ion-page>
</template>

<script lang="ts">
import Report from '@/components/Report/Report.vue';
import {defineComponent, inject, ref, onMounted} from 'vue';
export default defineComponent({
  components: { Report },
  setup() {
    console.log('setup');
    return {
    };
  },
});
</script>

<style lang="scss">
</style>