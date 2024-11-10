import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import AboutUs from './AboutUs';
import Donor from './Donor';
import Recipients from './Recipients';
import BloodAvailability from './BloodAvailability';
import ContactUs from './ContactUs';

const App = () => {
  const [data, setData] = useState("loading");
  const [donors, setDonors] = useState([]); // Shared donor state

  // Fetching general data (already in place)
  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:3020/data");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("Error loading data");
    }
  };

  // Fetching donor data
  const fetchDonors = async () => {
    try {
      const response = await Axios.get("http://localhost:3020/api/donors");
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  // Fetch data and donors on component mount
  useEffect(() => {
    getData();
    fetchDonors();
  }, []);

  // Add a new donor to the shared donor list
  const addDonor = (newDonor) => {
    setDonors([...donors, newDonor]);
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/donor" element={<Donor donors={donors} onAddDonor={addDonor} />} /> {/* Pass donors and addDonor callback */}
          <Route path="/recipients" element={<Recipients />} />
          <Route path="/blood-availability" element={<BloodAvailability donors={donors} />} /> {/* Pass donors for searching */}
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
