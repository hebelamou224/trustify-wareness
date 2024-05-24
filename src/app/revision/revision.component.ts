import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Quizz, QuizzService } from '../quiz/quiz.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revision',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FieldsetModule
  ],
  providers: [QuizzService],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent implements OnInit {

  questionnaires: Quizz[] = [];
  currentQuestionIndex = 0

  constructor(private quizService: QuizzService, private router: Router,) { } // Injectez le service QuizService
  
  ngOnInit(): void {
    this.getQuestionnaires(); // Appelez la méthode pour récupérer les questionnaires lors de l'initialisation du composant
  }

  getQuestionnaires(): void {
    this.quizService.getAllQuestionnaires().subscribe((data: Quizz[]) => {
      this.questionnaires = data; // Stockez les questionnaires récupérés dans la variable questionnaires
      console.log(data)
    });
  }

  redirectToQuizPage() {
    this.router.navigate(['/quiz']);
  }

}
