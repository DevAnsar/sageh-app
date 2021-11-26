import React, {useEffect, useState} from "react"
import { QuestionsContext ,QuestionsSetContext  } from "../providers/QuestionsProvider";
import { QuestionContext ,QuestionSetContext  } from "../providers/QuestionProvider";
import {getAllQuestions,getQuestion,setBookmark,removeBookmark} from '../apis/Questions'
import { useQuery,useMutation ,useQueryClient  } from 'react-query';


const useGetQuestions = () =>{
    return React.useContext(QuestionsContext);
}
const useSetQuestions = () =>{
    return React.useContext(QuestionsSetContext);
}
const useSearchQuestions = (category_slug,search_text) =>{
    const setQuestions = useSetQuestions();
    const questions =useGetQuestions();
    // const [loading , setLoading] = useState(false);

    useEffect(()=>{
        getAllQuestions(category_slug , search_text).then(res=>{
            console.log(res);
            // setLoading(true);
            setQuestions(res.data.questions);
        }).catch(err=>{

        })
    },[]);

    return questions ;
}


const useGetQuestion = () =>{
    return  React.useContext(QuestionContext);
}
const useSetQuestion = () =>{
    return  React.useContext(QuestionSetContext);
}
const useSetToQuestion = (id) =>{
    const setQuestion= useSetQuestion();
    const question= useGetQuestion();
    useEffect(()=>{
        getQuestion(id).then(res=>{
            console.log(res);
            // setLoading(true);
            setQuestion(res.data.question);
        }).catch(err=>{

        })
    },[id]);

    return question ;

}

const useAddBookmark = () =>{

    const questions =useGetQuestions();
    const setQuestions= useSetQuestions();


    const fetch = (id) => {
        setBookmark(id).then(res=>{
            console.log(res);
            if (res.data.status){

                console.log('questions :', questions);
                const new_questions=questions.map(question=>{
                    if (question.id === id ){
                        console.log('question :', question);
                        return { hasBookmark : true , ...question}
                    }
                    return {...question};
                });
                console.log('new_questions : ', new_questions);
                setQuestions(new_questions);
            }
        });
    }

    return [fetch , questions]

}
const useRemoveBookmark = () =>{
    const questions =useGetQuestions();
    const setQuestions= useSetQuestions();

    const fetch = (id) => {
        removeBookmark(id).then(res=>{
            console.log(res);

            if (res.data.status){

                console.log('questions :', questions);
                const new_questions=questions.map(question=>{
                    if (question.id === id ){
                        console.log('question :', question);
                        return { hasBookmark : false , ...question}
                    }
                    return {...question};
                });
                console.log('new_questions : ', new_questions);
                setQuestions(new_questions);
            }
        });
    }
    return [fetch , questions]
}


export {useGetQuestions,useSetQuestions,useSearchQuestions,useGetQuestion,useSetQuestion,useSetToQuestion,useAddBookmark,useRemoveBookmark}

