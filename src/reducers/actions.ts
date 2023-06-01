import { CycleTypes } from './cycles'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
}
export function addNewCycleAction(newCycle: CycleTypes) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}
export function markCycleFinishedAction() {
  return {
    type: ActionTypes.MARK_CYCLE_AS_FINISHED,
  }
}
export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}
