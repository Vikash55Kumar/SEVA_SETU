import React from 'react'
import Das from '../certificate/Das'
import Map from '../certificate/Map'
import CertificateType from '../certificate/CertificateType'
import AlertList from '../dashboard/AlertList'
import LinearTotal from './LinearTotal'

export default function Dashboard() {
  const totalForms = 16000;
  const pendingForms = 6230;
  const processedForms = 8700;
  const recjectedForms = 1000;

  const districtData = [
    { name: 'Mumbai', value: 120 },
    { name: 'Pune', value: 95 },
    { name: 'Nagpur', value: 85 },

  ];

  return (
    <div>

      <h1>Revenue Depertment Rajasthan</h1>

      <Das
        totalForms={totalForms}
        pendingForms={pendingForms}
        processedForms={processedForms}
        recjectedForms={recjectedForms}
      />

      <Map
        data={districtData}
        colorScale={['#f0f8ff', '#4682b4']}
      />

      <section className="alerts">
        <h2>Alerts</h2>
        <p style={{textAlign:'center'}}>Alerts for subdivisions with high demand.</p>
        <AlertList />
      </section>

      <section className="overview">
      <LinearTotal/>
      </section>


      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}
