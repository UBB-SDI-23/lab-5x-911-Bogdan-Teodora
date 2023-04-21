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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


export const ClientsShowAll = () => {
  const[loading, setLoading] = useState(true);
  const[clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const crt = (page - 1) * pageSize + 1;

  const fetchClients = async () => {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_API_URL}/clients/paged?page=${page}&size=${pageSize}`
      );
      const { count, next, previous, results } = await response.json();
      setClients(results);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchClients();
    }, [page]);

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
      <h1 style={{marginTop:"65px"}}>All Clients</h1>

      {loading && <CircularProgress />}

      {!loading && clients.length == 0 && <div>No clients found</div>}

      {!loading && (
          <IconButton component={Link} sx={{ mr: 3 }} to={`/clients/add`}>
              <Tooltip title="Add a new client" arrow>
                  <PersonAddAlt1Icon style={{color:"whitesmoke", fontSize:"50px"}} />
              </Tooltip>
          </IconButton>

      )}

      {!loading && (
              <Button sx={{color:"black"}} onClick={sortClients} >
                  Sort clients
              </Button>
          )}

      {!loading && clients.length > 0 && (
        <>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                  <TableHead>
                      <TableRow>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>IdCar.</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Phone number</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Email address</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date of birth</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Address Id</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>First name</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Last name</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>

                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {clients.map((client:Clients, index) => (
                          <TableRow key={client.idClient}>
                              <TableCell component="th" scope="row">
                                  {index + crt}
                              <TableCell component="th" scope="row">
                                  <Link to={`/clients/${client.idClient}/details`} title="View clients details">
                                      {"view details"}
                                      
                                  </Link>

                              </TableCell>
                              </TableCell>
                              <TableCell align="center">{client.phoneNR}</TableCell>
                              <TableCell align="center">{client.email_address}</TableCell>
                              <TableCell align="center">{client.dateOfBirth}</TableCell>
                              <TableCell align="center">{client.addressID}</TableCell>
                              <TableCell align="center">{client.fname}</TableCell>
                              <TableCell align="center">{client.lname}</TableCell>
                              <TableCell align="center">

                  <IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.idClient}/edit`}>
                    <EditIcon />
                  </IconButton>

                  <IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.idClient}/delete`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
                          </TableRow>
                      ))}
              </TableBody>
              </Table>
          </TableContainer>
          <Button style={{color:"whitesmoke"}} disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous Page
          </Button>

          <Button style={{color:"whitesmoke"}}
          disabled={clients.length < pageSize}
          onClick={() => setPage(page + 1)}
          >
          Next Page
          </Button>
        </>
      )
      }
  </Container>
      
  );       
};