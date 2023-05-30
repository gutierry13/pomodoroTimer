import { useForm } from "react-hook-form";
import * as zod from "zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  duration: zod
    .number()
    .min(1, 'Informe a duração')
    .max(60, 'Duração deve ser entre 1 e 60 minutos')
})
type NewCycleData = zod.infer<typeof newCycleFormValidationSchema>
export function NewCycleForm(){
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      duration: 0
    }
  })
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
      min={1}
      max={60}
    />
    <span>Minutos</span>
  </FormContainer>

  )
}