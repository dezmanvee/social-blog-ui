import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/features/user/store/store";

//Configure stripe
const stripePromise = loadStripe("pk_test_51PLuDmIpWcgIoSDo5RjF1BIfEi9sCRYgJDgTLnz8ifu1nfff2VhYUfgk44pMO3GVrMurymIwmqctsHayDLrjqCmO0099k3QKZL")
const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd'
}
//instance of queryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Elements stripe={stripePromise} options={options}>
      <App />
      </Elements>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
