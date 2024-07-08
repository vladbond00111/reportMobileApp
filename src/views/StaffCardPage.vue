<template>
    <ion-page style="margin-top: 56px">
        <ion-content :fullscreen="true">
            <div v-if="staff">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>{{ staff.nickname }}</ion-card-title>
                        <ion-card-subtitle>{{ staff.name }}</ion-card-subtitle>
                        <ion-card-subtitle>
                            <ion-label v-if="staff.unit">{{ staff.unit }}, </ion-label>
                            <ion-label v-if="staff.unit2">{{ staff.unit2 }}, </ion-label>
                            <ion-label v-if="staff.unit3">{{ staff.unit3 }}, </ion-label>
                            <ion-label v-if="staff.unit4">{{ staff.unit4 }}, </ion-label>
                            <ion-label v-if="staff.unit5">{{ staff.unit5 }}</ion-label>
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <div class="buttons">
                            <ion-button color="success">300</ion-button>
                            <ion-button color="warning">300</ion-button>
                            <ion-button color="danger">300</ion-button>
                            <ion-button color="dark">200</ion-button>
                            <ion-button color="light">ХВ</ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-list>
                    <report-card v-for="report in reports" :report="report" :key="report.id"
                        @click="viewReport(report)" />
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getReportsByNameAndNickname, getByIdFromStaffTable } from '@/compasables/useDatabase';
import ReportCard from "@/components/ReportCard/ReportCard.vue";

export default defineComponent({
    components: {
        ReportCard
    },
    setup(props) {
        const staff = ref<any>(null);
        const reports = ref<any[]>([]);

        const fetchFighterData = async (id: number) => {
            staff.value = await getByIdFromStaffTable(id);
            reports.value = await getReportsByNameAndNickname(staff.value.name, staff.value.nickname);
        };

        onMounted(() => {
            const route = useRoute();
            const reportId = +route.params.id;
            fetchFighterData(reportId);
        });

        const viewReport = (report: any) => {
            // Логіка для перегляду обраного звіту
        };

        return {
            staff,
            reports,
            viewReport
        };
    }
});
</script>

<style scoped lang="scss">

.buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>