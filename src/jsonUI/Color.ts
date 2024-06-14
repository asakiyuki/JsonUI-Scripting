export class Color {
    static parse(data: string) {
        const _col = parseInt(data, 16);
        switch (data.length) {
            case 3:
                return [
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 4:
                return [
                    (_col >> 16 & 15) / 15,
                    (_col >> 8 & 15) / 15,
                    (_col >> 4 & 15) / 15,
                    (_col & 15) / 15
                ];
            case 8:
                return [
                    (_col >> 24 & 255) / 255,
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            case 6:
                return [
                    (_col >> 16 & 255) / 255,
                    (_col >> 8 & 255) / 255,
                    (_col & 255) / 255
                ];
            default:
                return null;
        }

    }
}