export const calc = (a, b, operator) => {

    const addNums = (a, b) => {
        return a + b;
    }
    const subtractNums = (a, b) => {
        return a - b;
    }
    const multiplyNums = (a, b) => {
        return a * b;
    }
    const divNums = (a, b) => {
        return a / b;
    }
    return { addNums, subtractNums, multiplyNums, divNums }
}