import Swiper from 'swiper/bundle';
import emailjs from '@emailjs/browser';

formValidation();

new Swiper('.swiper_unlock', {
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.4,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

let swiperInstance = null;

function initOrDestroySwiper() {
  const isMobile = window.innerWidth < 1023;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper('.swiper_review', {
      slidesPerView: 'auto',
      spaceBetween: 32,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        550: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2.4 },
        1200: { slidesPerView: 3 },
      },
    });
  } else if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

initOrDestroySwiper();

window.addEventListener('resize', () => {
  initOrDestroySwiper();
});

// (function () {
//   emailjs.init('lLOoBk19I4h9y7DJv');
// })();

function formValidation() {
  const form = document.getElementById('courseForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    if (nameInput.value.trim() === '') {
      nameError.classList.add('show');
      isValid = false;
    } else {
      nameError.classList.remove('show');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.classList.add('show');
      isValid = false;
    } else {
      emailError.classList.remove('show');
    }

    if (!isValid) {
      return;
    }

    localStorage.setItem(
      'courseUserData',
      JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
      }),
    );

    window.location.href =
      'https://checkout.revolut.com/payment-link/5ffe1822-9127-412b-8627-f88da9a68be9?success_url=https://yourdomain.com/index.html';
  });
}

// const userData = JSON.parse(localStorage.getItem('courseUserData'));

// if (userData) {
//   emailjs
//     .send(
//       'service_z00ccsn',
//       'template_ajpaf35',
//       {
//         name: userData.name,
//         email: userData.email,
//       },
//       'lLOoBk19I4h9y7DJv',
//     )
//     .then(() => {
//       console.log('Email sent!');
//       localStorage.removeItem('courseUserData');
//     })
//     .catch((error) => {
//       console.error('EmailJS error:', error);
//     });
// }
