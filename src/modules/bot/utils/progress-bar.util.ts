import { Format } from 'cli-progress';

const defaultFormatOptions = {
    barGlue: '',
    format: '[{bar}] | {value}/{total}',
    autopaddingChar: '',
};

const defaultParams = {
    eta: 0,
    startTime: 0,
    maxWidth: 100,
};

export function getProgressBar(value: number, total: number) {
    const progress = value / total;
    const barCompleteChar = '\u2588';
    const barIncompleteChar = '\u2591';

    return Format.Formatter(
        {
            ...defaultFormatOptions,
            barsize: 20,
            barCompleteString: (new Array(100 ).join(barCompleteChar)),
            barIncompleteString: (new Array(100).join(barIncompleteChar)),
            barCompleteChar,
            barIncompleteChar,
        },
        {
            ...defaultParams,
            progress,
            value,
            total,
        },
        {},
    );
}
