// src/components/ui/AuthButton.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AuthButton = ({ text, onClick, loading }) => (
    <button
      className="px-6 py-2 text-sm text-[#fff] bg-[#D4AF37] border rounded-lg mt-4 transition-all duration-[0\.6s] ease-in-out hover:bg-[#fff] hover:text-[#D4AF37] hover:border-[#D4AF37]"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2' />
          Please wait...
        </>
      ) : (
        text
      )}
    </button>
  );

export default AuthButton;
