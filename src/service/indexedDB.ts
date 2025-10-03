// services/indexedDB.ts
import { openDB } from 'idb';

const dbName = 'residentsDB';
const storeName = 'residents';

// פתיחת מאגר הנתונים
const openDatabase = async () => {
  try {
    return await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      },
    });
  } catch (error) {
    console.error('Error opening database:', error);
    throw new Error('Database connection failed');
  }
};

// שמירת דיירים ב-IndexedDB
export interface ResidentRecord { id: string | number; [key: string]: unknown }
export const saveResidentsToDB = async (residents: ResidentRecord[]) => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    residents.forEach((resident) => {
      store.put(resident);  // עדכון או הוספת דיירים
    });

    await tx.done;  // סיום הטרנזקציה
  } catch (error) {
    console.error('Error saving residents to IndexedDB:', error);
    throw new Error('Error saving residents');
  }
};

// טעינת דיירים מ-IndexedDB
export const loadResidentsFromDB = async () => {
  try {
    const db = await openDatabase();
    const store = db.transaction(storeName).objectStore(storeName);
    const residents = await store.getAll();  // קבלת כל הדיירים
    return residents;
  } catch (error) {
    console.error('Error loading residents from IndexedDB:', error);
    throw new Error('Error loading residents');
  }
};
