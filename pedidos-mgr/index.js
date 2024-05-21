
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 5003
const db = 'http://localhost:4000'
app.use(cors)

// Adição de pedido
app.post('/orders', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.post(`${db}/pedido`, req)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.status(status).send({ success, ...data })
})

// Consulta de pedidos
app.get('/orders', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/pedido`)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.status(status).send({ success, ...data })
})

// Consulta de um pedido
app.get('/orders/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/pedido/${req.params.id}`)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.status(status).send({ success, ...data })
})

// Exclusão de um pedido
app.delete('/orders/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.delete(`${db}/pedido/${req.params.id}`)
    status = response.status
    data = null
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.status(status).send({ success, ...data })
})

// Edição de um pedido
app.patch('/orders/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.patch(`${db}/pedido/${req.params.id}`, req)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.status(status).send({ success, ...data })
})

app.listen(port, () => {
  console.log(`Estoque controller listening on port ${port}`)
})
