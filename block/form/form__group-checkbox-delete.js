(function(){
	let form__groupCheckboxDelete= document.getElementsByClassName('form__group-checkbox-delete');
	for(let i= 0, l= form__groupCheckboxDelete.length; l > i; i++){
		form__groupCheckboxDelete[i].querySelector('.form__checkbox').addEventListener('change', ()=>{
			let hidden= form__groupCheckboxDelete[i].querySelector('.form__hidden');
			hidden.value= hidden.value != 0 ? 0 : 1;
		})
	}
})();