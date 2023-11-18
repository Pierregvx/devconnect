import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { BetCreated } from "../generated/BetFactory/BetFactory"

export function createBetCreatedEvent(
  betAddress: Address,
  creator: Address,
  params: ethereum.Tuple
): BetCreated {
  let betCreatedEvent = changetype<BetCreated>(newMockEvent())

  betCreatedEvent.parameters = new Array()

  betCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "betAddress",
      ethereum.Value.fromAddress(betAddress)
    )
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  betCreatedEvent.parameters.push(
    new ethereum.EventParam("params", ethereum.Value.fromTuple(params))
  )

  return betCreatedEvent
}
