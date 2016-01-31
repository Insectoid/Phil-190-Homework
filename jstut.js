var numMax = prompt("Give me a number");
var num = [];
var sum = 0;

if (numMax > 0) {
    for (var i = 0; i < numMax; i++) {
        num[i] = i + 1;
        sum += num[i];
        console.log("num[" + i + "] = " + num[i]);
    }
} else {
    alert("Needs to be a positive number");
}

var order = function(set) {
    switch (set) {
    case 1:
        for (var i = 0; i < numMax; i++) {
        	console.log(num[i]);
        }
        break;
    case 2:
    	for (var i = numMax; i > 0; i--) {
    		console.log(num[i]);
    	}
    	break;
    default:
    	console.log("set was not 1 or 2");
    }
}

var isSumEven = (sum % 2 == 0) ? true : false;
console.log("Is sum even? " + isSumEven);
sum += Math.floor((Math.random() * 6) + 1);
isSumEven = (sum % 2 == 0) ? true : false;
console.log("What about now? " + isSumEven);


var name = prompt("What is your name?");
name = name.replace("a", "o");
name = name.replace("e", "o");
name = name.replace("i", "o");
name = name.replace("u", "o");
alert("Not anymore! Your name is now " + name);

var user = {name: name, age: sum,}
for (i in user) {
	console.log(user[i]);
}
