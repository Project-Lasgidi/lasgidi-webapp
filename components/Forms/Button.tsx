import { classNames } from '@/lib';
import React, { ButtonHTMLAttributes } from 'react';
import { SpinnerIcon } from '../Icons';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        aria-pressed={active}
        disabled={disabled}
        className={classNames(
          'flex items-center justify-center rounded-3xl bg-black px-4 py-2 text-white',
          'transform cursor-pointer transition-colors duration-500 ease-in-out',
          'hover:bg-neutral-100 hover:text-black focus:outline-none',
          'disabled:cursor-not-allowed disabled:bg-black disabled:text-white disabled:opacity-50 disabled:transition-none',
          className
        )}
        {...rest}
      >
        {loading && <SpinnerIcon className='mr-2 animate-spin' />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
