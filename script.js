let tg = window.Telegram.WebApp
console.log(document.cookie)
// console.log(test)

const amount_1 = document.getElementById('amount_1').value
const amount_2 = document.getElementById('amount_2').value
const amount_3 = document.getElementById('amount_3').value

let inputBoost = document.getElementById('boosts')
let inputPremSubs = document.getElementById('subs')
let inputPublic = document.getElementById('public')
let inputPrivate = document.getElementById('private')
let inputChannelURL = document.getElementById('channel_url')
let inputBoostURL = document.getElementById('boost_url')
let inputAmount1 = document.getElementById('amount_1')
let inputAmount2 = document.getElementById('amount_2')
let inputAmount3 = document.getElementById('amount_3')

let amountTitle = document.getElementById('amount_title')
let creatingOrderBlock = document.getElementById('creating_order')
let previewOrderBlock = document.getElementById('order_prewiev')

let nextButton = document.getElementById('next_button')
let createButton = document.getElementById('create_button')

let orderTypePreview = document.getElementById('order_type_preview')
let channelTypePreview = document.getElementById('channel_type_preview')
let boostURLPreview = document.getElementById('boost_url_preview')

let order_type
let amount
let channel_type
let channel_url
let boost_url

// Работа с куки
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (getCookie('order_type') == 'subs') {
    inputPremSubs.checked = true
    amountTitle.textContent = 'Выберите количество подписчиков:'
} 
if (getCookie('order_type') == 'boosts') {
    inputBoost.checked = true
    amountTitle.textContent = 'Выберите количество бустов:'
}

if (getCookie('channel_type') == 'Public') {
    inputPublic.checked = true
}
if (getCookie('channel_type') == 'Private') {
    inputPrivate.checked = true
}

if (getCookie('channel_url') != undefined) {
    inputChannelURL.value = getCookie('channel_url')
}

if (getCookie('boost_url')) {
    inputBoostURL.value = getCookie('boost_url')
}

switch (getCookie('amount')) {
    case amount_1:
        document.getElementById('amount_1').checked = true
        break
    case amount_2:
        document.getElementById('amount_2').checked = true
        break
    case amount_3:
        document.getElementById('amount_3').checked = true
        break
}


// Ввод данных
// сохранение в куки ссылки на канал
function addChannelURLCookies() {
    document.cookie = `channel_url = ${inputChannelURL.value}; max-age=1200`
}

// созранение в куки ссылки на буст
function addBoostURLCookies() {
    document.cookie = `boost_url = ${inputBoostURL.value}; max-age=1200`
}

// сохранение в куки типа закза
inputBoost.addEventListener('input', () => {
    amountTitle.textContent = 'Выберите количество бустов:'
    document.cookie = `order_type = boosts; max-age=1200`
});
inputPremSubs.addEventListener('input', () => {
    amountTitle.textContent = 'Выберите количество подписчиков:'
    document.cookie = `order_type = subs; max-age=1200`
});

// сохранение в куки типа канала
inputPublic.addEventListener('input', () => {
    document.cookie = `channel_type = Public; max-age=1200`
});
inputPrivate.addEventListener('input', () => {
    document.cookie = `channel_type = Private; max-age=1200`
});

// сохранение в куки объема заказа
inputAmount1.addEventListener('input', () => {
    document.cookie = `amount = ${amount_1}; max-age=1200`
});
inputAmount2.addEventListener('input', () => {
    document.cookie = `amount = ${amount_2}; max-age=1200`
});
inputAmount3.addEventListener('input', () => {
    document.cookie = `amount = ${amount_3}; max-age=1200`
});







// Обработка при нажатии кнопки "продолжить"
nextButton.addEventListener('click', () => {
    // Проверка данных
    // Прокерка типа заказа
    if (inputBoost.checked === false && inputPremSubs.checked === false) {
        document.getElementById('error').textContent = 'Выберите тип заказа'
        return
    }

    // // Проверка типа канала
    if (inputPublic.checked === false && inputPrivate.checked === false) {
        document.getElementById('error').textContent = 'Выберите тип канала'
        return
    }

    // Проверка ссылки на канал
    let channelURL = inputChannelURL.value
    if (channelURL.includes('t.me') === false) {
        document.getElementById('error').textContent = 'Ссылка на канал должна содержать в себе t.me'
        return
    }

    // Проверка ссылки на буст
    let boostURL = inputBoostURL.value
    if (boostURL.includes('?boost') === false) {
        document.getElementById('error').textContent = 'Ссылка для буста должна содержать в себе ?boost'
        return
    }

    // Проверка выбора объема заказа
    if (inputAmount1.checked === false && inputAmount2.checked === false && inputAmount3.checked === false) {
        document.getElementById('error').textContent = 'Выберите объем заказа'
        return
    }

    // Вывод заказа
    creatingOrderBlock.style.display = 'none'
    previewOrderBlock.style.display = 'block'

    if (inputBoost.checked) {
        order_type = 'boost'
        if (inputAmount1.checked) {
            orderTypePreview.textContent = `${inputAmount1.value} бустов`
            amount = inputAmount1.value
        }
        if (inputAmount2.checked) {
            orderTypePreview.textContent = `${inputAmount2.value} бустов`
            amount = inputAmount2.value
        }
        if (inputAmount3.checked) {
            orderTypePreview.textContent = `${inputAmount3.value} бустов`
            amount = inputAmount3.value
        }

    } else {
        order_type = 'subs'
        if (inputAmount1.checked) {
            orderTypePreview.textContent = `${inputAmount1.value} подписчиков`
            amount = inputAmount1.value
        }
        if (inputAmount2.checked) {
            orderTypePreview.textContent = `${inputAmount2.value} подписчиков`
            amount = inputAmount2.value
        }
        if (inputAmount3.checked) {
            orderTypePreview.textContent = `${inputAmount3.value} подписчиков`
            amount = inputAmount3.value
        }
    }

    channel_url = inputChannelURL.value
    if (inputPublic.checked) {
        channelTypePreview.textContent = `Для открытого канала ${channel_url}`
        channel_type = 'Public'
    } else {
        channelTypePreview.textContent = `Для закрытого канала ${channel_url}`
        channel_type = 'Private'
    }

    boostURLPreview.textContent = `Ссылка на буст: ${inputBoostURL.value}`

    boost_url = inputBoostURL.value

});

createButton.addEventListener('click', () => {
    let data = {
        order_type: order_type,
        channel_type: channel_type,
        channel_url: channel_url,
        boost_url: boost_url,
        amount: amount
    }

    tg.sendData(JSON.stringify(data));
    tg.close();
})