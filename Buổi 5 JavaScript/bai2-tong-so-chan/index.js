/**
 * Tính tổng các số chẵn trong mảng
 * @param {Array} arr - Mảng đầu vào
 * @returns {number} - Tổng các số chẵn
 */
function tongSoChan(arr) {
    return arr.reduce((sum, num) => {
        // Kiểm tra nếu phần tử là số và là số chẵn
        if (typeof num === 'number' && !isNaN(num) && num % 2 === 0) {
            return sum + num;
        }
        return sum;
    }, 0);
}

// Test cases
console.log("Test case 1:", tongSoChan([1, 2, 3, 4, 5])); // 6 (2 + 4)
console.log("Test case 2:", tongSoChan([2, 4, 6, 8])); // 20
console.log("Test case 3:", tongSoChan([1, 3, 5])); // 0
console.log("Test case 4:", tongSoChan([2, "4", 6, "abc", 8])); // 16 (2 + 6 + 8)
console.log("Test case 5:", tongSoChan([])); // 0 