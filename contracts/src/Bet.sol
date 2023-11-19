// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Bet {

    address public operator;
    
    bool public isPrivate;
    uint256 public startTime;

    address[] public tokens;
    uint256[] public totalDeposits;
    mapping (uint => mapping (address => uint256)) deposits;

    uint public winner;

    event BetPlaced(address indexed better, uint256 indexed tokenIndex, uint256 amount);
    event WinnerDeclared(uint256 indexed winner);
    event Refund(address indexed better, uint256 indexed tokenIndex, uint256 amount);
    event Withdraw(address indexed better, uint256 indexed tokenIndex, uint256 amount);

    modifier notStarted() {
        require(block.timestamp < startTime, "Bet has already started");
        _;
    }

    modifier ended() {
        require(winner != type(uint256).max, "Bet has not ended");
        _;
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function");
        _;
    }

    constructor(address[] memory _tokens, bool _isPrivate, uint256 _startTime, address _operator) {
        tokens = _tokens;
        isPrivate = _isPrivate;
        startTime = _startTime;
        operator = _operator;
        totalDeposits = new uint256[](2);

        winner = type(uint256).max;
    }

    function bet(uint256 _tokenIndex, uint256 _amount) external notStarted {
        require(_tokenIndex < 2, "Invalid token index");

        require(IERC20(tokens[_tokenIndex]).transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        deposits[_tokenIndex][msg.sender] += _amount;
        totalDeposits[_tokenIndex] += _amount;

        emit BetPlaced(msg.sender, _tokenIndex, _amount);
    }

    function withdraw() external ended {
        uint loserIdx = (winner + 1) % 2;

        uint256 depositedWinner = deposits[winner][msg.sender];
        require(depositedWinner > 0, "Nothing to withdraw");

        // transfer back deposited tokens
        deposits[winner][msg.sender] = 0;
        emit Refund(msg.sender, winner, depositedWinner);
        require(IERC20(tokens[winner]).transferFrom(address(this), msg.sender, depositedWinner), "Transfer 1 failed");

        uint256 totalDepositedWinner = totalDeposits[winner];
        require(totalDepositedWinner > 0, "Nothing to withdraw");
        uint256 totalDepositedLoser = totalDeposits[loserIdx];
        // transfer loser tokens
        uint256 toTransfer = depositedWinner * totalDepositedLoser / totalDepositedWinner;
        emit Withdraw(msg.sender, loserIdx, toTransfer);
        require(IERC20(tokens[loserIdx]).transferFrom(address(this), msg.sender, toTransfer), "Transfer 2 failed");
    }

    function declareWinner(uint256 _winner) external onlyOperator {
        require(_winner < 2, "Invalid winner index");
        require(winner == type(uint256).max, "Winner already declared");

        winner = _winner;

        emit WinnerDeclared(_winner);
    }
}
