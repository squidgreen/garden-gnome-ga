

document.getElementById("savePlantButton").addEventListener('click', savePlant);


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
		// image as well? var plantImageHTML = sessionStorage.getItem(plantID + 'Img');
		// Insert image into storage the same time you insert the original plant into the mygarden list
		// For plants taken from the watercalendar, find a placeholder image? Some pixel plant arrangement? or a nice big pixel AppleTree
		addPlantFromStorage(nameOfPlant, plantWateringFrequency);
		// no giant innerHTML stamping, just adding plants, frequency, and images one by one
		// When leaving this page, save any new plants added through modal into sessionStorage in the same fashion.
		// Allow user editing? We could - would just need to update sessionStorage after they finish.
	}
}

/*
 * Add a plant and its frequency to the main myGarden list.
 */
function addPlantFromStorage(plantName, wateringFrequency) {
	var plantList = document.getElementById('pEntry');

	var newPlantListEntry = document.createElement('li');

	var thumbnail = document.createElement('img');
	var entryData = document.createTextNode(plantName);

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
	newPlantListEntry.appendChild(thumbnail);
	newPlantListEntry.appendChild(entryData);
	newPlantListEntry.appendChild(wateringInfoElement);

	plantList.appendChild(newPlantListEntry);
}

$(document).ready(function() {
	/*
	var list = document.getElementById('pEntry');
	if (sessionStorage.getItem('myGardenEntries')) {
		list.innerHTML = sessionStorage.getItem('myGardenEntries');
	}
	*/
	rebuildMyGardenPage();
})

function savePlant() {
	var list = document.getElementById('pEntry');
	var pName = document.getElementById('plantNameMyGardenModalEntry').value;
//	sessionStorage.setItem('plantNameMyGardenModalEntry', pName);

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
	$('#addMyGardenPlantModal').modal('hide');
}

//upload pic option for modal to add plant
function uploadPic(){
	var x = document.getElementById("locationPic").value;
	var input = document.getElementById('locationPic');
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
