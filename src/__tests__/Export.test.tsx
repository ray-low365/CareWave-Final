import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the export utilities
vi.mock('../utils/exportUtils', () => ({
  generateInvoicePDF: vi.fn(),
  exportToCSV: vi.fn(),
  exportToPDF: vi.fn(),
}));

// Import after mocking
import { generateInvoicePDF, exportToCSV, exportToPDF } from '../utils/exportUtils';
import Billing from '../pages/Billing';

// Mock the API services
vi.mock('../services/api', () => ({
  BillingService: {
    getAll: vi.fn().mockResolvedValue([
      {
        id: '1',
        patientId: '1',
        patientName: 'Test Patient',
        amount: 150.00,
        paymentStatus: 'Paid',
        date: '2025-03-15',
        insuranceDetails: 'Test Insurance',
        invoiceNumber: 'INV-2025-TEST',
        services: ['Consultation', 'Test Service']
      }
    ]),
    update: vi.fn().mockResolvedValue({}),
  }
}));

describe('Export Functionality', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    
    // Reset mocks
    vi.clearAllMocks();
  });
  
  describe('Billing Page', () => {
    it('renders export button when records are available', async () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Billing />
          </QueryClientProvider>
        </BrowserRouter>
      );
      
      // Wait for data to load
      const exportButton = await screen.findByText('Export');
      expect(exportButton).toBeInTheDocument();
    });
    
    it('calls exportToCSV when export button is clicked', async () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Billing />
          </QueryClientProvider>
        </BrowserRouter>
      );
      
      // Wait for data to load
      const exportButton = await screen.findByText('Export');
      fireEvent.click(exportButton);
      
      // Find and click the CSV export option
      const csvOption = await screen.findByText('Export to CSV');
      fireEvent.click(csvOption);
      
      // Check that exportToCSV was called
      expect(exportToCSV).toHaveBeenCalled();
    });
    
    it('calls generateInvoicePDF when download button is clicked', async () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Billing />
          </QueryClientProvider>
        </BrowserRouter>
      );
      
      // Wait for data to load
      const downloadButton = await screen.findByText('Download Invoice');
      fireEvent.click(downloadButton);
      
      // Check that generateInvoicePDF was called
      expect(generateInvoicePDF).toHaveBeenCalled();
    });
  });
});
