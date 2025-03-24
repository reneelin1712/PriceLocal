import { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Typography, Grid } from "@mui/material";
import MainCard from "components/MainCard";

export default function UploadCustomer() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select an Excel file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.log("✅ JSON to send:", jsonData); // debug log

        const response = await fetch(
          "https://customerstorel.azurewebsites.net/api/upload_customers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );

        if (response.ok) {
          setUploadMessage("✅ Upload successful!");
        } else {
          const errorText = await response.text();
          setUploadMessage(`❌ Upload failed. Server said: ${errorText}`);
        }
      } catch (error) {
        console.error("Upload error:", error);
        setUploadMessage("❌ An error occurred while uploading data.");
      }
    };
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <MainCard>
          <Typography variant="h5">Upload Customer Data</Typography>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
            Upload
          </Button>
          <Typography variant="body2" color="secondary" sx={{ mt: 1 }}>
            {uploadMessage}
          </Typography>
        </MainCard>
      </Grid>
    </Grid>
  );
}
