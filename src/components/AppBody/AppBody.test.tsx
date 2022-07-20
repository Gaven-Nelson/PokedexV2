import {test, expect} from 'vitest';

const sum = (a: any, b: any) => {
    return a + b
}

test('Sum function', () => {
    expect(sum(6, 9)).toBe(15)
})