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

interface SubmitCommunityFormProps {}

enum Step {
  Personal = 'personal',
  Community = 'community',
}

const defaultValues = {
  fullName: '',
  email: '',
  title: '',
  description: '',
  visit_url: '',
  region: '',
  platforms: '',
  tool: '',
  language: '',
  logo: 0,
};

const SubmitCommunityForm = ({}: SubmitCommunityFormProps) => {
  const [step, setStep] = useState<Step>(Step.Personal);
  const [communityLogo, setCommunityLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<ISubmitCommunityRequest>({
    mode: 'onBlur',
    resolver: zodResolver(submitCommunitySchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isValid, errors },
    handleSubmit,
  } = methods;
  const stepOneValid = !errors.fullName && !errors.email;

  const resetForm = () => {
    reset();
    setStep(Step.Personal);
    setCommunityLogo(null);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('files', communityLogo!);
      const logoResponse = await uploadImages(formData);
      const logo = logoResponse.data[0].id;

      await submitCommunity({ ...data, logo });
      resetForm();
    } catch (error) {
      console.error((error as any)?.data?.error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='pb-10'>
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
                name='fullName'
                placeholder='Full name'
              />
              <FormInput
                label='Your personal email'
                name='email'
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
                onLogoChange={(logo) => setCommunityLogo(logo)}
              />
              <FormInput
                label='Community name'
                name='title'
                placeholder='Acme Community'
              />
              <FormInput
                label='Community email'
                name='email'
                placeholder='hello@community-mail.com'
              />
              <FormInput
                label='Community website'
                name='visit_url'
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
            <Button
              type='submit'
              loading={isLoading}
              disabled={!isValid || !communityLogo || isLoading}
              className='w-full'
            >
              Submit
            </Button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default SubmitCommunityForm;
