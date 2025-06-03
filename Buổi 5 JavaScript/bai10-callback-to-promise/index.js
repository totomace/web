/**
 * Chuyển đổi hàm readFile từ callback sang Promise
 * @param {string} file - Tên file cần đọc
 * @returns {Promise} - Promise chứa nội dung file
 */
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        readFile(file, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

// Giả lập hàm readFile với callback
function readFile(file, callback) {
    // Giả lập thời gian đọc file
    setTimeout(() => {
        if (file === 'error.txt') {
            callback(new Error('File not found'));
        } else {
            callback(null, `Content of ${file}`);
        }
    }, 1000);
}

// Test cases
console.log("Test case 1 - Reading valid file...");
readFileAsync('test.txt')
    .then(data => {
        console.log("Test case 1 - Success:", data);
    })
    .catch(error => {
        console.log("Test case 1 - Error:", error.message);
    });

console.log("\nTest case 2 - Reading invalid file...");
readFileAsync('error.txt')
    .then(data => {
        console.log("Test case 2 - Success:", data);
    })
    .catch(error => {
        console.log("Test case 2 - Error:", error.message);
    });

// Test case 3: Using async/await
async function testAsyncAwait() {
    try {
        const data = await readFileAsync('test.txt');
        console.log("\nTest case 3 - Success:", data);
    } catch (error) {
        console.log("\nTest case 3 - Error:", error.message);
    }
}

testAsyncAwait(); 