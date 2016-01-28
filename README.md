Phaser Nineslice
================
Phaser-Ninslice plugin adds 9 slice scaling support to Phaser!

Getting Started
---------------
First you want to get a fresh copy of the plugin. You can get it from this repo or from npm, ain't that handy.
```
npm install phaser-spine --save-dev
```

Next up you'd want to add it to your list of js sources you load into your game
```html
<script src="node_modules/phaser-nineslice/build/phaser-nineslice.js"></script>
```

Usage
-----
You still need to load the plugin in your game. This is done just like any other plugin in Phaser
```javascript
game.plugins.add(Fabrique.Plugins.NineSlice);
```
The plugin will patch your Phaser game with additional load/add/make methods so the ninslice container fits up in Phaser like any normal object!


Changelog
---------
### 1.0.0
* Initial release

Disclaimer
----------
We at OrangeGames just love playing and creating awesome games. We aren't affiliated with Phaser.io. We just needed some awesome nine slice containers in our awesome HTML5 games. Feel free to use it for enhancing your own awesome games!