import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: 'Hello! How can I help you today?',
                },
              ],
            },
          },
        ],
      }),
    },
  })),
}));

jest.mock('react-markdown', () => (props) => {
  return <>{props.children}</>;
});

jest.mock('react-syntax-highlighter', () => ({
  Prism: (props) => {
    return <pre>{props.children}</pre>;
  },
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  a11yDark: {},
}));

jest.mock('remark-gfm', () => () => {});

test('renders chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Gemini AI Chat/i);
  expect(headerElement).toBeInTheDocument();
});
