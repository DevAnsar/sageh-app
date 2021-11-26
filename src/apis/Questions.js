import React from "react";
import {sagehAxios} from "./CustomAxios";

const getAllQuestions = (slug = '',text ='')=>{
     return sagehAxios({method: 'get', url: `/getQuestions?category_slug=${slug}&string=${text}`});
};
const getQuestion = (id)=>{
     return  sagehAxios({method: 'get', url: `/questions/${id}/getAnswers`});

};

const setBookmark = (id)=>{
     return  sagehAxios.post(`/questions/addToFavorite`, {
          'question_id': id
     });

}

const removeBookmark =  (id)=>{
     return  sagehAxios.post(`/questions/removeToFavorite`, {
          'question_id': id
     });
}

export {getAllQuestions,getQuestion,setBookmark,removeBookmark}