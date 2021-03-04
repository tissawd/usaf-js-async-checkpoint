const fs = require('fs');
const fetch = require('node-fetch');


let getPokemon = new Promise((resolve, reject) => {
    fs.readFile('pokemonList.txt', 'utf8', (err, data) => {
        if (err){
            return reject(err)
        }
        return resolve(data)
    })
})

getPokemon
.then(pokemon => {
    let pokeArray = pokemon.split('\n');
    pokeArray.map(pokemon => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(body => body.json())
        .then(json => {
            let typesObj = json.types;
            let typesArray = typesObj.map(types => types.type.name)

            console.log(`${json.name}: ${typesArray}`)
        })
        .catch(err => console.log('something went wrong', err))
    })
})













