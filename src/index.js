import 'normalize.css';
import style from './index.module.css';
import $ from 'jquery';
import dogImage1 from './assets/dog1.jpg'
import dogImage2 from './assets/dog2.jpeg'
import carrotSvg from './assets/carrot.svg'
import '@babel/polyfill';

function component(){
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack';

    const imgElement = document.createElement('IMG');
    imgElement.src = carrotSvg;
    console.log(dogImage1);

    element.appendChild(imgElement);

    console.log(style.helloWebpack);
    element.classList = style.helloWebpack;

    return element;
}

document.body.appendChild(component());
console.log($(`.${style.helloWebpack}`).length);
console.log(`IS_PRODUCTION_MODE ${IS_PRODUCTION}`);