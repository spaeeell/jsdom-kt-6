// Создает галерею с главным фото, стрелками, миниатюрами и лайтбоксом
function buildGallery(parent) {                                                        
    const section = document.createElement("section");
    section.id = "gallery";
    section.className = "gallery-section";                                          // функция типо галереи

    const h2 = document.createElement("h2");
    h2.textContent = "Галерея наших туров";
    section.append(h2);

    const container = document.createElement("div");
    container.className = "gallery-container";

    const mainWrapper = document.createElement("div");
    mainWrapper.className = "main-img-wrapper";

    const mainImg = document.createElement("img");
    mainImg.id = "main";
    mainImg.src = destinations[0].image;
    mainImg.alt = destinations[0].title;

    const btnLeft = document.createElement("button");
    btnLeft.className = "arrow arrow-left";
    btnLeft.innerHTML = "&#10094;";

    const btnRight = document.createElement("button");
    btnRight.className = "arrow arrow-right";
    btnRight.innerHTML = "&#10095;";

    mainWrapper.append(mainImg, btnLeft, btnRight);

    const minisDiv = document.createElement("div");
    minisDiv.className = "minis";

    destinations.forEach((dest, index) => {
        const mini = document.createElement("img");
        mini.src = dest.image;
        mini.alt = dest.title;
        mini.dataset.index = index;
        if (index === 0) mini.className = "active";
        minisDiv.append(mini);
    });

    container.append(mainWrapper, minisDiv);
    section.append(container);
    parent.append(section);

    const overlay = document.getElementById("overlay");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");

    minisDiv.addEventListener("click", (e) => {                                     // событие клика на мелкие фото 
        const img = e.target;
        if (img.tagName !== "IMG") return;

        mainImg.src = img.src;
        currentIndex = parseInt(img.dataset.index);

        minisDiv.querySelectorAll("img").forEach(element => {
            element.classList.remove("active");
        });
        img.classList.add("active");
    });

    mainImg.addEventListener("click", () => {                                          // открытие главного фото и стрелки
        overlay.classList.add("show");
        lightboxImg.src = mainImg.src;
    });

    closeLightbox.addEventListener("click", () => {
        overlay.classList.remove("show");
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("show");
        }
    });

    const updateActiveThumb = (index) => {
        mainImg.src = destinations[index].image;
        const thumbnails = minisDiv.querySelectorAll("img");                            
        thumbnails.forEach(el => el.classList.remove("active"));
        thumbnails[index].classList.add("active");
    };

    btnLeft.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : destinations.length - 1;
        updateActiveThumb(currentIndex);
    });

    btnRight.addEventListener("click", () => {
        currentIndex = (currentIndex < destinations.length - 1) ? currentIndex + 1 : 0;
        updateActiveThumb(currentIndex);
    });
}