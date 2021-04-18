import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

function BarChartClicks({ data }) {
  return (
    <>
      <ResponsiveContainer width='100%' height={500}>
        <BarChart data={data} width={150} height={40}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='Click' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default BarChartClicks
