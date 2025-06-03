/**
 * So sánh hai giá trị có giống nhau không (đệ quy)
 * @param {*} a - Giá trị thứ nhất
 * @param {*} b - Giá trị thứ hai
 * @returns {boolean} - true nếu hai giá trị giống nhau
 */
function sosanhHam(a, b) {
    // So sánh các kiểu dữ liệu nguyên thủy
    if (a === b) return true;
    
    // Kiểm tra null và undefined
    if (a == null || b == null) return a === b;
    
    // Kiểm tra kiểu dữ liệu
    if (typeof a !== typeof b) return false;
    
    // So sánh Date
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    
    // So sánh Array
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => sosanhHam(item, b[index]));
    }
    
    // So sánh Object
    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        
        if (keysA.length !== keysB.length) return false;
        
        return keysA.every(key => 
            keysB.includes(key) && sosanhHam(a[key], b[key])
        );
    }
    
    return false;
}

// Test cases
console.log("Test case 1 - Simple values:", sosanhHam(1, 1)); // true
console.log("Test case 2 - Different types:", sosanhHam(1, "1")); // false
console.log("Test case 3 - Objects:", sosanhHam(
    { a: 1, b: { c: 2 } },
    { a: 1, b: { c: 2 } }
)); // true
console.log("Test case 4 - Arrays:", sosanhHam(
    [1, [2, 3], { a: 4 }],
    [1, [2, 3], { a: 4 }]
)); // true
console.log("Test case 5 - Dates:", sosanhHam(
    new Date("2023-01-01"),
    new Date("2023-01-01")
)); // true
console.log("Test case 6 - Different objects:", sosanhHam(
    { a: 1, b: 2 },
    { a: 1, b: 3 }
)); // false
console.log("Test case 7 - Nested arrays:", sosanhHam(
    [1, [2, [3, 4]]],
    [1, [2, [3, 4]]]
)); // true 