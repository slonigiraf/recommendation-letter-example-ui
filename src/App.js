import React, { createRef, useState } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TemplateModule from './TemplateModule'
import Transfer from './Transfer'
import CreateLetter from './CreateLetter'
import WorkerSaveLetter from './WorkerSaveLetter'
import EmployerSaveLetter from './EmployerSaveLetter'
import Upgrade from './Upgrade'
import IpfsExample from './IpfsExample'
import { create } from 'ipfs-core'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [ipfs, setIpfs] = useState(null)

  const getIPFSNode = async () => {
    let node = ipfs;
    if (!ipfs) {
      console.log('Creating IPFS node...')
      node = await create({
        repo: String(Math.random() + Date.now()),
        init: { alogorithm: 'ed25519' }
      })
      setIpfs(node)
    }
    return node
  }

  const getIPFSContentID = async (content) => {
    let node = await getIPFSNode()
    const file = await node.add(content)
    return file.cid
  }

  const getIPFSDataFromContentID = async (cid) => {
    const text = []
    const node = await getIPFSNode()
    for await (const chunk of node.cat(cid)) {
      text.push(chunk)
    }
    return text.toString()
  }

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row>
            <IpfsExample />
          </Grid.Row>
          <Grid.Row>
            <EmployerSaveLetter />
          </Grid.Row>
          <Grid.Row>
            <WorkerSaveLetter getIPFSDataFromContentID={(cid)=>getIPFSDataFromContentID(cid)}/>
          </Grid.Row>
          <Grid.Row>
            <CreateLetter getIPFSContentID={(content)=>getIPFSContentID(content)}/>
          </Grid.Row>
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            <Upgrade />
          </Grid.Row>
          <Grid.Row>
            <Interactor />
            <Events />
          </Grid.Row>
          <Grid.Row>
            <TemplateModule />
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
