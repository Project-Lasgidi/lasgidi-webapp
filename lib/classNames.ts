type ClsxProps = Array<string | boolean | undefined | null>;
export default function classNames(...classes: ClsxProps) {
  return classes
    .filter((name) => typeof name === 'string')
    .filter(Boolean)
    .join(' ');
}
