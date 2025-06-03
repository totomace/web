/**
 * Tạo hàm debounce để trì hoãn việc gọi hàm
 * @param {Function} fn - Hàm cần được debounce
 * @param {number} delay - Thời gian trì hoãn (ms)
 * @returns {Function} - Hàm đã được debounce
 */
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Xóa timeout cũ nếu có
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Tạo timeout mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test cases
// Test case 1: Basic debounce
const debouncedLog = debounce((message) => {
    console.log("Test case 1 - Message:", message);
}, 1000);

console.log("Test case 1 - Calling debounced function multiple times...");
debouncedLog("First call");
debouncedLog("Second call");
debouncedLog("Third call");
// Chỉ "Third call" sẽ được in ra sau 1 giây

// Test case 2: Debounce with context
const obj = {
    value: 0,
    increment: debounce(function() {
        this.value++;
        console.log("Test case 2 - Value:", this.value);
    }, 500)
};

console.log("\nTest case 2 - Calling increment multiple times...");
obj.increment();
obj.increment();
obj.increment();
// Giá trị sẽ chỉ tăng 1 lần sau 500ms

// Test case 3: Debounce with arguments
const debouncedSum = debounce((a, b) => {
    console.log("Test case 3 - Sum:", a + b);
}, 800);

console.log("\nTest case 3 - Calling sum with different arguments...");
debouncedSum(1, 2);
debouncedSum(3, 4);
debouncedSum(5, 6);
// Chỉ tổng của 5 + 6 sẽ được in ra sau 800ms 