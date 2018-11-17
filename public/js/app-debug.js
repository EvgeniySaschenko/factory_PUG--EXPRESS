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
          console.log(err);
          console.log('Ошибка на стороне сервера');
        });
      } catch (_unused) {
        // Ошибка на стороне клиента
        console.log('Ошибка на стороне клиента');
      }
    });
  }
  /**
   * Поиск материалов
   */


  var form = document.getElementById('form_search-table-admin-material');
  var el = document.getElementById('table__body_admin-material');

  var callback = function callback(el, data) {
    var teplate = [];

    if (data.length) {
      teplate = data.map(function (e) {
        return "<tr class=\"table__row ".concat(e.status ? 'highlight-warning' : '', "\">\n\t\t\t\t\t<td class=\"table__col table__col_info\"> \n\t\t\t\t\t\t<i class=\"fa fa-info-circle\" data-tooltip=\"").concat(e.remark, "\"></i> \n\t\t\t\t\t</td>\n\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.name, " ").concat(e.mark, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.standart, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_date-create\">").concat(e.date_create, "</td>\n\t\t\t\t\t<td class=\"table__col table__col_btn\">\n\t\t\t\t\t\t<a class=\"table__btn btn btn-success\" href=\"").concat(location.pathname, "/edit/id/").concat(e.id, "\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>");
      });
      el.innerHTML = teplate.join();
    } else {
      el.innerHTML = '';
    }
  };

  formSearch(form, el, callback);
  /**
   * Поиск тхкарт
   */

  var form2 = document.getElementById('form_search-table-tech-process-rout-map');
  var el2 = document.getElementById('table__body_tech-process-rout-map');

  var callback2 = function callback2(el, data) {
    var teplate = [];

    if (data.length > 0) {
      teplate = data.map(function (e) {
        return "<tr class=\"table__row ".concat(e.status ? 'highlight-warning' : '', "\">\n\t\t\t\t\t\t\t<td class=\"table__col table__col_info\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-info-circle\" title=\"").concat(e.remark, "\"></i>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.name, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_num-detail\">").concat(e.num_detail, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_date-create\">").concat(e.date_create, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_btn\">\n\t\t\t\t\t\t\t\t<a class=\"table__btn btn btn-primary\" href=\"/tech-process/more/id/").concat(e.id, "\">\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0438\u0435</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>");
      });
      el.innerHTML = teplate.join();
    } else {
      el.innerHTML = '';
    }
  };

  formSearch(form2, el2, callback2);
})();
"use strict";

(function () {
  var form = document.getElementById('form_tech-process-add-rout-map');

  if (form) {
    var hideOption = function hideOption(typeMaterial, markMaterial) {
      var idType = typeMaterial.value;

      for (var i = 0, l = markMaterial.length; l > i; i++) {
        markMaterial[i].style.display = markMaterial[i].getAttribute('data-id-type') == idType ? 'block' : 'none';
      }
    };

    var typeMaterial = form.querySelector('[name="id_type"]');
    var markMaterial = form.querySelectorAll('[name="id_material"] .form__option');
    hideOption(typeMaterial, markMaterial);
    typeMaterial.addEventListener('input', function () {
      hideOption(typeMaterial, markMaterial);
    });
  }
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
      } // Кнопка обновить страницу


      var tab__reloadPage = document.getElementsByClassName('tab__reload-page');

      for (var i = 0, l = tab__reloadPage.length; l > i; i++) {
        tab__reloadPage[i].addEventListener('click', function () {
          location.reload();
        });
      } // Активный TAB


      var tab__item = document.getElementsByClassName('tab__item');

      var _loop = function _loop(_i, _l) {
        // click
        tab__item[_i].addEventListener('click', function (ev) {
          var _this = this;

          // удалить .active у .tab__item и .tab__content который сейчас активен
          var curentTabActive = tab__item[_i].parentNode.querySelector('.tab__item.active');

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

      for (var _i = 0, _l = tab__item.length; _l > _i; _i++) {
        _loop(_i, _l);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsImZvcm0vZm9ybV9zZWFyY2guanMiLCJmb3JtL2Zvcm1fdGVjaC1wcm9jZXNzLWFkZC1yb3V0LW1hcC5qcyIsImdsb2JhbC90b2x0aXAuanMiLCJtb2RhbC9tb2RhbC5qcyIsInRhYi90YWIuanMiLCJ0YWJsZS90YWJsZV9pdGVtcy10by1lZGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBmb3JtU3VibWlzc2lvbiA9IGZ1bmN0aW9uIGZvcm1TdWJtaXNzaW9uKG9iaikge1xuICAgIC8vIGFsZXJ0XG4gICAgb2JqLmVsLnRleHRDb250ZW50ID0gb2JqLm1zZztcbiAgICBvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgb2JqLmVsLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LScgKyBvYmouYWxlcnQsICd2aXNpYmxlJyk7XG5cbiAgICBpZiAob2JqLmRhdGEudHlwZSAhPSAnZGVsZXRlJykge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9iai5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgb2JqLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FsZXJ0LScgKyBvYmouYWxlcnQsICd2aXNpYmxlJyk7XG4gICAgICB9LCA1MDAwKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtJyk7XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSwgbCkge1xuICAgIGZvcm1baV0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBhcGkgPSBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpKTtcbiAgICAgIHZhciBmb3JtX19hbGVydCA9IGZvcm1baV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybV9fYWxlcnQnKTtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtW2ldKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXhpb3Moe1xuICAgICAgICAgIG1ldGhvZDogYXBpLm1ldGhvZCxcbiAgICAgICAgICB1cmw6IGFwaS5hY3Rpb24sXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YTogZm9ybURhdGFcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgLy8g0KPQtNCw0YfQvdCw0Y8g0L7RgtC/0YDQsNCy0LrQsCBcbiAgICAgICAgICB2YXIgX3JlcyRkYXRhID0gcmVzLmRhdGEsXG4gICAgICAgICAgICAgIGFsZXJ0ID0gX3JlcyRkYXRhLmFsZXJ0LFxuICAgICAgICAgICAgICBtc2cgPSBfcmVzJGRhdGEubXNnLFxuICAgICAgICAgICAgICB0eXBlID0gX3JlcyRkYXRhLnR5cGU7XG4gICAgICAgICAgZm9ybVN1Ym1pc3Npb24oe1xuICAgICAgICAgICAgZWw6IGZvcm1fX2FsZXJ0WzBdLFxuICAgICAgICAgICAgYWxlcnQ6IGFsZXJ0LFxuICAgICAgICAgICAgbXNnOiBtc2csXG4gICAgICAgICAgICBkYXRhOiByZXMuZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgLy8g0KHQtdGA0LLQtdGAINCy0LXRgNC90YPQuyDQvtGI0LjQsdC60YNcbiAgICAgICAgICBmb3JtU3VibWlzc2lvbih7XG4gICAgICAgICAgICBlbDogZm9ybV9fYWxlcnRbMF0sXG4gICAgICAgICAgICBhbGVydDogJ2RhbmdlcicsXG4gICAgICAgICAgICBtc2c6ICfQntGI0LjQsdC60LAg0YHQtdGA0LLQtdGA0LAnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICB0eXBlOiBcImVyclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoX3VudXNlZCkge1xuICAgICAgICAvLyDQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsFxuICAgICAgICBmb3JtU3VibWlzc2lvbih7XG4gICAgICAgICAgZWw6IGZvcm1fX2FsZXJ0WzBdLFxuICAgICAgICAgIGFsZXJ0OiAnZGFuZ2VyJyxcbiAgICAgICAgICBtc2c6ICfQntGI0LjQsdC60LAg0L/RgNC4INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiycsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdHlwZTogXCJlcnJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBmb3JtLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgIF9sb29wKGksIGwpO1xuICB9XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjaykge1xuICAgIHZhciBjYiA9IGNhbGxiYWNrID8gY2FsbGJhY2sgOiBmdW5jdGlvbiAoKSB7fTtcbiAgICBpZiAoIWZvcm0pIHJldHVybjtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBhcGkgPSBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpKTtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgIHZhciB1cmwgPSBhcGkuYWN0aW9uO1xuICAgICAgZm9ybURhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBrZXkpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCJcIi5jb25jYXQoa2V5LCBcIi9AZHVtbXlcIiksIFwiXCIuY29uY2F0KGtleSwgXCIvXCIpLmNvbmNhdCh2YWwgPyB2YWwgOiBudWxsKSk7XG4gICAgICB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXhpb3Moe1xuICAgICAgICAgIG1ldGhvZDogYXBpLm1ldGhvZCxcbiAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAvLyDQo9C00LDRh9C90LDRjyDQvtGC0L/RgNCw0LLQutCwIFxuICAgICAgICAgIHZhciBfcmVzJGRhdGEgPSByZXMuZGF0YSxcbiAgICAgICAgICAgICAgZGF0YSA9IF9yZXMkZGF0YSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVzJGRhdGE7XG4gICAgICAgICAgY2FsbGJhY2soZWwsIGRhdGEpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygn0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICAgIC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXG4gICAgICAgIGNvbnNvbGUubG9nKCfQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxyXG4gICAqINCf0L7QuNGB0Log0LzQsNGC0LXRgNC40LDQu9C+0LJcclxuICAgKi9cblxuXG4gIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fc2VhcmNoLXRhYmxlLWFkbWluLW1hdGVyaWFsJyk7XG4gIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZV9fYm9keV9hZG1pbi1tYXRlcmlhbCcpO1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVsLCBkYXRhKSB7XG4gICAgdmFyIHRlcGxhdGUgPSBbXTtcblxuICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgdGVwbGF0ZSA9IGRhdGEubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBcIjx0ciBjbGFzcz1cXFwidGFibGVfX3JvdyBcIi5jb25jYXQoZS5zdGF0dXMgPyAnaGlnaGxpZ2h0LXdhcm5pbmcnIDogJycsIFwiXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8dGQgY2xhc3M9XFxcInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXFxcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLWluZm8tY2lyY2xlXFxcIiBkYXRhLXRvb2x0aXA9XFxcIlwiKS5jb25jYXQoZS5yZW1hcmssIFwiXFxcIj48L2k+IFxcblxcdFxcdFxcdFxcdFxcdDwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVxcXCI+XCIpLmNvbmNhdChlLm5hbWUsIFwiIFwiKS5jb25jYXQoZS5tYXJrLCBcIjwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVxcXCI+XCIpLmNvbmNhdChlLnN0YW5kYXJ0LCBcIjwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfZGF0ZS1jcmVhdGVcXFwiPlwiKS5jb25jYXQoZS5kYXRlX2NyZWF0ZSwgXCI8L3RkPlxcblxcdFxcdFxcdFxcdFxcdDx0ZCBjbGFzcz1cXFwidGFibGVfX2NvbCB0YWJsZV9fY29sX2J0blxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGEgY2xhc3M9XFxcInRhYmxlX19idG4gYnRuIGJ0bi1zdWNjZXNzXFxcIiBocmVmPVxcXCJcIikuY29uY2F0KGxvY2F0aW9uLnBhdGhuYW1lLCBcIi9lZGl0L2lkL1wiKS5jb25jYXQoZS5pZCwgXCJcXFwiPlxcdTA0MjBcXHUwNDM1XFx1MDQzNFxcdTA0MzBcXHUwNDNBXFx1MDQ0MlxcdTA0MzhcXHUwNDQwXFx1MDQzRVxcdTA0MzJcXHUwNDMwXFx1MDQ0MlxcdTA0NEM8L2E+XFxuXFx0XFx0XFx0XFx0XFx0PC90ZD5cXG5cXHRcXHRcXHRcXHQ8L3RyPlwiKTtcbiAgICAgIH0pO1xuICAgICAgZWwuaW5uZXJIVE1MID0gdGVwbGF0ZS5qb2luKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayk7XG4gIC8qKlxyXG4gICAqINCf0L7QuNGB0Log0YLRhdC60LDRgNGCXHJcbiAgICovXG5cbiAgdmFyIGZvcm0yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fc2VhcmNoLXRhYmxlLXRlY2gtcHJvY2Vzcy1yb3V0LW1hcCcpO1xuICB2YXIgZWwyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlX19ib2R5X3RlY2gtcHJvY2Vzcy1yb3V0LW1hcCcpO1xuXG4gIHZhciBjYWxsYmFjazIgPSBmdW5jdGlvbiBjYWxsYmFjazIoZWwsIGRhdGEpIHtcbiAgICB2YXIgdGVwbGF0ZSA9IFtdO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGVwbGF0ZSA9IGRhdGEubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBcIjx0ciBjbGFzcz1cXFwidGFibGVfX3JvdyBcIi5jb25jYXQoZS5zdGF0dXMgPyAnaGlnaGxpZ2h0LXdhcm5pbmcnIDogJycsIFwiXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8dGQgY2xhc3M9XFxcInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aSBjbGFzcz1cXFwiZmEgZmEtaW5mby1jaXJjbGVcXFwiIHRpdGxlPVxcXCJcIikuY29uY2F0KGUucmVtYXJrLCBcIlxcXCI+PC9pPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvdGQ+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHRkIGNsYXNzPVxcXCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVxcXCI+XCIpLmNvbmNhdChlLm5hbWUsIFwiPC90ZD5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8dGQgY2xhc3M9XFxcInRhYmxlX19jb2wgdGFibGVfX2NvbF9udW0tZGV0YWlsXFxcIj5cIikuY29uY2F0KGUubnVtX2RldGFpbCwgXCI8L3RkPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDx0ZCBjbGFzcz1cXFwidGFibGVfX2NvbCB0YWJsZV9fY29sX2RhdGUtY3JlYXRlXFxcIj5cIikuY29uY2F0KGUuZGF0ZV9jcmVhdGUsIFwiPC90ZD5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8dGQgY2xhc3M9XFxcInRhYmxlX19jb2wgdGFibGVfX2NvbF9idG5cXFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJ0YWJsZV9fYnRuIGJ0biBidG4tcHJpbWFyeVxcXCIgaHJlZj1cXFwiL3RlY2gtcHJvY2Vzcy9tb3JlL2lkL1wiKS5jb25jYXQoZS5pZCwgXCJcXFwiPlxcdTA0MUZcXHUwNDNFXFx1MDQzNFxcdTA0NDBcXHUwNDNFXFx1MDQzMVxcdTA0M0RcXHUwNDM4XFx1MDQzNTwvYT5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L3RkPlxcblxcdFxcdFxcdFxcdFxcdFxcdDwvdHI+XCIpO1xuICAgICAgfSk7XG4gICAgICBlbC5pbm5lckhUTUwgPSB0ZXBsYXRlLmpvaW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1TZWFyY2goZm9ybTIsIGVsMiwgY2FsbGJhY2syKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fdGVjaC1wcm9jZXNzLWFkZC1yb3V0LW1hcCcpO1xuXG4gIGlmIChmb3JtKSB7XG4gICAgdmFyIGhpZGVPcHRpb24gPSBmdW5jdGlvbiBoaWRlT3B0aW9uKHR5cGVNYXRlcmlhbCwgbWFya01hdGVyaWFsKSB7XG4gICAgICB2YXIgaWRUeXBlID0gdHlwZU1hdGVyaWFsLnZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1hcmtNYXRlcmlhbC5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgICAgbWFya01hdGVyaWFsW2ldLnN0eWxlLmRpc3BsYXkgPSBtYXJrTWF0ZXJpYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkLXR5cGUnKSA9PSBpZFR5cGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgdHlwZU1hdGVyaWFsID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImlkX3R5cGVcIl0nKTtcbiAgICB2YXIgbWFya01hdGVyaWFsID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlkX21hdGVyaWFsXCJdIC5mb3JtX19vcHRpb24nKTtcbiAgICBoaWRlT3B0aW9uKHR5cGVNYXRlcmlhbCwgbWFya01hdGVyaWFsKTtcbiAgICB0eXBlTWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlT3B0aW9uKHR5cGVNYXRlcmlhbCwgbWFya01hdGVyaWFsKTtcbiAgICB9KTtcbiAgfVxufSkoKTsiLCJcInVzZSBzdHJpY3RcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICog0J/QvtC60LDQt9Cw0YLRjCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L5cclxuICBcdCDQrdC70LXQvNC90YIg0LrQvtGC0L7RgNGL0Lkg0LLRi9C30YvQstCw0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQvtC70LbQtdC9INC40LzQtdGC0Ywg0LrQu9Cw0YHRgSBcInNob3ctbW9kYWxcIiDQuCDQsNGC0YDQuNCx0YPRgiBcImRhdGEtaWQtbW9kYWxcIlxyXG4gIFx0INC30L3QsNGH0LXQvdC40LUg0LDRgtGA0LjQsdGD0YLQsCDRjdGC0L4gaWQg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgKi9cbiAgdmFyIG1vZGFsU2hvdyA9IGZ1bmN0aW9uIG1vZGFsU2hvdygpIHtcbiAgICB2YXIgbW9kYWxTaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2hvdy1tb2RhbCcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtb2RhbFNob3cubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgICBtb2RhbFNob3dbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZE1vZGFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIycgKyBpZE1vZGFsKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBtb2RhbFNob3coKTtcbiAgLyoqXHJcbiAgICog0JfQsNC60YDRi9GC0Ywg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+XHJcbiAgICovXG5cbiAgdmFyIG1vZGFsQ2xvc2UgPSBmdW5jdGlvbiBtb2RhbENsb3NlKCkge1xuICAgIHZhciBtb2RhbENsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UnKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbW9kYWxDbG9zZS5sZW5ndGg7IGwgPiBpOyBpKyspIHtcbiAgICAgIG1vZGFsQ2xvc2VbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBtb2RhbENsb3NlKCk7XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYicpKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vINCf0YDQuCDQv9C10YDQstC+0Lkg0LfQsNCz0YDRg9C30LrQtSDRgdGC0YDQsNC90LjRhtGLINCw0LrRgtC40LLQuNGA0L7QstCw0YLRjCDQvdGD0LbQvdGL0LkgVGFiXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjaWQnLCAnJyk7XG4gICAgICAgIHZhciB0YWJfX3RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJfX3RpdGxlXCIpO1xuXG4gICAgICAgIHZhciBfdGFiX19pdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJfX2l0ZW1bZGF0YS1pZD1cIi5jb25jYXQoaGFzaCwgXCJdXCIpKTtcblxuICAgICAgICB2YXIgdGFiX19jb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XG5cbiAgICAgICAgX3RhYl9faXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICB0YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHRhYl9fdGl0bGUudGV4dENvbnRlbnQgPSBfdGFiX19pdGVtLnRleHRDb250ZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF90YWJfX2l0ZW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJfX2l0ZW1cIik7XG5cbiAgICAgICAgdmFyIF90YWJfX2NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYl9fY29udGVudFwiKTtcblxuICAgICAgICBfdGFiX19pdGVtMi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICBfdGFiX19jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfSAvLyDQmtC90L7Qv9C60LAg0L7QsdC90L7QstC40YLRjCDRgdGC0YDQsNC90LjRhtGDXG5cblxuICAgICAgdmFyIHRhYl9fcmVsb2FkUGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9fcmVsb2FkLXBhZ2UnKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0YWJfX3JlbG9hZFBhZ2UubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgICAgIHRhYl9fcmVsb2FkUGFnZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IC8vINCQ0LrRgtC40LLQvdGL0LkgVEFCXG5cblxuICAgICAgdmFyIHRhYl9faXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChfaSwgX2wpIHtcbiAgICAgICAgLy8gY2xpY2tcbiAgICAgICAgdGFiX19pdGVtW19pXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cbiAgICAgICAgICB2YXIgY3VyZW50VGFiQWN0aXZlID0gdGFiX19pdGVtW19pXS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50YWJfX2l0ZW0uYWN0aXZlJyk7XG5cbiAgICAgICAgICBpZiAoY3VyZW50VGFiQWN0aXZlKSB7XG4gICAgICAgICAgICB2YXIgY3VyZW50Q29udGVudEFjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cmVudFRhYkFjdGl2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICAgICAgICBjdXJlbnRDb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgY3VyZW50VGFiQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgIH0gLy8g0JTQvtCx0LDQstGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6IFxuXG5cbiAgICAgICAgICBldi5wYXRoLnNvbWUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmNsYXNzTGlzdC5jb250YWlucygndGFiJykpIHtcbiAgICAgICAgICAgICAgdmFyIF90YWJfX3RpdGxlID0gZS5xdWVyeVNlbGVjdG9yKCcudGFiX190aXRsZScpO1xuXG4gICAgICAgICAgICAgIGlmIChfdGFiX190aXRsZSkge1xuICAgICAgICAgICAgICAgIF90YWJfX3RpdGxlLnRleHRDb250ZW50ID0gX3RoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTsgLy8g0JTQvtCx0LDQstC40YLRjCDRgtC10LrRg9GJ0LjQvCAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQu9Cw0YHRgSAuYWN0aXZlXG5cbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2lkJyArIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgX2kgPSAwLCBfbCA9IHRhYl9faXRlbS5sZW5ndGg7IF9sID4gX2k7IF9pKyspIHtcbiAgICAgICAgX2xvb3AoX2ksIF9sKTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICB9XG59KSgpOyIsIi8vIChmdW5jdGlvbigpe1xuLy8gXHRjb25zdCBidG5fc2hvd01vZGFsPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfaXRlbXMtdG8tZWRpdCAudGFibGVfX2J0bl9zaG93LW1vZGFsJyk7XG4vLyBcdGZvcihsZXQgaT0gMCwgbD0gYnRuX3Nob3dNb2RhbC5sZW5ndGg7IGwgPiBpOyBpKyspe1xuLy8gXHRcdGJ0bl9zaG93TW9kYWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldl9idG5TaG93TW9kYWwpe1xuLy8gXHRcdFx0LyoqXG4vLyBcdFx0XHQgKiDQlNC+0LHQsNCy0LvQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LIg0YTQvtGA0LzRgyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPIFwibW9kYWxfZm9ybS1lZGl0LW5hbWVcIlxuLy8gXHRcdFx0ICovXG4vLyBcdFx0XHRjb25zdCBjb250ZW50PSBKU09OLnBhcnNlKGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSk7XG4vLyBcdFx0XHRjb25zdCBhcGk9IGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpO1xuLy8gXHRcdFx0Y29uc3QgaWRNb2RhbD0gYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcbi8vIFx0XHRcdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZE1vZGFsKS5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuLy8gXHRcdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJywgYXBpKTtcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJykudmFsdWU9IGNvbnRlbnQubmFtZTtcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJyZW1hcmtcIl0nKS52YWx1ZT0gY29udGVudC5yZW1hcms7XG4vLyBcdFx0XHQvKipcbi8vIFx0XHRcdCAqINCf0L7RgdC70LUg0L7RgtC/0YDQsNCy0LrQuCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YAsINCy0L3QtdGB0YLQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YLQsNCx0LvQuNGG0YNcbi8vIFx0XHRcdCAqL1xuLy8gXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRk9STV9TVUJNSVNTSU9OJywgZnVuY3Rpb24oZXYpe1xuLy8gXHRcdFx0XHRldl9idG5TaG93TW9kYWwucGF0aC5zb21lKChlbCk9Pntcbi8vIFx0XHRcdFx0XHRpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlX19yb3cnKSl7XG4vLyBcdFx0XHRcdFx0XHRpZihldi5kZXRhaWwudHlwZSA9PSAnZGVsZXRlJyl7XG4vLyBcdFx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuLy8gXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcbi8vIFx0XHRcdFx0XHRcdH1cdFxuLy8gXHRcdFx0XHRcdH1cbi8vIFx0XHRcdFx0fSlcbi8vIFx0XHRcdH0pXG4vLyBcdFx0fSk7XG4vLyBcdH1cbi8vIH0pKCk7XG5cInVzZSBzdHJpY3RcIjsiXX0=
