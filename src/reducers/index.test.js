import {wordsExplorerReducer as reducer} from '../reducers'
import {
    authUser,
    logOut
} from '../actions'

describe('reducer', ()=>{
    it('should set initial state when nothing is passed in', ()=>{
        const state = reducer(undefined, {type:undefined})
        expect(state.availableGames).toEqual([]);
        expect(state.ranks).toEqual([]);
        expect(state.userInfo).toEqual({});
        expect(state.countDown).toEqual(3);
        expect(state.userGames).toEqual([]);
    })
    describe('authUser', ()=>{
        it('should able to auth user', ()=>{
            const state = reducer(undefined, {type:undefined});
            const user = {
                name: 'test',
                auth: 'yes',
                scores: 100
            }
            const authuser = reducer(state,authUser(user));
            expect(authuser.userInfo.name).toEqual(`test`);
            expect(authuser.userInfo.auth).toEqual('yes')
            expect(authuser.userInfo.scores).toEqual(100)
        })
    })
    describe('logOut', ()=>{
        it('should able to log out user', ()=>{
            const state = reducer(undefined, {type:undefined});
            const user = {
                name: 'test',
                auth: 'yes',
                scores: 100
            }
            const authuser = reducer(state,authUser(user));
            const logoutuser = reducer(state,logOut());
            expect(Object.keys(logoutuser.userInfo).length).toEqual(0);
        })
    })
})