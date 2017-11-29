var wc = {}; // global variable access
wc.month = new Date().getMonth();
document.getElementById('submitReminderFormBtn').addEventListener('click', eatWaterReminderInput);
document.getElementById('deleteRemindersTrashIcon').addEventListener('click', function() {
  tracker = ga.getAll()[0];
  tracker.send('event', 'show delete option', 'click');
})

/**
 * Display information entered into the plant reminder modal on the calendar.
 * Called when the submit button on the modal is clicked.
 */
function eatWaterReminderInput(event) {
  //event.preventDefault(); // Don't actually submit the form
  // Add the new plant reminder to the calendar
  var plantName =
    document.getElementById('plantNameReminderModalEntry').value;
  var frequency =
    document.getElementById('frequencyModalSelector').value;
  var date = document.getElementById('dateModalEntry').value;

  if (date == "") { // Default to 1
    date = 1;
  }

  // get every nth child of calendar
  var queryStr = '.col-align-items-normal:nth-child(' + date + ')'; //' > ul';
  var calendar = document.getElementById('calendar');
  var children = calendar.querySelectorAll(':nth-child(' + frequency + 'n+' + date + ')' + ' > ul');

  // append the plant as a new li to each days ul list
  for(var i = 0; i < children.length; i++) {
    var newEle = document.createElement("li");
    newEle.className = 'plantEntry';
    var elemText = document.createTextNode(plantName + " ");
    newEle.appendChild(elemText);

    // Append an icon to each li, initially hidden, that can be used to delete the item
    var newIEle = document.createElement('i');
    newIEle.className += 'fa fa-minus-circle';
    newIEle.style.display = 'none';

    newIEle.addEventListener('click', removePlantEntry);
    newEle.appendChild(newIEle);
    children[i].appendChild(newEle);
  }

  var daysInCurrentMonth = getDaysInMonth(wc.month);

  if (plantName != "" && (date > 0 && date <= daysInCurrentMonth)) {
    // Reset error messages on the form
    var form = document.getElementById('setReminderForm');
    form.classList.add('was-validated');
    $('#addReminderModal').modal('hide');
    recordPlantAdded(plantName, frequency);
  }

  hideDeleteIcons();
  displayTrashCan();
  //document.getElementById('setReminderForm').reset(); // Reset field
  savePageState();
}

// TODO TODO TODO
/*
  We could make this work by storing a date when the user adds something
  to their garden. But they probably won't want to do that?
  Or, and I think this is the best option - allow the user to edit the dates on
  the calendar. You would need to copy parts of eatWaterReminderInput().

  We also would need to edit parts of this page's javascript file to restore plants
  similarly to how they're restored in mygarden.js. Right now this page uses
  savePageState(), which just saves all the html, and then we reload all the html
  from storage, but we should change it to be like rebuildMyGardenPage(), where
  it takes each plant out of storage, one by one and then puts it on the calendar.
  We'd need to add a new field into sessionStorage when we save a plant, so that
  we know its original date.

  Sort of ignore this function, everything below line 84 needs to change slightly.
 */
function rebuildWaterCalendarPage() {
  var numPlants = sessionStorage.getItem('numPlants');
  for (var index = 0; index < numPlants; index++) {
    plantID = 'plant' + index;
    var plantName = sessionStorage.getItem(plantID);
    var frequency = sessionStorage.getItem(plantID + 'Frequency');
// TODO    var date = document.getElementById('dateModalEntry').value;

    if (date == "") { // Default to 1
      date = 1;
    }

    // get every nth child of calendar
    var queryStr = '.col-align-items-normal:nth-child(' + date + ')'; //' > ul';
    var calendar = document.getElementById('calendar');
    var children = calendar.querySelectorAll(':nth-child(' + frequency + 'n+' + date + ')' + ' > ul');

    // append the plant as a new li to each days ul list
    for(var i = 0; i < children.length; i++) {
      var newEle = document.createElement("li");
      newEle.className = 'plantEntry';
      var elemText = document.createTextNode(plantName + " ");
      newEle.appendChild(elemText);

      // Append an icon to each li, initially hidden, that can be used to delete the item
      var newIEle = document.createElement('i');
      newIEle.className += 'fa fa-minus-circle';
      newIEle.style.display = 'none';

      newIEle.addEventListener('click', removePlantEntry);
      newEle.appendChild(newIEle);
      children[i].appendChild(newEle);
    }

    var daysInCurrentMonth = getDaysInMonth(wc.month);

    if (plantName != "" && (date > 0 && date <= daysInCurrentMonth)) {
      // Reset error messages on the form
      var form = document.getElementById('setReminderForm');
      form.classList.add('was-validated');
      $('#addReminderModal').modal('hide');
      recordPlantAdded(plantName, frequency);
    }

    hideDeleteIcons();
    displayTrashCan();
    //document.getElementById('setReminderForm').reset(); // Reset field
    savePageState();
  }
}

/*
 * Save plant information added to the calendar in sessionStorage, so that it
 * can be added to the myGarden page.
 */
function recordPlantAdded(plantName, frequency) {
  // check how many things are in storage.
  // differentiate each plant by the order it was added to sessionStorage
  var numPlantsStr = sessionStorage.getItem('numPlants');
  if (numPlantsStr == null) { // First entry
    sessionStorage.setItem('numPlants', 0);
    numPlantsStr = sessionStorage.getItem('numPlants');
  }

  var numPlants = parseInt(numPlantsStr, 10);
  if (isNaN(numPlants)) {
    // TODO something
    console.log("ERROR ERRROR ERRRROR, string found in local storage for numPlants is NaN");
    return;
  }

  // Store the name of the plant
  var plantID = 'plant' + numPlants;
  sessionStorage.setItem(plantID, plantName);
  sessionStorage.setItem(plantID + 'Frequency', frequency);

  // Increment storage
  numPlants += 1;
  sessionStorage.setItem('numPlants', numPlants.toString());
}

/**
 * Renew event listeners on plant entry removal icons.
 */
function addRemovalListeners() {
//  var icons = document.getElementsByClassName('fa fa-minus-circle');
  $('.fa').on('click', removePlantEntry);
}

/**
 * Populates the water calendar on watercalendar.html based on the current date.
 */
(function populateCalendar() {
  if (sessionStorage.getItem('calendarPopulatedHTML')) {
    cal = document.getElementById('calendar');
    cal.innerHTML = sessionStorage.getItem('calendarPopulatedHTML');

    // The listener information isn't stored in the HTML, so it must be readded
    // each time the page reloads
    addRemovalListeners();
    displayTrashCan();
    hideDeleteIcons();
    return; // Exit early
  }
  // append to "cal" when done creating children
  var frag = document.createDocumentFragment();
  // Create dom elements here and clone them for efficieny
  var newDateEntryDivElem = document.createElement('div');
  var strongElem = document.createElement('p');
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

  var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (var i = 0; i < daysInMonth; i++) {
    // two counters. one for which day of the week we're stamping and one for
    // the numerical date
	if(i!=0 && i%7 == 0){
		var element = document.createElement('hr');
		element.className = "styleBr";
		strongClone = strongElem.cloneNode();
		strongClone.appendChild(element);

		divClone = newDateEntryDivElem.cloneNode();

		divClone.appendChild(strongClone);
		frag.appendChild(divClone);
	}

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
  savePageState();
})(); // () Execute this function as soon as the user reaches the page

/**
 * Display a trash can icon to enable water reminder deletion.
 */
function displayTrashCan() {
  var trashCan = document.getElementById('deleteRemindersTrashIcon');
  var aPlantEntry = document.querySelector('#calendar > div > ul > li');

  if (aPlantEntry) {
    trashCan.style.display = 'inline';
  } else if (!aPlantEntry) {
    trashCan.style.display = 'none';
    var tooltip = document.querySelector('.tooltiptext');
    tooltip.style.visibility = "hidden";
  }
  addDeletionListener();
  // check if plantEntrys are on page
}

function addDeletionListener() {
  var trash = document.getElementById('deleteRemindersTrashIcon');
  trash.addEventListener('click', toggleDeleteIcons);
}

function getDaysInMonth(month) {
  if (month == 1) { // february
    return 28; // who cares about leap years in 2017
  } else if (month <= 6) {
    return (month % 2) == 0 ? 31 : 30;
  } else {
    return (month % 2) == 0 ? 30 : 31;
  }
}

function hideDeleteIcons() {
  var plantElements = document.querySelectorAll('.plantEntry > i');
  for (var i = 0; i < plantElements.length; i++) {
    var currentState = plantElements[i].style.display;
    if (currentState == 'inline') {
      plantElements[i].style.display = 'none';
    }
  }
  savePageState();
}

function toggleDeleteIcons() {
  var plantElements = document.querySelectorAll('.plantEntry > i');
  var tooltip = document.querySelector('.tooltiptext');

  for (var i = 0; i < plantElements.length; i++) {
    var currentState = plantElements[i].style.display;
    if (currentState == 'inline') {
      plantElements[i].style.display = 'none';
      tooltip.style.visibility = "hidden";
    } else {
      // Insert popup here that warns user they will delete all reminders in a series
      tooltip.style.visibility = "visible";
      plantElements[i].style.display = 'inline';
    }
  }
  savePageState();
}

/**
 * Remove plants from calendar.
 * @event The element that was clicked
 */
function removePlantEntry(event) {
  // need to get the parent 'ul' that holds the 'li' that holds the 'i' to remove it
  // Find the right elements to remove by matching the text inside the 'li'
  var textOfLi = event.target.parentNode.innerText;
  var listItems = document.querySelectorAll('#calendar > div li');
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].innerText == textOfLi) {
      //then get the parent of the li and remove the li
      listItems[i].parentNode.removeChild(listItems[i]);
    }
  }
  var aPlantEntry = document.querySelector('#calendar > div > ul > li');
  displayTrashCan();

  savePageState();
}

/*
 * Custom form modal validation. Activated if information present at the time of
 * submission is invalid or incomplete.
 */
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

function savePageState() {
  // Save updated HTML
  var calendar = document.getElementById('calendar');
  var genHTML = calendar.innerHTML;
  sessionStorage.setItem('calendarPopulatedHTML', genHTML);
}
