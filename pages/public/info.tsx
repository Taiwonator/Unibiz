import PublicLayout from '@components/layout/PublicLayout';
import { LoadingElement } from '@components/primitive/Loading';
import Image from 'next/image';
import { Accordian } from 'pages/union';
import { NextPageWithLayout } from 'pages/_app';

const Info: NextPageWithLayout = () => {
  return (
    <div>
      <div className="relative min-h-[320px] w-screen flex justify-center items-center">
        <Image
          src={
            'https://images.pexels.com/photos/2789781/pexels-photo-2789781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
          fill
          style={{
            objectFit: 'cover',
            zIndex: '-1',
            objectPosition: '50% 25%',
          }}
          alt="placeholder"
          className="grayscale"
        />
      </div>
      <div className="container-lg spacey-y-16 py-16">
        <h1 className="md:text-2xl md:mb-8">Frequently Asked Questions</h1>
        <div className="spacey-y-8">
          <Accordian
            question="How do I make a union"
            answer="Email user@gmail.com with a society union you would like created, and provide details to authenticate your identity"
          />
        </div>
      </div>
    </div>
  );
};

Info.getLayout = (page: any) => <PublicLayout>{page}</PublicLayout>;

export default Info;
