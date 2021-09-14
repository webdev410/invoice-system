const router = require('express').Router();
const { Invoice, Item, BillingAddress, } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all invoices - working
router.get('/', withAuth, async (req, res) => {
    try {
        const invoiceData = await Invoice.findAll({
            where: [
                archived = false,
            ],
            include: [
                {
                    model: Item,
                    attributes: [
                        'id',
                        'description',
                        'units',
                        'unit_price',

                    ]
                }
            ],
        });
        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one invoice - working
router.get('/:id', withAuth, async (req, res) => {
    try {
        const invoiceData = await Invoice.findByPk(req.params.id, {
            attributes: [
                'id',
                'name',

                'is_paid',
                'archived',

            ],
            include: [
                {
                    model: Item,
                    attributes: [
                        'id',
                        'description',
                        'units',
                        'unit_price',

                    ]
                }],
        });

        if (!invoiceData) {
            res.status(404).json({ message: 'No invoice found with that id!' });
            return;
        }

        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  Add Invoice route
router.post("/", withAuth, async (req, res) => {
    console.log("req.session", req.session)
    console.log("req.params", req.params)

    const invoice = await Invoice.create({
        name: req.body.invoiceName,
        project_id: req.body.project_id,
        due_date: req.body.due_date,
        include: [
            {
                model: BillingAddress,
                attributes: [
                    "id",
                    'address_1',
                    'address_2',
                    'city',
                    'state',
                    'zip_code',
                    'company_name',
                    'due_date',
                    'invoice_id',
                ],
            },
        ]
    });
    const billingAddress = await BillingAddress.create({

        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zipCode,
        company_id: req.body.company_id,
        company_name: req.body.companyName,
        invoice_id: invoice.id,
        pay_by: req.body.due_date,
    })
    console.log(invoice)
    await billingAddress.save()
    await invoice.save()

    res.status(200).json(invoice);
});

// DELETE an invoice
router.delete('/:id', async (req, res) => {
    try {
        const invoiceData = await Invoice.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!invoiceData) {
            res.status(404).json({ message: 'No invoice found with that id!' });
            return;
        }

        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// UPDATE INVOICE
router.put('/:id', (req, res) => {
    //Calls the update method on the Invoice model
    Invoice.update(
        {
            // All the fields you can update and the data attached to the request body.
            archived: req.body.archived,
            is_paid: req.body.isPaid

        },
        {
            // Gets a book based on the book_id given in the request parameters
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedInvoice) => {
            res.json(updatedInvoice);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});


module.exports = router;