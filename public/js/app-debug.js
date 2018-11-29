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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsImZvcm0vZm9ybV9zZWFyY2guanMiLCJmb3JtL2Zvcm1fdGVjaC1wcm9jZXNzLWFkZC1yb3V0LW1hcC5qcyIsImZvcm0vZm9ybV9fZ3JvdXAtY2hlY2tib3gtZGVsZXRlLmpzIiwibW9kYWwvbW9kYWwuanMiLCJ0YWIvdGFiLmpzIiwidGFibGUvdGFibGVfaXRlbXMtdG8tZWRpdC5qcyJdLCJuYW1lcyI6WyJmb3JtU3VibWlzc2lvbiIsIm9iaiIsImVsIiwidGV4dENvbnRlbnQiLCJtc2ciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhbGVydCIsImRhdGEiLCJ0eXBlIiwic2V0VGltZW91dCIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJGb3JtIiwicXVlcnlTZWxlY3RvckFsbCIsImoiLCJsMiIsImxlbmd0aCIsImdldEF0dHJpYnV0ZSIsInZhbHVlIiwiYXBpIiwiSlNPTiIsInBhcnNlIiwiZm9ybV9fYWxlcnQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJhY3Rpb24iLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsImNhdGNoIiwiZXJyIiwiZm9ybVNlYXJjaCIsImNhbGxiYWNrIiwiY2IiLCJmb3JFYWNoIiwidmFsIiwia2V5IiwicmVwbGFjZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRFbGVtZW50QnlJZCIsInRlcGxhdGUiLCJtYXAiLCJzdGF0dXMiLCJyZW1hcmsiLCJuYW1lIiwibWFyayIsInN0YW5kYXJ0IiwiZGF0ZV9jcmVhdGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaWQiLCJpbm5lckhUTUwiLCJqb2luIiwiZm9ybTIiLCJlbDIiLCJjYWxsYmFjazIiLCJudW1fZGV0YWlsIiwiaGlkZU9wdGlvbiIsInR5cGVNYXRlcmlhbCIsIm1hcmtNYXRlcmlhbCIsImlkVHlwZSIsInN0eWxlIiwiZGlzcGxheSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtX19ncm91cENoZWNrYm94RGVsZXRlIiwiaGlkZGVuIiwibW9kYWxTaG93IiwiaWRNb2RhbCIsIm1vZGFsQ2xvc2UiLCJ3aW5kb3ciLCJoYXNoIiwidGFiX190aXRsZSIsInRhYl9faXRlbSIsInRhYl9fY29udGVudCIsInRhYl9fcmVsb2FkUGFnZSIsInJlbG9hZCIsImV2IiwiY3VyZW50VGFiQWN0aXZlIiwicGFyZW50Tm9kZSIsImN1cmVudENvbnRlbnRBY3RpdmUiLCJwYXRoIiwic29tZSIsImNvbnRhaW5zIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBSTtBQUNKLE1BQUlBLGNBQWMsR0FBRSxTQUFoQkEsY0FBZ0IsQ0FBQ0MsR0FBRCxFQUFPO0FBQzFCO0FBQ0FBLElBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPQyxXQUFQLEdBQW9CRixHQUFHLENBQUNHLEdBQXhCO0FBQ0FILElBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPRyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QixRQUF4QjtBQUNBTCxJQUFBQSxHQUFHLENBQUNDLEVBQUosQ0FBT0csU0FBUCxDQUFpQkUsR0FBakIsQ0FBcUIsV0FBV04sR0FBRyxDQUFDTyxLQUFwQyxFQUEyQyxTQUEzQzs7QUFFQSxRQUFHUCxHQUFHLENBQUNRLElBQUosQ0FBU0MsSUFBVCxJQUFpQixRQUFwQixFQUE2QjtBQUM1QkMsTUFBQUEsVUFBVSxDQUFDLFlBQUk7QUFDZFYsUUFBQUEsR0FBRyxDQUFDQyxFQUFKLENBQU9HLFNBQVAsQ0FBaUJFLEdBQWpCLENBQXFCLFFBQXJCO0FBQ0FOLFFBQUFBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPRyxTQUFQLENBQWlCQyxNQUFqQixDQUF3QixXQUFXTCxHQUFHLENBQUNPLEtBQXZDLEVBQThDLFNBQTlDO0FBQ0EsT0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlBO0FBQ0QsR0FaRDs7QUFjQSxNQUFJSSxJQUFJLEdBQUVDLFFBQVEs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Q0FBc0UsUUFBdEU7QUFDQSxTQXpCRDtBQTdCZ0M7O0FBMkJqQyxXQUFJLElBQUlRLEVBQUMsR0FBRSxDQUFQLEVBQVVDLEVBQUMsR0FBRW9FLFNBQVMsQ0FBQzVELE1BQTNCLEVBQW1DUixFQUFDLEdBQUdELEVBQXZDLEVBQTBDQSxFQUFDLEVBQTNDLEVBQThDO0FBQUEsY0FBdENBLEVBQXNDLEVBQWhDQyxFQUFnQztBQTRCN0M7QUF2RGdDO0FBd0RqQztBQUNELENBMUREO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC1kZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIigoKT0+e1xyXG5cdGxldCBmb3JtU3VibWlzc2lvbj0gKG9iaik9PntcclxuXHRcdC8vIGFsZXJ0XHJcblx0XHRvYmouZWwudGV4dENvbnRlbnQ9IG9iai5tc2c7XHJcblx0XHRvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcblx0XHRvYmouZWwuY2xhc3NMaXN0LmFkZCgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcclxuXHJcblx0XHRpZihvYmouZGF0YS50eXBlICE9ICdkZWxldGUnKXtcclxuXHRcdFx0c2V0VGltZW91dCgoKT0+e1xyXG5cdFx0XHRcdG9iai5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHRcdFx0XHRvYmouZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQtJyArIG9iai5hbGVydCwgJ3Zpc2libGUnKTtcclxuXHRcdFx0fSwgNTAwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsZXQgZm9ybT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybScpO1xyXG5cclxuXHRmb3IobGV0IGk9IDAsIGw9IGZvcm0ubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdGZvcm1baV0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0bGV0IGN1ckZvcm09IGZvcm1baV0ucXVlcnlTZWxlY3RvckFsbCgnW25hbWVdJyk7XHJcblx0XHRcdGZvcihsZXQgaj0gMCwgbDI9IGN1ckZvcm0ubGVuZ3RoOyBsMiA+IGo7IGorKyl7XHJcblx0XHRcdFx0aWYoY3VyRm9ybVtqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPSAnZmlsZScpe1xyXG5cdFx0XHRcdFx0Y3VyRm9ybVtqXS52YWx1ZT0gY3VyRm9ybVtqXS52YWx1ZSA/IGN1ckZvcm1bal0udmFsdWUgOiAwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgYXBpPSBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpKTtcclxuXHRcdFx0bGV0IGZvcm1fX2FsZXJ0PSBmb3JtW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX2FsZXJ0Jyk7XHJcblx0XHRcdGxldCBmb3JtRGF0YT0gbmV3IEZvcm1EYXRhKGZvcm1baV0pO1xyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0YXhpb3Moe1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBhcGkubWV0aG9kLFxyXG5cdFx0XHRcdFx0dXJsOiBhcGkuYWN0aW9uLFxyXG5cdFx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH0sXHJcblx0XHRcdFx0XHRkYXRhOiBmb3JtRGF0YVxyXG5cdFx0XHRcdH0pLnRoZW4oKHJlcyk9PntcclxuXHRcdFx0XHRcdC8vINCj0LTQsNGH0L3QsNGPINC+0YLQv9GA0LDQstC60LAgXHJcblx0XHRcdFx0XHRsZXQgeyBhbGVydCwgbXNnLCB0eXBlIH09IHJlcy5kYXRhO1xyXG5cdFx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0XHRlbDogZm9ybV9fYWxlcnRbMF0sIFxyXG5cdFx0XHRcdFx0XHRhbGVydDogYWxlcnQsIFxyXG5cdFx0XHRcdFx0XHRtc2c6IG1zZyxcclxuXHRcdFx0XHRcdFx0ZGF0YTogcmVzLmRhdGFcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pLmNhdGNoKChlcnIpPT57XHJcblx0XHRcdFx0XHQvLyDQodC10YDQstC10YAg0LLQtdGA0L3Rg9C7INC+0YjQuNCx0LrRg1xyXG5cdFx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0XHRlbDogZm9ybV9fYWxlcnRbMF0sIFxyXG5cdFx0XHRcdFx0XHRhbGVydDogJ2RhbmdlcicsIFxyXG5cdFx0XHRcdFx0XHRtc2c6ICfQntGI0LjQsdC60LAg0YHQtdGA0LLQtdGA0LAnLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiB7dHlwZTogXCJlcnJcIn1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0gY2F0Y2gge1xyXG5cdFx0XHRcdC8vINCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwXHJcblx0XHRcdFx0Zm9ybVN1Ym1pc3Npb24oe1xyXG5cdFx0XHRcdFx0ZWw6IGZvcm1fX2FsZXJ0WzBdLCBcclxuXHRcdFx0XHRcdGFsZXJ0OiAnZGFuZ2VyJywgXHJcblx0XHRcdFx0XHRtc2c6ICfQntGI0LjQsdC60LAg0L/RgNC4INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiycsXHJcblx0XHRcdFx0XHRkYXRhOiB7dHlwZTogXCJlcnJcIn1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufSkoKTsiLCIoKCk9PntcclxuXHRmdW5jdGlvbiBmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayl7XHJcblx0XHRsZXQgY2I9IGNhbGxiYWNrID8gY2FsbGJhY2sgOiBmdW5jdGlvbigpe307XHJcblx0XHRcdGlmKCFmb3JtKSByZXR1cm47XHJcblx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0bGV0IGFwaT0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKSk7XHJcblx0XHRcdFx0bGV0IGZvcm1EYXRhPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblx0XHRcdFx0bGV0IHVybD0gYXBpLmFjdGlvbjtcclxuXHRcdFx0XHRmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSk9PntcclxuXHRcdFx0XHRcdHVybD0gdXJsLnJlcGxhY2UoYCR7a2V5fS9AZHVtbXlgLCBgJHtrZXl9LyR7dmFsID8gdmFsIDogbnVsbH1gKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdGF4aW9zKHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiBhcGkubWV0aG9kLFxyXG5cdFx0XHRcdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cclxuXHRcdFx0XHRcdH0pLnRoZW4oKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0Ly8g0KPQtNCw0YfQvdCw0Y8g0L7RgtC/0YDQsNCy0LrQsCBcclxuXHRcdFx0XHRcdFx0XHRsZXQgeyBkYXRhPSBmYWxzZX09IHJlcztcclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhlbCwgZGF0YSk7XHJcblx0XHRcdFx0XHR9KS5jYXRjaCgoZXJyKT0+e1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggZXJyIClcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ9Ce0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwJylcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBjYXRjaCB7XHJcblx0XHRcdFx0XHQvLyDQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDQutC70LjQtdC90YLQsFxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ9Ce0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INC60LvQuNC10L3RgtCwJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog0J/QvtC40YHQuiDQvNCw0YLQtdGA0LjQsNC70L7QslxyXG5cdCAqL1xyXG5cdGxldCBmb3JtPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9zZWFyY2gtdGFibGUtYWRtaW4tbWF0ZXJpYWwnKTtcclxuXHRsZXQgZWw9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZV9fYm9keV9hZG1pbi1tYXRlcmlhbCcpO1xyXG5cdGxldCBjYWxsYmFjaz0gKGVsLCBkYXRhKT0+e1xyXG5cdFx0bGV0IHRlcGxhdGU9IFtdO1xyXG5cdFx0aWYoZGF0YS5sZW5ndGgpe1xyXG5cdFx0XHR0ZXBsYXRlPSBkYXRhLm1hcCgoZSk9PntcclxuXHRcdFx0XHRyZXR1cm4oXHJcblx0XHRcdFx0YDx0ciBjbGFzcz1cInRhYmxlX19yb3cgJHtlLnN0YXR1cyA/ICdoaWdobGlnaHQtd2FybmluZycgOiAnJ31cIj5cclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9pbmZvXCI+IFxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhIGZhLWluZm8tY2lyY2xlXCIgZGF0YS10b29sdGlwPVwiJHtlLnJlbWFya31cIj48L2k+IFxyXG5cdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9uYW1lXCI+JHtlLm5hbWV9ICR7ZS5tYXJrfTwvdGQ+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVwiPiR7ZS5zdGFuZGFydH08L3RkPlxyXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX2RhdGUtY3JlYXRlXCI+JHtlLmRhdGVfY3JlYXRlfTwvdGQ+XHJcblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfYnRuXCI+XHJcblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXN1Y2Nlc3NcIiBocmVmPVwiJHtsb2NhdGlvbi5wYXRobmFtZX0vZWRpdC9pZC8ke2UuaWR9XCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Yw8L2E+XHJcblx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdDwvdHI+YCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9IHRlcGxhdGUuam9pbigpO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdGVsLmlubmVySFRNTD0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3JtU2VhcmNoKGZvcm0sIGVsLCBjYWxsYmFjayk7XHJcblxyXG5cdC8qKlxyXG5cdCAqINCf0L7QuNGB0Log0YLRhdC60LDRgNGCXHJcblx0Ki9cclxuXHJcblx0bGV0IGZvcm0yPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9zZWFyY2gtdGFibGUtdGVjaC1wcm9jZXNzLXJvdXQtbWFwJyk7XHJcblx0bGV0IGVsMj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlX19ib2R5X3RlY2gtcHJvY2Vzcy1yb3V0LW1hcCcpO1xyXG5cdGxldCBjYWxsYmFjazI9IChlbCwgZGF0YSk9PntcclxuXHRcdGxldCB0ZXBsYXRlPSBbXTtcclxuXHRcdGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcblx0XHRcdHRlcGxhdGU9IGRhdGEubWFwKChlKT0+e1xyXG5cdFx0XHRcdHJldHVybihcclxuXHRcdFx0XHRcdFx0YDx0ciBjbGFzcz1cInRhYmxlX19yb3cgJHtlLnN0YXR1cyA/ICdoaWdobGlnaHQtd2FybmluZycgOiAnJ31cIj5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfaW5mb1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiIHRpdGxlPVwiJHtlLnJlbWFya31cIj48L2k+XHJcblx0XHRcdFx0XHRcdFx0PC90ZD5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ0YWJsZV9fY29sIHRhYmxlX19jb2xfbmFtZVwiPiR7ZS5uYW1lfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidGFibGVfX2NvbCB0YWJsZV9fY29sX251bS1kZXRhaWxcIj4ke2UubnVtX2RldGFpbH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9kYXRlLWNyZWF0ZVwiPiR7ZS5kYXRlX2NyZWF0ZX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9idG5cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXN1Y2Nlc3NcIiBocmVmPVwiL3RlY2gtcHJvY2Vzcy9yb3V0LW1hcC9lZGl0L2lkLyR7ZS5pZH1cIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjDwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInRhYmxlX19jb2wgdGFibGVfX2NvbF9idG5cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwidGFibGVfX2J0biBidG4gYnRuLXByaW1hcnlcIiBocmVmPVwiL3RlY2gtcHJvY2Vzcy9yb3V0LW1hcC9kb2MtbGlzdC9pZC8ke2UuaWR9XCI+0KHQutCw0YfQsNGC0Ywg0LTQvtC60YPQvNC10L3RgtGLPC9hPlxyXG5cdFx0XHRcdFx0XHRcdDwvdGQ+XHJcblx0XHRcdFx0XHRcdDwvdHI+YCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRlbC5pbm5lckhUTUw9IHRlcGxhdGUuam9pbigpO1xyXG5cdFx0fSBlbHNlICB7XHJcblx0XHRcdGVsLmlubmVySFRNTD0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3JtU2VhcmNoKGZvcm0yLCBlbDIsIGNhbGxiYWNrMik7XHJcbn0pKCk7IiwiKCgpPT57XHJcblx0bGV0IGZvcm09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX3RlY2gtcHJvY2Vzcy1hZGQtcm91dC1tYXAnKTtcclxuXHRpZihmb3JtKXtcclxuXHRcdGxldCB0eXBlTWF0ZXJpYWw9IGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJpZF90eXBlXCJdJyk7XHJcblx0XHRsZXQgbWFya01hdGVyaWFsPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwiaWRfbWF0ZXJpYWxcIl0gLmZvcm1fX29wdGlvbicpO1xyXG5cdFx0ZnVuY3Rpb24gaGlkZU9wdGlvbih0eXBlTWF0ZXJpYWwsIG1hcmtNYXRlcmlhbCl7XHJcblx0XHRcdGxldCBpZFR5cGU9IHR5cGVNYXRlcmlhbC52YWx1ZTtcclxuXHRcdFx0Zm9yKGxldCBpPSAwLCBsPSBtYXJrTWF0ZXJpYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0XHRtYXJrTWF0ZXJpYWxbaV0uc3R5bGUuZGlzcGxheT0gbWFya01hdGVyaWFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1pZC10eXBlJykgPT0gaWRUeXBlID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aGlkZU9wdGlvbih0eXBlTWF0ZXJpYWwsIG1hcmtNYXRlcmlhbCk7XHJcblx0XHR0eXBlTWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKT0+e1xyXG5cdFx0XHRoaWRlT3B0aW9uKHR5cGVNYXRlcmlhbCwgbWFya01hdGVyaWFsKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRsZXQgZm9ybV9fZ3JvdXBDaGVja2JveERlbGV0ZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybV9fZ3JvdXAtY2hlY2tib3gtZGVsZXRlJyk7XHJcblx0Zm9yKGxldCBpPSAwLCBsPSBmb3JtX19ncm91cENoZWNrYm94RGVsZXRlLmxlbmd0aDsgbCA+IGk7IGkrKyl7XHJcblx0XHRmb3JtX19ncm91cENoZWNrYm94RGVsZXRlW2ldLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jaGVja2JveCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT57XHJcblx0XHRcdGxldCBoaWRkZW49IGZvcm1fX2dyb3VwQ2hlY2tib3hEZWxldGVbaV0ucXVlcnlTZWxlY3RvcignLmZvcm1fX2hpZGRlbicpO1xyXG5cdFx0XHRoaWRkZW4udmFsdWU9IGhpZGRlbi52YWx1ZSAhPSAwID8gMCA6IDE7XHJcblx0XHR9KVxyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHQvKipcclxuXHQgKiDQn9C+0LrQsNC30LDRgtGMINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QvlxyXG5cdFx0INCt0LvQtdC80L3RgiDQutC+0YLQvtGA0YvQuSDQstGL0LfRi9Cy0LDQtdGCINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC+0LvQttC10L0g0LjQvNC10YLRjCDQutC70LDRgdGBIFwic2hvdy1tb2RhbFwiINC4INCw0YLRgNC40LHRg9GCIFwiZGF0YS1pZC1tb2RhbFwiXHJcblx0XHQg0LfQvdCw0YfQtdC90LjQtSDQsNGC0YDQuNCx0YPRgtCwINGN0YLQviBpZCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG5cdCAqL1xyXG5cdGNvbnN0IG1vZGFsU2hvdz0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnN0IG1vZGFsU2hvdz0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2hvdy1tb2RhbCcpO1xyXG5cdFx0Zm9yKGxldCBpPSAwLCBsPSBtb2RhbFNob3cubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0bW9kYWxTaG93W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRjb25zdCBpZE1vZGFsPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZC1tb2RhbCcpO1xyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCMnICsgaWRNb2RhbCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRtb2RhbFNob3coKTtcclxuXHQvKipcclxuXHQgKiDQl9Cw0LrRgNGL0YLRjCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L5cclxuXHQgKi9cclxuXHRjb25zdCBtb2RhbENsb3NlPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc3QgbW9kYWxDbG9zZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwtY2xvc2UnKTtcclxuXHRcdGZvcihsZXQgaT0gMCwgbD0gbW9kYWxDbG9zZS5sZW5ndGg7IGwgPiBpOyBpKyspe1xyXG5cdFx0XHRtb2RhbENsb3NlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwuYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bW9kYWxDbG9zZSgpO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWInKSl7XHJcblx0XHQvLyDQn9GA0Lgg0L/QtdGA0LLQvtC5INC30LDQs9GA0YPQt9C60LUg0YHRgtGA0LDQvdC40YbRiyDQsNC60YLQuNCy0LjRgNC+0LLQsNGC0Ywg0L3Rg9C20L3Ri9C5IFRhYlxyXG5cdFx0aWYoIHdpbmRvdy5sb2NhdGlvbi5oYXNoICl7XHJcblx0XHRcdGxldCBoYXNoPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjaWQnLCAnJyk7XHJcblx0XHRcdGxldCB0YWJfX3RpdGxlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX190aXRsZWApO1xyXG5cdFx0XHRsZXQgdGFiX19pdGVtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX19pdGVtW2RhdGEtaWQ9JHtoYXNofV1gKTtcclxuXHRcdFx0bGV0IHRhYl9fY29udGVudD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XHJcblx0XHRcdHRhYl9faXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0dGFiX19jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR0YWJfX3RpdGxlLnRleHRDb250ZW50PSB0YWJfX2l0ZW0udGV4dENvbnRlbnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgdGFiX19pdGVtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFiX19pdGVtYCk7XHJcblx0XHRcdGxldCB0YWJfX2NvbnRlbnQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50YWJfX2NvbnRlbnRgKTtcclxuXHRcdFx0dGFiX19pdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR0YWJfX2NvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0JrQvdC+0L/QutCwINC+0LHQvdC+0LLQuNGC0Ywg0YHRgtGA0LDQvdC40YbRg1xyXG5cdFx0bGV0IHRhYl9fcmVsb2FkUGFnZT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFiX19yZWxvYWQtcGFnZScpO1xyXG5cdFx0Zm9yKGxldCBpPSAwLCBsPSB0YWJfX3JlbG9hZFBhZ2UubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0dGFiX19yZWxvYWRQYWdlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0JDQutGC0LjQstC90YvQuSBUQUJcclxuXHRcdGxldCB0YWJfX2l0ZW09IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYl9faXRlbScpO1xyXG5cdFx0Zm9yKGxldCBpPSAwLCBsPSB0YWJfX2l0ZW0ubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuXHRcdFx0Ly8gY2xpY2tcclxuXHRcdFx0dGFiX19pdGVtW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG5cclxuXHRcdFx0XHQvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cclxuXHRcdFx0XHRsZXQgY3VyZW50VGFiQWN0aXZlPSB0YWJfX2l0ZW1baV0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGFiX19pdGVtLmFjdGl2ZScpO1xyXG5cdFx0XHRcdGlmKCBjdXJlbnRUYWJBY3RpdmUgKXtcclxuXHRcdFx0XHRcdGxldCBjdXJlbnRDb250ZW50QWN0aXZlPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggY3VyZW50VGFiQWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpICk7XHJcblx0XHRcdFx0XHRjdXJlbnRDb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0Y3VyZW50VGFiQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8g0JTQvtCx0LDQstGC0Ywg0LfQsNCz0L7Qu9C+0LLQvtC6IFxyXG5cdFx0XHRcdGV2LnBhdGguc29tZSgoZSk9PntcclxuXHRcdFx0XHRcdGlmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWInKSl7XHJcblx0XHRcdFx0XHRcdGxldCB0YWJfX3RpdGxlPSBlLnF1ZXJ5U2VsZWN0b3IoJy50YWJfX3RpdGxlJyk7XHJcblx0XHRcdFx0XHRcdGlmKHRhYl9fdGl0bGUpe1xyXG5cdFx0XHRcdFx0XHRcdHRhYl9fdGl0bGUudGV4dENvbnRlbnQ9IHRoaXMudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0Ly8g0JTQvtCx0LDQstC40YLRjCDRgtC10LrRg9GJ0LjQvCAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQu9Cw0YHRgSAuYWN0aXZlXHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaD0gJ2lkJyArIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59KSgpOyIsIi8vIChmdW5jdGlvbigpe1xyXG4vLyBcdGNvbnN0IGJ0bl9zaG93TW9kYWw9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9pdGVtcy10by1lZGl0IC50YWJsZV9fYnRuX3Nob3ctbW9kYWwnKTtcclxuLy8gXHRmb3IobGV0IGk9IDAsIGw9IGJ0bl9zaG93TW9kYWwubGVuZ3RoOyBsID4gaTsgaSsrKXtcclxuLy8gXHRcdGJ0bl9zaG93TW9kYWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldl9idG5TaG93TW9kYWwpe1xyXG4vLyBcdFx0XHQvKipcclxuLy8gXHRcdFx0ICog0JTQvtCx0LDQstC70LXQvdC40LUg0LTQsNC90L3Ri9GFINCyINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyBcIm1vZGFsX2Zvcm0tZWRpdC1uYW1lXCJcclxuLy8gXHRcdFx0ICovXHJcbi8vIFx0XHRcdGNvbnN0IGNvbnRlbnQ9IEpTT04ucGFyc2UoYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpKTtcclxuLy8gXHRcdFx0Y29uc3QgYXBpPSBidG5fc2hvd01vZGFsW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1hcGknKTtcclxuLy8gXHRcdFx0Y29uc3QgaWRNb2RhbD0gYnRuX3Nob3dNb2RhbFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtbW9kYWwnKTtcclxuLy8gXHRcdFx0bGV0IGZvcm09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkTW9kYWwpLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XHJcbi8vIFx0XHRcdGZvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWFwaScsIGFwaSk7XHJcbi8vIFx0XHRcdGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJuYW1lXCJdJykudmFsdWU9IGNvbnRlbnQubmFtZTtcclxuLy8gXHRcdFx0Zm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInJlbWFya1wiXScpLnZhbHVlPSBjb250ZW50LnJlbWFyaztcclxuLy8gXHRcdFx0LyoqXHJcbi8vIFx0XHRcdCAqINCf0L7RgdC70LUg0L7RgtC/0YDQsNCy0LrQuCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YAsINCy0L3QtdGB0YLQuCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YLQsNCx0LvQuNGG0YNcclxuLy8gXHRcdFx0ICovXHJcbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0ZPUk1fU1VCTUlTU0lPTicsIGZ1bmN0aW9uKGV2KXtcclxuLy8gXHRcdFx0XHRldl9idG5TaG93TW9kYWwucGF0aC5zb21lKChlbCk9PntcclxuLy8gXHRcdFx0XHRcdGlmKGVsLmNsYXNzTGlzdC5jb250YWlucygndGFibGVfX3JvdycpKXtcclxuLy8gXHRcdFx0XHRcdFx0aWYoZXYuZGV0YWlsLnR5cGUgPT0gJ2RlbGV0ZScpe1xyXG4vLyBcdFx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xyXG4vLyBcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4vLyBcdFx0XHRcdFx0XHR9XHRcclxuLy8gXHRcdFx0XHRcdH1cclxuLy8gXHRcdFx0XHR9KVxyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG4vLyB9KSgpOyJdfQ==
