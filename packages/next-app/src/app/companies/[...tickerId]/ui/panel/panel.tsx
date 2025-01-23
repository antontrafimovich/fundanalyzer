import { CardContent, CardHeader } from "@/components/ui/card";

export type PanelProps = { children?: React.ReactNode };

const Panel = ({ children }: PanelProps) => {
  return <div className="flex flex-col h-full">{children}</div>;
};

type PanelHeaderProps = Parameters<typeof CardHeader>[0];

const PanelHeader = (props: PanelHeaderProps) => {
  return <CardHeader {...props}></CardHeader>;
};

type PanelContentProps = Parameters<typeof CardContent>[0];

const PanelContent = (props: PanelContentProps) => {
  return <CardContent {...props} />;
};

Panel.Header = PanelHeader;
Panel.Content = PanelContent;

export { Panel };
