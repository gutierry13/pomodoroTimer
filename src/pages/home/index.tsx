import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/newCycleForm'
import { CountDown } from './components/countdown'

interface CycleTypes {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CyclesContextType{
  activeCycle: CycleTypes | undefined
  activeCycleId: string | null
  markNewCycleAsFinished: () => void
}
export const CyclesContext = createContext({} as CyclesContextType )
export function Home() {
 
  const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const task = watch('task')

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
  function handleCreateNewCycle(data: NewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: CycleTypes = {
      id,
      task: data.task,
      duration: data.duration,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }
  function handleInterruptCycle() {
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
  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <CyclesContext.Provider value={{activeCycle,activeCycleId,markNewCycleAsFinished}}>
        <NewCycleForm/>
        <CountDown/>
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountDownButton
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            disabled={!task}
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
