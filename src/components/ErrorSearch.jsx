import React from 'react';

const ErrorSearch = ({ imageUrl, altText }) => {
  return (
    <div>
        <h1 className='text-center' style={{ color: 'red', backgroundColor: '#6a040f' }}>La ricerca non é andata a buon fine</h1>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <img src={imageUrl} alt={altText} style={{ maxWidth: '100%', maxHeight: '100%'  }} />
    </div>
    </div>
  );
};

export default ErrorSearch;