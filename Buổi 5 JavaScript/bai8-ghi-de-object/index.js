/**
 * Gộp hai object với quy tắc ưu tiên thuộc tính của object thứ hai
 * @param {Object} a - Object gốc
 * @param {Object} b - Object ghi đè
 * @returns {Object} - Object mới sau khi gộp
 */
function ghideDoiTuong(a, b) {
    // Tạo bản sao của object a
    const result = { ...a };
    
    // Duyệt qua các thuộc tính của object b
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            // Nếu giá trị là object và không phải null
            if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key])) {
                // Nếu a cũng có thuộc tính tương ứng và là object
                if (a[key] && typeof a[key] === 'object' && !Array.isArray(a[key])) {
                    result[key] = ghideDoiTuong(a[key], b[key]);
                } else {
                    result[key] = { ...b[key] };
                }
            } else {
                // Ghi đè trực tiếp cho các kiểu dữ liệu khác
                result[key] = b[key];
            }
        }
    }
    
    return result;
}

// Test cases
const obj1 = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    e: [1, 2, 3],
    f: null
};

const obj2 = {
    b: {
        c: 4,
        g: 5
    },
    e: [4, 5, 6],
    h: 7
};

const result = ghideDoiTuong(obj1, obj2);

console.log("Test case 1 - Original object 1:", obj1);
console.log("Test case 1 - Original object 2:", obj2);
console.log("Test case 1 - Merged result:", result);
console.log("Test case 1 - Are objects different?", obj1 !== result && obj2 !== result);
console.log("Test case 1 - Nested object is different?", obj1.b !== result.b);

// Test case 2: Arrays
const arr1 = { a: [1, 2, 3] };
const arr2 = { a: [4, 5, 6] };
const result2 = ghideDoiTuong(arr1, arr2);
console.log("\nTest case 2 - Original array 1:", arr1);
console.log("Test case 2 - Original array 2:", arr2);
console.log("Test case 2 - Merged result:", result2);
console.log("Test case 2 - Are arrays different?", arr1.a !== result2.a); 