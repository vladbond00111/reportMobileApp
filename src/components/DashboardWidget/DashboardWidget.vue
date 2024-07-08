<template>
    <ion-card class="ion-card" :class="[isActive ? 'active' : '']" @click="toggleFilter">
      <ion-card-header class="ion-card-header">
        <ion-card-title class="ion-card-title">{{ title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-card-content" v-if="total">
        <ion-label class="total-records">Всього: {{ total }}</ion-label>
        <ion-label class="per-day">(+{{ currentDay }} за день)</ion-label>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      currentDay: {
        type: Number,
        required: true
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },
    emits: ['toggleFilter'],
    setup(props, { emit }) {
      const toggleFilter = () => {
        emit('toggleFilter', props.title);
      };
  
      return {
        toggleFilter
      };
    }
  });
  </script>
  
  <style scoped>
  .ion-card {
    margin: 0px;
    width: 33%;
    text-align: center;
    border-bottom: 4px solid var(--disease-color)
  }
  .ion-card-header {
    padding: 0.5rem;
  }
  .ion-card-content {
    padding: 0 0.5rem 0.5rem 0.5rem;
  }
  .ion-card-title {
    font-size: 1.25rem;
    margin: 0;
  }
  .per-day {
    font-size: 0.8rem;
    margin: 0;
  }
  .total-records {
    font-size: 1rem;
    color: rgb(31, 31, 31);
    display: block;
  }
  .active {
    background-color: lightgray;
    transform: scale(1.05);
  }
  </style>
  