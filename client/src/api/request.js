const request = async (url, { method, body = null, headers = {} }, flag = false) => {
  try {
    if (body) {
      headers['Content-Type'] = 'application/json'
    }
    if (flag) {
      const token = JSON.parse(localStorage.getItem('ls_token'))
      headers['Authorization'] = `Bearer ${token} `
    }
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }
    return data
  } catch (err) {
    err.errMessage = err.message
    console.dir(err)
    return err
  }
}

export default request
