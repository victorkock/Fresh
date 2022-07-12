/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

const API_KEY = "14p3jMbA8qFeOmOeeqv8AjKFksVMO9O4";

interface Rates {
  code: number;
}

interface Currency {
  timestamp: number;
  base: string;
  date: string;
  rates: [Rates];
}

export const handler: Handlers<Currency | null> = {
  async GET(request, ctx) {
    const { base, symbols } = ctx.params;
    const response = await fetch(
      `https://api.apilayer.com/fixer/latest?access_base=${base}&symbols=${symbols}`,
      {
        method: "get",
        headers: {
          apiKey: API_KEY,
        },
      }
    );
    if (response.status === 404) {
      return ctx.render(null);
    }
    const currency: Currency = await response.json();
    return ctx.render(currency);
  },
};

export default function CurrencyRates({ data }: PageProps<Currency | null>) {
  if (!data) {
    return <h1>Couldn't fetch rates</h1>;
  }

  return (
    <div>
      <h1>Base {data.base}</h1>
      <h1>Date {data.date}</h1>
      <h1>Timestamp {data.timestamp}</h1>
      <h1>{data}</h1>
    </div>
  );
}
