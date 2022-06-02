import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
let state = {
    posts: [
        {id: 1, message: 'Hi how are you?', likeCount: 10},
        {id: 2, message: 'It\'s my first post', likeCount: 20},
    ]
}
test('post length should increase', () => {
    // 1 start data
    let action = addPostActionCreator('Test post')
    // 2 action
    let newState =  profileReducer(state, action)
    // 3 expectation
    expect (newState.posts.length).toBe(3)
});

test('post item should be equal to test message', () => {
    // 1 start data
    let action = addPostActionCreator('Test post')
    // 2 action
    let newState =  profileReducer(state, action)
    // 3 expectation
    expect (newState.posts[2].message).toBe('Test post')
});

test('after deleting post length should decrease', () => {
    // 1 start data
    let action = deletePost(1)
    // 2 action
    let newState =  profileReducer(state, action)
    // 3 expectation
    expect (newState.posts.length).toBe(1)
});

test('after deleting post length should not decrease if id is incorrect ', () => {
    // 1 start data
    let action = deletePost(1000)
    // 2 action
    let newState =  profileReducer(state, action)
    // 3 expectation
    expect (newState.posts.length).toBe(2)
});







