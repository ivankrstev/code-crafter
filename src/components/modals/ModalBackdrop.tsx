"use client";
import { Fragment, useEffect } from "react";

export default function ModalBackdrop({
  children,
  closeModal,
}: {
  children?: React.ReactNode;
  closeModal: () => void;
}) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Fragment>
      <div
        id="modal-backdrop"
        className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-all"
        onClick={() => closeModal()}
      />
      <div className="fixed inset-0 left-1/2 top-1/2 z-50 flex h-fit w-fit max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all duration-500 dark:shadow-slate-600">
        {children}
      </div>
    </Fragment>
  );
}
