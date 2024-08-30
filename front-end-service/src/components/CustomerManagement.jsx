import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Tabs, Tab, Button, Snackbar, Alert
} from '@mui/material';
import axios from 'axios'; 
import CustomerDialog from './CustomerDialog';
import CustomerTable from './CustomerTable';
import CustomerSearch from './CustomerSearch';
import { apiUrls } from '../utils/api'; // Import API URLs


const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0); // 0 for Express, 1 for Nest
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ no: '', nama: '', alamat: '', kota: '' });
  const [searchNo, setSearchNo] = useState('');
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [tabIndex]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(tabIndex === 0 ? apiUrls.express : apiUrls.nest);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchCustomerByNo = async () => {
    if (!searchNo) return;

    try {
      const response = await axios.get(`${tabIndex === 0 ? apiUrls.express : apiUrls.nest}/${searchNo}`);
      setCustomers([response.data]);
      setSearchError(false);
    } catch (error) {
      console.error('Error fetching customer by no:', error);
      setCustomers([]);
      setSearchError(true);
    }
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setFormData({ no: '', nama: '', alamat: '', kota: '' });
    setEditingCustomer(null);
    setOpenDialog(true);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingCustomer(customer.no);
    setOpenDialog(true);
  };

  const handleDelete = async (no) => {
    try {
      await axios.delete(`${tabIndex === 0 ? apiUrls.express : apiUrls.nest}/${no}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...formData };
      if (!editingCustomer) {
        delete dataToSend.no;
      }

      if (editingCustomer) {
        await axios.put(`${tabIndex === 0 ? apiUrls.express : apiUrls.nest}/${editingCustomer}`, dataToSend);
      } else {
        await axios.post(tabIndex === 0 ? apiUrls.express : apiUrls.nest, dataToSend);
      }
      setOpenDialog(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSearchError(false);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          color: '#333',
          marginTop: '50px',
          marginBottom: '30px'
        }}
      >
        Customer Management
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary">
        <Tab label="Express" />
        <Tab label="Nest" />
      </Tabs>

      <CustomerSearch
        searchNo={searchNo}
        onSearchChange={(e) => setSearchNo(e.target.value)}
        onSearch={fetchCustomerByNo}
      />

      <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginTop: 20 }}>
        Add Customer
      </Button>

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomerDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        editingCustomer={editingCustomer}
      />

      <Snackbar
        open={searchError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Customer with the specified No was not found!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerManagement;
