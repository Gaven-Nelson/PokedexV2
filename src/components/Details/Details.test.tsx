import {test, expect} from 'vitest';

import pokemon from '/Users/gavennelson/Documents/PokedexProject2/pokedexTS/src/components/Details/Details'


const sum = (a: any, b: any) => {
    return a + b
}

test('Sum function', () => {
    expect(sum(6, 9)).toBe(15)
})




// test('pokemon interface is correct', () => {
//     expect(pokemon).toContain('id')
// })