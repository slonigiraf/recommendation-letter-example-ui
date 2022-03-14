import { Grid, Button, Modal } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import SignLetterUseRight from './SignLetterUseRight'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const [textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt] = props.letter.split(",");
  console.log(textHash, letterId, guaranteeAddress,
    workerAddress, amount, guaranteeSignOverPrivateData, guaranteeSignOverReceipt);

  const [text, setText] = useState(textHash)
  const [textLoaded, setTextLoaded] = useState(false)

  useEffect(async () => {
    if (!textLoaded) {
      try {
        const content = await props.getIPFSDataFromContentID(textHash)
        console.log("CONTENT", content)
        setText(content)
      }
      catch (e) {
        console.log(e)
      }
      setTextLoaded(true)
    }
  });
  return (
    <Grid.Row>
      <Button
        basic
        compact
        size="mini"
        color="blue"
        onClick={() => setModalIsOpen(true)}
      >{text}</Button>
      <Modal
        size={"tiny"}
        dimmer={"inverted"}
        onClose={() => setModalIsOpen(false)}
        onOpen={() => setModalIsOpen(true)}
        open={modalIsOpen}
      >
        <Modal.Header>Sign recommendation letter</Modal.Header>
        <Modal.Content>
          <SignLetterUseRight text={text} letter={props.letter} />
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
