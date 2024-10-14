import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialIcon = ({ icon }) => (
  <a className="flex justify-center items-center w-10 h-10 border border-[#D4AF37] rounded-full cursor-pointer text-[#D4AF37] transition-all duration-[0.6s] ease-in-out hover:bg-[#D4AF37] hover:text-[#fff] hover:border-[#D4AF37]">
    <FontAwesomeIcon icon={icon} />
  </a>
);

export default SocialIcon;
