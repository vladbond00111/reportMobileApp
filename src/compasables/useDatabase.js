import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase2');

// Визначення схеми
db.version(2).stores({
    reportsTable: '++id, name, nickname, birthday, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy',
    staffTable: '++id, rank, name, nickname, phone, birthday, unit, unit2, unit3, unit4, unit5'
    // staffTable: '++id, Звання, ПІБ, Позивний, телефон, дата народження, Посада, Відділення, Взвод, Рота, Батальйон, Бригада'
});

// Reports Table
export const postToReports = async (data) => {
    try {
        const rawData = toRaw(data);
        const id = await db.reportsTable.add(rawData);
        console.log('Data added with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data:', error);
    }
};

export const updateByIdInReports = async (id, data) => {
    console.log('Updating data by ID:', id);
    console.log('Data:', data);
    try {
        const rawData = toRaw(data);
        await db.reportsTable.update(id, rawData);
        console.log('Data updated by ID:', id);
    } catch (error) {
        console.error('Failed to update data:', error);
    }
}
export const getByIdFromReports = async (id) => {
    try {
        console.log('Getting data by ID:', id);
        const data = await db.reportsTable.get(id);
        console.log('Data retrieved by ID:', data);
        return data;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};
export const getAllFromReports = async () => {
    try {
        const allData = await db.reportsTable.toArray();
        console.log('All data:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};

// Функція для додавання даних до staffTable
export const postToStaffTable = async (data) => {
    try {
        const rawData = toRaw(data);
        const id = await db.staffTable.add(rawData);
        console.log('Data added to staffTable with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data to staffTable:', id, error);
    }
};

// Функція для отримання всіх даних з staffTable
export const getAllFromStaffTable = async () => {
    try {
        const allData = await db.staffTable.toArray();
        console.log('All data from staffTable:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data from staffTable:', error);
    }
};

// Функція для пошуку в staffTable
export const searchInStaffTable = async (value) => {
    try {
        console.log('Searching data by name:', value);
        if (value === '') return [];
        const result = await db.staffTable.filter(staff =>
            staff['name'].toLowerCase().startsWith(value.toLowerCase()) ||
            staff['nickname'].toLowerCase().startsWith(value.toLowerCase())
        ).toArray();
        console.log('Search result:', result);
        return result;
    } catch (error) {
        console.error('Failed to search data:', error);
        throw error;
    }
};

export default db;
