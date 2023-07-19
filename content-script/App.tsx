import browser from "webextension-polyfill";
import {useEffect, useState} from "react";
import SignIn from "./SignIn";

enum SCREEN {
  SIGN_IN, SIGN_UP, FACTS
}

const App = () => {
  const [fact, setFact] = useState('Click the button to fetch a fact!');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState(SCREEN.FACTS);
  const [error, setError] = useState('');

  async function getSession() {
    const {data: {session}} = await browser.runtime.sendMessage({action: 'getSession'});
    setSession(session);
  }

  useEffect(() => {
    getSession();
  }, []);

  async function handleOnClick() {
    setLoading(true);
    const {data} = await browser.runtime.sendMessage({action: 'fetch'});
    setFact(data);
    setLoading(false);
  }

  async function handleSignUp(email: string, password: string) {
    await browser.runtime.sendMessage({action: 'signup', value: {email, password}});
    setScreen(SCREEN.SIGN_IN)
  }

  async function handleSignIn(email: string, password: string) {
    const {data, error} = await browser.runtime.sendMessage({action: 'signin', value: {email, password}});
    if (error) return setError(error.message)

    setSession(data.session)
  }

  async function handleSignOut() {
    const signOutResult = await browser.runtime.sendMessage({action: 'signout'});
    setScreen(SCREEN.SIGN_IN);
    setSession(signOutResult.data);
  }

  function renderApp() {
    if (!session) {
      if (screen === SCREEN.SIGN_UP) {
        return <SignIn onSignIn={handleSignUp} title={'Sign Up'} onScreenChange={() => {
          setScreen(SCREEN.SIGN_IN);
          setError('');
        }} helpText={'Got an account? Sign in'} error={error}/>;
      }
      return <SignIn title='Sign In' onSignIn={handleSignIn} onScreenChange={() => {
        setScreen(SCREEN.SIGN_UP)
        setError('');
      }} helpText={'Create an account'} error={error}/>
    }

    return (
      <>
        <button
          className='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm disabled:opacity-75 w-48'
          disabled={loading} onClick={handleOnClick}>Get a Cat Fact!
        </button>
        <p className='text-slate-800'>{fact}</p>
        <div>
          <a className='text-cyan-400' onClick={handleSignOut}>Sign out</a>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col gap-4 p-4 shadow-sm bg-gradient-to-r from-purple-100 to-blue-200 w-96 rounded-md'>
      <h1>Cat Facts!</h1>
      {renderApp()}
    </div>
  )
}
export default App;