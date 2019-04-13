const module_names = [
  'home',
  'visitor',
  'statistics',
];

const module_promises = 
  module_names.map(name => import(`./modules/${name}.js`));

const module_instances = Promise.all(module_promises)
  .then(module => new module.default());

// const view_items = document.getElementById('view-items');

// for (let module in modules)
//   view_items.appendChild(modules[module].menuElement);

// document.body.appendChild(modules['home'].mainElement);