import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Counter from './features/counter/Counter';
function App() {
  return (
    <Provider store={store}>
      <Counter></Counter>
    </Provider>
  );
}

export default App;
