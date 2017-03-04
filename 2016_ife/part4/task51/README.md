
任务五十一：多功能相册
===
**面向人群：** 有一定的JavaScript基础

**难度：** 难

**发布时间：** 04-18

**截止时间：** 05-22 23:59

重要说明
---
百度前端技术学院的课程任务是由百度前端工程师专为对前端不同掌握程度的同学设计。我们尽力保证课程内容的质量以及学习难度的合理性，但即使如此，真正决定课程效果的，还是你的每一次思考和实践。

课程多数题目的解决方案都不是唯一的，这和我们在实际工作中的情况也是一致的。因此，我们的要求不仅仅是实现设计稿的效果，更是要多去思考不同的解决方案，评估不同方案的优劣，然后使用在该场景下最优雅的方式去实现。那些最终没有被我们采纳的方案，同样也可以帮助我们学到很多知识。所以，我们列出的参考资料未必是实现需求所必须的。有的时候，实现题目的要求很简单，甚至参考资料里就有，但是背后的思考和亲手去实践却是任务最关键的一部分。在学习这些资料时，要多思考，多提问，多质疑。相信通过和小伙伴们的交流，能让你的学习事半功倍。

此外，有些组的实现方式是用 JavaScript 写了很多 xxx.style.xxx = ... 这样的形式。虽然也能实现效果，但是我们尽可能希望样式由 CSS 控制，所以更好的做法是在 CSS 文件中设置样式，用 JavaScript 给特定的元素设置类名。我们可以看到，很多和界面相关的第三方库都提供了 CSS 文件，和 JavaScript 一起作为库的一部分，比如 jquery-jsonview。
最后，拼图布局应该根据用户给的图片数自动决定采用的布局，而不是在调用时输入参数。

本阶段任务

任务目的
---
* 在第四阶段，需要实现一个第三方 JavaScript 库，用于制作布局灵活的响应式多功能相册，可以应用于图片的全屏浏览、幻灯片播放、分组分页等场景。

任务描述
第三阶段回顾
---
* 在第三阶段，我们看到部分组提交的作业已经比较成型了，但是还是有一些共性的问题，这里说明一下。
首先，在裁剪图片的时候，应该将图片放在水平和垂直方向上的中间（除非你提供接口让用户设置裁剪时以什么方向对齐）。以下图的两张图布局为例，被裁剪掉的距离应该是平均分布在上下左右的，具体比例可以自己设计，但是有些组完全裁去右边部分的做法显然是不妥的。其他布局也是类似的，请大家自行检查长宽比不同的图像应用在相册时的效果。
* ![参考设计图](http://7xrp04.com1.z0.glb.clouddn.com/task_4_51_1.png)
* 此外，有些组的实现方式是用 JavaScript 写了很多 xxx.style.xxx = ... 这样的形式。虽然也能实现效果，但是我们尽可能希望样式由 CSS 控制，所以更好的做法是在 CSS 文件中设置样式，用 JavaScript 给特定的元素设置类名。我们可以看到，很多和界面相关的第三方库都提供了 CSS 文件，和 JavaScript 一起作为库的一部分，比如 jquery-jsonview。
最后，拼图布局应该根据用户给的图片数自动决定采用的布局，而不是在调用时输入参数。

第四阶段描述
---
* 这一阶段，每个组需要完成一个相册第三方库的完整功能。根据我们提供的 JavaScript 框架，结合上一阶段的实现，实现我们给出的 API。

简单
--- 
* 理解文末给出的 API（学习资料[JSDoc](http://usejsdoc.org/)），并且在自己写代码的时候适当添加注释
* 实现 API
* 编写调用该库的例子，尽可能完整地测试功能性

中等
---
* 分析现有其他相册库的功能，设计并实现更多布局（如全屏、网格、幻灯片等），以及拼图布局下更多的可能性
* 设计并实现更多功能（如动画、交互等）

困难
---
* 学习比较现有主流 JavaScript 测试框架：[Jasmine](http://jasmine.github.io/)、[Mocha](https://mochajs.org/)、[QUnit](https://qunitjs.com/) 等，选择合适的工具，尽可能高覆盖地测试你门的库
* 如果觉得你们的项目值得在真实世界使用，可以考虑在 GitHub 上单独建一个项目以后长期维护，编写 ReadMe、文档、测试、例子等等，或许可以是你们第一个被别人使用的开源项目（如果决定这么做，请在提交作业时，给出该地址，我们会长期关注）

```
(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';



    function IfeAlbum() {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };

        // 公有变量可以写在这里
        // this.xxx = ...

    }

    // 私有变量可以写在这里
    // var xxx = ...



    /************* 以下是本库提供的公有方法 *************/



    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    IfeAlbum.prototype.setImage = function (image, option) {
        
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }

        // 你的实现

    };



    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function() {
        
    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.addImage = function (image) {

    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {

    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {

    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {

    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口



    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));
```

任务注意事项
---
* 上面描述中的示意图仅为需求描述参考，不作为实现的设计参考
* 上面的需求描述中存在与真实产品合理性的差异，本任务以技术学习为主，忽略产品设计上的问题
* 请注意代码风格的整齐、优雅
* 代码中含有必要的注释
* 可以合理使用第三方框架、类库

任务协作建议
---
* 如果是各自工作，可以按以下方式：
    * 团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
    * 各自完成任务实践
    * 交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
    * 相互讨论，最后合成一份组内最佳代码进行提交
* 如果是分工工作，可以按照难度来划分任务

任务链接
---
http://ife.baidu.com/task/detail?taskId=51
