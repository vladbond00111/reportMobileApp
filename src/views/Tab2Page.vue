<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Новий звіт</ion-title>
      </ion-toolbar>
    </ion-header>
    <report/>
  </ion-page>
</template>

<script lang="ts">
import Report from '@/components/Report/Report.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: { Report },
  setup() {

    return {
    };
  },
});
</script>

<style lang="scss">
</style>