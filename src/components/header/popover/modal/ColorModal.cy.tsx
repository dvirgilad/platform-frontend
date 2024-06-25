import "@index.css";
import ColorModal from "./ColorModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Card Component", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    const setShowModal = cy.stub().as("setShowModal");
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ColorModal setShowModal={setShowModal} />
      </QueryClientProvider>
    );
  });

  it("displays svg icons correctly", () => {
    cy.get("svg").should("exist");
  });

  it("displays buttons", () => {
    cy.get("button").should("have.text", "Save ChangesClose");
  });
});
