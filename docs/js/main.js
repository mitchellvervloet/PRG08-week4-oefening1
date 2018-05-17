"use strict";
var Bomb = (function () {
    function Bomb() {
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.speed = 4 + Math.random() * 8;
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -142;
    }
    Bomb.prototype.update = function () {
        this.y += this.speed;
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Bomb.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    Bomb.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -142;
    };
    return Bomb;
}());
var Car = (function () {
    function Car() {
        var _this = this;
        this.x = 200;
        this.y = window.innerHeight - 150;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Car.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10;
                break;
            case "ArrowRight":
                this.speedRight = 10;
                break;
        }
    };
    Car.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
        }
    };
    Car.prototype.update = function () {
        this.x = this.x + this.speedRight - this.speedLeft;
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Car.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.ui = new UI();
        this.car = new Car();
        this.bombs = [new Bomb(), new Bomb(), new Bomb(), new Bomb()];
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
            if (Util.checkCollision(this.car.getRectangle(), b.getRectangle())) {
                b.reset();
                this.ui.bombDestroyed();
            }
            if (b.getRectangle().bottom - b.getRectangle().height > window.innerHeight) {
                b.reset();
                this.ui.buildingDestroyed();
            }
        }
        this.ui.update();
        if (this.ui.getBuildingsDestroyed() < 4) {
            console.log("GAME OVER");
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver() {
        this.textfield = document.createElement("textfield");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
    }
    GameOver.prototype.update = function () {
        this.textfield.innerHTML = "GAME OVER, MAN!";
    };
    return GameOver;
}());
var UI = (function () {
    function UI() {
        this.score = 0;
        this.destroyedbuildings = 0;
        this.textfield = document.createElement("textfield");
        this.bar = document.createElement("bar");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
        foreground.appendChild(this.bar);
    }
    UI.prototype.update = function () {
        this.textfield.innerHTML = "Score: " + this.score;
        this.bar.style.backgroundPositionX = 0 - (this.destroyedbuildings * 72) + "px";
    };
    UI.prototype.buildingDestroyed = function () {
        this.destroyedbuildings++;
    };
    UI.prototype.getBuildingsDestroyed = function () {
        return this.destroyedbuildings;
    };
    UI.prototype.bombDestroyed = function () {
        this.score++;
    };
    return UI;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map