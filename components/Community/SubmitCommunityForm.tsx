'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ISubmitCommunityRequest,
  submitCommunitySchema,
} from '@/lib/submitSchema';
import { submitCommunity, uploadImages } from '@/actions/community';
import FormInput from '@/components/Forms/FormInput';
import Button from '@/components/Forms/Button';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormSelect from '@/components/Forms/FormSelect';
import { CommunityIcon } from '@/components/Icons';
import regions from '@/constants/regions';
import tools from '@/constants/tools';
import programmingLanguages from '@/constants/programmingLanguages';
import LogoPicker from '../Forms/LogoPicker';
import { toast } from 'react-toastify';
import { SubmitSuccessModal } from '../SubmitSuccessModal';

interface SubmitCommunityFormProps {}

enum Step {
  Personal = 'personal',
  Community = 'community',
}

const defaultValues = {
  submitter_name: '',
  submitter_email: '',
  community_email: '',
  name: '',
  description: '',
  website: '',
  region: '',
  platforms: '',
  tool: '',
  language: '',
  logo: 0,
};

const SubmitCommunityForm = ({}: SubmitCommunityFormProps) => {
  const [step, setStep] = useState<Step>(Step.Personal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };
  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(true);
  };

  const methods = useForm<ISubmitCommunityRequest>({
    mode: 'onBlur',
    resolver: zodResolver(submitCommunitySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = methods;

  const watchedFullName = watch('submitter_name');
  const watchedEmail = watch('submitter_email');
  const communityLogo = watch('logo');

  const isValidFullName = watchedFullName?.trim().length > 0;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);

  const stepOneValid =
    isValidFullName &&
    isValidEmail &&
    !errors.submitter_name &&
    !errors.submitter_email;

  const resetForm = () => {
    reset();
    setStep(Step.Personal);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('files', communityLogo as File);
      const logoResponse = await uploadImages(formData);
      const logo = logoResponse.data[0].id;

      await submitCommunity({ ...data, logo });
      handleOpenSuccessModal();
    } catch (e) {
      const errorMsg = (e as any)?.data?.error || 'Error submitting community';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      <SubmitSuccessModal
        content={`Your community has been \nreceived and is being processed. You’ll be informed once its complete.`}
        isOpen={openSuccessModal}
        onClose={handleCloseSuccessModal}
        onSuccess={() => {
          resetForm();
          handleCloseSuccessModal();
        }}
      />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          {step === Step.Personal && (
            <>
              <div className='flex gap-2'>
                <CommunityIcon />
                <h1 className='font-bold'>Submit a community</h1>
              </div>

              <div className='mb-6 mt-4 flex flex-col gap-y-2'>
                <p>
                  We are very happy that you are considering sharing your
                  community with us.
                </p>
                <p>Please fill the form below and we’ll take it from there.</p>
              </div>

              <div className='mb-10 grid gap-y-6'>
                <FormInput
                  label='Your name'
                  name='submitter_name'
                  placeholder='Full name'
                />
                <FormInput
                  label='Your personal email'
                  name='submitter_email'
                  type='email'
                  placeholder='you@mail.com'
                />
              </div>
              <Button
                type='button'
                disabled={!stepOneValid}
                onClick={() => setStep(Step.Community)}
                className='w-full'
              >
                Next
              </Button>
            </>
          )}

          {step === Step.Community && (
            <>
              <div className='mb-10 grid gap-y-6'>
                <LogoPicker
                  title='Community logo'
                  error={errors['logo']?.message}
                  onLogoChange={(logo) => {
                    setValue('logo', logo || 0);
                    trigger('logo');
                  }}
                />
                <FormInput
                  label='Community name'
                  name='name'
                  placeholder='Acme Community'
                />
                <FormInput
                  label='Community email'
                  name='community_email'
                  placeholder='hello@community-mail.com'
                />
                <FormInput
                  label='Community website'
                  name='website'
                  placeholder='https://website.com'
                />
                <FormTextArea
                  label='Community description'
                  name='description'
                  placeholder='What is this community about'
                />
                <FormSelect
                  label='Language (optional)'
                  subLabel='Which language is your community built around?'
                  name='language'
                  placeholder='Select a language'
                  options={programmingLanguages.map((language) => ({
                    label: language,
                    value: language,
                  }))}
                />
                <FormSelect
                  label='Tool (optional)'
                  subLabel='Which tool is your community built around?'
                  name='tool'
                  placeholder='Select a tool'
                  options={tools.map((tool) => ({
                    label: tool,
                    value: tool,
                  }))}
                />
                <FormSelect
                  label='Location'
                  subLabel='Where is your community based?'
                  name='region'
                  placeholder='Select a region'
                  options={regions.map((region) => ({
                    label: region,
                    value: region,
                  }))}
                />
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  className='w-full'
                  onClick={() => setStep(Step.Personal)}
                >
                  Previous
                </Button>
                <Button
                  type='submit'
                  disabled={isLoading}
                  loading={isLoading}
                  className='w-full'
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default SubmitCommunityForm;
