(()=>{
	let form= document.getElementById('form_tech-process-add-rout-map');
	if(form){
		let typeMaterial= form.querySelector('[name="id_type"]');
		let markMaterial= form.querySelectorAll('[name="id_material"] .form__option');
		function hideOption(typeMaterial, markMaterial){
			let idType= typeMaterial.value;
			for(let i= 0, l= markMaterial.length; l > i; i++){
				markMaterial[i].style.display= markMaterial[i].getAttribute('data-id-type') == idType ? 'block' : 'none';
			}
		}
		hideOption(typeMaterial, markMaterial);
		typeMaterial.addEventListener('input', ()=>{
			hideOption(typeMaterial, markMaterial);
		});
	}
})();