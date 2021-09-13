const router = require("express").Router();
const sequelize = require("../config/connection");
const { Company, Project, Profile, User, Address, Contact, Invoice, Item, BillingAddress } = require("../models");
const withAuth = require("../utils/auth");

// route for /dashboard

// Front End route for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.session.user_id
            },
            include: {
                model: Profile,
                attributes: [
                    'id',
                    'company_name',
                    "address_1",
                    "address_2",
                    "city",
                    "state",
                    "zip_code",
                    'user_id',
                    "logo_url"
                ]
            },
        })

        // Get all compainies
        const companyData = await Company.findAll({
            // gets all companies owned by the logged in user
            where: {
                user_id: req.session.user_id,
            },
            // join company data with associated address and contact
            include: [
                {
                    model: Address,
                    attributes: [
                        "id",
                        "address_1",
                        "address_2",
                        "city",
                        "state",
                        "zip_code"
                    ],
                },
                {
                    model: Contact,
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "phone"
                    ],
                },
            ],
            order: [
                ['name', 'asc']
            ],
        });

        // Serialize data so the template can read it
        const companies = companyData.map((company) => company.get({ plain: true }));
        const thisUser = userData.map((user) => user.get({ plain: true }));
        console.log(companies)
        console.log(thisUser)
        // Pass serialized data and session flag into template
        res.render('dashboard', {
            companies, thisUser,
            logged_in: req.session.logged_in,
            title: "Dashboard"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



// Front End route for add company
router.get('/add-company', withAuth, async (req, res) => {
    try {
        // Get all companies and JOIN with address and contact data
        const companyData = await Company.findAll({
            include: [
                {
                    model: Address,
                    attributes: [
                        "id",
                        "address_1",
                        "address_2",
                        "city",
                        "state",
                        "zip_code"
                    ],
                },
                {
                    model: Contact,
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "phone"
                    ],
                }
            ],
        });

        // Serialize data so the template can read it
        const companies = companyData.map((company) => company.get({ plain: true }));
        console.log(companies)
        // Pass serialized data and session flag into template
        res.render('add-company', {
            companies,
            logged_in: req.session.logged_in,
            title: "Add Company"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// Front End route for add Project
router.get('/add-project/:id', (req, res) => {
    // use the current company for the project we are about to add
    Company.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id",
            "name"
        ],
        // and join with all associated data with the database
        include: [
            {
                model: Address,
                attributes: [
                    "id",
                    "address_1",
                    "address_2",
                    "city",
                    "state",
                    "zip_code"
                ],
            },
            {
                model: Contact,
                attributes: [
                    "id",
                    "name",
                    "email",
                    "phone"
                ],
            },
            {
                model: Project,
                attributes: [
                    "id",
                    "title",
                    "type",
                    "price",
                    "due_date",

                ],
                include: {
                    model: Invoice,
                    attributes: [
                        "id",
                        "name",
                        "invoice_amount"
                    ],
                    include: {
                        model: Item,
                        attributes: [
                            'id',
                            'description',
                            'units',
                            'unit_price',
                        ]
                    },
                    include: {
                        model: BillingAddress,
                    }
                },
            }
        ]
    })
        .then((companyData) => {
            if (!companyData) {
                res.status(404).json({ message: "No company found with this id 🤬" });
                return;
            }
            const company = companyData.get({ plain: true });
            console.log(company);
            res.render("add-project", {
                company,
                logged_in: true,
                title: "Add Project",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Front End route for add invoice form 
router.get('/add-invoice/:id', (req, res) => {
    res.render("add-invoice", {
        // company,
        logged_in: true,
        title: "Add Invoice",
    });

});
// Front End route for one Company
router.get("/company/:id", (req, res) => {
    Company.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id",
            "name"
        ],
        include: [
            {
                model: Address,
                attributes: [
                    "id",
                    "address_1",
                    "address_2",
                    "city",
                    "state",
                    "zip_code"
                ],
            },
            {
                model: Contact,
                attributes: [
                    "id",
                    "name",
                    "email",
                    "phone"
                ],
            },
            {
                model: Project,
                attributes: [
                    "id",
                    "title",
                    "type",
                    "price",
                    "due_date",

                ],
                include: {
                    model: Invoice,
                    attributes: [
                        "id",
                        "name",
                        "invoice_amount"
                    ]
                },
            }
        ],

    })
        .then((companyData) => {
            if (!companyData) {
                res.status(404).json({ message: "No company found with this id" });
                return;
            }
            const company = companyData.get({ plain: true });
            console.log(company);
            res.render("company", {
                company,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id,
                title: "Company",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Front End route for one project
router.get("/project/:id", (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id",
            "title",
            "type",
            "price",
            "due_date",
        ],
        include: [
            {
                model: Invoice,
                attributes: [
                    "id",
                    "name",
                    "invoice_amount"
                ],
            },
        ],

    })
        .then((projectData) => {
            if (!projectData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            const project = projectData.get({ plain: true });
            console.log(project);
            res.render("project-details", {
                project,
                logged_in: true,
                title: "Project Details",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Front End route for one invoice
router.get("/invoice/:id", (req, res) => {
    Invoice.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id",
            "name",
            "invoice_amount"
        ],

        include: [
            {
                model: Item,
            },
            {
                model: BillingAddress,
                attributes: [
                    "id",
                    "company_name",
                    "address_1",
                    "address_2",
                    "city",
                    "state",
                    "zip_code",
                    "pay_by",
                    "invoice_id"
                ],
            },


        ],

    })
        .then((invoiceData) => {
            if (!invoiceData) {
                res.status(404).json({ message: "No Invoice found with this id" });
                return;
            }
            const invoice = invoiceData.get({ plain: true });
            console.log(invoice);
            res.render("invoice-details", {
                invoice,
                logged_in: req.session.logged_in,
                username: req.session.username,
                title: "Invoice Details",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Edit Company FRONT END Route
router.get("/edit-company/:id", withAuth, (req, res) => {

    Company.findOne({
        where: {
            id: req.params.id,
        },

        attributes: [
            'id',
            'name',
            'user_id',
        ],
        include: [
            {
                model: Contact,
                attributes: [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'company_id'
                ],
            },
            {
                model: Address,
                attributes: [
                    'address_1',
                    'address_2',
                    'city',
                    'state',
                    'zip_code',
                ],

            },
        ],
    })
        .then((companyData) => {
            if (!companyData) {
                res.status(404).json({ message: "No company found with this id" });
                return;
            }

            const company = companyData.get({ plain: true });
            console.log(company)
            res.render("edit-company", {
                company,
                username: req.session.username,
                logged_in: true,
                title: "Edit Company",
            });
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;
