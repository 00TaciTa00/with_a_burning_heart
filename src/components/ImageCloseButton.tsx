type ImageCloseButtonProps = {
  dataModalTarget: string;
  dataModalToggle: string;
  onClick: () => void;
};

const ImageCloseButton = ({
  dataModalTarget,
  dataModalToggle,
  onClick,
}: ImageCloseButtonProps) => {
  return (
    <button
      type="button"
      data-modal-target={dataModalTarget}
      data-modal-toggle={dataModalToggle}
      className="absolute z-10 inline-flex items-center p-2 rounded-full right-1 top-1 hover:bg-slate-700 dark:hover:bg-slate-500 group"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6 text-slate-800 dark:group-hover:text-slate-800 dark:text-white group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    </button>
  );
};

export default ImageCloseButton;
