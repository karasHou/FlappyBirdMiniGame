//不断移动的陆地类
import {Sprite} from "../base/Sprite.js";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(image, 0, 0,
            image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height);
        //地板的水平变化坐标
        this.landX = 0;
        //地板的移动速度（px）
        this.landSpeed = 2;
    }

    draw() {
        //每次绘制坐标加变化的坐标
        this.landX = this.landX + this.landSpeed;
        //判断边界
        if (this.landX > (this.img.width - window.innerWidth)) {
            this.landX = 0;
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            //从又向左是负值
            -this.landX,
            this.y,
            this.width,
            this.height)
    }

}

