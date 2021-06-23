import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './components/AppBar';
import { Router } from 'react-router-dom';
import history from './utils/history';
import Routes from './Routes';
import { store } from './redux/store';
import './assets/css/style.css';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#375f9d',
    },
  },
});

const App = () => {
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={outerTheme}>
        <AppBar />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
