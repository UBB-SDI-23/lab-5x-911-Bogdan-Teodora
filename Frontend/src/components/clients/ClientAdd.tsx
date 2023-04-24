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
import { ClientsDTO } from "../../models/ClientsDTO";

export const ClientAdd = () => {
	const navigate = useNavigate();

	const [client, setClients] = useState<ClientsDTO>({
        idClient : 0,
        phoneNR : "",
        email_address : "",
        dateOfBirth : "",
        addressID : 0,
        fname : "",
        lname :"",
		noBookings:0,
            
    });

	// State variables for input field errors
	const [fnameError, setFNameError] = useState(false);
	const [lanameError, setLNameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [addressError, setAddressError] = useState(false);

	const addClient = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// Check for input field errors
		if (client.fname === "") {
			setFNameError(true);
			return;
			// Return to prevent submission if there is an error
		}
		if (client.lname === "") {
			setLNameError(true);
			return;
		}
		if (client.phoneNR === "") {
			setPhoneError(true);
			return;
		}
		if (client.addressID === 0) {
			setAddressError(true);
			return;
		}
		try {
			await axios.post(`${BACKEND_API_URL}/clients/add`, client);
			navigate("/clients");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addClient}>
					<TextField
							id="phoneNR"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={phoneError}
							helperText={phoneError ? "Phone nr cannot be empty" : ""}
							onChange={(event) => {
								setClients({ ...client, phoneNR: event.target.value });
								setPhoneError(false);
							}}
						/>
						<TextField
							id="email_address"
							label="Email Address"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClients({ ...client, email_address: event.target.value })}
						/>

                        <TextField
							id="dateOfBirth"
							label="Date Of Birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClients({ ...client, dateOfBirth: event.target.value })}
						/>

                        <TextField
							id="addressID"
							label="Address Id "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={addressError}
							helperText={addressError ? "Address cannot be empty" : ""}
							onChange={(event) => {
								setClients({ ...client, addressID: parseInt(event.target.value) });
								setAddressError(false);
							}}
						/>

                        <TextField
							id="fname"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={fnameError}
							helperText={fnameError ? "First name cannot be empty" : ""}
							onChange={(event) => {
								setClients({ ...client, fname: event.target.value });
								setFNameError(false);
							}}
						/>
						<TextField
							id="lname"
							label="Last Name "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={lanameError}
							helperText={lanameError ? "Last name cannot be empty" : ""}
							onChange={(event) => {
								setClients({ ...client, lname: event.target.value });
								setLNameError(false);
							}}
						/>
						<Button type="submit">Add Client</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};