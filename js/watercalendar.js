$(document).ready(function() {
  var reminderForm = document.getElementById('setReminderForm');
  reminderForm.addEventListener('submit', eatWaterReminderInput);
});

$('addReminderModal').on('loaded.bs.modal', function(event) {
  console.log('was this called?');
})

$('addReminderModal').on('shown.bs.modal', function(event) {
  console.log('was this called?');
})

function eatWaterReminderInput(event) {
  event.preventDefault(); // Don't actually submit the form
  console.log("eating");
  // Add the new plant reminder to the calendar
  var plantName = ""; // Reset field
  var plantName =
    document.getElementById('plantNameReminderModalEntry').value;
  var frequency =
    document.getElementById('frequencyModalSelector').value;
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
    var elemText = document.createTextNode(plantName);
    newEle.appendChild(elemText);
    children[i].appendChild(newEle);
  }

  if (plantName != "") {
    console.log('hiding');
    var modalll = document.getElementById('addReminderModal');
    console.log(Object.getOwnPropertyNames(modalll));
    modalll.modal('toggle');
  }
}

/*
function switchToDayView() {
  document.location.href = "dayview.html/?";
  var plants = document.getElementById('getme').value;
  localStorage.setItem('plant', plants);
  // fill in content on dayview page
}
*/

// Custom form modal validation
/*
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
*/
