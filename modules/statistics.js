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

    // this.getEvents = this.getEvents.bind(this);
    // this.getUnlockData = this.getUnlockData.bind(this);
    // this.render = this.render.bind(this);

    // this.todayFunction = this.todayFunction.bind(this);
    // this.monthFunction = this.monthFunction.bind(this);
    // this.yearFunction = this.yearFunction.bind(this);

    this.getEvents();
  }

  // Sets up base HTML code.
  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Statistics'));

    this.mainElement.appendChild(message);

    // This is code to create a <p></p> HTML thing, with an ID and text too.
    const totalVisitors = document.createElement("p");
    totalVisitors.setAttribute("id", "total-visitors");
    totalVisitors.appendChild(document.createTextNode("Total Visitors: "))
    this.mainElement.appendChild(totalVisitors);

    // This is code to create a button (fill in todayFunction() below to make this do what you want).
    const todayButton = document.createElement("button");
    todayButton.appendChild(document.createTextNode("Today"));
    todayButton.addEventListener(
      'click',
      () => this.todayFunction()
    );
    this.mainElement.appendChild(todayButton);

    const monthButton = document.createElement("button");
    monthButton.appendChild(document.createTextNode("This week"));
    monthButton.addEventListener(
      'click',
      () => this.monthFunction()
    );
    this.mainElement.appendChild(monthButton);

    const yearButton = document.createElement("button");
    yearButton.appendChild(document.createTextNode("This year"));
    yearButton.addEventListener(
      'click',
      () => this.yearFunction()
    );
    this.mainElement.appendChild(yearButton);

    const chartContainer = document.createElement('div');
    chartContainer.setAttribute('id', 'chart-container');

    const doughnutChartDiv = document.createElement("div");
    const doughnutChartCanvas = document.createElement("canvas");
    doughnutChartCanvas.setAttribute("id", "my-doughnut-chart");
    doughnutChartDiv.appendChild(doughnutChartCanvas);

    this.doughnutChartCanvas = doughnutChartCanvas;

    const barChartDiv = document.createElement("div");
    const barChartCanvas = document.createElement("canvas");
    barChartCanvas.setAttribute("id", "my-bar-chart");
    barChartDiv.appendChild(barChartCanvas);

    this.barChartCanvas = barChartCanvas;

    chartContainer.appendChild(doughnutChartDiv);
    chartContainer.appendChild(barChartDiv);

    this.mainElement.appendChild(chartContainer);
  }

  getEvents() {
    const userId = sessionStorage.getItem('userId');
    fetch(`https://boiling-reef-89836.herokuapp.com/lock_owners/api/events/user/?owner=${userId}`)
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
      console.log(this.countNames('day', this.unlockData));
    }
  }

  getUnitFunc(unit) {
    switch (unit) {
      case 'day':
        return 'getDate';
      case 'month':
        return 'getMonth';
      case 'year':
        return 'getFullYear';
    }
  }

  countNames(unit, events) {
    const names = {};

    const unit_func_name = this.getUnitFunc(unit);

    const current_date = new Date(),
          current_unit_value = current_date[unit_func_name]();

    for (let event of events) {
      const date_obj = event.date;

      if (date_obj[unit_func_name]() == current_unit_value) {
        const name = event.name;

        if (name in names)
          names[name]++;
        else
          names[name] = 1;
      }
    }

    return names;
  }

  countHours(unit, events) {
    const hours = new Array(24);

    const unit_func_name = this.getUnitFunc(unit);

    for (let i = 0; i < 24; i++)
      hours[i] = 0;

    const current_date = new Date(),
          current_unit_value = current_date[unit_func_name]();

    for (let event of events) {
      const date_obj = event.date;

      if (date_obj[unit_func_name]() == current_unit_value) {  
        hours[date_obj.getHours()]++;
      }
    }

    return hours;
  }

  plotData(unit) {
    const hours_array = this.countHours(unit, this.unlockData);
    const names_dict = this.countNames(unit, this.unlockData);

    new Chart(this.doughnutChartCanvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: Object.values(names_dict)
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(names_dict)
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });

    new Chart(this.barChartCanvas, {
        type: 'bar',
        data: {
          labels: ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"],
          datasets: [
            {
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: hours_array
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Unlocks for Today'
          }
        }
    });
  }

  // This can filter the unlockData to get events that happened today, and you can make the dataset out of that.
  todayFunction() {
    this.plotData('day');
  }

  monthFunction() {
    this.plotData('month');
  }

  yearFunction() {
    this.plotData('year');
  }
}
