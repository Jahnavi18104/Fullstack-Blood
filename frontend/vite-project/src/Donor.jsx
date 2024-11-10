

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donor.css';

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    age: '',
    contact: '',
    bloodGroup: '',
    email: '',
    gender: '',
    address: '',
    lastDonationDate: ''
  });

  // Fetch donors on component mount
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3020/api/donors');
        setDonors(response.data); // Set the donors fetched from the backend
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
    fetchDonors();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddDonor = async () => {
    try {
      // Add the new donor to the backend
      const response = await axios.post('http://localhost:3020/api/donors/create', form);
      setDonors([...donors, response.data]);  // Update the donor list locally
      setForm({
        name: '',
        age: '',
        contact: '',
        bloodGroup: '',
        email: '',
        gender: '',
        address: '',
        lastDonationDate: ''
      });
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  return (
    <div className="donor">
      <h2>Donor Form</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
      <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input type="date" name="lastDonationDate" placeholder="Last Donation Date" value={form.lastDonationDate} onChange={handleChange} />
      <button onClick={handleAddDonor}>Add Donor</button>

      <h3>Donor List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Last Donation Date</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.age}</td>
              <td>{donor.contact}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.email}</td>
              <td>{donor.gender}</td>
              <td>{donor.address}</td>
              <td>{donor.lastDonationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donor;
