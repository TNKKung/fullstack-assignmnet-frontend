import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

describe("<App />", () => {
  it("should have tab All Ticket", () => {
    render(<App />);
    expect(screen.getByText(/All Ticket/i)).toBeInTheDocument();
  });

  it("should have tab Board By Status", () => {
    render(<App />);
    expect(screen.getByText(/Board By Status/i)).toBeInTheDocument();
  });

  it("should have create button ticket", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: /Create Ticket/ })
    ).toBeInTheDocument();
  });
});
