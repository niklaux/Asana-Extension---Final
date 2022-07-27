var namesArr = [];
var timeArr = [];
var combined = [];

function populateName(){
  var getName = document.getElementsByClassName('AssigneeWithNameDisplay SpreadsheetAssigneeCell-assigneeDisplay');
  var getTime = document.getElementsByClassName('SpreadsheetCell SpreadsheetPotsCell SpreadsheetTaskRow-tagsCell');
  var loopLength = document.getElementsByClassName("TaskGroup--withHeader TaskGroup")[0].getElementsByClassName("AssigneeWithNameDisplay SpreadsheetAssigneeCell-assigneeDisplay").length;
  
  //get all names
  for (var i = 0; i < loopLength; i++) {
    if (getName[i].innerText == "") {
      namesArr[i] = "";
    } else {
      var fullName = (getName[i].innerText.replace( /\n/g, " " ).split( " "));
      namesArr.push(fullName.pop());
    }
  };

  //get all hours in an array
  for (var i = 0; i < loopLength; i++) {
    if (getTime[i].innerText == "") {
      timeArr[i] = 0;
    } else {
      timeArr.push(Number(getTime[i].innerText.slice(0,1)));
    }    
  };
  
  //combine name array and time array
  for (var i = 0; i < loopLength; i++) {
    combined[i] = {name:namesArr[i], hours:timeArr[i]}
  }
  
  //add all hours in combined array with the same name
  var res = Array.from(combined.reduce(
    (m, {name, hours}) => m.set(name, (m.get(name) || 0) + hours), new Map
  ), ([name, hours]) => ({name, hours}));

  // console.log(namesArr, timeArr, combined);
  console.log(res);
 
  chrome.storage.sync.set({data: res}, function() {
    console.log('Value is set to ' + JSON.stringify(res));
  });

};

setTimeout(function () {populateName()}, 5000);
// setInterval(function() {populateName()}, 1000);