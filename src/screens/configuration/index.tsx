import './protect.scss'
import strings from '../../strings.json';
import { ConfigsContainer } from "./configsContainer/ConfigsContainer";
import { useNavigate } from "react-router-dom";

export const Configure = () => {
  const navigate = useNavigate();

  return (
      <div className={'protect__container'}>
        <div className={'protect__headline'}>
          <h2>
            {strings.protect_screen_headline.first}
            <span className={'protect__headline__green'}>
              {strings.protect_screen_headline.second}
            </span>
          </h2>
          <h2>
            {strings.protect_screen_headline.third}
          </h2>
        </div>
        <ConfigsContainer/>
        <span style={{
          fontSize: '1.5rem',
        }}>Check <a href="/configure/overview">more configurations</a> and select whatever suits you best</span>
        <div className={'personalized__config__announce'}>
          <h2>Or create your own, personalized configuration</h2>
          <button
              className={'white_formal_button small'}
              onClick={() => {
                navigate('/configure/editor');
              }}
          >
            Go to editor
          </button>
        </div>
      </div>
  );
};
