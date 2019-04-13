const module_names = [
  'home',  // The first view to show
  'visitor',
  'statistics',
];

const view_items = document.getElementById('view-items');

// Equivalent of the Python zip function
// Arguments are arrays, matches elements of same index
const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]));

// Import all of the modules in module_names
const module_promises = 
  module_names.map(name => import(`./modules/${name}.js`));

const views = {};  // We will store all views in an object (dictionary)

const module_instances = Promise.all(module_promises)
  // Match each module object with its name as a string
  .then(modules => zip(module_names, modules).forEach(([name, mod]) => {
      let view = new mod.default;  // Instantiate the view
      views[name] = view;  // Add it to the views object
      view_items.appendChild(view.menuElement);  // Append menu item to menu

      if (name == module_names[0])  // Show the default view
        document.body.appendChild(view.mainElement);
    })
  );