var reminderBtn = document.getElementById('setReminderForm');
reminderBtn.addEventListener('submit', eatWaterReminderInput);

function eatWaterReminderInput() {
  // Add the new plant reminder to the calendar
  var plantName =
    document.getElementById('plantNameReminderModalEntry').value;
  var frequency =
    document.getElementById('repeatFrequencySelector').value;
  var date = document.getElementById('dateModalEntry').value;
  if (date == "") {
    date = 1;
  }

  // get every nth child of calendar
  var queryStr = '.col-align-items-normal:nth-child(' + date + ')'; //' > ul';
  var calendar = document.getElementById('calendar');
  var children = calendar.querySelectorAll(':nth-child(' + frequency + 'n+' + date + ')' + ' > ul');

  // append the plant as a new li to each days ul list
  for(var i = 0; i < children.length; i++) {
    var newEle = document.createElement("li");
    var eleText = document.createTextNode(plantName);
    newEle.appendChild(eleText);
    children[i].appendChild(newEle);
  }

}

function switchToDayView() {
  document.location.href = "dayview.html/?";
  var plants = document.getElementById('getme').value;
  localStorage.setItem('plant', plants);
  // fill in content on dayview page
}

(function() {
  'use strict';

  window.addEventListener('load', function() {
    var form = document.getElementById('setReminderForm');
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  }, false);
})();
