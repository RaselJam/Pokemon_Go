function initMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: ironhackMAD,
  });
}
