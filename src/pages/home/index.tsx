import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton
} from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from './components/newCycleForm'
import { CountDown } from './components/countdown'
import { CyclesContext } from '../../context/ClyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  duration: zod
    .number()
    .min(1, 'Informe a duração')
    .max(60, 'Duração deve ser entre 1 e 60 minutos')
})
type NewCycleData = zod.infer<typeof newCycleFormValidationSchema>
export function Home() {
  const { CreateNewCycle, InterruptCycle, activeCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      duration: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  function handleCreateNewCycle(data: NewCycleData) {
    CreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <StopCountDownButton
            type="button"
            onClick={InterruptCycle}
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
