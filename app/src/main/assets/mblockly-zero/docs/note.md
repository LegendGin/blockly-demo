### 问题点
1. 当UI组件连续触发太快时，会导致后一次动作的指令发生在前一次触发之前

【解决方法】
使用flag来进行处理，如果后一条动作被触发了，但前一条动作的指令还没有完成时，会延迟一定时间间隔再次触发该指令。

【涉及文件】
- data.js: 为每个组件注册flag
- hostInterface.js: 判断与执行
- whentable.js: 当前一条指令发送结束后，解锁flag

【状态】
待优化

2. 原生端调用web一个操作，正常情况是需要等待web操作结束后再执行，但实际情况因为异步执行的问题，导致web还没执行完，
原生程序就开始了下一步

【解决方法】
web部分重构代码，增加一套消息回调机制，当接收到原生程序的一个操作指令后，开始执行程序，当程序执行完毕，返回给原生程序
一个执行完毕的信号。

【状态】
待处理

3. 最新的 acorn_interpreter.js 无法暂停 `if_else` 这类 block 块

4. 分支说明

使用 tag 来管理分支的提交：
1. 由于 web 部分需要配合 ios 和 android 项目进行提交，而 ios 和 android 的项目进度不一样，使用分支来管理会造成混乱。
所以采用 tag 来管理分支进度。

假设：android 的开发版本低于 ios

比如 ios 当前开发版本是 v2.6, web 每次提测的 tag 以 v2.6 基础递增。web 第一次提交为 release_v2.6.1, 第二次为 release_v2.6.2 ... 依次类推。
当 ios v2.6 完成提测，发布上线时。web 最后一次添加 tag， release_v2.6_ios， 删除之前的开发版本的 tag。

当android进入开发版本 v2.5 时，web 打上 tag，release_v2.5.1_android, 如果发现 web 有bug， web更改bug时，则在 v2.5 上递增，比如 release_v2.5.2_android ...，
等 android 发布版本 v2.5 时。最后打上 tag， release_v2.5_android。

彼此互不干扰。

5. 解决某个组件，被重复执行的问题。
【解决方法】
在该组件被执行时，终止该组件的上一个runtime，重新开始新的runtime。

这种模式下：不允许同一个workspace中出现两个相同的when块

