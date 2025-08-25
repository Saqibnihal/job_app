import amazon from '../assets/amazon.png';
import microsoft from '../assets/microsoft.png';
import swiggy from '../assets/swiggy.png';
import defaultLogo from '../assets/logo.png';

const logoMapper = {
  amazon: amazon,
  microsoft: microsoft,
  swiggy: swiggy,
};

const getCompanyLogo = (company) => {
  return logoMapper[company?.toLowerCase()] || defaultLogo;
};

export default getCompanyLogo