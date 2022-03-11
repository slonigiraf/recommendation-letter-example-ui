import { Grid } from 'semantic-ui-react'

export default function Main(props) {
  const [textHash , letterId , guaranteeAddress , 
    workerAddress , amount , guaranteeSignOverPrivateData , guaranteeSignOverReceipt] = props.letter.split(",");
  console.log(textHash , letterId , guaranteeAddress , 
    workerAddress , amount , guaranteeSignOverPrivateData , guaranteeSignOverReceipt);
  return (
    <Grid.Row>
      {textHash}
    </Grid.Row>
  )
}
