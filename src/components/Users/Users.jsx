import s from './Users.module.css'



const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([{
            id: 1,
            photoUrl: 'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png',
            followed: false,
            fullName: 'Agnes Flowers',
            location: {country: 'USA', city: 'Santa Fe'},
            status: 'HA HA, CLASSIC!'
        }, {
            id: 2,
            photoUrl: 'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png',
            followed: false,
            fullName: 'Jeremy Green',
            location: {country: 'Greece', city: 'Athene'},
            status: 'Go Green!'
        }, {
            id: 3,
            photoUrl: 'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png',
            followed: true,
            fullName: 'Sean Smith',
            location: {country: 'Scotland', city: 'Glasgow'},
            status: 'Ahh, moss!'
        }, {
            id: 4,
            photoUrl: 'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png',
            followed: true,
            fullName: 'Derek Faul',
            location: {country: 'France', city: 'Brest'},
            status: 'So bored :/'
        }, {
            id: 5,
            photoUrl: 'https://freepikpsd.com/file/2019/10/avatar-png-2-Transparent-Images.png',
            followed: false,
            fullName: 'Helen Birch',
            location: {country: 'Poland', city: 'Poznan'},
            status: 'Hey folks follow my page!'
        },])
    }
    return (
        <div>
            {
                props.users.map(u => <div className={s.user} key={u.id}>
                    <span>
                        <div>
                            <img className={s.userPhoto} src={u.photoUrl}
                                 alt={"profilePic"}/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={()=>{props.unfollow(u.id)}}>Unfollow</button> : <button onClick={()=>{props.follow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.city}</div>
                            <div>{u.location.country}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>

    )
}

export default Users;