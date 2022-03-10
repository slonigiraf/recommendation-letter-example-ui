import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { QrReader } from 'react-qr-reader';
export default function Main(props) {
  const [data, setData] = useState('No result');
  const [map, setMap] = useState(localStorage.letters ? new Map(JSON.parse(localStorage.letters)) : new Map());
  // const [map, setMap] = useState(new Map());

  const storeLetter = data => {
    setData(data);
    let dataArray = data.split(",");
    if(dataArray.length === 7){
      const updatedMap = localStorage.letters ? new Map(JSON.parse(localStorage.letters)) : new Map();
      updatedMap.set(dataArray[0], data);
      localStorage.letters = JSON.stringify(Array.from(updatedMap.entries()));
      setMap(updatedMap);
    }
  }

  return (
    <Grid.Column width={8}>
      <Grid.Row>
      <h1>Save recommendation letter</h1>
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
      <p>Data: {data}</p>
      </Grid.Row>
      <Grid.Row>
        <b>Map keys:<br/> {Array.from( map.keys() ).join("\n")}</b>
      </Grid.Row>
    </Grid.Column>
  )
}
