import '../auth.scss';
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useUrl } from "../../../hooks/useUrl";
import { useAuth } from "../../../hooks/useAuth";
import { LoadingButton } from "../../../components/loadingButton/LoadingButton";
import { usePopup } from "../../../hooks/popup/usePopup";

export const Auth = () => {
  const { parameters } = useUrl();
  const { popup } = usePopup();
  const { signIn, sendExtToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const signInAction = async () => {
    try {
      const response = await signIn(username, password);
      if (response.status === 200) {
        if (parameters['ext-token']) {
          await sendExtToken(parameters['ext-token']);
        }
      } else {
        return popup.error('Invalid username or password.');
      }
      redirect(parameters.redirect || "/"); // todo: think logic gate for signed in users and what to do after sign in
    } catch (e: any) {
      popup.error(e?.response?.data?.error || 'A network error occurred. Please try again.');
    }
  }

  return (
      <div className={'auth_container'}>
        <form
            onSubmit={handleSubmit}
            autoComplete={'new-password'}
        >
          <div className={'auth_container_form pt30 pb30 pl70 pr70'}>
            <div className={'auth_classic_container'}>

              <div className="did-floating-label-content input-group">
                <span className="input-group-prepend">
                    <div className="input-group-text">@</div>
                </span>
                <input
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete={'new-password'}
                />
                <label className="did-floating-label">username</label>
              </div>

              <div className="did-floating-label-content input-group mt20">
                <span className="input-group-prepend">
                    <div className="input-group-text"><img src="/password.svg" alt=""/></div>
                </span>
                <input
                    className="did-floating-input"
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete={'new-password'}
                />
                <label className="did-floating-label">password</label>
              </div>

              <LoadingButton
                  text={'Sign in'}
                  callbackFn={signInAction}
                  classes={['mt15']}
              />
              <p>Don't have an account? <a href={'/auth/register'}>Sign up</a></p>
            </div>
            <div className={'auth_social_container mt20'}>
              <button>
                <img src={'/brands/google.svg'} alt={'google'} className={'mr10'}/>
                Continue with Google
              </button>
              <button>
                <img src={'/brands/github.svg'} alt={'github'} className={'mr10'}/>
                Continue with Github
              </button>
            </div>
          </div>
        </form>
      </div>
  );
};
