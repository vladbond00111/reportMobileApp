import Dexie from 'dexie';
import { toRaw } from 'vue';

// Створення бази даних
const db = new Dexie('MyDatabase2');

// Визначення схеми
db.version(2).stores({
    reportsTable: '++id, name, nickname, birthday, unit, rank, phone, location, situation, witnesses, diagnosis, help, tq, state, additional, lost, timePass, evacuatedBy, healthStatus, createdAt',
    staffTable: '++id, rank, name, nickname, phone, birthday, workPosition, unit, unit2, unit3, unit4, unit5'
    // staffTable: '++id, Звання, ПІБ, Позивний, телефон, дата народження, Посада, Відділення, Взвод, Рота, Батальйон, Бригада'
});

// Reports Table
export const postToReports = async (data) => {
    try {
        const rawData = toRaw(data);
        rawData.createdAt = new Date().toString();
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
export const getReportsByNameAndNickname = async (name, nickname) => {
    try {
        const reports = await db.reportsTable
            .where('name')
            .equals(name)
            .and(report => report.nickname === nickname)
            .toArray();
        console.log('Reports for name and nickname:', name, nickname, reports);
        return reports;
    } catch (error) {
        console.error('Failed to retrieve reports for name and nickname:', error);
    }
};
// Функція для додавання даних до staffTable
export const postToStaffTable = async (data) => {
    try {
        const rawData = toRaw(data);
        // Перевірка наявності запису з таким name
        const existingEntry = await db.staffTable
            .where('name')
            .equals(rawData.name)
            .first();

        if (existingEntry) {
            console.log('Record already exists with ID:', existingEntry.id);
            return existingEntry.id;
        }
        const id = await db.staffTable.add(rawData);
        console.log('Data added to staffTable with ID:', id, rawData.nickname);
        return id;
    } catch (error) {
        console.error('Failed to add data to staffTable:', error);
    }
};

// Функція для отримання даних з staffTable за ID
export const getByIdFromStaffTable = async (id) => {
    try {
        console.log('Getting data by ID:', id);
        const data = await db.staffTable.get(id);
        console.log('Data retrieved by ID:', data);
        return data;
    } catch (error) {
        console.error('Failed to retrieve data from staffTable:', error);
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

// Функція для підрахунку записів з заданим healthStatus
export const countHealthStatus = async (status) => {
    try {
        const count = await db.reportsTable.where('healthStatus').equals(status).count();
        console.log(`Total count for healthStatus ${status}:`, count);
        return count;
    } catch (error) {
        console.error(`Failed to count healthStatus ${status}:`, error);
    }
};

// Функція для підрахунку записів, створених сьогодні
export const countTodayReports = async (status) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const count = await db.reportsTable
            .where('healthStatus')
            .equals(status)
            .filter(report => {
                const reportDate = new Date(report.createdAt);
                reportDate.setHours(0, 0, 0, 0);
                return reportDate.getTime() === today.getTime();
            }).count();
        console.log(`Total count for reports created today with healthStatus ${status}:`, count);
        return count;
    } catch (error) {
        console.error(`Failed to count reports created today with healthStatus ${status}:`, error);
    }
};


export default db;
