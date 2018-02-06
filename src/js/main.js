import 'bootstrap';
import $ from 'jquery';


/* areas */ 
(function() {
  console.log("init");

  function onClickMap(){
    const lat = $("#area_search [name='area[latitude]']")[0].value;
    const lng = $("#area_search [name='area[longitude]']")[0].value;

    if (lat == "" || lng == "" ){
      alert("緯度・経度を入力してください");
      return;
    }

    const url = `http://maps.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  }

  window.$ = $;
  window.onClickMap = onClickMap;

})();
