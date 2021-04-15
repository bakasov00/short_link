import React from 'react'

function LinkCardNoAuth({ links }) {
  return (
    <div>
      {links.map((link, i) => {
        return (
          <div key={link.to + i}>
            <a href={link.to}> {link.to} </a>
            <br />
            <a href={link.from}>{link.from}</a>
            <br />
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default LinkCardNoAuth
