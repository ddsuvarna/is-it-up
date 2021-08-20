function showNotification(param) {
  var notification = new Notification(param.title, {
    icon: "./icons/icon.png",
    body: param.body,
  });
  notification.addEventListener("click", function () {
    notification.close();
  });
  
  return notification;
}

var dashboards = [
  {
    name: "Google",
    url: "http://www.google.com",
    uniqKey: "google",
    mute: false,
  },
];

if (!("sm-first-run" in localStorage)) {
  localStorage.setItem("sm-theme", "light");
  localStorage.setItem("sm-dashboards", JSON.stringify(dashboards));
  localStorage.setItem("sm-first-run", "false");
}

function checkStatus() {
  dashboards = JSON.parse(localStorage.getItem("sm-dashboards"));
  dashboards.forEach((item) => {
    if (!item.mute)
      fetch(item.url)
        .then((res) => {
          if (res.ok) {
          } else {
            console.log("bg.js cant reach");
            url = new URL(item.url);
            showNotification({
              title: item.name + " Service Down.",
              body:
                "Cannot reach server!\nURL: " +
                url.protocol +
                "//" +
                url.hostname,
            });
          }
        })
        .catch((err) => {
          console.log("bg.js cant reach");
          url = new URL(item.url);
          showNotification({
            title: item.name + " Service Down.",
            body:
              "Cannot reach server!\nURL: " +
              url.protocol +
              "//" +
              url.hostname,
          });
        });
  });
}

checkStatus();

setInterval(() => {
  checkStatus();
}, 10 * 60000);
