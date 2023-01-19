import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("confirm total scoop order value after selection", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const scoopItems = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopItems).toHaveTextContent("0.00");

  const inputEl = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(inputEl);
  await user.type(inputEl, "1");
  expect(scoopItems).toHaveTextContent("2.00"); //since 1 vanilla scoop cost $2

  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopItems).toHaveTextContent("6.00"); //since 1 vanilla scoop cost $2
});

test("confirm total topping order value after selection", async () => {
    const user = userEvent.setup()
    render(<Options optionType="toppings"/>)

    const toppingItems = screen.getByText("Toppings total: $", { exact: false })
    expect(toppingItems).toHaveTextContent("0.00")

    const inputEl = await screen.findByRole("spinbutton", { name: "M&Ms" })
    await user.clear(inputEl)
    await user.type(inputEl, "1")
    expect(toppingItems).toHaveTextContent("2.00")
})
