export default class Random {

    static real(min, max) {
        return Math.random() * (max - min) + min;
    }

    static integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static color() {
        let color = Math.floor(Math.random() * 16777216).toString(16);
        return '#000000'.slice(0, -color.length) + color;
    }

}
