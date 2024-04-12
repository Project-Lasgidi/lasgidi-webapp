import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Forms/Button';
import Image from 'next/image';

interface ISubmitSuccessModal {
  title?: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubmitSuccessModal = ({
  title = 'Thank you for your submission',
  content,
  isOpen,
  onClose,
  onSuccess,
}: ISubmitSuccessModal) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex h-3/4 items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all'>
                <div className='flex flex-col items-center gap-4 text-center'>
                  <Image
                    src='/images/submit-success-icon.png'
                    width={100}
                    height={100}
                    alt='Success icon'
                    className='aspect-square h-[50px] w-[50px]'
                  />
                  <div className='w-11/12'>
                    <h3 className='mb-1 text-lg font-bold'>{title}</h3>
                    <p className='whitespace-pre-line'>{content}</p>
                  </div>
                  <Button className='w-full' onClick={onSuccess}>
                    Okay
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
