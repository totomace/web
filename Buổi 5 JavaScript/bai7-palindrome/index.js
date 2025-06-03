/**
 * Kiểm tra chuỗi có phải là palindrome không
 * @param {string} str - Chuỗi cần kiểm tra
 * @returns {boolean} - true nếu là palindrome
 */
function kiemtraChuoiNgichDao(str) {
    // Chuyển về chữ thường và loại bỏ ký tự đặc biệt
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // So sánh chuỗi với chuỗi đảo ngược
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Test cases
console.log("Test case 1:", kiemtraChuoiNgichDao("A man, a plan, a canal: Panama")); // true
console.log("Test case 2:", kiemtraChuoiNgichDao("race a car")); // false
console.log("Test case 3:", kiemtraChuoiNgichDao("Was it a car or a cat I saw?")); // true
console.log("Test case 4:", kiemtraChuoiNgichDao("12321")); // true
console.log("Test case 5:", kiemtraChuoiNgichDao("hello")); // false
console.log("Test case 6:", kiemtraChuoiNgichDao("")); // true
console.log("Test case 7:", kiemtraChuoiNgichDao("Madam, I'm Adam")); // true 