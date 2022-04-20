// A component to visualize recommendation letter list for a worker
import { List } from 'semantic-ui-react'
import LetterInfo from './LetterInfo'
import React from 'react'

export default function Main(props) {
  return (
    <List divided relaxed>
      {props.letters.map((letter, index) => (
        <List.Item key={index}><List.Content><List.Description as='a'><LetterInfo letter={letter} ipfs={props.ipfs} /></List.Description></List.Content></List.Item>
      ))}
    </List>)
}
