export default class Smooth {
    private target: [number, number] = [0, 0];
    private current: [number, number] = [0, 0];
    private lastTime: number = Date.now();

    constructor(private readonly p: number) {}

    easeOutCirc(x: number): number {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    pushValue(value: [number, number]) {
        if (this.target[0] !== value[0] || this.target[1] !== value[1]) {
            this.target = value;
        }
    }

    getValue(): [number, number] {
        const now = Date.now();
        const deltaT = now - this.lastTime;
        this.lastTime = now;

        const delta = [
            this.target[0] - this.current[0],
            this.target[1] - this.current[1],
        ];
        if (delta[0] == 0 && delta[1] == 0) return this.target;

        const targetSpeed = [delta[0] * this.p, delta[1] * this.p];

        this.current = [
            this.current[0] + targetSpeed[0] * deltaT,
            this.current[1] + targetSpeed[1] * deltaT,
        ];

        return this.current;
    }
}
