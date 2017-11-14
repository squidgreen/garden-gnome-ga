/*
$(document).ready(function() {
  var reminderForm = document.getElementById('setReminderForm');
  reminderForm.addEventListener('submit', eatWaterReminderInput);
});
*/
document.getElementById("submitReminderFormBtn").onclick("eatWaterReminderInput");

$('addReminderModal').on('loaded.bs.modal', function(event) {
  console.log('was this called?');
})

$('addReminderModal').on('shown.bs.modal', function(event) {
  console.log('was this called?');
})

function eatWaterReminderInput(event) {
  //event.preventDefault(); // Don't actually submit the form
  console.log(new Date().getMonth() + 1);
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
    var foo = document.getElementById('addReminderModal');
    $('#addReminderModal').modal('hide');
    //foo.modal('hide');
    console.log(foo);
    console.log($('#addReminderModal'));
 //   console.log(Object.getOwnPropertyNames(modalll));
//    modalll.modal('hide');
  }
}

/**
 * Populates the water calendar on watercalendar.html based on the current date.
 */
(function populateCalendar() {
  //console.log(cal);
  // To start at the beginning of each month when displaying calendar
  var currentDateObj = new Date();
  var dateObj = new Date(currentDateObj.getFullYear(), currentDateObj.getMonth());

  var month = dateObj.getMonth();
  var daysInMonth = getDaysInMonth(month);

  var frag = document.createDocumentFragment(); // append to "cal" when done creating children

  // Create elements here and clone them for efficieny
  var newDateEntryDivElem = document.createElement('div');
  var strongElem = document.createElement('strong');
  var ulElem = document.createElement('ul');
  var strongClone;
  var divClone;
  var ulClone;

  var cal = document.getElementById('calendar');

  var daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  //console.log("1st of month falls on a " + dateObj.getDay());
  //var startWeekDay = daysOfWeek[dateObj.getDay()];
  //console.log(startWeekDay);

  for (var i = 0; i < daysInMonth; i++) {
    // two counters. one for which day of the week we're stamping and one for
    // the numerical date
    //var dateContent = document.createElement('strong');
    var text = daysOfWeek[(dateObj.getDay() + i) % 7] + " " + (i + 1);
    console.log(text);
    var dateText = document.createTextNode(text);

    strongClone = strongElem.cloneNode();
    strongClone.appendChild(dateText);

    //var newDateEntry = document.createElement("div");
    divClone = newDateEntryDivElem.cloneNode();
    divClone.className = 'col';
    ulClone = ulElem.cloneNode();

    divClone.appendChild(strongClone);
    divClone.appendChild(ulClone);
    frag.appendChild(divClone);
  }
  cal.appendChild(frag);

})();

function getDaysInMonth(month) {
  if (month == 1) { // february
    return 28; // who cares about leap years in 2017
  } else if (month <= 6) {
    if (month % 2 == 0) {
      return 31;
    } else {
      return 30;
    }
  } else {
    if (month % 2 == 0) {
      return 30;
    } else {
      return 31;
    }
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
