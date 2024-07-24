<template>
  <ion-content class="ion-padding">

    <ion-segment v-model="form.healthStatus" class="ion-segment">
      <ion-segment-button class="ion-segment-button" value="200">
        <ion-label>200</ion-label>
      </ion-segment-button>
      <ion-segment-button class="ion-segment-button" value="300">
        <ion-label>300</ion-label>
      </ion-segment-button>
      <ion-segment-button class="ion-segment-button" value="Хвороба">
        <ion-label>Хвороба</ion-label>
      </ion-segment-button>
    </ion-segment>

    <div style="display: flex">
      <div class="input-wrapper">
        <ion-input
            v-model="form.nickname"
            class="ion-margin-bottom"
            label="Позивний (ПІБ)"
            label-placement="floating"
            fill="outline"
            mode="md"
            :debounce="500"
            @ionFocus="onFocus"
            @ionBlur="onBlur"
            @ionInput="onNameChange(form.nickname, 'nickname')"
        />
        <div v-if="isFocused && searchedStaffByNickame.length" class="autocomplete-tooltip">
          <ion-list>
            <ion-item
                v-for="staff in searchedStaffByNickame"
                :key="staff.id"
                @click="selectStaff(staff)"
                button
            >
              <ion-label class="ion-text-wrap">
                <div style="font-weight: bold;">{{ staff.nickname }}</div>
                <div>{{ staff.name }}</div>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
      <new-staff-modal
          v-if="type === 'create' && showNewStaffModal && form.nickname?.length > 3"
        @new-staff="setStaffData"
      />
    </div>
    <ion-input
        v-model="form.name"
        class="ion-margin-bottom"
        label="ПІБ"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.birthdate"
        class="ion-margin-bottom"
        label="Дата народження"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.unit"
        class="ion-margin-bottom"
        label="Підрозділ"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.rank"
        class="ion-margin-bottom"
        label="Звання, посада"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.phone"
        class="ion-margin-bottom"
        type="number"
        label="Телефон"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.date"
        class="ion-margin-bottom"
        label="Дата та час події"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.location"
        class="ion-margin-bottom"
        label="Звання, посада"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.situation"
        class="ion-margin-bottom"
        label="Обставини"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-input
        v-model="form.witnesses"
        class="ion-margin-bottom"
        label="Свідки"
        label-placement="floating"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.diagnosis"
        class="ion-margin-bottom"
        label="Попередній діагноз"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.help"
        class="ion-margin-bottom"
        label="Надана допомога"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.tq"
        class="ion-margin-bottom"
        label="TQ"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.state"
        class="ion-margin-bottom"
        label="Стан в динаміці"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.additional"
        class="ion-margin-bottom"
        label="В засобах індивідуального захисту"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.lost"
        class="ion-margin-bottom"
        label="Втрачене майно"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.timePass"
        class="ion-margin-bottom"
        label="Час передачі на"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <ion-textarea
        v-model="form.evacuatedBy"
        class="last-input"
        label="Ким евакуйований"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
        mode="md"
    />
    <div class="buttons-block" slot="fixed">
      <ion-button
        expand="block"
        color="primary"
        shape="round"
        style="width: 100%"
        @click="saveReport"
      >
      Зберегти
      </ion-button>
    </div>
  </ion-content>
</template>

<script lang="js">
import { defineComponent, ref, watch } from 'vue';
import { IonSegment, IonSegmentButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { postToReports, updateByIdInReports, searchInStaffTable } from '@/compasables/useDatabase.js';
import NewStaffModal from "@/components/newStaff/newStaffModal.vue";
export default defineComponent({
  props: {
    report: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  components: {
    NewStaffModal,
    IonSegment,
    IonSegmentButton
  },
  setup(props) {
    const router = useRouter();
    const isFocused = ref(false);
    const form = ref({
      date: '',
      name: '',
      nickname: '',
      birthday: '',
      unit: '',
      rank: '',
      phone: '',
      location: '',
      situation: '',
      witnesses: '',
      diagnosis: '',
      help: '',
      tq: '',
      state: '',
      additional: '',
      lost: '',
      timePass: '',
      evacuatedBy: '',
      healthStatus: ''
    });

    watch(() => props.report, (value) => {
      if (value) {
        form.value = value;
      }
    }, { deep: true, immediate: true });

    // const searchedStaffByName = ref([]);
    const searchedStaffByNickame = ref([]);
    const showNewStaffModal = ref(false);
    let searchTimeout = null;

    const setStaffData = (data) => {
      form.value.name = data.name;
      form.value.nickname = data.nickname;
      form.value.phone = data.phone;
      form.value.unit = data.unit + ', ' + data.unit2 + ', ' + data.unit3 + ', ' + data.unit4 + ', ' + data.unit5;
      form.value.rank = data.rank + ', ' + data.workPosition;
      form.value.birthday = data.birthday;
    };
    // const isDebounce = ref(false);
    const onNameChange = async (value) => {
      if (value?.length > 2) {
        searchedStaffByNickame.value = await searchInStaffTable(value);
        clearTimeout(searchTimeout);
        if (searchedStaffByNickame.value.length === 0) {
          searchTimeout = setTimeout(() => {
            if (searchedStaffByNickame.value.length === 0) {
              showNewStaffModal.value = true;
            }
          }, 2000);
        } else {
          showNewStaffModal.value = false;
        }
      } else {
        clearTimeout(searchTimeout);
        showNewStaffModal.value = false;
        searchedStaffByNickame.value = [];
      }
    };

    const onFocus = () => {
      isFocused.value = true;
    };

    const onBlur = () => {
      setTimeout(() => {
        isFocused.value = false;
      }, 150);
    };

    const selectStaff = (staff) => {
      setStaffData(staff);
      // searchedStaffByName.value = [];
      searchedStaffByNickame.value = [];
    };

    const saveReport = async () => {
      try {
        if (props.type === 'edit') {
          await updateByIdInReports(form.value.id, form.value);
          // alert('Репорт успішно збережено');
          // router.push('/tabs/tab1');
          window.location.href = '/tabs/report/' + form.value.id;
        } else {
          await postToReports(form.value);
          // alert('Репорт успішно збережено');
          // router.push('/tabs/tab1');
          window.location.href = '/tabs/tab1';
        }
      } catch (e) {
        alert('Помилка збереження репорту');
        console.log(e);
      }
    };

    return {
      form,
      // searchedStaffByName,
      searchedStaffByNickame,
      onNameChange,
      showNewStaffModal,
      selectStaff,
      setStaffData,
      saveReport,
      isFocused,
      onFocus,
      onBlur,
    };
  },
});
</script>

<style scoped lang="scss">
.ion-segment {
  --background:var(--ion-color-primary);
  margin-bottom: 16px;
  border-radius: 10px;
}
.ion-segment-button {
  border-radius: 10px;
  --background: var(--ion-color-primary);
  --indicator-color: var(--ion-color-primary-focused);
  --background-checked: var(--ion-color-primary-focused);
  --color: var(--ion-color-light); 

  // --color-checked: var(--ion-color-light); styles for md
  // --background-color: black;
  // --background-focused: black;
}
.buttons-block {
  display: flex;
  justify-content: end;
  width: 100%;
  padding: 10px;
  margin-bottom: 0px;
  border-top: #dddddd 1px solid;
  background-color: #fff;
  bottom: 0;
}
.input-wrapper {
  position: relative;
  flex-grow: 1;
}
.autocomplete-tooltip {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: -15px; /* Adjust this value to fine-tune the position */
}
.last-input {
  margin-bottom: 78.4px;
}
:deep {
  .label-text {
    color: #666;
  }
}
</style>
