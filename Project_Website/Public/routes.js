const express = require('express')
const router = express.Router()
let addDetails = require('./AdditionalDetails')

let profileDetail = {}
let signedIn = false
let currentUid

const {
  check,
  validationResult
} = require('express-validator/check')
const {
  matchedData
} = require('express-validator/filter')

module.exports = router

router.get('/competition-form', (req, res) => {
  res.render('edit-competition/competition-form', {
    data: {},
    errors: {}
  })
})

router.get('/signUp', (req, res) => {
  res.render('views/userDetails', {
    data: {},
    errors: {}
  })
})

router.get('/profile', (req, res) => {
  res.render('views/profile', {
    data: profileDetail
  })
})

router.get('/edit_profile', (req, res) => {
  console.log('Profile: ', profileDetail)
  res.render('views/editProfile', {
    data: profileDetail,
    errors: {}
  })
})

router.post('/', [
  check('signedIn')
  .isBoolean()
], (req, res) => {
  console.log('router signed Out')
  signedIn = false
  profileDetail = {}
  res.redirect('/')
})

router.post('/homePage', [
  check('uid')
  .isLength({
    min: 1
  })
], (req, res) => {
  const errors = validationResult(req)
  currentUid = req.body.uid.toString()
  addDetails.AdditionalDetails.getUser(currentUid)
    .then(doc => {
      if (doc.exists) {
        profileDetail = doc.data()
        signedIn = true
        console.log('output: ', profileDetail)
        res.redirect('/home')
      } else {
        console.log('No such User in firestore')
        res.redirect('/signUp')
      }
    })
})

router.post('/emailChange', [
  check('email')
  .isEmail()
  .trim()
], (req, res) => {
  let newEmail = req.body.email
  profileDetail['email'] = newEmail
  addDetails.AdditionalDetails.updateUser(currentUid, profileDetail)
})

router.post('/org_detail', [
  check('email')
  .isLength({
    min: 1
  })
  .withMessage('Not logged in')
  .trim(),
  check('uid')
  .trim(),
  check('emailVerified')
  .not().isEmpty()
  .withMessage('Email not verified')
  .trim(),
  check('org_name')
  .isLength({
    min: 1
  })
  .withMessage('Organisation name is required')
  .trim(),
  check('comp_type')
  .not().isEmpty()
  .withMessage('At least one type is required')
  .trim(),
  check('message')
  .isLength({
    min: 1
  })
  .withMessage('Description is required')
  .isLength({
    max: 500
  })
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
  profileDetail = data
  signedIn = true
  addDetails.AdditionalDetails.addUser(data)
  res.redirect('/home')
})

router.post('/editOrgProfile', [
  check('org_name')
  .isLength({
    min: 1
  })
  .withMessage('Organisation name is required')
  .trim(),
  check('comp_type')
  .not().isEmpty()
  .withMessage('At least one type is required')
  .trim(),
  check('message')
  .isLength({
    min: 1
  })
  .withMessage('Description is required')
  .isLength({
    max: 500
  })
  .withMessage('Description maximum length is 500 Characters.')
  .trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('views/editProfile', {
      data: req.body,
      errors: errors.mapped()
    })
  }

  const data = matchedData(req)
  console.log('Sanitized: ', data)
  profileDetail = data
  signedIn = true
  addDetails.AdditionalDetails.updateUser(currentUid, data)
  res.redirect('/profile')
})

router.post('/stud_detail', [
  check('displayName')
  .isLength({
    min: 1
  })
  .withMessage('Not logged in')
  .trim(),
  check('email')
  .trim(),
  check('uid')
  .trim(),
  check('emailVerified')
  .not().isEmpty()
  .withMessage('Email not verified')
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
  .isLength({
    min: 1
  })
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
  profileDetail = data
  signedIn = true
  addDetails.AdditionalDetails.addUser(data)
  res.redirect('/home')
})

router.post('/comp_detail', [
  check('display-name')
    .isLength({min: 1})
    .withMessage('Not logged in')
    .trim(),
  check('email')
    .trim(),
  check('uid')
    .trim(),
  check('compName')
    .isLength({min: 1})
    .withMessage('Name is required')
    .trim(),
  check('date')
    .not().isEmpty()
    .withMessage('Date is required')
    .trim(),
  check('comp_type')
    .not().isEmpty()
    .withMessage('At least one tag is required')
    .trim(),
  check('details')
    .isLength({ min: 1 })
    .withMessage('Details are required')
    .trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('edit-competition/competition-form', {
      data: req.body,
      errors: errors.mapped()
    })
  }
      const data = matchedData(req)
      console.log('Sanitized: ', data)
      addDetails.AdditionalDetails.addComp(data)
      res.redirect('/home')
})

router.post('/editProfile', [
  check('displayName')
  .isLength({
    min: 1
  })
  .withMessage('Name is required')
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
  .isLength({
    min: 1
  })
  .withMessage('Message is required')
  .trim()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('views/editProfile', {
      data: req.body,
      errors: errors.mapped()
    })
  }
  profileDetail = data
  addDetails.AdditionalDetails.updateUser(currentUid, data)
  res.redirect('/profile')
})

router.post('/emailChange', [
  check('email')
  .isEmail()
  .trim()
], (req, res) => {
  let newEmail = req.body.email
  profileDetail['email'] = newEmail
  addDetails.AdditionalDetails.updateUser(currentUid, profileDetail)
})