import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb =  async (content) => {
  const textEditorDB = await openDB('jate', 1);
  const transaction = textEditorDB.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to DB', result.value);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textEditorDB = await openDB('jate', 'readonly');
  const store = textEditorDB.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('getDb not implemented');
};

  initdb();
