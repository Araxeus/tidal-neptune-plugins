import { html } from "@neptune/voby";

type DivWithTooltipProps = { children?: unknown; tooltip?: string };
export const DivWithTooltip = ({ children, tooltip }: DivWithTooltipProps) => html`
	<div style="margin-bottom: 15px;display: flex;justify-content: space-between;align-items: center;" title="${tooltip}">${children}</div>
`;
