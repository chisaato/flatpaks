# SecureCRT 与 SecureFX 的组合包

## 构建方式

在本文所在目录里创建一个目录 `bin`
去下载 Ubuntu 20 版的 scrt-sfx 压缩包,重命名为 `bundle.tar.gz` 丢进 `bin` 里.

然后就可以构建了

```bash
flatpak-builder --user --install --force-clean flatpak_app com.vandyke.Bundle.yml
```

## 权限

如果需要放开权限,用 Flatseal 去编辑即可
