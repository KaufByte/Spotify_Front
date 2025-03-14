import React ,{useState} from 'react';
import'./AvatarMenu.css';
import { IoMdPerson } from 'react-icons/io';

const AvatarMenu:React.FC = () =>{
    const[isOpen,setIsOpen] = useState(false);
    const[isHovered,setIsHovered] = useState(false);
    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    };

    const handleLogout = () =>{
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
    };
    const userEmail = localStorage.getItem('userEmail');

      return (
        <div 
            className="avatar-container"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <IoMdPerson className="icon avatar-icon" onClick={toggleMenu} />
            
            {isHovered && userEmail && (
                <span className="user-email">{userEmail}</span>
            )}

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="menu-item" onClick={handleLogout}>
                        Log out
                    </div>
                </div>
            )}
        </div>
    );
};
export default AvatarMenu;