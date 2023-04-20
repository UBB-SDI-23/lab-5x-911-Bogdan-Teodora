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

export const ClientAdd = () => {
	const navigate = useNavigate();

	const [client, setClients] = useState<Clients>({
        idClient : 0,
        phoneNR : "",
        email_address : "",
        dateOfBirth : "",
        addressID : 0,
        fname : "",
        lname :"",
            
    });

	const addClient = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
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
							id="phoneNr"
							label="Phone Number"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClients({ ...client, phoneNR: event.target.value })}
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
							onChange={(event) => setClients({ ...client, addressID: parseInt(event.target.value) })}
						/>

                        <TextField
							id="fname"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClients({ ...client, fname: event.target.value })}
						/>
						<TextField
							id="lname"
							label="Last Name "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setClients({ ...client, lname: event.target.value })}
						/>
						<Button type="submit">Add Client</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};