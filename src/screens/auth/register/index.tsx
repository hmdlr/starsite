import '../auth.scss';
import './register.scss';
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { LoadingButton } from "../../../components/loadingButton/LoadingButton";
import { usePopup } from "../../../hooks/popup/usePopup";
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const { signUp } = useAuth();
  const { popup } = usePopup();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const signUpAction = async () => {
    try {
      const response = await signUp(
          username,
          name,
          password,
          email
      );

      if (response.status !== 201) {
        return popup.error(response.data.message);
      }
      popup.success("Account created successfully. You may now log in.");
      navigate("/auth");
    } catch (e: any) {
      popup.error(e?.response?.data?.error || 'A network error occurred. Please try again.');
    }
  };

  return (
      <div className={'auth_container'}>
        <form
            onSubmit={handleSubmit}
            autoComplete={'new-password'}
        >
          <div className={'auth_container_form pt30 pb30 pl70 pr70'}>
            <div className={'auth_classic_container'}>
              {/* email */}
              <div className="did-floating-label-content input-group">
                <span className="input-group-prepend">
                    <div className="input-group-text"><img src="/mail.svg" alt=""/></div>
                </span>
                <input
                    className="did-floating-input"
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete={'new-password'}
                />
                <label className="did-floating-label">email</label>
              </div>

              {/* name */}
              <div className="did-floating-label-content input-group mt20">
                <span className="input-group-prepend">
                    <div className="input-group-text"><img src="/account_circle.svg" alt=""/></div>
                </span>
                <input
                    className="did-floating-input"
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete={'new-password'}
                />
                <label className="did-floating-label">name</label>
              </div>

              {/* username */}
              <div className="did-floating-label-content input-group mt20">
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

              {/* password */}
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
                  text={'Sign up'}
                  callbackFn={signUpAction}
                  className={'mt20'}
              />
            </div>
          </div>
        </form>
        <div
            className={'auth_container_text'}
        >
          <img src="/register.svg" alt=""/>
          <span>Being safe on the internet has never been easier.</span>
        </div>
      </div>
  );
};
