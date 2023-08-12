import { useState, useEffect } from "react"

const usePersist = () => {
  const result = localStorage.getItem("persist")
  let persistStatus = null

  if (!result) {
    persistStatus = false
  } else {
    persistStatus = JSON.parse(result)
  }

  const [persist, setPersist] = useState(persistStatus)

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist))
  }, [persist])

  console.log("MyMyUsePersist", persist)

  return [persist, setPersist]
}

export default usePersist
