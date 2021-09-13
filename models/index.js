const User = require('./User');
const Company = require('./Company');
const Contact = require('./Contact');
const Address = require('./Address');
const Project = require('./Project');
const Invoice = require('./Invoice');
const Item = require('./Item');
const Sent = require('./Sent');
const BillingAddress = require('./BillingAddress');
const Profile = require('./Profile');


Company.hasOne(Contact, {
    foreignKey: 'company_id',
    onDelete: "cascade"
})

Company.hasOne(Address, {
    foreignKey: "company_id",
    onDelete: "cascade",
})

User.hasOne(Profile, {
    foreignKey: "user_id",
    onDelete: "cascade"
})

Company.hasMany(Project, {
    foreignKey: "company_id",
    onDelete: "cascade",
})
Project.hasMany(Invoice, {
    foreignKey: "project_id",
    onDelete: "cascade",
})
Invoice.belongsTo(Project, {
    foreignKey: "project_id",
    onDelete: "cascade",
})

Invoice.hasMany(Item, {
    foreignKey: "invoice_id",
    onDelete: "cascade",
})
Invoice.hasOne(BillingAddress, {
    foreignKey: "invoice_id",
    onDelete: "cascade",
})
BillingAddress.belongsTo(Invoice, {
    foreignKey: "invoice_id",
    onDelete: "cascade"
})
Address.belongsTo(Company, {
    foreignKey: "company_id",
    onDelete: "cascade",
})

User.hasMany(Sent, {

    foreignKey: "user_id",
    onDelete: "cascade"
})

Invoice.hasMany(Sent, {
    foreignKey: "invoice_id",
    onDelete: "cascade"

})

module.exports = { User, Company, Contact, Address, Project, Profile, Invoice, Item, BillingAddress, Sent };
