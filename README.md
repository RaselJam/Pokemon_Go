# Pokemon_Go
A Browesr based Game inspired by Pokemon Go
## ENDPOINTS

| METHOD   | PATH     | DESCRIPTION   |
| -------- | -------- | --------      |
| Get   | /home | Pagina principal.HOME/NAVBAR..etc|
| Get      | /signup   | Muestra el formulario para crear un usuario.|
| Post     | /signup | Guarda en la BBDD un usuario|
| Get    | /login    | Muestra la página para ingresar como usuario.        |
|Post     | /login   | Lleva al usuario a la pagina de su perfil.
|get     |/logout| logout the user and redirect to home
| Get      | /user   | Pagina de perfil del usuario logeado.
| Get      | /admin  | Panel de control(pagina) del admin.
| Get     | /pokemons  | Muestra una vista de todos los pokemons.Acepta filtros
| Get    | /pokemons/id | Muestra los detalles de un pokemon especifico. Demuestra formulario de POST
| Post   | /pokemons/id |Actulaiza un pokemon.
|Get     | /food   | retorna el Array de todas la comidas disponiblesen BBDD.|
| Get      | /food/id   | Detalles e info de esa comida especifica.|
| Post    |/food/id     |Actualiza un Food y la cartera del User que lo hizo.|
..
...
