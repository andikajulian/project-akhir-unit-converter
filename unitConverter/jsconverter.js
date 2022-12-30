
var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Time";
unit[0] = new Array("Second", "Day", "Hour", "Minute");
factor[0] = new Array(1, 8.640E4, 3600, 60);

property[1] = "Weight";
unit[1] = new Array("Kilogram", "Gram", "Milligram");
factor[1] = new Array(1, .001, 1e-6);

property[2] = "Power";
unit[2] = new Array("Watt (W)", "Kilowatt (kW)", "Megawatt (MW)", "Milliwatt (mW)");
factor[2] = new Array(1, 1000, 1000000, .001);

property[3] = "Temperature";
unit[3] = new Array("Celsius ('C)", "Fahrenheit ('F)", "Kelvin ('K)", "Rankine ('R)");
factor[3] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[4] = "Length";
unit[4] = new Array("Meter (m)", "Centimeter (cm)", "Kilometer (km)", "Millimeter (mm)");
factor[4] = new Array(1, .01, 1000, 1E-9);


function UpdateUnitMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;

  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_form.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

  result = sourceForm.unit_input.value;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  result = result / targetFactor;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}

window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}

document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) ||  
      (key == 67 && (e.ctrlKey || e.metaKey)) || 
      (key == 86 && (e.ctrlKey || e.metaKey)) || 
      (key >= 35 && key <= 40) || 
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || 
      (key == 190) 
    )) e.preventDefault();
});