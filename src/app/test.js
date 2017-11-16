import User from './user.json';
import Coffee from './assets/images/coffee.jpg';

const element = document.getElementById('container');

export default {
    init() {
        showImage();
        readJson();
    }
}

function showImage() {
    const myImage = new Image();
    myImage.src = Coffee;
    element.appendChild(myImage);
}

function readJson() {
    for (let user of User) {
        console.log(`姓名：${user.name}，年龄：${user.age}`);
    }
}