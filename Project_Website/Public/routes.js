
const express = require('express')
const router = express.Router()
let addDetails = require('./AdditionalDetails')

const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

module.exports = router

router.get('/contact', (req, res) => {
  res.render('views/userDetails', {
    data: {},
    errors: {}
  })
})

router.post('/org_detail', [
  check('email')
    .isLength({min: 1})
    .withMessage('Not logged in')
    .trim(),
  check('uid')
    .trim(),
  check('org_name')
    .isLength({min: 1 })
    .withMessage('Organisation name is required')
    .trim(),
    check('comp_type')
    .not().isEmpty()
    .withMessage('At least one type is required')
    .trim(),
  check('message')
    .isLength({ min: 1 })
    .withMessage('Description is required')
    .isLength({max: 500 })
    .withMessage('Description maximum length is 500 Characters.')
    .trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('views/userDetails', {
      data: req.body,
      errors: errors.mapped()
    })
  }

  const data = matchedData(req)
  console.log('Sanitized: ', data)
  addDetails.AdditionalDetails.addUser(data)
  res.redirect('/home')
})

router.post('/stud_detail', [
  check('display-name')
    .isLength({min: 1})
    .withMessage('Not logged in')
    .trim(),
  check('email')
    .trim(),
  check('uid')
    .trim(),
  check('gender')
    .not().isEmpty()
    .withMessage('Gender is required')
    .trim(),
  check('school')
    .not().isEmpty()
    .withMessage('University is required')
    .trim(),
    check('course')
    .not().isEmpty()
    .withMessage('Course is required')
    .trim(),
  check('comp_type')
    .not().isEmpty()
    .withMessage('At least one interest is required')
    .trim(),
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message is required')
    .trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('views/userDetails', {
      data: req.body,
      errors: errors.mapped()
    })
  }

  const data = matchedData(req)
  console.log('Sanitized: ', data)
  addDetails.AdditionalDetails.addUser(data)
  res.redirect('/home')
})