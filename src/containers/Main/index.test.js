import { render, screen } from "@testing-library/react";
import Main from "./index";

test("renders app container", () => {
  render(<Main />);
  const linkElement = screen.getByText(/Курс валют згідно НБУ/i);
  expect(linkElement).toBeInTheDocument();
});
