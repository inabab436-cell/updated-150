/**
 * Agent prompt module.
 *
 * All agent instructions (identity, voice, behaviour rules, persona, selling,
 * order/handoff/media/output/security guidance) have been removed on request.
 * Only the structural plumbing remains, so the rest of the code keeps working:
 * the section list is empty and the builder emits just the live data block.
 */

export type AgentPromptSection = {
  /** Stable id, used for ordering and for targeted edits. */
  id: string;
  /** Heading rendered into the prompt. */
  title: string;
  /** One rule per line. Rendered as a dash list. */
  rules: string[];
};

export const INVENTORY_SECTION_ID = "inventory";

/** Intentionally empty: no agent instructions are defined. */
export const AGENT_PROMPT_SECTIONS: AgentPromptSection[] = [];

/** Renders one section as a titled dash list. */
function renderSection(section: AgentPromptSection): string {
  const rules = section.rules.map((rule) => `- ${rule}`).join("\n");
  return `${section.title}\n${rules}`;
}

/**
 * Builds the prompt. With no sections defined, this returns only the live
 * inventory data block (or a pointer to the trailing snapshot).
 */
export function buildAgentPrompt(inventoryText?: string): string {
  const body = AGENT_PROMPT_SECTIONS.map(renderSection).join("\n\n");

  const inventory = inventoryText
    ? ["AVAILABLE PRODUCTS — live data", "<inventory>", inventoryText, "</inventory>"].join("\n")
    : "AVAILABLE PRODUCTS — read the single live <inventory> block in the trailing FRESH STORE SNAPSHOT.";

  return body ? `${body}\n\n${inventory}\n` : `${inventory}\n`;
}
