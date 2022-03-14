import { Grid, Button, Modal } from 'semantic-ui-react'
import React, { useState } from 'react'
import UseInsurance from './UseInsurance'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [textHash, , , , , , ,] = props.insurance.split(",");

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
        <Modal.Header>Penalize guarantee</Modal.Header>
        <Modal.Content>
          <UseInsurance insurance={props.insurance} />
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
