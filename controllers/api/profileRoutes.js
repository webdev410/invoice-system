const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');


// CREATE a profile
router.post('/', (req, res) => {
    Profile.create({
        company_name: req.body.companyName,
        address_1: req.body.address1,
        address_2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zipCode,
        user_id: req.session.user_id
    })
        .then(profileData => res.json(profileData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Profile,
            },

        ]
    })

    user.username = req.body.username
    user.email = req.body.email
    user.profile.company_name = req.body.companyName;
    user.profile.address_1 = req.body.address1;
    user.profile.address_2 = req.body.address2;
    user.profile.city = req.body.city;
    user.profile.state = req.body.state;
    user.profile.zip_code = req.body.zipCode;
    user.profile.user_id = req.session.user_id

    console.log(user)
    await user.save()
    await user.profile.save()
    res.json(user)

});
// GET a single profile
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            // Add profile as a second model to JOIN with
            include: [
                {
                    model: Profile
                },
            ],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;