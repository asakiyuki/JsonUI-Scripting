export class DateUtils {
    public static greatestFormat(time: number): string {
        const units = new Map([
            ["ms", 1000],
            ["s", 60],
            ["m", 60],
        ]);

        const values: number[] = [];

        units.forEach(v => {
            if (time == 0) return;

            if (time >= v) {
                values.push(time % v);
                time /= v;
            } else {
                values.push(time);
                time = 0;
            }
        });

        const unitsArray = Array.from(units.keys());

        return values.reduce((a, c, i) => {
            return `${c.toFixed(i <= 1 ? 2 : 0)}${unitsArray[i]}${i <= 1 ? "" : " " + a}`;
        }, "");
    }
}
