import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { QrReader } from 'react-qr-reader';
export default function Main(props) {
  const [data, setData] = useState('No result');

  return (
    <Grid.Column width={8}>
      <h1>Save recommendation letter</h1>
      <QrReader
        onResult={(result, error) => {
          console.log("Result: " + result)
          if (result != undefined) {
            setData(result?.text);
          }
          if (!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>Data: {data}</p>
    </Grid.Column>
  )
}
