import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, map, takeWhile } from 'rxjs';
import { Test } from 'src/app/core/api-models/test-model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  timer =  interval(1000).pipe(
    map((secondsElapsed) => 10800 - secondsElapsed), // 3 hours = 10800 seconds
    takeWhile((secondsLeft) => secondsLeft >= 0),
    map((secondsLeft) => this.formatTime(secondsLeft))
  );
  test: Test = {}
  acticeSectionIndex = 0;
  selectedQuestionIndex = 0;
  isFullScreen = false;
  interval: any;

  @ViewChild('testContainer') testContainer!: ElementRef;
  constructor() { }


  ngOnInit() {
    this.test = {
  "id": 1,
  "title": "Math Quiz - Algebra Basics",
  "associationId": 101,
  "description": "A basic algebra quiz to test fundamental concepts.",
  "subjectId": 5,
  "chapterId": 12,
  "sections": [
    {
      "name": "Linear Equations",
      "id": 201,
      "questions": [
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 2012,
          "type": "MCQ",
          "question": "Which of the following is a linear equation?",
          "file": "",
          "options": [
            {
              "id": 405,
              "text": "y = 2x + 5",
              "correct": true
            },
            {
              "id": 406,
              "text": "y = x^2 + 3x + 2",
              "correct": false
            },
            {
              "id": 407,
              "text": "x^3 - 2x + 1 = 0",
              "correct": false
            },
            {
              "id": 408,
              "text": "y = sqrt(x) + 4",
              "correct": false
            }
          ],
          "deletedOptionIds": [],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 2
        }
      ]
    },
    {
      "name": "Static Equations",
      "id": 301,
      "questions": [
        {
          "id": 3011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 3012,
          "type": "MCQ",
          "question": "Which of the following is a linear equation?",
          "file": "",
          "options": [
            {
              "id": 405,
              "text": "y = 2x + 5",
              "correct": true
            },
            {
              "id": 406,
              "text": "y = x^2 + 3x + 2",
              "correct": false
            },
            {
              "id": 407,
              "text": "x^3 - 2x + 1 = 0",
              "correct": false
            },
            {
              "id": 408,
              "text": "y = sqrt(x) + 4",
              "correct": false
            }
          ],
          "deletedOptionIds": [],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 2
        }
      ]
    },
    {
      "name": "Both Equations",
      "id": 401,
      "questions": [
        {
          "id": 4011,
          "type": "MCQ",
          "question": "What is the solution to the equation 2x + 3 = 7?",
          "file": "",
          "options": [
            {
              "id": 401,
              "text": "x = 2",
              "correct": true
            },
            {
              "id": 402,
              "text": "x = 3",
              "correct": false
            },
            {
              "id": 403,
              "text": "x = 4",
              "correct": false
            },
            {
              "id": 404,
              "text": "x = 1",
              "correct": false
            }
          ],
          "deletedOptionIds": [403],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 1
        },
        {
          "id": 4012,
          "type": "MCQ",
          "question": "Which of the following is a linear equation?",
          "file": "",
          "options": [
            {
              "id": 405,
              "text": "y = 2x + 5",
              "correct": true
            },
            {
              "id": 406,
              "text": "y = x^2 + 3x + 2",
              "correct": false
            },
            {
              "id": 407,
              "text": "x^3 - 2x + 1 = 0",
              "correct": false
            },
            {
              "id": 408,
              "text": "y = sqrt(x) + 4",
              "correct": false
            }
          ],
          "deletedOptionIds": [],
          "positiveMark": 2,
          "negativeMark": -1,
          "order": 2
        }
      ]
    }
  ],
  "totalPositiveMark": 4,
  "totalNegativeMark": -2,
  "startDate": "2025-03-01",
  "endDate": "2025-03-05",
  "time": "30 minutes"
    }
    this.test.sections!.forEach(x => {
      x.questions!.forEach(y => {
        y.isNotVisited = true;
      });
    });
    this.initializeTimers();
    this.startTimerForCurrentQuestion();
  }

  markedAndReviewNext() {
    if (this.test && this.test.sections && this.test.sections[this.acticeSectionIndex].questions && this.test.sections[this.acticeSectionIndex].questions![this.selectedQuestionIndex].type == 'MCQ') {
      let a = this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].options?.findIndex(x => x.correct == true);
      if (a != -1) {
        this.changeResponseType('markedAndAnswered');
      } else {
        this.changeResponseType('marked');
      }
    }
    if (this.selectedQuestionIndex == this.test.sections![this.acticeSectionIndex].questions!.length - 1) {
      this.selectedQuestionIndex = 0;
      this.acticeSectionIndex = this.acticeSectionIndex + 1;
    } else {
      this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
    }
    this.startTimerForCurrentQuestion();
  }

  clearResponse() {
    if (this.test && this.test.sections && this.test.sections[this.acticeSectionIndex].questions && this.test.sections[this.acticeSectionIndex].questions![this.selectedQuestionIndex].type == 'MCQ') {
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].options?.forEach(x => x.correct = false);
    }
  }

  saveAndNext() {
  
  }

  questionChange(id:number) {
    if (this.test && this.test.sections && this.test.sections[this.acticeSectionIndex].questions && this.test.sections[this.acticeSectionIndex].questions![this.selectedQuestionIndex].type == 'MCQ') {
      let a = this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].options?.findIndex(x => x.correct == true);
      if (a != -1) {        
        this.changeResponseType('attemped');
      } else {
        this.changeResponseType('notAnswered');
      }
    }
    
    let index = this.test.sections![this.acticeSectionIndex].questions!.findIndex(x => x.id == id);
    if (index != -1) {
      this.selectedQuestionIndex = index;
    }    
    this.startTimerForCurrentQuestion();
  }

  changeResponseType(type: string) {
    this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isAttempted = false;
    this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isMarked = false;
    this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isNotVisited = false;
    this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isNotAnswered = false;
    this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isMarkedAndAnswered = false;

    if (type == 'attemped') {
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isAttempted = true;
    } else if (type == 'marked') {
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isMarked = true;
    } else if (type == 'notVisited') {
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isNotAnswered = true;
    } else if (type == 'markedAndAnswered') {
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isMarkedAndAnswered = true;
    } else if (type == 'notAnswered'){
      this.test.sections![this.acticeSectionIndex].questions![this.selectedQuestionIndex].isNotAnswered = true;
    } 
  }

  sectionChange(id: number) {    
    let index = this.test.sections!.findIndex(x => x.id == id);
    if (index != -1) {
      this.acticeSectionIndex = index;      
      this.startTimerForCurrentQuestion();
    }
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  initializeTimers() {
    this.test.sections?.forEach(section => {
      section.questions?.forEach(question => {
        if (!question.timer) {
          question.timer = '00:00'; 
        }
      });
    });
  }

  startTimerForCurrentQuestion() {
    this.clearInterval(); 

    let currentQuestion = this.getActiveQuestion();

    if (currentQuestion) {
      let totalSeconds = this.convertTimeToSeconds(currentQuestion.timer || '00:00');

      this.interval = setInterval(() => {
        totalSeconds++;
        currentQuestion!.timer = this.formatQuestionTime(totalSeconds);
      }, 1000);
    }
  }

  getActiveQuestion() {
    return this.test.sections?.[this.acticeSectionIndex]?.questions?.[this.selectedQuestionIndex];
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  convertTimeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  formatQuestionTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.padQuestionTime(minutes)}:${this.padQuestionTime(seconds)}`;
  }

  padQuestionTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    const elem = this.testContainer.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err:any) => console.error("Error attempting to enable full-screen mode:", err));
    } else {
      document.exitFullscreen();
    }
  }

  ngOnDestroy() {
    this.clearInterval();
  }
  
}
