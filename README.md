# flatpaks

一些个人向构建

在个人向构建中,基本上只保证功能正常可运行,而不去考虑介绍,许可等非技术性内容

本仓库内容允许也欢迎任何人将其改良后提交给 flathub ~~(当然你照抄后提交过去也行,我懒)~~  
但如果能通知一声我就更好了

## 计划

- [x] 钉钉 com.alibabainc.DingTalk
- [x] 网易云音乐 (1.2.1 版) com.netease.CloudMusic
- [x] Icalingua (plus-plus) io.github.Icalingua.Icalingua
- [x] 即时设计 design.js.Design
- [x] COSBrowser com.tencent.COSBrowser
- [ ] 飞书 com.bytedance.Lark
- [ ] 币安 com.binance.BinanceDesktop
- [ ] Qv2Ray (2.7.0 版,做最后更新) com.qv2ray.Qv2Ray
- [ ] Qv2Ray (3.x 但是这个看社区情况决定) com.qv2ray.Qv2Ray3

还有一些 Wine/DeepinWine 打包也想放进来,但是考虑到可能会很麻烦就暂时搁置

## 一些规范

- 启动脚本一律命名为 `{小写应用名}-launcher.sh` 除非应用本身冲突
- 如果可以,尽可能在 yml 中内联声明脚本
- install 命令先用 `-t` 写目标目录,再写文件名
