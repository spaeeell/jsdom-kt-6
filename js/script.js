document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    buildNavigation();
    buildGallery(app);
    buildDestinations(app);                                                // файл сборщик который просто координирует файлы
    buildCalculator(app);
    buildMap(app);
    buildReviews(app);
});