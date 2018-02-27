//小鸟类
//循环的渲染三只小鸟,也就是图片的三个部分
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
    constructor() {
        //获取鸟的图片
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9

        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18];

        //裁剪Y
        this.clippingY = [10, 10, 10];
        //使用的宽度
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];

        //初始X坐标
        // const birdX = DataStore.getInstance().canvas.width / 4;
        const birdX = window.innerWidth / 4;

        this.birdsX = [birdX, birdX, birdX];

        // const birdY = DataStore.getInstance().canvas.height / 2;
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];

        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];

        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];

        this.y = [birdY, birdY, birdY];
        //判断当前显示第几只
        this.index = 0;
        this.count = 0;
        this.time = 0;


    }

    //绘制出鸟类
    draw() {

        //切换三只小鸟的速度
        const speed = .2;

        //重力加速度
        const g = 0.98 / 2.4;

        //向上移动一丢丢的偏移量，再下落
        const offsetUp = 30;


        this.count = this.count + speed;
        //0,1,2
        if (this.index >= 2) {
            this.count = 0;
        }

        //如果遇到小数就读取不到对应坐标的图片
        this.index = Math.floor(this.count);

        //重力位移公式
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2;

        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        //绘制出小鸟
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }
}