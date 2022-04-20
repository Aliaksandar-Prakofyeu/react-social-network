import s from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path} className={s.name}><img
                src={'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png'}
                alt={"profilePic"}/>{props.name}</NavLink>
        </div>

    );

}

export default DialogItem;