import printMe from './print';
import './assets/css/main.css';


window.onload = function () {
    printMe();
    drawHtml();
};


function drawHtml() {
    const container = document.getElementById('container');
    container.innerText = "Hello";
    container.className = "hello";
}