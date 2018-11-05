(()=>{
	const form= document.getElementsByClassName('form');
	for(let i= 0, l= form.length; l > i; i++){
		form[i].addEventListener('submit', function(e){
			e.preventDefault();
			const api= JSON.parse(this.getAttribute('data-api'));
			let formData= new FormData(form[i]);
			axios({
				method: api.method,
				url: api.action,
				headers: { 'Content-Type': 'multipart/form-data' },
				data: formData
			}).then((res)=>{
				const { alert, msg }= res.data;
				const form__alert= form[i].getElementsByClassName('form__alert');
				form__alert[0].textContent= msg;
				form__alert[0].classList.remove('hidden');
				form__alert[0].classList.add('alert-' + alert, 'visible');
				form[i].reset();
				setTimeout(()=>{
					form__alert[0].classList.add('hidden');
					form__alert[0].classList.remove('alert-' + alert, 'visible');
				}, 5000);

			}).catch((err)=>{
				form__alert[0].textContent= 'Ошибка сервера';
				form__alert[0].classList.add('alert-danger', 'visible');
			})
		});
	}
})();