import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";


import { GlobalURL } from "../../main";
import { BookingDetails } from "../../models/BookingDetails";

export const BookingsDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [bookings, setBookings] = useState<BookingDetails>();

    useEffect(() => {
        const fetchBooking = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/bookings/${id}/details`);
            const data = await response.json();
            setBookings(data);
            console.log(`Booking id: ${data.idBooking}`);
          } catch (error) {
            console.error(`Failed to fetch booking with ID ${id}:`, error);
          }
        };
        fetchBooking();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Booking Details</h1>
					<p>Booking start date: {bookings?.startDate}</p>
					<p>Booking return date: {bookings?.returnDate}</p>
					<p>Booking price : {bookings?.amount}</p>
                    <p>Booking status : {bookings?.bookingStatus}</p>
                    <p>Booking drop location : {bookings?.drop_loc}</p>
                    <p>Booking pickup location : {bookings?.pickup_loc}</p>
                    <p>Booking's client id : {bookings?.clientId}</p>
                    <p>Booking's car id : {bookings?.carId}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};