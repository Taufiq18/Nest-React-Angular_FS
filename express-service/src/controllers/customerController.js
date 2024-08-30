const Customer = require('../models/customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { nama, alamat, kota } = req.body;
        const newCustomer = await Customer.create({ nama, alamat, kota });
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, alamat, kota } = req.body;
        const [updated] = await Customer.update({ nama, alamat, kota }, {
            where: { no: id }
        });

        if (updated) {
            const updatedCustomer = await Customer.findByPk(id);
            res.status(200).json(updatedCustomer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.destroy({
            where: { no: id }
        });

        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
