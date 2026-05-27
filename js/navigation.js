
function buildNavigation() {
    const nav = document.getElementById("navigation");
    const menuItems = [
        { name: "Галерея", link: "#gallery" },
        { name: "Направления", link: "#destinations" },                             // функция с навигацией 
        { name: "Калькулятор", link: "#calculator" },
        { name: "Карта", link: "#map" },
        { name: "Отзывы", link: "#reviews" }
    ];

    menuItems.forEach(item => {
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.name;
        nav.append(a);
    });
}