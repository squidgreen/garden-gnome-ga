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
		var plantImg = sessionStorage.getItem(plantID + "Img");
		// image as well? var plantImageHTML = sessionStorage.getItem(plantID + 'Img');
		// Insert image into storage the same time you insert the original plant into the mygarden list
		// For plants taken from the watercalendar, find a placeholder image? Some pixel plant arrangement? or a nice big pixel AppleTree
		addPlantFromStorage(index, nameOfPlant, plantWateringFrequency, plantImg);
		// no giant innerHTML stamping, just adding plants, frequency, and images one by one
		// When leaving this page, save any new plants added through modal into sessionStorage in the same fashion.
		// Allow user editing? We could - would just need to update sessionStorage after they finish.
	}
}

/*
 * Add a plant and its frequency to the main myGarden list.
 */
function addPlantFromStorage(plantID, plantName, wateringFrequency, imgFile) {
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
	thumbnail.id = "myGardenPlantPic-" + plantID;
//	thumbnail.src = window.createObjectURL(imgFile);	// TODO work in progress - assume we can save the file as html in sessionStorage
	//thumbnail.addEventListener('click', chooseImageFile);

	// Image input field
	var browseFileInputID = "selectPlantImgBtn-" + plantID;
	var plantPicInput = document.createElement('input');
	plantPicInput.type = "file";
	plantPicInput.id = browseFileInputID;
	plantPicInput.name = browseFileInputID;
	plantPicInput.classList.add('plantFileInputFields');
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

	var elementIDNum = event.target.id[event.target.id.length - 1];

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var files = event.target.files;
		var thumbnail =  document.getElementById("myGardenPlantPic-" + elementIDNum);
		console.log(files[0]);
		//thumbnail.src = files[0];
		var reader = new FileReader();
		reader.onload(function (fileObj) {

		})
	} else {
		console.log("file input not supported???");
	}
}

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

/*
 * Applies an event listener to the image element in a plant entry.
 */
function addListenerForImage() {
//	document.getElement
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
