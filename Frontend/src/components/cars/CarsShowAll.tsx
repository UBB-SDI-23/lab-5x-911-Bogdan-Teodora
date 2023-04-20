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
import { Address } from "../../models/Address";

const PAGE_SIZE = 100;
export const CarsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [car, setCars] = useState<Car[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const [totalCars, setTotalCars] =useState(0)
    const [currentPage, setCurrentPage]=useState(0)
  
  
    useEffect(() => {
      setLoading(true);

      const fetchRecLbl = () => {
        fetch(`${BACKEND_API_URL}/cars/countAll`)
        .then((response) => response.json())
        .then((count) => {
          fetch(`${BACKEND_API_URL}/cars/page/${currentPage}/size/${pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setTotalCars(count);
            setCars(data);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      };
      fetchRecLbl();
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

    const sortCars = () => {
        const sortedCar = [...car].sort((a: Car, b: Car) => {
            if (a.nrkilometers < b.nrkilometers) {
                return -1;
            }
            if (a.nrkilometers > b.nrkilometers) {
                return 1;
            }
            return 0;
        })
        console.log(sortedCar);
        setCars(sortedCar);
    }
  
    return (
      <Container>
        <h1>All Cars</h1>
  
        {loading && <CircularProgress />}
        {!loading && car.length === 0 && <p>No cars found</p>}
        {!loading && (
          <div style={{display:'flex', alignItems:'center'}}>
            <IconButton component={Link} sx={{marginRight: 0 }} to={`/cars/add`}>
              <Tooltip title="Add a new car" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
          </div>
        )}

        {!loading && (
                <Button sx={{color:"black"}} onClick={sortCars} >
                    Sort cars by number of kilometers
                </Button>
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
                    Page {currentPage+1} of {Math.ceil(totalCars/pageSize)}
                   </Box>
              </div>
              )}
        
  
        {!loading && car.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>#</TableCell>IdCar
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Color</TableCell>
                  <TableCell align="center">Year of manufacture</TableCell>
                  <TableCell align="center">Number of kilometers</TableCell>
                  <TableCell align="right">Description</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
              {car.map((cars:Car, index) => (
                    <TableRow key={index}>
                      
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/cars/${cars.id}/details`} title="View cars details">
                          {cars.id}
                        </Link>
                    </TableCell>
  
                    <TableCell align="right">{cars.model}</TableCell>
                    <TableCell align="center">{cars.brand}</TableCell>
                    <TableCell align="center">{cars.color}</TableCell>
                    <TableCell align="center">{cars.year_manufacture}</TableCell>
                    <TableCell align="center">{cars.nrkilometers}</TableCell>
                    <TableCell align="right">{cars.description}</TableCell>
                    
                    <TableCell align="right">
                    <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/cars/${cars.id}/details`}>
                          <Tooltip title="View cars details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${cars.id}/edit`}
                        title="Edit car details"
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/cars/${cars.id}/delete`}
                        title="Delete car"
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