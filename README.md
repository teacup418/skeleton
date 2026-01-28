# Obsidian仓库骨架

本仓库基于1.11.5版本创建的默认仓库修改，进行了部分设置，预装两个同步插件，允许用户快速通过非官方手段同步仓库。例如下载压缩包解压后通过icloud导入ios端，然后登陆账号进行同步。

**执行了以下设置**
- 指定新建笔记文件夹为`repo`
- 指定默认附件位置为`_assets`
- 设置删除后文件移动到`.trash`文件夹并关闭删除提示
- 关闭安全模式，开启插件市场
- 安装relay和remotely-save插件

**还需要完成的设置**
- 登陆relay
- 创建或使用已有的服务器，关联repo文件夹。仅repo下的`.md`文件会被relay追踪并同步。
- 在remotely-save插件导入导出功能中，粘贴下面的URL，导入预设的配置。

该remotely-save配置设置如下：
- 仅同步下面4个较少改动的文件夹，经常修改的文字类笔记数据由relay同步。
	- `.trash` 废纸篓
	- `_assets` 附件
	- `tools` 其他插件会产生的无法被relay同步的数据
	- `.obsidian` ob笔记库设置
- 激活同步以下划线开头的文件夹
- 同步obsidian配置文件夹
- 插件触发删除移动到.trash文件夹
- 每5min自动运行
- 开启软件30s同步一次

```
obsidian://remotely-save?func=settings&version=0.5.25&vault=skeleton&data=%7B%22password%22%3A%22%22%2C%22serviceType%22%3A%22s3%22%2C%22currLogLevel%22%3A%22info%22%2C%22autoRunEveryMilliseconds%22%3A300000%2C%22initRunAfterMilliseconds%22%3A30000%2C%22syncOnSaveAfterMilliseconds%22%3A-1%2C%22agreeToUploadExtraMetadata%22%3Atrue%2C%22concurrency%22%3A5%2C%22syncConfigDir%22%3Atrue%2C%22syncBookmarks%22%3Afalse%2C%22syncUnderscoreItems%22%3Atrue%2C%22lang%22%3A%22auto%22%2C%22logToDB%22%3Afalse%2C%22skipSizeLargerThan%22%3A-1%2C%22ignorePaths%22%3A%5B%5D%2C%22onlyAllowPaths%22%3A%5B%22.trash%22%2C%22.obsidian%22%2C%22_assets%22%2C%22tools%22%5D%2C%22enableStatusBarInfo%22%3Atrue%2C%22deleteToWhere%22%3A%22obsidian%22%2C%22agreeToUseSyncV3%22%3Atrue%2C%22conflictAction%22%3A%22keep_newer%22%2C%22howToCleanEmptyFolder%22%3A%22clean_both%22%2C%22protectModifyPercentage%22%3A50%2C%22syncDirection%22%3A%22bidirectional%22%2C%22obfuscateSettingFile%22%3Atrue%2C%22enableMobileStatusBar%22%3Afalse%2C%22encryptionMethod%22%3A%22rclone-base64%22%2C%22profiler%22%3A%7B%22enable%22%3Afalse%2C%22enablePrinting%22%3Afalse%2C%22recordSize%22%3Afalse%7D%7D
```
