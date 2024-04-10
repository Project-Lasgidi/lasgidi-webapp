import { Metadata } from 'next';
import SubmitConferenceForm from '@/components/Conference/SubmitConferenceForm';

export const metadata: Metadata = {
  title: 'Submit Conference | Project Lasgidi',
};

export default function ConferenceSubmitPage() {
  return <SubmitConferenceForm />;
}
