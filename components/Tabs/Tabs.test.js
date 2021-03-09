import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Tabs } from "./Tabs";
import { useRouter } from "next/router";

jest.mock("next/router");
beforeEach(()=>{
    useRouter.mockReturnValue({
        push: () => {},
      });
})
test("<Tabs /> matches snapshot", () => {
  const component = render(
    <Tabs initialTab={{ tab: "tab-3" }}>
      <div label="Tab 1">
        <h2>Title 1</h2>
        <p>Text 1</p>
      </div>
      <div label="Tab 2">
        <h2>Title 2</h2>
        <p>Text 2</p>
      </div>
      <div label="Tab 3">
        <h2>Title 3</h2>
        <p>Text 3</p>
      </div>
    </Tabs>
  );
  expect(component.container).toMatchSnapshot();
});

test("<Tabs /> renders without crashing", () => {
  const div = document.createElement("div");
  render(
    <Tabs initialTab={{ tab: "tab-3" }}>
      <div label="Tab 1">
        <h2>Title 1</h2>
        <p>Text 1</p>
      </div>
      <div label="Tab 2">
        <h2>Title 2</h2>
        <p>Text 2</p>
      </div>
      <div label="Tab 3">
        <h2>Title 3</h2>
        <p>Text 3</p>
      </div>
    </Tabs>,
    div
  );
});
test("Defaults to the first tab's content", () => {
  const div = document.createElement("div");
  const {getByTestId} = render(
    <Tabs>
      <div label="Tab 1">
        1
      </div>
      <div label="Tab 2">
        2
      </div>
      <div label="Tab 3">
        3
      </div>
    </Tabs>,
    div
  );
  const content = getByTestId("content");
  expect(content.textContent).toBe('1')
});
test("Can set a different tab as the initial state", () => {
    const div = document.createElement("div");
    const {getByTestId} = render(
      <Tabs initialTab={{ tab: "tab-3" }}>
        <div label="Tab 1">
          1
        </div>
        <div label="Tab 2">
          2
        </div>
        <div label="Tab 3">
          3
        </div>
      </Tabs>,
      div
    );
    const content = getByTestId("content");
    expect(content.textContent).toBe('3')
});
test("Click from one tab to the next", () => {
    const div = document.createElement("div");
    const {getByTestId, getByText} = render(
      <Tabs initialTab={{ tab: "tab-3" }}>
        <div label="Tab 1">
          1
        </div>
        <div label="Tab 4">
          4
        </div>
        <div label="Tab 3">
          3
        </div>
      </Tabs>,
      div
    );
    let content = getByTestId("content");
    expect(content.textContent).toBe('3')
    //differentiate the current tab
    const li = getByTestId('tab-3');
    expect(li).toHaveClass('current');
    //click on a new tab
    const differentTab = getByText('Tab 4');
    fireEvent.click(differentTab);
    const diffLi = getByTestId('tab-4');
    expect(diffLi).toHaveClass('current');
    content = getByTestId("content");
    expect(content.textContent).toBe('4')
});
