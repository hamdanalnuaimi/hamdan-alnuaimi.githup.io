// إضافة ميزات تفاعلية للموقع
document.addEventListener('DOMContentLoaded', function() {
    // إضافة زر العودة إلى الأعلى
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&#8593;';
    backToTopButton.setAttribute('id', 'back-to-top');
    backToTopButton.setAttribute('title', 'العودة إلى الأعلى');
    document.body.appendChild(backToTopButton);
    
    // إظهار أو إخفاء زر العودة إلى الأعلى بناءً على موضع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // التمرير إلى الأعلى عند النقر على الزر
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // إضافة ميزة تكبير الصور عند النقر عليها
    const modal = document.createElement('div');
    modal.setAttribute('id', 'image-modal');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('img');
    modalContent.setAttribute('id', 'modal-content');
    modalContent.classList.add('modal-content');
    
    const modalCaption = document.createElement('div');
    modalCaption.setAttribute('id', 'modal-caption');
    modalCaption.classList.add('modal-caption');
    
    const closeButton = document.createElement('span');
    closeButton.setAttribute('id', 'modal-close');
    closeButton.classList.add('modal-close');
    closeButton.innerHTML = '&times;';
    
    modal.appendChild(closeButton);
    modal.appendChild(modalContent);
    modal.appendChild(modalCaption);
    document.body.appendChild(modal);
    
    // إضافة وظيفة النقر على الصور
    const images = document.querySelectorAll('.visualization img');
    images.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalContent.src = this.src;
            modalCaption.innerHTML = this.nextElementSibling.innerHTML;
        });
    });
    
    // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // إضافة تأثيرات التمرير السلس للروابط الداخلية
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // تحديث عنوان URL دون إعادة تحميل الصفحة
            history.pushState(null, null, targetId);
        });
    });
    
    // إضافة تأثير تمييز القسم النشط في القائمة
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
