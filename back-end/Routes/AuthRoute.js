const express = require('express')
const router = express.Router()

router.use(express.json());

router.post('/', (req, res) => {
  const { message } = req.body
  console.log('Received message:', message)
  res.json({ received: true, message })
})

module.exports = router