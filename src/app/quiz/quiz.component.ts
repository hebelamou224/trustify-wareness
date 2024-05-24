import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Quizz, QuizzService } from './quiz.service';


@Component({
  selector: 'tf-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [QuizzService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})

export class QuizComponent implements OnInit {

  currentQuestionIndex  = 0
  score = 0
  userAnswer: string = '';
  selectedOption: string = '';
  questions: Quizz[] = []
  timer: any;
  timeRemainingInSeconds: number = 180;
  gameStarted: boolean = false;
  showFeedback: boolean = false;
  isCorrectAnswer: boolean = false;
  selectedResponse: boolean = false;
  shwoResult: boolean = false;
  userAnswers: string[] = []

  constructor(
    private router: Router,
    private quizzService: QuizzService
  ){
    this.userAnswer = ''
    this.questions = this.quizzService.getQuestions()
  }

  ngOnInit() {
    //this.startTimer();
  }

  nextQuestion(){
    clearTimeout(this.timer);
    this.showFeedback = false;
    this.shwoResult = false
    this.selectedResponse = false;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = '';
      this.timeRemainingInSeconds = 180; 
      this.startTimer();
    } else {
      // Toutes les questions ont été répondues, afficher les résultats
      // Vous pouvez naviguer vers la page des résultats ici ou effectuer d'autres actions
      //this.router.navigate(['/results']);
      this.currentQuestionIndex = 0
      this.shwoResult = true
      this.gameStarted = false;
    }
  }

  answerQuestion(answer: any){
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.isCorrectAnswer = answer === currentQuestion.correctAnswer;
    this.showFeedback = true;
    this.selectedResponse = true;
    if (this.isCorrectAnswer) {
      this.score++;
      console.log('score: ',this.score)
      //this.nextQuestion();
    }
    // this.userAnswer = answer;
    // this.selectedOption = answer;
    this.userAnswers.push(answer)
    console.log('answer: ', answer.value, "Correct answers: ", currentQuestion.correctAnswer, "selected option: ", this.selectedOption)
    //this.nextQuestion();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemainingInSeconds--; // Décrémenter le temps restant chaque seconde
      if (this.timeRemainingInSeconds <= 0) {
        // Si le temps est écoulé, passer à la question suivante
        clearInterval(this.timer);
        this.nextQuestion();
      }
    }, 1000); // Mettre à jour chaque seconde
  }

  formatTimeRemaining(): string {
    const minutes = Math.floor(this.timeRemainingInSeconds / 60);
    const seconds = this.timeRemainingInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getTimeRemainingPercentage(): number {
    return (this.timeRemainingInSeconds / 180) * 100; // Pourcentage de temps restant
  }

  getTimerClass(): string {
    return this.timeRemainingInSeconds <= 0 ? 'expired' : ''; // Ajouter la classe 'expired' si le temps est écoulé
  }

  startGame() {
    this.gameStarted = true;
    this.startTimer();
  }

  getIncorrectAnswers(): number {
    return this.questions.length - this.score;
  }

  navigateToResultPage() {
    this.router.navigate(['/results'], {
      state: {
        questions: this.questions,
        userAnswers: this.userAnswers,
        score: this.score,
        totalQuestions: this.questions.length
      }
    });
  }

}
