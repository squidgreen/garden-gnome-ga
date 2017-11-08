function eatWaterReminderInput() {
  // Add the new plant reminder to the calendar
  var plantName =
    document.getElementById('plantNameReminderModalEntry').value;
  var frequency =
    document.getElementById('repeatFrequencySelector').value;
  var date = document.getElementById('dateModalEntry').value;

  // get every nth child of calendar
  //var queryStr = 'ul.days > li:nth-child('+ frequency + 'n+' +
  //date + ') > ul';
  var queryStr = '.col-align-items-normal:nth-child(' + date +
      ')';//' > ul';
      var calendar = document.getElementById('calendar');
      var children = calendar.querySelectorAll(':nth-child(' +
          frequency + 'n+' + date + ')' + ' > ul');

        for(var i = 0; i < children.length; i++) {
        var newEle = document.createElement("li");
        var eleText =
        document.createTextNode(plantName);
        newEle.appendChild(eleText);
        children[i].appendChild(newEle);
        }

        // append the plant as a new li to
        // each days ul list
        }

        function switchToDayView() {
        document.location.href = "dayview.html/?";
        var plants = document.getElementById('getme').value;
        localStorage.setItem('plant', plants);
        // fill in content on dayview page
        }
