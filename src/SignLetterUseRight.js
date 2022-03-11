import React, { useState } from 'react'
import { Form, Input, Grid, Button } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import QRCode from 'qrcode.react';
import { web3FromSource } from '@polkadot/extension-dapp'

import { stringToU8a, u8aToHex } from '@polkadot/util';


export default function Main(props) {
  const [textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt] = props.letter.split(",");
  console.log(textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt);

  const { currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ letterInfo: '', employerAddress: '' })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { letterInfo, employerAddress } = formState

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

  const getLetterInfo = async () => {
    //insurance_id | teach_address | stud_address | amount | teach_sign_2 | employer_address | stud_sign3

    const [worker,] = await getFromAcct();

    let result = [letterId, guaranteeAddress,
      workerAddress, amount, guaranteeSignOverReceipt, employerAddress];
    const insurance = arrayToBinaryString(result);
    const guaranteeSignOverInsurance = u8aToHex(worker.vrfSign(insurance));
    result.push(guaranteeSignOverInsurance);
    //
    console.log(result);
    return result.join(",");
  }

  const arrayToBinaryString = data => {
    const arrays = data.map(v => stringToU8a(v));
    return new Uint8Array(arrays.reduce((acc, curr) => [...acc, ...curr], []));
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

  const showQR = async () => {
    const data = await getLetterInfo();
    setFormState({ ...formState, letterInfo: data });
  }

  return (
    <Grid.Column width={8}>
      <h1>Sign recommendation letter</h1>
      <Form>
        
        <Form.Field>
          <Input
            fluid
            label="To employer"
            type="text"
            placeholder="address"
            value={employerAddress}
            state="employerAddress"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button
            setStatus={setStatus}
            onClick={() => {
              showQR();
            }}
          >Sign</Button>
        </Form.Field>

        <Form.Field>
          <QRCode value={letterInfo} size="160"/>
        </Form.Field>

        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
