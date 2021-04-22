/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomIntArray(min, max, count) {
    const numberArray = [];

    new Array(count).fill(0).forEach(() => {
        let randomInt;

        do {
            randomInt = getRandomInt(min, max);
        } while (numberArray.includes(randomInt));

        numberArray.push(randomInt);
    });

    return numberArray;
}

export function getRandomItemsFromArray<T>(array: T[], count: number): T[] {
    const min = 0;
    const max = array.length - 1;
    const randomIndexes = getRandomIntArray(min, max, count);

    return randomIndexes.map((index) => array[index]);
}
