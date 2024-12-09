import { SignIn } from '@clerk/clerk-react';
import './signin-signup.css';

export default function SignInPage() {
  return (
    <div className='pop-up'>
      <SignIn path="/sign-in" />
    </div>
  );
}