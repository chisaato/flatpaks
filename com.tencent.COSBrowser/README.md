# 即时设计

现在新版本是 Electron 打包的.但是下载链接嘛

连个版本号都没有,怎么办?

> ~~还 TM 带空格~~

```txt
https://img.js.design/assets/download/即时设计 Linux版.AppImage
```

在隔离环境中运行 AppImage 可能会受到一些 ELF magic number 带来的问题.  
其中最典型的就是找不到文件.

加上不是所有的 AppImage 都是按照标准 SquashFS 打包的,导致 `unsquashfs` 不一定能对付所有文件.  
所以这里采用了 `7z` 来解压,但是 `7z` 解压出来不带权限,需要自己修复一下
