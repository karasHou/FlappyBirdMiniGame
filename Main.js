//初始化整个游戏的精灵，作为游戏开始的入口

import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');

        // 初始化dataStore
        this.dataStore = DataStore.getInstance();

        this.director = Director.getInstance();

        //简单工厂方法
        const loader = ResourceLoader.create();
        loader.onload(map => this.onResourceFirstLoaded(map));

    }//constructor end

    //资源第一次加载
    onResourceFirstLoaded(map) {
        //长期保存
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        //完成背景的初始化和渲染
        this.init();
    }

    init() {
        //首先重置游戏没有结束
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils',[])
            .put('background', BackGround)
            .put('land',Land)
            .put('birds',Birds);

        //创建铅笔要在游戏逻辑开始之前
        this.director.createPencil();
        this.director.run();
    }
}