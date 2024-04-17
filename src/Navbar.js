// Navbar.js

const Navbar = () => {
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
      </div>
    );
  };
  
  export default Navbar;
  