import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </div>
  );
};

export default Footer;
