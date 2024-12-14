import { useEffect } from "react";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";

let modal: ModalInterface | null = null;

const initializeModal = () => {
  if (typeof window !== "undefined") {
    // 모달 요소를 선택합니다.
    const $modalElement = document.querySelector(
      "#modalEl"
    ) as HTMLElement | null;
    if (!$modalElement) {
      throw new Error("Modal element not found"); // 모달 요소가 없으면 오류를 발생시킵니다.
    }

    // 모달 옵션을 설정합니다.
    const modalOptions: ModalOptions = {
      placement: "bottom-right", // 모달의 위치를 오른쪽 하단으로 설정합니다.
      backdrop: "dynamic", // 동적 배경을 사용합니다.
      backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40", // 배경 클래스 설정
      closable: true, // 모달을 닫을 수 있도록 설정합니다.
      onHide: () => {
        console.log("modal is hidden"); // 모달이 숨겨질 때 실행되는 함수
      },
      onShow: () => {
        console.log("modal is shown"); // 모달이 보여질 때 실행되는 함수
      },
      onToggle: () => {
        console.log("modal has been toggled"); // 모달이 토글될 때 실행되는 함수
      },
    };

    // 인스턴스 옵션을 설정합니다.
    const instanceOptions: InstanceOptions = {
      id: "modalEl", // 모달 요소의 ID를 설정합니다.
      override: true, // 기존 인스턴스를 덮어씁니다.
    };

    // 모달 인스턴스를 생성합니다.
    modal = new Modal($modalElement, modalOptions, instanceOptions);
  }
};

// 모달을 표시하는 함수
export const showModal = () => {
  if (modal) {
    modal.show();
  }
};

// 모달 초기화를 위한 컴포넌트
const ImageDeleteModal = () => {
  useEffect(() => {
    initializeModal();
  }, []);

  return null;
};

export default ImageDeleteModal;
