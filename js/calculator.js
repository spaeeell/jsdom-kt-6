function createFormGroup(labelText, type, id) {
    const group = document.createElement("div");
    group.className = "form-group";

    const label = document.createElement("label");                                                  // функция для создания формы
    label.textContent = labelText;
    label.htmlFor = id;

    const input = document.createElement(type);
    input.id = id;

    group.append(label, input);
    return group;
}

function buildCalculator(parent) {                                                                  
    const section = document.createElement("section");
    section.id = "calculator";

    const h2 = document.createElement("h2");                                                               // калькулятор стоимости тура
    h2.textContent = "Рассчитай стоимость";
    section.append(h2);

    const container = document.createElement("div");
    container.className = "calc-container";

    const groupDest = createFormGroup("Выберите место:", "select", "calc-dest");
    const selectDest = groupDest.querySelector("select");
    
    destinations.forEach(dest => {
        const option = document.createElement("option");
        option.value = dest.price;
        option.textContent = `${dest.title} (${dest.price.toLocaleString("ru-RU")} ₽)`;
        selectDest.append(option);
    });

    const groupPeople = createFormGroup("Количество человек:", "input", "calc-people");
    const inputPeople = groupPeople.querySelector("input");
    inputPeople.type = "number";
    inputPeople.value = 1;
    inputPeople.min = 1;

    const groupDays = createFormGroup("Количество дней отдыха:", "input", "calc-days");
    const inputDays = groupDays.querySelector("input");
    inputDays.type = "number";
    inputDays.value = 5;
    inputDays.min = 1;

    const resultBox = document.createElement("div");
    resultBox.className = "calc-result";                //результат
    resultBox.id = "calc-total";

    container.append(groupDest, groupPeople, groupDays, resultBox);
    section.append(container);
    parent.append(section);

    const calculate = () => {
        const basePrice = parseInt(selectDest.value);
        const people = parseInt(inputPeople.value) || 1;
        const days = parseInt(inputDays.value) || 1;
        
        const dailyCostPerPerson = 1000;
        const total = (basePrice * people) + (days * dailyCostPerPerson * people);
        resultBox.textContent = `Итого к оплате: ${total.toLocaleString("ru-RU")} ₽`;
    };

    [selectDest, inputPeople, inputDays].forEach(element => {      // пересчет при изменении
        element.addEventListener("input", calculate);     
    });

    calculate();
}