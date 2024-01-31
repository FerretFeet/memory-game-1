import { ReactElement, useState } from 'react'

interface Character {
  name: string
  url: string
}

const CHARACTER_INDEX: Character[] = [
  {
    name: 'Bubble Bass',
    url: 'src/assets/bass.png'
  },
  {
    name: 'Flying Dutchman',
    url: 'src/assets/dutchman.png'
  },
  {
    name: 'Gary',
    url: 'src/assets/gary.png'
  },
  {
    name: 'Karen',
    url: 'src/assets/karen.png'
  },
  {
    name: 'Krabs',
    url: 'src/assets/krabs.png'
  },
  {
    name: 'Patrick',
    url: 'src/assets/patrick.png'
  },
  {
    name: 'Pearl',
    url: 'src/assets/pearl.png'
  },
  {
    name: 'Plankton',
    url: 'src/assets/plankton.png'
  },
  {
    name: 'Mrs. Puff',
    url: 'src/assets/puff.png'
  },
  {
    name: 'Sandy',
    url: 'src/assets/sandy.png'
  },
  {
    name: 'Spongebob',
    url: 'src/assets/spongebob.png'
  },
  {
    name: 'Squidward',
    url: 'src/assets/squidward.png'
  }
]

export default function App() {
  const CHARACTER_DISPLAY_AMOUNT = 6
  let gameList: Character[] = []
  let gameImgCards: ReactElement[] = []
  // const [activeChars, setActiveChars]
  const [prevChoices, setPrevChoices] = useState<Character[]>([])
  const [gameScore, setGameScore] = useState(0)
  const [winLossMessage, setWinLossMessage] = useState('')
  function getRandCharList() {
    const tempCharList = CHARACTER_INDEX.slice(0)
    for (let i = 0; i < CHARACTER_DISPLAY_AMOUNT; i++) {
      tempCharList.splice(Math.floor(Math.random() * tempCharList.length), 1)
    }
    return tempCharList
  }

  function createImgCard(character: Character) {
    return (
      <li key={character.name} className="">
        <button className="" onClick={() => onButtonClick(character)}>
          <img src={character.url} alt={character.name} className="" />
          <p className="">{character.name}</p>
        </button>
      </li>
    )
  }

  function setGameImgCards() {
    const temp = []
    for (let i = 0; i < gameList.length; i++) {
      temp.push(createImgCard(gameList[i]))
    }
    return temp
  }

  function onButtonClick(character: Character) {
    if (prevChoices.includes(character)) {
      getNewCards()

      setWinLossMessage(
        `Oh no! You already selected ${character.name}. You lose :(`
      )
      setGameScore(0)
      setPrevChoices([])

      return
    }
    getNewCards()
    setPrevChoices([...prevChoices, character])
    // +/-1 in below two lines
    // bc setPrevChoices is async
    setGameScore(prevChoices.length + 1)
    if (gameScore == CHARACTER_INDEX.length - 1) {
      setWinLossMessage('Congratulations, you won!')
      setPrevChoices([])
      return
    }
    setWinLossMessage('')
  }

  //see if convention for function just to update state
  // function updateActiveChoices() {
  //   setActiveChoices(getRandCharList())
  // }

  function getNewCards() {
    gameList = getRandCharList()
    gameImgCards = setGameImgCards()
  }

  getNewCards()

  function Header() {
    return (
      <header key="header" className="">
        <p className="">{gameScore}</p>
        <p className="">{winLossMessage}</p>
      </header>
    )
  }

  return (
    <>
      {Header()}
      {...gameImgCards}
    </>
  )
}
