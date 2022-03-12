import { numberToU8a } from '@polkadot/util';

export function fourDigitU8ArrayFromNumber(number) {
    const shortResult = numberToU8a(number)
    if (shortResult.length < 4) {
        const firstZeros = new Array(4 - shortResult.length).fill(0);
        return firstZeros.concat(shortResult)
    } else{
        return shortResult;
    }  
}