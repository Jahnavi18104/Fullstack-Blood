
import React, { useState, useEffect } from 'react';
import './Recipients.css';

const Recipients = () => {
  // Load recipients from localStorage, or initialize as an empty array
  const [recipients, setRecipients] = useState(
    JSON.parse(localStorage.getItem('recipients')) || []
  );
  
  const [form, setForm] = useState({ name: '', bloodGroup: '', hospitalName: '', contact: '' });

  // Handle form changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add recipient to the list and store it in localStorage
  const handleAddRecipient = () => {
    const updatedRecipients = [...recipients, form];
    setRecipients(updatedRecipients);  // Update state
    localStorage.setItem('recipients', JSON.stringify(updatedRecipients));  // Store in localStorage
    setForm({ name: '', bloodGroup: '', hospitalName: '', contact: '' });  // Reset form
  };

  return (
    <div className="recipients">
      <h2>Recipient Form</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
      <input name="hospitalName" placeholder="Hospital Name" value={form.hospitalName} onChange={handleChange} />
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
      <button onClick={handleAddRecipient}>Add Recipient</button>

      <h3>Recipient List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Hospital Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {recipients.length > 0 ? (
            recipients.map((recipient, index) => (
              <tr key={index}>
                <td>{recipient.name}</td>
                <td>{recipient.bloodGroup}</td>
                <td>{recipient.hospitalName}</td>
                <td>{recipient.contact}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No recipients found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recipients;
