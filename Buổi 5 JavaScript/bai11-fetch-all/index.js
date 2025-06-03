/**
 * Gọi nhiều API song song và trả về kết quả theo thứ tự
 * @returns {Promise<Array>} - Promise chứa mảng kết quả theo thứ tự
 */
async function fetchAll() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    // Tạo mảng các promise
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    
    // Đợi tất cả các promise hoàn thành
    return Promise.all(promises);
}

// Test cases
console.log("Test case 1 - Fetching all posts...");
fetchAll()
    .then(results => {
        console.log("Test case 1 - Results:", results);
        console.log("Test case 1 - Number of results:", results.length);
        console.log("Test case 1 - First post title:", results[0].title);
    })
    .catch(error => {
        console.log("Test case 1 - Error:", error.message);
    });

// Test case 2: Error handling
async function fetchAllWithError() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://invalid-url.com',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    const promises = urls.map(url => 
        fetch(url)
            .then(response => response.json())
            .catch(error => ({ error: error.message }))
    );
    
    return Promise.all(promises);
}

console.log("\nTest case 2 - Fetching with invalid URL...");
fetchAllWithError()
    .then(results => {
        console.log("Test case 2 - Results:", results);
        console.log("Test case 2 - Error in second request:", results[1].error);
    })
    .catch(error => {
        console.log("Test case 2 - Error:", error.message);
    }); 