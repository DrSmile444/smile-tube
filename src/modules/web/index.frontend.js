const fileInputNode = document.querySelector('[data-file-input]');
const videoContainerNode = document.querySelector('[data-video-container]');
const cardTemplateNode = document.querySelector('[data-video-card-template]');
const randomizeButton = document.querySelector('[data-randomize]');

const nameSearchNode = document.querySelector('[data-name-search]');

/**
 * @type {Video[]}
 * */
let videos = [];

/**
 * @type {Video[]}
 * */
let filteredCards = [];

const virtualScroller = new VirtualScroller(
    videoContainerNode,
    videos,
    createCardNode,
);

fileInputNode.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/json') {
        alert('Wrong file type! Send .json only');
        return;
    }

    videoContainerNode.innerHTML = '';
    videos = JSON.parse(await readFile(file));
    filteredCards = videos;

    virtualScroller.setItems(videos);
});

nameSearchNode.addEventListener('input', () => {
    filteredCards = videos.filter((card) => card.title.toLowerCase().includes(nameSearchNode.value.toLowerCase()))
    virtualScroller.setItems(filteredCards);
});

randomizeButton.addEventListener('click', () => {
    filteredCards = shuffle(filteredCards).filter(Boolean);
    virtualScroller.setItems(filteredCards);
});

/**
 * @param {Video} video
 * */
function createCardNode(video) {
    const newCardNode = cardTemplateNode.content.cloneNode(true);
    newCardNode.querySelector('[data-video-link]').href = video.watchUrl;
    newCardNode.querySelector('[data-video-image]').src = video.thumbnail;
    newCardNode.querySelector('[data-video-title]').innerText = video.title;
    newCardNode.querySelector('[data-video-duration]').innerText = video.duration;
    newCardNode.querySelector('[data-video-views]').innerText = video.viewCountText;
    newCardNode.querySelector('[data-video-published]').innerText = video.publishedTimeText;

    return newCardNode;
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
    });
}

/**
 * @template T
 * @param {T} array
 * @return T
 * */
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
