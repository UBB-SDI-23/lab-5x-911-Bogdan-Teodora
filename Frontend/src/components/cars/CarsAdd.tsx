import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


import { Car } from "../../models/Car";
import { GlobalURL } from "../../main";

export const CarsAdd = () => {
	const navigate = useNavigate();

	const [car, setCars] = useState<Car>({
            id: 0,
            model: "",
            brand: "",
            color: "",
            year_manufacture: 0,
            nrkilometers: 1,
			description : "",
            
    });

	const addcar = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/cars/add`, car);
			navigate("/cars");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addcar}>
						<TextField
							id="brand"
							label="Brand"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, brand: event.target.value })}
						/>
						<TextField
							id="model"
							label="Model"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, model: event.target.value })}
						/>

                        <TextField
							id="color"
							label="Color"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, color: event.target.value })}
						/>

                        <TextField
							id="year_manufacture"
							label="Year of manufacture "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, year_manufacture: parseInt(event.target.value) })}
						/>

                        <TextField
							id="nrkilometers"
							label="No. of kilometers"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, nrkilometers: parseInt(event.target.value) })}
						/>
						<TextField
							id="description"
							label="Description "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, description: event.target.value })}
						/>
						<Button type="submit">Add car</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};