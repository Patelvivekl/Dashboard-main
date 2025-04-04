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
} from "@mui/material";
import { EditOutlined, DeleteOutline, Search } from "@mui/icons-material";
import { toast } from "react-hot-toast"; // Import react-hot-toast for toast notifications
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid"; // Import the DataGrid component

// Create 20 rows of data
const createData = (id, username, number, type) => ({
  id,
  username,
  number,
  type,
});

function BuyNumber() {
  const theme = useTheme(); // Get the current theme
  const [rows, setRows] = useState([
    createData(1, "John Doe", "1234567890", "Admin"),
    createData(2, "Jane Smith", "9876543210", "User"),
    createData(3, "Michael Johnson", "5555555555", "Moderator"),
    createData(4, "Alice Brown", "1112223333", "User"),
    createData(5, "Tom Green", "4445556666", "Admin"),
    createData(6, "Rachel Adams", "6667778888", "User"),
    createData(7, "Luke Perry", "9998887777", "Admin"),
    createData(8, "Olivia Taylor", "7776665555", "Moderator"),
    createData(9, "Jack Wilson", "3334445555", "Admin"),
    createData(10, "Sophia Lee", "4443332222", "User"),
    createData(11, "Emily Davis", "8887776666", "Moderator"),
    createData(12, "Ethan White", "5554443333", "User"),
    createData(13, "Oliver Harris", "2223334444", "Admin"),
    createData(14, "Amelia Clark", "1112224444", "Moderator"),
    createData(15, "Liam Scott", "7778889999", "User"),
    createData(16, "Ava Mitchell", "4445553333", "Admin"),
    createData(17, "Isabella Thompson", "6665557777", "User"),
    createData(18, "Mason Walker", "5556664444", "Admin"),
    createData(19, "James Lee", "3334447777", "Moderator"),
    createData(20, "Charlotte Perez", "2221115555", "User"),
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [open, setOpen] = useState(false); // Modal state
  const [areaCode, setAreaCode] = useState(""); // Area Code input state
  const [numberType, setNumberType] = useState("local"); // Radio buttons for Local/Toll-Free
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false); // Confirmation modal state
  const [rowToDelete, setRowToDelete] = useState(null); // Store row to delete

  const handleDelete = (id) => {
    setRowToDelete(id); // Store the row to delete
    setOpenConfirmDelete(true); // Open confirmation modal
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete)); // Delete the row
    toast.success("Record deleted successfully!", {
      duration: 4000, // Show for 4 seconds
      position: "top-right", // Display at the top-right corner
      style: {
        background: "#4caf50", // Green background for success
        color: "white", // White text color
        fontWeight: "bold", // Bold text
        borderRadius: "8px", // Rounded corners
        padding: "16px", // Padding around text
        fontSize: "16px", // Larger text for readability
      },
    });
    setOpenConfirmDelete(false); // Close confirmation modal
  };

  const cancelDelete = () => {
    setOpenConfirmDelete(false); // Close confirmation modal
  };

  // Filter rows based on search term
  const filteredRows = rows.filter((row) => {
    return (
      row.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.number.includes(searchTerm)
    );
  });

  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 100,
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1, // Allow this column to take up available space
    },
    {
      field: "number",
      headerName: "Number",
      flex: 1, // Allow this column to take up available space
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1, // Allow this column to take up available space
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => alert(`Edit clicked on row ${params.row.id}`)}
            color="success"
          >
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteOutline />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handlePurchaseNumber = () => {
    alert(`Purchased Number with Area Code: ${areaCode} and Type: ${numberType}`);
    setOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="AssignNumber List" subtitle="Manage AssignNumbers here" />
      <br />

      {/* Search bar */}
      <Box mb={2}>
        <TextField
          label="Search by Username or Number"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">No. of Rows: {filteredRows.length}</Typography>

        {/* Buy Number Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ alignSelf: "flex-start" }}
        >
          Buy Number
        </Button>
      </Box>

      <Box
        mt="40px"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredRows} // Using filtered rows
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

      {/* Confirmation Modal for Delete */}
      <Modal open={openConfirmDelete} onClose={cancelDelete}>
        <Box
          sx={{
            width: "400px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            marginTop: "10%",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "red" }}>
            Are you sure you want to delete this row?
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Buy Number */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "400px",
            margin: "auto",
            padding: "20px",
            backgroundColor: theme.palette.mode === "dark" ? "#333" : "white",
            color: theme.palette.mode === "dark" ? "white" : "black",
            borderRadius: "8px",
            marginTop: "10%",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Get Number
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <TextField
              label="Area Code"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              sx={{
                flex: 1,
                marginRight: "8px",
                "& .MuiInputBase-root": {
                  backgroundColor: theme.palette.mode === "dark" ? "#555" : "white",
                },
              }}
            />
            <IconButton
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#444" : "#f0f0f0",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "#666" : "#e0e0e0",
                },
              }}
              onClick={() => alert("Search clicked")}
            >
              <Search />
            </IconButton>
          </Box>

          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Number Type</FormLabel>
            <RadioGroup value={numberType} onChange={(e) => setNumberType(e.target.value)}>
              <FormControlLabel value="local" control={<Radio />} label="Local Number" />
              <FormControlLabel value="toll-free" control={<Radio />} label="Toll-Free Number" />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePurchaseNumber}
          >
            Get Number
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default BuyNumber;
