// Import the API, Keyring and some utility functions
import { ApiPromise } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import { u8aToHex } from '@polkadot/util'
import { sign, getPublicDataToSignByGuarantee, getDataToSignByWorker } from './helpers.mjs'

async function main() {
  const insurance_id = 3;
  const amount = 1000000000000000;
  //
  const api = await ApiPromise.create();
  const keyring = new Keyring({ type: 'sr25519' });
  const guarantee = keyring.addFromUri('//Alice');
  const worker = keyring.addFromUri('//Bob');
  const employer = keyring.addFromUri('//Bob//stash');

  const guaranteeU8 = guarantee.publicKey
  const guaranteeHex = u8aToHex(guarantee.publicKey)
  console.log("guaranteeHex: ", guaranteeHex);

  const workerU8 = worker.publicKey
  const workerHex = u8aToHex(worker.publicKey)

  const employerU8 = employer.publicKey
  const employerHex = u8aToHex(employer.publicKey)
  
  const dataToBeSignedByGuarantee = getPublicDataToSignByGuarantee(insurance_id, guaranteeU8, workerU8, amount)
  const guaranteeSignatureU8 = sign(guarantee, dataToBeSignedByGuarantee)
  const guaranteeSignatureHex = u8aToHex(guaranteeSignatureU8)
  const dataToSignByWorker = getDataToSignByWorker(insurance_id, guaranteeU8, workerU8, amount, guaranteeSignatureU8, employerU8)
  const workerSignatureU8 = sign(worker, dataToSignByWorker)
  const workerSignatureHex = u8aToHex(workerSignatureU8)

  // Create a extrinsic to reimburse
  const reimburse = api.tx.insurances.reimburse(insurance_id,
    guaranteeHex,
    workerHex,
    employerHex,
    amount,
    guaranteeSignatureHex,
    workerSignatureHex);

  // Sign and send the transaction using our account
  const hash = await reimburse.signAndSend(employer);
  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());
