// An example JS script to use a recommendation letter pallet from a blockchain
// Run an example blockchain first: https://github.com/slonigiraf/recommendation-letter-example-node
import { ApiPromise } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import { hexToU8a, u8aToHex } from '@polkadot/util'
import { signatureVerify } from '@polkadot/util-crypto'

async function main() {
  const insurance_id = 0
  const amount = 0
  console.log("insurance_id: ", insurance_id)
  console.log("amount: ", amount)

  const api = await ApiPromise.create()
  const keyring = new Keyring({ type: 'sr25519' })
  const accountComment = "//Alice"
  const dataHex = "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48"
  const referee = keyring.addFromUri(accountComment)
  const account = referee.address
  
  const account_bytes = referee.publicKey
  const accountHex = u8aToHex(referee.publicKey)
  const signature_bytes = referee.sign( hexToU8a(dataHex))
  const signatureHex = u8aToHex(signature_bytes)
  const data_bytes = hexToU8a(dataHex)
  const signatureResult = signatureVerify(data_bytes, signature_bytes, account_bytes)


  console.log(`// ${accountComment}`)
	console.log(`// account: ${account}`)
	console.log(`// account_hex: ${accountHex}`)
	console.log(`// dataHex: ${dataHex}`)
	console.log(`// signatureHex: ${signatureHex}`)
	console.log(`// ${signatureResult.isValid}: signature is valid by signatureVerify from @polkadot/util-crypto`)
	console.log(``)
	console.log(`let account_bytes: [u8; 32] = [${account_bytes}];`)
	console.log(`let data_bytes: [u8; 32] = [${data_bytes}];`)
	console.log(`let signature_bytes: [u8; 64] = [${signature_bytes}];`)
  
}

main().catch(console.error).finally(() => process.exit())
