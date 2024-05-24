import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


export type Quizz = {
    question: any,
    correctAnswer : string,
    options: string[]
  }

@Injectable()
export class QuizzService{

    questions: Quizz[] = [
        {
          question: "Il ya combien de region naturel", 
          options: [
            "a-5",
            "b-4",
            "c-3"
          ], 
          correctAnswer: "b-4",
        },
        {
          question: "Qui etait le premier president en guinee ?", 
          options: [
            "a-Ahmed Sekou Toure",
            "b-Moussa Dadis Camara",
            "c-Alpha Conde"
          ], 
          correctAnswer: "a-Ahmed Sekou Toure"
        },
        {
          question: "A quelle annee la guinee a eu son independance", 
          options: [
            "a-1960",
            "b-1365",
            "c-15825",
            "d-1958"
          ], 
          correctAnswer:  "d-1958"
        }
      ]

    getQuestions(): Quizz[]{
        return this.questions
    }

    getAllQuestionnaires(): Observable<Quizz[]>{
        return of(this.questions)
    }


}