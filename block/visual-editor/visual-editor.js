(function(){
	let funVisualEditor= (elBtnThis)=>{
		let btnSubSupAdd= document.getElementById('visual-editor__btn_sub-sup');

		let listener= ()=>{
			let val= document.querySelector('#visual-editor_sub-sup [name="val"]');
			let sub= document.querySelector('#visual-editor_sub-sup [name="sub"]');
			let sup= document.querySelector('#visual-editor_sub-sup [name="sup"]');
			let visualEditor= elBtnThis.parentNode.parentNode
			let textCanvas= visualEditor.querySelector('.visual-editor__text-canvas');
			console.log(1)

			// Вставка в поле редактирования
			sup.value= sup.value !== '' ? sup.value : '&nbsp;';
			sub.value= sub.value !== '' ? sub.value : '&nbsp;';

			let html= `&#x202F;<span style="display: inline-block;">
				<span style="display: inline-block; font-size: 18px;">${val.value}</span>
				<span style="display: inline-block; position: relative; top: 3px; margin-left: -2px;">
					<sup style="display: block; font-style: italic; font-size: 10px; vertical-align: top; line-height: 1;">${sup.value}</sup>
					<sub style="display: block; font-style: italic; font-size: 10px; vertical-align: sub; line-height: 1;">${sub.value}</sub>
				</span>
			</span>&nbsp;`;

			textCanvas.insertAdjacentHTML('beforeEnd', html);

			// Очистка полей / закрытие модалки
			val.value= '';
			sub.value= '';
			sup.value= '';
			document.getElementById('modal_visual-editor-sub-sup').classList.remove('active')
			btnSubSupAdd.removeEventListener('click', listener, false);
		}

		btnSubSupAdd.addEventListener('click', listener, false);
	}



	let panelBtn= document.getElementsByClassName('visual-editor__panel-btn_sub-sup');
	// Вызов  модального окна
	for(let i= 0, l= panelBtn.length; l > i; i++){
		panelBtn[i].addEventListener('click', ()=>{
			document.getElementById('modal_visual-editor-sub-sup').classList.add('active');
			funVisualEditor(panelBtn[i]);
		});
	}


	// При изменении поля text-canvas устанавливать value TEXTAREA
	let textCanvas= document.getElementsByClassName('visual-editor__text-canvas');
	for(let i= 0, l= textCanvas.length; l > i; i++){
		
		textCanvas[i].addEventListener('DOMSubtreeModified', ()=>{
			let val= textCanvas[i].innerHTML.replace(/\r?\n/g, "");
			textCanvas[i].parentNode.querySelector('.visual-editor__textarea').value= val;
		});
	}

})();