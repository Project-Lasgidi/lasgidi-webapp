import { classNames } from '@/lib';
import React, { ButtonHTMLAttributes } from 'react';
import { SpinnerIcon } from '../Icons';

const variants = {
  primary:
    'bg-black text-white hover:bg-neutral-100 hover:text-black disabled:bg-black disabled:text-white',
  secondary:
    'bg-neutral-100 text-black hover:bg-black hover:text-white disabled:bg-white disabled:text-black',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  variant?: keyof typeof variants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      active,
      loading = false,
      disabled = false,
      variant = 'primary',
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        aria-pressed={active}
        disabled={disabled}
        className={classNames(
          'flex items-center justify-center rounded-3xl px-4 py-2',
          'transform cursor-pointer transition-colors duration-500 ease-in-out',
          'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:transition-none',
          variants[variant],
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
