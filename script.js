const flipButton = document.getElementById('flip-button');
const toastContainer = document.getElementById('toast-container'); // Теперь анимируем контейнер
const toast = document.getElementById('toast'); // Сам тост для вращения
const resultText = document.getElementById('result');

let isFlipping = false;

flipButton.addEventListener('click', () => {
    if (isFlipping) {
        return;
    }

    isFlipping = true;
    resultText.innerText = ''; // Очищаем предыдущий результат

    // Сбрасываем все анимации и классы
    toastContainer.classList.remove('toast-dip-in', 'toast-pop-out');
    toast.classList.remove('toast-flipping');
    toast.style.transform = ''; // Сброс transform для вращения

    // Принудительный пересчет стилей, чтобы сброс анимаций сработал
    void toastContainer.offsetWidth;
    void toast.offsetWidth;

    // Шаг 1: Тост опускается в тостер
    toastContainer.classList.add('toast-dip-in');

    // Через 0.8 секунды (длительность dipIn) начинаем следующую фазу
    setTimeout(() => {
        // Шаг 2: Тост выпрыгивает и вращается
        toastContainer.classList.add('toast-pop-out');

        // Определяем результат во время "полета"
        const randomChoice = Math.floor(Math.random() * 2); // 0 для Да, 1 для Нет

        // Устанавливаем целевое вращение для тоста (через inline style, чтобы не конфликтовать с @keyframes)
        // Если "Да" (0), вращается на 5 полных оборотов (1800deg) + 0deg
        // Если "Нет" (1), вращается на 5 полных оборотов (1800deg) + 180deg (чтобы показать обратную сторону)
        toast.style.transform = `rotateX(${1080 + randomChoice * 180}deg)`;
        toast.style.transition = 'transform 1s ease-out'; // Плавность вращения

        // Добавляем класс, который немедленно запустит вращение
        // Можно использовать toast.classList.add('toast-flipping');
        // Но лучше управлять transform напрямую для точности конечного положения

        // Ждем окончания анимации popOut (1 секунда) и вращения
        setTimeout(() => {
            // Убираем временные стили вращения
            toast.style.transition = '';
            
            isFlipping = false; // Разрешаем новый клик
        }, 1000); // Общая длительность popOut + вращения
    }, 800); // Задержка для dipIn
});