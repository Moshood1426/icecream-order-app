import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial render", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitBtn = screen.getByRole("button", { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(submitBtn).toBeDisabled();
});

test("Checks if checkbox disabled button when checked", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const submitBtn = screen.getByRole("button", { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(submitBtn).toBeEnabled();

  fireEvent.click(checkbox);
  expect(submitBtn).toBeDisabled();
});
