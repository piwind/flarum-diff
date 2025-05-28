# Diff for Flarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/piwind/flarum-diff/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/piwind/flarum-diff.svg)](https://packagist.org/packages/piwind/flarum-diff) [![Total Downloads](https://img.shields.io/packagist/dt/piwind/flarum-diff.svg)](https://packagist.org/packages/piwind/flarum-diff)

This extension adds a "post revision history" feature to your [Flarum](https://github.com/flarum) forum.

## About This Fork

This repository is a fork of [hasan-ozbey/flarum-diff](https://github.com/hasan-ozbey/flarum-diff). Refer to the changelog at the end for detailed modifications.

**目前版本（Diff 1.1.2）存在严重BUG：**

插件初次安装完毕，并开启后，论坛系统会立马崩溃，在日志中看到如下：

```
[2025-05-26 14:37:35] flarum.ERROR: ReflectionException: Class "TheTurk\Diff\Listeners\PostActions" does not exist in /opt/flarum/vendor/illuminate/container/Container.php:877

Next Illuminate\Contracts\Container\BindingResolutionException: Target class [TheTurk\Diff\Listeners\PostActions] does not exist. in /opt/flarum/vendor/illuminate/container/Container.php:879
```

该问题的核心是`TheTurk\Diff\Listeners\PostActions`这个类无法被正确加载，但是查看源码没有发现明显的问题

**解决办法：**Flarum 可能缓存了错误的类信息，清理缓存以解决：

```bash
php flarum cache:clear
```

## Features

- Based on [jfcherng/php-diff](https://github.com/jfcherng/php-diff) repository (this one is forked from [chrisboulton/php-diff](https://github.com/chrisboulton/php-diff) since it's no longer maintained).
- Option for **line**, **word** and **char** (default) level diffs.
- Three render modes including "Inline", "Side By Side" & "Combined".
- Archive old revisions using cron jobs or manually.
- Delete revisions or rollback to certain revision.
- Supports `fof/nightmode`, `the-turk/flarum-quiet-edits`.
- Supports all browsers which are supporting [css-grid](https://caniuse.com/#feat=css-grid).

Also, it won't load (and cache) anything until you click the "Edited" button so no need to worry about loading times.

## Requirements

![php](https://img.shields.io/badge/php-%E2%89%A57.4.0-blue?style=flat-square) ![ext-iconv](https://img.shields.io/badge/ext-iconv-brightgreen?style=flat-square)

You can check your php version by running `php -v` and check if `iconv` is installed by running `php --ri iconv` (which should display `iconv support => enabled`).

## Installation & Updating

Install with composer:

```bash
composer require piwind/flarum-diff
```

Updating:

```bash
composer update piwind/flarum-diff
php flarum migrate
php flarum cache:clear
```

## Usage

Enable the extension and set the permissions. You're ready to go!

### Archive Old Revisions

If **x ≥ A** (where the **x** is post's revision count), first **y=mx+b** revisions for the post can be stored as merged & compressed `BLOB` in a new table (which is called `post_edit_histories_archive`). Specify the **A**, **m** and **b** from the settings modal. Float values of **y** will be rounded to the next lowest integer value. It's recommended to archive old revisions if you want to save storage volume but **_not recommended if you don't want to_**.

If you want to archive old revisions, please consider enabling _cron job option_ from the settings modal. I set a weekly cron job which is working on sundays at 02:00 AM (nothing special) using `diff:archive` command**. Otherwise, it'll try to find & archive old revisions for the post as soon as `Post\Revised` event fires or wait for your `php flarum diff:archive` command. See [this discussion](https://discuss.flarum.org/d/24118-setup-the-flarum-scheduler-using-cron) for setting up the scheduler.

### 插件兼容问题

**受影响的插件：**

- 原生的Likes插件：[flarum/likes](https://github.com/flarum/framework/tree/main/extensions/likes)
- 赞同、反对、点赞数排名：[fof/gamification](https://github.com/FriendsOfFlarum/gamification)
- BBCode More：[piwind/flarum-more-bbcode](https://github.com/piwind/flarum-more-bbcode)
- 帖子编辑记录：[piwind/flarum-diff](https://github.com/piwind/flarum-diff)

**建议的配置和效果：**

- flarum/likes：关闭插件

  fof/gamification：开启

  piwind/flarum-more-bbcode：关闭reply, like的功能，也就是关闭回复可见、点赞可见的功能，因此访问限制只有一个登录可见功能

  piwind/flarum-diff：权限"查看编辑记录"，设置为"注册用户"，这样的话bbcode中的登录可见是不受影响的，因为只有注册用户才能看到编辑记录，也就只有登录才能看到登录可见

- 用fof/gamification来替代flarum/likes，会导致基于flarum/likes的插件功能存在故障，比如piwind/flarum-more-bbcode中的点赞可见标签，会直接失效，所有人都可以看

- flarum-diff的编辑记录，会在编辑记录的原始文本和预览中泄露所有bbcode预期的访问限制的内容，截图见下面

- 如有需要（例如回复可见），可以将piwind/flarum-diff的"查看编辑记录"，设置为"管理组"，除了管理之外的用户看不了编辑记录，也就让访问限制按预期工作了

- 观点：回复可见、点赞可见这类在当前互联网背景下已经不推荐用了，没有强烈需要按建议关闭即可。

## Screenshots

![Diff Collage](https://i.ibb.co/FJywHKn/rsz-diff-collage.png)

![Post-Stream Item](https://i.ibb.co/4m21pnM/post-Stream-Item.png)

![Dropdown List](https://i.ibb.co/PTTcWCw/dropdown-List.png)

![image-20250528131350282](_MARKDOWN_ASSETS/README.assets/image-20250528131350282.png)

## 改动说明

- 删掉了原项目中的土耳其语tr，Sorry因为我个人看不懂

- 添加了中文翻译

- 【已解决】已编辑这个按钮的位置很偏（button元素的padding导致的）

- 【已解决】margin-top: -2px; 才是对的 不应该是-4

- 【TODO】插件重置存在故障

  ```
  flarum.ERROR: PDOException: SQLSTATE[23000]: Integrity constraint violation: 1451 Cannot delete or update a parent row: a foreign key constraint fails in /opt/flarum/vendor/doctrine/dbal/lib/Doctrine/DBAL/Driver/PDOStatement.php:117
  
  Next Doctrine\DBAL\Driver\PDO\Exception: SQLSTATE[23000]: Integrity constraint violation: 1451 Cannot delete or update a parent row: a foreign key constraint fails in /opt/flarum/vendor/doctrine/dbal/lib/Doctrine/DBAL/Driver/PDO/Exception.php:18
  
  Next Illuminate\Database\QueryException: SQLSTATE[23000]: Integrity constraint violation: 1451 Cannot delete or update a parent row: a foreign key constraint fails (SQL: drop table if exists `flarum_post_edit_histories_archive`) in /opt/flarum/vendor/illuminate/database/Connection.php:712
  ```

- 【已解决】该插件会和Piwind\MoreBBCode插件存在冲突：

  ```
  flarum.ERROR: TypeError: Piwind\MoreBBCode\Rendering::reply2seeProcess(): Argument #3 ($discussion) must be of type Flarum\Discussion\Discussion, null given, called in /opt/flarum/vendor/piwind/flarum-more-bbcode/src/Rendering.php on line 46 and defined in /opt/flarum/vendor/piwind/flarum-more-bbcode/src/Rendering.php:75
  ```

- 【已解决】`@username`的元素没有被正确渲染，而是显示`@[已注销]`

  ```
  问题的关键在于：Mentions插件返回的值是core.lib.username.deleted_text
  最后检查下来是：$this->commentPost->getFormatter()->render()的传参故障
  ```

- 修改了默认设置

## Links

- [Source code on GitHub](https://github.com/piwind/flarum-diff)
- [Report an issue](https://github.com/piwind/flarum-diff/issues)
- [Download via Packagist](https://packagist.org/packages/piwind/flarum-diff)

