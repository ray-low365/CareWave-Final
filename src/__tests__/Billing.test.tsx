import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { generateInvoiceNumber, getCurrentDateFor2025 } from '../utils/invoiceUtils';
import { generateInvoicePDF, exportToCSV } from '../utils/exportUtils';

// Mock window.open for PDF generation
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

// Mock document.createElement and URL.createObjectURL for CSV export
const mockCreateElement = vi.fn();
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();
const mockClick = vi.fn();
const mockCreateObjectURL = vi.fn();

vi.spyOn(document, 'createElement').mockImplementation(() => {
  return {
    setAttribute: vi.fn(),
    style: {},
    click: mockClick,
  } as unknown as HTMLElement;
});

vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);
vi.spyOn(URL, 'createObjectURL').mockImplementation(mockCreateObjectURL);

describe('Billing Module', () => {
  describe('Invoice Number Generation', () => {
    it('generates a random invoice number with correct format', () => {
      const invoiceNumber = generateInvoiceNumber();
      
      // Check format: INV-2025-XXXX where XXXX is alphanumeric
      expect(invoiceNumber).toMatch(/^INV-2025-[A-Z0-9]{4}$/);
    });
    
    it('generates unique invoice numbers', () => {
      const invoiceNumber1 = generateInvoiceNumber();
      const invoiceNumber2 = generateInvoiceNumber();
      
      expect(invoiceNumber1).not.toEqual(invoiceNumber2);
    });
  });
  
  describe('Date Functions', () => {
    it('returns a date in 2025', () => {
      const date = getCurrentDateFor2025();
      
      // Check that the date starts with 2025
      expect(date).toMatch(/^2025-/);
      
      // Check that it's a valid ISO date format (YYYY-MM-DD)
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
  
  describe('Export Functions', () => {
    const mockRecord = {
      id: '1',
      patientId: '1',
      patientName: 'Test Patient',
      amount: 150.00,
      paymentStatus: 'Paid',
      date: '2025-03-15',
      insuranceDetails: 'Test Insurance',
      invoiceNumber: 'INV-2025-TEST',
      services: ['Consultation', 'Test Service']
    };
    
    it('generates a PDF invoice', () => {
      generateInvoicePDF(mockRecord);
      
      // Check that window.open was called
      expect(mockOpen).toHaveBeenCalled();
    });
    
    it('exports billing records to CSV', () => {
      exportToCSV([mockRecord], 'test.csv');
      
      // Check that the necessary DOM operations were performed
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalled();
    });
  });
});
