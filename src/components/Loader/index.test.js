import { render, screen } from "@testing-library/react";
import Loader from "./index";

test("renders loader success", () => {
  render(<Loader />);
  const linkElement = screen.getByLabelText(/loader/i);
  expect(linkElement).toBeInTheDocument();
});
