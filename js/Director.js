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

    //点击屏幕的处理
    birdsEvent() {
        //遍历三种状态的鸟，改变其Y坐标
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        // 计时器时间置零,重新开始自由落体运动（先起跳一段弧形）
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否撞击铅笔
    static isStrike(bird, pencil) {
        let s = false;
        //1. 小鸟碰到上面的铅笔（垂直）
        //2. 小鸟碰到下面的铅笔（垂直）
        //3. 小鸟碰到铅笔左侧
        //4. 小鸟碰到铅笔右侧
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const score = this.dataStore.get('score');
        const pencils = this.dataStore.get('pencils');

        //地板的撞击判断
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            this.isGameOver = true;
            return;
        }

        //创建小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        //铅笔模型的创建
        const length = pencils.length;

        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            //越过铅笔
            score.isScore = false;
            score.scoreNumber++;
        }

    }

    //开始绘制
    run() {
        //绘制前先判断是否碰撞
        this.check();

        //游戏未结束
        if (!this.isGameOver) {
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

                //重置 可以加分
                this.dataStore.get('score').isScore = true;

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
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();


            //自适应浏览器的帧率,提高性能
            let timer = requestAnimationFrame(() => this.run());
            //将其存入dataStore中
            this.dataStore.put('timer', timer);

        } else {
            console.log('游戏结束');

            this.dataStore.get('startButton').draw();

            //当游戏结束，停止动画
            cancelAnimationFrame(this.dataStore.get('timer'));
            //将全部的精灵置空,提升性能
            this.dataStore.destroy();

        }
    }
}