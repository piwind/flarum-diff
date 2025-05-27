# Diff for Flarum

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/piwind/flarum-diff/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/piwind/flarum-diff.svg)](https://packagist.org/packages/piwind/flarum-diff) [![Total Downloads](https://img.shields.io/packagist/dt/piwind/flarum-diff.svg)](https://packagist.org/packages/piwind/flarum-diff)

This extension adds a "post revision history" feature to your [Flarum](https://github.com/flarum) forum.

## About This Fork

This repository is a fork of [hasan-ozbey/flarum-diff](https://github.com/hasan-ozbey/flarum-diff).

### 改动说明

- 删掉了原项目中的土耳其语tr，Sorry因为我个人看不懂
- 已编辑这个按钮的位置很偏（button元素的padding导致的）
- margin-top: -2px; 才是对的 不应该是-4
- 

## Features

- Based on [jfcherng/php-diff](https://github.com/jfcherng/php-diff) repository (this one is forked from [chrisboulton/php-diff](https://github.com/chrisboulton/php-diff) since it's no longer maintained).
- Option for **line** (default), **word** and **char** level diffs.
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

## Screenshots

![Diff Collage](https://i.ibb.co/FJywHKn/rsz-diff-collage.png)

![Post-Stream Item](https://i.ibb.co/4m21pnM/post-Stream-Item.png)

![Dropdown List](https://i.ibb.co/PTTcWCw/dropdown-List.png)

## Links

- [Source code on GitHub](https://github.com/piwind/flarum-diff)
- [Report an issue](https://github.com/piwind/flarum-diff/issues)
- [Download via Packagist](https://packagist.org/packages/piwind/flarum-diff)
