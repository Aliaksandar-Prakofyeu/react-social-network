import profileReducer, {addPostActionCreator} from "./profileReducer";

test('post length should increase', () => {
    // 1 start data
    let action = addPostActionCreator('Test post')
    let state = {
        posts: [
            {id: 1, message: 'Hi how are you?', likeCount: 10},
            {id: 2, message: 'It\'s my first post', likeCount: 20},
        ],

    }
    // 2 action
    let newState =  profileReducer(state, action)
    // 3 expectation
    expect (newState.posts.length).toBe(3)
});


