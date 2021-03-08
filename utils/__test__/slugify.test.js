import {slugify} from '../slugify';

// Pots escriureu amb describe o amb test
// describe("slugify", ()=>{
//     it('converts a string to a slug', ()=>{
//         expect('something').toBe('something');
//     })
// })
// test("slugify converts a string to a slug", ()=>{
//         expect('something').toBe('something');
//     })
test("slugify converts a string to a slug", ()=>{
        expect(slugify('Tab 1')).toBe('tab-1');
        expect(slugify('Amy\'s tab')).toBe('amys-tab');
    })