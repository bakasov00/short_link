import React, { PureComponent } from 'react'
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Linux',
    Click: 40,
  },
  {
    name: 'Chrome',
    Click: 30,
  },
  {
    name: 'Dekstop',
    Click: 30,
  },
  {
    name: 'Dekstop',
    Click: 30,
  },
  {
    name: 'Dekstop',
    Click: 30,
  },
]

function Example() {
  return (
    <>
      <br />
      <br />
      <br />
      {/* <ResponsiveContainer width='100%' height='100%'> */}
      <BarChart
        // style={{ maxWidth: 500, maxHeight: 300 }}
        width={500}
        height={300}
        data={data}
        // margin={{
        //   // top: 115,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
        // barSize={100}
      >
        <XAxis dataKey='name' padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='Click' fill='#8884d8' />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </>
  )
}

export default Example
