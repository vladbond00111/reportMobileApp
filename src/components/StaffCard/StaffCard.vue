<template>
  <ion-card class="card" @click="toStaffCard(staff.id)">
    <ion-card-header>
      <ion-card-title>{{ staff.nickname }}</ion-card-title>
      <ion-card-subtitle>{{ staff.name }}</ion-card-subtitle>
      <ion-card-subtitle class="unit-titles">
        <ion-label v-if="staff.unit">{{ staff.unit }}, </ion-label>
        <ion-label v-if="staff.unit2">{{ staff.unit2 }}, </ion-label>
        <ion-label v-if="staff.unit3">{{ staff.unit3 }}, </ion-label>
        <ion-label v-if="staff.unit4">{{ staff.unit4 }}, </ion-label>
        <ion-label v-if="staff.unit5">{{ staff.unit5 }}</ion-label>
      </ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useIonRouter } from '@ionic/vue';
export default defineComponent({
  props: {
    staff: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const ionRouter = useIonRouter();
    const toStaffCard = (id) => {
      ionRouter.push(`/tabs/staff/${id}`);
    };


    return {
      toStaffCard
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 16px;
  cursor: pointer;
}
.unit-titles {
  color: var(--ion-color-primary);
}
</style>