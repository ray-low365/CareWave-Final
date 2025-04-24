/**
 * Utility functions for exporting data to different formats
 */
import { BillingRecord } from "@/types";
import { formatDate } from "./invoiceUtils";

/**
 * Generate a PDF invoice for a billing record
 * @param record The billing record to generate a PDF for
 */
export const generateInvoicePDF = (record: BillingRecord): void => {
  // Create a new window for the PDF
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the invoice');
    return;
  }

  // Format the date
  const formattedDate = formatDate(record.date);

  // Create the HTML content for the invoice
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${record.invoiceNumber}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .invoice-header h1 {
          color: #0ea5e9;
          margin-bottom: 5px;
        }
        .invoice-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .invoice-details div {
          flex: 1;
        }
        .invoice-details h3 {
          margin-bottom: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        th {
          background-color: #f9fafb;
        }
        .total {
          text-align: right;
          font-weight: bold;
          font-size: 18px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>CareWave Clinic Management System</h1>
        <p>Invoice #${record.invoiceNumber}</p>
      </div>
      
      <div class="invoice-details">
        <div>
          <h3>Bill To:</h3>
          <p><strong>Patient:</strong> ${record.patientName}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Status:</strong> ${record.paymentStatus}</p>
        </div>
        <div>
          <h3>Insurance Details:</h3>
          <p>${record.insuranceDetails || 'No insurance information provided'}</p>
        </div>
      </div>
      
      <h3>Services:</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${record.services?.map(service => `
            <tr>
              <td>${service}</td>
              <td>-</td>
            </tr>
          `).join('') || '<tr><td colspan="2">No services listed</td></tr>'}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${record.amount.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <div class="footer">
        <p>Thank you for choosing CareWave Clinic Management System</p>
        <p>For any inquiries, please contact billing@carewave.com</p>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  // Write the HTML to the new window and trigger print
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};

/**
 * Export billing records to CSV format
 * @param records The billing records to export
 * @param filename The name of the file to download
 */
export const exportToCSV = (records: BillingRecord[], filename: string = 'export.csv'): void => {
  // Define the CSV headers
  const headers = ['Invoice Number', 'Patient Name', 'Date', 'Amount', 'Status', 'Insurance Details'];
  
  // Convert records to CSV rows
  const rows = records.map(record => [
    record.invoiceNumber || '',
    record.patientName,
    record.date,
    record.amount.toFixed(2),
    record.paymentStatus,
    record.insuranceDetails || ''
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger the download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export data to PDF format
 * @param title The title of the PDF
 * @param content The HTML content to include in the PDF
 */
export const exportToPDF = (title: string, content: string): void => {
  // Create a new window for the PDF
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the PDF');
    return;
  }

  // Create the HTML content for the PDF
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        h1 {
          color: #0ea5e9;
          text-align: center;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        <p>Generated by CareWave Clinic Management System</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  // Write the HTML to the new window and trigger print
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
