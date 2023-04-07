import { useEffect, useState } from "react";
import './loadingButton.scss';

export const LoadingButton = ({
                                text,
                                callbackFn,
                                className,
                                ...props
                              }: {
  text: string,
  callbackFn: Function,
  className?: string,
  props?: any
}) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => {
      setLoading(false);
      callbackFn();
    }, 1500);
  }, [loading]);

  return (
      <button
          type={'submit'}
          className={'loading-button ' + (className || '')}
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
