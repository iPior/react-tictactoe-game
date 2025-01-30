export function getRandomFreeIndex(array) {
    const freeIndexes = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "") {
            freeIndexes.push(i);
        }
    }

    const randomIndex = freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
    return randomIndex;
}
