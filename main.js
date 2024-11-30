(function () {
    "use strict";
    /*
     * Form Validation
     */
  
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
  
            form.querySelectorAll(":invalid")[0].focus();
          } else {
            /*
             * Form Submission using fetch()
             */
  
            const formData = new FormData(form);
            event.preventDefault();
            event.stopPropagation();
            const object = {};
            formData.forEach((value, key) => {
              object[key] = value;
            });
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait...";
  
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: json
            })
              .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-green-500");
                } else {
                  console.log(response);
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-red-500");
                }
              })
              .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
              })
              .then(function () {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                  result.style.display = "none";
                }, 5000);
              });
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();


document.addEventListener("DOMContentLoaded", function () {
    const testimonialCount = 5; // Total jumlah testimonial
    let currentIndex = 1; // Mulai dari testimonial pertama
    let autoplayInterval;

    // Fungsi untuk memperbarui testimonial
    function updateTestimonials() {
        for (let i = 1; i <= testimonialCount; i++) {
            const testimonial = document.getElementById(`testimonial-${i}`);
            if (i === currentIndex) {
                testimonial.classList.add("active");
                testimonial.style.display = "flex"; // Tampilkan testimonial aktif
            } else {
                testimonial.classList.remove("active");
                testimonial.style.display = "none"; // Sembunyikan testimonial lainnya
            }
        }
    }

    // Fungsi untuk testimonial berikutnya
    function nextTestimonial() {
        currentIndex = currentIndex === testimonialCount ? 1 : currentIndex + 1; // Loop kembali ke pertama jika sudah terakhir
        updateTestimonials();
    }

    // Fungsi untuk testimonial sebelumnya
    function prevTestimonial() {
        currentIndex = currentIndex === 1 ? testimonialCount : currentIndex - 1; // Loop ke terakhir jika sudah pertama
        updateTestimonials();
    }

    // Mulai autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 3000); // Ganti setiap 3 detik
    }

    // Berhenti autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Tombol navigasi
    document.querySelector(".prev").addEventListener("click", function () {
        prevTestimonial();
        stopAutoplay(); // Berhenti autoplay saat navigasi manual
        startAutoplay(); // Restart autoplay
    });

    document.querySelector(".next").addEventListener("click", function () {
        nextTestimonial();
        stopAutoplay();
        startAutoplay();
    });

    // Inisialisasi
    updateTestimonials();
    startAutoplay();
});


// scripts.js
document.querySelector('.menu-toggle').addEventListener('click', function () {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
});

  