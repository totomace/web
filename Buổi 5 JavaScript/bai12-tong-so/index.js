/**
 * Tính tổng các chữ số của một số nguyên dương bằng đệ quy
 * @param {number} n - Số nguyên dương cần tính tổng chữ số
 * @returns {number} - Tổng các chữ số
 */
function tongSo(n) {
    // Trường hợp cơ sở: nếu n < 10, trả về chính nó
    if (n < 10) {
        return n;
    }
    
    // Lấy chữ số cuối cùng và gọi đệ quy với phần còn lại
    return (n % 10) + tongSo(Math.floor(n / 10));
}

// Test cases
console.log("Test case 1:", tongSo(123)); // 6 (1 + 2 + 3)
console.log("Test case 2:", tongSo(456)); // 15 (4 + 5 + 6)
console.log("Test case 3:", tongSo(9)); // 9
console.log("Test case 4:", tongSo(1000)); // 1 (1 + 0 + 0 + 0)
console.log("Test case 5:", tongSo(999)); // 27 (9 + 9 + 9)

// Test case 6: Số lớn
console.log("Test case 6:", tongSo(123456789)); // 45

// Test case 7: Số có nhiều số 0
console.log("Test case 7:", tongSo(1001001)); // 3 