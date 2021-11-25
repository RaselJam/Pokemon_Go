

function loadFood(map) {
  let foods;

  let icon = {
    url: "https://d29fhpw069ctt2.cloudfront.net/icon/image/120424/preview.svg", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  axios({
    method: 'post',
    url: 'http://localhost:3000/foods/jason',
  })
    .then(function (response) {
      foods = response.data.data
      console.log(foods)
      foods.forEach(food => {
        // console.log("marking at ", food.location.coordinates[0], food.location.coordinates[1])
        const contentString =
          '<div id="content">' +
          `<p  class="">${food.name}</p>` +
          `<p  class=""> amount : ${food.amount}</p>` +
          `<button class="claimFoodBtn" data-id="${food._id}">Claim</button>` +
          "</div>";
        const marker = new google.maps.Marker({
          position: {
            lat: food.location.coordinates[0],
            lng: food.location.coordinates[1],
          },
          map: map,
          icon: icon,
          title: "Food"
        });
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
          //
          let claimsBTNS = document.getElementsByClassName('claimFoodBtn')
          console.log("HTML elements : ", claimsBTNS)
          for (var i = 0; i < claimsBTNS.length; i++) {
            claimsBTNS[i].addEventListener('click', (e) => {
              console.log("in event")
              //Here call claim food API.
              //TODO add validation get current position we assume user is at correct location for now
              console.log("item :", claimsBTNS[i])

            }, false);
          }
          //
        });
      })
    });
}
function loadPokemons(map) {
  let pokemons;
  axios({
    method: 'get',
    url: 'http://localhost:3000/pokemons/jason',
  })
    .then(function (response) {
      pokemons = response.data.data
      console.log("pokemons :", pokemons)
      pokemons.forEach(pokemon => {
        const contentString =
          '<div id="content">' +
          `<p >${pokemon.name}</p>` +
          "</div>";
        console.log("marking at pokemons ", pokemon.location.coordinates[0], pokemon.location.coordinates[1])
        let icon = {
          url: pokemon.imageURL, // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        const marker = new google.maps.Marker({
          position: {
            lat: pokemon.location.coordinates[0],
            lng: pokemon.location.coordinates[1],

          },
          map: map,
          icon: icon,
          title: pokemon.name
        });
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });

          //

          //





        });

      })


    }).catch(err => console.log("error on loading pokemons : ", err));
}
function initMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };


  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: ironhackMAD,
  });
  loadFood(map);
  loadPokemons(map)
  //addEventListeners :
  //TODO encapsulate it to seperate function

  //
}
