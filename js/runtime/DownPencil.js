//下半部分的铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class DownPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw() {
        //两只铅笔之间的空隙，取屏幕的1 / 5
        let gap = window.innerHeight / 5;
        this.y = this.top + gap;
        super.draw();
    }
}