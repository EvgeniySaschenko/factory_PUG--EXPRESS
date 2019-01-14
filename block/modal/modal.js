(function(){
	/**
	 * Показать модальное окно
		 Элемнт который вызывает модальное окно должен иметь класс "show-modal" и атрибут "data-id-modal"
		 значение атрибута это id модального окна
	 */
	// При клике
	const modalShow= function(){
		const modalShow= document.getElementsByClassName('show-modal');
		for(let i= 0, l= modalShow.length; l > i; i++){
			modalShow[i].addEventListener('click', function(){
				const idModal= this.getAttribute('data-id-modal');
				document.querySelector('.modal#' + idModal).classList.add('active');
			});
		}
	}
	modalShow();

	/**
	 * Закрыть модальное окно
	 */
	const modalClose= function(){
		const modalClose= document.getElementsByClassName('modal-close');
		for(let i= 0, l= modalClose.length; l > i; i++){
			modalClose[i].addEventListener('click', function(){
				document.querySelector('.modal.active').classList.remove('active');
			});
		}
	}

	modalClose();
})();