// Import the API, Keyring and some utility functions
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

/*
pub const TEACHER_ID: [u8; 32] = [
	228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233,
	66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49,
];

pub const STUDENT_ID: [u8; 32] = [
	178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133,
	176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75,
];
pub const EMPLOYER_ID: [u8; 32] = [
	166, 82, 220, 58, 28, 232, 181, 15, 154, 161, 152, 109, 179, 47, 157, 32, 202, 28, 33, 243,
	219, 161, 164, 110, 173, 174, 79, 180, 188, 244, 227, 86,
];
pub const MALICIOUS_ID: [u8; 32] = [
	118, 155, 14, 201, 118, 44, 135, 151, 112, 187, 88, 69, 232, 238, 50, 111, 52, 99, 222, 208,
	227, 165, 189, 129, 252, 73, 105, 141, 195, 153, 88, 16,
];
let teacher_signature: [u8; 64] = [
			96, 20, 15, 21, 11, 137, 10, 192, 129, 3, 154, 34, 203, 118, 28, 19, 176, 54, 165, 181,
			227, 156, 70, 197, 73, 86, 226, 111, 137, 243, 69, 95, 41, 74, 25, 254, 228, 34, 212,
			189, 141, 134, 194, 44, 229, 172, 27, 43, 67, 73, 73, 58, 61, 63, 37, 176, 120, 195,
			153, 198, 46, 42, 231, 129,
		];
let student_signature: [u8; 64] = [
			26,120,24,104,3,27,112,127,84,114,11,38,69,99,18,156,199,205,48,85,45,51,152,245,204,74,36,170,247,46,132,102,210,160,84,40,136,45,35,90,153,65,168,33,203,1,43,149,33,202,206,115,138,21,54,180,127,192,23,84,146,24,208,128,
		];
-------
letter id: 1
-----------
amount   : 10
-----------
guarantee address hex: 0xe4a75112cc17266c9bc25a29c2a33a3c59b0e375e942c56aefe8718dd87c4e31
-----------
worker    address hex: 0xb24d39f224a153ee8ab0bb0d073b645c2d9da32b85b0c71676ca85e5a1c7ff4b
-----------
employer  address hex: 0xa652dc3a1ce8b50f9aa1986db32f9d20ca1c21f3dba1a46eadae4fb4bcf4e356
-----------
adrs-mbp:slon-app adr$ node ./src/convertUsedU8ToHex.mjs 
guarantee address hex: 0xe4a75112cc17266c9bc25a29c2a33a3c59b0e375e942c56aefe8718dd87c4e31
-----------
worker    address hex: 0xb24d39f224a153ee8ab0bb0d073b645c2d9da32b85b0c71676ca85e5a1c7ff4b
-----------
employer  address hex: 0xa652dc3a1ce8b50f9aa1986db32f9d20ca1c21f3dba1a46eadae4fb4bcf4e356
-----------
guarantee  signature hex: 0x60140f150b890ac081039a22cb761c13b036a5b5e39c46c54956e26f89f3455f294a19fee422d4bd8d86c22ce5ac1b2b4349493a3d3f25b078c399c62e2ae781
-----------
worker     signature hex: 0x1a781868031b707f54720b264563129cc7cd30552d3398f5cc4a24aaf72e8466d2a05428882d235a9941a821cb012b9521cace738a1536b47fc017549218d080
-----------
*/

const insurance_id = 1;
const teacher_id = '0xe4a75112cc17266c9bc25a29c2a33a3c59b0e375e942c56aefe8718dd87c4e31';
const student_id = '0xb24d39f224a153ee8ab0bb0d073b645c2d9da32b85b0c71676ca85e5a1c7ff4b';
const employer_id = '0xa652dc3a1ce8b50f9aa1986db32f9d20ca1c21f3dba1a46eadae4fb4bcf4e356';
const ask_price = 10;
const teacher_sign = '0x60140f150b890ac081039a22cb761c13b036a5b5e39c46c54956e26f89f3455f294a19fee422d4bd8d86c22ce5ac1b2b4349493a3d3f25b078c399c62e2ae781';
const student_sign = '0x1a781868031b707f54720b264563129cc7cd30552d3398f5cc4a24aaf72e8466d2a05428882d235a9941a821cb012b9521cace738a1536b47fc017549218d080';

async function main () {
  // Instantiate the API
  const api = await ApiPromise.create();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');

  // Create a extrinsic, sayHello
  const transfer = api.tx.insurances.reimburse(insurance_id,
    teacher_id,
    student_id,
    employer_id,
    ask_price,
    teacher_sign,
    student_sign);

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());
