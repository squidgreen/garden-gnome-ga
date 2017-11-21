document.getElementById("savePlantButton").addEventListener('click', savePlant);

$(document).ready(function() {
	/*
	var list = document.getElementById('pEntry');
	if (sessionStorage.getItem('myGardenEntries')) {
		list.innerHTML = sessionStorage.getItem('myGardenEntries');
	}
	*/
	rebuildMyGardenPage();
})

/*
 * Add all plants and images back to the mygarden list.
 */
function rebuildMyGardenPage() {
	var numSavedPlants = sessionStorage.getItem('numPlants');
	if (numSavedPlants == null || numSavedPlants == 0) {
		console.log('no numSavedPlants info in storage');
		return;
	}

	for (var index = 0; index < numSavedPlants; index++) {
		var plantID = 'plant' + index;
		var nameOfPlant = sessionStorage.getItem(plantID);
		var plantWateringFrequency = sessionStorage.getItem(plantID + 'Frequency');
		// Insert image into storage the same time you insert the original plant into the mygarden list
		addPlantFromStorage(index, nameOfPlant, plantWateringFrequency);
		// no giant innerHTML stamping, just adding plants, frequency, and images one by one
		// When leaving this page, save any new plants added through modal into sessionStorage in the same fashion.
		// Allow user editing? We could - would just need to update sessionStorage after they finish.
	}
}

/*
 * Add a plant and its frequency to the main myGarden list.
 */
function addPlantFromStorage(plantID, plantName, wateringFrequency) {
	var plantList = document.getElementById('pEntry');

	// Make a container with two sections containing a plant's information
	var plantInfoContainer = document.createElement('div');
	plantInfoContainer.classList.add("plantContentContainer");

	var plantInfoLeft = document.createElement('div');
	plantInfoLeft.classList.add("plantInfoLeftContent");
	var plantInfoRight = document.createElement('div');
	plantInfoRight.classList.add("plantInfoRightContent");

	plantInfoContainer.appendChild(plantInfoLeft);
	plantInfoContainer.appendChild(plantInfoRight);

	var newPlantListEntry = document.createElement('li');

	// The Image
	var thumbnail = document.createElement('img');
	thumbnail.id = "myGardenPlantImg-" + plantID;
	console.log("addPlantFromStorage: Getting " + "myGardenPlantImg-" + plantID);
	imgFile = sessionStorage.getItem('myGardenPlantImg-' + plantID);
	if (imgFile) {
		thumbnail.src = imgFile;
	} else {
		console.log(imgFile);
		thumbnail.src = 'image/sunflower.jpg';
	}

	// Hidden image file input field
	var browseFileInputID = "selectPlantImgBtn-" + plantID;
	var plantPicInput = document.createElement('input');
	plantPicInput.type = "file";
	plantPicInput.id = browseFileInputID;
	plantPicInput.name = browseFileInputID;
	plantPicInput.classList.add('plantFileInputField');

	// Button to fire input field action
	var plantPicInputDecoyBtn = document.createElement('button');
	plantPicInputDecoyBtn.type = "button";
	plantPicInputDecoyBtn.classList.add('fileInputDecoyBtn');
	plantPicInputDecoyBtn.classList.add('btn', 'btn-primary');
	plantPicInputDecoyBtn.appendChild(document.createTextNode("Change Image"));
	plantPicInputDecoyBtn.addEventListener('click', function() {
		document.getElementById(browseFileInputID).click();
	});

	$(document).ready(function () {
		document.getElementById(browseFileInputID).addEventListener('change', changeThumbnail);
	})

	// Plant name
	var entryData = document.createTextNode(plantName);

	// Watering Frequency
	var wateringInfoElement = document.createElement('p');
	var wateringInfoText;
	if (parseInt(wateringFrequency) == 1) {
		wateringInfoText = ' - Water every day';
	} else if (parseInt(wateringFrequency) == 7 ) {
		wateringInfoText = ' - Water once a week';
	} else {
		wateringInfoText = ' - Water every ' + wateringFrequency + ' days';
	}
	var wateringInfoTextNode = document.createTextNode(wateringInfoText);
	wateringInfoElement.appendChild(wateringInfoTextNode);

	plantInfoLeft.appendChild(thumbnail);
	plantInfoLeft.appendChild(plantPicInput);
	plantInfoLeft.appendChild(plantPicInputDecoyBtn);
	plantInfoRight.appendChild(entryData);
	plantInfoRight.appendChild(wateringInfoElement);

	newPlantListEntry.appendChild(plantInfoContainer);
	plantList.appendChild(newPlantListEntry);
}

/*
 * Fired when the user chooses a new file to represent a plant entry. Swap out
 * the current image with the chosen one. Identify which 'img' element to
 * change via the id of the current input element.
 */
function changeThumbnail(event) {
	// var browseFileInputID = "selectPlantImgBtn-" + plantID;
//	var newImage = document.getElementById()
	console.log(event);
	console.log(event.target.id);
	console.log(event.target.value);

	var plantID = event.target.id[event.target.id.length - 1];

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var files = event.target.files;
		var thumbnail = document.getElementById("myGardenPlantImg-" + plantID);
		console.log(files[0]);
		//thumbnail.src = files[0];
		var reader = new FileReader();
		reader.addEventListener('load', (function (fileObj) {
			thumbnail.src = reader.result;	// result contains the file's data as a base64 encoded string
			sessionStorage.setItem('myGardenPlantImg-' + plantID, reader.result);
			console.log("changeThumbnail: setting myGardenPlantImg-" + plantID);// sessionStorage.getItem('myGardenPlantImg-' + plantID));
//	thumbnail.src = sessionStorage.getItem('myGardenPlantImg-' + plantID') //window.createObjectURL(imgFile);	// TODO work in progress - assume we can save the file as html in sessionStorage
		}), false);
		reader.readAsDataURL(files[0]);
	} else {
		console.log("file input not supported???");
	}
}

function savePlant() {
	var list = document.getElementById('pEntry');
	var pName = document.getElementById('plantNameMyGardenModalEntry').value;
//	sessionStorage.setItem('plantNameMyGardenModalEntry', pName);
	// Save the plants info into local storage
	var plantID = sessionStorage.getItem('numPlants');
	recordPlantAdded(pName, 0);
	console.log(pName);

	// Before adding plant and image to page, save the image in localStorage .
	var inputField = document.getElementById('locationPicker');
	var files = inputField.files;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var reader = new FileReader();
		reader.addEventListener('load', (function (fileObj) {
			sessionStorage.setItem('myGardenPlantImg-' + plantID, reader.result);
			console.log("savePlant: setting myGardenPlantImg-" + plantID);// sessionStorage.getItem('myGardenPlantImg-' + plantID));
		}), false);
		reader.readAsDataURL(files[0]);
	} else {
		console.log("file input not supported???");
	}

	// Add it to the page
	$(document).ready(function() {
		addPlantFromStorage(plantID, pName, 0);
		$('#addMyGardenPlantModal').modal('hide');
	})


/*
	//check for duplicates. Duplicates not allowed
	if (pName == list) {
		alert ("That plant is already included in the list - please enter another plant");
		return false;
	}

	var list = document.getElementById('pEntry');
	var newLi = document.createElement('li');
	var newPlantEntry = document.createTextNode(pName);

	image = uploadPic();
	newLi.appendChild(image);

	newLi.appendChild(newPlantEntry);
	list.appendChild(newLi);

	var savedHTML = list.innerHTML;
	sessionStorage.setItem('myGardenEntries', savedHTML);
	*/
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

/*
 * Applies an event listener to the image element in a plant entry.
 */
function addListenerForImage() {
//	document.getElement
}

//upload pic option for modal to add plant
function uploadPic(){
	var x = document.getElementById("locationPicker").value;
	var input = document.getElementById('locationPicker');
	var image = document.createElement('img');
	image.className += "locationPicThumbnail";

	files = input.files;
	console.log(files);
	console.log(files[0]);
	if (files.length != 0) {
		image.src = window.URL.createObjectURL(files[0]);
	}

	return image;
//	document.body.appendChild(image);

	/*
	console.log(x);
	var txt = "";
	if ('files' in x) {
		if (x.files.length == 0) {
			txt = "Select a file";
		} else {
			for (var i = 0; i < x.files.length; i++) {
				txt += "<br><strong>" + (i+1) + ". file</strong><br>";
				var file = x.files[i];
				if ('name' in file) {
					txt += "name: " + file.name + "<br>";
				}
				if ('size' in file) {
					txt += "size: " + file.size + " bytes <br>";
				}
			}
		}
	}
	*/
//	document.getElementById ("demo").innerHTML = txt;
}
