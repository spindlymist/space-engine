import { Vector2, Random, MathUtil } from '../Math.js';

export default class PerlinNoise {
    
    static generateNoise(size, gridSize, scalingFactor, seed) {
        if(typeof scalingFactor === 'undefined') {
            scalingFactor = 1;
        }

        // TODO get prng that utilizes seed
        if(typeof seed === 'undefined') {
            seed = Date.now();
        }

        const xPoints = size / gridSize + 1;
        const yPoints = size / gridSize + 1;
        const gradients = [];

        for(let y = 0; y < yPoints; y++) {
            gradients[y] = [];
            for(let x = 0; x < xPoints; x++) {
                const idx = Random.integer(0, PerlinNoise.gradientMaxIdx);
                gradients[y][x] = PerlinNoise.gradients[idx];
            }
        }

        const pixelSize = 1 / gridSize;
        let i = 0;
        const noise = [];
        
        for(let y = 0; y < yPoints - 1; y += pixelSize) {
            const row = Math.floor(y);
            const yOffset = y - row;

            for(let x = 0; x < xPoints - 1; x += pixelSize) {
                const col = Math.floor(x);
                const xOffset = x - col;
                
                const gradientUL = gradients[row][col];
                const gradientUR = gradients[row][col + 1];
                const gradientBR = gradients[row + 1][col + 1];
                const gradientBL = gradients[row + 1][col];
                
                const dotUL = gradientUL.x * (xOffset) + gradientUL.y * yOffset;
                const dotUR = gradientUR.x * (xOffset - 1) + gradientUR.y * yOffset;
                const dotBR = gradientBR.x * (xOffset - 1) + gradientBR.y * (yOffset - 1);
                const dotBL = gradientBL.x * (xOffset) + gradientBL.y * (yOffset - 1);

                const upperVal = MathUtil.smoothstep(dotUL, dotUR, xOffset);
                const lowerVal = MathUtil.smoothstep(dotBL, dotBR, xOffset);
                noise[i++] = (MathUtil.smoothstep(upperVal, lowerVal, yOffset) + .5) * scalingFactor;
            }
        }

        return noise;
    }

    static renderNoise(noise, color) {
        const sideLen = Math.ceil(Math.sqrt(noise.length));

        PerlinNoise.canvas.width = sideLen;
        PerlinNoise.canvas.height = sideLen;

        const imgData = PerlinNoise.ctx.createImageData(sideLen, sideLen);
        for(let i = 0, j = 0; i <= noise.length; i++) {
            const grayVal = noise[i] * 255;
            imgData.data[j++] = noise[i] * color.r;
            imgData.data[j++] = noise[i] * color.g;
            imgData.data[j++] = noise[i] * color.b;
            imgData.data[j++] = 255;
        }

        PerlinNoise.ctx.putImageData(imgData, 0, 0);

        // PerlinNoise.ctx.strokeStyle = 'red';
        // PerlinNoise.ctx.lineWidth = 1;
        // for(let y = 0; y < yPoints; y++) {
        //     for(let x = 0; x < xPoints; x++) {
        //         PerlinNoise.ctx.beginPath();
        //         PerlinNoise.ctx.moveTo(x * gridSize + 10, y * gridSize + 10);
        //         PerlinNoise.ctx.lineTo(x * gridSize + 10 + gradients[y][x].x * 20, y * gridSize + 10 + gradients[y][x].y * 20);
        //         PerlinNoise.ctx.stroke();
        //     }
        // }

        const img = new Image();
        img.src = PerlinNoise.canvas.toDataURL();

        PerlinNoise.canvas.width = 1;
        PerlinNoise.canvas.height = 1;

        return img;
    }

}

PerlinNoise.canvas = document.createElement('canvas');
PerlinNoise.ctx = PerlinNoise.canvas.getContext('2d');
PerlinNoise.gradientCount = 360;
PerlinNoise.gradientMaxIdx = PerlinNoise.gradientCount - 1;
PerlinNoise.gradients = []
for(let angle = 0; angle < 360; angle += 360 / PerlinNoise.gradientCount) {
    PerlinNoise.gradients.push(new Vector2(Math.SQRT2 / 2, 0).rotate(angle));
}
