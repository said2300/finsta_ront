import React from "react";
import { render } from "@testing-library/react";
import Index from "./index.page";

describe("Rend les bons elements", () => {
  test("Render le bon title", () => {
    const screen = render(<Index />);
    const title = screen.getByText("DÉCOUVREZ L'INSOLITE");
    expect(title).toBeInTheDocument();
  });
});
