module PhaserNineSlice {
    import NineSliceCacheData = PhaserNineSlice.NineSliceCacheData;
    export class NineSlice extends Phaser.Sprite {
        /**
         * The sizes of the edges
         */
        private leftSize:number;
        private topSize:number;
        private rightSize:number;
        private bottomSize:number;

        /**
         * The eventual sizes of the container
         */
        public localWidth:number;
        public localHeight:number;

        /**
         * The original texture, unmodified
         */
        public baseTexture: PIXI.BaseTexture;
        public texture: Phaser.RenderTexture;
        private baseFrame: PIXI.Rectangle;

        constructor(game: PhaserNineSlice.NineSliceGame, x:number, y:number, key: string, frame: string, width:number, height:number, data?: NineSliceCacheData) {
            super(game, x, y, key, frame);

            this.baseTexture = this.texture.baseTexture;
            this.baseFrame = this.texture.frame;

            if (frame !== null && !data) {
                data = game.cache.getNineSlice(frame);
            } else if (!data) {
                data = game.cache.getNineSlice(key);
            }

            if (undefined === data) {
                return;
            }

            this.topSize = data.top;
            if (!data.left) {
                this.leftSize = this.topSize;
            } else {
                this.leftSize = data.left;
            }

            if (!data.right) {
                this.rightSize = this.leftSize;
            } else {
                this.rightSize = data.right;
            }

            if (!data.bottom) {
                this.bottomSize = this.topSize;
            } else {
                this.bottomSize = data.bottom;
            }

            this.loadTexture(new Phaser.RenderTexture(this.game, this.localWidth, this.localHeight));
            this.resize(width, height);
        }

        /**
         * Redraw the the current texture to adjust for the new sizes;
         */
        private renderTexture():void {
            //Set a new empty texture
            this.texture.resize(this.localWidth, this.localHeight, true);

            //The positions we want from the base texture
            var textureXs:number[] = [0, this.leftSize, this.baseFrame.width - this.rightSize, this.baseFrame.width];
            var textureYs:number[] = [0, this.topSize, this.baseFrame.height - this.bottomSize, this.baseFrame.height];

            //These are the positions we need the eventual texture to have
            var finalXs:number[] = [0, this.leftSize, this.localWidth - this.rightSize, this.localWidth];
            var finalYs:number[] = [0, this.topSize, this.localHeight - this.bottomSize, this.localHeight];

            for (var yi = 0; yi < 3; yi++) {
                for (var xi = 0; xi < 3; xi++) {
                    var s = this.createTexturePart(
                        textureXs[xi],                      //x
                        textureYs[yi],                      //y
                        textureXs[xi + 1] - textureXs[xi],  //width
                        textureYs[yi + 1] - textureYs[yi]   //height
                    );

                    s.width = finalXs[xi + 1] - finalXs[xi];
                    s.height = finalYs[yi + 1] - finalYs[yi];

                    (<Phaser.RenderTexture>this.texture).renderXY(s, finalXs[xi], finalYs[yi]);
                }
            }
        }

        /**
         * Set the size of the container, then update all the parts
         *
         * @param width
         * @param height
         */
        public resize(width:number, height:number):void {
            this.localWidth = width;
            this.localHeight = height;

            this.renderTexture();
        }

        /**
         * Here we create a sprite part for the container based on the given input
         *
         * @param x
         * @param y
         * @param width
         * @param height
         * @returns {PIXI.Sprite}
         */
        private createTexturePart(x:number, y:number, width:number, height:number): Phaser.Image {
            var frame = new PIXI.Rectangle(
                this.baseFrame.x + this.texture.frame.x + x,
                this.baseFrame.y + this.texture.frame.y + y,
                Math.max(width, 1),
                Math.max(height, 1)
            );

            return new Phaser.Sprite(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
        }
    }
}