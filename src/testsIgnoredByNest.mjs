import { sign } from './helpers.mjs'
import { signatureVerify } from '@polkadot/util-crypto';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
await cryptoWaitReady();

console.log("Example that should always work")
const guaranteeU8 = new Uint8Array([228,167,81,18,204,23,38,108,155,194,90,41,194,163,58,60,89,176,227,117,233,66,197,106,239,232,113,141,216,124,78,49,])
const dataToSignU8 = new Uint8Array([0, 0, 0, 1, 228,167,81,18,204,23,38,108,155,194,90,41,194,163,58,60,89,176,227,117,233,66,197,106,239,232,113,141,216,124,78,49,178,77,57,242,36,161,83,238,138,176,187,13,7,59,100,92,45,157,163,43,133,176,199,22,118,202,133,229,161,199,255,75,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]);
const rightSignatureU8 = new Uint8Array([96,20,15,21,11,137,10,192,129,3,154,34,203,118,28,19,176,54,165,181,227,156,70,197,73,86,226,111,137,243,69,95,41,74,25,254,228,34,212,189,141,134,194,44,229,172,27,43,67,73,73,58,61,63,37,176,120,195,153,198,46,42,231,129])
const rightSignatureU8TestingResult = signatureVerify(dataToSignU8, rightSignatureU8, guaranteeU8)
console.log(rightSignatureU8TestingResult.isValid)
console.log("A test for sign function")
const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
const signer = keyring.addFromUri('teacher');
const signatureU8 = sign(signer, dataToSignU8)
const signatureU8TestingResult = signatureVerify(dataToSignU8, signatureU8, guaranteeU8)
console.log(signatureU8TestingResult.isValid)

