// connects to sequelize and the models
const sequelize = require("../config/connection");
const { User, Company, Contact, Sent, Address, Project, Invoice, Item, Profile, Archived, } = require("../models");
const router = require("express").Router();
const withAuth = require('../utils/auth');
require('dotenv').config();
// these are the front end routes for the user interface
// main home route
router.get('/', async (req, res) => {
  try {
    // Get all compainies and bring in the data so its avaiable to the home-page
    const companyData = await Company.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    // taking all of the company data and sanitizing the data
    const companies = companyData.map((company) => company.get({ plain: true }));
    console.log(companies)
    // render the homepage handlebars
    res.render('homepage', {
      // pass in the sanitized data as compainies
      companies,
      logged_in: req.session.logged_in,
      title: "Home"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// for the route /login (if they are logged-in send the user to the dashboard otherwise make them log-in)
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    title: "Login"
  });
});
// rendering our logout screen when the user loggs out
router.get('/logout', (req, res) => {
  res.render('logout', {
    title: "Logout",
  });
});
// route for /signup (rendering the singup page) 
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', {
    title: "Sign Up"
  });
});

// route for sent invoices
router.get('/sent-invoices', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const sentData = await Sent.findAll({
    });


    const sent = sentData.map((sent) => sent.get({ plain: true }));

    console.log(sent)
    res.render('sent-invoices', {
      sent,
      logged_in: req.session.logged_in,
      title: "Sent Invoices"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// route for archived invoices
router.get('/archived', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const archivedData = await Invoice.findAll({
      where: {
        archived: true
      },

    });
    const invoice = archivedData.map((invoice) => invoice.get({ plain: true }));

    console.log(invoice)
    res.render('archives', {
      invoice,
      logged_in: req.session.logged_in,
      title: "Archived Invoices"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for /edit-profile
router.get('/edit-profile/', withAuth, (req, res) => {

  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: [
      'id',
      'username',
      'email',

    ],
    include: {
      model: Profile,
      attributes: [
        'id',
        'company_name',
        'address_1',
        'address_2',
        'city',
        'state',
        'zip_code',
        'user_id',
        "logo_url"

      ]
    },
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    const user = userData.get({ plain: true });
    console.log(user)
    res.render("edit-profile", {
      user,
      username: req.session.username,
      logged_in: true,
      title: "Edit Profile",
    });
  })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
