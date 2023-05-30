import { ReactNode, createContext, useState } from 'react'
interface CycleTypes {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface NewCycleData{
  task: string
  duration: number
}
interface CyclesContextType {
  cycles: CycleTypes[]
  activeCycle: CycleTypes | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markNewCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  InterruptCycle: () => void
  CreateNewCycle: (data: NewCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({children}:CyclesContextProviderProps ) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)

  }
  function markNewCycleAsFinished() {
    setCycles((state) =>
    state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    })
  )
  }
  function InterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }
  function CreateNewCycle(data: NewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: CycleTypes = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    // reset()
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markNewCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        InterruptCycle,
        CreateNewCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
