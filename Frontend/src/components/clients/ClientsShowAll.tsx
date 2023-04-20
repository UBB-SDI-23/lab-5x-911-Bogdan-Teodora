import { useEffect, useState } from "react"; 
import { Car } from "../../models/Car";

import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
  Button,
  Pagination,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";
import { Clients } from "../../models/Client";

const PAGE_SIZE = 100;
export const ClientsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<Clients[]>([]);
    const [pageSize, setPageSize] = useState(100);
    const [totalClients, setTotalClients] =useState(0)
    const [currentPage, setCurrentPage]=useState(0)
  
  
    useEffect(() => {
      setLoading(true);
  
      const fetchClients = () => {
        fetch(`${BACKEND_API_URL}/clients/countAll`)
        .then((response) => response.json())
        .then((count) => {
          fetch(`${BACKEND_API_URL}/clients/paged?page=${currentPage}&size=${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setTotalClients(count);
            setClients(data);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      };
      fetchClients();
    }, [currentPage, pageSize]);
  
    
    const handlePreviousPage = () => {
      if(currentPage>0)
      {
        setCurrentPage(currentPage-1);
      }
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage+1);
    };

    const sortClients = () => {
        const sortedClients = [...clients].sort((a: Clients, b: Clients) => {
            if (a.lname < b.lname) {
                return -1;
            }
            if (a.lname > b.lname) {
                return 1;
            }
            return 0;
        })
        console.log(sortedClients);
        setClients(sortedClients);
    }
  
    return (
      <Container>
        <h1>All clients</h1>
  
        {loading && <CircularProgress />}
        {!loading && clients.length === 0 && <p>No clients found</p>}
        {!loading && (
          <div style={{display:'flex', alignItems:'center'}}>
            <IconButton component={Link} sx={{marginRight: 0 }} to={`/clients/add`}>
              <Tooltip title="Add a new client" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        )}
  
        {!loading && (
              <div style ={{display: "flex", alignItems:"center"}}>
                 
                  <Button
                    sx={{color:"black"}}
                    disabled={currentPage===0}
                    onClick={handlePreviousPage}>
                      Previous Page
                  </Button>
                  <Button
                   sx={{color:"black"}} onClick={handleNextPage}>
                    Next Page
                   </Button>
  
                   <Box mx={2} display="flex" alignItems="center">
                    Page {currentPage+1} of {Math.ceil(totalClients/pageSize)}
                   </Box>
              </div>
              )}
        {!loading && (
                <Button sx={{color:"black"}} onClick={sortClients} >
                    Sort clients by last name
                </Button>
            )}
  
        {!loading && clients.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>#</TableCell>IdCar
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Email Address</TableCell>
                  <TableCell align="center">Date Of Birth</TableCell>
                  <TableCell align="center">Address Id</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {clients.map((client:Clients, index) => (
                    <TableRow key={index}>
                      
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/clients/${client.idClient}/details`} title="View client details">
                          {client.idClient}
                        </Link>
                    </TableCell>
  
                    <TableCell align="right">{client.phoneNR}</TableCell>
                    <TableCell align="right">{client.email_address}</TableCell>
                    <TableCell align="right">{client.dateOfBirth}</TableCell>
                    <TableCell align="right">{client.addressID}</TableCell>
                    <TableCell align="right">{client.fname}</TableCell>
                    <TableCell align="right">{client.lname}</TableCell>
                    
                    <TableCell align="right">
                    <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/clients/${client.idClient}/details`}>
                          <Tooltip title="View client details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/clients/${client.idClient}/edit`}
                        title="Edit client details"
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/clients/${client.idClient}/delete`}
                        title="Delete client"
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
            sx={{color:"black"}}
            disabled={currentPage===0}
            onClick={handlePreviousPage}>
              Previous Page
            </Button>
  
          <Button sx={{color:"black"}} onClick={handleNextPage}>
            Next Page
          </Button>
      </Container>
    );
  };