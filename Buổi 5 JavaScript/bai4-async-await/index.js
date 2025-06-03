/**
 * Tải dữ liệu từ API và hiển thị tiêu đề
 */
async function loadData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('result').textContent = data.title;
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}

// Gọi hàm khi trang được tải
loadData(); 