import React from 'react';
import { useTelegram } from '../../Hooks/useTelegram.js';
import Button from '../Button/Button';
import './Header.css';

const Header = () => {
 const {user, onClose} = useTelegram()

  return (
   <div className='{header'>
    <Button onClick={onClose}>Закрыть</Button>
    <span className='{username}'>
        {tg.initDataUnsafe?.user?.username}
    </span>
   </div>
  );
};

export default Header;