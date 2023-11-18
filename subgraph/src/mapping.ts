import { BigInt } from "@graphprotocol/graph-ts"
import { BetFactory, BetCreated } from "../generated/BetFactory/BetFactory"
import { BetPlaced, Refund, WinnerDeclared, Withdraw } from "../generated/templates/BetTemplate/Bet"
import { Asset, Bet, Deposit } from "../generated/schema"
import { BetTemplate } from "../generated/templates"

export function handleBetCreated(event: BetCreated): void {
  BetTemplate.create(event.params.betAddress);

  const bet = new Bet(event.params.betAddress);
  bet.creator = event.params.creator;
  bet.operator = event.params.params.operator;
  bet.isPrivate = event.params.params.isPrivate;
  bet.startTime = event.params.params.startTime;
  bet.save();

  for (let i = 0; i < event.params.params.tokens.length; i++) {
    const asset = new Asset(event.params.betAddress.toHexString() + "-" + i.toString());
    asset.address = event.params.params.tokens[i];
    asset.totalDeposited = BigInt.zero();
    asset.bet = event.params.betAddress;
    asset.isWinner = false;
    asset.save();
  }
}

export function handleBetPlaced(event: BetPlaced): void {
  const id = event.address.toHexString() + "-" + event.params.better.toHexString() + "-" + event.params.tokenIndex.toString();
  let deposit = Deposit.load(id);
  if (!deposit) {
    deposit = new Deposit(id);
    deposit.amount = event.params.amount;
    deposit.asset = event.address.toHexString() + "-" + event.params.tokenIndex.toString();
  } else {
    deposit.amount = deposit.amount.plus(event.params.amount);
  }
  deposit.save();
}

export function handleWinnerDeclared(event: WinnerDeclared): void {
  const asset = Asset.load(event.address.toHexString() + "-" + event.params.winner.toString());
  asset!.isWinner = true;
  asset!.save();
} 

export function handleRefund(event: Refund): void {

}

export function handleWithdraw(event: Withdraw): void {

}