import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Paper,
  TableRow,
  TableHead,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core'
import { deleteLink, getAllLinks } from '../redux/actions/linkActions'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  tableCell: {
    wordBreak: 'break-all',
    maxWidth: 350,
  },
  delete: {
    width: 20,
  },
})

function LinksList({ links }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  if (links.length === 0) {
    return <Typography>Нет ссылок</Typography>
  }

  function deleteHandler(id) {
    dispatch(deleteLink(id)).then((data) => {
      if (data) {
        dispatch(getAllLinks())
      }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Оригинальная ссылка</TableCell>
            <TableCell>Сокращенная ссылка</TableCell>
            <TableCell align='right'>Детали</TableCell>
            <TableCell align='right' className={classes.delete}>
              Удалить
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((item, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                {i + 1}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <a href={item.from} target='_blank' _blank='true' rel='noreferrer'>
                  {item.from}
                </a>
              </TableCell>
              <TableCell>
                <a href={item.to} target='_blank' _blank='true' rel='noreferrer'>
                  {item.to}
                </a>
              </TableCell>
              <TableCell align='right'>
                <Button variant='contained' color='primary'>
                  <Link style={{ color: 'white' }} to={`/app/detail/${item._id}`}>
                    Открыть
                  </Link>
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button onClick={() => deleteHandler(item._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LinksList
