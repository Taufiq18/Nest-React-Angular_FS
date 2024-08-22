import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const CustomerTable = ({ customers, onEdit, onDelete }) => (
  <TableContainer component={Paper} style={{ marginTop: 20 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Nama</TableCell>
          <TableCell>Alamat</TableCell>
          <TableCell>Kota</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <TableRow key={customer.no}>
              <TableCell>{customer.no}</TableCell>
              <TableCell>{customer.nama}</TableCell>
              <TableCell>{customer.alamat}</TableCell>
              <TableCell>{customer.kota}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(customer)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(customer.no)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: 'center' }}>
              No customer data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CustomerTable;
