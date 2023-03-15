import cx from 'classnames';
import { ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
  id: string;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, id, open }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className={cx('modal', open && 'modal-open')}>
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
};

export default Modal;

{
  /* <label htmlFor="my-modal">Open Modal</label>

<Modal id="my-modal" open={false}>
    <p className="text-center">Hello there</p>
    <div className="divider" />
    <div className="flex justify-center gap-2">
        <button className="btn bg-black">Stay in Society</button>
        <button className="btn bg-red border-b-red">Leave Society</button>
    </div>
</Modal> */
}
