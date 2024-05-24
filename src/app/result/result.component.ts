import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'tf-result',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

  questions: any[] = [];
  userAnswers: string[] = [];
  score: number = 0;
  totalQuestions: number = 0;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state: any = navigation.extras.state;
      console.log(state.userAnswers)
      this.questions = state.questions;
      this.userAnswers = state.userAnswers;
      this.score = state.score;
      this.totalQuestions = state.totalQuestions;
    }
  }
  ngOnInit(): void {
    
  }

  isAnswerCorrect(index: number): boolean {
    return this.userAnswers[index] === this.questions[index].correctAnswer;
  }

  redirectToQuizPage() {
    this.router.navigate(['/quiz']);
  }

  redirectToLearningPage(){
    this.router.navigate(['/revision']);
  }

}
