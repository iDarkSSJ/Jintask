/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import Header from './components/Header'
import { Provider } from './context/context'
import Router from './routes/Router'

function App(): JSX.Element {

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <Provider>
        <Header />
        <div className="mainWrapper">
          <Router />
        </div>
      </Provider>
    </>
  )

}
export default App
