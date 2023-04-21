export interface ListProps {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  name: string;
}
