import BaseView from './baseView.js'

export default class HomeView extends BaseView {
  constructor() {
    super('Home');
  }

  initMainElement() {
    const p = document.createElement('p');
    const par = document.createElement('par');
    const header = 'Welcome to Smart Lock!\n';
    const text = ['\
      This web application was made by Group 10 for Software Engineering.\n',
      'The GitHub repository can be found here: https://github.com/software-engineering-s19-group10". \
      A large majority of home security systems today are both expensive and complicated. \
      Two improvements to home security developed in recent years, namely keyless locks and home security cameras, \
      are both sold separately, and individually pricey. \
      Our product is a cost-effective system that integrates the keyless lock and home security camera solutions to home security. \
      This is a much needed improvement upon existing home security systems and smart locks. \
      It provides a user friendly interface with features that are helpful to the homeowners such as SMS notifications, \
      a live video feed, cloud storage (to a specified limit), visitor authentication and the Stranger Reporting Network. \
      '];

    p.appendChild(document.createTextNode(header));

    for (let i = 0; i < 2; i++){
      par.appendChild(document.createTextNode(text[i]));
    }

    this.mainElement.appendChild(p);
    this.mainElement.appendChild(par);
  }
  
  update() {}

  clear() {}
}