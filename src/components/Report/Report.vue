<template>
  <ion-content class="ion-padding">
    <ion-input
        v-model="form.date"
        class="ion-margin-bottom"
        label="Дата та час події"
        label-placement="floating"
        fill="outline"
    />
    <div class="input-wrapper">
      <ion-input
          v-model="form.name"
          class="ion-margin-bottom"
          label="ПІБ"
          label-placement="floating"
          fill="outline"
          @ionInput="onNameChange(form.name, 'name')"
      />
      <div v-if="searchedStaffByName.length" class="autocomplete-tooltip">
        <ion-list>
          <ion-item
              v-for="staff in searchedStaffByName"
              :key="staff.id"
              @click="selectStaff(staff)"
              button
          >
            {{ staff.name }}
          </ion-item>
        </ion-list>
      </div>
    </div>
    <div class="input-wrapper">
      <ion-input
          v-model="form.nickname"
          class="ion-margin-bottom"
          label="Позивний"
          label-placement="floating"
          fill="outline"
          @ionInput="onNameChange(form.nickname, 'nickname')"
      />
      <div v-if="searchedStaffByNickame.length" class="autocomplete-tooltip">
        <ion-list>
          <ion-item
              v-for="staff in searchedStaffByNickame"
              :key="staff.id"
              @click="selectStaff(staff)"
              button
          >
            {{ staff.nickname }}
          </ion-item>
        </ion-list>
      </div>
    </div>
    <ion-input
        v-model="form.birthdate"
        class="ion-margin-bottom"
        label="Дата народження"
        label-placement="floating"
        fill="outline"
    />
    <ion-textarea
        v-model="form.unit"
        class="ion-margin-bottom"
        label="Підрозділ"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-input
        v-model="form.rank"
        class="ion-margin-bottom"
        label="Звання, посада"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.phone"
        class="ion-margin-bottom"
        type="number"
        label="Телефон"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.location"
        class="ion-margin-bottom"
        label="Звання, посада"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.situation"
        class="ion-margin-bottom"
        label="Обставини"
        label-placement="floating"
        fill="outline"
    />
    <ion-input
        v-model="form.witnesses"
        class="ion-margin-bottom"
        label="Свідки"
        label-placement="floating"
        fill="outline"
    />
    <ion-textarea
        v-model="form.diagnosis"
        class="ion-margin-bottom"
        label="Попередній діагноз"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.help"
        class="ion-margin-bottom"
        label="Надана допомога"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.tq"
        class="ion-margin-bottom"
        label="TQ"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.state"
        class="ion-margin-bottom"
        label="Стан в динаміці"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.additional"
        class="ion-margin-bottom"
        label="В засобах індивідуального захисту"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.lost"
        class="ion-margin-bottom"
        label="Втрачене майно"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.timePass"
        class="ion-margin-bottom"
        label="Час передачі на"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-textarea
        v-model="form.evacuatedBy"
        class="ion-margin-bottom"
        label="Ким евакуйований"
        label-placement="floating"
        :auto-grow="true"
        fill="outline"
    />
    <ion-button
        expand="block"
        color="success"
        @click="saveReport"
    >
      Зберегти
    </ion-button>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { postToReports, updateByIdInReports, searchInStaffTable } from '@/compasables/useDatabase.js';
// import vueDebounce from 'vue-debounce';
import { debounce } from 'vue-debounce';
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
    IonInput
  },
  // directives: {
  //   debounce: vueDebounce({
  //     lock: true,
  //     listenTo: 'input', // подія, до якої застосовується debounce
  //     defaultTime: '500ms'
  //   })
  // },
  setup(props) {
    const router = useRouter();
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
      evacuatedBy: ''
    });

    watch(() => props.report, (value: any) => {
      if (value) {
        form.value = value;
      }
    }, { deep: true, immediate: true });

    const searchedStaffByName = ref([]);
    const searchedStaffByNickame = ref([]);
    const setStaffData = (data) => {
      form.value.name = data.name;
      form.value.nickname = data.nickname;
      form.value.phone = data.phone;
      form.value.unit = data.unit2 + ', ' + data.unit3 + ', ' + data.unit4 + ', ' + data.unit5;
      form.value.rank = data.rank + ', ' + data.workPosition;
      form.value.birthday = data.birthday;
    };
    const onNameChange = debounce(async (value: string, field: string): Promise<void> => {
      console.log('onNameChange', value);
      if (value) {
        console.log('debounce');
        if (field === 'name') {
          searchedStaffByName.value = await searchInStaffTable(value, field);
        } else {
          searchedStaffByNickame.value = await searchInStaffTable(value, field);
        }
      } else {
        searchedStaffByName.value = [];
        searchedStaffByNickame.value = [];
      }
    }, '500ms');
    const selectStaff = (staff) => {
      setStaffData(staff);
      searchedStaffByName.value = [];
      searchedStaffByNickame.value = [];
    };

    const saveReport = async () => {
      try {
        if (props.type === 'edit') {
          await updateByIdInReports(form.value.id, form.value);
          // alert('Репорт успішно збережено');
          // router.push('/tabs/tab1');
          window.location.href = '/tabs/tab1';
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
      searchedStaffByName,
      searchedStaffByNickame,
      onNameChange,
      selectStaff,
      saveReport
    };
  },
});
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
}

.autocomplete-tooltip {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #dcdcdc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: -10px; /* Adjust this value to fine-tune the position */
}

:deep {
  .label-text {
    color: #666;
  }
}
</style>
