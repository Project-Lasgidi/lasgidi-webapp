'use client';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ISubmitConferenceRequest,
  submitConferenceSchema,
} from '@/lib/submitSchema';
import { submitConference, uploadImages } from '@/actions/community';
import FormInput from '@/components/Forms/FormInput';
import Button from '@/components/Forms/Button';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormSelect from '@/components/Forms/FormSelect';
import { MicrophoneIcon } from '@/components/Icons';
import regions from '@/constants/regions';
import tools from '@/constants/tools';
import programmingLanguages from '@/constants/programmingLanguages';
import LogoPicker from '../Forms/LogoPicker';
import { ImagesPicker } from '../Forms/ImagesPicker';
import { toast } from 'react-toastify';
import { SubmitSuccessModal } from '../SubmitSuccessModal';

interface SubmitConferenceFormProps {}

enum Step {
  Personal = 'personal',
  Conference = 'conference',
}

const defaultValues = {
  fullName: '',
  email: '',
  conferenceEmail: '',
  title: '',
  description: '',
  visit_url: '',
  region: '',
  location: '',
  platforms: [],
  pictures: [],
  tool: '',
  language: '',
  logo: 0,
};

const SubmitConferenceForm = ({}: SubmitConferenceFormProps) => {
  const [step, setStep] = useState<Step>(Step.Personal);
  const [conferenceImages, setConferenceImages] = React.useState<File[]>([]);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };
  const handleOpenSuccessModal = () => {
    setOpenSuccessModal(true);
  };

  const methods = useForm<ISubmitConferenceRequest>({
    mode: 'onBlur',
    resolver: zodResolver(submitConferenceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    trigger,
    setValue,
    formState: { isValid, errors },
    handleSubmit,
  } = methods;

  const watchedFullName = watch('submitter_name');
  const watchedEmail = watch('submitter_email');
  const conferenceLogo = watch('logo');

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
    setConferenceImages([]);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const logoFormData = new FormData();
      logoFormData.append('files', conferenceLogo as File);
      const logoResponse = await uploadImages(logoFormData);
      const logo = logoResponse.data[0].id;

      const imagesFormData = new FormData();
      conferenceImages.forEach((file) => {
        imagesFormData.append('files', file);
      });
      const imagesResponse = await uploadImages(imagesFormData);
      const pictures = imagesResponse.data.map((image: any) => image.id);

      await submitConference({ ...data, logo, pictures });
      handleOpenSuccessModal();
    } catch (e) {
      const errorMsg = (e as any)?.data?.error || 'Error submitting conference';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      <SubmitSuccessModal
        content={`Your conference has been \nreceived and is being processed. You’ll be informed once its complete.`}
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
                <MicrophoneIcon />
                <h1 className='font-bold'>Submit a conference</h1>
              </div>

              <div className='mb-6 mt-4 flex flex-col gap-y-2'>
                <p>
                  We are very happy that you are considering sharing your
                  conference with us.
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
                onClick={() => setStep(Step.Conference)}
                className='w-full'
              >
                Next
              </Button>
            </>
          )}

          {step === Step.Conference && (
            <>
              <div className='mb-10 grid gap-y-6'>
                <LogoPicker
                  title='Conference logo'
                  onLogoChange={(logo) => {
                    setValue('logo', logo || 0);
                    trigger('logo');
                  }}
                />
                <FormInput
                  label='Conference name'
                  name='title'
                  placeholder='Acme Conference'
                />
                <FormInput
                  label='Conference email'
                  name='conferenceEmail'
                  placeholder='hello@conference-mail.com'
                />
                <FormInput
                  label='Conference website'
                  name='visit_url'
                  placeholder='https://website.com'
                />
                <FormTextArea
                  label='Conference description'
                  name='description'
                  placeholder='What is this conference about'
                />
                <FormSelect
                  label='Language (optional)'
                  subLabel='Which language is your conference built around?'
                  name='language'
                  placeholder='Select a language'
                  options={programmingLanguages.map((language) => ({
                    label: language,
                    value: language,
                  }))}
                />
                <FormSelect
                  label='Tool (optional)'
                  subLabel='Which tool is your conference built around?'
                  name='tool'
                  placeholder='Select a tool'
                  options={tools.map((tool) => ({
                    label: tool,
                    value: tool,
                  }))}
                />
                <FormSelect
                  label='Region'
                  subLabel='Where is your conference based?'
                  name='region'
                  placeholder='Select a region'
                  options={regions.map((region) => ({
                    label: region,
                    value: region,
                  }))}
                />
                <FormInput
                  label='Location'
                  subLabel='Where will this conference take place?'
                  name='location'
                  placeholder='Eg: Accra, Ghana'
                />

                <div>
                  <h1>Conference Images</h1>
                  <ImagesPicker
                    onImageChange={(conferenceImages) =>
                      setConferenceImages(conferenceImages)
                    }
                  />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  loading={isLoading}
                  className='w-full'
                  onClick={() => setStep(Step.Personal)}
                >
                  Previous
                </Button>
                <Button type='submit' loading={isLoading} className='w-full'>
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

export default SubmitConferenceForm;
