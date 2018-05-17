"use strict";
var Bomb = (function () {
    function Bomb() {
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.speed = 4 + Math.random() * 8;
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
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
        this.y = -400 - (Math.random() * 450);
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
var Fire = (function () {
    function Fire() {
        this.element = document.createElement("fire");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.x = 100;
        this.y = window.innerHeight - this.getRectangle().height;
    }
    Fire.prototype.update = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Fire.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    Fire.prototype.remove = function () {
    };
    return Fire;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.ui = new UI(this);
        this.car = new Car();
        this.bombs = [new Bomb(), new Bomb(), new Bomb(), new Bomb()];
        this.healths = [new Health(), new Health()];
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        this.ui.update();
        for (var _i = 0, _a = this.healths; _i < _a.length; _i++) {
            var h = _a[_i];
            h.update();
        }
        for (var _b = 0, _c = this.bombs; _b < _c.length; _b++) {
            var b = _c[_b];
            b.update();
            if (Util.checkCollision(this.car.getRectangle(), b.getRectangle())) {
                b.reset();
                this.score++;
            }
            if (b.getRectangle().bottom - b.getRectangle().height > window.innerHeight) {
                b.reset();
                console.log("Voeg Fire instance toe op positie " + b.getRectangle().left);
            }
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
var Health = (function () {
    function Health() {
        this.element = document.createElement("health");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.speed = 4 + Math.random() * 8;
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    }
    Health.prototype.update = function () {
        this.y += this.speed;
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Health.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    Health.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    };
    return Health;
}());
var UI = (function () {
    function UI(g) {
        this.game = g;
        this.textfield = document.createElement("textfield");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
    }
    UI.prototype.update = function () {
        this.textfield.innerHTML = "Score: " + this.game.score;
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