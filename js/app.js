/* eslint-disable no-unused-vars */
'use strict';
let containerElem = document.getElementById('container');
let itemOne = document.getElementById('one');
let itemTwo = document.getElementById('two');
let itemThree = document.getElementById('three');
let button = document.getElementById('button');
let results = document.getElementById('results');
let voteCount = 25;

const state = {
  array: [],
};

function Odd(name, fileExtension = 'jpg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.image = `img/${name}.${fileExtension}`;

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


// console.log(state.array);

//random image generator;
function randomImg (){
  return Math.floor(Math.random() * state.array.length);
}

function render (){
  let images = [];
  while (images.length<3){
    let newIndex = randomImg();
    if (images.indexOf(newIndex) === -1){
      images.push(newIndex);
    }
    newIndex = randomImg ();
  }

  let imgOne = images.pop();
  let imgTwo = images.pop();
  let imgThree = images.pop();

  itemOne.src = state.array[imgOne].image;
  itemOne.alt = state.array[imgOne].name;
  state.array[imgOne].views++;

  itemTwo.src = state.array[imgTwo].image;
  itemTwo.alt = state.array[imgTwo].name;
  state.array[imgTwo].views++;

  itemThree.src = state.array[imgThree].image;
  itemThree.alt = state.array[imgThree].name;
  state.array[imgThree].views++;
}

// console.log(render());
// console.log(randomImg())

function handleClick(event){
  voteCount--;

  let imgClicked = event.target.alt;
  for (let i=0; i<state.array.length; i++){
    if (imgClicked===state.array[i].name){
      state.array[i].votes++;
      // console.log(imgClicked,state.array[i].votes);
    }
  }

  render();
  if (voteCount===0){
    containerElem.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if (voteCount===0){
    for(let i = 0; i < state.array.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${state.array[i].name} had ${state.array[i].votes} votes and was seen ${state.array[i].views} times.`;
      results.append(liElem);
    }
  }
}
render ();
containerElem.addEventListener('click', handleClick);
button.addEventListener('click', handleShowResults);
