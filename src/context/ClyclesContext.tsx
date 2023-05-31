import { ReactNode, createContext, useReducer, useState } from 'react'
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
interface CyclesState{
  cycles: CycleTypes[]
  activeCycleId: string | null
}
export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({children}:CyclesContextProviderProps ) {
  // const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [cyclesState,dispatch] = useReducer((state:CyclesState, action:any) => {
    switch(action.type){
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle], 
          activeCycleId:action.payload.newCycle.id
        }
      case 'INTERRUPT_CYCLE':
        return{
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId:null
  
        }
      case 'MARK_CYCLE_AS_FINISHED':
        return{
          ...state,
          cycles:state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId:null
        }
        default: return state
    }

   
  },{
    cycles: [],
    activeCycleId: null
  })
  const {cycles,activeCycleId} = cyclesState
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)

  }
  function markNewCycleAsFinished() {
    dispatch({
      type: 'MARK_CYCLE_AS_FINISHED',
      payload: {activeCycleId}
    })
  //   setCycles((state) =>
    
  // )
  }
  function InterruptCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {activeCycleId}
    })
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
      startDate: new Date()
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {newCycle}
    })
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
        CreateNewCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
