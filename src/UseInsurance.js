import React, { useState } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { TxButton } from './substrate-lib/components'


export default function Main(props) {
  const [textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt, workerSignOverInsurance] = props.insurance.split(",");
  console.log(textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt, workerSignOverInsurance);

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
      <h1>Penalize guarantee</h1>
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
              inputParams: [letterId, guaranteeAddress, workerAddress, employerAddress, amount , guaranteeSignOverReceipt, workerSignOverInsurance ],
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
