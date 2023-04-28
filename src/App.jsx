import { useState, useEffect } from "react"
import axios from "axios"
import { Card } from "./Components/card/card"
import { AddCard } from "./Components/add-card/add-card"
import { URL } from "./utils/constants/BASE_URL"
import "./main.css"

export const App = () => {
  const [data, setData] = useState([])
  const [isLocal, setLocal] = useState(true)

  useEffect(() => {
    const storage = localStorage.getItem("local")
    storage ? setLocal(true) : setLocal(false)
    isLocal
      ? setData(JSON.parse(localStorage.getItem("storage")))
      : axios.get(URL).then((response) => setData(response.data))
  }, [isLocal])

  const handleStorage = () => {
    isLocal
      ? localStorage.removeItem("local")
      : localStorage.setItem("local", "true")
    setLocal(!isLocal)
  }

  const clearAll = () => {
    if (isLocal) {
      localStorage.clear()
      setData([])
    } else {
      axios.delete(`${URL}all`)
      setData([])
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="btns">
          <button className="clear__button" onClick={clearAll}>
            Отчистить всё
          </button>
          <button className="handle__storage__btn" onClick={handleStorage}>
            {isLocal ? "Локальное хранилище" : "Серверное хранилище"}
          </button>
        </div>
        {data &&
          data.map((dataElement) => (
            <Card
              placeholder={dataElement.placeholder}
              color={dataElement.color}
              done={dataElement.done}
              index={dataElement.index}
              data={data}
              setData={setData}
              isLocal={isLocal}
              key={dataElement.index}
            />
          ))}
        <AddCard data={data} setData={setData} isLocal={isLocal} />
      </div>
    </div>
  )
}
