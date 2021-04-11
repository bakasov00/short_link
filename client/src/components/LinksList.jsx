import React from 'react'
import { Link } from 'react-router-dom'

function LinksList({ links }) {
  if (links.lenght) {
    return <p>Нет ссылок</p>
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная ссылка</th>
            <th>Сокращенная ссылка</th>
            <th>Открыть детали</th>
          </tr>
        </thead>

        <tbody>
          {links.map((item, i) => (
            <tr key={i}>
              <td>
                <p>{i + 1}</p>
              </td>
              <td>
                <a href={item.from} target='_blank' _blank='true' rel='noreferrer'>
                  {item.from}
                </a>
              </td>
              <td>
                <a href={item.to} target='_blank' _blank='true' rel='noreferrer'>
                  {item.to}
                </a>
              </td>
              <td>
                <Link to={`/detail/${item._id}`}> Открыть </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinksList

// <div key={item.from + i}>
//   <a href={item.from} target='_blank' _blank='true' rel='noreferrer'>
//     {item.from}
//   </a>
// </div>
