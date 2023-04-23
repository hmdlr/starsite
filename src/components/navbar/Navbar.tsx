import './navbar.scss';
import { useAuth } from "../../hooks/useAuth";

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
          <a href={'/configure'}>Configuration</a>
          <a href={'/ruleset'}>Rulesets</a>
          <a href={'/auth'}>Login</a>
        </div>
        <div className={'navbar__user'}>
          <span>
            @{username}
          </span>
        </div>
      </div>
  );
};
