<template>
    <ion-page style="margin-top: 56px">
        <ion-content :fullscreen="true">
            <ion-content>
                <ion-list>
                    <staff-card v-for="staff in staffList" :staff="staff" :key="staff.id" />
                </ion-list>
            </ion-content>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getAllFromStaffTable } from '@/compasables/useDatabase.js';
import StaffCard from "@/components/StaffCard/StaffCard.vue";
import { useIonRouter } from '@ionic/vue';

export default defineComponent({
    components: {
        StaffCard,
    },

    setup() {

        const staffList = ref<any>(null);
        const activeFilter = ref<string | null>(null);
        const searchQuery = ref<any>('');
        const searchedStaff = ref<any[]>([]);

        const getData = async () => {
            staffList.value = await getAllFromStaffTable();
            console.log(staffList.value);
        };

        const ionRouter = useIonRouter();
        const toStaffCard = (id: number) => {
            ionRouter.push(`/tabs/staff/${id}`);
        };

        onMounted(async () => {
            getData();
        });

        return {
            staffList,
            activeFilter,
            searchQuery,
            searchedStaff,
            toStaffCard
        };
    },
});
</script>

<style scoped lang="scss"></style>