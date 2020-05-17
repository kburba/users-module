import React from 'react';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {currentYear} Dev Connector
    </footer>
  );
};
