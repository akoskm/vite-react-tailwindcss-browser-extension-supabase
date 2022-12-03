import browser from "webextension-polyfill";
import supabase from './src/supabase_client';

type Message = {
  action: 'fetch' | 'getSession' | 'signout',
  value: null
} | {
  action: 'signup' | 'signin',
  value: {
    email: string,
    password: string,
  }
}

type ResponseCallback = (data: any) => void

async function handleMessage({action, value}: Message, response: ResponseCallback) {
  if (action === 'fetch') {
    const result = await fetch('https://meowfacts.herokuapp.com/');

    const { data } = await result.json();

    response({ message: 'Successfully signed up!', data });
  } else if (action === 'signup') {
    const result = await supabase.auth.signUp(value)
    response({message: 'Successfully signed up!', data: result});
  } else if (action === 'signin') {
    console.log('requesting auth');
    const {data, error} = await supabase.auth.signInWithPassword(value);
    response({data, error});
  }  else if (action === 'getSession') {
    supabase.auth.getSession().then(response)
  } else if (action === 'signout') {
    const {error} = await supabase.auth.signOut()
    response({data: null, error});
  } else {
    response({data: null, error: 'Unknown action'});
  }
}

// @ts-ignore
browser.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, response);
  return true;
})