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

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            name="task"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestion"
          />
          <datalist id="task-suggestion">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="duration">Durante</label>
          <MinutesAmountInput
            type="number"
            name="duration"
            id="duration"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />
          <span>Minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <StartCountDownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
