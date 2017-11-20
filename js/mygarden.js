

document.getElementById("savePlantButton").addEventListener('click', savePlant);


//upload pic option for modal to add plant
function uploadPic(){
	var x = document.getElementById("locationPic").value;
	var input = document.getElementById('locationPic');
	var image = document.createElement('img');
	image.className += "locationPicThumbnail";

	files = input.files;
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

/*
 * Add all plants and images back to the mygarden list.
 */
function rebuildPage() {
	var numSavedPlants = sessionStorage.getItem('numPlants');
	if (numSavedPlants == null || numSavedPlants > 0) {
		return;
	}

	for (var index = 0; index < numSavedPlants; index++) {
		var plantID = 'plant' + index;
		var nameOfPlant = sessionStorage.getItem(plantID);
		var plantFrequency = sessionStorage.getItem(plantID + 'Frequency');
		// image as well? var plantImageHTML = sessionStorage.getItem(plantID + 'Img');
		// Insert image into storage the same time you insert the original plant into the mygarden list
		// For plants taken from the watercalendar, find a placeholder image? Some pixel plant arrangement? or a nice big pixel AppleTree
		addPlantFromStorage(nameOfPlant, plantFrequency);
		// no giant innerHTML stamping, just adding plants, frequency, and images one by one
		// When leaving this page, save any new plants added through modal into sessionStorage in the same fashion.
		// Allow user editing? We could - would just need to update sessionStorage after they finish.
	}
}

/*
 * Add a plant and its frequency to the main myGarden list.
 */
function addPlantFromStorage(plantName, wateringFrequency) {
	var getElementById('pEntry');
}


$(document).ready(function() {
	var list = document.getElementById('pEntry');
	if (sessionStorage.getItem('myGardenEntries')) {
		list.innerHTML = sessionStorage.getItem('myGardenEntries');
	}
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
