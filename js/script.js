//Скрипт для возврата на главный экран
const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        // удалим у кнопки класс btn-up_hide
        this.el.classList.remove('btn-up_hide');
    },
    hide() {
        // добавим к кнопке класс btn-up_hide
        this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
            scrollY > 400 ? this.show() : this.hide();
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
btnUp.addEventListener();




let currentCountryCode = '7';
let currentCountryFlag = 'ru';

// Переключение списка стран
function toggleCountryList() {
    const list = document.getElementById('country-list');
    list.classList.toggle('show');
}

// Выбор страны
function selectCountry(code, flag, name) {
    currentCountryCode = code;
    currentCountryFlag = flag;

    document.getElementById('country-code').textContent = '+' + code;
    document.getElementById('country-flag').src = getFlagSvg(flag);
    document.getElementById('country-list').classList.remove('show');

    // Обновляем placeholder в зависимости от страны
    updatePhonePlaceholder();

    // Переформатируем текущий номер
    formatPhoneNumber();

    // Устанавливаем фокус курсора в input телефона
    document.getElementById('phone-input').focus();
}

// Получение SVG флага
function getFlagSvg(countryCode) {
    const flags = {
        ru: 'images/flags/ru.svg',
        by: 'images/flags/by.svg',
        ua: 'images/flags/ua.svg',
        kz: 'images/flags/kz.svg',
        us: 'images/flags/us.svg',
        de: 'images/flags/de.svg'
    };
    return flags[countryCode] || flags.ru;
}

// Обновление placeholder
function updatePhonePlaceholder() {
    const input = document.getElementById('phone-input');

    switch (currentCountryCode) {
        case '7': // Россия, Казахстан
            input.placeholder = '(999) 123-45-67';
            break;
        case '375': // Беларусь
            input.placeholder = '(29) 123-45-67';
            break;
        case '1': // США
            input.placeholder = '(999) 123-4567';
            break;
        case '49': // Германия
            input.placeholder = '0176 12345678';
            break;
        default:
            input.placeholder = 'Введите номер';
    }
}

// Форматирование номера телефона
function formatPhoneNumber() {
    const input = document.getElementById('phone-input');
    let value = input.value.replace(/\D/g, ''); // Удаляем всё, кроме цифр

    // Удаляем код страны, если есть в начале
    if (value.startsWith(currentCountryCode)) {
        value = value.substring(currentCountryCode.length);
    }

    let formattedValue = '';

    function formatByTemplate(val, template) {
        let result = '';
        let valIndex = 0;
        for (let i = 0; i < template.length && valIndex < val.length; i++) {
            if (template[i] === '9') {
                result += val[valIndex];
                valIndex++;
            } else {
                result += template[i];
            }
        }
        return result;
    }

    switch (currentCountryCode) {
        case '7': // Россия и Казахстан
            // шаблон: (999) 999-99-99
            formattedValue = formatByTemplate(value, '(999) 999-99-99');
            break;
        case '375': // Беларусь
            // шаблон: (99) 999-99-99
            formattedValue = formatByTemplate(value, '(99) 999-99-99');
            break;
        case '1': // США
            // шаблон: (999) 999-9999
            formattedValue = formatByTemplate(value, '(999) 999-9999');
            break;
        case '49': // Германия
            // пусть простой шаблон без скобок
            // пример: 9999 9999999 (зафиксировано 4 и 7 цифр)
            formattedValue = formatByTemplate(value, '9999 9999999');
            break;
        default:
            formattedValue = value; // без форматирования
    }

    input.value = formattedValue;
}

// Получение полного номера
function getFullPhoneNumber() {
    const input = document.getElementById('phone-input');
    const cleanNumber = input.value.replace(/\D/g, '');
    return `+${currentCountryCode}${cleanNumber}`;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    // Добавляем обработчики на элементы стран
    document.querySelectorAll('.country-item').forEach(item => {
        item.addEventListener('click', function () {
            const code = this.getAttribute('data-code');
            const flag = this.getAttribute('data-flag');
            const name = this.querySelector('span').textContent;
            selectCountry(code, flag, name);
        });
    });

    // Обработчик ввода телефона
    document.getElementById('phone-input').addEventListener('input', formatPhoneNumber);

    // Закрытие списка при клике вне его
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.country-selector')) {
            document.getElementById('country-list').classList.remove('show');
        }
    });

    // Инициализация placeholder
    updatePhonePlaceholder();
});

// Для получения полного номера
const fullNumber = getFullPhoneNumber();
console.log(fullNumber); // +71234567890

// Для валидации
function validatePhone() {
    const fullNumber = getFullPhoneNumber();
    // Добавьте свою логику валидации
    return fullNumber.length > 5;
}


//------------------------------------------------------СЛАЙДЕР-------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const slidesCount = 14;
    let currentSlide = 1;

    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');

    function activateSlide(n) {
        if (n < 1) n = slidesCount;
        if (n > slidesCount) n = 1;
        currentSlide = n;
        document.getElementById('slide' + n).checked = true;
        updateArrowsLabels();
    }

    function updateArrowsLabels() {
        const prevSlide = currentSlide - 1 < 1 ? slidesCount : currentSlide - 1;
        const nextSlide = currentSlide + 1 > slidesCount ? 1 : currentSlide + 1;
        prevArrow.setAttribute('for', `slide${prevSlide}`);
        nextArrow.setAttribute('for', `slide${nextSlide}`);
    }

    updateArrowsLabels();

    // Обновляем текущий слайд при выборе радио-кнопки (например, при клике на точки)
    const radios = document.querySelectorAll('input[name="slider"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const id = e.target.id;
            currentSlide = Number(id.replace('slide', ''));
            updateArrowsLabels();
        });
    });
});


//------------------------Скрипт для бургерного меню
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

    // Функция открытия меню
    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия меню
    function closeMenuFunc() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Закрываем все подменю при закрытии основного меню
        document.querySelectorAll('.mobile-submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
    }

    // Открытие меню
    burgerMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu();
    });

    // Закрытие меню
    closeMenu.addEventListener('click', closeMenuFunc);

    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', closeMenuFunc);

    // Раскрытие подменю
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const submenu = this.nextElementSibling;

            // Закрываем другие открытые подменю
            document.querySelectorAll('.mobile-submenu').forEach(otherSubmenu => {
                if (otherSubmenu !== submenu) {
                    otherSubmenu.classList.remove('active');
                }
            });

            // Переключаем текущее подменю
            submenu.classList.toggle('active');
        });
    });

    // Предотвращаем закрытие меню при клике внутри него
    mobileMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function () {
        if (window.innerWidth > 425) {
            closeMenuFunc();
        }
    });
});

//скрипт для формы заявки

document.addEventListener('DOMContentLoaded', function () {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const uploadBtn = document.getElementById('upload-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const closeBtn = document.querySelector('.btn-close');
    const companyInput = document.getElementById('company-name');
    const companyError = document.getElementById('company-error');
    const fileError = document.getElementById('file-error');

    let selectedFiles = [];

    // Валидация формы
    function validateForm() {
        let isValid = true;

        // Проверка названия фирмы
        if (!companyInput.value.trim()) {
            companyInput.classList.add('error');
            companyError.classList.add('show');
            isValid = false;
        } else {
            companyInput.classList.remove('error');
            companyError.classList.remove('show');
        }

        // Проверка файлов
        if (selectedFiles.length === 0) {
            fileError.classList.add('show');
            isValid = false;
        } else {
            fileError.classList.remove('show');
        }

        // Активация кнопки загрузки
        uploadBtn.disabled = !isValid;

        return isValid;
    }

    // Слушатели событий для валидации
    companyInput.addEventListener('input', validateForm);
    companyInput.addEventListener('blur', validateForm);

    // Открытие проводника при клике на область загрузки
    uploadArea.addEventListener('click', function (e) {
        e.preventDefault();
        fileInput.click();
    });

    // Обработка выбора файлов через проводник
    fileInput.addEventListener('change', function (e) {
        handleFiles(e.target.files);
    });

    // Drag and drop функционал
    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function () {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Обработка выбранных файлов
    function handleFiles(files) {
        if (files.length === 0) return;

        selectedFiles = Array.from(files);
        updateFileInfo();
        validateForm();
    }

    // Обновление информации о файлах
    function updateFileInfo() {
        if (selectedFiles.length === 0) {
            fileInfo.classList.remove('active');
            return;
        }

        let html = '<strong>Выбранные файлы:</strong><br>';
        selectedFiles.forEach((file, index) => {
            const size = formatFileSize(file.size);
            html += `${index + 1}. ${file.name} (${size})<br>`;
        });

        fileInfo.innerHTML = html;
        fileInfo.classList.add('active');
    }

    // Форматирование размера файла
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Загрузка файлов
    uploadBtn.addEventListener('click', function () {
        if (!validateForm()) return;

        const companyName = companyInput.value.trim();

        // Здесь будет код для реальной загрузки на сервер
        alert(`Загрузка для фирмы: ${companyName}\n\n` +
            `Будет загружено ${selectedFiles.length} файлов:\n` +
            selectedFiles.map(f => f.name).join('\n'));

        // Сброс после загрузки
        resetForm();
    });

    // Отмена загрузки
    cancelBtn.addEventListener('click', resetForm);
    closeBtn.addEventListener('click', resetForm);

    // Сброс формы
    function resetForm() {
        selectedFiles = [];
        fileInput.value = '';
        companyInput.value = '';
        fileInfo.classList.remove('active');
        companyInput.classList.remove('error');
        companyError.classList.remove('show');
        fileError.classList.remove('show');
        uploadBtn.disabled = true;
    }
});
