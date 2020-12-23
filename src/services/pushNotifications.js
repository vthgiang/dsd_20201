const pushServerPublicKey = "BL-eBn1GmJUsvUaBuiretJuPyWuyiJqyazFBHEcZchR6EKGdVQE2axsaBD-oPj_Y_Q7upi5GuChjHiLfDJbQquY";
const host = process.env.PUSH_SERVER_URL || "https://it4483-dsd04.herokuapp.com"
//const host = process.env.PUSH_SERVER_URL || "http://localhost:5000"
// post function
function post(path, body) {
  console.log(JSON.stringify(body));
  console.log(`${host}${path}`);
  return fetch(`${host}${path}`, {
    headers: { "content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(body),
    method: "POST"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}


// checks if Push notification and service workers are supported by your browser
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}


// asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
function initializePushNotifications() {
  // request user grant to show notification
  return Notification.requestPermission(function (result) {
    console.log(result);
    return result;
  });
}


// register service worker file to listen push event from server
function registerServiceWorker() {
  navigator.serviceWorker.register("serviceWorker.js");
}


// using the registered service worker creates a push notification subscription and returns it
function createNotificationSubscription() {
  console.log("creating subscription");
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready.then(function (serviceWorker) {
    // subscribe and return the subscription
    return serviceWorker.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(pushServerPublicKey)
      })
      .then(function (subscription) {
        console.log("User is subscribed.", subscription);
        return subscription;
      });
  });
}

// helper function
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


// send the actual subscription to push server to register for project_type
function sendSubscriptionToPushServer(body) {
  post("/subscribe", body).then(function (response) {
    const { subscriptionId, code, message } = response;
    if (!message) {
      alert("Subcribe to receive notification successfully");
    } else {
      alert(message)
    }
    console.log(`subscriptionId: ${subscriptionId}`);
    console.log(`return code: ${code}`);
    console.log(`message: ${message}`);
  });
}


// request push server to push to all clients have project_type (eg. CHAY_RUNG)
function sendPushNotification(body) {
  post("/push_notification", body).then(function (response) {
    const { code, message } = response;
    console.log(`return code: ${code}`);
    console.log(`message: ${message}`);
  });
}

export {
  isPushNotificationSupported,
  initializePushNotifications,
  registerServiceWorker,
  createNotificationSubscription,
  sendSubscriptionToPushServer,
  sendPushNotification
};
