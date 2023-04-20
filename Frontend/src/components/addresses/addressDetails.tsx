import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";


import { Address } from "../../models/Address";
import { GlobalURL } from "../../main";

export const AddressDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [address, setAddresses] = useState<Address>();

    useEffect(() => {
        const fetchAddress = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/addresses/${id}/details`);
            const data = await response.json();
            setAddresses(data);
            console.log(`Address id: ${data.address_id}`);
          } catch (error) {
            console.error(`Failed to fetch address with ID ${id}:`, error);
          }
        };
        fetchAddress();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Address Details</h1>
					<p>Address country: {address?.country}</p>
					<p>Address county: {address?.county}</p>
					<p>Address city : {address?.city}</p>
					<p>Address additional_info : {address?.additional_info}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};