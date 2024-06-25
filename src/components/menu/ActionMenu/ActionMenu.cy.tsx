import "@index.css";
import ActionMenu from "./ActionMenu";
import { ActionMenuItem } from "../items";
import { TestRouter } from "cypress/TestRouter.js";

describe("Menu Component", () => {
  const items: ActionMenuItem[] = [
    { label: <a>Item 1</a> },
    { label: <a>Item 2</a> },
    { label: "divider" },
    { label: <p>Item 3</p> },
  ];

  let target: HTMLDivElement | null;

  beforeEach(() => {
    target = document.createElement("div");
    document.body.appendChild(target);

    cy.mount(
      <TestRouter>
        <ActionMenu items={items} isOpen={true} target={target} />
      </TestRouter>
    );
  });

  afterEach(() => {
    document.body.removeChild(target!);
  });

  it("Renders menu items", () => {
    cy.get("a").contains("Item 1").should("be.visible");
    cy.get("a").contains("Item 2").should("be.visible");
    cy.get("p").contains("Item 3").should("be.visible");
  });

  it("Renders divider correctly", () => {
    cy.get("div").find("svg").should("exist");
  });

  it("Does not render menu when isOpen is false", () => {
    cy.mount(
      <TestRouter>
        <ActionMenu items={items} isOpen={false} target={target} />
      </TestRouter>
    );
    cy.contains("Item 1").should("not.exist");
    cy.contains("Item 2").should("not.exist");
    cy.contains("Item 3").should("not.exist");
  });
});
