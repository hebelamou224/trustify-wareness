import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { RevisionComponent } from './revision/revision.component';

export const routes: Routes = [
    {path: "quiz", component: QuizComponent},
    {path: 'results', component: ResultComponent},
    {path: 'revision', component: RevisionComponent},
    {path: "", component: LoginComponent},
    { path: '**', redirectTo: '/quiz' }
   
];
