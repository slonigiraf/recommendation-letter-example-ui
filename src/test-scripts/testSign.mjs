// Tests that can't be run by Nest due to limitations in polkadot utils.
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto'
import { hexToU8a, u8aToHex, stringToU8a } from '@polkadot/util'

await cryptoWaitReady()

console.log("// --------- for Rust tests ------------")

const accountComment = "Test-tmp (https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/signing)";
const account = "14PiVshTEkzMtjbWZaqxnYBm4DEsKLCksLn1ntZj7U6dwAWw"
const dataHex = "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48"
const signatureHex = "0x62c31670f9c52f6e53018a4a21cbd083fff2448cac6c194c6ad5588f6a4b6c7cd34d12e658d7a656131a0d0db377bb903db0f23019b21e5c59aa34b071c7c58d"

printTestData(account, dataHex, signatureHex)

function printTestData(account, dataHex, signatureHex) {
	const data_bytes = hexToU8a(dataHex)
	const signature_bytes = hexToU8a(signatureHex)
	const account_bytes = decodeAddress(account)
	const accountHex = u8aToHex(decodeAddress(account))
	const signatureResult = signatureVerify(data_bytes, signature_bytes, account_bytes)
	console.log(`// ${accountComment}`)
	console.log(`// account: ${account}`)
	console.log(`// account_hex: ${accountHex}`)
	console.log(`// dataHex: ${dataHex}`)
	console.log(`// signatureHex: ${signatureHex}`)
	console.log(`// ${signatureResult.isValid}: signature is valid by signatureVerify from @polkadot/util-crypto`)
	console.log(``)
	console.log(`let account_bytes: [u8; 32] = [${decodeAddress(account)}];`)
	console.log(`let data_bytes: [u8; ${data_bytes.length}] = [${data_bytes}];`)
	console.log(`let signature_bytes: [u8; 64] = [${signature_bytes}];`)
	console.log(``)

	const dataWrapped_bytes = stringToU8a("<Bytes>"+dataHex+"</Bytes>")
	const dataWrappedHex = u8aToHex(dataWrapped_bytes)
	console.log(`// dataWrappedHex: ${dataWrappedHex}`)
	console.log(`let dataWrapped_bytes: [u8; ${dataWrapped_bytes.length}] = [${dataWrapped_bytes}];`)
}


