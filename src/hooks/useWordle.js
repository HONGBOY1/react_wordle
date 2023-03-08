import {useState} from "react";

const  useWordle= (solution) => {
    const [turn , setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const  [guesses, setGuesses] = useState([])
    const [history , setHistory] = useState(['hello','ninja'])
    const [inCorrect, setInCorrect] = useState(false)

    const formatGuess = () =>{
       let solutionArray=[...solution]
       let formattedGuess = [...currentGuess].map((l) =>{
           return {key : l, color :'grey'}
       })

        formattedGuess.forEach((l,i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        formattedGuess.forEach((l,i ) =>{
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = () => {

    }

    const handleKeyup = ({key}) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log("기회 5번 다씀")
                return
            }
            if(history.includes(currentGuess)){
                console.log("정답?")
                return
            }
            if(currentGuess.length !== 5 ){
                console.log("5개가 아니다.")
                return
            }
            const formatted = formatGuess()
            console.log(formatted)
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