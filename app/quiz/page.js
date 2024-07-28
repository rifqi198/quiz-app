"use client"

import { useEffect, useState } from "react"
import { getQuizData } from "../components/api"
import { MoonLoader } from "react-spinners"
import he from "he"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    answeredQuestions: 0,
  })
  const [seconds, setSeconds] = useState(120)

  useEffect(() => {
    const getData = async () => {
      const data = await getQuizData()
      if (data) {
        setQuestions(data.results)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
      return () => clearInterval(timer)
    }else {
      setShowResult(true)
    }
  }, [seconds])

  const handleNextQuestion = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[activeQuestion].correct_answer
    setResult((prevResult) => ({
      ...prevResult,
      score: isCorrect ? prevResult.score + 20 : prevResult.score,
      correctAnswers: isCorrect ? prevResult.correctAnswers + 1 : prevResult.correctAnswers,
      wrongAnswers: isCorrect ? prevResult.wrongAnswers : prevResult.wrongAnswers + 1,
      answeredQuestions: prevResult.answeredQuestions + 1,
    }))

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setActiveQuestion(0)
    setShowResult(false)
    setSeconds(120)
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      answeredQuestions: 0,
    })
  }

  if (!questions.length) {
    return <div className="flex items-center justify-center h-dvh"><MoonLoader color="#93c5fd"/></div>
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-10 px-10">
      {!showResult ? (
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Question {activeQuestion + 1}</h1>
          <p>Time Remaining: {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</p>
          <div>
            <h2 className="mb-5 font-semibold text-lg">{he.decode(questions[activeQuestion].question)}</h2>
            <ul >
              {[
                ...questions[activeQuestion].incorrect_answers,
                questions[activeQuestion].correct_answer,
              ].map((answerOption, idx) => (
                <li key={idx} onClick={() => handleNextQuestion(answerOption)} className="border-2 border-blue-300 px-2 py-2 mb-5 hover:bg-blue-300 cursor-pointer">
                  {he.decode(answerOption)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 text-lg">
          <h2 className="font-bold text-2xl">Quiz Results</h2>
          <p>Score: {result.score}</p>
          <p className="bg-green-300 px-2 rounded-lg">Correct Answers: {result.correctAnswers}</p>
          <p className="bg-red-300 px-2 rounded-lg">Wrong Answers: {result.wrongAnswers}</p>
          <p className="bg-blue-300 px-2 rounded-lg">Answered Questions: {result.answeredQuestions}</p>
          <div className="flex-col flex gap-5">
            <button onClick={handleRestart} className="bg-slate-300 font-semibold rounded-lg py-2 px-2">Restart</button>
            <button onClick={() => {
              location.reload() 
              return false
              }} 
              className="bg-yellow-300 font-semibold rounded-lg py-2 px-2">
                New Question
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
