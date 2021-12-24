const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")

const tilesCount = 16;
let tiles = [];

tiles = createImageTiles();

shuffle(tiles).forEach(tiles => container.appendChild(tiles))


function createImageTiles(){
    const tempArray = [];
    Array(tilesCount).fill().forEach((_, i) => {
        const li = document.createElement("li")
        li.setAttribute('data-index', i)
        li.classList.add('list${i}');
        console.log(li)
        tempArray.push(li)
    })
    return tempArray;
}

function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
        index --;
    }
    return array;
}

//27분01초
//https://www.youtube.com/watch?v=iTBZdg7tg-w
