/**
 * Tạo hàm đếm tăng dần từ giá trị start
 * @param {number} start - Giá trị bắt đầu
 * @returns {Function} - Hàm tăng giá trị lên 1 mỗi lần gọi
 */
function createCounter(start) {
    let count = start;
    return function() {
        return ++count;
    };
}

// Test cases
const counter1 = createCounter(5);
console.log("Test case 1:", counter1()); // 6
console.log("Test case 1:", counter1()); // 7
console.log("Test case 1:", counter1()); // 8

const counter2 = createCounter(0);
console.log("Test case 2:", counter2()); // 1
console.log("Test case 2:", counter2()); // 2

const counter3 = createCounter(-3);
console.log("Test case 3:", counter3()); // -2
console.log("Test case 3:", counter3()); // -1
console.log("Test case 3:", counter3()); // 0 