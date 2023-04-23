import React, { useEffect, useState } from "react";
import './loadingButton.scss';

export const LoadingButton = ({
                                text,
                                callbackFn,
                                immediatelyDo,
                                className,
                                disabled,
                                ...props
                              }: {
  text: string,
  callbackFn: Function,
  immediatelyDo?: Function,
  className?: string,
  disabled?: boolean,
  props?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    if (immediatelyDo) {
      immediatelyDo();
    }
    setTimeout(() => {
      setLoading(false);
      callbackFn();
    }, 1500);
  }, [loading]);

  return (
      <button
          type={'submit'}
          className={'loading-button ' + (className || '')}
          disabled={disabled}
          onClick={() => {
            setLoading(true);
          }}
          {...props}
      >
        <div className={'spinning'}>
          <img
              className={(loading ? 'visible' : 'hidden')}
              src="/loading.svg"
              alt=""
          />
        </div>
        <span
            style={{
              color: 'black',
              lineHeight: 'unset',
            }}
            className={loading ? 'hidden' : 'visible'}
        >
                  {text}
                </span>
      </button>
  );
};
