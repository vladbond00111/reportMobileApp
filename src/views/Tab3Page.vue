<template>
  <ion-page style="margin-top: 56px">
    <ion-content>
      <ion-item style="margin-top: 50px">
        <input type="file" @change="handleFileUpload" accept=".csv">
      </ion-item>
      <div class="buttons-block" slot="fixed">
        <ion-button
          expand="block"
          color="primary"
          shape="round"
          style="width: 100%"
          @click="toStaffPage"
        >
        Переглянути дані
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { useIonRouter } from '@ionic/vue';
import { postToStaffTable } from '@/compasables/useDatabase.js';

export default {
  setup() {
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = parseCSV(text);
        try {
          await saveDataToIndexedDB(data);
          alert('Дані успішно завантажено');
        } catch (e) {
          alert('Помилка завантаження даних');
          console.log(e);
        }
      };
      reader.readAsText(file);
    };

    const parseCSV = (text) => {
      const lines = text.split('\n');
      const headers = lines[0].split(',');

      const fieldMap = {
        'Звання': 'rank',
        'ПІБ': 'name',
        'Позивний': 'nickname',
        'Телефон': 'phone',
        'Дата народження': 'birthday',
        'Посада': 'workPosition',
        'Відділення': 'unit1',
        'Взвод': 'unit2',
        'Рота': 'unit3',
        'Батальйон': 'unit4',
        'Бригада': 'unit5'
      };

      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((header, index) => {
          const key = fieldMap[header.trim()] || header.trim();
          obj[key] = values[index].trim();
        });
        return obj;
      });
      return data;
    };

    const saveDataToIndexedDB = async (data) => {
      for (let item of data) {
        await postToStaffTable(item);
      }
    };

    const ionRouter = useIonRouter();
    const toStaffPage = () => {
      ionRouter.push(`/tabs/staff`);
    };

    return {
      handleFileUpload,
      toStaffPage
    };
  }
};
</script>

<style scoped lang="scss">
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
</style>
