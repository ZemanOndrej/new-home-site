import { flatten, unflatten } from './functions';

const a = { age: 2, name: 'ondrej', city: 'bratislava' };
const res_a = { age: 2, name: 'ondrej', city: 'bratislava' };
test('flatten simple', () => {
  const res = flatten(a);
  expect(res).toEqual(res_a);
});

const b = { name: { first: 'ondrej' } };
const res_b = { 'name.first': 'ondrej' };
test('flatten simple nested', () => {
  const res = flatten(b);
  expect(res).toEqual(res_b);
});

const c = { age: 2, b: '232', c: { ahoj: 2, e: { city: 'bratislava' } } };
const res_c = {
  age: 2,
  b: '232',
  'c.ahoj': 2,
  'c.e.city': 'bratislava',
};
test('flatten nested2', () => {
  const res = flatten(c);
  expect(res).toEqual(res_c);
});

const d = {
  name: { first: 'ondrej', ar: [{ name: 'obj' }, { name: 'bobor' }] },
};
test('flatten simple nested array', () => {
  const res = flatten(d);
  expect(res).toEqual({
    'name.first': 'ondrej',
    ar: [{ name: 'obj' }, { name: 'bobor' }],
  });
});

test('unflatten simple', () => {
  const res = unflatten(res_a);
  expect(res).toEqual(a);
});
test('unflatten simple nested', () => {
  const res = unflatten(res_b);
  expect(res).toEqual(b);
});
test('unflatten nested2', () => {
  const res = unflatten(res_c);
  expect(res).toEqual(c);
});

const e = { abc: { def: 2, ghi: 3 } };
const res_e = { 'abc.def': 2, 'abc.ghi': 3 };
test('unflatten nested simple 2', () => {
  const res = unflatten(res_e);
  expect(res).toEqual(e);
});
export {};
