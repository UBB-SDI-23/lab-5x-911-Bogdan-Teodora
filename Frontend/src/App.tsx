import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { CarsShowAll } from './components/cars/CarsShowAll'
import { AppHome } from './components/AppHome'
import { AppMenu } from './components/AppMenu'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarDetails } from './components/cars/CarDetails'
import { CarDelete } from './components/cars/CarDelete'
import { CarsAdd } from './components/cars/CarsAdd'
import { CarsStatistics } from './components/cars/CarsStatistics'
import { CarUpdate} from './components/cars/CarUpdate';


function App() {
  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
          <Route path="/cars" element={<CarsShowAll />} />
          <Route path="/cars/:id/details" element={<CarDetails />} />
          <Route path="/cars/:id/delete" element={<CarDelete />} />
          <Route path="/cars/add" element={<CarsAdd />} />
          <Route path="/cars/statistics" element={<CarsStatistics />} />
		  <Route path="/cars/:id/edit" element={<CarUpdate />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App
