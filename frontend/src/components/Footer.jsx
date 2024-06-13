import React from "react";
import whiteLogo from "../img/whiteLogo.png";

function Footer() {
  return (
    <div className="footer">
      <img src={whiteLogo} alt="whiteLogo" className="logo" />
      <div className="footerLists">
        <ul>
          <h3>Category</h3>
          <li>Art</li>
          <li>Science</li>
          <li>Technologi</li>
          <li>Cinema</li>
        </ul>
        <ul>
          <h3>Essential Links</h3>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Sitemap </li>
        </ul>
        <ul>
          <h3>Additional Information</h3>
          <li>Blog</li>
          <li>Careers</li>
          <li>Press</li>
          <li>Affiliate Program </li>
        </ul>
        <ul>
          <h3>Additional Information</h3>
          <li>Blog</li>
          <li>Careers</li>
          <li>Press</li>
          <li>Affiliate Program </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
