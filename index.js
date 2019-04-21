import HomeView from './modules/home.js'
import VisitorView from './modules/visitor.js'
import StatisticsView from './modules/statistics.js'
import EventFeedView from './modules/eventFeed.js';
import SRNView from './modules/srnView.js';
import videoView from './modules/videoView.js';


if (sessionStorage.getItem('token') == null)
  window.location.replace('/login.html');  // Redirect to the login page
else {
  const modules = {
    'Home': new HomeView(),
    'Visitors': new VisitorView(),
    'Events': new EventFeedView(),
    'Statistics': new StatisticsView(),
    'Stranger Report Map': new SRNView(),
    'Video Feed': new videoView()
  };

  const menu_nav = document.createElement('nav');
  menu_nav.setAttribute('id', 'side-menu');

  const menu_list = document.createElement('ul');
  menu_list.setAttribute('id', 'view-items');

  for (let mod in modules) {
    const main_element = modules[mod].mainElement,
          menu_element = modules[mod].menuElement;

    menu_element.addEventListener(
      'click', 
      () => {
        const current_main = document.getElementById('main-view');

        // Block against swapping to current view
        if (current_main === main_element) return;
        
        modules[main_element.dataset.view].update();
        document.body.replaceChild(main_element, current_main);
        modules[current_main.dataset.view].clear();
      }
    );
    
    menu_list.appendChild(menu_element);
  }

  menu_nav.appendChild(menu_list);

  document.body.appendChild(menu_nav);

  document.body.appendChild(modules['Home'].mainElement);
}
