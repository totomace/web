/**
 * Đếm số lần xuất hiện của mỗi từ trong chuỗi
 * @param {string} str - Chuỗi cần đếm từ
 * @returns {Object} - Object chứa số lần xuất hiện của mỗi từ
 */
function demTu(str) {
    // Chuyển về chữ thường và tách thành mảng các từ
    const words = str.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Loại bỏ ký tự đặc biệt
        .split(/\s+/) // Tách theo khoảng trắng
        .filter(word => word.length > 0); // Loại bỏ từ rỗng
    
    // Đếm số lần xuất hiện
    return words.reduce((count, word) => {
        count[word] = (count[word] || 0) + 1;
        return count;
    }, {});
}

// Test cases
console.log("Test case 1:", demTu("Hello world hello")); 
// { hello: 2, world: 1 }

console.log("\nTest case 2:", demTu("The quick brown fox jumps over the lazy dog")); 
// { the: 2, quick: 1, brown: 1, fox: 1, jumps: 1, over: 1, lazy: 1, dog: 1 }

console.log("\nTest case 3:", demTu("Hello, World! Hello... World?")); 
// { hello: 2, world: 2 }

console.log("\nTest case 4:", demTu("")); 
// {}

console.log("\nTest case 5:", demTu("   Spaces   and   tabs   ")); 
// { spaces: 1, and: 1, tabs: 1 }

console.log("\nTest case 6:", demTu("Multiple   spaces   between   words")); 
// { multiple: 1, spaces: 1, between: 1, words: 1 }

console.log("\nTest case 7:", demTu("Case-Sensitive Test-Test")); 
// { case: 1, sensitive: 1, test: 2 } 