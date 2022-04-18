// Tests that can't be run by Nest due to limitations in polkadot utils.
import { getPrivateDataToSignByReferee, sign } from '../helpers.mjs'
import { signatureVerify } from '@polkadot/util-crypto'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Keyring } from '@polkadot/keyring'
import { hexToU8a } from '@polkadot/util'
import { getPublicDataToSignByReferee } from '../helpers.mjs'

await cryptoWaitReady()

const [textCID, letterID, refereeHex, workerHex, amount,
    refereeSignOverPrivateDataHex, refereeSignOverReceiptHex] = [
		"QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm",
		1,
		"0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
		"0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48",
		1000000000000000,
		"0x1a1a888fe5397050e2516c470f7ec95726720464da1d49ec124fe44b4330d54a75b8e54c316a260a988d736ff255cbe97dd6818efd1baccc0402cd39e2a79388",
		"0x2625b6055cea0cfba4bc3938f4dff6bca2507609e22ee5cf200ad967100bd12764e04611a48edeab7f5285ac8b736c8fa50f02a4ea782e9c6839bc4590bb5b87"
	]
	
    


console.log("--------- UI tests ------------")

const refereeU8 = hexToU8a(refereeHex)
const workerU8 = hexToU8a(workerHex)

const receiptToSignU8 = getPublicDataToSignByReferee(letterID, refereeU8, workerU8, amount)
const refereeSignOverReceiptU8 = hexToU8a(refereeSignOverReceiptHex)
const refereeSignOverReceiptU8Result = signatureVerify(receiptToSignU8, refereeSignOverReceiptU8, refereeU8)
console.log(refereeSignOverReceiptU8Result.isValid, "refereeSignOverReceipt")

const privateDataToSignU8 = getPrivateDataToSignByReferee(textCID, letterID, refereeU8, workerU8, amount)
const refereeSignOverPrivateDataU8 = hexToU8a(refereeSignOverPrivateDataHex)
const refereeSignOverPrivateDataU8Result = signatureVerify(privateDataToSignU8, refereeSignOverPrivateDataU8, refereeU8)
console.log(refereeSignOverPrivateDataU8Result.isValid, "refereeSignOverPrivateData")

console.log(`let letter_id: u32 = ${letterID};`)
console.log(`let ask_price_u128: u128 = ${amount};`)
console.log(`let referee_id_bytes: [u8; 32] = [${refereeU8}];`)
console.log(`let worker_id_bytes: [u8; 32] = [${workerU8}];`)
console.log(`let referee_sign_bytes: [u8; 64] = [${refereeSignOverReceiptU8}];`)

        // let letter_id: u32 = 1;
		// let ask_price_u128: u128 = 1000;
		// let referee_id_bytes: [u8; 32] = [
		// 	118, 155, 14, 201, 118, 44, 135, 151, 112, 187, 88, 69, 232, 238, 50, 111, 52, 99, 222,
		// 	208, 227, 165, 189, 129, 252, 73, 105, 141, 195, 153, 88, 16,
		// ];
		// let worker_id_bytes: [u8; 32] = [
		// 	118, 155, 14, 201, 118, 44, 135, 151, 112, 187, 88, 69, 232, 238, 50, 111, 52, 99, 222,
		// 	208, 227, 165, 189, 129, 252, 73, 105, 141, 195, 153, 88, 16,
		// ];
		// let referee_sign_bytes: [u8; 64] = [
		// 	118, 155, 14, 201, 118, 44, 135, 151, 112, 187, 88, 69, 232, 238, 50, 111, 52, 99, 222,
		// 	208, 227, 165, 189, 129, 252, 73, 105, 141, 195, 153, 88, 16, 118, 155, 14, 201, 118, 44, 135, 151, 112, 187, 88, 69, 232, 238, 50, 111, 52, 99, 222,
		// 	208, 227, 165, 189, 129, 252, 73, 105, 141, 195, 153, 88, 16,
		// ];
