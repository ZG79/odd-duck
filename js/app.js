'use strict'
let containerElem = document.getElementById('container');
let itemOne = document.getElementById('one');
let itemTwo = document.getElementById('two');
let itemThree = document.getElementById('three');
let button = document.getElementById('button');
let results = document.getElementById('results')

const state = {
  array: [],
}

function Odd (name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  state.array.push(this);
}
let bag = new Odd('bag');
let banana = new Odd('banana');
let bathroom = new Odd('bathroom');
let boots = new Odd('boots');
let breakfast = new Odd('breakfast');
let bubblegum = new Odd('bubblegum');
let chair = new Odd('chair');
let cthulhu = new Odd('cthulhu');
let dogDuck = new Odd('dog-duck');
let dragon = new Odd('dragon');
let pen = new Odd('pen');
let petSweep = new Odd('pet-sweep');
let scissors = new Odd('scissors');
let shark = new Odd('shark');
let sweep = new Odd('sweep','png');
let tauntaun = new Odd('tauntaun');
let unicorn = new Odd('unicorn');
let waterCan = new Odd('water-can');
let wineGlass = new Odd('wine-glass');

// console.log(state);

//random image generator;

function randomImg (){
  return Math.floor(Math.random() * state.array.length);
};



// console.log(randomImg())

// let img = '<img src="bag.jpg">'
// itemOne.innerHTML = img;