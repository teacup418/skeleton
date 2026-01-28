# Obsidian Vault with Auto-Updating Plugins

This repository contains an Obsidian vault that automatically updates specific plugins when new releases are detected.

## Plugins

- [Relay](https://github.com/No-Instructions/Relay)
- [Remotely Save](https://github.com/remotely-save/remotely-save)

https://github.com/remotely-save/remotely-save/releases

## GitHub Action

The workflow in `.github/workflows/update-plugins.yml` runs daily and checks for new releases of the specified plugins. If a new release is found, it downloads the plugin zip, extracts it to `.obsidian/plugins/`, and commits the changes.

## Setup

1. Ensure your repository has the `.obsidian` directory structure.
2. The action uses `GITHUB_TOKEN` for authentication.
3. Versions are tracked in `plugins_versions.json`.

## Manual Trigger

You can manually trigger the update by going to the Actions tab and running the "Update Obsidian Plugins" workflow.


https://github.com/teacup418/skeleton.git