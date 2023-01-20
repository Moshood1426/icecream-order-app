import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  //render app
  const { unmount } = render(<App />);

  //add ice cream scoops and toppings
  const scoopItem = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(scoopItem);
  await user.type(scoopItem, "2");

  const toppingsItem = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(toppingsItem);

  //find and click order button
  const orderBtn = screen.getByRole("button", { name: "Order Sundae!" });
  await user.click(orderBtn);

  //check summary info based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("1 Cherries")).toBeInTheDocument();

  //accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditions);

  const confirmOrderBtn = screen.getByRole("button", {
    name: "Confirm order",
  });
  await user.click(confirmOrderBtn);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click new order on button confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderBtn);


  //check subtotal to confirm reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  unmount();
});
