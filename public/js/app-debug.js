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
      var curForm = form[i].querySelectorAll('[name]');

      for (var j = 0, l2 = curForm.length; l2 > j; j++) {
        curForm[j].value = curForm[j].value ? curForm[j].value : 0;
      }

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

(function () {
  var form__groupCheckboxDelete = document.getElementsByClassName('form__group-checkbox-delete');

  var _loop = function _loop(i, l) {
    form__groupCheckboxDelete[i].querySelector('.form__checkbox').addEventListener('change', function () {
      var hidden = form__groupCheckboxDelete[i].querySelector('.form__hidden');
      hidden.value = hidden.value != 0 ? 0 : 1;
    });
  };

  for (var i = 0, l = form__groupCheckboxDelete.length; l > i; i++) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsImZvcm0vZm9ybV9zZWFyY2guanMiLCJmb3JtL2Zvcm1fdGVjaC1wcm9jZXNzLWFkZC1yb3V0LW1hcC5qcyIsImZvcm0vZm9ybV9fZ3JvdXAtY2hlY2tib3gtZGVsZXRlLmpzIiwibW9kYWwvbW9kYWwuanMiLCJ0YWIvdGFiLmpzIiwidGFibGUvdGFibGVfaXRlbXMtdG8tZWRpdC5qcyJdLCJuYW1lcyI6WyJmb3JtU3VibWlzc2lvbiIsIm9iaiIsImVsIiwidGV4dENvbnRlbnQiLCJtc2ciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhbGVydCIsImRhdGEiLCJ0eXBlIiwic2V0VGltZW91dCIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJGb3JtIiwicXVlcnlTZWxlY3RvckFsbCIsImoiLCJsMiIsImxlbmd0aCIsInZhbHVlIiwiYXBpIiwiSlNPTiIsInBhcnNlIiwiZ2V0QXR0cmlidXRlIiwiZm9ybV9fYWxlcnQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJhY3Rpb24iLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImNhdGNoIiwiZXJyIiwiZm9ybVNlYXJjaCIsImNhbGxiYWNrIiwiY2IiLCJmb3JFYWNoIiwidmFsIiwia2V5IiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRFbGVtZW50QnlJZCIsInRlcGxhdGUiLCJtYXAiLCJzdGF0dXMiLCJyZW1hcmsiLCJuYW1lIiwibWFyayIsInN0YW5kYXJ0IiwiZGF0ZV9jcmVhdGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaWQiLCJpbm5lckhUTUwiLCJqb2luIiwiZm9ybTIiLCJlbDIiLCJjYWxsYmFjazIiLCJudW1fZGV0YWlsIiwiaGlkZU9wdGlvbiIsInR5cGVNYXRlcmlhbCIsIm1hcmtNYXRlcmlhbCIsImlkVHlwZSIsInN0eWxlIiwiZGlzcGxheSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtX19ncm91cENoZWNrYm94RGVsZXRlIiwiaGlkZGVuIiwibW9kYWxTaG93IiwiaWRNb2RhbCIsIm1vZGFsQ2xvc2UiLCJ3aW5kb3ciLCJoYXNoIiwidGFiX190aXRsZSIsInRhYl9faXRlbSIsInRhYl9fY29udGVudCIsInRhYl9fcmVsb2FkUGFnZSIsInJlbG9hZCIsImV2IiwiY3VyZW50VGFiQWN0aXZlIiwicGFyZW50Tm9kZSIsImN1cmVudENvbnRlbnRBY3RpdmUiLCJwYXRoIiwic29tZSIsImNvbnRhaW5zIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBSTtBQUNKLE1BQUlBLGNBQWMsR0FBRSxTQUFoQkEsY0FBZ0IsQ0FBQ0MsR0FBRCxFQUFPO0FBQzFCO0FBQ0FBLElBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPQyxXQUFQLEdBQW9CRixHQUFHLENBQUNHLEdBQXhCO0FBQ0FILElBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPRyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QixRQUF4QjtBQUNBTCxJQUFBQSxHQUFHLENBQUNDLEVBQUosQ0FBT0csU0FBUCxDQUFpQkUsR0FBakIsQ0FBcUIsV0FBV04sR0FBRyxDQUFDTyxLQUFwQyxFQUEyQyxTQUEzQzs7QUFFQSxRQUFHUCxHQUFHLENBQUNRLElBQUosQ0FBU0MsSUFBVCxJQUFpQixRQUFwQixFQUE2QjtBQUM1QkMsTUFBQUEsVUFBVSxDQUFDLFlBQUk7QUFDZFYsUUFBQUEsR0FBRyxDQUFDQyxFQUFKLENBQU9HLFNBQVAsQ0FBaUJFLEdBQWpCLENBQXFCLFFBQXJCO0FBQ0FOLFFBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPRyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QixXQUFXTCxHQUFHLENBQUNPLEtBQXZDLEVBQThDLFNBQTlDO0FBQ0EsT0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlBO0FBQ0QsR0FaRDs7QUFjQSxNQUFJSSxJQUFJLEdBQUVDLFFBQVEs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LEVBQUMsR0FBR0QsRUFBdkMsRUFBMENBLEVBQUMsRUFBM0MsRUFBOEM7QUFBQSxjQUF0Q0EsRUFBc0MsRUFBaENDLEVBQWdDO0FBNEI3QztBQXZEZ0M7QUF3RGpDO0FBQ0QsQ0ExREQ7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLWRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKCgpPT57XHJcblx0bGV0IGZvcm1TdWJtaXNzaW9uPSAob2JqKT0+e1xyXG5cdFx0Ly8gYWxlcnRcclxuXHRcdG9iai5lbC50ZXh0Q29udGVudD0gb2JqLm1zZztcclxuXHRcdG9iai5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuXHRcdG9iai5lbC5jbGFzc0xpc3QuYWRkKCdhbGVydC0nICsgb2JqLmFsZXJ0LCAndmlzaWJsZScpO1xyXG5cclxuXHRcdGlmKG9iai5kYXRhLnR5cGUgIT0gJ2RlbGV0ZScpe1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdFx0b2JqLmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdG9iai5lbC5jbGFzc0xpc3QucmVtb3ZlKCdhbGVydC0nICsgb2JqLmFsZXJ0LCAndmlzaWJsZScpO1xyXG5cdFx0XHR9LCA1MDAwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtJyk7XHJcblxyXG5cdGZvcihsZXQgaT0gMCwgbD0gZm9ybS5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0Zm9ybVtpXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgY3VyRm9ybT0gZm9ybVtpXS5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZV0nKTtcclxuXHRcdFx0Zm9yKGxldCBqPSAwLCBsMj0gY3VyRm9ybS5sZW5ndGg7IGwyID4gajsgaisrKXtcclxuXHRcdFx0XHRjdXJGb3JtW2pdLnZhbHVlPSBjdXJGb3JtW2pdLnZhbHVlID8gY3VyRm9ybVtqXS52YWx1ZSA6IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGFwaT0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKSk7XHJcblx0XHRcdGxldCBmb3JtX19hbGVydD0gZm9ybVtpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtX19hbGVydCcpO1xyXG5cdFx0XHRsZXQgZm9ybURhdGE9IG5ldyBGb3JtRGF0YShmb3JtW2ldKTtcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdGF4aW9zKHtcclxuXHRcdFx0XHRcdG1ldGhvZDogYXBpLm1ldGhvZCxcclxuXHRcdFx0XHRcdHVybDogYXBpLmFjdGlvbixcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9LFxyXG5cdFx0XHRcdFx0ZGF0YTogZm9ybURhdGFcclxuXHRcdFx0XHR9KS50aGVuKChyZXMpPT57XHJcblx0XHRcdFx0XHQvLyDQo9C00LDRh9C90LDRjyDQvtGC0L/RgNCw0LLQutCwIFxyXG5cdFx0XHRcdFx0bGV0IHsgYWxlcnQsIG1zZywgdHlwZSB9PSByZXMuZGF0YTtcclxuXHRcdFx0XHRcdGZvcm1TdWJtaXNzaW9uKHtcclxuXHRcdFx0XHRcdFx0ZWw6IGZvcm1fX2FsZXJ0WzBdLCBcclxuXHRcdFx0XHRcdFx0YWxlcnQ6IGFsZXJ0LCBcclxuXHRcdFx0XHRcdFx0bXNnOiBtc2csXHJcblx0XHRcdFx0XHRcdGRhdGE6IHJlcy5kYXRhXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KS5jYXRjaCgoZXJyKT0+e1xyXG5cdFx0XHRcdFx0Ly8g0KHQtdGA0LLQtdGAINCy0LXRgNC90YPQuyDQvtGI0LjQsdC60YNcclxuXHRcdFx0XHRcdGZvcm1TdWJtaXNzaW9uKHtcclxuXHRcdFx0XHRcdFx0ZWw6IGZvcm1fX2FsZXJ0WzBdLCBcclxuXHRcdFx0XHRcdFx0YWxlcnQ6ICdkYW5nZXInLCBcclxuXHRcdFx0XHRcdFx0bXNnOiAn0J7RiNC40LHQutCwINGB0LXRgNCy0LXRgNCwJyxcclxuXHRcdFx0XHRcdFx0ZGF0YToge3R5cGU6IFwiZXJyXCJ9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9IGNhdGNoIHtcclxuXHRcdFx0XHQvLyDQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsFxyXG5cdFx0XHRcdGZvcm1TdWJtaXNzaW9uKHtcclxuXHRcdFx0XHRcdGVsOiBmb3JtX19hbGVydFswXSwgXHJcblx0XHRcdFx0XHRhbGVydDogJ2RhbmdlcicsIFxyXG5cdFx0XHRcdFx0bXNnOiAn0J7RiNC40LHQutCwINC/0YDQuCDQvtGC0L/RgNCw0LLQutC1INGE0L7RgNC80YsnLFxyXG5cdFx0XHRcdFx0ZGF0YToge3R5cGU6IFwiZXJyXCJ9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pKCk7IiwiKCgpPT57XHJcblx0ZnVuY3Rpb24gZm9ybVNlYXJjaChmb3JtLCBlbCwgY2FsbGJhY2spe1xyXG5cdFx0bGV0IGNiPSBjYWxsYmFjayA/IGNhbGxiYWNrIDogZnVuY3Rpb24oKXt9O1xyXG5cdFx0XHRpZighZm9ybSkgcmV0dXJuO1xyXG5cdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGxldCBhcGk9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJykpO1xyXG5cdFx0XHRcdGxldCBmb3JtRGF0YT0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG5cdFx0XHRcdGxldCB1cmw9IGFwaS5hY3Rpb247XHJcblx0XHRcdFx0Zm9ybURhdGEuZm9yRWFjaCgodmFsLCBrZXkpPT57XHJcblx0XHRcdFx0XHR1cmw9IHVybC5yZXBsYWNlKGAke2tleX0vQGR1bW15YCwgYCR7a2V5fS8ke3ZhbCA/IHZhbCA6IG51bGx9YCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRheGlvcyh7XHJcblx0XHRcdFx0XHRcdG1ldGhvZDogYXBpLm1ldGhvZCxcclxuXHRcdFx0XHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdFx0XHRcdGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XHJcblx0XHRcdFx0XHR9KS50aGVuKChyZXMpPT57XHJcblx0XHRcdFx0XHRcdC8vINCj0LTQsNGH0L3QsNGPINC+0YLQv9GA0LDQstC60LAgXHJcblx0XHRcdFx0XHRcdFx0bGV0IHsgZGF0YT0gZmFsc2V9PSByZXM7XHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZWwsIGRhdGEpO1xyXG5cdFx0XHRcdFx0fSkuY2F0Y2goKGVycik9PntcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coIGVyciApXHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCfQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCcpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gY2F0Y2gge1xyXG5cdFx0XHRcdFx0Ly8g0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0LrQu9C40LXQvdGC0LBcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsCcpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqINCf0L7QuNGB0Log0LzQsNGC0LXRgNC40LDQu9C+0LJcclxuXHQgKi9cclxuXHRsZXQgZm9ybT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fc2VhcmNoLXRhYmxlLWFkbWluLW1hdGVyaWFsJyk7XHJcblx0bGV0IGVsPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGVfX2JvZHlfYWRtaW4tbWF0ZXJpYWwnKTtcclxuXHRsZXQgY2FsbGJhY2s9IChlbCwgZGF0YSk9PntcclxuXHRcdGxldCB0ZXBsYXRlPSBbXTtcclxuXHRcdGlmKGRhdGEubGVuZ3RoKXtcclxuXHRcdFx0dGVwbGF0ZT0gZGF0YS5tYXAoKGUpPT57XHJcblx0XHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdGA8dHIgY2xhc3M9XCJ0YWJsZV9fcm93ICR7ZS5zdGF0dXMgPyAnaGlnaGxpZ2h0LXdhcm5pbmcnIDogJyd9XCI+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfaW5mb1wiPiBcclxuXHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiIGRhdGEtdG9vbHRpcD1cIiR7ZS5yZW1hcmt9XCI+PC9pPiBcclxuXHRcdFx0XHRcdDwvdGQ+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVwiPiR7ZS5uYW1lfSAke2UubWFya308L3RkPlxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX25hbWVcIj4ke2Uuc3RhbmRhcnR9PC90ZD5cclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9kYXRlLWNyZWF0ZVwiPiR7ZS5kYXRlX2NyZWF0ZX08L3RkPlxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX2J0blwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInRhYmxlX19idG4gYnRuIGJ0bi1zdWNjZXNzXCIgaHJlZj1cIiR7bG9jYXRpb24ucGF0aG5hbWV9L2VkaXQvaWQvJHtlLmlkfVwiPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMPC9hPlxyXG5cdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHQ8L3RyPmApO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZWwuaW5uZXJIVE1MPSB0ZXBsYXRlLmpvaW4oKTtcclxuXHRcdH0gZWxzZSAge1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Zm9ybVNlYXJjaChmb3JtLCBlbCwgY2FsbGJhY2spO1xyXG5cclxuXHQvKipcclxuXHQgKiDQn9C+0LjRgdC6INGC0YXQutCw0YDRglxyXG5cdCAqL1xyXG5cclxuXHRsZXQgZm9ybTI9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX3NlYXJjaC10YWJsZS10ZWNoLXByb2Nlc3Mtcm91dC1tYXAnKTtcclxuXHRsZXQgZWwyPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGVfX2JvZHlfdGVjaC1wcm9jZXNzLXJvdXQtbWFwJyk7XHJcblx0bGV0IGNhbGxiYWNrMj0gKGVsLCBkYXRhKT0+e1xyXG5cdFx0bGV0IHRlcGxhdGU9IFtdO1xyXG5cdFx0aWYoZGF0YS5sZW5ndGggPiAwKXtcclxuXHRcdFx0dGVwbGF0ZT0gZGF0YS5tYXAoKGUpPT57XHJcblx0XHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRgPHRyIGNsYXNzPVwidGFibGVfX3JvdyAke2Uuc3RhdHVzID8gJ2hpZ2hsaWdodC13YXJuaW5nJyA6ICcnfVwiPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCIgdGl0bGU9XCIke2UucmVtYXJrfVwiPjwvaT5cclxuXHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9uYW1lXCI+JHtlLm5hbWV9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbnVtLWRldGFpbFwiPiR7ZS5udW1fZGV0YWlsfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX2RhdGUtY3JlYXRlXCI+JHtlLmRhdGVfY3JlYXRlfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX2J0blwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ0YWJsZV9fYnRuIGJ0biBidG4tcHJpbWFyeVwiIGhyZWY9XCIvdGVjaC1wcm9jZXNzL21vcmUvaWQvJHtlLmlkfVwiPtCf0L7QtNGA0L7QsdC90LjQtTwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHQ8L3RyPmApO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZWwuaW5uZXJIVE1MPSB0ZXBsYXRlLmpvaW4oKTtcclxuXHRcdH0gZWxzZSAge1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Zm9ybVNlYXJjaChmb3JtMiwgZWwyLCBjYWxsYmFjazIpO1xyXG59KSgpOyIsIigoKT0+e1xyXG5cdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV90ZWNoLXByb2Nlc3MtYWRkLXJvdXQtbWFwJyk7XHJcblx0aWYoZm9ybSl7XHJcblx0XHRsZXQgdHlwZU1hdGVyaWFsPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwiaWRfdHlwZVwiXScpO1xyXG5cdFx0bGV0IG1hcmtNYXRlcmlhbD0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlkX21hdGVyaWFsXCJdIC5mb3JtX19vcHRpb24nKTtcclxuXHRcdGZ1bmN0aW9uIGhpZGVPcHRpb24odHlwZU1hdGVyaWFsLCBtYXJrTWF0ZXJpYWwpe1xyXG5cdFx0XHRsZXQgaWRUeXBlPSB0eXBlTWF0ZXJpYWwudmFsdWU7XHJcblx0XHRcdGZvcihsZXQgaT0gMCwgbD0gbWFya01hdGVyaWFsLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRcdFx0bWFya01hdGVyaWFsW2ldLnN0eWxlLmRpc3BsYXk9IG1hcmtNYXRlcmlhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtdHlwZScpID09IGlkVHlwZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGhpZGVPcHRpb24odHlwZU1hdGVyaWFsLCBtYXJrTWF0ZXJpYWwpO1xyXG5cdFx0dHlwZU1hdGVyaWFsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCk9PntcclxuXHRcdFx0aGlkZU9wdGlvbih0eXBlTWF0ZXJpYWwsIG1hcmtNYXRlcmlhbCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0bGV0IGZvcm1fX2dyb3VwQ2hlY2tib3hEZWxldGU9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX2dyb3VwLWNoZWNrYm94LWRlbGV0ZScpO1xyXG5cdGZvcihsZXQgaT0gMCwgbD0gZm9ybV9fZ3JvdXBDaGVja2JveERlbGV0ZS5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0Zm9ybV9fZ3JvdXBDaGVja2JveERlbGV0ZVtpXS5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fY2hlY2tib3gnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+e1xyXG5cdFx0XHRsZXQgaGlkZGVuPSBmb3JtX19ncm91cENoZWNrYm94RGVsZXRlW2ldLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19oaWRkZW4nKTtcclxuXHRcdFx0aGlkZGVuLnZhbHVlPSBoaWRkZW4udmFsdWUgIT0gMCA/IDAgOiAxO1xyXG5cdFx0fSlcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0LyoqXHJcblx0ICog0J/QvtC60LDQt9Cw0YLRjCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L5cclxuXHRcdCDQrdC70LXQvNC90YIg0LrQvtGC0L7RgNGL0Lkg0LLRi9C30YvQstCw0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQvtC70LbQtdC9INC40LzQtdGC0Ywg0LrQu9Cw0YHRgSBcInNob3ctbW9kYWxcIiDQuCDQsNGC0YDQuNCx0YPRgiBcImRhdGEtaWQtbW9kYWxcIlxyXG5cdFx0INC30L3QsNGH0LXQvdC40LUg0LDRgtGA0LjQsdGD0YLQsCDRjdGC0L4gaWQg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuXHQgKi9cclxuXHRjb25zdCBtb2RhbFNob3c9IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zdCBtb2RhbFNob3c9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Nob3ctbW9kYWwnKTtcclxuXHRcdGZvcihsZXQgaT0gMCwgbD0gbW9kYWxTaG93Lmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRcdG1vZGFsU2hvd1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Y29uc3QgaWRNb2RhbD0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwjJyArIGlkTW9kYWwpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0bW9kYWxTaG93KCk7XHJcblx0LyoqXHJcblx0ICog0JfQsNC60YDRi9GC0Ywg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+XHJcblx0ICovXHJcblx0Y29uc3QgbW9kYWxDbG9zZT0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnN0IG1vZGFsQ2xvc2U9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsLWNsb3NlJyk7XHJcblx0XHRmb3IobGV0IGk9IDAsIGw9IG1vZGFsQ2xvc2UubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0bW9kYWxDbG9zZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1vZGFsQ2xvc2UoKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiJykpe1xyXG5cdFx0Ly8g0J/RgNC4INC/0LXRgNCy0L7QuSDQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0LDQutGC0LjQstC40YDQvtCy0LDRgtGMINC90YPQttC90YvQuSBUYWJcclxuXHRcdGlmKCB3aW5kb3cubG9jYXRpb24uaGFzaCApe1xyXG5cdFx0XHRsZXQgaGFzaD0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnI2lkJywgJycpO1xyXG5cdFx0XHRsZXQgdGFiX190aXRsZT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhYl9fdGl0bGVgKTtcclxuXHRcdFx0bGV0IHRhYl9faXRlbT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhYl9faXRlbVtkYXRhLWlkPSR7aGFzaH1dYCk7XHJcblx0XHRcdGxldCB0YWJfX2NvbnRlbnQ9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpO1xyXG5cdFx0XHR0YWJfX2l0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdHRhYl9fY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0dGFiX190aXRsZS50ZXh0Q29udGVudD0gdGFiX19pdGVtLnRleHRDb250ZW50O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHRhYl9faXRlbT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhYl9faXRlbWApO1xyXG5cdFx0XHRsZXQgdGFiX19jb250ZW50PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX19jb250ZW50YCk7XHJcblx0XHRcdHRhYl9faXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0dGFiX19jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vINCa0L3QvtC/0LrQsCDQvtCx0L3QvtCy0LjRgtGMINGB0YLRgNCw0L3QuNGG0YNcclxuXHRcdGxldCB0YWJfX3JlbG9hZFBhZ2U9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9fcmVsb2FkLXBhZ2UnKTtcclxuXHRcdGZvcihsZXQgaT0gMCwgbD0gdGFiX19yZWxvYWRQYWdlLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRcdHRhYl9fcmVsb2FkUGFnZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vINCQ0LrRgtC40LLQvdGL0LkgVEFCXHJcblx0XHRsZXQgdGFiX19pdGVtPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWJfX2l0ZW0nKTtcclxuXHRcdGZvcihsZXQgaT0gMCwgbD0gdGFiX19pdGVtLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRcdC8vIGNsaWNrXHJcblx0XHRcdHRhYl9faXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcclxuXHJcblx0XHRcdFx0Ly8g0YPQtNCw0LvQuNGC0YwgLmFjdGl2ZSDRgyAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQvtGC0L7RgNGL0Lkg0YHQtdC50YfQsNGBINCw0LrRgtC40LLQtdC9XHJcblx0XHRcdFx0bGV0IGN1cmVudFRhYkFjdGl2ZT0gdGFiX19pdGVtW2ldLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRhYl9faXRlbS5hY3RpdmUnKTtcclxuXHRcdFx0XHRpZiggY3VyZW50VGFiQWN0aXZlICl7XHJcblx0XHRcdFx0XHRsZXQgY3VyZW50Q29udGVudEFjdGl2ZT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIGN1cmVudFRhYkFjdGl2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSApO1xyXG5cdFx0XHRcdFx0Y3VyZW50Q29udGVudEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdGN1cmVudFRhYkFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vINCU0L7QsdCw0LLRgtGMINC30LDQs9C+0LvQvtCy0L7QuiBcclxuXHRcdFx0XHRldi5wYXRoLnNvbWUoKGUpPT57XHJcblx0XHRcdFx0XHRpZihlLmNsYXNzTGlzdC5jb250YWlucygndGFiJykpe1xyXG5cdFx0XHRcdFx0XHRsZXQgdGFiX190aXRsZT0gZS5xdWVyeVNlbGVjdG9yKCcudGFiX190aXRsZScpO1xyXG5cdFx0XHRcdFx0XHRpZih0YWJfX3RpdGxlKXtcclxuXHRcdFx0XHRcdFx0XHR0YWJfX3RpdGxlLnRleHRDb250ZW50PSB0aGlzLnRleHRDb250ZW50O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdC8vINCU0L7QsdCw0LLQuNGC0Ywg0YLQtdC60YPRidC40LwgLnRhYl9faXRlbSDQuCAudGFiX19jb250ZW50INC60LvQsNGB0YEgLmFjdGl2ZVxyXG5cdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2g9ICdpZCcgKyB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpICkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSkoKTsiLCIvLyAoZnVuY3Rpb24oKXtcclxuLy8gXHRjb25zdCBidG5fc2hvd01vZGFsPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfaXRlbXMtdG8tZWRpdCAudGFibGVfX2J0bl9zaG93LW1vZGFsJyk7XHJcbi8vIFx0Zm9yKGxldCBpPSAwLCBsPSBidG5fc2hvd01vZGFsLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcbi8vIFx0XHRidG5fc2hvd01vZGFsW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZfYnRuU2hvd01vZGFsKXtcclxuLy8gXHRcdFx0LyoqXHJcbi8vIFx0XHRcdCAqINCU0L7QsdCw0LLQu9C10L3QuNC1INC00LDQvdC90YvRhSDQsiDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8gXCJtb2RhbF9mb3JtLWVkaXQtbmFtZVwiXHJcbi8vIFx0XHRcdCAqL1xyXG4vLyBcdFx0XHRjb25zdCBjb250ZW50PSBKU09OLnBhcnNlKGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSk7XHJcbi8vIFx0XHRcdGNvbnN0IGFwaT0gYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXBpJyk7XHJcbi8vIFx0XHRcdGNvbnN0IGlkTW9kYWw9IGJ0bl9zaG93TW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XHJcbi8vIFx0XHRcdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZE1vZGFsKS5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xyXG4vLyBcdFx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1hcGknLCBhcGkpO1xyXG4vLyBcdFx0XHRmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibmFtZVwiXScpLnZhbHVlPSBjb250ZW50Lm5hbWU7XHJcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJyZW1hcmtcIl0nKS52YWx1ZT0gY29udGVudC5yZW1hcms7XHJcbi8vIFx0XHRcdC8qKlxyXG4vLyBcdFx0XHQgKiDQn9C+0YHQu9C1INC+0YLQv9GA0LDQstC60Lgg0LTQsNC90L3Ri9GFINC90LAg0YHQtdGA0LLQtdGALCDQstC90LXRgdGC0Lgg0LjQt9C80LXQvdC10L3QuNGPINCyINGC0LDQsdC70LjRhtGDXHJcbi8vIFx0XHRcdCAqL1xyXG4vLyBcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdGT1JNX1NVQk1JU1NJT04nLCBmdW5jdGlvbihldil7XHJcbi8vIFx0XHRcdFx0ZXZfYnRuU2hvd01vZGFsLnBhdGguc29tZSgoZWwpPT57XHJcbi8vIFx0XHRcdFx0XHRpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlX19yb3cnKSl7XHJcbi8vIFx0XHRcdFx0XHRcdGlmKGV2LmRldGFpbC50eXBlID09ICdkZWxldGUnKXtcclxuLy8gXHRcdFx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcclxuLy8gXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuLy8gXHRcdFx0XHRcdFx0fVx0XHJcbi8vIFx0XHRcdFx0XHR9XHJcbi8vIFx0XHRcdFx0fSlcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuLy8gfSkoKTsiXX0=
