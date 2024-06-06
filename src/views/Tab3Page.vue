<template>
  <ion-page style="margin-top: 56px">
    <ion-content>
      <ion-item style="margin-top: 50px">
        <input type="file" @change="handleFileUpload" accept=".csv">
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="js">

import { postToStaffTable } from '@/compasables/useDatabase.js';

export default {
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = this.parseCSV(text);
        try {
          await this.saveDataToIndexedDB(data);
          alert('Дані успішно завантажено');
        } catch (e) {
          alert('Помилка завантаження даних');
          console.log(e);
        }
      };
      reader.readAsText(file);
    },
    parseCSV(text) {
      const lines = text.split('\n');
      const headers = lines[0].split(',');

      // Мапа для заміни назв полів
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
          const key = fieldMap[header.trim()] || header.trim(); // Заміна назви поля або використання оригінальної назви
          obj[key] = values[index].trim();
        });
        return obj;
      });
      return data;
    },
    async saveDataToIndexedDB(data) {
      for (let item of data) {
        await postToStaffTable(item);
      }

    }
  }
}
</script>
