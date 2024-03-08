import { render, screen } from "@testing-library/react";
import App from "./index";

test("renders app container", () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, Tailwind CSS!/i);
  expect(linkElement).toBeInTheDocument();
});
