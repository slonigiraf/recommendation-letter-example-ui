import React, { useState } from 'react'
import { Grid, Button, Modal } from 'semantic-ui-react'
import { QrReader } from 'react-qr-reader';
import LettersList from './LettersList'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [map, setMap] = useState(localStorage.letters ? new Map(JSON.parse(localStorage.letters)) : new Map());

  const storeLetter = data => {
    let dataArray = data.split(",");
    if (dataArray.length === 7) {
      const updatedMap = localStorage.letters ? new Map(JSON.parse(localStorage.letters)) : new Map();
      updatedMap.set(dataArray[0], data);
      localStorage.letters = JSON.stringify(Array.from(updatedMap.entries()));
      setMap(updatedMap);
      setModalIsOpen(false);
    }
  }

  return (
    <Grid.Column width={8}>
      <Grid.Row>
        <h1>My recommendation letters</h1>
        <Modal
          size={"tiny"}
          dimmer={"inverted"}
          onClose={() => setModalIsOpen(false)}
          onOpen={() => setModalIsOpen(true)}
          open={modalIsOpen}
          trigger={<Button>Scan a new letter</Button>}
        >
          <Modal.Header>Scan a letter QR code</Modal.Header>
          <Modal.Content>
          <QrReader
            onResult={(result, error) => {
              console.log("Result: " + result)
              if (result != undefined) {
                storeLetter(result?.text);
              }
              if (!error) {
                console.info(error);
              }
            }}
        
          />
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => setModalIsOpen(false)}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Row>
      <Grid.Row>
        <LettersList getIPFSDataFromContentID={(cid)=>props.getIPFSDataFromContentID(cid)} letters={Array.from(map.values())}/>
      </Grid.Row>
    </Grid.Column>
  )
}
