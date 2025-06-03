/**
 * Chuyển đổi định dạng ngày từ dd/mm/yyyy sang yyyy-mm-dd
 * @param {string} dateStr - Chuỗi ngày tháng định dạng dd/mm/yyyy
 * @returns {string|null} - Chuỗi ngày tháng định dạng yyyy-mm-dd hoặc null nếu không hợp lệ
 */
function dinhDangNgay(dateStr) {
    // Kiểm tra định dạng đầu vào bằng regex
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);
    
    if (!match) return null;
    
    const [_, day, month, year] = match;
    
    // Kiểm tra tính hợp lệ của ngày tháng
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== parseInt(day) || 
        date.getMonth() !== parseInt(month) - 1 || 
        date.getFullYear() !== parseInt(year)) {
        return null;
    }
    
    // Trả về định dạng yyyy-mm-dd
    return `${year}-${month}-${day}`;
}

// Test cases
console.log("Test case 1:", dinhDangNgay("25/12/2023")); // "2023-12-25"
console.log("Test case 2:", dinhDangNgay("31/02/2023")); // null (ngày không hợp lệ)
console.log("Test case 3:", dinhDangNgay("01/01/2024")); // "2024-01-01"
console.log("Test case 4:", dinhDangNgay("invalid")); // null
console.log("Test case 5:", dinhDangNgay("29/02/2024")); // "2024-02-29" (năm nhuận) 