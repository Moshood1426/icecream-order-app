import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("confirm total scoop order value after selection", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, {
    wrapper: OrderDetailsProvider,
  });

  const scoopItems = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopItems).toHaveTextContent("0.00");

  const inputEl = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(inputEl);
  await user.type(inputEl, "1");
  expect(scoopItems).toHaveTextContent("2.00"); //since 1 vanilla scoop cost $2

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopItems).toHaveTextContent("6.00"); //since 1 vanilla scoop cost $2
});

test("confirm total topping order value after selection", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />, {
    wrapper: OrderDetailsProvider,
  });

  const toppingItems = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingItems).toHaveTextContent("0.00");

  const mInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mInput)
  expect(toppingItems).toHaveTextContent("1.50");

  const cherrieInput = await screen.findByRole("checkbox", { name: "Cherries" });
  await user.click(cherrieInput)
  expect(toppingItems).toHaveTextContent("3.00");

  await user.click(mInput)
  expect(toppingItems).toHaveTextContent("1.50");
});
