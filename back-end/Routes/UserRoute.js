const express = require('express')
const router = express.Router()
const {getUsers, createUser, getUserById, updateUserById, deleteUserById} = require('../Controllers/UserController');

router.use(express.json());

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUserById).put(updateUserById).get(deleteUserById)

module.exports = router   