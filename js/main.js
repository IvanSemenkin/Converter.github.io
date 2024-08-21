// Получение объектов для изменения значения и имени
const usdElementName = document.getElementById('kurs_USD_name');
const usdElementValue = document.getElementById('kurs_USD_value');

const eurElementName = document.getElementById('kurs_EUR_name');
const eurElementValue = document.getElementById('kurs_EUR_value');

const gbpElementName = document.getElementById('kurs_GBP_name');
const gbpElementValue = document.getElementById('kurs_GBP_value');

const colorUSD = document.getElementById('kurs_USD_value');
const colorEUR = document.getElementById('kurs_EUR_value');
const colorGBP = document.getElementById('kurs_GBP_value');

const selectInput = document.getElementById('selectInput');
const selectOutput = document.getElementById('selectOutput')

const inputText = document.getElementById('input_text');
const outputText = document.getElementById('output_text');



// Функция изменения значения, цвета
async function getCourse(params) {
    let data = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    data = await data.json();
    console.log(data);

    let valueUsd = data.Valute.USD.Value;
    let valueUsdEd = valueUsd.toFixed(2)

    usdElementValue.innerHTML = valueUsdEd;
    usdElementName.innerHTML = data.Valute.USD.Name;

    let valueEur = data.Valute.EUR.Value;
    let valueEurEd = valueEur.toFixed(2)

    eurElementValue.innerHTML = valueEurEd;
    eurElementName.innerHTML = data.Valute.EUR.Name;

    let valueGbp = data.Valute.GBP.Value;
    let valueGbpEd = valueGbp.toFixed(2)

    gbpElementValue.innerHTML = valueGbpEd;
    gbpElementName.innerHTML = data.Valute.GBP.Name;


    if (data.Valute.USD.Value > data.Valute.USD.Previous) {
        colorUSD.style.color = 'red';

    } else if (data.Valute.USD.Value == data.Valute.USD.Previous) {
        colorUSD.style.color = 'black';
    } else {
        colorUSD.style.color = 'green';

    }



    if (data.Valute.EUR.Value > data.Valute.EUR.Previous) {
        colorEUR.style.color = 'red';

    } else if (data.Valute.EUR.Value == data.Valute.EUR.Previous) {
        colorEUR.style.color = 'black';
    } else {
        colorEUR.style.color = 'green';

    }



    if (data.Valute.GBP.Value > data.Valute.GBP.Previous) {
        colorGBP.style.color = 'red';

    } else if (data.Valute.GBP.Value == data.Valute.GBP.Previous) {
        colorGBP.style.color = 'black';
    } else {
        colorGBP.style.color = 'green';

    }

    for (key in data.Valute) {
        const elemValue = data.Valute[key];
        const option = document.createElement('option');
        option.value = elemValue.Value;
        option.text = elemValue.CharCode + ' - ' + elemValue.Name;
        selectInput.add(option);
    }


    for (key in data.Valute) {
        const elemValue = data.Valute[key];
        const option = document.createElement('option');
        option.value = elemValue.Value;
        option.text = elemValue.CharCode + ' - ' + elemValue.Name;
        selectOutput.add(option);
    }


    inputText.onchange = function(){
        const result = this.value * selectInput.value / selectOutput.value;
        outputText.innerHTML = result.toFixed(2);
    };
    
    

}

// Вызов функции
getCourse()
