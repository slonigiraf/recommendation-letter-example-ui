import { Grid, Button, Modal } from 'semantic-ui-react'
import React, { useState } from 'react'
import SignLetterUseRight from './SignLetterUseRight'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt] = props.letter.split(",");
  console.log(textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt);
  return (
    <Grid.Row>
      <Button
        basic
        compact
        size="mini"
        color="blue"
        onClick={() => setModalIsOpen(true)}
      >{textHash}</Button>
      <Modal
        size={"tiny"}
        dimmer={"inverted"}
        onClose={() => setModalIsOpen(false)}
        onOpen={() => setModalIsOpen(true)}
        open={modalIsOpen}
      >
        <Modal.Header>Sign recommendation letter</Modal.Header>
        <Modal.Content>
        <SignLetterUseRight letter={props.letter}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid.Row>

  )
}
