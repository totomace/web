/**
 * Tạo hàm debounce để trì hoãn việc gọi hàm
 * @param {Function} fn - Hàm cần được debounce
 * @param {number} delay - Thời gian trì hoãn (ms)
 * @returns {Function} - Hàm đã được debounce
 */
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * Cập nhật kích thước cửa sổ
 */
function updateSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    document.getElementById('width').textContent = width;
    document.getElementById('height').textContent = height;
    
    console.log(`Window resized to: ${width}x${height}`);
}

// Tạo phiên bản debounce của hàm updateSize
const debouncedUpdateSize = debounce(updateSize, 250);

// Gắn sự kiện resize
window.addEventListener('resize', debouncedUpdateSize);

// Cập nhật kích thước ban đầu
updateSize(); 