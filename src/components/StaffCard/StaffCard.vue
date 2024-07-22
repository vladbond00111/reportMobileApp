<template>
  <ion-card class="card" @click="toStaffCard(staff.id)">
    <ion-card-header>
      <ion-card-title>{{ staff.nickname }}</ion-card-title>
      <ion-card-subtitle>{{ staff.name }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ staff.unit }}
    </ion-card-content>
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
</style>