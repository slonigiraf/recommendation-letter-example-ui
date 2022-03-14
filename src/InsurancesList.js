import { Grid } from 'semantic-ui-react'
import InsuranceInfo from './InsuranceInfo'
import React from 'react'

export default function Main(props) {
  return (
    <Grid.Row>
    {props.insurances.map((insurance, index) => (
        <InsuranceInfo key={index} insurance={insurance} getIPFSDataFromContentID={(cid)=>props.getIPFSDataFromContentID(cid)}/>
    ))}
    </Grid.Row>);
}
