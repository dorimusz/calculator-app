export const calc = (a, b, operator) => {

    const addNums = (a, b) => {
        const sum = parseInt(a) + parseInt(b);
        console.log(typeof (sum))
        console.log(sum)
        return sum;
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