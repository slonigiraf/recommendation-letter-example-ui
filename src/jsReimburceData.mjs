// Import the API, Keyring and some utility functions
import { ApiPromise } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import { u8aToHex } from '@polkadot/util'
import { sign, getPublicDataToSignByReferee, getDataToSignByWorker } from './helpers.mjs'

async function main() {
  const insurance_id = 1
  const amount = 1000000000000000
  //
  const api = await ApiPromise.create()
  const keyring = new Keyring({ type: 'sr25519' })
  const referee = keyring.addFromUri('//Alice')
  const worker = keyring.addFromUri('//Bob')
  const employer = keyring.addFromUri('//Bob//stash')

  const refereeU8 = referee.publicKey
  const refereeHex = u8aToHex(referee.publicKey)
  console.log("refereeHex: ", refereeHex)

  const workerU8 = worker.publicKey
  const workerHex = u8aToHex(worker.publicKey)
  console.log("workerHex: ", workerHex)

  const employerU8 = employer.publicKey
  const employerHex = u8aToHex(employer.publicKey)
  console.log("employerHex: ", employerHex)
  
  const dataToBeSignedByReferee = getPublicDataToSignByReferee(insurance_id, refereeU8, workerU8, amount)
  console.log("dataToBeSignedByReferee: ", dataToBeSignedByReferee)

  const refereeSignatureU8 = sign(referee, dataToBeSignedByReferee)
  const refereeSignatureHex = u8aToHex(refereeSignatureU8)
  console.log("refereeSignatureHex: ", refereeSignatureHex)
  const dataToSignByWorker = getDataToSignByWorker(insurance_id, refereeU8, workerU8, amount, refereeSignatureU8, employerU8)
  const workerSignatureU8 = sign(worker, dataToSignByWorker)
  const workerSignatureHex = u8aToHex(workerSignatureU8)

  // Create a transaction
  const reimburse = api.tx.insurances.reimburse(insurance_id,
    refereeHex,
    workerHex,
    employerHex,
    amount,
    refereeSignatureHex,
    workerSignatureHex)

  // Sign and send the transaction using our account
  const hash = await reimburse.signAndSend(employer)
  console.log('Transfer sent with hash', hash.toHex())
}

main().catch(console.error).finally(() => process.exit())
