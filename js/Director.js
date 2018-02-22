//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.landSpeed = 2;
    }

    //基于ES6实现的单例模式
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建铅笔
    createPencil() {
        //高度上限
        const minTop = window.innerHeight / 8;
        //高度下限
        const maxTop = window.innerHeight / 2;
        //真实的高度
        const top = minTop + Math.random() * (maxTop - minTop);

        //将计算好的上下铅笔加入到数组中
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    run() {
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();

        this.dataStore.get('pencils').forEach(function (value) {
            value.draw();
        });

        //自适应浏览器的帧率,提高性能
        let timer = requestAnimationFrame(() => this.run());
        //将其存入dataStore中
        this.dataStore.put('timer', timer);

        //当游戏结束，停止动画
        // cancelAnimationFrame(this.dataStore.get('timer'));
    }

}