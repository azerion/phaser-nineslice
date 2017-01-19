module PhaserNineSlice {
    export interface NineSliceObjectFactory extends Phaser.GameObjectFactory {
        nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => PhaserNineSlice.NineSlice;
    }
    export interface NineSliceObjectCreator extends Phaser.GameObjectCreator {
        nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => PhaserNineSlice.NineSlice;
    }

    export interface NineSliceCache extends Phaser.Cache {
        addNineSlice: (key: string, data: NineSliceCacheData) => void;
        getNineSlice: (key: string) => NineSliceCacheData;
        nineSlice: {[key: string]: NineSliceCacheData};
    }

    export interface NineSliceLoader extends Phaser.Loader {
        nineSlice: (key: string, url: string, top: number, left?: number, right?: number, bottom?: number) => void;
        cache: NineSliceCache;
    }

    export interface NineSliceGame extends Phaser.Game {
        add: NineSliceObjectFactory;
        load: NineSliceLoader;
        cache: NineSliceCache;
    }

    export interface NineSliceCacheData {
        top: number;
        bottom?: number;
        left?: number;
        right?: number;
    }

    export class Plugin extends Phaser.Plugin {
        constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
            super(game, parent);

            this.addNineSliceCache();
            this.addNineSliceFactory();
            this.addNineSliceLoader();
        }

        private addNineSliceLoader() {
            (<PhaserNineSlice.NineSliceLoader>Phaser.Loader.prototype).nineSlice = function (key: string, url: string, top: number, left?: number, right?: number, bottom?: number) {
                let cacheData: NineSliceCacheData = {
                    top: top
                };

                if (left) {
                    cacheData.left = left;
                }

                if (right) {
                    cacheData.right = right;
                }

                if (bottom) {
                    cacheData.bottom = bottom;
                }

                this.addToFileList('image', key, url);

                this.game.cache.addNineSlice(key, cacheData);
            };
        }

        /**
         * Extends the GameObjectFactory prototype with the support of adding NineSlice. this allows us to add NineSlice methods to the game just like any other object:
         * game.add.NineSlice();
         */
        private addNineSliceFactory() {
            (<PhaserNineSlice.NineSliceObjectFactory>Phaser.GameObjectFactory.prototype).nineSlice = function (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group): PhaserNineSlice.NineSlice {
                if (group === undefined) {
                    group = this.world;
                }

                var nineSliceObject = new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);

                return group.add(nineSliceObject);
            };

            (<PhaserNineSlice.NineSliceObjectCreator>Phaser.GameObjectCreator.prototype).nineSlice = function (x: number, y: number, key: string, frame: string, width: number, height: number): PhaserNineSlice.NineSlice {
                return new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
            };
        }

        /**
         * Extends the Phaser.Cache prototype with NineSlice properties
         */
        private addNineSliceCache(): void {
            //Create the cache space
            (<PhaserNineSlice.NineSliceCache>Phaser.Cache.prototype).nineSlice = {};

            //Method for adding a NineSlice dict to the cache space
            (<PhaserNineSlice.NineSliceCache>Phaser.Cache.prototype).addNineSlice = function (key: string, data: any) {
                this.nineSlice[key] = data;
            };

            //Method for fetching a NineSlice dict from the cache space
            (<PhaserNineSlice.NineSliceCache>Phaser.Cache.prototype).getNineSlice = function (key: string): any {
                var data = this.nineSlice[key];

                if (undefined === data) {
                    console.warn('Phaser.Cache.getNineSlice: Key "' + key + '" not found in Cache.');
                }

                return data;
            };
        }
    }
}
