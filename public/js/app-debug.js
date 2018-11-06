"use strict";

(function () {
  var formSubmission = function formSubmission(obj) {
    // отправляем событие
    var event = new CustomEvent('FORM_SUBMISSION', {
      'detail': obj.data
    });
    var _obj$data$type = obj.data.type,
        type = _obj$data$type === void 0 ? false : _obj$data$type;
    document.dispatchEvent(event); // alert

    obj.el.textContent = obj.msg;
    obj.el.classList.remove('hidden');
    obj.el.classList.add('alert-' + obj.alert, 'visible');
    var time = type == 'delete' ? 10000000 : 5000;
    setTimeout(function () {
      obj.el.classList.add('hidden');
      obj.el.classList.remove('alert-' + obj.alert, 'visible');
    }, time);
  };

  var form = document.getElementsByClassName('form');

  var _loop = function _loop(i, l) {
    form[i].addEventListener('submit', function (e) {
      e.preventDefault();
      var api = JSON.parse(this.getAttribute('data-api'));
      var form__alert = form[i].getElementsByClassName('form__alert');
      var formData = new FormData(form[i]);

      try {
        axios({
          method: api.method,
          url: api.action,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(function (res) {
          // Удачная отправка 
          var _res$data = res.data,
              alert = _res$data.alert,
              msg = _res$data.msg,
              type = _res$data.type; // При добавлении очистить форму

          if (type == 'add') {
            form[i].reset();
          }

          formSubmission({
            el: form__alert[0],
            alert: alert,
            msg: msg,
            data: res.data
          });
        }).catch(function (err) {
          // Сервер вернул ошибку
          formSubmission({
            el: form__alert[0],
            alert: 'danger',
            msg: 'Ошибка сервера',
            data: {
              type: "err"
            }
          });
        });
      } catch (_unused) {
        // Ошибка на стороне клиента
        formSubmission({
          el: form__alert[0],
          alert: 'danger',
          msg: 'Ошибка при отправке формы',
          data: {
            type: "err"
          }
        });
      }
    });
  };

  for (var i = 0, l = form.length; l > i; i++) {
    _loop(i, l);
  }
})();
"use strict";

(function () {
  /**
   * Показать модальное окно
  	 Элемнт который вызывает модальное окно должен иметь класс "show-modal" и атрибут "data-id-modal"
  	 значение атрибута это id модального окна
   */
  var modalShow = function modalShow() {
    var modalShow = document.getElementsByClassName('show-modal');

    for (var i = 0, l = modalShow.length; l > i; i++) {
      modalShow[i].addEventListener('click', function () {
        var idModal = this.getAttribute('data-id-modal');
        document.querySelector('.modal#' + idModal).classList.add('active');
      });
    }
  };

  modalShow();
  /**
   * Закрыть модальное окно
   */

  var modalClose = function modalClose() {
    var modalClose = document.getElementsByClassName('modal-close');

    for (var i = 0, l = modalClose.length; l > i; i++) {
      modalClose[i].addEventListener('click', function () {
        document.querySelector('.modal.active').classList.remove('active');
      });
    }
  };

  modalClose();
})();
"use strict";

(function () {
  // Активный TAB
  var tab__item = document.getElementsByClassName('tab__item');

  var _loop = function _loop(i, l) {
    // click
    tab__item[i].addEventListener('click', function (ev) {
      var _this = this;

      // удалить .active у .tab__item и .tab__content который сейчас активен
      var curentTabActive = tab__item[i].parentNode.querySelector('.tab__item.active');
      var curentContentActive = document.getElementById(curentTabActive.getAttribute('data-id'));
      curentContentActive.classList.remove('active');
      curentTabActive.classList.remove('active'); // Добавть заголовок 

      ev.path.some(function (e) {
        if (e.classList.contains('tab')) {
          var tab__title = e.querySelector('.tab__title');

          if (tab__title) {
            tab__title.textContent = _this.textContent;
          }

          return true;
        }
      }); // Добавить текущим .tab__item и .tab__content класс .active

      this.classList.add('active');
      document.getElementById(this.getAttribute('data-id')).classList.add('active');
    });
  };

  for (var i = 0, l = tab__item.length; l > i; i++) {
    _loop(i, l);
  }
})();
// (function(){
// 	const btn_showModal= document.querySelectorAll('.table_items-to-edit .table__btn_show-modal');
// 	for(let i= 0, l= btn_showModal.length; l > i; i++){
// 		btn_showModal[i].addEventListener('click', function(ev_btnShowModal){
// 			/**
// 			 * Добавление данных в форму редактирования "modal_form-edit-name"
// 			 */
// 			const content= JSON.parse(btn_showModal[i].getAttribute('data-content'));
// 			const api= btn_showModal[i].getAttribute('data-api');
// 			const idModal= btn_showModal[i].getAttribute('data-id-modal');
// 			let form= document.getElementById(idModal).querySelector('.form');
// 			form.setAttribute('data-api', api);
// 			form.querySelector('[name="name"]').value= content.name;
// 			form.querySelector('[name="remark"]').value= content.remark;
// 			/**
// 			 * После отправки данных на сервер, внести изменения в таблицу
// 			 */
// 			document.addEventListener('FORM_SUBMISSION', function(ev){
// 				ev_btnShowModal.path.some((el)=>{
// 					if(el.classList.contains('table__row')){
// 						if(ev.detail.type == 'delete'){
// 							el.remove();
// 							return true;
// 						}	
// 					}
// 				})
// 			})
// 		});
// 	}
// })();
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsIm1vZGFsL21vZGFsLmpzIiwidGFiL3RhYi5qcyIsInRhYmxlL3RhYmxlX2l0ZW1zLXRvLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBmb3JtU3VibWlzc2lvbiA9IGZ1bmN0aW9uIGZvcm1TdWJtaXNzaW9uKG9iaikge1xuICAgIC8vINC+0YLQv9GA0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdGT1JNX1NVQk1JU1NJT04nLCB7XG4gICAgICAnZGV0YWlsJzogb2JqLmRhdGFcbiAgICB9KTtcbiAgICB2YXIgX29iaiRkYXRhJHR5cGUgPSBvYmouZGF0YS50eXBlLFxuICAgICAgICB0eXBlID0gX29iaiRkYXRhJHR5cGUgPT09IHZvaWQgMCA/IGZhbHNlIDogX29iaiRkYXRhJHR5cGU7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7IC8vIGFsZXJ0XG5cbiAgICBvYmouZWwudGV4dENvbnRlbnQgPSBvYmoubXNnO1xuICAgIG9iai5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBvYmouZWwuY2xhc3NMaXN0LmFkZCgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcbiAgICB2YXIgdGltZSA9IHR5cGUgPT0gJ2RlbGV0ZScgPyAxMDAwMDAwMCA6IDUwMDA7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBvYmouZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICBvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcbiAgICB9LCB0aW1lKTtcbiAgfTtcblxuICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0nKTtcblxuICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgZm9ybVtpXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJykpO1xuICAgICAgdmFyIGZvcm1fX2FsZXJ0ID0gZm9ybVtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX19hbGVydCcpO1xuICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1baV0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBheGlvcyh7XG4gICAgICAgICAgbWV0aG9kOiBhcGkubWV0aG9kLFxuICAgICAgICAgIHVybDogYXBpLmFjdGlvbixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiBmb3JtRGF0YVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAvLyDQo9C00LDRh9C90LDRjyDQvtGC0L/RgNCw0LLQutCwIFxuICAgICAgICAgIHZhciBfcmVzJGRhdGEgPSByZXMuZGF0YSxcbiAgICAgICAgICAgICAgYWxlcnQgPSBfcmVzJGRhdGEuYWxlcnQsXG4gICAgICAgICAgICAgIG1zZyA9IF9yZXMkZGF0YS5tc2csXG4gICAgICAgICAgICAgIHR5cGUgPSBfcmVzJGRhdGEudHlwZTsgLy8g0J/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4INC+0YfQuNGB0YLQuNGC0Ywg0YTQvtGA0LzRg1xuXG4gICAgICAgICAgaWYgKHR5cGUgPT0gJ2FkZCcpIHtcbiAgICAgICAgICAgIGZvcm1baV0ucmVzZXQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtU3VibWlzc2lvbih7XG4gICAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgICBhbGVydDogYWxlcnQsXG4gICAgICAgICAgICBtc2c6IG1zZyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAvLyDQodC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRg1xuICAgICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICAgIGVsOiBmb3JtX19hbGVydFswXSxcbiAgICAgICAgICAgIGFsZXJ0OiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiZXJyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICAgIC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXG4gICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgYWxlcnQ6ICdkYW5nZXInLFxuICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDRhNC+0YDQvNGLJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0eXBlOiBcImVyclwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGZvcm0ubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgX2xvb3AoaSwgbCk7XG4gIH1cbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIC8qKlxyXG4gICAqINCf0L7QutCw0LfQsNGC0Ywg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+XHJcbiAgXHQg0K3Qu9C10LzQvdGCINC60L7RgtC+0YDRi9C5INCy0YvQt9GL0LLQsNC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60LvQsNGB0YEgXCJzaG93LW1vZGFsXCIg0Lgg0LDRgtGA0LjQsdGD0YIgXCJkYXRhLWlkLW1vZGFsXCJcclxuICBcdCDQt9C90LDRh9C10L3QuNC1INCw0YLRgNC40LHRg9GC0LAg0Y3RgtC+IGlkINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICovXG4gIHZhciBtb2RhbFNob3cgPSBmdW5jdGlvbiBtb2RhbFNob3coKSB7XG4gICAgdmFyIG1vZGFsU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Nob3ctbW9kYWwnKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9kYWxTaG93Lmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgbW9kYWxTaG93W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWRNb2RhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCMnICsgaWRNb2RhbCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kYWxTaG93KCk7XG4gIC8qKlxyXG4gICAqINCX0LDQutGA0YvRgtGMINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG4gICAqL1xuXG4gIHZhciBtb2RhbENsb3NlID0gZnVuY3Rpb24gbW9kYWxDbG9zZSgpIHtcbiAgICB2YXIgbW9kYWxDbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1vZGFsQ2xvc2UubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgICBtb2RhbENsb3NlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwuYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kYWxDbG9zZSgpO1xufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgLy8g0JDQutGC0LjQstC90YvQuSBUQUJcbiAgdmFyIHRhYl9faXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGksIGwpIHtcbiAgICAvLyBjbGlja1xuICAgIHRhYl9faXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgLy8g0YPQtNCw0LvQuNGC0YwgLmFjdGl2ZSDRgyAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQvtGC0L7RgNGL0Lkg0YHQtdC50YfQsNGBINCw0LrRgtC40LLQtdC9XG4gICAgICB2YXIgY3VyZW50VGFiQWN0aXZlID0gdGFiX19pdGVtW2ldLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRhYl9faXRlbS5hY3RpdmUnKTtcbiAgICAgIHZhciBjdXJlbnRDb250ZW50QWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyZW50VGFiQWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIGN1cmVudENvbnRlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICBjdXJlbnRUYWJBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IC8vINCU0L7QsdCw0LLRgtGMINC30LDQs9C+0LvQvtCy0L7QuiBcblxuICAgICAgZXYucGF0aC5zb21lKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmNsYXNzTGlzdC5jb250YWlucygndGFiJykpIHtcbiAgICAgICAgICB2YXIgdGFiX190aXRsZSA9IGUucXVlcnlTZWxlY3RvcignLnRhYl9fdGl0bGUnKTtcblxuICAgICAgICAgIGlmICh0YWJfX3RpdGxlKSB7XG4gICAgICAgICAgICB0YWJfX3RpdGxlLnRleHRDb250ZW50ID0gX3RoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvLyDQlNC+0LHQsNCy0LjRgtGMINGC0LXQutGD0YnQuNC8IC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC70LDRgdGBIC5hY3RpdmVcblxuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGFiX19pdGVtLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgIF9sb29wKGksIGwpO1xuICB9XG59KSgpOyIsIi8vIChmdW5jdGlvbigpe1xuLy8gXHRjb25zdCBidG5fc2hvd01vZGFsPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfaXRlbXMtdG8tZWRpdCAudGFibGVfX2J0bl9zaG93LW1vZGFsJyk7XG4vLyBcdGZvcihsZXQgaT0gMCwgbD0gYnRuX3Nob3dNb2RhbC5sZW5ndGg7IGwgPiBpOyBpKyspe1xuLy8gXHRcdGJ0bl9zaG93TW9kYWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldl9idG5TaG93TW9kYWwpe1xuLy8gXHRcdFx0LyoqXG4vLyBcdFx0XHQgKiDQlNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LIg0YTQvtGA0LzRgyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPIFwibW9kYWxfZm9ybS1lZGl0LW5hbWVcIlxuLy8gXHRcdFx0ICovXG4vLyBcdFx0XHRjb25zdCBjb250ZW50PSBKU09OLnBhcnNlKGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSk7XG4vLyBcdFx0XHRjb25zdCBhcGk9IGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpO1xuLy8gXHRcdFx0Y29uc3QgaWRNb2RhbD0gYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcbi8vIFx0XHRcdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZE1vZGFsKS5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuLy8gXHRcdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJywgYXBpKTtcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJykudmFsdWU9IGNvbnRlbnQubmFtZTtcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJyZW1hcmtcIl0nKS52YWx1ZT0gY29udGVudC5yZW1hcms7XG4vLyBcdFx0XHQvKipcbi8vIFx0XHRcdCAqINCf0L7RgdC70LUg0L7RgtC/0YDQsNCy0LrQuCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YAsINCy0L3QtdGB0YLQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YLQsNCx0LvQuNGG0YNcbi8vIFx0XHRcdCAqL1xuLy8gXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRk9STV9TVUJNSVNTSU9OJywgZnVuY3Rpb24oZXYpe1xuLy8gXHRcdFx0XHRldl9idG5TaG93TW9kYWwucGF0aC5zb21lKChlbCk9Pntcbi8vIFx0XHRcdFx0XHRpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlX19yb3cnKSl7XG4vLyBcdFx0XHRcdFx0XHRpZihldi5kZXRhaWwudHlwZSA9PSAnZGVsZXRlJyl7XG4vLyBcdFx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuLy8gXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcbi8vIFx0XHRcdFx0XHRcdH1cdFxuLy8gXHRcdFx0XHRcdH1cbi8vIFx0XHRcdFx0fSlcbi8vIFx0XHRcdH0pXG4vLyBcdFx0fSk7XG4vLyBcdH1cbi8vIH0pKCk7XG5cInVzZSBzdHJpY3RcIjsiXX0=
