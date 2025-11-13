document.querySelectorAll('.carousel').forEach(carousel => {
                const track = carousel.querySelector('.carousel-track');
                const images = Array.from(carousel.querySelectorAll('img'));
                const prev = carousel.querySelector('.prev');
                const next = carousel.querySelector('.next');

                const imgWidth = Math.min(
                    images[0].clientWidth || parseInt(carousel.dataset.imgWidth),
                    parseInt(carousel.dataset.imgWidth)
                );
                const peek = parseInt(carousel.dataset.peek) || 20;
                const visible = parseInt(carousel.dataset.visible) || 2;
                const maxIndex = Math.max(0, images.length - visible);

                images.forEach(img => {
                    img.style.width = imgWidth + 'px';
                    img.style.flex = `0 0 ${imgWidth}px`;
                });

                let index = 2;

                function updateCarousel() {
                    const containerW = carousel.clientWidth;

                    const initialOffset = Math.round((containerW - (visible * imgWidth)) / 2 - peek);

                    if (index > maxIndex) 
                    index = 0;
                    if (index < 0) 
                    index = maxIndex;

                    const shift = initialOffset - (index * imgWidth);
                    track.style.transform = `translateX(${shift}px)`;
                }

                next.addEventListener('click', () => {
                    index++;
                    if (index > maxIndex) index = 0;
                    updateCarousel();
                });

                prev.addEventListener('click', () => {
                    index--;
                    if (index < 0) index = maxIndex;
                    updateCarousel();
                });

                window.addEventListener('resize', updateCarousel);

                updateCarousel();
            });

            document.querySelectorAll('.viewAllButton').forEach(button => {
                button.addEventListener('click', () => {
                    // note to self: PLEASE DON'T CHANGE THE CAROUSEL ELEMENT IN BODY CAUSE IF YOU DO, THIS VARIABLE WILL GET THE VARIABLE AFTER IT PLEASEEEE
                    const container = button.closest('.productList').nextElementSibling;

                    if (container && container.classList.contains('carousel')) {
                        container.classList.toggle('grid-view');

                        if (container.classList.contains('grid-view')) {
                            button.innerHTML = "<u>Back to lists</u>";
                        } 
                        else {
                            button.innerHTML = "<u>View All</u>";
                        }
                    }
                });
            });

            const box = document.querySelector(".buyBox");
            const cancel = document.getElementById("cancel");
            const pay = document.getElementById("pay");
            const overlay = document.querySelector(".overlay");

            document.querySelectorAll('.carousel-track img').forEach((img, index) => {
                img.style.cursor = "pointer";
                img.addEventListener('click', () => {
                    overlay.classList.add("show");
                    box.classList.add("show");
                });
            });

            cancel.addEventListener("click", () => {
                box.classList.remove("show");
                overlay.classList.remove("show");
            });

            pay.addEventListener("click", () => {
                alert("Your purchase was succesful and the order has been placed! Thank you for supporting our website!");
                window.location.href = "index.html";
            });