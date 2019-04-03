import HomeView from './modules/home.js'
import VisitorView from './modules/visitor.js'
import StatisticsView from './modules/statistics.js'

const modules = {
  'home': new HomeView(),
  'visitor': new VisitorView(),
  'statistics': new StatisticsView(),
};

const view_items = document.getElementById('view-items');

for (let module in modules)
  view_items.appendChild(modules[module].menuElement);

document.body.appendChild(modules['home'].mainElement);