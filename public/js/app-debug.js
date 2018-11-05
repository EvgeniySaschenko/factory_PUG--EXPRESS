"use strict";

(function () {
  var form = document.getElementsByClassName('form');

  var _loop = function _loop(i, l) {
    form[i].addEventListener('submit', function (e) {
      e.preventDefault();
      var api = JSON.parse(this.getAttribute('data-api'));
      var formData = new FormData(form[i]);
      axios({
        method: api.method,
        url: api.action,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(function (res) {
        var _res$data = res.data,
            alert = _res$data.alert,
            msg = _res$data.msg;
        var form__alert = form[i].getElementsByClassName('form__alert');
        form__alert[0].textContent = msg;
        form__alert[0].classList.remove('hidden');
        form__alert[0].classList.add('alert-' + alert, 'visible');
        form[i].reset();
        setTimeout(function () {
          form__alert[0].classList.add('hidden');
          form__alert[0].classList.remove('alert-' + alert, 'visible');
        }, 5000);
      }).catch(function (err) {
        form__alert[0].textContent = 'Ошибка сервера';
        form__alert[0].classList.add('alert-danger', 'visible');
      });
    });
  };

  for (var i = 0, l = form.length; l > i; i++) {
    _loop(i, l);
  }
})();
"use strict";

(function () {
  var tab__item = document.getElementsByClassName('tab__item');

  var _loop = function _loop(i, l) {
    // click
    tab__item[i].addEventListener('click', function () {
      // удалить .active у .tab__item и .tab__content который сейчас активен
      var curentTabActive = tab__item[i].parentNode.querySelector('.tab__item.active');
      var curentContentActive = document.getElementById(curentTabActive.getAttribute('data-id'));
      curentContentActive.classList.remove('active');
      curentTabActive.classList.remove('active'); // Добавить текущим .tab__item и .tab__content класс .active

      this.classList.add('active');
      document.getElementById(this.getAttribute('data-id')).classList.add('active');
    }); // touch

    tab__item[i].addEventListener('touch', function () {
      // удалить .active у .tab__item и .tab__content который сейчас активен
      var curentTabActive = tab__item[i].parentNode.querySelector('.tab__item.active');
      var curentContentActive = document.getElementById(curentTabActive.getAttribute('data-id'));
      curentContentActive.classList.remove('active');
      curentTabActive.classList.remove('active'); // Добавить текущим .tab__item и .tab__content класс .active

      this.classList.add('active');
      document.getElementById(this.getAttribute('data-id')).classList.add('active');
    });
  };

  for (var i = 0, l = tab__item.length; l > i; i++) {
    _loop(i, l);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZm9ybS5qcyIsInRhYi90YWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtJyk7XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSwgbCkge1xuICAgIGZvcm1baV0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBhcGkgPSBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFwaScpKTtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtW2ldKTtcbiAgICAgIGF4aW9zKHtcbiAgICAgICAgbWV0aG9kOiBhcGkubWV0aG9kLFxuICAgICAgICB1cmw6IGFwaS5hY3Rpb24sXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIF9yZXMkZGF0YSA9IHJlcy5kYXRhLFxuICAgICAgICAgICAgYWxlcnQgPSBfcmVzJGRhdGEuYWxlcnQsXG4gICAgICAgICAgICBtc2cgPSBfcmVzJGRhdGEubXNnO1xuICAgICAgICB2YXIgZm9ybV9fYWxlcnQgPSBmb3JtW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm1fX2FsZXJ0Jyk7XG4gICAgICAgIGZvcm1fX2FsZXJ0WzBdLnRleHRDb250ZW50ID0gbXNnO1xuICAgICAgICBmb3JtX19hbGVydFswXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgZm9ybV9fYWxlcnRbMF0uY2xhc3NMaXN0LmFkZCgnYWxlcnQtJyArIGFsZXJ0LCAndmlzaWJsZScpO1xuICAgICAgICBmb3JtW2ldLnJlc2V0KCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZvcm1fX2FsZXJ0WzBdLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgIGZvcm1fX2FsZXJ0WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FsZXJ0LScgKyBhbGVydCwgJ3Zpc2libGUnKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGZvcm1fX2FsZXJ0WzBdLnRleHRDb250ZW50ID0gJ9Ce0YjQuNCx0LrQsCDRgdC10YDQstC10YDQsCc7XG4gICAgICAgIGZvcm1fX2FsZXJ0WzBdLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWRhbmdlcicsICd2aXNpYmxlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGZvcm0ubGVuZ3RoOyBsID4gaTsgaSsrKSB7XG4gICAgX2xvb3AoaSwgbCk7XG4gIH1cbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciB0YWJfX2l0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWJfX2l0ZW0nKTtcblxuICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpLCBsKSB7XG4gICAgLy8gY2xpY2tcbiAgICB0YWJfX2l0ZW1baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyDRg9C00LDQu9C40YLRjCAuYWN0aXZlINGDIC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC+0YLQvtGA0YvQuSDRgdC10LnRh9Cw0YEg0LDQutGC0LjQstC10L1cbiAgICAgIHZhciBjdXJlbnRUYWJBY3RpdmUgPSB0YWJfX2l0ZW1baV0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGFiX19pdGVtLmFjdGl2ZScpO1xuICAgICAgdmFyIGN1cmVudENvbnRlbnRBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJlbnRUYWJBY3RpdmUuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgY3VyZW50Q29udGVudEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIGN1cmVudFRhYkFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgLy8g0JTQvtCx0LDQstC40YLRjCDRgtC10LrRg9GJ0LjQvCAudGFiX19pdGVtINC4IC50YWJfX2NvbnRlbnQg0LrQu9Cw0YHRgSAuYWN0aXZlXG5cbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9KTsgLy8gdG91Y2hcblxuICAgIHRhYl9faXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vINGD0LTQsNC70LjRgtGMIC5hY3RpdmUg0YMgLnRhYl9faXRlbSDQuCAudGFiX19jb250ZW50INC60L7RgtC+0YDRi9C5INGB0LXQudGH0LDRgSDQsNC60YLQuNCy0LXQvVxuICAgICAgdmFyIGN1cmVudFRhYkFjdGl2ZSA9IHRhYl9faXRlbVtpXS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy50YWJfX2l0ZW0uYWN0aXZlJyk7XG4gICAgICB2YXIgY3VyZW50Q29udGVudEFjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cmVudFRhYkFjdGl2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICBjdXJlbnRDb250ZW50QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgY3VyZW50VGFiQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyAvLyDQlNC+0LHQsNCy0LjRgtGMINGC0LXQutGD0YnQuNC8IC50YWJfX2l0ZW0g0LggLnRhYl9fY29udGVudCDQutC70LDRgdGBIC5hY3RpdmVcblxuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGFiX19pdGVtLmxlbmd0aDsgbCA+IGk7IGkrKykge1xuICAgIF9sb29wKGksIGwpO1xuICB9XG59KSgpOyJdfQ==
