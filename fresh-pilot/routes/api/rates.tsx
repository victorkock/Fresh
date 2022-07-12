/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

const API_KEY = "ujmKiBo5EGxyNSamNGY3LSC2tf9yF681";

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
  async GET(_, ctx) {
    const response = await fetch(`https://api.apilayer.com/fixer/latest?`, {
      method: "get",
      headers: {
        apiKey: API_KEY,
      },
    });
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
      <h1>{data.rates}</h1>
    </div>
  );
}
