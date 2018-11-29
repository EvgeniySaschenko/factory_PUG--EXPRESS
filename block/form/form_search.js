(()=>{
	function formSearch(form, el, callback){
		let cb= callback ? callback : function(){};
			if(!form) return;
			form.addEventListener('input', function(e){
				e.preventDefault();
				let api= JSON.parse(this.getAttribute('data-api'));
				let formData= new FormData(form);
				let url= api.action;
				formData.forEach((val, key)=>{
					url= url.replace(`${key}/@dummy`, `${key}/${val ? val : null}`);
				})
				try{
					axios({
						method: api.method,
						url: url,
						headers: { 'Content-Type': 'multipart/form-data' }
					}).then((res)=>{
						// Удачная отправка 
							let { data= false}= res;
							callback(el, data);
					}).catch((err)=>{
						console.log( err )
						console.log('Ошибка на стороне сервера')
					})
				} catch {
					// Ошибка на стороне клиента
					console.log('Ошибка на стороне клиента')
				}
			});
	}

	/**
	 * Поиск материалов
	 */
	let form= document.getElementById('form_search-table-admin-material');
	let el= document.getElementById('table__body_admin-material');
	let callback= (el, data)=>{
		let teplate= [];
		if(data.length){
			teplate= data.map((e)=>{
				return(
				`<tr class="table__row ${e.status ? 'highlight-warning' : ''}">
					<td class="table__col table__col_info"> 
						<i class="fa fa-info-circle" data-tooltip="${e.remark}"></i> 
					</td>
					<td class="table__col table__col_name">${e.name} ${e.mark}</td>
					<td class="table__col table__col_name">${e.standart}</td>
					<td class="table__col table__col_date-create">${e.date_create}</td>
					<td class="table__col table__col_btn">
						<a class="table__btn btn btn-success" href="${location.pathname}/edit/id/${e.id}">Редактировать</a>
					</td>
				</tr>`);
			});
			el.innerHTML= teplate.join();
		} else  {
			el.innerHTML= '';
		}
	}

	formSearch(form, el, callback);

	/**
	 * Поиск тхкарт
	*/

	let form2= document.getElementById('form_search-table-tech-process-rout-map');
	let el2= document.getElementById('table__body_tech-process-rout-map');
	let callback2= (el, data)=>{
		let teplate= [];
		if(data.length > 0){
			teplate= data.map((e)=>{
				return(
						`<tr class="table__row ${e.status ? 'highlight-warning' : ''}">
							<td class="table__col table__col_info">
								<i class="fa fa-info-circle" title="${e.remark}"></i>
							</td>
							<td class="table__col table__col_name">${e.name}</td>
							<td class="table__col table__col_num-detail">${e.num_detail}</td>
							<td class="table__col table__col_date-create">${e.date_create}</td>
							<td class="table__col table__col_btn">
								<a class="table__btn btn btn-success" href="/tech-process/rout-map/edit/id/${e.id}">Редактировать</a>
							</td>
							<td class="table__col table__col_btn">
								<a class="table__btn btn btn-primary" href="/tech-process/rout-map/doc-list/id/${e.id}">Скачать документы</a>
							</td>
						</tr>`);
			});
			el.innerHTML= teplate.join();
		} else  {
			el.innerHTML= '';
		}
	}

	formSearch(form2, el2, callback2);
})();