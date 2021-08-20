function setDashboards(json) {
  localStorage.setItem("sm-dashboards", JSON.stringify(json));
}

function getDashboards() {
  return JSON.parse(localStorage.getItem("sm-dashboards"));
}

function muteToggler(uniqKey) {
  dashboards = getDashboards();
  var temp = [];
  var newMute = "";
  dashboards.forEach((item) => {
    if (item.uniqKey == uniqKey) {
      item.mute = !item.mute;
      newMute = item.mute;
    }
    temp.push(item);
  });
  setDashboards(temp);
  return newMute;
}

function switchMute(button, mute) {
  button.innerHtml = "";
  theme = localStorage.getItem("sm-theme");
  if (theme == "light") {
    if (mute) {
      button.src = "./icons/silence2.png";
    } else {
      button.src = "./icons/bell2.png";
    }
  } else {
    if (mute) {
      button.src = "./icons/dark/silence2.png";
    } else {
      button.src = "./icons/dark/bell2.png";
    }
  }
  return button;
}

function clickMute(uniqKey, button) {
  newMute = muteToggler(uniqKey);
  button = switchMute(button, newMute);
}

function create(element) {
  return document.createElement(element);
}

function textNode(text) {
  return document.createTextNode(text);
}

function prepareTable() {
  dashboards = getDashboards();
  let noServersMessage = document.getElementById("noServersMessage");
  if (dashboards.length > 0) noServersMessage.style.display = "None";
  var status_div = document.getElementById("status_div");
  var child = status_div.lastElementChild;
  while (child) {
    status_div.removeChild(child);
    child = status_div.lastElementChild;
  }

  var table = create("TABLE");
  table.className = "table table-sm table-bordered";
  let theme = localStorage.getItem("sm-theme");

  dashboards.forEach((item) => {
    let name = item.name;
    let url = new URL(item.url);
    let port = url.port;
    if (port == "") port = "80";
    let uniqKey = item.uniqKey;
    // * Create anchor table row
    let tr = create("TR");
    tr.className = ""
    // * Create anchor tag
    let a = create("A");
    a.href = url.protocol + "//" + url.hostname;
    a.target = "_blank";
    a.className = "badge rounded-pill bg-danger";
    a.appendChild(textNode(name));
    a.id = uniqKey + "Active";
    if (theme == "dark") a.className = "badge rounded-pill bg-danger";
    // * Create span to show active badge
    let spanActive = create("SPAN");
    spanActive.className = "circle_green";
    spanActive.id = uniqKey + "Active";
    spanActive.style.display = "none";
    // * Create span to show inactive badge
    let spanInactive = create("SPAN");
    spanInactive.className = "circle_red";
    spanInactive.id = uniqKey + "Inactive";
    spanInactive.style.display = "block";
    // * Create a mute button
    let button = create("INPUT");
    button.type = "image";
    button.className = "image_buttons";
    button = switchMute(button, item.mute);
    // * The reason why addEventListener() is used
    // * https://stackoverflow.com/questions/13591983/onclick-within-chrome-extension-not-working
    button.addEventListener("click", function () {
      clickMute(item.uniqKey, button);
    });
    // * Prepare table columns
    let td1 = create("TD");
    td1.appendChild(a);
    let td2 = create("TD");
    td2.appendChild(textNode(port));
    let td3 = create("TD");
    td3.appendChild(button);
    // * Prepare rows
    if (theme == "dark") {
      td1.className = "tdDark";
      td2.className = "tdDark";
      td3.className = "tdDark;";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  });
  status_div.appendChild(table);
  var body = document.getElementById("body");
  theme = localStorage.getItem("sm-theme");
  if (theme == "light") body.className = "bodyLight";
  else body.className = "bodyDark";
}

function checkStatus() {
  dashboards = getDashboards();
  let theme = localStorage.getItem("sm-theme");
  dashboards.forEach((item) => {
    fetch(item.url)
      .then((res) => {
        var a = document.getElementById(item.uniqKey + "Active");
        if (res.ok) {
          if (theme == "dark") a.className = "badge rounded-pill bg-success text-dark";
          else a.className = "badge rounded-pill bg-success";
        } else {
          if (theme == "dark") a.className = "badge rounded-pill bg-danger text-dark";
          else a.className = "badge rounded-pill bg-danger";
        }
      })
      .catch((err) => {
        var a = document.getElementById(item.uniqKey + "Active");

        if (theme == "dark") a.className = "badge rounded-pill bg-danger text-dark";
        else a.className = "badge rounded-pill bg-danger";
      });
  });
}

function prepareThemeSwitch(params) {
  theme = localStorage.getItem("sm-theme");
  themeSwitch = document.getElementById("myOnOffSwitch");
  if (theme == "light") themeSwitch.checked = false;
  else themeSwitch.checked = true;
  themeSwitch.addEventListener("click", function () {
    switchTheme(themeSwitch);
  });
}

function switchTheme(element) {
  if (!element.checked) {
    localStorage.setItem("sm-theme", "light");
  } else {
    localStorage.setItem("sm-theme", "dark");
  }
  refreshPopup();
}

function refreshPopup() {
  prepareTable();
  checkStatus();
}

prepareThemeSwitch();
refreshPopup();
