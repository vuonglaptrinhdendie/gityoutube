function doSo() {
  const ve = document.getElementById("ve").value.trim();
  const kq = document.getElementById("ketqua");
  const giai = {
    "Đặc biệt": ["879451"],
    "Giải nhất": ["22310"],
    "Giải nhì": ["84659"],
    "Giải ba": ["36295", "04057"],
    "Giải tư": ["79800", "76976", "92144", "37652", "66478", "73534", "53162"],
    "Giải năm": ["2713"],
    "Giải sáu": ["7275", "8839", "8703"],
    "Giải bảy": ["777"],
    "Giải tám": ["35"]
  };

  // Thêm hiệu ứng đang tải
  kq.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...';
  kq.style.color = "#666";
  kq.style.backgroundColor = "";

  // Tạo độ trễ nhỏ để hiệu ứng trực quan hơn
  setTimeout(() => {
    // Kiểm tra đầu vào hợp lệ: Phải là 6 chữ số
    if (!/^\d{6}$/.test(ve)) {
      kq.innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng nhập đúng 6 chữ số.';
      kq.style.color = "#e74c3c";
      kq.style.backgroundColor = "#ffeded";
      return;
    }

    let ketqua = "Rất tiếc, bạn không trúng thưởng.";
    let color = "#666";
    let icon = '<i class="fas fa-times-circle"></i>';
    let bgColor = "#f9f9f9";
    let giaiTrung = "";
    let soTrung = "";

    // Dò theo cách xổ số Việt Nam: so khớp các chữ số từ phải qua trái (hàng đơn vị trở đi)
    // Giải 8: khớp 2 số cuối
    if (ve.slice(-2) === giai["Giải tám"][0]) {
      ketqua = "Chúc Mừng Bạn trúng GIẢI TÁM!";
      color = "#27ae60";
      icon = '<i class="fas fa-trophy"></i>';
      bgColor = "#e7f9ee";
      giaiTrung = "Giải tám";
      soTrung = giai["Giải tám"][0];
    }
    // Giải 7: khớp 3 số cuối
    else if (ve.slice(-3) === giai["Giải bảy"][0]) {
      ketqua = "Chúc Mừng Bạn trúng GIẢI BẢY!";
      color = "#27ae60";
      icon = '<i class="fas fa-trophy"></i>';
      bgColor = "#e7f9ee";
      giaiTrung = "Giải bảy";
      soTrung = giai["Giải bảy"][0];
    }
    // Giải 6: khớp 4 số cuối với một trong các số trúng
    else {
      let trungGiai6 = false;
      for (let so of giai["Giải sáu"]) {
        if (ve.slice(-4) === so) {
          ketqua = "Chúc Mừng Bạn trúng GIẢI SÁU!";
          color = "#27ae60";
          icon = '<i class="fas fa-trophy"></i>';
          bgColor = "#e7f9ee";
          giaiTrung = "Giải sáu";
          soTrung = so;
          trungGiai6 = true;
          break;
        }
      }
      
      // Giải 5: khớp 4 số cuối
      if (!trungGiai6 && ve.slice(-4) === giai["Giải năm"][0]) {
        ketqua = "Chúc Mừng Bạn trúng GIẢI NĂM!";
        color = "#27ae60";
        icon = '<i class="fas fa-trophy"></i>';
        bgColor = "#e7f9ee";
        giaiTrung = "Giải năm";
        soTrung = giai["Giải năm"][0];
      }
      // Giải 4: khớp 5 số cuối với một trong các số trúng
      else if (!trungGiai6) {
        for (let so of giai["Giải tư"]) {
          if (ve.slice(-5) === so) {
            ketqua = "Chúc Mừng Bạn trúng GIẢI TƯ!";
            color = "#27ae60";
            icon = '<i class="fas fa-trophy"></i>';
            bgColor = "#e7f9ee";
            giaiTrung = "Giải tư";
            soTrung = so;
            break;
          }
        }
      }
    }

    // Các giải cao hơn
    if (color === "#666") {
      // Giải 3: khớp 5 số cuối
      for (let so of giai["Giải ba"]) {
        if (ve.slice(-5) === so) {
          ketqua = "Chúc Mừng Bạn trúng GIẢI BA!";
          color = "#27ae60";
          icon = '<i class="fas fa-trophy"></i>';
          bgColor = "#e7f9ee";
          giaiTrung = "Giải ba";
          soTrung = so;
          break;
        }
      }
      
      // Giải 2: khớp 5 số cuối
      if (color === "#666" && ve.slice(-5) === giai["Giải nhì"][0]) {
        ketqua = "Chúc Mừng Bạn trúng GIẢI NHÌ!";
        color = "#27ae60";
        icon = '<i class="fas fa-trophy"></i>';
        bgColor = "#e7f9ee";
        giaiTrung = "Giải nhì";
        soTrung = giai["Giải nhì"][0];
      }
      
      // Giải 1: khớp 5 số cuối
      else if (color === "#666" && ve.slice(-5) === giai["Giải nhất"][0]) {
        ketqua = "Chúc Mừng Bạn trúng GIẢI NHẤT!";
        color = "#27ae60";
        icon = '<i class="fas fa-trophy"></i>';
        bgColor = "#e7f9ee";
        giaiTrung = "Giải nhất";
        soTrung = giai["Giải nhất"][0];
      }
    }
    
    // Giải đặc biệt và các giải phụ liên quan
    if (color === "#666") {
      const soDB = giai["Đặc biệt"][0];
      
      // Trúng đặc biệt: khớp hoàn toàn 6 số
      if (ve === soDB) {
        ketqua = "Chúc Mừng Bạn trúng GIẢI ĐẶC BIỆT!";
        color = "#e74c3c";
        icon = '<i class="fas fa-award"></i>';
        bgColor = "#ffeded";
        giaiTrung = "Đặc biệt";
        soTrung = soDB;
      } 
      // Giải phụ đặc biệt: trúng 5 số cuối của giải đặc biệt, sai số đầu tiên (hàng trăm ngàn)
      else if (ve.slice(1) === soDB.slice(1) && ve[0] !== soDB[0]) {
        ketqua = "Chúc Mừng Bạn trúng GIẢI PHỤ ĐẶC BIỆT!";
        color = "#3498db";
        icon = '<i class="fas fa-certificate"></i>';
        bgColor = "#eaf7ff";
        giaiTrung = "Giải phụ đặc biệt";
        soTrung = soDB;
      }
      // Giải khuyến khích: trúng số đầu tiên với giải đặc biệt, nhưng sai 1 trong 5 số còn lại
      else if (ve[0] === soDB[0]) {
        // Đếm số chữ số khác nhau giữa vé của người chơi và số trúng đặc biệt (không tính chữ số đầu)
        let diffCount = 0;
        for (let i = 1; i < 6; i++) {
          if (ve[i] !== soDB[i]) {
            diffCount++;
          }
        }
        
        // Nếu chỉ sai 1 số trong 5 số còn lại thì trúng giải khuyến khích
        if (diffCount === 1) {
          ketqua = "Chúc Mừng Bạn trúng GIẢI KHUYẾN KHÍCH!";
          color = "#f39c12";
          icon = '<i class="fas fa-star"></i>';
          bgColor = "#fff8e6";
          giaiTrung = "Giải khuyến khích";
          soTrung = soDB;
        }
      }
    }

    kq.innerHTML = `${icon} ${ketqua}`;
    kq.style.color = color;
    kq.style.backgroundColor = bgColor;
    kq.style.padding = "12px";
    kq.style.borderRadius = "5px";
    
    // Thêm hiệu ứng chuyển động nhẹ
    kq.style.transition = "all 0.3s ease";
    
    // Đánh dấu hàng đã trúng trong bảng kết quả
    const tableRows = document.querySelectorAll('table tr');
    tableRows.forEach(row => row.classList.remove('highlighted'));
    
    // Tìm hàng tương ứng với giải trúng và làm nổi bật
    if (giaiTrung !== "") {
      tableRows.forEach(row => {
        if (row.cells[0] && row.cells[0].textContent === giaiTrung) {
          row.style.backgroundColor = bgColor;
          row.style.transition = "background-color 0.5s ease";
        }
      });
    }
  }, 600);
}
