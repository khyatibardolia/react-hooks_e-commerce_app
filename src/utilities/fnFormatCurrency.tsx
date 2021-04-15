export const fnFormatCurrency = (num: number): any => {
    return `€ ${Number(num.toFixed(2)).toLocaleString()}`;
};
