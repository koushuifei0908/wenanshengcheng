import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 20, height: 20, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
};

export const PlusIcon = (props: IconProps) => <svg {...baseProps} {...props}><path d="M12 5v14M5 12h14" /></svg>;
export const SendIcon = (props: IconProps) => <svg {...baseProps} {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>;
export const StopIcon = (props: IconProps) => <svg {...baseProps} {...props}><rect x="7" y="7" width="10" height="10" rx="2" /></svg>;
export const CopyIcon = (props: IconProps) => <svg {...baseProps} {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
export const MenuIcon = (props: IconProps) => <svg {...baseProps} {...props}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
export const PenIcon = (props: IconProps) => <svg {...baseProps} {...props}><path d="m12 20 9-9-8-8-9 9-2 10Z" /><path d="m17 7-9 9M7 17l-3-3" /></svg>;
