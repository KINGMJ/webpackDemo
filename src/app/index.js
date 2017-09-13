import './assets/css/main.css';
import './assets/css/ionicons-font.css';
import Data from './test.json';
window.onload = function () {
    drawHtml();
    readJson();
};


function drawHtml() {
    const container = document.getElementById('container');
    container.querySelector('p').innerText = "Hello";
}

function readJson() {
    console.log(Data.name);
}