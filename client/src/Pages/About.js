import React from 'react';

const About = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", color: "white" }}>
      <h1><i>About</i></h1>
      <p>
        Welcome to Contact Manager, your all-in-one solution for managing contacts efficiently and securely.
        Our goal is to provide an intuitive and organized way to handle all your important connections in one place.
      </p>
      <br></br>
      <h2>Features:</h2>
      <ul>
        <li>Easy contact creation and editing</li>
        <li>Search and filter options for quick access</li>
        <li>Group contacts based on categories or tags</li>
        <li>Responsive design for mobile and desktop use</li>
        <li>Data privacy and secure storage of contact information</li>
      </ul>
<br></br>
      <h2>Our Mission</h2>
      <p>
        Contact Manager was created to simplify how individuals and businesses handle their network of contacts,
        helping you stay connected and organized, whether for personal or professional use.
      </p>
<br></br>
      <h2>Contact Us</h2>
      <p>
        If you have questions, feedback, or would like to suggest a feature, please reach out to us at 
        <a href="mailto:support@contactmanager.com" style={{ color: "lightblue" }}>support@contactmanager.com</a>.
      </p>
    </div>
  );
};

export default About;
