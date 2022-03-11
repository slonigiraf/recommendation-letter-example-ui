import { Grid } from 'semantic-ui-react'
import LetterInfo from './LetterInfo'

export default function Main(props) {
  return (
    <Grid.Row>
    {props.letters.map((letter, index) => (
        <LetterInfo letter={letter}/>
    ))}
    </Grid.Row>);
}
