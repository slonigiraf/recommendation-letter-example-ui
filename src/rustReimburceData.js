// Import the API, Keyring and some utility functions
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

/*
letter id: 1
letter u8: [0,0,0,1]
-----------
guaranteeAddress hex: 0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
guaranteeAddress  u8: [212,53,147,199,21,253,211,28,97,20,26,189,4,169,159,214,130,44,133,88,133,76,205,227,154,86,132,231,165,109,162,125]
-----------
workerAddress hex: 0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48
workerAddress  u8: [142,175,4,21,22,135,115,99,38,201,254,161,126,37,252,82,135,97,54,147,201,18,144,156,178,38,170,71,148,242,106,72]
-----------
employerAddress hex: 0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22
employerAddress  u8: [144,181,171,32,92,105,116,201,234,132,27,230,136,134,70,51,220,156,168,163,87,132,62,234,207,35,20,100,153,101,254,34]
-----------
amount   : 1000000000000000
amount u8: [0,0,0,0,0,0,0,0,0,3,141,126,164,198,128,0]
-----------
guarantee signature hex: 0x30cabb461dc54aab448c8b0d3e99ab4d834d5eec0c1d9b8999b38456bf79c15e9a0c25496dae20b2667f98eef6201008795e69276502ae0b059cd533060c9083
guarantee signature  u8: 48,202,187,70,29,197,74,171,68,140,139,13,62,153,171,77,131,77,94,236,12,29,155,137,153,179,132,86,191,121,193,94,154,12,37,73,109,174,32,178,102,127,152,238,246,32,16,8,121,94,105,39,101,2,174,11,5,156,213,51,6,12,144,131
-----------
skill_insurance_data  u8: 0,0,0,1,228,167,81,18,204,23,38,108,155,194,90,41,194,163,58,60,89,176,227,117,233,66,197,106,239,232,113,141,216,124,78,49,178,77,57,242,36,161,83,238,138,176,187,13,7,59,100,92,45,157,163,43,133,176,199,22,118,202,133,229,161,199,255,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,96,20,15,21,11,137,10,192,129,3,154,34,203,118,28,19,176,54,165,181,227,156,70,197,73,86,226,111,137,243,69,95,41,74,25,254,228,34,212,189,141,134,194,44,229,172,27,43,67,73,73,58,61,63,37,176,120,195,153,198,46,42,231,129,166,82,220,58,28,232,181,15,154,161,152,109,179,47,157,32,202,28,33,243,219,161,164,110,173,174,79,180,188,244,227,86
-----------
worker signature hex: 0x1e827c61467261b9737c31d084935bf0dd8b84481bb46e6a9167e137e40d256b3c403b7b64745fa6c9f985f2a4f8b1fc6b8ff857ef76749eec62bacbcf5cf784
worker signature  u8: 30,130,124,97,70,114,97,185,115,124,49,208,132,147,91,240,221,139,132,72,27,180,110,106,145,103,225,55,228,13,37,107,60,64,59,123,100,116,95,166,201,249,133,242,164,248,177,252,107,143,248,87,239,118,116,158,236,98,186,203,207,92,247,132
-----------
*/

const insurance_id = 1;
const teacher_id = '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d';
const student_id = '0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48';
const employer_id = '0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22';
const ask_price = 1000000000000000;
const teacher_sign = '0x30cabb461dc54aab448c8b0d3e99ab4d834d5eec0c1d9b8999b38456bf79c15e9a0c25496dae20b2667f98eef6201008795e69276502ae0b059cd533060c9083';
const student_sign = '0x1e827c61467261b9737c31d084935bf0dd8b84481bb46e6a9167e137e40d256b3c403b7b64745fa6c9f985f2a4f8b1fc6b8ff857ef76749eec62bacbcf5cf784';

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
