const initialReviews = [
    { 
        name: "Полина", 
        text: "Санкт-Петербург прекрасен! Эрмитаж, Петергоф и разводные мосты оставили незабываемые впечатления.", 
        mood: 95 
    },
    { 
        name: "Майя", 
        text: "Люблю Волгоград! Очень красивый город!", 
        mood: 90 
    },
    { 
        name: "Мария", 
        text: "Дубай — город контрастов. Пустыня, океан, роскошь и технологии.", 
        mood: 88 
    },
    { 
        name: "Артём", 
        text: "Лас-Вегас превзошел ожидания. Шоу, казино, огни — атмосфера веселья 24/7!", 
        mood: 85 
    }
];

function buildReviews(parent) {                                                                // функция добавления отзывов и слайдера
    const section = document.createElement("section");
    section.id = "reviews";
    section.className = "reviews-section";

    const h2 = document.createElement("h2");
    h2.textContent = "Отзывы туристов";                                                     
    section.append(h2);

    const list = document.createElement("div");
    list.className = "reviews-list";

    const renderReview = (name, text, moodValue) => {
        const card = document.createElement("div");
        card.className = "review-card";                                                         // сами отзывы

        const h4 = document.createElement("h4");
        h4.textContent = name;

        const p = document.createElement("p");
        p.textContent = `"${text}"`;

        const moodDiv = document.createElement("div");
        moodDiv.style.fontSize = "13px";
        moodDiv.style.marginTop = "8px";
        moodDiv.style.color = "#16a085";
        moodDiv.style.fontWeight = "bold";
        moodDiv.textContent = `Уровень настроения: ${moodValue}%`;

        card.append(h4, p, moodDiv);
        list.prepend(card);
    };

    initialReviews.forEach(r => renderReview(r.name, r.text, r.mood));    // стартовые отзывы
    section.append(list);

    const formContainer = document.createElement("div");
    formContainer.className = "review-form-container";

    const formTitle = document.createElement("h3");
    formTitle.textContent = "Оставить отзыв";
    formTitle.style.marginBottom = "20px";

    const nameGroup = createFormGroup("Ваше имя:", "input", "rev-name");
    
    const textGroup = createFormGroup("Ваш отзыв:", "textarea", "rev-text");
    textGroup.querySelector("textarea").placeholder = "Напишите ваши впечатления...";
    textGroup.querySelector("textarea").rows = 3;

    const sliderTitle = document.createElement("label");
    sliderTitle.textContent = "Уровень вашего настроения:";                                               //слайдер
    sliderTitle.style.fontWeight = "600";

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";

    const box = document.createElement("div");
    box.className = "box";
    box.id = "green-slider";

    const fill = document.createElement("div");
    fill.className = "fill";
    fill.id = "green-fill";

    const thumb = document.createElement("div");
    thumb.className = "slider-thumb";
    thumb.id = "green-thumb";

    box.append(fill, thumb);

    const nums = document.createElement("div");
    nums.className = "nums";
    [0, 20, 40, 60, 80, 100].forEach(val => {
        const span = document.createElement("span");
        span.textContent = val;
        nums.append(span);
    });

    const valueDisplay = document.createElement("div");    //текущее значение
    valueDisplay.className = "value-display";     
    valueDisplay.innerHTML = 'Настроение: <span class="green-value" id="green-value">0</span>';

    sliderContainer.append(box, nums, valueDisplay);

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Оставить отзыв";

    formContainer.append(formTitle, nameGroup, textGroup, sliderTitle, sliderContainer, btn);
    section.append(formContainer);
    parent.append(section);

    let currentMood = 0;

    function initSlider(thumbNode, sliderNode, fillNode, displayNode) {                 // функции слайдера
        function moveTo(event) {
            const sliderRect = sliderNode.getBoundingClientRect();
            let x = event.clientX - sliderRect.left;
            let percent = (x / sliderRect.width) * 100;

            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;

            thumbNode.style.left = percent + "%";
            fillNode.style.width = percent + "%";
            
            currentMood = Math.round(percent);
            displayNode.textContent = currentMood;
        }

        sliderNode.onmousedown = (event) => {
            event.preventDefault();
            if (event.button !== 0) return;

            moveTo(event);

            function onMouseMove(event) {
                moveTo(event);
            }

            document.addEventListener("mousemove", onMouseMove);

            document.onmouseup = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.onmouseup = null;
            };
        };
    }

    initSlider(thumb, box, fill, valueDisplay.querySelector("#green-value"));

    btn.addEventListener("click", () => {
        const nameInput = document.getElementById("rev-name");
        const textInput = document.getElementById("rev-text");                 // новый отправленный отзыв

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (name && text) {
            renderReview(name, text, currentMood);
            
            nameInput.value = "";
            textInput.value = "";
            thumb.style.left = "0%";
            fill.style.width = "0%";
            currentMood = 0;
            valueDisplay.querySelector("#green-value").textContent = "0";
        } else {
            alert("Пожалуйста, заполните все поля формы!");
        }
    });
}