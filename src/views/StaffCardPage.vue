<template>
    <ion-page style="margin-top: 56px">
        <ion-content :fullscreen="true">
            <div v-if="staff">
                <ion-card class="staff-card">
                    <ion-card-header>
                        <ion-card-title>{{ staff.nickname }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list class="info-list">
                            <ion-item v-if="staff.name">
                                <ion-label>ПІБ</ion-label>
                                <ion-note slot="end">{{ staff.name }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.birthdate">
                                <ion-label>Дата народження</ion-label>
                                <ion-note slot="end">{{ staff.birthdate }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.unit">
                                <ion-label>Відділення</ion-label>
                                <ion-note slot="end">{{ staff.unit }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.unit2">
                                <ion-label>Взвод</ion-label>
                                <ion-note slot="end">{{ staff.unit2 }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.unit3">
                                <ion-label>Рота</ion-label>
                                <ion-note slot="end">{{ staff.unit3 }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.unit4">
                                <ion-label>Батальйон</ion-label>
                                <ion-note slot="end">{{ staff.unit4 }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.unit5">
                                <ion-label>Бригада</ion-label>
                                <ion-note slot="end">{{ staff.unit5 }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.rank">
                                <ion-label>Звання</ion-label>
                                <ion-note slot="end">{{ staff.rank }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.workPosition">
                                <ion-label>Посада</ion-label>
                                <ion-note slot="end">{{ staff.workPosition }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.phone">
                                <ion-label>Телефон</ion-label>
                                <ion-note slot="end">{{ staff.phone }}</ion-note>
                            </ion-item>
                            <ion-item v-if="staff.date">
                                <ion-label>Дата та час події</ion-label>
                                <ion-note slot="end">{{ staff.date }}</ion-note>
                            </ion-item>
                        </ion-list>
                        <div class="buttons">
                            <ion-button class="button" color="success">300</ion-button>
                            <ion-button class="button" color="warning">300</ion-button>
                            <ion-button class="button" color="danger">300</ion-button>
                            <ion-button class="button" color="dark">200</ion-button>
                            <ion-button class="button" color="medium">ХВ</ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
                <ion-list>
                    <report-card class="report-card" v-for="report in reports" :report="report" :key="report.id" />
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
    setup() {
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


        return {
            staff,
            reports
        };
    }
});
</script>

<style scoped lang="scss">
.buttons {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px;
}
.button {
    width: 18%;
    margin: 0;
}
ion-item {
    --padding-start: 0;
}
.staff-card {
    margin: 26px 16px 16px;
}
.report-card {
    margin: 10px 16px 24px;
}
</style>