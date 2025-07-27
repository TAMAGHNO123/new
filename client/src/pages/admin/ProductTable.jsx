import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TablePagination, Select, MenuItem, FormControl, InputLabel, Box, Skeleton, Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = ["All", "Car", "Bike", "Smartphone", "Watch"];

export default function ProductTable({
  products = [],
  loading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  filterCategory,
  setFilterCategory
}) {
  // Filter products by category
  const filtered = Array.isArray(products)
    ? (filterCategory && filterCategory !== "All"
      ? products.filter(p => p.category === filterCategory)
      : products)
    : [];

  // Paginate
  const paginated = Array.isArray(filtered)
    ? filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <Paper className="mt-6 shadow rounded">
      <Box className="flex items-center justify-between p-4">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            label="Category"
            onChange={e => setFilterCategory(e.target.value)}
          >
            {categories.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                    <TableCell><Skeleton width={120} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                    <TableCell><Skeleton width={60} /></TableCell>
                    <TableCell><Skeleton width={60} /></TableCell>
                    <TableCell><Skeleton width={80} /></TableCell>
                  </TableRow>
                ))
              : paginated.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Avatar
                        src={product.imageUrls?.[0]}
                        alt={product.name}
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => onEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => onDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}