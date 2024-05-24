import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase');

// Визначення схеми
db.version(1).stores({
    reportsTable: '++id, name, nickname, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy',
    // secondTable: '++id, firstField, secondField',
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

export default db;