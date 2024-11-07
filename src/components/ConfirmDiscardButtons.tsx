import Image from "next/image";
import { Fragment } from "react";

export default function ConfirmDiscardButtons({
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  autoFocus,
}: {
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
}) {
  return (
    <Fragment>
      <button
        className="mx-1 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
        title={confirmText}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onConfirm();
        }}
        autoFocus={autoFocus}
      >
        <span className="sr-only">{confirmText}</span>
        <Image
          className="filter-green"
          src="/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
          alt={confirmText}
          width={20}
          height={20}
        />
      </button>
      <button
        className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400"
        title={cancelText}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onCancel();
        }}
      >
        <span className="sr-only">{cancelText}</span>
        <Image
          className="filter-red"
          src="/icons/close_FILL0_wght400_GRAD0_opsz24.svg"
          alt={cancelText}
          width={20}
          height={20}
        />
      </button>
    </Fragment>
  );
}
