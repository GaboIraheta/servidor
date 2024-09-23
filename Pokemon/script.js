// Función para buscar un Pokémon en la API
function getPokemon(pokemonName) { //recibe el nombre del pokemon ingresado
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`) //retorna una promesa que devuelve un valor de consulta a una API
        .then(response => { //recibe el valor de retorno de la API
            if (!response.ok) { //evalua si la respuesta es valida
                throw new Error('Pokémon no encontrado'); //Si no es valida entonces lanza una excepcion 
            }
            return response.json(); //si todo esta bien, retorna la respuesta de la API en formato JSON
        });
}

// Función para crear el contenedor del Pokémon
function createPokemonCard(pokemon) { //recibe los datos del pokemon en formato JSON, como retorno de la promesa fetch en getPokemon
    const pokemonList = document.getElementById('pokemonList'); //Accede al contenedor que almacena la lista de pokemon mediante el ID

    // Crear el contenedor para el Pokémon
    const pokemonCard = document.createElement('div'); //crea un nuevo elemento html
    pokemonCard.classList.add('pokemon'); //le agrega la clase pokemon definida en el css

    // Agregar imagen, nombre, altura y peso del Pokémon
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <h3>${pokemon.name}</h3>
        <p><strong>Altura:</strong> ${pokemon.height}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <button class="delete-btn">Eliminar</button>
    `; //al nuevo contenedor creado le define la estructura html escrita

    // Función para eliminar el Pokémon de la lista
    pokemonCard.querySelector('.delete-btn').addEventListener('click', () => { //se obtiene el boton de delete dentro del contenedor creado y se la agrega el listener
        //para que al presionarlo suceda el evento deseado
        pokemonCard.remove(); //remueve el elemento visual del html por completo, incluyendo todo lo que esta dentro de dicho contenedor
    });

    // Añadir la tarjeta del Pokémon a la lista
    pokemonList.appendChild(pokemonCard); //agrega al contenedor de lista de pokemon el nuevo elemento html con toda la estructura definida
}

// Evento para el botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', () => { //agrega el listener para el boton de buscar
    const pokemonName = document.getElementById('pokemonName').value.trim(); //obtiene el valor del cuadro de texto y elimina los espacios en blanco al principio y al final
    const message = document.getElementById('message'); //obtiene el elemento de parrafo colocado en el html para advertir cualquier mensaje de accion
    
    if (!pokemonName) { //evalua si el cuadro de texto ha sido llenado o si no contiene ningun valor
        message.textContent = 'Por favor, ingresa el nombre de un Pokémon.'; //si no contiene ningun valor el parrafo de accion advierte que se debe ingresar un pokemon
        return; //el metodo finaliza dado que no se podra encontrar el pokemon
    }

    // Mostrar mensaje de búsqueda
    message.textContent = 'Buscando Pokémon...'; //el parrafo de accion muestra el mensaje de busqueda mientras la api responde

    // Llamar a la API
    getPokemon(pokemonName) //se llama a get pokemon para obtener una respuesta de la api
        .then(pokemon => { //si la promesa de la api retorna un valor exitoso lo recibe el metodo then 
            // Limpiar el mensaje y mostrar el Pokémon
            message.textContent = ''; //se limpia el parrafo de accion
            createPokemonCard(pokemon); //se llama a create pokemon para crear el contenedor que contendra la informacion del pokemon consultado, pasandole el dato retornado de la api
        })
        .catch(error => { //si la promesa de la api retorna un valor de error lo recibe el metodo cactch
            // Mostrar mensaje de error si el Pokémon no se encuentra
            message.textContent = error.message; //el catch muestra por medio del parrafo de accion el mensaje del error, que es "Pokemon no encontrado" definido en getPokemon
        });
});