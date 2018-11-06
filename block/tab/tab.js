(function(){
	// Активный TAB
	const tab__item= document.getElementsByClassName('tab__item');
	for(let i= 0, l= tab__item.length; l > i; i++){
		// click
		tab__item[i].addEventListener('click', function(ev){
			// удалить .active у .tab__item и .tab__content который сейчас активен
			let curentTabActive= tab__item[i].parentNode.querySelector('.tab__item.active');
			let curentContentActive= document.getElementById( curentTabActive.getAttribute('data-id') );
			curentContentActive.classList.remove('active');
			curentTabActive.classList.remove('active');
			// Добавть заголовок 
			ev.path.some((e)=>{
				if(e.classList.contains('tab')){
					const tab__title= e.querySelector('.tab__title');
					if(tab__title){
						tab__title.textContent= this.textContent;
					}
					return true;
				}
			})

			// Добавить текущим .tab__item и .tab__content класс .active
			this.classList.add('active');
			document.getElementById( this.getAttribute('data-id') ).classList.add('active');
		});
	}

})();