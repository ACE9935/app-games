import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './app-state/store';
import GamesWrapper from './app-components/GamesWrapper';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
   <GamesWrapper/>
   </Provider>
    </QueryClientProvider>
  );
}

export default App;
