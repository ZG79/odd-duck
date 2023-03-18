/* eslint-disable no-unused-vars */
'use strict';
let containerElem = document.getElementById('container');
let itemOne = document.getElementById('one');
let itemTwo = document.getElementById('two');
let itemThree = document.getElementById('three');
let button = document.getElementById('buttonOne');
let results = document.getElementById('results');
let voteCount = 25;
const ctx = document.getElementById('myChart');

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

//JSON storage retrieval
let retrievedProduct = localStorage.getItem('product');

//JSON parse
let parsedProduct = JSON.parse(retrievedProduct);
console.log('parsed goats', parsedProduct);


if(retrievedProduct){
  state.array = parsedProduct;
}else {

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

}

//random image generator;
function randomImg (){
  return Math.floor(Math.random() * state.array.length);
}

let images = [];
function render() {

  while (images.length < 6) {
    let newIndex = randomImg();
    // If images already includes the newIndex, call randomImg again
    if (images.includes(newIndex)) {
      newIndex = randomImg();
    } else {
      images.unshift(newIndex);
    }
  }
  console.log(images);


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

//Chart section starts

function renderChart (){
  let imgNames = [];
  let imgVotes = [];
  let imgViews =[];
  for (let i =0; i<state.array.length; i++){
    imgNames.push(state.array[i].name);
    imgVotes.push(state.array[i].votes);
    imgViews.push(state.array[i].views);
  }

  let resultsChart =  {
    type: 'bar',
    data: {
      labels: imgNames,
      datasets: [{
        label: '# of Votes',
        data: imgVotes,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
          // 'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.3)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: imgViews,
        borderWidth: 1,
        backgroundColor: ['rgba(255,72,196,0.3)',
          // 'rgba(43,209,252, 0.3)',
          // 'rgba(243,234,95,0.3)',
          // 'rgba(192,77,249,0.3)',
          // 'rgba(255,63,63, 0.3)',
          // 'rgba(52,72,196, 0.3)',
          // 'rgba(43,20,252, 0.3)',
        ],

      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // eslint-disable-next-line no-undef
  new Chart(ctx, resultsChart);
}

function changeBackgroundColorToWhite() {
  document.getElementById('myChart').style.backgroundColor = 'white';
}

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

    //JSON steps
    let stringifyProduct = JSON.stringify(state.array);
    localStorage.setItem('product', stringifyProduct);
    console.log('String product', stringifyProduct);
  }
}

function handleShowResults(){
  if (voteCount===0){
    for(let i = 0; i < state.array.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${state.array[i].name} had ${state.array[i].votes} votes and was seen ${state.array[i].views} times.`;
      results.append(liElem);

    }
    renderChart();
    changeBackgroundColorToWhite();
  }
}


render ();

containerElem.addEventListener('click', handleClick);
button.addEventListener('click', handleShowResults);

