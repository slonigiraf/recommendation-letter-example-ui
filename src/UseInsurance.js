import React, { useState, useEffect } from 'react'
import { Form, Grid, List, Label } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { TxButton } from './substrate-lib/components'
import { u8aToHex } from '@polkadot/util'

export default function Main(props) {
  const [cid, letterId, guaranteeAddress,
    workerAddress, amount, , guaranteeSignOverReceipt, workerSignOverInsurance] = props.insurance.split(",");
  // console.log(textHash, letterId, guaranteeAddress,
  //   workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt, workerSignOverInsurance);

  const { currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)

  const [insurance_id, setInsurance_id] = useState('')
  const [guaranteeHex, setGuaranteeHex] = useState('')
  const [workerHex, setWorkerHex] = useState('')
  const [employerHex, setEmployerHex] = useState('')
  const [guaranteeSignatureHex, setGuaranteeSignatureHex] = useState('')
  const [workerSignatureHex, setWorkerSignatureHex] = useState('')


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

  const markUsedInsurance = cid => {
    const updatedSet = localStorage.used ? new Set(JSON.parse(localStorage.used)) : new Set();
    updatedSet.add(cid);
    localStorage.used = JSON.stringify(Array.from(updatedSet));
  }

  useEffect( () => {
    async function fetchData() {
    const [employer,] = await getFromAcct()
    setInsurance_id(letterId)
    setGuaranteeHex(guaranteeAddress)
    setWorkerHex(workerAddress)
    setEmployerHex(u8aToHex(employer.publicKey))
    setGuaranteeSignatureHex(guaranteeSignOverReceipt)
    setWorkerSignatureHex(workerSignOverInsurance)
    }
    fetchData()
  }, []);

  const processTransactionResult = result => {
    markUsedInsurance(cid)
    setStatus(result)
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
            label="Get a reimbursement"
            type="SIGNED-TX"
            setStatus={processTransactionResult}
            attrs={{
              palletRpc: 'insurances',
              callable: 'reimburse',
              inputParams: [insurance_id,
                guaranteeHex,
                workerHex,
                employerHex,
                amount,
                guaranteeSignatureHex,
                workerSignatureHex],
              paramFields: [true, true, true, true, true, true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
