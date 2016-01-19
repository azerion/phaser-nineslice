declare module Fabrique {
    class NineSlice extends Phaser.Image {
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
        /**
         * The new texture based on the baseTexture, we use a RenderTexture to construct it
         */
        texture: Phaser.RenderTexture;
        constructor(game: Fabrique.Plugins.NineSliceGame, x: number, y: number, key: string, width: number, height: number);
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
            nineSlice: (x: number, y: number, key: string, width: number, height: number, group?: Phaser.Group) => Fabrique.NineSlice;
        }
        interface NineSliceObjectCreator extends Phaser.GameObjectCreator {
            nineSlice: (x: number, y: number, key: string, width: number, height: number, group?: Phaser.Group) => Fabrique.NineSlice;
        }
        interface NineSliceCache extends Phaser.Cache {
            addNineSlice: (key: string, data: any) => void;
            getNineSlice: (key: string) => any;
            nineSlice: {
                [key: string]: any;
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
        class NineSlice extends Phaser.Plugin {
            constructor(game: Phaser.Game, parent: PIXI.DisplayObject);
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
