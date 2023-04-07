import './navbar.scss';
import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  const { username } = useAuth();
  return (
      <div className={'navbar'}>
        <div className={'navbar__logo'}>
          <img src={'/logo.png'} alt={'logo'}/>
        </div>
        <div className={'navbar__links'}>
          <a href={'#about'}>About</a>
          <a href={'/protect'}>Protect</a>
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
