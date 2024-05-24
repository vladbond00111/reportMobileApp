import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase');

// Визначення схеми
db.version(1).stores({
    reportsTable: '++id, name, nickname, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy',
    secondTable: '++id, rank, name, nickname, phone, birthday, rank, unit, unit2, unit3, unit4, unit5'
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
        console.log('Getting data by ID:', id)
        console.log('db.reportsTable:', db.reportsTable)
        console.log('db.reportsTable.core:', db.reportsTable
            .where("id")
            .between(1, 3)
            .toArray())
        console.log('db.reportsTable.db.tables:', db.reportsTable.db.tables)
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


// Функція для додавання даних до secondTable
export const postToSecondTable = async (data) => {
    try {
        const rawData = toRaw(data);
        const id = await db.secondTable.add(rawData);
        console.log('Data added to secondTable with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data to secondTable:', id, error);
    }
};

// Функція для отримання всіх даних з secondTable
export const getAllFromSecondTable = async () => {
    try {
        const allData = await db.secondTable.toArray();
        console.log('All data from secondTable:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data from secondTable:', error);
    }
};

export default db;