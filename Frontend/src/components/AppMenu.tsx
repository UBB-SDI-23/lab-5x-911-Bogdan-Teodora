import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CarRentalIcon from '@mui/icons-material/CarRental';
import NoCrashIcon from '@mui/icons-material/NoCrash';

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" sx={{ backgroundColor: "#dcbae0",marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SchoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Car rental center
					</Typography>
					<Button
						variant={path.startsWith("/cars") ? "outlined" : "text"}
						to="/cars"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<NoCrashIcon />}>
						Cars
					</Button>
                    <Button
						variant={path.startsWith("/cars/statistics") ? "outlined" : "text"}
						to="/cars/statistics"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<CarRentalIcon />}>
						Statistics
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};