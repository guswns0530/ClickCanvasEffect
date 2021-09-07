import { Point, Circle } from '/js/utilCanvas.js';

const log = console.log;

class Rainbow {
    constructor() {
        this.init();
    }


    init() {
        this.canvas = document.querySelector("canvas");

        this.canvasSetting();
        this.resizeEvent();
        this.clickEvent();

        this.fps = 144;
        this.ctx = this.canvas.getContext('2d');
        this.beforeRgb = [255, 255, 255];
    }

    clickEvent() {
        this.canvas.addEventListener("click", e => {
            if (this.key === undefined) {
                this.draw(e);
            }
        })
    }

    resizeEvent() {
        window.addEventListener("resize", this.canvasSetting);
    }

    canvasSetting() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    *colorAni(color) {
        let before = this.beforeRgb;
        let now = color;
        let rgbList = [];

        for (let i = 1; i <= this.fps; i++) {
            let rgb = [];
            for (let j = 0; j < 3; j++) {
                let minus = Math.round(Math.abs(before[j] - now[j]) / this.fps * i);

                if (before[j] > now[j]) {
                    rgb.push(before[j] - minus);
                } else {
                    rgb.push(before[j] + minus);
                }
            }
            rgbList.push(rgb);
            yield rgbList;
        }
        this.beforeRgb = color;
    }

    draw(e) {
        let { clientX, clientY } = e;
        let ctx = this.ctx;
        let color = this.getRandomColor();
        let ani = this.colorAni(color, e);
        let cWidth = canvas.width;
        let cHeight = canvas.height;

        this.key = setInterval(() => {
            let value = ani.next().value

            if (value === undefined) {
                clearInterval(this.key);
                this.key = undefined;
                return;
            }

            let rgbList = value;
            let radius = Math.sqrt(Math.pow(cWidth, 2) + Math.pow(cHeight, 2));
            let point = new Point(clientX, clientY);

            for (let i = 0; i < rgbList.length; i++) {
                ctx.beginPath();
                let rgb = `rgb(${rgbList[i].join(',')})`;
                ctx.fillStyle = rgb;
                let len = radius / 60 * (rgbList.length - i);
                Circle.drawEllipse(ctx, point, len);
                ctx.fill();
                ctx.closePath();
            }
        }, 1000 / this.fps);
    }

    getRandomColor() {
        let rgb = [];

        for (var i = 0; i < 3; i++) {
            rgb.push(Math.round(Math.random() * 255));
        }

        return rgb;
    }
}

let rainbow = new Rainbow();
