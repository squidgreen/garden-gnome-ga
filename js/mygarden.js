

document.getElementById("savePlantButton").addEventListener('click', savePlant);


//upload pic option for modal to add plant
function uploadPic(){
	var x = document.getElementById("locationPic").value;
	var input = document.getElementById('locationPic');
	var image = document.createElement('img');
	image.className += "locationPicThumbnail";

	files = input.files;
	image.src = window.URL.createObjectURL(files[0]);

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

function savePlant(){
	var pName = document.getElementById('plantNameMyGardenModalEntry').value;

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

}
