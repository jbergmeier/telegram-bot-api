const ALL_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

// We have discussed this function already!
let promise = getPromise(ALL_POKEMONS_URL);

const consumer = () => {
    promise.then(
        (result) => {
            console.log({result}); // Log the result of 50 Pokemons
        },
        (error) => {
            // As the URL is a valid one, this will not be called.
            console.log('We have encountered an Error!'); // Log an error
    });
}

consumer();