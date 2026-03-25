const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-app-bg opacity-80"></div>
          <div className="absolute top-[40%] left-[20%] bg-app-surface p-4 rounded-xl z-10 text-right border border-app-border">
            <button
              className="text-app-muted font-semibold hover:text-app-text focus:outline-none mr-2"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
