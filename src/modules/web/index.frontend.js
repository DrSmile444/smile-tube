const fileInputNode = document.querySelector('[data-file-input]');
const videoContainerNode = document.querySelector('[data-video-container]');
const cardTemplateNode = document.querySelector('[data-video-card-template]');
const randomizeButton = document.querySelector('[data-randomize]');

const nameSearchNode = document.querySelector('[data-name-search]');

let videoCards = [];
let filteredCards = [];

const virtualScroller = new VirtualScroller(
    videoContainerNode,
    videoCards,
    createCardNode,
);

fileInputNode.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/json') {
        alert('Wrong file type! Send .json only');
        return;
    }

    videoContainerNode.innerHTML = '';
    videoCards = JSON.parse(await readFile(file));
    filteredCards = videoCards;

    virtualScroller.setItems(videoCards);
});

nameSearchNode.addEventListener('input', () => {
    filteredCards = videoCards.filter((card) => card.title.toLowerCase().includes(nameSearchNode.value.toLowerCase()))
    virtualScroller.setItems(filteredCards);
});

randomizeButton.addEventListener('click', () => {
    filteredCards = shuffle(filteredCards).filter(Boolean);
    virtualScroller.setItems(filteredCards);
});

function createCardNode(card) {
    const newCardNode = cardTemplateNode.content.cloneNode(true);
    newCardNode.querySelector('[data-video-link]').href = card.watchUrl;
    newCardNode.querySelector('[data-video-image]').src = card.thumbnail;
    newCardNode.querySelector('[data-video-title]').innerText = card.title;
    newCardNode.querySelector('[data-video-duration]').innerText = card.duration;
    newCardNode.querySelector('[data-video-views]').innerText = card.viewCountText;
    newCardNode.querySelector('[data-video-published]').innerText = card.publishedTimeText;

    return newCardNode;
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
    });
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
