import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Result = ({ prices, squares, bedrooms, bathrooms, neighbors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const generatePDF = () => {
    const input = document.getElementById('datas');

    html2canvas(input, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0, '', 'FAST');
      pdf.save('Data.pdf');
    });
  };

  return (
    <div>
      <div className="result-container">
        <div className="table-container">
        {bedrooms && (
          <table id='datas'>
            <thead>
              <tr>
                <th>S.no</th>
                <th>SquareFeet</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Neighbors</th>
                <th>Prices</th>
              </tr>
            </thead>
            <tbody>
            {prices &&
                prices.slice(startIndex, endIndex).map((price, i) => (
                    <tr key={i}>
                    <td>{startIndex + i + 1}</td>
                    <td>{squares.slice(startIndex, endIndex)[i]}</td>
                    <td>{bedrooms.slice(startIndex, endIndex)[i]}</td>
                    <td>{bathrooms.slice(startIndex, endIndex)[i]}</td>
                    <td>{neighbors.slice(startIndex, endIndex)[i]}</td>
                    <td>₹ {parseInt(price, 10)}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        )}
        <button onClick={generatePDF} className='print'>Print</button>
      </div>
     </div> 

      <div className='page-buttons'>
        <Link to='/'>
          <button className='back'>Back</button>
        </Link>
        <button className='prev' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button className='next' onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= prices.length}>
          Next
        </button>
      </div>

    </div>
  );
};

export default Result;
