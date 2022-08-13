var input = document.getElementById('input'); // input/output button
var number = document.querySelectorAll('.row div'); // number buttons
var operator = document.querySelectorAll('.operators div'); // operator buttons
var result = document.getElementById('result'); // equal button
var clear = document.getElementById('clear'); // clear button
var resultDisplayed = false; // flag to keep an eye on what output is displayed


// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function numClicker(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (e.target.innerHTML === 'clear')  {
      resultDisplayed = false;
      input.innerHTML = "";
    } else if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}



// click handlers for operators
for (var i = 0; i < operator.length; i++) {

  operator[i].addEventListener('click', function opeClicker(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    if (lastChar === '+'|| lastChar === '-'|| lastChar === '×'|| lastChar === '÷') {
      // if previous click is operator, replace with new operator
      var newString = currentString.substring(0, currentString.length-1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0 && e.target.innerHTML != '-') {
      // if no numbers currently
      alert('You need a number to operate on first!');
    } else {
      // if everything is right (prev. click is num) then just add operatorto input
   
     input.innerHTML += e.target.innerHTML;
    }

  });
}



// click handler for =
result.addEventListener('click', function getResult() {


  // 1. get lists of nums and ops
  var oppies = input.innerHTML.replace(/[0-9]|\./g, '').split('');
  var nummies = input.innerHTML.split(/\+|\-|\×|\÷/g);
  if (input.innerHTML[0] == '-') {
    var negOpp = oppies.shift()
    nummies.shift();
    var negNum = nummies.shift();
    nummies.unshift('0');
    nummies.push(negNum);
    oppies.push(negOpp);
  };

  console.log(nummies);
  console.log(oppies);


  // 2. do operations IN ORDER (*, /, +, -)

  var multiply = oppies.indexOf('×')
  while (multiply != -1) {
    nummies.splice(multiply, 2, parseFloat(nummies[multiply])*parseFloat(nummies[multiply+1]));
    oppies.splice(multiply, 1);
    multiply = oppies.indexOf('×')
    console.log(nummies);
    console.log(oppies);
  }

  var divide = oppies.indexOf('÷');
  while (divide != -1) {
    nummies.splice(divide, 2, parseFloat(nummies[divide])/parseFloat(nummies[divide+1]));
    oppies.splice(divide, 1);
    divide = oppies.indexOf('÷');
    console.log(nummies);
    console.log(oppies);
  }

  var add = oppies.indexOf('+');
  while (add != -1) {
    nummies.splice(add, 2, parseFloat(nummies[add])+parseFloat(nummies[add+1]));
    oppies.splice(add, 1);
    add = oppies.indexOf('+');
    console.log(nummies);
    console.log(oppies);
  }

  var subtract = oppies.indexOf('-');
  while (subtract != -1) {
    nummies.splice(subtract, 2, parseFloat(nummies[subtract])-parseFloat(nummies[subtract+1]));
    oppies.splice(subtract, 1);
    subtract = oppies.indexOf('-');
    console.log(nummies);
    console.log(oppies);
  }

  input.innerHTML = nummies[0];
  resultDisplayed = true;

});


clear.addEventListener("click", function() {
  input.innerHTML = "";
});