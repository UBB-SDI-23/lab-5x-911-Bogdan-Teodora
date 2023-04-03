import { useEffect, useState } from "react"; 
import { CarStatistics } from "../../models/CarsStatistics";

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
} from "@mui/material";
import { Link } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";


export const CarsStatistics = () => {
    const [loading, setLoading]=useState(false);
    const [cars, setCars] = useState([]);
  
    useEffect(() =>{   
      fetch(`${BACKEND_API_URL}/cars/statistics`)
          .then((res) => res.json())
          .then((data) => {
                setCars(data),
                setLoading(false);
                      
                  });
      }, []);  

      return (
        <Container>
          <h1>Statistics</h1>
    
          {loading && <CircularProgress />}
          {!loading && cars.length === 0 && <p>No cars found</p>}
          {/* {!loading && (
            <div style={{display:'flex', alignItems:'center'}}>
                    <IconButton component={Link} sx={{mr: 3 }} to={`/cars/add`}>
              <Tooltip title="Add a new car" arrow>
                <AddIcon color="primary" />
              </Tooltip>
            </IconButton>
                    </div>
          )} */}
          {!loading && cars.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Model</TableCell>
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="center">Year of manufacture</TableCell>
                    <TableCell align="center">Number kilometers</TableCell>
                    <TableCell align = "right">Average Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map((car:CarStatistics, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                        <TableCell align="left">{car.model}</TableCell>
                        <TableCell align="right">{car.brand}</TableCell>
                        <TableCell align="right">{car.color}</TableCell>
                        <TableCell align="center">{car.year_manufacture}</TableCell>
                        <TableCell align="center">{car.nrkilometers}</TableCell>
                        <TableCell align = "right">{car.agvBookingPrice}</TableCell>

                      {/* <TableCell align="right">
                        <IconButton
                          component={Link}
                          sx={{ mr: 3 }}
                          to={`/cars/${car.id}/details`}>
                          <Tooltip title="View car details" arrow>
                            <ReadMoreIcon color="primary" />
                          </Tooltip>
                        </IconButton>
    
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      );
  }
  