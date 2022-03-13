import { Grid, Button } from 'semantic-ui-react'
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import UseInsurance from './UseInsurance'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [textHash, , , , , , , ] = props.insurance.split(",");
 
  return (
    <Grid.Row>
      <Button
        basic
        compact
        size="mini"
        color="blue"
        onClick={() => setModalIsOpen(true)}
      >{textHash}</Button>
      <ReactModal isOpen={modalIsOpen} style={{ width: "100px" }}>
        <UseInsurance insurance={props.insurance}/>
        <Button onClick={() => setModalIsOpen(false)}>Close</Button>
      </ReactModal>
    </Grid.Row>

  )
}
