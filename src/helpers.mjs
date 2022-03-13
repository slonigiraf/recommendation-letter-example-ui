import { numberToU8a } from '@polkadot/util';

//Max JS Number value (9007199254740992) exceeds max Rust u32 value (4294967295)
//TODO: add exception handling
export function numberToU8ArrayOfLength(number, length) {
    const shortResult = numberToU8a(number)
    if (shortResult.length < length) {
        const firstZeros = new Array(length - shortResult.length).fill(0);
        var concatArray = new Uint8Array([ ...firstZeros, ...shortResult ]);
        return concatArray
    } else{
        return shortResult;
    }  
}