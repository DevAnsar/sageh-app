import React, {useEffect, useState} from 'react';
import {sagehAxios} from "../apis/CustomAxios";
// import {useParams} from "react-router-dom";
// import {getAllQuestions} from "../apis/Questions";

export const QuestionContext = React.createContext();
export const QuestionSetContext = React.createContext();


function QuestionProvider({children}) {

    const [question, setQuestion] = useState(null);



    useEffect(() => {

        console.log('<QuestionProvider /> rendered!');
    }, []);

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

        <QuestionContext.Provider value={question}>
            <QuestionSetContext.Provider value={setQuestion}>
                {children}
            </QuestionSetContext.Provider>
        </QuestionContext.Provider>


    );


}
export default QuestionProvider;