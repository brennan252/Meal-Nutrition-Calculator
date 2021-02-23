// data.tsx
// exports:
// 1) weight units array 
// 2) ouncesToGrams(ounces)
// 3) poundsToGrams(pounds)

export const weightUnits = ['ounces', 'pounds', 'grams'];

export const ouncesToGrams = (ounces: number) => {
    const result = Number(ounces * 28.349553);
    return (result);
};

export const poundsToGrams = (pounds: number) => {
    const result = Number(pounds * 453.592);
    return (result);
};