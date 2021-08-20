function setDashboards(json) {
  localStorage.setItem("sm-dashboards", JSON.stringify(json));
}

function getDashboards() {
  return JSON.parse(localStorage.getItem("sm-dashboards"));
}

function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

function addOne() {

  let name = document.getElementById("name").value;
  try {
    var url = new URL(document.getElementById("url").value);
  } catch (err) {
    alert(err.message);
    return;
  }
  let uniqKey = document.getElementById("uniqKey").value;
  let dashboards = getDashboards();
  var error = false;
  uniqKey = uniqKey.replace(/ /g, "");
  dashboards.forEach((item) => {
    if (uniqKey == item.uniqKey) {
      alert("Unique Identifier already used!");
      error = true;
      return;
    }
  });
  if (!error) {
    var newValue = {
      name: name,
      url: url,
      uniqKey: uniqKey,
      mute: false,
    };
    dashboards.push(newValue);
    setDashboards(dashboards);
    alert("Server Added!");
  }
}

var jsonView = document.getElementById("jsonView");
jsonView.innerHTML = JSON.stringify(getDashboards(), null, 4);
var addOneBtn = document.getElementById("addOneBtn");

addOneBtn.addEventListener("click", function () {
  addOne();
});

function switchJsonView(jsonSwitch) {
  let jsonView = document.getElementById("jsonView");
  let listView = document.getElementById("listView");
  let jsonViewTxt = document.getElementById("jsonViewTxt");
  let dashboards = getDashboards();

  jsonView.innerHTML = JSON.stringify(dashboards, null, 4);
  jsonViewTxt.innerHTML = "Click the above text to copy to clipboard.";
  let checked = jsonSwitch.checked;
  if (checked) {
    if (dashboards.length == 0)
      document.getElementById("noServers").style.display = "None";
    jsonView.style.display = "block";
    listView.style.display = "none";
    jsonViewTxt.style.display = "block";
  } else {
    if (dashboards.length == 0)
      document.getElementById("noServers").style.display = "Block";
    jsonView.style.display = "none";
    listView.style.display = "block";
    jsonViewTxt.style.display = "none";
  }
}

var jsonSwitch = document.getElementById("jsonSwitch");

jsonSwitch.addEventListener("click", function () {
  switchJsonView(jsonSwitch);
});

let advancedSwitch = document.getElementById("advancedSwitch");
advancedSwitch.addEventListener("click", function () {
  if (advancedSwitch.checked)
    document.getElementById("advancedView").style.display = "block";
  else document.getElementById("advancedView").style.display = "none";
});

function uploadPastedJson() {
  let pastedJson = document.getElementById("pastedJson").value;
  var new_dashboards = [];
  try {
    pastedJson = JSON.parse(pastedJson);
    if (!Array.isArray(pastedJson))
      throw new UserException("Must be Array of Objects");
    pastedJson.forEach((item) => {
      if (item.constructor != Object)
        throw new UserException("Must be Array of Objects");
      if ("url" in item && "name" in item && "uniqKey" in item) {
        item["mute"] = false;
        new_dashboards.push(item);
      } else throw new UserException("Invalid Keys in Object");
    });
    if (confirm("Are you sure?\n\nThis overwrites your whole list of servers"))
      setDashboards(new_dashboards);
  } catch (err) {
    alert(
      "Invalid Json provided! \nPlease check template before uploading\n\nDetails: " +
        err.message
    );
  }
}

jsonView.addEventListener("click", function () {
  jsonView.select();
  jsonView.setSelectionRange(0, 99999);
  document.execCommand("copy");
  let jsonViewTxt = document.getElementById("jsonViewTxt");
  jsonViewTxt.innerHTML = "JSON Copied!";
});
var pastedJsonSubmit = document.getElementById("pastedJsonSubmit");

pastedJsonSubmit.addEventListener("click", function () {
  uploadPastedJson();
});

var hint = document.getElementById("hint");

hint.addEventListener("click", function () {
  let pastedJson = document.getElementById("pastedJson");
  pastedJson.value = JSON.stringify(
    [
      {
        name: "My Site",
        url: "http://mysite.mydomain.com:9090/route",
        uniqKey: "MySite1",
      },
    ],
    null,
    3
  );
});

function create(element) {
  return document.createElement(element);
}

function deleteServer(badge) {
  if (confirm("Confirm Delete?")) {
    let uniqKey = badge.id;
    uniqKey = uniqKey.substr(7);
    let dashboards = getDashboards();
    let new_dashboards = [];
    dashboards.forEach((item) => {
      if (item.uniqKey != uniqKey) new_dashboards.push(item);
    });
    setDashboards(new_dashboards);
    loadListView();
    if (new_dashboards.length == 0)
      document.getElementById("noServers").style.display = "Block";
  }
}

function loadListView() {
  let listViewUl = document.getElementById("listViewUl");
  var child = listViewUl.lastElementChild;
  while (child) {
    listViewUl.removeChild(child);
    child = listViewUl.lastElementChild;
  }
  dashboards = getDashboards();
  if (dashboards.length > 0)
    document.getElementById("noServers").style.display = "None";
  dashboards.forEach((item) => {
    let liClass =
      "list-group-item d-flex justify-content-between align-items-center";
    let badgeClass = "badge rounded-pill bg-danger pointer";
    let li = create("LI");
    li.innerHTML = item.name;
    li.className = liClass;
    let badge = create("SPAN");
    badge.className = badgeClass;
    badge.id = "delete_" + item.uniqKey;
    badge.innerHTML = "Delete";
    badge.addEventListener("click", function () {
      deleteServer(badge);
    });
    li.appendChild(badge);
    listViewUl.appendChild(li);
  });
}
loadListView();
