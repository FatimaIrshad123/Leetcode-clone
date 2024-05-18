import { FiLogOut } from "react-icons/fi";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase";


export default function LogoutButton(){
    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
    }
    return <button className="bg-dark-fill-3 px-3 py-2.5 cursor-pointer rounded text-brand-orange" onClick={handleLogout}>
        <FiLogOut />
    </button>
}