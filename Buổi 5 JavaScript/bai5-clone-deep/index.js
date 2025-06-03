/**
 * Sao chép object hoặc array một cách sâu
 * @param {*} obj - Object hoặc array cần sao chép
 * @returns {*} - Bản sao của object hoặc array
 */
function cloneDeep(obj) {
    // Xử lý các trường hợp đặc biệt
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Xử lý Date
    if (obj instanceof Date) {
        return new Date(obj);
    }

    // Xử lý Array
    if (Array.isArray(obj)) {
        return obj.map(item => cloneDeep(item));
    }

    // Xử lý Object
    const clonedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = cloneDeep(obj[key]);
        }
    }
    return clonedObj;
}

// Test cases
const original = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4, { e: 5 }]
    },
    f: new Date(),
    g: null,
    h: undefined
};

const cloned = cloneDeep(original);

console.log("Test case 1 - Original:", original);
console.log("Test case 1 - Cloned:", cloned);
console.log("Test case 1 - Are equal?", JSON.stringify(original) === JSON.stringify(cloned));
console.log("Test case 1 - Are different objects?", original !== cloned);
console.log("Test case 1 - Nested objects are different?", original.b !== cloned.b);
console.log("Test case 1 - Nested arrays are different?", original.b.d !== cloned.b.d);

// Test case 2: Array
const arr = [1, [2, 3], { a: 4 }];
const clonedArr = cloneDeep(arr);
console.log("\nTest case 2 - Original array:", arr);
console.log("Test case 2 - Cloned array:", clonedArr);
console.log("Test case 2 - Are different arrays?", arr !== clonedArr);
console.log("Test case 2 - Nested array is different?", arr[1] !== clonedArr[1]); 