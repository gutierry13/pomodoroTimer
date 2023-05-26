import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'
const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  duration: zod
    .number()
    .min(1, 'Informe a duração')
    .max(60, 'Duração deve ser entre 1 e 60 minutos')
})
type NewCycleData = zod.infer<typeof newCicleFormValidationSchema>
interface CycleTypes {
  id: string
  task: string
  duration: number
}
export function Home() {
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      duration: 0
    }
  })
  const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const task = watch('task')
  const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  function handleCreateNewCicle(data: NewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: CycleTypes = {
      id,
      task: data.task,
      duration: data.duration
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }
  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCicle)}
      >
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestion"
            {...register('task')}
          />
          <datalist id="task-suggestion">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="duration">Durante</label>
          <MinutesAmountInput
            type="number"
            id="duration"
            placeholder="00"
            {...register('duration', { valueAsNumber: true })}
            step={5}
            min={5}
            max={60}
          />
          <span>Minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
        <StartCountDownButton
          disabled={!task}
          type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
