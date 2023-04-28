import { useState } from "react"
import axios from "axios"
import { URL } from "../../utils/constants/BASE_URL"
import "./card.css"

export const Card = ({ placeholder, done, index, data, setData, isLocal }) => {
  const [isDone, setIsDone] = useState(done)

  const remove = () => {
    const indexInData = data.findIndex(
      (dataItem) =>
        dataItem.hasOwnProperty("index") && dataItem.index === index,
    )
    const newData = data.filter((dataItem) => dataItem.index !== index)
    setData(newData)
    isLocal
      ? localStorage.setItem("storage", JSON.stringify(newData))
      : axios.delete(`${URL}?id=${indexInData}`)
  }

  const handleDone = () => {
    setIsDone(!isDone)
    const newData = [...data]
    const indexInData = newData.findIndex(
      (dataItem) =>
        dataItem.hasOwnProperty("index") && dataItem.index === index,
    )
    newData[indexInData].done = !newData[indexInData].done
    setData(newData)
    isLocal
      ? localStorage.setItem("storage", JSON.stringify(newData))
      : axios.patch(`${URL}`, {
          index: indexInData,
        })
  }

  return (
    <div
      className="card"
      style={
        isDone
          ? { backgroundColor: "green", borderColor: "green" }
          : { borderColor: "red" }
      }
    >
      <input value={placeholder} type="text" className="input" readOnly />
      <button onClick={handleDone}>{isDone ? "Отменить" : "Выполненно"}</button>
      <button onClick={remove}>Удалить</button>
    </div>
  )
}
