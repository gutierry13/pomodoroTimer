import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { CycleTypes, cyclesReducer } from '../reducers/cycles'
import {
  addNewCycleAction,
  interruptCycleAction,
  markCycleFinishedAction,
} from '../reducers/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleData {
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
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(
        '@pomodoro-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson)
      }
      return initialState
    },
  )
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])
  const { cycles, activeCycleId } = cyclesState
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycleId) {
      return differenceInSeconds(new Date(), new Date(activeCycleId))
    }
    return 0
  })
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markNewCycleAsFinished() {
    dispatch(markCycleFinishedAction())
    //   setCycles((state) =>

    // )
  }
  function InterruptCycle() {
    dispatch(interruptCycleAction())
    // setCycles((state) =>

    // )
    // setActiveCycleId(null)
  }
  function CreateNewCycle(data: NewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: CycleTypes = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    // setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id)
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
        CreateNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
