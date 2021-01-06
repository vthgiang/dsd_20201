/**
 * this script is meant to show how to store and retrieve data from background pushes.
 */

// a simple function to open the indexedDB
function openIndexDB(indexedDB, v = 1) {
    const req = indexedDB.open("my-db", v);
    return new Promise((resolve, reject) => {
      req.onupgradeneeded = e => {
        const thisDB = e.target.result;
        if (!thisDB.objectStoreNames.contains("pushes")) {
          const pushesOS = thisDB.createObjectStore("pushes", { keyPath: "key" });
          pushesOS.createIndex("payload", "payload", { unique: false });
        }
      };
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = error => reject(error);
    });
  }
  
  // a function go get all the pushes from indexedDB instance
  function getPushes(db) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["pushes"], "readwrite");
      const store = transaction.objectStore("pushes");
      const req = store.getAll();
  
      req.onerror = e => reject(e);
      req.onsuccess = e => resolve(e);
    });
  }
  
  // update the UI with data from indexedDB
  function updateOutputFromIndexedDB() {  
    openIndexDB(window.indexedDB)
      .then(db => getPushes(db))
      .then(event => {
        const output = document.getElementById("output");
        const items = event.target.result;
        console.log(`items: `, items)
        // map the items into html
        const html = items
          .map(({ id, payload }) => `<p>${id}: ${payload}</p>`)
          .join("");
        output.innerHTML = html;
        localStorage.setItem("hello", "world")
      });
  }
  
  // if we have indexed db available we will get initial pushes, 
  // and then just run an interval to update the pushes as they come.
  if('indexedDB' in window) {
    updateOutputFromIndexedDB();
    setInterval(() => updateOutputFromIndexedDB(), 1 * 5000);
  }