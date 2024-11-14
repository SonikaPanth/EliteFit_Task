import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md ">
      <div className="max-w-6xl mx-auto flex gap-4">
        {/* font icon */}
        <FontAwesomeIcon icon={faListCheck} className="text-white text-3xl mr-2 mt-6" />
        <h1 className="text-[40px] font-semibold mt-2 ">Task Manager</h1>
      </div>
    </nav>
  );
}

export default Navbar;
