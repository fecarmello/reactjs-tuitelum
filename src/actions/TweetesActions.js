import { TweetsAPIService } from '../services/TweetsAPIService';

const CARREGA_TWEETS = "CARREGA_TWEETS"
const ADD_TWEET = "ADD_TWEET"
const EXCLUIR_TWEET = "EXCLUIR_TWEET"
const LIKE_TWEET = "LIKE_TWEET"

export const TweetsActions = {
    carrega: () => {
        return TweetsAPIService.ObterTodos()
            .then((tweetsVindoAPI) => {
                window.store.dispatch({ type: CARREGA_TWEETS, tweets: tweetsVindoAPI })
            })
    },

    adiciona: (novoTweet) => {
        return TweetsAPIService.Adiciona(novoTweet)
            .then((novoTweetObj) => {
                window.store.dispatch({ type: ADD_TWEET, tweet: novoTweetObj })
            })
    },

    remove: (idTweet) => {
        return TweetsAPIService.RemoveById(idTweet)
            .then(() => {
                window.store.dispatch({ type: EXCLUIR_TWEET, idDoTweet: idTweet })
            })
    },

    like: (idTweet) => {
        window.store.dispatch({ type: LIKE_TWEET, idDoTweet: idTweet })
        return TweetsAPIService.Like(idTweet)
        .then(() => {
            
        })
    }
}