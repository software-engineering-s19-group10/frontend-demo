import HomeView from './modules/home.js'
import VisitorView from './modules/visitor.js'
import StatisticsView from './modules/statistics.js'
import EventFeedView from './modules/eventFeed.js';

if (sessionStorage.getItem('token') == null)
  window.location.replace('/login.html');  // Redirect to the login page
else {
  const modules = {
    'home': new HomeView(),
    'visitor': new VisitorView(),
    'events': new EventFeedView(),
    'statistics': new StatisticsView(),
  };

  const menu_nav = document.createElement('nav');
  menu_nav.setAttribute('id', 'side-menu');

  const menu_list = document.createElement('ul');
  menu_list.setAttribute('id', 'view-items');

  for (let module in modules)
    menu_list.appendChild(modules[module].menuElement);

  menu_nav.appendChild(menu_list);

  document.body.appendChild(menu_nav);

  document.body.appendChild(modules['home'].mainElement);
}
