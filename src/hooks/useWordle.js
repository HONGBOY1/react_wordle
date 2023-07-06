import { useState } from 'react'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // 각 추측은 배열입니다.
    const [history, setHistory] = useState([]) // 각 추측은 문자열입니다.
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} 등

    // 추측을 문자열 객체 배열로 포맷합니다.
    // 예: [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })

        // 정답과 일치하는 녹색 글자를 찾습니다.
        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // 정답과 일치하지 않으면서 노란색 글자를 찾습니다.
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    // 새로운 추측을 guesses 상태에 추가합니다.
    // 만약 추측이 정답인 경우 isCorrect 상태를 업데이트합니다.
    // turn 상태에 1을 더합니다.
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
            return prevTurn + 1
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
                const currentColor = prevUsedKeys[l.key]

                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey'
                    return
                }
            })

            return prevUsedKeys
        })
        setCurrentGuess('')
    }

    // keyup 이벤트를 처리하고 현재 추측을 추적합니다.
    // 사용자가 Enter 키를 누르면 새로운 추측을 추가합니다.
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            // turn이 5보다 작은 경우에만 추측을 추가합니다.
            if (turn > 5) {
                console.log('모든 추측을 사용했습니다!')
                return
            }
            // 중복된 단어는 허용하지 않습니다.
            if (history.includes(currentGuess)) {
                console.log('이미 시도한 단어입니다.')
                return
            }
            // 단어가 5자인지 확인합니다.
            if (currentGuess.length !== 5) {
                console.log('단어는 5자여야 합니다.')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle
