"use strict";

(function () {
  var formSubmission = function formSubmission(obj) {
    // alert
    obj.el.textContent = obj.msg;
    obj.el.classList.remove('hidden');
    obj.el.classList.add('alert-' + obj.alert, 'visible');

    if (obj.data.type != 'delete') {
      setTimeout(function () {
        obj.el.classList.add('hidden');
        obj.el.classList.remove('alert-' + obj.alert, 'visible');
      }, 5000);
    }
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
              type = _res$data.type;
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
  function formSearch(form, el, callback) {
    var cb = callback ? callback : function () {};
    if (!form) return;
    form.addEventListener('input', function (e) {
      e.preventDefault();
      var api = JSON.parse(this.getAttribute('data-api'));
      var formData = new FormData(form);
      var url = api.action;
      formData.forEach(function (val, key) {
        url = url.replace("".concat(key, "/@dummy"), "".concat(key, "/").concat(val ? val : null));
      });

      try {
        axios({
          method: api.method,
          url: url,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (res) {
          // Удачная отправка 
          var _res$data = res.data,
              data = _res$data === void 0 ? false : _res$data;
          callback(el, data);
        }).catch(function (err) {
          console.log('Ошибка на стороне сервера');
        });
      } catch (_unused) {
        // Ошибка на стороне клиента
        console.log('Ошибка на стороне клиента');
      }
    });
  }

  var form = document.getElementById('form_search-table-admin-material');
  var el = document.getElementById('table__body_admin-material');

  var callback = function callback(el, data) {
    var teplate = [];

    if (data) {
      console.log(data);
      teplate = data.map(function (e) {
        return "<tr class=\"table__row ".concat(e.status ? 'highlight-warning' : '', "\">\n\t\t\t\t\t<td class=\"table__col table__col_info\"> \n\t\t\t\t\t\t<i class=\"fa fa-info-circle\" data-tooltip=\"").concat(e.remark, "\"></i> \n\t\t\t\t\t</td>\n\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.name, " ").concat(e.mark, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.standart, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_date-create\">").concat(e.date_create, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_btn\">\n\t\t\t\t\t\t<a class=\"table__btn btn btn-success\" href=\"").concat(location.pathname, "/edit/id/").concat(e.id, "\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>");
      });
      el.innerHTML = teplate.join();
    } else {
      el.innerHTML = '';
    }
  };

  formSearch(form, el, callback);
})();
"use strict";
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
        var tab__title = document.querySelector(".tab__title");

        var _tab__item = document.querySelector(".tab__item[data-id=".concat(hash, "]"));

        var tab__content = document.getElementById(hash);

        _tab__item.classList.add('active');

        tab__content.classList.add('active');
        tab__title.textContent = _tab__item.textContent;
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
              var _tab__title = e.querySelector('.tab__title');

              if (_tab__title) {
                _tab__title.textContent = _this.textContent;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsImZvcm0vZm9ybV9zZWFyY2guanMiLCJnbG9iYWwvdG9sdGlwLmpzIiwibW9kYWwvbW9kYWwuanMiLCJ0YWIvdGFiLmpzIiwidGFibGUvdGFibGVfaXRlbXMtdG8tZWRpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZvcm1TdWJtaXNzaW9uID0gZnVuY3Rpb24gZm9ybVN1Ym1pc3Npb24ob2JqKSB7XG4gICAgLy8gYWxlcnRcbiAgICBvYmouZWwudGV4dENvbnRlbnQgPSBvYmoubXNnO1xuICAgIG9iai5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBvYmouZWwuY2xhc3NMaXN0LmFkZCgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcblxuICAgIGlmIChvYmouZGF0YS50eXBlICE9ICdkZWxldGUnKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb2JqLmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcbiAgICAgIH0sIDUwMDApO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0nKTtcblxuICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgZm9ybVtpXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJykpO1xuICAgICAgdmFyIGZvcm1fX2FsZXJ0ID0gZm9ybVtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX19hbGVydCcpO1xuICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1baV0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBheGlvcyh7XG4gICAgICAgICAgbWV0aG9kOiBhcGkubWV0aG9kLFxuICAgICAgICAgIHVybDogYXBpLmFjdGlvbixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiBmb3JtRGF0YVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAvLyDQo9C00LDRh9C90LDRjyDQvtGC0L/RgNCw0LLQutCwIFxuICAgICAgICAgIHZhciBfcmVzJGRhdGEgPSByZXMuZGF0YSxcbiAgICAgICAgICAgICAgYWxlcnQgPSBfcmVzJGRhdGEuYWxlcnQsXG4gICAgICAgICAgICAgIG1zZyA9IF9yZXMkZGF0YS5tc2csXG4gICAgICAgICAgICAgIHR5cGUgPSBfcmVzJGRhdGEudHlwZTtcbiAgICAgICAgICBmb3JtU3VibWlzc2lvbih7XG4gICAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgICBhbGVydDogYWxlcnQsXG4gICAgICAgICAgICBtc2c6IG1zZyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAvLyDQodC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRg1xuICAgICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICAgIGVsOiBmb3JtX19hbGVydFswXSxcbiAgICAgICAgICAgIGFsZXJ0OiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiZXJyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICAgIC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXG4gICAgICAgIGZvcm1TdWJtaXNzaW9uKHtcbiAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgYWxlcnQ6ICdkYW5nZXInLFxuICAgICAgICAgIG1zZzogJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDRhNC+0YDQvNGLJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0eXBlOiBcImVyclwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGZvcm0ubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgX2xvb3AoaSwgbCk7XG4gIH1cbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGZvcm1TZWFyY2goZm9ybSwgZWwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNiID0gY2FsbGJhY2sgPyBjYWxsYmFjayA6IGZ1bmN0aW9uICgpIHt9O1xuICAgIGlmICghZm9ybSkgcmV0dXJuO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFwaSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJykpO1xuICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgdmFyIHVybCA9IGFwaS5hY3Rpb247XG4gICAgICBmb3JtRGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIlwiLmNvbmNhdChrZXksIFwiL0BkdW1teVwiKSwgXCJcIi5jb25jYXQoa2V5LCBcIi9cIikuY29uY2F0KHZhbCA/IHZhbCA6IG51bGwpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBheGlvcyh7XG4gICAgICAgICAgbWV0aG9kOiBhcGkubWV0aG9kLFxuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIC8vINCj0LTQsNGH0L3QsNGPINC+0YLQv9GA0LDQstC60LAgXG4gICAgICAgICAgdmFyIF9yZXMkZGF0YSA9IHJlcy5kYXRhLFxuICAgICAgICAgICAgICBkYXRhID0gX3JlcyRkYXRhID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZXMkZGF0YTtcbiAgICAgICAgICBjYWxsYmFjayhlbCwgZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICAgIC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXG4gICAgICAgIGNvbnNvbGUubG9nKCfQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9zZWFyY2gtdGFibGUtYWRtaW4tbWF0ZXJpYWwnKTtcbiAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlX19ib2R5X2FkbWluLW1hdGVyaWFsJyk7XG5cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2soZWwsIGRhdGEpIHtcbiAgICB2YXIgdGVwbGF0ZSA9IFtdO1xuXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgdGVwbGF0ZSA9IGRhdGEubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBcIjx0ciBjbGFzcz1cXFwidGFibGVfX3JvdyBcIi5jb25jYXQoZS5zdGF0dXMgPyAnaGlnaGxpZ2h0LXdhcm5pbmcnIDogJycsIFwiXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8dGQgY2xhc3M9XFxcInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXFxcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLWluZm8tY2lyY2xlXFxcIiBkYXRhLXRvb2x0aXA9XFxcIlwiKS5jb25jYXQoZS5yZW1hcmssIFwiXFxcIj48L2k+IFxcblxcdFxcdFxcdFxcdFxcdDwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVxcXCI+XCIpLmNvbmNhdChlLm5hbWUsIFwiIFwiKS5jb25jYXQoZS5tYXJrLCBcIjwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVxcXCI+XCIpLmNvbmNhdChlLnN0YW5kYXJ0LCBcIjwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfZGF0ZS1jcmVhdGVcXFwiPlwiKS5jb25jYXQoZS5kYXRlX2NyZWF0ZSwgXCI8L3RkPlxcblxcdFxcdFxcdFxcdFxcdDx0ZCBjbGFzcz1cXFwidGFibGVfX2NvbCB0YWJsZV9fY29sX2J0blxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGEgY2xhc3M9XFxcInRhYmxlX19idG4gYnRuIGJ0bi1zdWNjZXNzXFxcIiBocmVmPVxcXCJcIikuY29uY2F0KGxvY2F0aW9uLnBhdGhuYW1lLCBcIi9lZGl0L2lkL1wiKS5jb25jYXQoZS5pZCwgXCJcXFwiPlxcdTA0MjBcXHUwNDM1XFx1MDQzNFxcdTA0MzBcXHUwNDNBXFx1MDQ0MlxcdTA0MzhcXHUwNDQwXFx1MDQzRVxcdTA0MzJcXHUwNDMwXFx1MDQ0MlxcdTA0NEM8L2E+XFxuXFx0XFx0XFx0XFx0XFx0PC90ZD5cXG5cXHRcXHRcXHRcXHQ8L3RyPlwiKTtcbiAgICAgIH0pO1xuICAgICAgZWwuaW5uZXJIVE1MID0gdGVwbGF0ZS5qb2luKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayk7XG59KSgpOyIsIlwidXNlIHN0cmljdFwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAvKipcclxuICAgKiDQn9C+0LrQsNC30LDRgtGMINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG4gIFx0INCt0LvQtdC80L3RgiDQutC+0YLQvtGA0YvQuSDQstGL0LfRi9Cy0LDQtdGCINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC+0LvQttC10L0g0LjQvNC10YLRjCDQutC70LDRgdGBIFwic2hvdy1tb2RhbFwiINC4INCw0YLRgNC40LHRg9GCIFwiZGF0YS1pZC1tb2RhbFwiXHJcbiAgXHQg0LfQvdCw0YfQtdC90LjQtSDQsNGC0YDQuNCx0YPRgtCwINGN0YLQviBpZCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAqL1xuICB2YXIgbW9kYWxTaG93ID0gZnVuY3Rpb24gbW9kYWxTaG93KCkge1xuICAgIHZhciBtb2RhbFNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaG93LW1vZGFsJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1vZGFsU2hvdy5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgIG1vZGFsU2hvd1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkTW9kYWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZC1tb2RhbCcpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwjJyArIGlkTW9kYWwpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZGFsU2hvdygpO1xuICAvKipcclxuICAgKiDQl9Cw0LrRgNGL0YLRjCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L5cclxuICAgKi9cblxuICB2YXIgbW9kYWxDbG9zZSA9IGZ1bmN0aW9uIG1vZGFsQ2xvc2UoKSB7XG4gICAgdmFyIG1vZGFsQ2xvc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RhbC1jbG9zZScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtb2RhbENsb3NlLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgICAgbW9kYWxDbG9zZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIG1vZGFsQ2xvc2UoKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiJykpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgLy8g0J/RgNC4INC/0LXRgNCy0L7QuSDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0LDQutGC0LjQstC40YDQvtCy0LDRgtGMINC90YPQttC90YvQuSBUYWJcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyNpZCcsICcnKTtcbiAgICAgICAgdmFyIHRhYl9fdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYl9fdGl0bGVcIik7XG5cbiAgICAgICAgdmFyIF90YWJfX2l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYl9faXRlbVtkYXRhLWlkPVwiLmNvbmNhdChoYXNoLCBcIl1cIikpO1xuXG4gICAgICAgIHZhciB0YWJfX2NvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKTtcblxuICAgICAgICBfdGFiX19pdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHRhYl9fY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGFiX190aXRsZS50ZXh0Q29udGVudCA9IF90YWJfX2l0ZW0udGV4dENvbnRlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3RhYl9faXRlbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYl9faXRlbVwiKTtcblxuICAgICAgICB2YXIgX3RhYl9fY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFiX19jb250ZW50XCIpO1xuXG4gICAgICAgIF90YWJfX2l0ZW0yLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIF90YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9IC8vINCQ0LrRgtC40LLQvdGL0LkgVEFCXG5cblxuICAgICAgdmFyIHRhYl9faXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgICAgIC8vIGNsaWNrXG4gICAgICAgIHRhYl9faXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cbiAgICAgICAgICB2YXIgY3VyZW50VGFiQWN0aXZlID0gdGFiX19pdGVtW2ldLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRhYl9faXRlbS5hY3RpdmUnKTtcblxuICAgICAgICAgIGlmIChjdXJlbnRUYWJBY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJlbnRDb250ZW50QWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyZW50VGFiQWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgICAgICAgIGN1cmVudENvbnRlbnRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBjdXJlbnRUYWJBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfSAvLyDQlNC+0LHQsNCy0YLRjCDQt9Cw0LPQvtC70L7QstC+0LogXG5cblxuICAgICAgICAgIGV2LnBhdGguc29tZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWInKSkge1xuICAgICAgICAgICAgICB2YXIgX3RhYl9fdGl0bGUgPSBlLnF1ZXJ5U2VsZWN0b3IoJy50YWJfX3RpdGxlJyk7XG5cbiAgICAgICAgICAgICAgaWYgKF90YWJfX3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgX3RhYl9fdGl0bGUudGV4dENvbnRlbnQgPSBfdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pOyAvLyDQlNC+0LHQsNCy0LjRgtGMINGC0LXQutGD0YnQuNC8IC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC70LDRgdGBIC5hY3RpdmVcblxuICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnaWQnICsgdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhYl9faXRlbS5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSwgbCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxufSkoKTsiLCIvLyAoZnVuY3Rpb24oKXtcbi8vIFx0Y29uc3QgYnRuX3Nob3dNb2RhbD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX2l0ZW1zLXRvLWVkaXQgLnRhYmxlX19idG5fc2hvdy1tb2RhbCcpO1xuLy8gXHRmb3IobGV0IGk9IDAsIGw9IGJ0bl9zaG93TW9kYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcbi8vIFx0XHRidG5fc2hvd01vZGFsW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZfYnRuU2hvd01vZGFsKXtcbi8vIFx0XHRcdC8qKlxuLy8gXHRcdFx0ICog0JTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9GFINCyINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyBcIm1vZGFsX2Zvcm0tZWRpdC1uYW1lXCJcbi8vIFx0XHRcdCAqL1xuLy8gXHRcdFx0Y29uc3QgY29udGVudD0gSlNPTi5wYXJzZShidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JykpO1xuLy8gXHRcdFx0Y29uc3QgYXBpPSBidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKTtcbi8vIFx0XHRcdGNvbnN0IGlkTW9kYWw9IGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XG4vLyBcdFx0XHRsZXQgZm9ybT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRNb2RhbCkucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbi8vIFx0XHRcdGZvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWFwaScsIGFwaSk7XG4vLyBcdFx0XHRmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpLnZhbHVlPSBjb250ZW50Lm5hbWU7XG4vLyBcdFx0XHRmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicmVtYXJrXCJdJykudmFsdWU9IGNvbnRlbnQucmVtYXJrO1xuLy8gXHRcdFx0LyoqXG4vLyBcdFx0XHQgKiDQn9C+0YHQu9C1INC+0YLQv9GA0LDQstC60Lgg0LTQsNC90L3Ri9GFINC90LAg0YHQtdGA0LLQtdGALCDQstC90LXRgdGC0Lgg0LjQt9C80LXQvdC10L3QuNGPINCyINGC0LDQsdC70LjRhtGDXG4vLyBcdFx0XHQgKi9cbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0ZPUk1fU1VCTUlTU0lPTicsIGZ1bmN0aW9uKGV2KXtcbi8vIFx0XHRcdFx0ZXZfYnRuU2hvd01vZGFsLnBhdGguc29tZSgoZWwpPT57XG4vLyBcdFx0XHRcdFx0aWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJsZV9fcm93Jykpe1xuLy8gXHRcdFx0XHRcdFx0aWYoZXYuZGV0YWlsLnR5cGUgPT0gJ2RlbGV0ZScpe1xuLy8gXHRcdFx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcbi8vIFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG4vLyBcdFx0XHRcdFx0XHR9XHRcbi8vIFx0XHRcdFx0XHR9XG4vLyBcdFx0XHRcdH0pXG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0pO1xuLy8gXHR9XG4vLyB9KSgpO1xuXCJ1c2Ugc3RyaWN0XCI7Il19
