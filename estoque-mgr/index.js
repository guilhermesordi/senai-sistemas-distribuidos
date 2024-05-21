
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 5001
const db = 'http://localhost:4000'
app.use(cors)

// Adição de produtos em estoque
app.post('/products', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.post(`${db}/estoque`, req)
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

// Consulta de produtos em estoque
app.get('/products', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/estoque`)
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

// Consulta de um produto em estoque
app.get('/products/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.get(`${db}/estoque/${req.params.id}`)
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

// Exclusão de um produto em estoque
app.delete('/products/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.delete(`${db}/estoque/${req.params.id}`)
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

// Edição de um produto em estoque
app.patch('/products/:id', async (req, res) => {
  let success = false;
  let status = 500;
  let data = { error: 'Unexpected' };

  try {
    const response = await axios.patch(`${db}/estoque/${req.params.id}`, req)
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

