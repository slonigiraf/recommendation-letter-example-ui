import { numberToU8ArrayOfLength, u8ArrayOfLength16FromNumber } from '../helpers.mjs';


describe('numberToU8ArrayOfLength', () => {
  it('length is 4 (as Rust u32 conversion)', () => {
    const expected = new Uint8Array([ 0, 14, 9, 192]);
    expect(numberToU8ArrayOfLength(920000, 4)).toStrictEqual(expected);
  })
  it('length is 16 (as Rust u128 conversion)', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 255, 255, 255, 255, 255, 255]);
    //Number.MAX_SAFE_INTEGER is 9007199254740991
    expect(numberToU8ArrayOfLength(Number.MAX_SAFE_INTEGER, 16)).toStrictEqual(expected);
  })
})
