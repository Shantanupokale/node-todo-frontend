
const Modal = ({
    isOpen, onClose, title, children , onConfirm , confirmText = "Confirm", cancelText = "Cancel",}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     <div className="absolute inset-0 bg-black/5 " onClick={onClose} />

    {/* modalbox */}
    <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6 z-10">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="mb-6 text-gray-600">
        {children}
    </div>
    <div className="flex justify-end gap-3">

        <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100" >
        {cancelText}
        </button>

        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
        {confirmText}
        </button>

    </div>
   </div>
 </div>
  );
};

export default Modal;