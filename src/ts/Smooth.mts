export default class Smooth {
    private lastTarget: [number, number] = [0, 0];
    private target: [number, number] = [0, 0];
    private current: [number, number] = [0, 0];
    private lastTime: number = Date.now();
    constructor(private readonly timeScale: number) {}

    easeOutCirc(x: number): number {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    pushValue(value: [number, number]) {
        if (this.target[0] !== value[0] || this.target[1] !== value[1]) {
            this.lastTarget = this.current;
            this.target = value;
            this.lastTime = Date.now();
        }
    }

    getValue(): [number, number] {
        const time = Math.min((Date.now() - this.lastTime) * this.timeScale, 1);
        if (time >= 1) {
            this.current = this.target;
            return this.current;
        }

        this.current = [
            this.lastTarget[0] +
                (this.target[0] - this.lastTarget[0]) * this.easeOutCirc(time),
            this.lastTarget[1] +
                (this.target[1] - this.lastTarget[1]) * this.easeOutCirc(time),
        ];

        return this.current;
    }
}
