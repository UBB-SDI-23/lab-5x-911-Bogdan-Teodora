import { Button, Card, CardActions, CardContent, CircularProgress, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Car } from "../../models/Car";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";

export const CarUpdate = () => {

	const navigate = useNavigate();
    const { id } = useParams();

	const [loading, setLoading] = useState(true)
	const [car, setCar] = useState({
        id: 0,
        model: "",
        brand: "",
        color: "",
        year_manufacture: 0,
        nrkilometers: 1,
    });

    useEffect(() => {
		const fetchCar= async () => {
			const response = await fetch(`${BACKEND_API_URL}/cars/${id}/edit`);
			const car = await response.json();
			setCar({
                id:car.id,
				model: car.model,
				brand: car.brand,
				color: car.color,
				year_manufacture: car.year_manufacture,
				nrkilometers: car.nrkilometers,
		})
			setLoading(false);
            console.log(car);
		};
		fetchCar();
	}, [id]);

	const updateCar = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/cars/${id}/edit`, car);
			navigate(`/cars/${id}/details`);
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<Container>

		{loading && <CircularProgress />}

		{!loading && !car && <div>Car not found</div>}

		{!loading && (
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars/${id}/details`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateCar}>
                    <TextField
							id="model"
							label="Model"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCar({ ...car, model: event.target.value })}
						/>
						<TextField
							id="brand"
							label="Brand"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCar({ ...car, brand: event.target.value })}
						/>
                        <TextField
                                id="color"
                                label="Color"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setCar({ ...car, color: event.target.value })}
                            />

                        <TextField
							id="year_manufacture"
							label="Year of manufacture"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCar({ ...car, year_manufacture: parseInt(event.target.value) })}
						/>
                        <TextField
							id="nrkilometers"
							label="Number Kilometers"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCar({ ...car, nrkilometers: parseInt(event.target.value) })}
						/>

						<Button type="submit">Update car</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		)
}
		</Container>
	);
};