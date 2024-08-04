# My [Tidal Neptune Client](https://neptune.uwu.network/) Plugins

To install any of these plugins you need to have the [Tidal Neptune Client](https://neptune.uwu.network/) installed.

Then just paste the **Install Url** into the plugins page and hit enter.
![image](https://github.com/Inrixia/neptune-plugins/assets/6373693/a997156c-a281-46ec-992a-397a742dd146)

## Available Plugins

### Volume Scroll

**Install Url: [`https://raw.githubusercontent.com/Araxeus/tidal-neptune-plugins/main/plugins/volume-scroll/release/`](https://raw.githubusercontent.com/Araxeus/tidal-neptune-plugins/main/plugins/volume-scroll/release/)**  
Enable scrolling the mousewheel on the player to change the playback volume and a setting to change volume "steps"

## Other Plugin Repositories

- **[Inrixia/neptune-plugins](https://github.com/Inrixia/neptune-plugins)**
- **[twnlink/neptune-plugins](https://github.com/twnlink/neptune-plugins)**

----

## Contributing

If you have a plugin you'd like to add to this list, or you want to add features/fix bugs - feel free to open a pull request.

To create a new plugin, create a new folder in [`/plugins`](/plugins) with the name of your plugin. Inside that folder, create a `src` folder with your plugin's source code. The entry point should be `index.ts`.

the plugin folder should also contain a `plugin.json` file with the following structure:

```json
{
  "name": "Plugin Name",
  "description": "A short description of what the plugin does",
  "author": "Your Name",
  "version": "0.0.1",
}
```

your entry point can export the following:

- `onUnload()`: Function called when the plugin is unloaded

- `Settings`: A voby Element that will be rendered in the settings page.

### Development

This repository uses [Bun](https://bun.sh) as a package manager and build tool.

To install dependencies:

```bash
bun install
```

To build:

```bash
bun b
```

The whole build process is explained in [scripts/build.ts](/scripts/build.ts).
