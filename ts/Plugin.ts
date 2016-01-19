module Fabrique {
    export module Plugins {
        export interface NineSliceObjectFactory extends Phaser.GameObjectFactory {
            nineSlice: (x:number, y:number, key:string, width:number, height:number, group?:Phaser.Group) => Fabrique.NineSlice;
        }
        export interface NineSliceObjectCreator extends Phaser.GameObjectCreator {
            nineSlice: (x:number, y:number, key:string, width:number, height:number, group?:Phaser.Group) => Fabrique.NineSlice;
        }

        export interface NineSliceCache extends Phaser.Cache {
            addNineSlice: (key:string, data:any) => void;
            getNineSlice: (key:string) => any;
            nineSlice: {[key: string]: any};
        }

        export interface NineSliceLoader extends Phaser.Loader {
            nineSlice: (key:string, url:string, top:number, left?:number, right?:number, bottom?:number) => void;
            cache: NineSliceCache;
        }

        export interface NineSliceGame extends Phaser.Game {
            add: NineSliceObjectFactory;
            load: NineSliceLoader;
            cache: NineSliceCache;
        }

        export class NineSlice extends Phaser.Plugin {
            constructor(game:Phaser.Game, parent:PIXI.DisplayObject) {
                super(game, parent);

                this.addNineSliceCache();
                this.addNineSliceFactory();
                this.addNineSliceLoader();
            }

            private addNineSliceLoader() {
                (<Fabrique.Plugins.NineSliceLoader>Phaser.Loader.prototype).nineSlice = function (key:string, url:string, top:number, left?:number, right?:number, bottom?:number) {

                    if (!left) {
                        left = top;
                    }

                    if (!right) {
                        right = left;
                    }

                    if (!bottom) {
                        bottom = top;
                    }

                    var cacheData = {
                        top: top,
                        bottom: bottom,
                        left: left,
                        right: right
                    };

                    this.addToFileList('image', key, url);

                    this.game.cache.addNineSlice(key, cacheData);
                };
            }

            /**
             * Extends the GameObjectFactory prototype with the support of adding NineSlice. this allows us to add NineSlice methods to the game just like any other object:
             * game.add.NineSlice();
             */
            private addNineSliceFactory() {
                (<Fabrique.Plugins.NineSliceObjectFactory>Phaser.GameObjectFactory.prototype).nineSlice = function (x:number, y:number, key:string, width:number, height:number, group?:Phaser.Group):Fabrique.NineSlice {
                    if (group === undefined) {
                        group = this.world;
                    }

                    var nineSliceObject = new Fabrique.NineSlice(this.game, x, y, key, width, height);

                    return group.add(nineSliceObject);
                };

                (<Fabrique.Plugins.NineSliceObjectCreator>Phaser.GameObjectCreator.prototype).nineSlice = function (x:number, y:number, key:string, width:number, height:number):Fabrique.NineSlice {
                    return new Fabrique.NineSlice(this.game, x, y, key, width, height);
                };
            }

            /**
             * Extends the Phaser.Cache prototype with NineSlice properties
             */
            private addNineSliceCache():void {
                //Create the cache space
                (<Fabrique.Plugins.NineSliceCache>Phaser.Cache.prototype).nineSlice = {};

                //Method for adding a NineSlice dict to the cache space
                (<Fabrique.Plugins.NineSliceCache>Phaser.Cache.prototype).addNineSlice = function (key:string, data:any) {
                    this.nineSlice[key] = data;
                };

                //Method for fetching a NineSlice dict from the cache space
                (<Fabrique.Plugins.NineSliceCache>Phaser.Cache.prototype).getNineSlice = function (key:string):any {
                    var data = this.nineSlice[key];

                    if (undefined === data) {
                        console.warn('Phaser.Cache.getNineSlice: Key "' + key + '" not found in Cache.');
                    }

                    return data;
                };
            }
        }
    }
}
