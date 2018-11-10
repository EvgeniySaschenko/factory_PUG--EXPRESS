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
  if (document.querySelector('.tab')) {
    (function () {
      // При первой загрузке страницы активировать нужный Tab
      if (window.location.hash) {
        var hash = window.location.hash.replace('#id', '');

        var _tab__item = document.querySelector(".tab__item[data-id=".concat(hash, "]"));

        var tab__content = document.getElementById(hash);

        _tab__item.classList.add('active');

        tab__content.classList.add('active');
      } else {
        var _tab__item2 = document.querySelector(".tab__item");

        var _tab__content = document.querySelector(".tab__content");

        _tab__item2.classList.add('active');

        _tab__content.classList.add('active');
      } // Активный TAB


      var tab__item = document.getElementsByClassName('tab__item');

      var _loop = function _loop(i, l) {
        // click
        tab__item[i].addEventListener('click', function (ev) {
          var _this = this;

          // удалить .active у .tab__item и .tab__content который сейчас активен
          var curentTabActive = tab__item[i].parentNode.querySelector('.tab__item.active');

          if (curentTabActive) {
            var curentContentActive = document.getElementById(curentTabActive.getAttribute('data-id'));
            curentContentActive.classList.remove('active');
            curentTabActive.classList.remove('active');
          } // Добавть заголовок 


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
          window.location.hash = 'id' + this.getAttribute('data-id');
          document.getElementById(this.getAttribute('data-id')).classList.add('active');
        });
      };

      for (var i = 0, l = tab__item.length; l > i; i++) {
        _loop(i, l);
      }
    })();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsIm1vZGFsL21vZGFsLmpzIiwidGFiL3RhYi5qcyIsInRhYmxlL3RhYmxlX2l0ZW1zLXRvLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBmb3JtU3VibWlzc2lvbiA9IGZ1bmN0aW9uIGZvcm1TdWJtaXNzaW9uKG9iaikge1xuICAgIC8vINC+0YLQv9GA0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdGT1JNX1NVQk1JU1NJT04nLCB7XG4gICAgICAnZGV0YWlsJzogb2JqLmRhdGFcbiAgICB9KTtcbiAgICB2YXIgX29iaiRkYXRhJHR5cGUgPSBvYmouZGF0YS50eXBlLFxuICAgICAgICB0eXBlID0gX29iaiRkYXRhJHR5cGUgPT09IHZvaWQgMCA/IGZhbHNlIDogX29iaiRkYXRhJHR5cGU7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7IC8vIGFsZXJ0XG5cbiAgICBvYmouZWwudGV4dENvbnRlbnQgPSBvYmoubXNnO1xuICAgIG9iai5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBvYmouZWwuY2xhc3NMaXN0LmFkZCgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcbiAgICB2YXIgdGltZSA9IHR5cGUgPT0gJ2RlbGV0ZScgPyAxMDAwMDAwMCA6IDUwMDA7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBvYmouZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICBvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcbiAgICB9LCB0aW1lKTtcbiAgfTtcblxuICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0nKTtcblxuICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgZm9ybVtpXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJykpO1xuICAgICAgdmFyIGZvcm1fX2FsZXJ0ID0gZm9ybVtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX19hbGVydCcpO1xuICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1baV0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBheGlvcyh7XG4gICAgICAgICAgbWV0aG9kOiBhcGkubWV0aG9kLFxuICAgICAgICAgIHVybDogYXBpLmFjdGlvbixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiBmb3JtRGF0YVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAvLyDQo9C00LDRh9C90LDRjyDQvtGC0L/RgNCw0LLQutCwIFxuICAgICAgICAgIHZhciBfcmVzJGRhdGEgPSByZXMuZGF0YSxcbiAgICAgICAgICAgICAgYWxlcnQgPSBfcmVzJGRhdGEuYWxlcnQsXG4gICAgICAgICAgICAgIG1zZyA9IF9yZXMkZGF0YS5tc2csXG4gICAgICAgICAgICAgIHR5cGUgPSBfcmVzJGRhdGEudHlwZTsgLy8g0J/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4INC+0YfQuNGB0YLQuNGC0Ywg0YTQvtGA0LzRg1xuXG4gICAgICAgICAgaWYgKHR5cGUgPT0gJ2FkZCcpIHtcbiAgICAgICAgICAgIGZvcm1baV0ucmVzZXQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtU3VibWlzc2lvbih7XG4gICAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgICBhbGVydDogYWxlcnQsXG4gICAgICAgICAgICBtc2c6IG1zZyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAvLyDQodC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRg1xuICAgICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICAgIGVsOiBmb3JtX19hbGVydFswXSxcbiAgICAgICAgICAgIGFsZXJ0OiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiZXJyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICAgIC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXG4gICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgYWxlcnQ6ICdkYW5nZXInLFxuICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDRhNC+0YDQvNGLJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0eXBlOiBcImVyclwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGZvcm0ubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgX2xvb3AoaSwgbCk7XG4gIH1cbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIC8qKlxyXG4gICAqINCf0L7QutCw0LfQsNGC0Ywg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+XHJcbiAgXHQg0K3Qu9C10LzQvdGCINC60L7RgtC+0YDRi9C5INCy0YvQt9GL0LLQsNC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60LvQsNGB0YEgXCJzaG93LW1vZGFsXCIg0Lgg0LDRgtGA0LjQsdGD0YIgXCJkYXRhLWlkLW1vZGFsXCJcclxuICBcdCDQt9C90LDRh9C10L3QuNC1INCw0YLRgNC40LHRg9GC0LAg0Y3RgtC+IGlkINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICovXG4gIHZhciBtb2RhbFNob3cgPSBmdW5jdGlvbiBtb2RhbFNob3coKSB7XG4gICAgdmFyIG1vZGFsU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Nob3ctbW9kYWwnKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9kYWxTaG93Lmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgbW9kYWxTaG93W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWRNb2RhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCMnICsgaWRNb2RhbCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kYWxTaG93KCk7XG4gIC8qKlxyXG4gICAqINCX0LDQutGA0YvRgtGMINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG4gICAqL1xuXG4gIHZhciBtb2RhbENsb3NlID0gZnVuY3Rpb24gbW9kYWxDbG9zZSgpIHtcbiAgICB2YXIgbW9kYWxDbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1vZGFsQ2xvc2UubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgICBtb2RhbENsb3NlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwuYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbW9kYWxDbG9zZSgpO1xufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWInKSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyDQn9GA0Lgg0L/QtdGA0LLQvtC5INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQsNC60YLQuNCy0LjRgNC+0LLQsNGC0Ywg0L3Rg9C20L3Ri9C5IFRhYlxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnI2lkJywgJycpO1xuXG4gICAgICAgIHZhciBfdGFiX19pdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJfX2l0ZW1bZGF0YS1pZD1cIi5jb25jYXQoaGFzaCwgXCJdXCIpKTtcblxuICAgICAgICB2YXIgdGFiX19jb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XG5cbiAgICAgICAgX3RhYl9faXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICB0YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3RhYl9faXRlbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYl9faXRlbVwiKTtcblxuICAgICAgICB2YXIgX3RhYl9fY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFiX19jb250ZW50XCIpO1xuXG4gICAgICAgIF90YWJfX2l0ZW0yLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIF90YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9IC8vINCQ0LrRgtC40LLQvdGL0LkgVEFCXG5cblxuICAgICAgdmFyIHRhYl9faXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgICAgIC8vIGNsaWNrXG4gICAgICAgIHRhYl9faXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cbiAgICAgICAgICB2YXIgY3VyZW50VGFiQWN0aXZlID0gdGFiX19pdGVtW2ldLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRhYl9faXRlbS5hY3RpdmUnKTtcblxuICAgICAgICAgIGlmIChjdXJlbnRUYWJBY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJlbnRDb250ZW50QWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyZW50VGFiQWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIGN1cmVudENvbnRlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBjdXJlbnRUYWJBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfSAvLyDQlNC+0LHQsNCy0YLRjCDQt9Cw0LPQvtC70L7QstC+0LogXG5cblxuICAgICAgICAgIGV2LnBhdGguc29tZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWInKSkge1xuICAgICAgICAgICAgICB2YXIgdGFiX190aXRsZSA9IGUucXVlcnlTZWxlY3RvcignLnRhYl9fdGl0bGUnKTtcblxuICAgICAgICAgICAgICBpZiAodGFiX190aXRsZSkge1xuICAgICAgICAgICAgICAgIHRhYl9fdGl0bGUudGV4dENvbnRlbnQgPSBfdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pOyAvLyDQlNC+0LHQsNCy0LjRgtGMINGC0LXQutGD0YnQuNC8IC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC70LDRgdGBIC5hY3RpdmVcblxuICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnaWQnICsgdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhYl9faXRlbS5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSwgbCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxufSkoKTsiLCIvLyAoZnVuY3Rpb24oKXtcbi8vIFx0Y29uc3QgYnRuX3Nob3dNb2RhbD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX2l0ZW1zLXRvLWVkaXQgLnRhYmxlX19idG5fc2hvdy1tb2RhbCcpO1xuLy8gXHRmb3IobGV0IGk9IDAsIGw9IGJ0bl9zaG93TW9kYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcbi8vIFx0XHRidG5fc2hvd01vZGFsW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZfYnRuU2hvd01vZGFsKXtcbi8vIFx0XHRcdC8qKlxuLy8gXHRcdFx0ICog0JTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9GFINCyINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyBcIm1vZGFsX2Zvcm0tZWRpdC1uYW1lXCJcbi8vIFx0XHRcdCAqL1xuLy8gXHRcdFx0Y29uc3QgY29udGVudD0gSlNPTi5wYXJzZShidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JykpO1xuLy8gXHRcdFx0Y29uc3QgYXBpPSBidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKTtcbi8vIFx0XHRcdGNvbnN0IGlkTW9kYWw9IGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XG4vLyBcdFx0XHRsZXQgZm9ybT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRNb2RhbCkucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbi8vIFx0XHRcdGZvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWFwaScsIGFwaSk7XG4vLyBcdFx0XHRmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpLnZhbHVlPSBjb250ZW50Lm5hbWU7XG4vLyBcdFx0XHRmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicmVtYXJrXCJdJykudmFsdWU9IGNvbnRlbnQucmVtYXJrO1xuLy8gXHRcdFx0LyoqXG4vLyBcdFx0XHQgKiDQn9C+0YHQu9C1INC+0YLQv9GA0LDQstC60Lgg0LTQsNC90L3Ri9GFINC90LAg0YHQtdGA0LLQtdGALCDQstC90LXRgdGC0Lgg0LjQt9C80LXQvdC10L3QuNGPINCyINGC0LDQsdC70LjRhtGDXG4vLyBcdFx0XHQgKi9cbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0ZPUk1fU1VCTUlTU0lPTicsIGZ1bmN0aW9uKGV2KXtcbi8vIFx0XHRcdFx0ZXZfYnRuU2hvd01vZGFsLnBhdGguc29tZSgoZWwpPT57XG4vLyBcdFx0XHRcdFx0aWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJsZV9fcm93Jykpe1xuLy8gXHRcdFx0XHRcdFx0aWYoZXYuZGV0YWlsLnR5cGUgPT0gJ2RlbGV0ZScpe1xuLy8gXHRcdFx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcbi8vIFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG4vLyBcdFx0XHRcdFx0XHR9XHRcbi8vIFx0XHRcdFx0XHR9XG4vLyBcdFx0XHRcdH0pXG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0pO1xuLy8gXHR9XG4vLyB9KSgpO1xuXCJ1c2Ugc3RyaWN0XCI7Il19
