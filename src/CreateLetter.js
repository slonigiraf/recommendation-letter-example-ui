import React, { useState } from 'react'
import { Form, Input, TextArea, Grid, Button, Label } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import QRCode from 'qrcode.react';
import { sha256 } from 'js-sha256';

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ letterInfo: '', text: '', addressTo: '', amount: 0 })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { letterInfo, text, addressTo, amount } = formState

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

  const getLetterInfo = () => {
    // skill_ipfs_hash | insurance_id | teach_address | stud_address | amount | teach_sign_1 | teach_sign_2

    return sha256(text) + getLetterId() + addressTo + amount;
  }

  const getLetterId = () => {
    const usedId = parseInt(window.localStorage.getItem('letterId')) || 0;
    const letterId = 1+usedId;
    window.localStorage.setItem('letterId', letterId);
    return letterId;
  }

  const showQR = () => {
    const data = getLetterInfo();
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
            value={addressTo}
            state="addressTo"
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
            onClick={()=>{
              showQR();
            }}
          >Create</Button>
        </Form.Field>

        <Form.Field>
          <Label basic color="teal">
            {letterInfo}
          </Label>
          <br/>
          <QRCode value={letterInfo} />
        </Form.Field>

        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
