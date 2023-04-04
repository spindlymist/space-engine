import PerlinNoise from './engine/Procedural/PerlinNoise.js';
import {MathUtil} from './engine/Math.js';

function makeNoise(bgimg, size, cell) {
    let img = PerlinNoise.generateNoise(size, cell, 0)
    return bgimg + ', url(' + img.src + ')';
}

const preview = document.createElement('img');
preview.style.position = 'absolute';
preview.style.left = '50%';
preview.style.top = '50%';
preview.style.maxHeight = '100vh';
preview.style.maxWidth = '100vh';
preview.style.transform = 'translate(-50%,-50%)';
preview.style.clipPath = 'ellipse(50% 50% at 50% 50%)';

let bgimg = '';

let now = Date.now();

let detail = 1;
let x = Math.pow(detail, 9);
let noise = PerlinNoise.generateNoise(1024, 2, x);
let min = Infinity;
let max = -Infinity;

for(let size = 4; size < 1024; size *= 2) {
    x /= detail;
    let newNoise = PerlinNoise.generateNoise(1024, size, x);
    // layers.push(newNoise);  

    for(let i = 0; i < 1024 * 1024; i++) {
        noise[i] =
            newNoise[i] < .5
            ? 2 * noise[i] * newNoise[i]
            : 1 - (2 * (1 - noise[i]) * (1 - newNoise[i]));

        // noise[i] = MathUtil.lerp(noise[i], newNoise[i], .25);

        // if(noise[i] < min) min = noise[i];
        // if(noise[i] > max) max = noise[i];
    }
}

// console.log(min, max);

// for(let i = 0; i < 1024 * 1024; i++) {
//     // let value = (noise[i] - min) / (max - min)
//     // noise[i] = value;

//     let dx = (i % 1024) - 512;
//     let dy = (Math.floor(i / 1024)) - 512;
//     let dist = Math.sqrt(dx * dx + dy * dy);

//     let dxOffset = dx + 128;
//     let dyOffset = dy + 128;

//     let value = 1 - (Math.sqrt(dxOffset * dxOffset + dyOffset * dyOffset) / Math.sqrt(384 * 384 * 2));

//     if(dist > 512) {
//         noise[i] = 0;
//     }
//     else {
//         noise[i] =
//             value < .5
//             ? 2 * noise[i] * value
//             : 1 - (2 * (1 - noise[i]) * (1 - value));
//     }
// }

let then = Date.now();
console.log(then - now);
now = Date.now();

// let img = PerlinNoise.renderNoise(noise, {r: 212, g: 131, b: 62});
let img = PerlinNoise.renderNoise(noise, {r: 255, g: 255, b: 255});

then = Date.now();
console.log(then - now);

preview.src = img.src;

document.body.appendChild(preview);
