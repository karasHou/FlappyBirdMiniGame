# FlappyBirdMiniGame 微信小游戏之下落的小鸟

## 展示
![](https://github.com/Houweix/FlappyBirdMiniGame/raw/master/show.gif)

## 项目背景
体验微信小游戏同时学习canvas绘图。

## 项目结构
- js
	- base
		- DataStore.js	存储游戏需要长期保存的和需要定时销毁的变量
		- Resource.js	资源文件
		- ResourceLoader.js	  资源加载器，保证游戏在图片加载后开始主循环
		- Sprite.js	游戏精灵的基类
	- player
		- Birds.js	小鸟类
		- Score.js	积分器
		- StartButton.js	重新开始按钮类
	- runtime
		- BackGround.js	背景类
		- DownPencil.js	下铅笔类
		- Land.js	陆地类
		- Pencil.js
		- UpPencil.js	上铅笔类
	- Director.js	程序导演类。控制游戏逻辑和精灵图的创建和销毁
- res
- Main.js	程序主类，初始化canvas和全局对象
- game.js	游戏全局的入口文件
- index.html

## 相关知识

### 小游戏的特点
> 快速体验，短生命周期，转换率高，体验优于手机网页，不需要像app一样注册下载。

### 单例模式
>单例模式，是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例的特殊类。通过单例模式可以保证系统中，应用该模式的类一个类只有一个实例。即一个类只有一个对象实例

本项目中的导演类符合该模式：
```javascript
static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
```

### ES6箭头函数
>函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

```javascript
 export class Main {

    constructor() {
        ...
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }
}
```
在Main.js类中使用=>使this指向当前对象，而不是运行时对象（loader）。

### ES6 map的使用
通过map封装资源管理器，可以实现不同的文件对变量的存取。
```javascript

constructor() {
        this.map = new Map();
    }
	//存
    put(key, value) {
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }
	//取
    get(key) {
        return this.map.get(key);
    }
	//销毁
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
```

### requestAnimationFrame函数
requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。
```
//游戏开始
let timer = requestAnimationFrame(() => this.run());
        

//游戏结束
cancelAnimationFrame(this.dataStore.get('timer'));
```

### canvas绘制
drawImage() 方法在画布上绘制图像、画布或视频。
drawImage() 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。
```javascript
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
```
坐标示意图：
![](https://github.com/Houweix/FlappyBirdMiniGame/raw/master/direction.png)

### 碰撞逻辑的判断
首先创建小鸟的模型：
```javascript
//小鸟的边框模型
const birdsBorder = {
    top: birds.y[0],
    bottom: birds.birdsY[0] + birds.birdsHeight[0],
    left: birds.birdsX[0],
    right: birds.birdsX[0] + birds.birdsWidth[0]
};
```
创建铅笔模型：
```javascript
const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
```
撞击逻辑判断：
```javascript
//判断小鸟是否和铅笔撞击
static isStrike(bird, pencil) {
    let s = false;
    if (bird.top > pencil.bottom ||
        bird.bottom < pencil.top ||
        bird.right < pencil.left ||
        bird.left > pencil.right
    ) {
        s = true;
    }
    return !s;
}
```

## 遇到的问题
1.canvas绘制时上层图片会覆盖下层
通过更改图片绘制的逻辑（先后顺序）来正确的渲染。

2.加分逻辑分数会一直增加不会停止
设置一个变量来控制，如果加过分数则不再增加，变量设为false。

## 心得体会
通过本次项目的开发，不仅对canvas的绘制理解更深，同时对ES6中箭头函数、map、类的使用更加熟练。同时对当下十分火热的微信小程序开发有了一个体验。
