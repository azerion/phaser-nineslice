declare module PhaserNineSlice {
    import NineSliceCacheData = PhaserNineSlice.NineSliceCacheData;
    class NineSlice extends Phaser.Sprite {
        private leftSize;
        private topSize;
        private rightSize;
        private bottomSize;
        localWidth: number;
        localHeight: number;
        baseTexture: PIXI.BaseTexture;
        texture: Phaser.RenderTexture;
        private baseFrame;
        constructor(game: PhaserNineSlice.NineSliceGame, x: number, y: number, key: string, frame: string, width: number, height: number, data?: NineSliceCacheData);
        private renderTexture();
        resize(width: number, height: number): void;
        private createTexturePart(x, y, width, height);
    }
}
declare module PhaserNineSlice {
    interface NineSliceObjectFactory extends Phaser.GameObjectFactory {
        nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => PhaserNineSlice.NineSlice;
    }
    interface NineSliceObjectCreator extends Phaser.GameObjectCreator {
        nineSlice: (x: number, y: number, key: string, frame: string, width: number, height: number, group?: Phaser.Group) => PhaserNineSlice.NineSlice;
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
    class Plugin extends Phaser.Plugin {
        constructor(game: Phaser.Game, parent: Phaser.PluginManager);
        private addNineSliceLoader();
        private addNineSliceFactory();
        private addNineSliceCache();
    }
}
