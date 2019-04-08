import HomeView from './modules/home.js'
import VisitorView from './modules/visitor.js'
import StatisticsView from './modules/statistics.js'

if (sessionStorage.getItem("token") == null) {
  // Workaround for redirection so we can test without deploying. 
  // Uses the fact that window.location.hostname is "" for local files.
  if (window.location.hostname == "") {
    // Running the front end locally, so have to change the absolute path.
    console.log("running locally");
    const location = window.location.pathname;
    const directory = location.substring(0, location.lastIndexOf('/'));
    const newPath = directory + "/login.html";
    window.location.href = newPath;
  } else {
    // Front end is hosted somewhere, so use a relative path.
    console.log("not running locally");
    window.location.href = "login.html";
  }
} else {
  const modules = {
    'home': new HomeView(),
    'visitor': new VisitorView(),
    'statistics': new StatisticsView(),
  };

  const view_items = document.getElementById('view-items');

  for (let module in modules)
    view_items.appendChild(modules[module].menuElement);

  document.body.appendChild(modules['home'].mainElement);

}

