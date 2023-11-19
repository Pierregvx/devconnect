// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/BetFactory.sol";
import "../src/MyToken.sol";
import "../src/Bet.sol";

contract Deploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        BetFactory factory = new BetFactory();
        MyToken token = new MyToken();

        address[] memory tokens = new address[](2);
        tokens[0] = address(token);
        tokens[1] = address(token);

        Bet bet1 = factory.createBet(BetFactory.BetParams({
            tokens: tokens,
            isPrivate: false,
            startTime: block.timestamp + 100000,
            operator: msg.sender
        }));

        Bet bet2 = factory.createBet(BetFactory.BetParams({
            tokens: tokens,
            isPrivate: false,
            startTime: block.timestamp + 100000,
            operator: msg.sender
        }));

        token.approve(address(bet1), type(uint256).max);
        token.approve(address(bet2), type(uint256).max);

        bet1.bet(0, 1000 ether);
        bet1.bet(1, 721 ether);

        bet2.bet(0, 100 ether);
        bet2.bet(1, 666 ether);

        vm.stopBroadcast();
    }
}
