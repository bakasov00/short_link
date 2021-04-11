import React from 'react'

function LinkCard({ link }) {
  return (
    <div>
      <div>
        <h1>Ссылка : </h1>{' '}
        <a href={link.from} target='_blank' _blank='true' rel='noreferrer'>
          {link.from}
        </a>
      </div>
      <div>
        <h1>Сокрощенная ссылка </h1>{' '}
        <a href={link.to} target='_blank' _blank='true' rel='noreferrer'>
          {link.to}
        </a>
      </div>
      <div>
        <h1>Дата создание : </h1> <p>{link.date}</p>
      </div>
      <div>
        <h1>Количество кликов </h1> <p>{link.clicks}</p>
      </div>
    </div>
  )
}

export default LinkCard
