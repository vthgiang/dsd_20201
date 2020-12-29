const images = {
      1: {name: 'Drone', value: 1, img: `images/drone.png`, icon: 'fas fa-drone-alt'},
      2: {name: 'Payload', value: 2, img: `images/payload.png`, icon: 'fas fa-layer-group'},
      3: {name: 'User', value: 3, img: `images/user.png`, icon: 'fas fa-user-circle'},
      4: {name: 'Image/Video', value: 4, img: `images/image-video.png`, icon: 'fas fa-images'},
      5: {name: 'Đối tượng giám sát', value: 5, img: `images/object.png`, icon: 'fas fa-binoculars'},
      6: {name: 'Báo cáo thống kê', value: 6, img: `images/baocao.jpg`, icon: 'fas fa-chart-line'},
      7: {name: 'Miền giám sát', value: 7, img: `images/area.png`, icon: 'fas fa-crop-alt'},
      8: {name: 'Công việc xử lý sự cố', value: 8, img: `images/incident.jpg`,icon: 'fas fa-toolbox'},
      9: {name: 'Flighthub', value: 9, img: `images/flighthub.jpg`, icon: 'fab fa-hubspot'},
      10: {name: 'Sư cố lưới điện', value: 10, img: `images/high_voltage_grid.jpg`, icon: 'fas fa-bolt'},
      11: {name: 'Sư cố cây trồng', value: 11, img: `images/tree.jpg`, icon: 'fas fa-tree'},
      12: {name: 'Sư cố cháy rừng', value: 12, img: `images/forest_fires.jpg`, icon: 'fas fa-fire'},
      13: {name: 'Sư cố đê điều', value: 13, img: `images/dike.jpg`, icon: 'fas fa-disease'},
      14: {name: 'Tất cả các sự cố', value: 14, img: `images/dike.jpg`, icon: 'fas fa-notes-medical'},
}

const host = "https://it4483-dsd04.herokuapp.com"
var ntfID;
var token, project_type, user;
// const host =  "http://localhost:5000"

// post function
function post(path, config) {
  // console.log(`${host}/${path}`);
  // console.log((config))
  return fetch(`${host}/${path}`, config)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}


async function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { payload } = event.data.json();
  console.log(`payload: `, payload)
  const newNotfication = {
    key: "newNotification",
    payload: payload
  }

  await openIndexDB(self.indexedDB)
  .then( db => getPushes(db, "project-type")) 
  .then(res => {
    project_type = res.target.result.payload;
    // console.log(project_type)
  })

  await openIndexDB(self.indexedDB)
  .then( db => getPushes(db, "token")) 
  .then(res => {
    token = res.target.result.payload;
    // console.log(token)
  })

  await openIndexDB(self.indexedDB)
  .then( db => getPushes(db, "user")) 
  .then(res => {
    user = res.target.result.payload;
    console.log(user)
  })

  const { content, ref, _id } = payload;
  ntfID = _id;
  const actions = [{ action: "Detail", title: "View"}]
  if (["ADMIN", "SUPERADMIN"].includes(user.user.role)) actions.push( { action: "Verify", title: "Verify"})
  const options = {
    data: ref._link,
    icon: images[ref._type].img,
    body: content,
    requireInteraction: true,
    actions: actions
  };
  event.waitUntil(self.registration.showNotification("Thông báo mới", options));
  event.waitUntil(openIndexDB(self.indexedDB)
      .then((db) => addPush(db, newNotfication))
      .then(() => console.log(`inserted to indexedDB`)));
}

function openPushNotification(event) {

  switch (event.action) {
    case 'Detail':
      clients.openWindow(`/warning-detail/${ntfID}`);
      break;
    case 'Verify':
      event.waitUntil(
        post("check_ntf", {
          headers: { 
            "content-type": "application/json;charset=UTF-8",
            "api-token": token,
            "project-type": project_type 
          },
          body: JSON.stringify({
            "idNtf": ntfID
          }),
          method: "POST"
        }).then(response => {
          console.log(`response: `, response)
          if (response.code === 1000) self.registration.showNotification("Verify successfully");
        }).catch(err => {
          console.log(err)
        })
      )
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
  // console.log("[Service Worker] Notification click Received.", event.notification.data);
  // event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data));
}

// a function go get all the pushes from indexedDB instance
function getPushes(db, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["pushes"], "readwrite");
    const store = transaction.objectStore("pushes");
    const req = store.get(key);

    req.onerror = e => reject(e);
    req.onsuccess = e => resolve(e);
  });
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
      // console.log(`newNotification is not in DB`)
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