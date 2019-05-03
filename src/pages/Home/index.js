import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import { Modal } from '../../components/Modal';
import { TweetsActions } from '../../actions/TweetesActions';
import { NovoTweetFormContainer } from './components/NovoTweetForm';
import { Notificacao } from '../../components/Notificacao/Notificacao';

export default class Home extends Component {
    state = {
        novoTweet: '',
        tweets: [],
        tweetAtivoNoModal: {},
    }

    componentDidMount() {
        this.carregaTweets()

        window.store.subscribe(() => {
            this.setState({
                tweets: window.store.getState().tweets,
            })
        })
    }

    // adicionaTweet = (infosDoEvento) => {
    //     infosDoEvento.preventDefault()
    //     const novoTweet = this.state.novoTweet

    //     if (this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0) return
    //     TweetsActions.adiciona(novoTweet)
    //         .catch(() => alert("Não foi possível adicionar o seu tweet!"))
    // }

    carregaTweets = () => TweetsActions.carrega()

    removeTweetById = (idTweet) => {
        window.store.dispatch( {type: 'NOTIFICACAO_ADD', msg: 'Tweet excluído com sucesso!' } )
        TweetsActions.remove(idTweet)
            .then(() => { this.fechaModal() })
    }

    abreModal = (tweetQueVaiProModal) => {
        this.setState({
            tweetAtivoNoModal: tweetQueVaiProModal
        })
    }

    fechaModal = () => this.setState({ tweetAtivoNoModal: {} })

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <NovoTweetFormContainer />
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {
                                    this.state.tweets.map((tweet) => {
                                        return <Tweet
                                            key={tweet._id}
                                            id={tweet._id}
                                            usuario={tweet.usuario}
                                            conteudo={tweet.conteudo}
                                            totalLikes={tweet.totalLikes}
                                            likeado={tweet.likeado}
                                            removivel={tweet.removivel}
                                            onRemove={() => this.removeTweetById(tweet._id)}
                                            onContentAreaClick={() => this.abreModal(tweet)} />
                                    })
                                }

                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal isOpen={Boolean(this.state.tweetAtivoNoModal._id)}
                    onClose={this.fechaModal} >
                    {
                        () =>
                            (<Tweet
                                key={this.state.tweetAtivoNoModal._id}
                                id={this.state.tweetAtivoNoModal._id}
                                usuario={this.state.tweetAtivoNoModal.usuario}
                                conteudo={this.state.tweetAtivoNoModal.conteudo}
                                totalLikes={this.state.tweetAtivoNoModal.totalLikes}
                                likeado={this.state.tweetAtivoNoModal.likeado}
                                removivel={this.state.tweetAtivoNoModal.removivel}
                                onRemove={() => this.removeTweetById(this.state.tweetAtivoNoModal._id)}
                                onContentAreaClick={() => this.abreModal(this.state.tweetAtivoNoModal)} />
                            )
                    }
                </Modal>

                <Notificacao />

            </Fragment>
        );
    }
}

