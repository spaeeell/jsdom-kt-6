function buildDestinations(parent) {            
    const section = document.createElement("section");
    section.id = "destinations";

    const h2 = document.createElement("h2");
    h2.textContent = "Направления для путешествий";
    section.append(h2);

    const grid = document.createElement("div");
    grid.className = "destinations-grid";

    destinations.forEach(dest => {
        const card = document.createElement("div");                                //функция карточек с местами
        card.className = "card";

        const img = document.createElement("img");
        img.src = dest.image;
        img.alt = dest.title;

        const content = document.createElement("div");
        content.className = "card-content";

        const h3 = document.createElement("h3");
        h3.textContent = dest.title;

        const p = document.createElement("p");
        p.textContent = dest.description;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = `От ${dest.price.toLocaleString("ru-RU")} ₽`;

        content.append(h3, p, price);
        card.append(img, content);
        grid.append(card);
    });

    section.append(grid);
    parent.append(section);
}