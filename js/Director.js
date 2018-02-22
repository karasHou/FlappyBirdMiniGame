//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        //控制速度为1.5px
        this.landSpeed = 1.5;
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

    //开始绘制
    run() {
        //绘制背景
        this.dataStore.get('background').draw();


        const pencils = this.dataStore.get('pencils');
        //铅笔的右侧越过左侧的边界
        if (pencils[0].x + pencils[0].width <= 0
            && pencils.length === 4) {
            //因为要显示两组铅笔，是四只

            //销毁越界的两只铅笔
            pencils.shift();
            pencils.shift();
        }
        if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
            && pencils.length === 2) {
            //当同一个屏幕只有一组铅笔，创建新的一组铅笔
            this.createPencil();
        }


        //这里要注意先绘制铅笔，再用land覆盖
        this.dataStore.get('pencils').forEach(function (value) {
            value.draw();
        });

        //绘制陆地
        this.dataStore.get('land').draw();


        //自适应浏览器的帧率,提高性能
        let timer = requestAnimationFrame(() => this.run());
        //将其存入dataStore中
        this.dataStore.put('timer', timer);

        //当游戏结束，停止动画
        // cancelAnimationFrame(this.dataStore.get('timer'));
    }

}