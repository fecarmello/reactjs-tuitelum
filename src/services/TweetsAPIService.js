export class TweetsAPIService {

    static Adiciona(novoTweet){
       return fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem("TOKEN")}`,
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               conteudo:novoTweet
            })
        })
        .then((respostaDoServer)=>{
             return respostaDoServer.json()
        })
    }

    static ObterTodos(){
        return fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem("TOKEN")}`)
         .then((respostaDoServer)=>{
              return respostaDoServer.json()
         })
         .then((repostaConvertida) => {
            return [...repostaConvertida]
         })
     }

     static Like(idTweet){
        return fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweet}/like?X-AUTH-TOKEN=${localStorage.getItem("TOKEN")}`,
        {
            method: 'POST'
        })
         .then((respostaDoServer)=>{
              return respostaDoServer.json()
         })
     }

     static RemoveById(idTweet){
        return fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem("TOKEN")}`,
        {
            method: 'DELETE'
        })
         .then((respostaDoServer)=>{
              return respostaDoServer.json()
         })
     }
    
}