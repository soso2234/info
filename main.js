const container   = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText    = document.querySelector(".game-text")
const playTime    = document.querySelector(".play-time")

const tileCount = 16;

let tiles = [];
const dragged = {
    el: null,
    class : null,
    index : null,
}
let isPlaying = false;


// function
function checkStatus(){
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((child, index) =>  Number(child.getAttribute("data-index")) !== index)
    if(unMatchedList.length === 0){
        gameText.getElementsByClassName.display = "block";
        isPlaying = false;
    }
}

function setGame(){
    isPlaying = true;
    container.innerHTML = "";
    tiles = createImageTiles();
    tiles.forEach(tiles => container.appendChild(tiles))
    setTimeout(()=>{
        container.innerHTML = "";
        shuffle(tiles).forEach(tiles => container.appendChild(tiles))
    }, 2000)
}

function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i)
        li.setAttribute('draggable', 'true');
        li.classList.add('list' + i);
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

//events
container.addEventListener('dragstart', e => {
    if(isPlaying) return;
    const obj = e.target
    dragged.el = obj;
    dragged.class = obj.className;
   dragged.index = [ ...obj.parentNode.children].indexOf(obj);
})
container.addEventListener('dragover', e => {
    e.preventDefault()
})
container.addEventListener('drop', e => {
    if(!isPlaying) return;
    const obj = e.target;

    if(obj.className !== dragged.class) {
        let originPlace;
        let isLast = false;

        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling
        } else {
            originPlace = dragged.el.previousSibling
            isLast = true;
        }
        const droppedIndex = [ ...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj)
    }
    checkStatus();
})

startButton.addEventListener('click', () => {
    setGame()
})

//54분
//https://www.youtube.com/watch?v=iTBZdg7tg-w