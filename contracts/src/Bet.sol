// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Bet {
    
    bool public isPrivate;
    uint256 public startTime;
    
    address public tokenA;
    address public tokenB;

    uint256 public totalDepositA;
    uint256 public totalDepositB;

    mapping (address => uint256) depositedA;
    mapping (address => uint256) depositedB;

    modifier notStarted() {
        require(block.timestamp < startTime, "Bet has already started");
        _;
    }

    constructor(address _tokenA, address _tokenB, bool _isPrivate, uint256 _startTime) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        isPrivate = _isPrivate;
        startTime = _startTime;
    }
}
