const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require("../../utils/auth");

// route for creating a new user

// ! need to add create profile to this route
router.post('/', async (req, res) => {
  try {
    // take in the sign-up form and create a new user in the database
    const userData = await User.create(req.body);
    // also create a session with the following information so its available to us in the application
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// validating the user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // on user log-in create the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;


      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
// when the user logs out destroy the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET user and profile
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Profile,

        }
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
