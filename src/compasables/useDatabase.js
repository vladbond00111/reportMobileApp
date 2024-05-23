import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase');

// Визначення схеми
db.version(1).stores({
    firstTable: '++id, name, nickname, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy',
    secondTable: '++id, firstField, secondField',
});

// Функція для додавання даних
export const addTestData = async (data) => {
    try {
        const id = await db.firstTable.add(data);
        console.log('Data added with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data:', error);
    }
};

// Функція для отримання всіх даних
export const getAllData = async () => {
    console.log('getAllData');
    try {
        const allData = await db.firstTable.toArray();
        console.log('All data:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};
export const addSimpleTestData = async () => {
    try {
        const id = await db.firstTable.add({
            name: 'Test',
            nickname: 'Tester',
            time: '15:00 01.01.2025',
            description: 'This is a simple test entry'
        });
        console.log('Added entry with id:', id);
        return id;
    } catch (error) {
        console.error('Failed to add test data:', error);
    }
};

// Reports Table
export const postToReportsTable = async (data) => {
    try {
        const rawData = toRaw(data);
        const id = await db.firstTable.add(rawData);
        console.log('Data added with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data:', error);
    }
};
export const getByIdFromReportsTable = async (id) => {
    try {
        const data = await db.firstTable.get(id);
        console.log('Data retrieved by ID:', data);
        return data;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};
export const getAllFromReportsTable = async () => {
    try {
        const allData = await db.firstTable.toArray();
        console.log('All data:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};

export default db;