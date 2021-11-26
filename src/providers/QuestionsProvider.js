import React, {useEffect, useState} from 'react';
import {sagehAxios} from "../apis/CustomAxios";
// import {useParams} from "react-router-dom";
// import {getAllQuestions} from "../apis/Questions";

export const QuestionsContext = React.createContext();
export const QuestionsSetContext = React.createContext();


function QuestionsProvider({children}) {

    // let {slug, id} = useParams();
    const [questions, setQuestions] = useState(null);
    // const [loading, setLoading] = useState(false);


    useEffect(() => {

        console.log('<QuestionsProvider /> rendered!');
    }, []);
    //
    // function getQuestions(slug) {
    //     setLoading(true);
    //     sagehAxios({method: 'get', url: `/getQuestions?category_slug=${slug}`}).then(response => {
    //
    //         let {status, questions} = response.data;
    //         setQuestions(questions);
    //         setLoading(false);
    //     }).catch(err => {
    //         console.log(err.message)
    //     });
    //
    // }
    //
    // function getQuestion(id) {
    //     setLoading(true);
    //     sagehAxios({method: 'get', url: `/questions/${id}/getAnswers`}).then(response => {
    //
    //         let {status, question} = response.data;
    //         console.log('question: ', response);
    //         setLoading(false);
    //         setQuestion(question);
    //
    //     }).catch(err => {
    //         console.log(err.message)
    //     })
    // }

    return (

        <QuestionsContext.Provider value={questions}>
            <QuestionsSetContext.Provider value={setQuestions}>
                {children}
            </QuestionsSetContext.Provider>
        </QuestionsContext.Provider>


    );


}
export default QuestionsProvider;