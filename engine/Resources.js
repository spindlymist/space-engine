export default class Resources {

    static registerImage(key, src) {
        if(Resources.images.hasOwnProperty(key)) {
            return Resources.images[key];
        }

        const img = new Image();
        Resources.promises.push(new Promise((resolve, reject) => {
            img.onload = () => {
                console.log('loaded ' + key);
                resolve();
            }
            img.onerror = () => reject();
            img.src = src;
        }));
        Resources.images[key] = img;

        return img;
    }

    static loadResources() {
        return Promise.all(Resources.promises);
    }

}

Resources.images = {};
Resources.promises = [];
