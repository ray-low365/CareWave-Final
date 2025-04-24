import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AreaChart from '../components/dashboard/AreaChart';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';

// Mock the recharts library
vi.mock('recharts', () => {
  const OriginalModule = vi.importActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    AreaChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="area-chart">{children}</div>
    ),
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    PieChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="pie-chart">{children}</div>
    ),
    Area: () => <div data-testid="area" />,
    Bar: () => <div data-testid="bar" />,
    Pie: () => <div data-testid="pie" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Cell: () => <div data-testid="cell" />,
  };
});

describe('Chart Components', () => {
  describe('AreaChart', () => {
    const mockData = [
      { month: 'Jan', visits: 45 },
      { month: 'Feb', visits: 52 },
      { month: 'Mar', visits: 49 },
    ];

    it('renders with simplified data', () => {
      render(
        <AreaChart
          title="Test Area Chart"
          data={mockData}
          xKey="month"
          yKey="visits"
          description="Test description"
        />
      );

      // Check that the chart renders with the correct title
      expect(screen.getByText('Test Area Chart')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      
      // Check that the chart components are rendered
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
      expect(screen.getByTestId('area-chart')).toBeInTheDocument();
      expect(screen.getByTestId('area')).toBeInTheDocument();
    });
  });

  describe('BarChart', () => {
    const mockData = [
      { department: 'Cardiology', patients: 25 },
      { department: 'Pediatrics', patients: 18 },
      { department: 'Neurology', patients: 15 },
      { department: 'Orthopedics', patients: 12 },
      { department: 'General Medicine', patients: 30 },
      { department: 'Dermatology', patients: 10 },
    ];

    it('renders with simplified data and shows top 5 message', () => {
      render(
        <BarChart
          title="Test Bar Chart"
          data={mockData}
          xKey="department"
          yKey="patients"
          description="Test description"
        />
      );

      // Check that the chart renders with the correct title
      expect(screen.getByText('Test Bar Chart')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      
      // Check that the top 5 message is displayed
      expect(screen.getByText('Showing top 5 items')).toBeInTheDocument();
      
      // Check that the chart components are rendered
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar')).toBeInTheDocument();
    });
  });

  describe('PieChart', () => {
    const mockData = [
      { name: 'Cardiology', value: 25 },
      { name: 'Pediatrics', value: 18 },
      { name: 'Neurology', value: 15 },
      { name: 'Orthopedics', value: 12 },
      { name: 'General Medicine', value: 30 },
    ];

    it('renders with simplified data and shows top 4 message', () => {
      render(
        <PieChart
          title="Test Pie Chart"
          data={mockData}
          description="Test description"
        />
      );

      // Check that the chart renders with the correct title
      expect(screen.getByText('Test Pie Chart')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      
      // Check that the top 4 message is displayed
      expect(screen.getByText('Showing top 4 categories')).toBeInTheDocument();
      
      // Check that the chart components are rendered
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      expect(screen.getByTestId('pie')).toBeInTheDocument();
    });
  });
});
