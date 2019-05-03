import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {

    state = {
        login: "",
        senha: ""
    }

    submitLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": this.state.login,
                "senha": this.state.senha,
            })
        })
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) return respostaDoServer.json()

            throw new Error("Aconteceu algum erro!")
        })
        .then((respostaConvertidaEmObjeto) => {
            const token = respostaConvertidaEmObjeto.token
            console.log(token)
            localStorage.setItem("TOKEN", token)
            this.props.history.push('/')
        })
        .catch((err) =>{
             alert(err.message)
            console.log(err.message)
        })
    }

    handleChange = (infosDoEvento) => {
        const nomeCampo = infosDoEvento.target.name
        this.setState({
            [nomeCampo]: infosDoEvento.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/" onSubmit={this.submitLogin}>

                                <FormInputDoMeuSite name="login" label="login" value={this.state.login} onChange={this.handleChange} />
                                <FormInputDoMeuSite name="senha" label="senha" value={this.state.senha} type="password" onChange={this.handleChange} />

                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin"
                                        type="submit" >
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const FormInputDoMeuSite = (props) => {
        return (
            <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="login">{props.label}</label>
                <input className="loginPage__input"
                    type={props.type}
                    id={props.name}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange} />
                   {props.value.length === 0 ? `O campo ${props.label} é obrigatório!` : ""} 
            </div>
        )
    }


export default LoginPage