import React from "react";
import Connexion from "../index.page";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Page connexion", () => {
  describe("Should render the screen", () => {
    test("Should render title", () => {
      const screen = render(<Connexion />);
      const title = screen.getByText(
        "Connectez vous pour accéder à votre compte"
      );
      expect(title).toBeInTheDocument();
    });
    test("Should render input email, input password and button connection", () => {
      const { getByPlaceholderText, getByRole } = render(<Connexion />);

      const inputEmail = getByPlaceholderText("Entrer votre adresse email");
      const inputPassword = getByPlaceholderText("Entrer votre mot de passe");
      const buttonConnection = getByRole("button", { name: "Connexion" });

      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(buttonConnection).toBeInTheDocument();
    });
  });
  describe("Test the functionnality", () => {
    it("Should display matching error when email is invalid", async () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <Connexion />
      );

      const inputEmail = getByPlaceholderText("Entrer votre adresse email");
      const inputPassword = getByPlaceholderText("Entrer votre mot de passe");
      const buttonConnection = getByRole("button", { name: "Connexion" });

      await act(async () => {
        fireEvent.change(inputEmail, {
          target: { value: "test@gmai" },
        });

        fireEvent.change(inputPassword, {
          target: { value: "azerty" },
        });
      });

      await act(async () => {
        fireEvent.click(buttonConnection);
      });

      expect(
        getByText("Entrez une email au format valide.")
      ).toBeInTheDocument();
    });

    it("Should display matching error when password is invalid", async () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <Connexion />
      );

      const inputEmail = getByPlaceholderText("Entrer votre adresse email");
      const inputPassword = getByPlaceholderText("Entrer votre mot de passe");
      const buttonConnection = getByRole("button", { name: "Connexion" });

      await act(async () => {
        fireEvent.change(inputEmail, {
          target: { value: "test@gmail.com" },
        });

        fireEvent.change(inputPassword, {
          target: { value: "aze" },
        });
      });

      await act(async () => {
        fireEvent.click(buttonConnection);
      });

      expect(
        getByText("La longueur du mot de passe doit etre supérieur a 5")
      ).toBeInTheDocument();
    });

    test("Should call http request api to get token", async () => {
      const mockOnSubmit = jest.fn();
      const { getByPlaceholderText, getByRole } = render(<Connexion />);

      const inputEmail = getByPlaceholderText("Entrer votre adresse email");
      const inputPassword = getByPlaceholderText("Entrer votre mot de passe");
      const buttonConnection = getByRole("button", { name: "Connexion" });

      await act(async () => {
        fireEvent.change(inputEmail, {
          target: { value: "test@gmail.com" },
        });

        fireEvent.change(inputPassword, {
          target: { value: "azerty" },
        });
      });

      await act(async () => {
        fireEvent.click(buttonConnection);
      });
      //   expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
