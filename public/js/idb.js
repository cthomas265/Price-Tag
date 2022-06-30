const indexedDb = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

let db;
//load first budget stored in indexedDB
const request = indexedDb.open('budget', 1);

//make REQUEST method for on successful load when database needs updated, err catch, save record, and to check DB when back online
request.onsuccess = ({ target}) => {
    db = target.result;

    if (navigator.onLine) {
        //check database for any records
    }
}

request.onerror = evnt => {
    console.log(evnt.target.errorCode);
}

request.onupgradeneeded = ({ target }) => {
    db = target.result;
    db.createObjectStore('changes', { autoIncrement: true });
}

function saveRecord(record) {
    const transaction = db.transaction(['changes'], 'readwrite');
    const store = transaction.objectStore('changes');
    store.add(record);
}


//create check database, makes API call to transaction
function checkDatabase() {
    const transaction = db.transaction(['changes'], 'readwrite');
    const store = transaction.objectStore('changes');
    const getAll = store.getAll();
}







window.addEventListener('online', checkDatabase);