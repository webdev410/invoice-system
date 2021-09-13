const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');



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