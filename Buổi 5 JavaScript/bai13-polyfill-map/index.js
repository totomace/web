/**
 * Polyfill cho Array.prototype.map
 * @param {Function} callback - Hàm callback được gọi cho mỗi phần tử
 * @param {*} thisArg - Giá trị this được sử dụng trong callback
 * @returns {Array} - Mảng mới chứa kết quả
 */
Array.prototype.myMap = function(callback, thisArg) {
    // Kiểm tra this có phải là array không
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    
    // Kiểm tra callback có phải là function không
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    
    // Tạo mảng kết quả
    const result = [];
    
    // Duyệt qua từng phần tử
    for (let i = 0; i < this.length; i++) {
        // Gọi callback với context và tham số phù hợp
        result[i] = callback.call(thisArg, this[i], i, this);
    }
    
    return result;
};

// Test cases
// Test case 1: Basic mapping
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.myMap(x => x * 2);
console.log("Test case 1 - Original:", numbers);
console.log("Test case 1 - Doubled:", doubled);

// Test case 2: Using thisArg
const obj = {
    multiplier: 3,
    multiply: function(x) {
        return x * this.multiplier;
    }
};
const tripled = numbers.myMap(obj.multiply, obj);
console.log("\nTest case 2 - Tripled:", tripled);

// Test case 3: Using index
const withIndex = numbers.myMap((x, i) => x + i);
console.log("\nTest case 3 - With index:", withIndex);

// Test case 4: Sparse array
const sparse = [1, , 3, , 5];
const mapped = sparse.myMap(x => x || 0);
console.log("\nTest case 4 - Sparse array:", sparse);
console.log("Test case 4 - Mapped:", mapped);

// Test case 5: Error handling
try {
    numbers.myMap(null);
} catch (error) {
    console.log("\nTest case 5 - Error:", error.message);
} 