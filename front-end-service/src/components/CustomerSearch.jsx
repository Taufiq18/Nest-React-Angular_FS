import React from 'react';
import { InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const CustomerSearch = ({ searchNo, onSearchChange, onSearch }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
    <InputBase
      placeholder="Search by No"
      value={searchNo}
      onChange={onSearchChange}
      style={{ marginLeft: 8, flex: 1, padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4 }}
    />
    <IconButton color="primary" onClick={onSearch}>
      <Search />
    </IconButton>
  </div>
);

export default CustomerSearch;
