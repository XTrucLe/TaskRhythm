export type CellProps = {
  value: string;
  onChange?: (newText: string) => void;
  editing?: boolean;
  onBlur?: () => void;
};
