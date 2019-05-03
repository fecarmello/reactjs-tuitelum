import { createStore, combineReducers } from 'redux'

// function createStore(reducer){
//     let state
//     const subscribers = []

//     function dispatch(acaoDisparadaPorAlgumDev){
//         console.log('aqui')
//         state = reducer(state, acaoDisparadaPorAlgumDev)

//         subscribers.forEach((funcao) => funcao())
//     }

//     function subscribe(funcao){
//         console.log('aqui')
//         subscribers.push(funcao)
//     }

//     dispatch({type: '@redux/init/jdhfushfhdu'})

//     return {
//         dispatch,
//         subscribe,
//         getState: () => {
//             return state
//         }
//     }
// }


function tweetsReducer(stateDaAplicacao = [], acaoDisparadaPorAlguem){
    if(acaoDisparadaPorAlguem.type === 'CARREGA_TWEETS'){
        return acaoDisparadaPorAlguem.tweets
    }

    if(acaoDisparadaPorAlguem.type === 'ADD_TWEET'){
        return [acaoDisparadaPorAlguem.tweet, ...stateDaAplicacao]
    }

    if(acaoDisparadaPorAlguem.type === 'EXCLUIR_TWEET') {
        return stateDaAplicacao.filter((tweet) => {
            return tweet._id !== acaoDisparadaPorAlguem.idDoTweet
        })
    }

    if(acaoDisparadaPorAlguem.type === 'LIKE_TWEET') {
        console.log(acaoDisparadaPorAlguem)

        const listaAtualDeTweets = stateDaAplicacao
        return listaAtualDeTweets.map((tweet) => {
            if(tweet._id === acaoDisparadaPorAlguem.idDoTweet){
                tweet.totalLikes = tweet.likeado ? tweet.totalLikes -1 : tweet.totalLikes +1
                tweet.likeado = !tweet.likeado
            }
            
            return tweet
        })
    }

    return stateDaAplicacao
}

function notificacaoReducer(state = '', action){
    if(action.type === 'NOTIFICACAO_ADD'){
        return action.msg
    }

    if(action.type === 'NOTIFICACAO_REMOVE'){
        return ''
    }

    return state
}

export const store = createStore(combineReducers({
    tweets: tweetsReducer,
    notificacao: notificacaoReducer
}))
window.store = store

// store.subscribe(() => {
//     console.log('alguem disparou uma ação, devemos fazer um setState')
//     console.log(store.getState())
// })

// store.dispatch({ type: 'CARREGA_TWEETS', tweets: ['Alo alo wbrazil', 'oi'] })
// store.dispatch({ type: 'ADD_TWEETS', conteudo: ['Novo tweet'] })