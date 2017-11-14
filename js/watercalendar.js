/*
$(document).ready(function() {
  var reminderForm = document.getElementById('setReminderForm');
  reminderForm.addEventListener('submit', eatWaterReminderInput);
});
*/
document.getElementById("submitReminderFormBtn").addEventListener('click', eatWaterReminderInput);

function eatWaterReminderInput(event) {
  //event.preventDefault(); // Don't actually submit the form
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
    var foo = document.getElementById('addReminderModal');
    $('#addReminderModal').modal('hide');
    //foo.modal('hide');
 //   console.log(Object.getOwnPropertyNames(modalll));
//    modalll.modal('hide');
  }

  var genHTML = calendar.innerHTML;
  sessionStorage.setItem('calendarPopulatedHTML', genHTML);
}

/**
 * Populates the water calendar on watercalendar.html based on the current date.
 */
(function populateCalendar() {
  if (sessionStorage.getItem('calendarPopulatedHTML')) {
    cal = document.getElementById('calendar');
    cal.innerHTML = sessionStorage.getItem('calendarPopulatedHTML');
    return; // Exit early
  }
  // append to "cal" when done creating children
  var frag = document.createDocumentFragment();
  // Create dom elements here and clone them for efficieny
  var newDateEntryDivElem = document.createElement('div');
  var strongElem = document.createElement('strong');
  var ulElem = document.createElement('ul');
  var strongClone;
  var divClone;
  var ulClone;

  // To start at the 1st of each month when displaying calendar, create a date
  // object passing only the current month and year
  var currentDateObj = new Date();
  var dateObj = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth());

  var month = dateObj.getMonth();
  var daysInMonth = getDaysInMonth(month);

  var daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  for (var i = 0; i < daysInMonth; i++) {
    // two counters. one for which day of the week we're stamping and one for
    // the numerical date
    var text = daysOfWeek[(dateObj.getDay() + i) % 7] + " " + (i + 1);
    var dateText = document.createTextNode(text);

    strongClone = strongElem.cloneNode();
    strongClone.appendChild(dateText);

    divClone = newDateEntryDivElem.cloneNode();
    divClone.className = 'col';
    ulClone = ulElem.cloneNode();

    divClone.appendChild(strongClone);
    divClone.appendChild(ulClone);
    frag.appendChild(divClone);
  }
  var cal = document.getElementById('calendar');
  cal.appendChild(frag);

  // Save the generated html per user session
  var genHTML = cal.innerHTML;
  sessionStorage.setItem('calendarPopulatedHTML', genHTML);
})(); // () Execute this function as soon as the user reaches the page

function getDaysInMonth(month) {
  if (month == 1) { // february
    return 28; // who cares about leap years in 2017
  } else if (month <= 6) {
    return (month % 2) == 0 ? 31 : 30;
  } else {
    return (month % 2) == 0 ? 30 : 31;
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
