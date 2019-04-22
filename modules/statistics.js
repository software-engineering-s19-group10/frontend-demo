import BaseView from './baseView.js'

export default class StatisticsView extends BaseView {
  constructor() {
    super('Statistics');

    // Total list of raw Events from the API.
    this.events = null;

    // Filtered this.events with just resident names and Date() objects for 
    // when they unlocked.
    this.unlockData = null;

    // Dataset to be displayed in the chart.
    this.displayData = null;

    this.getEvents = this.getEvents.bind(this);
    this.getUnlockData = this.getUnlockData.bind(this);
    this.render = this.render.bind(this);

    this.todayFunction = this.todayFunction.bind(this);
    this.monthFunction = this.monthFunction.bind(this);
    this.yearFunction = this.yearFunction.bind(this);
  }

  // Sets up base HTML code.
  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Statistics View!'));
    this.mainElement.appendChild(message);

    // This is code to create a <p></p> HTML thing, with an ID and text too.
    const totalVisitors = document.createElement("p");
    totalVisitors.setAttribute("id", "total-visitors");
    totalVisitors.appendChild(document.createTextNode("Total Visitors: "))
    this.mainElement.appendChild(totalVisitors);

    // This is code to create a button (fill in todayFunction() below to make this do what you want).
    const todayButton = document.createElement("button");
    todayButton.appendChild(document.createTextNode("Today"));
    todayButton.addEventListener("click", this.todayFunction)
    this.mainElement.appendChild(todayButton);

    const monthButton = document.createElement("button");
    monthButton.appendChild(document.createTextNode("This week"));
    monthButton.addEventListener("click", this.monthFunction);
    this.mainElement.appendChild(monthButton);

    const yearButton = document.createElement("button");
    yearButton.appendChild(document.createTextNode("This year"));
    yearButton.addEventListener("click", this.yearFunction);
    this.mainElement.appendChild(yearButton);


    const viewAllButton = document.createElement("button");
    viewAllButton.appendChild(document.createTextNode("View All"));
    viewAllButton.addEventListener("click", this.viewAllFunction);


    const doughnutChartDiv = document.createElement("div");
    doughnutChartDiv.setAttribute("id", "doughnut-chart-container");
    const doughnutChartCanvas = document.createElement("canvas");
    doughnutChartCanvas.setAttribute("id", "my-doughnut-chart");
    doughnutChartDiv.appendChild(doughnutChartCanvas);
    this.mainElement.appendChild(doughnutChartDiv);


    const barChartDiv = document.createElement("div");
    barChartDiv.setAttribute("id", "bar-chart-container");
    const barChartCanvas = document.createElement("canvas");
    barChartCanvas.setAttribute("id", "my-bar-chart");
    barChartDiv.appendChild(barChartCanvas);
    this.mainElement.appendChild(barChartDiv);


    this.getEvents();
  }

  getEvents() {
    const userId = sessionStorage.getItem('userId');
    fetch('https://boiling-reef-89836.herokuapp.com/lock_owners/api/events/user/?owner=' + userId)
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        this.events = response.data;
        this.getUnlockData();
      })
  }

  getUnlockData() {
    const events = this.events;
    const unlockData = [];
    for (let i = 0; i < events.length; i++) {
      if (events[i].event_type.startsWith("Unlocked by")) {
        console.log(events[i]);
        unlockData.push({
          name: events[i].event_type.substring(12),
          date: new Date(events[i].timestamp)
        })
      }
    }
    this.unlockData = unlockData;
    this.render();
  }

  render() {
    console.log(this.unlockData);
    if (this.unlockData !== null) {
      // SET NUMBER OF VISITORS HERE
    }
  }

  // This can filter the unlockData to get events that happened today, and you can make the dataset out of that.
  todayFunction() {

  }

  monthFunction() {

  }

  yearFunction() {

  }

  viewAllFunction() {

  }
}