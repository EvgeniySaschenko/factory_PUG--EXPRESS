(()=>{
	let formSubmission= (obj)=>{
		// alert
		obj.el.textContent= obj.msg;
		obj.el.classList.remove('hidden');
		obj.el.classList.add('alert-' + obj.alert, 'visible');

		if(obj.data.type != 'delete'){
			setTimeout(()=>{
				obj.el.classList.add('hidden');
				obj.el.classList.remove('alert-' + obj.alert, 'visible');
			}, 5000);
		}
	}

	let form= document.getElementsByClassName('form');

	for(let i= 0, l= form.length; l > i; i++){
		form[i].addEventListener('submit', function(e){
			e.preventDefault();
			let api= JSON.parse(this.getAttribute('data-api'));
			let form__alert= form[i].getElementsByClassName('form__alert');
			let formData= new FormData(form[i]);
			try{
				axios({
					method: api.method,
					url: api.action,
					headers: { 'Content-Type': 'multipart/form-data' },
					data: formData
				}).then((res)=>{
					// Удачная отправка 
					let { alert, msg, type }= res.data;
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