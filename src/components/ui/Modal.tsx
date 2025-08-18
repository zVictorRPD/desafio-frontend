import { TrashIcon } from 'lucide-react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface IModalProps {
    title: string;
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}

interface IDeleteModalProps extends IModalProps {
    deleteEntity: string;
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

export function DeleteModal({ title, isOpen, onRequestClose, children, deleteEntity }: IDeleteModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            bodyOpenClassName={"overflow-hidden"}
            className="relative w-full max-w-xl mx-auto rounded-2xl bg-white p-5 md:p-12 shadow-xl outline-none"
            overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden"
            shouldCloseOnOverlayClick={true}
        >
            <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <div className='rounded-full p-4 border-2 border-danger'>
                        <TrashIcon className="w-11 h-11 text-danger mx-auto" />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-2xl text-center">{title}</h2>
                    <div>
                        <p className="text-center">Tem certeza que deseja excluir essa {deleteEntity}?</p>
                        <p className="text-center">Esta ação não poderá ser desfeita.</p>
                    </div>
                </div>
                {children}
            </div>
        </ReactModal>
    )
}