import './about.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import env from "../../../env";

export const About = () => {

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 70]);
  const y2 = useTransform(scrollY, [0, 300], [0, 90]);
  const o1 = useTransform(scrollY, [100, 400], [1, 0]);

  const redirectToStore = () => {
    window.open(env.chromeStoreUrl, '_blank');
  };

  return (
      <motion.div className={'about_container_parent'} style={{ opacity: o1, width: '100%' }}>
        <motion.div className={'about__container'} style={{ y: y1 }}>
          <div>
            <h1>The only</h1>
          </div>
          <div>
            <h3>Internet security extension you'll ever need</h3>
          </div>
          <div className={'mt10'}>
            <button
                className={'about__container_button'}
                onClick={redirectToStore}
            >Download
            </button>
          </div>
        </motion.div>
        <motion.div className={'about__container_image'} style={{ y: y2 }}>
          <img src={'/about_front.svg'} alt={'secureLogin'}/>
        </motion.div>
      </motion.div>
  );
};
