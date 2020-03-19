import Dexie from 'dexie';

const db = new Dexie('travelagency');
db.version(1).stores({
    trips: `++id,title, location`
});

export default db;