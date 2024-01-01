import classNames from '@/lib/classNames';
import { PropsWithChildren } from '@/types';

type Props = PropsWithChildren<{
  className?: string;
}>;

const Container = ({ children, className }: Props) => (
  <div className={classNames('mx-auto max-w-[1200px] px-4 xl:px-0', className)}>
    {children}
  </div>
);

export default Container;
