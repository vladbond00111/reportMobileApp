<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Завантажити дані</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item style="margin-top: 50px">
        <input type="file" @change="handleFileUpload" accept=".csv">
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>

import { postToSecondTable } from '@/compasables/useDatabase.js';

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
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index].trim();
        });
        return obj;
      });
      return data;
    },
    async saveDataToIndexedDB(data) {
      for (let item of data) {
        await postToSecondTable(item);
      }

    }
  }
}
</script>
