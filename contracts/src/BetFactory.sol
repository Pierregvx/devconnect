// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Bet.sol";

contract BetFactory {

    struct BetParams {
        address[2] tokens;
        bool isPrivate;
        uint256 startTime;
        address operator;
    }

    event BetCreated(address indexed betAddress, address indexed creator, BetParams params);

    constructor() {}

    function createBet(BetParams memory _params) external returns (Bet) {
        Bet newBet = new Bet(_params.tokens, _params.isPrivate, _params.startTime, _params.operator);
        emit BetCreated(address(newBet), msg.sender, _params);
        return newBet;
    }
}
