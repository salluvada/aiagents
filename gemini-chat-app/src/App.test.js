import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockResolvedValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => 'Hello! How can I help you today?',
        },
      }),
    }),
  })),
}));

test('renders chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Gemini AI Chat/i);
  expect(headerElement).toBeInTheDocument();
});
