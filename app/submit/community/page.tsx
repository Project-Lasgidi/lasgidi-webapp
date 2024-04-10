import SubmitCommunityForm from '@/components/Community/SubmitCommunityForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Community | Project Lasgidi',
};

export default function CommunitySubmitPage() {
  return <SubmitCommunityForm />;
}
