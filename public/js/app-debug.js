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
      var textCanvas = form[i].querySelector('[text-canvas-name]');

      for (var j = 0, l2 = curForm.length; l2 > j; j++) {
        if (curForm[j].getAttribute('type') != 'file') {
          curForm[j].value = curForm[j].value ? curForm[j].value : 0;
        }
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
        return "<tr class=\"table__row ".concat(e.status ? 'highlight-warning' : '', "\">\n\t\t\t\t\t\t\t<td class=\"table__col table__col_info\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-info-circle\" title=\"").concat(e.remark, "\"></i>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_name\">").concat(e.name, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_num-detail\">").concat(e.num_detail, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_date-create\">").concat(e.date_create, "</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_btn\">\n\t\t\t\t\t\t\t\t<a class=\"table__btn btn btn-success\" href=\"/tech-process/rout-map/edit/id/").concat(e.id, "\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"table__col table__col_btn\">\n\t\t\t\t\t\t\t\t<a class=\"table__btn btn btn-primary\" href=\"/tech-process/rout-map/doc-list/id/").concat(e.id, "\">\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B</a>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>");
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
  // При клике
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
"use strict";

(function () {
  var funVisualEditor = function funVisualEditor(elBtnThis) {
    var btnSubSupAdd = document.getElementById('visual-editor__btn_sub-sup');

    var listener = function listener() {
      var val = document.querySelector('#visual-editor_sub-sup [name="val"]');
      var sub = document.querySelector('#visual-editor_sub-sup [name="sub"]');
      var sup = document.querySelector('#visual-editor_sub-sup [name="sup"]');
      var visualEditor = elBtnThis.parentNode.parentNode;
      var textCanvas = visualEditor.querySelector('.visual-editor__text-canvas');
      console.log(1); // Вставка в поле редактирования

      sup.value = sup.value !== '' ? sup.value : '&nbsp;';
      sub.value = sub.value !== '' ? sub.value : '&nbsp;';
      var html = "&#x202F;<span style=\"display: inline-block;\">\n\t\t\t\t<span style=\"display: inline-block; font-size: 18px;\">".concat(val.value, "</span>\n\t\t\t\t<span style=\"display: inline-block; position: relative; top: 3px; margin-left: -2px;\">\n\t\t\t\t\t<sup style=\"display: block; font-style: italic; font-size: 10px; vertical-align: top; line-height: 1;\">").concat(sup.value, "</sup>\n\t\t\t\t\t<sub style=\"display: block; font-style: italic; font-size: 10px; vertical-align: sub; line-height: 1;\">").concat(sub.value, "</sub>\n\t\t\t\t</span>\n\t\t\t</span>&nbsp;");
      textCanvas.insertAdjacentHTML('beforeEnd', html); // Очистка полей / закрытие модалки

      val.value = '';
      sub.value = '';
      sup.value = '';
      document.getElementById('modal_visual-editor-sub-sup').classList.remove('active');
      btnSubSupAdd.removeEventListener('click', listener, false);
    };

    btnSubSupAdd.addEventListener('click', listener, false);
  };

  var panelBtn = document.getElementsByClassName('visual-editor__panel-btn_sub-sup'); // Вызов  модального окна

  var _loop = function _loop(i, l) {
    panelBtn[i].addEventListener('click', function () {
      document.getElementById('modal_visual-editor-sub-sup').classList.add('active');
      funVisualEditor(panelBtn[i]);
    });
  };

  for (var i = 0, l = panelBtn.length; l > i; i++) {
    _loop(i, l);
  } // При изменении поля text-canvas устанавливать value TEXTAREA


  var textCanvas = document.getElementsByClassName('visual-editor__text-canvas');

  var _loop2 = function _loop2(i, l) {
    textCanvas[i].addEventListener('DOMSubtreeModified', function () {
      var val = textCanvas[i].innerHTML.replace(/\r?\n/g, "");
      textCanvas[i].parentNode.querySelector('.visual-editor__textarea').value = val;
    });
  };

  for (var i = 0, l = textCanvas.length; l > i; i++) {
    _loop2(i, l);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsImZvcm0vZm9ybV9zZWFyY2guanMiLCJmb3JtL2Zvcm1fdGVjaC1wcm9jZXNzLWFkZC1yb3V0LW1hcC5qcyIsImZvcm0vZm9ybV9fZ3JvdXAtY2hlY2tib3gtZGVsZXRlLmpzIiwibW9kYWwvbW9kYWwuanMiLCJ0YWIvdGFiLmpzIiwidGFibGUvdGFibGVfaXRlbXMtdG8tZWRpdC5qcyIsInZpc3VhbC1lZGl0b3IvdmlzdWFsLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJmb3JtU3VibWlzc2lvbiIsIm9iaiIsImVsIiwidGV4dENvbnRlbnQiLCJtc2ciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhbGVydCIsImRhdGEiLCJ0eXBlIiwic2V0VGltZW91dCIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJGb3JtIiwicXVlcnlTZWxlY3RvckFsbCIsInRleHRDYW52YXMiLCJxdWVyeVNlbGVjdG9yIiwiaiIsImwyIiwibGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwidmFsdWUiLCJhcGkiLCJKU09OIiwicGFyc2UiLCJmb3JtX19hbGVydCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJheGlvcyIsIm1ldGhvZCIsInVybCIsImFjdGlvbiIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwiY2F0Y2giLCJlcnIiLCJmb3JtU2VhcmNoIiwiY2FsbGJhY2siLCJjYiIsImZvckVhY2giLCJ2YWwiLCJrZXkiLCJyZXBsYWNlIiwiY29uc29sZSIsImxvZyIsImdldEVsZW1lbnRCeUlkIiwidGVwbGF0ZSIsIm1hcCIsInN0YXR1cyIsInJlbWFyayIsIm5hbWUiLCJtYXJrIiwic3RhbmRhcnQiLCJkYXRlX2NyZWF0ZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJpZCIsImlubmVySFRNTCIsImpvaW4iLCJmb3JtMiIsImVsMiIsImNhbGxiYWNrMiIsIm51bV9kZXRhaWwiLCJoaWRlT3B0aW9uIiwidHlwZU1hdGVyaWFsIiwibWFya01hdGVyaWFsIiwiaWRUeXBlIiwic3R5bGUiLCJkaXNwbGF5IiwiZm9ybV9fZ3JvdXBDaGVja2JveERlbGV0ZSIsImhpZGRlbiIsIm1vZGFsU2hvdyIsImlkTW9kYWwiLCJtb2RhbENsb3NlIiwid2luZG93IiwiaGFzaCIsInRhYl9fdGl0bGUiLCJ0YWJfX2l0ZW0iLCJ0YWJfX2NvbnRlbnQiLCJ0YWJfX3JlbG9hZFBhZ2UiLCJyZWxvYWQiLCJldiIsImN1cmVudFRhYkFjdGl2ZSIsInBhcmVudE5vZGUiLCJjdXJlbnRDb250ZW50QWN0aXZlIiwicGF0aCIsInNvbWUiLCJjb250YWlucyIsImZ1blZpc3VhbEVkaXRvciIsImVsQnRuVGhpcyIsImJ0blN1YlN1cEFkZCIsImxpc3RlbmVyIiwic3ViIiwic3VwIiwidmlzdWFsRWRpdG9yIiwiaHRtbCIsImluc2VydEFkamFjZW50SFRNTCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwYW5lbEJ0biJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQUk7QUFDSixNQUFJQSxjQUFjLEdBQUUsU0FBaEJBLGNBQWdCLENBQUNDLEdBQUQsRUFBTztBQUMxQjtBQUNBQSxJQUFBQSxHQUFHLENBQUNDLEVBQUosQ0FBT0MsV0FBUCxHQUFvQkYsR0FBRyxDQUFDRyxHQUF4QjtBQUNBSCxJQUFBQSxHQUFHLENBQUNDLEVBQUosQ0FBT0csU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0IsUUFBeEI7QUFDQUwsSUFBQUEsR0FBRyxDQUFDQyxFQUFKLENBQU9HLFNBQVAsQ0FBaUJFLEdBQWpCLENBQXFCLFdBQVdOLEdBQUcsQ0FBQ08sS0FBcEMsRUFBMkMsU0FBM0M7O0FBRUEsUUFBR1AsR0FBRyxDQUFDUSxJQUFKLENBQVNDLElBQVQsSUFBaUIsUUFBcEIsRUFBNkI7QUFDNUJDLE1BQUFBLFVBQVUsQ0FBQyxZQUFJO0FBQ2RWLFFBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPRyxT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QUF2QyxFQUFtRUssS0FBbkUsR0FBMEVvQixHQUExRTtBQUNBLEtBSEQ7QUFyRFM7O0FBbURWLE9BQUksSUFBSWpDLENBQUMsR0FBRSxDQUFQLEVBQVVDLENBQUMsR0FBRU0sVUFBVSxDQUFDSSxNQUE1QixFQUFvQ1YsQ0FBQyxHQUFHRCxDQUF4QyxFQUEyQ0EsQ0FBQyxFQUE1QyxFQUErQztBQUFBLFdBQXZDQSxDQUF1QyxFQUFqQ0MsQ0FBaUM7QUFNOUM7QUFFRCxDQTNERCIsImZpbGUiOiJhcHAtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCk9PntcclxuXHRsZXQgZm9ybVN1Ym1pc3Npb249IChvYmopPT57XHJcblx0XHQvLyBhbGVydFxyXG5cdFx0b2JqLmVsLnRleHRDb250ZW50PSBvYmoubXNnO1xyXG5cdFx0b2JqLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cdFx0b2JqLmVsLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LScgKyBvYmouYWxlcnQsICd2aXNpYmxlJyk7XHJcblxyXG5cdFx0aWYob2JqLmRhdGEudHlwZSAhPSAnZGVsZXRlJyl7XHJcblx0XHRcdHNldFRpbWVvdXQoKCk9PntcclxuXHRcdFx0XHRvYmouZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcblx0XHRcdFx0b2JqLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FsZXJ0LScgKyBvYmouYWxlcnQsICd2aXNpYmxlJyk7XHJcblx0XHRcdH0sIDUwMDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bGV0IGZvcm09IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0nKTtcclxuXHJcblx0Zm9yKGxldCBpPSAwLCBsPSBmb3JtLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRmb3JtW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGxldCBjdXJGb3JtPSBmb3JtW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lXScpO1xyXG5cdFx0XHRsZXQgdGV4dENhbnZhcz0gZm9ybVtpXS5xdWVyeVNlbGVjdG9yKCdbdGV4dC1jYW52YXMtbmFtZV0nKTtcclxuXHJcblx0XHRcdGZvcihsZXQgaj0gMCwgbDI9IGN1ckZvcm0ubGVuZ3RoOyBsMiA+IGo7IGorKyl7XHJcblx0XHRcdFx0aWYoY3VyRm9ybVtqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPSAnZmlsZScpe1xyXG5cdFx0XHRcdFx0Y3VyRm9ybVtqXS52YWx1ZT0gY3VyRm9ybVtqXS52YWx1ZSA/IGN1ckZvcm1bal0udmFsdWUgOiAwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgYXBpPSBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpKTtcclxuXHRcdFx0bGV0IGZvcm1fX2FsZXJ0PSBmb3JtW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX2FsZXJ0Jyk7XHJcblx0XHRcdGxldCBmb3JtRGF0YT0gbmV3IEZvcm1EYXRhKGZvcm1baV0pO1xyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0YXhpb3Moe1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBhcGkubWV0aG9kLFxyXG5cdFx0XHRcdFx0dXJsOiBhcGkuYWN0aW9uLFxyXG5cdFx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH0sXHJcblx0XHRcdFx0XHRkYXRhOiBmb3JtRGF0YVxyXG5cdFx0XHRcdH0pLnRoZW4oKHJlcyk9PntcclxuXHRcdFx0XHRcdC8vINCj0LTQsNGH0L3QsNGPINC+0YLQv9GA0LDQstC60LAgXHJcblx0XHRcdFx0XHRsZXQgeyBhbGVydCwgbXNnLCB0eXBlIH09IHJlcy5kYXRhO1xyXG5cdFx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0XHRlbDogZm9ybV9fYWxlcnRbMF0sIFxyXG5cdFx0XHRcdFx0XHRhbGVydDogYWxlcnQsIFxyXG5cdFx0XHRcdFx0XHRtc2c6IG1zZyxcclxuXHRcdFx0XHRcdFx0ZGF0YTogcmVzLmRhdGFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pLmNhdGNoKChlcnIpPT57XHJcblx0XHRcdFx0XHQvLyDQodC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRg1xyXG5cdFx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0XHRlbDogZm9ybV9fYWxlcnRbMF0sIFxyXG5cdFx0XHRcdFx0XHRhbGVydDogJ2RhbmdlcicsIFxyXG5cdFx0XHRcdFx0XHRtc2c6ICfQntGI0LjQsdC60LAg0YHQtdGA0LLQtdGA0LAnLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiB7dHlwZTogXCJlcnJcIn1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0gY2F0Y2gge1xyXG5cdFx0XHRcdC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXHJcblx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0ZWw6IGZvcm1fX2FsZXJ0WzBdLCBcclxuXHRcdFx0XHRcdGFsZXJ0OiAnZGFuZ2VyJywgXHJcblx0XHRcdFx0XHRtc2c6ICfQntGI0LjQsdC60LAg0L/RgNC4INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiycsXHJcblx0XHRcdFx0XHRkYXRhOiB7dHlwZTogXCJlcnJcIn1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufSkoKTsiLCIoKCk9PntcclxuXHRmdW5jdGlvbiBmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayl7XHJcblx0XHRsZXQgY2I9IGNhbGxiYWNrID8gY2FsbGJhY2sgOiBmdW5jdGlvbigpe307XHJcblx0XHRcdGlmKCFmb3JtKSByZXR1cm47XHJcblx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0bGV0IGFwaT0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKSk7XHJcblx0XHRcdFx0bGV0IGZvcm1EYXRhPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblx0XHRcdFx0bGV0IHVybD0gYXBpLmFjdGlvbjtcclxuXHRcdFx0XHRmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSk9PntcclxuXHRcdFx0XHRcdHVybD0gdXJsLnJlcGxhY2UoYCR7a2V5fS9AZHVtbXlgLCBgJHtrZXl9LyR7dmFsID8gdmFsIDogbnVsbH1gKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdGF4aW9zKHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiBhcGkubWV0aG9kLFxyXG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cclxuXHRcdFx0XHRcdH0pLnRoZW4oKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0Ly8g0KPQtNCw0YfQvdCw0Y8g0L7RgtC/0YDQsNCy0LrQsCBcclxuXHRcdFx0XHRcdFx0XHRsZXQgeyBkYXRhPSBmYWxzZX09IHJlcztcclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhlbCwgZGF0YSk7XHJcblx0XHRcdFx0XHR9KS5jYXRjaCgoZXJyKT0+e1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggZXJyIClcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ9Ce0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwJylcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBjYXRjaCB7XHJcblx0XHRcdFx0XHQvLyDQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsFxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ9Ce0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog0J/QvtC40YHQuiDQvNCw0YLQtdGA0LjQsNC70L7QslxyXG5cdCAqL1xyXG5cdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9zZWFyY2gtdGFibGUtYWRtaW4tbWF0ZXJpYWwnKTtcclxuXHRsZXQgZWw9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZV9fYm9keV9hZG1pbi1tYXRlcmlhbCcpO1xyXG5cdGxldCBjYWxsYmFjaz0gKGVsLCBkYXRhKT0+e1xyXG5cdFx0bGV0IHRlcGxhdGU9IFtdO1xyXG5cdFx0aWYoZGF0YS5sZW5ndGgpe1xyXG5cdFx0XHR0ZXBsYXRlPSBkYXRhLm1hcCgoZSk9PntcclxuXHRcdFx0XHRyZXR1cm4oXHJcblx0XHRcdFx0YDx0ciBjbGFzcz1cInRhYmxlX19yb3cgJHtlLnN0YXR1cyA/ICdoaWdobGlnaHQtd2FybmluZycgOiAnJ31cIj5cclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXCI+IFxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCIgZGF0YS10b29sdGlwPVwiJHtlLnJlbWFya31cIj48L2k+IFxyXG5cdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9uYW1lXCI+JHtlLm5hbWV9ICR7ZS5tYXJrfTwvdGQ+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVwiPiR7ZS5zdGFuZGFydH08L3RkPlxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX2RhdGUtY3JlYXRlXCI+JHtlLmRhdGVfY3JlYXRlfTwvdGQ+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfYnRuXCI+XHJcblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXN1Y2Nlc3NcIiBocmVmPVwiJHtsb2NhdGlvbi5wYXRobmFtZX0vZWRpdC9pZC8ke2UuaWR9XCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Yw8L2E+XHJcblx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdDwvdHI+YCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9IHRlcGxhdGUuam9pbigpO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdGVsLmlubmVySFRNTD0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayk7XHJcblxyXG5cdC8qKlxyXG5cdCAqINCf0L7QuNGB0Log0YLRhdC60LDRgNGCXHJcblx0Ki9cclxuXHJcblx0bGV0IGZvcm0yPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9zZWFyY2gtdGFibGUtdGVjaC1wcm9jZXNzLXJvdXQtbWFwJyk7XHJcblx0bGV0IGVsMj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlX19ib2R5X3RlY2gtcHJvY2Vzcy1yb3V0LW1hcCcpO1xyXG5cdGxldCBjYWxsYmFjazI9IChlbCwgZGF0YSk9PntcclxuXHRcdGxldCB0ZXBsYXRlPSBbXTtcclxuXHRcdGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcblx0XHRcdHRlcGxhdGU9IGRhdGEubWFwKChlKT0+e1xyXG5cdFx0XHRcdHJldHVybihcclxuXHRcdFx0XHRcdFx0YDx0ciBjbGFzcz1cInRhYmxlX19yb3cgJHtlLnN0YXR1cyA/ICdoaWdobGlnaHQtd2FybmluZycgOiAnJ31cIj5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfaW5mb1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiIHRpdGxlPVwiJHtlLnJlbWFya31cIj48L2k+XHJcblx0XHRcdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVwiPiR7ZS5uYW1lfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX251bS1kZXRhaWxcIj4ke2UubnVtX2RldGFpbH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9kYXRlLWNyZWF0ZVwiPiR7ZS5kYXRlX2NyZWF0ZX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9idG5cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXN1Y2Nlc3NcIiBocmVmPVwiL3RlY2gtcHJvY2Vzcy9yb3V0LW1hcC9lZGl0L2lkLyR7ZS5pZH1cIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjDwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9idG5cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXByaW1hcnlcIiBocmVmPVwiL3RlY2gtcHJvY2Vzcy9yb3V0LW1hcC9kb2MtbGlzdC9pZC8ke2UuaWR9XCI+0KHQutCw0YfQsNGC0Ywg0LTQvtC60YPQvNC10L3RgtGLPC9hPlxyXG5cdFx0XHRcdFx0XHRcdDwvdGQ+XHJcblx0XHRcdFx0XHRcdDwvdHI+YCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9IHRlcGxhdGUuam9pbigpO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdGVsLmlubmVySFRNTD0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3JtU2VhcmNoKGZvcm0yLCBlbDIsIGNhbGxiYWNrMik7XHJcbn0pKCk7IiwiKCgpPT57XHJcblx0bGV0IGZvcm09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX3RlY2gtcHJvY2Vzcy1hZGQtcm91dC1tYXAnKTtcclxuXHRpZihmb3JtKXtcclxuXHRcdGxldCB0eXBlTWF0ZXJpYWw9IGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJpZF90eXBlXCJdJyk7XHJcblx0XHRsZXQgbWFya01hdGVyaWFsPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwiaWRfbWF0ZXJpYWxcIl0gLmZvcm1fX29wdGlvbicpO1xyXG5cdFx0ZnVuY3Rpb24gaGlkZU9wdGlvbih0eXBlTWF0ZXJpYWwsIG1hcmtNYXRlcmlhbCl7XHJcblx0XHRcdGxldCBpZFR5cGU9IHR5cGVNYXRlcmlhbC52YWx1ZTtcclxuXHRcdFx0Zm9yKGxldCBpPSAwLCBsPSBtYXJrTWF0ZXJpYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0XHRtYXJrTWF0ZXJpYWxbaV0uc3R5bGUuZGlzcGxheT0gbWFya01hdGVyaWFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1pZC10eXBlJykgPT0gaWRUeXBlID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aGlkZU9wdGlvbih0eXBlTWF0ZXJpYWwsIG1hcmtNYXRlcmlhbCk7XHJcblx0XHR0eXBlTWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKT0+e1xyXG5cdFx0XHRoaWRlT3B0aW9uKHR5cGVNYXRlcmlhbCwgbWFya01hdGVyaWFsKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRsZXQgZm9ybV9fZ3JvdXBDaGVja2JveERlbGV0ZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybV9fZ3JvdXAtY2hlY2tib3gtZGVsZXRlJyk7XHJcblx0Zm9yKGxldCBpPSAwLCBsPSBmb3JtX19ncm91cENoZWNrYm94RGVsZXRlLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRmb3JtX19ncm91cENoZWNrYm94RGVsZXRlW2ldLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jaGVja2JveCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT57XHJcblx0XHRcdGxldCBoaWRkZW49IGZvcm1fX2dyb3VwQ2hlY2tib3hEZWxldGVbaV0ucXVlcnlTZWxlY3RvcignLmZvcm1fX2hpZGRlbicpO1xyXG5cdFx0XHRoaWRkZW4udmFsdWU9IGhpZGRlbi52YWx1ZSAhPSAwID8gMCA6IDE7XHJcblx0XHR9KVxyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHQvKipcclxuXHQgKiDQn9C+0LrQsNC30LDRgtGMINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG5cdFx0INCt0LvQtdC80L3RgiDQutC+0YLQvtGA0YvQuSDQstGL0LfRi9Cy0LDQtdGCINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC+0LvQttC10L0g0LjQvNC10YLRjCDQutC70LDRgdGBIFwic2hvdy1tb2RhbFwiINC4INCw0YLRgNC40LHRg9GCIFwiZGF0YS1pZC1tb2RhbFwiXHJcblx0XHQg0LfQvdCw0YfQtdC90LjQtSDQsNGC0YDQuNCx0YPRgtCwINGN0YLQviBpZCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG5cdCAqL1xyXG5cdC8vINCf0YDQuCDQutC70LjQutC1XHJcblx0Y29uc3QgbW9kYWxTaG93PSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3QgbW9kYWxTaG93PSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaG93LW1vZGFsJyk7XHJcblx0XHRmb3IobGV0IGk9IDAsIGw9IG1vZGFsU2hvdy5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0XHRtb2RhbFNob3dbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNvbnN0IGlkTW9kYWw9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkLW1vZGFsJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIycgKyBpZE1vZGFsKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdG1vZGFsU2hvdygpO1xyXG5cclxuXHQvKipcclxuXHQgKiDQl9Cw0LrRgNGL0YLRjCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L5cclxuXHQgKi9cclxuXHRjb25zdCBtb2RhbENsb3NlPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3QgbW9kYWxDbG9zZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UnKTtcclxuXHRcdGZvcihsZXQgaT0gMCwgbD0gbW9kYWxDbG9zZS5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0XHRtb2RhbENsb3NlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwuYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bW9kYWxDbG9zZSgpO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWInKSl7XHJcblx0XHQvLyDQn9GA0Lgg0L/QtdGA0LLQvtC5INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQsNC60YLQuNCy0LjRgNC+0LLQsNGC0Ywg0L3Rg9C20L3Ri9C5IFRhYlxyXG5cdFx0aWYoIHdpbmRvdy5sb2NhdGlvbi5oYXNoICl7XHJcblx0XHRcdGxldCBoYXNoPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjaWQnLCAnJyk7XHJcblx0XHRcdGxldCB0YWJfX3RpdGxlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX190aXRsZWApO1xyXG5cdFx0XHRsZXQgdGFiX19pdGVtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX19pdGVtW2RhdGEtaWQ9JHtoYXNofV1gKTtcclxuXHRcdFx0bGV0IHRhYl9fY29udGVudD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XHJcblx0XHRcdHRhYl9faXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0dGFiX19jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR0YWJfX3RpdGxlLnRleHRDb250ZW50PSB0YWJfX2l0ZW0udGV4dENvbnRlbnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgdGFiX19pdGVtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX19pdGVtYCk7XHJcblx0XHRcdGxldCB0YWJfX2NvbnRlbnQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50YWJfX2NvbnRlbnRgKTtcclxuXHRcdFx0dGFiX19pdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR0YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0JrQvdC+0L/QutCwINC+0LHQvdC+0LLQuNGC0Ywg0YHRgtGA0LDQvdC40YbRg1xyXG5cdFx0bGV0IHRhYl9fcmVsb2FkUGFnZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFiX19yZWxvYWQtcGFnZScpO1xyXG5cdFx0Zm9yKGxldCBpPSAwLCBsPSB0YWJfX3JlbG9hZFBhZ2UubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0dGFiX19yZWxvYWRQYWdlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0JDQutGC0LjQstC90YvQuSBUQUJcclxuXHRcdGxldCB0YWJfX2l0ZW09IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xyXG5cdFx0Zm9yKGxldCBpPSAwLCBsPSB0YWJfX2l0ZW0ubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0Ly8gY2xpY2tcclxuXHRcdFx0dGFiX19pdGVtW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG5cclxuXHRcdFx0XHQvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cclxuXHRcdFx0XHRsZXQgY3VyZW50VGFiQWN0aXZlPSB0YWJfX2l0ZW1baV0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGFiX19pdGVtLmFjdGl2ZScpO1xyXG5cdFx0XHRcdGlmKCBjdXJlbnRUYWJBY3RpdmUgKXtcclxuXHRcdFx0XHRcdGxldCBjdXJlbnRDb250ZW50QWN0aXZlPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggY3VyZW50VGFiQWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpICk7XHJcblx0XHRcdFx0XHRjdXJlbnRDb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0Y3VyZW50VGFiQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8g0JTQvtCx0LDQstGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6IFxyXG5cdFx0XHRcdGV2LnBhdGguc29tZSgoZSk9PntcclxuXHRcdFx0XHRcdGlmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWInKSl7XHJcblx0XHRcdFx0XHRcdGxldCB0YWJfX3RpdGxlPSBlLnF1ZXJ5U2VsZWN0b3IoJy50YWJfX3RpdGxlJyk7XHJcblx0XHRcdFx0XHRcdGlmKHRhYl9fdGl0bGUpe1xyXG5cdFx0XHRcdFx0XHRcdHRhYl9fdGl0bGUudGV4dENvbnRlbnQ9IHRoaXMudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0Ly8g0JTQvtCx0LDQstC40YLRjCDRgtC10LrRg9GJ0LjQvCAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQu9Cw0YHRgSAuYWN0aXZlXHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaD0gJ2lkJyArIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59KSgpOyIsIi8vIChmdW5jdGlvbigpe1xyXG4vLyBcdGNvbnN0IGJ0bl9zaG93TW9kYWw9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9pdGVtcy10by1lZGl0IC50YWJsZV9fYnRuX3Nob3ctbW9kYWwnKTtcclxuLy8gXHRmb3IobGV0IGk9IDAsIGw9IGJ0bl9zaG93TW9kYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuLy8gXHRcdGJ0bl9zaG93TW9kYWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldl9idG5TaG93TW9kYWwpe1xyXG4vLyBcdFx0XHQvKipcclxuLy8gXHRcdFx0ICog0JTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9GFINCyINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyBcIm1vZGFsX2Zvcm0tZWRpdC1uYW1lXCJcclxuLy8gXHRcdFx0ICovXHJcbi8vIFx0XHRcdGNvbnN0IGNvbnRlbnQ9IEpTT04ucGFyc2UoYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpKTtcclxuLy8gXHRcdFx0Y29uc3QgYXBpPSBidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKTtcclxuLy8gXHRcdFx0Y29uc3QgaWRNb2RhbD0gYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcclxuLy8gXHRcdFx0bGV0IGZvcm09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkTW9kYWwpLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XHJcbi8vIFx0XHRcdGZvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWFwaScsIGFwaSk7XHJcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJykudmFsdWU9IGNvbnRlbnQubmFtZTtcclxuLy8gXHRcdFx0Zm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInJlbWFya1wiXScpLnZhbHVlPSBjb250ZW50LnJlbWFyaztcclxuLy8gXHRcdFx0LyoqXHJcbi8vIFx0XHRcdCAqINCf0L7RgdC70LUg0L7RgtC/0YDQsNCy0LrQuCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YAsINCy0L3QtdGB0YLQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YLQsNCx0LvQuNGG0YNcclxuLy8gXHRcdFx0ICovXHJcbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0ZPUk1fU1VCTUlTU0lPTicsIGZ1bmN0aW9uKGV2KXtcclxuLy8gXHRcdFx0XHRldl9idG5TaG93TW9kYWwucGF0aC5zb21lKChlbCk9PntcclxuLy8gXHRcdFx0XHRcdGlmKGVsLmNsYXNzTGlzdC5jb250YWlucygndGFibGVfX3JvdycpKXtcclxuLy8gXHRcdFx0XHRcdFx0aWYoZXYuZGV0YWlsLnR5cGUgPT0gJ2RlbGV0ZScpe1xyXG4vLyBcdFx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xyXG4vLyBcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4vLyBcdFx0XHRcdFx0XHR9XHRcclxuLy8gXHRcdFx0XHRcdH1cclxuLy8gXHRcdFx0XHR9KVxyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG4vLyB9KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdGxldCBmdW5WaXN1YWxFZGl0b3I9IChlbEJ0blRoaXMpPT57XHJcblx0XHRsZXQgYnRuU3ViU3VwQWRkPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzdWFsLWVkaXRvcl9fYnRuX3N1Yi1zdXAnKTtcclxuXHJcblx0XHRsZXQgbGlzdGVuZXI9ICgpPT57XHJcblx0XHRcdGxldCB2YWw9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aXN1YWwtZWRpdG9yX3N1Yi1zdXAgW25hbWU9XCJ2YWxcIl0nKTtcclxuXHRcdFx0bGV0IHN1Yj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Zpc3VhbC1lZGl0b3Jfc3ViLXN1cCBbbmFtZT1cInN1YlwiXScpO1xyXG5cdFx0XHRsZXQgc3VwPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlzdWFsLWVkaXRvcl9zdWItc3VwIFtuYW1lPVwic3VwXCJdJyk7XHJcblx0XHRcdGxldCB2aXN1YWxFZGl0b3I9IGVsQnRuVGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGVcclxuXHRcdFx0bGV0IHRleHRDYW52YXM9IHZpc3VhbEVkaXRvci5xdWVyeVNlbGVjdG9yKCcudmlzdWFsLWVkaXRvcl9fdGV4dC1jYW52YXMnKTtcclxuXHRcdFx0Y29uc29sZS5sb2coMSlcclxuXHJcblx0XHRcdC8vINCS0YHRgtCw0LLQutCwINCyINC/0L7Qu9C1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHRcdFx0c3VwLnZhbHVlPSBzdXAudmFsdWUgIT09ICcnID8gc3VwLnZhbHVlIDogJyZuYnNwOyc7XHJcblx0XHRcdHN1Yi52YWx1ZT0gc3ViLnZhbHVlICE9PSAnJyA/IHN1Yi52YWx1ZSA6ICcmbmJzcDsnO1xyXG5cclxuXHRcdFx0bGV0IGh0bWw9IGAmI3gyMDJGOzxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPlxyXG5cdFx0XHRcdDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDE4cHg7XCI+JHt2YWwudmFsdWV9PC9zcGFuPlxyXG5cdFx0XHRcdDxzcGFuIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IHRvcDogM3B4OyBtYXJnaW4tbGVmdDogLTJweDtcIj5cclxuXHRcdFx0XHRcdDxzdXAgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgZm9udC1zdHlsZTogaXRhbGljOyBmb250LXNpemU6IDEwcHg7IHZlcnRpY2FsLWFsaWduOiB0b3A7IGxpbmUtaGVpZ2h0OiAxO1wiPiR7c3VwLnZhbHVlfTwvc3VwPlxyXG5cdFx0XHRcdFx0PHN1YiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrOyBmb250LXN0eWxlOiBpdGFsaWM7IGZvbnQtc2l6ZTogMTBweDsgdmVydGljYWwtYWxpZ246IHN1YjsgbGluZS1oZWlnaHQ6IDE7XCI+JHtzdWIudmFsdWV9PC9zdWI+XHJcblx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8L3NwYW4+Jm5ic3A7YDtcclxuXHJcblx0XHRcdHRleHRDYW52YXMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCBodG1sKTtcclxuXHJcblx0XHRcdC8vINCe0YfQuNGB0YLQutCwINC/0L7Qu9C10LkgLyDQt9Cw0LrRgNGL0YLQuNC1INC80L7QtNCw0LvQutC4XHJcblx0XHRcdHZhbC52YWx1ZT0gJyc7XHJcblx0XHRcdHN1Yi52YWx1ZT0gJyc7XHJcblx0XHRcdHN1cC52YWx1ZT0gJyc7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbF92aXN1YWwtZWRpdG9yLXN1Yi1zdXAnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG5cdFx0XHRidG5TdWJTdXBBZGQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lciwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJ0blN1YlN1cEFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyLCBmYWxzZSk7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdGxldCBwYW5lbEJ0bj0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlzdWFsLWVkaXRvcl9fcGFuZWwtYnRuX3N1Yi1zdXAnKTtcclxuXHQvLyDQktGL0LfQvtCyICDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG5cdGZvcihsZXQgaT0gMCwgbD0gcGFuZWxCdG4ubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdHBhbmVsQnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsX3Zpc3VhbC1lZGl0b3Itc3ViLXN1cCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmdW5WaXN1YWxFZGl0b3IocGFuZWxCdG5baV0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblx0Ly8g0J/RgNC4INC40LfQvNC10L3QtdC90LjQuCDQv9C+0LvRjyB0ZXh0LWNhbnZhcyDRg9GB0YLQsNC90LDQstC70LjQstCw0YLRjCB2YWx1ZSBURVhUQVJFQVxyXG5cdGxldCB0ZXh0Q2FudmFzPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aXN1YWwtZWRpdG9yX190ZXh0LWNhbnZhcycpO1xyXG5cdGZvcihsZXQgaT0gMCwgbD0gdGV4dENhbnZhcy5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0XHJcblx0XHR0ZXh0Q2FudmFzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsICgpPT57XHJcblx0XHRcdGxldCB2YWw9IHRleHRDYW52YXNbaV0uaW5uZXJIVE1MLnJlcGxhY2UoL1xccj9cXG4vZywgXCJcIik7XHJcblx0XHRcdHRleHRDYW52YXNbaV0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudmlzdWFsLWVkaXRvcl9fdGV4dGFyZWEnKS52YWx1ZT0gdmFsO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufSkoKTsiXX0=
