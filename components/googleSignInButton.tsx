export default function GoogleSignInButton() {

    return (
        <button className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <a href="/api/auth/login">Sign In With Google</a>
        </button>
    );
  }