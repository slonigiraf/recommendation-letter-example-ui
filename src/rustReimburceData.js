// Import the API, Keyring and some utility functions
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

const insurance_id = 2;

const teacher_id = '0x8adf56ba0c4fa632fe9b7e0185770e942081a9b569118aa6f357171744652127';
const student_id = '0x8adf56ba0c4fa632fe9b7e0185770e942081a9b569118aa6f357171744652127';
const employer_id = '0x8adf56ba0c4fa632fe9b7e0185770e942081a9b569118aa6f357171744652127';

const ask_price = 10000;

const teacher_sign = '0x36e78a512caf366081a292c503506b620d320f8833e2465060251c0691f5584b1b5a93aa9bb6c9ec95c792cc02f65674d59aa53f4e21507b215d6c6a58a4e087';
const student_sign = '0x36e78a512caf366081a292c503506b620d320f8833e2465060251c0691f5584b1b5a93aa9bb6c9ec95c792cc02f65674d59aa53f4e21507b215d6c6a58a4e087';

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
