// src/pages/predict/PredictPrices.jsx

import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import * as XLSX from "xlsx";
import MainCard from "components/MainCard";

export default function PredictPrices() {
  const [file, setFile] = useState(null);
  const [predictedData, setPredictedData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      try {
        const response = await fetch("https://customerstorel.azurewebsites.net/api/predict-prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jsonData)
        });

        const result = await response.json();
        const enriched = result.map((row) => ({
          ...row,
          Variance: row.SuggestedPrice_RF - row.MonthlyTotal
        }));
        setPredictedData(enriched);
      } catch (error) {
        console.error("Prediction error:", error);
      }
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Predict Prices</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <MainCard title="Upload Pricelist for Prediction">
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
            Upload and Predict
          </Button>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Predicted Prices Table">
          <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>SiteID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>dcWidth</TableCell>
                  <TableCell>dcLength</TableCell>
                  <TableCell>UnitSize</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>MonthlyRatePerSF</TableCell>
                  <TableCell>PushRate</TableCell>
                  <TableCell>StandardRate</TableCell>
                  <TableCell>MonthlyTax</TableCell>
                  <TableCell>MonthlyTotal</TableCell>
                  <TableCell>SuggestedPrice_RF</TableCell>
                  <TableCell>Variance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictedData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.SiteID}</TableCell>
                    <TableCell>{row.Type}</TableCell>
                    <TableCell>{row.dcWidth}</TableCell>
                    <TableCell>{row.dcLength}</TableCell>
                    <TableCell>{row.UnitSize}</TableCell>
                    <TableCell>{row.Area}</TableCell>
                    <TableCell>{row.MonthlyRatePerSF}</TableCell>
                    <TableCell>{row.PushRate}</TableCell>
                    <TableCell>{row.StandardRate}</TableCell>
                    <TableCell>{row.MonthlyTax}</TableCell>
                    <TableCell>{row.MonthlyTotal}</TableCell>
                    <TableCell>{row.SuggestedPrice_RF?.toFixed(2)}</TableCell>
                    <TableCell>{row.Variance?.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
}
