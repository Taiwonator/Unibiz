import { ReactNode, useContext } from 'react';
import { ModalContext, ModalDispatch } from 'src/context/ModalContext';

const useModal = () => {
  const [state, setState] = useContext(ModalContext);

  const closeModal = () => {
    setState((state) => ({ ...state, open: false }));
  };

  const dispatchModal = (Component: ReactNode) => {
    setState((state) => ({ ...state, Component, open: true }));
  };

  interface ProceedOrCancel {
    prompt: string;
    action: (props?: any) => void;
  }

  interface ProceedOrCancelComponentProps {
    options: ProceedOrCancel;
  }

  const generateProceedOrCancelComponent: React.FC<
    ProceedOrCancelComponentProps
  > = ({ options }) => {
    return (
      <div className="space-y-4">
        <p>{options.prompt}</p>
        <div className="grid space-y-2 md:grid-flow-col md:space-x-2 md:space-y-0">
          <button
            className="btn bg-white text-black !border-2 border-solid hover:text-white"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="btn bg-black text-white"
            onClick={() => {
              closeModal();
              options.action();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    );
  };

  return {
    isModalOpen: state.open,
    Component: state.Component,
    closeModal,
    dispatchModal,
    generateProceedOrCancelComponent,
  };
};

export default useModal;
