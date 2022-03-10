import React, { useState } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { QrReader } from 'react-qr-reader';
import ReactModal from 'react-modal';

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
        <h1>Save recommendation letter</h1>
        {modalIsOpen}
        <Button onClick={() => setModalIsOpen(true)}>Scan letter</Button>
        <ReactModal isOpen={modalIsOpen}>
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
            style={{ width: '100%' }}
          />
         <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        </ReactModal>
      </Grid.Row>
      <Grid.Row>
        <b>Recommendation letters:</b><br /> {Array.from(map.keys()).join("\n")}
      </Grid.Row>
    </Grid.Column>
  )
}
