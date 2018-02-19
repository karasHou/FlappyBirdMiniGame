//初始化整个游戏的精灵，作为游戏开始的入口

import {ResourceLoader} from "./js/base/ResourceLoader.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        //简单工厂方法
        const loader = ResourceLoader.create();
        loader.onload(map => this.onResourceFirstLoaded(map));

        let image = new Image();
        image.src = 'res/background.png';

        //箭头函数，指向定义时的this
        image.onload = () => {
            this.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                image.width,
                image.height
            );
        }

    }

    //资源第一次加载
    onResourceFirstLoaded(map) {

    }
}