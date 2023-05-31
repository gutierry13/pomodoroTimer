import {  useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../context/ClyclesContext";

export function NewCycleForm(){
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return (
    
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      type="text"
      id="task"
      placeholder="Dê um nome para o seu projeto"
      list="task-suggestion"
      disabled={!!activeCycle}
      {...register('task')}
    />
    <datalist id="task-suggestion">
      <option value="Projeto 1" />
    </datalist>
    <label htmlFor="duration">Durante</label>
    <MinutesAmountInput
      type="number"
      id="duration"
      disabled={!!activeCycle}
      placeholder="00"
      {...register('duration', { valueAsNumber: true })}
      step={5}
      min={5}
      max={60}
    />
    <span>Minutos</span>
  </FormContainer>

  )
}