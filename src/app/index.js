import './assets/css/main.css';
import './assets/css/ionicons-font.css';
import Data from './test.json';
import printMe from './print.js';

window.onload = function () {
    drawHtml();
    readJson();
    printMe();
    foreachArray();
};


function drawHtml() {
    const container = document.getElementById('container');
    container.querySelector('p').innerText = "Hello";
}

function readJson() {
    console.log(Data.name);
}

function foreachArray() {
    var arr = [
        {name: 'jack', age: 18},
        {name: 'rose', age: 17}
    ];

    for (let user of arr) {
        console.log(user.name);
    }
}