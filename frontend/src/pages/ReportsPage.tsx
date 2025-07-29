import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [report, setReport] = useState({
    stress: '',
    anxiety: '',
    depression: '',
    advice: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/latest-report')
      .then(response => {
        const lines = response.data.split('\n');
        const newReport = {};

        lines.forEach(line => {
          if (line.startsWith('Stress Level:')) {
            newReport.stress = line.replace('Stress Level:', '').trim();
          } else if (line.startsWith('Anxiety Level:')) {
            newReport.anxiety = line.replace('Anxiety Level:', '').trim();
          } else if (line.startsWith('Depression Level:')) {
            newReport.depression = line.replace('Depression Level:', '').trim();
          } else if (line.startsWith('Advice:')) {
            newReport.advice = line.replace('Advice:', '').trim();
          }
        });

        setReport(newReport);
      })
      .catch(error => {
        console.error('Error fetching report:', error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mental Health Report</h1>

      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="font-bold">Stress Level</h2>
        <p>{report.stress}</p>
      </div>

      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="font-bold">Anxiety Level</h2>
        <p>{report.anxiety}</p>
      </div>

      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="font-bold">Depression Level</h2>
        <p>{report.depression}</p>
      </div>

      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="font-bold">Advice</h2>
        <p>{report.advice}</p>
      </div>
    </div>
  );
};

export default Reports;
