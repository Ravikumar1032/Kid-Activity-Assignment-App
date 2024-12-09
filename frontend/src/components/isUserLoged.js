import { useUser } from '@clerk/clerk-react';


export default function IndexPage() {
  const { isSignedIn, user } = useUser();
  return (
    <div>
        {isSignedIn && (
          <button onClick={() => alert(`Hello, ${user?.firstName}!`)}>
            Add your Kids here.
          </button>
        )}
        {!isSignedIn && <p>Please login..</p>}
    </div>
  )
}

