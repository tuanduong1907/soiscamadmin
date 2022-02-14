const scammerList = document.querySelector('.scammer-list')
const scammerHeader = document.querySelectorAll('.scammer-header')
const loader = document.querySelector('.loader')
const formPost = document.querySelector('#form-post')
const btnSubmit = document.querySelector('.btn-submit')
const btnSubmitText = document.querySelector('.btn-text')
const ScammerPendingApi = 'https://62012118fdf509001724986e.mockapi.io/api/scammerPending'
const scammerApi = 'https://61e8b8af7ced4a00172ff662.mockapi.io/api/scammer-list'

// Function

function start() {
    getScammerPendingApi()
}start()

function renderScammerPending(item) {
    const template = `
        <div class="scammer-item">
            <div class="scammer-header">
                <div class="scammer-header__number">
                   #${item.id < 10 ? '0': ''}${item.id}
                </div>
                <span class="scammer-header__name">
                    ${item.accountHolder}
                </span>
                <span class="scammer-header__more">
                    <ion-icon class="scammer-edit scammer-header__icon" data-id="${item.id}" name="create-outline"></ion-icon>
                    <ion-icon class="scammer-remove scammer-header__icon" data-id="${item.id}" name="close-outline"></ion-icon>
                </span> 
            </div>
            <div class="scammer-info">
                <div class="scammer-info__item">
                    <div class="scammer-info__title">
                        <i class="fas fa-user"></i>
                        Họ Tên:
                    </div>
                    <div id="info-name" class="scammer-info__name">
                        ${item.accountHolder}

                    </div>
                </div>
                <div class="scammer-info__item">
                    <div class="scammer-info__title">
                        <i class="fas fa-phone"></i>
                        SĐT:
                    </div>
                    <div id="info-name" class="scammer-info__name">
                        ${item.phoneNumber}
                    </div>
                </div>
                <div class="scammer-info__item">
                    <div class="scammer-info__title">
                        <i class="far fa-address-card"></i>
                        STK:
                    </div>
                    <div id="info-name" class="scammer-info__name">
                        ${item.accountNumber}
                    </div>
                </div>
                <div class="scammer-info__item">
                    <div class="scammer-info__title">
                        <i class="fas fa-university"></i>
                        Ngân Hàng:
                    </div>
                    <div id="info-name" class="scammer-info__name">
                        ${item.bank}
                    </div>
                </div>
                <div class="scammer-info__item scammer-info__item-img">
                    <div class="scammer-info__title">
                        <i class="fas fa-image"></i>
                        Ảnh Chụp Bằng Chứng:
                    </div>
                    <img src="${item.image}" alt="" class="scammer-info__img">
                </div>
                <div class="scammer-info__item scammer-info__item-desc">
                    <div class="scammer-info__title">
                        <i class="fas fa-edit"></i>
                        Hình Thức Lừa Đảo:
                    </div>
                    <div class="scammer-info__name">
                        ${item.content}
                    </div>
                </div>
                <div class="scammer-author">
                    <div class="scammer-author__heading">Người Tố Cáo:</div>
                    <div class="scammer-author__info">
                        <div class="scammer-author__info-item">
                            <div class="scammer-info__title">Họ Và Tên:</div>
                            <div id="info-name" class="scammer-info__name">${item.authorName}</div>
                        </div>
                        <div class="scammer-author__info-item">
                            <div class="scammer-info__title">Liên Hệ:</div>
                            <div id="info-name" class="scammer-info__name">${item.authorPhone}</div>
                        </div>
                        <div class="scammer-author__info-item">
                            <div class="scammer-info__title">Trạng thái:</div>
                            <div id="info-name" class="scammer-info__name">${item.option}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    scammerList.insertAdjacentHTML('beforeend', template)
}

// Toast
function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Đã đăng bài thành công",
        type: "success",
        duration: 3000
    });
}

// Resest
function resest() {
    document.querySelector('#accountHolder').value = ''
    document.querySelector('#phoneNumber').value = ''
    document.querySelector('#accountNumber').value = ''
    document.querySelector('#bank').value = ''
    document.querySelector('#image').value = ''
    document.querySelector('#content').value = ''
    document.querySelector('#authorName').value = ''
    document.querySelector('#authorPhone').value = ''
}

// Get Scammer Pending
async function getScammerPendingApi() {
    loader.classList.add('active')
    const res = await fetch(ScammerPendingApi)
    scammerList.innerHTML = ''
    const data = await res.json()
    if(data.length > 0 && Array.isArray(data)) {
        data.forEach(item => {
            renderScammerPending(item)
        })
    }
    loader.classList.remove('active')
}

// Remove Scammer Pending
async function removeScammer(id) {
    await fetch(`${ScammerPendingApi}/${id}`, {
        method: 'DELETE',
    });
}

// Post Scammer
async function createScammer({accountHolder, phoneNumber, accountNumber, bank, image, content, option, authorName, authorPhone}) {
    fetch(scammerApi, {
    method: 'POST',
    body: JSON.stringify({
        accountHolder,
        phoneNumber,
        accountNumber,
        bank,
        image,
        content,
        option,
        authorName,
        authorPhone,

    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
}

Validator({
    form: '#form-post',
    formGroupSelector: '.form-item',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#accountHolder', 'Nhập tên chủ tài khoản'),
        Validator.minLength('#accountHolder', 6),
        Validator.isRequired('#accountNumber', 'Nhập STK '),
        Validator.minLength('#accountNumber', 10),
        Validator.isRequired('#bank', 'Nhập tên ngân hàng'),
        Validator.minLength('#bank', 3),
        Validator.isRequired('#content', 'Nhập nội dung tố cáo'),
        Validator.isRequired('#authorName', 'Nhập tên của bạn'),
        Validator.minLength('#authorName', 6),
        Validator.isRequired('#authorPhone', 'Nhập SĐT của bạn'),
        Validator.minLength('#authorPhone', 10),
    ],
    onSubmit: async function({accountHolder, phoneNumber, accountNumber, bank, image, content, option, authorName, authorPhone}) {
        btnSubmit.classList.add('is-active')
        await fetch(scammerApi, {
            method: 'POST',
            body: JSON.stringify({
                accountHolder,
                phoneNumber,
                accountNumber,
                bank,
                image,
                content,
                option,
                authorName,
                authorPhone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        showSuccessToast()
        resest()
        btnSubmit.classList.remove('is-active')
        btnSubmitText.textContent = 'Đăng'
    }
});


// Get Single Scammer 

async function getsingleScammer(id) {
    const res = await fetch(`${ScammerPendingApi}/${id}`)
    const data = res.json()
    return data
}

// Post ScammerPending
async function postScammerPending(accountHolder, phoneNumber, accountNumber, bank, image, content, option, authorName, authorPhone) {
    await fetch(scammerApi, {
            method: 'POST',
            body: JSON.stringify({
                accountHolder,
                phoneNumber,
                accountNumber,
                bank,
                image,
                content,
                option,
                authorName,
                authorPhone,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
}

// Event
scammerList.addEventListener('click', async (e) =>{
    if(e.target.matches('.scammer-header')) {
        const scammerInfo = e.target.nextElementSibling
        scammerInfo.style.height = `${scammerInfo.scrollHeight}px`
        scammerInfo.classList.toggle('active')
        if(!scammerInfo.classList.contains('active')) {
            scammerInfo.style.height = `0px`
        }
    }else if(e.target.matches('.scammer-remove')) {
        const id = e.target.dataset.id
        await removeScammer(id)
        loader.classList.add('active')
        await getScammerPendingApi()
    }else if(e.target.matches('.scammer-edit')) {
        const id = e.target.dataset.id
        const data = await getsingleScammer(id)
        formPost.elements['accountHolder'].value = data.accountHolder
        formPost.elements['phoneNumber'].value = data.phoneNumber
        formPost.elements['accountNumber'].value = data.accountNumber
        formPost.elements['bank'].value = data.bank
        formPost.elements['image'].value = data.image
        formPost.elements['content'].value = data.content
        formPost.elements['option'].value = data.option
        formPost.elements['authorName'].value = data.authorName
        formPost.elements['authorPhone'].value = data.authorPhone
        btnSubmitText.textContent = 'Duyệt'
    }
})