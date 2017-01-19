Phaser Nineslice
================
Phaser-Ninslice plugin adds 9 slice scaling support to Phaser!

Key features:
 * Blazing fast
 * Low memory usage
 * Easy to use API
 
*Imporant*
From here on this library will be published and updated under [@orange-games/phaser-nineslice](https://www.npmjs.com/package/@orange-games/phaser-nineslice) at NPM, the old [phaser-nineslice](https://www.npmjs.com/package/phaser-nineslice) will no longer be maintained.
If you are comming from v1 you can read the migration guide at the bottom

Getting Started
---------------
First you want to get a fresh copy of the plugin. You can get it from this repo or from npm, ain't that handy.
```
npm install @orange-games/phaser-nineslice --save-dev
```

Next up you'd want to add it to your list of js sources you load into your game
```html
<script src="node_modules/@orange-games/phaser-nineslice/build/phaser-nineslice.js"></script>
```

Usage
-----

### Load the plugin

You still need to load the plugin in your game. This is done just like any other plugin in Phaser.
So, to load the plugin, include it one of the Phaser States.

```javascript
function preload(){
game.plugins.add(PhaserNineSlice.NineSlice);
}
```
The plugin will patch your Phaser game with additional load/add/make methods so the ninslice container fits up in Phaser like any normal object!

### Preloading
Like any other asset in Phaser, you still need to preload the image. It's a bit different then a regular image, in the sense that it requires some extra data.

Apart from the key and the url, you can also specify the sizes of top, left, right and bottom sides.

If you don't specify a bottom size, it will use the value for the top. Same goes for right and left.

It's also possible to only give one size. If only one value is given, this  will use that for the edges.

```javascript
//This will load a 9slice texture where all sides are 25px
game.load.nineSlice('my-image', '/images/my-image.jpg', 25);

//This will load a 9slice texture where the
// top is 10, left is 15, right is 20 and bottom is 30 pixels in size
game.load.nineSlice('my-image', '/images/my-image.jpg', 10, 15, 20, 30);
```

### Adding a container
Also adding and creating of 9slice containers is exposed through Phaser's GameObjectCreator and GameObjectFactory.
So you can add a 9slice container to your game just like any other image once it's preloaded!

```javascript
//We specify the x and y position. the key for the image and the width and height of the container. It will be automaticly scaled!
game.add.nineSlice(100, 100, 'my-image', 200, 50);
```

Or if you'd want to do something with it first:
```javascript
//Two options here, first we use Phaser
var container = game.create.nineSlice(0, 0, 'my-image', 200, 50);
container.x = 20;
container.y = 20;
game.add.existing(container);

//Or we use the Constructor
var nineSlice = new PhaserNineSlice.NineSlice(game, 0, 0, 'my-image', null, 200, 50);
nineSlice.x = 50;
nineSlice.y = 50;
game.add.existing(nineSlice);
```

### Using a Texture Atlas
It's also possible to use aan image that's located inside a Texture atlas. The only difference then is that you don't have to preload the image, instead you use the object's constructor and pass the framedata directly on creation:
```javascript
//Add an nineslice image with an texture atlas
var sliceButton = new PhaserNineSlice.NineSlice(
        game,           // Phaser.Game
        150,            // x position
        100,            // y position
        'buttons',      // atlas key
        'btn_clean.png',// Image frame
        200,            // expected width
        100,            // expected height
        { //And this is the framedata, normally this is passed when preloading. Check README for details
            top: 20,    // Amount of pixels for top
            bottom: 23, // Amount of pixels for bottom
            left: 27,   // Amount of pixels for left
            right: 28   // Amount of pixels for right
        }
);
this.game.add.existing(sliceButton);
```

### Resize method

9Slice container has a resize method which lets you expand/shorten the width or length of the image.
When using resize method, make sure values are not lower than the width of the image corners

```javascript
var sliceContainer = game.add.nineSlice(5, 5, 'image', null, 48, 48);
sliceContainer.resize(100, 200);
```

Migrating from v1
-----------------
the API of the objects is the same as before but the namespace changed. We decided to remove the Fabrique namespace, and house the plugin in it's own (PhaserNineSlice).
so:
Fabrique.Plugins.NineSlice
becomes:
PhaserNineSlice.Plugin

and all other references of Fabrique.Plugins can be replaced with PhaserNineSlice.
If you are still unsure how or what, both the example and this readme have been adjusted to work with the new namespace.

Disclaimer
----------
We at OrangeGames just love playing and creating awesome games. We aren't affiliated with Phaser.io. We just needed some awesome nine slice containers in our awesome HTML5 games. Feel free to use it for enhancing your own awesome games!

Phaser NineSlice is distributed under the MIT license. All 3rd party libraries and components are distributed under their respective license terms.
