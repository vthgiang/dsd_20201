function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { payload } = event.data.json();
  console.log(`payload: `, payload)

  // const options = {
  //   data: url,
  //   body: text,
  //   icon: image,
  //   image: image,
  //   actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  // };
  // event.waitUntil(self.registration.showNotification(title, options));
  // var total = localStorage.getItem("total");

}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);