## blockly项目重构版本-v1.0
【时间】
2016-06-01 ~ 2016-06-11

【名称】
blockly项目重构，使blockly项目更新方便，扩展性强。
充分解耦合，模块化代码。通过配置文件，为不同的项目选择不同的UI界面，block块逻辑，以及协议。

【时间】
by Hyman(2016-05-14)

【目前基于blockly的已有和可能项目】
blockly-for-mbot
blockly-for-gemini
MakeblockHD
MakeblockHD-neuron
blockly-for-neuron：实体硬件触发式
...


### 概要
【重构目标】
1. 充分解耦合程序模块，使程序文件目录结构清晰，接口明确，更新维护更简洁
2. 使程序扩展性强，能够方便的做出基于blockly的新应用
3. 方便更新blockly版本
4. 移除冗余、重复代码，单一源头

【重构思路】
1. 保存blockly原始库的程序结构，将依赖于blockly库的应用抽离成单独的文件夹，所有与该应用相关的代码和文件都在该文件夹下，不污染其他地方。
2. 不修改blockly原始代码，相关修改只在应用内的扩展文件夹(`blokly-extends/`)下进行调整。
3. 使用webpack来组织文件的引用
4. 抽离通用代码，不同的应用通过继承和重载的形式来完成功能定制

【问题】
- 不同的应用可能使用的blockly版本会不一致（该问题暂时不考虑）
- 不同的应用共用一些公共的代码，比如自定义的颜色选择盘、数字输入盘，需要能方便的进行“一次更改，同时更新”：公共代码，不放在特定应用中，放在公共部分。
- 不同应用通常不创建新的git仓库，而是采用分支，这样可以通过合并来处理公共部分代码的更新，而不是文件的复制。要求，公共部分的代码需要单独文件提交到公共分支。
- 维护一个纯净的公共分支，里面保留（该分支只接受被merge）
    - 稳定版本的blockly代码
    - 公共的工具库
    - 极简的应用结构
- 不同应用也有自己特定的应用代码：特定代码只能放在特定应用文件夹下。
- 不同的应用有自己不同的分支

【应用目录结构】
- /
    - vendors/: 第三方依赖，源码不会被修改
        - blockly/: 原始仓库，便于更新
        - acorn_interpreter.js
        - jquery.min.js
        - owl-carousel/
        - fonts/
    - docs/: 相关文档
    - css/
        - style.css: 公有样式表
        - ...
    - js/
        - common/: 公共使用的部分
            - block_keeper.js : 构造block块
            - blockly-widgets/: 新增的blockl组件，像led灯盘，数字输入框等，定义在这些类中
            - blocks/: 通用的block块定义
        - makelbockhd/: makelbockhd相关的逻辑代码文件
            - blocks定义相关
            - 逻辑相关
        - neuron/: 神经元
        - ...
    - images/
    - views/: 模板文件
        - makelbockhd/
            - default.html
            - html_msg.json
            - index.html
        - neuron
            - default.html
            - html_msg.json
            - index.html
        - ...
    - msg/ : 语言文件，只放新增和更改过的
        - en.js
        - hans.js
        - hant.js
    - gulpfile.js: 应用自动化构建工具
    - package.json
    - README.md: 项目相关说明


为方便项目拓展，在css, js, views下增加了针对不同应用的目录层级，这样可以通过
模板加载相关资源文件，经由gulp生成对应的应用访问路径。不同的应用可以最大程度上共用公共代码，又保留独有代码。

【重构步骤】
1. [x]构建新的项目文件结构
2. [x]运行最新版blockly示例程序
3. []移植UI结构
    - [x]调整左侧block面板, toolbox.js
    - [x]鼠标靠近左侧，触发垃圾桶显示
    - [x]增加小帽子
    - []图标替换
4. [x]加载blockly原始的`block块`，修复以前版本中对blockly块做的更改
5. [x]统一设置block块的颜色
6. [x]添加左侧block块过滤逻辑
7. [x]增加额外功能
    - [x]增加组件名称区域
    - [x]调整单个block块的右键菜单
        - [x]补充复制
        - [x]补充删除功能
        - [x]调整顺序
        - [x]去掉help
        - [x]去掉Collapse
        - [x]去掉Disable
        - [x]全局复制
    - [x]调整空白处的右键菜单
        - [x]全局粘贴
        - [x]禁用删除全部，有点重复
8. [x]自定义组件结构
    - [x]数字输入面板
    - [x]tone输入面板
    - [x]数字选择盘
9. [x]移动端UI适配
    - [x]顶部UI
-. [x]运行测试
    - [x]修复extra_attributes
    - [x]不同主板对应的block块过滤
-. [x]images文件夹整理
-. [x]添加神经元app
-. [x]添加事件触发神经元app
-. []重构项目文件依赖体系，使用webpack
-. []文件翻译校对
-. []针对协议的单元测试
-. []Bug修复
    - [x]变量无效
-. []优化
    - []增加对固件版本号与主板的对应解析，与ipad的通信数据中移除主板号
    - []增加与ipad端通信的回调通知


### blocly新版的改进
- 增加了剪切板的功能
- 增加了redo、undo
- 增加了缩放
- 增加了对齐排版

【不同】
- fireChangeEvent 被 Blockly.getMainWorkspace().addChangeListener(func) 代替了。【core/blockly.js】
- id由数字变的更为复杂的字符串，nUgX6(11vSq1F]EYSd8b 【/core/utis.js】
由于引号和特殊符号@，##被占用，改掉了原生生成uid的方法（移除了其中的某些特殊符号）


### 对blocly的更改
- 增加了左侧block块的过滤

## blockly项目重构版本-v2.0

【时间】
2016-09-07 ~  （计划用时两周）


【重构目标】
1. 代码结构重构
    - 精简代码
2. 重构规范原生和web的事件调用机制，加入回调。参考（https://github.com/marcuswestin/WebViewJavascriptBridge）
3. blockly重构
    - [x]blockly增加重做和撤销功能
    - 增加全局变量
    - block块的定义使用json
    - block块采用配置的形式
    - [x]block所有的新特性都要过一遍
    - 增加新的文件，用于实验block新的功能，采用配置的形式，决定是否开启该新功能
4. [x]分支整理
    - master: 已发布分支合集
    - bugfix/: 紧急修复的分支
    - feature/: 新功能分支
    - develop: 正在开发的最稳定分支
    - refactor: 重构整理
    - mblockly: 专为mblockly准备的分支
    - gemini: 转为geminy准备的分支
5. 性能优化
    - 在执行阶段不采用js解析器
6. 补充公司所有的电子元件的支持，建立block库
7. 与mblock保持一致性


【重构思路】
- 使用html模板、sass来组织代码


【重构步骤】
1. 代码结构重构
    - [x]替换 google diaglog，移除对 closure library 的代码依赖，为精简化文件结构做准备
    - [x]从项目仓库中移除google closure库
    - [x]删除神经元事件机制的代码，规范神经元代码结构
    - []用 node 的模块化加载方式，重构所有 js 的文件依赖，最后使用 `browserify` 进行打包
    - 模块化css，使用scss
    - 使用gulp压缩合并文件，减少文件引用
    - []构建 dist 目录，将需要打包的部分放在dist目录下