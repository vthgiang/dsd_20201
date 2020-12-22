function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { image, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    image: image,
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
  const client = clients.get(event.clientId);
  client.postMessage({
    data: url,
    text: text,
    image: image,
  });
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);

self.addEventListener('fetch', event => {
  console.log("inside ")
  event.waitUntil(async function () {
    console.log("posting 1 messages =))")
    if (!event.clientId) return;
    console.log("posting 2 messages =))")
    const client = await clients.get(event.clientId);
    if (!client) return;
    console.log("posting messages =))")
    client.postMessage({
      msg: "Hey I just got a fetch from you!",
      url: event.request.url
    });


  }());
});
