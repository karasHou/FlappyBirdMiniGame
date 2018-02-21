//初始化整个游戏的精灵，作为游戏开始的入口

import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        //简单工厂方法
        const loader = ResourceLoader.create();
        loader.onload(map => this.onResourceFirstLoaded(map));

    }//constructor end

    //资源第一次加载
    onResourceFirstLoaded(map) {
        //完成背景的初始化和渲染
        let background = new BackGround(this.ctx ,map.get('background'));
        background.draw();
    }
}