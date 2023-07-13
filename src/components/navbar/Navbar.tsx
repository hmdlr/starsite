import './navbar.scss';
import { useAuth } from "../../hooks/useAuth";
import env from "../../env";

export const Navbar = () => {
  const { username } = useAuth();
  return (
      <div className={'navbar'}>
        <div className={'navbar__logo'}>
          <a href="/" className={'no-style'} style={{
            textDecoration: 'none',
            color: 'unset',
          }}>
            <img src={'/logo.png'} alt={'logo'}/>
          </a>
        </div>
        <div className={'navbar__links'}>
          <a href={'/#about'}>About</a>
          <a href={
            env.nodeEnv === 'development' ? `http://localhost:${env.localStarconfigPort}` : 'https://workspace.starphish.app'
          }>Configuration</a>
          <a href={'/auth'}>Login</a>
        </div>
        <div className={'navbar__user'}>
          <span>
            {username ? '@' : ''}{username}
          </span>
        </div>
      </div>
  );
};
