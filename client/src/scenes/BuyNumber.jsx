import { useState } from "react";
import Header from "@/components/Header";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  IconButton,
  Paper,
  InputAdornment,
  Chip,
  Tooltip,
} from "@mui/material";
import { EditOutlined, DeleteOutline, Search, Add, FilterList, Download } from "@mui/icons-material";
import { toast, Toaster } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

// Create 20 rows of data
const createData = (id, username, number, type, status) => ({
  id,
  username,
  number,
  type,
  status,
});

function BuyNumber() {
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData(1, "John Doe", "1234567890", "Admin", "Active"),
    createData(2, "Jane Smith", "9876543210", "User", "Active"),
    createData(3, "Michael Johnson", "5555555555", "Moderator", "Inactive"),
    createData(4, "Alice Brown", "1112223333", "User", "Active"),
    createData(5, "Tom Green", "4445556666", "Admin", "Active"),
    createData(6, "Rachel Adams", "6667778888", "User", "Inactive"),
    createData(7, "Luke Perry", "9998887777", "Admin", "Active"),
    createData(8, "Olivia Taylor", "7776665555", "Moderator", "Active"),
    createData(9, "Jack Wilson", "3334445555", "Admin", "Inactive"),
    createData(10, "Sophia Lee", "4443332222", "User", "Active"),
    createData(11, "Emily Davis", "8887776666", "Moderator", "Active"),
    createData(12, "Ethan White", "5554443333", "User", "Inactive"),
    createData(13, "Oliver Harris", "2223334444", "Admin", "Active"),
    createData(14, "Amelia Clark", "1112224444", "Moderator", "Active"),
    createData(15, "Liam Scott", "7778889999", "User", "Inactive"),
    createData(16, "Ava Mitchell", "4445553333", "Admin", "Active"),
    createData(17, "Isabella Thompson", "6665557777", "User", "Active"),
    createData(18, "Mason Walker", "5556664444", "Admin", "Inactive"),
    createData(19, "James Lee", "3334447777", "Moderator", "Active"),
    createData(20, "Charlotte Perez", "2221115555", "User", "Active"),
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [areaCode, setAreaCode] = useState("");
  const [numberType, setNumberType] = useState("local");
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const handleDelete = (id) => {
    setRowToDelete(id);
    setOpenConfirmDelete(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete));
    toast.success("Record deleted successfully!");
    setOpenConfirmDelete(false);
  };

  const cancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  // Filter rows based on search term
  const filteredRows = rows.filter((row) => {
    return (
      row.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.number.includes(searchTerm) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handlePurchaseNumber = () => {
    // Generate a random phone number based on area code
    const randomNumber = areaCode + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    
    // Add the new number to the rows
    const newRow = createData(
      rows.length + 1,
      "New User",
      randomNumber,
      numberType === "local" ? "User" : "Admin",
      "Active"
    );
    
    setRows([...rows, newRow]);
    toast.success("Number purchased successfully!");
    setOpen(false);
  };

  const getStatusChip = (status) => {
    return (
      <Chip 
        label={status} 
        size="small"
        color={status === "Active" ? "success" : "error"}
        sx={{ 
          fontWeight: "bold",
          minWidth: "80px"
        }}
      />
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "number",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Typography sx={{ fontFamily: "monospace" }}>
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "type",
      headerName: "User Type",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "Admin":
            color = theme.palette.success.main;
            break;
          case "Moderator":
            color = theme.palette.warning.main;
            break;
          default:
            color = theme.palette.info.main;
        }
        
        return (
          <Typography sx={{ color, fontWeight: "bold" }}>
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit User">
            <IconButton
              onClick={() => alert(`Edit clicked on row ${params.row.id}`)}
              color="primary"
              size="small"
              sx={{ mr: 1 }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton 
              onClick={() => handleDelete(params.row.id)} 
              color="error"
              size="small"
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Toaster position="top-right" />
      {/* <Header title="Assign Number List" subtitle="Manage phone number assignments" /> */}
      
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: "12px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Search and filter section */}
        <Box 
          mb={3} 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          gap={2}
        >
          <TextField
            placeholder="Search by name, number, type or status..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              flexGrow: 1,
              maxWidth: { xs: '100%', md: '400px' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box display="flex" gap={1}>
            {/* <Tooltip title="Filter Options">
              <Button 
                variant="outlined" 
                startIcon={<FilterList />}
                size="small"
              >
                Filter
              </Button>
            </Tooltip>
            
            <Tooltip title="Export Data">
              <Button 
                variant="outlined"
                startIcon={<Download />}
                size="small"
              >
                Export
              </Button>
            </Tooltip> */}
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleOpenModal}
            >
              Buy Number
            </Button>
          </Box>
        </Box>

        {/* Results summary */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={2}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {filteredRows.length} {filteredRows.length === 1 ? 'result' : 'results'}
          </Typography>
        </Box>

        {/* DataGrid */}
        <Box
          sx={{
            height: '65vh',
            width: '100%',
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: 2,
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.grey[800] 
                : theme.palette.primary.light,
              borderRadius: '8px 8px 0 0',
              color: theme.palette.mode === 'dark' 
                ? theme.palette.common.white 
                : theme.palette.primary.contrastText,
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.background.paper 
                : theme.palette.common.white,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.grey[800] 
                : theme.palette.primary.light,
              borderRadius: '0 0 8px 8px',
              color: theme.palette.mode === 'dark' 
                ? theme.palette.common.white 
                : theme.palette.primary.contrastText,
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: theme.palette.mode === 'dark' 
                ? theme.palette.common.white 
                : theme.palette.primary.contrastText,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.grey[700] 
                : theme.palette.grey[100],
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? `${theme.palette.primary.dark} !important` 
                : `${theme.palette.primary.lighter} !important`,
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25, 50]}
            disableSelectionOnClick
            checkboxSelection
            disableColumnMenu
            loading={false}
            components={{
              NoRowsOverlay: () => (
                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" color="text.secondary">No records found</Typography>
                </Box>
              ),
            }}
          />
        </Box>
      </Paper>

      {/* Confirmation Modal for Delete */}
      <Modal open={openConfirmDelete} onClose={cancelDelete}>
        <Paper
          sx={{
            width: { xs: "90%", sm: "400px" },
            margin: "auto",
            p: 3,
            borderRadius: "12px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom color="error">
            Confirm Deletion
          </Typography>
          <Typography variant="body1" mb={3}>
            Are you sure you want to delete this record? This action cannot be undone.
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Modal for Buy Number */}
      <Modal open={open} onClose={handleCloseModal}>
        <Paper
          sx={{
            width: { xs: "90%", sm: "400px" },
            margin: "auto",
            p: 3,
            borderRadius: "12px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Get Number
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Area Code"
              placeholder="e.g. 212"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography fontWeight="bold">+1</Typography>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => alert("Search for available numbers")}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
              <FormLabel component="legend">Number Type</FormLabel>
              <RadioGroup 
                value={numberType} 
                onChange={(e) => setNumberType(e.target.value)}
                sx={{ mt: 1 }}
              >
                <FormControlLabel 
                  value="local" 
                  control={<Radio color="primary" />} 
                  label="Local Number" 
                />
                <FormControlLabel 
                  value="toll-free" 
                  control={<Radio color="primary" />} 
                  label="Toll-Free Number" 
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchaseNumber}
              disabled={!areaCode}
            >
              Get Number
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

export default BuyNumber;