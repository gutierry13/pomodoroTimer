import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext,  useState } from 'react'
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
  amountSecondsPassed: number
  markNewCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  duration: zod
    .number()
    .min(1, 'Informe a duração')
    .max(60, 'Duração deve ser entre 1 e 60 minutos')
})
type NewCycleData = zod.infer<typeof newCycleFormValidationSchema>
export const CyclesContext = createContext({} as CyclesContextType )
export function Home() {
  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      duration: 0
    }
  })
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const {  handleSubmit, watch, reset } = newCycleForm
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
    setAmountSecondsPassed(0)
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
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)

  }
  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <CyclesContext.Provider value={{activeCycle,activeCycleId,markNewCycleAsFinished,amountSecondsPassed,setSecondsPassed}}>
        <FormProvider {...newCycleForm}>
         <NewCycleForm/>
        </FormProvider>
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
