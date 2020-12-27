
function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { payload } = event.data.json();
  console.log(`payload: `, payload)
  const newNotfication = {
    key: "newNotification",
    payload: payload
  }
  // window.localStorage.setItem("newNotfication", JSON.stringify(payload))

  const options = {
    data: "url",
    body: "text",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  event.waitUntil(openIndexDB(self.indexedDB)
      .then((db) => addPush(db, newNotfication))
      .then(() => console.log(`inserted to indexedDB`)));
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

// this function opens the indexed db as a promise.
function openIndexDB(indexedDB, v = 1) {
  const req = indexedDB.open("my-db", v);
  return new Promise((resolve, reject) => {
    req.onupgradeneeded = (e) => {
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

// we add a text to the indexed db
function addPush(db, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["pushes"],"readwrite");
    const store = transaction.objectStore("pushes");
    var request = store.get("newNotification");
    request.onerror = function(event) {
      console.log(`newNotification is not in DB`)
      store.add(item)
    };
    request.onsuccess = function(event) {
      var requestUpdate = store.put(item);
      requestUpdate.onerror = function(event) {
        console.log("update failed")
      };
      requestUpdate.onsuccess = function(event) {
        console.log("update successfully")
      };
    };
  })
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});