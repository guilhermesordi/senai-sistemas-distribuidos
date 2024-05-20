
const express = require('express')
const axios = require('axios')
const app = express()
const port = 5002
const db = 'http://localhost:4000'

// Adição de cliente
app.post('/customers', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.post(`${db}/cliente`, req)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.status(status).send({ success, ...data })
})

// Consulta de clientes
app.get('/customers', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/cliente`)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.status(status).send({ success, ...data })
})

// Consulta de um cliente
app.get('/customers/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/cliente/${req.params.id}`)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.status(status).send({ success, ...data })
})

// Exclusão de um cliente
app.delete('/customers/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.delete(`${db}/cliente/${req.params.id}`)
    status = response.status
    data = null
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.status(status).send({ success, ...data })
})

// Edição de um cliente
app.patch('/customers/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.patch(`${db}/cliente/${req.params.id}`, req)
    status = response.status
    data = { data: response.data }
  } catch(e) {
    status = e.response.status
    data = { error: e.response.statusText }
  }

  if(status < 400) {
    success = true;
  }
  res.header("Access-Control-Allow-Origin", "*")
  res.status(status).send({ success, ...data })
})

app.listen(port, () => {
  console.log(`Estoque controller listening on port ${port}`)
})

