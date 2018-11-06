(()=>{
	const formSubmission= (obj)=>{
		// отправляем событие
		const event = new CustomEvent('FORM_SUBMISSION', { 'detail': obj.data });
		const { type= false }= obj.data;
		document.dispatchEvent(event);
		// alert
		obj.el.textContent= obj.msg;
		obj.el.classList.remove('hidden');
		obj.el.classList.add('alert-' + obj.alert, 'visible');

		const time= type == 'delete' ? 10000000 : 5000;
		
		setTimeout(()=>{
			obj.el.classList.add('hidden');
			obj.el.classList.remove('alert-' + obj.alert, 'visible');
		}, time);
	}

	const form= document.getElementsByClassName('form');
	for(let i= 0, l= form.length; l > i; i++){
		form[i].addEventListener('submit', function(e){
			e.preventDefault();
			const api= JSON.parse(this.getAttribute('data-api'));
			const form__alert= form[i].getElementsByClassName('form__alert');
			let formData= new FormData(form[i]);
			try{
				axios({
					method: api.method,
					url: api.action,
					headers: { 'Content-Type': 'multipart/form-data' },
					data: formData
				}).then((res)=>{
					// Удачная отправка 
					const { alert, msg, type }= res.data;
					// При добавлении очистить форму
					if(type == 'add'){ 
						form[i].reset();
					}
					formSubmission({
						el: form__alert[0], 
						alert: alert, 
						msg: msg,
						data: res.data
					});
				}).catch((err)=>{
					// Сервер вернул ошибку
					formSubmission({
						el: form__alert[0], 
						alert: 'danger', 
						msg: 'Ошибка сервера',
						data: {type: "err"}
					});
				})
			} catch {
				// Ошибка на стороне клиента
				formSubmission({
					el: form__alert[0], 
					alert: 'danger', 
					msg: 'Ошибка при отправке формы',
					data: {type: "err"}
				});
			}
		});
	}
})();