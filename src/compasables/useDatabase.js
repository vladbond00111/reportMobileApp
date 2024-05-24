import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase');

// Визначення схеми
db.version(1).stores({
    firstTable: '++id, name, nickname, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy',
    secondTable: '++id, firstField, secondField',
});

// Reports Table
export const postToReports = async (data) => {
    try {
        const rawData = toRaw(data);
        const id = await db.firstTable.add(rawData);
        console.log('Data added with ID:', id);
        return id;
    } catch (error) {
        console.error('Failed to add data:', error);
    }
};
export const getByIdFromReports = async (id) => {
    try {
        console.log('Getting data by ID:', id)
        console.log('db.firstTable:', db.firstTable)
        console.log('db.firstTable.core:', db.firstTable
            .where("id")
            .between(1, 3)
            .toArray())
        console.log('db.firstTable.db.tables:', db.firstTable.db.tables)
        const data = await db.firstTable.get(id);
        console.log('Data retrieved by ID:', data);
        return data;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};
export const getAllFromReports = async () => {
    try {
        const allData = await db.firstTable.toArray();
        console.log('All data:', allData);
        return allData;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
    }
};

export default db;