import React, { useState } from 'react'
import classNames from 'classnames'
import { TweetsActions } from '../../../actions/TweetesActions';

//Container Component - Lógicas
export const NovoTweetFormContainer = () => {
    const [novoTweet, setStateNovoTweet] = useState("");

    function adicionaTweet(event) {
        event.preventDefault()
        TweetsActions.adiciona(novoTweet)
            .then(() => (setStateNovoTweet("")))
    }

    return <NovoTweetForm
        novoTweetValue={novoTweet}
        adicionaTweet={adicionaTweet}
        onTextAreaChange={(event) => setStateNovoTweet(event.target.value)} />
}

function NovoTweetMaiorQue140(novoTweet) {
    return novoTweet.length > 140
}

//Presentational Component - Visual
export const NovoTweetForm = ({ adicionaTweet, novoTweetValue, onTextAreaChange }) => {
    return (
        <form className="novoTweet" onSubmit={adicionaTweet}>
            <div className="novoTweet__editorArea">
                <span className={classNames(
                    'novoTweet__status',
                    {
                        'novoTweet__status--invalido': NovoTweetMaiorQue140(novoTweetValue)
                    }
                )}>
                    {novoTweetValue.length}/140
                </span>
                <textarea
                    onChange={onTextAreaChange}
                    value={novoTweetValue}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?">`
                </textarea>
            </div>
            <button
                disabled={NovoTweetMaiorQue140(novoTweetValue) || novoTweetValue.length === 0}
                type="submit"
                className="novoTweet__envia">Tweetar</button>
        </form>
    )
}
