import {Field, Form, Formik} from "formik";
import {useState} from "react";

interface Props {
  onSignIn: (email: string, password: string) => void,
  onScreenChange: () => void;
  title: string;
  helpText?: string;
  error?: string;
}

const SignIn = ({onSignIn, title, onScreenChange, helpText, error}: Props) => {
  const [loading, setLoading] = useState(false);

  function renderLoadingSpinner() {
    if (!loading) return null;

    return (
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white loading-button" xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>)
  }

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800 py-6">
        {title}
      </h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async ({email, password}) => {
          setLoading(true);
          await onSignIn(email, password)
          setLoading(false);
        }}
      >
        <Form className='flex flex-col justify-start gap-y-6'>
          <label className='block'>
            <span className="text-slate-700 dark:text-slate-400">Email</span>
            <Field
              name="email"
              placeholder="jane@acme.com"
              type="email"
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 form-input'
            />
          </label>
          <label className='block'>
            <span className="text-slate-700 dark:text-slate-400">Password</span>
            <Field
              name="password"
              type="password"
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 form-input'
            />
          </label>
          <button type="submit" disabled={loading}
                  className='px-4 py-2 font-semibold bg-cyan-500 text-white rounded-full shadow-sm opacity-100 disabled:opacity-75'>
            {renderLoadingSpinner()}{' '}Submit
          </button>
          {error && (
            <p className={'font-bold text-slate-700 text-orange-600 dark:text-orange-600'}>{error}</p>
          )}
          {helpText && (
            <p className='font-bold text-slate-700 text-slate-800'>
              <a onClick={onScreenChange}>{helpText}</a>
            </p>
          )}
        </Form>
      </Formik>
    </>
  );
}
export default SignIn;