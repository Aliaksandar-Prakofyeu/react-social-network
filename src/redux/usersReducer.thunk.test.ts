import {actions, follow, unfollow} from './usersReducer'
import {usersAPI} from '../api/usersAPI'
import {ApiResponseType, ResultCodesEnum} from '../api/apiTypes'


const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

jest.mock('../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI >

const result: ApiResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: ['test message'],
    data: {}
}


test('follow thunk success', async () => {

    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))

    usersAPIMock.follow.mockClear()
})


test('unfollow thunk success', async () => {

    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptUnfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))

    usersAPIMock.follow.mockClear()
})