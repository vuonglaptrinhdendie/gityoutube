function importCSV() {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];

  if (!file) {
    showNotification("Vui lòng chọn một file CSV!", "error");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(1);

    const thead = document.querySelector("#dataTable thead");
    const tbody = document.querySelector("#dataTable tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";

    // Header row
    let headerHTML = "<tr>";
    headers.forEach(h => headerHTML += `<th>${h.trim()}</th>`);
    headerHTML += "</tr>";
    thead.innerHTML = headerHTML;

    // Data rows with animation delay
    rows.forEach((row, index) => {
      const cols = row.split(",");
      let rowHTML = `<tr style="animation-delay: ${index * 0.1}s">`;
      cols.forEach(col => rowHTML += `<td>${col.trim()}</td>`);
      rowHTML += "</tr>";
      tbody.innerHTML += rowHTML;
    });
    
    showNotification("Dữ liệu đã được nhập thành công!", "success");
  };

  reader.readAsText(file);
}

function exportCSV() {
  const table = document.getElementById("dataTable");
  
  if (table.rows.length <= 1) {
    showNotification("Không có dữ liệu để xuất!", "error");
    return;
  }
  
  let csv = [];
  const rows = table.querySelectorAll("tr");

  rows.forEach(row => {
    const cols = row.querySelectorAll("th, td");
    const rowData = Array.from(cols).map(col => `"${col.innerText}"`);
    csv.push(rowData.join(","));
  });

  const csvString = csv.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "du_lieu.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showNotification("Dữ liệu đã được xuất thành công!", "success");
}

// Thêm thông báo khi thực hiện hành động
function showNotification(message, type) {
  // Kiểm tra và xóa thông báo cũ nếu có
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Tạo thông báo mới
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Thêm icon phù hợp
  const icon = document.createElement('i');
  if (type === 'success') {
    icon.className = 'fas fa-check-circle';
  } else if (type === 'error') {
    icon.className = 'fas fa-exclamation-circle';
  }
  
  notification.prepend(icon);
  document.body.appendChild(notification);
  
  // Hiển thị thông báo
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Tự động ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
