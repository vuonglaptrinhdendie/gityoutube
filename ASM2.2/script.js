document.addEventListener('DOMContentLoaded', function() {
  // Thiết lập slider nếu tồn tại
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Mảng chứa hình ảnh cho slide
  const slides = [
    {
      title: 'Bánh Kem Sữa Tươi',
      heading: 'Giảm Giá Tới 30%',
      image: 'uploads/Banhkem/banhkemsuatuoi01.jpg',
      category: 'banhkem'
    },
    {
      title: 'Bánh Mì Sữa Dừa',
      heading: 'Ưu Đãi Chỉ 25.000đ',
      image: 'uploads/Banhmi/banhmisuadua01.jpg',
      category: 'banhmi'
    },
    {
      title: 'Bánh Cookie Dừa',
      heading: 'Mua 3 Tặng 1',
      image: 'uploads/Banh cookie/banhcookiedua01.png',
      category: 'banhcookie'
    },
    {
      title: 'Bánh Kem Tiramisu',
      heading: 'Upto 80% Off',
      image: 'uploads/Banhkem/banhkemtiramisu02.jpg',
      category: 'banhkem'
    },
    {
      title: 'Bánh Mì Jambon',
      heading: 'Giảm 15% Mỗi Ngày',
      image: 'uploads/Banhmi/banhmijambon02.jpg',
      category: 'banhmi'
    },
    {
      title: 'Bánh Cookie Động Tiên',
      heading: 'Bộ Sưu Tập Mới',
      image: 'uploads/Banh cookie/banhcookiedongtien02.png',
      category: 'banhcookie'
    }
  ];
  
  let currentSlide = 0;
  
  // Hàm để cập nhật nội dung slide
  function updateSlide() {
    const slideImage = document.querySelector('.slide-image img');
    const slideTitle = document.querySelector('.slide-content h2');
    const slideHeading = document.querySelector('.slide-content h1');
    const buyNowLink = document.querySelector('.buy-now-link');
    
    // Thêm hiệu ứng fade
    if (slideImage) slideImage.style.opacity = 0;
    if (slideTitle) slideTitle.style.opacity = 0;
    if (slideHeading) slideHeading.style.opacity = 0;
    
    setTimeout(() => {
      if (slideImage) {
        slideImage.src = slides[currentSlide].image;
        // Xử lý ảnh để hiển thị đẹp hơn
        slideImage.onload = function() {
          this.style.opacity = 1;
        };
      }
      
      if (slideTitle) {
        slideTitle.textContent = slides[currentSlide].title;
        slideTitle.style.opacity = 1;
      }
      
      if (slideHeading) {
        slideHeading.textContent = slides[currentSlide].heading;
        slideHeading.style.opacity = 1;
      }

      // Cập nhật link cho nút "Mua Ngay" để chuyển đến danh mục tương ứng
      if (buyNowLink) {
        buyNowLink.href = 'shop.html?category=' + slides[currentSlide].category;
      }
    }, 300);
  }
  
  // Khởi tạo slider nếu tồn tại các phần tử cần thiết
  if (prevBtn && nextBtn) {
    const slideImg = document.querySelector('.slide-image img');
    const slideTitle = document.querySelector('.slide-content h2');
    const slideHeading = document.querySelector('.slide-content h1');
    
    if (slideImg && slideTitle && slideHeading) {
      // Thiết lập transition
      slideImg.style.transition = 'opacity 0.3s ease';
      slideTitle.style.transition = 'opacity 0.3s ease';
      slideHeading.style.transition = 'opacity 0.3s ease';
      
      // Thêm sự kiện cho nút điều hướng
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
      });
      
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
      });
      
      // Tự động chuyển slide sau mỗi 5 giây
      const autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
      }, 5000);
      
      // Hiển thị slide đầu tiên
      updateSlide();
    }
  }

  // Xử lý lọc sản phẩm theo danh mục
  const categoryItems = document.querySelectorAll('.category-item');
  const viewAllCategories = document.getElementById('view-all-categories');
  const viewAllProducts = document.getElementById('view-all-products');
  const productContainer = document.getElementById('product-container');
  const productItems = document.querySelectorAll('.product-item');

  // Kiểm tra nếu đang ở trang shop.html
  if (categoryItems.length > 0 && productItems.length > 0) {
    // Hàm hiển thị tất cả sản phẩm
    function showAllProducts() {
      productItems.forEach(item => {
        item.style.display = 'block';
      });
    }

    // Hàm lọc sản phẩm theo danh mục
    function filterProducts(category) {
      productItems.forEach(item => {
        if (item.getAttribute('data-type') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Thêm sự kiện click cho các danh mục
    categoryItems.forEach(item => {
      item.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterProducts(category);
        
        // Đánh dấu danh mục đang được chọn
        categoryItems.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Sự kiện cho nút "Xem tất cả" của danh mục
    if (viewAllCategories) {
      viewAllCategories.addEventListener('click', function() {
        showAllProducts();
        categoryItems.forEach(cat => cat.classList.remove('active'));
      });
    }

    // Sự kiện cho nút "Xem tất cả" của sản phẩm
    if (viewAllProducts) {
      viewAllProducts.addEventListener('click', function() {
        showAllProducts();
        categoryItems.forEach(cat => cat.classList.remove('active'));
      });
    }

    // Kiểm tra xem có tham số category trong URL không
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      // Lọc sản phẩm theo danh mục từ URL
      filterProducts(categoryParam);
      
      // Đánh dấu danh mục tương ứng
      categoryItems.forEach(item => {
        if (item.getAttribute('data-category') === categoryParam) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // Xử lý trang giới thiệu (about.html)
  const contactUsBtn = document.querySelector('.contact-us-btn');
  if (contactUsBtn) {
    contactUsBtn.addEventListener('click', function() {
      // Hiển thị thông báo khi nhấp vào nút "Liên Hệ Ngay"
      alert('Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi. Vui lòng liên hệ qua email: banhngot@gmail.com hoặc gọi số: 0123456789');
    });
  }

  // Xử lý Quick Links trong footer
  const quickLinks = document.querySelectorAll('.quick-links a');
  if (quickLinks.length > 0) {
    quickLinks.forEach(link => {
      // Thêm active class cho link hiện tại
      if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
        link.classList.add('active');
      }
      
      // Chỉ thêm hiệu ứng hover cho các link trong footer
      link.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '5px';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0';
      });
    });
  }
});
