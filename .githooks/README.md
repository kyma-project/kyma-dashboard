# Git Hooks

## Overview

This directory provides Git hooks that you can use in a standard Git development flow.

## Installation

To use Git hooks in your local Git repository, configure the default Git hooks path.
To do so, run this command in the root of your `kyma-dashboard` Git repository:
```shell
git config core.hooksPath .githooks
```
Now, your local Git repository uses Git hooks from the `.githooks` path.

## Troubleshooting

### Mac: VCS Integration in GoLand Can't Use Applications Installed by Homebrew

This is a common issue for all JetBrains IDEs that run on a Mac.
Upon startup, GoLand initializes the `PATH` based on the macOS' `launchd` path.
<!-- markdown-link-check-disable-next-line -->
#### Remedy

1. Add the `/usr/local/bin` path to the system `PATH` variable using the following command:
```shell
sudo launchctl config user path /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
>**CAUTION:** This change is applied to ALL uses of a computer!

After running this command, reboot your machine to apply changes.

For more details, see this [Stack Exchange thread](https://apple.stackexchange.com/questions/51677/how-to-set-path-for-finder-launched-applications).

## Hooks List
|Name|Type|Description|
|---|---|---|
|01-prepare-extensibility|pre-commit|Automatically check changes in dev, stage, prod folders, pack extensions and adds the resulting files to the commit if there were any changes.| 
