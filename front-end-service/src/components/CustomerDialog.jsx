import React from 'react';
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Button
} from '@mui/material';

const CustomerDialog = ({ open, onClose, formData, onInputChange, onSubmit, editingCustomer }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        name="nama"
        label="Nama"
        type="text"
        fullWidth
        value={formData.nama}
        onChange={onInputChange}
      />
      <TextField
        margin="dense"
        name="alamat"
        label="Alamat"
        type="text"
        fullWidth
        value={formData.alamat}
        onChange={onInputChange}
      />
      <TextField
        margin="dense"
        name="kota"
        label="Kota"
        type="text"
        fullWidth
        value={formData.kota}
        onChange={onInputChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Cancel</Button>
      <Button onClick={onSubmit} color="primary">{editingCustomer ? 'Update' : 'Add'}</Button>
    </DialogActions>
  </Dialog>
);

export default CustomerDialog;
