import App from './app.js';
document.addEventListener('DOMContentLoaded', function () {
    // load sprite sheet
    var spritesheet = new Image();
    spritesheet.src = '/images/sprites.png';
    spritesheet.onload = function () {
        var app = new App(spritesheet);
        app.init();
    };
});
