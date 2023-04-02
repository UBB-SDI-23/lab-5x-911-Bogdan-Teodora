import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import { Car } from "../../models/Car";
import { GlobalURL } from "../../main";
import { BACKEND_API_URL } from "../../constants";

export const CarDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCars] = useState<Car>();

    useEffect(() => {
        const fetchCar = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/cars/${id}/details`);
            const data = await response.json();
            setCars(data);
            console.log(`Car id: ${data.id}`);
            
          } catch (error) {
            console.error(`Failed to fetch car with ID ${id}:`, error);
          }
        };
        fetchCar();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Car Details</h1>
					<p>Car Model: {car?.model}</p>
					<p>Car Brand: {car?.brand}</p>
					<p>Car Color : {car?.color}</p>
                    <p>Car Year of manufacture : {car?.year_manufacture}</p>
                    <p>Car Nr Kilometers : {car?.nrkilometers}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};