import { auth } from './firebase_config'; // Ensure this path is correct
import { signOut } from "firebase/auth";

const Navbar = () => {
    // Function to handle logout
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User logged out successfully');
                // Redirect or perform other actions as needed
            })
            .catch((error) => {
                // An error happened during sign-out
                console.error('Logout Error:', error);
            });
    };

    return (
      <div className="bg-slate-600 text-white py-4 px-[800px] font-semibold">
        <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#Home">
          Home
        </a>
        <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#team">
          Team
        </a>
        <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#profile">
          Profile
        </a>
        <a className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto" href="#about">
          About
        </a>
        <button onClick={handleLogout} className="text-2xl px-4 py-2 hover:bg-gray-700 mx-auto">
          Logout
        </button>
      </div>
    );
  };
  
export default Navbar;
