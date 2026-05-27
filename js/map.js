function buildMap(parent) {
    const section = document.createElement("section");                              // функция карты
    section.id = "map";
    section.className = "map-section";

    const h2 = document.createElement("h2");
    h2.textContent = "Карта мира";
    section.append(h2);

    const mapContainer = document.createElement("div");
    mapContainer.className = "map-container";
    
    const mapElement = document.createElement("div");
    mapElement.id = "travel-map";
    mapContainer.append(mapElement);
    section.append(mapContainer);
    parent.append(section);

    setTimeout(() => {                                                          // создание самой карты с двумя слоями карты
        const map = L.map('travel-map').setView([40, 20], 2);                   // (слой основной с границами и доп слой с названиями стран) то что я не особо понимаю
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 2
        }).addTo(map);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 2
        }).addTo(map);
        
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
        
        window.addEventListener('resize', () => {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        });
    }, 100);
}