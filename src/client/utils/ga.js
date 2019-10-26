import ReactGA from 'react-ga';

ReactGA.initialize(process.env.NODE_ENV === 'production' ? process.env.GA_KEY : null);
