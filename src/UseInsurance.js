import React, { useState } from 'react'
import { Form, Grid, Button, List, Label } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { TxButton } from './substrate-lib/components'
import { ApiPromise } from '@polkadot/api'
import { u8aToHex } from '@polkadot/util'

export default function Main(props) {
  const [, letterId, guaranteeAddress,
    workerAddress, amount, , guaranteeSignOverReceipt, workerSignOverInsurance] = props.insurance.split(",");
  // console.log(textHash, letterId, guaranteeAddress,
  //   workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt, workerSignOverInsurance);

  const { currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)
  const [employerAddress, setEmployerAddress] = useState('')
  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  const enablePenalization = async () => {
    const [employer,] = await getFromAcct()
    setEmployerAddress(employer.address)
    //----
    // Create a transaction
    const api = await ApiPromise.create()
    //[letterId, guaranteeAddress, workerAddress, employerAddress, amount, guaranteeSignOverReceipt, workerSignOverInsurance]
    const insurance_id = letterId
    const guaranteeHex = guaranteeAddress
    const workerHex = workerAddress
    const employerHex = u8aToHex(employer.publicKey)
    const guaranteeSignatureHex = guaranteeSignOverReceipt
    const workerSignatureHex = workerSignOverInsurance

    // console.log("------------")
    // console.log("letterId", letterId)
    // console.log("guaranteeHex", guaranteeHex)
    // console.log("workerHex", workerHex)
    // console.log("employerHex", employerHex)
    // console.log("amount", amount)
    // console.log("guaranteeSignatureHex", guaranteeSignatureHex)
    // console.log("workerSignatureHex", workerSignatureHex)
    // console.log("------------")
    
    const reimburse = api.tx.insurances.reimburse(insurance_id,
      guaranteeHex,
      workerHex,
      employerHex,
      amount,
      guaranteeSignatureHex,
      workerSignatureHex)
    // Sign and send the transaction using our account
    const hash = await reimburse.signAndSend(employer)
    console.log('Transfer sent with hash', hash.toHex())
  }

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  return (
    <Grid.Column width={8}>
      <List divided selection>
          <List.Item>
            <Label horizontal>Text</Label>
            {props.text}
          </List.Item>
          <List.Item>
          <Label as='a' tag>{workerAddress}</Label>
          </List.Item>
        </List>
      <Form>

        <Form.Field style={{ textAlign: 'center' }}>

          <TxButton
            label="Not working"
            type="SIGNED-TX"
            setStatus={setStatus}
            txOnClickHandler={() => {
              enablePenalization()
            }}
            attrs={{
              palletRpc: 'insurances',
              callable: 'reimburse',
              inputParams: [letterId, guaranteeAddress, workerAddress, employerAddress, amount, guaranteeSignOverReceipt, workerSignOverInsurance],
              paramFields: [true, true, true, true, true, true, true],
            }}
          />

          <Button
            setStatus={setStatus}
            onClick={() => {
              enablePenalization();
            }}
          >Penalize</Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
