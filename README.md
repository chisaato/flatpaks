# flatpaks

一些个人向构建

在个人向构建中,基本上只保证功能正常可运行,而不去考虑介绍,许可等非技术性内容

本仓库内容允许也欢迎任何人将其改良后提交给 flathub ~~(当然你照抄后提交过去也行,我懒)~~  
但如果能通知一声我就更好了

## 计划

> freedesktop 22.04 的环境已经破坏了 Electron/Chromium 老版本的 GPU 枚举过程  
> 故基于这些技术的应用暂且加入 `--no-sandbox` 进行临时修复

- [x] Icalingua (plus-plus) io.github.Icalingua.Icalingua
- [x] 即时设计 design.js.Design
- [x] COSBrowser com.tencent.COSBrowser
- [x] 飞书 com.bytedance.FeiShu

还有一些 Wine/DeepinWine 打包也想放进来,但是考虑到可能会很麻烦就暂时搁置

## 弃用

### 网易云音乐 com.netease.CloudMusic

Wine 下面运行 Windows 版已经足够好,故不再考虑万年不更新的 Deepin 版

### 钉钉 com.alibabainc.DingTalk

你 TM 倒是好好做啊,隔壁飞书的 Linux 版比你上进不知道多少倍

### Qv2Ray com.qv2ray.Qv2Ray

哎,看社区啥时候复活吧

### 币安 com.binance.BinanceDesktop

虽然是 Electron 的较老版本,但加入任何参数都没办法修好崩溃问题. 先不做了

## 一些规范

- 启动脚本一律命名为 `{小写应用名}-launcher.sh` 除非应用本身冲突
- 如果可以,尽可能在 yml 中内联声明脚本
- install 命令先用 `-t` 写目标目录,再写文件名
