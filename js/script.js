/*функция фильтрует полученные данные от пользователя по типу,
и возвращает уже отфильтрованный массив при условии, что входные данные строго равны типу данных */
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

//функция скрывает все блоки с указанным классом      
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
/* 1) принимает 3 аргумента : 	селектор блока,
								текст,
								селектор span.
	2) вызывает функцию hideAllResponseBlocks(),указзаную выше
	3)выводит 'скрытый' блок 
	4)если передан селектор span то присваивает ему текст */	
      

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//функция ошибки через showResponseBlock 
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//функция ошибки через showResponseBlock 
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//функция ошибки через showResponseBlock, передавая всего один параметр, срабатывает при пустом поле
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
      
      
/*функция фильтрации по типу и введенным данным, срабатывает при нажатии на кномку filterButton
(ну конечно,если поле ввода не пустое). С помощью try-catch делаем проверку на всякий случай.
Внутри происходит фильрация в отдельный массив,превращая данные в строку с помощью функции filterByType.
В новую переменную alertMsg записывается результат и выводиться.
Вывод результата с помощью showResults(alertMsg),если нет то срабатывает ошибка.
*/
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

//получаем нашу кнопку
const filterButton = document.querySelector('#filter-btn');

//на кнопку навешиваем событие при клике
filterButton.addEventListener('click', e => {
//собственно получаем типы для нашей фильтрации
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
	
/*проверка на пустое поле,если оно все же не пустое,то срабатывает фильтрация 
через tryFilterByType() , если все же поле оказывается пустым,то пользователя
оповещают через функцию showNoResults(); */
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

