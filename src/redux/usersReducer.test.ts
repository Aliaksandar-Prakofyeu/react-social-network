import usersReducer, {actions, InitialState} from './usersReducer'

let state: InitialState

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Test name 1', followed: false, photos: {small: null, large: null}, status: 'test status 1'},
            {id: 1, name: 'Test name 2', followed: false, photos: {small: null, large: null}, status: 'test status 8'},
            {id: 2, name: 'Test name 3', followed: false, photos: {small: null, large: null}, status: 'test status 6'},
            {id: 3, name: 'Test name 4', followed: true, photos: {small: null, large: null}, status: 'test status 4'},
            {id: 4, name: 'Test name 5', followed: false, photos: {small: null, large: null}, status: 'test status 2'},
            {id: 5, name: 'Test name 6', followed: true, photos: {small: null, large: null}, status: 'test status 7'},
            {id: 6, name: 'Test name 7', followed: false, photos: {small: null, large: null}, status: 'test status 3'}
        ],
        pageSize: 20,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {term: '' , friend: null}
    }
})

test('follow success', () => {

    const newState = usersReducer(state, actions.acceptFollow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow success', () => {

    const newState = usersReducer(state, actions.acceptUnfollow(3))

    expect(newState.users[5].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})