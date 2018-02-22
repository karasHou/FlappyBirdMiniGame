//铅笔类的基类
import {Director} from "../Director.js";
import {Sprite} from "../base/Sprite.js";

export class Pencil extends Sprite {

    constructor(image, top) {
        super(image,
            0, 0,
            image.width, image.height,
            //刚好在右侧看不到的位置
            // DataStore.getInstance().canvas.width, 0,
            window.innerWidth, 0,
            image.width, image.height);

        this.top = top;
    }

    draw() {
        this.x = this.x - Director.getInstance().landSpeed;
        //重写父类的draw方法
        super.draw(this.img,
            0, 0,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height)
    }
}