import App from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    // load sprite sheet
    let spritesheet = new Image();
    spritesheet.src = '/images/sprites.png';
    spritesheet.onload = () => {
        const app = new App(spritesheet);
        app.init();
    };
    
});
