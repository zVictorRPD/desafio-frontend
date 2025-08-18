import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface IModalProps {
    title: string;
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}
export function Modal({ title, isOpen, onRequestClose, children }: IModalProps) {

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            bodyOpenClassName={"overflow-hidden"}
            className="relative w-full max-w-2xl mx-auto rounded-2xl bg-white p-5 md:p-12 shadow-xl outline-none"
            overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden"
            shouldCloseOnOverlayClick={true}
        >
            <div className="flex flex-col gap-6">
                <h2 className="font-bold text-2xl">{title}</h2>
                <hr className="border-b border-neutral-100" />
                {children}
            </div>
        </ReactModal>
    )
}