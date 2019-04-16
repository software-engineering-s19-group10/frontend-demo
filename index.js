import HomeView from './modules/home.js'
import VisitorView from './modules/visitor.js'
import StatisticsView from './modules/statistics.js'
import SRNView from './modules/srnView.js';

if (sessionStorage.getItem('token') == null)
  window.location.replace('/login.html');  // Redirect to the login page
else {
  const modules = {
    'home': new HomeView(),
    'visitor': new VisitorView(),
    'statistics': new StatisticsView(),
    'stranger_report': new SRNView(),
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
