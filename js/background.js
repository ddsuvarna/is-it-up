function showNotification(param) {
  var notification = new Notification(param.title, {
    icon: "/logo.png",
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

if (!("ssm-first-run" in localStorage)) {
  localStorage.setItem("ssm-theme", "light");
  localStorage.setItem("ssm-dashboards", JSON.stringify(dashboards));
  localStorage.setItem("ssm-first-run", "false");
}

function checkStatus() {
  dashboards = JSON.parse(localStorage.getItem("ssm-dashboards"));
  dashboards.forEach((item) => {
    if (!item.mute)
      fetch(item.url)
        .then((res) => {
          if (res.ok) {
          } else {
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
