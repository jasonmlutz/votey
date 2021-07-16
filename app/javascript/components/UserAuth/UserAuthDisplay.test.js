// app/javascript/components/UserAuth/Register.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UserAuthDisplay from "./UserAuthDisplay"

let container = null;
beforeEach(() => {
  // setup a Dome element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

it("renders with correct DisplayTitle", () => {
  act(() => {
    render(<UserAuthDisplay auth_type="register" />, container);
  });
  expect(container.textContent).toContain("Register!");

  act(() => {
    render(<UserAuthDisplay auth_type="login" />, container);
  });
  expect(container.textContent).toContain("Welcome back!");
});
