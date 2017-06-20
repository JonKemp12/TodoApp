function add (a, b) {
  return a + b;
}

console.log(add(3, 2));

var toAdd = [9, 5];
console.log('spread toAdd:', ...toAdd);
console.log(add(...toAdd));

var one = ['jon', 56];
var two = ['kaz', 52];

function greet(name, age) {
  console.log('Hi', name, 'you are', age);
}

greet(...one);
greet(...two);

var groupA = ['Jon', 'Kaz'];
var groupB = ['Marc', 'Liz'];
var final = [...groupA, ...groupB];

final.forEach((name) => {
  console.log('Hello', name);
});
