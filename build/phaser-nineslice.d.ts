declare module Fabrique {
    import NineSliceCacheData = Fabrique.Plugins.NineSliceCacheData;
    class NineSlice extends Phaser.Sprite {
        /**
         * The sizes of the edges
         */
        private leftSize;
        private topSize;
        private rightSize;
        private bottomSize;
        /**
         * The eventual sizes of the container
         */
        localWidth: number;
        localHeight: number;
        /**
         * The original texture, unmodified
         */
        baseTexture: PIXI.BaseTexture;
        texture: Phaser.RenderTexture;
        private baseFrame;
        constructor(game: Fabrique.Plugins.NineSliceGame, x: number, y: number, key: string, frame: string, width: number, height: number, data?: NineSliceCacheData);
        /**
         * Redraw the the current texture to adjust for the new sizes;
         */
        private renderTexture();
        /**
         * Set the size of the container, then update all the parts
         *
         * @param width
         * @param height
         */
        resize(width: number, height: number): void;
        /**
         * Here we create a sprite part for the container based on the given input
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @returns {PIXI.Sprite}
         */
        private createTexturePart(x, y, width, height);
    }
}
declare module Fabrique {
    module Plugins {
        interface NineSliceObjectFactory extends Phaser.GameObjectFactory {
            nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => Fabrique.NineSlice;
        }
        interface NineSliceObjectCreator extends Phaser.GameObjectCreator {
            nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => Fabrique.NineSlice;
        }
        interface NineSliceCache extends Phaser.Cache {
            addNineSlice: (key: string, data: NineSliceCacheData) => void;
            getNineSlice: (key: string) => NineSliceCacheData;
            nineSlice: {
                [key: string]: NineSliceCacheData;
            };
        }
        interface NineSliceLoader extends Phaser.Loader {
            nineSlice: (key: string, url: string, top: number, left?: number, right?: number, bottom?: number) => void;
            cache: NineSliceCache;
        }
        interface NineSliceGame extends Phaser.Game {
            add: NineSliceObjectFactory;
            load: NineSliceLoader;
            cache: NineSliceCache;
        }
        interface NineSliceCacheData {
            top: number;
            bottom?: number;
            left?: number;
            right?: number;
        }
        class NineSlice extends Phaser.Plugin {
            constructor(game: Phaser.Game, parent: Phaser.PluginManager);
            private addNineSliceLoader();
            /**
             * Extends the GameObjectFactory prototype with the support of adding NineSlice. this allows us to add NineSlice methods to the game just like any other object:
             * game.add.NineSlice();
             */
            private addNineSliceFactory();
            /**
             * Extends the Phaser.Cache prototype with NineSlice properties
             */
            private addNineSliceCache();
        }
    }
}
