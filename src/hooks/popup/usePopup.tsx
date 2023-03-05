import React, { useEffect } from "react";
import './popup.scss';

const defaultTimeout = 3000;

const popupContext = React.createContext<{
  popup: {
    info: (message: string, timeout?: number) => void;
    error: (message: string, timeout?: number) => void;
    success: (message: string, timeout?: number) => void;
    warning: (message: string, timeout?: number) => void;
  }
}>(undefined!);

export const ProvidePopup = ({ children }: { children: any }) => {
  const popup = useProvidePopup();
  return <popupContext.Provider value={popup}>{
    (
      <>
        {children}
        <div className={'popup_parent'}>
          <div className={'popup_alert'}>
            <div className={'popup_image'}></div>
            <span className={'popup_text'}>
            </span>
          </div>
        </div>
      </>
    )
  }</popupContext.Provider>;
};

export const usePopup = () => {
  return React.useContext(popupContext);
}

function useProvidePopup() {
  useEffect(() => {
    const popupAlert = document.getElementsByClassName('popup_alert')[0];
    popupAlert.classList.add('display_none');
  }, [])
  const removeAllClasses = (element: Element) => {
    let index = 0;

    while (index < element.classList.length) {

      const firstClass = element.classList.item(index);
      // if firstClass begins with popup_, ignore it
      if (firstClass && firstClass.startsWith('popup_')) {
        index++;
        continue;
      }

      element.classList.remove(firstClass!);
      index++;
    }
  }

  const showPopup = (message: string, timeout?: number) => {
    const popupAlert = document.getElementsByClassName('popup_alert')[0];
    const popupText = document.getElementsByClassName('popup_text')[0];
    popupText.innerHTML = message;

    popupAlert.classList.remove('popup_close_event', 'display_none');
    popupAlert.classList.add('popup_show_event');

    setTimeout(() => {
      popupAlert.classList.remove('popup_show_event');
      popupAlert.classList.add('popup_close_event');

    }, timeout || defaultTimeout);
  }

  const replaceCategory = (category: string) => {
    const popupAlert = document.getElementsByClassName('popup_alert')[0];
    removeAllClasses(popupAlert);

    const popupImage = document.getElementsByClassName('popup_image')[0];
    removeAllClasses(popupImage);

    popupAlert.classList.add(category);
    popupImage.classList.add(category);
  }

  const info = (message: string, timeout?: number) => {
    replaceCategory('info');
    showPopup(message, timeout);
  };

  const error = (message: string, timeout?: number) => {
    replaceCategory('error');
    showPopup(message, timeout);
  };
  const success = (message: string) => {
    replaceCategory('success');
    showPopup(message);
  };
  const warning = (message: string) => {
    replaceCategory('warning');
    showPopup(message);
  };

  return {
    popup: {
      info,
      error,
      success,
      warning,
    }
  }
}
