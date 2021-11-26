


function loadFood(map) {
  let foods;

  let icon = {
    url: "https://d29fhpw069ctt2.cloudfront.net/icon/image/120424/preview.svg", 
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0), 
    anchor: new google.maps.Point(0, 0) 
  };

  axios({
    method: 'post',
    url: 'http://localhost:3000/foods/jason',
  })
    .then(function (response) {
      foods = response.data.data
      console.log(foods)
      foods.forEach(food => {
        const contentString =
          '<div id="content">' +
          `<p  class="">${food.name}</p>` +
          `<p  class=""> amount : ${food.amount}</p>` +
          `<button class="claimFoodBtn" data-amount ="${food.amount}" data-foodid="${food._id}">Claim</button>` +
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

          let claimsBTNS = document.getElementsByClassName('claimFoodBtn')
          console.log("HTML elements : ", claimsBTNS)
          for (var i = 0; i < claimsBTNS.length; i++) {
            claimsBTNS[i].addEventListener('click', (e) => {
              console.log("in event")
              //Here call claim food API.
              //TODO add validation get current position we assume user is at correct location for now
              const foodId = e.target.dataset.foodid;
              const foodAmount = e.target.dataset.amount
              console.log("datas : ", foodId, foodAmount)
              //Llamar a API claim Food :/claimFood
              axios({
                method: 'post',
                url: 'http://localhost:3000/users/claimFood',
                data: { foodId, foodAmount }
              }).then(data => {
                console.log(data.data.result)
                if (data.data.result) {
                  console.log("reached to remving from markers")
                  marker.setMap(null);
                }

              })
                .catch(err => console.log("erro on claiming food: ", err))


            }, false);
          }
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
          `<button class="claimPokemonBtn"  data-pokemonid="${pokemon._id}">Claim</button>` +
          "</div>";
        console.log("marking at pokemons ", pokemon.location.coordinates[0], pokemon.location.coordinates[1])
        let icon = {
          url: pokemon.imageURL, 
          scaledSize: new google.maps.Size(50, 50), 
          origin: new google.maps.Point(0, 0), 
          anchor: new google.maps.Point(0, 0)
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
          let claimsBTNS = document.getElementsByClassName('claimPokemonBtn')
          console.log("HTML elements pokemon claims : ", claimsBTNS)
          for (var i = 0; i < claimsBTNS.length; i++) {
            claimsBTNS[i].addEventListener('click', (e) => {

              //Here call claim food API.
              //TODO add validation get current position we assume user is at correct location for now
              const pokemonId = e.target.dataset.pokemonid
              //Llamar a API claim Food :/claimFood
              axios({
                method: 'post',
                url: 'http://localhost:3000/users/claimpokemon',
                data: { pokemonId }
              }).then(data => {
                console.log(data.data.result)
                if (data.data.result) {
                  console.log("reached to removing from markers")
                  marker.setMap(null);
                }
              })
                .catch(err => console.log("erro on claiming pokemon: ", err))

            }, false);
          }
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

  setInterval(() => {
    loadUserLocation(map)
  }, 1000);
  loadFood(map);
  loadPokemons(map)


}
//

function loadUserLocation(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //making marker:
        new google.maps.Marker({
          position: pos,
          map: map,
          });
        //

        map.setCenter(pos);
      },
      (err) => console.log(err)

    );
  } else {
    // Browser doesn't support Geolocation
    alert("devise doesnt support Geolocation!")
  }
}

//
//#region ADMIN PANEL
//Admin panel :
let toggleRoleBtns = document.getElementsByClassName('toggleRoleBtn');
console.log("buttons", toggleRoleBtns)
for (let i = 0; i < toggleRoleBtns.length; i++) {

  toggleRoleBtns[i].addEventListener("click", (e) => {
    const userid = e.target.dataset.userid;
    const role = e.target.dataset.role === 'ADMIN' ? 'Player' : 'ADMIN'
    axios({
      method: 'post',
      url: 'http://localhost:3000/users/toggle-admin',
      data: { targetUserId: userid, role }
    })
      .then(data => {
        document.location.reload(true)

      }).catch(err => console.log("error on Toggleing admin role", err))
  })
//#endregion ADMIN PANEL

}
