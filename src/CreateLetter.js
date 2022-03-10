import React, { useState } from 'react'
import { Form, Input, TextArea, Grid, Button } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import QRCode from 'qrcode.react';
import { sha256 } from 'js-sha256';
import { web3FromSource } from '@polkadot/extension-dapp'

import { stringToU8a, u8aToHex } from '@polkadot/util';


export default function Main(props) {
  const { currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ letterInfo: '', text: '', workerAddress: '', amount: 0 })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { letterInfo, text, workerAddress, amount } = formState

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
    // skill_ipfs_hash , insurance_id , teach_address , stud_address , amount , teach_sign_1 , teach_sign_2
    let result = [];
    const textHash = sha256(text);
    result.push(textHash);
    //
    const letterId = getLetterId();
    result.push(letterId);
    //
    const [guarantee,] = await getFromAcct();
    const guaranteeAddress = guarantee.address;
    result.push(guaranteeAddress);
    //
    result.push(workerAddress);
    //
    result.push(amount);
    //
    const privateData = arrayToBinaryString([textHash, letterId, guaranteeAddress, workerAddress, amount]);
    const guaranteeSignOverPrivateData = u8aToHex(guarantee.vrfSign(privateData));
    result.push(guaranteeSignOverPrivateData);
    //
    const reciept = arrayToBinaryString([letterId, guaranteeAddress, workerAddress, amount]);
    const guaranteeSignOverReceipt = u8aToHex(guarantee.vrfSign(reciept));
    result.push(guaranteeSignOverReceipt);
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

  const getLetterId = () => {
    const usedId = parseInt(window.localStorage.getItem('letterId')) || 0;
    const letterId = 1 + usedId;
    window.localStorage.setItem('letterId', letterId);
    return letterId;
  }

  const showQR = async () => {
    const data = await getLetterInfo();
    setFormState({ ...formState, letterInfo: data });
  }

  return (
    <Grid.Column width={8}>
      <h1>Create recommendation letter</h1>
      <Form>
        <Form.Field>
          <TextArea
            fluid
            type="text"
            placeholder="Recommendation letter text"
            value={text}
            state="text"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="About person"
            type="text"
            placeholder="address"
            value={workerAddress}
            state="workerAddress"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Stake reputation"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button
            setStatus={setStatus}
            onClick={() => {
              showQR();
            }}
          >Create</Button>
        </Form.Field>

        <Form.Field>
          <QRCode value={letterInfo} />
        </Form.Field>

        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
