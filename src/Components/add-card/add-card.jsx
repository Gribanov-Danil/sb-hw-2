import { useState } from "react"
import axios from "axios"
import { URL } from "../../utils/constants/BASE_URL"
import "./add-card.css"
import { v4 as uuidv4 } from "uuid"

export const AddCard = ({ data, setData, isLocal }) => {
  const [inputState, setInputState] = useState("")

  const save = (e) => {
    e.preventDefault()
    const index = uuidv4()
    const newItem = {
      placeholder: inputState,
      done: false,
      index: index,
    }
    const newData = data ? [...data, newItem] : [newItem]

    setInputState("")

    setData(newData)
    isLocal
      ? localStorage.setItem("storage", JSON.stringify(newData))
      : axios.post(URL, newItem)
  }

  return (
    <form onSubmit={(e) => save(e)} className="add__form">
      <input
        placeholder="Что нужно сделать?"
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        className="input"
      />
      <button type={"submit"}>Добавить</button>
    </form>
  )
}
