import { Control, Search } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useApp from '@hooks/useApp';
import useNavigation from '@hooks/useNavigation';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useMemo, useState } from 'react';
import {
  FaArrowLeft,
  FaCheck,
  FaCopy,
  FaCross,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { RxCheck, RxCross1 } from 'react-icons/rx';
import cx from 'classnames';
import { initUrqlClient } from 'next-urql';
import { GetServerSidePropsContext } from 'next';
import { GetGroupById } from 'src/graphql/group/queries.graphql';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { Accordian } from 'pages/union';
import { Faq } from 'generated/graphql';
import { useForm } from 'react-hook-form';
import { Bottom } from '@components/primitive/Overlay';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateFaqMutation,
  DeleteFAQMutation,
  EditFAQMutation,
} from 'src/graphql/union/mutations.graphql';
import useModal from '@hooks/useModal';

const Faqs: NextPageWithLayout = (props: any) => {
  const schema = yup.object().shape({
    question: yup.string().required(),
    answer: yup.string().required(),
  });

  type FaqAction = 'EDIT' | 'CREATE';
  const [faqAction, setFaqAction] = useState<FaqAction>('CREATE');
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const { setActiveNavItem } = useNavigation();
  const { aGroup } = useApp();
  const { client } = useQueryHelpers();
  const router = useRouter();
  const [displayedFaqs, setDisplayedFaqs] = useState([]);
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { watch, register, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const searchValue = watch('search');
  const [ref, inView] = useInView();

  const faqs = useMemo(async () => {
    if (aGroup) {
      const res = await client
        ?.query(GetGroupById, { id: aGroup.id })
        .toPromise();
      const { data, error } = res;
      if (!error) {
        setDisplayedFaqs(data.FindGroupById.faqs);
        return data.FindGroupById.faqs;
      }
    } else {
      return [];
    }
  }, [aGroup, client]);

  useEffect(() => {
    const search = async () => {
      const f = await faqs;
      const filteredFaqs = f?.filter((faq: any) =>
        faq?.question.toLowerCase().includes(searchValue?.toLowerCase())
      );
      setDisplayedFaqs(filteredFaqs);
    };

    search();
  }, [searchValue, faqs]);

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleFAQ = async (data: any) => {
    if (aGroup) {
      let res;
      if (faqAction === 'CREATE') {
        res = await client
          ?.mutation(CreateFaqMutation, {
            unionId: aGroup.id,
            question: data.question,
            answer: data.answer,
          })
          .toPromise();
      } else {
        res = await client
          ?.mutation(EditFAQMutation, {
            faqId: selectedFaqId,
            question: data.question,
            answer: data.answer,
          })
          .toPromise();
      }
      if (!res.error) {
        router.reload();
      }
    }
  };

  const handleDeleteFAQ = (id: any) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: 'Are you sure you want to delete',
          action: () => confirm(),
        },
      })
    );
    const confirm = async () => {
      if (aGroup) {
        const res = await client
          ?.mutation(DeleteFAQMutation, {
            faqId: id,
          })
          .toPromise();
        if (!res.error) {
          router.reload();
        }
      }
    };
  };

  const handleOpenCreateFaq = async () => {
    setFaqAction('CREATE');
  };

  const handleOpenEditFaq = async (id: string) => {
    setFaqAction('EDIT');
    setSelectedFaqId(id);
    const f = await faqs;
    const targetFaq = f.find((faq: Faq) => faq.id === id);
    console.log('targetFaq, ', targetFaq);
    setTimeout(
      () => reset({ question: targetFaq.question, answer: targetFaq.answer }),
      10
    );
  };

  return (
    <>
      <div className="container-lg pt-16">
        <div className="flex justify-between">
          <h2 className="text-2xl inline-flex items-center space-x-2">
            <button onClick={() => handleBack()}>
              <FaArrowLeft className="text-positive" />
            </button>
            <span>Manage FAQs</span>
          </h2>
        </div>
      </div>
      <div className="bg-grey0 mt-16">
        <div className="container-lg min-h-[75vh] py-16 space-y-16">
          <Search placeholder="Search for team..." {...register('search')} />
          <ScrollableArea disabled>
            {displayedFaqs?.map((faq: Faq, i: number) => (
              <div className="flex items-center" key={i}>
                <Accordian
                  className="flex-1"
                  question={faq.question}
                  answer={faq.answer}
                />
                <div className="flex">
                  <label
                    tabIndex={0}
                    htmlFor="my-modal"
                    className="p-2 hover:text-positive"
                    onClick={() => {
                      handleOpenEditFaq(faq.id);
                    }}
                  >
                    <FaEdit />
                  </label>
                  <button
                    className="p-2 hover:text-red"
                    onClick={() => handleDeleteFAQ(faq.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </ScrollableArea>
          <div className="flex justify-end" ref={ref}>
            <label
              tabIndex={0}
              htmlFor="my-modal"
              className="inline-flex btn bg-black px-8 ml-auto"
            >
              Create FAQ
            </label>
          </div>
          {!inView && (
            <Bottom>
              <div className="flex justify-end">
                <label
                  tabIndex={0}
                  htmlFor="my-modal"
                  className="inline-flex btn bg-black px-8 ml-auto"
                  onClick={() => handleOpenCreateFaq()}
                >
                  Create FAQ
                </label>
              </div>
            </Bottom>
          )}
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            tabIndex={0}
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Control
            placeholder="How does..."
            label="Question"
            type="text"
            required
            {...register('question')}
          />
          <Control
            placeholder="It works by..."
            label="Answer"
            type="textarea"
            required
            {...register('answer')}
          />
          <div className="modal-action">
            <label
              tabIndex={0}
              htmlFor="my-modal"
              className="btn bg-black w-full"
              onClick={handleSubmit(handleFAQ)}
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

Faqs.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Faqs;
