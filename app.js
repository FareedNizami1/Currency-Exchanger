const API_Key = {CURRENCY_EXCHANGE_KEY};
const Base_URL = `https://v6.exchangerate-api.com/v6/${API_Key}/latest/USD`;

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

for(let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name ==='from' && currCode ==='USD'){
            newOption.selected = 'selected';
        } else if(select.name ==='to' && currCode ==='PKR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value, toCurr.value);

    //---------------change part---------------//
    const URL =  `https://v6.exchangerate-api.com/v6/${API_Key}/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    //---------------------------------------//

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});
