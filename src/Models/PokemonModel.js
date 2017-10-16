'use strict';

const Model = require('./Model');
// const PokemonRepository = require('../Repositories/PokemonRepository');
// const PokemonTransform = require('../Transforms/PokemonTransform');
const dateISO = require('../lib/utils/date').dateISO;

class PokemonModel extends Model {
    // constructor() {
    //     super();
    //
    //     this._useRepository(PokemonRepository);
    //     this._useRepository(PokemonTransform);
    // }

    createPokemon(pokemonBody) {
        pokemonBody.firstSeen = dateISO();
        pokemonBody.lastSeen = dateISO();
        return super.create(pokemonBody);
    }

    extinctPokemon(pokemonNumber) {
        return super.update(pokemonNumber, {
            extinct: dateISO(),
        });
    }

    getAllPokemons(page = 1) {
        return super.getAll(page);
    }

    getPokemonByNumber(number) {
        return super.getOneBy('number', number);
    }
}

module.exports = PokemonModel;
