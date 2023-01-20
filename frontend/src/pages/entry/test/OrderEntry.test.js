import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

test("confirm grand total", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);

  const totalValue = screen.getByRole("heading", { name: /^Grand total:/i });
  expect(totalValue).toHaveTextContent("0");

  const scoopEntry = await screen.findByRole("spinbutton", {
    name: /^Chocolate/i,
  });
  await user.clear(scoopEntry);
  await user.type(scoopEntry, "1");
  expect(totalValue).toHaveTextContent("2");

  const toppingsEntry = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(toppingsEntry);
  expect(totalValue).toHaveTextContent("3.5");

  await user.click();
  expect(totalValue).toHaveTextContent("2");
});
