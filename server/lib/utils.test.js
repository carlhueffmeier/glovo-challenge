const utils = require('./utils');

describe('prop', () => {
  it('returns a property access method', () => {
    const getName = utils.prop('name');
    const bob = { name: 'bob' };
    const alice = { name: 'alice' };
    expect(getName(bob)).toEqual(bob.name);
    expect(getName(alice)).toEqual(alice.name);
  });
});

describe('pluck', () => {
  it('gets the given property from every object in the array', () => {
    const friends = [{ name: 'bob' }, { name: 'alice' }];
    const expected = ['bob', 'alice'];
    const result = utils.pluck('name', friends);
    expect(expected).toEqual(result);
  });
});

describe('intersectOn', () => {
  it('returns only the items that are in all arrays', () => {
    const a = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }];
    const b = [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 7 }];
    const c = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 0 }];
    const expected = [{ id: 3 }, { id: 5 }];
    const result = utils.intersectOn('id', [a, b, c]);
    expect(expected).toEqual(result);
  });
});

describe('zipObject', () => {
  it('returns new object with given keys and values', () => {
    const keys = ['a', 'b', 'c'];
    const values = [1, 2, 3];
    const expected = { a: 1, b: 2, c: 3 };
    const result = utils.zipObject(keys, values);
    expect(expected).toEqual(result);
  });
});
