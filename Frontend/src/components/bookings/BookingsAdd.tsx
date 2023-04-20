import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


import { Clients } from "../../models/Client";
import { GlobalURL } from "../../main";
import { BookingDetails } from "../../models/BookingDetails";

export const BookingsAdd = () => {
	const navigate = useNavigate();

	const [bookings, setBookings] = useState<BookingDetails>({
        startDate: "",
        returnDate: "",
        amount: 0,
        bookingStatus: "",
        drop_loc: "",
        pickup_loc: "",
        carId: 0,
        clientId: 0,
        idBooking: 0,
    });

	const addBooking = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/bookings/add`, bookings);
			navigate("/bookings");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addBooking}>
						<TextField
							id="startDate"
							label="Start Date of car booking"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, startDate: event.target.value })}
						/>
						<TextField
							id="returnDate"
							label="Return Date of car booking"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, returnDate: event.target.value })}
						/>

                        <TextField
							id="amount"
							label="Amount of the booking "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, amount: parseInt(event.target.value) })}
						/>

                        <TextField
							id="bookingStatus"
							label="Booking Status"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, bookingStatus: event.target.value })}
						/>

                        <TextField
							id="drop_loc"
							label="Drop location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, drop_loc: event.target.value })}
						/>

						<TextField
							id="pickup_loc"
							label="Pickup location "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, pickup_loc: event.target.value })}
						/>
                        <TextField
							id="carId"
							label="Car Id "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, carId: parseInt(event.target.value) })}
						/>
                        <TextField
							id="clientId"
							label="Client Id "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setBookings({ ...bookings, clientId: parseInt(event.target.value) })}
						/>
                        
						<Button type="submit">Add Booking</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};