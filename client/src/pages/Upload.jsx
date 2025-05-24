import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import '../style.css';

const Upload = () => {
  const location = useLocation();
  const username = location?.state?.username || "Guest";
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = sheetData[0];
      const rows = sheetData.slice(1);

      const json = rows.map(row => {
        let obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || "";
        });
        return obj;
      });

      setJsonData(json);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleAddToDB = async () => {
    console.log("Sending JSON:", jsonData);
    if (!jsonData) {
      alert("No data to add to DB");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/upload-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Data added to DB successfully!");
        navigate('/excel-data');
      } else {
        alert(resData.message || "Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data to DB:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div>
      <div className="header">Welcome, {username}!</div>
      <div className="form-container" style={{ paddingTop: "60px" }}>
        <form className="login-form">
          <label>Upload Excel File:</label>
          <input type="file" id="excelFile" accept=".xlsx, .xls" onChange={handleFileChange} />
        </form>

        {jsonData && (
          <button className="btn" onClick={handleAddToDB} style={{ marginTop: '20px' }}>
            Add to DB
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
