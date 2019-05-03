import React, { Component } from 'react'

export class Notificacao extends Component {

    state = { msg : ''}

    componentDidMount() {
        window.store.subscribe(() => {
            this.setState({
                msg: window.store.getState().notificacao,
            })
        })
    }

    render() {
        const notificacao = window.store.getState().notificacao
        const hasNotification = notificacao.length
        if (hasNotification) {
            return (
                <div className="notificacaoMsg" 
                onAnimationEnd={() => {
                    window.store.dispatch({type: 'NOTIFICACAO_REMOVE'})
                }}>
                    {this.state.msg}
                </div>
            )
        }

        return ''
    }
}