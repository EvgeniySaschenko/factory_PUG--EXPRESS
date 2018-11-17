(function(){
	if(document.querySelector('.tab')){
		// При первой загрузке страницы активировать нужный Tab
		if( window.location.hash ){
			let hash= window.location.hash.replace('#id', '');
			let tab__title= document.querySelector(`.tab__title`);
			let tab__item= document.querySelector(`.tab__item[data-id=${hash}]`);
			let tab__content= document.getElementById(hash);
			tab__item.classList.add('active');
			tab__content.classList.add('active');
			tab__title.textContent= tab__item.textContent;
		} else {
			let tab__item= document.querySelector(`.tab__item`);
			let tab__content= document.querySelector(`.tab__content`);
			tab__item.classList.add('active');
			tab__content.classList.add('active');
		}

		// Активный TAB
		let tab__item= document.getElementsByClassName('tab__item');
		for(let i= 0, l= tab__item.length; l > i; i++){
			// click
			tab__item[i].addEventListener('click', function(ev){

				// удалить .active у .tab__item и .tab__content который сейчас активен
				let curentTabActive= tab__item[i].parentNode.querySelector('.tab__item.active');
				if( curentTabActive ){
					let curentContentActive= document.getElementById( curentTabActive.getAttribute('data-id') );
					curentContentActive.classList.remove('active');
					curentTabActive.classList.remove('active');
				}

				// Добавть заголовок 
				ev.path.some((e)=>{
					if(e.classList.contains('tab')){
						let tab__title= e.querySelector('.tab__title');
						if(tab__title){
							tab__title.textContent= this.textContent;
						}
						return true;
					}
				})

				// Добавить текущим .tab__item и .tab__content класс .active
				this.classList.add('active');
				window.location.hash= 'id' + this.getAttribute('data-id');
				document.getElementById( this.getAttribute('data-id') ).classList.add('active');
			});
		}
	}
})();