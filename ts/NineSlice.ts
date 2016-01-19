module Fabrique {
    export class NineSlice extends Phaser.Image {
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
        public baseTexture:PIXI.BaseTexture;

        /**
         * The new texture based on the baseTexture, we use a RenderTexture to construct it
         */
        public texture:Phaser.RenderTexture;

        constructor(game:Fabrique.Plugins.NineSliceGame, x:number, y:number, key:string, width:number, height:number) {
            super(game, x, y, key);

            this.baseTexture = this.texture.baseTexture;

            var data = game.cache.getNineSlice(key);

            if (undefined === data) {
                return;
            }

            this.leftSize = data.left;
            this.topSize = data.top;
            this.rightSize = data.right;
            this.bottomSize = data.bottom;

            this.resize(width, height);
        }

        /**
         * Redraw the the current texture to adjust for the new sizes;
         */
        private renderTexture():void {
            //Set a new empty texture
            this.loadTexture(new Phaser.RenderTexture(this.game, this.localWidth, this.localHeight));

            //The positions we want from the base texture
            var textureXs:number[] = [0, this.leftSize, this.baseTexture.width - this.rightSize, this.baseTexture.width];
            var textureYs:number[] = [0, this.topSize, this.baseTexture.height - this.bottomSize, this.baseTexture.height];

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

                    this.texture.renderXY(s, finalXs[xi], finalYs[yi]);
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
        private createTexturePart(x:number, y:number, width:number, height:number):Phaser.Image {
            var frame = new PIXI.Rectangle(
                this.texture.frame.x + x,
                this.texture.frame.y + y,
                width,
                height
            );

            return new Phaser.Image(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
        }
    }
}