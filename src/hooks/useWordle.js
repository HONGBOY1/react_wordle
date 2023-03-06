import {useState} from "react";

const  useWordle= (solution) => {
    const [turn , setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const  [guesses, setGuesses] = useState([])
    const [history , setHistory] = useState([])
    const [inCorrect, setInCorrect] = useState(false)
    const formatGuess = () =>{
        console.log('formatting the guess - ',currentGuess)
    }

    const addNewGuess = () => {

    }

    const handleKeyup = ({key}) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log("너는 모는 기회를 썻다")
                return
            }
            if(history.includes(currentGuess)){
                console.log("너는 ")
                return
            }
            if(currentGuess.length !== 5 ){
                console.log("너는 모는")
                return
            }
            formatGuess()
        }

        if(key === 'Backspace'){
            setCurrentGuess((prev) =>{
                return prev.slice(0,-1)
            })
            return
        }

       if(/^[A-Za-z]$/.test(key)){
           if(currentGuess.length < 5){
               setCurrentGuess((prev) => {
                   return prev + key
               })
           }
       }
    }

    return{ turn,currentGuess,guesses,inCorrect,handleKeyup }
}
export default  useWordle