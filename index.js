import HomeView from './modules/home.js';
import VisitorView from './modules/visitor.js';
import StatisticsView from './modules/statistics.js';
import EventFeedView from './modules/eventFeed.js';
import SRNView from './modules/srnView.js';
import videoView from './modules/videoView.js';
import ResidentsView from './modules/residents.js';



if (sessionStorage.getItem('token') == null)
  window.location.replace('/login.html');  // Redirect to the login page
else {
  const modules = {
    'Home': new HomeView(),
    'Residents': new ResidentsView(),
    'Visitors': new VisitorView(),
    'Events': new EventFeedView(),
    'Statistics': new StatisticsView(),
    'Stranger Report Map': new SRNView(),
    'Video Feed': new videoView()
  };

  const default_view_name = 'Home';

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
        
        const current_view_name = current_main.dataset.view,
              next_view_name = main_element.dataset.view;

        modules[next_view_name].update();  // Update data in the new view
        document.title = `Smart Lock | ${next_view_name}`;  // Update the title
        document.body.replaceChild(main_element, current_main);  // Put in new view
        modules[current_view_name].clear();  // Clear data from the old view
      }
    );
    
    menu_list.appendChild(menu_element);
  }

  menu_nav.appendChild(menu_list);

  document.body.appendChild(menu_nav);

  document.body.appendChild(modules[default_view_name].mainElement);
  document.title = `Smart Lock | ${default_view_name}`
}
